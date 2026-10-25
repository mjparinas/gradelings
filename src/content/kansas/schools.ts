import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Kansas schools: the student privacy law that applies and our commitments under it. Keep it true
// to docs/frameworks/kansas.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Kansas.",
  text: `The same applies when a Kansas school or teacher uses ${APP_NAME} with students. In line with the Kansas Student Data Privacy Act (K.S.A. 72-6312 to 72-6320) we: say plainly what student information we collect and how we use it (this page); sign a data-sharing agreement with the school that sets out its purpose, scope and duration; use student information only for the classroom and the purposes in that agreement; follow the access, use and security rules it describes, as set out under “Security”; never sell it or use it for advertising; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract to the same rules; never collect biometric data or try to read a student’s physical or emotional state; ask students nothing about their or their family’s personal attitudes, values or beliefs; tell the school at once if a breach affects its students, so families can be told immediately, and investigate its cause; and delete student information when it is no longer needed, when the agreement ends, or within 30 days when the school asks.`,
};
