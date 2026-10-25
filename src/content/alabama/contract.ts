import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Alabama's content standards, built from the Alabama Courses of Study (Mathematics 2019, English Language Arts 2021,
// Science 2023, Social Studies 2024) by docs/research/alabama/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("alabama/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Alabama"),
  ownPrefix: "al-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa", "us-me"],
  plan: PLAN,
};
