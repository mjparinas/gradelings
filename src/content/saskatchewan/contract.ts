import { head, preKCite, research, type FrameworkContract } from "../contract";

// The official Saskatchewan outcomes (docs/research/saskatchewan). Unit standards cite them by code.
const OUTCOMES = research<Record<string, Record<string, { outcomes: { code: string }[] }[]>>>("saskatchewan/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/saskatchewan/prek).
  preK: preKCite("saskatchewan", "Saskatchewan"),
  cite: ({ grade, subject, standard }) => {
    const official = new Set((OUTCOMES[grade]?.[subject] ?? []).flatMap((st) => st.outcomes.map((o) => o.code)));
    // French cites goals and strands (4.CS.1, 5.LK.1, 3.CÉ.2, É-DV.4), listed with ", ".
    const isFrench = subject === "immersion" || subject === "core-french";
    const codes = isFrench ? head(standard).split(", ") : (head(standard).match(/[A-Z]{1,3}[K\d]\.\d+[ab]?/g) ?? []);
    if (codes.length === 0) return ["cites no outcome"];
    return codes.filter((c) => !official.has(c)).map((c) => `cites ${c}, which is not in Saskatchewan ${grade}/${subject}`);
  },
  ownPrefix: "sk-",
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada/,
};
