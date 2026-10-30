# Nevada

## Framework

- **Id and slug:** `us-nv`, `nevada`. Pre-K and Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Nevada has no statewide French standards the app follows). Offered to families and in classroom mode.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), cited by the Nevada Pre-Kindergarten Standards' indicators (`M.NQ.PK8`) (`src/content/nevada/pk.ts`), checked against `docs/research/nevada/prek/outcomes.json` (sources in `source/`, `fetch.sh`, `build_outcomes.py`). Practice steps only.

## Standards

- The Nevada Academic Content Standards (NVACS), adopted by the State Board of Education: math (the Common Core, 2010; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the NGSS, 2014; `4-PS3-2`, middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (revised 2018; `SS.4.11`; Grades 6-8 courses `SS.6-8.EWC.*`, `SS.6-8.WGGS.*` and `SS.6-8.EUSH.*`; Grade 9 cites Civics and Economics, `SS.9-12.CE.27`, and financial literacy, `SS.9-12.FL.4`).
- Citations are `"CODES · text"` (`nvs()` in `src/content/nevada/cite.ts`), checked by `src/content/nevada/contract.ts` against `docs/research/nevada/outcomes.json`. Sources are in `docs/research/nevada/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/nevada/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/nevada/plan/`). Science units built around California places are `nv-` copies with Nevada examples (Lake Mead, Lake Tahoe, the Truckee and Humboldt Rivers, Great Basin National Park, ichthyosaur fossils, Hoover Dam, solar and geothermal power, gold and lithium, Ash Meadows, the 2023 eclipse); borrowed units that name another state's places are filtered `nv-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows each grade's theme in the 2018 standards: Building Community with the flag and Nevada's symbols (K); the community we live in and what local government does (1); national identity, symbols, landmarks and the President, with difference makers, family journeys and making and trading (2); Movement Around Our World, with why people migrate and the newcomers who shaped Nevada, and money and voting (3); **Nevada Past and Present** (4: the land, the Paiute, Shoshone and Washoe peoples, the Comstock Lode and statehood, how Nevada grew, Nevadans who stood up for fairness, governing Nevada and a timeline, all Nevada's own units); the U.S., Creating a New Nation, with the Eastern Woodland peoples and explorers of the Great Basin (5); Early World Civilizations (6), World Geography and Global Studies with Nevada in the world (7) and Early U.S. History with Nevada and the nation (8), in the order the standards list them; and Civics and Economics with governing Nevada and financial literacy (9).
- Nevada-only units (`nv-` ids, `bankUnit` in `own.ts`) are in `src/content/nevada/units/`, each with a lesson in `src/content/nevada/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`nevada.test.ts`).
- **Native content:** the Northern Paiute, Southern Paiute, Western Shoshone and Washoe peoples are named in the present tense as living nations with their own governments; Sarah Winnemucca and Dat So La Lee are named; the Stewart Indian School and the effects of westward expansion are told plainly and briefly; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- Nevada has no statewide report card; each district and charter school chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: Smarter Balanced in English language arts and math (grades 3 to 8), the Nevada Science Assessment (grades 5, 8 and high school), each reported in four levels (Level 1 Minimal Understanding, Level 2 Partial Understanding, Level 3 Proficient, Level 4 Advanced), and the ACT in grade 11. The Nevada Report Card website gives school star ratings (the Nevada School Performance Framework). The Read by Grade 3 law and its 3rd grade retention rule from July 1, 2028 (NRS 392.780, with good-cause exemptions under NRS 392.785) are on the state tests guide and the report card page.

## Parent guides

- `src/content/nevada/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, the eight Standards for Mathematical Practice (`/guides/nevada/math-practices/`) and state tests (`/guides/nevada/state-tests/`; dates point to the Department). No French guide.

## Schools

- **Nevada.** `/privacy/` (`src/content/nevada/schools.ts`) states our commitments under NRS 388.281 to 388.296 (school service providers): saying what we collect and how it is used, using it only for the classroom and the school's purposes, no targeted advertising, no sale, no profiles beyond instruction, contracts that bind our service providers to the same rules, a security plan, telling the school without delay about a breach, and deleting a student's information within 30 days when the school asks. The law also asks providers to let parents and adult students review and correct a student's information (NRS 388.291); confirm with the school how that request reaches us before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- Native content is light and needs partner review before it grows.
- The Grades 6-8 social studies courses are placed in the order the standards list them; districts may teach them in another order.
- High school U.S. History and World History standards aren't cited; Grade 9 is Civics and Economics.
