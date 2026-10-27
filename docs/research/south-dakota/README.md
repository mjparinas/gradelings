# South Dakota: sources and checking record

South Dakota (`us-sd`, slug `south-dakota`) follows the content standards adopted by the South Dakota Board of Education Standards, published by the South Dakota Department of Education at https://doe.sd.gov/contentstandards/. Checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF. doe.sd.gov and sdlegislature.gov answer plain `curl` with a browser user agent; the Legislature's statute pages are UTF-16 HTML. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2018.pdf` | South Dakota State Standards for Mathematics (2018), with the eight Standards for Mathematical Practice. These are the standards in classrooms in 2026-27 and the ones the app cites. |
| `math-2026.pdf` | The 2026 South Dakota mathematics standards (adopted May 4, 2026), which replace the 2018 standards once districts make the switch. Kept for that switch; not cited yet. |
| `ela-2025.pdf` | South Dakota English Language Arts Standards (adopted April 14, 2025; 2025-26 was the transition year) |
| `science-2024.pdf` | South Dakota Science Standards (adopted April 22, 2024) |
| `science-appendix-c.pdf` | Appendix C of the science standards: the engineering design standards (`K-2-ETS1-1`, `MS-ETS1-1` and so on) |
| `social-2023.pdf` | South Dakota Social Studies Standards (adopted April 17, 2023) |
| `assessment-milestones-2026-27.pdf` | The Department's 2026-27 assessment milestones: which tests, which grades, and the testing windows |
| `test-administration-guide-2026.pdf` | The 2026 test administration guide for the South Dakota summative assessments |
| `individual-student-report-sample.pdf` | A sample individual student report, with the four achievement levels and their descriptions |
| `sdcl-13-3-51.1.htm` to `sdcl-13-3-51.6.htm` | SDCL 13-3-51.1 to 13-3-51.6 (SL 2014, ch 76): privacy of student records held by the Department, and parental consent for surveys on protected topics |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,401 standards): each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/south-dakota/contract.ts`. The parser reads the plain-text copies, so it needs no PDF library. Two things in the documents need care, and both are handled in the script: the math standards are numbered inside each domain mostly but not always in order (1st grade lists `1.MD.5` before `1.MD.4`, and the high school courses skip numbers), and the English language arts document prints Grade 6's fifth informational text standard as `5.RI.5` (`ELA_TYPOS`). "Not applicable to literature" entries (`RL.8`) are left out.

## Codes

- **Mathematics (2018):** domain and number, `K.CC.4`, `4.NBT.1`, `8.F.4`. The document prints the domain code beside each domain heading and numbers the standards inside it; the numbers match the Common Core's. Grade 9 cites the high school courses (Algebra I, Geometry, Algebra II and a fourth year), `A.SSE.1`, `F.IF.4`, written with a dot where the Common Core has a hyphen. Parts (`4.NF.3a`) are cited by their standard.
- **English language arts (2025):** grade, strand and number, `K.RL.1`, `4.RI.2`, `1.RF.3`, `5.L.4`. Grade 9 cites the Grades 9-10 band, `9-10.RL.1`. The Grades 6-8 literacy standards (`6-8.RH.1`, `6-8.RST.1`, `6-8.WHST.1`) are listed under Grades 6, 7 and 8; 11-12 is left out.
- **Science (2024):** performance expectation codes, `K-PS2-1`, `4-PS3-2`, and the engineering standards `K-2-ETS1-1`, `3-5-ETS1-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9. South Dakota's set leaves out a few NGSS expectations, among them `MS-LS1-8`, `MS-LS4-3`, `HS-ESS2-6`, `HS-ESS2-7` and `HS-PS2-4`, so units that taught only those aren't used or cite the expectations that remain.
- **Social studies (2023):** grade, `SS` and number, `K.SS.2`, `4.SS.11`. High school is by course, listed under Grade 9: United States History (`9-12.USH.3`), United States Government/American Civics (`9-12.C.17`), World History (`9-12.WH.2`), World Geography (`9-12.WG.1`) and Economics (`9-12.E.3`). Lettered subpoints (`4.SS.11.H`) aren't listed; units cite the standard.

## Placement

- Math, English language arts and science follow California's placement, because South Dakota keeps the Common Core's grade-by-grade math and English language arts codes and the NGSS science codes, with one Grades 6-8 science band. Borrowed science units built around California places are `sd-` copies with South Dakota examples (`copyOf`, `units/science-g*.ts`: the prairie and prairie potholes, the Black Hills and the Badlands, the Missouri River and Lake Oahe, blizzards and tornadoes, wind farms and the Missouri River dams, the Mammoth Site and the Badlands fossils, bison in Custer State Park and black-footed ferrets), and borrowed units that name another state's places are filtered `sd-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the standards' grade themes, which move through history in order: an introduction to America (K); the world to 315 and America from 1492 to 1787 (1); the world from 315 to 1492 and America from 1787 to 1908 (2); the world to 60 BCE and America from 1492 to 1763 (3); the world from 60 BCE to 1300 and America from 1763 to 1820 (4); the world from 1300 to 1648 and America from 1820 to 1908 (5); influential ideas in history and civics to 1815 (6); America from 1492 to 1877 (7); and America from 1877 to 2008 (8). The standards don't place high school courses in grades; Grade 9 here is United States Government/American Civics.

## Guides

- **Mathematical Practices** (`/guides/south-dakota/math-practices/`): the eight Standards for Mathematical Practice described at the front of `source/math-2018.pdf`.
- **State tests** (`/guides/south-dakota/state-tests/`): the South Dakota ELA and Math Assessments (grades 3 to 8, two sessions each), the South Dakota Science Assessment (grades 5 and 8) and the SD-ACT (grade 11), with alternate assessments and ACCESS for English learners. The ELA and math reports give a scale score and four achievement levels (Level 1 not met, Level 2 nearly met, Level 3 met, Level 4 exceeded). The 2026-27 window for ELA, math and science is March 29 to May 7, 2027. Sources: `source/assessment-milestones-2026-27.pdf` and `source/individual-student-report-sample.pdf`. Dates change each year, so the guide points to the Department.

## Privacy

SDCL 13-3-51.1 to 13-3-51.6 (`source/sdcl-13-3-51.*.htm`) govern the Department's handling of personally identifiable information in education records, and 13-3-51.2 requires parental consent before a student takes a survey on protected topics (beliefs, family, income and others). South Dakota has no law of its own for online services used by schools, so `/privacy/` gives South Dakota schools the same commitments as other states', with breach notice under SDCL 22-40-19 to 22-40-26. See `docs/frameworks/south-dakota.md`.

## French

South Dakota has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; the 2026 math standards aren't cited yet; high school US History, World History, World Geography and Economics aren't cited (Grade 9 is Civics); Grade 6 world geography (6.SS.3) has one borrowed unit; Native content follows the Oceti Sakowin Essential Understandings only as the standards cite them and needs partner review before it grows.
