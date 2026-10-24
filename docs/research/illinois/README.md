# Illinois: sources and checking record

Illinois (`us-il`, slug `illinois`) follows the Illinois Learning Standards, adopted by the Illinois State Board of Education (ISBE) and published at https://www.isbe.net/Pages/Standards-Courses.aspx. Checked October 23, 2026.

## Sources (in `source/`)

isbe.net allows scripted downloads with a browser user agent, and `fetch.sh` gets the same files again. Every file is at `https://www.isbe.net/Documents/<name>`:

| File | Document | Name on the site |
| --- | --- | --- |
| `math.pdf` | Illinois Learning Standards for Mathematics (the Common Core State Standards, adopted 2010) | `math-standards.pdf` |
| `ela.pdf` | Illinois Learning Standards for English Language Arts (the Common Core State Standards, adopted 2010) | `ela-standards.pdf` |
| `science.pdf` | Illinois Learning Standards for Science (the Next Generation Science Standards, adopted 2014) | `Il-Learning-Standards-Science.pdf` |
| `social.pdf` | Illinois Social Science Standards (2016, in schools from 2017-18) | `IL-Social-Science-Standards.pdf` |
| `sel.pdf` | Social and Emotional Learning Standards (revised July 2026, from 2026-27) | `Illinois-Social-Emotional-Learning-Standards.pdf` |
| `assessment-dates-2026-27.pdf` | State assessment dates, 2026-27 | `State-Assessment-Dates-2026-27.pdf` |
| `mandated-units.pdf` | Mandated units of study in the School Code | `IL-Mandated-Units-of-Study.pdf` |

The `.txt` files are `pdftotext -layout` extracts. `build_outcomes.py` rebuilds `outcomes.json` from the PDFs (run with `python3 -I build_outcomes.py`, about a minute; it uses pdfplumber for the column layouts). Each standard is `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/illinois/contract.ts`; some `content` strings, mostly the 6-8 inquiry cells and a few social science cells that end in a page number, are cut or garbled by the PDF's columns.

## Codes

- **Math (Common Core, 2010):** `4.NBT.1`, `K.CC.3`. Grade 9 cites the high school codes (`A-SSE.1`, `F-IF.4`, `S-ID.6`), listed under `9/math`.
- **English language arts (Common Core, 2010):** `RL.4.1`, `RI.4.2`, `RF.2.3`, `W.4.2`, `SL.4.1`, `L.4.4`. Grade 9 cites the 9-10 band (`RL.9-10.1`).
- **Science (NGSS, 2014):** `4-PS3-2`; the K-2 and 3-5 engineering codes (`K-2-ETS1-1`, `3-5-ETS1-1`) are listed under each grade of their band; middle school `MS-` codes under Grades 6, 7 and 8; `HS-` codes under Grade 9. Math, English language arts and science follow California's placement with Illinois codes.
- **Social science (2016):** an inquiry strand and four disciplinary strands (civics, economics and financial literacy, geography, history): `SS.K.CV.1`, `SS.1.EC.FL.1`, `SS.4.H.3`, inquiry bands `SS.K-2.IS.4` and `SS.3-5.IS.7`. Grades 6 to 8 share one band at three levels of complexity (`SS.6-8.H.1.LC`, `.MdC`, `.MC`, with `.MCa`/`.MCb` where a cell is split), listed under Grades 6, 7 and 8. Grades 9 to 12 share one band (`SS.9-12.CV.4`, `SS.9-12.EC.FL.3`), listed under Grade 9. The grade themes are My Social World (K), Living, Learning, and Working Together (1), Families, Neighborhoods, and Communities (2), Communities Near and Far (3), Our State, Our Nation (4) and Our Nation, Our World (5). Districts choose the middle school topics, so the app uses the usual sequence: world geography and ancient civilizations (6), world history 600 to 1900 (7), and United States history to Reconstruction with the US and Illinois constitutions (8). Grade 9 is civics, the semester every Illinois high school student takes.

## Mandated units (School Code, `mandated-units.pdf`)

- 105 ILCS 5/27-3: the Declaration of Independence, the US and Illinois constitutions and the proper use and display of the flag; no student receives a certificate of graduation without passing an examination on them (most schools give it in 8th grade). The Grade 8 unit `il-g8-constitutions` practises it.
- A semester of civics in Grades 6 to 8 and in high school; Illinois history; the histories of Black Americans, Native Americans (including sovereignty and Chicago's urban Native community), Asian Americans (TEAACH Act), and the Holocaust. The app's units touch Illinois, Black and Native history; the rest are not separate units yet.

## Reporting and tests

There is no statewide report-card scale, so the framework uses four practice steps (Beginning, Approaching, Meeting, Exceeding), like the other states. State tests (2026-27 dates document): the Illinois Assessment of Readiness (IAR, English language arts and math, grades 3 to 8, online March 1 to April 16, 2027), the Illinois Science Assessment (ISA, grades 5 and 8, March 1 to April 30, 2027), PreACT 9 and PreACT (grades 9 and 10), the ACT with science and writing (grade 11), the Dynamic Learning Maps alternate assessment, and the Kindergarten Individual Development Survey (KIDS, teacher observation in the first 40 days of kindergarten). The guide points to ISBE for dates.

## SEL standards

The competencies page is the Social and Emotional Learning Standards revised in July 2026: five goals (Self-Awareness, Self-Management, Social Awareness, Relationship Skills, Responsible Decision-Making), three indicators each, benchmarks for five grade bands. ISBE notes that indicators 2B and 2C repeat 1B and 1C by mistake and will be corrected through rulemaking in 2026-27; the standards under them are unaffected.

## Student privacy

The Student Online Personal Protection Act (SOPPA, 105 ILCS 85, amended in 2021) sets duties for operators: no targeted advertising, no profiles beyond K-12 purposes, no sale or rental, disclosure only as allowed, reasonable security, breach notice to the school within 30 calendar days, deletion on the school's request, and a written agreement with each school (which the school publishes). `/privacy/` and `docs/school/README.md` state those commitments.

## Own units and copies

- `il-` science copies (`units/science-g*.ts`) replace California science units that name California places, with Illinois examples (prairie, Lake Michigan, the Illinois and Mississippi rivers, tornadoes, the 2017 and 2024 eclipses).
- `il-` social units: Grade 1 symbols; Grade 3 land, communities and local government; Grade 4 (all Illinois's own) regions, First Peoples, early Illinois, the growing state, a timeline, government and economy; Grade 8 Illinois and the nation, a timeline and the Constitution test; Grade 9 governing Illinois plus copies of Maine's US government, personal finance and economics units without their Maine items.
- `units/copies-g*.ts` (`localCopy`) are borrowed units that fit except for a few questions naming another state's places.

## Known gaps

- Native content (Cahokia, the Illinois Confederation and the Peoria Tribe of Indians of Oklahoma, the Potawatomi, Kickapoo, Sauk and Meskwaki, Miami and Ho-Chunk, Chicago's urban Native community) is light and in the present tense.
- Asian American history (TEAACH Act) and Holocaust education, both mandated, have no unit of their own.
- English language arts standards that need free text or a voice (writing, speaking and listening, fluency) have no unit, as in the other states.
