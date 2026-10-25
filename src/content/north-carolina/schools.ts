import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells North Carolina schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/north-carolina.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in North Carolina.",
  text: `The same applies when a North Carolina school or teacher uses ${APP_NAME} with students. In line with North Carolina’s law on the protection of student data by operators (G.S. 115C-401.2) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s educational purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; tell the school about a breach affecting its students without unreasonable delay; and delete it within 45 days when the school asks or tells us it has stopped using ${APP_NAME}.`,
};
