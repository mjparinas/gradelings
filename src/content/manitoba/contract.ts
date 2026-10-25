import { head, research, type FrameworkContract } from "../contract";

// The official Manitoba outcomes (docs/research/manitoba). Unit standards cite them by code; Core French cites strands.
const OUTCOMES = research<Record<string, { idx: string }[]>>("manitoba/outcomes.json");

export const contract: FrameworkContract = {
  cite: ({ grade, subject, standard }) => {
    const official = new Set((OUTCOMES[`${grade}/${subject}`] ?? []).map((r) => r.idx));
    const codes = head(standard).split(/,\s*/).map((c) => c.trim());
    if (codes.filter(Boolean).length === 0) return ["cites no outcome"];
    if (official.size === 0 || subject === "core-french") return [];
    return codes.filter((c) => !official.has(c)).map((c) => `cites ${c}, which is not in Manitoba ${grade}/${subject}`);
  },
  ownPrefix: "mb-",
  ownSharedWith: ["ca-nb", "ca-nl", "ca-ns", "ca-nu", "ca-pe", "us-wa", "us-or", "us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il", "us-co", "us-pa", "us-oh", "us-ga", "us-nj", "us-in", "us-va", "us-mo", "us-nc", "us-ma", "us-md", "us-sc", "us-wi"],
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta/,
};
