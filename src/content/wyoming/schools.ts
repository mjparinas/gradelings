import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Wyoming schools: the student data rules that apply and our commitments under them. Keep it true
// to docs/frameworks/wyoming.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Wyoming.",
  text: `The same applies when a Wyoming school or teacher uses ${APP_NAME} with students. Wyoming law (W.S. 21-2-202 and 21-3-110) asks each school district to adopt a policy on the collection, access, privacy, security and use of student data, following the state’s guidelines and the federal Family Educational Rights and Privacy Act. To support your district’s policy we: use students’ information only to provide the service to the school; never sell or rent it, never use it for targeted advertising, and never build a profile of a student except for the school’s purposes; disclose it only to the school and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure; keep reasonable security in place to protect it, as described under “Security”; delete it when the school asks; and, if we discover a breach of data we hold for a school, tell the school without delay so families can be notified under Wyoming law.`,
};
