import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells South Dakota schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/south-dakota.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in South Dakota.",
  text: `The same applies when a South Dakota school or teacher uses ${APP_NAME} with students. South Dakota’s student privacy law (SDCL 13-3-51.1 to 13-3-51.6) governs how the Department of Education handles students’ records, and has no separate rules for online services, so we give South Dakota schools the same commitments as schools in other states: we never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; never ask students survey questions about the topics SDCL 13-3-51.2 protects, such as beliefs, family or income; share it only with the school and the service providers listed under “Who we share it with”; keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and tell the school if a breach affects its students, in line with South Dakota’s data breach law (SDCL 22-40-19 to 22-40-26). FERPA and COPPA apply as for every US school.`,
};
