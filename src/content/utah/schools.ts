import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Utah schools: the student privacy law that applies and our commitments under it (the Utah
// Student Data Protection Act, Utah Code Title 53E, Chapter 9, Part 3, whose section 53E-9-309 covers third-party
// contractors). Keep it true to docs/frameworks/utah.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Utah.",
  text: `The same applies when a Utah school or teacher uses ${APP_NAME} with students. In line with Utah’s Student Data Protection Act (Utah Code Title 53E, Chapter 9, Part 3) we: use student information only to provide the service the school chose; never sell it, and never use it for targeted advertising or to build a profile of a student for any purpose other than the service; collect only what the service needs; give access to it only as the school allows, and to the service providers listed under “Who we share it with”, who are bound by contract to use it only for the service they provide and to keep it secure; keep reasonable security in place to protect it, as described under “Security”; and delete it when the school asks or closes its class, or after a year with no sign-in, as described under “Schools and classes”.`,
};
