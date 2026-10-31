import { head, research, type FrameworkContract } from "../contract";
import { NEW_CURRICULUM_GRADES } from "./overall";
import { PLAN } from "./plan";

// The approved guides per grade and subject, from the Nunavut Department of Education's Approved Curriculum and Teaching
// Resources (gradelings-research/nunavut/README.md).
const APPROVED = research<Record<string, { guides: string[]; areas: string[] | null }>>("nunavut/approved.json");
// The outcomes of the new Nunavut curriculum, read from the Department's K–6 subject documents
// (gradelings-research/nunavut/new-curriculum/README.md).
const OUTCOMES = research<Record<string, { guide: string; grades: Record<string, { code: string }[]> }>>("nunavut/new-curriculum/outcomes.json");

export const contract: FrameworkContract = {
  // An approved guide, and a real strand where the guide has them. In the grades already taught with the new Nunavut
  // curriculum, real outcome codes of that curriculum for the unit's own grade and subject.
  cite: ({ grade, subject, standard }) => {
    const approved = APPROVED[`${grade}/${subject}`];
    if (!approved) return [`${grade}/${subject} has no approved guide`];
    const first = head(standard);
    const guide = approved.guides.find((g) => first.startsWith(g));
    if (!guide) return [`cites "${first}", which is not an approved ${grade}/${subject} guide`];
    const out: string[] = [];
    if (approved.areas) for (const part of first.slice(guide.length + 2).split("; ")) if (!approved.areas.includes(part)) out.push(`cites area "${part}"`);
    const fresh = (NEW_CURRICULUM_GRADES as readonly string[]).includes(grade) ? OUTCOMES[subject] : undefined;
    if (fresh) {
      const codes = new Set(fresh.grades[grade].map((o) => o.code));
      if (!first.startsWith(`${fresh.guide}, `)) out.push(`should cite ${fresh.guide}`);
      else for (const code of first.slice(fresh.guide.length + 2).split("; ")) if (!codes.has(code)) out.push(`cites ${code}, not a Grade ${grade} outcome`);
    }
    return out;
  },
  ownPrefix: "nu-",
  adoptsFrom: ["ca-pe", "ca-mb", "ca-sk"],
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta|Manitoba|Winnipeg|Nova Scotia|Halifax|New Brunswick|Yukon|Northwest Territories/,
  plan: PLAN,
};
