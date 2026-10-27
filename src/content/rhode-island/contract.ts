import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Rhode Island's official standards (the Common Core, the NGSS and the Rhode Island Social Studies Standards), built
// from the source files by docs/research/rhode-island/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("rhode-island/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Rhode Island"),
  ownPrefix: "ri-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "us-fl", "us-ga", "us-ny", "us-or", "us-pa", "us-wa", "ca-mb", "ca-nb", "ca-ns", "ca-pe"],
  plan: PLAN,
};
