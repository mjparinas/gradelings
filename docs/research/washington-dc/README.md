# Washington, DC: sources and checking record

Washington, DC (`us-dc`, slug `washington-dc`) follows the standards approved by the DC State Board of Education and published by the Office of the State Superintendent of Education (OSSE, https://osse.dc.gov/service/dc-standards-learning). Checked October 28, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below; `SHA256SUMS` records them as committed, and each PDF has a `.txt` extract (`pdftotext -layout`). OSSE publishes the Common Core and the NGSS by linking to the national documents rather than as DC files with their own codes, so those standards come from the Achievement Standards Network (ASN, https://asn.desire2learn.com), which publishes each document statement by statement with its code, text and grade levels. The 2023 social studies standards are DC's own and come from OSSE's PDF.

| File | Document |
| --- | --- |
| `asn-math-D2472998.json` (+ `-document.json`) | Common Core State Standards for Mathematics (2010), DC's mathematics standards, with the eight Standards for Mathematical Practice |
| `asn-ela-D2473702.json` (+ `-document.json`) | Common Core State Standards for English Language Arts & Literacy (2010) |
| `asn-science-D2599182.json` (+ `-document.json`) | Next Generation Science Standards (2013), DC's science standards |
| `osse-dc-social-studies-standards.pdf` | DC Social Studies Standards (2023), English, Kindergarten to high school |
| `osse-dc-social-studies-standards-spanish.pdf` | The same standards in Spanish (kept for checking wording; not parsed) |
| `osse-sboe-sr23-7-approve-social-studies-standards.pdf` | State Board of Education resolution SR23-7, June 21, 2023, approving the social studies standards |
| `osse-standards-of-learning.html`, `osse-social-studies.html`, `osse-ngss.html` | OSSE's pages for the standards of learning, social studies and the NGSS |
| `osse-dc-cape.html` | OSSE's DC CAPE page: DC ELA and DC Math in grades 3 to 8 and high school courses, DC Science in grades 5 and 8 and high school biology, five performance levels, the MSAA alternate assessment |
| `osse-dc-cape-introduction-for-families.pdf` | DC CAPE introduction for families (the name from 2024, comparable with PARCC, score reports in the fall) |
| `osse-dc-cape-ela-performance-levels.pdf`, `osse-dc-cape-math-performance-levels.pdf` | Performance level ranges by grade (scale 650 to 850; Level 4 starts at 750) |
| `dc-code-38-chapter-8b-student-digital-privacy.html`, `dc-code-38-831.01.html` to `.06.html` | D.C. Code title 38, chapter 8B, Protecting Students Digital Privacy (§§ 38-831.01 to 38-831.06) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,650 standards: math 385, language 414, science 338, social studies 513 for Kindergarten to Grade 9): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/washington-dc/contract.ts`. The script also reads the high school social studies courses (WH2, US2, GC and DC History and Government) to check the numbering, but only World History and Geography I (WH1) is written to Grade 9.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards with a hyphen, `A-SSE.1`, `F-IF.4` (ASN prints `A.SSE.1`).
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** NGSS performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** the grade or course and the standard's number as printed, `K.21`, `3.20`, `8.42`, `WH1.1`. Grade 9 cites World History and Geography I (`WH1`), the first high school course. `washington-dc.test.ts` checks every social studies citation names its own grade.
- **Printing quirks:** the English PDF skips 5.27 (the Spanish edition has it; the English numbering jumps from 5.26 to 5.28) and prints US2.56 as "US.56". `build_outcomes.py` lists both in `NUMBERING_GAPS` and fails on any other gap.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because DC teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `dc-` copies with DC examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `dc-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the course themes of the 2023 standards (see `src/content/washington-dc/plan/social.ts`).

## Guides

- **Mathematical Practices** (`/guides/washington-dc/math-practices/`): the eight Standards for Mathematical Practice in the mathematics standards.
- **DC CAPE** (`/guides/washington-dc/dc-cape-tests/`): DC ELA and DC Math (grades 3 to 8, ELA I and II, Algebra I, Geometry and Algebra II), DC Science (grades 5 and 8 and high school biology), the 650 to 850 scale and five performance levels (Level 4 met expectations, Level 5 exceeded), the MSAA, and the move from PARCC (2015 to 2023), from OSSE's page, the introduction for families and the level tables.

## Schools

- D.C. Code §§ 38-831.01 to 38-831.06 (the Protecting Students Digital Privacy Act) set the rules for operators of sites and apps used for school purposes: no targeted advertising, no profiles except for school purposes, no selling or renting, disclosure only as allowed, reasonable security, and deletion when the school or LEA asks. `src/content/washington-dc/schools.ts` states our commitments under it.
