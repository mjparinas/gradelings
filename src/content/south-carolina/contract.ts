import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// The South Carolina College- and Career-Ready Standards, built from the South Carolina Department of Education's
// documents by docs/research/south-carolina/build_outcomes.py: every code as the documents print it ("4.NR.1.2",
// "ELA.4.AOR.1.2", "4-PS3-1", "4.2.CX", "3.1.2.AG"; Grade 9 "A1.PAFR.2.3", "ELA.E1.AOR.2.1", "B-LS1-1", "USG.2.CC",
// "EPF.3.ER").
const OUTCOMES = research<Record<string, { idx: string }[]>>("south-carolina/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "South Carolina"),
  ownPrefix: "sc-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
};
