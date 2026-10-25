import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Florida schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/florida.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Florida.",
  text: `The same applies when a Florida school or teacher uses ${APP_NAME} with students. In line with Florida’s Student Online Personal Information Protection Act (section 1006.1494 of the Florida Statutes) we: never use students’ information for targeted advertising; never share, sell or rent it, and never build a profile of a student except for the school’s educational purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); collect no more than we need to run the service; keep a security program in place to protect it, as described under “Security”; and delete it when the school asks, including within 90 days of the district telling us a student is no longer enrolled.`,
};
