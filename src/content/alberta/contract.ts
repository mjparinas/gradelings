import { head, problems, preKCite, research, type FrameworkContract } from "../contract";
import type { GradeId } from "../types";

// Alberta standards cite the official learning outcomes (docs/research/alberta/outcomes.json). How each subject cites them:
//   math K–6, science K–6: outcome codes, e.g. "4N1.1" or "3LS 1.2"
//   math 7–9: strand and number, e.g. "N5, PR2"
//   science 7–9: "Unit A: Interactions and Ecosystems"
//   social 7–9: "7.1; 7.2"; language 7–9: "General Outcome 2"; core French: "Applications; Strategies"
//   French immersion 7–9: general outcome codes of the immersion program, e.g. "CÉ2; PÉ3"
//   language, social studies and French immersion K–6: items from the official grade snapshot
//   (ELA and immersion lines, social studies topic phrases), joined by "; "

interface Outcomes {
  math: Record<string, string[]>;
  science: { "k-6": string[]; "7-9-units": Record<string, string[]> };
  snapshots: Record<string, Record<string, string[] | { focus: string; topics: string[] }>>;
  "language-7-9": string[];
  "social-7-9": Record<string, string>;
  "core-french": string[];
  "immersion-7-9": Record<string, string>;
}

const OUTCOMES = research<Outcomes>("alberta/outcomes.json");

const norm = (s: string) => s.replace(/[“”"]/g, "").replace(/[’']/g, "'").replace(/\.$/, "").trim().toLowerCase();
const prefix = (grade: GradeId) => (grade === "k" ? "K" : grade);
const mathCodes = (standard: string) => head(standard).match(/\b[K1-6](?:ST|[NAGMTP])\d+(?:\.\d+)?\b/g) ?? [];
const upperMath = (standard: string) => head(standard).match(/\b(?:N|PR|SS|SP)\d{1,2}\b/g) ?? [];
const scienceCodes = (standard: string) => (head(standard).match(/\b[K1-6][A-Z]{1,2}\s?\d(?:\.\d+)?\b/g) ?? []).map((c) => c.replace(/\s/g, ""));

function snapshotItems(subject: string, grade: GradeId): string[] {
  const g = OUTCOMES.snapshots[subject]?.[grade];
  if (!g) return [];
  return Array.isArray(g) ? g : g.topics;
}

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/alberta/prek).
  preK: preKCite("alberta", "Alberta"),
  cite: ({ grade: g, subject, standard }) => {
    const { check, list } = problems();
    const first = head(standard);
    const early = g <= "6" || g === "k";
    check(standard.includes(" · "), `needs "citation · description"`);
    if (subject === "math") {
      const codes = early ? mathCodes(standard) : upperMath(standard);
      check(codes.length > 0, "cites no outcome");
      for (const c of codes) {
        check(early ? OUTCOMES.math["k-6"].includes(c) : OUTCOMES.math[g]?.includes(c), `${c} is not an Alberta math outcome`);
        if (early) check(c.startsWith(prefix(g)), `${c} is not a Grade ${g} outcome`);
      }
    } else if (subject === "science") {
      if (early) {
        const codes = scienceCodes(standard);
        check(codes.length > 0, "cites no outcome");
        for (const c of codes) {
          check(OUTCOMES.science["k-6"].includes(c), `${c} is not an Alberta science outcome`);
          check(c.startsWith(prefix(g)), `${c} is not a Grade ${g} outcome`);
        }
      } else {
        const units = OUTCOMES.science["7-9-units"][g];
        const hit = first.split("; ").every((p) => units.some((u) => p === `Unit ${u.slice(0, 1)}: ${u.slice(2)}`));
        check(hit, `must name Grade ${g} science units like "Unit A: ${units[0].slice(2)}"`);
      }
    } else if (subject === "social" && !early) {
      for (const c of first.split("; ")) {
        check(OUTCOMES["social-7-9"][c], `${c} is not an Alberta social studies issue`);
        check(c.startsWith(`${g}.`), `${c} is not Grade ${g}`);
      }
    } else if (subject === "language" && !early) {
      check(first.startsWith("General Outcome"), `should start with "General Outcome"`);
      for (const n of first.replace(/^General Outcomes? /, "").split(/,\s*/)) check(OUTCOMES["language-7-9"].some((o) => o.startsWith(`${n} `)), `${n} is not a general outcome`);
    } else if (subject === "core-french") {
      for (const p of first.split("; ")) check(OUTCOMES["core-french"].some((o) => o.endsWith(` ${p}`) || o === p), `${p} is not a Core French outcome`);
    } else if (subject === "immersion" && !early) {
      for (const c of first.split("; ")) check(OUTCOMES["immersion-7-9"][c], `${c} is not an immersion general outcome`);
    } else {
      // Language, social studies and French immersion K–6 cite the official grade snapshot.
      const items = snapshotItems(subject, g).map(norm);
      check(items.length > 0, `${subject} Grade ${g} has no snapshot`);
      for (const p of first.split("; ")) check(items.includes(norm(p)), `"${p}" is not in the Grade ${g} snapshot`);
    }
    return list;
  },
};
