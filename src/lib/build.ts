/**
 * The commit this build was made from, set at build time in next.config.ts (`NEXT_PUBLIC_BUILD_SHA`: Vercel's
 * `VERCEL_GIT_COMMIT_SHA`, else `git rev-parse HEAD`). Shown at the foot of the home page so the owner can tell
 * which commit is live. Empty when unknown (tests, a checkout without git).
 */
export function buildLabel(sha = process.env.NEXT_PUBLIC_BUILD_SHA ?? ""): string {
  const short = sha.trim().slice(0, 7);
  return /^[0-9a-f]{7}$/i.test(short) ? `Build ${short.toLowerCase()}` : "";
}
