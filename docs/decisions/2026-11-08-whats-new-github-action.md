# The daily What's new post runs as a GitHub Action (Melvin, November 8, 2026)

The "Daily what's new post" Claude routine is replaced by `.github/workflows/whats-new.yml`, which runs `scripts/whats-new.mjs` every day at 08:00 UTC (midnight Pacific in winter) and can be run by hand.

- It reads the pull requests merged into `staging` or `main` since the newest day in `src/lib/whatsNew.ts`, grouped by America/Vancouver day, and only writes complete days before today.
- One Anthropic Messages API call (model `claude-sonnet-5-5`, override with `WHATS_NEW_MODEL`) turns them into entries following `docs/WHATS_NEW.md`. It needs the repository secret `ANTHROPIC_API_KEY`. No SDK, no new dependency.
- With something to add it runs `src/lib/whatsNew.test.ts` and opens a pull request into `staging` for Melvin to review and merge. It never merges it. With nothing user-visible it does nothing.
- A pull request opened with the built-in token doesn't start CI; an optional `PROMOTE_TOKEN` secret (already used by "Promote staging") fixes that.
- Why: the routine needed a Claude session each day and two recent runs failed. A workflow is cheaper, visible in the Actions tab and needs no model session for days with no news.
