# West Virginia

## Framework

- **Id and slug:** `us-wv`, `west-virginia`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: West Virginia's world language standards aren't a subject the app follows yet). Offered to families and in classroom mode.

## Standards

- The West Virginia College- and Career-Readiness Standards, West Virginia Board of Education policies (legislative rules in Title 126 of the Code of State Rules): English language arts, Policy 2520.1A (effective July 1, 2021; `ELA.4.2`, with the literacy foundations as Roman numerals, `ELA.2.III`); mathematics, Policy 2520.2B (effective July 1, 2024; `M.4.6`; Grade 9 cites Algebra I, `M.A1HS.7`); science, Policy 2520.3C (effective July 1, 2022; `S.4.2`; Grade 9 cites the high school courses, `S.ESS.1`, `S.B.10`, `S.PS.3`); and social studies, Policy 2520.4 (filed July 8, 2024; `SS.8.22`; Grade 9 cites the high school courses, `SS.W.16`).
- West Virginia numbers every standard by subject, grade and number rather than using Common Core or NGSS codes, although the content grew out of both. Citations are `"CODES · text"` (`wvs()` in `src/content/west-virginia/cite.ts`), checked by `src/content/west-virginia/contract.ts` against `docs/research/west-virginia/outcomes.json`. Sources are in `gradelings-research/west-virginia/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/west-virginia/README.md`.

## Content

- **Math, English language arts and science** follow Connecticut's placement (and so California's), with West Virginia's codes in place of the Common Core's and the NGSS's (`src/content/west-virginia/plan/`). Where West Virginia teaches a topic in another grade (Grade 4 fossils, Grade 5 energy resources, Grade 6 weather, climate, biodiversity and space, Grade 8 growth), West Virginia's own units are copies of the same-grade units of other states with West Virginia examples: the New River Gorge, Spruce Knob, Cranberry Glades, Seneca Rocks, the state's limestone caves and its 300-million-year-old coal.
- **Social studies** follows Policy 2520.4's grade themes: the child's community and their place in West Virginia (K, 1), the nation and West Virginia's history and landmarks (2), the state, nation and world (3: West Virginia's regions, resources and work), the United States to 1854 (4: with West Virginia's counties and county seats, its geography and how life has changed since the 1700s), the United States from the Civil War (5: a timeline of how West Virginia became a state), the world since 1900 (6: with economic systems, trade, time zones and waterways), a continent-based study of the ancient world (7), **West Virginia Studies** (8: government, economy, geography, early West Virginia, statehood, industry and labor, modern West Virginia; all West Virginia's own units) and World Studies (9).
- West Virginia-only units (`wv-` ids, `bankUnit` in `own.ts`, `mixUnit` and `timelineUnit` in `units/kit.ts`) are in `src/content/west-virginia/units/`, each with a lesson in `src/content/west-virginia/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`; Virginia is allowed, since West Virginia was part of it) outside social studies Grades 4 to 9, and other states' Tribal units are never borrowed (`west-virginia.test.ts`).
- **Physical regions:** questions follow the West Virginia Geological and Economic Survey: the Appalachian Plateau (with the Allegheny Mountains as its high eastern edge), the Ridge and Valley, and a small piece of the Blue Ridge. The nine travel regions are taught by name.
- **Native content:** West Virginia has no federally or state-recognized Tribe today. Units name the Adena culture that built Grave Creek Mound, and the Shawnee and other nations who hunted, traveled and lived in the region, with the Shawnee in the present tense as living nations with their own governments (today in Oklahoma), and nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- West Virginia has no statewide report card for kindergarten to Grade 8; each county chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding). Courses that earn high school credit use the state's uniform A to F scale (Policy 2510).
- State tests are the West Virginia General Summative Assessment (English language arts and math in grades 3 to 8, science in grades 5 and 8; Does Not Meet, Partially Meets, Meets and Exceeds Standard) and the SAT School Day (grade 11). The Third Grade Success Act (W. Va. Code § 18-2E-10) adds reading and math screening in kindergarten to Grade 3 and, from 2026-27, retention in Grade 3 for a Does Not Meet result unless an exception applies.

## Parent guides

- `src/content/west-virginia/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Mathematical Habits of Mind (`/guides/west-virginia/math-habits-of-mind/`) and the state tests (`/guides/west-virginia/state-tests/`; dates point to the West Virginia Department of Education). No French guide.

## Schools

- **West Virginia.** `/privacy/` (`src/content/west-virginia/schools.ts`) states our commitments under the Student Data Accessibility, Transparency and Accountability Act, W. Va. Code § 18-2-5h: we don't collect the kinds of data the act bars, use student data only for school purposes, share it only with the providers who run the service, keep it secure, report a breach as soon as possible and delete it when the school asks. Confirm the county's contract before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Policy 2520.4 mentions "four regions" of West Virginia without naming them; the app teaches the Geological Survey's physical provinces and the nine travel regions instead.
- Grade 3 social studies has no unit for government (SS.3.2), world maps (SS.3.13, SS.3.14) or world explorers (SS.3.19, SS.3.21): the other states' units for them name their own places.
- Grade 9 social studies is World Studies only; United States Studies, Civics, Economics and Geography aren't cited.
- Native content is light and needs partner review before it grows.
- No French subject for West Virginia yet.
