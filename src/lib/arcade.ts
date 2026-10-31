import { getFramework } from "@/content/frameworks";
import { languagesOf, subjectsOffered } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import { isOn } from "./deviceFlags";

// The arcade's games: what each one is, which grades it fits and the level that unlocks it.
// Kept free of the store and content so public pages can list the games cheaply.

export interface GameInfo {
  id: string;
  title: string;
  icon: string;
  subject: string;
  desc: string;
  colour: string;
  dark: string;
  /** The player level that opens it. Left out means open from the start. */
  unlockLevel?: number;
  /** Grades it has content for. Left out means every grade. */
  grades?: readonly GradeId[];
  /** Only shown to a child with a second language (French or Spanish) turned on. */
  language?: boolean;
}

const ALL: readonly GradeId[] = ["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const from = (g: GradeId, to: GradeId = "9") => ALL.slice(ALL.indexOf(g), ALL.indexOf(to) + 1);

export const GAMES: GameInfo[] = [
  { id: "munchers", title: "Number Munchers", icon: "🟢", subject: "Math", desc: "Munch the numbers that fit the rule. Watch out for Grumbles!", colour: "#4f8ef7", dark: "#2f6fd6" },
  { id: "ninja", title: "Word Ninja", icon: "🥷", subject: "Reading", desc: "Swipe to slice the right words as they fly!", colour: "#e9559a", dark: "#c43a7c" },
  { id: "catch", title: "Critter Catch", icon: "🧺", subject: "Science", desc: "Move the basket to catch the right things.", colour: "#25b47e", dark: "#16925f" },
  { id: "bubbles", title: "Bubble Pop", icon: "🫧", subject: "Phonics", desc: "Pop the bubbles that match the sound or rule.", colour: "#06b6d4", dark: "#0891b2" },
  { id: "memory", title: "Memory Match", icon: "🃏", subject: "Brain", desc: "Flip cards to find matching pairs.", colour: "#ff9636", dark: "#e57a12" },
  { id: "map", title: "Map Dash", icon: "🗺️", subject: "Social Studies", desc: "Find the place on the map before the timer runs out.", colour: "#f2b233", dark: "#c98a0c", unlockLevel: 2 },
  { id: "timeline", title: "Timeline Snap", icon: "🧩", subject: "Order", desc: "Tap the cards in the right order.", colour: "#a78bfa", dark: "#7c5fd6", unlockLevel: 3 },
  { id: "clock", title: "Clock Catch", icon: "⏰", subject: "Math: time", desc: "Catch the clocks that show the right time.", colour: "#5ec7e8", dark: "#2a9cc0", unlockLevel: 4, grades: from("1", "4") },
  { id: "bridge", title: "Word Bridge", icon: "🌉", subject: "French or Spanish", desc: "Pick the right French or Spanish word to build the bridge.", colour: "#ef7f8f", dark: "#c95466", unlockLevel: 4, language: true },
  { id: "coins", title: "Coin Shop", icon: "🪙", subject: "Math: money", desc: "Pay the customer with the right coins.", colour: "#e6c84a", dark: "#b89a1c", unlockLevel: 5, grades: from("1", "5") },
  { id: "tower", title: "Equation Tower", icon: "⚖️", subject: "Math: equations", desc: "Pick the block that balances the scale.", colour: "#6fd08c", dark: "#3fa65f", unlockLevel: 6, grades: from("2") },
];

export function getGame(id: string): GameInfo | undefined {
  return GAMES.find((g) => g.id === id);
}

export interface ArcadeContext {
  grade: GradeId;
  /** The child's turned-on subjects. */
  subjects?: readonly SubjectId[];
  /** The child's curriculum. A French subject left on from a curriculum without French (a move to a US state) doesn't count. */
  framework?: string;
}

export const hasFrenchOn = (subjects: readonly SubjectId[] = []) => languagesOf(subjects).includes("fr");

/**
 * The child's turned-on subjects that their curriculum and grade offer: a French subject left on from a curriculum
 * without French doesn't count, nor Spanish outside Grades 3 to 9 or while its flag is off.
 */
export function subjectsOn(ctx: ArcadeContext): SubjectId[] {
  const offered = subjectsOffered(getFramework(ctx.framework), ctx.grade, isOn);
  return (ctx.subjects ?? []).filter((s) => offered.includes(s));
}

/** Whether a game has content for this child (grade, and French or Spanish turned on for Word Bridge). */
export function gameFits(game: GameInfo, ctx: ArcadeContext): boolean {
  if (game.grades && !game.grades.includes(ctx.grade)) return false;
  if (game.language && languagesOf(subjectsOn(ctx)).length === 0) return false;
  return true;
}

export function gameUnlocked(game: GameInfo, level: number): boolean {
  return level >= (game.unlockLevel ?? 1);
}

/** The games shown in this child's arcade, open or locked. */
export function arcadeFor(ctx: ArcadeContext): GameInfo[] {
  return GAMES.filter((g) => gameFits(g, ctx));
}

/** Games that open between two levels, for the level-up toast. */
export function gamesOpenedBetween(before: number, after: number, ctx: ArcadeContext): GameInfo[] {
  return arcadeFor(ctx).filter((g) => g.unlockLevel !== undefined && g.unlockLevel > before && g.unlockLevel <= after);
}

