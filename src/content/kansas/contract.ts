import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Kansas's official standards (the Kansas standards for mathematics, English language arts, science and history,
// government and social studies), built from the Kansas State Department of Education's files by docs/research/kansas/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("kansas/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Kansas"),
  ownPrefix: "ks-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
