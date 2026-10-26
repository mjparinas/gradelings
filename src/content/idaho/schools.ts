import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells Idaho schools: the student data law that applies and our commitments under it. Keep it true
// to docs/frameworks/idaho.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in Idaho.",
  text: `The same applies when an Idaho school or teacher uses ${APP_NAME} with students. Idaho’s student data law (Idaho Code section 33-133, the Student Data Accessibility, Transparency and Accountability Act) asks schools to make sure the online services they contract with safeguard student privacy and security, limit secondary uses of student data and delete it on a set schedule. In line with it we: say plainly what student information we collect and how we use it (this page); use it only for the classroom and the school’s purposes, with no secondary uses; never use it for advertising, on ${APP_NAME} or anywhere else; never sell it; share it only with the school and the service providers listed under “Who we share it with”, who are bound by contract to the same rules; keep reasonable security procedures in place, as described under “Security”; and delete it when the school asks, and on the schedule under “How long we keep it”.`,
};
