import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Iowa's official standards (the Iowa Academic Standards), built from the Iowa Department of Education's
// files by docs/research/iowa/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("iowa/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Iowa"),
  ownPrefix: "ia-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
