# Vermont

## Framework

- **Id and slug:** `us-vt`, `vermont`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Vermont has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- Adopted by the Vermont State Board of Education: math (the Common Core, 2010; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the Next Generation Science Standards, 2013; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (the College, Career, and Civic Life (C3) Framework, adopted September 20, 2017, written for grade bands; `D2.Civ.1.3-5`; Kindergarten to Grade 2 cite K-2, Grades 3 to 5 cite 3-5, Grades 6 to 8 cite 6-8, Grade 9 cites 9-12).
- Citations are `"CODES · text"` (`vts()` in `src/content/vermont/cite.ts`), checked by `src/content/vermont/contract.ts` against `docs/research/vermont/outcomes.json`, which `python3 -I build_outcomes.py` rebuilds from the Achievement Standards Network copies in `docs/research/vermont/source/`. The Agency of Education's adoption record, social studies framework and grade documents, the VTCAP guide and the statutes are committed beside them. Record: `docs/research/vermont/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/vermont/plan/`). Science units built around California places are `vt-` copies with Vermont examples (the Champlain Sea whale and the Isle La Motte reef, Mount Mansfield, mud season and Tropical Storm Irene, Barre granite, Proctor and Danby marble and slate, Bicknell's thrush, loons, zebra mussels and the emerald ash borer, Lake Champlain's phosphorus, hill pastures grown back to forest, Stellafane and the 2024 eclipse in Burlington); borrowed units that name another state's places are filtered `vt-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the grade themes of the Agency of Education's Vermont Framework for K-8 Social Studies: me and my community, with Vermont's flag and symbols (K); people, places and the environment, with Vermont then and now (1); the Americas, difference makers (Wilson Bentley, Alexander Twilight, Calvin Coolidge), family journeys and making and trading (2); global interactions: Africa, Asia, Europe and Oceania, people on the move (French Canadian, Italian, Scottish, Welsh and Swedish workers, and refugee families in Burlington and Winooski) and money, taxes and Town Meeting Day (3); **Vermont, the early republic and the United States to the Civil War** (4: Vermont's land, the Abenaki and early settlers, the Green Mountain State, sheep, stone and syrup, Vermonters who made a difference, governing Vermont and a timeline, all Vermont's own units, with adopted units on the colonies, the Revolution, the Constitution and the Civil War); world geography and ancient civilizations of western Asia and Africa (5) and of Latin America, South and East Asia, Oceania and Europe (6); the United States and Vermont from Reconstruction to the civil rights movement, with Vermont from 1865 to 1970 (7); civics and economics in action, with Vermont civics in action (town meeting, the citizen legislature, Brigham v. State and Act 60, the bottle bill and Act 250) (8); and civics and economics with governing Vermont (the 1793 constitution, its Declaration of Rights and four-year time lock on amendments, two-year terms, retention votes) and personal finance (9).
- Vermont-only units (`vt-` ids, `bankUnit` in `own.ts`) are in `src/content/vermont/units/`, each with a lesson in `src/content/vermont/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics (Grades 4, 7, 8 and 9) and a few listed exceptions, and other states' Tribal units are never borrowed (`contract.ts`). Adopted units taught in a different grade from the original carry the lesson they already have, word for word.
- **Native content:** the Abenaki, who have lived in Vermont for thousands of years and live here today, in the present tense: the four Abenaki tribes Vermont recognized in 2011 and 2012, Abenaki place names, language classes and ash-splint baskets, Grey Lock, and, kept light, the unfair treatment that led many families to keep their identity quiet and Vermont's apology. Nothing sacred or ceremonial. Needs partner review before it grows.

## Report card

- Vermont has no statewide report card; each supervisory union or district chooses its own, and schools use proficiency-based learning and proficiency-based graduation requirements under the Education Quality Standards. The app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the Vermont Comprehensive Assessment Program (VTCAP) in English language arts and math (grades 3 to 9) and science (grades 5, 8 and 11), scale scores from 1500 to 2000 and four performance levels (Level 3 and above is proficient); the MSAA is the alternate assessment.

## Parent guides

- `src/content/vermont/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/vermont/math-practices/`) and VTCAP (`/guides/vermont/vtcap-tests/`; dates point to the Agency of Education). No French guide.

## Schools

- **Vermont.** `/privacy/` (`src/content/vermont/schools.ts`) states our commitments under 9 V.S.A. §§ 2443 to 2443f (student privacy): no targeted advertising, no selling, bartering or renting, no profiling except for school purposes, disclosure only as the law allows (to the school and to service providers bound by contract), reasonable security, deletion when the school asks, and a description of what we collect. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- The C3 Framework sets its indicators by grade band, so a grade's units cite its band; the inquiry indicators (Dimensions 1, 3 and 4) have no unit, and not every Dimension 2 indicator in a band has one.
- Grade 9 social studies is civics and economics; high school US history, world history and geography are not taught.
- Grade 5 and 6 world geography and ancient civilizations are adopted units; there are no Vermont-written units for those grades.
- Native content is light and needs partner review before it grows.
