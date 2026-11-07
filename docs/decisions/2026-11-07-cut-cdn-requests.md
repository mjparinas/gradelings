# Cut CDN requests: no viewport prefetch on public pages, long cache for voice files

Date: 2026-11-07 (Melvin). The gradelings Vercel project used 9.3M CDN requests and 128 GB in one cycle against the 1M Flat Rate tier.

- Public pages use `PublicLink` (`src/components/PublicLink.tsx`), `next/link` with `prefetch={false}` by default: a link is prefetched only on hover, not when it scrolls into view. Hubs list hundreds of links, so each visit used to cost dozens of prefetch requests. Import it instead of `next/link` in public pages; the apps use hash routes and are unaffected.
- `/piper/*` and `/whisper/*` (versioned folders) are `immutable` for a year; `/videos/*` and `/icons/*` are cached for a day. Vercel's default for files in `public/` is `max-age=0, must-revalidate`.
- Observability Plus is disabled on the team, so the Vercel MCP could not break usage down by path; check Vercel's Usage page (Top Paths) after this ships.
