import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Oregon schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/oregon.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Oregon.",
  text: `The same applies when an Oregon school or teacher uses ${APP_NAME} with students. In line with the Oregon Student Information Protection Act (ORS 336.184) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.`,
};
