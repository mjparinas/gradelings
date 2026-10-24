// Milestone cards a parent can share from the parent area ("Grew into a Tree in Fractions").
// A shared link carries only the milestone itself: a count, or a unit and level, with a grade and
// curriculum. Never the child's name or anything else about them. The words are made here from
// those fields, so a link can't be edited into saying something else.

/** Count milestones, with the values a link may carry (the same steps as src/lib/milestones.ts). */
export const COUNT_STEPS = {
  right: [100, 500, 1000, 5000, 10000, 25000],
  days: [30, 100, 180, 365, 730],
} as const;

export type CountKind = "right" | "days" | "grew" | "kept" | "streak" | "year";
const COUNT_KINDS: CountKind[] = ["right", "days", "grew", "kept", "streak", "year"];

const fmt = (n: number) => n.toLocaleString("en-CA");
const plural = (n: number, one: string, many = `${one}s`) => `${fmt(n)} ${n === 1 ? one : many}`;

/** The one or two words a child sees for a level (the kid labels, the same in every province). */
export const LEVEL_WORDS: Record<number, { verb: string; badge: string }> = {
  2: { verb: "Grew into a Tree", badge: "🌳" },
  3: { verb: "Became a Star", badge: "⭐" },
};

function validCount(kind: string, n: number): kind is CountKind {
  if (!COUNT_KINDS.includes(kind as CountKind) || !Number.isInteger(n)) return false;
  if (kind === "right" || kind === "days") return (COUNT_STEPS[kind] as readonly number[]).includes(n);
  if (kind === "streak") return n >= 14 && n <= 3650;
  return n >= 1 && n <= 999;
}

/** The headline for a count milestone, or undefined when the link isn't one we make. */
export function countTitle(kind: string, n: number): string | undefined {
  if (!validCount(kind, n)) return undefined;
  switch (kind) {
    case "right":
      return `${fmt(n)} questions right on the first try`;
    case "days":
      return `${fmt(n)} days of practice`;
    case "grew":
      return `${plural(n, "topic")} grown from tricky to strong`;
    case "kept":
      return `Remembered ${plural(n, "topic")} after a month away`;
    case "streak":
      return `A ${fmt(n)}-day practice streak`;
    case "year":
      return `${plural(n, "topic")} grown in one school year`;
  }
}

export function countMilestonePath(kind: CountKind, n: number): string {
  return `/milestone/count/${kind}/${n}/`;
}

export function unitMilestonePath(frameworkSlug: string, gradeSlug: string, subject: string, unitId: string, level: number): string {
  return `/milestone/unit/${frameworkSlug}/${gradeSlug}/${subject}/${unitId}/${level}/`;
}
