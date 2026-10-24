import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Tennessee's official standards (the Tennessee Academic Standards), built by
// docs/research/tennessee/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("tennessee/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Tennessee"),
  ownPrefix: "tn-",
  ownSharedWith: [],
  plan: PLAN,
};
