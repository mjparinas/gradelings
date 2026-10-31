# Washington, DC

## Framework

- **Id and slug:** `us-dc`, `washington-dc`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: the District has no French standards the app follows). Offered to families and in classroom mode.
- **A district, not a state:** the framework sets `regionKind: "district"`, so copy that names the region says "district" (`regionKind` in `src/content/locale.ts`), a missing scale is "District-wide" (`scaleReach`), and `regionSummary` names it after the states ("..., N US states and Washington, DC") instead of counting it as one. US English, US dollars and COPPA consent apply as for every US framework.

## Standards

- Approved by the DC State Board of Education: math (the Common Core, 2010; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the Next Generation Science Standards, adopted December 2013; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (the DC Social Studies Standards, approved June 21, 2023 by resolution SR23-7 and used from 2024-25; numbered within each grade, `3.20`; Grade 9 cites World History and Geography I, `WH1.1`).
- Citations are `"CODES · text"` (`dcs()` in `src/content/washington-dc/cite.ts`), checked by `src/content/washington-dc/contract.ts` against `docs/research/washington-dc/outcomes.json`, which `python3 -I build_outcomes.py` rebuilds from the ASN copies and OSSE's social studies PDF in `gradelings-research/washington-dc/source/`. Record: `gradelings-research/washington-dc/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/washington-dc/plan/`). Science units built around California places are `dc-` copies with DC examples (Rock Creek Park and the Anacostia, Little Falls on the Potomac, the Tidal Basin and the cherry trees, the Capitalsaurus found in 1898, the 2011 earthquake, Blue Plains, the Hay's Spring amphipod, bald eagles back on the Anacostia, snakeheads, the Naval Observatory's discovery of Mars's moons in 1877, the 2024 partial eclipse); borrowed units that name another state's places are filtered `dc-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the course themes of the 2023 standards: me and my community, with Washington, DC as our city (K); our community, leaders, voting, symbols and DC's wards (1); people and places around the world: maps and artifacts, climates, food and water, Egypt, Kush, Mesopotamia and the Olmec, ancient China, Rome and the Americas, and kingdoms from 1200 to 1600 (2); **Washington, DC past and present** (3: DC on the map, the Nacotchtank, Piscataway and Pamunkey, building the capital, freedom and the Civil War with DC Emancipation Day, U Street, marches and go-go, who governs DC, and a timeline, all DC's own units); North America's first peoples and a new nation, with the first Americans, the arrival of Europeans and the three branches (4); the United States from expansion to the civil rights movement, with the Great Migration and voices for justice, including Bolling v. Sharpe (5); world geography, with maps and borders, the African diaspora and globalization (6); United States history to 1877, with the capital of a new nation (7); civics in action, with governing the District, DC as the capital of protest, and human rights (8); and World History and Geography I, with early humans and world heritage (9).
- DC-only units (`dc-` ids, `bankUnit` in `own.ts`) are in `src/content/washington-dc/units/`, each with a lesson in `src/content/washington-dc/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics (Grades 4, 5, 7 and 8) and two listed world geography units, and other states' Tribal units are never borrowed (`contract.ts`). Adopted units taught in a different grade from the original carry the lesson they already have, word for word. DC's own units name Maryland and Virginia, which gave the land for the capital.
- **Statehood** is taught as a debate: what Home Rule gives and what Congress keeps, what supporters want and what Congress has and hasn't passed, never which side to take.
- **Native content:** the Nacotchtank (Anacostan), Piscataway and Pamunkey peoples, whose homelands include the land around the District, in the present tense where it is about today: Pamunkey federal recognition (2015), Maryland's recognition of Piscataway groups (2012), the Pamunkey shad hatchery, place names such as Anacostia and Potomac. Nothing sacred or ceremonial. Needs partner review before it grows.

## Report card

- The District has no single report card; DCPS and each public charter school (each its own LEA) choose their own. The app uses the same four practice steps as the states (Beginning, Approaching, Meeting, Exceeding).
- Statewide tests: DC CAPE (the DC Comprehensive Assessments of Progress in Education, named in 2024 after PARCC ended): DC ELA and DC Math in grades 3 to 8 and the high school courses ELA I and II, Algebra I, Geometry and Algebra II; DC Science in grades 5 and 8 and high school biology. Scale scores from 650 to 850 and five performance levels (Level 4 met expectations, Level 5 exceeded); the MSAA is the alternate assessment.

## Parent guides

- `src/content/washington-dc/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/washington-dc/math-practices/`) and DC CAPE (`/guides/washington-dc/dc-cape-tests/`; dates point to OSSE). No French guide.

## Schools

- **Washington, DC.** `/privacy/` (`src/content/washington-dc/schools.ts`) states our commitments under D.C. Code §§ 38-831.01 to 38-831.06 (Protecting Students Digital Privacy): no targeted advertising, no selling, renting or trading, no profiling except for school purposes, disclosure only as the law allows (to the school and to service providers bound by contract), information under the control of the school or LEA, reasonable security and notice of unauthorized access, and deletion when the school or LEA asks. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Many social studies standards ask students to analyze sources, compare accounts or plan action; those have no unit, and not every content standard in a grade has one.
- Grade 9 social studies is World History and Geography I only; World History II, US History II, Government and Civics and DC History and Government (high school courses) are not taught.
- The high school DC CAPE courses (ELA I, Algebra I) depend on the student's course, so the Grade 9 note says "the courses it covers".
- Native content is light and needs partner review before it grows.
