# Play Console answers (as entered)

A record of what was entered in Google Play Console for the Gradelings app (November 3, 2026), so the forms can be checked or redone. The reasoning behind them is in `docs/PLAY_LISTING.md`. If the app's data, providers or payment flow change, update the forms and this file together. Nothing here has been sent for review.

- **App:** Gradelings, package `com.gradelings.app`, App (not Game), Free. Personal developer account.
- **Store listing (default, en-US, draft):** name `Gradelings: Pre-K to Grade 9`, the short and full descriptions from `docs/PLAY_LISTING.md`. Category: Education. Contact: `hello@gradelings.com`, `https://www.gradelings.com`, no phone.

## App content

| Declaration | Answer |
| --- | --- |
| Privacy policy | `https://www.gradelings.com/privacy/` |
| Ads | No ads |
| Sign in details (app access) | No part of the app is restricted (decision on reviewer credentials still open) |
| Content rating (IARC) | Email `hello@gradelings.com`; category All Other App Types; rated Everyone / 3+ |
| Target audience | 5 and under, 6–8, 9–12, 13–15; certified compliance with children's privacy laws; Families policy applies |
| Advertising ID | Not used |
| Government apps | No |
| Financial features | None |
| Health apps | None |

**Content rating questionnaire:** Yes to online content (the app loads from the website); Yes to "primarily news or educational". No to everything else: downloaded content, user content sharing, violence, sexuality, language, controlled substances, age-restricted goods, location sharing, digital purchases, cash rewards, web browser or search engine.

## Data safety

- Collects data: yes. Encrypted in transit: yes. Accounts: "username and other authentication" and OAuth. Deletion link: `https://www.gradelings.com/parents/#/account`. Families commitment shown on the listing. Independent security review: no.
- Not shared with third parties (Stripe, Resend, Sentry and the host act for us).

| Data type | Required or optional | Purpose |
| --- | --- | --- |
| Name | Optional | App functionality |
| Email address | Optional | App functionality, Account management |
| Other info (grade, birth year, avatar) | Optional | App functionality |
| Crash logs | Required | App functionality |
| Diagnostics | Required | App functionality |
| App interactions | Optional | App functionality, Analytics |
| Device or other IDs (hashed guest-count id) | Required | Analytics |

None is processed ephemerally. User IDs (class and student login codes) were not declared; revisit if Google asks.

## Still to do by hand

Verify the contact phone number; upload the graphics and the YouTube promo link; upload a signed build to a test track; the closed-test requirement for new personal accounts (12 testers for 14 days); and decide on reviewer credentials.
