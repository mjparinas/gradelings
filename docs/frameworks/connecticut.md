# Connecticut

## Framework

- **Id and slug:** `us-ct`, `connecticut`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Connecticut's world language standards aren't a subject the app follows yet). Offered to families and in classroom mode.

## Standards

- Adopted by the Connecticut State Board of Education: the Connecticut Core Standards for mathematics (the Common Core, 2010; `4.NBT.A.1`, with the cluster letter as the State Department of Education prints it; Grade 9 cites the high school standards without "HS", `A-SSE.A.1`) and for English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), the Next Generation Science Standards (adopted November 4, 2015; `4-PS3-2`, `MS-LS1-1`, `HS-LS2-6`) and the Connecticut Elementary and Secondary Social Studies Standards (adopted October 4, 2023; `K.Civ.1.a`, `3.His.3.a`; Grade 9 cites the high school Civics and Government course, `CG.Civ.1.a`).
- Citations are `"CODES · text"` (`ctcs()` in `src/content/connecticut/cite.ts`), checked by `src/content/connecticut/contract.ts` against `docs/research/connecticut/outcomes.json`. Sources are in `docs/research/connecticut/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/connecticut/README.md`.

## Content

- **Math, English language arts and science** follow California's placement (the same Common Core and NGSS standards) with Connecticut codes (`src/content/connecticut/plan/`). Borrowed science units built around California places are `ct-` units or copies with Connecticut examples: habitats, land and water (2), Dinosaur State Park fossils and nor'easters (3), hurricanes, storm surge and Millstone and offshore wind (4), reservoirs and the Quinnipiac River (5), weather, climate and the mountain laurel (6), brownstone, glacial stone walls and salt marshes (7), the 2024 eclipse and dinosaur tracks (8), and ospreys, shad and Long Island Sound (9).
- **Social studies** follows the 2023 standards' grade themes: Understanding My Communities (K); Society and Ourselves, with Connecticut on the map, its Native nations and cultural communities (1); Contributing to Society, with local leaders and government (2); **Connecticut and Local History** (3: government and how a bill becomes a law, the Native nations of Connecticut, its people, land and industries, all Connecticut's own units); United States Geography (4: regions, settlement and migration, hazards and climate); United States History I (5: exploration, the colonies, colonial Connecticut and the Fundamental Orders, Connecticut in the Revolution); World Regional Studies I and II (6: Latin America and Europe; 7: Africa and Asia, population and economies); United States History II (8: Connecticut and the nation from the founding to Reconstruction, a timeline, and the Constitution and the Connecticut Compromise); and the high school Civics and Government course (9: governing Connecticut, the nation, the economy and civic life).
- Connecticut-only units (`ct-` ids, `bankUnit` in `own.ts`) are in `src/content/connecticut/units/`, each with a lesson in `src/content/connecticut/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`; Long Island Sound is allowed) outside the US geography, history, world regions and civics grades, and other states' Tribal units are never borrowed (`connecticut.test.ts`).
- **Native content:** the Mashantucket Pequot Tribal Nation and the Mohegan Tribe are named in the present tense as sovereign nations with their own governments, and the state-recognized nations as living communities; the Pequot War, Samson Occom and place names are told plainly, with nothing sacred or ceremonial. Light, and needs partner review before it grows. Slavery in Connecticut, gradual abolition, the 1833 Black Law and the 1865 vote on Black suffrage are told plainly.

## Report card

- Connecticut has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests are Smarter Balanced in English language arts and math (grades 3 to 8; Level 1 Not Met, Level 2 Approaching, Level 3 Met, Level 4 Exceeded), the Next Generation Science Assessment (grades 5, 8 and 11) and the SAT School Day (grade 11), with the Connecticut Alternate Assessment for students with the most significant cognitive disabilities.

## Parent guides

- `src/content/connecticut/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/connecticut/math-practices/`) and the state tests (`/guides/connecticut/state-tests/`; dates point to the State Department of Education). No French guide.

## Schools

- **Connecticut.** `/privacy/` (`src/content/connecticut/schools.ts`) states our commitments under Connecticut's student data privacy law, Conn. Gen. Stat. §§ 10-234aa to 10-234dd: security that meets industry standards and deletion within a reasonable time when the school, a parent or the student asks (§ 10-234cc(a)); no targeted advertising, no use for other than school purposes, no sale and only the disclosures the law allows (§ 10-234cc(b) to (d)); and notice to students and parents of a breach within 30 days of finding it (§ 10-234dd(b)). § 10-234bb asks a school's contract with a contractor to cover ownership, deletion, security, breach notice and more; districts often use the state's uniform terms-of-service addendum (§ 10-234ff). Confirm the district's contract before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 social studies is the Civics and Government course only; Modern World History and United States History III aren't cited.
- Native content is light and needs partner review before it grows.
- No French subject for Connecticut yet.
