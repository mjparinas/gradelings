# Michigan: sources and checking record

Michigan (`us-mi`, slug `michigan`) follows the Michigan K-12 Standards, adopted by the State Board of Education and published by the Michigan Department of Education (MDE) at https://www.michigan.gov/mde/services/academic-standards. Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (michigan.gov and legislature.mi.gov answer plain `curl` with a browser user agent) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math.pdf` | Michigan K-12 Standards: Mathematics (adopted 2010, the Common Core State Standards) |
| `ela.pdf` | Michigan K-12 Standards: English Language Arts (adopted 2010, the Common Core State Standards) |
| `science.pdf` | Michigan K-12 Science Standards (adopted November 2015, based on the Next Generation Science Standards) |
| `social.pdf` | Michigan K-12 Standards for Social Studies (adopted June 2019) |
| `sel.pdf` | MDE, Early Childhood to Grade 12 Social and Emotional Learning (SEL) Competencies and Indicators (2017) |
| `assessments.pdf` | MDE Office of Educational Assessment and Accountability, 2025-2026 Guide to State Assessments (updated February 2026) |
| `act-368-of-2016.pdf` | Student Online Personal Protection Act (Act 368 of 2016, MCL 388.1291 to 388.1295), from legislature.mi.gov |
| `mcl-380-1136.pdf` | Revised School Code section 380.1136, Protection of pupil privacy, from legislature.mi.gov |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,605 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school standards are listed under Grade 9. Only `idx` is checked by `src/content/michigan/contract.ts`.

Extraction notes: one page of the English language arts document prints its heading with every letter doubled, so `build_outcomes.py` de-duplicates characters on that page before reading the Grades 3 to 5 foundational skills; science codes are printed without a closing period; and the social studies text drops the trailing "Public Discourse, Decision Making, and Citizen Involvement" headings.

## Codes

- **Mathematics:** the Common Core codes, `4.NBT.1`, `K.CC.3`. Grade 9 cites the high school codes, `A-SSE.1`, `F-IF.4`, `S-ID.6`.
- **English language arts:** `RL.4.1`, `RI.4.2`, `RF.4.3`, `W.4.1`, `SL.4.1`, `L.4.4`. Grade 9 cites the Grades 9-10 standards, `RL.9-10.1`.
- **Science:** NGSS performance expectation codes, `4-PS3-2`. Middle school (`MS-`) is one Grades 6-8 band, valid in Grades 6, 7 and 8; Grade 9 cites the high school expectations (`HS-`).
- **Social studies:** the document prints `4 – H3.0.6`; citations drop the spaces, `4-H3.0.6`. Kindergarten to Grade 4 use strands H (history), G (geography), C (civics), E (economics) and P (public discourse); Grades 5 and 8 use United States history eras (`5-U2.1.1`, `8-U5.2.1`); Grade 7 uses world history eras (`7-W3.1.4`); Grade 9 cites the high school civics (`C3.2.3`) and economics (`E4.1.3`) codes.

## Placement

- Math, English language arts and science follow California's placement, mapped to Michigan's codes (both states teach the Common Core and NGSS). Borrowed units that name another state's places are filtered `mi-` copies with Michigan examples (`units/science-g*.ts`, `units/copies-g*.ts`).
- Social studies follows the grade themes: Myself and Others (K, with the American flag and Michigan's symbols), Families and Schools (1, with symbols and holidays), the Local Community (2, with local government), **Michigan Studies (3, Michigan's own units)**, United States Studies with Michigan history from statehood (4: regions, the federal government, the market economy, Michigan's industries and migration to Michigan), Integrated United States History to 1791 (5, with the Eastern Woodland peoples), Global Geography (6), World History and Geography to 1500 (7) and Integrated United States History from 1787 to 1877 (8, with Michigan's part in it). Grade 9 is civics and economics, which the Michigan Merit Curriculum requires for graduation, with governing Michigan under the 1963 constitution and personal finance.

## Guides

- **SEL competencies** (`/guides/michigan/sel-standards/`): MDE's Early Childhood to Grade 12 Social and Emotional Learning Competencies and Indicators (2017), the five CASEL competencies (self-awareness, self-management, social awareness, relationship skills, responsible decision-making) with 16 indicators and benchmarks for infants and toddlers, pre-K, K-2, 3-5, 6-8, 9-10 and 11-12. Guidance, not graded.
- **State tests** (`/guides/michigan/state-tests/`): the M-STEP (English language arts and math in grades 3 to 7, with a written response at every grade; science and social studies in grades 5, 8 and 11), the PSAT 8/9 for grade 8 English language arts and math and in grade 9, the PSAT 10, the Michigan Merit Examination in grade 11 (SAT with Essay, WIN work-readiness tests, M-STEP science and social studies), MI-Access for students with the most significant cognitive disabilities, and the early literacy and math benchmark assessments in Kindergarten to Grade 2. The Read by Grade Three Law: K-3 reading checks and individual reading improvement plans; the 2023 amendment removed the required retention of 3rd graders. Dates change each year, so the guide points to MDE. https://www.michigan.gov/mde/services/student-assessment

## Privacy

`/privacy/` and `docs/school/README.md` state our commitments as an operator under the Student Online Personal Protection Act (MCL 388.1295): no targeted advertising, no profile beyond K-12 school purposes, no sale or rental, disclosure only as the act allows (service providers contractually bound not to use or pass on the information and to keep it secure), reasonable security, and deletion when the school or district asks. MCL 380.1136 binds MDE, CEPI and districts (no sale of education records, the directory-information opt-out form), not operators.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- The social studies public discourse, decision making and citizen involvement standards (`P3`, `P4`) ask for essays, projects and action plans, so they have no unit.
- Anishinaabe and other Native content (the Ojibwe, Odawa and Potawatomi, Michigan's 12 federally recognized Tribes, treaty fishing rights, the Eastern Woodland peoples in Grade 5) is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
- Grade 6 Global Geography and Grade 7 world history cover the main themes with adopted units; several geography skills standards (GIS, population pyramids, climographs) have no unit of their own.
