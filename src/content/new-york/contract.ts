import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// New York's official standards, built from NYSED's files by docs/research/new-york/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-york/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New York"),
  ownPrefix: "ny-",
  ownSharedWith: ["us-mn", "us-al", "us-az", "us-ar", "us-fl", "us-pa"],
  plan: PLAN,
};
