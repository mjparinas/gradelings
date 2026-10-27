import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Rhode Island schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/rhode-island.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Rhode Island.",
  text: `When a Rhode Island school or teacher uses ${APP_NAME} with students, we follow R.I. Gen. Laws § 16-104-1 (student data and cloud computing services) and the school’s agreement with us, as well as federal law (FERPA and COPPA). We process students’ information only to provide ${APP_NAME} to the school, and never for any commercial purpose, including advertising; we never sell or rent it, and never build a profile of a student except for the school’s educational purposes; we share it only as the school allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); we keep a security program in place to protect it, as described under “Security”; we delete it when the school asks; we will certify our compliance with § 16-104-1 in writing when a Rhode Island school asks; and, if we discover a breach of data we hold for a school, we tell the school without delay so it can notify families.`,
};
