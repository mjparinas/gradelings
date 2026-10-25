import { codeCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// Alabama's content standards, built from the Alabama Courses of Study (Mathematics 2019, English Language Arts 2021,
// Science 2023, Social Studies 2024) by docs/research/alabama/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("alabama/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Alabama"),
  ownPrefix: "al-",
  ownSharedWith: ["us-ar", "us-fl", "us-pa", "us-ga", "us-nj", "us-in", "us-va", "us-mo", "us-nc", "us-ma", "us-md", "us-sc", "us-wi"],
  plan: PLAN,
};
