import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Kentucky schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/kentucky.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Kentucky.",
  text: `The same applies when a Kentucky school or teacher uses ${APP_NAME} with students. In line with Kentucky’s law on cloud computing services for schools (KRS 365.734) we: use student data only to provide and improve ${APP_NAME} for the school; never use it for advertising, or to build a profile of a student for advertising; never sell it or use it for any other commercial purpose; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract not to use it for anything else or pass it on, and to keep it secure; and confirm these commitments to a school in writing when it asks.`,
};
