import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Illinois's official standards, built from the Illinois State Board of Education's files by
// docs/research/illinois/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("illinois/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Illinois"),
  ownPrefix: "il-",
  ownSharedWith: [],
  plan: PLAN,
};
