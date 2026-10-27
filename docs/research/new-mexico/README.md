# New Mexico: sources and checking record

New Mexico (`us-nm`, slug `new-mexico`) follows the New Mexico content standards, written into the New Mexico Administrative Code (title 6, chapter 29) and published by the New Mexico Public Education Department (PED) at https://web.ped.nm.gov/educators/instructional-resources/new-mexico-adopted-content-standards/. Checked October 26, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF. The PED site answers `curl` with a captcha page, so its files are fetched with Playwright (headless Chromium; set `CHROMIUM` to a browser binary if the repository's Playwright has none). The rules come from the State Records Center and Archives, the science framework from nextgenscience.org (which refuses a browser user agent from `curl`), and the breach law from the Legislature. `SHA256SUMS` records the files as committed; a second download on October 26, 2026 gave byte-identical files.

| File | Document |
| --- | --- |
| `math.pdf` | New Mexico mathematics standards (the Common Core, adopted 2010), with the eight Standards for Mathematical Practice |
| `ela.pdf` | New Mexico English language arts standards (the Common Core, adopted 2010) |
| `science.pdf` | The Next Generation Science Standards arranged by disciplinary core idea (the base of the New Mexico STEM Ready! Science Standards) |
| `science-nm-specific.pdf` | PED's framework for the six New Mexico-specific science expectations |
| `science-k5-course-map.pdf`, `science-ms-integrated.pdf`, `science-hs-integrated.pdf` | PED's recommended science course maps for K-5, integrated middle school and integrated high school |
| `social.pdf` | New Mexico Social Studies Standards (adopted 2022) |
| `asr-fact-sheet.pdf` | PED's NM-ASR (science) fact sheet for 2026-27 |
| `mssa-family-guide.pdf` | Cognia's family guide to the spring 2026 NM-MSSA student report |
| `nmac-6.29.10-science.pdf`, `nmac-6.29.11-social.pdf`, `nmac-6.29.13-ela.pdf`, `nmac-6.29.14-math.pdf` | The rules that adopt each subject's standards |
| `hb15-2017-breach.pdf` | House Bill 15 (2017), the Data Breach Notification Act |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,935 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/new-mexico/contract.ts`. `math.pdf` and `ela.pdf` are the national Common Core documents, so the math and language sections are parsed the way Illinois's and Connecticut's are; `science.pdf` is the same file Connecticut uses.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards, `A-SSE.1`, `F-IF.4`.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** performance expectation codes, `K-PS2-1`, `4-PS3-2`, plus the six New Mexico expectations with " NM" after the code: `1-SS-1 NM`, `5-SS-1 NM`, `MS-ESS3-3 NM`, `HS-LS2-7 NM`, `HS-SS-1 NM` and `HS-SS-2 NM`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** grade and number, `K.10`, `4.12`, `7.53`, in Kindergarten to Grade 8. High school is listed under Grade 9 by strand: Civics (`9-12.Civ.29`), Economics (`9-12.Econ.47`), Geography (`9-12.Geo.*`), New Mexico History (`9-12.NMH.*`), US History (`9-12.US.*`), World History (`9-12.WH.*`) and Ethnic, Cultural and Identity Studies (`9-12.ECI.*`). The document prints a few codes with a space (`9-12 Civ.23`) or without the period after the number (`8.26`); both are read as written in the standard form.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because New Mexico teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `nm-` copies with New Mexico examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `nm-` copies (`localCopy`, `units/copies-g*.ts`). PED recommends integrated middle and high school science course maps, which the placement does not follow unit by unit.
- Social studies follows each grade's theme in the 2022 standards: community (K and 1), national identity (2), global immigration and migration (3), New Mexico history and geography (4), United States history and government (5), world history to about 1300 (6), New Mexico history (7) and United States history to 1920 (8). The standards don't place high school strands in grades; Grade 9 here is Civics and Economics with personal finance.

## Guides

- **Mathematical Practices** (`/guides/new-mexico/math-practices/`): the eight Standards for Mathematical Practice printed at the front of `source/math.pdf`.
- **State tests** (`/guides/new-mexico/state-tests/`): NM-MSSA (language arts and math, grades 3 to 8, with Lexile and Quantile measures), NM-ASR (science, grades 5, 8 and 11, with a Spanish version for eligible English learners), the SAT (grade 11) and the four levels Novice, Nearing Proficiency, Proficient and Advanced. Sources: `source/asr-fact-sheet.pdf` and `source/mssa-family-guide.pdf`. Dates change each year, so the guide points to the Department.

## Privacy

New Mexico has no student online privacy law for school service providers like those in other states; `/privacy/` states our FERPA and COPPA commitments and breach notice under the Data Breach Notification Act (`source/hb15-2017-breach.pdf`). See `docs/frameworks/new-mexico.md`.

## French

New Mexico has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; the New Mexico science expectations about scientists and society (`1-SS-1 NM`, `5-SS-1 NM`, `HS-SS-1 NM`, `HS-SS-2 NM`) have no unit yet; Native content is light and needs partner review; high school New Mexico History, US History, World History and Geography strands aren't cited.
