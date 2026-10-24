import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Pennsylvania's academic standards, built from the Department of Education's documents by
// docs/research/pennsylvania/build_outcomes.py: every code as the Department prints it ("CC.2.1.4.B.1", "CC.1.2.4.A",
// "3.1.4.A", "5.1.4.A", "7.1.4.A", "8.1.4.A"; Grade 9 "CC.2.2.HS.D.1", "CC.1.2.9-10.A", "3.1.9-12.A", "5.1.9-12.A").
const OUTCOMES = research<Record<string, { idx: string }[]>>("pennsylvania/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Pennsylvania"),
  ownPrefix: "pa-",
  plan: PLAN,
};
