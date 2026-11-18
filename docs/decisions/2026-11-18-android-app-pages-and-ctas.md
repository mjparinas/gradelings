# Android app pages and calls to action (Melvin, November 18, 2026)

Melvin asked for more calls to action for the Android app on the website and more posts about the launch. Shipped: a `/android/` page with the Google Play badge, FAQs and three short guides (`/android/set-up-on-android/`, `/android/offline-learning-on-android/`, `/android/android-in-the-classroom/`, data in `src/components/site/android.ts`), a shared `AndroidCta` block on pricing, help, help at home, about and For teachers, a link in the home notice (the footer is capped at 24 links), and a What's new entry. The pages are in the `pages` sitemap.

**Why:** the app is live on Google Play (checked November 18, 2026) and parents and teachers should find it from the pages they already visit. The site has no blog; guides and What's new posts are where launch posts go.

**How to apply:** public pages are never opened inside the store apps, so no `isStoreApp` check is needed. Keep the app's own text free of prices and trials (see Store apps sell nothing). When the App Store listing is live, update `android.ts` FAQs and `AppBadges.tsx`.
