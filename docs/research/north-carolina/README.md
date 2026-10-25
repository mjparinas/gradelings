# North Carolina: sources and checking record

North Carolina (`us-nc`, slug `north-carolina`) follows the North Carolina Standard Course of Study, adopted by the State Board of Education and published by the North Carolina Department of Public Instruction (NCDPI, https://www.dpi.nc.gov/). Checked October 24, 2026.

## Sources (in `source/`)

NCDPI links each standards document from its "Standard Course of Study & Supporting Resources" page for the subject (dpi.nc.gov/districts-schools/classroom-resources/office-teaching-and-learning/standard-course-study/<subject>/standard-course-study-supporting-resources), and each document is a public Google Doc. `fetch.sh` exports each one as PDF (the published layout) and plain text (which `build_outcomes.py` reads), and records the files in `SHA256SUMS`.

| File | Document |
| --- | --- |
| `math.pdf`, `math.txt` | K-12 Mathematics Standard Course of Study (adopted 2023, in schools from 2024-25) |
| `ela-2017.pdf`, `ela-2017.txt` | English Language Arts Standard Course of Study (2017, in schools through 2026-27) |
| `ela-2026.pdf`, `ela-2026.txt` | English Language Arts Standard Course of Study (2026, in schools from 2027-28; kept for the next refresh, not cited yet) |
| `science.pdf`, `science.txt` | K-12 Science Standards (2023) |
| `social-k.pdf` to `social-8.pdf` (and `.txt`) | Social Studies Standards (adopted 2021), one document per grade |
| `social-civic-literacy.pdf`, `.txt` | The Founding Principles of the United States of America and North Carolina: Civic Literacy |
| `social-economics-personal-finance.pdf`, `.txt` | Economics and Personal Finance |
| `law/GS_115C-401.2.html`, `.txt` | G.S. 115C-401.2, protection of student data by operators (ncleg.gov), for `/privacy/` and `docs/school/` |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/`: every coded standard or objective becomes `{"idx": code, "content": text}` under `<grade>/<subject>`. `src/content/north-carolina/contract.ts` checks every citation's codes against it. A few social studies objectives have typing slips in the documents (a missing or extra space or period, such as `5. H.1.3`); the build reads them leniently and writes the standard form.

## Codes

- **Mathematics (2023):** `NC.<grade>.<domain>.<standard>`, such as `NC.4.NBT.5`, `NC.K.CC.1`. Grade 9 cites NC Math 1 (`NC.M1.A-SSE.1`, `NC.M1.F-IF.4`), the course most students take in 9th grade.
- **English language arts (2017):** the Common Core-style strand codes, `RL.4.1`, `RI.5.8`, `RF.2.3`, `W.6.1`, `SL.3.1`, `L.4.4`. Grade 9 cites the 9-10 band (`RL.9-10.1`).
- **Science (2023):** discipline, grade, standard and objective: `PS.4.1.2` (physical science), `LS.7.2.1` (life science), `ESS.6.3.1` (Earth and space science). Grade 9 cites the high school courses: Biology (`LS.Bio.1.1`) and Physical Science (`PS.PSc.2.1`); Earth/Environmental Science, Chemistry and Physics are in `outcomes.json` too but not taught here.
- **Social studies (2021):** grade, strand, standard and objective: `4.H.1.2` (history), `4.G.1.1` (geography), `4.C&G.1.3` (civics and government), `4.E.1.2` (economics), `4.B.1.1` (behavioral sciences). Grade 9 cites Civic Literacy (`CL.C&G.2.1`) and Economics and Personal Finance (`EPF.MCM.1.1`).

## Placement

- Math and English language arts follow Illinois's placement (Common Core, as North Carolina's standards are built on it) with North Carolina's codes, remapped where North Carolina numbers or places a standard differently. Grade 7 reading adds North Carolina copies of California's broad literature and information units (`nc-g7-story-analysis`, `nc-g7-info-analysis`) without the passages set in California.
- Science follows North Carolina's own placement (solids and liquids, sound and the sun's energy in Grade 2; matter, the skeleton, the solar system and Earth's land and water in 3; magnets, electricity, light, fossils, rocks and the moon in 4; matter, forces, body systems, ecosystems and weather in 5; atoms, waves, plants, space and Earth's layers in 6; forces, cells, heredity and the atmosphere in 7; chemistry, disease, evolution, Earth's history, water and energy in 8). Canadian units that fit except for a few questions are North Carolina copies (`localCopy` leaves out questions that name Canada, a Canadian place, another state or Tribes).
- Social studies follows North Carolina's grade themes: cultures, rules and needs (K), communities (1), America: our nation (2), **North Carolina communities (3)**, **North Carolina studies (4, all North Carolina's own units)**, United States history (5), world history to about 1400 (6) and since (7), **North Carolina and United States history (8, mostly North Carolina's own units)** and Civic Literacy with Economics and Personal Finance (9). Both Grade 9 courses are North Carolina graduation requirements.
- No borrowed unit names another state's places outside US history and civics (Grades 5, 8 and 9), and no other state's Tribal units are borrowed (`north-carolina.test.ts`). American Indian content is light and in the present tense, about living nations (the eight tribes the state recognizes, among them the Eastern Band of Cherokee Indians and the Lumbee Tribe), with nothing sacred or ceremonial. It needs partner review before it grows. The Lumbee's federal status is not stated, because it was changing when this was written.

## State facts used (checked October 2026)

- **Report card:** no statewide scale; districts choose. Many elementary schools use standards-based report cards.
- **State tests:** End-of-Grade tests in reading and math (grades 3 to 8) and science (grades 5 and 8); End-of-Course tests in NC Math 1, NC Math 3, English II and Biology, which count toward the course grade; Read to Achieve reading checks (mCLASS) three times a year in Kindergarten to 3rd grade, a beginning-of-year 3rd grade reading test and summer reading camps; the Kindergarten Entry Assessment; NCEXTEND1 as the alternate assessment. Dates change each year, so the guide points to NCDPI.
- **Portrait of a Graduate** (State Board of Education, 2022): seven durable skills, adaptability, collaboration, communication, critical thinking, empathy, learner's mindset and personal responsibility. North Carolina has no statewide social and emotional learning standards.
- **Schools:** G.S. 115C-401.2 (2015) bars operators from targeted advertising, profiles beyond K-12 school purposes and selling student data, limits disclosure, requires reasonable security, and requires deletion within 45 days when a school or local board asks or ends the service.

## Known gaps

`gaps.txt` lists every standard with no unit (about 870 of 1,159 leaf standards are covered). In short:

- English language arts standards that need writing, speaking and listening, fluency or "read a range of texts" have no unit, as in the other states.
- A few math standards have no unit (such as `NC.K.OA.6`, `NC.1.MD.5`, `NC.3.NF.4`, `NC.6.NS.9`, and the NC Math 1 coordinate geometry standards `NC.M1.G-GPE.4` to `6`).
- Grade 9 science covers Biology and Physical Science only; Earth/Environmental Science, Chemistry and Physics are left out.
- Social studies covers the behavioral sciences and some economics and geography objectives lightly in Grades K, 1, 5, 6 and 7, and Grade 9 covers the main Civic Literacy and Economics and Personal Finance objectives but not all of them.
- Kindergarten position words (`PS.K.2.1`) have no science unit: the units that teach them have prompts too long for Kindergarten.
- The 2026 English language arts standards (in schools from 2027-28) are in `source/` but not cited yet. Move the language citations over when they take effect.
