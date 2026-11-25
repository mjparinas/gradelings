---
target: /for-teachers/
total_score: 23
max_score: 32
na_heuristics: 7,9
p0_count: 0
p1_count: 2
target_identity: "file:/Users/melvinparinas/gradelings/src/app/for-teachers/page.tsx"
target_fingerprint: "sha256:46ec9ba60128f9d91cb08549e698091ddd51e448bb2d2633452f8aa00974cf81"
target_path: /Users/melvinparinas/gradelings/src/app/for-teachers/page.tsx
timestamp: 2026-11-25T02-14-17Z
slug: src-app-for-teachers-page-tsx
---
Method: dual-agent (A: abbc861c-f0ba-450a-a747-f4ff39d2bd18 · B: 8b58b2c4-921b-45ac-bfe5-97bb0b40467e)

# Critique: `/for-teachers/`
**Target:** `src/app/for-teachers/page.tsx` (+ framework/grade pages, `TeacherDemo`, `TeacherCta`)  
**Mode:** Persuade (primary) · Read (secondary)  
**Note:** No PRODUCT.md/DESIGN.md in repo — assessed against shipped code and production. Suggest `/impeccable init` when you want durable product context.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Carousel/FAQ feedback good; signup journey has no progress cue |
| 2 | Match System / Real World | 4 | Teacher language is fluent and accurate |
| 3 | User Control and Freedom | 3 | Breadcrumbs and carousel pause; dots are not controls |
| 4 | Consistency and Standards | 2 | Play free / Subscribe chrome vs free teacher account |
| 5 | Error Prevention | 3 | Clear framing; wrong-path risk is header CTAs |
| 6 | Recognition Rather Than Recall | 3 | CTAs visible; region wall forces heavy scanning |
| 7 | Flexibility and Efficiency | n/a | Persuade landing; no expert accelerators expected |
| 8 | Aesthetic and Minimalist Design | 2 | Region wall + dual missions + Android aside |
| 9 | Error Recovery | n/a | No forms/errors on this surface |
| 10 | Help and Documentation | 3 | Strong teacher FAQ |
| **Total** | | **23/32** | **Good (~72%)** |

## Design Specificity Verdict

**LLM assessment:** Partly authored for Gradelings; structurally still category-interchangeable EdTech marketing. Product-specific strengths: `TeacherDemo` (Room 12, critters, Seedling→Star, “From your teacher,” reteach notes, practice-not-mark), free-for-teachers framing, join-code / no-password story, curriculum-matched region tree. Interchangeable skeleton: badge → H1 → dual CTAs → 4 how-it-works cards → giant region grid → FAQ → CTA card. Soft pastel + rounded cards + green primary is warm and on-brand for kindness, but another classroom product could reuse the layout with a logo swap. Most of the page length is a **directory**, not a **persuasion scene**.

**Deterministic scan:** `impeccable detect --json` on the five markup files returned `[]`, exit 0 — **0 findings**. No detector rules fired on source.

**Visual overlays:** No reliable user-visible overlay. Mutation preflight succeeded and live-server started (port 8400), but localhost `/for-teachers/` never loaded (Next.js OOM while compiling the route). `detect.js` was not injected into product DOM. Assessment A inspected production (`https://www.gradelings.com/for-teachers/`) as visual fallback.

## Overall Impression

The demo and trust copy are the page’s real product argument — kind, teacher-fluent, and specific. The biggest opportunity is stopping the chrome and the 63-region wall from competing with “Create a free teacher account.” Fix those two, and the hub stops reading like a sitemap wearing a marketing costume.

## What's Working

1. **`TeacherDemo` is the product’s best argument** — four fixed-height slides show assign → student view → results → next steps with critters and proficiency icons; figcaption reinforces practice-not-mark.
2. **Trust copy is disciplined** — free for now, no ads/passwords, families in control, practice ≠ report-card mark, US consent FAQ when relevant.
3. **Discovery ladder is coherent** — hub → framework → grade → unit curriculum pages, with breadcrumbs and prev/next grades.

## Priority Issues

### [P1] Chrome fights the teacher primary action
- **What:** Sticky **Play free**; on narrow viewports full-width **Subscribe** (`SiteHeader` default `lead="subscribe"`; teacher pages never pass a teacher-appropriate `lead`).
- **Why it matters:** Teachers who read “free for now” then hit Subscribe/Play free mis-route or lose trust.
- **Fix:** On teacher surfaces, suppress Subscribe bar; swap header primary to teacher sign-in/create account, or mute Play free to text.
- **Suggested command:** `/impeccable clarify`

### [P1] 63-region “wall of options”
- **What:** Flat CA + US card grids; US alone fills the viewport with equal-weight tiles.
- **Why it matters:** Primary Persuade path stalls; first-timers and mobile teachers abandon before signup. Cognitive load checklist failed 5–6 items (high).
- **Fix:** Search/typeahead, popular/recent regions, or country → state progressive disclosure; keep Create account above the fold without requiring a region.
- **Suggested command:** `/impeccable distill`

### [P2] Dual job dilutes conversion
- **What:** After four steps, the page becomes a curriculum index before the closing CTA.
- **Why it matters:** Attention spent browsing provinces never returns to account creation.
- **Fix:** Shorten hub Read block (featured regions + “see all”); push deep browse to framework pages; repeat soft CTA after steps.
- **Suggested command:** `/impeccable shape`

### [P2] Framework/grade pages lose the persuasion peak
- **What:** Framework page = H1 + grade cards + CTA; grade page = unit directory. No demo, no “assign in minutes” scene.
- **Why it matters:** Peak-end peak lives only on the hub; search deep links feel like a catalog.
- **Fix:** Compact demo or sample-assignment strip on framework pages; mid-page CTA.
- **Suggested command:** `/impeccable delight`

### [P3] Off-mission Android block after teacher CTA
- **What:** `AndroidCta` immediately under “Create a free teacher account.”
- **Why it matters:** Breaks end emotion; irrelevant for many teachers.
- **Fix:** Move to footer/help or gate to Android intent.
- **Suggested command:** `/impeccable quieter`

## Persona Red Flags

**Jordan (first-timer teacher):** Understands product from steps + demo, then fails at the US state alphabet soup with no “start without picking.” Header Play free looks like the main product.

**Casey (mobile, distracted):** Full-width Subscribe sits above content while the page promises free classes. Demo below fold; 2-col region grid is endless thumb scrolling; chrome CTAs dominate the thumb zone.

**Riley (stress tester):** Demo controls look live but are inert. Create account → `/teachers/` vs Sign in → chooser path inconsistency. Grade pages talk “assign” but only deep-link to public unit pages. Subscribe chrome vs free FAQ is a claim/UI mismatch.

## Minor Observations

- Carousel dots are non-interactive status only.
- Newfoundland and Labrador label stretches card rhythm.
- Framework grade cards use subject emoji without text (decorative).
- No social proof / school names / time-to-first-assignment on the hub.
- Breadcrumbs and FAQ JSON-LD are solid.

## Questions to Consider

1. If a teacher never opens “Find your curriculum,” does the hub still earn the account — or is browsing required emotional safety?
2. Should the loudest green control on a teacher page ever be **Play free** or **Subscribe**?
3. What would a confident hub look like if the US list were one search field and three featured chips?
4. Is the demo the product, and the region grid a sitemap wearing a marketing costume?
