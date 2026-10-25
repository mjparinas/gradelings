import { hashSeed, rand, withSeed } from "@/content/random";
import type { Sticker } from "./stickers";

// Mystery boxes: now and then, a finished lesson ends with a box to open. What's inside is picked
// from the lesson's own event id, so every device agrees, a box can't be opened twice for more,
// and nothing about it is stored except that it was opened (a `mystery` event). Boxes are only
// ever earned by learning: they are never sold, never cost coins and never show odds or "almost"
// prizes.

/** A lesson needs at least this many answers to end with a box. */
export const MYSTERY_MIN_ANSWERS = 5;
/** At most this many boxes a day, so the box stays a surprise rather than the reason to play. */
export const MYSTERY_PER_DAY = 3;
/** About one lesson in three ends with a box (the very first qualifying lesson always does). */
const CHANCE = 1 / 3;

export interface SurpriseSticker {
  id: string;
  name: string;
  emoji: string;
  rare?: boolean;
}

export const SURPRISE_STICKERS: SurpriseSticker[] = [
  { id: "octopus", name: "Octopus", emoji: "🐙" },
  { id: "dino", name: "Dino", emoji: "🦕" },
  { id: "rocket", name: "Rocket", emoji: "🚀" },
  { id: "volcano", name: "Volcano", emoji: "🌋" },
  { id: "whale", name: "Whale", emoji: "🐳" },
  { id: "parrot", name: "Parrot", emoji: "🦜" },
  { id: "donut", name: "Donut", emoji: "🍩" },
  { id: "balloon", name: "Balloon", emoji: "🎈" },
  { id: "cupcake", name: "Cupcake", emoji: "🧁" },
  { id: "planet", name: "Planet", emoji: "🪐" },
  { id: "ladybug", name: "Ladybug", emoji: "🐞" },
  { id: "giraffe", name: "Giraffe", emoji: "🦒" },
  { id: "panda", name: "Panda", emoji: "🐼" },
  { id: "paint", name: "Paint", emoji: "🎨" },
  { id: "puzzle", name: "Puzzle piece", emoji: "🧩" },
  { id: "trex", name: "T. rex", emoji: "🦖" },
  { id: "unicorn", name: "Unicorn", emoji: "🦄", rare: true },
  { id: "dragon", name: "Dragon", emoji: "🐉", rare: true },
  { id: "gem", name: "Gem", emoji: "💎", rare: true },
  { id: "shooting-star", name: "Shooting star", emoji: "🌠", rare: true },
];

const COMMON = SURPRISE_STICKERS.filter((s) => !s.rare);
const RARE = SURPRISE_STICKERS.filter((s) => s.rare);

export type MysteryReward = { kind: "coins"; coins: number } | { kind: "sticker"; sticker: SurpriseSticker };

/** What's inside the box at the end of this lesson. Fixed by the lesson's event id. */
export function mysteryReward(sessionId: string): MysteryReward {
  return withSeed(hashSeed(`mystery:${sessionId}`), () => {
    const r = rand();
    if (r < 0.05) return { kind: "sticker", sticker: RARE[Math.floor(rand() * RARE.length)] };
    if (r < 0.4) return { kind: "sticker", sticker: COMMON[Math.floor(rand() * COMMON.length)] };
    const coins = [5, 10, 10, 15, 15, 20][Math.floor(rand() * 6)];
    return { kind: "coins", coins };
  });
}

/**
 * Does this lesson end with a box? `openedToday` is how many boxes the child opened today and
 * `openedEver` how many in all, so the first lesson after this ships always has one.
 */
export function offersMystery(sessionId: string, answers: number, openedToday: number, openedEver: number): boolean {
  if (answers < MYSTERY_MIN_ANSWERS || openedToday >= MYSTERY_PER_DAY) return false;
  if (openedEver === 0) return true;
  return withSeed(hashSeed(`mystery-offer:${sessionId}`), () => rand() < CHANCE);
}

/** The Surprises page of the sticker book: every sticker, with how many of each the child has. */
export function surpriseStickers(found: Record<string, number>): (Sticker & { count: number })[] {
  return SURPRISE_STICKERS.map((s) => ({
    id: `surprise:${s.id}`,
    name: s.name,
    emoji: s.emoji,
    earned: (found[s.id] ?? 0) > 0,
    shiny: s.rare && (found[s.id] ?? 0) > 0,
    count: found[s.id] ?? 0,
    hint: s.rare ? "A rare one! Keep opening mystery boxes" : "Open a mystery box after a lesson",
  }));
}
