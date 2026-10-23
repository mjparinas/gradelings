import { head, research, type FrameworkContract } from "../contract";

// The official Nova Scotia outcomes (docs/research/nova-scotia). Unit standards cite them by code, or by bundle or outcome title.
const OUTCOMES = research<Record<string, { idx: string }[]>>("nova-scotia/outcomes.json");

export const contract: FrameworkContract = {
  cite: ({ grade, subject, standard }) => {
    const official = new Set((OUTCOMES[`${grade}/${subject}`] ?? []).map((r) => r.idx));
    const first = head(standard);
    if (first.trim().length === 0) return ["cites no outcome"];
    // French cites course names and strands, which the outcomes file doesn't list.
    if (official.size === 0 || subject === "core-french" || subject === "immersion") return [];
    const labels = official.has(first) ? [first] : first.split(/,\s*/).map((c) => c.trim());
    return labels.filter((l) => !official.has(l)).map((l) => `cites "${l}", which is not in Nova Scotia ${grade}/${subject}`);
  },
  ownPrefix: "ns-",
  ownSharedWith: ["ca-nb", "us-wa", "us-or", "us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il"],
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta|Manitoba|Winnipeg/,
};
