import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells New Jersey schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/new-jersey.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in New Jersey.",
  text: `The same applies when a New Jersey school or teacher uses ${APP_NAME} with students. In line with New Jersey’s law on student online education services (P.L.2019, c.494, N.J.S.A. 56:8-215 to 56:8-221) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for Kindergarten to Grade 12 school purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; tell the school about a breach affecting its students without unreasonable delay; and delete it when the school or district asks, or when a student who has come of age asks.`,
};
