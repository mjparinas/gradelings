# Ohio: sources and checking record

Ohio (`us-oh`, slug `ohio`) follows Ohio's Learning Standards, adopted by the State Board of Education and published by the Ohio Department of Education and Workforce at https://education.ohio.gov/Topics/Learning-in-Ohio. Checked October 24, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (education.ohio.gov answers plain `curl` with a browser user agent) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2017.pdf` | Ohio's Learning Standards for Mathematics (adopted 2017), Kindergarten to high school |
| `ela-2026-k12.pdf`, `ela-2026-by-grade.xlsx` | Ohio's Learning Standards for English Language Arts: the K-8 standards revised in 2026 (taught from 2027-28) with the 2017 Grades 9-12 standards, and the Department's spreadsheet of the same standards by grade |
| `science-2018.pdf` | Ohio's Learning Standards and Model Curriculum for Science (adopted 2018) |
| `social-k8-2026.pdf` | Ohio's Learning Standards for Social Studies, Kindergarten to Grade 8, updated July 2026 (taught from 2027-28) |
| `social-2019.pdf` | Ohio's Learning Standards for Social Studies (adopted 2018, published January 2019); its high school courses did not change in 2026 |
| `orc-3319.325.pdf` to `orc-3319.327.pdf` | Ohio Revised Code sections 3319.325 to 3319.327 (Senate Bill 29 of the 135th General Assembly, as amended by House Bill 432, effective December 9, 2024), from codes.ohio.gov |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,211 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school standards are listed under Grade 9. Only `idx` is checked by `src/content/ohio/contract.ts`.

## Codes

- **Mathematics:** the codes printed with each standard, `4.NBT.1`, `K.CC.3`. Grade 9 cites the high school codes, which Ohio writes with a dot (`A.SSE.1`, `F.IF.4`, `S.ID.6`) rather than the Common Core's dash.
- **English language arts:** `RL.4.1`, `RI.4.2`, `RF.4.3`, `W.4.1`, `SL.4.1`, `L.4.4`, and writing foundations (handwriting, spelling and conventions, new in 2026) `WF.4.3`. Grade 9 cites the 2017 Grades 9-10 standards as the standards document prints them, `RL.9-10.1` (the spreadsheet lists them as `RL.9.1`).
- **Science:** the content statement codes, `4.PS.2`, `6.LS.1`, `8.ESS.3`. Grade 9 cites the high school courses: Physical Science `PS.M.1`, Biology `B.DI.1`, and Chemistry, Physics, Physical Geology and Environmental Science where a unit fits.
- **Social studies:** Ohio numbers its content statements within each grade and prints no code, so Kindergarten to Grade 8 cite "Statement 6" and Grade 9 cites the 2018 high school courses, "American Government 16" and "Economics and Financial Literacy 3".

## Placement

- Math and English language arts follow California's placement, mapped to Ohio's codes (Ohio's math standards are the Common Core with Ohio's high school notation; the 2026 English language arts standards keep the Common Core strands).
- Science follows Ohio's own grade placement: three topics a grade, one each in Earth and space, physical and life science (for example Earth's resources, matter and energy in Grade 3; the solar system, light and sound in 5; rocks and minerals and cells in 6; the physical Earth and heredity in 8), copying units from whichever grade teaches the topic. Borrowed units that name another state's places are filtered `oh-` copies with Ohio examples (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the grade themes: a child's place in time and space (K, with Ohio's symbols), families now and long ago, near and far (1), interactions through time (2, with Ohio's regions), communities past and present, near and far (3, with Ohio's land, communities and local government), **Ohio in the United States (4, Ohio's own units)**, regions and people of the Western Hemisphere (5), the Eastern Hemisphere (6), world studies from 750 BC to 1600 (7) and United States studies from 1492 to 1877 (8). Grade 9 is American Government (with Ohio's 1851 constitution and local government) and Economics and Financial Literacy, both required for graduation.

## Guides

- **SEL standards** (`/guides/ohio/sel-standards/`): Ohio's K-12 Social and Emotional Learning Standards, adopted by the State Board in June 2019: self-awareness, self-management, social awareness, relationship skills and responsible decision-making, in grade bands. They are not tested, and schools choose how to teach them. https://education.ohio.gov/Topics/Learning-in-Ohio/Social-and-Emotional-Learning
- **State tests** (`/guides/ohio/state-tests/`): Ohio's State Tests in English language arts and math in grades 3 to 8 (grade 3 English language arts also in the fall) and science in grades 5 and 8; end-of-course exams in Algebra I, Geometry, English Language Arts II, Biology, American History and American Government; the Kindergarten Readiness Assessment; five performance levels (Limited, Basic, Proficient, Accomplished, Advanced; 700 is Proficient). The Third Grade Reading Guarantee: yearly reading checks in Kindergarten to Grade 3 and reading improvement and monitoring plans; since House Bill 33 (2023), a 3rd grader below the promotion score moves on to 4th grade unless the parent asks for retention after consulting the principal and reading teacher. Dates change each year, so the guide points to the Department. https://education.ohio.gov/Topics/Testing, https://education.ohio.gov/Topics/Learning-in-Ohio/Literacy/Third-Grade-Reading-Guarantee

## Privacy

`/privacy/` and `docs/school/README.md` state our commitments under Ohio Revised Code 3319.325 to 3319.327: education records are the school's property; Chapter 1347 protection as if we were a school district; breach information to the school; destroy or return records within 90 days after the contract ends; no selling, sharing or commercial use; staff access only as needed; and no location, microphone, camera or activity monitoring (3319.327, which is about school-issued devices; we do none of it anyway). Districts send the yearly notice to families by August 1 (3319.326(G)).

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Native content (the Adena and Hopewell earthworks; the Shawnee, Lenape, Wyandot, Miami and Seneca of the Ohio Country, whose nations live on today mostly outside Ohio) is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
- The 2026 K-8 English language arts and social studies standards are taught from 2027-28. Check the citations against the Department's final editions then.
- Grade 9 social studies covers American Government and Economics and Financial Literacy only; the other high school courses (American History, Modern World History, World Geography, Contemporary World Issues) have no unit of their own.
