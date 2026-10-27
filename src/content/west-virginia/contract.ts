import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// West Virginia's official standards, built from the West Virginia Board of Education's standards policies by
// docs/research/west-virginia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("west-virginia/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "West Virginia"),
  ownPrefix: "wv-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "ca-mb", "ca-nb", "ca-ns", "ca-pe", "us-fl", "us-ga", "us-ny", "us-or", "us-tx", "us-wa"],
  plan: PLAN,
};
