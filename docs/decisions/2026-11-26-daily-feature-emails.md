# Daily feature emails for new sign-ups (Melvin, 2026-11-26)

Melvin, November 26, 2026: study how Liftsmith sends its daily emails after sign-up, "for as many days as possible without repeating and without having boring or thin content", each about one important, useful or fun feature, in our branding and colours, concise but engaging, each with a graphic or screenshot of the app. Most features everyone has, but a good share should be paid ones, "properly emphasized that only the paid plan has it", so families see why to pay. Include "did you know" and how the app was crafted for usability (WCAG, colour-blind, calm modes for ADHD, dyslexia-aware fonts).

## What Liftsmith does (what we kept and what we changed)

Liftsmith sends an eight-day getting-started tour, then a weekly tip. Each email is a record in a list (id, tier free/Pro/both, the screen it opens, an audience), the words live apart from the list, a screenshot per email, and the next email for a person is the first one in the list they haven't had and that is meant for them. A new feature is added to the end and goes out next. We kept all of that: the order lives in `src/lib/featureSeries.ts`, the next email is the first unsent one that suits the family, and a family's history is the email log.

We changed the pace to one a day because Melvin asked for as many days as possible, and we follow our own automation rules instead of Liftsmith's scheduler.

## How it works

- **An Automation, off until `TURN ON` is typed** (Admin > Automations > Feature tips). A daily limit (default 100, at most 500). Every run is one phase of the daily job (`feature-tips`), after the nudges, so it yields to them.
- **Who:** the family's first account, email confirmed, news and tips on, address not bouncing, not a teacher-only account, not a class student account. Families that signed up up to 14 days before it was switched on start at email 1; nobody older is emailed. Nothing after 100 days from sign-up.
- **Once a day, never stacked:** a family skips a day when it already had any other email from us in the last 20 hours (trial notice, weekly report, nudge, panel email), apart from the sign-up confirmation.
- **No repeats, no new table:** what a family has had is read from `email_log` (`sent_by = feature:<id>`, kind `feature-tip`), so a second run can't send the same email. Ids are frozen (`featureSeries.test.ts`).
- **Suited to the family:** an email can wait for a feature flag (a feature that is off isn't promised), be for an age band (Pre-K to Grade 1, Grades 2 to 4, Grades 5 to 9) or a country (French is Canadian).
- **Free and paid, said plainly:** 31 free, 10 Family-plan and 5 "free and plan" emails. A paid email carries a "Family plan" badge and a plain note that depends on the reader: a member sees it is theirs, someone in the trial sees it is open now and needs the plan afterwards (prices, the refund promise), a family past the trial sees it is Family plan only. Prices and limits come from `plan.ts`.
- **Only what exists:** accessibility and calm-mode emails say what the code does (skip links, focus rings, forced-colours support, colour-blind simulations, OpenDyslexic, calm mode) and make no certification or health claim. Calm mode is described as a design choice for children who find motion or noise hard.
- **Screenshots:** real screens of the web app and the Android app's web content, taken by `scripts/feature-email-shots.mjs` (a demo child with two weeks of practice, never a real family), on a branded panel, committed to `public/email/features/`.
- **Android and iOS:** the Android app is on Google Play and has its own email; iOS is "coming soon" and never links anywhere.

## Not decided

Whether a family that has had the whole series should hear about newly shipped features the same way (Liftsmith's "fresh" rule). Adding a new email at the end of the list already does that for families still in the window.
