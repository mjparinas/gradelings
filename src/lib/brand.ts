// App name: change it here and it updates across the site and the install manifest.
export const APP_NAME = "Gradelings";
/** Per-letter colours for the name, shared by the play screen and the public header. */
export const WORDMARK_COLOURS = ["#4f8ef7", "#e9559a", "#25b47e", "#ff9636", "#8b5cf6", "#06b6d4"] as const;
export const MASCOT_NAME = "Ollie";

// Used by the privacy policy and terms. Replace both before launch (see docs/DEPLOY.md).
export const LEGAL_NAME = "Gradelings";
export const CONTACT_EMAIL = "hello@gradelings.com";
/**
 * The brand's own social profiles (full https URLs), listed as `sameAs` in the site's Organization structured data so
 * search engines tie them to the site. Add each one once the account exists; never list a profile we don't own.
 */
export const SOCIAL_PROFILES: string[] = [
  "https://www.instagram.com/gradelings_com/",
  "https://www.pinterest.com/gradelings",
  "https://www.facebook.com/people/Gradelings/61595170062640/",
];
/**
 * The social accounts the brand will have (owner's decision, October 2026). Until each one's URL is in
 * `SOCIAL_PROFILES`, the admin panel's to-do list asks for it (`missingSocialPlatforms`), except a platform marked
 * `later`, which the owner has put off (YouTube, October 2026).
 */
export const SOCIAL_PLATFORMS = [
  { name: "Instagram", host: "instagram.com" },
  { name: "YouTube", host: "youtube.com", later: true },
  { name: "Pinterest", host: "pinterest.com" },
  { name: "Facebook", host: "facebook.com" },
] as const;

/** The chosen platforms, not put off for later, with no profile URL listed yet. Pinterest's country sites (pinterest.ca) count as Pinterest. */
export function missingSocialPlatforms(profiles: readonly string[] = SOCIAL_PROFILES): string[] {
  const hosts = profiles.flatMap((u) => {
    try {
      return [new URL(u).hostname.replace(/^(www|m)\./, "")];
    } catch {
      return [];
    }
  });
  const has = (host: string) => hosts.some((h) => h === host || h.split(".")[0] === host.split(".")[0]);
  return SOCIAL_PLATFORMS.filter((p) => !("later" in p && p.later) && !has(p.host)).map((p) => p.name);
}
/** Hostname a parent types into a browser. The Android app names this site because it can't take payment. */
export const SITE_HOST = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gradelings.com").hostname.replace(/^www\./, "");
/** How soon a person answers mail, shown on Contact and Help. Keep it true. */
export const REPLY_TIME = "one business day";
/** Postal address shown in the legal pages and every email's footer (CASL requires it in commercial email). Nothing is shown while it is empty. */
export const MAILING_ADDRESS = "603 Front Street #810, Lynden, WA 98264";
/** Bump when the privacy policy or terms change. */
export const LEGAL_UPDATED = "October 14, 2026";
/** Date of the AI review of the privacy policy and terms (see docs/DEPLOY.md). This is not a lawyer's review. */
export const LEGAL_AI_REVIEWED = "October 9, 2026";
