# Branded emails with app screenshots (Melvin, November 26, 2026)

Every email we send uses one layout (`src/server/emailLayout.ts`): the six wordmark colours as a stripe, the per-letter wordmark and Ollie, a white card with the heading in Fredoka, an optional callout (`spotlight`), dark-navy text on the green button (white failed contrast), and an optional screenshot (`hero`).

- **Screenshots are the real app** on a coloured card with a phone or tablet frame and "gradelings.com", made by `scripts/email-screenshots.mjs` into `public/email/shots/` (JPEGs, versioned names, self-hosted, same URL for everyone so they can't track opens). Registry: `EMAIL_SHOTS` in `src/lib/emailImages.ts`.
- **Account-security and billing emails stay plain** (sign-in, password, consent, payment, deletion): branded, no screenshot.
- **Callouts** say what a feature is and mark a family-plan-only feature with a "Family plan" pill and "(Family plan)" in the plain text. The weekly email rotates one "Did you know?" tip by week (`src/lib/emailFeatures.ts`), mixing free features (calm mode, stories, trophies, the Android app) and paid ones (math facts chart, full reports, earned games).
- **The mobile app** is mentioned where a parent chooses how to use the product: the Android app on Google Play with a link, and iPhone and iPad "on its way" with no link until it is live.
- Copy stays concise, names no price, never says grademap, and adds no made-up urgency.
