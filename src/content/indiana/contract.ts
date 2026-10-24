import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Indiana's official standards (the 2023 Indiana Academic Standards), built by docs/research/indiana/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("indiana/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Indiana"),
  ownPrefix: "in-",
  ownSharedWith: [],
  plan: PLAN,
};
