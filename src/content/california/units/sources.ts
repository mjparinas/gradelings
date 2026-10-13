import type { Unit } from "../../types";
import { OWN_SOCIAL as OREGON_SOCIAL } from "../../oregon/units/social";
import { OWN_SOCIAL as WASHINGTON_SOCIAL } from "../../washington/units/social";
import { OWN_SOCIAL_UPPER as WASHINGTON_UPPER } from "../../washington/units/social-upper";

/** Washington's and Oregon's own social studies units, which California copies without their state-specific items. */
export const SOURCE: Unit[] = [
  WASHINGTON_SOCIAL,
  WASHINGTON_UPPER,
  OREGON_SOCIAL,
].flatMap((byGrade) => Object.values(byGrade).flat() as Unit[]);
