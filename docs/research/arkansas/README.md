# Arkansas: sources and checking record

Arkansas (`us-ar`, slug `arkansas`) follows the Arkansas Academic Standards, adopted by the Arkansas State Board of Education and published by the Arkansas Department of Education, Division of Elementary and Secondary Education (DESE), at https://dese.ade.arkansas.gov/Offices/learning-services/curriculum-support/standards-and-courses. Checked October 14, 2026.

## Sources (in `source/`)

dese.ade.arkansas.gov allows scripted downloads, and `fetch.sh` gets the same files again. The site leaves out its intermediate certificate, so `fetch.sh` adds it from Sectigo before downloading. Every file is at `https://dese.ade.arkansas.gov/Files/<name>`:

| File | Document | Name on the site |
| --- | --- | --- |
| `math-k-8.pdf` | Arkansas Mathematics Standards (2023): Kindergarten to Grade 8, Algebra I and Geometry | `AR_2023_K-8,_Alg,_Geo_Math_Standards_LS_6.21.23_LS.pdf` |
| `ela-k-12.pdf` | Arkansas English Language Arts Standards (2023), Kindergarten to Grade 12 | `AR_2023_K-12_ELA_Standards_LS_7.2023_LS.pdf` |
| `science-k.pdf` to `science-8.pdf` | Arkansas K-12 Science Standards, one document per grade | `Kindergarten-general_science_LS.pdf`, `First_Grade_general_science_LS.pdf` … `Eighth_Grade_general_science_LS.pdf` |
| `science-physical.pdf`, `science-biology.pdf`, `science-chemistry.pdf`, `science-physics.pdf` | High school science courses | `Physical_Science_Integrated_Standards_LS.pdf`, `Biology_Integrated_Science_Standards_LS.pdf`, `Chemistry_Integrated_Science_Standards_LS.pdf`, `Physics_Science_Standards_LS.pdf` |
| `social-k-4.pdf`, `social-5-6.pdf`, `social-7.pdf`, `social-8.pdf` | Arkansas Social Studies Academic Standards (2022) | `AR_Grades_K-4_Social_Studies_Standards_2022_LS.pdf`, `AR_Grades_5-6_…`, `AR_Grade_7_…`, `AR_Grade_8_…` |
| `social-arkansas-history-7-8.pdf` | Arkansas History, Grades 7-8 (2022) | `AR_Grades_7-8_Arkansas_History_Standards_2022_LS.pdf` |
| `social-civics.pdf` | Civics (2022), the high school course this app teaches in Grade 9 | `AR_Civics_Standards_2022_LS.pdf` |

The `.txt` files are `pdftotext -layout` extracts of each PDF. `build_outcomes.py` rebuilds `outcomes.json` from them (run with `python3 -I build_outcomes.py --write`; without `--write` it checks the file matches). Each standard is `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`; `content` is the standard's text cut to about 300 characters, enough to recognize it. Some science pages use a font whose characters sit 29 code points low; the script shifts those lines back. Kindergarten to Grade 4 social studies is laid out in five columns, one per grade, and a few cells came out empty or cut (`E.1.3.9`, `E.1.4.9`, `H.1.4.7`); units don't cite those.

## Codes

- **Math (2023):** grade, strand and number: `4.NPV.3`, `K.CAR.2`. Kindergarten to Grade 5 strands are NPV (number and place value), CAR (computation and algebraic reasoning), GM (geometry and measurement) and DA (data analysis); from Grade 6 they are NCC, PR, ALG, GM, SP and FN. Grade 9 is Algebra I (`A1.LFE.3`; EX, FN, LFE, QFE, EFE and SP), Arkansas's usual 9th grade course.
- **English language arts (2023):** grade, strand, number and sub-strand: `4.RC.8.RL`, `K.FR.4.CP`, `6.W.14.R`, `9.L.12.C`. Strands are FR (foundational reading), RC (reading comprehension), V (vocabulary, no sub-strand: `4.V.2`), W (writing), L (language) and CC (communication and collaboration).
- **Science:** NGSS codes by grade (`4-PS3-1`). Middle school is placed by grade (`6-LS1-1`, `7-PS1-2`, `8-PS2-1`). Grade 9 cites the high school courses a ninth grader may take: Physical Science (`PSI-PS2-1`), Biology (`BI-LS1-1`), Chemistry (`CI-PS1-1`) and Physics (`P-PS2-1`). Codes ending in `AR` mark Arkansas clarifications; units cite the base codes.
- **Social studies (2022):** strand and standard, grade, number: `C.1.4.2`, `E.1.K.7`, `G.2.5.1`, `H.2.6.1`. Kindergarten to Grade 4 are integrated (civics, economics, geography and history, with Arkansas in each). Grade 5 is World Geography, Grade 6 World History, Grade 7 United States History to about 1850 and Grade 8 since 1850. The Grades 7-8 Arkansas History course (`H.1.ARH.4`) is listed under both grades, because districts teach it in either. The Grade 7 document numbers its geography standards `G.1.5.x`; they are stored as Grade 7 standards. Grade 9 is Civics (`C.3.CIV.5`), as in the other states.

## Reporting and tests

There is no statewide report-card scale for kindergarten to 8th grade, so the framework uses four practice steps (Beginning, Approaching, Meeting, Exceeding), like the other states. High school courses use Arkansas's uniform grading scale (A 90 to 100). The state tests are ATLAS, the Arkansas Teaching and Learning Assessment System: English language arts, math and science in grades 3 to 10 each spring (no 9th grade science test; end-of-course math tests in high school), plus literacy and math checks in kindergarten to 2nd grade, reported in four levels with Levels 3 and 4 proficient. Under the LEARNS Act (2023), from the end of the 2025-26 school year a 3rd grader needs Level 2 or above on the ATLAS reading test to be promoted, unless a good-cause exemption applies (DESE, https://dese.ade.arkansas.gov/Offices/learning-services/third-grade-promotion). Dates change, so the guide points to DESE.

## Student privacy

The Arkansas Student Online Personal Information Protection Act (2015, Arkansas Code 6-18-109) sets duties for operators of services used for K-12 school purposes: no targeted advertising, no profiles beyond school purposes, no sale, disclosure only as the law allows, reasonable security and deletion on the school's request. `/privacy/` and `docs/school/README.md` state those commitments. Arkansas also passed the Children and Teens' Online Privacy Protection Act (HB 1717, 2025, in force July 1, 2026) for services directed at children and teens.

## Known gaps

- Arkansas has no math pattern standards in Kindergarten to Grade 2, so pattern units are left out there.
- Math standards with no unit yet include position words, making shapes and pennies and dimes in Kindergarten (K.GM.1, K.GM.5, K.GM.8), perimeter and time intervals in Grade 2 (2.GM.7, 2.GM.10, 2.GM.11), four-digit place value and most fraction number-line standards in Grade 3 (3.NPV.2, 3.NPV.3, 3.NPV.7 to 3.NPV.9), dependent and independent variables and slicing solids in Grade 7 (7.ALG.4, 7.ALG.5, 7.GM.4), and in Algebra I radicals, domain and range, absolute value and most graphing of quadratic and exponential functions.
- English language arts standards practiced by hand or aloud (handwriting, oral fluency, articulation, presentations and recitation) have no unit, and nor do the literature-period standards (world, American and Arkansas literature).
- Science standards with no unit yet include biodiversity in habitats (2-LS4-1) and some Earth science in Grades 2 to 4 and 6 and 7 that other states' units cover only with their own places.
- Social studies standards with no unit or only part of one are mostly inquiry, perspective and current-events standards practiced in class, plus flag etiquette and currency in Grades 5 and 6, pre-Columbian North America in Grade 7 (`H.3.7.1`), citizenship and naturalization in Civics (`C.3.CIV.2` to `C.3.CIV.4`), amending the Constitution (`C.4.CIV.2`) and criminal and civil law (`C.4.CIV.6`). Grade 6 world history has no Arkansas-written units.
- Caddo, Osage and Quapaw content (Grades 4 and 7) is light, in the present tense, with nothing sacred or ceremonial.
- The practices (problem solving, science and engineering practices, social studies inquiry) aren't cited on their own; units cite content standards.
