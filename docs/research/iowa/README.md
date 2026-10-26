# Iowa: sources and checking record

Iowa (`us-ia`, slug `iowa`) follows the Iowa Academic Standards. They are adopted by the Iowa State Board of Education and published by the Iowa Department of Education at https://educate.iowa.gov/pk-12/standards. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again. The Department serves files as `educate.iowa.gov/media/<id>/download`, and the ids change when a document is replaced. The script also writes a `pdftotext -layout` copy of each PDF and a text copy of each web page. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math.pdf` | Iowa Academic Standards for Mathematics (adopted April 29, 2024), with the eight Standards for Mathematical Practice |
| `math-pathways.pdf` | Model high school mathematics course pathways |
| `ela.pdf` | Iowa Academic Standards for English Language Arts and Literacy (adopted June 20, 2024) |
| `science.pdf`, `science.xlsx` | Iowa Academic Standards for Science (adopted May 8, 2025), and the same standards as a spreadsheet with one sheet per grade |
| `science-changes.pdf` | The Department's summary of changes in the 2025 science standards |
| `science-pathways.pdf` | Model science course pathways |
| `social.pdf`, `social.xlsx` | Iowa Academic Standards for Social Studies (adopted January 15, 2026), and the spreadsheet |
| `assessment-levels-2026-04.html`, `assessment-levels-2026-09.html` | The Department's notices (April 29 and September 3, 2026) on the new state summative assessment's four proposed achievement levels |
| `code-279.68.pdf` | Iowa Code 279.68: early reading screening, intensive instruction, personal reading plans and retention on a parent's request |
| `code-279.71.pdf` | Iowa Code 279.71: student online personal information protection |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly from `source/` (1,362 standards). Each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. `src/content/iowa/contract.ts` checks only `idx`.

## Codes

- **Mathematics:** the Common Core codes plus the cluster letter, such as `K.CC.B.4`, `4.NBT.A.1` and `8.F.B.4`. Grade 9 cites Algebra 1 with the course prefix, such as `A1.A-SSE.A.2` and `A1.F-IF.B.4`.
- **English language arts:** strand, grade and number, such as `RL.4.2`, `RF.2.3` and `L.5.4`. Grade 9 cites the Grades 9-10 band, such as `RI.9-10.2`.
- **Science:** performance expectation codes, such as `K-PS2-1` and `4-PS3-2`.
  - Each middle school expectation is placed in one grade with the grade in its code, such as `6-PS4-1`, `7-LS2-1` and `8-ESS2-5`. Grade 6 is Earth's surface, cells and waves; Grade 7 is forces, energy and ecosystems; Grade 8 is matter, heredity and climate.
  - Engineering is set in each grade, as in `3-ETS1-2`. High school codes, such as `HS-LS2-6`, are listed under Grade 9.
- **Social studies:** `SS.K.15` and `SS.4.14` in Kindergarten to Grade 8, numbered within each grade.
  - High school is listed under Grade 9: government (`SS.9-12.Gov.13`), economics (`SS.9-12.Econ.5`), financial literacy (`SS.9-12.FL.4`), and US history and world history.

## Placement

- **Math and English language arts** follow Michigan's placement (and so California's), without California's own additions. Units for the Common Core high school standards that Iowa moved to Algebra 2 are not used.
- **Science** follows the same placement in Kindergarten to Grade 5 and Grade 9. In Grades 6 to 8 it follows Iowa's grade codes.
- **Borrowed units:**
  - Units built around California places are `ia-` copies with Iowa examples (`copyOf`, `units/science-g*.ts`).
  - Borrowed units that name another state's places are filtered `ia-` copies (`localCopy`, `units/copies-g*.ts`).
  - The `OTHER_STATE` pattern in `units/kit.ts` leaves out Memphis (Egypt questions) and Lake Tahoe (a capitalization question), which would otherwise be false positives.
- **Social studies** follows each grade's theme in the 2026 standards. Iowa's own units carry the Iowa content; see `docs/frameworks/iowa.md`.
- **The grade files** (`src/content/iowa/<grade>.ts`) import only the unit files that hold the units they adopt. Importing a whole grade file of another state would grow the download.

## Guides

- **Mathematical Practices** (`/guides/iowa/math-practices/`): the eight Standards for Mathematical Practice printed in `source/math.pdf`.
- **State tests** (`/guides/iowa/state-tests/`):
  - What it covers: the state summative assessment (formerly ISASP), the proposed achievement levels, the School Performance Profiles and the early reading law.
  - Sources: the two assessment notices and `source/code-279.68.pdf`.
  - Dates change each year, so the guide points to the Department.

## Privacy

`/privacy/` states our commitments under Iowa Code 279.71; see `docs/frameworks/iowa.md`.

## French

Iowa has no statewide French standards the app follows, so the app offers no French subject (`french` in the manifest is empty).

## Known gaps

See "Known gaps" in `docs/frameworks/iowa.md`.
