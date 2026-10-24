# New Jersey: sources and checking record

New Jersey (`us-nj`, slug `new-jersey`) follows the New Jersey Student Learning Standards (NJSLS), adopted by the New Jersey State Board of Education and published by the New Jersey Department of Education (NJDOE, https://www.nj.gov/education/standards/). Checked October 24, 2026.

## Sources (in `source/`)

nj.gov allows scripted downloads, so `fetch.sh` downloads every document, makes the text extracts (pandoc for the Word files, `pdftotext -layout` for the PDFs) and records the hashes in `SHA256SUMS`.

| File | Document | URL (under `https://www.nj.gov/education/standards/`) |
| --- | --- | --- |
| `2023_NJSLS_Mathematics.docx` | NJSLS for Mathematics (adopted 2023, in schools from 2024-25) | `math/Docs/2023_NJSLS_Mathematics.docx` |
| `NJSLS_Mathematics_Crosswalk_2016_to_2023.docx` | What changed from the 2016 math standards | `math/Docs/` |
| `2023_NJSLS_ELA.docx` | NJSLS for English Language Arts (adopted 2023, in schools from 2024-25) | `ela/Docs/2023_NJSLS_ELA.docx` |
| `NJSLS_ELA_Crosswalk_2016_to_2023.docx` | What changed from the 2016 ELA standards | `ela/Docs/` |
| `2026_NJSLS_Science.docx` | NJSLS for Science (readopted June 3, 2026; NGSS performance expectations) | `science/Docs/2026_NJSLS_Science.docx` |
| `NJSLS-Science_K-12.pdf` | The earlier K-12 science edition, for comparison | `science/Docs/NJSLS-Science_K-12.pdf` |
| `2020NJSLS-SS_by_GradeBand.pdf`, `2020NJSLS-SS_by_Standard.pdf` | NJSLS for Social Studies (2020) | `socst/docs/` |
| `DiversityInclusionLaw.PDF` | P.L. 2021, c.32 (diversity and inclusion instruction) | `socst/docs/DiversityInclusionLaw.PDF` |
| `2020NJSLS-CLKS.pdf` | Career Readiness, Life Literacies, and Key Skills (2020) | `clicks/Docs/2020NJSLS-CLKS.pdf` |
| `2020NJSLS-9.1FinancialLiteracy.pdf` | Standard 9.1, Personal Financial Literacy | `clicks/Docs/2020NJSLS-9.1FinancialLiteracy.pdf` |
| `PL2019-c494.txt` | P.L. 2019, c.494 (N.J.S.A. 56:8-215 to 56:8-221), the student online privacy law, as text | `https://pub.njleg.gov/bills/2018/PL19/494_.HTM` |
| `assessment-page.txt`, `statewide-schedule-2025-26.txt` | NJDOE's assessment page and 2025-26 testing schedule, saved as text for the state tests guide | `https://www.nj.gov/education/assessment/` |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly: every coded standard becomes `{"idx": code, "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/new-jersey/contract.ts`. The parser leaves out only the sample codes the documents print as examples (`6.1.2.CivicsCP.*`, `9.1.5.CT.1`).

## Codes

- **Mathematics (2023):** Common Core codes with cluster letters, `4.NBT.A.1`. The 2023 revision split measurement and data into Measurement (`4.M.B.4`) and Data Literacy (`4.DL.A.1`), added money in Kindergarten and Grade 1 (`K.M.B.3`), and moved comparing rational and irrational numbers to Grade 8. Grade 9 cites the high school codes (`A.SSE.A.1`, `F.IF.B.4`).
- **English language arts (2023):** strand, sub-strand, grade and number: reading literature and informational text (`RL.CR.4.1` close reading, `RI.AA.4.7` author's argument), writing (`W.AW.4.1`), speaking and listening (`SL.PE.4.1`) and language, which holds the foundational reading skills (`L.RF.2.3`), writing foundations (`L.WF.3.2`) and vocabulary (`L.VL.4.2`, `L.VI.4.3`). Grade 9 cites the Grades 9-10 band, written with an en dash as NJDOE prints it (`RI.CI.9–10.2`).
- **Science (readopted 2026):** NGSS codes (`4-PS3-2`); middle school `MS-` is one band, placed like California's integrated model; Grade 9 cites `HS-`.
- **Social studies (2020):** standard, band, strand and number: `6.1.2.CivicsDP.1`, `6.1.5.HistoryCC.3`. The K-2 geography codes are printed with a dot inside the strand (`6.1.2.Geo.SV.1`), and the parser keeps them that way. Grades 6 to 8 are United States history `6.1.8.*` (eras 3 to 5, `6.1.8.HistoryCC.4.b`) and world history `6.2.8.*` (eras 1 to 4, `6.2.8.GeoSV.2.a`); active citizenship is `6.3.*`. Grade 9 cites the high school codes (`6.1.12.CivicsPI.2.a`, `6.2.12.*`, `6.1.12.EconNE.9.a`).
- **Personal financial literacy (2020):** `9.1.2.*`, `9.1.5.*`, `9.1.8.*` and `9.1.12.*` (`9.1.5.PB.1`, `9.1.12.CDM.8`), listed under social studies.

## Placement

- Math, English language arts and science follow California's placement, which teaches the same Common Core and NGSS standards, with New Jersey's codes and without California's own additions. Money in Kindergarten and Grade 1 uses New York's coin units (`ny-k-coins`, `ny-g1-coins`).
- California's science units that name California places are replaced by `nj-` copies with New Jersey examples (`units/science-g*.ts`); other borrowed units that name another state's places are filtered copies (`localCopy`, `units/copies-g*.ts`).
- Social studies: general units in Kindergarten to Grade 3, with New Jersey's symbols (1) and its land, communities and local government (3); **New Jersey studies in Grade 4** (all New Jersey's own: the Lenape, the colony, the Revolution, a growing state, a timeline, governing New Jersey and its economy); early United States history (5); the ancient world (6); world history from the Middle Ages to the age of revolutions (7); the founding through Reconstruction, with New Jersey and the nation, a timeline and the New Jersey Plan (8); and civics with New Jersey's three constitutions, the United States government, personal finance and economics (9).
- `new-jersey.test.ts` checks that no borrowed unit names another state's places outside US history and civics (`OTHER_STATE` in `units/kit.ts`) and that no other state's Tribal units are borrowed.

## Guides

`src/content/new-jersey/guides.ts`: the hub, grade notes for Kindergarten to Grade 9, the six Life Literacies and Key Skills (NJSLS-CLKS 9.4: Creativity and Innovation, Critical Thinking and Problem-Solving, Digital Citizenship, Global and Cultural Awareness, Information and Media Literacy, Technology Literacy; `/guides/new-jersey/life-literacies/`) and the state tests (`/guides/new-jersey/state-tests/`): the NJSLA, adaptive in English language arts and math since spring 2026 (English language arts in grades 3 to 9, math in 3 to 8 and high school courses), NJSLA-Science in grades 5, 8 and 11, the NJGPA graduation test in grade 11 and Dynamic Learning Maps; the 2026 window was April 27 to May 29, and the State Board set the adaptive tests' performance levels in September 2026. Dates point to NJDOE.

## Privacy

P.L. 2019, c.494 (approved January 21, 2020; N.J.S.A. 56:8-215 to 56:8-221) bars an operator of a K-12 online service from targeted advertising, selling or renting student information, building a profile except for K-12 school purposes, and disclosing it except as listed; it requires reasonable security and deletion at the request of the school or district, or of a student who has reached the age of majority. A violation is an unlawful practice under the Consumer Fraud Act (56:8-220). Breach notice falls under N.J.S.A. 56:8-163 (the most expedient time possible). `/privacy/` and `docs/school/README.md` state our commitments.

## Known gaps

- **English language arts:** standards that need writing, speaking, listening or reading fluency have no unit.
- **Social studies:** the Amistad law (African American history), the Holocaust and genocide mandate and the diversity and inclusion law (P.L. 2021, c.32) are touched on in several units (slavery and segregation in New Jersey, civil rights) but have no unit of their own; Grade 9 covers civics, economics and personal finance, not the rest of the `6.1.12` and `6.2.12` history standards.
- **Lenape content** is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
