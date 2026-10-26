# Idaho: sources and checking record

Idaho (`us-id`, slug `idaho`) follows the Idaho Content Standards, adopted by the State Board of Education and published by the Idaho Department of Education at https://www.sde.idaho.gov/about-us/departments/content-and-curriculum/idaho-content-standards/. Checked October 26, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (the Department's site needs a browser user agent; the Legislature's site answers plain `curl`), writes a `pdftotext -layout` copy of each PDF and a text copy of each web page, and records `SHA256SUMS`.

| File | Document |
| --- | --- |
| `math.pdf` | Idaho Content Standards, Mathematics (January 2022), with the Standards for Mathematical Practice for every grade |
| `math-9-12.pdf` | 9-12 mathematics standards by course (a planning guide; Idaho leaves course placement to districts) |
| `ela.pdf` | Idaho Content Standards, English Language Arts/Literacy (January 2022) |
| `science.pdf` | Idaho Content Standards, Science (January 2022) |
| `social.pdf` | Idaho Content Standards, K-12 Social Studies (created April 2024, revised November 2025) |
| `*-highlights.pdf` | The Department's notes on the 2022 math, English language arts and science revisions |
| `essential-standards-*.pdf` | Two essential standards guides, which show how the Department writes codes (`4.RC.L.5a`, `4-PS-1.2`, `4.SS.1.3`, `9-10`) |
| `isat.html`, `isat-parent-*.pdf` | The ISAT page and the family guides to ISAT score reports |
| `iri.html` | The Idaho Reading Indicator page |
| `code-33-133.html` | Idaho Code 33-133, student data use and limitations |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the text copies in `source/` exactly (2,194 entries): each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/idaho/contract.ts`.

## Codes

- **Mathematics:** grade, domain, cluster letter and number, as the essential standards guides print them: `4.NBT.A.1`, `8.EE.C.7`. Grade 9 cites the high school standards (`A.SSE.A.1`, `F.IF.B.4`, `N.RN.A.1`), which Idaho does not place in courses.
- **English language arts:** grade, strand, substrand and number, `4.RC.L.5a` (Reading Comprehension: Literature), `4.RC.NF.6b` (Nonfiction), `3.FR.PH.3a` (Foundational Reading: Phonics), `4.GC.M.3` (Grammar and Conventions: Mechanics), `7.VD.WB.2d` (Vocabulary Development) and the writing (`W`), research (`RS`) and oral and digital communication (`ODC`) strands. A standard with lettered parts is listed whole and by part. Grade 9 cites the Grades 9/10 band, written `9-10.RC.TE.3`.
- **Science:** performance expectations with a dot before the number, `K-LS-1.1`, `4-PS-1.1`. Middle school is one band (`MS-LS-2.1`), listed under Grades 6, 7 and 8; high school codes (`HS-LS-2.1`, and Idaho's own `HS-PSC` chemistry and `HS-PSP` physics strands) are listed under Grade 9.
- **Social studies:** `4.SS.1.3` in Kindergarten to Grade 5 (1 history, 2 geography, 3 economics, 4 civics and government, 5 global perspectives). Grades 6 to 9 cite World Geography and World History and Civilizations (`6-9.WG.2.1`, `6-9.WH.1.4`) and United States History I (`6-12.US1.12`); Grade 9 also cites United States History II (`9-12.US2.3`), American Government (`9-12.GOV.45`) and Economics (`9-12.EC.6`).

## Placement

- Math and English language arts follow the Common Core placement the other states use, moved to Idaho's codes. Borrowed units that name another state's places are filtered `id-` copies (`localCopy`, `units/copies-g*.ts`).
- Science follows Idaho's grade standards in Kindergarten to Grade 5. Units built around California places are `id-` copies with Idaho examples (`copyOf`, `units/science-g*.ts`). The middle school band is spread across Grades 6 to 8 the way the shared units already are, and every Grade 6 to 8 unit cites `MS-` codes.
- Social studies follows each grade's standards: self, family and symbols (K), maps and communities (1), the five tribes in Idaho, Idaho's land and its laws (2), community history and local government (3), Idaho history, tribes, regions and government (4, all `id-` units), colonies to the Constitution and federal, state and tribal lands (5), the ancient and medieval world (6), world geography and Idaho in the world (7), United States history to 1877 with Idaho's territory and statehood (8), and American Government and Economics with governing Idaho (9).

## Guides

- **Mathematical Practices** (`/guides/idaho/math-practices/`): the eight Standards for Mathematical Practice in `source/math.pdf`.
- **ISAT and IRI** (`/guides/idaho/isat/`): ISAT English language arts and math (grades 3 to 8 and 11) and science (5, 8 and 11), March to May, Levels 1 to 4, from `source/isat.txt` and `source/isat-parent-*.txt`; the Idaho Reading Indicator (Kindergarten to 3rd grade, fall and spring, three tiers) from `source/iri.txt`. Dates change each year, so the guide gives months only.
- **Report card page:** Idaho has no statewide report card; districts and charter schools choose their own.

## Privacy

`/privacy/` states our commitments under Idaho Code 33-133 (`source/code-33-133.txt`); see `docs/frameworks/idaho.md`. Section 33-133(3)(b)(vi) and (3)(f) ask schools' contracts with online services to safeguard privacy and security, allow secondary uses only with a parent's written permission, and set data destruction dates.

## French

Idaho has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; tribal content is light and needs review with the tribes' education offices; United States History II and Foundations of Western Civilization are not taught in Grade 9.
