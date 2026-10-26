import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Connecticut's official standards, built from the State Department of Education's files and the national documents it
// adopted by docs/research/connecticut/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("connecticut/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Connecticut"),
  ownPrefix: "ct-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-pe", "us-or", "us-wa", "us-ny", "us-tx", "us-az", "us-fl", "us-ga"],
  plan: PLAN,
};
