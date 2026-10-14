# Washington research record

**Source:** the Office of Superintendent of Public Instruction (OSPI), ospi.k12.wa.us, read 13 October 2026. Washington is the first US state; the plan for it is the "Washington State: content plan" doc linked from the project (US layer first, then Washington content).

| Subject | Standards | Edition | Cited as |
| --- | --- | --- | --- |
| Math | Washington State K–12 Learning Standards for Mathematics | August 2026 (v3.1), a revision of the Common Core State Standards (2011). 2026–27 is the exploration year; required from 2027–28 | Full code, `M.4.Q.NBT.2`: subject, grade, domain (`DA` Data Analysis, `Q` Quantity, `R` Relationships, `SR` Spatial Reasoning), Common Core cluster, number. Grade 9 uses the high school codes of Algebra 1 and Integrated 1 (`M.HS...`) |
| English language arts | Washington State K–12 Learning Standards for ELA | August 2026, a revision of Common Core ELA (2011). Required from 2027–28 | `ELA.4.R.3`: Reading (`R`), Writing (`W`), Speaking, Listening and Digital Forums (`SLDF`), Language (`L`), Research and Media Literacy (`RML`). Grade 9 uses the 9–10 band, cited `ELA.9-10.R.4` (the PDF writes an en dash) |
| Science | Washington State K–12 Science Learning Standards: the Next Generation Science Standards | Adopted 2013, in force; next in OSPI's review cycle | Performance expectation, `4-PS3-2`. Middle school (`MS-`) is a 6–8 band and high school (`HS-`) is listed under Grade 9 |
| Social studies | Washington State K–12 Social Studies Learning Standards | 2019, in force | Component, `H1.4.2` (History 1, Grade 4). Strands: `SSS` skills, `C` civics, `E` economics, `G` geography, `H` history. Grades 6 to 8 share the `6-8` band; Grade 9 cites the `9-10` band |

World languages (2015, proficiency-based) are not used: Washington families get no French subject (see the plan), and a Spanish Language Arts standard is still being written.

## Files

- `fetch.sh` downloads the official files (the math workbook, the ELA PDF, the NGSS DCI arrangement PDF and the 2019 social studies strand PDFs, plus the scope and sequence) into `source/`, which is committed (downloaded 2026-10-14).
- `build_outcomes.py source` parses them into `outcomes.json`: `{"<grade>/<subject>": [{idx, kind, content}]}` for Kindergarten (`k`) to Grade 9 and the subjects `math`, `language`, `science` and `social`. It needs `openpyxl` and `pypdf`. Band standards are listed under every grade of the band.
- `outcomes.json` holds 1 509 standards. A Washington test will check every `us-wa` citation against it, as Manitoba's does.

## Grade themes (OSPI social studies scope and sequence, 2020)

| Grade | Theme |
| --- | --- |
| K | Self (near and far, now and then) |
| 1 | Families |
| 2 | Community |
| 3 | Culture: people, places and environment |
| 4 | Washington State history, including local Tribal history |
| 5 | US history (pre-colonial to the Constitution) |
| 6 | World geography and world history, ancient civilizations to 1450 |
| 7 | Washington State history, including local Tribal history |
| 8 | US history and government, mainly the 1800s |
| 9 | No statewide course; we teach civics, a graduation requirement |

Since Time Immemorial, Washington's Tribal sovereignty curriculum, is required in schools (RCW 28A.320.170), and the social studies standards map to its pathways. Our Indigenous content rules apply: light, in the present tense, never all Tribes as one.

## Report card and assessments

- No statewide report card. Most elementary districts use a 4-point standards-based scale (1 below standard, 2 approaching, 3 meets, 4 exceeds); middle and high schools give letter grades. The framework will use four practice steps (Beginning, Approaching, Meeting, Exceeding), like Alberta, with the "practice, not a report-card mark" rule.
- State tests: Smarter Balanced ELA and math in Grades 3 to 8 (and 10), the Washington Comprehensive Assessment of Science in Grades 5, 8 and 11, WaKIDS in Kindergarten. Dates change each year, so guides point to OSPI.

## Known gaps

- `build_outcomes.py` reads the main statement of each ELA standard, not its lettered sub-items.
- A few social studies components that the PDFs split across columns may be missing; extend the parser if a citation fails.
- Grades 6 to 8 science is a band. Placement by grade follows common Washington course sequences, not a state rule.
