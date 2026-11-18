# Drawings for composite area questions (2026-11-18)

Melvin asked (after a parent flagged a Florida Grade 3 question) for a simple drawing on composite-area questions in every province and state.

- New `joined` picture (`Visual` in `src/content/types.ts`, `JoinedShape` in `visuals.tsx`, helpers in `src/content/joined.ts`): rectangles side by side on a shared bottom edge, or one rectangle with a corner cut away, drawn to scale with each side labelled. The unknown part of a "find the other rectangle" question is dashed with a "?".
- Drawn now: Florida Grade 3 (all four makers), New York Grade 7 (L-shape and tile cost), Ontario Grades 6 and 8. Those are the only units that ask these questions; other frameworks cite them in plans but share no generator. `src/content/joined.test.ts` fails if a rectangles-composite question appears without a matching drawing.
- Florida's old equation picture ("6 × 2 + 3 × 3") gave the method away, so it was replaced by the drawing.
- Also drawn: triangle on top (NY Grade 7 wall), triangle cut out (NY Grade 7 sign), semicircle on the end (Ontario Grade 8, Florida Grade 9). Plain trapezoid-area questions are single shapes, not composites, and are not drawn.
