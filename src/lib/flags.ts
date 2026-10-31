// Feature flags and A/B tests. The flags themselves are defined here, in code, so the admin panel can
// only switch things that exist; their on/off state, rollout and per-family overrides live in the
// database (`src/server/flags.ts`). Experiments are created in the admin panel; code reads a variant
// with `useVariant(key)` (kids' app) or `variantsFor` (server). Everything here is pure, so it can run on
// the server and be tested without a database.

export type FlagScope = "app" | "server";

export interface FlagDef {
  key: string;
  label: string;
  description: string;
  /** Where the switch takes effect: the kids' app on each device, or the server. */
  scope: FlagScope;
  /** The value before an admin has ever changed it. */
  defaultOn: boolean;
}

export const FLAGS: readonly FlagDef[] = [
  { key: "daily-challenge", label: "Daily Challenge", description: "The Daily Challenge tile on the kids' home screen.", scope: "app", defaultOn: true },
  { key: "speed-run", label: "Speed Run", description: "The Speed Run tile and screen.", scope: "app", defaultOn: true },
  { key: "math-facts", label: "Math Facts", description: "Math Facts: addition and subtraction facts to 20, times tables and division facts, tracked fact by fact, with a line on parent reports.", scope: "app", defaultOn: true },
  { key: "arcade", label: "Arcade", description: "The arcade games (still limited by each family's game-time settings).", scope: "app", defaultOn: true },
  { key: "seasonal-events", label: "Seasonal festivals", description: "Four festivals a year (Leaf, Snow, Sprout and Sun), each with its own sticker page, a home screen card and 50 coins for filling the page. Off: the card, the page and the coins go away; festival stickers already found still count toward trophies.", scope: "app", defaultOn: true },
  { key: "mystery-rewards", label: "Mystery boxes", description: "About one lesson in three (at most 3 a day) ends with a box to open: coins or a surprise sticker, picked from the lesson's own id. Off: no new boxes; what was already found stays.", scope: "app", defaultOn: true },
  { key: "weekly-recap", label: "Weekly \"you grew\" recap", description: "Once a week, a card for each child about last week: days practised, lessons that grew a level, new lessons, stickers, stories and trophies, read from their practice. Older kids see it on the home screen until they open or close it; little kids find it in My Treasures. Off: no card and no recap screen.", scope: "app", defaultOn: true },
  { key: "resume-lesson", label: "Finish your lesson", description: "A lesson left partway (the app closed, or another player took over) shows a \"Finish your lesson?\" card on the home screen for 48 hours, and picks up at the next question with the answers so far still counted. Off: no card; a lesson left partway starts again from the beginning.", scope: "app", defaultOn: true },
  { key: "sticker-book", label: "Sticker Book", description: "The Sticker Book tile and screen.", scope: "app", defaultOn: true },
  { key: "my-room", label: "My Room", description: "The My Room tile and screen.", scope: "app", defaultOn: true },
  { key: "shop", label: "Shop", description: "The pretend coin shop.", scope: "app", defaultOn: true },
  { key: "piper-auto-download", label: "Offline voice download", description: "Downloads the offline natural voice in the background when the app opens, for children with read-aloud on (not on mobile data). Off: parents can still download it in Settings.", scope: "app", defaultOn: true },
  { key: "story-library", label: "Story Library", description: "Short read-along stories for every grade, read aloud with the sentence lit up and a few questions at the end, grouped around each child's reading level. Off: the Stories tile, its screen and its quests go away; stories already read still count.", scope: "app", defaultOn: true },
  { key: "reading-level-match", label: "Reading level matching", description: "Language arts passages are chosen to suit each child's estimated reading level (worked out from their answers on passage questions) instead of only their grade. Off: passages follow the unit's usual difficulty.", scope: "app", defaultOn: true },
  { key: "secrets", label: "Easter eggs", description: "The hidden surprises: the Konami code, secret words and the moose on the home screen.", scope: "app", defaultOn: true },
  { key: "save-progress-card", label: "Save progress card", description: "Asks a grown-up to make a free account at the end of a lesson on a device with no account (after the first lesson, then daily in the trial's last week).", scope: "app", defaultOn: true },
  { key: "app-feedback", label: "How's Gradelings? feedback", description: "The quiet rating card on the parent Overview after a good week, and the Feedback link in the parent and teacher areas. Off: both go away and the server refuses new feedback.", scope: "app", defaultOn: true },
  { key: "share-good-week", label: "Share after a good week", description: "A quiet card on the parent Overview after a child practised on 3 of the last 7 days, with a button to share a link to the site (the parent's invite code when known, nothing about the child). Not in the store apps.", scope: "app", defaultOn: true },
  { key: "school-year", label: "School-year prompts", description: "Cards on the parent Overview that follow the school year (move children up a grade from August 1 to September 30, a summer sneak peek at next grade's lessons, and the report-card conversation sheet when report cards usually come home), the same lines in the weekly email, and the sneak peek on the kids' Lessons screen in summer.", scope: "app", defaultOn: true },
  { key: "subject-levels", label: "A level for each subject", description: "Parents can let a child practise one subject above or below their own grade, from the placement test (Reports > Placement test). Practice, Adventure, Review, Speed Run, the Daily Challenge and the home screen cards then use that grade's lessons for the subject. Off: every subject follows the child's grade again; the choice is kept for when it comes back on.", scope: "app", defaultOn: true },
  { key: "year-in-review", label: "Year in review", description: "In June and July, a card on the parent Overview pointing to each child's printable year in review (Reports > Year in review, always open), and one email in the second half of June to parents with progress emails on. Off: no card and no email.", scope: "app", defaultOn: true },
  { key: "parent-homework", label: "Homework for parents", description: "Parents of a child in a class see the teacher's current homework on the Overview (what was assigned, when it is due and whether it is done) and the same in the weekly email. Off: the card and the email lines go away; the child's own list is unchanged.", scope: "app", defaultOn: true },
  { key: "weekly-email-extras", label: "Fuller weekly email", description: "The weekly email also says how many math facts each child knows (and how many are new this week), how many stories they read, and gives one short idea to try at home. Off: the weekly email goes back to minutes, questions, a strength and next steps.", scope: "server", defaultOn: true },
  { key: "teacher-monday-email", label: "Monday class email", description: "A Monday email to teachers who turned it on: homework done and not started, units to reteach and students to check in with, per class, first names only. Off: the switch disappears from the teacher area and no email is sent.", scope: "server", defaultOn: true },
  { key: "signups", label: "New sign-ups", description: "Creating new parent and teacher accounts. Turn off to pause sign-ups.", scope: "server", defaultOn: true },
  { key: "google-sign-in", label: "Google sign-in", description: "The Continue with Google button for parents and teachers (never admins). Off: the button disappears and Google sign-in stops. Email and password keep working, and an account that only signs in with Google can ask for a password link.", scope: "server", defaultOn: true },
  { key: "magic-link", label: "Sign-in links", description: "Emailing parents and teachers a one-time link that signs them in without a password. Off: the option disappears and links already sent stop working. Never for admin or support accounts, or accounts with two-step sign-in.", scope: "server", defaultOn: true },
  { key: "redeem-codes", label: "Redeeming codes", description: "Parents entering access or discount codes under Subscription.", scope: "server", defaultOn: true },
  { key: "gift-plans", label: "Gift a plan", description: "Buying one year of the family plan as a gift code at /account/gift/. Off until Stripe checkout has been tried with a test gift: the page then says gifts aren't open yet.", scope: "server", defaultOn: false },
  { key: "new-classes", label: "New classes", description: "Teachers creating new classes. Existing classes keep working.", scope: "server", defaultOn: true },
  { key: "live-questions", label: "Live class questions", description: "Teachers asking their class a question in real time from the teacher area, and students' devices showing it on the home screen. Off: no new live questions start and devices stop showing them; homework and practice are unchanged.", scope: "server", defaultOn: true },
  { key: "roster-import", label: "Roster import", description: "Teachers bringing in classes and students from Google Classroom, Clever or ClassLink (each also needs its keys set on the server). Off until the providers' keys are in and an import has been tried.", scope: "server", defaultOn: false },
  { key: "school-plan", label: "School plan", description: "Roster import needs the school plan: a teacher account the owner has switched it on for under Users. Off: every teacher with roster import on may use it. Turn on only once the school price is decided.", scope: "server", defaultOn: false },
  { key: "class-timer", label: "Class timer", description: "A countdown a teacher starts for the whole class, shown on the teacher's screen and on students' devices. Off: no new timers start and devices stop showing them; practice is unchanged.", scope: "server", defaultOn: true },
  { key: "class-goal", label: "Class goal", description: "A weekly question goal a teacher sets for the whole class, shown to students as a shared progress bar with counts only. Off: no new goals are set and devices stop showing them; practice is unchanged.", scope: "server", defaultOn: true },
];

export type FlagKey = (typeof FLAGS)[number]["key"];

export const flagDef = (key: string): FlagDef | undefined => FLAGS.find((f) => f.key === key);

/** The stored state of one flag. Missing means it was never changed, so its default applies. */
export interface FlagState {
  enabled: boolean;
  /** Percentage of families (0 to 100) that get the flag while it is on. */
  rollout: number;
}

/** A stable number from 0 to 9999 for a string, so a family always lands in the same bucket. FNV-1a. */
export function bucket(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) % 10_000;
}

/**
 * Whether a flag is on for one family or device. An override for the family wins; otherwise a flag that
 * is off is off for everyone, and a partial rollout picks families by a stable bucket. A device with no
 * id (nothing to bucket by) only gets a flag that is rolled out to everyone.
 */
export function flagOn(def: FlagDef, state: FlagState | undefined, override: boolean | undefined, id: string | null): boolean {
  if (override !== undefined) return override;
  if (!state) return def.defaultOn;
  if (!state.enabled) return false;
  if (state.rollout >= 100) return true;
  if (state.rollout <= 0 || !id) return false;
  return bucket(`flag:${def.key}:${id}`) < state.rollout * 100;
}

// ---------- A/B tests ----------

export type ExperimentStatus = "draft" | "running" | "stopped";

export interface Variant {
  name: string;
  /** Relative share of families, a whole number from 1 to 100. */
  weight: number;
}

export interface Experiment {
  key: string;
  description: string;
  status: ExperimentStatus;
  variants: Variant[];
  /** Once stopped, everyone gets this variant (or the first one if none was picked). */
  winner: string | null;
  startedAt: number | null;
  stoppedAt: number | null;
}

/** The variant one family or device sees. The first variant is the control, shown to anyone not in a running test. */
export function pickVariant(exp: Pick<Experiment, "key" | "status" | "variants" | "winner">, id: string | null): string {
  const control = exp.variants[0]?.name ?? "control";
  if (exp.status === "stopped") return exp.winner && exp.variants.some((v) => v.name === exp.winner) ? exp.winner : control;
  if (exp.status !== "running" || !id) return control;
  const total = exp.variants.reduce((n, v) => n + v.weight, 0);
  if (total <= 0) return control;
  let at = bucket(`exp:${exp.key}:${id}`) % total;
  for (const v of exp.variants) {
    if (at < v.weight) return v.name;
    at -= v.weight;
  }
  return control;
}

export const EXPERIMENT_KEY = /^[a-z0-9][a-z0-9-]{1,39}$/;
const VARIANT_NAME = /^[a-z0-9][a-z0-9-]{0,23}$/;

/** Checks an experiment's key and variants. Returns an error message, or null when it is fine. */
export function validateExperiment(e: { key?: unknown; description?: unknown; variants?: unknown }): string | null {
  if (typeof e.key !== "string" || !EXPERIMENT_KEY.test(e.key)) return "Use 2 to 40 lower-case letters, digits or dashes for the key.";
  if (e.description != null && (typeof e.description !== "string" || e.description.length > 300)) return "Keep the description to 300 characters.";
  if (!Array.isArray(e.variants) || e.variants.length < 2 || e.variants.length > 5) return "An experiment needs 2 to 5 variants.";
  const names = new Set<string>();
  for (const v of e.variants as Partial<Variant>[]) {
    if (typeof v?.name !== "string" || !VARIANT_NAME.test(v.name)) return "Name each variant with lower-case letters, digits or dashes (up to 24).";
    if (!(Number.isInteger(v.weight) && v.weight! >= 1 && v.weight! <= 100)) return "Each variant's weight must be a whole number from 1 to 100.";
    if (names.has(v.name)) return "Each variant needs its own name.";
    names.add(v.name);
  }
  return null;
}

/** "control 50, new-copy 50" or one per line into variants. */
export function parseVariants(text: string): Variant[] {
  return text
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [name, weight] = part.split(/\s+/);
      return { name: (name ?? "").toLowerCase(), weight: weight === undefined ? 50 : Number(weight) };
    });
}

/**
 * Two-sided p-value for the difference between two conversion rates (a two-proportion z-test).
 * Null when either group is empty or nobody (or everybody) converted, where the test says nothing.
 */
export function pValue(n1: number, x1: number, n2: number, x2: number): number | null {
  if (n1 <= 0 || n2 <= 0) return null;
  const pooled = (x1 + x2) / (n1 + n2);
  if (pooled <= 0 || pooled >= 1) return null;
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  const z = Math.abs(x1 / n1 - x2 / n2) / se;
  return Math.min(1, 2 * (1 - normalCdf(z)));
}

/** Standard normal CDF (Abramowitz and Stegun 7.1.26, accurate to about 1e-7). */
export function normalCdf(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
}
