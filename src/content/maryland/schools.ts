import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Maryland schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/maryland.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Maryland.",
  text: `The same applies when a Maryland school or teacher uses ${APP_NAME} with students. In line with Maryland’s Student Data Privacy Act (Education Article, section 4-131, Annotated Code of Maryland) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for preschool to Grade 12 school purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; delete it within a reasonable time when the school or school system asks; and, if we discover a breach of data we hold for a school, tell the school without unreasonable delay so it can notify families under Maryland’s Personal Information Protection Act.`,
};
