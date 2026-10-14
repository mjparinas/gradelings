import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Alaska's official standards, built from the Department of Education and Early Development's files by
// docs/research/alaska/build_outcomes.py. English language arts codes ("RL.4.2") add the strand and grade to the number
// the document prints, the way its own progressive-skills table does.
const OUTCOMES = research<Record<string, { idx: string }[]>>("alaska/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Alaska"),
  ownPrefix: "ak-",
  plan: PLAN,
};
