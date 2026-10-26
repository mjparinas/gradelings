# Mississippi

## Framework

- **Id and slug:** `us-ms`, `mississippi`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Mississippi has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- The Mississippi College- and Career-Readiness Standards (MS CCRS), adopted by the State Board of Education: math (2025; `4.NBT.5`, `1.MD.3a`; Grade 9 cites Algebra I, `A-SSE.1`), English language arts (2025; `RL.4.2`; Grade 9 cites English I, `RI.9.2`), science (2026, in effect from 2026-27; `L.4.1`, `P.4.6A`, `E.4.9B`; Grade 9 cites Biology, `BIO.5`, and Physical Science, `PHS.5`) and social studies (2022; `K.CI.1` to `3.H.2` in five strands, `4.MS.1` in Grade 4, `5.1` to `8.10` in Grades 5 to 8; Grade 9 cites Mississippi Studies, `MS.8`, and Introduction to Geography, `ITG.4`).
- Citations are `"CODES · text"` (`mss()` in `src/content/mississippi/cite.ts`), checked by `src/content/mississippi/contract.ts` against `docs/research/mississippi/outcomes.json`. Sources are in `docs/research/mississippi/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/mississippi/README.md`.

## Content

- **Math and English language arts** follow each grade's standards (`src/content/mississippi/plan/`). **Science** follows Mississippi's own grade topics: living things and the sun (K), plants and the sky (1), animals, matter and Earth's materials (2), structures, traits, forces and the changing Earth (3), the human body and energy (4), ecosystems, matter, motion and space (5), cells, classification, forces and the solar system (6), matter and chemistry, cycles and climate (7), heredity, evolution, waves and Earth's history (8), and Biology and Physical Science (9). Science units built around California places are `ms-` copies with Mississippi examples (the state fossil whale and the petrified forest near Flora, hurricanes and storm surge on the Gulf Coast, the 1927 flood and the levees, Grand Gulf nuclear station, longleaf pine and fire, oysters in the Mississippi Sound, the Gulf dead zone); borrowed units that name another state's places are filtered `ms-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows each grade's theme in the 2022 standards: Citizenship at Home and School, with Mississippi's symbols (K); Citizenship at School (1); Citizenship in School and Community (2); Citizenship in Local Government, with the three branches at every level and how people change the land, live with disasters and get energy (3); **Mississippi Studies and Regions** (4: regions and resources, the Choctaw, Chickasaw and Natchez nations and statehood, cotton, slavery, the Civil War and Reconstruction, the Civil Rights Movement, music, writers and symbols, and a timeline, all Mississippi's own units); United States history to the Constitution (5); World Geography and Civics (6); Early World History (7); United States history from exploration to Reconstruction (8); and **Mississippi Studies** and Introduction to Geography (9: four Mississippi's own units, from the land and nations to modern Mississippi).
- Mississippi-only units (`ms-` ids, `bankUnit` in `own.ts`) are in `src/content/mississippi/units/`, each with a lesson in `src/content/mississippi/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside the United States and world history grades and a short list of national stories (`mississippi.test.ts`), and other states' Tribal units are never borrowed.
- **Native content:** the Choctaw, Chickasaw and Natchez nations are named as separate nations with their own languages and histories; the Mississippi Band of Choctaw Indians is described in the present tense as a self-governing nation; removal under the treaties of Dancing Rabbit Creek and Pontotoc Creek is told plainly and briefly; nothing sacred or ceremonial. Light, and needs partner review before it grows.
- **Civil rights:** Grade 4 and Grade 9 name Medgar Evers, Fannie Lou Hamer, James Meredith, Freedom Summer and the Voting Rights Act; Grade 9 also covers Emmett Till, the 1964 murders near Philadelphia, Mississippi, and organized resistance (the Citizens' Councils and the State Sovereignty Commission), in plain words without graphic detail.

## Report card

- Mississippi has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the Mississippi Academic Assessment Program (MAAP) in English language arts and math (grades 3 to 8), science (grades 5 and 8) and Algebra I, Biology and English II, reported in five levels (Level 1 Minimal, Level 2 Basic, Level 3 Passing, Level 4 Proficient, Level 5 Advanced). Schools get A to F grades. The Literacy-Based Promotion Act's 3rd grade reading requirement (with two retests and good-cause exemptions) is on the MAAP guide and the report card page.

## Parent guides

- `src/content/mississippi/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/mississippi/math-practices/`) and the MAAP tests (`/guides/mississippi/maap-tests/`; dates point to the Department). No French guide.

## Schools

- **Mississippi.** `/privacy/` (`src/content/mississippi/schools.ts`) says Mississippi has no student online privacy law of its own for technology providers, so our commitments apply under the school's agreement and FERPA and COPPA: no targeted advertising, no sale or rental, no profiles beyond the school's purposes, sharing only as the school allows, a security program, deletion when the school asks, and notice to the school without unreasonable delay after a breach so it can notify families under Mississippi's breach notification law (Miss. Code 75-24-29).

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 1 science has no unit for L.1.3B (how pollinators and plants depend on each other): the units that teach it are written for older children, and their prompts are too long for Grade 1.
- Grade 9 science covers Biology and Physical Science; not every objective is cited.
- Native content is light and needs partner review before it grows.
- Grade 9 social studies follows Mississippi Studies and Introduction to Geography; the other high school courses (World History, US History, US Government, Economics) aren't cited.
- The Literacy-Based Promotion Act and the breach notification statute could not be downloaded from the Legislature's site; the guides follow MDE's MAAP page.
