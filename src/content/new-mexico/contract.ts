import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// New Mexico's official standards (the New Mexico Content Standards), built from the Public Education Department's
// files by docs/research/new-mexico/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-mexico/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Mexico"),
  ownPrefix: "nm-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
