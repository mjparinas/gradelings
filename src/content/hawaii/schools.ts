import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Hawaiʻi schools: the law that applies and our commitments under it. Keep it true to
// docs/frameworks/hawaii.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Hawaiʻi.",
  text: `When a Hawaiʻi school or teacher uses ${APP_NAME} with students, we follow Hawaiʻi’s Student Online Personal Information Protection law (Hawaiʻi Revised Statutes sections 302A-499 and 302A-500). We: never use students’ information, or anything we learn about them through the service, for targeted advertising; never build a profile of a student except for the school’s K-12 purposes; never sell or rent it; share it only as the law and the school allow (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks. Federal law (FERPA and COPPA) and the school’s agreement with us apply as well.`,
};
