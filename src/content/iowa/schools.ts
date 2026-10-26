import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Iowa schools: the student privacy law that applies and our commitments under it. Keep it true
// to docs/frameworks/iowa.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Iowa.",
  text: `The same applies when an Iowa school or teacher uses ${APP_NAME} with students. In line with Iowa’s student online personal information protection law (Iowa Code section 279.71) we: say plainly what student information we collect and how we use it (this page); use it only for the classroom and the school’s purposes; never use it for targeted advertising, on ${APP_NAME} or anywhere else; never sell it, and never build a profile of a student except for the school’s purposes; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract to the same rules; keep reasonable security procedures in place, as described under “Security”; and delete it as soon as reasonably practicable when the school asks.`,
};
