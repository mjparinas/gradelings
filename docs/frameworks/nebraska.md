# Nebraska

## Framework

- **Id and slug:** `us-ne`, `nebraska`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Nebraska has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- Nebraska's College and Career Ready Standards, approved by the Nebraska State Board of Education: mathematics (September 2, 2022; `MA.4.N.2.b`, strands Number, Ratios and Proportions in Grades 6 and 7 only, Algebra, Geometry and Data; Grade 9 cites the high school standards, `MA.HS.A.2.c`), English language arts (September 2, 2021; `LA.4.RP.1`, `LA.4.RI.6`, `LA.4.V.1.b`, `LA.4.W.1.c`; Grade 9 cites the Grades 9-10 band, coded with a 10, `LA.10.RI.2`), science (September 6, 2024; `SC.4.4.2.b`, high school `SC.HS.1.1.a`) and social studies (November 8, 2019, kept in place after the 2026 review; `SS 4.1.1.c` with a space, high school `SS HS.1.1.b`).
- These are Nebraska's own codes, not the Common Core or the NGSS codes, and Nebraska places some skills in other grades (coins and time to the hour in Kindergarten, probability in Grade 6, angle relationships in Grade 7, functions in high school).
- Citations are `"CODES · text"` (`nes()` in `src/content/nebraska/cite.ts`), checked by `src/content/nebraska/contract.ts` against `docs/research/nebraska/outcomes.json`. Sources are in `gradelings-research/nebraska/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/nebraska/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's) where Nebraska teaches the same skill in the same grade, moved to Nebraska's codes (`src/content/nebraska/plan/`); units with no Nebraska indicator in their grade are left out. Science units built around California places are `neb-` copies with Nebraska examples (the Sandhills and Rainwater Basin, the Platte, Niobrara and Missouri Rivers, Chimney Rock and Scotts Bluff, Niobrara chalk fossils, tornadoes, blizzards and the 2019 floods, wind farms, corn ethanol and Kingsley Dam, the Ogallala Aquifer); borrowed units that name another state's places are filtered `neb-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows each grade's theme: myself and others with the flag and Nebraska's symbols (K); families, and local government in Lincoln and the counties (1); neighborhoods with symbols, difference makers, journeys and trading (2); communities near and far with the people who moved to Nebraska, and money and voting (3); **Nebraska studies** (4: the land, first peoples, the trails and statehood, how Nebraska grew, Nebraskans who stood up for fairness, the Unicameral, a timeline and the U.S. regions, all Nebraska's own units); U.S. studies to the Constitution with the Eastern Woodland peoples and explorers on the Plains (5); World Studies I, the ancient world (6); World Studies II, post-classical societies and world regions (7, adopted from California's Grade 7 and New York's units); U.S. history from the Constitution through the Gilded Age with Nebraska and the nation (8); and high school civics and economics with governing Nebraska (9).
- Nebraska-only units (`neb-` ids, `bankUnit` in `own.ts`) are in `src/content/nebraska/units/`, each with a lesson in `src/content/nebraska/lessons/`. The prefix is `neb-`, not `ne-`, because BC already has an `ne-pas` unit. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`; the Missouri River and the Kansas–Nebraska Act are allowed) outside United States history and civics, and other states' Tribal units are never borrowed (`nebraska.test.ts`).
- **Native content:** the Omaha, Ponca, Pawnee, Otoe, Lakota and other Plains nations, and the four nations with reservations in Nebraska today (the Omaha Tribe, the Ponca Tribe of Nebraska, the Santee Sioux Nation and the Winnebago Tribe), are named in the present tense as living nations with their own governments; removal, Standing Bear's case and broken treaties are told plainly and briefly; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- Nebraska has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the Nebraska Student-Centered Assessment System (NSCAS General) in English language arts and math (grades 3 to 8) and science (grades 5 and 8), with the ACT in 11th grade. Results come in three levels, Developing, On Track and Advanced, with school results on the Nebraska Education Profile in the fall. The through-year tests have ended; NSCAS is one spring test (2025-26 window March 23 to May 1, 2026), and the 2024 science standards are first tested in spring 2026.
- The Nebraska Reading Improvement Act (Neb. Rev. Stat. 79-2,601 to 79-2,607) is on the report card page: reading checks three times a year from Kindergarten to Grade 3, the family told within 15 working days, an individualized reading improvement plan and summer reading.

## Parent guides

- `src/content/nebraska/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the five Nebraska Mathematical Processes (`/guides/nebraska/math-processes/`) and state tests (`/guides/nebraska/state-tests/`; dates point to the Nebraska Department of Education). No French guide.

## Schools

- **Nebraska.** `/privacy/` (`src/content/nebraska/schools.ts`) states our commitments under the Student Online Personal Protection Act (Neb. Rev. Stat. 79-2,153 to 79-2,155, LB 512, 2017): using student information only for school purposes, no targeted advertising, no profiling except for school purposes, no selling or renting, sharing only with the school and service providers bound by contract to the same rules, reasonable security, and deleting a student's information within 30 days when the school asks. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school indicator is cited.
- Native content is light and needs partner review before it grows.
- High school U.S. history, world history and geography are not taught in Grade 9; Grade 9 social studies is civics and economics.
- Math units for skills Nebraska teaches in a different grade were left out rather than moved.
