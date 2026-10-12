import { MASCOT_NAME } from "./brand";

/**
 * Images in every email, drawn by `scripts/email-images.mjs` into `public/email/` and loaded from the site itself:
 * the same URL for everyone, nothing per recipient, so they can't track opens. The file name carries a version
 * because mail clients cache images for a long time; bump it when the drawing changes.
 */
export const EMAIL_IMAGES = {
  ollie: { path: "/email/ollie-wave-v1.png", critter: "ollie", mood: "wave", size: 64, alt: `${MASCOT_NAME} the otter waving hello` },
} as const;
