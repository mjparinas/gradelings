import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells New Hampshire schools: the student online privacy law that applies and our commitments under
// it. Keep it true to docs/frameworks/new-hampshire.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in New Hampshire.",
  text: `The same applies when a New Hampshire school or teacher uses ${APP_NAME} with students. In line with New Hampshire’s student online personal information law (RSA 189:68-a) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s purposes; disclose it only as the law allows (to the school, and to the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep reasonable security in place to protect it, as described under “Security”; delete it when the school asks; and, if we discover a breach of data we hold for a school, tell the school without delay so families can be notified under New Hampshire law.`,
};
