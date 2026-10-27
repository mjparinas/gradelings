# North Dakota: sources and checking record

North Dakota (`us-nd`, slug `north-dakota`) follows the content standards published by the North Dakota Department of Public Instruction (NDDPI) at https://www.nd.gov/dpi/. All four subjects are on the Department's CASE server, https://case.nd.gov/ (the list of packages is at `https://case.nd.gov/ims/case/v1p0/CFDocuments?limit=1000`). Checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF. www.nd.gov, case.nd.gov and www.legis.nd.gov answer plain `curl` with a browser user agent. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `case-math-2023.json` | CASE package: North Dakota Mathematics Content Standards (2023) |
| `case-ela-2023.json` | CASE package: North Dakota English Language Arts and Literacy Content Standards (2023) |
| `case-science-2019.json` | CASE package: North Dakota Science Content Standards (2019) |
| `case-social-2019.json` | CASE package: North Dakota Social Studies Content Standards (2019) |
| `math-2023.pdf` | The 2023 math standards as printed (revision of June 27, 2024), with the three Math Attributes |
| `math-crosswalk-2017-2023.pdf` | NDDPI crosswalk between the 2017 and 2023 math standards (July 27, 2023) |
| `ela-2023.pdf` | The 2023 English language arts standards as printed (October 21, 2024) |
| `ela-crosswalk-2017-2023.pdf` | NDDPI crosswalk between the 2017 and 2023 English language arts standards |
| `science-2019.pdf` | The 2019 science standards as printed (revision of December 10, 2019) |
| `social-2019.pdf` | The 2019 social studies standards as printed (revision 7, November 30, 2023) |
| `social-draft-2026-04-24.pdf` | First draft of the next social studies standards (April 24, 2026); kept to watch, not used |
| `essential-understandings.pdf` | The North Dakota Native American Essential Understandings |
| `case-directions.pdf` | NDDPI's directions for reading the standards on the CASE server |
| `ndcc-15.1-21.pdf` | N.D. Cent. Code ch. 15.1-21: required instruction, including North Dakota studies in grades 4 and 8 (15.1-21-01), the ACT or WorkKeys in grade 11 (15.1-21-19) and the civics test for graduation (15.1-21-27) |
| `ndcc-15.1-07.pdf` | N.D. Cent. Code ch. 15.1-07: school districts, including the student data policy (15.1-07-25.3) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the four CASE packages exactly (1,955 entries across the grades; `--check` compares without writing). It needs only the Python standard library. Each item becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`, and bands are listed under every grade they cover. Only `idx` is checked by `src/content/north-dakota/contract.ts`. Two coding slips on the CASE server are fixed in the script (`E.K._2.5` and `US 6-12.1-6.E3.3`).

## Codes

- **Mathematics (2023):** grade, category, sub-category and number, `K.NO.CC.5`, `4.NO.NBT.1`, `3.AR.OA.4`; high school `9-10.AR.9`, `9-10.NO.3`. The Math Attributes are `K-2.MA.P`, `3-5.MA.C` and so on. The `*` and `(+)` marks are left off.
- **English language arts (2023):** `K.F.1` (foundations), `4.R.3.a` (reading), `5.IR.2` (integrated reading), `4.W.4`, `3.C.2` (communication), `4.L.1b`; high school `9-10.R.4`.
- **Science (2019):** NGSS performance expectation codes, `4-PS3-2`, `MS-LS1-1`, `HS-ESS2-4`, with `ET` for engineering (`K-2-ET1-1`, `MS-ET1-3`). North Dakota leaves out 4-PS4-2, MS-LS1-8, HS-PS4-5, HS-LS2-6 and 3-LS4-4, so no unit cites them.
- **Social studies (2019):** standards by strand and band, `C.K_2.4`, `H.3_5.10`; Grades 6 to 12 cite benchmarks, `ND.6_12.4.1`, `C.6_12.2.3`, `E.6_12.7.3`, `G.6_12.3.2`, and the history strands by era, `US.6_12.1-6.E2.3`, `WH.6_12.1-6.E1.2`. The 6-12 band is listed under Grades 6 to 9.

## Placement

- **Math and English language arts** follow Michigan's placement (and so California's): each Common Core code those units cite was carried to its 2023 North Dakota code through the Department's crosswalks, then kept only where the code exists for that grade. Four units with no crosswalk match were cited by hand (`story-order`, `story-time`, `ca-g2-fact-reader`, `ca-g9-quantities`).
- **Science** follows the same placement, with `ET` codes and without the expectations North Dakota leaves out. Units built around California places are `nd-` copies with North Dakota examples (prairie potholes, the Badlands, the Missouri and Red rivers, Lake Sakakawea, Devils Lake, Triceratops and petrified wood, blizzards and spring floods, Bakken oil, lignite and wind, the northern lights).
- **Social studies** follows NDDPI's grade themes: my family (K), my school (1), my community (2), communities and regions (3), North Dakota studies (4), exploration and the colonies to the Constitution (5), world history to the Renaissance (6), world geography (7), North Dakota studies with United States history to Reconstruction (8) and high school government, civics and personal finance (9). NDCC 15.1-21-01 requires North Dakota studies in grades 4 and 8, "with an emphasis on geography, history, the federally recognized Indian tribes in the state, and agriculture".

## Guides

- **Math Attributes** (`/guides/north-dakota/math-attributes/`): problem-solving, connections, and reasoning and proof, from `source/math-2023.pdf`.
- **State tests** (`/guides/north-dakota/state-tests/`): the ND A+ Summative (English language arts and math in grades 3 to 8 and 10; science in grades 4, 8 and 10), first aligned to the 2023 standards in spring 2025, and the ACT or WorkKeys in grade 11 (NDCC 15.1-21-19). Score scales and cut scores are being reset, so the guide describes performance levels without numbers and points to the Department.

## Privacy

N.D. Cent. Code § 15.1-07-25.3 (`source/ndcc-15.1-07.pdf`): each school board adopts a student data policy, approves sharing student data outside the district and keeps a list of who it shares with. See `docs/frameworks/north-dakota.md`.

## French

North Dakota has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; the Math Attributes aren't cited by units; high school United States and world history after the eras taught in Grades 5 to 8 aren't cited; tribal content needs review by the tribal nations' educators before it grows.
