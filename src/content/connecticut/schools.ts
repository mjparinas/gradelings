import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Connecticut schools: the student data privacy law that applies and our commitments under it.
// Keep it true to docs/frameworks/connecticut.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Connecticut.",
  text: `The same applies when a Connecticut school or teacher uses ${APP_NAME} with students. In line with Connecticut’s student data privacy law (Conn. Gen. Stat. §§ 10-234aa to 10-234dd) we: never use students’ information for targeted advertising; never sell or rent it, and collect or use it only for school purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; tell students and their parents about a breach affecting them without unreasonable delay, and no later than 30 days after we find it; and delete it within a reasonable time when the school, a parent or the student asks, unless the law requires us to keep it.`,
};
