import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Texas schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/texas.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Texas.",
  text: `The same applies when a Texas school or teacher uses ${APP_NAME} with students. In line with Texas Education Code chapter 32, subchapter D (sections 32.151 to 32.157) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.`,
};
