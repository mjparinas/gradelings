import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Alaska schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/alaska.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Alaska.",
  text: `The same applies when an Alaska school or teacher uses ${APP_NAME} with students. Alaska has no student online privacy law of its own, so we give Alaska schools the same commitments as schools in other states: we never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only with the school and the service providers listed under “Who we share it with”; keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and tell the school if a breach affects its students, in line with the Alaska Personal Information Protection Act (AS 45.48). FERPA and COPPA apply as for every US school.`,
};
