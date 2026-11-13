# App store badges on the website (Melvin, November 13, 2026)

The site footer shows a Google Play badge linking to the listing (`PLAY_STORE_URL` in `src/lib/brand.ts`) and an App Store badge marked "Coming soon" that is not a link. The home page has a short notice at the top saying the Android app exists and the iPhone and iPad app is coming soon.

**Why:** the Android app is live on Google Play and parents should be able to find it. The iOS app is not on the App Store yet.

**How to apply:** when the App Store listing is live, make the second badge in `AppBadges.tsx` a link and update the home notice. The badges are drawn in the page, not Google's or Apple's artwork files; swap those in if the stores require it. Public pages are never opened inside the store apps, so no `isStoreApp` check is needed.
