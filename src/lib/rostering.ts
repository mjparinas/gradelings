import type { GradeId } from "@/content/types";

// Roster import: what the browser and the server both need to know. No secrets and no server code here.
//
// A teacher signs in to Google Classroom, Clever or ClassLink, picks the classes to bring over, and each student
// becomes an ordinary class student account (a first name, a grade and a login code, as when a teacher types the
// names). We keep the provider's id for each student only so a later import doesn't add the same child twice.

export const ROSTER_PROVIDERS = {
  "google-classroom": { label: "Google Classroom" },
  clever: { label: "Clever" },
  classlink: { label: "ClassLink" },
} as const;
export type RosterProviderId = keyof typeof ROSTER_PROVIDERS;

export const isRosterProvider = (v: unknown): v is RosterProviderId => typeof v === "string" && Object.hasOwn(ROSTER_PROVIDERS, v);

export const rosterProviderLabel = (id: RosterProviderId): string => ROSTER_PROVIDERS[id].label;

/** One student as the provider lists them. Only a first name is kept; a family name is never read into our records. */
export interface RosterStudent {
  /** The provider's id for the student. */
  id: string;
  name: string;
}

/** One class (Google Classroom course, Clever or ClassLink section) with its students. */
export interface RosterSection {
  id: string;
  name: string;
  /** The grade the provider says, or null when it said none we can read (the teacher picks). */
  grade: GradeId | null;
  students: RosterStudent[];
}

/** A section's students in one import. A class holds 40 (`MAX_STUDENTS`), so a larger roster is cut with a message. */
export const MAX_IMPORT_SECTIONS = 40;

/** Why an import could not start or finish, as the code carried back in the address (`?roster_error=`). */
export const ROSTER_ERRORS = {
  cancelled: "The sign-in was cancelled. Nothing was imported.",
  failed: "We couldn't read your classes. Please try again.",
  off: "Importing classes isn't available right now.",
  slow: "Too many attempts. Try again in a few minutes.",
  plan: "Importing classes is part of the school plan.",
  empty: "That account has no classes to import.",
} as const;
export type RosterError = keyof typeof ROSTER_ERRORS;

export const isRosterError = (code: string | null): code is RosterError => code != null && Object.hasOwn(ROSTER_ERRORS, code);

/** The link behind an "Import from …" button. */
export const rosterStartUrl = (provider: RosterProviderId): string => `/api/roster/start/?provider=${provider}`;

/** Where the server sends the browser after a sign-in with a provider. */
export function rosterReturnUrl(result: { error?: RosterError; importId?: string }): string {
  if (result.error) return `/teachers/?roster_error=${result.error}`;
  return `/teachers/#/import/${encodeURIComponent(result.importId ?? "")}`;
}

/**
 * The grade a provider's text means: "K", "Kindergarten", "KG", "4", "04", "Grade 4", "4th grade". Free text such as a
 * class name needs the word "grade" (or "kindergarten") so "Period 3" or "Room 4" is never read as a grade; a field the
 * provider fills with a grade alone (`bare`) can be just the number. Grades above 9 and pre-kindergarten are null.
 */
export function gradeFromText(text: string | null | undefined, bare = false): GradeId | null {
  const t = String(text ?? "").trim().toLowerCase();
  if (!t) return null;
  if (/\bkindergarten\b/.test(t) || (bare && /^(?:kg|k|jk\/k|sk|kdg)$/.test(t))) return "k";
  const m = bare && /^0?(\d{1,2})$/.test(t)
    ? t.match(/^0?(\d{1,2})$/)
    : t.match(/\bgrades?\s*0?(\d{1,2})\b/) ?? t.match(/\b0?(\d{1,2})(?:st|nd|rd|th)\s*grade\b/) ?? (bare ? t.match(/^0?(\d{1,2})(?:st|nd|rd|th)?$/) : null);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 1 && n <= 9 ? (String(n) as GradeId) : null;
}

/** A first name from a provider's given name, or from a full name when that is all there is. Markup characters go. */
export function firstNameOf(given: unknown, full?: unknown): string {
  const pick = (v: unknown) => String(v ?? "").replace(/[<>&"\\]/g, "").replace(/\s+/g, " ").trim();
  const g = pick(given);
  return (g || pick(full).split(" ")[0] || "").slice(0, 20);
}

/**
 * Gives students with the same first name a number so a teacher can tell them apart ("Sam", "Sam 2"). Nothing else
 * about a child is read from the provider to do this.
 */
export function numberDuplicates(students: RosterStudent[]): RosterStudent[] {
  const seen = new Map<string, number>();
  return students.map((s) => {
    const key = s.name.toLowerCase();
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    return n === 1 ? s : { ...s, name: `${s.name.slice(0, 17)} ${n}` };
  });
}

/** What the teacher chose for one section on the review page. */
export interface ImportChoice {
  sectionId: string;
  /** The name of the new class. */
  name: string;
  grade: GradeId;
  framework: string;
}

export interface ImportResult {
  classId: string;
  name: string;
  added: number;
  /** Already in the class from an earlier import. */
  alreadyThere: number;
  /** Left out because a class holds 40 students. */
  tooMany: number;
  /** In the class from an earlier import but no longer on the provider's list. The teacher decides what to do. */
  noLongerListed: number;
  created: boolean;
}

/** The sentence under a finished import. */
export function importSummary(r: ImportResult): string {
  const parts = [`${r.added} ${r.added === 1 ? "student" : "students"} added`];
  if (r.alreadyThere) parts.push(`${r.alreadyThere} already there`);
  if (r.tooMany) parts.push(`${r.tooMany} left out (a class holds 40)`);
  if (r.noLongerListed) parts.push(`${r.noLongerListed} no longer on the list (remove them under Students if they left)`);
  return `${r.name}: ${parts.join(", ")}.`;
}
