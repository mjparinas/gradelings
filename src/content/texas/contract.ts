import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// The Texas Essential Knowledge and Skills, built from TEA's chapter files by gradelings-research/texas/build_outcomes.py.
// Both a knowledge and skills statement ("4.4") and a student expectation ("4.4(A)") count as a standard.
const OUTCOMES = research<Record<string, { idx: string }[]>>("texas/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Texas"),
  // Pre-K cites the state's early-learning standards (docs/research/texas/prek).
  preK: preKCite("texas", "Texas"),
  ownPrefix: "tx-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-wa"],
  plan: PLAN,
  // Treaties alone aren't a sign: adopted civics units ask about the Treaty of Paris and foreign treaties.
  tribal: { words: /\b(Tribes?|Tribal)\b|\bNative\b|California Indian/, from: /^(wa|or|ca)-/ },
};
