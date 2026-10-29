import { head, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";
import type { GradeId } from "../types";

// The key-stage outcomes of the Atlantic Canada foundation documents (docs/research/newfoundland-and-labrador). Unit
// standards cite a strand and key stage ("Operation sense (by Grade 6)"): Kindergarten to Grade 3 cite the Grade 3
// stage, Grades 4 to 6 the Grade 6 stage and Grades 7 to 9 the Grade 9 stage.
const OUTCOMES = research<Record<string, { idx: string; stage: number; outcomes: string[] }[]>>("newfoundland-and-labrador/outcomes.json");
const KEY_STAGE: Record<GradeId, number> = { pk: 3, k: 3, "1": 3, "2": 3, "3": 3, "4": 6, "5": 6, "6": 6, "7": 9, "8": 9, "9": 9 };

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/newfoundland-and-labrador/prek).
  preK: preKCite("newfoundland-and-labrador", "Newfoundland and Labrador"),
  cite: ({ grade, subject, standard }) => {
    const rows = OUTCOMES[`${grade}/${subject}`];
    if (!rows) return [`${grade}/${subject} has no Newfoundland and Labrador outcomes`];
    return head(standard)
      .split("; ")
      .flatMap((label) => {
        const row = rows.find((r) => r.idx === label.trim());
        if (!row) return [`cites "${label}", which is not in Newfoundland and Labrador ${grade}/${subject}`];
        if (row.stage !== KEY_STAGE[grade]) return [`cites "${label}" from the Grade ${row.stage} key stage, but Grade ${grade} belongs to Grade ${KEY_STAGE[grade]}`];
        return row.outcomes.length > 0 ? [] : [`cites "${label}", which has no outcomes`];
      });
  },
  ownPrefix: "nl-",
  adoptsFrom: ["ca-mb"],
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta|Manitoba|Winnipeg|Nova Scotia|Halifax|New Brunswick|Fredericton|Yukon|Northwest Territories|Nunavut/,
  plan: PLAN,
};
