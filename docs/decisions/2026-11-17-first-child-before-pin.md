# First child before the parent PIN (November 17, 2026)

**Decision (Melvin, after the funnel review):** only 10 of 16 email-confirmed families added a child, so adding the child and starting their first question comes before anything else.

- The email confirmation page continues to the parent area on its own after about a second (the "Add my child" button stays as a fallback).
- On a device with no parent PIN yet, `/parents/?addchild=1` shows `FirstChild` (first name, grade, province) instead of asking the parent to invent a PIN. Saving makes the child the active player and opens their Adventure straight away.
- The PIN is asked the next time the parent area opens. A device that already has a PIN, or a family that already has a child, sees the usual gate.
- Same privacy rules: a first name only, no new data stored.
