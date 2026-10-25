import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Tennessee's official standards (the Tennessee Academic Standards), built by
// docs/research/tennessee/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("tennessee/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Tennessee"),
  ownPrefix: "tn-",
  adoptsFrom: ["us-ca", "us-al", "us-az", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
