# Skills inside units: Grade 3 math pilot

Date: 2026-11-17. Decision by Melvin ("do 1, 2, 3" on the coordinator's picks after the IXL Canada review).

**Decision:** pilot finer-grained skills on Grade 3 math. A unit may carry optional `skills`; a skill is narrower practice inside the unit, not a new unit.

**Why:** IXL lists about 46 math categories for Grade 4 where we have 8 to 13 units per grade, so a child can't practise "estimating" or "factor families" on its own, reports are coarse and skill-named searches ("Grade 3 subtracting worksheet") have no matching page. Splitting units into new units would orphan existing progress, which is keyed by unit id, and would move lock hashes for every framework.

**How it works:** skills keep the unit's key, level and report-card row. Answers from a skill session count for the unit and also carry a `skill` id, so skill totals are derived from events and merge across devices. Skill ids are frozen by a test. Parent Reports show skills under their unit, and each skill has a free worksheet page.

**Next:** judge by skill-worksheet search traffic and by whether children use "Practise one skill". If it works, extend grade by grade (every framework shares the unit, so it reaches them all).
