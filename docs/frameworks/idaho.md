# Idaho

Sources, codes and the checking record are in `docs/research/idaho/README.md`.

## Framework

- **Id and slug:** `us-id`, `idaho`. Math, language arts, science and social studies, Kindergarten to Grade 9; no French. Offered to families and in classroom mode.

## Standards

- The Idaho Content Standards: mathematics, English language arts/literacy and science (all January 2022) and social studies (2024, revised November 2025), from the Idaho Department of Education.
- Citations are `"CODES · text"` (`ics` in `src/content/idaho/cite.ts`), for example `4.NBT.A.1`, `4.RC.L.5a`, `4-PS-1.1`, `MS-LS-2.1`, `4.SS.1.3` and `9-12.GOV.45`. `contract.ts` checks every code against `docs/research/idaho/outcomes.json` for the unit's grade; rebuild it with `fetch.sh` then `python3 -I build_outcomes.py`.

## Content

- Most units are shared: BC units as they are (`share`) and other frameworks' units with Idaho standards (`adopt`, plans in `src/content/idaho/plan/`). Idaho's own units have `id-` ids in `src/content/idaho/units/`, with their lessons in `src/content/idaho/lessons/`.
- Science copies built around another state's places are rewritten with Idaho examples (`copyOf`). Copies of other units that name another state's places are filtered (`localCopy`, `OTHER_STATE` in `units/kit.ts`).
- Social studies: Grade 4 is all Idaho's own units (the five tribes, explorers to statehood, treaties and land conflicts, regions and economy, government and symbols, and a timeline). Grade 2 has the five tribes, Idaho's land and its laws; Grade 5 has reservations, state and federal lands and money choices; Grade 7 has Idaho in the world; Grade 8 has Idaho from territory to state; Grade 9 has governing Idaho.
- **Tribal content:** the five federally recognized tribes in Idaho (Coeur d'Alene, Kootenai, Nez Perce, Shoshone-Bannock, Shoshone-Paiute) are named by their own governments' names, in the present tense, as living, self-governing nations. History (treaties, the Nez Perce War, the Bear River Massacre) is told plainly. Nothing sacred or ceremonial. Adopted units from other states never carry their Tribal content (`idaho.test.ts`). Review with the tribes' education offices before the content grows.

## Report card

- Idaho has no statewide report-card scale; districts and charter schools choose their own. The app uses the four practice steps (Beginning, Approaching, Meeting, Exceeding).
- State tests: the ISAT (English language arts and math in grades 3 to 8 and 11, science in 5, 8 and 11; Levels 1 to 4) and the Idaho Reading Indicator (Kindergarten to Grade 3, fall and spring, three tiers).

## Parent guides

- `src/content/idaho/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, Mathematical Practices (`/guides/idaho/math-practices/`) and ISAT and IRI (`/guides/idaho/isat/`).

## Schools

- Idaho Code 33-133 (the Student Data Accessibility, Transparency and Accountability Act). `/privacy/` (`src/content/idaho/schools.ts`) says we use student data only for the school's purposes with no secondary uses, never for advertising, never sell it, share it only with the listed service providers, keep reasonable security and delete it when the school asks and on our retention schedule.
- Before signing with a district, confirm its contract terms on data destruction dates and penalties, which 33-133(3)(f) asks districts to include.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Tribal content is light and needs review.
- High school United States History II and Foundations of Western Civilization are not taught in Grade 9.
