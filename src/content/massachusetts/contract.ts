import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Massachusetts's official standards (the Massachusetts Curriculum Frameworks), built by
// docs/research/massachusetts/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("massachusetts/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Massachusetts"),
  // "ma-g", not "ma-": Core French already has a unit called "ma-classe". Kindergarten units are "ma-gk-".
  ownPrefix: "ma-g",
  adoptsFrom: ["us-ca", "us-ga", "ca-nb", "us-al", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
