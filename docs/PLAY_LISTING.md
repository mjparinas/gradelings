# Google Play listing

Everything to paste into Play Console for the Android app (`docs/ANDROID.md`), and the answers to its forms. The answers below match the code as of October 2026. If the data we keep, the providers or the payment flow change, update this file and the forms together.

## Payments in the app

Google Play's payments policy doesn't let an app sell digital content outside Google Play Billing, and it also limits text that sends people to pay somewhere else. So the Android app (`isAndroidApp` in `src/lib/twa.ts`) shows no prices, no payment buttons, no subscribe prompts and no mention of where to subscribe (decided October 2026). It only says the app can't take a payment and that a family's membership shows up once they sign in. Families subscribe on the website, which they found us through. If a reviewer still objects, the fallback is Google Play Billing (not built). Check Google's current Payments policy page before submitting, because the rules change by country.

## Store listing

Paste these into Play Console > Grow users > Store presence > Main store listing. Counts are checked by `src/lib/playListing.test.ts`.

- **App name** (30 at most): `Gradelings: Pre-K-9 Practice`
- **Short description** (80 at most): `Curriculum-matched practice and learning games for Pre-K to Grade 9.`
- **Full description** (4,000 at most):

```text
Practice that matches your child's school curriculum, with feedback that is kind and games that are worth playing.

Gradelings is for children from Pre-K to Grade 9, for families in Canada and the United States. Pick your child's province, territory or state and grade, and every question follows what their class is learning.

WHAT YOUR CHILD GETS
• Math, language arts, science and social studies, written for your province, territory or state.
• French Immersion and Core French where your province teaches them, with read-aloud in French.
• Adventure mode: endless questions picked just for your child, a mix of what is new, what is tricky and what is due for a refresher.
• Short lessons that explain how it works before the questions begin, so little ones are never left guessing.
• Hints and another try after a wrong answer. Soft sounds, never a buzzer. Never any shame.
• Math Facts practice for adding, taking away, times tables and division.
• Stories to read along with, at the right level for your child.
• Trophies, stickers, coins, a buddy that grows, and a room to decorate, all earned by learning.
• Arcade games that teach something. Learning earns game time, with limits you set.
• Read-aloud for early readers, in a natural voice that works offline.

WHAT YOU GET AS A GROWN-UP
• Reports in the language of the report card, with your province's own levels and a plain "at home" note for each. They show practice, so you can see where your child is growing and what to work on next. The teacher decides the mark.
• A weekly progress email, if you want one.
• A printable sheet for the conversation at parent-teacher interviews.
• A parent area behind a PIN, so settings, accounts and reports stay with you.
• Up to 5 children on one family plan, each with their own grade, subjects and settings.
• Calm mode, for children who find timers, motion or noise hard: it quiets sounds, slows animation and hides the clocks.
• Dyslexia-friendly font, roomy text and high contrast options.

FOR TEACHERS
Create a class, add students with a simple login code (no emails and no passwords for children), assign units, and see who needs a hand. Classes are free.

WORKS WELL OFFLINE
Once a grade has downloaded, lessons and progress keep working without a connection, and sync when you are back online.

OUR PROMISES
• No ads. Ever.
• We never sell data.
• Children can never buy anything. Coins are earned only by learning.
• Children can't type free text, share photos or talk to other people in the app.
• You can export or delete everything, any time.
• A real person replies to your questions within one business day.

Sign in with your family account to unlock everything your plan includes. Everything on this page is practice that goes with school, not a replacement for your child's teacher.
```

Why no price or trial in the text: the Android app sells nothing (see "Payments in the app" above), and Play's payments policy limits text that points people elsewhere to pay. "Sign in with your family account" is the only line about plans.

- **Category:** Education. **Tags:** Education, Kids, Math (pick from Play's list).
- **Contact email:** `CONTACT_EMAIL` in `src/lib/brand.ts`. **Website:** `https://www.gradelings.com`. **Privacy policy:** `https://www.gradelings.com/privacy/`.

## Graphics

All in `store-assets/android/`, made by scripts in the repo, so they can be redone after a design change:

| Play field | File | How it is made |
| --- | --- | --- |
| App icon, 512 × 512 | `icon-512.png` | `node scripts/android-graphics.mjs` draws `public/icon.svg` full bleed (Play rounds the corners itself). |
| Feature graphic, 1024 × 500 | `feature-graphic-1024x500.png` | Same script: brand blue, the bear and one line. No prices or claims, since Play rejects them. |
| Phone screenshots (1080 × 1920) | `phone/` | Captioned shots. The same shots without captions are in `raw/phone-*.png`. |
| 7-inch tablet (1200 × 1920) | `tablet-7/` | Same. |
| 10-inch tablet (1600 × 2560) | `tablet-10/` | Same. |

Every screenshot is the real app: `node scripts/android-screenshots.mjs http://localhost:3000 store-assets/android/raw` plays a few questions as a demo child called "Maya" (no real child), opening pages as the Android app does (`?app=android`), and fails if a price or Subscribe button shows. `node scripts/android-captions.mjs` adds the captions. Use a production build when you redo them (`npm run build && npm start`); with `next dev` the script hides the dev badge itself. Set `CHROMIUM_PATH` if Playwright's pinned browser isn't installed. Upload either set; Play wants 2 to 8 per device type, and these are 5 each. The arcade is left out because a new child sees it locked until they have learned for a while.

## Target audience and content (App content page)

- **US children (COPPA):** a US family's children and progress don't leave the device until a parent gives consent in the parent area (`UsConsent.tsx`), and no guest count is sent for a US child. Say so if the Families declaration or a reviewer asks how parental consent is collected.
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
| Device or other IDs | Yes, only on a device with no parent account and not for a US child: a one-way hash of a random id the app makes, kept 35 days, to count guest players (`src/lib/guestPing.ts`) | Analytics | No |
| Location, contacts, photos, audio, files, messages, calendar | No | | |

- **Shared with third parties:** no. Stripe, Resend, Sentry and the hosting provider are service providers acting for us, which Play doesn't count as sharing.
- **Encrypted in transit:** yes (HTTPS only).
- **Deletion:** yes. In the app under Parent area → Account → Delete account, and on the web at `https://www.gradelings.com/parents/#/account`. Give that web link as the deletion URL Play asks for.
- **Independent security review:** no.
- **Families policy declaration:** yes, the app follows it.

## After it's live

- Keep the listing's grade range and province list matched to `FRAMEWORKS` (Pre-K to Grade 9; no Quebec).
- When the data we keep changes, update this file, the Data safety form, `/privacy/` and `docs/school/` together.
