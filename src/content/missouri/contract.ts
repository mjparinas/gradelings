import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Missouri's official standards (the Missouri Learning Standards' Grade-Level Expectations), built by
// docs/research/missouri/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("missouri/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Missouri"),
  ownPrefix: "mo-",
  adoptsFrom: ["us-ca", "us-ga", "ca-nb", "us-al", "us-fl", "ca-ns", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa", "us-me"],
  plan: PLAN,
};
