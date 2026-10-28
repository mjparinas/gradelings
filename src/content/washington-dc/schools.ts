import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells schools in Washington, DC: the student privacy law that applies and our commitments under it. Keep
// it true to docs/frameworks/washington-dc.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Washington, DC.",
  text: `The same applies when a school or teacher in Washington, DC uses ${APP_NAME} with students. In line with the District’s student digital privacy law (D.C. Code §§ 38-831.01 to 38-831.06) we: never sell, rent or trade students’ information; never use it for targeted advertising; never build a profile of a student except for the school’s purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound by contract not to use or pass it on for anything else and to keep it secure); treat it as under the control of the school or LEA; keep reasonable security in place to protect it, as described under “Security”, and tell the school if it is ever accessed without permission; and delete it when the school or LEA asks or the teacher closes the class.`,
};
