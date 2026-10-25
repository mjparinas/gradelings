import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Washington State schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/washington.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Washington State.",
  text: `When a school or teacher uses ${APP_NAME} with students, the school gives consent for educational use on parents’ behalf, and we act for the school. In line with Washington’s Student User Privacy in Education Rights Act (SUPER Act) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; delete it when the school asks (and as described under “Schools and classes”); keep a security program in place to protect it, as described under “Security”; and give notice before we make a material change to how we handle it.`,
};
