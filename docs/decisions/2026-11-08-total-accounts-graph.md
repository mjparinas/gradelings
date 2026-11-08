# Total accounts graph, and the test account never counts

Melvin, November 8, 2026: add a graph of the total number of user accounts over time to the admin dashboard.

- The Growth section has a "Total Accounts Over Time" line chart: family accounts at the end of each of the last 26 weeks (`acquisition.totals` in `src/lib/adminMetrics.ts`), computed from sign-up dates, never stored.
- Melvin's own test account (`TEST_ACCOUNT_EMAILS` in `src/lib/brand.ts`) is left out of every number on the dashboard, not only this chart (`REAL` in `src/app/api/admin/stats/route.ts`), as the Insights already did.
