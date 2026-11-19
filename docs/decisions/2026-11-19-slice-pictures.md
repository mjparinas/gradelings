# Pictures for "what shape is the slice?" questions

Melvin, November 19, 2026 ("do it", after the volume and net drawings shipped in #633 and #637): cross-section questions get a picture too.

- A solid drawing can carry a `cut` (`SolidCut` in `src/content/types.ts`): `across` is a flat cut parallel to the base, `down` is a flat cut straight down through the middle. It is drawn as a translucent dashed plane over the solid (`CutPlane` in `src/components/solids.tsx`), for a box, cube, cylinder, cone or square pyramid.
- The picture shows where the cut is and never the shape of the cut face, so it can't give the answer away. `slice(kind, cut)` in `src/content/solids.ts` makes one.
- Attached in California Grade 7 (Triangles & Slices), New York Grade 7 (slicing solids) and Florida Grade 9 (cross-sections). New York's and Florida's hand-written banks (`Q` tuples, like Oregon's) take an optional picture as the sixth item.
- Left without a picture: spheres, hexagonal and triangular prisms, diagonal cuts and the "which solid…" questions, because they have no matching drawing yet.
