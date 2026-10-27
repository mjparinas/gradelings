# South Dakota

## Framework

- **Id and slug:** `us-sd`, `south-dakota`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: South Dakota has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- South Dakota's standards, adopted by the Board of Education Standards: the South Dakota State Standards for Mathematics (2018; `4.NBT.1`; Grade 9 cites the high school courses, `A.SSE.1`), the English Language Arts Standards (April 2025; `4.RL.2`; Grade 9 cites the 9-10 band, `9-10.RL.1`), the Science Standards (April 2024; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and the Social Studies Standards (April 2023; `4.SS.11`; Grade 9 cites United States Government/American Civics, `9-12.C.17`).
- The 2026 math standards (adopted May 4, 2026) are committed in `source/` but not cited until districts switch to them; when they do, re-cite math from `math-2026.pdf`.
- Citations are `"CODES · text"` (`sds()` in `src/content/south-dakota/cite.ts`), checked by `src/content/south-dakota/contract.ts` against `docs/research/south-dakota/outcomes.json`. Sources are in `docs/research/south-dakota/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/south-dakota/README.md`.

## Content

- **Math, English language arts and science** follow California's placement, because South Dakota keeps the Common Core's math and English language arts codes and the NGSS science codes (`src/content/south-dakota/plan/`). Science units built around California places are `sd-` copies with South Dakota examples (the prairie and prairie potholes, the Black Hills, the Badlands and their fossils, the Mammoth Site, the Missouri River, Lake Oahe and its dams, blizzards, tornadoes and spring floods, wind farms and ethanol, Black Hills gold and granite, bison in Custer State Park, black-footed ferrets, leafy spurge and eastern red cedar); borrowed units that name another state's places are filtered `sd-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the standards' grade themes, which move through world and American history in order (see the research README). South Dakota's own units (`sd-` ids, `bankUnit` in `own.ts`) are in `src/content/south-dakota/units/social-*.ts`, each with a lesson in `src/content/south-dakota/lessons/`: our state and country (K); South Dakota's flag, motto, Capitol and cities, the first peoples of the plains, the ancient world and founding stories (1); the Middle Ages and the Renaissance, and a growing nation from Washington to Lincoln (2); South Dakota and the nation on the map (3); South Dakota's regions, and Lewis and Clark on the Missouri (4); Dakota Territory to statehood (5); peoples before contact and South Dakota's land and lakes (7); Dakota in the Gilded Age, and South Dakota in the Depression and World War II (8); and governing South Dakota (9).
- Borrowed units may not name another state's places (`OTHER_STATE` in `units/kit.ts`, `otherStates` in `contract.ts`) in kindergarten and Grade 6; the other social studies grades are American history and geography. Other states' Tribal units are never borrowed (`tribal` in `contract.ts`). Lessons for borrowed units taught in another grade are copied word for word from the unit's existing lesson.
- **Native content:** the Oceti Sakowin Oyate (the Dakota, Nakota and Lakota peoples), the Sahnish (Arikara), Mandan, Cheyenne and Crow are named as living Nations in the present tense; the nine Tribal Nations, their reservations, sovereign governments and courts are stated plainly; the Fort Laramie Treaty of 1868, the Agreement of 1877, the 1980 Supreme Court ruling, the Dawes Act, Wounded Knee, boarding schools, the Missouri River dams' flooding of Tribal land and the Lakota Code Talkers are told plainly and briefly; the Black Hills are described as deeply important to Lakota history and identity; nothing sacred or ceremonial. Needs partner review before it grows.

## Report card

- South Dakota has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the South Dakota ELA and Math Assessments (grades 3 to 8; a scale score and four achievement levels, Level 1 to Level 4), the South Dakota Science Assessment (grades 5 and 8) and the SD-ACT in grade 11.

## Parent guides

- `src/content/south-dakota/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/south-dakota/math-practices/`) and state tests (`/guides/south-dakota/state-tests/`; dates point to the Department). No French guide.

## Schools

- **SDCL 13-3-51.1 to 13-3-51.6** govern how the Department of Education protects students' personally identifiable information, and 13-3-51.2 requires parental consent before a student takes a survey on protected topics. South Dakota has no student online privacy law for operators, so `/privacy/` (`src/content/south-dakota/schools.ts`) gives South Dakota schools the same commitments as other states', no surveys on the protected topics, and breach notice under SDCL 22-40-19 to 22-40-26. Confirm a district's own data agreement terms before signing.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- The 2026 math standards aren't cited yet.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- High school US History, World History, World Geography and Economics aren't cited; Grade 9 is Civics.
- Grade 6 world geography (6.SS.3) has one borrowed unit.
- Native content needs partner review before it grows.
