# Hawaiʻi

## Framework

- **Id and slug:** `us-hi`, `hawaii`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Hawaiʻi has no statewide French standards the app follows; Hawaiian language and the Kaiapuni immersion schools are not taught). Offered to families and in classroom mode. The name is written Hawaiʻi, with the ʻokina (U+02BB), in every label and copy line.

## Standards

- From the Hawaiʻi State Department of Education (HIDOE), the one statewide school system:
  - **Math:** the Hawaiʻi Common Core Standards for Mathematics (HCCS-M, approved by the Board of Education in 2026, phased in from 2027-28), cited as printed: `4.NBT.1`, `6.EEI.3`, `8.LR.2`. Grade 9 cites the high school courses Algebra 1 + Data Analytics (`A1.3.2`) and Geometry + Probability (`G.1.2`).
  - **English language arts:** the Hawaiʻi Common Core Standards for English Language Arts (approved April 2024): `4.RL.2`, `K.RF.3`, `2.WF.1`, `6.L.1`; Grade 9 cites the Grades 9/10 standards (`9/10.RI.2`). Writing Foundations (WF) holds handwriting, spelling and conventions in Kindergarten to Grade 5.
  - **Science:** the Next Generation Science Standards, by performance expectation (`4-PS3-2`, `MS-LS1-1`, `HS-ESS2-4`).
  - **Social studies:** the Hawaiʻi Core Standards for Social Studies (HCSSS, 2018): `SS.4.1.18.1`; Grade 9 cites the high school courses Modern History of Hawaiʻi (`SS.MHH.…`) and Participation in Democracy (`SS.PID.…`); the inquiry standards (`SS.3-5.2.1`) are listed under each grade of their band. Grade 7 cites its two semester courses, the Hawaiian Kingdom and Pacific Island Studies.
- Citations are `"CODES · text"` (`his()` in `src/content/hawaii/cite.ts`), checked by `src/content/hawaii/contract.ts` against `docs/research/hawaii/outcomes.json`. Sources are in `docs/research/hawaii/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/hawaii/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), moved to Hawaiʻi's codes (`src/content/hawaii/plan/`). Units with no Hawaiʻi standard in their grade are left out; HCCS-M moves a few skills (Grade 7 angle relationships are practised in Grade 8, the Pythagorean theorem and similar figures in Grade 9). Science units built around California places are `hi-` copies with Hawaiʻi examples (Kīlauea and Mauna Loa, trade winds and kona storms, tsunamis, the nēnē and ʻōhiʻa, coral reefs, koa and kalo, the Hawaiian hot spot, solar and wind power on the islands, invasive species).
- **Social studies** follows HCSSS grade by grade: roles at home and school with Hawaiʻi's islands, mauka and makai and its symbols (K); the island community, weather and natural hazards, and caring for the environment (1); leaders and difference makers, family journeys and making and trading (2); migration to Hawaiʻi, world maps and the continents and oceans, cultures and money and voting (3); **Hawaiʻi studies** (4: the islands, voyaging and wayfinding, canoe plants, the ahupuaʻa, Hawaiian values, the aliʻi and a timeline from Cook to Hōkūleʻa; all Hawaiʻi's own units); U.S. studies to the Revolution with the Nations of early North America and explorers, including Cook in 1778 (5); world history and cultures (6); **the Hawaiian Kingdom and Pacific Island Studies** (7: unification, a changing kingdom, land and law, the overthrow, Pacific peoples then and now, a timeline from 1778 to 1898); U.S. history (8); and Modern History of Hawaiʻi and Participation in Democracy (9: annexation, the plantation era, war and statehood, modern Hawaiʻi, U.S. government and economics).
- Hawaiʻi-only units (`hi-` ids, `bankUnit` in `own.ts`) are in `src/content/hawaii/units/`, each with a lesson in `src/content/hawaii/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside U.S. history and civics, and other states' Tribal units are never borrowed (`hawaii.test.ts`). Copies can also drop questions that aren't true for Hawaiʻi (`omit` in `copyOf`): the world-map and continents units leave out "Which continent do we live on?", because Hawaiʻi is on none.
- **Native Hawaiian content:** Native Hawaiians are written about in the present tense as a living people; Hawaiian words carry the ʻokina and kahakō; the overthrow and annexation are told plainly. Nothing sacred or ceremonial: the akua (gods), creation stories, heiau and mana are left out on purpose. Light, and needs review by Native Hawaiian educators before it grows.

## Report card

- Hawaiʻi elementary schools use a standards-based report card, but HIDOE publishes no single set of level names for families, so the app uses the four practice steps of the other states (Beginning, Approaching, Meeting, Exceeding).
- The elementary report card also reports the six General Learner Outcomes, which have their own parent guide.
- State tests: the Smarter Balanced Assessments in English language arts and math (grades 3 to 8 and 11; four achievement levels, 3 and 4 meeting or exceeding), the Hawaiʻi science assessments (grades 5 and 8, Biology 1), the KĀʻEO in Hawaiian for Kaiapuni students, and the HSA-Alternate.

## Parent guides

- `src/content/hawaii/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the General Learner Outcomes (`/guides/hawaii/general-learner-outcomes/`) and state tests (`/guides/hawaii/state-tests/`; dates point to HIDOE). No French guide.

## Schools

- `/privacy/` (`src/content/hawaii/schools.ts`) states our commitments under Hawaiʻi's Student Online Personal Information Protection law (HRS 302A-499 and 302A-500, Act 40 of 2016): no targeted advertising, no profiling except for K-12 school purposes, no selling or renting, sharing only as the law allows (with the school and bound service providers), a security program, and deleting a student's information when the school asks. FERPA and COPPA apply as everywhere. HIDOE is one statewide district, so a school agreement would be with HIDOE.

## Known gaps

- HCSSS standards about the akua, creation stories (SS.4.1.18.1, SS.4.5.6.1) and mana (SS.4.5.6.2) have no unit, on purpose (sacred content).
- English language arts standards that need writing, speaking or fluency have no unit.
- Hawaiian language (ʻŌlelo Hawaiʻi) and the Kaiapuni curriculum are not taught.
- Native Hawaiian content is light and needs review before it grows.
- HCCS-M is new (phased in from 2027-28); math units for skills it moves between grades were placed in the new grade only where an existing unit fits.
