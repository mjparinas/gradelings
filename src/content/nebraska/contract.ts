import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Nebraska's College and Career Ready Standards (mathematics, English language arts, science and social studies), built
// from the Nebraska Department of Education's files by docs/research/nebraska/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("nebraska/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Nebraska"),
  ownPrefix: "neb-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
