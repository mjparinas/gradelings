# Wyoming

## Framework

- **Id and slug:** `us-wy`, `wyoming`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Wyoming has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- The Wyoming Content and Performance Standards, adopted by the State Board of Education (Chapter 10 rules): English language arts (2012, the Common Core; `RL.4.1`, `L.4.1.a`; Grade 9 cites `RL.9-10.1`), mathematics (2023, a priority set built on the Common Core; `4.OA.3a` with no dot before the letter, high school `A.REI.3`), science (2023, a priority set from the NGSS; `4-PS3-4`, middle school `MS-LS1-3` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (2014 with the 2018 Indian Education for All benchmarks; bands `SS2.1.2`, `SS5.4.2`, `SS8.4.4.a`, `SS12.1.5.a`).
- Citations are `"CODES · text"` (`wys()` in `src/content/wyoming/cite.ts`), checked by `src/content/wyoming/contract.ts` against `docs/research/wyoming/outcomes.json`. Sources are in `gradelings-research/wyoming/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/wyoming/README.md`.

## Content

- **Math and English language arts** follow Michigan's placement (and so California's), keeping each unit's codes that are in Wyoming's lists.
- **Science:** Wyoming's 2023 standards keep only a few expectations a grade, so units are placed only where they practise one of them, and K-3 are filled with a few more units that fit those expectations (see the research README). Science units built around California places are `wy-` copies with Wyoming examples (sagebrush and pronghorn, the Tetons and the Wind River Range, Yellowstone, the North Platte and Green rivers, coal, trona and reclamation, sage grouse and black-footed ferrets, wolves and the 1988 fires, the 2017 eclipse). Grade 3 has Wyoming's own weather hazards unit (blizzards, snow fences, wind, hail, wildfire).
- **Social studies** follows the bands: the flag and Wyoming's symbols (K); Wyoming then and now (1); symbols, difference makers, family journeys and trade (2); people on the move, Wyoming's regions, and money, taxes and voting (3); **Wyoming studies** (4: the land, the Eastern Shoshone and Northern Arapaho, the Equality State, furs, cattle, coal and parks, people, governing Wyoming and a timeline, all Wyoming's own units); explorers, the colonies, the Revolution, the Constitution and Trails West (5); the ancient world (6); the world after the ancient era (7); United States history and civics with **Wyoming and the West** (8); and governing Wyoming, United States government, personal finance and economics (9).
- Wyoming-only units (`wy-` ids, `bankUnit` in `own.ts`, `timelineUnit` in `units/kit.ts`) are in `src/content/wyoming/units/`, each with a lesson in `src/content/wyoming/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside its own units, the history and civics grades (social 5, 8 and 9) and the exemptions listed in `contract.ts`, and other states' Tribal units are never borrowed (both checked by `src/content/contract.test.ts`).
- **Tribal content:** the Eastern Shoshone and Northern Arapaho are named in the present tense as sovereign, living nations sharing the Wind River Reservation; federal policy is told plainly; nothing sacred or ceremonial. W.S. 21-4-602 puts their history, culture and contributions in the social studies standards. Needs review by the nations' educators before it grows.

## Report card

- Wyoming has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: WY-TOPP in English language arts and math (grades 3 to 10) and science (grades 4, 8 and 10), with four levels (Below Basic, Basic, Proficient, Advanced); WY-ALT is the alternate test; juniors take the ACT. W.S. 21-9-102 requires instruction in the United States and Wyoming constitutions and an exam on them to graduate.

## Parent guides

- `src/content/wyoming/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Math Practices (`/guides/wyoming/math-practices/`) and state tests (`/guides/wyoming/state-tests/`; dates point to the Department). No French guide.

## Schools

- **W.S. 21-2-202(a)(xxxvii) and 21-3-110(a)(xxxv):** the state superintendent sets guidelines for the collection, access, privacy, security and use of student data, and each district adopts a policy that follows them (and FERPA). `/privacy/` (`src/content/wyoming/schools.ts`) states that we support the district's policy, use data only to provide the service and never for advertising, disclose it only to the school and our listed providers, keep reasonable security, delete on request and give breach notice. Confirm a district's own data agreement terms before signing.

## Known gaps

- Wyoming's 2023 math and science standards are priority sets: math units whose codes are not in the set are left out, and science expectations outside the set (for example K-ESS2-1 weather, 3-LS4-1 fossils, 4-ESS3-1 energy resources) have no unit, even where other states teach them in that grade.
- English language arts standards that need writing, speaking or fluency have no unit. The new ELA standards (in progress since 2021) are not adopted yet; codes will change when they are.
- The Math Practices (MP1 to MP8) aren't cited by units.
- The social studies standards are due for review in 2026-27.
- Tribal content needs review by the Eastern Shoshone and Northern Arapaho educators before it grows.
