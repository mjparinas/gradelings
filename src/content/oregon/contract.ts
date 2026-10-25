import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Oregon's official standards, built from ODE's files by docs/research/oregon/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("oregon/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Oregon"),
  ownPrefix: "or-",
  adoptsFrom: ["ca-nb", "ca-ns", "ca-mb", "us-wa"],
  // Other states may adopt them; no Canadian framework ever gets them.
  plan: PLAN,
};
