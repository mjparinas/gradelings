import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Ohio schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/ohio.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Ohio.",
  text: `The same applies when an Ohio school or teacher uses ${APP_NAME} with students. In line with Ohio Revised Code sections 3319.325 to 3319.327 we: treat the student records we hold for a school as the school’s property; protect them as Chapter 1347 of the Revised Code asks of a school district; never sell or share them, never use them for marketing or advertising, and use them only for the school’s educational purposes; let only staff who need them for their work see them; never turn on location tracking, a microphone or a camera, and never monitor what a student does outside ${APP_NAME}; give the school what it needs to name us in its notice to families; tell the school if a breach affects its students; and delete or return the records within 90 days after our agreement with the school ends, or sooner when the school asks.`,
};
