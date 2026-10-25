import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Georgia's official standards (the Georgia Academic Standards), built by
// docs/research/georgia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("georgia/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Georgia"),
  ownPrefix: "ga-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
};
