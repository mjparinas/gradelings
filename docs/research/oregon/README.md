# Oregon research record

**Source:** the Oregon Department of Education (ODE), oregon.gov/ode, read 13 October 2026. Oregon is the second US state, after Washington, and comes before California. This folder is phase 1, the standards record. The framework, units and guides come later. Oregon reuses the US layer that Washington built: US English, US dollars and the consent rules.

| Subject | Standards | Edition | Cited as |
| --- | --- | --- | --- |
| Math | Oregon K–12 Mathematics Standards | Adopted 21 October 2021, version 2021.3 (the "new template" files) | Full code, `4.NBT.A.1`: grade, domain, cluster letter, number. Oregon renamed several Common Core domains: `NCC` Counting and Cardinality, `OA` Operations, `NBT` Base Ten, `NF` Fractions, `GM` Geometric Reasoning and Measurement, `DR` Data Reasoning, `AEE` Expressions and Equations, `AFN` Functions, `RP` Ratios, `NS` Number Systems and `NQ` Number and Quantity. High school is one set of 55 standards, not split by course, cited `HS.AEE.A.1` |
| English language arts | Oregon K–12 English Language Arts and Literacy Standards | Adopted 18 June 2026, version 2026.1, a revision of the 2019 (Common Core) standards. ODE gives no implementation year yet; "implementation guidance" is "coming soon" | `ELA.4.RL.3`. The strands are `RF` Reading Foundational Skills, `RL` Reading Literature, `RI` Reading Informational, `W` Writing, `L` Language and `SL` Speaking and Listening. Grade 9 uses the 9–10 band, cited `ELA.9-10.RI.4` (a hyphen, as ODE prints it) |
| Science | Oregon K–12 Science Standards | Adopted 16 June 2022, version 2022.1. They are NGSS-based, with Oregon changes (see below). ODE expects to adopt revised standards in spring 2029 (HB 3365, 2025, climate change) | Oregon's own dotted code, `4.ESS2.1`. Middle school is placed by grade (`6.LS1.1`, `7.PS1.1`, `8.PS2.1`), except engineering (`MS.ETS1.1`, a 6–8 band). High school is `HS.PS1.1`. K–5 engineering is per grade (`3.ETS1.1`), not NGSS's `K-2-ETS1` and `3-5-ETS1` bands |
| Social studies | Oregon K–12 Social Science Standards | Adopted June 2024, version 2024.1. Districts implement them from 2026–27. ODE expects the next revision in spring 2031 | Component code, `4.C.PI.1`: grade, domain (`C` civics, `G` geography, `E` economics, `H` history; high school also has `US` US history and `WR` world history), concept and number. Grades 6 and 7 are one band, cited `6/7.H.CP.9` with the slash |

The brief that started this record expected the 2019 ELA and 2021 social science standards. Both have been replaced: ELA by the 2026 standards and social science by the 2024 standards. This record uses the editions now on ODE's pages. The 2021 social science standards survive only in ODE's 2021–2024 crosswalk files.

Oregon's world language standards are not used. Oregon families get no French subject, as in Washington.

## Files

- `fetch.sh <cache>` downloads the official files into a cache folder. They are public and download without a login, so they are not committed. The files are the math workbook and PDF, the K–12 ELA PDF, the K–12 science PDF (standards only), the science crosswalk from 2014 to 2022, and the social science PDF. oregon.gov serves an error page to some clients that send no browser user agent, so the script sends one.
- `build_outcomes.py <cache>` parses them into `outcomes.json`: `{"<grade>/<subject>": [{idx, kind, content}]}` for Kindergarten (`k`) to Grade 9 and the subjects `math`, `language`, `science` and `social`. Run it with `python3 -I`. It needs `openpyxl`, `pypdf` and `pdfplumber`. Band standards are listed under every grade of the band:
  - social science `6/7` under Grades 6 and 7;
  - `MS.ETS1` under Grades 6 to 8;
  - high school math, science and social science, and ELA 9–10, under Grade 9.

  The script stops with an error when the sources disagree:
  - every math code in the workbook must also appear in the PDF;
  - every social science code printed in the PDF must have been read from its table.
- Each science entry also has `ngss`, the matching NGSS code (`4.ESS2.1` → `4-ESS2-1`, `6.LS1.1` → `MS-LS1-1`, `K.ETS1.1` → `K-2-ETS1-1`). This lets the Washington units that cite NGSS be matched to Oregon codes.
- `outcomes.json` holds 1 292 entries, or 1 244 distinct codes:

  | Subject | Entries | Distinct codes |
  | --- | --- | --- |
  | Math | 284 | 284 |
  | English language arts | 417 | 417 |
  | Science | 228 | 220 |
  | Social studies | 363 | 323 |

  An `oregon.test.ts` will check every `us-or` citation against it, as `washington.test.ts` does for Washington.

### Parsing notes

- **Math:** read from the workbook's "K12 text only" sheet (rows of type `Standard`).
  - The sheet has 284 standards: K 23, 1 22, 2 26, 3 25, 4 29, 5 26, 6 27, 7 23, 8 28 and HS 55.
  - Some numbers are skipped on purpose, where Oregon merged Common Core standards. For example, `6.AEE.A.4` is "Merge with 6.AEE.A.3" in the grade sheet and is not a standard.
- **ELA:** each entry is the main statement of a standard, not its lettered sub-items.
  - Placeholders are skipped: "(Begins in grade 3)", "(Not applicable to literature)" and "(Please see preceding grades…)".
  - The introduction explains the codes with "ELA.5.RL.1 = Content Area …" lines. The parser starts after them.
  - From Grade 6, Reading Foundational Skills has one standard, fluency (`ELA.6.RF.1`).
- **Science:** each entry is the performance expectation without its clarification statement and assessment boundary.
  - ODE's markers are dropped: `^` (climate change), `*` (engineering) and `†` (wording changed from NGSS).
  - The 2022.1 PDF prints a few codes untidily (`3-LS4-4`, `7.PS1.4.`, `6.LS1.3†`). The parser normalises them.
  - Use the PDF, not ODE's science workbook ("Website Version of OR Sci Stnds…xlsx"). The workbook still gives middle school as `MS.LS1.1` and lists Grade 1 engineering as `K.ETS1.*`.
- **Social studies:** read from the PDF's tables (Concept | Code | Standard | Examples) with pdfplumber, because the plain text interleaves the columns.
  - The examples column ("Examples include, but not limited to") and teacher notes are dropped.
  - ODE's codes are copied exactly, including oddities. For example, `4.G.GE.7` and `4.G.GE.8` sit under the concept "Human Environmental Interaction (G.HE)".

## How Oregon science differs from NGSS

180 of Oregon's 220 science codes match an NGSS performance expectation word for word, give or take punctuation. The rest differ in two ways:

- **Reworded:** 22 are reworded. ODE marks most of them `†`. The main ones are:
  - `2.ESS1.1`, `5.ESS1.1` and `5.ESS2.2`;
  - `6.ESS3.5` and `6.LS1.3`;
  - `HS.ESS3.4`, `HS.ETS1.4` and `HS.PS3.2`.
- **Engineering by grade:** the 18 K–5 engineering standards (`K.ETS1.1` to `5.ETS1.3`) repeat NGSS's K–2 and 3–5 engineering expectations in every grade.

Every NGSS code in Washington's record has an Oregon twin.

A side finding: 13 science entries in `docs/research/washington/outcomes.json` carry trailing text from the PDF, such as "The performance expectations above were developed…" or "[C larification…". The codes are right, so Washington's tests are not affected. Only the text is noisy.

## Grade themes (2024 social science standards)

| Grade | Focus (ODE's wording) |
| --- | --- |
| K | Me and My World |
| 1 | My School and Family |
| 2 | My Neighborhood, My Community |
| 3 | Our Community and Beyond (including Oregon's regions and counties and the Pacific Northwest) |
| 4 | Oregon, from time immemorial to the present |
| 5 | Colonial and early US history to 1800 |
| 6 and 7 | One band of world history: Paleolithic to 900 CE, and 600 CE to 1900 CE. A school's two years must cover both ranges. A common split is ancient civilizations to about 800 CE in Grade 6 and 600 to 1900 CE in Grade 7. Some 6/7 standards name their range ("…to 900 CE", "…after 600 CE"), which suggests the grade for a unit |
| 8 | US history 1780 to 1865 |
| 9 | No single course. The high school standards cover civics, economics, geography, US history after 1865 and world history after 1750. Oregon requires 3 social science credits, including 0.5 credit of US civics. As for Washington, Grade 9 should be civics, plus economics |

ODE says the 2024 standards add new requirements from recent legislation: civics, ethnic studies, and the Holocaust and other genocides. Ethnic studies runs through every grade, as standards on identity and underrepresented groups (`K.C.IR.2`, `8.H.CP.9`). Holocaust and genocide standards are in high school (`HS.WR.CP.18`, `HS.WR.CP.19`, `HS.US.CP.19`). Grade 6/7 adds the origins of anti-Judaism (`6/7.H.CP.11`).

**Tribal History/Shared History.** SB 13 (2017) directs ODE to create a K–12 Native American curriculum, Tribal History/Shared History, for Oregon public schools. It is required. The curriculum is built on the "Essential Understandings of Native Americans in Oregon", which ODE wrote with representatives of Oregon's nine federally recognized Tribal governments. The law also funds each Tribe to write its own place-based curriculum. ODE's lesson plans (written by Education Northwest) cover Grades K–3, 4, 5, 8 and 10. The standards name the curriculum directly. For example, `4.G.GE.8` says "Utilize the Social Science Tribal History Shared History lessons…", and `4.C.PI.2` compares the constitutions of at least two of the nine Tribes. Our Indigenous content rules apply:
- keep it light and in the present tense;
- never treat all Tribes as one;
- no sacred or ceremonial details;
- borrow no other jurisdiction's Tribal content. Washington's Tribal units are about Washington's Tribes and Since Time Immemorial, so Oregon needs its own.

Oregon units about the nine Tribes are written for Oregon, kept light and in the present tense, and name each Tribe as it names itself.

## Report card and assessments

- **Report card:** ODE sets no statewide student report-card scale. OAR 581-022-2270 only requires districts to report state and local assessment scores to parents at least once a year. Districts set their own report cards. Many elementary schools use standards-based marks from 1 to 4; middle and high schools give letter grades. Like Washington and Alberta, the framework should use four practice steps (Beginning, Approaching, Meeting, Exceeding), with the "practice, not a report-card mark" rule.
- **State tests:** the Oregon Statewide Assessment System (OSAS).
  - English language arts and math in Grades 3 to 8 and 11. The items are developed with Smarter Balanced.
  - Science in Grades 5, 8 and 11.
  - Social sciences: an optional performance assessment only.
  - Districts also give local performance assessments in Grades 3 to 8 and once in high school (OAR 581-022-2100): writing and speaking in ELA, and scientific inquiry in science.
  - Kindergarten has a "Family Conversation", which replaced the Kindergarten Assessment suspended in 2021.

  Dates change each year, so guides should point to ODE (oregon.gov/ode/educator-resources/assessment).
- **Social-emotional learning:** Oregon has Transformative SEL standards. ODE says they are to be integrated with every subject. They could be the guide that matches Washington's SEL page.

## Known gaps

- **ELA:** the 2026 standards are new. ODE has not yet published an implementation year or guidance, or said when OSAS will follow them. Check before launch whether to cite the 2026 codes or the 2019 ones. The 2019 codes were grade-first (`5.RL.3`) and are not in this record.
- **Math:** the high school standards are course-free and contain no polynomial arithmetic, factoring or quadratics, which other states put in Algebra 1. They also contain only arithmetic sequences (`HS.AFN.D.8`).
- **Grade 7 social studies:** this is world history from 600 to 1900 CE. Washington's Grade 7 is Washington State history, so none of it carries over, and Oregon needs new units. Grade 4, Oregon history, needs Oregon-written units too.
- **Science:** middle school placement follows ODE's grade codes. However, the State Board lets districts re-sequence middle school science (for example, to match Outdoor School in Grade 6). So the grade is ODE's default, not a rule.
- **Social studies parsing:** the table parser joins a standard split over several rows. A few standards end without a full stop because ODE prints them that way (`K.G.HI.7`, `2.E.IC.5`, `HS.WR.CH.2`, `HS.WR.CP.10`).

## What changes from Washington

- **Science codes:** Oregon cites its own dotted codes (`4.ESS2.1`), not NGSS's hyphenated ones (`4-ESS2-1`). A shared unit therefore needs separate Oregon codes, even where the wording is identical. The `ngss` field maps between them.
- **Middle school science:** placed by grade in Oregon (6, 7 or 8), where Washington has a 6–8 band that we placed by common course sequences. Several Washington placements differ from Oregon's (see the plan below).
- **Math:** Oregon uses the 2021 standards with Oregon domain codes (`4.GM`, `6.AEE`). Washington uses the 2026 OSPI codes (`M.4.SR.G.1`). The content is close to Common Core in both, but Oregon:
  - has no Grade 3 line plots of inch measurements;
  - limits Grade 8 systems of equations to graphs and tables (`8.AEE.C.8`);
  - has no high school quadratics.
- **ELA:** Oregon keeps Reading Literature and Reading Informational as separate codes (`RL`, `RI`). Washington merges them (`R`) and adds a Research and Media Literacy strand (`RML`). Oregon has no such strand, so Washington's media and research units would cite Oregon's writing (`W.7`–`W.9`), speaking and listening (`SL.2`) and informational reading (`RI.7`–`RI.9`) codes.
- **Social studies:** the codes, grade themes and bands all differ. Oregon has a 6/7 band, and its Grade 3 and 4 are about Oregon.
- **Assessments:** OSAS replaces Smarter Balanced plus WCAS. Oregon tests high school ELA and math in Grade 11, where Washington tests in Grade 10. Science is Grades 5, 8 and 11 in both.

## Plan: Washington units Oregon could share

A rough first pass, for phase 2. It covers 482 units: every unit with a `us-wa` standard, read from `src/content/all.ts`. "Share" means the same topic in the same grade. An Oregon citation would replace the Washington codes, using `share` for BC units and `adopt` for the others, as Washington does. Check each unit's questions before sharing. Washington-only units (`wa-` ids) are US-written, so they are free of Canadian content.

| Grade | Math | English language arts | Science | Social studies |
| --- | --- | --- | --- | --- |
| K | All 10 | All 12 | All 7 | All 8 general units. Oregon K economics adds US currency |
| 1 | All 14 | All 12 | All 7 | All 9. Check `wa-g1-continents-oceans` against `1.G` |
| 2 | All 16 (`wa-g2-money` fits `2.GM.D.11`) | All 12 | All 8 | All 8 |
| 3 | All except `wa-g3-inch-ruler`, because Oregon Grade 3 has no inch line plots; move it to Grade 4 (`4.DR.B.2`) | All 13 | All 9 (`3.LS4.4` and the hazards unit fit) | `meeting-needs`, `mb-global-communities`, `mb-working-together`, `wa-g3-culture`, `wa-g3-money-and-voting`, `wa-g3-north-america`. Not `wa-g3-tribes`; write Oregon's. Oregon adds its own regions and counties |
| 4 | All 15 | All 12 | All 10 | None of the 8, which are about Washington State. Write Oregon units: land and regions, the nine Tribes today, Oregon's constitution and government (`4.C.PI.1`), the trail and statehood, the economy, and the Bottle Bill and ballot initiatives |
| 5 | All 14 | All 11 | All 11 | All except `wa-g5-first-nations`, which Oregon replaces with its own unit written to its Grade 5 Indigenous standards. Oregon Grade 5 matches Washington Grade 5 (colonial to 1800) |
| 6 | All 17 | All 12 | `body-systems`, `nb-senses-6`, `wa-g6-cells`, `wa-g6-weather`, `wa-g6-climate`, `wa-g6-thermal`, `wa-g6-design` (`MS.ETS1`, any grade), and from Washington Grade 8 `work-energy-8` (`6.PS3.5`). `mixtures` and `particles-heat-ab` go to Grade 7 (`7.PS1`) | All 8 (world maps, regions and ancient civilizations: the Paleolithic to 900 CE half of the band) |
| 7 | All 17 | All 13 | All 10 (`plant-parts-ab` and `wa-g7-resources` straddle 6 and 7), plus Washington Grade 6's `mixtures` and `particles-heat-ab` | None. Washington's Grade 7 is Washington State. Needs new world history units for 600 to 1900 CE: Islamic empires, medieval Europe, Asia, Sub-Saharan Africa, the Americas, early modern exploration and revolutions |
| 8 | All 17 (`wa-g8-systems` fits `8.AEE.C.8` only by graphs and tables; `wa-g8-two-way-tables` fits `8.DR.A.1` and `8.DR.C.3`) | All 12 | `light-and-radiation`, `nb-motion-forces-8`, `wa-g8-energy`, `wa-g8-fields`, `wa-g8-heredity`, `wa-g8-selection`, `wa-g8-space`, `wa-g8-earth-history`. `work-energy-8` goes to Grade 6 | All except `wa-g8-reconstruction`, which is after 1865; Oregon puts Reconstruction in high school (`HS.US`). It could stay as an extension |
| 9 | All except `polynomials`, `wa-g9-quadratics` and probably `expressions-9`, because Oregon high school has no polynomial work. `wa-g9-sequences` covers only arithmetic sequences | All 12, citing `ELA.9-10` | All 11 | All civics units except `wa-g9-tribal-government`, which is about Washington's Tribes. Add economics, and possibly a US history after 1865 unit |

Totals:
- **Math:** almost all of Washington's math carries over. About 4 units would not.
- **ELA:** all of it carries over. The 19 Washington-only units (research and media, spelling, proofreading) cite Oregon writing, language and speaking codes instead.
- **Science:** all units carry over. Three move grade (`mixtures`, `particles-heat-ab`, `work-energy-8`), and a few straddle two grades.
- **Social studies:** about 61 of 81 units carry over (Grades K–3, 5, 6, 8 and 9 civics). Grades 4 and 7, and the Tribal units, need Oregon-written content.

Oregon K–5 engineering (`K.ETS1`–`5.ETS1`) has no Washington unit.
