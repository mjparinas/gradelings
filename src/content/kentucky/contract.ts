import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Kentucky's official standards, built from the Kentucky Department of Education's files by
// docs/research/kentucky/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("kentucky/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Kentucky"),
  ownPrefix: "ky-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-pe", "us-az", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
