import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Maine's official standards, built from the Maine Department of Education's files by
// docs/research/maine/build_outcomes.py. English language arts and social studies have no codes, so their citations
// are the standard's name ("Reading 4", "Civics & Government 2"), checked the same way.
const OUTCOMES = research<Record<string, { idx: string }[]>>("maine/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Maine"),
  ownPrefix: "me-",
  plan: PLAN,
};
