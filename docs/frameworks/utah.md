# Utah

## Framework

- **Id and slug:** `us-ut`, `utah`. Math, English language arts, science and social studies, Pre-K and Kindergarten to Grade 9 (no French: Utah has no statewide French course in these grades). Offered to families and in classroom mode.

## Standards

- **Source:** the Utah Core Standards, adopted by the Utah State Board of Education (USBE) and published at https://www.schools.utah.gov/curr: mathematics (Kindergarten to Grade 8, and Secondary Mathematics I for Grade 9), English language arts (May 2023), science (SEEd, Utah Science with Engineering Education, June 2023 edition) and social studies (Kindergarten to Grade 6 adopted December 2022; Grades 7 to 12 for Utah Studies, United States History I and World Geography).
- **Citations** are `"CODES · text"` (`src/content/utah/cite.ts`): math `4.NBT.5`, Grade 9 `A.CED.1`; English language arts `4.R.5`, `4.W.2`, `4.SL.1`, with the Grades 7 and 8 band `7-8.R.5` and Grade 9 citing the Grades 9-10 band `9-10.R.5`; science `4.2.1`, Grade 9 `BIO.1.2` and `ESS.2.4`; social studies `4.3.2`, Grade 7 `UT.2.1`, Grade 8 `USI.3.4`, Grade 9 `WG.1.2`.
- `src/content/utah/contract.ts` checks every code against `docs/research/utah/outcomes.json` (940 standards), which `python3 -I gradelings-research/utah/build_outcomes.py` rebuilds from `gradelings-research/utah/source/`. Sources and dates: `gradelings-research/utah/README.md`.

## Content

- **Math and English language arts** follow Michigan's (and so California's) placement, because Utah keeps the Common Core's grades: BC units shared with Utah codes, and other frameworks' units adopted. Grade 9 is Secondary Mathematics I, Utah's integrated first high school course.
- **Science** follows SEEd's own grade placement: Earth's features, fossils and rock layers, structure and function, energy and waves, and the sun and stars in 4; Earth's systems and hazards, matter and ecosystems in 5; space, molecules and heat, weather, climate and ecosystems in 6; forces, Earth's surface and history, cells, heredity and evolution in 7; atoms and reactions, energy, waves, photosynthesis and resources in 8; Biology and Earth and Space Science in 9. Borrowed units that name another state's places are filtered `ut-` copies with Utah examples (`localCopy`, `units/copies-g*.ts`): the Great Salt Lake, the Wasatch Fault, Utah's canyons, dark-sky parks and snowpack.
- **Social studies** follows the Utah Core: family and community history, maps and needs and wants (K to 2); government, the US and Utah constitutions and communities (3); **Utah studies (4, Utah's own units)**; United States history to Reconstruction (5); world history (6); **Utah Studies (7, Utah's own units)**; United States History I (8); World Geography (9). Grade 3 civics and the Grade 7 economy unit are `ut-` copies with Utah examples.
- **Utah's own units** (`ut-` ids, `units/social-g4.ts`, `units/social-g7.ts`) are hand-written banks of 24 or more items plus a timeline unit per grade. Lessons for own units, copies and units taught in a different grade from the original are in `src/content/utah/lessons/<grade>.ts`.
- **Native content rules:** Utah's Tribal nations (Goshute, Navajo, Paiute, Shoshone and Ute) are written about as living, sovereign communities, in the present tense, never as one people, and with nothing sacred or ceremonial. The Fremont and Ancestral Puebloan cultures are told from archaeology. Conflicts the standards name (the Utah War, the Mountain Meadows Massacre, the Bear River Massacre, the Black Hawk War) are named plainly, without graphic detail. Other states' Tribal units are never borrowed (`utah.test.ts`).

## Report card

- Utah has no statewide report card or grading scale: each school district or charter school chooses its own, and many elementary schools use standards-based report cards. So Utah uses the four practice steps (Beginning, Approaching, Meeting, Exceeding).
- **State tests:** RISE (Readiness, Improvement, Success and Empowerment) in English language arts and math in grades 3 to 10, science in grades 4 to 10 and writing in grades 5 and 8; computer adaptive and not timed; four levels, Below Proficient, Approaching Proficient, Proficient and Highly Proficient, on a separate Individual Student Report. Acadience Reading and Acadience Math checks in the early grades, three times a year.

- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), each citing a standard for four-year-olds in the Utah Core State Standards for Early Learning, Ages 3 to 5 (`Math 4.1.4`, `P4.R.2.a`, `Sci 3-4.1.1`, `SS 4.7.2`, `LLP 4.5.2`; Utah State Board of Education) (`src/content/utah/pk.ts`), checked against `docs/research/utah/prek/outcomes.json` (sources in `source/`, `fetch.sh`, `build_outcomes.py` in gradelings-research). Practice steps only.
## Parent guides

- `src/content/utah/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, **Mathematical Practices** (`/guides/utah/math-practices/`, the eight Standards for Mathematical Practice printed in every grade, `1.MP.1` and so on) and **RISE tests** (`/guides/utah/rise-tests/`, from the USBE family guides of June 2026). No French guide.

## Schools

- `src/content/utah/schools.ts` states our commitments under the Utah Student Data Protection Act (Utah Code Title 53E, Chapter 9, Part 3; section 53E-9-309 covers third-party contractors) and FERPA: use only to provide the service, no sale, no targeted advertising, no profile beyond the service, collecting only what is needed, sharing only with the school and contractually bound providers, reasonable security, and deletion when the school asks.
- Before signing with a district, confirm whether it wants a signed Utah Student Data Privacy Agreement (many Utah districts use the shared state template) and what it requires for data deletion and breach notice.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit, as in the other states; the Standards for Mathematical Practice are a guide, not units.
- Science standards with no unit: 7.2.3, 7.2.4, 7.4.2, 8.1.7, 8.3.3, 8.4.4 (rising global temperatures); Grade 9 BIO.2.2, BIO.2.4, BIO.3.5, BIO.4.5, ESS.1.1, ESS.1.4, ESS.2.6, ESS.3.1, ESS.3.2, ESS.3.4 to ESS.3.6.
- Social studies standards not cited yet: 2.1.4, 2.2.6; 3.3.6, 3.3.7, 3.4.4; 4.4.4, 4.5.5, 4.5.6; 5.4.3, 5.4.4, 5.6.1, 5.6.4; USI.1.2, USI.2.3, USI.3.2, USI.6.4; WG.1.4, WG.2.3, WG.3.3, WG.3.6, WG.3.7, WG.5.5.
- The Tribal nations content in Grades 4 and 7 is light and needs review with Tribal partners before it grows.
