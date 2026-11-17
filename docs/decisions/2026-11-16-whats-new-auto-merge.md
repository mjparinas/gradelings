# Daily What's new posts auto-merge (November 16, 2026)

Melvin: "do 1, 2, 3" (option 3: merge the What's new post, or let the daily one auto-merge).

- The daily What's new pull request (the GitHub Action and any Claude run of the routine) targets `staging` and merges once "CI passed" is green, with no review step. Before this, the owner merged it himself (`2026-11-08-whats-new-github-action.md`).
- The Action turns on auto-merge with `gh pr merge --auto --squash`. This needs "Allow auto-merge" on in the repository settings; if it is off, the step summary says so and the pull request waits for a manual merge.
- Posts still follow `docs/WHATS_NEW.md` (plain words, nothing behind an off flag); the owner can edit or revert a day afterwards.
