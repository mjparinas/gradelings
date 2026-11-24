# iOS app (iPhone and iPad)

The iOS app is a **thin Swift shell**: a `WKWebView` that opens `/play/` full screen, plus a small native bridge for the things Apple requires (or that Safari cannot do). Lessons, sync and the offline service worker stay in the web app, so a release of the site is a release of most of the iOS experience. A new binary is only needed when the shell or StoreKit products change.

## Why a custom Swift shell (not Capacitor)

- Gradelings is already an installable PWA. Android uses a Trusted Web Activity (`docs/ANDROID.md`); iOS has no TWA equivalent, and a bare “website in a WebView” often fails **Guideline 4.2** (Minimum Functionality).
- Capacitor was rejected for Android to avoid a second release process and app/site drift. The same rule applies here: do not pull in a cross-platform shell or features that only work in native code.
- StoreKit 2, App Store Server Notifications, Face ID and haptics are first-class in Swift. The bridge is an allowlist, not a second product.
- **Do not** copy Android’s “no purchases in the app” model. In Canada, digital unlocks sold in an iOS app must use **In-App Purchase**. Web (Stripe) subscriptions may still unlock in the app under Guideline **3.1.3(b)** (multiplatform services), but only if the same plan is also offered as IAP inside the app.

## What is in the repo

| Path | What it does |
| --- | --- |
| `ios/project.yml` | [XcodeGen](https://github.com/yonaskolb/XcodeGen) project: bundle id, deployment target, StoreKit capability. |
| `ios/Gradelings/` | Swift sources: WebView, bridge, StoreKit, Face ID, haptics, offline screen. |
| `ios/Gradelings/Products.storekit` | Local StoreKit config for the monthly and yearly family plans. |
| `src/lib/ios.ts` | Detects the iOS app (`?app=ios`), product ids, and the JS ↔ native bridge. |
| `src/server/apple.ts` | Decodes StoreKit transactions, maps product ids to plans, updates `families`. |
| `src/app/api/billing/apple/` | Client posts a signed transaction after purchase/restore. |
| `src/app/api/billing/apple/notifications/` | App Store Server Notifications V2 endpoint. |

The bundle id `ca.grademap.app` matches the Android package id on purpose (same reverse-DNS). **It can never change once the app is published.** Keep it equal in `ios/project.yml`, `src/lib/ios.ts` and App Store Connect; a test enforces the TypeScript constant.

## Architecture

```
App Store binary (Swift)
  └─ WKWebView → https://<domain>/play/?app=ios
       ├─ JS bridge: purchase / restore / Face ID / haptics
       └─ Same sync, content, PIN and scoring as web + Android

Server
  ├─ Stripe (website checkout and portal)
  └─ App Store Server Notifications + /api/billing/apple/
         → same families.plan / subscription_* columns
```

Native code is limited to:

1. Full-screen WebView with no browser chrome, start URL `/play/?app=ios`
2. StoreKit 2 purchase and restore (and “Manage subscription” via `AppStore.showManageSubscriptions`)
3. Face ID / device passcode as an optional unlock for the parent PIN gate
4. Haptics (Safari has no `navigator.vibrate` on iOS)
5. A native offline / load-error screen so reviewers never see a blank WebKit failure

Push (APNs) can be added later as another bridge method; it is not required for the first submission if the rest of the app feels complete.

## What you need to do yourself

Nothing here can be done from code alone; each step needs an Apple account, a Mac and App Store Connect.

1. **Deploy to the production domain first** (`docs/DEPLOY.md`). The WebView loads the live site.
2. **Apple Developer Program** (developer.apple.com; annual fee). Create an App ID with the bundle id `ca.grademap.app`, and enable **In-App Purchase**.
3. **App Store Connect:** create the app (Education category, age rating 4+). Do **not** put the app in the Kids Category (that bans third-party analytics and locks the rules in forever). Do **not** use “For Kids” / “For Children” in the listing metadata — those phrases are reserved for the Kids Category.
4. **Subscriptions:** one subscription group “Gradelings Family” with two auto-renewable products whose ids match the env vars below (defaults `ca.grademap.app.premium.month` and `ca.grademap.app.premium.year`). Prices should match `src/lib/plan.ts` (C$14.99 / month, C$119.99 / year). Enrol in the **Small Business Program** if you qualify (~15% commission).
5. **Generate the Xcode project** on a Mac:
   ```bash
   brew install xcodegen   # once
   cd ios
   xcodegen generate
   open Gradelings.xcodeproj
   ```
   Set the Development Team, then run on a device or Simulator. For local StoreKit testing, the scheme already points at `Products.storekit`.
6. **Point the shell at production** (or a staging host) with the `SITE_URL` build setting in `ios/project.yml` / Xcode (default `https://gradelings.com`). Keep it matched to `NEXT_PUBLIC_SITE_URL`.
7. **Server env vars** (Vercel Production):

   | Variable | Purpose |
   | --- | --- |
   | `APPLE_BUNDLE_ID` | Must be `ca.grademap.app` |
   | `APPLE_IAP_MONTHLY` | StoreKit product id for the monthly plan |
   | `APPLE_IAP_YEARLY` | StoreKit product id for the yearly plan |
   | `APPLE_IAP_ALLOW_UNSIGNED` | `1` only on staging/tests: accept decoded JWS payloads without signature checks. **Never in production.** |

   When unsigned mode is off, the server verifies each transaction JWS with the leaf certificate in `x5c` (ES256) and requires an Apple intermediate in the chain. Before launch, tighten this with App Store Server API keys (Issuer ID, Key ID, `.p8`) if you want server-side re-checks against Apple.
8. **App Store Server Notifications V2:** in App Store Connect → your app → App Information → App Store Server Notifications, set Production and Sandbox URLs to `https://<domain>/api/billing/apple/notifications/` (trailing slash required).
9. **TestFlight**, then App Review. In Review notes include: a demo parent email + password, the parent PIN, and that purchases use StoreKit (Sandbox).

## Paying: StoreKit in the app, Stripe on the web

- The iOS shell opens `/play/?app=ios`. `src/lib/ios.ts` (`isIosApp`) reads that and keeps it in `sessionStorage`, same idea as Android’s `isAndroidApp`.
- On the parent Subscription page, the iOS app shows **StoreKit** subscribe / restore buttons — never Stripe Checkout, never a link to the website to pay.
- A membership bought on the website still unlocks in the iOS app after sync (multiplatform). The page shows the plan; it does not steer the parent to web checkout.
- Cancel/change for an Apple subscription uses Apple’s subscription management sheet. Cancel/change for a Stripe subscription is done on the website (no in-app link that looks like a purchase CTA).
- Coins and shop items stay pretend; kids never buy with real money.

## Review checklist (highest odds)

- [ ] Starts on `/play/`, not the marketing homepage
- [ ] Native splash / launch screen and offline error screen
- [ ] Face ID (or device passcode) can unlock the parent area when a PIN is already set; PIN keypad remains the fallback
- [ ] Haptics fire on correct / try-again in the iOS app
- [ ] Working StoreKit purchase, restore, and manage-subscription
- [ ] Account deletion reachable under Parents → Account (Guideline 5.1.1(v))
- [ ] Demo account in App Review notes; privacy policy URL; Nutrition Labels match `/privacy/`
- [ ] Screenshots of the running app (phone and iPad), not the website
- [ ] Education category, 4+, no “For Kids” in metadata
- [ ] No third-party ads; no purchase CTAs in the child UI (parent PIN already gates Parents)

## Testing before you publish

- Run the site in Safari on an iPhone and iPad; confirm “Add to Home Screen” still works (PWA path unchanged).
- In Xcode, run against Sandbox / StoreKit Configuration: subscribe, kill the app, restore on a fresh install, cancel in Settings and confirm the next notification drops the family to free.
- Confirm a Stripe-subscribed family still shows premium in the iOS app with no “buy on the web” button.
- Confirm wrong or missing `APPLE_BUNDLE_ID` product mapping refuses the transaction.
