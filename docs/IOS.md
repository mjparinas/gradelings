# iPhone and iPad app

One universal app for iPhone and iPad, in `ios/`. It is a small native Swift shell around a `WKWebView` that opens `/play/` (and `/parents/` from there), so lessons, sync and the offline service worker are the web app's, like the Android app (`docs/ANDROID.md`). A release of the site is a release of the app; a new App Store build is needed only when something in `ios/` changes.

## Why a native shell, and not Capacitor or a bare web view

- iOS has no Trusted Web Activity, so the Android approach can't be copied. Capacitor would bundle a copy of the web files (a second release process, and the app and site drifting apart) and adds a plugin layer the app doesn't need.
- Apple rejects apps that are only a website in a frame (App Review Guideline 4.2, minimum functionality). The shell adds what Safari's own web view leaves out, so the app does things the website can't:
  - **Works offline.** The site is the app's only "app-bound domain" (`WKAppBoundDomains` in `Info.plist`), which is what lets the site's service worker run inside the app. After one visit online, lessons open with no internet. On a first launch with no internet, a native "Let's get connected" screen with Try again shows instead of an error.
  - **Haptics.** `navigator.vibrate` doesn't exist in Safari; the app adds it and plays the web app's patterns (`src/lib/haptics.ts`) as Taptic Engine taps. The child's vibration setting and Reduce Motion still decide.
  - **Share sheet, printing and saving files.** The bridge script (`ios/Gradelings/NativeBridge.js`) adds `navigator.share` (the invite link), `window.print` (reports and the report card conversation sheet, through AirPrint and Save to PDF) and file downloads (the parent's data export opens the share sheet so it can be saved to Files).
  - **Read-aloud through the speaker even with the silent switch on**, mixed with other audio.
  - **A real iPad app:** every orientation, Split View, Slide Over and Stage Manager, and a launch screen.
- The web app changes nothing for the iPhone except hiding purchases (below) and the "Add to Home Screen" nudge, so `AGENTS.md`'s rule against native-only features holds.

## What is in the repo

| File | What it does |
| --- | --- |
| `ios/project.yml` | The Xcode project, as an [XcodeGen](https://github.com/yonaskolb/XcodeGen) spec. `xcodegen generate` writes `Gradelings.xcodeproj` (not committed). Bundle id, version, team, and the site (`APP_ORIGIN`, `APP_DOMAIN`). |
| `ios/Gradelings/Info.plist` | Orientations (iPhone: portrait and both landscapes; iPad: all four), app-bound domain, launch screen, start path `/play/?app=ios`, no export-compliance encryption. |
| `ios/Gradelings/WebViewController.swift` | The web view, link rules, downloads, share sheet, printing, alerts and the offline screen. |
| `ios/Gradelings/LinkPolicy.swift` | Which links stay in the app (`/play/`, `/parents/`, `/account/`, `/shared/`), which open in a Safari sheet (help, privacy, terms, other sites), and which never open (home page, pricing, guides). |
| `ios/Gradelings/NativeBridge.js` | Adds `navigator.share`, `navigator.vibrate` and `window.print` to every page. |
| `ios/Gradelings/Assets.xcassets` | App icon (1024 px, from `public/icon.svg`, no transparency) and launch screen. |
| `ios/Gradelings/PrivacyInfo.xcprivacy` | Apple's privacy manifest: no tracking, no tracking domains. |
| `ios/GradelingsTests/` | Unit tests for the link rules, the settings in `Info.plist` and haptics, run on an iPhone and an iPad simulator. |
| `ios/ExportOptions.plist` | Export for App Store Connect and upload, with automatic signing. |
| `.github/workflows/ios.yml` | On a Mac runner: tests on iPhone and iPad when `ios/` changes; by hand, signs and uploads to TestFlight. |
| `src/lib/twa.ts` | `isIosApp` and `isStoreApp`: the web app knows it's inside the app from `?app=ios` or the user agent (`GradelingsApp-iOS`). |
| `src/lib/ios.test.ts` | Keeps the web app and `ios/` agreeing (start path, user agent, domain, orientations). |
| `scripts/ios-screenshots.mjs` | App Store screenshots at iPhone 6.9" and iPad 13" sizes. |

The bundle id is `ca.grademap.app`, the same as the Android package. **It can never change once the app is in App Store Connect.**

## Paying: not inside the iOS app

The App Store requires digital subscriptions sold in an app to use Apple's In-App Purchase (guideline 3.1.1), and doesn't allow buttons, links or wording that send people to pay elsewhere (3.1.1 and 3.1.3). Families who subscribe on the website can still use what they paid for in the app (3.1.3(b), multiplatform services). So the iOS app works like the Android app:

- No prices, payment buttons, subscribe prompts or link into checkout (`isStoreApp` hides them, the same switches as Android). The Subscription page says only that the app can't take a payment and that a membership shows up once the parent signs in. The lock dialog asks the child to ask a grown-up.
- **No "Have a code?" box** (`isIosApp` in `Subscription.tsx`): Apple doesn't allow unlocking content with codes sold or given outside the App Store. Codes still work on the website, and the access shows up in the app.
- The app never opens the home page, pricing or guides (`LinkPolicy`), since they carry prices and sign-up buttons. The privacy, terms and help pages open in a Safari sheet.
- The free trial and the free first units work as on the web, with nothing to buy.

**Rejection is still possible**, most often as "the app is useless without paying elsewhere". The answer to a reviewer is that the free plan works with no account and no payment. If Apple insists, the fallback is In-App Purchase (not built; see "Decisions for the owner").

## Kids Category

The app can go in the **Education** category with a 4+ age rating, or in the **Kids Category** (ages 5 and under, 6 to 8, 9 to 11). Kids Category rules (guideline 1.3): no third-party analytics or ads (there are none in `/play/` or `/parents/`; Vercel analytics is on public pages only, which the app never opens in its web view), and links out of the app and any purchase must be behind a parental gate (the parent area's PIN gate does this; help and legal pages open only from the parent area). Apple doesn't let an app leave the Kids Category once it's approved there. Default: Education, 4+.

## What you need to do yourself

1. **Deploy the site to the production domain** (`docs/DEPLOY.md`). If it isn't `gradelings.com`, change `APP_ORIGIN` and `APP_DOMAIN` in `ios/project.yml` (and `NEXT_PUBLIC_SITE_URL`; `src/lib/ios.test.ts` checks they match).
2. **Join the Apple Developer Program** (developer.apple.com/programs, US$99 a year). Enrolling as an organization needs a D-U-N-S number; as an individual, the seller name on the App Store is your own name.
3. **Find your Team ID:** developer.apple.com > Account > Membership details (10 characters).
4. **Create the app in App Store Connect** (appstoreconnect.apple.com > Apps > +): platform iOS, name "Gradelings: K-9 Practice", bundle id `ca.grademap.app` (register it first under Certificates, Identifiers & Profiles > Identifiers if it isn't offered), SKU `gradelings-ios`.
5. **Create an App Store Connect API key:** App Store Connect > Users and Access > Integrations > App Store Connect API > Team Keys > +, access **Admin** (needed so the build can create its own signing certificate and profile). Download the `.p8` file (it can be downloaded once) and note the Key ID and the Issuer ID shown above the list.
6. **Add four repository secrets** (GitHub > Settings > Secrets and variables > Actions > New repository secret):

   | Secret | Value |
   | --- | --- |
   | `APPLE_TEAM_ID` | The Team ID from step 3. |
   | `ASC_KEY_ID` | The API key's Key ID. |
   | `ASC_ISSUER_ID` | The Issuer ID. |
   | `ASC_KEY_P8` | The whole contents of the `.p8` file, including the BEGIN and END lines. |

   No certificate (`.p12`) or provisioning profile is needed: signing is automatic through the API key, and Apple keeps the distribution certificate.
7. **Upload a build:** GitHub > Actions > iOS > Run workflow, tick "Sign and upload to TestFlight". The build number is the run number. The build appears in App Store Connect > TestFlight after Apple processes it.
8. **Test on your own iPhone and iPad** with TestFlight (internal testing, no review): first launch, offline after one visit, read-aloud with the silent switch on, rotating, Split View on iPad, sharing the invite link, printing a report, the data export, and that no prices or subscribe buttons show.
9. **Fill in the App Store listing** (below) and submit for review.

To build on a Mac yourself: `brew install xcodegen`, `cd ios && xcodegen generate && open Gradelings.xcodeproj`, pick your team under Signing & Capabilities, and run on a simulator or device. For a local server, add `APP_ORIGIN=http://localhost:3000` and `APP_DOMAIN=localhost` to the target's build settings. Web Inspector works in Debug builds (Safari > Develop).

For later releases, raise `MARKETING_VERSION` in `ios/project.yml` when `ios/` changes, and run the workflow again. Site changes need no new build.

## App Store listing

- **Name:** Gradelings: K-9 Practice. **Subtitle** (30 characters): `Curriculum practice for kids`.
- **Description:** the Google Play full description in `docs/PLAY_LISTING.md` works as is, except the last line: say "Free to start. The first units of every subject are free." and leave out the trial, prices and where to subscribe (3.1.1).
- **Keywords** (100 characters): `math,reading,french,curriculum,practice,kindergarten,grade,report card,BC,Ontario,Alberta,homework`
- **Category:** Education (secondary: none). **Age rating:** 4+ (answer "none" to every content question; "unrestricted web access": no, because the app only opens its own pages and a Safari sheet the parent closes).
- **Support URL:** `https://<domain>/help/`. **Privacy policy URL:** `https://<domain>/privacy/`.
- **Screenshots:** `node scripts/ios-screenshots.mjs http://localhost:3000` against a production build writes iPhone 6.9" (1320 × 2868) and iPad 13" (2064 × 2752, portrait and landscape) screenshots to `e2e-shots/ios-app-store/`, from a demo child named Maya. Upload 3 to 10 per device; App Store Connect scales them for smaller screens.
- **App Review information:** no sign-in is needed: open the app, tap "Let's go", add a child. The parent area asks to set a PIN on first visit; tell the reviewer to choose any 4 digits. Add a note: "Families who subscribed on our website can sign in and use their membership here (3.1.3(b)). The app sells nothing and links to no payment. The free plan works with no account."
- **App Privacy ("nutrition label")**, matching the Data safety answers in `docs/PLAY_LISTING.md`. Only when a parent makes an account and turns on sync:
  - Contact info > Email address (the parent's): App functionality; linked to the user; not used for tracking.
  - User content > Other user content (a child's first name or nickname, grade, optional birth year, avatar): App functionality; linked; not tracking.
  - Usage data > Product interaction (practice answers and results): App functionality and Analytics shown to the parent; linked; not tracking.
  - Diagnostics > Crash data (Sentry, when error reporting is on): App functionality; not linked; not tracking.
  - Tracking: **No**.
- **Export compliance:** answered in `Info.plist` (`ITSAppUsesNonExemptEncryption` is false: only HTTPS).
- **Account deletion** (guideline 5.1.1(v)): in the app under Parent area > Account > Delete account.

## Decisions for the owner

- **In-App Purchase.** Not built. The app sells nothing, which Apple usually accepts for an app that works free. Adding Apple's In-App Purchase (StoreKit, Apple's 15% small-business commission, server receipt checks, and a second billing system beside Stripe) is the fallback if review insists.
- **US link-out.** Since 2025, apps on the US storefront may link to a web checkout. Gradelings sells in Canada, where that isn't allowed, so the app links to none.
- **Kids Category or Education.** See above; the default is Education, 4+, because Kids Category can't be undone.
- **Bundle id.** `ca.grademap.app`, the same as Android. It can't change once the app record exists.
