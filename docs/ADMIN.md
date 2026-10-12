# Admin panel

`/admin/` is the site-wide admin panel: headline numbers, users, redeem codes, feature flags, A/B tests, question reports and a change log. It is `noindex` and disallowed in `robots.ts`.

## Who can use it

An admin is an ordinary account whose **confirmed** email is listed in `ADMIN_EMAILS` (comma-separated, case doesn't matter):

```bash
ADMIN_EMAILS=owner@example.com
```

1. Sign up at `/play/` or `/teachers/` with that email and confirm it from the email link.
2. Open `/admin/` and sign in.

The list lives in the environment, never the database, so nothing a request writes can make someone an admin. Without `ADMIN_EMAILS` the panel and every `/api/admin/*` route answer 404 (except `/api/admin/codes/`, which still accepts `ADMIN_TOKEN` for scripts, see `docs/CODES.md`). Every change made in the panel is written to `admin_audit` with the admin's email and shown under **Log**.

## Sections

- **Overview:** a business dashboard with charts and a table view for each (`src/components/admin/Dashboard.tsx`, numbers worked out in `src/lib/adminMetrics.ts`). Class student accounts are left out; days and months are UTC.
  - **Revenue and profit:** monthly recurring revenue (list prices, yearly plans as a twelfth a month) and the yearly run rate, revenue this month, last month and this year, profit this month and this year, projected revenue and profit for the year (revenue so far plus MRR for the months left), revenue per paying family, cancellations in 30 days with churn and an estimated lifetime value, and charts of revenue, profit and paying families by month.
  - Revenue comes from the `payments` table: the Stripe webhook records `invoice.paid` (only invoices for families here) and `charge.refunded`, so add those two events to the webhook in Stripe. **Import payments from Stripe** copies older paid invoices (needs `STRIPE_SECRET_KEY`). When a family deletes its account its payments stay in the totals with the family link cleared.
  - Stripe fees are estimated at 2.9% + 30¢ a payment. Profit takes off those fees and the **monthly running costs** you enter on the dashboard (stored in `admin_settings`, changes go in the log).
  - **Customers:** families and parent or teacher accounts, paying (monthly, yearly, past due), in trial, free after the trial, code or admin access (lifetime), children per family, teachers, classes and student accounts, codes redeemed and question reports.
  - **Growth:** sign-ups this month, in the last 30 days against the 30 before, per week and per month; trial to paid (trials that ended in the last 90 days whose family pays now), paying share, activation (new families in the last 90 days who practised), confirmed emails and referrals.
  - **Practice:** families practising today, this week and this month, stickiness (daily ÷ monthly), questions answered and minutes per day for 30 days.
  - **Tile details:** most tiles open a window with the list behind the number (`GET /api/admin/stats/detail/?view=…`, `src/server/adminDetail.ts`; views in `src/lib/adminDetail.ts`): paying families with renewal dates, payments this month or this year with refunds and estimated fees, cancellations in 90 days, all families with their group, trials (soonest to end first), free families, code access with the codes used, codes redeemed, sign-ups (families and a 60-day count by day), trial outcomes, activation, unconfirmed emails, referrals, families who have paid, families practising, open classes with their teacher, and children counted by grade and province. The profit and projection tiles open a month-by-month breakdown. Lists show account emails (an email opens the family in Users) and stop at 200 rows. Children are only ever counts: never names or results.
- **Users:** search by email or family id (class student accounts are left out). A family shows its plan, trial, access, subscription, a waiting discount, last practice, devices signed in, codes used, A/B test groups and each child's grade and province. Children's names and results are never shown. Actions: extend the trial, add days of free access or give lifetime access, remove access, mark an email confirmed, sign out everywhere, force a feature flag on or off for the family, and delete the account (type the account's email to confirm; it cancels any Stripe subscription first and deletes everything, the same as a parent deleting their own account; your own account can't be deleted here).
- **Codes:** make free-access codes (days or lifetime) and discount codes (percent off the first payment, a number of months or every payment), with an optional use limit, expiry date, custom code and note; see each code's uses and disable one. Built on `/api/admin/codes/` (`docs/CODES.md`).
- **Flags:** switch a feature off for everyone or roll it out to a percentage of families. See below.
- **A/B tests:** see below.
- **Reports:** "Report a problem" submissions grouped by question, most reported first. Clear a question once it's fixed or checked.
- **Log:** the last 200 changes made in the panel.

## Feature flags

Flags are defined in code, in `FLAGS` in `src/lib/flags.ts`, so the panel can only switch things that exist. A row in `feature_flags` appears once an admin changes one; until then the flag's default applies.

| Flag | Where | What it switches |
| --- | --- | --- |
| `daily-challenge`, `speed-run`, `arcade`, `sticker-book`, `my-room`, `shop` | Kids' app | The home-screen tile and its screen (an open screen falls back to the home screen) |
| `secrets` | Kids' app | The Konami code, secret words and the moose |
| `signups` | Server | Creating accounts (`/api/auth/signup/` answers 503 while off) |
| `redeem-codes` | Server | Redeeming codes |
| `new-classes` | Server | Creating classes (existing classes keep working) |

A flag is decided in this order (`flagOn`): a per-family override (Users), then off for everyone if switched off, then the rollout. A partial rollout uses a stable hash of the flag and the family id, so the same families keep it and raising the percentage only adds families. Signed-out devices are bucketed by a random device id (`grademap.device` in `localStorage`); class student sessions count as signed out.

The kids' app fetches `/api/flags/` when it opens, when it comes back into view and when the signed-in account changes, and keeps the last answer in `localStorage` (`grademap.flags`) so it still applies offline. Read a flag with `useFlag("key")` or `useIsOn()` from `src/lib/remoteFlags.ts`; on the server use `isFlagOn("key", familyId)` from `src/server/flags.ts`.

**Adding a flag:** add it to `FLAGS`, read it where the feature is shown (and on the server if the feature has an API), and add a test.

## A/B tests

An experiment has a key, a description and 2 to 5 variants with weights; the first variant is the control.

- **Draft:** everyone sees the control and nothing is counted. Variants can still change.
- **Running:** each family or device gets a variant from a stable hash of the key and its id. A signed-in family is recorded in `experiment_assignments` the first time its app asks, so results can be counted. Variants can't change any more, because families would move between groups.
- **Stopped:** everyone sees the winner you pick (or the control).

Results per variant: families counted, how many now pay, and how many practised in the last 7 days, each with a two-sided p-value against the control (two-proportion z-test, `pValue` in `src/lib/flags.ts`). Under 0.05 is unlikely to be chance; with small groups, wait for more families.

A test only changes something where code asks for it: `useVariant("key")` in the kids' app (null when the test doesn't exist, which means the control), or `variantsFor(familyId, null)` on the server. Ship that code first, then start the test.

## Privacy

The panel shows parents' account emails and billing state, never children's names, practice details or class student accounts. The change log keeps no email for deleted accounts. Deleting an account removes its flag overrides and test assignments along with everything else (`src/server/deleteFamily.ts`).
