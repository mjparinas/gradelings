import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Montana's official standards, built from the Office of Public Instruction's machine-readable standards (its CASE
// server) by docs/research/montana/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("montana/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Montana"),
  ownPrefix: "mt-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-pe", "us-or", "us-wa", "us-ny", "us-tx", "us-az", "us-fl", "us-ga"],
  plan: PLAN,
};
