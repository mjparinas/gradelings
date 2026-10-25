import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Oklahoma schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/oklahoma.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Oklahoma.",
  text: `The same applies when an Oklahoma school or teacher uses ${APP_NAME} with students. Oklahoma’s Student Data Accessibility, Transparency and Accountability Act (Title 70, section 3-168 of the Oklahoma Statutes) and the federal Family Educational Rights and Privacy Act limit how student records are shared, and in line with them we: use student information only to provide the service to the school; never use it for targeted advertising, here or anywhere else; never build a profile of a student except for the school’s purposes; never sell or rent it; share it only with the school and with the service providers listed under “Who we share it with”, who are bound by contract to use it only for the service they provide, not to disclose it further and to keep it secure; keep reasonable security in place to protect it, as described under “Security”; and delete it when the school asks.`,
};
