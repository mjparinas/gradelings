# Alaska content standards: sources and checking record

Alaska (`us-ak`, slug `alaska`) follows the content standards the Alaska State Board of Education adopts and the Department of Education and Early Development (DEED) publishes at education.alaska.gov/standards. Files read on 14 October 2026. `fetch.sh` downloads them and `build_outcomes.py` turns them into `outcomes.json`, which `src/content/alaska/contract.ts` uses to check every citation.

The source documents are committed in `source/` (read 14 October 2026, checksums in `source/SHA256SUMS`), so the record can be rebuilt even if DEED moves or replaces a file:

```bash
python3 -I build_outcomes.py source                     # needs pdfplumber
./fetch.sh /tmp/alaska-src && python3 -I build_outcomes.py /tmp/alaska-src   # fresh copies; replace source/ if they changed
```

education.alaska.gov resets connections without a browser user agent, so `fetch.sh` sends one.

## Sources

| Subject | Document | URL |
| --- | --- | --- |
| Mathematics | Alaska English/Language Arts and Mathematics Standards, mathematics (adopted June 2012) | education.alaska.gov/akstandards/math/adopted_math.pdf |
| English language arts | Alaska English/Language Arts and Mathematics Standards, ELA (adopted June 2012) | education.alaska.gov/akstandards/ela/Adopted_ELA.pdf |
| Science | Science Standards for Alaska (adopted June 2019) | education.alaska.gov/akstandards/science/science-standards-for-alaska.pdf |
| Social studies | Alaska Social Studies Standards (adopted December 2024) | education.alaska.gov/akstandards/Adopted-AK-SS-Standards-2024.pdf |
| State tests | Quick Guide to Required Statewide Assessments (2026–27) | education.alaska.gov/assessments/Quick_Guide_to_Required_Statewide_Assessments.pdf |
| Cultural standards | Alaska Standards for Culturally-Responsive Schools (1998), Alaska Native Knowledge Network | uaf.edu/ankn/publications/guides/alaska-standards-for-cult/ |

## What `outcomes.json` holds

Keys are `"<grade>/<subject>"`; each entry has `idx` (the code a unit cites) and the standard's text.

| Subject | How a unit cites it | Entries per grade |
| --- | --- | --- |
| Math | Codes as Alaska prints them, without cluster letters: `4.NBT.1`. Alaska renumbers some standards and adds its own (counting standards `1.CC.*`, time zones in `4.MD.4`, no `5.NF.3`/`5.NF.4`), so codes were checked one by one. Grade 9 lists the high school codes (`A-SSE.1`, `F-IF.4`, `G-GMD.1`, `S-ID.7`). | K 26, 1 31, 2 27, 3 27, 4 31, 5 26, 6 32, 7 24, 8 29, 9 156 |
| ELA | The PDF numbers each strand's standards inside a grade column; the code adds strand and grade: `RL.4.1`, `RI.4.2`, `RF.4.3`, `W.4.1`, `SL.4.1`, `L.4.4`. Grade 9 uses the 9–10 column (`RL.9-10.1`). Grades 2–5 foundational skills start at `RF.n.3`. | K–9 41–44 |
| Science | NGSS performance expectations (`4-PS3-2`, `K-2-ETS1-1`). `MS-` codes are listed under Grades 6, 7 and 8; `HS-` under Grade 9. | K 13, 1 12, 2 14, 3 18, 4 17, 5 16, 6–8 58, 9 70 |
| Social studies | Printed codes: `SS.4.1.18.1` (grade, standard, anchor, number), grade bands `SS.K-2.1.1`, `SS.3-5.18.1`, `SS.6-8.1.1`; Grades 6–8 are by theme (`SS.6.2.22.1`); high school `SS.9-12.9.1` plus the Alaska History, US History and World History courses (`SS.AKH.5.8.1`, `SS.USH…`, `SS.WH…`), all listed under Grade 9. | K 107, 1 115, 2 121, 3 133, 4 133, 5 137, 6 67, 7 61, 8 111, 9 302 |

### Parsing notes

- Math pages have three grade columns; the script finds the grade headers and crops each column.
- ELA pages are titled by strand and continue across pages; the script tracks the strand by page title. ELA page headers sit lower than usual, so the header band is 200 points.
- Science codes sit on their own line, followed by the expectation; clarification statements and assessment boundaries are dropped.
- Social studies pages put the anchor standard on the left and the leveled standards on the right; the right edge of a code's text is cut where the next column starts ("By…" or another code on the same row). Placeholders such as "(Begins in grade…)" and page footers are removed.

## Grade placement

- Math, ELA and science follow California's placement (California teaches the same Common Core and NGSS content, with an integrated middle school science), so Alaska uses the same units from the same files, with every citation converted to Alaska's code and checked. Where Alaska's numbering differs, the plan cites Alaska's own code (for example `3.MD.7; 3.MD.8; 3.MD.9; 3.MD.10` for area and perimeter, `5.NF.5; 5.NF.6; 5.NF.7` for multiplying fractions).
- Social studies follows Alaska's grade themes: Me and My World (K), My Place in the World (1), My Local Community (2), Alaska's Past, Present, and Future (3), U.S. Cultures and Regions (4), Foundations and History of the U.S. (5), Alaska Studies and Geography (6), World History and Geography (7), U.S. History and Civics (8). Grade 9 is civics, as in the other states, with the Alaska Constitution, statehood and ANCSA, and the resource economy from Alaska's high school Alaska History course.
- Alaska-only units (`ak-` ids) are in Grades 2, 3, 4, 6 and 9 social studies.

## Cultural Standards for Students

The Alaska Standards for Culturally-Responsive Schools (adopted by the State Board of Education in 1998) include five Cultural Standards for Students (A to E). They are the competencies page (`/guides/alaska/cultural-standards/`). They are guidance, not a graded subject.

## Report card and state tests

- No statewide report card scale; districts choose, and many use standards-based 1 to 4 reporting. The framework uses the four practice steps (Beginning, Approaching, Meeting, Exceeding).
- AK STAR (with NWEA): English language arts and math in grades 3 to 9, spring window (29 March to 30 April 2027), linked to fall or winter MAP Growth tests. The Alaska Science Assessment (with DRC): grades 5, 8 and 10, same window. Dynamic Learning Maps is the alternate assessment. The Alaska Reads Act adds a K–3 reading screener. Dates change each year, so the guide points to DEED.

## Known gaps

- Alaska Native content (Grades 3, 6 and 9) is light, in the present tense and needs review with Alaska Native partners before it grows. Alaska has 229 federally recognized Tribes and 20 official Alaska Native languages; units speak of "many" peoples and never treat them as one.
- Grade 7 world history and Grade 8 US history use borrowed units; Alaska's Grade 7 and 8 standards that ask for Alaska connections (for example the Russian period in world history) have no Alaska-written unit yet.
- ELA foundational skills and science and engineering practices are covered only where California's placement already covers them.
- Alaska has no student online privacy statute of its own; `/privacy/` and `docs/school/` state FERPA and COPPA commitments and breach notice under the Alaska Personal Information Protection Act (AS 45.48).
