import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Nevada schools: the student privacy law that applies and our commitments under it. Keep it true
// to docs/frameworks/nevada.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Nevada.",
  text: `The same applies when a Nevada school or teacher uses ${APP_NAME} with students. In line with Nevada’s law on school service providers (NRS 388.281 to 388.296) we: say plainly what student information we collect and how we use it (this page); use it only for the classroom and the school’s purposes; never use it for targeted advertising, on ${APP_NAME} or anywhere else; never sell it, and never build a profile of a student except for the school’s instruction; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract not to use it for anything else or pass it on, and to follow the same rules; keep a security plan in place, as described under “Security”; tell the school without delay if a breach affects its students; and delete it within 30 days when the school asks.`,
};
