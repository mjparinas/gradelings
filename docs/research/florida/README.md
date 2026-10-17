# Florida: sources and checking record

Florida (`us-fl`, slug `florida`) follows the state academic standards the Florida State Board of Education adopts and the Florida Department of Education (FLDOE) publishes: the B.E.S.T. Standards for Mathematics and for English Language Arts, the Next Generation Sunshine State Standards (NGSSS) for Science and the State Academic Standards for Social Studies. FLDOE's site (fldoe.org) blocks scripted downloads, so the files come from CPALMS (https://www.cpalms.org), the Department's own standards and course site. Checked October 16, 2026.

## Sources (in `source/`)

| File | Document | Where it comes from |
| --- | --- | --- |
| `bestmath202607.pdf` | Florida's B.E.S.T. Standards for Mathematics, Kindergarten to Grade 12 (last revised 07/2026) | `https://cpalmsmediaprod.blob.core.windows.net/uploads/docs/standards/best/ma/bestmath202607.pdf` |
| `bestela202511.pdf` | Florida's B.E.S.T. Standards for English Language Arts, Kindergarten to Grade 12 (last revised 11/2025) | `…/best/la/bestela202511.pdf` |
| `ssstandards202607.pdf` | State Academic Standards for Social Studies, Kindergarten to Grade 12 (last revised 07/2026) | `…/best/ss/ssstandards202607.pdf` |
| `math.tsv`, `ela.tsv`, `science.tsv`, `social.tsv` | Every benchmark as code, words and date, one per line | saved from CPALMS's standards tree by `fetch_cpalms.py` |

CPALMS publishes no science book, so the NGSSS benchmarks come from its standards tree only. The `.txt` files are plain `pdftotext` extracts of the books. A PDF page prints a benchmark's words above, beside or below its code, so `build_outcomes.py` takes the words from the CPALMS files and uses the books for two things: checking that every code in the CPALMS files is printed in its book (it reports the ones that aren't) and finding which benchmarks make up the Algebra 1 and Geometry courses (the book's 9-12 course overview). `fetch.sh` downloads everything again and `python3 -I build_outcomes.py --write` rebuilds `outcomes.json` (without `--write` it checks the file matches). Each standard is `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`, with the text cut to about 300 characters.

## Codes

- **Math (B.E.S.T.):** grade, strand, standard, benchmark: `MA.4.NSO.1.1`, `MA.K.AR.1.1`. Strands are NSO (number sense and operations), AR (algebraic reasoning), M (measurement), GR (geometric reasoning), DP (data analysis and probability), FR (fractions, Grades 1 to 5, a few in 6) and F (functions, Grade 8). Grade 9 is Algebra 1 and Geometry (`MA.912.AR.3.1`, `MA.912.GR.1.1`): only the 9-12 benchmarks the book's course section prints, not the whole 9-12 list.
- **English language arts (B.E.S.T.):** `ELA.4.R.1.1`. Strands are R (reading prose and poetry, and reading informational text), C (communication), V (vocabulary) and F (foundations, Kindergarten to Grade 5; `ELA.612.F.1.1` for Grades 6 to 12). The K-12 expectations (`ELA.K12.EE.1.1`, `ELA.K12.MTR.1.1`) apply in every grade; units cite `EE` ones.
- **Science (NGSSS):** `SC.4.L.16.1`. Strands are N (nature of science), E (Earth and space), P (physical) and L (life); the letters appear after the grade. Grade 9 is the 9-12 benchmarks (`SC.912.L.14.1`) that Biology 1, Earth and Space Science and Physical Science draw on.
- **Social studies:** `SS.4.A.1.1`. Strands are A (American history), AA (African American history), CG (civics and government), E (economics), FL (financial literacy), G (geography), W (world history), HC (history of communism) and HE (Holocaust education). `SS.68.AA.1.1` counts in Grades 6 to 8. Florida teaches civics in Grade 7 and World History in Grade 9 (the grade this app uses `SS.912.W.*` and the other 9-12 strands World History draws on); 9-12 American history, psychology, sociology and the humanities are left out.

## Reporting and tests

There is no statewide report-card scale for kindergarten to 8th grade (districts report with letter grades, 1 to 4 standards-based marks, or both), so the framework uses four practice steps (Beginning, Approaching, Meeting, Exceeding), like the other states. State tests, per FLDOE's statewide assessment schedule (https://www.fldoe.org/accountability/assessments/k-12-student-assessment/), which districts set days within: the Florida Assessment of Student Thinking (FAST) in three progress monitoring windows a year (PM1 in late summer, PM2 in winter and PM3 in May), ELA reading in grades 3 to 10 and math in grades 3 to 8 (the 2026-27 schedule extends PM2 to kindergarten to 10th grade ELA and kindergarten to 8th grade math), Florida's writing test in grades 4 to 10, the Statewide Science Assessment in grades 5 and 8, and end-of-course (EOC) exams in Algebra 1, Geometry, Biology 1, Civics and U.S. History. Under section 1008.25 of the Florida Statutes, a 3rd grader who scores Level 1 on the grade 3 ELA reading test (PM3) may be held back unless a good cause exemption applies. The Civics EOC counts for 30 percent of a 7th grader's course grade (section 1003.4156). Dates change every year, so the guide points to FLDOE and the child's district.

## Student privacy

Florida's Student Online Personal Information Protection Act (section 1006.1494, Florida Statutes, created by SB 662 in 2023, in force July 1, 2023) limits what operators of sites, services and apps used for K-12 school purposes may do with a student's covered information and is enforced under the Florida Deceptive and Unfair Trade Practices Act. State Board of Education Rule 6A-1.09550 sets what districts' student data policies and vendor contracts must include. Section 1002.22 covers education records and parents' rights over them. `/privacy/` and `docs/school/README.md` state our commitments.

## Known gaps

The lists of benchmarks without a unit are in `gaps-math.txt`, `gaps-language.txt`, `gaps-science.txt`, `gaps-social-k4.txt` and `gaps-social-59.txt`.

- English language arts benchmarks that need writing, speaking, listening or oral fluency have no unit, nor do the literature-period benchmarks.
- Grade 9 is two courses in math (Algebra 1 and Geometry), the 9-12 science benchmarks and World History, because Florida students take different courses in 9th grade; 9-12 American history and the electives are not built.
- Seminole Tribe of Florida and Miccosukee Tribe of Indians of Florida content is light, in the present tense, with nothing sacred or ceremonial.
- The Mathematical Thinking and Reasoning Standards (MTRs, `ELA.K12.MTR.*`, `MA.K12.MTR.*`) and the Expectations for English Language Arts are practices, not content, so units don't cite them on their own.
