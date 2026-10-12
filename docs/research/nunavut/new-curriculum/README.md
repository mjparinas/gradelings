# Nunavut Curriculum, Kindergarten to Grade 6 (2025)

The made-in-Nunavut curriculum (Government of Nunavut, Department of Education, © 2023, in schools from 2025-26). Kindergarten and Grade 1 have used it since 2025-26 and Grades 2 and 3 since 2026-27; one more grade follows each September.

## Files
- `source/`: the Department's K–6 subject documents as text (converted from the PDFs by the owner, October 2026; gov.nu.ca blocks automated downloads) and the K–6 Curriculum Orientation Guide (PDF).
  - Subjects Gradelings teaches: `mathematics-k6-2025.txt`, `english-1st-language-k6-2025.txt`, `science-k6-2025.txt`, `social-studies-k6-2025.txt`.
  - Kept for reference, not built: English 2nd Language, Physical Education Health and Wellness, Arts, Inuktut 1st Language (and Enhanced), Inuktitut and Inuinnaqtun 2nd Language.
- `build_outcomes.py`: reads the "Learning Outcomes checklists" at the back of the four taught subjects and writes `outcomes.json`, every outcome by grade with its code, strand and text. Run it again after replacing a source file.
- `outcomes.json`: the generated outcomes.

## How outcomes are coded
`<grade>.<strand>.<group>.<number>` in math, English and science (`K.N.1.1`, `2.OC.2.3`, `1.LS.1.2`), and `<grade>.<strand>.<number>` in social studies (`3.C.4`).

| Subject | Strands |
| --- | --- |
| Mathematics | Number (N), Patterns and Relations (PR), Shape and Space (SS), Statistics and Probability (SP) |
| English Language Arts, 1st Language | Oral Communication (OC), Reading (R), Writing and Representing (W) |
| Science | The Material World (MW), Physics (P), Earth and Space (ES), Life Sciences (LS) |
| Social Studies | Communities (C), Stories (S), Land (L) |
