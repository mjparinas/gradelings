# Massachusetts: sources and checking record

Massachusetts (`us-ma`, slug `massachusetts`) follows the Massachusetts Curriculum Frameworks, adopted by the Board of Elementary and Secondary Education and published by the Department of Elementary and Secondary Education (DESE) at https://www.doe.mass.edu/frameworks/. Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (doe.mass.edu and malegislature.gov answer plain `curl` with a browser user agent) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2017.pdf` | Massachusetts Curriculum Framework for Mathematics, Pre-Kindergarten to Grade 12 (March 2017) |
| `ela-2017.pdf` | Massachusetts Curriculum Framework for English Language Arts and Literacy, Pre-Kindergarten to Grade 12 (March 2017) |
| `scitech-2016.pdf` | Massachusetts Science and Technology/Engineering Curriculum Framework (April 2016) |
| `hss-2018.pdf` | Massachusetts History and Social Science Curriculum Framework (June 2018) |
| `603cmr23.html` | Student records regulations, 603 CMR 23.00 |
| `mgl-93h-1.html` to `mgl-93h-6.html` | Massachusetts General Laws chapter 93H (security breaches), sections 1 to 6 |

mass.gov refuses scripted downloads (HTTP 403), so the data security regulations (201 CMR 17.00) are not saved here.

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,288 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school standards are listed under Grade 9. Only `idx` is checked by `src/content/massachusetts/contract.ts`.

## Codes

- **Mathematics:** the codes printed with each standard, with the cluster letter, `4.NBT.A.1`, `K.CC.A.3`. Grade 9 cites the Model Algebra I course, `AI.A-SSE.A.1`, `AI.F-IF.B.4`.
- **English language arts:** `RL.4.1`, `RI.4.2`, `RF.4.3`, `W.4.1`, `SL.4.1`, `L.4.4`. Grade 9 cites the Grades 9-10 standards, `RL.9-10.1`.
- **Science and technology/engineering:** Kindergarten to Grade 5 use the Next Generation Science Standards' codes, with Massachusetts additions marked `(MA)` (`2-ESS2-4(MA)`). The engineering band carries the grade that teaches it (`3.3-5-ETS1-1`). Massachusetts places middle school standards by grade, and the code carries it: `6.MS-LS1-1`, `7.MS-PS3-1`, `8.MS-PS2-1`. Grade 9 cites the high school standards, `HS-LS1-1`.
- **History and social science:** each grade's topics are numbered, `[3.T4]`, some in lettered parts, `[7.T1b]`. A unit cites the standard by topic and number, `3.T4.1`, `7.T1b.2`. Grade 9 cites the high school United States History I course, `USI.T1.4`. Numbering may restart in a lettered part, so the letter is kept in the code.

## Placement

- Math and English language arts follow California's placement, mapped to Massachusetts's codes (both follow the Common Core; Massachusetts adds a few standards, such as `1.MD.D.5` on coins).
- Science follows Massachusetts's own grade placement, copying units from whichever grade teaches the topic. Borrowed units that name another state's places are filtered `ma-` copies with Massachusetts examples (`localCopy`, `units/copies-g*.ts`).
- History and social science follows the framework's grade themes: the child and the world (Kindergarten, with Massachusetts's symbols), the United States and its people (1), world geography and how people move (2), **Massachusetts and New England (3, mostly Massachusetts's own units: geography, cities and towns, the Wampanoag and Plymouth, the Massachusetts Bay Colony, the Revolution in Massachusetts)**, North American geography with the regions of the United States and their first peoples (4), United States history from the colonies to the civil rights movement (5), world geography and ancient civilizations (6 and 7), and United States and Massachusetts government and civic life (8, with the US and Massachusetts constitutions and government of the Commonwealth). Grade 9 is the high school United States History I course (the Revolution to about 1920), with Massachusetts's part in it.

## Guides

- **Learning practices** (`/guides/massachusetts/learning-practices/`): the Standards for Mathematical Practice, the literacy habits in the English language arts framework, the Science and Engineering Practices and the History and Social Science Practice Standards. They are built into the frameworks and not graded on their own.
- **State tests** (`/guides/massachusetts/state-tests/`): MCAS in English language arts and math in grades 3 to 8 and 10, and science and technology/engineering in grades 5 and 8 and once in high school; MCAS-Alt for students with significant disabilities; four achievement levels (Exceeding, Meeting, Partially Meeting and Not Meeting Expectations). Since voters passed Question 2 in November 2024, students no longer have to pass MCAS to graduate. Dates change each year, so the guide points to DESE. https://www.doe.mass.edu/mcas/

## Privacy

Massachusetts has no student online privacy statute for technology providers (a student data privacy bill is before the legislature). `/privacy/` and `docs/school/README.md` give Massachusetts schools the same commitments as the other states', under the school's agreement, the student records regulations (603 CMR 23.00) and FERPA and COPPA. M.G.L. chapter 93H section 3(a) has a party that holds data it doesn't own tell the owner of a breach "as soon as practicable and without unreasonable delay", which is what `/privacy/` promises the school.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Wampanoag, Nipmuc and other Native content is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
- Grade 8 civic projects (Chapter 296 of the Acts of 2018) can't be practised in the app; the guide mentions them.
- Grade 9 social studies covers United States History I only; United States History II and World History have no unit of their own.
