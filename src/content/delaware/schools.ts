import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Delaware schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/delaware.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Delaware.",
  text: `The same applies when a Delaware school or teacher uses ${APP_NAME} with students. In line with Delaware’s Student Data Privacy Protection Act (14 Del. C. ch. 81A) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; delete it within 45 days when the school asks; and, if we discover a breach of data we hold for a school, tell the school without delay so families can be notified under Delaware law.`,
};
