import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Nevada's official standards (the Nevada Academic Content Standards), built from the Nevada Department of Education's
// files by docs/research/nevada/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("nevada/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Nevada"),
  ownPrefix: "nv-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
