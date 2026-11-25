---
target: homepage
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/melvinparinas/gradelings/src/app/page.tsx"
target_fingerprint: "sha256:1592b087c3630c48cd66ef52945ef2e6a3e9adab12dbb51c966474042a3811e9"
target_path: /Users/melvinparinas/gradelings/src/app/page.tsx
timestamp: 2026-11-25T05-16-20Z
slug: src-app-page-tsx
---
Method: dual-agent (A: f1aafcad-a3c8-46c7-96ce-230f738263b3 · B: c6fec958-6e66-4698-ac51-f51e05c3328e)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Long page (~7.8k px) has no section progress; carousel/FAQ controls exist but sticky chrome doesn't orient |
| 2 | Match System / Real World | 4 | Parent-native copy: report-card levels, no card, no shame, ~15 minutes |
| 3 | User Control and Freedom | 3 | Easy exits via nav/footer; scroll endurance is the tax |
| 4 | Consistency and Standards | 2 | CTA vocabulary war: sticky Subscribe vs hero trial vs header Play free; pricing card hierarchy fights "try first" |
| 5 | Error Prevention | 3 | Strong no-card trial framing; premature Subscribe still above the fold on phones |
| 6 | Recognition Rather Than Recall | 3 | Options visible—often too many (63 regions, 11 games) |
| 7 | Flexibility and Efficiency | n/a | Persuade landing; expert accelerators aren't the job |
| 8 | Aesthetic and Minimalist Design | 1 | Android strip + dual chrome CTAs + feature/game/coverage walls + teachers after close |
| 9 | Error Recovery | 2 | FAQ handles purchase anxiety; weak recovery if region hunt fails |
| 10 | Help and Documentation | n/a | Persuade surface; FAQ is objection-handling, not task help |
| **Total** | | **20/32** | **Acceptable (~63%)** |

#### Design Specificity Verdict

**LLM assessment**: Half-authored. The hero's mid-hint QuestionGallery plus the fake Parent report row with Seedling→Star / Emerging→Extending language is unmistakably Gradelings. Past that, the page collapses into category-interchangeable edtech marketing: emoji+card feature grids, a wall of arcade tiles, cream paper + rounded cards, and a 63-link province/state picker. Brand fails the first-viewport test: h1 never says Gradelings; only the nav wordmark carries identity.

**Deterministic scan**: `impeccable detect --json` on `src/app/page.tsx` plus SiteChrome, Pricing, ParentQuotes, QuestionGallery, AppLink, Disclosure, PromoBanner — exit 0, empty findings `[]` on all. Detector and LLM agree there is no mechanical token/pattern smoke; the issues are structural and rhetorical, not detector-class.

**Visual overlays**: No reliable user-visible overlay. Assessment B could not keep `http://localhost:3000/` up through homepage compile (dev server exit/OOM); preflight mutation and `detect.js` injection were skipped. Fallback: CLI-only evidence.

#### Overall Impression

The product promise in the hero is strong and specific; the rest of the page dilutes it with inventory (every game, every region) and a mobile chrome that argues with the trial CTA. Biggest opportunity: one clear begin path on phones, and progressive disclosure for coverage—so persuasion isn't interrupted by a sitemap.

#### What's Working

1. **Hero product demo** — live-feeling miss → kind hint → report-card proficiency pills proves kindness + report-card clarity without a video.
2. **Copy** — "Progress you can read," "never a buzzer," "practice, not a report-card mark," trial/no-card lines are confident and parent-native.
3. **Kid scale (Seedling→Star)** — makes the four levels warm and ownable in the report-card section.

#### Priority Issues

**[P1] Mobile CTA collision (Subscribe bar vs trial)**
- **Why it matters**: `SitePage` defaults `lead="subscribe"`, so phones get a full-width green Subscribe under the header while the hero primary is "Start your free 14-day trial" and the header also shows "Play free." Three verbs for begin; sticky chrome ~130px eats the first viewport.
- **Fix**: On `/`, pass `lead="trial"` (or drop the mobile Subscribe strip on home) and unify naming to one primary + one secondary.
- **Suggested command**: `/impeccable distill` or `/impeccable clarify`

**[P1] Coverage wall: 63 equal region links**
- **Why it matters**: Forces a search task with no hierarchy, search, or popular path—largest extraneous-load spike; kills momentum after games.
- **Fix**: Progressive disclosure: country → typeahead/popular 6–8 → "See all." Keep SEO links collapsed or on the curriculum hub.
- **Suggested command**: `/impeccable distill` or `/impeccable layout`

**[P1] Brand missing from the hero composition**
- **Why it matters**: h1 is benefit-only; brand lives as nav text. First viewport fails the brand test for a Persuade surface.
- **Fix**: Make Gradelings a hero-level signal (wordmark lockup or name in the headline system) without shrinking the product demo.
- **Suggested command**: `/impeccable bolder` or `/impeccable typeset`

**[P2] Testimonials are founder-circle only**
- **Why it matters**: "What parents say" with connected voices reads as soft social proof strangers will distrust.
- **Fix**: Ship real unrelated parents, or remove the section until ready.
- **Suggested command**: `/impeccable quieter` or `/impeccable harden`

**[P2] Teachers section after the final parent CTA**
- **Why it matters**: Breaks peak-end. Parent who decided is asked to context-switch to classroom software.
- **Fix**: Move Teachers above FAQ as a quiet aside, or off-page with a single text link—don't follow the close.
- **Suggested command**: `/impeccable distill` or `/impeccable shape`

#### Persona Red Flags

**Jordan (First-Timer)**: Won't know whether to tap Play free, Subscribe, or Start your free 14-day trial. Android strip + "iPhone coming soon" adds a platform decision before value. Coverage grid is 63 pills with no "start here." Founder/family quotes feel like the product talking to itself.

**Riley (Stress Tester)**: Homepage pricing is CAD-forward while loudly selling 50 US states—no currency switch on this page. `lead=subscribe` chrome vs trial-first hero is a promise inconsistency. Connected testimonials logged as weak proof / endorsement risk.

**Casey (Distracted Mobile)**: Sticky Subscribe + Play free + trial = thumb-zone chaos. 130px sticky chrome + Android banner push the real hero CTA below fold on 390×844. Coverage as a long 2-column tap wall is abandonment bait on a ~7.8k px scroll.

#### Minor Observations

- Free-trial pricing card CTA is the quiet white `btn`; yearly gets `btn-good`—undermines "try first."
- Games list unlock-gated titles without an on-tile "earned with practice" cue.
- Inclusive section repeats the same 4-emoji card pattern as Features.
- Desktop header packs ~8 destinations competing with conversion.
- Rainbow wordmark is distinctive; cream/`card` sameness risks flattening it.

#### Questions to Consider

1. If the homepage could keep only one proof artifact, would you keep the mid-hint gallery—or the 63-state grid?
2. Why does home chrome still default to Subscribe when the hero pitch is "try without a card"?
3. What would a confident end look like if Teaching a class? were not allowed after the final CTA?
4. Would a Texas parent believe "What parents say" if both quotes name the founder's household?
5. Is "Matched to your province or state" a conversion section—or a sitemap pretending to be marketing?
