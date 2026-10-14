import { head, research, type FrameworkContract } from "../contract";

// The official New Brunswick curriculum (docs/research/new-brunswick). Unit standards cite its strand and big idea ("Number: Operations").
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-brunswick/outcomes.json");

export const contract: FrameworkContract = {
  cite: ({ grade, subject, standard }) => {
    const official = new Set((OUTCOMES[`${grade}/${subject}`] ?? []).map((r) => r.idx));
    const first = head(standard);
    if (first.trim().length === 0) return ["cites no strand"];
    // French cites course names and strands, which the outcomes file doesn't list.
    if (official.size === 0 || subject === "core-french" || subject === "immersion") return [];
    const labels = official.has(first) ? [first] : first.split(/,\s*/).map((c) => c.trim());
    return labels.filter((l) => !official.has(l)).map((l) => `cites "${l}", which is not in New Brunswick ${grade}/${subject}`);
  },
  ownPrefix: "nb-",
  ownSharedWith: ["us-wa", "us-or", "us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-az"],
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta|Manitoba|Winnipeg|Nova Scotia|Halifax|Yukon|Northwest Territories/,
};
