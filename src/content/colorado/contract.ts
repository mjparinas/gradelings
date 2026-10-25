import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Colorado's official standards (the Colorado Academic Standards), built by
// docs/research/colorado/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("colorado/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Colorado"),
  ownPrefix: "co-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
