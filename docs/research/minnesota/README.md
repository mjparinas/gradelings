# Minnesota: sources and checking record

Minnesota (`us-mn`, slug `minnesota`) follows the Minnesota K-12 Academic Standards, adopted by the Minnesota Department of Education (MDE) and put into rule. Checked October 14, 2026.

## Sources (in `source/`)

education.mn.gov (https://education.mn.gov/MDE/dse/stds/) puts its downloads behind a bot check (a captcha page), so scripts can't fetch them. The same official documents are kept by the Minnesota Legislative Reference Library as 2025 mandated reports, and `fetch.sh` downloads those:

| File | Document | URL |
| --- | --- | --- |
| `math.pdf` | 2022 Minnesota K-12 Academic Standards in Mathematics (Minnesota Rules 3501.0750; in schools by 2027-28) | https://www.lrl.mn.gov/docs/2025/mandated/251891.pdf |
| `ela.pdf` | 2020 Minnesota K-12 Academic Standards in English Language Arts, corrected February 2024 (Rules 3501.0660) | https://www.lrl.mn.gov/docs/2025/mandated/251889.pdf |
| `science.pdf` | 2019 Minnesota Academic Standards in Science, with October 2022 edits (Rules 3501.0960) | https://www.lrl.mn.gov/docs/2025/mandated/251893.pdf |
| `social.pdf` | 2021 Minnesota K-12 Academic Standards in Social Studies (Rules 3501.1350; in schools from 2026-27) | https://www.lrl.mn.gov/docs/2025/mandated/251895.pdf |

The `.txt` files are `pdftotext -layout` extracts of each PDF.

`build_outcomes.py` rebuilds `outcomes.json` from the PDFs (run with `--write`; without it, it checks the file matches). Each benchmark is `{"idx": code, "content": text}` under `<grade>/<subject>`. High school benchmarks are listed under grade 9.

## Codes

- **Math:** `4.3.5.12` (grade, strand, anchor standard, benchmark). Kindergarten is grade 0. Grade 9 cites the Grades 9-11 benchmarks (`9.3.6.1`).
- **English language arts:** `4.1.4.2`. The strands are Reading (1), Writing (2) and Speaking, Listening, Viewing and Exchanging Ideas (3). Grammar, usage and spelling are Writing anchor standard 1.
- **Science:** `6E.3.1.1.2` (grade, domain, strand, substrand, standard, benchmark). Middle school is by domain, not integrated: Grade 6 is Earth and space science, Grade 7 life science and Grade 8 physical science. Grade 9 cites the high school benchmarks (`9C`, `9E`, `9L`, `9P`).
- **Social studies:** `6.4.19.3` (grade, strand, standard, benchmark). The five strands are Citizenship and Government, Economics, Geography, History and Ethnic Studies (new in 2021). Each grade has a theme: Family and Community (K), Communities and Culture (1), People and the Environment (2), the Ancient World (3), the Contemporary World (4), Early American Studies (5), Minnesota Studies (6), United States Studies (7) and Global Studies (8). Grade 9 is civics and economics, from the high school benchmarks.

## Reporting and tests

There is no statewide report-card scale, so the framework uses four practice steps (Beginning, Approaching, Meeting, Exceeding), like the other states. The state tests are the Minnesota Comprehensive Assessments (MCA): reading and math in grades 3 to 8, reading in grade 10 and math in grade 11, science in grades 5 and 8 and once in high school, with MTAS as the alternate test. Parents can refuse the tests with MDE's form. Dates change, so the guide points to MDE.

## Known gaps

- Grade 6 (Minnesota Studies) and much of Grades 4, 7, 8 and 9 social studies are Minnesota's own units. Dakota and Anishinaabe content is light and in the present tense, with nothing sacred or ceremonial, and needs partner review before more is added.
- The Ethnic Studies strand is cited where units fit, but no unit is built around it alone.
- Math cites the 2022 standards, which schools phase in by 2027-28; some districts still teach the 2007 standards until then.
- Some benchmarks (engineering design, inquiry and several Grade 4 Contemporary World benchmarks) have no unit yet.
