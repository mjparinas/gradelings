import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Delaware's official standards (the Common Core, the Next Generation Science Standards and the Delaware Standards
// for Civics, Economics, Geography and History), built from the Achievement Standards Network copies by docs/research/delaware/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("delaware/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Delaware"),
  ownPrefix: "de-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
};
