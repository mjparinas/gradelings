import "server-only";
import {
  afterTrial,
  classActivity,
  contentGaps,
  engagementDepth,
  mostFlagged,
  revenueQuality,
  signupSources,
  teacherFunnel,
  trialByWeek,
  trialCurve,
  type ChildActivity,
  type ClassActivity,
  type FirstPayment,
  type SignupFact,
  type SignupPath,
  type TrialFamily,
  type UnitStat,
} from "@/lib/adminInsights";
import { TEST_ACCOUNT_EMAILS } from "@/lib/brand";
import { toCountryCode } from "@/lib/country";
import { FREE_UNITS_PER_COURSE } from "@/lib/plan";
import { adminEmails, supportEmails } from "./admin";
import { teacherOnly } from "./audience";
import { query } from "./db";

// The admin insights: each part reads only counts and dates about families, never a child's name or answers. The
// owner's test account, admins and support staff are left out of every count, and so are class student accounts.

const DAY = 86_400_000;
const WEEK = 7 * DAY;
/** Practice time per answer is capped, as in the kids' app. */
const MS_CAP = 60_000;

export const INSIGHT_PARTS = ["trial", "revenue", "engagement", "teachers", "content", "sources"] as const;
export type InsightPart = (typeof INSIGHT_PARTS)[number];
export const isInsightPart = (s: string): s is InsightPart => (INSIGHT_PARTS as readonly string[]).includes(s);

/** Emails whose families never count: the owner's test account, admins and support staff. */
export function excludedEmails(): string[] {
  return [...new Set([...TEST_ACCOUNT_EMAILS.map((e) => e.toLowerCase()), ...adminEmails(), ...supportEmails()])];
}

/**
 * SQL that keeps real customers: not a class student account, not an excluded address. `f` is the families table's
 * alias. The addresses are bound as arguments, in the order returned.
 */
export function realFamilies(f = "f"): { sql: string; args: string[] } {
  const emails = excludedEmails();
  const marks = emails.map(() => "?").join(", ");
  return {
    sql: `NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = ${f}.id AND s.role = 'student')${
      emails.length ? ` AND NOT EXISTS (SELECT 1 FROM parents x WHERE x.family_id = ${f}.id AND lower(x.email) IN (${marks}))` : ""
    }`,
    args: emails,
  };
}

/** The same for events and other tables keyed by `family_id`. */
const realEvents = (): { sql: string; args: string[] } => {
  const r = realFamilies("fx");
  return { sql: `family_id IN (SELECT fx.id FROM families fx WHERE ${r.sql})`, args: r.args };
};

const PAID = "(EXISTS (SELECT 1 FROM payments pay WHERE pay.family_id = f.id AND pay.amount > pay.refunded) OR f.subscription_status IN ('active', 'past_due'))";
const ANSWER = "json_extract(e.data, '$.type') = 'answer'";

/** The free units per course. A family that started more than this in a course has something that locks. */
async function lockedFamilies(ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const out = new Set<string>();
  // In chunks so the statement stays small.
  for (let i = 0; i < ids.length; i += 400) {
    const chunk = ids.slice(i, i + 400);
    const rows = await query<{ family_id: string; unit: string }>(
      `SELECT DISTINCT e.family_id, json_extract(e.data, '$.unit') AS unit FROM events e
       WHERE e.family_id IN (${chunk.map(() => "?").join(", ")}) AND ${ANSWER} AND json_extract(e.data, '$.unit') IS NOT NULL AND json_extract(e.data, '$.unit') NOT LIKE '%/facts'`,
      chunk,
    );
    const courses = new Map<string, Set<string>>();
    for (const r of rows) {
      const [grade, subject] = String(r.unit).split("/");
      const key = `${r.family_id}|${grade}/${subject}`;
      courses.set(key, (courses.get(key) ?? new Set()).add(String(r.unit)));
    }
    for (const [key, units] of courses) if (units.size > FREE_UNITS_PER_COURSE) out.add(key.split("|")[0]!);
  }
  return out;
}

/** Families whose trial ended in the last `days` days. */
export async function trialFamilies(now: number, days = 120): Promise<TrialFamily[]> {
  const real = realFamilies();
  const rows = await query<Record<string, number | null>>(
    `SELECT f.id, f.created_at, f.trial_ends_at, f.access_until,
       (SELECT COUNT(DISTINCT CAST(e.t / ${DAY} AS INTEGER)) FROM events e WHERE e.family_id = f.id AND e.t >= f.created_at AND e.t < f.created_at + 30 * ${DAY} AND ${ANSWER}) AS practice_days,
       EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id AND e.t >= f.trial_ends_at - ${WEEK} AND e.t < f.trial_ends_at AND ${ANSWER}) AS last_week,
       EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id AND e.t >= ? AND e.t >= f.trial_ends_at AND ${ANSWER}) AS now_active,
       ${PAID} AS paid
     FROM families f
     WHERE ${real.sql} AND f.trial_ends_at < ? AND f.trial_ends_at >= ?
       AND NOT EXISTS (SELECT 1 FROM parents tp WHERE tp.family_id = f.id AND ${teacherOnly("tp")})`,
    [now - 14 * DAY, ...real.args, now, now - days * DAY],
  );
  const locked = await lockedFamilies(rows.map((r) => String(r.id)));
  return rows.map((r) => ({
    createdAt: Number(r.created_at),
    trialEndsAt: Number(r.trial_ends_at),
    practiceDays: Number(r.practice_days ?? 0),
    hadLockedUnits: locked.has(String(r.id)),
    practisedLastWeek: Boolean(Number(r.last_week)),
    practisingNow: Boolean(Number(r.now_active)),
    paid: Boolean(Number(r.paid)),
    onCode: r.access_until != null && Number(r.access_until) > now,
  }));
}

async function trial(now: number) {
  const families = await trialFamilies(now);
  return { curve: trialCurve(families), weeks: trialByWeek(families, now), after: afterTrial(families), windowDays: 120 };
}

async function revenue(now: number) {
  const real = realFamilies();
  const since = now - 90 * DAY;
  const [first, totals] = await Promise.all([
    // Each family's first payment, for families that signed up with us (gifts have no family).
    query<{ paid_at: number; trial_ends_at: number; interval: string | null }>(
      `SELECT p.paid_at, f.trial_ends_at, p.interval FROM payments p JOIN families f ON f.id = p.family_id
       WHERE ${real.sql} AND p.paid_at >= ? AND p.interval IN ('month', 'year')
         AND p.paid_at = (SELECT MIN(q.paid_at) FROM payments q WHERE q.family_id = p.family_id AND q.amount > 0)`,
      [...real.args, since],
    ),
    query<{ n: number; refunded: number }>(
      `SELECT COUNT(*) AS n, SUM(CASE WHEN p.refunded > 0 THEN 1 ELSE 0 END) AS refunded FROM payments p JOIN families f ON f.id = p.family_id
       WHERE ${real.sql} AND p.paid_at >= ? AND p.amount > 0`,
      [...real.args, since],
    ),
  ]);
  const facts: FirstPayment[] = first.map((r) => ({ paidAt: Number(r.paid_at), trialEndsAt: Number(r.trial_ends_at), interval: r.interval ?? null }));
  return { ...revenueQuality(facts, Number(totals[0]?.n ?? 0), Number(totals[0]?.refunded ?? 0)), windowDays: 90 };
}

async function engagement(now: number) {
  const ev = realEvents();
  const since = now - 28 * DAY;
  const [children, modes, extras] = await Promise.all([
    // One row per child who answered in the last 28 days; ids are not returned.
    query<{ d7: number; d28: number; ms: number }>(
      `SELECT COUNT(DISTINCT CASE WHEN t > ${now - WEEK} THEN CAST(t / ${DAY} AS INTEGER) END) AS d7,
         COUNT(DISTINCT CAST(t / ${DAY} AS INTEGER)) AS d28,
         SUM(MIN(MAX(COALESCE(json_extract(data, '$.ms'), 0), 0), ${MS_CAP})) AS ms
       FROM events WHERE t > ? AND t <= ? AND json_extract(data, '$.type') = 'answer' AND ${ev.sql}
       GROUP BY profile_id`,
      [since, now, ...ev.args],
    ),
    query<{ mode: string | null; n: number }>(
      `SELECT json_extract(data, '$.mode') AS mode, COUNT(*) AS n FROM events
       WHERE t > ? AND t <= ? AND json_extract(data, '$.type') = 'answer' AND ${ev.sql} GROUP BY mode`,
      [since, now, ...ev.args],
    ),
    query<{ type: string; n: number }>(
      `SELECT json_extract(data, '$.type') AS type, COUNT(*) AS n FROM events
       WHERE t > ? AND t <= ? AND json_extract(data, '$.type') IN ('story', 'play') AND ${ev.sql} GROUP BY type`,
      [since, now, ...ev.args],
    ),
  ]);
  const activity: ChildActivity[] = children.map((c) => ({ days7: Number(c.d7), days28: Number(c.d28), ms28: Number(c.ms ?? 0) }));
  const counts: Record<string, number> = {};
  for (const m of modes) if (m.mode) counts[m.mode] = Number(m.n);
  for (const x of extras) counts[x.type === "play" ? "game" : x.type] = Number(x.n);
  return { ...engagementDepth(activity, counts), windowDays: 28 };
}

async function teachers(now: number) {
  const real = realFamilies();
  const since = now - 90 * DAY;
  const [steps, classes] = await Promise.all([
    query<Record<string, number | null>>(
      `SELECT COUNT(*) AS signed_up,
         SUM(CASE WHEN has_class THEN 1 ELSE 0 END) AS made_class,
         SUM(CASE WHEN has_students THEN 1 ELSE 0 END) AS students,
         SUM(CASE WHEN practised THEN 1 ELSE 0 END) AS practised,
         SUM(CASE WHEN assigned THEN 1 ELSE 0 END) AS assigned
       FROM (
         SELECT
           EXISTS (SELECT 1 FROM classes c WHERE c.owner_parent_id = p.id) AS has_class,
           EXISTS (SELECT 1 FROM classes c WHERE c.owner_parent_id = p.id AND (EXISTS (SELECT 1 FROM students s WHERE s.class_id = c.id) OR EXISTS (SELECT 1 FROM class_members m WHERE m.class_id = c.id))) AS has_students,
           EXISTS (SELECT 1 FROM classes c JOIN (SELECT class_id, profile_id FROM students UNION SELECT class_id, profile_id FROM class_members) m ON m.class_id = c.id
                   WHERE c.owner_parent_id = p.id AND EXISTS (SELECT 1 FROM events e WHERE e.profile_id = m.profile_id AND json_extract(e.data, '$.type') = 'answer')) AS practised,
           EXISTS (SELECT 1 FROM classes c JOIN class_assignments a ON a.class_id = c.id WHERE c.owner_parent_id = p.id) AS assigned
         FROM parents p JOIN families f ON f.id = p.family_id
         WHERE p.role = 'parent' AND p.account_type = 'teacher' AND p.created_at >= ? AND ${real.sql}
       )`,
      [since, ...real.args],
    ),
    // Per open class: its students (class-made and parent-linked) and how many answered in the last 7 days.
    query<{ students: number; active7: number }>(
      `SELECT COUNT(*) AS students,
         SUM(CASE WHEN EXISTS (SELECT 1 FROM events e WHERE e.profile_id = m.profile_id AND e.t > ? AND json_extract(e.data, '$.type') = 'answer') THEN 1 ELSE 0 END) AS active7
       FROM classes c
       JOIN (SELECT class_id, profile_id FROM students UNION SELECT class_id, profile_id FROM class_members) m ON m.class_id = c.id
       JOIN parents o ON o.id = c.owner_parent_id JOIN families f ON f.id = o.family_id
       WHERE c.closed_at IS NULL AND ${real.sql}
       GROUP BY c.id`,
      [now - WEEK, ...real.args],
    ),
  ]);
  const r = steps[0] ?? {};
  const counts = ["signed_up", "made_class", "students", "practised", "assigned"].map((k) => Number(r[k] ?? 0));
  const activity: ClassActivity[] = classes.map((c) => ({ students: Number(c.students), active7: Number(c.active7 ?? 0) }));
  return { steps: teacherFunnel(counts), classes: classActivity(activity), windowDays: 90 };
}

async function content(now: number) {
  const ev = realEvents();
  const since = now - 90 * DAY;
  const [answers, asks, reports] = await Promise.all([
    query<{ unit: string; n: number; ok: number; revealed: number; families: number }>(
      `SELECT json_extract(data, '$.unit') AS unit, COUNT(*) AS n, SUM(COALESCE(json_extract(data, '$.correct'), 0)) AS ok,
         SUM(COALESCE(json_extract(data, '$.revealed'), 0)) AS revealed, COUNT(DISTINCT family_id) AS families
       FROM events WHERE t > ? AND json_extract(data, '$.type') = 'answer' AND json_extract(data, '$.unit') IS NOT NULL
         AND json_extract(data, '$.unit') NOT LIKE '%/facts' AND ${ev.sql} GROUP BY unit`,
      [since, ...ev.args],
    ),
    query<{ unit: string; n: number }>(
      `SELECT json_extract(data, '$.unit') AS unit, COUNT(*) AS n FROM events
       WHERE t > ? AND json_extract(data, '$.type') = 'help' AND json_extract(data, '$.unit') IS NOT NULL AND ${ev.sql} GROUP BY unit`,
      [since, ...ev.args],
    ),
    query<{ unit_key: string; n: number }>("SELECT unit_key, COUNT(*) AS n FROM question_reports WHERE created_at > ? GROUP BY unit_key", [since]),
  ]);
  const help = new Map(asks.map((a) => [String(a.unit), Number(a.n)]));
  const rep = new Map(reports.map((r) => [String(r.unit_key), Number(r.n)]));
  const units: UnitStat[] = answers.map((a) => ({
    unit: String(a.unit),
    answers: Number(a.n),
    firstTry: Number(a.ok ?? 0),
    revealed: Number(a.revealed ?? 0),
    families: Number(a.families),
    helpAsks: help.get(String(a.unit)) ?? 0,
    reports: rep.get(String(a.unit)) ?? 0,
  }));
  // A unit asked about or reported but with few answers still shows in the second list.
  for (const [unit, n] of help) if (!units.some((u) => u.unit === unit)) units.push({ unit, answers: 0, firstTry: 0, revealed: 0, families: 0, helpAsks: n, reports: rep.get(unit) ?? 0 });
  return { hardest: contentGaps(units), flagged: mostFlagged(units), windowDays: 90 };
}

async function sources(now: number) {
  const real = realFamilies();
  const rows = await query<Record<string, string | number | null>>(
    `SELECT f.country, p.google_sub IS NOT NULL AS google, p.password_hash = '!' AS no_password,
       f.referred_by IS NOT NULL AS referred,
       EXISTS (SELECT 1 FROM code_redemptions r WHERE r.family_id = f.id) AS code,
       (SELECT json_extract(pr.data, '$.framework') FROM profiles pr WHERE pr.family_id = f.id AND COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0 ORDER BY pr.updated_at LIMIT 1) AS framework,
       EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id) AS practised,
       ${PAID} AS paid
     FROM families f JOIN parents p ON p.family_id = f.id AND p.role = 'parent' AND p.id = (SELECT MIN(p2.id) FROM parents p2 WHERE p2.family_id = f.id AND p2.role = 'parent')
     WHERE ${real.sql} AND f.created_at >= ? AND NOT (p.account_type = 'teacher' AND NOT EXISTS (SELECT 1 FROM profiles pr WHERE pr.family_id = f.id))`,
    [...real.args, now - 90 * DAY],
  );
  const facts: SignupFact[] = rows.map((r) => ({
    path: (Number(r.google) ? "google" : Number(r.no_password) ? "email-only" : "password") as SignupPath,
    referred: Boolean(Number(r.referred)),
    code: Boolean(Number(r.code)),
    country: toCountryCode(r.country),
    framework: r.framework == null ? null : String(r.framework),
    practised: Boolean(Number(r.practised)),
    paid: Boolean(Number(r.paid)),
  }));
  return { ...signupSources(facts), windowDays: 90 };
}

/** One part of the insights. */
export async function insight(part: InsightPart, now = Date.now()) {
  switch (part) {
    case "trial":
      return { generatedAt: now, ...(await trial(now)) };
    case "revenue":
      return { generatedAt: now, ...(await revenue(now)) };
    case "engagement":
      return { generatedAt: now, ...(await engagement(now)) };
    case "teachers":
      return { generatedAt: now, ...(await teachers(now)) };
    case "content":
      return { generatedAt: now, ...(await content(now)) };
    case "sources":
      return { generatedAt: now, ...(await sources(now)) };
  }
}
