import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Mississippi's official standards (the Mississippi College- and Career-Readiness Standards), built from the Mississippi
// Department of Education's files by docs/research/mississippi/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("mississippi/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Mississippi"),
  ownPrefix: "ms-",
  adoptsFrom: ["ca-mb", "ca-pe", "us-al", "us-az", "us-ca", "us-co", "us-fl", "us-ga", "us-ny", "us-or", "us-tx", "us-wa"],
  plan: PLAN,
};
