import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Hawaiʻi's official standards (the Hawaiʻi State Department of Education's content standards), built from HIDOE's
// files by docs/research/hawaii/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("hawaii/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Hawaiʻi"),
  ownPrefix: "hi-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-tx", "us-wa"],
  plan: PLAN,
};
