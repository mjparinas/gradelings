# Drawings for angle, triangle and polygon questions

Melvin, November 18, 2026: after composite-area questions got drawings, "do them all" for the other question types that describe a figure in words only.

- Geometry questions in Grades 3 to 9 math that describe a figure now show it: two lines that cross, parallel lines cut by a transversal, angles that fill a line or a corner, a triangle (right, isosceles, with its height), two similar triangles or rectangles, a regular polygon, and a point to reflect on a grid.
- One module reads the question's own wording and numbers (`src/content/diagrams.ts`, applied in `mergeCourses`), so one change reaches every province and state and no unit file is edited. A figure is added only when a pattern matches a whole sentence and every number shown is in the prompt; the thing to find is drawn as "?". Questions that already have a picture are left alone.
- Pictures are not to scale where scale would give the answer away or break the page: a transversal is drawn at a friendly slant, and the labels carry the numbers.
- Adding a question template? Add its sentence to a maker in `diagrams.ts` with a case in `diagrams.test.ts`.
- Not done yet: parallelogram and trapezoid angles, congruence by sides, "is it a right triangle" checks (a to-scale picture would give the answer away), transformations other than a reflection of a point.
