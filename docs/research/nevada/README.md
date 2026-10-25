# Nevada: sources and checking record

Nevada (`us-nv`, slug `nevada`) follows the Nevada Academic Content Standards (NVACS), adopted by the Nevada State Board of Education and published by the Nevada Department of Education (NDE) at https://doe.nv.gov/offices/office-of-teaching-and-learning/. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (the NDE serves its files from its Strapi upload store, and the Legislature's site answers plain `curl`), writes a `pdftotext -layout` copy of each PDF and a text copy of each statute page. `SHA256SUMS` records the files as committed; a second download on October 25, 2026 gave byte-identical files.

| File | Document |
| --- | --- |
| `math.pdf` | NVACS for Mathematics (the Common Core, adopted 2010), with the eight Standards for Mathematical Practice |
| `ela.pdf` | NVACS for English Language Arts (the Common Core, adopted 2010; version 1.3) |
| `science.pdf` | NVACS for Science (the Next Generation Science Standards, adopted 2014), arranged by disciplinary core idea |
| `social.pdf` | NVACS for Social Studies (revised September 2018) |
| `assessment-calendar.pdf` | NDE accountability assessment calendar for 2026-2027 (revised May 19, 2026) |
| `sbac-report-guide.pdf` | NDE's guide to the Smarter Balanced score report (Levels 1 to 4) |
| `science-report-guide.pdf` | NDE's guide to the Nevada Science Assessment score report |
| `nrs-388.html` | NRS chapter 388, including NRS 388.281 to 388.296 (school service providers and pupil data) |
| `nrs-392.html` | NRS chapter 392, including NRS 392.750 to 392.785 (reading plans, intervention and, from July 1, 2028, 3rd grade retention) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,811 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/nevada/contract.ts`.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards, `A-SSE.1`, `F-IF.4`. The document prints N-RN once as "N-M"; it is read as N-RN.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** `SS.K.9`, `SS.4.11` in Kindergarten to Grade 5. Grades 6 to 8 are three courses, each listed under Grades 6, 7 and 8: Early World Civilizations (`SS.6-8.EWC.12`), World Geography and Global Studies (`SS.6-8.WGGS.18`) and Early U.S. History and Civic Ideals (`SS.6-8.EUSH.20`), plus financial literacy (`SS.6-8.FL.1`). High school is listed under Grade 9: Civics and Economics (`SS.9-12.CE.27`), U.S. History, World History and financial literacy (`SS.9-12.FL.4`). A few misprinted codes (`SS.6.8.`, `SS.912.`) are read as `SS.6-8.` and `SS.9-12.`. Some numbers are missing from the document (for example `SS.6-8.EWC.21` and `SS.6-8.EUSH.27`); never cite them.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because Nevada teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `nv-` copies with Nevada examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `nv-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows each grade's theme in the 2018 standards. The standards list the Grades 6-8 courses without saying which grade teaches which; the app places them in the order the document lists them (Early World Civilizations in 6, World Geography and Global Studies in 7, Early U.S. History in 8). Districts may order them differently.

## Guides

- **Mathematical Practices** (`/guides/nevada/math-practices/`): the eight Standards for Mathematical Practice printed at the front of `source/math.pdf`.
- **State tests** (`/guides/nevada/state-tests/`): Smarter Balanced (English language arts and math, grades 3 to 8), the Nevada Science Assessment (grades 5, 8 and high school), the ACT (grade 11), the Nevada Alternate Assessment, WIDA, i-Ready reading in Kindergarten to Grade 3 and the Read by Grade 3 law (NRS 392.750 to 392.785). Sources: `source/assessment-calendar.pdf`, the two score report guides and `source/nrs-392.html`. Dates change each year, so the guide points to the Department.

## Privacy

`/privacy/` states our commitments under NRS 388.281 to 388.296; see `docs/frameworks/nevada.md`.

## French

Nevada has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Native content is light and needs partner review; the Grades 6-8 social studies placement is the document's order, not a state rule.
