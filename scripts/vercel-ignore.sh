#!/bin/sh
# Vercel "Ignored Build Step" (vercel.json `ignoreCommand`): exit 0 skips the build, exit 1 runs it.
# Build CPU minutes are most of the Vercel bill, so only a push to main that can change the live site builds.
# Compared against the last deployment of the branch (VERCEL_GIT_PREVIOUS_SHA), so a push of several
# commits is judged as a whole, not by its last commit. If that commit can't be found, or git fails
# for any other reason, the build runs.
[ "$VERCEL_GIT_COMMIT_REF" = "main" ] || exit 0
BASE="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"
git diff --quiet "$BASE" HEAD -- . \
  ':!docs' ':!ios' ':!android' ':!.github' ':!reports' ':!*.md' \
  ':!*.test.ts' ':!*.test.tsx' ':!stryker*.mjs' ':!vitest.config.mts' ':!eslint.config.mjs' \
  ':!scripts/e2e*.mjs' ':!scripts/ci-*' ':!scripts/test-*' ':!scripts/stryker-*' ':!scripts/coverage-summary.mjs'
