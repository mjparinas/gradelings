# Tennessee: sources and checking record

Tennessee (`us-tn`, slug `tennessee`) follows the Tennessee Academic Standards, adopted by the State Board of Education and published by the Tennessee Department of Education at https://www.tn.gov/education/districts/academic-standards.html. Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (www.tn.gov and publications.tnsosfiles.com refuse plain `curl`, so it uses a headed Chromium through Playwright; run it under `xvfb-run -a` without a display) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2021.pdf` | Tennessee Academic Standards for Mathematics, as revised November 6, 2020 (the attachment adopted on final reading February 5, 2021), Kindergarten to high school |
| `math-2021-cover.pdf` | The State Board's cover sheet for the final reading, February 5, 2021 |
| `math-practices.pdf` | The Standards for Mathematical Practice, as the Department publishes them |
| `ela-2019.pdf` | Tennessee English Language Arts Standards (State Board, February 8, 2019), clean copy |
| `science-2022.pdf` | Tennessee Academic Standards for Science (State Board, October 28, 2022) |
| `social-2024.pdf` | Tennessee Academic Standards for Social Studies (final reading February 2024; the 2025 printing) |
| `personal-finance-2021.pdf` | The Personal Finance course standards (2021), the course Tennessee requires for graduation, for reference |
| `pc0757-2016.pdf` | Public Chapter 757 of 2016 (House Bill 1931), the Student Online Personal Protection Act, from the Secretary of State |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,383 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school courses are listed under Grade 9. Only `idx` is checked by `src/content/tennessee/contract.ts`.

## Codes

- **Mathematics:** the codes printed with each standard, with the cluster letter: `K.CC.A.2`, `4.NBT.A.1`, `8.F.B.4`. Grade 9 is Algebra I, `A1.A.SSE.A.1`, `A1.A.REI.B.2`.
- **English language arts:** `4.RL.KID.1`, `4.RI.CS.5`, `4.W.TTP.2`, `4.SL.CC.1`; the foundational literacy standards (phonics, fluency, grammar and vocabulary in Kindergarten to Grade 5) `K.FL.PA.2`, `4.FL.PWR.3`; Grades 6 to 8 have a Language strand, `6.L.CSE.1`. Grade 9 cites the Grades 9-10 band, `9-10.RL.KID.1`.
- **Science:** the grade, the disciplinary core idea and the number under it, `K.PS1.2`, `4.LS2.3`, `6.ESS2.4`, `K.ETS1.2`. Grade 9 cites Biology I, `BIO1.LS1.1`, and Physical Science, `PSCI.PS2.1`.
- **Social studies:** the grade and the standard's number, `K.05`, `4.36`, `8.63`. Grade 9 cites United States Government and Civics, `GC.01`, and Economics, `E.09`.

## Placement

- Math and English language arts follow California's placement, mapped to Tennessee's codes (Tennessee's math standards keep the Common Core clusters; its English language arts standards keep the Common Core strands with Tennessee's sub-strand letters).
- Science follows Tennessee's 2022 grade placement, copying units from whichever grade teaches the topic: materials, light and sound, living things and weather in Kindergarten; sunlight, plants and animals and the sky in 1; forces, animals and land and water in 2; matter, forces, energy, life cycles, the solar system and engineering in 3; energy, waves, light, food webs and Earth's surface in 4; matter and mixtures, forces, traits and space in 5; energy and heat, ecosystems, human impact and climate in 6; atoms, reactions, cells, body systems and heredity in 7; matter, forces and fields, Newton's laws, waves and natural selection in 8; Biology I and Physical Science in 9. Borrowed units that name another state's places are filtered `tn-` copies with Tennessee examples (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the 2024 standards: self, family, rules and symbols (K); Tennessee's map, symbols, leaders and holidays (1); Tennessee's neighbor states, the United States and Tennessee constitutions and national monuments (2); United States history from the colonies to westward expansion, with the Tennessee Volunteers (3); the Civil War and Reconstruction to the civil rights movement (4); **Tennessee history (5, mostly Tennessee's own units)**; the ancient world (6); the Middle Ages to the age of exploration (7); United States history from the colonies to Reconstruction, with Jacksonian Tennessee and Tennessee divided (8); United States Government and Civics with Economics (9).

## Guides

- **Mathematical Practices** (`/guides/tennessee/math-practices/`): the eight Standards for Mathematical Practice printed in the 2021 math standards. Tennessee has no statewide SEL standards for students, so this is the competencies page, as for Arizona. https://www.tn.gov/education/districts/academic-standards/math-standards.html
- **State tests** (`/guides/tennessee/state-tests/`): TCAP achievement tests in English language arts, math and science in grades 3 to 8 and social studies in grades 6 to 8 (the grades 3 to 5 social studies test is paused; TCAP-Alt still covers social studies in grades 3 to 8), end-of-course tests in high school, four performance levels (Below, Approaching, Met and Exceeded Expectations), and the 3rd grade promotion law (T.C.A. 49-6-3115). Dates change each year, so the guide points to the Department. https://www.tn.gov/education/districts/lea-operations/assessment/testing-overview.html, https://www.tn.gov/content/dam/tn/education/testing/overviews/SOC_Grades_6-8_Assessment_Overview.pdf

## Privacy

`/privacy/` and `docs/school/README.md` state our commitments as an operator under the Student Online Personal Protection Act (Public Chapter 757 of 2016, Tennessee Code Annotated section 49-1-708, in Part 7, the Data Accessibility, Transparency and Accountability Act, sections 49-1-701 to 49-1-708): no targeted advertising, no profile except for K-12 school purposes, no sale or rental, disclosure only as subsection (a)(4) and (d) allow (service providers must be contractually barred from other uses and further disclosure and must keep reasonable security), reasonable security, and deletion within a reasonable time when the school or district asks.

## Known gaps

See `gaps.txt`. In short: English language arts standards that need writing, speaking or fluency have no unit; Cherokee, Chickasaw and other nations' content is light, in the present tense and needs partner review before it grows; the 2024 social studies standards reach classrooms in 2027-28, so check them against the final edition then.
