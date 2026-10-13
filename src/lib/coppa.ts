import { FRAMEWORKS, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import type { FamilyInfo, Profile } from "./model";
import type { Country } from "./plan";

// US families: which country a family is in, and the parental consent the US Children's Online Privacy
// Protection Act (COPPA, as amended in 2025) asks for before a child's information reaches our server.
// We use children's information only inside the service, so "email plus" consent applies: the parent reads
// a direct notice and ticks consent, we email a confirmation straight away and a second one a day or more
// later, each with a link to withdraw. Until consent is recorded, sync keeps a US family's children and
// progress on the device only, as on a device with no account. Canadian families never see any of this,
// and class student accounts are covered by their school's consent.

/** Bump when the notice below changes in a way that matters; the version a parent agreed to is stored with their consent. */
export const CONSENT_NOTICE_VERSION = "2026-10";

/** The delayed confirmation email goes out at least this long after consent. */
export const CONSENT_FOLLOWUP_DELAY_MS = 86_400_000;

/** The direct notice a US parent reads before agreeing. The consent panel, the emails and /privacy/ all use it. */
export const CONSENT_NOTICE = {
  collect: "For each child: a first name or nickname, grade, an optional birth year (only to suggest a grade), an avatar, and practice results (which questions, right or wrong, when and how long). Children never type free text, upload photos or record their voice.",
  why: "Only to run the app for your family: choose questions, keep score, sync between your devices and show you reports.",
  never: "We don’t sell it, we show no ads, we don’t use it to build profiles for anything else, and we don’t disclose it to anyone except the service providers that run the app for us.",
  retention: "We keep it while your account is open. If you delete a child, your account or this consent, we delete the children’s information from our servers straight away.",
  rights: "You can review it (download it as a file), delete it, or refuse further collection at any time in the Parent area under Account, or with the link in the confirmation email.",
} as const;

/** A family's country, from the first child added: US when that child follows a US curriculum. */
export function familyCountry(profiles: Pick<Profile, "framework" | "createdAt" | "deleted">[]): Country {
  const first = profiles.filter((p) => p && !p.deleted).sort((a, b) => (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0))[0];
  if (!first) return "CA";
  const fw = [...FRAMEWORKS, ...UPCOMING_FRAMEWORKS].find((f) => f.id === first.framework);
  return fw?.country === "US" ? "US" : "CA";
}

/** Whether this family must give US parental consent before its children's information is synced. */
export function consentNeeded(family: Pick<FamilyInfo, "country" | "consentAt" | "account">): boolean {
  if (!family.account || family.account.student) return false;
  return family.country === "US" && !family.consentAt;
}
