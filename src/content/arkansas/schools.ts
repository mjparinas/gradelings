import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Arkansas schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/arkansas.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Arkansas.",
  text: `The same applies when an Arkansas school or teacher uses ${APP_NAME} with students. In line with Arkansas’s Student Online Personal Information Protection Act (Arkansas Code 6-18-109) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.`,
};
