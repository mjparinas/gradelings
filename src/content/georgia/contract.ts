import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Georgia's official standards (the Georgia Academic Standards), built by
// docs/research/georgia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("georgia/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Georgia"),
  ownPrefix: "ga-",
  ownSharedWith: ["us-mo"],
  plan: PLAN,
};
