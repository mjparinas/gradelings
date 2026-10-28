import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Vermont schools: the student privacy law that applies and our commitments under it. Keep it true
// to docs/frameworks/vermont.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Vermont.",
  text: `The same applies when a Vermont school or teacher uses ${APP_NAME} with students. In line with Vermont’s student privacy law (9 V.S.A. §§ 2443 to 2443f) we: never use students’ information for targeted advertising; never sell, barter or rent it, and never build a profile of a student except for the school’s purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound by contract not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; delete it when the school or district asks; and describe what we collect, use and share in this policy.`,
};
