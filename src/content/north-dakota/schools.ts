import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells North Dakota schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/north-dakota.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in North Dakota.",
  text: `When a North Dakota school or teacher uses ${APP_NAME} with students, we follow the school district’s student data policy under N.D. Cent. Code § 15.1-07-25.3 and the school’s agreement with us, as well as federal law (FERPA and COPPA). That law requires each school board to approve sharing student data with anyone outside the district and to keep a list of the people and companies it shares student data with, so we work with students’ information only once the school has agreed to use ${APP_NAME}, and we will give the school what it needs to list us. We use students’ information only to provide ${APP_NAME} to the school, and never for any commercial purpose, including advertising; we never sell or rent it; we share it only as the school allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); we keep a security program in place to protect it, as described under “Security”; we delete it when the school asks; and, if we discover a breach of data we hold for a school, we tell the school without delay so it can notify families.`,
};
