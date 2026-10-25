import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// The Arkansas Academic Standards, built from the Division of Elementary and Secondary Education's documents by
// docs/research/arkansas/build_outcomes.py: every code as the documents print it ("4.NPV.3", "4.RC.8.RL", "4-PS3-1",
// "H.1.4.1"; Grade 9 "A1.LFE.3", "9.RC.5.RL", "BI-LS1-1", "C.3.CIV.5").
const OUTCOMES = research<Record<string, { idx: string }[]>>("arkansas/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Arkansas"),
  ownPrefix: "ar-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
};
