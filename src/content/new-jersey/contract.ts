import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// New Jersey's official standards (the New Jersey Student Learning Standards), built by
// docs/research/new-jersey/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-jersey/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Jersey"),
  ownPrefix: "nj-",
  ownSharedWith: [],
  plan: PLAN,
};
