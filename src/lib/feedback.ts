// Warm, varied feedback for answers. The words depend on what just happened (a comeback, a streak,
// a first try), never on what a child "should" have done. Pure, so it is easy to test.

export interface PraiseContext {
  /** Right in a row on the first try, counting this answer. */
  run: number;
  /** Right after one or more misses on this question. */
  comeback?: boolean;
  /** Right after opening a hint. */
  helped?: boolean;
}

const FIRST = ["Great job!", "You got it!", "Super!", "Awesome!", "Way to go!", "Nailed it!", "Brilliant!"];
const COMEBACK = ["You figured it out!", "That's the way! Trying again paid off.", "Nice fix! Practice does that.", "Got it! Great thinking."];
const HELPED = ["Good thinking, asking for a hint!", "Yes! Hints are for learning.", "Right! Now you know it."];
const STREAK = ["{n} in a row! 🔥", "{n} in a row, wow! 🔥", "On a roll: {n} in a row! 🔥"];
const BIG_STREAK = ["{n} in a row! You're on fire! 🔥", "{n} in a row! Unstoppable! 🚀"];

/** A deterministic pick so tests (and the same moment) give the same words. */
function choose<T>(items: readonly T[], roll: number): T {
  return items[Math.min(items.length - 1, Math.floor(roll * items.length))];
}

export function praiseFor(ctx: PraiseContext, roll = Math.random()): string {
  if (ctx.run >= 10) return choose(BIG_STREAK, roll).replace("{n}", String(ctx.run));
  if (ctx.run >= 3) return choose(STREAK, roll).replace("{n}", String(ctx.run));
  if (ctx.comeback) return choose(COMEBACK, roll);
  if (ctx.helped) return choose(HELPED, roll);
  return choose(FIRST, roll);
}

const NUDGE = ["Almost! Try again.", "So close! Have another go.", "Good try! Look again.", "Hmm, not quite. You can do it!"];

export function nudgeFor(roll = Math.random()): string {
  return choose(NUDGE, roll);
}
