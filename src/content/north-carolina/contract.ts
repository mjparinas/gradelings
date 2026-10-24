import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// North Carolina's official standards (the North Carolina Standard Course of Study), built by
// docs/research/north-carolina/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("north-carolina/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "North Carolina"),
  ownPrefix: "nc-",
  ownSharedWith: [],
  plan: PLAN,
};
