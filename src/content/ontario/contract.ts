import { head, preKCite, research, type FrameworkContract } from "../contract";

// The official Ontario expectations (docs/research/ontario). Unit standards cite them by code ("B1.1–B1.3, B2.2").
const EXPECTATIONS = research<Record<string, { idx: string; kind: string }[]>>("ontario/expectations.json");

/** The codes a standard cites, e.g. "B1.1–B1.3, B2.2 · ..." gives B1.1, B1.3, B2.2. */
const citedCodes = (standard: string) => (head(standard).match(/[A-F]\d{1,2}(?:\.\d{1,2})?/g) ?? []).filter(Boolean);

export const contract: FrameworkContract = {
  cite: ({ grade, subject, standard }) => {
    const official = new Set((EXPECTATIONS[grade === "k" ? "k/all" : `${grade}/${subject}`] ?? []).map((r) => r.idx));
    const codes = citedCodes(standard);
    if (codes.length === 0) return ["cites no expectation"];
    return codes.filter((c) => !official.has(c)).map((c) => `cites ${c}, which is not in Ontario ${grade}/${subject}`);
  },
  // Junior Kindergarten cites the Kindergarten Curriculum's expectations (docs/research/ontario/prek).
  preK: preKCite("ontario", "Ontario"),
};
