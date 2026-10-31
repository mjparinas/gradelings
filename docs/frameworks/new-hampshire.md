# New Hampshire

## Framework

- **Id and slug:** `us-nh`, `new-hampshire`. Pre-K and Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: New Hampshire has no statewide French standards the app follows). Offered to families and in classroom mode.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), cited by the New Hampshire Early Learning Standards' indicators for four- and five-year-olds with the domain (`Numeracy 1.1.7b`) (`src/content/new-hampshire/pk.ts`), checked against `docs/research/new-hampshire/prek/outcomes.json` (sources in `source/`, `fetch.sh`, `build_outcomes.py`). Practice steps only.

## Standards

- Adopted by the New Hampshire State Board of Education: math (the New Hampshire College and Career Ready Standards, which are the Common Core, 2010; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the same, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the New Hampshire College and Career Ready Science Standards, which are the NGSS, 2016; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (the K-12 Social Studies New Hampshire Curriculum Framework, 2006, written for grade spans; `SS:CV:4:2.1`, where the 4 is the last grade of the 3-4 span; Grade 9 cites the 9-12 span, `SS:CV:12:1.1`).
- Citations are `"CODES · text"` (`nhs()` in `src/content/new-hampshire/cite.ts`), checked by `src/content/new-hampshire/contract.ts` against `docs/research/new-hampshire/outcomes.json`. The Department of Education's site refuses automated downloads, so the sources in `docs/research/new-hampshire/source/` are the Achievement Standards Network's copies of each New Hampshire document; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/new-hampshire/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/new-hampshire/plan/`). Science units built around California places are `nh-` copies with New Hampshire examples (the White Mountains and Mount Washington's weather, the Merrimack and Connecticut Rivers, Great Bay and its oysters, Lake Winnipesaukee, granite and glacial sand and gravel, arsenic in well water, nor'easters and spring floods, the Karner blue butterfly and the New England cottontail); borrowed units that name another state's places are filtered `nh-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the order of the framework's grade spans: New Hampshire's flag and symbols (K); New Hampshire then and now (1); American symbols, holidays and the President, difference makers (Sarah Josepha Hale, Harriet Wilson, Franklin Pierce, Alan Shepard, Christa McAuliffe), family journeys and making and trading (2); New Hampshire's regions, people on the move, and money, taxes and town meeting (3); **New Hampshire history, geography and government** (4: the land, the Abenaki and early settlers, the Granite State, mills, farms and jobs, Granite Staters who made a difference, governing New Hampshire and a timeline, all New Hampshire's own units); United States history to the Constitution with the Eastern Woodland peoples and the explorers of the New England coast (5); the ancient world (6); the world after the ancient era (7, adopted from California's Grade 7 and New York's units, like Nebraska's); United States history and civics with New Hampshire and the nation (the first-in-the-nation primary, Daniel Webster, Franklin Pierce, the Amoskeag mills and strike, the Treaty of Portsmouth and Bretton Woods) and the new nation (8); and civics and economics with governing New Hampshire (the 1784 constitution, the 400-member House, the Executive Council, town meeting and school funding) and personal finance (9).
- New Hampshire-only units (`nh-` ids, `bankUnit` in `own.ts`) are in `src/content/new-hampshire/units/`, each with a lesson in `src/content/new-hampshire/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`new-hampshire.test.ts`). Lessons for borrowed units are shared by grade and id; a New Hampshire lesson on a borrowed unit keeps the text the unit already has.
- **Native content:** the Abenaki and Pennacook peoples are named, with Abenaki communities in New England today in the present tense; the Eastern Woodland unit names the Haudenosaunee Confederacy and other nations as living nations with their own governments; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- New Hampshire has no statewide report card; each district (SAU) and charter school chooses its own, and many use competency-based report cards. The app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- High schools give course credit by showing competency, which the report card page explains.
- State tests: the New Hampshire Statewide Assessment System (NH SAS) in English language arts and math (grades 3 to 8) and science (grades 5, 8 and 11), with four achievement levels, and the SAT in 11th grade.

## Parent guides

- `src/content/new-hampshire/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, the eight Standards for Mathematical Practice (`/guides/new-hampshire/math-practices/`) and state tests (`/guides/new-hampshire/state-tests/`; dates point to the Department of Education). No French guide.

## Schools

- **New Hampshire.** `/privacy/` (`src/content/new-hampshire/schools.ts`) states our commitments under RSA 189:68-a (student online personal information): no targeted advertising, no profiling except for school purposes, no selling or renting, disclosure only as the law allows (to the school and to service providers bound by contract), reasonable security, deletion when the school asks, and telling the school about a breach without delay. FERPA and COPPA apply as everywhere.

## Known gaps

- The Department of Education's PDFs (the standards, the NH SAS guides) and the statute text couldn't be downloaded (HTTP 403 to automated requests); the committed sources are the Achievement Standards Network's copies. The owner can download the PDFs by hand and commit them.
- English language arts standards that need writing, speaking or fluency have no unit.
- The social studies framework (2006) sets expectations by grade span, so a grade's units cite its span; not every expectation in a span has a unit.
- Grade 9 social studies is civics and economics; high school US history, world history and geography are not taught.
- Native content is light and needs partner review before it grows.
