import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Alabama schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/alabama.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Alabama.",
  text: `The same applies when an Alabama school or teacher uses ${APP_NAME} with students. Alabama has no student privacy law of its own beyond FERPA, so we work under the school district’s data agreement, as the Alabama State Board of Education’s data use policy expects, and make the same commitments as above: we never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.`,
};
