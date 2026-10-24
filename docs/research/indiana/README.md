# Indiana: sources and checking record

Indiana (`us-in`, slug `indiana`) follows the Indiana Academic Standards adopted by the Indiana State Board of Education and published by the Indiana Department of Education (IDOE, https://www.in.gov/doe/students/indiana-academic-standards/). Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads each document (plain curl with a browser user agent works) and records the files in `SHA256SUMS`; the `.txt` files are `pdftotext -layout` extracts.

| Files | Document |
| --- | --- |
| `math-*.pdf` | Indiana Academic Standards for Mathematics (2023), Kindergarten to Grade 8, Algebra I and Geometry |
| `ela-*.pdf` | Indiana Academic Standards for English/Language Arts (2023), Kindergarten to Grade 8 and Grades 9-10 |
| `science-*.pdf` | Indiana Academic Standards for Science (2023), Kindergarten to Grade 8, Biology and Integrated Chemistry and Physics |
| `social-*.pdf` | Indiana Academic Standards for Social Studies (2023), Kindergarten to Grade 8, Middle School Civics (Grade 6), United States Government and Economics |
| `corr-*.pdf` | IDOE's correlation guides between the 2023 standards and the Common Core, used to match units to Indiana codes |

The State Board has approved revised math and social studies standards for schools from 2027-28; these are the standards in schools now. Refresh the sources when the revisions take effect.

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/`: every coded standard becomes `{"idx": code, "kind": domain, "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/indiana/contract.ts`.

## Codes

- **Mathematics (2023):** grade, domain and number: `4.NS.1`, `K.CA.2`, `7.RP.3`. The Process Standards (`PS.1` to `PS.8`) are listed under every grade. Grade 9 cites Algebra I (`AI.L.1`) and parts of Geometry (`G.T.1`).
- **English/language arts (2023):** grade, domain and number: `4.RC.1` (reading comprehension), `2.RF.3` (foundations), `5.W.4` (writing), `3.CC.1` (communication and collaboration). Grade 9 cites the Grades 9-10 standards (`9-10.RC.1`).
- **Science (2023):** the performance expectations each grade's document lists, written as in the Next Generation Science Standards (`4-PS3-1`, `MS-LS1-1`, `3-5-ETS1-1`), placed by Indiana's own grade documents. Grade 9 cites Biology and Integrated Chemistry and Physics (`HS-LS1-1`, `HS-PS1-1`, `HS-ICP1-1`).
- **Social studies (2023):** grade, strand and number: `4.H.13` (history), `3.C.2` (civics and government), `5.G.1` (geography), `3.E.5` (economics). Grade 6 adds Middle School Civics (`6.CIV.1`); Grade 9 cites United States Government (`USG.3.2`) and Economics (`E.2.1`).

## Placement

- Math and English/language arts follow California's placement where Indiana teaches the same idea in the same grade, with Indiana's codes; units for ideas Indiana places in another grade are moved or left out.
- Science follows Indiana's own grade documents. Middle school units come from whichever grade teaches the topic elsewhere (for example space in Grade 6, weather, climate and growth in Grade 8). California, Washington and Oregon units that name their own places are Indiana copies (`in-` ids, `localCopy` and `copyOf` in `src/content/indiana/units/science-g*.ts`) with Indiana examples.
- Social studies follows Indiana's grade themes: rules, family and community (K), my community long ago and today (1), communities and citizenship, with the Pledge and Benjamin Harrison (2), Indiana communities and the Midwest (3), **Indiana studies (4, all Indiana's own units: land and regions, first peoples, territory and statehood, Lincoln and the Civil War, growth, government, economy and a timeline)**, the United States to the founding (5), Europe and the Americas with Middle School Civics and the Indiana Constitution (6), Africa, Asia and the Southwest Pacific (7), United States history to Reconstruction (8) and United States Government with Economics (9).
- Borrowed units that name another state's places are Indiana copies (`in-g1-american-symbols`, `in-g7-japan`); `indiana.test.ts` checks the rest name no other state outside US history and civics, and that no other state's Tribal units are borrowed.

## Known gaps

`gaps.txt` lists, per grade and subject, the coded standards no unit cites. The main ones:

- **Mathematics:** the Process Standards are practised throughout but cited only where a unit names them; Grade 9 covers Algebra I and a few Geometry standards.
- **English/language arts:** writing, communication and collaboration, and reading fluency standards need free text or voice and have no unit.
- **Social studies:** Grade 7 (Africa, Asia and the Southwest Pacific) covers about half its standards; Grade 8 leaves out much of the economics and geography strand; Grade 9 covers the core of United States Government and Economics only.
- **Native content** (the Miami, Potawatomi, Delaware (Lenape) and Shawnee in Grade 4, and the Mound Builders at Angel Mounds) is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
