import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Maryland's official standards, the Maryland College and Career Ready Standards, the Next Generation Science Standards and the Maryland Social
// Studies Framework, built by
// docs/research/maryland/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("maryland/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Maryland"),
  ownPrefix: "md-",
  ownSharedWith: [],
  plan: PLAN,
};
