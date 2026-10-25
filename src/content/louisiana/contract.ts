import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Louisiana's official standards (the Louisiana Student Standards), built by docs/research/louisiana/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("louisiana/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Louisiana"),
  ownPrefix: "la-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "ca-mb", "ca-nb", "us-ny", "us-or", "ca-pe", "us-wa"],
  plan: PLAN,
};
