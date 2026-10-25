import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Wisconsin's official standards, built from the Department of Public Instruction's standards server by
// docs/research/wisconsin/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("wisconsin/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Wisconsin"),
  ownPrefix: "wi-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
};
