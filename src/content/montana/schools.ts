import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Montana schools: the student data privacy law that applies and our commitments under it.
// Keep it true to docs/frameworks/montana.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Montana.",
  text: `The same applies when a Montana school or teacher uses ${APP_NAME} with students. In line with Montana’s Pupil Online Personal Information Protection Act (Montana Code Annotated sections 20-7-1323 to 20-7-1326) we: never use students’ information for targeted advertising, on ${APP_NAME} or anywhere else; never use it to build a profile of a student except for school purposes; never sell or rent it; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security procedures in place to protect it, as described under “Security”; and delete it when the school asks, unless the law requires us to keep it.`,
};
