# North Dakota

## Framework

- **Id and slug:** `us-nd`, `north-dakota`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: North Dakota has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- North Dakota's content standards, published by the Department of Public Instruction on its CASE server: math (2023; `4.NO.NBT.1`; Grade 9 cites the 9-10 band, `9-10.AR.9`), English language arts (2023; `4.R.3`; Grade 9 cites `9-10.R.4`), science (2019, built on the NGSS; `4-PS3-2`, engineering `3-5-ET1-1`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-1` in Grade 9) and social studies (2019, revised 2023; `H.3_5.10`; Grades 6 to 9 cite the 6-12 benchmarks, `ND.6_12.4.1`, `US.6_12.1-6.E2.3`).
- Citations are `"CODES · text"` (`nds()` in `src/content/north-dakota/cite.ts`), checked by `src/content/north-dakota/contract.ts` against `docs/research/north-dakota/outcomes.json`. Sources are in `gradelings-research/north-dakota/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/north-dakota/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), with each Common Core code carried to North Dakota's 2023 code through the Department's crosswalks (`src/content/north-dakota/plan/`). Science units built around California places are `nd-` copies with North Dakota examples (prairie potholes, the Badlands, the Missouri and Red rivers, Lake Sakakawea, Devils Lake, Triceratops and petrified wood, blizzards and spring floods, Bakken oil, lignite, wind and the Garrison Dam, the northern lights, piping plovers); borrowed units that name another state's places are filtered `nd-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the Department's grade themes: my family, with the flag and North Dakota's symbols (K); my school, with North Dakota then and now (1); my community, with North Dakota's cities, towns, farms and reservations (2); city government and the Midwest (3); **North Dakota studies** (4: the land, the tribal nations and the Essential Understandings, explorers and the fur trade, homesteaders and railroads, statehood, governing North Dakota, the economy, symbols and people, and a timeline, all North Dakota's own units); explorers including La Vérendrye, the colonies, the Revolution and the Constitution (5); world history to the Renaissance (6); world geography (7); **North Dakota studies** again (8: land and people, tribal nations and federal policy, government and the Nonpartisan League, the economy, settlers to today) with United States history to Reconstruction; and government, civics and personal finance (9: federal, state, tribal and local government, and personal finance, North Dakota's own units).
- North Dakota-only units (`nd-` ids, `bankUnit` in `own.ts`, `timelineUnit` in `units/kit.ts`) are in `src/content/north-dakota/units/`, each with a lesson in `src/content/north-dakota/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside its own units, the history and civics grades (social 5, 8 and 9) and the exemptions listed in `contract.ts`, and other states' Tribal units are never borrowed (both checked by `src/content/contract.test.ts`).
- **Tribal content:** the five tribal nations that share their homelands with North Dakota (the Mandan, Hidatsa and Arikara Nation; the Spirit Lake Nation; the Standing Rock Sioux Tribe; the Turtle Mountain Band of Chippewa; the Sisseton-Wahpeton Oyate) are named in the present tense as sovereign, living nations; federal policy (reservations, allotment, boarding schools, termination, the flooding of Fort Berthold) is told plainly; the North Dakota Native American Essential Understandings are cited; nothing sacred or ceremonial. Needs review by the nations' educators before it grows.

## Report card

- North Dakota has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the ND A+ Summative in English language arts and math (grades 3 to 8 and 10) and science (grades 4, 8 and 10), first aligned to the 2023 standards in 2025, and the ACT or WorkKeys in grade 11. A civics test from the 100 citizenship questions (at least 70 right) is required to graduate (NDCC 15.1-21-27), and can be taken from grade 7.

## Parent guides

- `src/content/north-dakota/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the three Math Attributes (`/guides/north-dakota/math-attributes/`) and state tests (`/guides/north-dakota/state-tests/`; dates and score scales point to the Department). No French guide.

## Schools

- **N.D. Cent. Code § 15.1-07-25.3:** each school board adopts a student data policy, approves sharing student data outside the district and keeps a list of the entities it shares with. `/privacy/` (`src/content/north-dakota/schools.ts`) states that we follow the district's policy and agreement, help the school list us, use data only to provide the service and never for advertising, delete on request and give breach notice, with our FERPA and COPPA commitments. Confirm a district's own data agreement terms before signing.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- The Math Attributes (`K-2.MA.P` and so on) aren't cited by units.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- High school United States and world history eras after those taught in Grades 5 to 8 aren't cited; Grade 9 is government, civics and personal finance.
- The Department is drafting new social studies standards (first draft April 2026, `source/social-draft-2026-04-24.pdf`); the codes will change when they are adopted.
- Tribal content needs review by the tribal nations' educators before it grows.
