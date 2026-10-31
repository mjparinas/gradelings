# New Mexico

## Framework

- **Id and slug:** `us-nm`, `new-mexico`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: New Mexico has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- The New Mexico content standards, adopted by rule in title 6, chapter 29 of the New Mexico Administrative Code: math (the Common Core, 2010, 6.29.14 NMAC; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010, 6.29.13 NMAC; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the New Mexico STEM Ready! Science Standards, 2018, 6.29.10 NMAC: the NGSS, `4-PS3-2`, plus six New Mexico expectations such as `MS-ESS3-3 NM`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (2022, 6.29.11 NMAC; `4.12`; Grade 9 cites the high school Civics and Economics strands, `9-12.Civ.29` and `9-12.Econ.47`).
- Citations are `"CODES · text"` (`nms()` in `src/content/new-mexico/cite.ts`), checked by `src/content/new-mexico/contract.ts` against `docs/research/new-mexico/outcomes.json`. Sources are in `gradelings-research/new-mexico/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/new-mexico/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/new-mexico/plan/`). Science units built around California places are `nm-` copies with New Mexico examples (the Rio Grande and its bosque, White Sands, Carlsbad Caverns, Ghost Ranch and Coelophysis, the monsoon, acequias, the Permian Basin, potash and copper mines, the Very Large Array, the 2023 annular eclipse, the Rio Grande silvery minnow and the Mexican gray wolf); borrowed units that name another state's places are filtered `nm-` copies (`localCopy`, `units/copies-g*.ts`). The New Mexico expectations `MS-ESS3-3 NM` (Grade 7 resources) and `HS-LS2-7 NM` (Grade 9 ecosystems) are cited.
- **Social studies** follows each grade's theme in the 2022 standards: community with New Mexico's flag and symbols (K); New Mexico then and now (1); national identity, symbols and government, difference makers, journeys to New Mexico and trade (2); global immigration and migration, including the Long Walk and the return home, and money and voting (3); **New Mexico history and geography** (4: the land and four provinces, the peoples of New Mexico, Land of Enchantment, resources and trade, standing up for fairness, governing New Mexico and a timeline, all New Mexico's own units); United States history with the Eastern Woodland peoples and the Spanish explorers of the Southwest (5); world history to about 1300 (6); **New Mexico history** (7: New Mexico today, the earliest New Mexicans, ancestral peoples and their descendants, Spanish colonial New Mexico, New Mexico under Mexico, the US territory and a timeline); United States history to 1920 with New Mexico and the nation (8); and Civics and Economics with governing New Mexico and personal finance (9).
- New Mexico-only units (`nm-` ids, `bankUnit` in `own.ts`) are in `src/content/new-mexico/units/`, each with a lesson in `src/content/new-mexico/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`new-mexico.test.ts`). Lessons for borrowed units are shared by grade and id with other states that sort after New Mexico, so a New Mexico lesson on a borrowed unit keeps the existing text.
- **Native content:** the 19 Pueblos, the Navajo Nation (Diné) and the Apache nations are named in the present tense as living, sovereign nations; Po'pay and the Pueblo Revolt, Maria Martinez, Miguel Trujillo, the Navajo Code Talkers, the Long Walk and the Treaty of 1868, and boarding schools are told plainly and briefly; Ancestral Puebloans are named as the ancestors of today's Pueblo people; nothing sacred or ceremonial (no kivas, dances or feast-day details; the Zia sun symbol is named as belonging to Zia Pueblo). Light, and needs partner review before it grows.

## Report card

- New Mexico has no statewide report card; each district and charter school chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: NM-MSSA in language arts and math (grades 3 to 8, with Lexile and Quantile measures), NM-ASR in science (grades 5, 8 and 11), each reported in four levels (Novice, Nearing Proficiency, Proficient, Advanced), and the SAT in grade 11. New Mexico screens 1st graders for signs of dyslexia.

## Parent guides

- `src/content/new-mexico/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/new-mexico/math-practices/`) and state tests (`/guides/new-mexico/state-tests/`; dates point to the Department). No French guide.

## Schools

- **New Mexico.** New Mexico has no student online privacy law for school service providers like those in other states, so `/privacy/` (`src/content/new-mexico/schools.ts`) states our FERPA and COPPA commitments (student information used only for the school's purposes, no advertising, no sale, deletion when the school asks) and that we would give notice of a breach of personal information under New Mexico's Data Breach Notification Act (2017). Confirm a district's own data agreement terms before signing.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- The New Mexico science expectations about scientists and society (`1-SS-1 NM`, `5-SS-1 NM`) and New Mexico's role in nuclear science and decisions about a New Mexico challenge (`HS-SS-1 NM`, `HS-SS-2 NM`) have no unit yet.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- Native content is light and needs partner review before it grows.
- High school New Mexico History, US History, World History, Geography and Ethnic, Cultural and Identity Studies strands aren't cited; Grade 9 is Civics and Economics.
