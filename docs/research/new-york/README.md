# New York research record

**Source:** the New York State Education Department (NYSED), www.nysed.gov, read 14 October 2026. New York is the fourth US state, after Washington, Oregon and California, and reuses the US layer Washington built: US English, US dollars and the consent rules.

| Subject | Standards | Edition | Cited as |
| --- | --- | --- | --- |
| Math | New York State Next Generation Mathematics Learning Standards | Adopted by the Board of Regents in September 2017, in classrooms from 2022-23 (`nys-next-generation-mathematics-p-12-standards.pdf`) | The NY code, `NY-4.NBT.1`, or a lettered part, `NY-4.NBT.2a`. Grade 9 is the **Algebra I** course, `AI-A.SSE.1`, `AI-F.IF.4` |
| English language arts | New York State Next Generation English Language Arts Learning Standards | Adopted September 2017, in classrooms from 2022-23 (`nys-next-generation-ela-standards.pdf`) | Grade, strand and number with no dots, `4R1`, `4RF3a`, `4W2`, `4SL1`, `4L4`. Reading literature and informational text share one strand (R). Grade 9 uses the 9-10 band, `9-10R1` |
| Science | New York State P-12 Science Learning Standards (NYSSLS) | Adopted December 2016, based on the Next Generation Science Standards (`p-2-…`, `3-5-…`, `ms-…`, `hs-science-learning-standards.pdf`) | The performance expectation, `4-PS3-2`, `MS-LS1-1`, `HS-ESS2-1`, `K-2-ETS1-1` |
| Social studies | New York State K-12 Social Studies Framework | K-8 with the March 2016 revisions (`ss-framework-k-8a2.pdf`); 9-12 with the 2017 updates (`framework-9-12-with-2017-updates.pdf`) | Key idea `4.2` or conceptual understanding `4.2a` |

New York's world language standards are not used. New York families get no French subject, as in the other states.

## Files

- `source/` holds the official files as downloaded on 14 October 2026, so the record can be rebuilt and checked even if NYSED moves or changes them: `math.pdf` (www.nysed.gov/sites/default/files/programs/standards-instruction/nys-next-generation-mathematics-p-12-standards.pdf), `ela.pdf` (…/nys-next-generation-ela-standards.pdf), `science-p-2.pdf`, `science-3-5.pdf`, `science-ms.pdf`, `science-hs.pdf` (…/p-2-, 3-5-, ms- and hs-science-learning-standards.pdf), `social-k-8.pdf` (…/ss-framework-k-8a2.pdf), `social-9-12.pdf` (…/framework-9-12-with-2017-updates.pdf) and `social-intro.pdf` (…/ss-framework-k-12-intro.pdf), about 10 MB in all.
- `fetch.sh <folder>` downloads the same files again from NYSED, to refresh `source/` or check for a new edition. www.nysed.gov leaves its intermediate certificate (GlobalSign RSA OV SSL CA 2018) out of the TLS chain, so curl may need a CA bundle that includes it (`CURL_CA_BUNDLE`).
- `build_outcomes.py source` parses them into `outcomes.json`: `{"<grade>/<subject>": [{idx, kind, content}]}` for Kindergarten (`k`) to Grade 9. Run it with `python3 -I`. It needs `pypdf` (6.17 was used) and takes a few seconds. `contract.ts` in `src/content/new-york/` checks every `us-ny` citation against it.
- `outcomes.json` holds 1 573 entries:

  | Subject | Entries | Distinct codes | Kinds |
  | --- | --- | --- | --- |
  | Math | 313 | 313 | 274 standards, 39 lettered parts |
  | English language arts | 548 | 548 | 269 standards, 259 lettered parts, 20 banded |
  | Science | 356 | 220 | performance expectations; the middle school band is listed under Grades 6, 7 and 8 |
  | Social studies | 356 | 356 | 86 key ideas, 270 conceptual understandings |

## How the record is built, and what it checks

- **Math.** Each domain heading ("NY-4.MD Measurement and Data") is followed by numbered standards ("5." or "2a."). A standard printed only as lettered parts gets its parts' text. Every code the document mentions anywhere (coherence notes, within-grade connections) must have been read, or the script stops. Pre-K, Geometry and Algebra II are left out.
- **English language arts.** Each line starts with its code and a colon (`4R1:`). Language Standards 1 and 2 (grammar and usage; capitalization, punctuation and spelling) are organized in grade bands in Appendix A rather than printed per grade; each grade's page says so. They are listed under every grade's own code (`4L1`, `4L2`, `9-10L1`) with kind `banded` and the anchor standard as their text, so grammar and spelling units can cite them.
- **Science.** Codes are NGSS's. Kindergarten to Grade 5 are by grade, with the engineering design bands (`K-2-ETS1`, `3-5-ETS1`) under each grade of the band. NYSED's middle school standards are a 6-8 band and leave the order to districts, so every `MS-` code is listed under Grades 6, 7 and 8. Grade 9 holds every high school expectation: New York students usually take a high school science course (Earth and Space Sciences, or Life Science: Biology) in grade 9. NYSED added expectations NGSS doesn't have (for example `MS-PS1-7`, `MS-PS1-8`, `HS-PS1-9` to `HS-PS1-12`) and left some out. The connection boxes mention three codes that are never stated (`K-ESS2-3`, `HS-LS4-6`, `HS-ESS3-6`); the script reports them and they are not in the record.
- **Social studies.** Key ideas are printed in capitals in Grades 4 to 9 ("4.1 GEOGRAPHY OF NEW YORK STATE: …") and as a sentence in Kindergarten to Grade 3. The script stops if a conceptual understanding has no key idea or its letters skip one. The grade themes are: Kindergarten Self and Others; Grade 1 My Family and Other Families, Now and Long Ago; Grade 2 My Community and Other United States Communities; Grade 3 Communities around the World; Grade 4 Local History and Local Government (New York State); Grade 5 The Western Hemisphere; Grade 6 The Eastern Hemisphere; Grades 7 and 8 History of the United States and New York; Grade 9 Global History and Geography I.
- The PDF text has a few broken words ("ST ATE", "sou ght") where pypdf splits a word. The script joins the breaks that split a code; the rest is left as printed, since `content` is for reference and the checks use `idx`.

## Decisions

- **Grade 9 social studies is Global History and Geography I**, the course New York teaches in grade 9, not civics as in Washington, Oregon and California (Participation in Government is a grade 12 course in New York).
- **Grade 9 math is Algebra I**, cited with NYSED's `AI-` codes.
- **Report card:** New York has no statewide report card, so the framework uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding). State tests are the Grades 3-8 ELA and math tests, science in grades 5 and 8, and Regents Exams in high school.
- **Schools:** `/privacy/` and `docs/school/` state our commitments under Education Law 2-d and Part 121.

## Known gaps

- The Next Generation ELA standards place Language Standards 1 and 2 in grade bands, so `4L1` and `4L2` are this record's own labels for "the grade 3-5 banded L1/L2 skills, practised in Grade 4".
- New York's Social-Emotional Learning Benchmarks (2018) are voluntary guidance and are not in the record; the parent guide describes them.
- **Standards with no unit** (checked October 2026 against `outcomes.json`; every other standard is cited by at least one `us-ny` unit):
  - Grade 9 physical science: `HS-PS1-3`, `HS-PS1-6`, `HS-PS2-6`, `HS-PS3-2`, `HS-PS3-3`, `HS-PS3-5` and `HS-PS4-6`. These are design projects, investigations and models that don't fit multiple-choice practice.
  - English language arts: reading aloud fluently and speaking and presenting, which can't be practised as quiz questions: `KSL2`, `KSL4`, `KSL5`, `1RF4`, `1SL1`, `1SL3` to `1SL6`, `2SL4`, `2SL5`, `3RF4`, `3SL4`, `3SL6`, `4SL2`, `4SL5`, `4SL6`, `5SL3`, `5SL4`, `5SL6`, `6SL1`, `6SL3`, `6SL4`, `6SL6`, `8SL3` to `8SL6` and `9-10SL1`, `9-10SL3` to `9-10SL6`. A few (formal and informal English, judging a speaker's argument) could become quiz units later.
  - Writing standards (`W1` to `W5`) are practised as choices about craft (which opening, detail or order works best), not as free writing, because children never type free text.
