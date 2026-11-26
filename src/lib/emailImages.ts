import { APP_NAME, MASCOT_NAME } from "./brand";

/**
 * Images in every email, drawn by `scripts/email-images.mjs` into `public/email/` and loaded from the site itself:
 * the same URL for everyone, nothing per recipient, so they can't track opens. The file name carries a version
 * because mail clients cache images for a long time; bump it when the drawing changes.
 */
export const EMAIL_IMAGES = {
  ollie: { path: "/email/ollie-wave-v1.png", critter: "ollie", mood: "wave", size: 64, alt: `${MASCOT_NAME} the otter waving hello` },
} as const;

/**
 * The name at the top of every email, drawn in Fredoka as on the site. An image, because Gmail and Outlook for Windows
 * ignore web fonts and would show it in Arial. The alt text is styled like the name, so it still reads well with
 * images off. Width and height are CSS pixels; the PNG is drawn at 3x.
 */
export const EMAIL_WORDMARK = { path: "/email/wordmark-v1.png", width: 150, height: 36, fontSize: 30, alt: APP_NAME } as const;

/**
 * The site's two fonts, self-hosted in `public/email/fonts/` (SIL Open Font License, OFL-*.txt) rather than loaded from
 * Google, so opening an email asks nothing of anyone else: Andika, the reading font, for the text, and Fredoka, the
 * wordmark's font on the site, for the name. Apple Mail, iOS Mail and Outlook for Mac show them; Gmail and Outlook for
 * Windows ignore web fonts and use the fallbacks.
 */
export interface EmailFont {
  family: string;
  stack: string;
  /** Each weight is served as `${path}.woff2` and `${path}.woff`. */
  files: readonly { weight: number; path: string }[];
}

export const EMAIL_FONTS: Record<"text" | "wordmark", EmailFont> = {
  text: {
    family: "Andika",
    stack: "Andika,system-ui,'Segoe UI',Arial,sans-serif",
    files: [
      { weight: 400, path: "/email/fonts/andika-400-v1" },
      { weight: 700, path: "/email/fonts/andika-700-v1" },
    ],
  },
  wordmark: {
    family: "Fredoka",
    stack: "Fredoka,'Arial Rounded MT Bold','Trebuchet MS',system-ui,Arial,sans-serif",
    files: [{ weight: 700, path: "/email/fonts/fredoka-700-v1" }],
  },
};

/**
 * A screenshot of the real app in an email, drawn by `scripts/email-screenshots.mjs` into `public/email/shots/`: the app's own
 * screens (a demo child with made-up practice) on a coloured card with a phone or tablet frame, saved as a JPEG at 2x. Like
 * Ollie, the same URL for everyone. Bump the version in the file name when the picture changes, because mail clients cache.
 * `width` is the CSS width; the picture is 2x that, and its height follows.
 */
export interface EmailShot {
  path: string;
  width: number;
  height?: number;
  alt: string;
}

const SHOT_WIDTH = 510;

export const EMAIL_SHOTS = {
  adventure: { path: "/email/shots/adventure-v1.jpg", width: SHOT_WIDTH, alt: `${APP_NAME} on a tablet and a phone: the home screen with its big Adventure button, and a question being answered` },
  games: { path: "/email/shots/games-v1.jpg", width: SHOT_WIDTH, alt: `The ${APP_NAME} arcade, with learning games children unlock as they level up` },
  rewards: { path: "/email/shots/rewards-v1.jpg", width: SHOT_WIDTH, alt: `${APP_NAME}'s trophy shelf and sticker book, filling up as a child learns` },
  reports: { path: "/email/shots/reports-v1.jpg", width: SHOT_WIDTH, alt: `A ${APP_NAME} parent report on a tablet and a phone, with strengths, next steps and progress charts` },
  parent: { path: "/email/shots/parent-v1.jpg", width: SHOT_WIDTH, alt: `The ${APP_NAME} parent area, with each child's week at a glance` },
  calm: { path: "/email/shots/calm-v1.jpg", width: SHOT_WIDTH, alt: `${APP_NAME}'s settings: calm mode, easier reading and read-aloud, one switch each` },
  facts: { path: "/email/shots/facts-v1.jpg", width: SHOT_WIDTH, alt: `The ${APP_NAME} math facts chart, filling in as each fact becomes automatic` },
  stories: { path: "/email/shots/stories-v1.jpg", width: SHOT_WIDTH, alt: `The ${APP_NAME} story library: short read-along stories matched to a child's reading level` },
  teacher: { path: "/email/shots/teacher-v1.jpg", width: SHOT_WIDTH, alt: `The ${APP_NAME} teacher area: a class with homework progress and what to look at next` },
} as const satisfies Record<string, EmailShot>;
