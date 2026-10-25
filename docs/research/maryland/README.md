# Maryland: sources and checking record

Maryland (`us-md`, slug `maryland`) follows the Maryland College and Career Ready Standards and the social studies frameworks adopted by the Maryland State Board of Education and published by the Maryland State Department of Education (MSDE, https://marylandpublicschools.org/). Checked October 24, 2026.

## Sources (in `source/`)

marylandpublicschools.org answers scripted requests with HTTP 403, so `fetch.sh` downloads the Common Standards Project's copies of MSDE's documents (api.commonstandardsproject.com, one JSON file per standard set, each naming the MSDE page it came from in `sourceURL`) and records the files in `SHA256SUMS`.

| Files | Document |
| --- | --- |
| `math-k.json` to `math-8.json`, `math-algebra-1.json`, `math-geometry.json` | Maryland College and Career Ready Standards for Mathematics, revised 2025 (MSDE's crosswalks), and the Algebra I and Geometry standards |
| `ela-k.json` to `ela-8.json`, `ela-9-10.json` | Maryland College and Career Ready Standards for English Language Arts (2022) |
| `science-k.json` to `science-5.json`, `science-ms.json`, `science-hs-*.json` | Maryland's Next Generation Science Standards: Kindergarten to Grade 5, middle school and the high school disciplinary core ideas |
| `social-k.json` to `social-5.json`, `social-6-7.json`, `social-8.json`, `social-government.json`, `social-core.json` | Maryland's social studies standards and frameworks: Kindergarten to Grade 5, the 2025 Grades 6-7 framework, Grade 8, American Government and the core skills |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/`: every coded standard becomes `{"idx": code, "kind": "", "content": text}` under `<grade>/<subject>`. A few Grade 3 and Grade 6 codes in the copies carry an extra level (`3.GR.C.6.7`); the script writes them as MSDE does (`3.GR.C.7`). Only `idx` is checked by `src/content/maryland/contract.ts`.

## Codes

- **Mathematics (revised 2025):** grade, domain, cluster and number, with the new domains Number and Operation Sense (`NOS`), Algebraic Thinking (`AT`), Geometric Reasoning and Measurement (`GR`) and Reasoning with Data and Statistics (`DS`): `4.NOS.A.1`, `3.GR.C.7`, `5.DS.A.1`. Grade 9 cites the Algebra I standards (`A.SSE.A.1`, `F.IF.B.4`, `S.ID.C.8`).
- **English language arts (2022):** the Common Core codes, `RL.4.1`, `RF.2.3`, `L.5.4`; Grade 9 cites the Grades 9-10 standards (`RI.9-10.2`).
- **Science:** the Next Generation Science Standards' performance expectations (`4-PS3-2`). Middle school is one Grades 6-8 band, so `MS-` codes count in Grades 6, 7 and 8; Grade 9 cites the high school expectations (`HS-LS2-6`).
- **Social studies:** Kindergarten to Grade 3 cite the civics, geography, economics and history standards and their indicators (`C.1`, `G.2.b`, `E.3`, `H.1.d`; Grade 3 has no geography strand). Grade 4 cites Worlds Collide, Colonization and the American Revolution (`WC.1`, `RC.4`, `AR.3`), Grade 5 American Government, the Civil War and civil rights (`AG.1`, `CN.1`, `CA.4`), Grades 6 and 7 the eight themes of the 2025 framework (`6/7.2.1`, `6/7.7.2`; each code counts in both grades), Grade 8 colonial America to the Gilded Age (`CL.1`, `FN.2`, `GE.2`, `CW.3`) and Grade 9 American Government (`SOG.2`, `LB.1`, `JB.2`, `EP.3`).

## Placement

- Math, English language arts and science follow California's placement where Maryland teaches the same idea in the same grade, with Maryland's codes. The 2025 math revision moved some topics (patterns in Grade 4, angle pairs in Grade 7, cylinder volume and transformations in Grade 8), so those units are left out. California's science units that name California places are Maryland copies with Maryland examples (`md-` ids, `src/content/maryland/units/science-g*.ts`).
- Social studies follows MSDE's grade frameworks: freedom, rules, location, trade and change in Kindergarten to Grade 2 (Maryland's symbols in Grade 1); **Maryland in Grade 3** (its economy, the Chesapeake Bay and the land, local, state and national government, and the Native nations and early colonists, all Maryland's own units); colonial and revolutionary Maryland in Grade 4; the Constitution, the Civil War and Reconstruction with Maryland's HBCUs, transportation, the free press and civil rights in Grade 5; world history in Grades 6 and 7; United States history to Reconstruction in Grade 8; and American Government in Grade 9, with governing Maryland, the courts, elections, public policy and foreign policy.
- Borrowed units that name another state's places are Maryland copies (`localCopy`); `maryland.test.ts` checks the rest name no other state outside US history and civics, and that no other state's Tribal units are borrowed.

## Known gaps

`gaps.txt` lists, per grade and subject, the coded standards no unit cites. The main ones:

- **Mathematics:** Grade 9 covers Algebra I only; Geometry is left out.
- **English language arts:** writing, speaking and listening, reading fluency and reading-range standards need free text or voice and have no unit.
- **Social studies:** Grades 6 and 7 cover the ancient world, religions, trade and world history to about 1900; the 2025 framework's modern themes (industrialization, the Green Revolution, climate change, authoritarian regimes, pandemics, the Partition of India, migration, imperialism, centrally planned economies, globalization, apartheid, the Middle East and the North American case study) have no unit yet. Grade 8 has no unit of its own for the Louisiana Purchase, Jacksonian Democracy, westward expansion or the Gilded Age West; Grade 9 has no unit for executive orders and crisis powers (EB.4) or majority rule and individual rights (SOG.4) on their own.
- **Native content:** the Piscataway, Accohannock and Pocomoke content is light, in the present tense, and needs partner review before it grows.
