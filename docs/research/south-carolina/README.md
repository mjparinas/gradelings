# South Carolina: sources and checking record

South Carolina (`us-sc`, slug `south-carolina`) follows the South Carolina College- and Career-Ready (SC CCR) Standards adopted by the State Board of Education and published by the South Carolina Department of Education (SCDE, https://ed.sc.gov/instruction/standards/). Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads each document (ed.sc.gov allows scripted downloads with a browser user agent; each document page answers with the PDF) and records the files in `SHA256SUMS`; the `.txt` files are `pdftotext -layout` extracts.

| Files | Document |
| --- | --- |
| `math.pdf` | 2025 SC CCR Mathematics Standards (approved December 2023, emended July 2026), Kindergarten to Grade 8 and the high school courses |
| `math-corrective-edits.pdf` | SCDE's corrective edits to the 2025 mathematics standards |
| `math-algebra-1.pdf` | The printable Algebra 1 standards (the end-of-course test) |
| `ela.pdf` | 2023 SC CCR English Language Arts Standards (approved January 2023, emended August 2025) |
| `science.pdf` | SC CCR Science Standards 2021, Kindergarten to Grade 8 and the high school courses |
| `science-biology-1.pdf` | The printable Biology 1 standards (the end-of-course test) |
| `social.pdf` | 2019 SC Social Studies College- and Career-Ready Standards |
| `social-corrective-edits.pdf` | SCDE's corrective edits to the 2019 social studies standards (November 2023) |

`python3 -I build_outcomes.py --write` rebuilds `outcomes.json` from `source/` (without `--write` it checks the file matches): every coded standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`, with the text cut to about 300 characters. Only `idx` is checked by `src/content/south-carolina/contract.ts`. A few texts that cross a page break in the PDF are cut short; the codes are complete.

## Codes

- **Mathematics (2025):** grade, strand, standard and indicator: `4.NR.1.2`, `K.PAFR.2.1`. Strands are NR (number reasoning), PAFR (patterns, algebra and functional reasoning), MGSR (measurement, geometric and spatial reasoning) and DPSR (data, probability and statistical reasoning). Grade 9 cites Algebra 1 (`A1.PAFR.2.3`).
- **English language arts (2023):** `ELA`, grade, strand, standard and indicator: `ELA.4.AOR.1.2`, `ELA.2.F.3.4`. Strands are F (foundational literacy), AOR (applications of reading), R (research) and C (communication). Grade 9 cites English 1 (`ELA.E1.AOR.2.1`).
- **Science (2021):** the Next Generation Science Standards' performance expectations, placed by grade, middle school included (`4-PS3-1`, `6-ESS2-1`, `7-PS1-2`, `8-PS2-1`). There are no separate engineering codes. Grade 9 cites Biology 1 (`B-LS1-1`), Chemistry (`C-PS1-1`) and Physics (`P-PS2-1`).
- **Social studies (2019):** Kindergarten to Grade 2 by grade, strand and number (`K.H.1`, `1.CG.3`; strands H, G, E, CG); Grades 3 and 7 by grade, standard, indicator and skill (`3.1.2.AG`, `7.2.3.HS`); Grades 4, 5, 6 and 8 by grade, standard and skill (`4.1.CO`, `8.4.CX`); Grade 9 cites United States Government (`USG.2.CC`) and Economics and Personal Finance (`EPF.3.IP`).

## Placement

- Math follows Arkansas's and California's Common Core placement and English language arts California's, re-cited to the South Carolina indicator each unit practises; units for ideas South Carolina places in another grade are moved or left out.
- Science follows South Carolina's grade placement (Grade 6 cells, the senses, heat, waves, Earth's surface, weather and climate; Grade 7 matter, reactions, energy, photosynthesis, ecosystems and resources; Grade 8 forces and fields, waves and signals, heredity, evolution and space). Units that name another state's places are South Carolina copies (`sc-` ids, `units/science-g*.ts`).
- Social studies follows the standards' grade themes: the community around us (K), Life in South Carolina (1, with South Carolina's own units), Life in the United States (2), World Geography (3), United States and South Carolina Studies I and II (4 and 5), World Civilizations (6), World Regional Geography (7), South Carolina and the United States (8, mostly South Carolina's own units) and, in Grade 9, United States Government and Economics and Personal Finance, with a unit on South Carolina's government.

## Known gaps

- English language arts indicators that need writing, speaking, listening or fluency (most of the C strand) have no unit.
- Grade 9 science covers Biology 1 and only parts of Chemistry and Physics.
- Economics and Personal Finance is practised through four general units, so many `EPF` indicators are covered only lightly.
- Catawba Indian Nation, Gullah Geechee and other Native and African American content is light, in the present tense where it is about living communities, and needs partner review before it grows.
