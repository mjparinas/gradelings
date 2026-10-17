import type { PlacementResult } from "./placement";
import type { FrameworkId, GradeId, SubjectId } from "@/content/types";

// Shared shapes for the device database, the sync API and the server.

export type Mode = "practice" | "adventure" | "review" | "speed" | "daily" | "challenge";

export interface Profile {
  id: string;
  name: string;
  /** Mascot/critter id used as the avatar. */
  avatar: string;
  colour: string;
  grade: GradeId;
  framework: FrameworkId;
  birthYear?: number;
  /** Equipped cosmetics. */
  companion?: string;
  title?: string;
  confetti?: string;
  /** What is placed in each slot of the child's room (slot to item id). */
  room?: Record<string, string>;
  /** Progress before this time is ignored (a parent reset it). */
  resetAt?: number;
  createdAt: number;
  updatedAt: number;
  deleted?: boolean;
}

export const READING_TINTS = ["cream", "mint", "blue", "rose"] as const;
export type ReadingTint = (typeof READING_TINTS)[number];

export interface ChildSettings {
  profileId: string;
  dailyGoalMinutes: number;
  /** Minutes of learning that earn a game break. */
  learnMinutesPerReward: number;
  /** Minutes of games each reward unlocks. */
  rewardGameMinutes: number;
  maxGameMinutesPerDay: number;
  gamesEnabled: boolean;
  /** Games are always unlocked (no learning needed). */
  freePlay: boolean;
  showTimer: boolean;
  /** Children may not pick an easier or stretch goal for the day. Off by default. */
  lockGoal?: boolean;
  /** Focus options for children who find lots of motion, noise or pressure hard. All default to off. */
  /** Turn off bursts, confetti, floating text and screen shakes, whatever the device setting is. */
  calmMotion?: boolean;
  /** Keep only gentle sounds: no fanfares, chimes or countdown ticks. */
  quietSounds?: boolean;
  /** Hide clocks and countdown numbers; timed modes show a quiet bar instead. */
  hideTimers?: boolean;
  /** Hold trophy and level pop-ups until the lesson is over. */
  quietToasts?: boolean;
  /** Five questions at a time (Adventure checkpoints and Review). */
  shortSessions?: boolean;
  /** Reading comfort: extra space between letters, words and lines. */
  /** A hint opened before answering still counts as a first-try answer. Off by default: it counts like a retry. */
  freeHints?: boolean;
  roomyText?: boolean;
  /** Stronger text colours and outlines. */
  highContrast?: boolean;
  /** Use the OpenDyslexic typeface for everything the child reads. */
  dyslexiaFont?: boolean;
  /** A soft page colour some readers find easier on the eyes. Unset means the usual cream. */
  readingTint?: ReadingTint;
  /** Days a week a parent hopes the child will practise (1 to 7). Unset means no family goal. */
  weeklyGoalDays?: number;
  /** A short kind note a parent sent from a fixed list; the child sees it once on the home screen. */
  nudge?: { id: string; preset: string; sentAt: number };
  autoRead: boolean;
  sound: boolean;
  /** Light vibration on taps and answers, on devices that support it. On unless set to false. */
  haptics?: boolean;
  enabledSubjects: SubjectId[];
  updatedAt: number;
}

export interface FamilyInfo {
  /** Server-side account, when a parent has signed in on this device. */
  account?: {
    email: string;
    familyId: string;
    /** Has the parent confirmed their email address? */
    verified?: boolean;
    /** A class account a teacher made for this child: no parent area, no billing, no email. */
    student?: boolean;
  };
  plan: "trial" | "free" | "premium";
  trialEndsAt: number;
  /** `cancelAt`: the parent cancelled, and the plan (or its free trial) stops then instead of renewing. */
  subscription?: { status: string; interval?: "month" | "year"; currentPeriodEnd?: number; cancelAt?: number };
  /** Free access from a redeemed code ends at this time (ms); `LIFETIME_ACCESS` never ends. Null when there is none. */
  accessUntil?: number | null;
  /** A redeemed discount code waiting for the next checkout. */
  discount?: { code: string; percentOff: number } | null;
  /** "US" when the first child added follows a US curriculum (set on the server); Canada otherwise. Decides the currency and US consent. */
  country?: "CA" | "US";
  /** When a US parent gave consent to collect their children's information (COPPA). Null until then, or after they withdraw it. */
  consentAt?: number | null;
  updatedAt: number;
}

interface EventBase {
  /** Unique id (random), so events can be merged from many devices safely. */
  id: string;
  profileId: string;
  /** When it happened (ms since epoch). */
  t: number;
}

export type AppEvent = EventBase &
  (
    | {
        type: "answer";
        unit: string;
        /** Right on the first try. */
        correct: boolean;
        attempts: number;
        revealed: boolean;
        /** The child opened the hint before answering. */
        hinted?: boolean;
        /** A short version of the question's text (`questionLabel`), so a teacher can see which questions a class misses. Not set for questions that need a picture. */
        q?: string;
        ms: number;
        mode: Mode;
        difficulty?: number;
      }
    | {
        type: "session";
        mode: Mode;
        /** A unit key, a subject id, or "mix". */
        scope: string;
        total: number;
        correct: number;
        ms: number;
      }
    /** The child asked a grown-up to help with this unit after missing a question twice. Not practice: it never counts toward XP or proficiency. */
    | { type: "help"; unit: string }
    | { type: "play"; game: string; seconds: number }
    | { type: "game"; game: string; score: number; level: number }
    | { type: "trophy"; trophy: string }
    /** A hidden easter egg found (for example "konami"). */
    | { type: "secret"; code: string }
    | { type: "buy"; item: string; cost: number }
    | { type: "quest"; quest: string; day: string; reward: number }
    /** The goal a child chose for one day. */
    | { type: "goal"; day: string; level: "easy" | "regular" | "stretch"; minutes: number }
    /** A finished placement test. Not practice: it never counts toward XP, stars or proficiency. */
    | ({ type: "placement" } & PlacementResult)
  );

export type EventOf<T extends AppEvent["type"]> = Extract<AppEvent, { type: T }>;

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Local calendar day, e.g. "2026-10-08". */
export function dayKey(t: number): string {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Grades whose children have read-aloud switched on by default. Parents can still turn it off per child. */
export const AUTO_READ_GRADES: readonly GradeId[] = ["k", "1"];

/** Daily goal a new child starts with. Little kids (Kindergarten and Grade 1) get the shorter one. */
export const DEFAULT_GOAL_MINUTES = { little: 10, other: 15 } as const;

export function defaultChildSettings(profileId: string, little: boolean, grade?: GradeId): ChildSettings {
  return {
    profileId,
    dailyGoalMinutes: little ? DEFAULT_GOAL_MINUTES.little : DEFAULT_GOAL_MINUTES.other,
    learnMinutesPerReward: 20,
    rewardGameMinutes: 5,
    maxGameMinutesPerDay: 20,
    gamesEnabled: true,
    freePlay: false,
    showTimer: !little,
    autoRead: grade ? AUTO_READ_GRADES.includes(grade) : little,
    sound: true,
    enabledSubjects: ["math", "language", "science", "social"],
    updatedAt: Date.now(),
  };
}
