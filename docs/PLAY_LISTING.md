# Google Play listing

Everything to paste into Play Console for the Android app (`docs/ANDROID.md`), and the answers to its forms. The answers below match the code as of October 2026. If the data we keep, the providers or the payment flow change, update this file and the forms together.

## Payments in the app

Google Play's payments policy doesn't let an app sell digital content outside Google Play Billing, and it also limits text that sends people to pay somewhere else. So the Android app (`isAndroidApp` in `src/lib/twa.ts`) shows no prices, no payment buttons, no subscribe prompts and no mention of where to subscribe (decided October 2026). It only says the app can't take a payment and that a family's membership shows up once they sign in. Families subscribe on the website, which they found us through. If a reviewer still objects, the fallback is Google Play Billing (not built). Check Google's current Payments policy page before submitting, because the rules change by country.

## Store listing

- **App name:** Gradelings: K-9 Practice (30 characters at most).
- **Short description** (80 at most): `Curriculum practice and learning games for Kindergarten to Grade 9 in Canada.`
- **Full description:**

  > Gradelings is kind, curriculum-matched practice for Kindergarten to Grade 9, built for Canadian families.
  >
  > • Matched to your province or territory's curriculum: math, language arts, science, social studies, and French Immersion or Core French where your province teaches them.
  > • Speaks the language of the report card, so you can see where your child is growing.
  > • Gentle feedback: a wrong answer gets a hint and another try. No buzzers, no shame.
  > • Learning earns game time, with limits you set.
  > • Works offline once a grade has downloaded. Read-aloud for early readers.
  > • Calm mode turns off timers, motion and noise for children who find them hard.
  > • Up to 3 children on one family plan, each with their own grade and settings.
  >
  > No ads, ever. No tracking. We never sell data. Children can never buy anything; coins are earned only by learning.
  >
  > Start with a free trial. After it ends, the first units of every subject stay free.

- **Category:** Education. **Tags:** Education, Kids, Math.
- **Contact email:** `CONTACT_EMAIL` in `src/lib/brand.ts`. **Website:** the production domain. **Privacy policy:** `https://<domain>/privacy/`.
- **Graphics:** a 512×512 icon (the PWA icon), a 1024×500 feature graphic, and at least 4 screenshots each for phone, 7-inch tablet and 10-inch tablet. `node scripts/e2e-devices.mjs` already drives the app at those sizes; take the screenshots from a demo child with some practice, with no real child's name.

## Target audience and content (App content page)

- **Target age groups:** 5 and under, 6–8, 9–12, 13–15. This puts the app in the **Families** program: it must meet the Families policy and Google's Teacher Approved criteria are optional.
- **Families policy fit:** no ads and no ad SDKs; no third-party analytics in the app (Vercel Web Analytics runs on public pages only, never `/play/` or `/parents/`, see `src/components/SiteAnalytics.tsx`); the parent area and anything to do with accounts or billing sit behind the parent PIN gate; children can't type free text, upload photos or record voice.
- **Ads:** "No, my app does not contain ads."
- **Content rating (IARC questionnaire):** Education category; no violence, fear, sexuality, gambling, controlled substances or crude humour; no user-to-user communication; no sharing of location; no purchases of digital goods inside the app. Expect a rating of Everyone / PEGI 3.
- **News app:** no. **COVID app:** no. **Government app:** no. **Financial features:** none.
- **App access (for reviewers):** no sign-in is needed to try the kids' app: open the app, tap "Let's go", add a child. The parent area asks to set a PIN (4 digits or more) on first visit; tell reviewers to choose any PIN.

## Data safety form

Collected (sent to our server), only when a parent makes an account and turns on sync. Without an account, everything stays on the device.

| Data type (Play's names) | Collected | Why | Optional |
| --- | --- | --- | --- |
| Personal info → Email address | Yes (the parent's) | Account management, app functionality (progress emails) | Yes: an account is optional |
| Personal info → Name | Yes (a child's first name or nickname) | App functionality | Yes |
| Personal info → Other info | Yes (grade, optional birth year, avatar) | App functionality | Yes |
| App activity → App interactions | Yes (practice answers and results) | App functionality, analytics shown to the parent | Yes |
| App info and performance → Crash logs, Diagnostics | Yes, when error reporting is on (Sentry, with names, emails and typing stripped) | App functionality | No |
| Financial info → Purchase history | No in the app (Stripe handles payment on the website) | | |
| Location, contacts, photos, audio, files, messages, calendar, device ids | No | | |

- **Shared with third parties:** no. Stripe, Resend, Sentry and the hosting provider are service providers acting for us, which Play doesn't count as sharing.
- **Encrypted in transit:** yes (HTTPS only).
- **Deletion:** yes. In the app under Parent area → Account → Delete account, and on the web at `https://<domain>/parents/#/account`. Give that web link as the deletion URL Play asks for.
- **Independent security review:** no.
- **Families policy declaration:** yes, the app follows it.

## After it's live

- Keep the listing's grade range and province list matched to `FRAMEWORKS` (Kindergarten to Grade 9; no Quebec).
- When the data we keep changes, update this file, the Data safety form, `/privacy/` and `docs/school/` together.
