# Delaware

## Framework

- **Id and slug:** `us-de`, `delaware`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Delaware's standards have no French Immersion or Core French program the app follows). Offered to families and in classroom mode.

## Standards

- Adopted by the Delaware State Board of Education (14 DE Admin. Code 501): math (the Common Core, 2010; `4.NBT.1`; Grade 9 cites the high school standards, `A-SSE.1`), English language arts (the Common Core, 2010; `RL.4.2`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the Next Generation Science Standards, 2013; `4-PS3-2`; middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and social studies (the Delaware Standards for Civics, Economics, Geography and History, 2018, written for grade clusters; `H.4.4-5.a` is History standard 4, the 4-5 cluster, benchmark a; Grade 9 cites the 9-12 cluster, `C.2.9-12.b`).
- Citations are `"CODES · text"` (`des()` in `src/content/delaware/cite.ts`), checked by `src/content/delaware/contract.ts` against `docs/research/delaware/outcomes.json`. The Department of Education's site refuses automated downloads (a Cloudflare challenge), so the standards in `gradelings-research/delaware/source/` are the Achievement Standards Network's copies of each Delaware document, beside the Delaware Code and administrative code sections the guides rely on; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/delaware/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), because the standards are the same (`src/content/delaware/plan/`). Science units built around another state's places are `de-` copies with Delaware examples (Delaware Bay, its horseshoe crabs and red knots, the Inland Bays and their oysters, Bombay Hook, Cape Henlopen, the Delmarva fox squirrel, belemnite fossils, hurricanes and nor'easters, sea-level rise on low beaches, solar farms near Dover and the Lewes wind turbine); borrowed units that name another state's places are filtered `de-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the usual order inside the standards' grade clusters: our flag and Delaware's symbols (K); Delaware then and now (1); American symbols, Legislative Hall and the President, difference makers (Caesar Rodney, Absalom Jones, Annie Jump Cannon, Louis Redding, Joe Biden), family journeys (Fort Christina and the log cabin) and making and trading (chickens, Delaware Bay crabs, the Port of Wilmington) (2); Delaware's counties and regions, people on the move, and money, taxes and voting (3); **Delaware history, geography and government** (4: the land, the Lenape, Nanticoke and early settlers, the First State, mills, farms and jobs, Delawareans who made a difference, governing Delaware and a timeline, all Delaware's own units); United States history to the Constitution with the Eastern Woodland peoples and the explorers of Delaware Bay (5); the ancient world (6); the world after the ancient era (7, adopted from California's Grade 7 and New York's units); United States history to Reconstruction with Delaware and the nation (Separation Day, Caesar Rodney's ride, the small states and the first to ratify, the Brandywine mills, the canal, the Underground Railroad and a slave state that stayed in the Union) and the new nation (8); and civics and economics with governing Delaware (the 1897 constitution, the 41-member House and 21-member Senate, the courts' party balance and the Court of Chancery, the three counties and Kent's Levy Court, no sales tax) and personal finance (9).
- Delaware-only units (`de-` ids, `bankUnit` in `own.ts`) are in `src/content/delaware/units/`, each with a lesson in `src/content/delaware/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`delaware.test.ts`). Lessons for borrowed units are shared by grade and id; a Delaware lesson on a borrowed unit keeps the text the unit already has.
- **Native content:** the Lenape and Nanticoke peoples are named in the present tense as communities living in Delaware today; the Eastern Woodland unit names other nations as living nations with their own governments; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- Delaware has no statewide report card; each district and charter school chooses its own, and many elementary schools use standards-based report cards. The app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests (14 DE Admin. Code 101): the Delaware System of Student Assessments (DeSSA), with Smarter Balanced English language arts and math in grades 3 to 8, science in grades 5 and 8 and high school Biology, and social studies in grades 4 to 8 and 11, each with four performance levels; the SAT in 11th grade for language arts and math.

## Parent guides

- `src/content/delaware/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/delaware/math-practices/`) and state tests (`/guides/delaware/state-tests/`; dates point to the Department of Education). No French guide.

## Schools

- **Delaware.** `/privacy/` (`src/content/delaware/schools.ts`) states our commitments under the Student Data Privacy Protection Act (14 Del. C. ch. 81A): no targeted advertising, no profiling except for school purposes, no selling, disclosure only as § 8105A allows (to the school and to service providers bound by contract), reasonable security, deletion within 45 days when the school asks (§ 8104A), and telling the school about a breach without delay. FERPA and COPPA apply as everywhere. § 8104A also asks operators to follow the state technology department's cloud hosting policy and contract terms, which a district would put in its agreement; confirm them before signing with a district.

## Known gaps

- The Department of Education's own files (the standards documents, the DeSSA guides) couldn't be downloaded (a Cloudflare challenge to automated requests); the committed standards are the Achievement Standards Network's copies. The owner can download the files by hand and commit them.
- English language arts standards that need writing, speaking or fluency have no unit.
- The social studies standards set benchmarks by grade cluster, so a grade's units cite its cluster; not every benchmark in a cluster has a unit. The financial literacy standards (a required half credit under 14 Del. C. § 4152) are not cited separately: Grade 9 personal finance cites the economics benchmarks.
- Grade 9 social studies is civics and economics; high school US history, world history and geography are not taught.
- Required instruction in Black history (§ 4143) and the Holocaust (§ 4141) is not a unit of its own; Black Delawareans' history appears in the Grade 2, 4 and 8 units.
- Native content is light and needs partner review before it grows.
