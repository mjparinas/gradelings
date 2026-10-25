import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Oklahoma's official standards (the Oklahoma Academic Standards), built by
// docs/research/oklahoma/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("oklahoma/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Oklahoma"),
  ownPrefix: "ok-",
  adoptsFrom: ["us-ca", "us-az", "us-co", "us-ga", "us-ny", "us-or", "us-tx", "us-wa", "ca-mb", "ca-nb", "ca-pe"],
  plan: PLAN,
};
