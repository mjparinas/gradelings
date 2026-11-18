# Drawings for measuring tools and moves of shapes (2026-11-18)

Melvin asked for drawings on every question that can't be answered without seeing a tool or figure ("do them all", split across threads). This part covers protractors, thermometers and early-grade slides, flips, turns and line symmetry.

- New picture types (`protractor`, `thermometer`, `move`, `compass`, `figure` in `Visual`) are drawn in `src/components/figureVisuals.tsx`; `visuals.tsx` only picks one.
- Pictures are made from each question's own words or numbers (`src/content/drawings.ts`), never by hand, so a question and its picture can't disagree. A picture never shows the answer: a Grade 7 temperature question shows only the starting temperature, a flipped letter is drawn as itself, and symmetry outlines have no fold lines.
- Units keep their ids and keys, so progress is unchanged. Shared units carry the pictures into every framework that uses them.
- Covered: Grade 4 protractor reading (California and New York units, which other states adopt), Measuring Temperature (Alberta Grade 6 science) and Grade 7 temperature change, Grade 2 and 3 slides/flips/turns (Alberta, Manitoba), Grade 3 quarter and half turns (a compass), and Grade 2 and 3 line symmetry (Ontario, Florida).
- Not covered here: other groups from the scan (angles with lines, triangles, volume and nets, graphs in words) are in parallel threads.
