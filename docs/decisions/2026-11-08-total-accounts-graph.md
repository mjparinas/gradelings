# Total accounts graph

Melvin, November 8, 2026: add a graph of the total number of user accounts over time to the admin dashboard.

- The Growth section has a "Total Accounts Over Time" line chart: family accounts at the end of each of the last 26 weeks (`acquisition.totals` in `src/lib/adminMetrics.ts`), computed from sign-up dates, never stored.
- It uses the dashboard's usual family list, which already leaves out class student accounts and the owner's test account.
