import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// New Hampshire's official standards (the College and Career Ready Standards and the K-12 Social Studies Curriculum
// Framework), built from the Achievement Standards Network copies by docs/research/new-hampshire/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-hampshire/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Hampshire"),
  ownPrefix: "nh-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
