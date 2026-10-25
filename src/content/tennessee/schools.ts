import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Tennessee schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/tennessee.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Tennessee.",
  text: `The same applies when a Tennessee school or teacher uses ${APP_NAME} with students. In line with Tennessee’s Student Online Personal Protection Act (Tennessee Code Annotated section 49-1-708) we: never use student information for targeted advertising, here or anywhere else; never build a profile of a student except for the school’s purposes; never sell or rent it; share it only as the law allows, with the school and with the service providers listed under “Who we share it with”, who are bound by contract to use it only for the service they provide, not to disclose it further and to keep it secure; keep reasonable security in place to protect it, as described under “Security”; and delete it within a reasonable time when the school asks.`,
};
