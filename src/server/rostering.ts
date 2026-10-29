import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { GRADE_ORDER } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { SCHOOL_PLAN_FEATURES, rosterAccess, schoolPriceText, type RosterAccess, type SchoolPrice } from "@/lib/schoolPlan";
import {
  MAX_IMPORT_SECTIONS,
  firstNameOf,
  gradeFromText,
  isRosterProvider,
  numberDuplicates,
  type ImportChoice,
  type ImportResult,
  type RosterProviderId,
  type RosterSection,
  type RosterStudent,
} from "@/lib/rostering";
import { appOrigin, newId } from "./auth";
import { classOwnedCount, isFramework, offersGrade, MAX_CLASSES, MAX_STUDENTS, newJoinCode, type ClassRow } from "./classroom";
import { batch, query, run } from "./db";
import { isFlagOn } from "./flags";
import { addStudents, cleanStudentName } from "./students";

// Roster import. A signed-in teacher goes to Google Classroom, Clever or ClassLink (OAuth over plain HTTPS, no SDK and
// no provider script on our pages), we read their classes and each class's students once, keep that for half an hour
// while they choose, and make ordinary class student accounts from it. We keep none of the provider's tokens and read
// only first names, so there is nothing to refresh: importing again is another trip to the provider.
//
// The provider calls below follow each provider's public documentation. They have not been run against a live
// account (that needs the owner's keys; see docs/ROSTER_IMPORT.md), so each one is a small parser over a `Get`
// function that the tests feed with sample answers.

export const rosterStateCookie = process.env.NODE_ENV === "production" ? "__Host-gm_roster" : "gm_roster";
/** How long a sign-in may take between leaving for the provider and coming back. */
export const ROSTER_STATE_SECONDS = 600;
/** How long a read roster waits for the teacher to choose. */
export const ROSTER_IMPORT_TTL = 30 * 60_000;

type Get = (url: string) => Promise<unknown>;

interface ProviderDef {
  label: string;
  /** Environment variables holding the key and secret from the provider's developer console. */
  clientId: string;
  clientSecret: string;
  authUrl: string;
  tokenUrl: string;
  scope: string;
  /** Whether the provider accepts PKCE. Google does; the others are protected by the state value and their secret. */
  pkce: boolean;
  /** How the token request carries the key: in the body, or as a Basic header (Clever). */
  tokenAuth: "body" | "basic";
  extraAuthParams?: Record<string, string>;
  sections(get: Get): Promise<RosterSection[]>;
}

const asArray = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? v.filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null) : []);
const rec = (v: unknown): Record<string, unknown> => (typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {});
const str = (v: unknown): string => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");

/** Students with an id and a name, first names only, duplicates numbered. */
function cleanStudents(list: RosterStudent[]): RosterStudent[] {
  const seen = new Set<string>();
  const unique = list.filter((s) => s.id && s.name && !seen.has(s.id) && seen.add(s.id));
  return numberDuplicates(unique);
}

// --- Google Classroom -------------------------------------------------------------------------------------------

const CLASSROOM = "https://classroom.googleapis.com/v1";

/** Courses where the signed-in teacher teaches, and each course's students (names only: no email scope is asked for). */
export async function googleClassroomSections(get: Get): Promise<RosterSection[]> {
  const courses: Record<string, unknown>[] = [];
  let page = "";
  for (let i = 0; i < 3; i++) {
    const res = rec(await get(`${CLASSROOM}/courses?teacherId=me&courseStates=ACTIVE&pageSize=30${page}`));
    courses.push(...asArray(res.courses));
    if (!res.nextPageToken) break;
    page = `&pageToken=${encodeURIComponent(str(res.nextPageToken))}`;
  }
  const out: RosterSection[] = [];
  for (const c of courses.slice(0, MAX_IMPORT_SECTIONS)) {
    const id = str(c.id);
    if (!id) continue;
    const students: RosterStudent[] = [];
    let token = "";
    for (let i = 0; i < 3; i++) {
      const res = rec(await get(`${CLASSROOM}/courses/${encodeURIComponent(id)}/students?pageSize=100${token}`));
      for (const s of asArray(res.students)) {
        const name = rec(rec(s.profile).name);
        students.push({ id: str(s.userId), name: firstNameOf(name.givenName, name.fullName) });
      }
      if (!res.nextPageToken) break;
      token = `&pageToken=${encodeURIComponent(str(res.nextPageToken))}`;
    }
    const title = str(c.name).trim().slice(0, 60);
    out.push({ id, name: title || "Class", grade: gradeFromText(`${str(c.name)} ${str(c.section)}`), students: cleanStudents(students) });
  }
  return out;
}

// --- Clever -----------------------------------------------------------------------------------------------------

const CLEVER = "https://api.clever.com/v3.0";

/** The teacher's sections (`/users/{id}/sections`) and each section's students (`/sections/{id}/users`, student role). */
export async function cleverSections(get: Get): Promise<RosterSection[]> {
  const me = rec(rec(await get(`${CLEVER}/me`)).data);
  const userId = str(me.id);
  if (!userId) return [];
  const sections = asArray(rec(await get(`${CLEVER}/users/${encodeURIComponent(userId)}/sections?limit=${MAX_IMPORT_SECTIONS}`)).data);
  const out: RosterSection[] = [];
  for (const row of sections.slice(0, MAX_IMPORT_SECTIONS)) {
    const s = rec(row.data);
    const id = str(s.id);
    if (!id) continue;
    const users = asArray(rec(await get(`${CLEVER}/sections/${encodeURIComponent(id)}/users?limit=200`)).data);
    const students = users
      .map((u) => rec(u.data))
      .filter((u) => "student" in rec(u.roles))
      .map((u) => ({ id: str(u.id), name: firstNameOf(rec(u.name).first) }));
    out.push({ id, name: str(s.name).trim().slice(0, 60) || "Class", grade: gradeFromText(str(s.grade), true) ?? gradeFromText(str(s.name)), students: cleanStudents(students) });
  }
  return out;
}

// --- ClassLink --------------------------------------------------------------------------------------------------

const CLASSLINK = "https://nodeapi.classlink.com/v2";

/** The teacher's classes (`/my/classes`) and each class's students (`/classes/{id}/students`). */
export async function classLinkSections(get: Get): Promise<RosterSection[]> {
  const classes = asArray(await get(`${CLASSLINK}/my/classes`));
  const out: RosterSection[] = [];
  for (const c of classes.slice(0, MAX_IMPORT_SECTIONS)) {
    const id = str(c.sourcedId);
    if (!id) continue;
    const students = asArray(await get(`${CLASSLINK}/classes/${encodeURIComponent(id)}/students`)).map((s) => ({ id: str(s.sourcedId), name: firstNameOf(s.givenName) }));
    const grades = Array.isArray(c.grades) ? c.grades : [];
    const grade = (grades.length === 1 ? gradeFromText(str(grades[0]), true) : null) ?? gradeFromText(str(c.title));
    out.push({ id, name: str(c.title).trim().slice(0, 60) || "Class", grade, students: cleanStudents(students) });
  }
  return out;
}

const PROVIDERS: Record<RosterProviderId, ProviderDef> = {
  "google-classroom": {
    label: "Google Classroom",
    clientId: "GOOGLE_CLASSROOM_CLIENT_ID",
    clientSecret: "GOOGLE_CLASSROOM_CLIENT_SECRET",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scope: "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly",
    pkce: true,
    tokenAuth: "body",
    extraAuthParams: { prompt: "select_account", access_type: "online" },
    sections: googleClassroomSections,
  },
  clever: {
    label: "Clever",
    clientId: "CLEVER_CLIENT_ID",
    clientSecret: "CLEVER_CLIENT_SECRET",
    authUrl: "https://clever.com/oauth/authorize",
    tokenUrl: "https://clever.com/oauth/tokens",
    scope: "",
    pkce: false,
    tokenAuth: "basic",
    sections: cleverSections,
  },
  classlink: {
    label: "ClassLink",
    clientId: "CLASSLINK_CLIENT_ID",
    clientSecret: "CLASSLINK_CLIENT_SECRET",
    authUrl: "https://launchpad.classlink.com/oauth2/v2/auth",
    tokenUrl: "https://launchpad.classlink.com/oauth2/v2/token",
    scope: "profile oneroster",
    pkce: false,
    tokenAuth: "body",
    sections: classLinkSections,
  },
};

const keys = (id: RosterProviderId) => {
  const def = PROVIDERS[id];
  return { id: process.env[def.clientId]?.trim() ?? "", secret: process.env[def.clientSecret]?.trim() ?? "" };
};

export function providerConfigured(id: RosterProviderId): boolean {
  const k = keys(id);
  return Boolean(k.id && k.secret);
}

/** The providers whose keys are set on the server. */
export function configuredProviders(): { id: RosterProviderId; label: string }[] {
  return (Object.keys(PROVIDERS) as RosterProviderId[]).filter(providerConfigured).map((id) => ({ id, label: PROVIDERS[id].label }));
}

/** The exact address to register with each provider as the redirect URI. */
export const rosterRedirectUri = (req: Request): string => `${appOrigin(req)}/api/roster/callback/`;

// --- The price and who may import -------------------------------------------------------------------------------

/** The owner's school price from the environment, or null while it is undecided. */
export function schoolPrice(): SchoolPrice | null {
  const cents = Number(process.env.SCHOOL_PRICE_PER_STUDENT_CENTS);
  if (!Number.isInteger(cents) || cents <= 0 || cents > 100_000) return null;
  return { perStudentYear: cents, currency: process.env.SCHOOL_PRICE_CURRENCY?.trim().toUpperCase() === "USD" ? "USD" : "CAD" };
}

export async function schoolUntil(familyId: string): Promise<number | null> {
  const row = (await query<{ school_until: number | null }>("SELECT school_until FROM families WHERE id = ?", [familyId]))[0];
  return row?.school_until == null ? null : Number(row.school_until);
}

export async function rosterAccessFor(familyId: string, now = Date.now()): Promise<RosterAccess> {
  const [rosterFlag, planFlag] = await Promise.all([isFlagOn("roster-import", familyId), isFlagOn("school-plan", familyId)]);
  return rosterAccess({ rosterFlag, planFlag, schoolUntil: planFlag ? await schoolUntil(familyId) : null, now });
}

/** What the teacher area shows before an import: the providers, whether the account may use them, and the plan's price when set. */
export async function rosterStatus(familyId: string) {
  const access = await rosterAccessFor(familyId);
  return {
    access,
    providers: access === "off" ? [] : configuredProviders(),
    plan: access === "plan" ? { features: SCHOOL_PLAN_FEATURES, price: schoolPriceText(schoolPrice()) } : null,
  };
}

// --- The sign-in -------------------------------------------------------------------------------------------------

const b64 = (b: Buffer) => b.toString("base64url");

export interface RosterState {
  state: string;
  verifier: string;
  provider: RosterProviderId;
  /** The teacher who started it: another account finishing it gets nothing. */
  parentId: string;
}

export function newRosterState(provider: RosterProviderId, parentId: string): RosterState {
  return { state: b64(randomBytes(24)), verifier: b64(randomBytes(48)), provider, parentId };
}

export const encodeRosterState = (s: RosterState): string => Buffer.from(JSON.stringify(s)).toString("base64url");

export function decodeRosterState(raw: string | undefined): RosterState | null {
  if (!raw || raw.length > 1000) return null;
  try {
    const s = JSON.parse(Buffer.from(raw, "base64url").toString()) as Partial<RosterState>;
    if (typeof s.state !== "string" || typeof s.verifier !== "string" || typeof s.parentId !== "string" || !isRosterProvider(s.provider)) return null;
    return { state: s.state, verifier: s.verifier, provider: s.provider, parentId: s.parentId };
  } catch {
    return null;
  }
}

export function rosterStateCookieValue(value: string, maxAge: number): string {
  return `${rosterStateCookie}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function rosterAuthUrl(req: Request, s: RosterState): string {
  const def = PROVIDERS[s.provider];
  const params = new URLSearchParams({
    client_id: keys(s.provider).id,
    redirect_uri: rosterRedirectUri(req),
    response_type: "code",
    state: s.state,
    ...def.extraAuthParams,
  });
  if (def.scope) params.set("scope", def.scope);
  if (def.pkce) {
    params.set("code_challenge", createHash("sha256").update(s.verifier).digest("base64url"));
    params.set("code_challenge_method", "S256");
  }
  return `${def.authUrl}?${params}`;
}

/** Trades the code for an access token. The token is used for this one import and then dropped. */
async function exchangeCode(req: Request, code: string, s: RosterState): Promise<string | null> {
  const def = PROVIDERS[s.provider];
  const k = keys(s.provider);
  const body = new URLSearchParams({ code, grant_type: "authorization_code", redirect_uri: rosterRedirectUri(req) });
  const headers: Record<string, string> = { "content-type": "application/x-www-form-urlencoded", accept: "application/json" };
  if (def.tokenAuth === "basic") headers.authorization = `Basic ${Buffer.from(`${k.id}:${k.secret}`).toString("base64")}`;
  else {
    body.set("client_id", k.id);
    body.set("client_secret", k.secret);
  }
  if (def.pkce) body.set("code_verifier", s.verifier);
  try {
    const res = await fetch(def.tokenUrl, { method: "POST", headers, body, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    const token = ((await res.json().catch(() => null)) as { access_token?: unknown } | null)?.access_token;
    return typeof token === "string" && token ? token : null;
  } catch {
    return null;
  }
}

/** Reads the teacher's classes from the provider with a code from the sign-in. Null when any step failed. */
export async function readRoster(req: Request, code: string, s: RosterState): Promise<RosterSection[] | null> {
  const token = await exchangeCode(req, code, s);
  if (!token) return null;
  const get: Get = async (url) => {
    const res = await fetch(url, { headers: { authorization: `Bearer ${token}`, accept: "application/json" }, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  };
  try {
    return await PROVIDERS[s.provider].sections(get);
  } catch {
    return null;
  }
}

// --- Keeping a roster while the teacher chooses -------------------------------------------------------------------

export async function saveImport(parentId: string, provider: RosterProviderId, sections: RosterSection[], now = Date.now()): Promise<string> {
  const id = newId();
  await batch([
    { sql: "DELETE FROM roster_imports WHERE created_at < ? OR parent_id = ?", args: [now - ROSTER_IMPORT_TTL, parentId] },
    { sql: "INSERT INTO roster_imports (id, parent_id, provider, data, created_at) VALUES (?, ?, ?, ?, ?)", args: [id, parentId, provider, JSON.stringify(sections), now] },
  ]);
  return id;
}

export interface PendingImport {
  provider: RosterProviderId;
  sections: RosterSection[];
}

export async function pendingImport(id: string, parentId: string, now = Date.now()): Promise<PendingImport | null> {
  const row = (await query<{ provider: string; data: string; created_at: number }>("SELECT provider, data, created_at FROM roster_imports WHERE id = ? AND parent_id = ?", [id, parentId]))[0];
  if (!row || Number(row.created_at) < now - ROSTER_IMPORT_TTL || !isRosterProvider(row.provider)) return null;
  try {
    return { provider: row.provider, sections: JSON.parse(row.data) as RosterSection[] };
  } catch {
    return null;
  }
}

export async function discardImport(id: string, parentId: string): Promise<void> {
  await run("DELETE FROM roster_imports WHERE id = ? AND parent_id = ?", [id, parentId]);
}

/** Each section with the class it would join if the teacher already imported it, and how many of its students are new. */
export async function reviewSections(parentId: string, pending: PendingImport) {
  const out = [];
  for (const section of pending.sections) {
    const existing = (await query<{ id: string; name: string }>(
      "SELECT id, name FROM classes WHERE owner_parent_id = ? AND roster_provider = ? AND roster_course_id = ? AND closed_at IS NULL",
      [parentId, pending.provider, section.id],
    ))[0];
    const have = existing
      ? new Set((await query<{ external_id: string }>("SELECT external_id FROM students WHERE class_id = ? AND external_id IS NOT NULL", [existing.id])).map((r) => r.external_id))
      : new Set<string>();
    out.push({
      id: section.id,
      name: section.name,
      grade: section.grade,
      students: section.students.length,
      newStudents: section.students.filter((s) => !have.has(s.id)).length,
      existing: existing ? { id: existing.id, name: existing.name } : null,
      names: section.students.map((s) => s.name),
    });
  }
  return out;
}

// --- Making the classes ------------------------------------------------------------------------------------------

async function createRosterClass(parentId: string, provider: RosterProviderId, section: RosterSection, choice: ImportChoice): Promise<ClassRow | null> {
  const id = newId();
  for (let attempt = 0; attempt < 5; attempt++) {
    const now = Date.now();
    try {
      await run(
        "INSERT INTO classes (id, owner_parent_id, name, grade, grade2, framework, join_code, created_at, last_activity_at, roster_provider, roster_course_id) VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?)",
        [id, parentId, choice.name, choice.grade, choice.framework, newJoinCode(), now, now, provider, section.id],
      );
      return (await query<ClassRow>("SELECT * FROM classes WHERE id = ?", [id]))[0] ?? null;
    } catch {
      // Join code collision: try another.
    }
  }
  return null;
}

export type ImportOutcome = { ok: true; results: ImportResult[] } | { ok: false; status: number; message: string };

/**
 * Makes the classes the teacher chose from a read roster, or adds the new students to a class that an earlier import
 * made (matched by the provider's class id). Students already in the class are skipped; students who left the provider's
 * list are counted and left for the teacher to remove. Nothing is deleted here.
 */
export async function applyImport(parentId: string, pending: PendingImport, choices: ImportChoice[]): Promise<ImportOutcome> {
  const picked = choices.filter((c, i) => choices.findIndex((o) => o.sectionId === c.sectionId) === i);
  if (!picked.length) return { ok: false, status: 400, message: "Choose at least one class." };
  const results: ImportResult[] = [];
  for (const choice of picked) {
    const section = pending.sections.find((s) => s.id === choice.sectionId);
    if (!section) return { ok: false, status: 400, message: "One of those classes isn't in the list we read. Start the import again." };
    let cls = (await query<ClassRow>(
      "SELECT * FROM classes WHERE owner_parent_id = ? AND roster_provider = ? AND roster_course_id = ? AND closed_at IS NULL",
      [parentId, pending.provider, section.id],
    ))[0];
    const created = !cls;
    if (!cls) {
      const name = choice.name.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
      if (!name) return { ok: false, status: 400, message: "Give every class a name." };
      if (!(GRADE_ORDER as string[]).includes(choice.grade)) return { ok: false, status: 400, message: "Choose a grade for every class." };
      if (!isFramework(choice.framework)) return { ok: false, status: 400, message: "Choose a province or state for every class." };
      if (!offersGrade(choice.framework, choice.grade)) return { ok: false, status: 400, message: "Choose a grade for every class." };
      if ((await classOwnedCount(parentId)) >= MAX_CLASSES) return { ok: false, status: 409, message: "You have the maximum number of classes. Close one first." };
      cls = (await createRosterClass(parentId, pending.provider, section, { ...choice, name, grade: choice.grade as GradeId })) as ClassRow;
      if (!cls) return { ok: false, status: 500, message: "Couldn't create the class. Try again." };
    }
    const have = new Set((await query<{ external_id: string }>("SELECT external_id FROM students WHERE class_id = ? AND external_id IS NOT NULL", [cls.id])).map((r) => r.external_id));
    const fresh = section.students.filter((s) => !have.has(s.id));
    const members = Number((await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_members WHERE class_id = ?", [cls.id]))[0].n);
    const room = Math.max(0, MAX_STUDENTS - members);
    const take = fresh.slice(0, room);
    if (take.length) await addStudents(cls, take.map((s) => cleanStudentName(s.name)), cls.grade, take.map((s) => s.id));
    const listed = new Set(section.students.map((s) => s.id));
    results.push({
      classId: cls.id,
      name: cls.name,
      added: take.length,
      alreadyThere: section.students.length - fresh.length,
      tooMany: fresh.length - take.length,
      noLongerListed: [...have].filter((id) => !listed.has(id)).length,
      created,
    });
  }
  return { ok: true, results };
}
