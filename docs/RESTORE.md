# Database restore runbook

Production's database is Turso (libSQL), created through the Vercel Marketplace in AWS us-east-1 (`docs/DEPLOY.md`, section 2). This page covers two things: **practising a restore without touching production** (do this before launch and again after any schema change), and **what to do in a real emergency**.

Turso's point-in-time recovery never restores over a database. It creates a **new** database as it was at a chosen time ([docs](https://docs.turso.tech/features/point-in-time-recovery)). That is what makes a safe drill possible: the copy is separate, and production is only ever read.

How far back you can go depends on the plan: Free 24 hours, Developer 10 days, Scaler 30 days, Pro 90 days (checked October 2026; confirm on Turso's page). Data in the 15 seconds before the chosen time may be missing. A database that was deleted can be recovered for up to five days on paid plans through a separate feature.

## Rules

- The drill never writes to production, never points the live site at the copy and never changes `DATABASE_URL` or `TURSO_DATABASE_URL` in Vercel.
- Give the copy a name that says what it is (`gradelings-restore-test-YYYYMMDD`), and delete it when done. Restored databases count toward the plan's database quota.
- The copy holds real family and student data. Keep its token to yourself, never paste it into a ticket or chat, and delete the database the same day.
- Production access for the comparison is a **read-only** token with a short expiry.

## Practise a restore

You need the [Turso CLI](https://docs.turso.tech/cli/introduction) signed in (`turso auth login`) to the organisation that owns the database. If production was created through the Vercel Marketplace, that is the organisation Vercel made for it; `turso db list` shows it. Replace `<prod>` with the production database's name.

1. **Check what you have.** `turso db list` and `turso db show <prod>`. Note the group, and confirm the plan's retention covers the time you want.

2. **Restore into a new database.** Pick a time a few minutes to a few hours ago, in UTC:

   ```bash
   turso db create gradelings-restore-test-20261017 --from-db <prod> --timestamp 2026-10-17T01:00:00Z --wait
   ```

   If you have more than one group, add `--group <group>`; use the same group as production so the copy is in the same region.

3. **Get two tokens.** Read-only for production, ordinary for the copy:

   ```bash
   turso db tokens create <prod> --read-only --expiration 1d
   turso db tokens create gradelings-restore-test-20261017 --expiration 1d
   turso db show <prod> --url
   turso db show gradelings-restore-test-20261017 --url
   ```

4. **Compare row counts and shape, read-only:**

   ```bash
   PROD_URL=libsql://... PROD_TOKEN=... RESTORE_URL=libsql://... RESTORE_TOKEN=... node scripts/restore-check.mjs
   ```

   (`scripts/restore-check.mjs` refuses to run any statement that isn't a `SELECT` or one of two read-only `PRAGMA`s, and refuses if both URLs are the same database.) For every table it prints the production and restored counts. Production moves on after the restore time, so small gaps are normal; the script allows 2% or 25 rows (`--tolerance 5` widens it) and ignores counts in tables that expire constantly (sessions, rate limits, tokens, live questions). It fails on a missing table or column, a table that is empty in the copy but not in production, or a count far apart. Add the restore time to your notes and expect the copy to be **behind**, by roughly the new sign-ups, events and payments since then.

5. **Check that the app can use it.** Run the app locally against the copy only (it creates missing tables on connect, which is fine on a copy):

   ```bash
   DATABASE_URL=libsql://<copy-url> DATABASE_AUTH_TOKEN=<copy-token> npm run dev
   ```

   Open `http://localhost:3000/api/health/` (expects `{"status":"ok"}`) and sign in with a test family you know exists in the copy. Do not use `DATABASE_URL` from Vercel here; set the two variables on that one command only.

6. **Spot-check by hand.** `turso db shell gradelings-restore-test-20261017 "PRAGMA quick_check"` should print `ok`. Check that a payment from the last day you expect is present: `SELECT COUNT(*), MAX(created_at) FROM payments`.

7. **Clean up.** Delete the copy and let the tokens expire:

   ```bash
   turso db destroy gradelings-restore-test-20261017 --yes
   ```

8. **Record it.** Add the date, the time restored to, how long steps 2 to 4 took and any problem to the table at the bottom of this page, and tick the "Turso backups" item in `docs/DEPLOY.md` section 6.

## In a real emergency

Stop writes first, restore second, switch third. Work out the time just **before** the damage (a bad deploy, a mistaken delete); a restore loses everything after its timestamp, so a few minutes earlier is better than hours.

1. **Stop the damage.** Turn on maintenance mode (admin System tab, type `TURN ON`; `src/lib/maintenance.ts`) so no new writes land. It keeps the admin panel, sign-in, the Stripe webhook and cron jobs working, which is why steps 3 and 4 below matter. If the admin panel is the problem, deploy or roll back in Vercel instead.
2. **Restore into a new database** as in step 2 above, with the new name `gradelings-restored-YYYYMMDD`. Run the comparison (step 4) against production to see exactly what the restore would lose or bring back.
3. **Reconcile Stripe.** Payments and subscriptions after the restore time exist in Stripe but not in the copy. The webhook is idempotent (`stripe_events`), so in the Stripe dashboard resend the events since the restore time to `/api/billing/webhook/` once the site points at the new database. Check refunds and cancellations separately; they are in `payments` and `cancellations`.
4. **Switch the site.** In Vercel, set `DATABASE_URL` and `DATABASE_AUTH_TOKEN` (or `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`; set one pair only, `docs/DEPLOY.md`) to the new database and redeploy. Keep the damaged database, don't delete it, until you've confirmed what was lost.
5. **Devices do not catch up by themselves (known gap).** A device marks an event as synced once the server accepts it and keeps a download cursor into `events.seq` (`src/lib/sync.ts`, `src/app/api/sync/route.ts`). After a restore, events from after the restore time exist on devices, flagged as synced, but not on the server, and a device's cursor is ahead of the restored `seq` values, so it would also miss events other devices upload next (they reuse the lost numbers). Event ids are unique, so re-uploading is safe, but nothing triggers it yet. Until the app has a "database was restored" signal that makes devices clear their synced flags and cursor, treat a restore as losing server-side progress after the restore time for any device that doesn't reset, and ask affected parents to sign out and in again only after that signal exists. Parent settings and anything created only on the server after the restore time (class changes, redeemed codes, referral credits) are lost too; list them from Stripe, the email log and the inbox.
6. **Tell families** if anything was lost, with the time window. Take the old database out of service only after the new one has run cleanly for a few days.

If the Marketplace integration owns the environment variables, changing them in the Vercel project's settings can be overwritten by the integration; update them there or disconnect the integration's variable for that environment first.

## Drill log

| Date | Restored to (UTC) | Plan retention | Time taken | Result | By |
| --- | --- | --- | --- | --- | --- |
| _not yet done_ | | | | | |
