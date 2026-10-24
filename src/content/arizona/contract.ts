import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Arizona's official standards, built from the Arizona Department of Education's files by
// docs/research/arizona/build_outcomes.py: every code as the documents print it ("4.NBT.A.1", "4.RL.1", "4.P4U1.1",
// "4.H2.1"; Grade 9 "A1.A-SSE.A.1", "9-10.RL.1", "HS.L2U1.20", "HS.C2.1").
const OUTCOMES = research<Record<string, { idx: string }[]>>("arizona/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Arizona"),
  ownPrefix: "az-",
  ownSharedWith: ["us-ar", "us-fl", "us-pa", "us-ga", "us-nj", "us-in"],
  plan: PLAN,
};
