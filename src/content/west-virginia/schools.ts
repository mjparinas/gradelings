import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells West Virginia schools: the student data privacy law that applies and our commitments under it.
// Keep it true to docs/frameworks/west-virginia.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in West Virginia.",
  text: `The same applies when a West Virginia school or teacher uses ${APP_NAME} with students. West Virginia’s Student Data Accessibility, Transparency and Accountability Act (W. Va. Code § 18-2-5h) requires contracts with private providers that handle student data to safeguard its privacy and security, and bars schools from collecting some kinds of information. In line with it we: collect none of the information the Act bars schools from collecting (political, religious or sexual orientation information, information about firearms in a student’s family, or anything gathered by detecting a student’s emotions) and none of the confidential information it lists, such as identification numbers, biometric information or handwriting samples; use students’ information only to provide ${APP_NAME} to the school, never for advertising, and never sell it; disclose it only to the school and to the service providers listed under “Who we share it with”, who are bound to keep it secure; keep reasonable security in place, as described under “Security”; tell the school about a breach affecting its students as soon as possible; and delete it when the school asks, as described under “Schools and classes”.`,
};
