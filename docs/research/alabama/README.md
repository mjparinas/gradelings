# Alabama: sources and checking record

Alabama (`us-al`, slug `alabama`) follows the Alabama Course of Study, the minimum required content adopted by the Alabama State Board of Education and published by the Alabama State Department of Education (ALSDE) under Code of Alabama 1975, section 16-35-4. Checked October 14, 2026.

## Sources (in `source/`)

alabamaachieves.org allows scripted downloads, and `fetch.sh` gets the same files again:

| File | Document | URL |
| --- | --- | --- |
| `math.pdf` | 2019 Alabama Course of Study: Mathematics | https://www.alabamaachieves.org/wp-content/uploads/2022/09/AS_2022923_CAS-2019-Alabama-Mathematics-COS_V1.0.pdf |
| `ela.pdf` | 2021 Alabama Course of Study: English Language Arts | https://www.alabamaachieves.org/wp-content/uploads/2023/06/CAS_202353_2021-Alabama-Course-of-Study-English-Language-Arts_V1.0.pdf |
| `science.pdf` | 2023 Alabama Course of Study: Science (version 1.1) | https://www.alabamaachieves.org/wp-content/uploads/2024/08/AS_20240816_2023-Alabama-Course-of-Study-Science_V1.1.pdf |
| `social.pdf` | 2024 Alabama Course of Study: Social Studies (adopted December 2024, in schools from 2026-27) | https://www.alabamaachieves.org/wp-content/uploads/2025/01/AS_20250110_2024-Alabama-Course-of-Study-Social-Studies_V1.0.pdf |

The subject pages that link them are https://www.alabamaachieves.org/academic-standards/ (mathematics, english-language-arts, science, social-studies). The `.txt` files are `pdftotext -layout` extracts of each PDF.

`build_outcomes.py` rebuilds `outcomes.json` from the PDFs (run with `--write`; without it, it checks the file matches). Each content standard is `{"idx": code, "content": text}` under `<grade>/<subject>`. Standards are read in order (1, 2, 3...) from each grade's "Content Standards" section, so stray numbers are skipped; sub-standards (4a, 15.b) belong to their standard and are not listed apart. The `content` text is the standard's first sentences as laid out in the PDF, enough to recognize it; read the PDF for the full wording.

## Codes

Alabama numbers its content standards within each grade or course, so a code is the grade and the number.

- **Math (2019):** `4.12`, Kindergarten `K.3`. Alabama's standard pathway teaches Geometry with Data Analysis in Grade 9 and Algebra I with Probability in Grade 10 (the accelerated pathway moves Algebra I into Grade 8), so Grade 9 lists both courses: `GDA.5` and `AIP.5`.
- **English language arts (2021):** `4.15`, plus each grade band's recurring standards, listed for every grade in the band (`4.R2` is "use context clues").
- **Science (2023):** `4.3`. Middle school is by discipline: Grade 6 Earth and Space Science, Grade 7 Life Science, Grade 8 Physical Science. Grade 9 cites Biology (`BIO.3`), the usual Grade 9 science course.
- **Social studies (2024):** `4.7`. Each grade is one course: Living and Working Together in Family and Community (K), in Community and State (1), in State and Nation (2); Alabama in American History and Government I: Geography and Settlement (3), II: Colonies to 1900 (4) and III: Twentieth Century to Present (5); Making a New Nation: United States Beginnings and Civic Foundations (6); World History and Geography: Geographic Principles and Ancient Civilizations (7), Middle Ages to the Enlightenment (8) and Age of Revolution to Present (9).

## Reporting and tests

There is no statewide report-card scale, so the framework uses four practice steps (Beginning, Approaching, Meeting, Exceeding), like the other states. The state tests are the Alabama Comprehensive Assessment Program (ACAP) Summative: English language arts and math in grades 2 to 8, science in grades 4, 6 and 8, reported in four levels with Levels 3 and 4 proficient, plus ACAP Alternate. The Alabama Literacy Act ties promotion from 3rd to 4th grade to grade-level reading, with other ways to show it and good-cause exemptions. Dates change, so the guide points to ALSDE.

## Student privacy

Alabama has no K-12 student privacy statute of its own; schools work under FERPA and the State Board of Education's Data Use Governance Policy (https://www.alabamaachieves.org/wp-content/uploads/2021/01/Data-Use-Governance-Policy.pdf), which has each district adopt a student records policy and share data with providers only under agreements. Many districts belong to the Student Data Privacy Consortium's Alabama Student Privacy Alliance. The Alabama Personal Data Protection Act (HB 351, signed April 16, 2026, in force May 1, 2027) exempts data FERPA covers and handles a known child's data under COPPA.

## Known gaps

- Grades 3 to 5 social studies are mostly Alabama's own units. Content about the Muscogee (Creek), Cherokee, Choctaw, Chickasaw and the Poarch Band of Creek Indians is light and in the present tense, with nothing sacred or ceremonial.
- Social studies cites the 2024 Course of Study, which schools begin in 2026-27; some schools may still teach the 2010 standards this year.
- The social studies practices, the Student Mathematical Practices and science and engineering practices aren't cited on their own; units cite content standards.
- Standards on research, speaking, presenting and hands-on investigation have few or no units, because they are practiced in class.
- Math standards with no unit yet include building and composing shapes (K.22, K.23), slicing solids (7.19), digital signals in science (8.18) and, in Grade 9, transformations, congruence proofs, arc length and cross-sections (GDA.6-8, 16, 20-21, 23-26, 29-31, 34, 38). Grade 9 also cites a few Algebra I with Probability standards for students on that path.
- English language arts standards practiced by hand or aloud (handwriting and cursive, letter writing, recordings and presentations) have no unit.
- Borrowed units that name another state's places are replaced by `al-` copies without those questions (`copyOf`), for example `al-g2-earth-changes` and `al-g6-earth-history`.
