# Colorado: sources and checking record

Colorado (`us-co`, slug `colorado`) follows the Colorado Academic Standards, adopted by the Colorado State Board of Education and published by the Colorado Department of Education (CDE) at https://www.cde.state.co.us/standardsandinstruction. Checked October 23, 2026.

## Sources (in `source/`)

cde.state.co.us resets scripted connections before TLS completes (curl and a headless browser both fail), so `fetch.sh` downloads the Common Standards Project's copies of CDE's documents (api.commonstandardsproject.com, Colorado jurisdiction `83F29380C23C4AEB843733B243CB2243`). Each JSON file is one document for one grade or band and names the CDE page it was taken from in its `sourceURL`. `SHA256SUMS` records the files as committed.

| Files | Document | CSP id |
| --- | --- | --- |
| `math-k.json` to `math-8.json`, `math-hs.json` | Mathematics (adopted 2018, in schools from 2020-21) | `D2980651` |
| `rwc-k.json` to `rwc-8.json`, `rwc-9-10.json` | Reading, Writing, and Communicating (adopted 2018, from 2020-21) | `D21132944` |
| `science-k.json` to `science-5.json`, `science-ms.json`, `science-hs.json` | Science (adopted 2018, from 2020-21) | `D2980644` |
| `social-k.json` to `social-8.json`, `social-hs.json` | Social Studies (adopted 2022, from 2023-24) | `D21428307` |
| `holocaust-6.json` to `holocaust-8.json`, `holocaust-hs.json` | Holocaust and genocide studies standards (HB20-1336) | `D21371896` |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/`: every coded statement becomes `{"idx": code, "kind": label, "content": text}` under `<grade>/<subject>`. Middle school science (one Grades 6-8 band) is listed under Grades 6, 7 and 8; Grade 9 lists the high school mathematics, the Grades 9-10 reading, writing and communicating, and the high school science and social studies standards. The Holocaust and genocide standards are listed with social studies in Grades 6 to 9. Only `idx` is checked by `src/content/colorado/contract.ts`.

## Codes

- **Mathematics:** Common Core-style codes with cluster letters, `4.NBT.A.1`, `K.CC.A.3`. Grade 9 cites the high school codes with Colorado's `HS.` prefix (`HS.A-SSE.A.1`, `HS.F-IF.B.4`). Colorado renumbered two statistics standards: `S-ID.7` is `HS.S-ID.C.7` and `S-ID.9` is `HS.S-ID.B.7`.
- **Reading, writing and communicating:** grade, standard, grade-level expectation and evidence outcome, `4.2.1.a.ii`. Standard 1 is oral expression and listening, 2 reading for all purposes (2.1 literary, 2.2 informational, 2.3 foundational skills and vocabulary), 3 writing and composition, 4 research inquiry and design. Grade 9 cites the 9-10 band (`9-10.2.1.a`).
- **Science:** prepared graduate competency, grade, expectation and evidence outcome, `PS1.4.1.a`, `LS2.MS.3.a`, `ESS3.HS.12.a`. Colorado has no separate engineering (ETS) standards; design units cite the physical, life and Earth science outcomes that ask students to design or evaluate solutions.
- **Social studies (2022):** grade, discipline, expectation and outcome: `4.H.1.a` (history), `4.G.2.b` (geography), `4.E.1.c` (economics), `4.C.2.e` (civics), `4.PF.1.a` (personal financial literacy). Grade 9 cites the high school expectations (`HS.C.2.j`, `HS.PF.3.d`).

## Placement

- Math, reading, writing and communicating, and science follow California's placement, mapped to Colorado's codes statement by statement (the Colorado mathematics standards are the Common Core with Colorado's numbering; reading, writing and communicating standards were matched to the Common Core standards they restate). Where a California science unit names California places, Colorado uses a `co-` copy with Colorado examples (`src/content/colorado/units/science-g*.ts`); other borrowed units that name another state's places are filtered copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows Colorado's grade focus: self, family and community (K to 2), Colorado's land, communities and local government (3), **Colorado history and geography (4, Colorado's own units)**, early North America to the founding (5), the Western Hemisphere (6), the Eastern Hemisphere (7), United States history from the Revolution through Reconstruction (8) and civics (9; Colorado requires a civics and government course to graduate).

## Guides

- **Essential Skills** (`/guides/colorado/essential-skills/`): CDE's revised Colorado Essential Skills, in four groups: Communicators (media, digital and data literacy, interpersonal communication), Problem Solvers (critical thinking and analysis, collaboration and teamwork, creativity and innovation, adaptability and flexibility), Community Members (civic engagement, global and cultural awareness, social awareness) and Empowered Individuals (self-awareness, self-management, perseverance and resilience, self-advocacy and initiative, career awareness). https://www.cde.state.co.us/standardsandinstruction/revisedcoloradoessentialskills
- **State tests** (`/guides/colorado/state-tests/`): CMAS English language arts and math in grades 3 to 8, science in grades 5, 8 and 11, social studies in grade 4 or 7 at a sample of schools each year; PSAT in grades 9 and 10, SAT in grade 11; CoAlt for students with the most significant cognitive disabilities; READ Act reading checks in Kindergarten to Grade 3. Parents may excuse their child from state tests (C.R.S. 22-7-1013). The window changes each year (tentatively April 2027), so the guide points to CDE.

## Privacy

`/privacy/` and `docs/school/README.md` state our commitments under the Student Data Transparency and Security Act (C.R.S. 22-16-101 to 22-16-112). They don't name a breach-notice deadline, because the Act leaves it to the contract with the district.

## Known gaps

- Reading, writing and communicating outcomes that need writing, speaking or presenting (standards 1, 3 and most of 4) have no unit.
- Ute, Cheyenne and Arapaho content is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows. The Sand Creek Massacre and the removal of the Ute people are told plainly.
- The Holocaust and genocide standards and the high school history and geography expectations have no unit of their own.
- Social studies Grades 6 and 7 use New York's Western and Eastern Hemisphere units; two of them are filtered `co-` copies because they named another state's places.
