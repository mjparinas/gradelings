# Mississippi: sources and checking record

Mississippi (`us-ms`, slug `mississippi`) follows the Mississippi College- and Career-Readiness Standards (MS CCRS), adopted by the Mississippi State Board of Education and published by the Mississippi Department of Education (MDE) at https://mdek12.org/academiceducation/mississipp-college-and-career-readiness-standards/. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (mdek12.org answers `curl` only with a browser user agent, and its firewall sometimes refuses a request, so each download is retried) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2025.pdf` | MS CCRS for Mathematics (2025, accessible version of July 14, 2025), with the eight Standards for Mathematical Practice listed in every grade |
| `ela-2025.pdf` | MS CCRS for English Language Arts (2025) |
| `science-2026.pdf` | MS CCRS for Science (approved by the State Board on July 23, 2026; in effect from the 2026-2027 school year) |
| `social-2022.pdf` | MS CCRS for the Social Studies (2022, final filing of January 25, 2023) |
| `sel.pdf` | Mississippi Social-Emotional Learning Standards (kept for reference; the competencies guide uses the Mathematical Practices instead) |
| `maap-scale-scores.pdf` | MAAP scale score tables (updated September 11, 2025): the five performance levels and the passing scores |
| `maap.html` | MDE's Mississippi Academic Assessment Program (MAAP) page |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,400 standards and objectives): each becomes `{"idx": code, "kind": "standard" | "objective" | "practice", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/mississippi/contract.ts`.

Not committed: the Literacy-Based Promotion Act (Miss. Code 37-177-1 and following) and the breach notification law (Miss. Code 75-24-29). The Legislature's site (billstatus.ls.state.ms.us) failed with a broken certificate chain and then 503 errors on October 25, 2026; the guides describe the reading requirement as MDE's MAAP page and score tables do.

## Codes

- **Mathematics:** grade, domain and number, `4.NBT.5`, with letters where the standard splits (`1.MD.3a`, `2.MD.8a`); the practices are `4.SMP.1` to `4.SMP.8`. Grade 9 cites Algebra I (`A-SSE.1`, `F-IF.4`, `N-RN.3`); only the standards printed in the Algebra I course are read, so codes such as `N-RN.1` or `F-BF.4` don't exist for Mississippi.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites English I (`RL.9.2`, not a 9-10 band). The appendix codes are not read. The Kindergarten informational strand prints its codes as "RL.K.7-9" in one place; they are read as `RI.K.`.
- **Science:** domain (L life, P physical, E earth and space), grade and standard, with a letter where a standard has parts: `L.4.1`, `P.4.6A`, `E.4.9B`. Performance objectives add a number (`L.4.1.2`). Grade 9 cites Biology (`BIO.1E`, `BIO.5`) and Physical Science (`PHS.5`), the two courses most students take first.
- **Social studies:** Kindergarten to Grade 3 number five strands within the grade: civics `K.CI.1`, economics `K.E.1`, civil rights `K.CR.1`, geography `K.G.1` and history `K.H.1`. Grade 4 (Mississippi Studies and Regions) is `4.MS.1` to `4.MS.11`. Grades 5 to 8 number within the grade, `5.1` to `8.10` (the document sometimes prints "6. 4" with a space; it is read as `6.4`). Grade 9 cites the high school Mississippi Studies course (`MS.1` to `MS.12`) and Introduction to Geography (`ITG.1` to `ITG.10`), each a half-year course. The Grade 7 Compacted course repeats Grade 7 and Grade 8 under `7C.` codes, which are not read.

## Placement

- Math and English language arts follow each grade's standards, which keep the Common Core's grade structure. Grade 9 is Algebra I and English I.
- Science follows Mississippi's own grade topics (the 2026 standards differ from the NGSS grade bands). Units borrowed from California that are built around California places are `ms-` copies with Mississippi examples (`copyOf`, `units/science-g*.ts`): fossils (Grade 3), weather and climate and energy resources (Grade 4), climate change (Grade 7), natural hazards (Grade 8) and ecosystem dynamics (Grade 9).
- Social studies follows each grade's theme in the 2022 standards. Grade 4 and Grade 9 Mississippi Studies are Mississippi's own units; Kindergarten has an own symbols unit and Grade 3 own units on government and on land, disasters and energy.
- Borrowed units that name another state's places are filtered `ms-` copies (`localCopy`, `units/copies-g*.ts`).

## Guides

- **Mathematical Practices** (`/guides/mississippi/math-practices/`): the eight Standards for Mathematical Practice in `source/math-2025.pdf`.
- **MAAP tests** (`/guides/mississippi/maap-tests/`): English language arts and math in grades 3 to 8, science in grades 5 and 8, the Algebra I, Biology and English II end-of-course tests, the five performance levels (Minimal, Basic, Passing, Proficient, Advanced), the Kindergarten Readiness Assessment and the 3rd grade reading requirement of the Literacy-Based Promotion Act. Sources: `source/maap.html` and `source/maap-scale-scores.pdf`. Dates change each year, so the guide points to the Department.

## Privacy

`/privacy/` says Mississippi has no student online privacy law of its own for technology providers and lists our commitments under FERPA and COPPA, with breach notice under Miss. Code 75-24-29; see `docs/frameworks/mississippi.md`.

## French

Mississippi has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Native content is light and needs partner review; Grade 9 social studies follows the Mississippi Studies and Introduction to Geography path, not the other high school courses.
