# Virginia: sources and checking record

Virginia (`us-va`, slug `virginia`) follows the Virginia Standards of Learning (SOL), adopted by the Virginia Board of Education and published by the Virginia Department of Education (VDOE, https://www.doe.virginia.gov/). Checked October 24, 2026.

## Sources (in `source/`)

doe.virginia.gov answers scripts (curl and headless browsers) with 403 "Access Denied" from its bot check, so `fetch.sh` opens a real Chromium with Playwright and downloads each file from inside the page. On a machine without a display run `xvfb-run -a ./fetch.sh`. It writes the `.txt` extracts (`pdftotext -layout` for the PDFs, the paragraph text of the Word document) and `SHA256SUMS`.

| File | Document | URL |
| --- | --- | --- |
| `math-2023.pdf` | 2023 Mathematics Standards of Learning, K-12 (Board of Education, August 31, 2023) | https://www.doe.virginia.gov/home/showpublisheddocument/48908/638741650017470000 |
| `english-2024.pdf` | 2024 English Standards of Learning, K-12 (Board of Education, March 28, 2024) | https://www.doe.virginia.gov/home/showpublisheddocument/53643/639159934039100000 |
| `science-2018.pdf` | 2018 Science Standards of Learning, K-12, clean version with the technical edits VDOE posted in 2026 | https://www.doe.virginia.gov/home/showpublisheddocument/77118/639180628197970000 |
| `social-2023.docx` | 2023 History and Social Science Standards of Learning, all courses (VDOE posts it as Word only) | https://www.doe.virginia.gov/home/showpublisheddocument/60408/638834320277530000 |
| `code-22.1-289.01.html` | Code of Virginia § 22.1-289.01, school service providers and student personal information | https://law.lis.virginia.gov/vacode/title22.1/chapter14/section22.1-289.01/ |
| `code-22.1-287.02.html` | Code of Virginia § 22.1-287.02, student data security | https://law.lis.virginia.gov/vacode/title22.1/chapter14/section22.1-287.02/ |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the `.txt` files exactly: every standard becomes `{"idx": code, "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/virginia/contract.ts`.

## Codes

- **Mathematics (2023):** grade, strand and number: `4.NS.3`, `K.CE.1`. The strands are Number and Number Sense (NS), Computation and Estimation (CE), Measurement and Geometry (MG), Probability and Statistics (PS) and Patterns, Functions and Algebra (PFA). Grade 9 cites Algebra 1: `A.EO.2`, `A.EI.1`, `A.F.1`, `A.ST.1`.
- **English (2024):** grade, strand and number: `4.RL.2`, `1.FFR.3`, `5.LU.2`, `6.C.4`, `7.R.1`; a strand without a number (`4.DSR`) is also accepted. Kindergarten is `K`.
- **Science (2018):** grade and number, `4.6`. Grade 7 cites Life Science (`LS.5`), Grade 8 Physical Science (`PS.8`) and Grade 9 Earth Science (`ES.7`) and Biology (`BIO.3`). Each grade's first standard (scientific and engineering practices) runs through every unit and is not cited alone.
- **History and social science (2023):** grade and number for Kindergarten to Grade 3 (`2.7`), then the course: Virginia Studies (`VS.5`, Grade 4), United States History to 1865 (`USI.6`, 5), United States History: 1865 to the Present (`USII.4`, 6), Civics and Economics (`CE.3`, 7), World Geography (`WG.12`, 8) and World History and Geography to 1500 A.D. (`WHI.5`, 9). The sub-standard letters are not cited.

## Placement

- Math and English follow the units other states use for the same skill in the same grade, matched to what each Virginia standard asks.
- Science follows Virginia's own grade placement (weather, the solar system, the ocean and Virginia's natural resources in Grade 4; energy, electricity, sound, light, matter and the rock cycle in 5; the solar system, energy, atoms, weather, watersheds and the Chesapeake Bay in 6; then Life Science, Physical Science, and Earth Science with Biology).
- Social studies follows the 2023 sequence above. **Virginia Studies (Grade 4)** is Virginia's own units, with two adopted ones (the road to revolution and Reconstruction). Virginia's own units (`va-` ids) also cover its holidays, symbols and early history in Kindergarten and Grade 1, Indigenous peoples, explorers, founders and landmarks in Grade 2, the empire of Mali in Grade 3, Virginia's government in Grade 7 and United States and world regions in Grade 8. Canada (part of `WG.3`) is left out, because a US course names nothing Canadian.
- Borrowed units that name another state's places are Virginia copies (`va-` ids, `localCopy` in `src/content/virginia/units/copies.ts`); `virginia.test.ts` checks the rest name no other state outside US history and civics. Other states' Tribal units are never borrowed.

## Known gaps

`gaps.txt` lists, per grade and subject, the standards no unit cites. In short:

- English standards that need writing, speaking and listening, research or fluency (`W`, `C`, `R`, `DSR`, `FFW`) have no unit.
- A few math standards (for example `4.MG.1`, `5.PS.2`, `8.PS.1`) and the Grade 9 Earth Science standards on maps, minerals, rocks and the oceans (`ES.3` to `ES.5`, `ES.8`, `ES.10`) are not yet practised.
- `USII.9` (the United States since 2000) and `WG.2` (how regions change) have no unit.
- Content about Virginia's eleven state-recognized tribes (seven also federally recognized) is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.

## Student privacy law

- Code of Virginia § 22.1-289.01: a school service provider may use student personal information only for the school's purposes, may not sell it, use it for targeted advertising or build a profile beyond those purposes, must keep a security program, must delete it within a reasonable time when the school asks, and must be clear about what it collects.
- Code of Virginia § 22.1-287.02: the Department of Education and each school division keep data security policies.
