# Rhode Island

## Framework

- **Id and slug:** `us-ri`, `rhode-island`. Pre-K and Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Rhode Island has no statewide French standards the app follows). Offered to families and in classroom mode.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), cited by the Rhode Island Early Learning and Development Standards' learning goals (`M 1.a`) (`src/content/rhode-island/pk.ts`), checked against `docs/research/rhode-island/prek/outcomes.json` (sources in `source/`, `fetch.sh`, `build_outcomes.py`). Practice steps only.

## Standards

- Rhode Island's standards, adopted by the Board of Education and the Council on Elementary and Secondary Education: math (the Common Core, 2010, Rhode Island's Core Standards; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the Next Generation Science Standards, 2013; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (the Rhode Island Social Studies Standards, taken up by the Council in February 2023; `SS4.2.3`; Grade 9 cites the high school Civics course, `SSHS.CVC.6.3`).
- Citations are `"CODES · text"` (`ris()` in `src/content/rhode-island/cite.ts`), checked by `src/content/rhode-island/contract.ts` against `docs/research/rhode-island/outcomes.json`. Sources are in `gradelings-research/rhode-island/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/rhode-island/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/rhode-island/plan/`). Science units built around California places are `ri-` copies with Rhode Island examples (Narragansett Bay, its salt marshes and eelgrass, Block Island, the Blackstone River, the Scituate Reservoir, nor'easters, hurricanes and storm surge, the Block Island Wind Farm, Westerly granite, glacial boulders, coal-swamp fossils, ospreys, piping plovers and the New England cottontail, and the 2024 eclipse); borrowed units that name another state's places are filtered `ri-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows each grade's theme: families, schools and neighborhoods with Rhode Island's anchor flag and symbols (K); local communities, with Rhode Island then and now (1); global communities, with Rhode Island and the world (2); the regions of the United States, with the Northeast and states and the nation (3); **Rhode Island** (4: the land and bay, Native peoples, Roger Williams and the founding, colonial life and the sea including the slave trade, the Revolution and statehood, mills and newcomers, governing Rhode Island and a timeline, all Rhode Island's own units); United States history to Reconstruction, with the new nation and Verrazzano and Block on Narragansett Bay (5); the ancient and medieval world (6); the early modern and modern world (7); government and civic life with Rhode Island's government (8); and high school Civics with voting rights from the Dorr Rebellion on and how the nation governs (9).
- Rhode Island-only units (`ri-` ids, `bankUnit` in `own.ts`, `timelineUnit` in `units/kit.ts`) are in `src/content/rhode-island/units/`, each with a lesson in `src/content/rhode-island/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside the regions, history and civics grades (social 3, 5, 8 and 9), and other states' Tribal units are never borrowed (`rhode-island.test.ts`). Lessons for borrowed units are shared by grade and id with other states, so a Rhode Island lesson on a borrowed unit keeps the existing text.
- **Native content:** the Narragansett, Wampanoag, Niantic and Nipmuc peoples are named in the present tense as living peoples; the Narragansett Indian Tribe's government, federal recognition (1983) and lands in Charlestown are stated plainly; wampum, the Three Sisters, Roger Williams's dealings with Narragansett leaders, King Philip's War and the Great Swamp Massacre are told plainly and briefly; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- Rhode Island has no statewide report card; each district and charter school chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: RICAS in English language arts and math (grades 3 to 8, the same test as Massachusetts' MCAS, scores 440 to 560 in four levels: Not Meeting, Partially Meeting, Meeting and Exceeding Expectations), the NGSA in science (grades 5, 8 and 11: Beginning to Meet, Approaching, Meeting and Exceeding Expectations), and the PSAT 10 and SAT in high school. State law (§ 16-22-2) asks for civics proficiency and a student-led civics project in middle or high school.

## Parent guides

- `src/content/rhode-island/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, the eight Standards for Mathematical Practice (`/guides/rhode-island/math-practices/`) and state tests (`/guides/rhode-island/state-tests/`; dates point to the Department). No French guide.

## Schools

- **R.I. Gen. Laws § 16-104-1** (Student Data-Cloud Computing): a provider may process student data only to provide its service to the school, never for commercial or advertising purposes, and certifies this in writing. `/privacy/` (`src/content/rhode-island/schools.ts`) states that, our FERPA and COPPA commitments, deletion when the school asks, written certification on request and breach notice to the school. Confirm a district's own data agreement terms before signing.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- High school US History and World History courses aren't cited; Grade 9 is Civics.
- Grade 3's Southeast, Midwest, Southwest and West regions are taught through borrowed regions units, not one Rhode Island unit each.
- Native content is light and needs partner review before it grows.
