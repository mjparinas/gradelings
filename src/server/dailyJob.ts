import "server-only";
import { loadChildData, loadChildReport, familyProfileIds } from "@/server/reportData";
import { getUnitRef, loadGrade } from "@/content";
import { assignedAt, assignmentDue, assignmentGoals, assignmentKeys, assignmentStarts, classGrades, classProgressAndMisses, type ClassRow } from "@/server/classroom";
import { classDigestLines } from "@/lib/classDigest";
import { isYearReviewEmailDay, reviewYearOf, schoolYearStart, yearReview, type YearReviewChild } from "@/lib/yearReview";
import { unsubscribeToken } from "@/server/auth";
import { toCountryCode } from "@/lib/country";
import { query, run } from "@/server/db";
import { sendEmail } from "@/server/email";
import { classDigestEmail, inactiveClassEmail, reminderEmail, yearReviewEmail, trialEndingEmail, trialRecapEmail, weeklyEmail, type ReminderChild, type TrialChild, type WeeklyChild } from "@/server/emailTemplates";
import { sendDigest } from "@/server/alerts";
import { runAutomations } from "@/server/automations";
import { sendConsentFollowUps } from "@/server/consent";
import { getSetting, setSetting } from "@/server/payments";
import { deleteInactiveClass, pruneOldCodes } from "@/server/students";
import { pruneGuests } from "@/server/guests";
import { pruneLive } from "@/server/live";
import { isFlagOn } from "@/server/flags";
import type { Profile } from "@/lib/model";
import { schoolYearLines } from "@/lib/schoolYear";

// The daily job (src/app/api/cron/weekly/route.ts), split into phases that can stop and carry on.
//
// A request has `maxDuration` seconds. Every email the job sends is already marked on its row when it goes (trial_recap_at,
// last_weekly_at ...), so a second pass never repeats one; what was missing was a way to stop cleanly when the time is
// nearly up and to be called again. Now each phase stops starting new work once the time budget is spent, the phases
// finished today are remembered, and a run with `resume` carries on with the rest. vercel.json calls the route once at
// 15:00 UTC (a fresh run) and hourly after that with `?resume=1`, which does nothing once the day's work is done.

const DAY = 86_400_000;
const YEAR = 365.25 * DAY;
const MONTH = YEAR / 12;
const INACTIVE_WARNING_AGE = (11 / 12) * YEAR;
const INACTIVE_DELETE_AGE = YEAR;
/** The route's `maxDuration` is 300 s; stop starting work at 240 s so the last email, the bookkeeping and the response fit. */
export const DEFAULT_BUDGET_MS = 240_000;
/** A weekly report that didn't finish on Sunday may still be finished on the next two days, and not after that. */
const WEEKLY_CATCH_UP_DAYS = 2;
/** After this many runs in one day that still left work undone, the admins are told. */
export const STUCK_AFTER_RUNS = 4;

export const PHASES = ["cleanup", "recaps", "trial-notices", "reminders", "weekly", "year-review", "class-digest", "consent", "automations", "digest"] as const;
export type Phase = (typeof PHASES)[number];

export interface DailyState {
  /** The UTC day (YYYY-MM-DD) the phases below belong to. */
  day: string;
  done: Phase[];
  /** Runs started on this day, the first one included. */
  runs: number;
}

export interface WeeklyState {
  /** The Sunday (YYYY-MM-DD) whose report this is. */
  sunday: string;
  done: boolean;
}

const STATE_KEY = "job-state:daily";
const WEEKLY_KEY = "job-state:weekly";

export const utcDay = (t: number) => new Date(t).toISOString().slice(0, 10);

async function readState<T>(key: string): Promise<T | null> {
  try {
    const raw = await getSetting(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export const loadDailyState = () => readState<DailyState>(STATE_KEY);
export const loadWeeklyState = () => readState<WeeklyState>(WEEKLY_KEY);

/** True when every phase has been done for the UTC day of `now`: a `resume` call has nothing to do. */
export async function dailyFinished(now = Date.now()): Promise<boolean> {
  const state = await loadDailyState();
  return Boolean(state && state.day === utcDay(now) && PHASES.every((p) => state.done.includes(p)));
}

export interface DailyResult {
  trialNotices: number;
  trialRecaps: number;
  weekly: number;
  reminders: number;
  yearReviews: number;
  classDigests: number;
  inactiveClassWarnings: number;
  inactiveClassesDeleted: number;
  studentsDeleted: number;
  consentFollowUps: number;
  automations: Record<string, { sent: number; failed: number }>;
  digest: number;
  /** False when the time ran out first: call again with `resume`. */
  complete: boolean;
  /** The phases still to do, in order. Empty when complete. */
  remaining: Phase[];
  /** This run is the fourth or later of the day and the work still isn't finished. */
  stuck?: boolean;
}

export interface DailyOptions {
  origin: string;
  now?: number;
  /** True to carry on with today's unfinished work (or do nothing if it is finished). False starts the day's work over. */
  resume?: boolean;
  /** How long this run may start new work for. */
  budgetMs?: number;
}

interface Ctx {
  origin: string;
  now: number;
  result: DailyResult;
  /** True once the budget is spent. */
  timeUp: () => boolean;
  /** Items handled so far in this run. */
  worked: number;
  /** True when the time is up and this run has already handled something: stop starting new work. A run always handles at least one item, so every call makes progress. */
  over: () => boolean;
}

/** Runs (or carries on) the day's work. Throws if a phase throws; the phases finished before that stay recorded. */
export async function runDaily(opts: DailyOptions): Promise<DailyResult> {
  const now = opts.now ?? Date.now();
  const clock = Date.now();
  const budget = opts.budgetMs ?? DEFAULT_BUDGET_MS;
  const today = utcDay(now);

  const result: DailyResult = {
    trialNotices: 0,
    trialRecaps: 0,
    weekly: 0,
    reminders: 0,
    yearReviews: 0,
    classDigests: 0,
    inactiveClassWarnings: 0,
    inactiveClassesDeleted: 0,
    studentsDeleted: 0,
    consentFollowUps: 0,
    automations: {},
    digest: 0,
    complete: false,
    remaining: [],
  };

  const saved = await loadDailyState();
  const carrying = Boolean(opts.resume && saved && saved.day === today);
  const state: DailyState = carrying ? { ...saved!, done: [...saved!.done] } : { day: today, done: [], runs: 0 };
  state.runs++;
  await setSetting(STATE_KEY, JSON.stringify(state));

  const ctx: Ctx = {
    origin: opts.origin,
    now,
    result,
    timeUp: () => Date.now() - clock >= budget,
    worked: 0,
    over: () => ctx.worked > 0 && ctx.timeUp(),
  };
  let started = false;
  for (const phase of PHASES) {
    if (state.done.includes(phase)) continue;
    // Whatever the budget, a run starts its first phase.
    if (started && ctx.timeUp()) break;
    started = true;
    const finished = await PHASE_RUNNERS[phase](ctx);
    if (!finished) break;
    state.done.push(phase);
    await setSetting(STATE_KEY, JSON.stringify(state));
  }
  result.remaining = PHASES.filter((p) => !state.done.includes(p));
  result.complete = result.remaining.length === 0;
  if (!result.complete && state.runs >= STUCK_AFTER_RUNS) result.stuck = true;
  return result;
}

const PHASE_RUNNERS: Record<Phase, (ctx: Ctx) => Promise<boolean>> = {
  cleanup,
  recaps: trialRecaps,
  "trial-notices": trialNotices,
  reminders: practiceReminders,
  weekly: weeklyReports,
  "year-review": yearReviews,
  "class-digest": classDigests,
  consent: async (ctx) => {
    ctx.result.consentFollowUps = await sendConsentFollowUps(ctx.origin, ctx.now).catch((e: Error) => (console.error("[consent] follow-ups failed", e.message), 0));
    return true;
  },
  // Automatic nudges the owner switched on in the admin panel, then the owner's morning digest. Each is recorded as
  // done once, so a resumed run never sends either twice.
  automations: async (ctx) => {
    ctx.result.automations = await runAutomations(ctx.origin, ctx.now);
    return true;
  },
  digest: async (ctx) => {
    ctx.result.digest = await sendDigest(ctx.origin, ctx.now).catch((e: Error) => (console.error("[digest] failed", e.message), 0));
    return true;
  },
};

// Warn teachers after 11 months without a sign-in, delete the classes a warning was sent for a month ago, and clear what is only kept briefly.
async function cleanup(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  // Only mark a warning as sent when email delivery succeeds, so a missing mail provider cannot silently bypass the warning.
  const inactiveForWarning = await query<{ id: string; name: string; email: string; owner_parent_id: string; delete_at: number }>(
    `SELECT c.id, c.name, p.email, c.owner_parent_id, c.last_activity_at + ? AS delete_at
     FROM classes c JOIN parents p ON p.id = c.owner_parent_id
     WHERE c.closed_at IS NULL AND c.inactive_warning_at IS NULL AND p.email_verified_at IS NOT NULL
       AND c.last_activity_at <= ?`,
    [INACTIVE_DELETE_AGE, now - INACTIVE_WARNING_AGE],
  );
  for (const cls of inactiveForWarning) {
    if (ctx.over()) return false;
    ctx.worked++;
    // Give already-expired classes a full month's notice when this policy is first deployed.
    const deleteAt = Math.max(Number(cls.delete_at), now + MONTH);
    const deleteDate = new Date(deleteAt).toISOString().slice(0, 10);
    const claimed = await run(
      `UPDATE classes SET inactive_warning_at = ? WHERE id = ? AND closed_at IS NULL
         AND inactive_warning_at IS NULL AND last_activity_at <= ?`,
      [now, cls.id, now - INACTIVE_WARNING_AGE],
    );
    if (!claimed) continue;
    const sent = await sendEmail(inactiveClassEmail(cls.email, origin, cls.name, deleteDate));
    if (!sent.ok) {
      // Let tomorrow's run retry, unless a sign-in already reset the inactivity window.
      await run("UPDATE classes SET inactive_warning_at = NULL WHERE id = ? AND inactive_warning_at = ? AND last_activity_at <= ?", [cls.id, now, now - INACTIVE_WARNING_AGE]);
    } else {
      result.inactiveClassWarnings++;
      // Co-teachers are told too, since their sign-in also keeps the class (best effort).
      const others = await query<{ email: string }>("SELECT p.email FROM class_teachers t JOIN parents p ON p.id = t.parent_id WHERE t.class_id = ? AND p.email_verified_at IS NOT NULL", [cls.id]);
      for (const t of others) await sendEmail(inactiveClassEmail(t.email, origin, cls.name, deleteDate)).catch(() => {});
    }
  }

  // Only delete after a warning was successfully sent and the full 12-month period has elapsed.
  const inactiveToDelete = await query<{ id: string }>(
    `SELECT id FROM classes WHERE closed_at IS NULL AND inactive_warning_at IS NOT NULL
       AND inactive_warning_at <= ? AND last_activity_at <= ?`,
    [now - MONTH, now - INACTIVE_DELETE_AGE],
  );
  for (const cls of inactiveToDelete) {
    if (ctx.over()) return false;
    ctx.worked++;
    const deleted = await deleteInactiveClass(cls.id, now - INACTIVE_DELETE_AGE, now - MONTH);
    if (deleted.deleted) {
      result.studentsDeleted += deleted.students;
      result.inactiveClassesDeleted++;
    }
  }

  // Live class questions and their answers are kept for a day at most.
  await pruneLive(now);
  // Guest devices not seen in 35 days are forgotten.
  await pruneGuests(now);
  // Login codes replaced in the last few minutes can be undone; older ones are forgotten.
  await pruneOldCodes(now);
  return true;
}

/** What each child did during the trial (first name and totals only). */
async function trialChildren(familyId: string, now: number): Promise<TrialChild[]> {
  const out: TrialChild[] = [];
  for (const id of await familyProfileIds(familyId)) {
    const r = await loadChildReport(familyId, id, 30, now);
    if (!r) continue;
    const t = r.report.totals;
    out.push({ name: r.profile.name, answers: t.answers, activeDays: t.activeDays, minutes: Math.round(t.minutes), strength: r.report.strengths[0]?.ref.unit.title });
  }
  return out;
}

// Mid-trial recap, once, 4 to 10 days before the trial ends, only when a child has practised.
async function trialRecaps(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  const recaps = await query<{ id: string; email: string; family_id: string; trial_ends_at: number; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.trial_ends_at, f.country FROM parents p JOIN families f ON f.id = p.family_id
     WHERE p.email_verified_at IS NOT NULL AND p.trial_recap_at IS NULL AND p.trial_notice_at IS NULL AND f.plan = 'trial'
       AND f.subscription_status IS NULL AND COALESCE(f.access_until, 0) < f.trial_ends_at AND f.trial_ends_at > ? AND f.trial_ends_at <= ?`,
    [now + 3 * DAY, now + 10 * DAY],
  );
  for (const t of recaps) {
    if (ctx.over()) return false;
    ctx.worked++;
    try {
      const children = await trialChildren(t.family_id, now);
      if (!children.some((c) => c.answers > 0)) continue;
      const daysLeft = Math.max(1, Math.ceil((Number(t.trial_ends_at) - now) / DAY));
      const sent = await sendEmail(trialRecapEmail(t.email, origin, daysLeft, children, toCountryCode(t.country)));
      if (sent.ok) {
        await run("UPDATE parents SET trial_recap_at = ? WHERE id = ?", [now, t.id]);
        result.trialRecaps++;
      }
    } catch (e) {
      console.error("[trial recap] failed for one family", (e as Error).message);
    }
  }
  return true;
}

// Trial ending within 3 days, not subscribed, not told yet.
async function trialNotices(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  const trials = await query<{ id: string; email: string; family_id: string; trial_ends_at: number; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.trial_ends_at, f.country FROM parents p JOIN families f ON f.id = p.family_id
     WHERE p.email_verified_at IS NOT NULL AND p.trial_notice_at IS NULL AND f.plan = 'trial'
       AND f.subscription_status IS NULL AND COALESCE(f.access_until, 0) < f.trial_ends_at AND f.trial_ends_at > ? AND f.trial_ends_at <= ?`,
    [now, now + 3 * DAY],
  );
  for (const t of trials) {
    if (ctx.over()) return false;
    ctx.worked++;
    const daysLeft = Math.max(1, Math.ceil((Number(t.trial_ends_at) - now) / DAY));
    const children = await trialChildren(t.family_id, now).catch(() => []);
    const sent = await sendEmail(trialEndingEmail(t.email, origin, daysLeft, children, toCountryCode(t.country)));
    if (sent.ok) {
      await run("UPDATE parents SET trial_notice_at = ? WHERE id = ?", [now, t.id]);
      result.trialNotices++;
    }
  }
  return true;
}

// A child who practised in the last 30 days but not in the last 3 gets one friendly nudge to the parent.
async function practiceReminders(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  const nudgeParents = await query<{ id: string; email: string; family_id: string; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.country FROM parents p LEFT JOIN families f ON f.id = p.family_id
     WHERE p.practice_reminders = 1 AND p.email_verified_at IS NOT NULL AND (p.last_nudge_at IS NULL OR p.last_nudge_at < ?)`,
    [now - 6 * DAY],
  );
  for (const p of nudgeParents) {
    if (ctx.over()) return false;
    ctx.worked++;
    try {
      const quiet: ReminderChild[] = [];
      for (const id of await familyProfileIds(p.family_id)) {
        const r = await loadChildReport(p.family_id, id, 30, now);
        if (!r) continue;
        const days = r.report.days;
        const last = days.findLastIndex((d) => d.answers > 0);
        const daysQuiet = last < 0 ? -1 : days.length - 1 - last;
        if (daysQuiet >= 3) quiet.push({ name: r.profile.name, daysQuiet });
      }
      if (!quiet.length) continue;
      const sent = await sendEmail(reminderEmail(p.email, origin, quiet, await unsubscribeToken(p.id), toCountryCode(p.country)));
      if (sent.ok) {
        await run("UPDATE parents SET last_nudge_at = ? WHERE id = ?", [now, p.id]);
        result.reminders++;
      }
    } catch (e) {
      console.error("[reminders] failed for one family", (e as Error).message);
    }
  }
  return true;
}

/** The Sunday (YYYY-MM-DD) on or before a time, and how many days ago it was. */
export function lastSunday(t: number): { sunday: string; daysSince: number } {
  const daysSince = new Date(t).getUTCDay();
  return { sunday: utcDay(t - daysSince * DAY), daysSince };
}

// On Sundays: the weekly report to parents who opted in (with a month summary on the first Sunday of the month).
// A Sunday that ran out of time keeps its report open, and the next runs (and Monday's and Tuesday's) finish it.
async function weeklyReports(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  const { sunday, daysSince } = lastSunday(now);
  const state = await loadWeeklyState();
  if (daysSince === 0) {
    // Sundays always look for parents who are due (a second look finds nobody: last_weekly_at is set when one is sent).
    await setSetting(WEEKLY_KEY, JSON.stringify({ sunday, done: false } satisfies WeeklyState));
  } else if (!state || state.sunday !== sunday || state.done || daysSince > WEEKLY_CATCH_UP_DAYS) {
    return true; // not a Sunday, and no Sunday report is waiting to be finished
  }

  const parents = await query<{ id: string; email: string; family_id: string; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.country FROM parents p LEFT JOIN families f ON f.id = p.family_id
     WHERE p.weekly_report = 1 AND p.email_verified_at IS NOT NULL AND (p.last_weekly_at IS NULL OR p.last_weekly_at < ?)`,
    [now - 5 * DAY],
  );
  // On the first Sunday of the month the weekly email also carries a short month summary.
  const firstSunday = new Date(`${sunday}T00:00:00Z`).getUTCDate() <= 7;
  for (const p of parents) {
    if (ctx.over()) return false;
    ctx.worked++;
    // One family's bad data must never stop everyone else's email.
    try {
      const children: WeeklyChild[] = [];
      const profiles: Profile[] = [];
      for (const id of await familyProfileIds(p.family_id)) {
        const r = await loadChildReport(p.family_id, id, 7, now);
        if (!r) continue;
        profiles.push(r.profile);
        const t = r.report.totals;
        const month = firstSunday ? (await loadChildReport(p.family_id, id, 30, now))?.report : undefined;
        children.push({
          name: r.profile.name,
          month: month && { minutes: Math.round(month.totals.minutes), answers: month.totals.answers, previousAnswers: month.previous.answers, activeDays: month.totals.activeDays },
          minutes: Math.round(t.minutes),
          answers: t.answers,
          accuracy: t.answers ? Math.round((t.correct / t.answers) * 100) : null,
          strength: r.report.strengths[0]?.ref.unit.title,
          next: r.report.needs[0]?.ref.unit.title,
        });
      }
      if (!children.length) continue;
      const school = (await isFlagOn("school-year", p.family_id)) ? schoolYearLines(profiles, now) : [];
      const sent = await sendEmail(weeklyEmail(p.email, origin, children, await unsubscribeToken(p.id), toCountryCode(p.country), school));
      if (sent.ok) {
        await run("UPDATE parents SET last_weekly_at = ? WHERE id = ?", [now, p.id]);
        result.weekly++;
      }
    } catch (e) {
      console.error("[weekly] failed for one family", (e as Error).message);
    }
  }
  await setSetting(WEEKLY_KEY, JSON.stringify({ sunday, done: true } satisfies WeeklyState));
  return true;
}

// From June 15 to June 30: the year in review, once per school year, to parents with progress emails on. Families whose
// children didn't practise this school year are marked too, so they aren't looked at again every day.
async function yearReviews(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  if (!isYearReviewEmailDay(now)) return true;
  const year = reviewYearOf(now);
  const from = schoolYearStart(year);
  const parents = await query<{ id: string; email: string; family_id: string; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.country FROM parents p LEFT JOIN families f ON f.id = p.family_id
     WHERE p.weekly_report = 1 AND p.email_verified_at IS NOT NULL AND COALESCE(p.year_review_year, 0) < ?`,
    [year],
  );
  for (const p of parents) {
    if (ctx.over()) return false;
    ctx.worked++;
    try {
      if (!(await isFlagOn("year-in-review", p.family_id))) continue;
      const children: YearReviewChild[] = [];
      for (const id of await familyProfileIds(p.family_id)) {
        const data = await loadChildData(p.family_id, id, 7, now);
        if (!data || !data.events.some((e) => e.type === "answer" && e.t >= from)) continue;
        const r = yearReview(data.events, now);
        children.push({
          name: data.profile.name,
          daysPractised: r.daysPractised,
          minutes: r.minutes,
          answers: r.answers,
          grown: r.grown.length,
          // Units from a grade the child has left aren't loaded; the email names only the ones it can.
          grownTitles: r.grown.flatMap((g) => getUnitRef(g.key, data.profile.framework)?.unit.title ?? []).slice(0, 3),
        });
      }
      if (children.length) {
        const sent = await sendEmail(yearReviewEmail(p.email, origin, children, await unsubscribeToken(p.id), toCountryCode(p.country), year));
        if (!sent.ok) continue;
        result.yearReviews++;
      }
      await run("UPDATE parents SET year_review_year = ? WHERE id = ?", [year, p.id]);
    } catch (e) {
      console.error("[year review] failed for one family", (e as Error).message);
    }
  }
  return true;
}

const DIGEST_DAYS = [1, 2]; // Monday, and Tuesday to finish a Monday that ran out of time (UTC)

// On Mondays: the class email to teachers who turned it on, one per teacher covering every class they teach.
async function classDigests(ctx: Ctx): Promise<boolean> {
  const { now, origin, result } = ctx;
  if (!DIGEST_DAYS.includes(new Date(now).getUTCDay())) return true;
  const teachers = await query<{ id: string; email: string; family_id: string; country: string | null }>(
    `SELECT p.id, p.email, p.family_id, f.country FROM parents p LEFT JOIN families f ON f.id = p.family_id
     WHERE p.class_digest = 1 AND p.email_verified_at IS NOT NULL AND (p.last_class_digest_at IS NULL OR p.last_class_digest_at < ?)`,
    [now - 5 * DAY],
  );
  for (const t of teachers) {
    if (ctx.over()) return false;
    ctx.worked++;
    try {
      if (!(await isFlagOn("teacher-monday-email", t.family_id))) continue;
      const classes = await query<ClassRow>(
        `SELECT * FROM classes WHERE closed_at IS NULL AND (owner_parent_id = ? OR id IN (SELECT class_id FROM class_teachers WHERE parent_id = ?)) ORDER BY created_at`,
        [t.id, t.id],
      );
      const sections: { id: string; lines: string[] }[] = [];
      for (const cls of classes) {
        const keys = await assignmentKeys(cls.id);
        if (!keys.length) continue;
        const { students } = await classProgressAndMisses(cls.id);
        if (!students.length) continue;
        for (const g of classGrades(cls)) await loadGrade(g, cls.framework);
        const unitName = (key: string) => getUnitRef(key, cls.framework)?.unit.title ?? key;
        const lines = classDigestLines(
          { name: cls.name, students, assignments: keys, due: await assignmentDue(cls.id), goal: await assignmentGoals(cls.id), assignedAt: await assignedAt(cls.id), startsAt: await assignmentStarts(cls.id) },
          unitName,
          now,
        );
        if (lines.length) sections.push({ id: cls.id, lines });
      }
      if (sections.length) {
        const path = sections.length === 1 ? `/teachers/#/class/${encodeURIComponent(sections[0].id)}` : "/teachers/";
        const sent = await sendEmail(classDigestEmail(t.email, origin, sections.map((x) => x.lines), await unsubscribeToken(t.id), path, toCountryCode(t.country)));
        if (!sent.ok) continue;
        result.classDigests++;
      }
      // Marked even with nothing to say, so Tuesday's catch-up doesn't read every class again.
      await run("UPDATE parents SET last_class_digest_at = ? WHERE id = ?", [now, t.id]);
    } catch (e) {
      console.error("[class digest] failed for one teacher", (e as Error).message);
    }
  }
  return true;
}
