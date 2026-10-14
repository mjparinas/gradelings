# Texas research record

**Source:** the Texas Education Agency (TEA), tea.texas.gov, read 14 October 2026. Texas is the fourth US state, after Washington, Oregon and California, and reuses their US layer: US English, US dollars and the consent rules.

Texas's standards are the **Texas Essential Knowledge and Skills (TEKS)**, adopted by the State Board of Education as rules in Title 19 of the Texas Administrative Code (19 TAC), Part 2. TEA publishes each subchapter as a PDF under "Laws and Rules, SBOE Rules (TAC), currently in effect":

| Subject | Rule | Edition (file) | Sections used |
| --- | --- | --- | --- |
| Math | 19 TAC Chapter 111 | Elementary adopted 2012 (`ch111a.pdf`, December 2014 update); middle school adopted 2012 (`ch111b.pdf`, July 2025 update); high school (`ch111c.pdf`, October 2015 update) | §111.2–111.7 (K–5), §111.26–111.28 (6–8), §111.39 Algebra I |
| English language arts and reading | 19 TAC Chapter 110 | Adopted 2017, in force since 2019–20 (`ch110a.pdf`, `ch110b.pdf`, August 2019 update; `ch110c.pdf`, August 2020 update) | §110.2–110.7 (K–5), §110.22–110.24 (6–8), §110.36 English I |
| Science | 19 TAC Chapter 112 | Adopted 2021 (high school 2020), in force since 2024–25 (`ch112a.pdf`, `ch112b.pdf`, `ch112c.pdf`, August 2024 update) | §112.2–112.7 (K–5), §112.26–112.28 (6–8), §112.42 Biology |
| Social studies | 19 TAC Chapter 113 | Adopted 2022 edition, in force since 2024–25 (`ch113a.pdf`, `ch113b.pdf`, `ch113c.pdf`, August 2024 update) | §113.11–113.16 (K–5), §113.18–113.20 (6–8), §113.44 United States Government |

TEA's TEKS page: https://tea.texas.gov/curriculum-and-instruction/texas-essential-knowledge-and-skills-teks. The chapter pages, such as https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-111, link the PDFs at `https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111a.pdf` and so on.

### Grade 9

Texas has no Grade 9 in the elementary and middle school chapters, so this app's Grade 9 uses the high school course most 9th graders take: **Algebra I**, **English I** and **Biology**. For social studies the owner's US decision applies (Grade 9 is civics), so Grade 9 cites **United States Government** (§113.44), which Texas schools usually teach in 12th grade; most Texas 9th graders take World Geography Studies (§113.43), which is not used.

### Not used

- Middle School Advanced Mathematics (§111.29–111.31, adopted 2025) and the other high school courses.
- Spanish language arts and reading and English as a second language (Chapter 128), and Languages Other Than English (Chapter 114). Texas families get no French subject, as in the other states.
- The Texas College and Career Readiness Standards (Texas Higher Education Coordinating Board), which are for high school.

## How a standard is cited

A TEKS student expectation is named by grade (or course), knowledge and skills statement and letter. `3.4(A)` is 19 TAC §111.5(b)(4)(A), Grade 3 math, statement 4, expectation A. Kindergarten is `K.`; Grade 9 uses TEA's course prefixes: `A.` (Algebra I), `E1.` (English I), `B.` (Biology) and `GOV.` (United States Government). The subject comes from the course a unit sits in, so the same code (`4.2(A)`) means different things in math and social studies. A whole knowledge and skills statement (`3.4`) also counts, but units cite student expectations wherever one fits.

A Texas unit's standards are `"CODES · plain text"` (`tx()` in `src/content/texas/cite.ts`), codes joined by `"; "`. The framework contract (`src/content/texas/contract.ts`, run by `src/content/contract.test.ts`) checks every code against `outcomes.json` for the unit's own grade and subject.

The process standards that open every grade (mathematical process standards, scientific and engineering practices, social studies skills) are cited only together with content standards. They are the subject of the parent guide's "Process skills" page.

## Files

- `source/` holds the 12 TEA chapter PDFs, committed so the record survives if TEA moves or replaces them (owner, October 2026: keep the official sources even when they download freely).
- `fetch.sh [dir]` downloads them again (into `source/` by default). The site downloads without a login; the script checks each file is a PDF. Run it to check for a newer edition and commit any change.
- `build_outcomes.py [dir]` parses the PDFs into `outcomes.json`. Run it with `python3 -I`; it needs `pdftotext` (poppler-utils) and no Python packages. It takes a few seconds.
- `outcomes.json` holds `{"<grade>/<subject>": [{idx, kind, strand, content, section}]}` for Kindergarten (`k`) to Grade 9 and the subjects `math`, `language`, `science` and `social`: kind `knowledge` for a knowledge and skills statement and `expectation` for a student expectation, `strand` the statement's opening words ("Number and operations", "Geography"), and `section` the rule (`19 TAC §111.5`). 2 759 entries:

  | Grade | Math | ELAR | Science | Social studies |
  | --- | --- | --- | --- | --- |
  | K | 9 / 34 | 12 / 55 | 13 / 36 | 15 / 35 |
  | 1 | 9 / 50 | 13 / 58 | 13 / 43 | 18 / 48 |
  | 2 | 11 / 50 | 13 / 60 | 13 / 45 | 17 / 47 |
  | 3 | 9 / 53 | 13 / 63 | 13 / 45 | 16 / 47 |
  | 4 | 10 / 53 | 13 / 61 | 13 / 42 | 22 / 73 |
  | 5 | 10 / 44 | 13 / 61 | 13 / 40 | 26 / 75 |
  | 6 | 14 / 58 | 12 / 61 | 13 / 49 | 22 / 68 |
  | 7 | 13 / 48 | 12 / 61 | 14 / 52 | 23 / 73 |
  | 8 | 12 / 51 | 12 / 62 | 13 / 49 | 31 / 99 |
  | 9 | 12 / 56 (Algebra I) | 11 / 61 (English I) | 13 / 45 (Biology) | 21 / 73 (US Government) |

  (statements / student expectations)

### Parsing notes

- Text is read with `pdftotext -layout`. Running heads and feet ("Page 12 … December 2014 Update", "§111.A. Elementary") are dropped. The knowledge and skills start at the `(b)`, `(c)` or `(d)` paragraph titled "Knowledge and skills" (the letter differs by chapter) and end at the section's "Source:" note.
- A statement starts at a line beginning `(n)`, an expectation at `(A)`. A marker counts only when it is the next number or letter, and the script stops if a marker is out of order, so wrapped text that happens to start with "(3)" can't be misread. Roman-numeral parts (`(i)`, `(ii)`) are folded into their expectation's text.
- The script also stops when a section is missing or has fewer than 15 expectations.

## Report card and tests

- **Report card:** Texas has no statewide report card. Texas Education Code §28.0216 asks for grades that reflect a student's mastery and bars a required minimum grade. Many districts give number grades out of 100, often with 70 to pass; kindergartens and some elementary schools use standards-based marks. The framework uses the same four plain practice steps (Beginning, Approaching, Meeting, Exceeding) as the other states.
- **State tests:** STAAR (State of Texas Assessments of Academic Readiness): reading language arts and math in grades 3 to 8, science in 5 and 8, social studies in 8, and end-of-course tests in Algebra I, English I, English II, Biology and US History. Levels: Did Not Meet, Approaches, Meets and Masters Grade Level. House Bill 8 (signed September 2025) replaces the grades 3 to 8 tests with three shorter tests a year (beginning, middle and end of year) from 2027–28; TEA had no implementation page at the time of reading, so the guide points families to TEA.

## Schools

Texas Education Code chapter 32, subchapter D (§§32.151–32.157) governs operators of websites and apps used for school purposes: no targeted advertising, no sale or rental of student information, no profiling beyond the school's purpose, disclosure only as allowed, a security program and deletion at the district's request. `/privacy/` and `docs/school/README.md` state these commitments next to the other states'.

## Known gaps

The unit-by-unit placement and any TEKS knowledge and skills statements with no unit yet are listed in the pull request that added Texas and in the "Known gaps" list below, kept up to date as units are added.

<!-- gaps -->

## Keeping it current

The SBOE revises the TEKS on its own schedule. Social studies is under review (a new framework was being drafted in 2025–26), and math, English and science editions change less often. The yearly curriculum check should run `fetch.sh`, compare the files, rebuild `outcomes.json` and fix any citation the contract test then rejects.
