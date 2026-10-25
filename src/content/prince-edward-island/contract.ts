import { head, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// The specific curriculum outcomes of Prince Edward Island (docs/research/prince-edward-island), cited by code.
const OUTCOMES = research<Record<string, { code: string }[]>>("prince-edward-island/outcomes.json");

export const contract: FrameworkContract = {
  cite: ({ grade, subject, standard }) => {
    const codes = new Set((OUTCOMES[`${grade}/${subject}`] ?? []).map((o) => o.code));
    if (codes.size === 0) return [`${grade}/${subject} has no Prince Edward Island outcomes`];
    return head(standard)
      .split("; ")
      .filter((c) => !codes.has(c))
      .map((c) => `cites "${c}", which is not in Prince Edward Island ${grade}/${subject}`);
  },
  ownPrefix: "pe-",
  // Nunavut may copy a unit that names no province (src/content/nunavut/plan.ts).
  ownSharedWith: ["ca-nu", "us-ny", "us-mn", "us-al", "us-az", "us-ar", "us-fl", "us-pa", "us-ga", "us-nj", "us-in", "us-va", "us-nc", "us-md"],
  // Units written for Prince Edward Island may name the Maritime provinces; borrowed units must not name any.
  foreign: /Ontario|Queen's Park|EQAO|Upper Canada|Lower Canada|Saskatchewan|Regina|Alberta|Manitoba|Winnipeg|Nova Scotia|Halifax|New Brunswick|Fredericton|Newfoundland|Yukon|Northwest Territories|Nunavut/,
  plan: PLAN,
};
