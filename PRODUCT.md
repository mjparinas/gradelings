# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three primary experiences, optimized differently (do not collapse them into one “app UI”):

- **Children (Pre-K to Grade 9)** use `/play/`: short practice sessions that feel like a game, often on a tablet or phone, often offline. Optimize for touch, delight, kindness, age-band sizing, and one-tap flow. Age bands change copy, size, and features (little kids get bigger targets, read-aloud by default, and a calmer home).
- **Parents** choose the product, configure it, and pay. They use marketing pages to decide, then `/parents/` (PIN-gated) for overview, reports in report-card language, children, settings, account, and subscription. Optimize for clarity, scanability, trust, and grown-up control (screen time, subjects, calm options)—not arcade juice.
- **Site administrators** use `/admin/`: operator tooling for the business (funnel, billing, codes, flags, maintenance, support inbox, and related controls). Optimize for dense information, speed, and precision; this is not a family or kid surface.

**Teachers** remain a real but secondary audience (`/teachers/`, classroom codes, assignments, send-home). Design for play, parents, and admin first unless the brief is teacher-scoped.

## Product Purpose

Gradelings is curriculum-matched practice, learning games, and parent reports for Pre-K to Grade 9. It exists so families can practise what schools teach—in the language of the report card—without ads, shame, or a hard menu maze. Success looks like regular short practice, progress that syncs across devices, and parents who can see where a child stands and what to try next.

## Positioning

Curriculum-aligned units and report-card proficiency language, plus arcade games unlocked only after focused practice, plus real offline play with sync when back online—ad-free. Neighbours may offer drills, free content, or game skins; this combination (curriculum match + report-card reports + earn-to-play games + offline sync + no ads) is the claim to preserve.

## Operating Context

- Kids open Adventure or Practice on a shared family tablet, Chromebook, or phone; parents peek at reports on the same or another device.
- Android is a Trusted Web Activity and iOS a thin WKWebView shell around the same web UI (`/play/`, `/parents/`, `/account/`, `/shared/`); store apps must not sell or name prices.
- Public SEO pages (`/curriculum/…`, guides, worksheets, report-card explainers) bring search visitors into a free trial / play path.
- Progress is event-sourced on device and synced to a family account; XP, levels, coins, and trophies are derived, never stored as authoritative state.

## Capabilities and Constraints

- Modes: Adventure, Practice, Review, Speed Run, Daily Challenge, Challenge; Math Facts and Story Library where flagged/age-appropriate.
- Subjects: math, language, science, social studies; opt-in French Immersion, Core French, and Spanish (Spanish behind a flag until ready).
- Frameworks: Canadian provinces/territories and offered US states via `src/content/registry.ts`. Quebec is not supported for now. US families need COPPA consent before child data syncs.
- Money: family plan with trial; first units of each course stay free after trial; no ads; kids never buy with real money; store apps hide payment UX.
- Name is set once in `src/lib/brand.ts` (`APP_NAME`); do not hard-code elsewhere.
- Undecided for design work: none raised in init beyond continuing to follow owner decisions in `AGENTS.md` / `docs/decisions/`.

## Brand Commitments

- Working product name **Gradelings**; mascot **Ollie**; wordmark letter colours in `WORDMARK_COLOURS` (`src/lib/brand.ts`).
- Tone: clarity, kindness, usability—never shame a child; soft wrong-answer feedback.
- **No ads, ever. Never sell data.**
- Icons and install assets under `public/` (`icon.svg`, `icon-192.png`, `icon-512.png`, maskable/monochrome variants, holiday icons).
- Store listings follow the same no-price rules as the in-app store shells.

## Evidence on Hand

- Full product implementation: kids app, parent area, teacher area, public marketing and curriculum pages.
- Accessibility self-assessment: `docs/school/accessibility-conformance.md` (WCAG 2.2 A/AA automated/scripted; no person-led screen-reader testing yet).
- Parent quotes: `src/content/testimonials.ts`. Only `sample: false` quotes may appear on the live site; sample quotes are for development/preview only. Current live quotes are founder/family-connected and must stay labelled as such. **Do not invent testimonials or present sample quotes as real parents.**
- Market/competitor research lives in the separate `gradelings-research` repo (see `docs/research/README.md`), not fabricated here.
- No independent customer case studies or press kit claimed in-repo.

## Product Principles

1. **Split surfaces, shared truth** — Optimize `/play/` for children, `/parents/` (and marketing) for parents, and `/admin/` for operators; keep one curriculum and progress model underneath. Never force kid game chrome onto parent or admin screens, or dense admin patterns onto play.
2. **Report-card clarity over generic drill** — Speak the province/state scale and standards; practice is not a report-card mark.
3. **Earn play, never buy attention** — Games follow learning; no ads; coins are pretend and earned only by practising.
4. **Kind and calm by default** — Hints and retries; calm/focus and easier-reading options for kids who need them; never shame.
5. **Works where kids actually are** — Offline-capable PWA (and store shells) so a tablet without internet still practises and syncs later.

## Accessibility & Inclusion

- Target **WCAG 2.2 Level A and AA** on kids, parent, teacher, and public surfaces; CI runs axe and keyboard scripts.
- Product features for inclusion: calm mode, quiet sounds, hide timers, dyslexia font, reading tint/high contrast, read-aloud (including French/Spanish where relevant), large touch targets for little kids, colour-blind-aware feedback.
- Known gaps to preserve honestly: arcade games are largely pointer/touch; screen-reader testing by a person is not done yet (`docs/school/accessibility-conformance.md`).
