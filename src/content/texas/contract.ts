import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// The Texas Essential Knowledge and Skills, built from TEA's chapter files by docs/research/texas/build_outcomes.py.
// Both a knowledge and skills statement ("4.4") and a student expectation ("4.4(A)") count as a standard.
const OUTCOMES = research<Record<string, { idx: string }[]>>("texas/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Texas"),
  ownPrefix: "tx-",
  ownSharedWith: ["us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-pa", "us-oh", "us-ga", "us-nj", "us-in", "us-va", "us-mo", "us-nc", "us-ma", "us-md", "us-sc"],
  plan: PLAN,
};
