---
name: Gradelings
description: Friendly arcade-classroom kit—warm paper, chunky press-down chrome, juice on play only
colors:
  paper: "#fffaf1"
  ink: "#253047"
  ink-soft: "#5b6680"
  line: "#e6e1d6"
  help: "#4f8ef7"
  help-dark: "#2f6fd6"
  help-soft: "#e6f0ff"
  good: "#22b573"
  good-dark: "#0f6b41"
  good-soft: "#e3f9ee"
  nudge: "#ff9f43"
  nudge-dark: "#b45309"
  nudge-soft: "#fff1e0"
  star: "#ffc233"
  white: "#ffffff"
  btn-ink: "#0f172a"
  wordmark-pink: "#e9559a"
  wordmark-green: "#25b47e"
  wordmark-orange: "#ff9636"
  wordmark-violet: "#8b5cf6"
  wordmark-cyan: "#06b6d4"
typography:
  display:
    fontFamily: "Fredoka, ui-rounded, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Andika, Fredoka, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Fredoka, ui-rounded, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  lg: "0.5rem"
  xl: "0.75rem"
  "2xl": "1rem"
  "3xl": "1.5rem"
  full: "9999px"
spacing:
  touch-kid: "48px"
  touch: "44px"
  card-pad: "1.25rem"
  btn-pad-y: "0.75rem"
  btn-pad-x: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.help}"
    textColor: "{colors.btn-ink}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1.5rem"
  button-good:
    backgroundColor: "{colors.good}"
    textColor: "{colors.btn-ink}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1.5rem"
  button-nudge:
    backgroundColor: "{colors.nudge}"
    textColor: "{colors.btn-ink}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1.5rem"
  button-soft:
    backgroundColor: "{colors.help-soft}"
    textColor: "{colors.help-dark}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1.5rem"
  button-admin:
    backgroundColor: "{colors.help-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "0.5rem 1rem"
    height: "44px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.card-pad}"
  card-admin:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "1rem"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "0.5rem 0.75rem"
    height: "44px"
---

# Design System: Gradelings

## Overview

**Creative North Star: "The Friendly Arcade Classroom"**

Gradelings shares one material kit—warm notebook paper, midnight slate ink, bright subject colours, rounded Fredoka UI type, and Andika for reading—across the product. That kit is applied at three different desks: the kids' arcade classroom (`/play/`), the parent's calm report desk (`/parents/` and marketing), and the operator's flat console (`/admin/`). Same crayons; different volume.

Personality is kind, chunky, and clear. Play earns game juice (jelly, squash-and-stretch, critters, confetti). Parents get scanable trust without arcade chrome. Admin gets density and speed with flat controls—no mascots, no jelly. Never shame; never purple-SaaS generic; never sterile gray on play.

**Visual anti-references (confirmed):** arcade chrome on `/parents/` or `/admin/`; sterile edtech gray on `/play/`; purple-gradient SaaS everywhere; critters on admin.

**Key Characteristics:**
- One shared token kit; three surface densities (play / parents / admin)
- Warm paper stage with soft pastel corner washes
- Chunky press-down controls with a hard colour ledge (not soft drop shadows by default)
- Jelly and critters only on play (and marketing brand moments); admin stays flat
- Accessibility modes (contrast, roomy, dyslexia font, forced colours) are first-class, not afterthoughts

## Colors

A bright-but-kind classroom palette on warm paper: one help blue for primary actions, sprout green for success/subscribe, gentle orange for caution, trophy gold for rewards, plus a wordmark/subject rainbow.

### Primary
- **Sky Help Blue** (`#4f8ef7` / dark `#2f6fd6` / soft `#e6f0ff`): default primary actions, focus rings, help affordances, math subject colour. Use as the “point here” accent.
- **Sprout Green** (`#22b573` / dark `#0f6b41` / soft `#e3f9ee`): success, “good” CTAs (Subscribe / Play free when leading with trial), correct-answer feedback.

### Secondary
- **Gentle Nudge Orange** (`#ff9f43` / dark `#b45309` / soft `#fff1e0`): soft alerts, nudges, “try again” warmth—not alarm red.
- **Trophy Gold** (`#ffc233`): stars, rewards, celebration sparks.

### Tertiary
- **Wordmark / subject rainbow** (`#4f8ef7`, `#e9559a`, `#25b47e`, `#ff9636`, `#8b5cf6`, `#06b6d4` and subject softs): letter colours in the Gradelings wordmark; per-subject identity in play and marketing. Not a second primary for chrome.

### Neutral
- **Warm Notebook Paper** (`#fffaf1`): page background; body sits on fixed pastel radial washes (blue / pink / green / peach corners).
- **Midnight Slate** (`#253047`): primary text and selected parent-nav chips.
- **Soft Slate** (`#5b6680`): secondary text.
- **Paper Line** (`#e6e1d6`): borders and the hard ledge under cards/default buttons.
- **Button Ink** (`#0f172a`): text on bright fills (white-on-bright fails contrast).
- **White** (`#ffffff`): cards, default button fills, input fields.

### Named Rules
**The Three Desks Rule.** Shared colours; different saturation of expression. Play may flood with subject colour and juice. Parents stay paper + ink + one accent. Admin prefers slate borders, compact fills, and almost no rainbow.

**The Dark-on-Bright Rule.** Bright fills (help, good, nudge) use near-black text (`#0f172a`), never white.

**The Honest Accent Rule.** Nudge orange is kindness, not error theatre. Don’t invent a harsh error red as a new system primary without product need.

## Typography

**Display Font:** Fredoka (with `ui-rounded`, system-ui)
**Body Font:** Andika (with Fredoka, system-ui)—designed for beginning readers
**Optional:** OpenDyslexic when a parent enables the dyslexia-friendly font (`html.dyslexia`)

**Character:** Rounded, friendly display for UI and headlines; Andika for question and reading passages so letters stay unambiguous. Admin may lean denser but still uses the same families—don’t introduce a corporate sans just for `/admin/`.

### Hierarchy
- **Display** (Fredoka, semibold/bold, large marketing/play titles): brand moments, hub greetings, public heroes.
- **Headline** (Fredoka, bold, ~`text-3xl`/`text-4xl`): section titles on marketing and parent Overview.
- **Title** (Fredoka, semibold): card titles, dialog titles, admin section heads.
- **Body** (Andika for reading; Fredoka acceptable for short UI copy): questions, reports, help. Prefer Andika wherever a child or parent is reading continuous text.
- **Label** (Fredoka, semibold, compact): buttons, chips, tabs, table headers.

### Named Rules
**The Read Font Rule.** Continuous reading (questions, stories, long parent copy) uses Andika (`font-read`). Fredoka is for chrome and short labels.

**The No Admin Typeface Rule.** `/admin/` does not get a separate “ops” font. Density changes size and spacing, not family.

## Layout

Mobile-first, touch-first. Kids need ≥48px targets; elsewhere ≥44px. Public and parent layouts use centered content with comfortable card stacks; play uses full-viewport hub/session chrome with sticky feedback bars that must not cover primary actions. Admin uses denser card grids, tables, and toolbars—still rounded, still paper-rooted, but tighter padding and more information per viewport.

Page stage: `min-height: 100dvh` on Warm Notebook Paper with fixed pastel corner washes. Narrow phones (`max-width: 359px`) and short landscape (`max-height: 500px`) have dedicated variants—preserve them rather than inventing a separate compact theme.

Spacing rhythm is Tailwind scale with intentional chunky padding on play/marketing cards (`p-5`) and slightly tighter admin cards (`p-4`/`p-5`). Don’t introduce a second spacing token system.

### Named Rules
**The Touch Floor Rule.** Interactive targets stay at least 48px for kids and 44px elsewhere; CI device scripts enforce this.

**The Desk Density Rule.** Play = large, few choices. Parents = scannable sections. Admin = dense tables and tools. Same tokens; different packing.

## Elevation & Depth

Depth is **toy ledge** only—not soft Material clouds. Buttons and play/marketing cards sit on a hard 6px colour edge (`box-shadow: 0 6px 0 …`) with a 3px matching border; pressing translates down and shortens the ledge. Diffuse drop shadows are not part of this system. Admin resting controls stay **flat** (border, no press ledge, no jelly).

### Shadow Vocabulary
- **Toy ledge** (`box-shadow: 0 6px 0 <edge>` + `border: 3px solid <edge>`): `.btn`, `.card` on play/marketing; active press → `translateY(4px)` and `0 2px 0`.
- **Flat border** (`border: 1px solid var(--color-line)`): parent panels and admin cards at rest—no ledge, no blur shadow.

### Named Rules
**The Ledge-Not-Blur Rule.** Do not use soft/diffuse drop shadows for depth. Play and marketing sit on the colour ledge; parents and admin use flat borders. Prefer dimming the page behind a dialog over inventing a shadow elevation scale.

**The Jelly Desk Rule.** Jelly / squash-and-stretch belongs to `/play/` (and brief marketing delight). Parents stay calm; admin stays flat. Always respect `prefers-reduced-motion` and calm mode.

## Shapes

Friendly, toy-like rounding: buttons `rounded-2xl` (~1rem), cards `rounded-3xl` (~1.5rem), inputs and admin controls often `rounded-xl` (~0.75rem), chips `rounded-full`. Borders are visible and intentional (2–3px), not hairline ghost lines—especially on play.

Admin softens the toy silhouette slightly (more `rounded-xl` / `rounded-2xl`, thinner borders) but does not go sharp or zero-radius.

### Named Rules
**The Visible Edge Rule.** Borders are part of the character. Don’t replace ledge + border with shadow-only cards on play/marketing.

## Components

Shared primitives live in `src/app/globals.css` (`.btn*`, `.card`). Parents and admin often use flatter Tailwind compositions that reuse the same colours and radii without the press ledge.

### Buttons
- **Shape:** Gently chunky (`rounded-2xl`), 3px border, toy ledge; Fredoka semibold.
- **Primary (`.btn-primary`):** Sky Help Blue fill, button-ink text, darker blue ledge (or subject `--c` / `--c-dark`).
- **Good (`.btn-good`):** Sprout Green—primary subscribe / affirmative CTAs when leading with trial.
- **Nudge (`.btn-nudge`):** Gentle Nudge Orange.
- **Soft (`.btn-soft`):** Tinted soft fill for secondary actions.
- **Default (`.btn`):** White fill, paper-line ledge.
- **Play:** May add `.jelly` on release via app effects.
- **Admin:** Flat `rounded-xl` fills/borders, `min-h-11`, no ledge, no jelly; primary often solid help-dark with white text.
- **Hover / Focus:** Focus-visible = 4px Sky Help Blue outline, 3px offset (Midnight Slate + white halo in high contrast). Active press on `.btn` shortens the ledge.

### Chips
- **Style:** Pill or rounded rectangles; selected parent tabs use Midnight Slate fill + white text; unselected white + line border.
- **Admin:** Compact status pills with muted slate/soft fills—no subject rainbow unless the data is literally a subject.

### Cards / Containers
- **Play / marketing (`.card`):** White, `rounded-3xl`, 3px Paper Line border, 6px Paper Line ledge.
- **Parents:** Often white `rounded-2xl` + `border-line` without the 6px ledge (calmer desk).
- **Admin:** Same as parents—bordered white panels, denser padding, slate tool wells (`#f1f5f9`).
- **Internal padding:** ~`p-5` (1.25rem) common; admin tables may tighten.

### Inputs / Fields
- **Style:** White, `rounded-xl`, `border-line`, `min-h-11`, horizontal padding ~0.75rem.
- **Focus:** Browser + global focus ring (help blue).
- **Admin:** Same field recipe; prefer compact toolbars over oversized play inputs.

### Navigation
- **Marketing:** Header with multicolour wordmark; Sign in / CTAs use shared buttons.
- **Parents:** Pill tabs / child switcher; selected = Midnight Slate.
- **Play:** Age-banded hubs (big picture tiles for little kids); not a dense sidebar.
- **Admin:** Dense section navigation and tables; no critters, no wordmark rainbow required in-chrome.

### Signature: Critters & Wordmark
- **Ollie and subject mascots** are brand on `/play/` and marketing. They do not appear on `/admin/`.
- **Wordmark letter colours** (`WORDMARK_COLOURS` in `src/lib/brand.ts`) stay the public/play identity signal.

## Do's and Don'ts

### Do:
- **Do** reuse Warm Notebook Paper, Midnight Slate, and the help/good/nudge accents before inventing new greys or purples.
- **Do** put juice (jelly, confetti, critter idle motion) on `/play/` and light brand moments on marketing only.
- **Do** keep admin flat, dense, and critter-free while still using Fredoka/Andika and the shared palette.
- **Do** use dark text on bright fills; keep the 4px focus ring.
- **Do** honour calm mode, reduced motion, contrast, roomy text, and dyslexia font switches.

### Don't:
- **Don't** put arcade chrome, jelly, or mascots on `/parents/` or `/admin/`.
- **Don't** make `/play/` sterile, gray, or “serious SaaS.”
- **Don't** default to purple-to-indigo gradient themes or soft neumorphism.
- **Don't** use soft drop shadows for elevation—toy ledge or flat border only.
- **Don't** hard-code the product name; read `APP_NAME` from `src/lib/brand.ts`.
- **Don't** invent testimonials or treat sample quotes as real parents (see PRODUCT.md).
