import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Michigan schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/michigan.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Michigan.",
  text: `The same applies when a Michigan school or teacher uses ${APP_NAME} with students. In line with Michigan’s Student Online Personal Protection Act (MCL 388.1291 to 388.1295) we: never use what we learn from ${APP_NAME} for targeted advertising, on ${APP_NAME} or anywhere else; never build a profile of a student except for the school’s purposes; never sell or rent a student’s information; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract not to use it for anything else or pass it on, and to keep it secure; keep reasonable security in place, as described under “Security”; and delete a student’s information when the school asks.`,
};
