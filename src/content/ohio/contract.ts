import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Ohio's official standards (Ohio's Learning Standards), built by
// docs/research/ohio/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("ohio/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Ohio"),
  ownPrefix: "oh-",
  ownSharedWith: [],
  plan: PLAN,
};
