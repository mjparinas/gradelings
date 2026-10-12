# Accessibility conformance report (WCAG 2.2 A and AA)

Product: Gradelings (kids' app `/play/`, parent area `/parents/`, teacher area `/teachers/`, public pages)
Standard: WCAG 2.2 levels A and AA. Districts often ask for 2.1 AA; 2.2 includes every 2.1 criterion.
Date: October 12, 2026
Method: **self-assessed, automated and scripted testing only so far.** No assistive-technology testing has been done by a person yet.

## What has been tested

| Check | How | Result |
| --- | --- | --- |
| Automated WCAG 2.2 A/AA rules | axe-core through Playwright in CI (`node scripts/e2e-a11y.mjs`) on the kids' app, parent area, teacher area and public pages | Passes. Runs on every pull request. |
| Colour contrast | `src/lib/contrast.ts` picks dark text on bright fills; axe checks the rest | Passes |
| Colour-blind simulation | `scripts/colour-blind.mjs`, three simulated types | Passes. Not tested with colour-blind children. |
| Layout on 14 phone and tablet sizes | `scripts/e2e-devices.mjs`: no sideways scroll from 320 px, touch targets at least 48 px for kids and 44 px elsewhere | Passes |
| Reduced motion | All motion respects `prefers-reduced-motion`; a per-child "calm motion" option goes further | Built in |
| Reading comfort | Per-child options for roomy text and high contrast; Andika font for questions | Built in |
| Read-aloud | Device voices through the Web Speech API; every question can be read aloud | Built in |
| Text alternatives for charts | Every parent chart has tooltips and a table view | Built in |
| Keyboard-only use | `node scripts/e2e-keyboard.mjs` in CI: Tab through the public pages, kids' app and every parent tab (each stop must show a focus ring and not be hidden), then a whole practice session, the parent PIN and the parent tabs with keys alone | Passes. Runs on every pull request. |
| Skip to main content | A skip link is the first Tab stop on public, parent, teacher and admin pages | Built in, checked by the keyboard script |
| Keyboard shortcuts in questions | Number keys pick a choice; Enter checks; the keypad and PIN take typed digits | Built in |
| Windows high contrast (forced colours) | Picked options, right and wrong answers, switches, sliders and progress bars keep a border or system colour | Built in, checked by the keyboard script |

## What has not been tested yet

- Screen readers: VoiceOver (iOS and macOS), TalkBack, NVDA. **Not done.**
- Keyboard-only use by a person. A script drives the main flows by keyboard (above), but nobody has done it by hand yet, and the teacher and admin areas aren't in the script.
- Switch access, voice control and screen magnifiers.
- Testing with students who use assistive technology.

These are the next steps. This report will be updated with results.

## Criteria summary

| Principle | Status | Notes |
| --- | --- | --- |
| 1.1 Text alternatives | Supports (automated) | Informational images have text; decoration is hidden from assistive technology. Games drawn on a canvas are not accessible to a screen reader. |
| 1.2 Time-based media | Not applicable | No audio or video content. Sounds are effects only. |
| 1.3 Adaptable | Partially supports | Semantic headings, lists and tables on content pages. Not yet verified with a screen reader. |
| 1.4 Distinguishable | Supports (automated) | Contrast, reflow to 320 px, text spacing options. |
| 2.1 Keyboard accessible | Partially supports | Questions, the kids' app menus, the parent PIN and the parent area work with a keyboard alone (scripted check). **Known gap:** most arcade games need pointer or touch (Number Munchers has arrow keys). |
| 2.2 Enough time | Supports | Timed modes (Speed Run, Challenge) are optional. A per-child "hide timers" option exists. Practice has no time limit. |
| 2.3 Seizures and physical reactions | Not verified | Motion can be turned off per child and follows the device setting. Flash rates of effects such as confetti have not been measured. |
| 2.4 Navigable | Partially supports | Page titles and headings, a skip-to-content link, and a visible focus ring on every Tab stop that is never fully hidden (scripted check). Focus order not yet verified by hand. When a kids' app screen changes, focus returns to the top of the page rather than to the new heading. |
| 2.5 Input modalities | Partially supports | Big touch targets (checked in CI). Question types use taps. The arcade games use swipes or pointer movement, which have no alternative. |
| 3.1 Readable | Supports | The page language is set to English (Canada); French questions, choices and stories are marked with `lang="fr"`, and read-aloud uses a French voice. |
| 3.2 Predictable | Supports | Consistent navigation; nothing changes context on focus. |
| 3.3 Input assistance | Supports (automated) | axe-core finds labels on form fields; error wording has not been reviewed by a person against this criterion. |
| 4.1 Compatible | Supports (automated) | Valid names, roles and values per axe-core. |

## Known limitations

- The arcade games (Number Munchers, Word Ninja, Critter Catch, Bubble Pop, Memory Match) are visual and timed. They are optional rewards and are not needed to learn or to complete assigned work.
- Read-aloud quality depends on the voices installed on the device.
- Some pictures in questions (for example base-ten blocks or clocks) are described in the question text, but not every picture has a long description.

## Contact

Report an accessibility problem at `[CONTACT_EMAIL]`. We aim to reply within 5 business days.
