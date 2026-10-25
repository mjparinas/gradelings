import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Minnesota schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/minnesota.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Minnesota.",
  text: `The same applies when a Minnesota school or teacher uses ${APP_NAME} with students. In line with Minnesota Statutes section 13.32, which covers technology providers to schools, we: treat students’ information as the school’s, never ours; never sell, share or disseminate it except as the law allows (with the school, and with the service providers listed under “Who we share it with”); never use it for any commercial purpose, including marketing or advertising to students or parents; keep a security program in place to protect it, as described under “Security”; tell the school if a breach affects its students, so it can meet its own duties; and delete it, or return it to the school, when the school asks and within 90 days after the school’s agreement with us ends unless it is being renewed. ${APP_NAME} doesn’t use the location, camera or microphone of a school device, and doesn’t monitor students’ keystrokes or web browsing.`,
};
