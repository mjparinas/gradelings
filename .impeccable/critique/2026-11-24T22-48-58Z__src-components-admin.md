---
target: /admin pages
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:/Users/melvinparinas/.cursor/worktrees/gradelings/6gkd/src/components/admin"
timestamp: 2026-11-24T22-48-58Z
slug: src-components-admin
---
Method: dual-agent (A: design review · B: detector/browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Skeletons and notices strong; some success feedback easy to miss while scrolling |
| 2 | Match System / Real World | 3 | Plain operator English; occasional code-facing bits (A/B keys) |
| 3 | User Control and Freedom | 3 | Escape, Escape, Undo; deep family stacks still long |
| 4 | Consistency and Standards | 2 | Mixed primary recipes; soft shadows vs flat admin rule |
| 5 | Error Prevention | 3 | Excellent refund/delete confirms; Flags ~60 one-click switches |
| 6 | Recognition Rather Than Recall | 2 | 16 peer tabs force a mental map |
| 7 | Flexibility and Efficiency | 2 | Deep links help; no command palette; wrapping chip nav |
| 8 | Aesthetic and Minimalist Design | 2 | Overview tile flood; equal visual weight |
| 9 | Error Recovery | 3 | Alerts and empty states clear; flag misclicks less guided |
| 10 | Help and Documentation | 2 | Strong inline explainers; no first-run map for helpers |
| **Total** | | **25/40** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment**: Recognizably the Gradelings operator desk (paper stage, flat cards, dark-on-bright, plain copy, privacy discipline)—not a stock SaaS shell. Specificity thins where Operate meets generic console habits: 16 equal tabs, Overview metric farm, soft shadows on dialogs/toasts.

**Deterministic scan**: `impeccable detect --json` on `src/components/admin` (+ `src/app/admin`) exited 0 with **0 findings**. Purple check suppressed by DESIGN.md wordmark-violet.

**Visual overlays**: No reliable user-visible overlay. Dev server down (`node_modules` missing); injection only attempted on chrome-error page and failed to fetch detect.js.

## Overall Impression

Craft and ethics are strong (confirms, FamilySees, skeletons). The single biggest opportunity is **information architecture**: stop treating every destination and every Overview tile as peers so Melvin’s morning job (“what needs me?”) surfaces first.

## What's Working

1. Operator copy and privacy discipline (FamilySees, child-privacy lines, CAD/USD separation).
2. High-stakes progressive disclosure (refunds, maintenance TURN_ON, delete-by-email).
3. Loading craft and DetailModal a11y (skeletons, focus trap, Escape).

## Priority Issues

### [P0] Flat 16-tab IA
- **Why**: Choice overload every visit; buries To Do / Inbox.
- **Fix**: ≤4–5 top groups (Work, People, Growth, Money, Configure) with secondary nav; Support stays Users-scoped.
- **Suggested command**: `/impeccable distill` or `/impeccable layout`

### [P0] Overview tile flood
- **Why**: Landing fails single-focus; vanity KPIs before work queue.
- **Fix**: Lead with To Do + 3–4 attention tiles; collapse full metric grids.
- **Suggested command**: `/impeccable distill`

### [P1] User Detail action sprawl
- **Why**: Access / billing / flags / delete compete; lifetime near routine controls.
- **Fix**: Sticky identity header; tabs/accordions; confirm on lifetime grant.
- **Suggested command**: `/impeccable layout` + `/impeccable harden`

### [P1] Flags as ~60-switch wall
- **Why**: Minimal-choices failure; misclick is production-visible.
- **Fix**: Search + group by status; confirm turning off default-on flags.
- **Suggested command**: `/impeccable distill` + `/impeccable harden`

### [P2] Elevation and primary inconsistency
- **Why**: `shadow-xl`/`shadow-lg` and mixed primary recipes dilute the flat admin desk.
- **Fix**: Flat border + dim backdrop only; one admin primary recipe.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Alex (power user)**: Wrapping chips and max-w-5xl feel slow; wants keyboard jump and denser tables.

**Melvin (solo owner)**: Morning ritual buried under MRR tiles; System/maintenance another tab away from landing.

**Jordan (first-time helper)**: 16 labels without taxonomy; Flags/Access scary; no “start at To Do” guide.

## Minor Observations

- Feedback emojis / maintenance 🛠️ are light juice on a flat desk.
- Soft shadows on DetailModal and sticky Notice break Ledge-Not-Blur.
- Touch floor min-h-11 consistent; robots noindex correct.
- Rainbow wordmark in admin header: small Three Desks tension.

## Questions to Consider

1. If home were To Do + money pulse + system worst-state, would Overview charts stay top-level?
2. Should Configure be visually quieter than Work?
3. Slate-only mark on admin vs rainbow wordmark as “same crayons”?
