# Kansas: sources and checking record

Kansas (`us-ks`, slug `kansas`) follows the standards adopted by the Kansas State Board of Education and published by the Kansas State Department of Education (KSDE) at https://www.ksde.gov/student-success/standards. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (KSDE's site needs a browser user agent; the Legislature's site answers plain `curl`), writes a `pdftotext -layout` copy of each PDF and a text copy of each statute page, and records `SHA256SUMS`.

| File | Document |
| --- | --- |
| `math.pdf` | Kansas Mathematics Standards, K-12 (adopted 2017, reviewed 2024), with the eight Standards for Mathematical Practice |
| `ela.pdf` | Kansas Standards for English Language Arts (2023), horizontal arrangement |
| `science.pdf` | Kansas science standards (the Next Generation Science Standards, adopted 2013), topic arrangement |
| `social.pdf` | Kansas History, Government, and Social Studies Standards (2020), with benchmarks and appendices |
| `assessments.pdf` | KSDE's 2026-27 Kansas Assessment Program overview |
| `kap-parent-guide.pdf` | KAP Summative Parent Guide to Reports (scale scores, levels, cut scores) |
| `ksa-72-6312.html` to `ksa-72-6320.html` | Kansas Student Data Privacy Act, K.S.A. 72-6312 to 72-6320 |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the text copies in `source/` exactly (1,959 entries): each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/kansas/contract.ts`.

## Codes

- **Mathematics:** the 2017 codes printed at the start of each standard, `K.CC.4`, `4.NBT.1`, `8.G.5`. The document also shows the 2010 Common Core code in brackets; those are not cited, because Kansas renumbered and moved some standards (angle measure is `8.G.1` to `8.G.5`, not Grade 4; systems of equations are high school `A.REI.6`, not Grade 8; there is no `5.OA.3` or `8.SP.4`). High school codes use a dot (`A.SSE.1`, `F.IF.4`), and Kansas's linear, quadratic and exponential models domain is `F.LQE` (the Common Core's `F.LE`).
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `W.5.10`, `SL.7.8`. Grade 9 cites the Grades 9-10 band (`RL.9-10.1`). There is no Language strand: grammar and usage are `W.x.10`, conventions `W.x.11`, writing routinely `W.x.12`, word meaning and figurative language in reading `RL.x.10` to `RL.x.12` (and `RI`), the range of reading `RL.x.13`, and vocabulary `SL.x.8`. Lines that say a standard begins in a later grade are skipped, and the 11-12 band is not used.
- **Science:** performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, high school codes (`HS-ESS2-4`) under Grade 9, and the K-2 and 3-5 engineering codes under each grade of their band.
- **Social studies:** five standards, each with four benchmarks (`1.1` to `5.4`) that are the same in every grade. The document's scope and sequence teaches standard 1 in Kindergarten, standards 1 and 2 in Grade 1, standards 1, 2 and 4 in Grade 2, standards 1 to 4 in Grade 3 and all five from Grade 4, so `outcomes.json` lists only those benchmarks for each early grade.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), moved to Kansas's codes; units with no Kansas standard in their grade are left out (for example Grade 4 angle measure and Grade 8 systems of equations). Borrowed science units built around California places are `ks-` copies with Kansas examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `ks-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows each grade's theme in the 2020 standards: a sense of self (K), the role of individuals (1), societies then and now (2), local and national communities (3), Kansas and regions of the United States (4), U.S. history to 1789 (5), the ancient world to 1300 CE (6), global geography or Kansas history (7, so the app has both), U.S. history 1789 to 1898 (8) and, for Grade 9, the high school Government of the United States course.

## Guides

- **Mathematical Practices** (`/guides/kansas/math-practices/`): the eight Standards for Mathematical Practice in `source/math.pdf`.
- **State tests** (`/guides/kansas/state-tests/`): KAP English language arts and math (grades 3 to 8 and 10) and science (grades 5, 8 and 11), Dynamic Learning Maps, KELPA, the optional 2nd grade reading test and the social studies classroom-based assessments (grades 4, 7 and once in high school), from `source/assessments.pdf`; scale scores 400 to 700, Levels 1 to 4, fixed cut scores 510 and 540 and the new scale from 2025, from `source/kap-parent-guide.pdf`. Dates change each year, so the guide points to KSDE.
- **Report card page:** Kansas has no statewide report card. The Kansas Report Card (https://ksreportcard.ksde.gov/) reports on schools. The Blueprint for Literacy (2024 law) is named without detail beyond teacher training in the science of reading and its reading goal.

## Privacy

`/privacy/` states our commitments under the Kansas Student Data Privacy Act; see `docs/frameworks/kansas.md`. Sections used: 72-6314(c) (data-sharing agreements with service providers: purpose, scope and duration, use only for those purposes, access, use and security restrictions, destruction when no longer needed), 72-6315 (no biometric data or reading a student's physiological or emotional state without consent), 72-6316 (no nonacademic surveys about personal attitudes, values or beliefs without consent) and 72-6318 (immediate notice of a breach).

## French

Kansas has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Native content is light and needs partner review; high school U.S. History and World Civilizations are not taught in Grade 9.
