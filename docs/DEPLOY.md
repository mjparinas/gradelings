# Deploying Gradelings

Gradelings is a standard Next.js 16 app (Node runtime, no custom server). This guide covers a Vercel + Turso + Resend + Sentry + Stripe setup. Nothing here is done yet; each step needs an account or key only the owner can create.

**Can it all live in Vercel?** Nearly. Vercel hosts the app, preview deployments, environment variables and the daily cron job. Its **Marketplace** adds **Turso** (database), **Resend** (email) and **Sentry** (errors) from the dashboard, fills in their environment variables and puts them on one bill. Two things stay outside: **Stripe** (keys and webhook) and your **domain registrar** (you can buy the domain in Vercel or point DNS to it). Use a **Pro** plan: Hobby doesn't allow commercial use.

## 1. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public origin, no trailing slash (e.g. `https://gradelings.com`). Used for canonical URLs, the sitemap, Open Graph and JSON-LD, and for the links inside emails (so a forged `Host` header can't redirect a reset link). Read at **build time**, so set it before the first production build. Defaults to `https://gradelings.com`. |
| `DATABASE_URL` | Yes* | Turso URL (`libsql://<db>-<org>.turso.io`). Without it (or `TURSO_DATABASE_URL`) the app falls back to a local SQLite file, which fails on Vercel's read-only filesystem: `/api/health/` answers 503 and the logs say `[db] ... falling back to a local file`. |
| `DATABASE_AUTH_TOKEN` | Yes* | Turso token for that database. |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | * | The names the Vercel Marketplace Turso integration sets. Used only when `DATABASE_URL` is unset, so set one pair or the other. Each URL is paired with its own token. |
| `STRIPE_SECRET_KEY` | For billing | Live secret key (`sk_live_…`). |
| `STRIPE_PRICE_MONTHLY` | For billing | Recurring Price id for C$14.99/month. |
| `STRIPE_PRICE_YEARLY` | For billing | Recurring Price id for C$119.99/year. |
| `STRIPE_PRICE_MONTHLY_USD` | For US billing | Recurring Price id for US$14.99/month, for US families. |
| `STRIPE_PRICE_YEARLY_USD` | For US billing | Recurring Price id for US$119.99/year. Without both USD prices, a US family's checkout answers that US payments aren't available yet; Canadian checkout and simulated billing are unaffected. |
| `STRIPE_WEBHOOK_SECRET` | For billing | Signing secret of the webhook endpoint (`whsec_…`). |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional | The OAuth client for "Continue with Google" on the parent and teacher sign-in forms. Without both, the button is hidden and nothing else changes. Setup steps are in `docs/GOOGLE_SIGN_IN.md`. The redirect URI to register is `{NEXT_PUBLIC_SITE_URL}/api/auth/google/callback/` (with the trailing slash). |
| `RESEND_API_KEY` | For email | Resend API key. Without it no email is sent (password reset and confirmation links won't arrive), so treat it as required in production. |
| `ANTHROPIC_API_KEY` | Optional | Anthropic API key for **Draft with AI** in the admin Inbox. Without it the button is hidden. Each draft costs a few cents at most. |
| `RESEND_WEBHOOK_SECRET` | Optional | Signing secret (`whsec_…`) of a Resend webhook pointed at `/api/email/webhook/` for the delivered, delayed, bounced and complained events. Turns on delivery reports in the admin panel's email log, and stops panel email to addresses that bounce or report spam (`docs/ADMIN.md`). |
| `EMAIL_FROM` | For email | Sender, e.g. `Gradelings <hello@gradelings.com>`. The domain must be verified in Resend (add its SPF and DKIM DNS records). |
| `CRON_SECRET` | For the daily job | Any long random string. Vercel sends it as `Authorization: Bearer …` to `/api/cron/weekly/`; the route refuses calls without it. The job sends inactive-class warnings and deletes eligible classes as well as handling email reminders. |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | Optional | Turns on error reports (server / browser) and request timing (server). Off when unset. The server falls back to `NEXT_PUBLIC_SENTRY_DSN` when `SENTRY_DSN` is unset, so the Vercel Sentry integration (which sets only the public one) covers both. Reports are scrubbed of emails, cookies and request bodies before they leave (`src/lib/sentry-scrub.ts`). |
| `GITHUB_TOKEN` / `GITHUB_REPOSITORY` | Optional | For the admin panel's System page (uptime and builds). A fine-grained GitHub token for this repository only, with read-only **Actions** and **Issues** access (GitHub > Settings > Developer settings > Fine-grained tokens), and the repository as `owner/name`. Server-only: never prefix with `NEXT_PUBLIC_`. |
| `VERCEL_TOKEN` / `VERCEL_PROJECT_ID` / `VERCEL_TEAM_ID` | Optional | For the System page's deploys card and the Traffic tab's visits (Vercel Web Analytics). A token from Vercel > Account Settings > Tokens scoped to the project's team, the project id (Project Settings > General) and, for a team project, the team id (Team Settings > General). |
| `GOOGLE_SERVICE_ACCOUNT_KEY` / `SEARCH_CONSOLE_SITE` | Optional | For the admin panel's Traffic tab (Google search clicks). The JSON key of a Google Cloud service account that is a **Restricted** user on the Search Console property (as is, or base64), and the property (`sc-domain:example.com` or `https://www.example.com/`). Read-only scope only. Server-only. |
| `SENTRY_READ_TOKEN` / `SENTRY_ORG` / `SENTRY_PROJECT` | Optional | For the System page's errors card. An internal integration token with read access to Issues & Events (Sentry > Settings > Developer Settings > Custom Integrations), and the organization and project slugs. The `SENTRY_AUTH_TOKEN` the Sentry Vercel integration adds can only upload builds (the card shows 403), so it is used only when `SENTRY_READ_TOKEN` is unset. Add `SENTRY_API_BASE=https://de.sentry.io` for an EU organization. |
| `ANDROID_CERT_SHA256` | For the Android app | Comma-separated SHA-256 fingerprints of the app's signing keys (Google's Play App Signing key first). Served at `/.well-known/assetlinks.json`. See `docs/ANDROID.md`. |
| `ADMIN_EMAILS` | For the admin panel | Comma-separated emails of admin accounts (each must sign up and confirm its email). Turns on `/admin/` and `/api/admin/*` (`docs/ADMIN.md`). Without it they answer 404. |
| `ADMIN_TOKEN` | Optional | At least 24 random characters. Lets scripts call `/api/admin/codes/` with a Bearer token (`docs/CODES.md`); the admin panel doesn't need it. |
| `ALLOW_DEV_BILLING` | Staging only | `1` lets a deployment without Stripe keys use the simulated billing. **Never set in production.** |
| `TRUSTED_PROXY_HOPS` | Off Vercel | How many proxies in front of the app add an `X-Forwarded-For` entry (default 1). Rate limits use the entry that many places from the right, never the first one, which a client can forge. On Vercel the platform header is used and this is not needed. Simulated billing is also refused on the Vercel production environment, whatever `ALLOW_DEV_BILLING` says. |

Billing is live only when `STRIPE_SECRET_KEY`, `STRIPE_PRICE_MONTHLY` and `STRIPE_PRICE_YEARLY` are all set (`src/server/stripe.ts`). In production without them, the simulated billing is off unless `ALLOW_DEV_BILLING=1`. US families (country `US`, set when the first child added follows a US curriculum) also need `STRIPE_PRICE_MONTHLY_USD` and `STRIPE_PRICE_YEARLY_USD`.

## 2. Database (Turso)

```bash
turso db locations                        # AWS regions only; none in Canada
turso db create grademap --location aws-us-east-1   # Virginia, where production's database is
turso db show grademap --url              # -> DATABASE_URL
turso db tokens create grademap           # -> DATABASE_AUTH_TOKEN
```

Production's database was created through the Vercel Marketplace in AWS us-east-1 (Virginia). Turso now offers only AWS locations, none of them in Canada, so the data is stored in the United States; `/privacy/` and `docs/school/` say so. Storage outside Canada can mean a "Supplemental Review" in a BC district privacy review; keeping data in Canada would need a different database host (owner decided October 2026 to leave it in Virginia). Tables are created on first use (`CREATE TABLE IF NOT EXISTS` in `src/server/db.ts`), so there is no migration step. Create a separate database for staging.

## 3. Hosting (Vercel)

1. Import `mjparinas/gradelings`; the Next.js preset needs no changes (`npm run build`, `npm start`).
2. Add the variables above to the Production environment. Use a separate set (test Stripe keys, a staging Turso database, `ALLOW_DEV_BILLING=1` if you want fake billing) for Preview.
3. Add the domain, and set `NEXT_PUBLIC_SITE_URL` to match it. Redeploy so the build picks it up.
4. Region: `vercel.json` pins functions to `yul1` (Montréal), while the database is in Virginia (`aws-us-east-1`), so every database call crosses that distance. An occasional "fetch failed" (connect timeout to `*.turso.io`) on `/api/sync/` comes from this hop; the device keeps its unsynced answers and retries on the next sync. Moving functions to `iad1` would put them next to the database. Sentry (US or EU only) and Resend are not Canadian-hosted; they are listed as service providers in `/privacy/`.
5. Preview deployments are off: `ignoreCommand` in `vercel.json` skips every build except the `main` branch, so pull requests don't use up the daily deployment limit. To preview a branch, temporarily remove that line.
6. The daily email job is declared in `vercel.json` (`/api/cron/weekly/`, 15:00 UTC). Cron only runs on production deployments, and only once `CRON_SECRET` is set.

`trailingSlash: true` is on, so every API URL ends in `/`. Don't add redirect or rewrite rules at the host that strip the slash.

## 4. Stripe

1. Create a product "Gradelings Family" with two recurring prices in CAD: **C$14.99 / month** and **C$119.99 / year**. Copy their ids to `STRIPE_PRICE_MONTHLY` and `STRIPE_PRICE_YEARLY`. (Plan numbers live in `src/lib/plan.ts`.)
2. Add a webhook endpoint: `https://<your-domain>/api/billing/webhook/`
   **The trailing slash is required.** Stripe does not follow redirects.
   Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, plus `invoice.paid` and `charge.refunded` for the admin dashboard's revenue numbers, and `invoice.payment_failed` and `charge.dispute.created` for the admin alerts.
3. Copy the endpoint's signing secret to `STRIPE_WEBHOOK_SECRET`.
4. In Stripe's Billing Portal settings, enable cancel, update payment method and plan switching between the two prices. Turn on **Cancellation reasons** (all eight options), so the admin dashboard can show why families cancel, and set **trial update behaviour** to *continue trial*, so a parent who switches plan during the free trial isn't charged early. (Both are already set in the sandbox.)
5. **US families** (only once Washington is offered): add two recurring prices in USD to the same product, **US$14.99 / month** and **US$119.99 / year**, and copy their ids to `STRIPE_PRICE_MONTHLY_USD` and `STRIPE_PRICE_YEARLY_USD`. A US checkout turns on Stripe Tax (`automatic_tax[enabled]`) and asks for the billing address; Canadian checkout doesn't change. In the dashboard, turn on **Stripe Tax** (Settings > Tax), set the business's origin address and the product's tax code (software as a service / digital education), and let Stripe monitor thresholds. A sale only becomes taxable in a state once we register there: Washington's economic-nexus threshold is US$100,000 of sales a year, so registering in Washington (and adding the registration in Stripe Tax) is needed only past that. Stripe's threshold monitoring says when a state gets close. Add the USD prices to the Billing Portal's plan switching too. Percentage discount codes work in both currencies, and referral credits are given in the family's own currency.
6. Test the whole flow in Stripe test mode first (card `4242 4242 4242 4242`). The 30-day free trial is handled by the app, not by Stripe, so no card is needed to start.

## 5. Email (Resend) and error reports (Sentry)

1. **Resend:** add and verify your sending domain (SPF, DKIM and a DMARC record at your DNS host), create an API key, and set `RESEND_API_KEY` and `EMAIL_FROM`. Give the key **full access** if you use the admin panel's inbox (a sending-only key can't read received mail), set up receiving for your domain in Resend, and add the webhook for `RESEND_WEBHOOK_SECRET` above. Sign up, ask for a password reset, and check the message lands in the inbox, not spam.
2. **Sentry:** create a project (platform: Next.js), copy the DSN into both `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`. A test error: temporarily throw in an API route on a preview deployment and check it appears with no email or request body.
   - **Readable stack traces:** when `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` and `SENTRY_PROJECT` are all set at build time (the Sentry Vercel integration sets all three on Production), `next build` uploads its source maps to Sentry and then deletes them (`next.config.ts`, `withSentryConfig`). Without them the build is unchanged, and a failed upload (for example a bad token) only logs a warning; it never fails the deploy. After the first deploy with the variables, check an error in Sentry shows file names and lines from `src/`, and that `https://<domain>/_next/static/chunks/<any chunk>.js.map` answers 404.
   - **Request timing:** the server times a sample of API requests (`src/lib/sentry-traces.ts`: sync 10%, the class view and admin 20%, other API routes 5%, live questions 2%, the daily job and Stripe webhook always, the health check and pages never) and sends route, duration and outgoing calls such as the one to the database, stripped like errors (`scrubTransaction`). They appear under Sentry > Performance, where the `/api/sync/` p95 and the time spent in the call to `*.turso.io` show whether the Montréal to Virginia hop is the slow part. `SENTRY_TRACES_SCALE` multiplies every rate (`0` turns timing off, `2` doubles it). The browser sends errors only, no timing.
3. **Email sending limits:** the app sends one confirmation at sign-up, resets and confirmations on request (rate limited), one trial notice, and the weekly report to parents who turned it on. Weekly mail goes out on Sundays (UTC) from the daily job.


## Uptime monitoring

`GET /api/health/` returns 200 when the app and database answer (one `SELECT 1`) and 503 otherwise. It is public, uncached and reveals nothing beyond pass/fail.

- **Built in:** `.github/workflows/uptime.yml` pings it every 15 minutes (with 3 tries), opens a single "Site is down" issue labelled `uptime` on failure and closes it when the site recovers. It does nothing until you set the repository variable `UPTIME_URL` (Settings > Secrets and variables > Actions > Variables) to the site origin, e.g. `https://www.gradelings.com` (the host that answers directly; redirects aren't followed, so a redirecting origin reads as down). GitHub can delay scheduled runs, so it is a safety net, not a precise monitor. Also add the repository secret `CRON_SECRET` (Settings > Secrets and variables > Actions > Secrets, the same value as the site's): the workflow then calls `/api/cron/watch/`, which checks the database, Stripe, email and the rest and emails the admins when one goes down (`docs/ADMIN.md`).
- **External monitor** (not set up yet; it runs outside GitHub, so it keeps checking when scheduled runs are late or paused). UptimeRobot's free plan, step by step:
  1. Sign up at uptimerobot.com and choose **Add New Monitor**.
  2. Monitor Type **HTTP(s)**, Friendly Name `Gradelings health`, URL `https://www.gradelings.com/api/health/` (the host that answers directly, not one that redirects), interval 5 minutes.
  3. Leave the check on status codes: the endpoint answers 200 when the app and database work and 503 when they don't, and anything but 200 counts as down.
  4. Add your email (and the phone app's push) under **Alert Contacts**, then save. Add a second monitor for `https://www.gradelings.com/` so a broken home page also alerts.
  5. Optional: **Status Pages** can show these on a public page, but `/status/` already does that.
  Better Stack's free tier works the same way and can call a phone.

## 6. Launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` is the real domain; `/sitemap.xml` and `/robots.txt` show it.
- [ ] Sign up, confirm the email link works, add a child, play, and check the events sync to a second browser.
- [ ] Forgot password: the email arrives, the link works once, and other devices are signed out.
- [ ] Run the daily job by hand: `curl -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/cron/weekly/` returns counts, not 401.
- [ ] Share a report link, open it in a private window, then stop sharing and check it no longer works.
- [ ] A test "Report a problem" reaches the contact address.
- [ ] CI is green on the pull request (`.github/workflows/ci.yml` runs tests, lint, types, build, device layouts, accessibility and offline checks).
- [ ] Turso backups: confirm point-in-time recovery is available on your plan and practise one restore (`docs/RESTORE.md`; log it there).
- [ ] Stripe test-mode checkout, portal and webhook round trip updates the Subscription screen.
- [ ] Referrals: sign up with a friend's `/account/invite/?ref=CODE` link, confirm the email, and check the referrer gets a free month. For a paying referrer this adds a one-month credit to their Stripe customer balance (`creditCustomer`), so verify it in Stripe test mode.
- [ ] Switch Stripe to live keys; run one real checkout and refund it.
- [ ] `/play/`, `/parents/` and `/api/` stay `noindex`; public pages are indexed.
- [ ] Submit the sitemap in Google Search Console. For the admin panel's Traffic tab, add a service account as a Restricted user on the property and set `GOOGLE_SERVICE_ACCOUNT_KEY` and `SEARCH_CONSOLE_SITE` (`docs/ADMIN.md`).
- [ ] Privacy: export and delete-account work against the production database.
- [ ] `/privacy/` and `/terms/` had an AI review on 2026-10-09 (not a lawyer's review; the pages say so). Set `LEGAL_NAME`, `CONTACT_EMAIL` and `MAILING_ADDRESS` in `src/lib/brand.ts` (the address is required in CASL email), bump `LEGAL_UPDATED`, and still have a lawyer review both (governing law is set to British Columbia) before taking payments. Account deletion cancels Stripe subscriptions before deleting the family; if Stripe refuses, deletion stops so the parent can retry.
- [ ] BC teacher content review, Big Ideas check and Grade 4–5 history dates (see `AGENTS.md`, Open items).
- [ ] Check the service worker after a deploy: it precaches by build, so a second visit should pick up the new version.
