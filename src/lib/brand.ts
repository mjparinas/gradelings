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
export const SOCIAL_PROFILES: string[] = [];
/** Hostname a parent types into a browser. The Android app names this site because it can't take payment. */
export const SITE_HOST = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gradelings.com").hostname.replace(/^www\./, "");
/** Postal address shown in the legal pages and every email's footer (CASL requires it in commercial email). Nothing is shown while it is empty. */
export const MAILING_ADDRESS = "603 Front Street #810, Lynden, WA 98264";
/** Bump when the privacy policy or terms change. */
export const LEGAL_UPDATED = "October 14, 2026";
/** Date of the AI review of the privacy policy and terms (see docs/DEPLOY.md). This is not a lawyer's review. */
export const LEGAL_AI_REVIEWED = "October 9, 2026";
