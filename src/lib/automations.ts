import { MESSAGE_PRESETS, messageProblem, type AdminMessage, type Segment } from "./adminEmails";

// Automatic nudges: an email the daily job sends by itself to families who reach a point (gone quiet, never
// practised...). Every one is off until the owner switches it on in the admin panel, and each has a daily cap.
// A family gets the same nudge at most once a month, and never within a few days of another panel email.

export interface AutomationDef {
  id: string;
  name: string;
  /** Who it goes to: one of the panel's email groups. */
  segment: Segment;
  /** The message it starts with; the owner can edit it. */
  preset: string;
  description: string;
}

export const AUTOMATIONS: AutomationDef[] = [
  { id: "quiet-7", name: "Ollie misses you", segment: "quiet-7", preset: "miss-you", description: "A child practised before but not in the last 7 days. Families who already get practice reminders are left out." },
  { id: "no-child", name: "Add your child", segment: "no-child", preset: "getting-started", description: "Signed up 2 or more days ago and hasn't added a child." },
  { id: "tried-few", name: "Come back after a try", segment: "tried-few", preset: "miss-you", description: "Practised on only 1 or 2 days, then stopped for 3 days." },
  { id: "trial-over", name: "Free lessons are waiting", segment: "trial-over", preset: "come-back", description: "Trial ended in the last 60 days and they didn't subscribe." },
];

export const automationDef = (id: string) => AUTOMATIONS.find((a) => a.id === id);

/** A family gets the same nudge at most this often. */
export const AUTOMATION_REPEAT_DAYS = 30;
export const DEFAULT_DAILY_CAP = 20;
export const MAX_DAILY_CAP = 50;
/** What the owner types to switch a nudge on. */
export const TURN_ON = "TURN ON";

export interface AutomationConfig {
  on: boolean;
  message: AdminMessage;
  dailyCap: number;
  /** Who switched it on, and when. */
  onBy: string | null;
  onAt: number | null;
}

export function defaultConfig(def: AutomationDef): AutomationConfig {
  const p = MESSAGE_PRESETS.find((m) => m.id === def.preset) ?? MESSAGE_PRESETS[0];
  return { on: false, message: { subject: p.subject, body: p.body, button: p.button ? { ...p.button } : null }, dailyCap: DEFAULT_DAILY_CAP, onBy: null, onAt: null };
}

/** Reads a stored config, falling back to the default for anything missing or broken. */
export function parseConfig(def: AutomationDef, raw: string | null): AutomationConfig {
  const base = defaultConfig(def);
  if (!raw) return base;
  try {
    const c = JSON.parse(raw) as Partial<AutomationConfig>;
    return {
      on: c.on === true,
      message: c.message && !messageProblem(c.message) ? c.message : base.message,
      dailyCap: validCap(c.dailyCap) ? (c.dailyCap as number) : base.dailyCap,
      onBy: typeof c.onBy === "string" ? c.onBy : null,
      onAt: typeof c.onAt === "number" ? c.onAt : null,
    };
  } catch {
    return base;
  }
}

export const validCap = (n: unknown) => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= MAX_DAILY_CAP;
