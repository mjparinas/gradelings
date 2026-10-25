import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Colorado schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/colorado.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Colorado.",
  text: `The same applies when a Colorado school or teacher uses ${APP_NAME} with students. In line with Colorado’s Student Data Transparency and Security Act (C.R.S. 22-16-101 to 22-16-112) we: say plainly what student information we collect and why (this page); use it only for the school’s educational purposes; never sell it, never use it for targeted advertising, and never build a profile of a student except for those purposes; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract to the same limits; keep a security program in place to protect it, as described under “Security”; tell the school if a breach affects its students; and delete it when the school asks or when our agreement with the school ends.`,
};
