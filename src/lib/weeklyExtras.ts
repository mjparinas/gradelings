import type { AgeBand, GradeId, SubjectId } from "@/content/types";
import { factKnown, factsIn, factSetsFor, factSummary, type FactStat } from "./facts";

// More for the weekly email (flag weekly-email-extras): math facts known, stories read and one idea to try at
// home. Totals only, like the rest of the email: no child's answers, just counts and unit-free ideas.

const DAY = 86_400_000;

/**
 * One line about math facts: what the child knows in each set they've tried, and how many became known this week
 * (known now and not a week ago). Nothing when no fact set for their grade has been tried.
 */
export function factsWeekLine(name: string, grade: GradeId, now: Record<string, FactStat>, weekAgo: Record<string, FactStat>): string | undefined {
  const sets = factSetsFor(grade)
    .map((s) => factSummary(s, now))
    .filter((s) => s.tried > 0);
  if (!sets.length) return undefined;
  const parts = sets.map((s) => `${s.known} of ${s.total} ${s.set.noun}`);
  const list = parts.length < 2 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`;
  // Sets share fact ids ("3 + 4" is in Adding to 10 and Addition facts), so new facts are counted once.
  const ids = new Set(sets.flatMap((s) => factsIn(s.set.id).map((f) => f.id)));
  const learned = [...ids].filter((id) => factKnown(now[id]) && !factKnown(weekAgo[id])).length;
  return `  Math facts: ${name} knows ${list}${learned ? ` (${learned} new this week)` : ""}.`;
}

/** Stories finished in the last 7 days, re-reads included. */
export function storiesThisWeek(events: readonly { type: string; t: number }[], now: number): number {
  return events.filter((e) => e.type === "story" && e.t > now - 7 * DAY && e.t <= now).length;
}

export function storiesLine(name: string, n: number): string | undefined {
  return n ? `  Stories: ${name} read ${n} ${n === 1 ? "story" : "stories"} in the Story Library.` : undefined;
}

type CoreSubject = "math" | "language" | "science" | "social";
const CORE: readonly CoreSubject[] = ["math", "language", "science", "social"];

/**
 * Ideas for a few minutes at home, by subject and age band. Region-neutral (no money, places or holidays, so they
 * suit every province and state), need nothing you'd have to buy, and are written in Canadian spelling: the email
 * passes them through the family's own spelling.
 */
export const AT_HOME: Record<CoreSubject, Record<AgeBand, readonly string[]>> = {
  math: {
    little: [
      "Count the steps on the way to the door, then count them again going back. Did you get the same number?",
      "Make a pattern with spoons and forks (spoon, fork, spoon...) and ask what comes next.",
      "At snack time, share 6 crackers fairly between two plates. How many on each?",
    ],
    middle: [
      "Pick a number on a house or a clock and ask: what's 10 more? What's 10 less?",
      "Measure a table with hand spans, then with a ruler. Which number is bigger, and why?",
      "Cut a sandwich into halves, then quarters. Which piece is bigger: a half or a quarter?",
    ],
    big: [
      "Double a recipe together: what happens to 3/4 of a cup?",
      "Estimate how many minutes a chore will take, time it, and compare the guess with the answer.",
      "Find a percentage on a box or label and work out what it means for the whole amount.",
    ],
  },
  language: {
    little: [
      "Play I spy with sounds: I spy something that starts with /b/.",
      "Read a picture book together and ask what might happen next before you turn the page.",
      "Find three things in the kitchen that rhyme with a word you pick.",
    ],
    middle: [
      "Take turns reading pages of a book aloud, then each tell the other your favourite part.",
      "Write a short shopping list together and check the spelling of each word.",
      "Ask your child to retell a story in three sentences: beginning, middle and end.",
    ],
    big: [
      "Read the same short article and each pick the sentence that says the main idea. Did you pick the same one?",
      "Ask your child to write a four-sentence review of a book, show or game, with one reason for their opinion.",
      "Pick a new word from something you read together and use it at dinner.",
    ],
  },
  science: {
    little: [
      "Drop a few things into a bowl of water. Guess first: will each one float or sink?",
      "Go on a short walk and collect three different leaves or stones. How are they the same, and how are they different?",
      "Look at the sky together in the morning and evening. What changed?",
    ],
    middle: [
      "Put an ice cube in a sunny spot and one in the shade. Which melts first, and why?",
      "Watch a plant or tree near your home for a week and talk about any change you see.",
      "Roll a ball down a ramp made from a book, then a steeper one. Which goes farther?",
    ],
    big: [
      "Ask your child to explain how something at home works (a fridge, a light switch, a zipper) and look it up together.",
      "Plan a fair test together: change one thing, keep the rest the same, and predict what will happen.",
      "Talk about where your tap water comes from and where it goes after the drain.",
    ],
  },
  social: {
    little: [
      "Draw a simple map of your child's bedroom together and mark where the bed and door are.",
      "Talk about the jobs people do in your neighbourhood. Which one would your child like to try?",
      "Look at an old photo together and talk about what has changed since then.",
    ],
    middle: [
      "Ask a grandparent or older friend what school was like for them, and compare it with today.",
      "Draw a map of the route to a place you go often, with three landmarks on the way.",
      "Talk about a rule at home or at school: why do we have it, and is it fair?",
    ],
    big: [
      "Pick a news story suited to your child and talk about the different people it affects.",
      "Ask your child how a decision gets made in your community, then look up who makes it.",
      "Find where something you own was made on a map, and talk about how it got to you.",
    ],
  },
};

/**
 * One idea for this week: from the subject the email suggests next (its "Next up" unit), else the subject of
 * unfinished homework, else a core subject that rotates by week. Seeded by week and child, so a resend picks the same.
 */
export function atHomeIdea(subject: SubjectId | undefined, band: AgeBand, seed: string, now: number): string {
  const week = Math.floor(now / (7 * DAY));
  let h = week;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const s: CoreSubject = CORE.includes(subject as CoreSubject) ? (subject as CoreSubject) : CORE[week % CORE.length];
  const ideas = AT_HOME[s][band];
  return ideas[h % ideas.length];
}

export const atHomeLine = (idea: string) => `  Try at home: ${idea}`;
