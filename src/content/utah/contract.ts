import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Utah's official standards (the Utah Student Standards), built by docs/research/utah/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("utah/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Utah"),
  ownPrefix: "ut-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "us-co", "us-ga", "ca-mb", "us-mn", "ca-nb", "us-ny", "us-or", "ca-pe", "us-tx", "us-wa"],
  plan: PLAN,
};
