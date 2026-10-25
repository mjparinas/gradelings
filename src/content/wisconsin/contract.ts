import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Wisconsin's official standards, built from the Department of Public Instruction's standards server by
// docs/research/wisconsin/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("wisconsin/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Wisconsin"),
  ownPrefix: "wi-",
  ownSharedWith: [],
  plan: PLAN,
};
