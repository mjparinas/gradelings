import { MASCOT_NAME } from "./brand";

/**
 * Images in every email, drawn by `scripts/email-images.mjs` into `public/email/` and loaded from the site itself:
 * the same URL for everyone, nothing per recipient, so they can't track opens. The file name carries a version
 * because mail clients cache images for a long time; bump it when the drawing changes.
 */
export const EMAIL_IMAGES = {
  ollie: { path: "/email/ollie-wave-v1.png", critter: "ollie", mood: "wave", size: 64, alt: `${MASCOT_NAME} the otter waving hello` },
} as const;

/**
 * Andika, the app's reading font, for the text of every email. Self-hosted in `public/email/fonts/` (SIL Open Font
 * License, OFL.txt) rather than loaded from Google, so opening an email asks nothing of anyone else. Apple Mail, iOS
 * Mail and Outlook for Mac show it; Gmail and Outlook for Windows ignore web fonts and use the fallbacks.
 */
export const EMAIL_FONT = {
  family: "Andika",
  stack: "Andika,system-ui,'Segoe UI',Arial,sans-serif",
  files: [
    { weight: 400, path: "/email/fonts/andika-400-v1" },
    { weight: 700, path: "/email/fonts/andika-700-v1" },
  ],
} as const;
