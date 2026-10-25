import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Virginia's official standards (the Standards of Learning), built by docs/research/virginia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("virginia/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Virginia"),
  ownPrefix: "va-",
  ownSharedWith: [],
  plan: PLAN,
};
