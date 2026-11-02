import type { SubjectId } from "@/content/types";

// "Did you know?": one short, true fact from the subject's guide at the end of a lesson. Facts are the same
// for every province and state, so they name no places, money, holidays or school systems. Picked from a seed
// (the child, the day and the lesson), so nothing is stored.

export const BUDDY_FACTS: Partial<Record<SubjectId, string[]>> = {
  math: [
    "A honeycomb is made of hexagons, shapes with six sides.",
    "A dozen means twelve.",
    "Any number times zero is zero.",
    "An even number can always be shared into two equal groups.",
    "Multiplying by 10 moves every digit one place to the left.",
    "The Roman numerals have no zero.",
    "A day has 24 hours, and every hour has 60 minutes.",
    "A circle has no corners and no straight sides.",
  ],
  language: [
    "A synonym means almost the same thing, like \"big\" and \"huge\".",
    "English has 26 letters but about 44 different sounds.",
    "The word \"set\" has hundreds of different meanings.",
    "Pizza and piano are words English borrowed from Italian.",
    "A sentence starts with a capital letter and ends with a . or ? or !",
    "A bookworm is someone who loves to read.",
    "A rhyme is when words end with the same sound, like \"cat\" and \"hat\".",
    "An antonym means the opposite, like \"hot\" and \"cold\".",
  ],
  science: [
    "Octopuses have three hearts.",
    "Butterflies taste with their feet.",
    "Lightning is hotter than the surface of the sun.",
    "Sound can't travel through space, because there's no air.",
    "Sharks have been around longer than trees.",
    "Your heart beats about 100,000 times every day.",
    "Honey can last for thousands of years without spoiling.",
    "Some kinds of bamboo grow almost a metre in one day.",
  ],
  social: [
    "Most of Earth's surface is covered by ocean.",
    "The equator is an imaginary line around the middle of Earth.",
    "A compass rose shows north, south, east and west.",
    "The first maps were drawn thousands of years ago.",
    "People have used calendars for thousands of years to follow the seasons.",
    "Many people can share the same books at a library.",
    "Earth has seven continents.",
    "A community works best when everyone helps.",
  ],
};

/** A small, stable hash so the same lesson on the same day always picks the same fact. */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** The fact for a subject, or undefined for a subject without any (French, Spanish and so on). */
export function buddyFact(subject: SubjectId, seed: string): string | undefined {
  const facts = BUDDY_FACTS[subject];
  return facts?.length ? facts[hash(seed) % facts.length] : undefined;
}

/** Which subject's guide shares the fact when a lesson mixes subjects: one of the child's subjects that has facts. */
export function factSubjectFor(subjects: readonly SubjectId[], seed: string): SubjectId | undefined {
  const withFacts = subjects.filter((s) => BUDDY_FACTS[s]?.length);
  return withFacts.length ? withFacts[hash(seed) % withFacts.length] : undefined;
}
