import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells New York schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/new-york.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in New York.",
  text: `The same applies when a New York school or teacher uses ${APP_NAME} with students. In line with New York’s Education Law section 2-d and Part 121 of the Commissioner’s regulations we: never sell students’ information or use it or release it for marketing or any commercial purpose; use it only for the educational purposes the school sets; share it only with the service providers listed under “Who we share it with”, who are bound to protect it; keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and tell the school if a breach affects its students, so it can meet its own duties to notify families. A New York school’s contract with us can include the Parents’ Bill of Rights for Data Privacy and Security and the supplemental information the law requires, and parents can review their child’s information through the school.`,
};
