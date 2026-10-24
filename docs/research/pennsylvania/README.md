# Pennsylvania: sources and checking record

Pennsylvania (`us-pa`, slug `pennsylvania`) follows the academic standards the Pennsylvania Department of Education (PDE) publishes on its Standards Aligned System (SAS): the PA Core Standards for mathematics and English language arts, the STEELS science standards and the academic standards for civics and government, economics, geography, history and personal finance. Everything here was downloaded on **2026-10-23** and is committed in `source/`, each PDF with a `pdftotext -layout` `.txt` beside it.

## Sources (in `source/`)

PDE's SAS downloads page is https://www.pdesas.org/Standard/StandardsDownloads; STEELS is on https://pdesas.org/Page/Viewer/ViewPage/58/?SectionPageItemId=12998. SAS gives every file a changing link (`files5.pdesas.org/<token>/Download.ashx`), so `fetch.sh` reads the page and picks each file by its visible title. The dates below are the ones printed on each cover.

| File | Document | Edition on the cover |
| --- | --- | --- |
| `pacore-math.pdf` | Academic Standards for Mathematics, Grades Pre K to High School (PA Core) | March 1, 2014 |
| `pacore-ela-prek-5.pdf` | Academic Standards for English Language Arts, Grades Pre K-5 (PA Core) | March 1, 2014 |
| `pacore-ela-6-12.pdf` | Academic Standards for English Language Arts, Grades 6-12 (PA Core) | March 1, 2014 |
| `steels-2023.pdf` | Science, Technology & Engineering, and Environmental Literacy & Sustainability (STEELS) Standards, K-12 | May 2023 (SAS title "STEELS Standards Revised") |
| `civics-primary.pdf` | Academic Standards for Civics and Government, Elementary Standards, Grades Pre-K-3 | July 2010 |
| `civics-elementary.pdf` | Civics and Government, Elementary Standards, Grades 3-8 | June 1, 2009 FINAL |
| `civics-secondary.pdf` | Civics and Government, Secondary Standards, Grades 9, 12 (with US History 1850-Present, World History 1450-Present and Civics and Government course columns) | June 1, 2009 FINAL |
| `geography-primary.pdf`, `geography-elementary.pdf`, `geography-secondary.pdf` | Academic Standards for Geography, the same three levels | July 2010 FINAL; June 1, 2009 FINAL; June 1, 2009 FINAL |
| `history-primary.pdf`, `history-elementary.pdf`, `history-secondary.pdf` | Academic Standards for History, the same three levels | May 2012 FINAL; June 1, 2009 FINAL; June 1, 2009 FINAL |
| `economics-2026.pdf` | Academic Standards for Economics, Grades K-12 | January 2024. Every page is headed "22 Pa. Code Chapter 4, Appendix C-1 (#006-354) Proposed Rulemaking"; the SAS link is titled "(Takes effect on July 1, 2026)" |
| `personal-finance-2026.pdf` | Academic Standards for Personal Finance, Grades K-12 | No date on the cover. Every page says "The Academic Standards for Personal Finance in 22 Pa. Code Chapter 4, Appendix F take effect on July 1, 2026." |

The older Economics (Primary, Elementary, Secondary) documents on the same page are marked "Sunset as of 6/30/2026" and are not used. The PA Core "Reading for" and "Writing for History and Social Studies, 6-12" files (and the science and technical subjects ones) are on the page too and are not used.

### What the documents say about their own status

- **Eight of the nine civics, geography and history documents** carry the line "These standards are offered as a voluntary resource for Pennsylvania's schools and await action by the State Board of Education." They are `civics-primary`, `civics-elementary`, `civics-secondary`, `geography-primary`, `geography-elementary`, `geography-secondary`, `history-elementary` and `history-secondary`. The three secondary documents add a second line, "The course level standards are offered as a voluntary resource for Pennsylvania's schools", and their pages carry a running "Draft ... June 1, 2009" header although the cover says FINAL.
- **`history-primary` (May 2012 FINAL) has no such line.** The three history documents say only that, "to support the intent of the Public School Code and Chapter 4, this document creates four standard categories."
- **None of the nine says it is the Chapter 4 regulation.** `FACTS.md` in this folder (section 5, read from 22 Pa. Code 4.12 and the State Board's page, not re-checked here) records that Chapter 4 still adopts the 2003 history, geography, and civics and government standards (Appendix C). So these grade-by-grade documents are PDE's later working revisions, and parent copy should say "PDE's academic standards", not "state regulation".
- **Economics** is headed "Proposed Rulemaking" (January 2024), while PDE's page calls the file "Takes effect on July 1, 2026"; `FACTS.md` has the final text published February 8, 2025. The committed file may therefore differ from the adopted Appendix C-1, so compare it with the final text before relying on a code. **Personal finance** says it takes effect July 1, 2026 in Appendix F.
- **Math and ELA** (PA Core) and **STEELS** say nothing about adoption in their front matter. `FACTS.md` has the regulatory status (PA Core in Appendix A-2 since March 1, 2014; science adopted under a different title, "Pennsylvania Integrated Standards for Science, Environment, Ecology, Technology and Engineering", effective July 1, 2025, with a 2023 revision unconfirmed). The STEELS PDF here is the one PDE serves under that name, and the codes below are its own.

## How it is built

`bash fetch.sh` downloads everything again (needs `curl` and `pdftotext`), then `python3 -I build_outcomes.py --write` rebuilds `outcomes.json`. Without `--write`, `python3 -I build_outcomes.py` checks that the committed file is exactly what `source/*.pdf` gives and exits with status 1 and a summary of the differences if not. It needs only Python 3 and `pdfplumber`, takes about 25 seconds, and reads the PDFs (the `.txt` files are there so a diff shows what changed in a new edition).

Every table in these PDFs has a code, then the standard's words beneath it, one column per grade or band. The script reads each page's words with their coordinates, finds the codes, and gives each code the words below it in its own column down to the next code (or the "eligible content" codes PDE lists under some cells: `M04.A-T.1.1.1`, `A1.1.1.1.1`, `E04.D.1.2.3`, `L.N.1.3.1`). Rotated row labels, "Intentionally blank" cells and the "(Reference ...)" notes are left out, bullets become plain sentences, and the text is cut to about 300 characters at a word boundary (22 standards). Each standard is `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`, with grades `k`, `1` to `9` and subjects `math`, `language`, `science`, `social` (40 keys), sorted in natural order of the code.

`src/content/pennsylvania/contract.ts` checks every citation with `codeCite(OUTCOMES, "Pennsylvania")`: each code a unit cites must be in `outcomes.json` under that unit's `<grade>/<subject>`, so a banded code works only in the grades the table below gives it.

## Codes and grade mapping

| Subject | Document | Code format | Grades |
| --- | --- | --- | --- |
| math | PA Core Mathematics | `CC.2.<domain>.<grade>.<strand>.<n>`, for example `CC.2.1.4.B.1`, `CC.2.1.K.A.1`. Domains 2.1 Numbers and Operations (strands A Counting and Cardinality, B Base Ten, C Fractions, D Ratios and Proportional Relationships, E The Number System, F Number and Quantity), 2.2 Algebraic Concepts (A Operations and Algebraic Thinking, B Expressions and Equations, C Functions, D Algebra), 2.3 Geometry (A), 2.4 Measurement, Data and Probability (A Measurement and Data, B Statistics and Probability) | Kindergarten to Grade 8: every standard whose code names that grade. Grade 9 is Algebra I (the Keystone course): the high school strands `CC.2.1.HS.F.*`, `CC.2.2.HS.C.*`, `CC.2.2.HS.D.*`, `CC.2.4.HS.B.*` (33 standards) |
| language | PA Core ELA | `CC.1.<strand>.<grade>.<letter>`, for example `CC.1.2.4.A`, `CC.1.3.K.B`, `CC.1.4.9-10.G`. Strands 1.1 Foundational Skills (Kindergarten to Grade 5 only), 1.2 Reading Informational Text, 1.3 Reading Literature, 1.4 Writing, 1.5 Speaking and Listening | Kindergarten to Grade 8 by grade; Grade 9 uses the 9-10 band (`CC.1.2.9-10.A`). The PDF prints an en dash in `9–10`; the file uses a hyphen |
| science | STEELS | `3.<area>.<grade or band>.<letter>`: `3.1.4.A`, `3.2.K.A`, `3.1.6-8.A`, `3.3.9-12.B`, `3.4.K-2.A`, `3.5.3-5.A`, and double letters after `Z` (`3.5.6-8.AA` to `3.5.9-12.QQ`). Areas: 3.1 life science (64 codes), 3.2 physical science (73), 3.3 Earth and space science (59), 3.4 environmental literacy and sustainability (29), 3.5 technology and engineering (142, which include the ETS engineering standards; PDE tags some with "(ETS)", left out of the code) | 3.1 to 3.3 are written per grade for Kindergarten to Grade 5, so a code belongs to that grade only; `6-8` codes belong to Grades 6, 7 and 8; `9-12` codes to Grade 9. 3.4 and 3.5 are banded everywhere, so `K-2` codes belong to Kindergarten, 1 and 2, `3-5` codes to 3, 4 and 5 |
| social | Civics and Government | `5.<standard>.<grade>.<letter>`: `5.1.4.A`, `5.3.K.G`; strands 5.1 Principles and Documents of Government (A to F), 5.2 Rights and Responsibilities of Citizenship (A to D), 5.3 How Government Works (A to J), 5.4 How International Relationships Function (A to E) | See below |
| social | Economics | `6.<area>.<band>.<letter>`: `6.1.3-5.A`, `6.2.K-2.A`, `6.4.9-12.D`. Areas 6.1 Fundamentals of Economics, 6.2 Microeconomics, 6.3 Macroeconomics, 6.4 Money and Economic Institutions | `K-2` to Kindergarten, 1, 2; `3-5` to 3, 4, 5; `6-8` to 6, 7, 8; `9-12` to Grade 9 |
| social | Geography | `7.<standard>.<grade>.<letter>`: `7.2.5.B`; 7.1 Basic Geographic Literacy (A, B), 7.2 Physical Characteristics of Places and Regions (A, B), 7.3 Human Characteristics (A), 7.4 Interactions Between People and the Environment (A, B) | See below |
| social | History | `8.<standard>.<grade>.<letter>`: `8.3.4.B`; 8.1 Historical Analysis and Skills Development (A to C), 8.2 Pennsylvania History (A to D), 8.3 United States History (A to D), 8.4 World History (A to D) | See below |
| social | Personal Finance | `17.<area>.<band>.<letter>`: `17.1.K-2.A`, `17.4.6-8.B`. Areas 17.1 Personal Finance Fundamentals, 17.2 Income, 17.3 Spending, 17.4 Saving and Investing, 17.5 Risk and Insurance, 17.6 Credit | Banded like economics |

**Civics, geography and history (the 5.x, 7.x and 8.x codes).** The Pre-K to 3 documents give Kindergarten (`K`), 1, 2 and 3 (Pre-K, `PK`, is left out). The Grades 3-8 documents give Grades 3 to 8. Grade 3 is in both: the Grades 3-8 wording is kept, and the Pre-K to 3 wording is used only for a code the Grades 3-8 document lacks. A code is valid only in the grade it names (`5.1.4.A` in Grade 4 only). The three Secondary documents all belong to Grade 9, under one key: the Grade 9 column (`5.1.9.A`), the Grade 12 column (`5.1.12.A`), and the three course columns, US History 1850-Present (`5.1.U.A`), World History 1450-Present (`5.1.W.A`) and Civics and Government (`5.1.C.A`). That gives Grade 9 social studies 276 standards, many of them worded alike across columns. Pennsylvania history (8.2) runs Kindergarten to Grade 9.

### Counts (standards per key; banded standards are counted in every grade of their band)

| Grade | Math | Language | Science | Social |
| --- | --- | --- | --- | --- |
| K | 9 | 54 | 44 | 52 |
| 1 | 10 | 56 | 43 | 58 |
| 2 | 13 | 54 | 45 | 60 |
| 3 | 14 | 56 | 56 | 89 |
| 4 | 15 | 56 | 55 | 89 |
| 5 | 12 | 56 | 56 | 90 |
| 6 | 10 | 54 | 100 | 121 |
| 7 | 9 | 54 | 100 | 123 |
| 8 | 12 | 54 | 100 | 124 |
| 9 | 33 | 54 | 118 | 276 |

2 484 entries in all, 1 820 distinct codes (math 137, language 548, science 367, social 768).

## Code clean-up

PDE's PDFs have typing slips. The script keeps the code a column and its neighbours show, and a mismatch is an error, not a silent guess:

- Trailing periods in civics, geography and history (`5.1.K.A.`) are dropped. The en dash in banded ELA codes becomes a hyphen.
- Math `C.2.3.4.A.2` is `CC.2.3.4.A.2`; ELA `CC.1.4.5G` is `CC.1.4.5.G`; STEELS `3.5.6-8LL` and `3.5.9-12PP` are `3.5.6-8.LL` and `3.5.9-12.PP`.
- Geography Pre-K to 3: `7.1.1A.` and `7.1.71B.` (both in the Grade 2 column) are `7.1.2.A` and `7.1.2.B`; `7.4.4.PK.A.` is `7.4.PK.A`. History Pre-K to 3: `8.3.3PK.C.` is `8.3.PK.C`, and `8.2.8.B.` printed in the Grade 3 column is `8.2.3.B`.
- A few blank ("Intentionally blank") cells in the civics Pre-K to 3 document carry codes for other grades (`5.3.4.H.` to `5.3.7.J.`); they hold no standard and are skipped.

## Checking record

- Every code printed in each `.txt` is in `outcomes.json`, apart from what is left out on purpose (listed under Known gaps) and the "Intentionally blank" cells.
- A code's column fits its grade: in the math, ELA and STEELS documents every code with the same grade token sits at the same x position on every page, and in the civics, geography and history documents the column order was checked page by page (the build stops if a code names a grade its document does not have).
- 2 461 of the 2 462 texts that were not cut at 300 characters appear word for word in a plain `pdftotext -raw` of the same PDFs. The exception, `3.2.9-12.A`, reads correctly in the `-layout` text (the raw text splits its lines differently). A scan for page footers, section headings, eligible-content codes and "Intentionally blank" in the texts finds none.

## Known gaps

- **Math Grade 9** is the Algebra I strands only, not the whole high school list: geometry (`CC.2.3.HS.A.*`) is left out. Seven of the 33 standards list no Algebra I eligible content in the PDF (`CC.2.1.HS.F.6`, `F.7`, `CC.2.2.HS.D.4`, `CC.2.2.HS.C.7` to `C.9`, `CC.2.4.HS.B.6`: complex numbers, trigonometry, polynomial zeros, conditional probability) and come from the strands' Algebra II (`A2.*`) or geometry (`G.*`) eligible content or from none; they are in only because the whole strand is.
- **Left out on purpose:** Pre-K in every subject; the Mathematical Practices; PDE's Eligible Content codes (`M04.A-T.1.1.1`, `E04.D.1.2.3`, `A1.1.1.1.1`); ELA Grades 11-12; the PA Core Reading and Writing for History and Social Studies and Science and Technical Subjects standards; Career Education and Work, Family and Consumer Sciences, Health, and the arts.
- **STEELS** text is the performance expectation as the tables print it, without "Students who demonstrate understanding can" (the table heading says it once), the clarifying statements, assessment boundaries or Foundation Boxes, none of which are in the PDF. The regulation's wording and codes may differ (see status above).
- **Social studies:** the civics, geography and history documents are voluntary working revisions (2009 to 2012), not the Chapter 4 text, so grade-by-grade codes such as `5.1.4.A` do not exist in the regulation. The economics file is the proposed text. Grade 9 mixes the grade, the three courses and Grade 12 into one key, because the Secondary documents are written for Grades 9 to 12 and by course.
- **Pennsylvania history and Native nations content** is for the plan and content writers; `FACTS.md` has what is confirmed. No federally recognized tribe resides in Pennsylvania, so Tribal content stays light, in the present tense, and needs partner review.

## Reporting, state tests and privacy

Facts below are from `FACTS.md` (read 2026-10-23, URLs there).

- **Report cards:** no statewide scale was found (22 Pa. Code Chapter 4 leaves curriculum and grading to each school entity), so the framework uses the same four practice steps as the other states.
- **State tests:** the PSSA (English language arts and math in grades 3 to 8, science in grades 5 and 8, online, usually spring, four performance levels Advanced, Proficient, Basic and Below Basic) and the Keystone Exams (Algebra I, Literature and Biology). Parents can review a test and ask in writing for a religious-belief excusal (22 Pa. Code 4.4(d)(4)); no other opt-out was confirmed. No third-grade retention law was found; Act 47 of 2025 requires reading screening in kindergarten to grade 3. The names of the five graduation pathways are not confirmed from a PDE page, so the guide doesn't list them.
- **Competencies page:** the Pennsylvania Career Ready Skills (optional SEL progressions), not a binding standard.
- **Privacy:** Pennsylvania has no student online privacy statute for technology providers (Senate Bill 378 was laid on the table on 2026-06-03); breach notification laws apply (Act 151 of 2022 for vendors, "following discovery"; Act 33 of 2024). `/privacy/` and `docs/school/` say so without promising a number of days the law doesn't set.
- **Tribal content:** no federally recognized tribe resides in Pennsylvania; content stays light, present tense, and names nations by their own names.
