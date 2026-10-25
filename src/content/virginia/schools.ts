import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Virginia schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/virginia.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Virginia.",
  text: `The same applies when a Virginia school or teacher uses ${APP_NAME} with students. As a school service provider under the Code of Virginia (section 22.1-289.01) we: never use students’ personal information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; use and share it only for the school’s purposes (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; tell the school about a breach affecting its students without unreasonable delay; and delete it within a reasonable time when the school asks.`,
};
