# Montana

## Framework

- **Id and slug:** `us-mt`, `montana`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Montana's world languages standards aren't a subject the app follows yet). Offered to families and in classroom mode.

## Standards

- The Montana Content Standards, adopted by the Board of Public Education (ARM Title 10, Chapter 53): mathematics (2026 edition, adopted 2025, in schools from July 1, 2026; `MT.4.NBT.1`, parts `MT.4.NF.3.a`; Grade 9 cites the high school Core and Plus standards, `MT.HS.CORE.ALG.LIN.2`); English language arts and literacy (2011, in schools until June 30, 2027; `RL.4.2`, parts `L.4.1.a`; Grade 9 cites the 9-10 band); science (2016; NGSS performance expectation codes, `4-PS3-2`, a subset with no ETS standards); and social studies (2021; `SS.CG.4.4`, `SS.E.2.1`, `SS.G.6-8.2`, `SS.H.9-12.10`).
- The codes are the ones the Office of Public Instruction's CASE standards server carries (`humanCodingScheme`); the printed science and social studies documents have none. Citations are `"CODES · text"` (`mtcs()` in `src/content/montana/cite.ts`), checked by `src/content/montana/contract.ts` against `docs/research/montana/outcomes.json`. Sources are in `docs/research/montana/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/montana/README.md`.
- **2027 English language arts standards:** adopted September 2025, in schools from July 1, 2027. They are committed in `source/` (`case-ela-2027.json`) but not cited yet; switch the language plan to them for the 2027-28 school year.

## Content

- **Math, English language arts and science** follow Connecticut's placement (and so California's), with Montana's codes in place of the Common Core's and the NGSS's (`src/content/montana/plan/`). Math codes were mapped through the standards' Appendix A (Montana to Common Core); Grade 9 was mapped by hand, and the California units for multi-step equations, linear inequalities and absolute value equations are left out because Montana's high school standards have none. Science units that cite only engineering design (ETS) standards are left out, and design units that also practice a science standard cite that standard. Where Montana teaches a topic with local places, Montana's own science units are copies of other states' units with Montana examples: ponderosa forests and prairie, Flathead Lake and the Missouri and Yellowstone rivers, the Rockies and the Continental Divide, Egg Mountain's Maiasaura and Hell Creek's T. rex, chinook winds, the 1959 Hebgen Lake earthquake, wildfire, Fort Peck Dam, Butte copper, coal, Bakken oil and plains wind, and Glacial Lake Missoula.
- **Social studies** follows the 2021 standards grade by grade, with the Tribal Nations of Montana in every grade from 2 (Indian Education for All): goods made in Montana (K), Montana on the map (1), the twelve Tribal Nations and seven reservations (2), Nations by their own names and points of view, local and Tribal government, symbols of nations and the Americas (3), **Montana studies** (4: the Tribal Nations and their histories, governing Montana and tribal sovereignty, land and work, history and a timeline), the United States with treaties and sovereignty and money and interest (5), world regions (6, 7), Montana's story from contact to the 1972 constitution with US history to Reconstruction (8) and civics and government, with the foundations of tribal sovereignty in Montana (9).
- Montana-only units (`mt-` ids, `bankUnit` in `own.ts`, `timelineUnit` and `copyOf` in `units/kit.ts`) are in `src/content/montana/units/`, each with a lesson in `src/content/montana/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside social studies Grades 5 to 9, and other states' Tribal units are never borrowed (`montana.test.ts`).
- **Native content:** written from the OPI's Essential Understandings Regarding Montana Indians: each Nation has its own history, language and government; present tense, living communities; Nations named by their own names where known (Apsáalooke, Nakoda, A'aninin, Ksanka, Séliš, Qlispé, Anishinaabe, Nehiyawak, Niitsitapi); treaties, allotment, boarding schools and the Marias Massacre stated plainly; nothing sacred or ceremonial. Needs review by Montana Tribal education partners before it grows.

## Report card

- Montana has no statewide report-card scale; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests are MAST (Montana Aligned to Standards Through-Year: English language arts and math in grades 3 to 8, short testlets through the year; Novice, Nearing Proficient, Proficient and Advanced; first full year 2024-25), the Montana Science Assessment (grades 5 and 8) and the ACT (grade 11), with alternate assessments (MSAA, AMSA).

## Parent guides

- `src/content/montana/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the seven Montana Mathematical Practices (`/guides/montana/math-practices/`, including 7, Culturally Connect) and the state tests (`/guides/montana/mast-tests/`; dates point to the OPI). No French guide.

## Schools

- **Montana.** `/privacy/` (`src/content/montana/schools.ts`) states our commitments under the Montana Pupil Online Personal Information Protection Act, MCA 20-7-1323 to 20-7-1326: no targeted advertising, no profiles except for school purposes, no selling or renting, disclosure only as the act allows, reasonable security, and deletion when the school asks. The statute pages couldn't be downloaded (bot check), so confirm the wording and the district's contract before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit; the 2027 standards aren't cited yet.
- Math: Montana's 2026 standards are newer than the units placed for them (mapped through Appendix A); the high school Plus standards beyond polynomials and data have no unit.
- Science: no engineering design units, since Montana has no ETS standards; the NGSS expectations Montana left out have no unit.
- Social studies Grades 6 and 7 use other states' world regions units with Montana codes; SS.CG.6-8.3 (Indigenous contributions to US founding documents) and SS.CG.6-8.7 have no unit.
- Native content needs partner review before it grows.
- No French subject for Montana yet.
