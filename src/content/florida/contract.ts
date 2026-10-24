import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Florida's state academic standards, built from the Department of Education's books and CPALMS by
// docs/research/florida/build_outcomes.py: every benchmark code as the Department prints it ("MA.4.NSO.1.1",
// "ELA.4.R.1.1", "SC.4.L.16.1", "SS.4.A.1.1"; Grade 9 "MA.912.AR.3.1", "ELA.9.R.1.1", "SC.912.L.14.1", "SS.912.W.1.1").
const OUTCOMES = research<Record<string, { idx: string }[]>>("florida/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Florida"),
  ownPrefix: "fl-",
  ownSharedWith: ["us-pa", "us-ga", "us-in"],
  plan: PLAN,
};
