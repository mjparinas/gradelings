import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells California schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/california.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in California.",
  text: `The same applies when a California school or teacher uses ${APP_NAME} with students. In line with California’s Student Online Personal Information Protection Act (SOPIPA, Business and Professions Code section 22584) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks. A school’s contract with us can include the terms Education Code section 49073.1 requires, and parents can review their child’s information through the school.`,
};
