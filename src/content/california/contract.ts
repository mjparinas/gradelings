import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// California's official standards, built from CDE's files by docs/research/california/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("california/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "California"),
  ownPrefix: "ca-",
  plan: PLAN,
};
