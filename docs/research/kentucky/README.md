# Kentucky: sources and checking record

Kentucky (`us-ky`, slug `kentucky`) follows the Kentucky Academic Standards, published by the Kentucky Department of Education (KDE) at https://www.education.ky.gov/curriculum/standards/kyacadstand/Pages/default.aspx and linked from https://kystandards.org/home/ky-acad-standards/. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (education.ky.gov and apps.legislature.ky.gov answer plain `curl` with a browser user agent) and writes a `pdftotext -layout` copy of each PDF. `source/SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2019.pdf` | Kentucky Academic Standards for Mathematics (adopted 2019, 704 KAR 8:040), Kindergarten to high school, with the Standards for Mathematical Practice |
| `reading-writing-2025.pdf` | Kentucky Academic Standards for Reading and Writing (October 2025) |
| `science-2022.pdf` | Kentucky Academic Standards for Science (December 2022, built on the Next Generation Science Standards) |
| `social-studies-2022.pdf` | Kentucky Academic Standards for Social Studies (December 2022) |
| `ksa.html` | KDE's Kentucky Summative Assessments page, with the tested grades and the performance level descriptors |
| `ksa-pld-grade4.pdf` | KSA performance level descriptors, Grade 4 (Novice, Apprentice, Proficient, Distinguished) |
| `ksa-pld-grade11.pdf` | KSA performance level descriptors, Grade 11 |
| `krs-365-734.pdf` | KRS 365.734, prohibited uses of personally identifiable student information by cloud computing service providers, from the Kentucky Legislature |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,359 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school standards are listed under Grade 9. `python3 -I build_outcomes.py --check` exits 1 when `outcomes.json` differs from a fresh build. Only `idx` is checked by `src/content/kentucky/contract.ts`.

Extraction notes: the social studies document prints many standards twice (in a table and again in flush-left prose that `pdftotext` interleaves), so the script prefers the table copy; math standards wrap into a wide left column, and some math italics come out doubled, which the script repairs; language paragraphs stop at the next heading.

## Codes

- **Mathematics:** `KY.4.NBT.1`, `KY.K.CC.3`. Grade 9 cites the high school codes, `KY.HS.A.12`, `KY.HS.F.5`.
- **Reading and writing:** `RL.4.2`, `RI.4.6`, composition `C.4.1`, language `L.4.4`, foundational skills `RF.2.3`, handwriting `HW.1.1`. Grade 9 cites the Grades 9-10 standards, `RL.9-10.2`. Standards the document marks "Not applicable" are left out.
- **Science:** `4-PS3-2`. Kentucky places each middle school expectation in one grade and numbers it with that grade (`6-ESS2-4`, `7-PS3-1`, `8-LS4-4`); engineering is `MS-ETS1-1` in Grades 6 to 8. Grade 9 cites the high school expectations (`HS-LS2-6`).
- **Social studies:** `<grade>.<discipline>.<strand>.<n>`, such as `4.H.CH.1` (history, change and continuity) or `K.C.KGO.2` (civics, Kentucky government). The `KGO`, `KGE`, `KE` and `KH` strands are Kentucky government, geography, economics and history. Grade 9 cites the high school civics, economics and Kentucky codes (`HS.C.KGO.1`, `HS.E.MA.5`).

## Placement

- Math, reading and writing, and Kindergarten to Grade 5 science follow California's placement, mapped to Kentucky's codes; Grades 6 to 8 science follow Kentucky's own grade placement. Borrowed units that name another state's places are filtered `ky-` copies with Kentucky examples (`units/science-g*.ts`, `units/copies-g*.ts`).
- Social studies follows the grade themes printed in the standards: Myself and My Community (K), Impact on Community and State (1), North American Interactions (2), Global Interactions (3), Migration and Settlement (4), Colonization to Constitution (5), Development of Civilizations (6), Growth and Expansion of Civilization (7) and The United States: 1600-1877 (8). Grade 9 is civics, economics and personal finance, with governing Kentucky.

## Guides

- **Mathematical Practices** (`/guides/kentucky/math-practices/`): the eight Standards for Mathematical Practice printed in the 2019 math standards. Taught inside math lessons, not graded as a subject.
- **State tests** (`/guides/kentucky/state-tests/`): the Kentucky Summative Assessments (reading and math in grades 3 to 8 and 10, science in 4, 7 and 11, social studies in 5, 8 and 11; Novice, Apprentice, Proficient and Distinguished), the Kentucky Alternate Assessment, and the Read to Succeed Act (2022) reading screening in Kindergarten to Grade 3. Dates change each year, so the guide points to KDE. https://education.ky.gov/AA/Assessments/Pages/KentuckySummativeAssessment-.aspx

## Privacy

`/privacy/` states our commitments under KRS 365.734 (cloud computing service providers for schools): student data used only to provide and improve the service for the school, no advertising or advertising profiles, no sale or other commercial use, disclosure only to the school and providers bound by contract, and written certification of these commitments when a school asks.

## Known gaps

- Reading and writing standards that need writing, speaking or fluency have no unit.
- The social studies inquiry practices (`I.Q`, `I.UE`, `I.CC`) ask for projects and discussion, so they have no unit.
- Several geography skills standards in Grades 3, 6 and 7 have no unit of their own.
- Shawnee, Cherokee and other Native content is light and needs partner review before it grows.
