import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Maine's official standards, built from the Maine Department of Education's files by
// docs/research/maine/build_outcomes.py. English language arts and social studies have no codes, so their citations
// are the standard's name ("Reading 4", "Civics & Government 2"), checked the same way.
const OUTCOMES = research<Record<string, { idx: string }[]>>("maine/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Maine"),
  ownPrefix: "me-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
  // United States history (the Gold Rush, statehood, the Mexican-American War).
  otherStates: { pattern: /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became)/, exempt: ["or-g5-states-capitals"], includeOwn: true },
  // Maine's own units about the Wabanaki Nations are written for Maine. Washington's, Oregon's and California's units
  // about their Tribes, treaties or California Indian nations stay theirs; a borrowed US history unit may still say
  // plainly that Native nations lived here first.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?)\b/i, from: /^(wa|or|ca)-/, card: true },
};
