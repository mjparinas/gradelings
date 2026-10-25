# Utah: sources and checking record

Utah (`us-ut`, slug `utah`) follows the Utah Core Standards, adopted by the Utah State Board of Education (USBE) and published at https://www.schools.utah.gov/curr. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again with plain `curl` (schools.utah.gov allows scripted downloads with a browser user agent) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-elementary.pdf` | Utah Core Standards for Mathematics, Kindergarten to Grade 5 |
| `math-middle.pdf` | Utah Core Standards for Mathematics, Grades 6 to 8 |
| `math-high.pdf` | Utah Core Standards for Mathematics, high school (Secondary Mathematics I to III) |
| `ela.pdf` | Utah State Standards for P-12 English Language Arts (May 2023) |
| `science-seed.pdf` | Utah Science with Engineering Education (SEEd) Standards, Kindergarten to Grade 12 (June 2023 edition) |
| `social-elementary.pdf` | Utah Core Standards for Social Studies, Kindergarten to Grade 6 (adopted December 2022) |
| `social-7-12.pdf` | Utah Core Standards for Social Studies, Grades 7 to 12 (Utah Studies, United States History I and II, World Geography, World History, United States Government and Citizenship) |
| `26RISEFamilyGuide.pdf` | RISE Testing: A Guide for Utah Families (USBE, June 2026), for the state-tests guide |
| `25MakingSenseofRISEScores.pdf` | Making Sense of RISE Scores (USBE, June 2026), for the state-tests guide |

The course-by-course Grades 7 to 12 social studies PDFs have broken font encodings in their text, so the combined `social-7-12.pdf` is used.

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (940 standards): each code becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/utah/contract.ts`.

## Codes

- **Mathematics:** grade, domain and number, as Utah prints them without the cluster letter, `K.CC.1`, `4.NBT.5`, and the practices `1.MP.1`. Grade 9 is the Secondary Mathematics I section only (between its heading and the Honors section), `A.CED.1`, `F.IF.2`, `SI.MP.1`.
- **English language arts:** grade, strand and number, `4.R.5`, `4.W.2`, `4.SL.1` (foundational skills are part of Reading). Grades 7 and 8 share a band, `7-8.R.5`, and Grade 9 cites the Grades 9-10 band, `9-10.R.5`. Standards the document marks "Mastered in", "Begins in" or "Not applicable" for a grade are left out.
- **Science:** grade, strand and standard, `4.2.1`. Grade 9 cites Biology, `BIO.1.2`, and Earth and Space Science, `ESS.2.4`.
- **Social studies:** grade, strand and standard, `4.3.2` (Kindergarten to Grade 6). Grade 7 cites Utah Studies, `UT.2.1`; Grade 8 United States History I, `USI.3.4`; Grade 9 World Geography, `WG.1.2`.

## Placement

- Math and English language arts keep the Common Core's grades, so units come from the shared BC, California, Washington, Ontario and Alberta units with Utah codes (`src/content/utah/plan/`), following Michigan's placement. The English language arts plan maps the Common Core strands onto Utah's 2023 Reading, Writing and Speaking and Listening standards.
- Science follows SEEd's grades (see `docs/frameworks/utah.md`); SEEd moves several NGSS expectations between grades (fossils and the sun and stars to 4, Earth's hazards to 5, space to 6, Earth's history to 7, resources to 8).
- Social studies follows the Utah Core grade themes, with Utah's own units for Utah studies in Grades 4 and 7.

## Guides

- **Mathematical Practices** (`/guides/utah/math-practices/`): the eight Standards for Mathematical Practice printed in every grade of the math standards.
- **RISE tests** (`/guides/utah/rise-tests/`): who takes RISE (English language arts and math 3 to 10, science 4 to 10, writing 5 and 8), how the adaptive test works, the four proficiency levels and the Individual Student Report, from the two USBE family guides above, plus the Acadience checks in the early grades. https://www.schools.utah.gov/assessment

## Privacy

`/privacy/` and `src/content/utah/schools.ts` state our commitments under the Utah Student Data Protection Act (Utah Code Title 53E, Chapter 9, Part 3; 53E-9-309 covers third-party contractors) and FERPA. The Legislature's statute pages render in the browser only, so the act is cited by title, chapter and part.

## Known gaps

Listed in `docs/frameworks/utah.md`.
