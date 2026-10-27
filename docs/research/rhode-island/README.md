# Rhode Island: sources and checking record

Rhode Island (`us-ri`, slug `rhode-island`) follows the standards adopted by the Rhode Island Board of Education and its Council on Elementary and Secondary Education, published by the Rhode Island Department of Education (RIDE) at https://ride.ri.gov/. Checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF. ride.ri.gov puts its pages and its `/media/` downloads behind a browser check, so only files under `/sites/g/files/` (which answer plain `curl`) are fetched; older RIDE links under `/Portals/` redirect there. The math and English language arts standards are the national Common Core documents from corestandards.org, the science standards come from nextgenscience.org, and the laws from the Legislature's statute pages. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `social.pdf` | Rhode Island Social Studies Standards, Kindergarten through High School (posted by RIDE in March 2023) |
| `council-minutes-2023-02-21.pdf` | Minutes of the Council on Elementary and Secondary Education meeting of February 21, 2023, which took up the social studies standards (implementation targeted for 2026-27) |
| `math.pdf` | Common Core State Standards for Mathematics (Rhode Island's Core Standards, adopted 2010), with the eight Standards for Mathematical Practice |
| `ela.pdf` | Common Core State Standards for English Language Arts (Rhode Island's Core Standards, adopted 2010) |
| `science.pdf` | The Next Generation Science Standards arranged by disciplinary core idea (adopted 2013) |
| `ricas-family-guide-2021.pdf` | RIDE's family guide to RICAS (English language arts and math, grades 3 to 8) |
| `ngsa-family-guide-2022.pdf` | RIDE's family guide to the Next Generation Science Assessment (grades 5, 8 and 11) |
| `statute-16-104-1.htm` | R.I. Gen. Laws § 16-104-1, Student Data-Cloud Computing |
| `statute-16-22-2.htm` | R.I. Gen. Laws § 16-22-2, Civics education (civics proficiency and a student-led civics project in middle or high school) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,464 standards): each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/rhode-island/contract.ts`. `math.pdf`, `ela.pdf` and `science.pdf` are the same national documents New Mexico and Connecticut use, so those sections are parsed the same way. The social studies parser reads each content standard's code and title with pdfplumber.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards, `A-SSE.1`, `F-IF.4`.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** `SS`, the grade, the outcome group and the standard: `SSK.1.1`, `SS4.2.3`, `SS8.4.2`. High school is listed under Grade 9 by course: Civics (`SSHS.CVC.6.3`), US History I and II (`SSHS.USI.*`, `SSHS.USII.*`) and World History I and II (`SSHS.WHI.*`, `SSHS.WHII.*`).

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because Rhode Island teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `ri-` copies with Rhode Island examples (`copyOf`, `units/science-g*.ts`: Narragansett Bay and its salt marshes, Block Island, the Scituate Reservoir, nor'easters and hurricanes, the Block Island Wind Farm, Westerly granite, glacial boulders and the 2024 eclipse), and borrowed units that name another state's places are filtered `ri-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows each grade's theme in the standards: families, schools and neighborhoods (K), local communities (1), global communities (2), the regions of the United States (3), Rhode Island (4), United States history to Reconstruction (5), the ancient and medieval world (6), the early modern and modern world (7) and government and civic life (8). The standards don't place high school courses in grades; Grade 9 here is the Civics course.

## Guides

- **Mathematical Practices** (`/guides/rhode-island/math-practices/`): the eight Standards for Mathematical Practice printed at the front of `source/math.pdf`.
- **State tests** (`/guides/rhode-island/state-tests/`): RICAS (English language arts and math, grades 3 to 8; the same test as Massachusetts' MCAS; scores 440 to 560; Not Meeting, Partially Meeting, Meeting and Exceeding Expectations; growth percentiles for grades 5 to 8), the NGSA (science, grades 5, 8 and 11, in Spanish and Portuguese too; Beginning to Meet, Approaching, Meeting and Exceeding Expectations) and the PSAT 10 and SAT in high school. Sources: `source/ricas-family-guide-2021.pdf` and `source/ngsa-family-guide-2022.pdf`. Dates change each year, so the guide points to the Department.

## Privacy

R.I. Gen. Laws § 16-104-1 (`source/statute-16-104-1.htm`): a cloud computing service that processes student data may use it only to provide the service to the school, never for commercial or advertising purposes, and must certify this in writing. See `docs/frameworks/rhode-island.md`.

## French

Rhode Island has no statewide French standards the app follows, so no French subject is offered (`french` in the manifest is empty).

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; high school US History and World History courses aren't cited (Grade 9 is Civics); the Grade 3 regions other than the Northeast are taught through borrowed regions units rather than one unit each; Native content is light and needs partner review.
