# Nebraska: sources and checking record

Nebraska (`us-ne`, slug `nebraska`) follows Nebraska's College and Career Ready Standards, approved by the Nebraska State Board of Education and published by the Nebraska Department of Education (NDE) at https://www.education.ne.gov/contentareastandards/. Checked October 26, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (NDE's site needs a browser user agent; the Legislature's site answers plain `curl`), writes a `pdftotext -layout` copy of each PDF and a text copy of each web page, and records `SHA256SUMS`.

| File | Document |
| --- | --- |
| `math.pdf` | Nebraska's College and Career Ready Standards for Mathematics (approved September 2, 2022), with the five Mathematical Processes |
| `ela.pdf` | Nebraska's College and Career Ready Standards for English Language Arts (approved September 2, 2021) |
| `science.pdf` | Nebraska's College and Career Ready Standards for Science (approved September 6, 2024) |
| `social.pdf` | Nebraska's College and Career Ready Standards for Social Studies (approved November 8, 2019) |
| `social-revision.html` | NDE's page saying the 2026 social studies review kept the 2019 standards |
| `timeline.pdf` | NDE's standards revision timeline for all content areas |
| `assessment-plan-2025.pdf` | NDE's Summative Assessment Administration and Reporting Plan for 2025-26 (NSCAS) |
| `nscas-parent-guide.pdf` | The NSCAS parent guide to score reports (Developing, On Track, Advanced) |
| `lb512.pdf` | LB 512 (2017), the Student Online Personal Protection Act |
| `statute-79-2153.html` to `statute-79-2155.html` | Neb. Rev. Stat. 79-2,153 to 79-2,155 (Student Online Personal Protection Act) |
| `statute-79-2601.html` to `statute-79-2607.html` | Neb. Rev. Stat. 79-2,601 to 79-2,607 (Nebraska Reading Improvement Act) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the text copies in `source/` exactly (2,025 entries): each standard and indicator becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/nebraska/contract.ts`. The script's header lists the printing slips it puts right first.

## Codes

- **Mathematics:** `MA.`, grade, strand, standard and indicator letter: `MA.K.N.1.a`, `MA.4.N.2.b`, `MA.6.R.1.a`. Strands: Number (N), Ratios and Proportions (R, Grades 6 and 7 only), Algebra (A), Geometry (G, with measurement, time and money) and Data (D, with probability). Grade 9 cites the high school standards (`MA.HS.A.3.c`). The optional Advanced Topics standards are left out.
- **English language arts:** `LA.`, grade, strand and number, with indicator letters where printed: `LA.4.F.3.a` (foundations of reading), `LA.4.RP.1` (reading prose and poetry), `LA.4.RI.6` (reading informational text), `LA.4.V.1.b` (vocabulary), `LA.4.W.1.c` (writing), `LA.1.FW.1.a` (foundations of writing), `LA.4.SL.1.a` (speaking and listening). Grade 9 cites the Grades 9-10 band, which is coded with a 10 (`LA.10.RP.1`).
- **Science:** `SC.`, grade, topic, standard and indicator letter: `SC.4.4.2.b`; high school `SC.HS.1.1.a`. The optional High School Plus standards are left out.
- **Social studies:** `SS`, a space, then grade, strand (1 civics, 2 economics, 3 geography, 4 history), standard and indicator: `SS 4.1.1.c`; high school `SS HS.1.1.b`. Standards marked "Not addressed at this level" are left out.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's) where Nebraska teaches the same skill in the same grade, moved to Nebraska's codes; units with no Nebraska indicator in their grade are left out. Borrowed science units built around California places are `neb-` copies with Nebraska examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `neb-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows each grade's theme in the 2019 standards: myself and others (K), families (1), neighborhood (2), communities near and far (3), Nebraska studies (4), U.S. studies to the Constitution (5), World Studies I (6), World Studies II (7), U.S. history from the Constitution through the Gilded Age (8) and, for Grade 9, the high school civics and economics standards.

## Guides

- **Mathematical Processes** (`/guides/nebraska/math-processes/`): the five processes (problem solving, reasoning, representations, connections, communication) in `source/math.pdf`.
- **State tests** (`/guides/nebraska/state-tests/`): NSCAS General English language arts and math (grades 3 to 8), science (grades 5 and 8), NSCAS Alternate, ELPA21 and the ACT in 11th grade, from `source/assessment-plan-2025.pdf`; the three levels from `source/nscas-parent-guide.pdf`. Dates change each year, so the guide points to NDE.
- **Report card page:** Nebraska has no statewide report card. The Nebraska Education Profile (https://nep.education.ne.gov/) reports on schools. The Reading Improvement Act is summarised from `source/statute-79-26*.txt`.

## Privacy

`/privacy/` states our commitments under the Student Online Personal Protection Act; see `docs/frameworks/nebraska.md`. Sections used: 79-2,153 (definitions), 79-2,154 (no targeted advertising, profiling, selling or renting; disclosure only for school purposes and to bound service providers; reasonable security; deletion on the school's request) and 79-2,155 (what the Act does not limit).

## French

Nebraska has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Native content is light and needs partner review; high school U.S. history, world history and geography are not taught in Grade 9.
