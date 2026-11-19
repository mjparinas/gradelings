# Drawings for volume, surface area and net questions (2026-11-18)

Melvin, after a scan for questions that can't be answered well without a picture: "do them all", split into parallel threads. This is the volume, surface area and nets group (Grades 5 to 9).

- Two new picture types, `solid` and `net` (`Visual` in `src/content/types.ts`, drawn by `src/components/solids.tsx`): a box, cube, triangular prism, cylinder, cone, square pyramid, or a box with a cube on top (`stacked`, no net). Measurements are written on the edges; "?" marks the one to find, so a picture never shows the answer.
- Questions build them with `solid()` and `net()` (`src/content/solids.ts`) from the same numbers as the prompt. `src/content/solids.content.test.ts` fails if a picture writes a number its question doesn't give.
- Pictures are region-free and text-free, so every framework that shares a unit gets them. Frameworks with their own volume or net questions (Ontario, Alberta, Manitoba, Washington) were updated in the same change.
- Not covered yet: banks in other states that have no picture slot. `BankItem` now takes an optional `visual`; a bank adopts it by adding the field.
