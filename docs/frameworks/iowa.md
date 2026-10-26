# Iowa

## Framework

- **Id and slug:** `us-ia`, `iowa`. Kindergarten to Grade 9 in math, English language arts, science and social studies. There is no French, because Iowa has no statewide French standards the app follows. Offered to families and in classroom mode.

## Standards

- **The Iowa Academic Standards**, adopted by the State Board of Education and published by the Iowa Department of Education:
  - **Math** (April 2024, built on the Common Core). Codes carry the cluster letter, as in `4.NBT.A.1`. Grade 9 cites Algebra 1 with the course prefix, as in `A1.A-SSE.A.2`. Iowa moved some Common Core high school standards to Algebra 2, so the units for those are not used.
  - **English language arts** (June 2024, built on the Common Core). Codes look like `RL.4.2`; Grade 9 cites the 9-10 band, as in `RI.9-10.2`.
  - **Science** (May 2025, built on the NGSS). Middle school expectations are each placed in one grade and carry that grade in the code (`6-PS4-1`, `7-LS2-1`, `8-ESS2-5`). Grade 9 cites the high school expectations.
  - **Social studies** (January 2026). Codes are numbered within each grade, as in `SS.4.14`. Grade 9 cites the high school government, economics and financial literacy courses: `SS.9-12.Gov.13`, `SS.9-12.Econ.5` and `SS.9-12.FL.4`.
- **Citations** are `"CODES · text"` (`ias()` in `src/content/iowa/cite.ts`). `src/content/iowa/contract.ts` checks them against `docs/research/iowa/outcomes.json`.
- **Sources** are in `docs/research/iowa/source/`. `fetch.sh` downloads them again, and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. The full record is in `docs/research/iowa/README.md`.

## Content

- **Math and English language arts** follow Michigan's placement, and so California's, because Iowa teaches the same standards (`src/content/iowa/plan/`). Borrowed units that name another state's places are filtered `ia-` copies (`localCopy`, `units/copies-g*.ts`).
- **Science** follows the same placement in Kindergarten to Grade 5 and Grade 9. Grades 6 to 8 follow Iowa's own grade for each middle school expectation:
  - Grade 6: cells and body systems, the senses, heat and light, and Earth's surface and history.
  - Grade 7: forces, fields and energy, ecosystems, and the solar system.
  - Grade 8: atoms and reactions, heredity and selection, weather and climate, and human impact.
- **Iowa science copies:** units built around California places are `ia-` copies with Iowa examples. These include prairies and wetlands, the Mississippi and Missouri rivers, the Iowa Great Lakes, the Loess Hills, tornadoes and floods, wind power and ethanol, and the Devonian Fossil Gorge.
- **Social studies** follows each grade's theme in the 2026 standards. The rest of each grade uses general adopted units.

  | Grade | Theme | Iowa's own units |
  | --- | --- | --- |
  | K | Me and My Community | rules here and there |
  | 1 | Places Near and Far | Iowa places and festivals |
  | 2 | Our State | Iowa's Native nations, communities and what makes Iowa unique, who runs Iowa |
  | 3 | America's Early Story | the first nations and explorers of the Upper Mississippi |
  | 4 | Our New Nation | settling Iowa, immigrants to Iowa |
  | 5 | Our Changing Nation | railroads, industry and Iowa's equal-rights cases, borrowing, saving and taxes |
  | 6 | Ancient and Medieval World Studies | none |
  | 7 | Modern World Studies | Iowa in the world |
  | 8 | U.S. History and Civics | Iowa and the nation |
  | 9 | government, economics and financial literacy | governing Iowa, under the 1857 constitution |

- **Own units:** Iowa-only units (`ia-` ids, `bankUnit` in `own.ts`) are in `src/content/iowa/units/`. Each has a lesson in `src/content/iowa/lessons/`.
- **What `iowa.test.ts` checks:**
  - No borrowed unit names another state's places (`OTHER_STATE` in `units/kit.ts`). The exception is the US-history grades: 3, 4, 5, 8 and 9.
  - Other states' Tribal units are never borrowed.
  - Middle school science codes start with their grade.
- **Lessons on borrowed units are shared by grade and id.** A lesson for a borrowed unit that another state already teaches at that grade must use that state's text word for word, or that state's lock moves.
- **Native content:**
  - The Meskwaki Nation (the Sac and Fox Tribe of the Mississippi in Iowa, whose Settlement near Tama began in 1857) is named in the present tense as a living nation with its own government.
  - Other nations with homelands in Iowa (the Ioway, Sauk, Ho-Chunk, Dakota and Omaha) are named. Treaties and removal are told plainly and briefly.
  - Nothing sacred or ceremonial is included.
  - This content is light and needs partner review before it grows.

## Report card

- **Report card:** Iowa has no statewide report card; each district chooses its own. The app uses the same four practice steps as the other states: Beginning, Approaching, Meeting and Exceeding. Their names match the four achievement levels Iowa has proposed for its state test.
- **State test:** the state summative assessment, which replaced ISASP and was first given in spring 2026.
  - English language arts and math in grades 3 to 11.
  - Science in grades 5 and 8, and once in high school (grade 10 through 2025-26, then grade 11).
  - The proposed levels are Below, Approaching, Meeting and Exceeding. They replace Not Yet Proficient, Proficient and Advanced once the State Board approves them.
  - School results are in the Iowa School Performance Profiles.
- **Early reading** (Iowa Code 279.68), covered on the state tests guide and the report card page:
  - Schools screen reading in Kindergarten to Grade 3. A child who misses the benchmark on two screenings in a row is persistently at risk, gets intensive help, and parents get a letter.
  - Kindergarten to Grade 6 students who aren't reading proficiently get a personal reading plan.
  - A parent can ask for their child to repeat the grade.

## Parent guides

- **Source:** `src/content/iowa/guides.ts`, in US English.
- **Pages:**
  - the hub;
  - grade notes for Kindergarten to Grade 9;
  - the eight Standards for Mathematical Practice (`/guides/iowa/math-practices/`);
  - state tests (`/guides/iowa/state-tests/`).
- Test dates point to the Department.
- There is no French guide.

## Schools

- **Iowa.** `/privacy/` (`src/content/iowa/schools.ts`) states our commitments under Iowa Code 279.71, the student online personal information protection law:
  - no targeted advertising;
  - no profiles of a student except for the school's purposes;
  - no sale;
  - sharing only with service providers bound to the same rules;
  - reasonable security procedures;
  - deleting a student's information as soon as reasonably practicable when the school asks.
- FERPA and COPPA apply as everywhere.

## Known gaps

- Science expectations without a unit: `6-PS1-6`, `7-PS3-4`, `7-LS1-4`, `7-ESS2-4` and `8-LS4-1`.
- English language arts standards that need writing, speaking or fluency have no unit.
- Some social studies standards aren't cited yet, for example `SS.3.8`, `SS.3.20`, `SS.4.26` and `SS.6.9`, plus the Grade 8 financial literacy standards and the high school US and world history courses.
- Native content is light and needs partner review before it grows.
- The state test's four achievement levels are proposed, not yet approved. Check them once the State Board votes.
