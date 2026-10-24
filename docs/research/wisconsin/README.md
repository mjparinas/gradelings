# Wisconsin: sources and checking record

Wisconsin (`us-wi`, slug `wisconsin`) follows Wisconsin's academic standards, adopted by the State Superintendent and published by the Department of Public Instruction (DPI). Downloaded October 24, 2026.

## Sources (in `source/`)

DPI publishes every standards document on its CASE standards server (wisestandards.dpi.wi.gov), which allows scripted downloads. `fetch.sh` downloads them again and writes `SHA256SUMS`; `build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly.

- `math.json`: Wisconsin Standards for Mathematics (2021), CASE package `6bab37e8-30b5-4079-8cc5-4d0be1dce66e`.
- `ela.json`: Wisconsin Standards for English Language Arts (2020), CASE package `1adaac54-1b08-4e9c-ac44-57a55707827d`.
- `ela-2020.docx` and its text `ela-2020.txt`: the same ELA standards as DPI's Word document (https://dpi.wi.gov/media/54346/download?inline). The CASE package leaves out all of Grade 7 Language, Grade 7 Reading 7 to 9 and Grade 3 Foundational Skills, so `build_outcomes.py` adds those standards from the document (kind `standard (document)`).
- `science.json`: Wisconsin Standards for Science (2017), CASE package `093f9f92-c3bf-4336-808a-6104d031ec74`.
- `social.json`: Wisconsin Standards for Social Studies (2018), CASE package `3455e53c-c691-4ddc-8528-cb82b3f3c987`, with the PDF `social-2018.pdf` and its text for reference.
- `pfl.json`: Wisconsin Standards for Personal Financial Literacy (2020), CASE package `e2c0891b-5413-4e1f-977e-57bcf50cdfa9`.

## Codes

- **Math:** grade, domain, cluster letter and number: `M.4.NBT.A.1`. Wisconsin renumbered some Common Core standards (for example `M.3.OA.A.3` is the Common Core's 3.OA.4, and functions use `F-FB` for building functions). Grade 9 cites the high school standards: `M.9-12.A.SSE.A.1`, `M.9-12.F-IF.B.4`, `M.9-12.SP.SM.A.1`. The practices are `M.SMP.1` to `M.SMP.8`.
- **English language arts:** `ELA.4.R.1` (one Reading strand for literature and informational text), `ELA.2.RF.3`, `ELA.4.W.2`, `ELA.4.SL.1`, `ELA.4.L.1`. Grade 9 cites the Grades 9-10 band: `ELA.9-10.R.2`. Wisconsin's Language strand numbers differ from the Common Core's (its L.5 and L.6 are conventions).
- **Science:** grade, discipline and standard: `SCI.4.PS.3`, with learning priorities where they name the idea (`SCI.4.PS.3.A`). Middle school is one band, `SCI.m.*`, valid in Grades 6 to 8; high school is `SCI.h.*`, cited under Grade 9. A learning priority counts in a grade only where it has a content statement for that grade. Practices (`SCI.SEP.*`) and crosscutting concepts (`SCI.CC.*`) count in every grade.
- **Social studies:** standards (`SS.Hist1`, `SS.Geog5`, `SS.PS3`, `SS.Econ2`, `SS.BH1`, `SS.Inq1`) count in every grade. Performance indicators carry a band: `e` (Kindergarten to Grade 2), `i` (3 to 5), `m` (6 to 8) and `h` (high school, cited under Grade 9), or a grade or span (`SS.Geog2.d.4-5`, `SS.PS1.a.K-1`). Borrowed units cite the standard; Wisconsin's own units cite indicators.
- **Personal financial literacy:** `PFL.e.MM.1.b.1`, `PFL.i.SI.1.a.1`, `PFL.h.CD.1.c.1` (bands as above), listed under social studies.

## Placement

- Math, English language arts and science follow California's placement, which teaches the same ideas in the same grades, with Wisconsin codes. Where a California, Washington or Oregon science unit names its own state's places, Wisconsin has a copy with Wisconsin examples (`src/content/wisconsin/units/science-g*.ts`); other borrowed units that name another state's places are filtered copies (`units/copies-g*.ts`).
- Social studies: Wisconsin leaves the order of topics to districts, so the app follows the usual pattern: communities in Kindergarten to Grade 3 (Wisconsin's symbols in 1; its land, communities and local government in 3), **Wisconsin studies in Grade 4** (land and regions, the eleven First Nations of Wisconsin, early Wisconsin and statehood, the growing state, a timeline, state government and the economy, all Wisconsin's own units), early United States history in 5, world geography and ancient civilizations in 6, world history in 7, United States history to Reconstruction with Wisconsin and the two constitutions in 8, and civics with personal finance and economics in 9.
- First Nations content follows Act 31 (1989 Wisconsin Act 31), which asks schools to teach the history, culture and tribal sovereignty of Wisconsin's eleven federally recognized nations. It is light, in the present tense, about living nations and governments, with nothing sacred or ceremonial; removal (the Black Hawk War, the Sandy Lake Tragedy) is told plainly.

## State facts checked

- State tests: the Wisconsin Forward Exam (English language arts and math in grades 3 to 8, science in 4 and 8, social studies in 4, 8 and 10; levels Developing, Approaching, Meeting and Advanced), PreACT Secure in grades 9 and 10, the ACT in grade 11, and Dynamic Learning Maps as the alternate assessment.
- Graduation: a civics test of at least 65 of 100 questions from the US citizenship test (Wis. Stat. 118.33(1m)); a half credit of personal financial literacy from the class of 2028 (2023 Wisconsin Act 60).
- The Holocaust and other genocides must be taught at least once in Grades 5 to 8 and once in high school (2021 Wisconsin Act 30).
- Competencies guide: DPI's six Guiding Principles for Teaching and Learning, printed at the start of each standards document.
- Privacy: Wisconsin has no student online privacy statute for technology providers. Pupil records law (Wis. Stat. 118.125) binds schools; breach notice follows Wis. Stat. 134.98 (an entity storing data for another notifies the owner; residents are notified within a reasonable time, at most 45 days).

## Known gaps

- English language arts standards that need writing, speaking and listening or fluency have no unit (the app has no free text or voice).
- Grade 9 math covers algebra and functions; most high school geometry, number and statistics standards are not practised.
- The Holocaust and genocide teaching required by Act 30 has no unit of its own.
- First Nations content is light and needs partner review before it grows.
