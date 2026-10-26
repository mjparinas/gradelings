import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Idaho's official standards (the Idaho Content Standards), built from the Idaho Department of Education's
// files by docs/research/idaho/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("idaho/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Idaho"),
  ownPrefix: "id-",
  adoptsFrom: ["us-ca", "ca-mb", "ca-nb", "us-ny", "us-or", "us-wa"],
  plan: PLAN,
};
