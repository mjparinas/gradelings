# Flaky tests are fixed at the cause, not retried

**Flaky tests are fixed at the cause, not retried** (November 2, 2026): component tests wait up to 5 s for `findBy*`/`waitFor` (`asyncUtilTimeout` in `src/test/setup.ts`; the 1 s default failed under CI load), and e2e scripts wait for a condition (for example a setting reaching IndexedDB) instead of sleeping a fixed time. Never re-run a job to get past a failure without finding out why it failed.
