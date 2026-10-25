import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Wisconsin schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/wisconsin.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Wisconsin.",
  text: `Wisconsin has no student online privacy law of its own for technology providers (its pupil records law, Wisconsin Statutes 118.125, applies to schools), so the same commitments apply when a Wisconsin school or teacher uses ${APP_NAME} with students, under the school’s agreement with us and federal law (FERPA and COPPA). We: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s educational purposes; share it only as the school allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and, if we discover a breach of data we hold for a school, tell the school without unreasonable delay, and within 45 days at most, so it can notify families under Wisconsin’s breach notification law (Wisconsin Statutes 134.98).`,
};
