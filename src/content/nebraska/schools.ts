import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Nebraska schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/nebraska.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Nebraska.",
  text: `The same applies when a Nebraska school or teacher uses ${APP_NAME} with students. In line with Nebraska’s Student Online Personal Protection Act (Neb. Rev. Stat. 79-2,153 to 79-2,155) we: use student information only for the classroom and the school’s purposes; never show students targeted advertising, or any advertising; never build a profile of a student except for those school purposes; never sell or rent student information; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract to use it only to provide their service to us, not to pass it on, and to keep it secure; keep reasonable security in place, as set out under “Security”; and delete a student’s information within 30 days when the school asks.`,
};
