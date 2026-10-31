import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Louisiana schools: the student privacy law that applies and our commitments under it (Louisiana
// Revised Statutes 17:3914, Subsections F and J; source in gradelings-research/louisiana/source/). Keep it true to
// docs/frameworks/louisiana.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Louisiana.",
  text: `The same applies when a Louisiana school or teacher uses ${APP_NAME} with students. In line with Louisiana’s student privacy law (Louisiana Revised Statutes 17:3914) we: never sell, share or use student information for advertising, marketing or any other commercial purpose; never use it for predictive modeling that limits a student’s opportunities; give access to it only as the school allows, and to the service providers listed under “Who we share it with”, who are bound by contract to use it only for the service they provide and to keep it secure; keep reasonable security in place to protect it, as described under “Security”; and delete it when the school asks or closes its class, or after a year with no sign-in, as described under “Schools and classes”.`,
};
