// Admin insights: how the trial turns into payment, what happens after it, revenue quality, how deeply children
// practise, the teacher funnel, weak spots in the content and where sign-ups come from. Pure functions over rows the
// server reads (src/server/adminInsights.ts), so the arithmetic is tested without a database. Counts and rates only:
// nothing here carries a child's name, and a group smaller than `MIN_GROUP` shows no rate.

const DAY = 86_400_000;

/** A group smaller than this shows its count but no rate, so one family can't read as a trend. */
export const MIN_GROUP = 5;

/** Admin accounts and Melvin's own test account never count (`TEST_ACCOUNT_EMAILS` in brand.ts plus ADMIN_EMAILS and SUPPORT_EMAILS). */
export const rate = (n: number, of: number): number | null => (of >= MIN_GROUP ? n / of : null);

export const median = (xs: number[]): number | null => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
};

// ---------- Trial to paid (curve) and after the trial ----------

/** A family whose free trial has ended. */
export interface TrialFamily {
  createdAt: number;
  trialEndsAt: number;
  /** Distinct days with an answer in the 30 days after signing up. */
  practiceDays: number;
  /** More than the free units of some course started: something would lock when the trial ends. */
  hadLockedUnits: boolean;
  /** Any practice in the last 7 days of the trial. */
  practisedLastWeek: boolean;
  /** Any practice in the 14 days before now, after the trial ended. */
  practisingNow: boolean;
  /** Has paid (a payment not refunded in full, or a live subscription). */
  paid: boolean;
  /** Has free access from a code, so the trial ending changed nothing. */
  onCode: boolean;
}

export const PRACTICE_BUCKETS = [
  { id: "0", label: "No practice", min: 0, max: 0 },
  { id: "1-3", label: "1 to 3 days", min: 1, max: 3 },
  { id: "4-10", label: "4 to 10 days", min: 4, max: 10 },
  { id: "11+", label: "11 or more days", min: 11, max: Infinity },
] as const;

export interface Bucket {
  id: string;
  label: string;
  families: number;
  paid: number;
  rate: number | null;
}

const bucketOf = (id: string, label: string, rows: { paid: boolean }[]): Bucket => {
  const paid = rows.filter((r) => r.paid).length;
  return { id, label, families: rows.length, paid, rate: rate(paid, rows.length) };
};

/** Families whose trial ended, minus those with code access, grouped by days practised in their first 30 days. */
export function trialCurve(families: TrialFamily[]): { overall: Bucket; byPractice: Bucket[]; byLock: Bucket[] } {
  const real = families.filter((f) => !f.onCode);
  return {
    overall: bucketOf("all", "All trials that ended", real),
    byPractice: PRACTICE_BUCKETS.map((b) =>
      bucketOf(b.id, b.label, real.filter((f) => f.practiceDays >= b.min && f.practiceDays <= b.max)),
    ),
    byLock: [
      bucketOf("locked", "Started more than the free units", real.filter((f) => f.hadLockedUnits)),
      bucketOf("not-locked", "Stayed within the free units", real.filter((f) => !f.hadLockedUnits)),
    ],
  };
}

/** Trial-to-paid for each sign-up week, newest first, over the families whose trial has ended. */
export function trialByWeek(families: TrialFamily[], now: number, weeks = 8): { label: string; families: number; paid: number; rate: number | null }[] {
  const rows = [];
  for (let i = 0; i < weeks; i++) {
    // Trials are 30 days, so the newest groups mostly haven't ended; only ended ones are in `families`.
    const to = now - i * 7 * DAY;
    const from = to - 7 * DAY;
    const inWeek = families.filter((f) => !f.onCode && f.createdAt >= from && f.createdAt < to);
    const paid = inWeek.filter((f) => f.paid).length;
    rows.push({ label: new Date(from).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" }), families: inWeek.length, paid, rate: rate(paid, inWeek.length) });
  }
  return rows;
}

export type AfterTrial = "paid" | "free-active" | "free-quiet" | "free-never";

/** Where a family stands now that its trial has ended. */
export const afterTrialState = (f: TrialFamily): AfterTrial | "code" => (f.onCode ? "code" : f.paid ? "paid" : f.practisingNow ? "free-active" : f.practisedLastWeek || f.practiceDays > 0 ? "free-quiet" : "free-never");

export interface AfterTrialReport {
  total: number;
  paid: number;
  freeActive: number;
  freeQuiet: number;
  freeNever: number;
  /** Of the families that kept practising on the free plan, how many had started more than the free units (so the plan limits them). */
  activeAndLimited: number;
}

export function afterTrial(families: TrialFamily[]): AfterTrialReport {
  const r: AfterTrialReport = { total: 0, paid: 0, freeActive: 0, freeQuiet: 0, freeNever: 0, activeAndLimited: 0 };
  for (const f of families) {
    const s = afterTrialState(f);
    if (s === "code") continue;
    r.total++;
    if (s === "paid") r.paid++;
    else if (s === "free-active") {
      r.freeActive++;
      if (f.hadLockedUnits) r.activeAndLimited++;
    } else if (s === "free-quiet") r.freeQuiet++;
    else r.freeNever++;
  }
  return r;
}

// ---------- Revenue quality ----------

export interface FirstPayment {
  paidAt: number;
  trialEndsAt: number;
  interval: string | null;
}

export interface RevenueQuality {
  newCustomers: number;
  monthly: number;
  yearly: number;
  yearlyShare: number | null;
  /** Median days from the end of the trial to the first payment (negative: paid before it ended). */
  medianDaysAfterTrial: number | null;
  timing: { id: string; label: string; n: number }[];
  /** Payments in the window and how many were refunded in part or in full. */
  payments: number;
  refunded: number;
  refundRate: number | null;
}

export function revenueQuality(first: FirstPayment[], payments: number, refunded: number): RevenueQuality {
  const days = first.map((p) => Math.round((p.paidAt - p.trialEndsAt) / DAY));
  const inRange = (lo: number, hi: number) => days.filter((d) => d >= lo && d <= hi).length;
  const monthly = first.filter((p) => p.interval === "month").length;
  const yearly = first.filter((p) => p.interval === "year").length;
  return {
    newCustomers: first.length,
    monthly,
    yearly,
    yearlyShare: rate(yearly, monthly + yearly),
    medianDaysAfterTrial: median(days),
    timing: [
      { id: "during", label: "During the trial", n: inRange(-Infinity, 0) },
      { id: "week", label: "Within a week after", n: inRange(1, 7) },
      { id: "month", label: "8 to 30 days after", n: inRange(8, 30) },
      { id: "later", label: "More than 30 days after", n: inRange(31, Infinity) },
    ],
    payments,
    refunded,
    refundRate: rate(refunded, payments),
  };
}

// ---------- Engagement depth ----------

/** One child's practice, counted by the server (no name). */
export interface ChildActivity {
  /** Distinct days with an answer in the last 7 days. */
  days7: number;
  /** Distinct days with an answer in the last 28 days. */
  days28: number;
  /** Answer time in the last 28 days, each answer capped at a minute, in ms. */
  ms28: number;
}

export interface EngagementDepth {
  activeChildren: number;
  /** Of children who practised in the last 7 days, the share on 3 or more of those days. */
  regularShare: number | null;
  regular: number;
  active7: number;
  /** Average minutes on a day a child practised. */
  minutesPerActiveDay: number | null;
  /** Days practised in 28 days: how many children practised on 1 to 3, 4 to 9, 10 or more. */
  spread: { id: string; label: string; n: number }[];
  /** Answers by mode over the period, plus stories and games, as shares of everything. */
  modes: { id: string; label: string; n: number; share: number }[];
}

export const MODE_LABELS: Record<string, string> = {
  adventure: "Adventure",
  practice: "Practice",
  review: "Review",
  speed: "Speed Run",
  daily: "Daily Challenge",
  challenge: "Challenge",
  facts: "Math Facts",
  story: "Stories",
  game: "Arcade games",
};

export function engagementDepth(children: ChildActivity[], modeCounts: Record<string, number>): EngagementDepth {
  const active = children.filter((c) => c.days28 > 0);
  const active7 = children.filter((c) => c.days7 > 0);
  const regular = active7.filter((c) => c.days7 >= 3).length;
  const days = active.reduce((s, c) => s + c.days28, 0);
  const ms = active.reduce((s, c) => s + c.ms28, 0);
  const total = Object.values(modeCounts).reduce((s, n) => s + n, 0);
  return {
    activeChildren: active.length,
    regularShare: rate(regular, active7.length),
    regular,
    active7: active7.length,
    minutesPerActiveDay: days ? Math.round((ms / days / 60_000) * 10) / 10 : null,
    spread: [
      { id: "1-3", label: "1 to 3 days", n: active.filter((c) => c.days28 <= 3).length },
      { id: "4-9", label: "4 to 9 days", n: active.filter((c) => c.days28 >= 4 && c.days28 <= 9).length },
      { id: "10+", label: "10 or more days", n: active.filter((c) => c.days28 >= 10).length },
    ],
    modes: Object.entries(modeCounts)
      .filter(([, n]) => n > 0)
      .map(([id, n]) => ({ id, label: MODE_LABELS[id] ?? id, n, share: total ? n / total : 0 }))
      .sort((a, b) => b.n - a.n),
  };
}

// ---------- Teacher funnel ----------

export interface TeacherStep {
  id: string;
  label: string;
  count: number;
  ofStart: number;
  ofPrevious: number;
}

export const TEACHER_STEPS = [
  ["signed-up", "Signed up as a teacher"],
  ["class", "Made a class"],
  ["students", "Added or linked students"],
  ["practised", "A student practised"],
  ["assigned", "Assigned a unit"],
] as const;

export function teacherFunnel(counts: number[]): TeacherStep[] {
  return TEACHER_STEPS.map(([id, label], i) => ({
    id,
    label,
    count: counts[i] ?? 0,
    ofStart: counts[0] ? (counts[i] ?? 0) / counts[0] : 0,
    ofPrevious: i === 0 ? 1 : counts[i - 1] ? (counts[i] ?? 0) / counts[i - 1] : 0,
  }));
}

/** One open class: how many students it has and how many practised in the last 7 days. */
export interface ClassActivity {
  students: number;
  active7: number;
}

export function classActivity(classes: ClassActivity[]) {
  const withStudents = classes.filter((c) => c.students > 0);
  const students = withStudents.reduce((s, c) => s + c.students, 0);
  const active = withStudents.reduce((s, c) => s + c.active7, 0);
  return {
    classes: withStudents.length,
    students,
    active7: active,
    activeShare: rate(active, students),
    classesMostlyActive: withStudents.filter((c) => c.active7 * 2 >= c.students).length,
  };
}

// ---------- Content gaps ----------

export interface UnitStat {
  unit: string;
  answers: number;
  firstTry: number;
  revealed: number;
  families: number;
  helpAsks: number;
  reports: number;
}

export interface UnitGap extends UnitStat {
  accuracy: number;
  revealedRate: number;
}

/** Units with enough answers from enough families to mean something, hardest first. */
export function contentGaps(units: UnitStat[], limit = 15): UnitGap[] {
  return units
    .filter((u) => u.answers >= 40 && u.families >= 3)
    .map((u) => ({ ...u, accuracy: u.firstTry / u.answers, revealedRate: u.revealed / u.answers }))
    .sort((a, b) => a.accuracy - b.accuracy || b.answers - a.answers)
    .slice(0, limit);
}

/** Units asked about or reported most, whatever their accuracy. */
export function mostFlagged(units: UnitStat[], limit = 10): UnitStat[] {
  return units
    .filter((u) => u.helpAsks + u.reports > 0)
    .sort((a, b) => b.reports * 3 + b.helpAsks - (a.reports * 3 + a.helpAsks) || a.unit.localeCompare(b.unit))
    .slice(0, limit);
}

// ---------- Where sign-ups come from ----------

export type SignupPath = "google" | "email-only" | "password";

export interface SignupFact {
  path: SignupPath;
  referred: boolean;
  code: boolean;
  country: string;
  framework: string | null;
  practised: boolean;
  paid: boolean;
}

export interface SourceRow {
  id: string;
  label: string;
  signups: number;
  practised: number;
  paid: number;
  practisedRate: number | null;
  paidRate: number | null;
}

const sourceRow = (id: string, label: string, rows: SignupFact[]): SourceRow => {
  const practised = rows.filter((r) => r.practised).length;
  const paid = rows.filter((r) => r.paid).length;
  return { id, label, signups: rows.length, practised, paid, practisedRate: rate(practised, rows.length), paidRate: rate(paid, rows.length) };
};

export const PATH_LABELS: Record<SignupPath, string> = {
  google: "Continue with Google",
  "email-only": "Email only (Send me the reports)",
  password: "Email and password",
};

export function signupSources(facts: SignupFact[]) {
  const by = <K extends string>(key: (f: SignupFact) => K, labels: (k: K) => string): SourceRow[] => {
    const groups = new Map<K, SignupFact[]>();
    for (const f of facts) groups.set(key(f), [...(groups.get(key(f)) ?? []), f]);
    return [...groups.entries()].map(([k, rows]) => sourceRow(k, labels(k), rows)).sort((a, b) => b.signups - a.signups);
  };
  return {
    total: facts.length,
    paths: by((f) => f.path, (k) => PATH_LABELS[k]),
    channels: [
      sourceRow("referral", "Invited by a family", facts.filter((f) => f.referred)),
      sourceRow("code", "Used a redeem code", facts.filter((f) => f.code)),
      sourceRow("direct", "Neither", facts.filter((f) => !f.referred && !f.code)),
    ],
    countries: by((f) => f.country, (k) => (k === "US" ? "United States" : k === "CA" ? "Canada" : k)),
    regions: by((f) => f.framework ?? "none", (k) => (k === "none" ? "No child added yet" : k)).slice(0, 12),
  };
}
