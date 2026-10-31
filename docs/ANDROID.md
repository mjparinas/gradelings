# Android app (phones and tablets)

The Android app is a **Trusted Web Activity (TWA)**: a small shell, built with [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), that opens `/play/` full screen in Chrome with no browser bar. There is no app code to maintain. Lessons, sync and the offline service worker are the web app's, so a release of the site is a release of the Android app.

## Why a TWA and not Capacitor

- Gradelings is already an installable PWA with a service worker and a manifest (`src/app/manifest.ts`), and `AGENTS.md` says not to add features that only work in a native shell.
- Nothing in the code needs a native API. Read-aloud uses the Web Speech API, vibration uses `navigator.vibrate`, sound is synthesized, and there are no push notifications, camera or file access. All of these work inside a TWA, which uses the device's own Chrome.
- Capacitor bundles its own WebView and a copy of the web files. That means a second release process and the risk of the app and site drifting apart. Revisit only if a native-only feature is ever approved (for example Play Billing, see below).
- One package serves phones, tablets and Chromebooks. The web manifest has `orientation: any` (Bubblewrap `default`), and the layouts are already tested on phones and tablets in both orientations (`scripts/e2e-devices.mjs`).

## What is in the repo

| File | What it does |
| --- | --- |
| `android/twa-manifest.json` | Bubblewrap project config: package id, host, colours, icons, start URL `/play/`. |
| `src/app/.well-known/assetlinks.json/route.ts` | Serves `/.well-known/assetlinks.json`, the file that lets Android hide the browser bar. It answers 200 with no redirect (Google won't follow one). |
| `src/lib/android.ts` | The package id and the asset links builder. Fingerprints come from the `ANDROID_CERT_SHA256` environment variable. |
| `.gitignore` | Keeps `*.keystore`, `*.jks` and build output out of git. |

The web manifest is unchanged. The package id `com.gradelings.app` is in two places (`android/twa-manifest.json` and `src/lib/android.ts`); a test keeps them equal. **It can never change once the app is published.**

## What you need to do yourself

Each of these needs an account or a choice only the owner can make. The build itself runs on GitHub (`.github/workflows/android.yml`), so no Java or Android SDK is needed on your computer.

1. **Create a Google Play Console developer account** (play.google.com/console; a one-time US$25 fee and identity verification). An organization account needs a D-U-N-S number. A **personal** account created after November 2023 must run a closed test with at least 12 testers for 14 days in a row before it can apply for production; an organization account skips that. Check Google's current rules when you sign up.
2. **Make the upload key.** In GitHub, add the secret `ANDROID_KEYSTORE_PASSWORD` (a long password; keep it in a password manager). Then Actions > Android > Run workflow > task `create-key`. Download the `upload-key` artifact within a day, keep `grademap-upload.keystore` with the password in your password manager, and paste the text of `ANDROID_KEYSTORE_B64.txt` into a new secret `ANDROID_KEYSTORE_B64`. The run refuses to make a second key once that secret exists.
3. **Build:** Actions > Android > Run workflow > task `build`. The `gradelings-android` artifact has `app-release-bundle.aab` (upload to Play) and `app-release-signed.apk` (installs on a device for testing).
4. **Create the app in the Play Console** with the package `com.gradelings.app` and keep **Play App Signing** on (the default). Google re-signs the app with its own key, so **the fingerprint that matters is Google's**: your app > Test and release > App integrity > App signing > "SHA-256 certificate fingerprint".
5. **Set `ANDROID_CERT_SHA256`** in Vercel (Production) to that fingerprint. To also test the APK from step 3, add the upload key's fingerprint (`upload-key-sha256.txt`), comma-separated. The route reads the variable on each request, but Vercel only applies a changed variable to new deployments, so redeploy once.
6. **Check the link:** `https://www.gradelings.com/.well-known/assetlinks.json` should list the fingerprint. With the app installed from Play, there should be no browser bar. If the bar shows, the fingerprint, package id or host doesn't match.
7. **Fill in the listing and App content pages** from `docs/PLAY_LISTING.md`: descriptions, screenshots, privacy policy, target audience (this puts the app in the Families program), Data safety, content rating and reviewer access.
8. **Release:** upload the `.aab` to Internal testing first and install it on your own phone and tablet; then the closed test if your account needs one; then Production. Google's review of a new app usually takes a few days, sometimes longer for apps for children.

The host is `www.gradelings.com`, not the bare domain: the bare domain answers with a redirect to `www`, and Android won't follow a redirect to `assetlinks.json`, so the app would always show a browser bar. A test (`src/lib/android.test.ts`) keeps it so. If the site ever moves domain, change `host` and the three URLs in `android/twa-manifest.json`, and publish a new version.

For later releases, raise `appVersionCode` and `appVersionName` in `android/twa-manifest.json`, run the `build` task again, and upload the new bundle. (On your own computer instead: `npx @bubblewrap/cli update --skipVersionUpgrade` then `npx @bubblewrap/cli build` in `android/`, which needs JDK 17 and the Android SDK.) Site changes need no new release.

## Paying: not inside the Android app

Google Play generally requires subscriptions for digital content sold inside an app to use Google Play Billing (with a fee), and doesn't allow sending people from the app to an outside checkout such as Stripe. Decision: **the Android app has no purchase screens** and families subscribe on the website. Their plan syncs to the app like any other device.

- The app opens `/play/?app=android` (`startUrl` in `android/twa-manifest.json`). `src/lib/twa.ts` (`isAndroidApp`) reads that, or the `android-app://` referrer, and keeps it in `sessionStorage`.
- The Android app shows no prices, payment buttons, subscribe prompts or link into checkout, and doesn't name the website as a place to pay (Google Play counts that as steering). The Subscription page says only that the app can't take a payment and that a membership shows up once the parent signs in; the lock dialog asks the child to ask a grown-up; the subscribe banner and header button are hidden.
- Rejection is still possible. Check Google's current payments policy before you submit, and if it asks for more, the fallback is Google Play Billing (not built).
- The Families policy also applies because the app is for children. The no-ads and no-purchases-by-kids rules in `AGENTS.md` fit it, there is no analytics in the kids' app, and the parent area is behind the PIN gate.

## Testing before you publish

- Open the production site in Chrome on a phone and a tablet. "Install app" should be offered, which checks the manifest and service worker.
- Use Play Console **internal testing** to install the real bundle on your own devices (no review).
- Check: opening `/play/` from the app icon, rotating the screen, working offline after one online visit, read-aloud, and that a link to an outside site opens in a Custom Tab and returns to the app.
