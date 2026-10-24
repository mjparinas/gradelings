import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Michigan's official standards, built from the Michigan Department of Education's files by
// docs/research/michigan/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("michigan/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Michigan"),
  ownPrefix: "mi-",
  ownSharedWith: [],
  plan: PLAN,
};
