# Wyoming: sources and checking record

Wyoming (`us-wy`, slug `wyoming`) follows the Wyoming Content and Performance Standards (WYCPS), adopted by the State Board of Education in its Chapter 10 rules and published by the Wyoming Department of Education (WDE) at https://edu.wyoming.gov/. Checked October 28, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF. edu.wyoming.gov puts its web pages behind a browser check (a browser user agent gets a 403), but the files under `/wp-content/uploads/` and `/downloads/` answer plain `curl` with no user agent, so only those are fetched. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `k.pdf`, `g1.pdf` to `g8.pdf`, `hs.pdf` | WDE "All Currently-Adopted Standards" compilations (2025, no PLDs), one per grade and one for high school: every set in force, with ELA 2012, math 2023, science 2023 and social studies 2014+2018 (Grade 8 reposted December 2025) |
| `ela-2012.pdf` | The 2012 English language arts standards on their own (the Common Core) |
| `chapter-10-rules-2025.pdf` | State Board of Education Chapter 10 rules (July 16, 2025), which adopt the standards |
| `adoption-timeline-2025.pdf` | WDE standards adoption and implementation timeline (September 2025) |
| `wy-topp-cut-scores-faq.pdf` | WY-TOPP cut scores FAQ: grades 3 to 10 in ELA and math, science in grades 4, 8 and 10, and the four performance levels |
| `statutes-title-21.pdf` | Wyoming Statutes Title 21 (Education), from wyoleg.gov: 21-2-202(a)(xxxvii) and 21-3-110(a)(xxxv) (student data guidelines and district policies), 21-4-602 (American Indian education in the social studies standards) and 21-9-102 (instruction in, and an exam on, the United States and Wyoming constitutions) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the text copies exactly (1,512 entries across 40 grade-and-subject lists). It needs only the Python standard library. Each item becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`, and band standards are listed under every grade they cover. Only `idx` is checked by `src/content/wyoming/contract.ts`.

## Standards and adoption

- **English language arts (2012):** the Common Core, approved April 27, 2012, in schools by 2015-16. Codes `RL.4.1`, `RI.4.2`, `RF.2.3`, `W.4.1`, `L.4.1.a` (sub-letters with a dot); Grade 9 cites the 9-10 band, `RL.9-10.1`. A new ELA set was started in 2021, halted in 2022 and resumed in 2024; it is not adopted yet.
- **Mathematics (2023):** an audit of the 2018 standards (the Common Core, slightly refined) that sets a priority subset; approved December 21, 2023, signed July 17, 2024, in schools by 2025-26. Codes `4.OA.3`, with sub-letters written without a dot (`4.OA.3a`); high school codes use dots (`A.REI.3`, `F.IF.4`, `S.ID.6`). `K.CC.1` has no text of its own, so units cite `K.CC.1a`. Each grade lists the eight Math Practices (MP1 to MP8) first.
- **Science (2023):** the same kind of audit of the 2016 standards (adapted from the NGSS); approved December 21, 2023, signed July 17, 2024, in schools by 2025-26. It keeps about four to six performance expectations a grade from Kindergarten to Grade 5, one middle school band (`MS-...`, listed under Grades 6 to 8, plus `MS-ETS2-2`) and a high school set (`HS-...`, cited in Grade 9).
- **Social studies (2014, with 2018 additions):** six standards (1 citizenship and government, 2 culture, 3 production and consumption, 4 time, continuity and change, 5 people, places and environments, 6 technology, literacy and global connections) with benchmarks for grade bands: `SS2.x.x` (K-2), `SS5.x.x` (3-5), `SS8.x.x` (6-8) and `SS12.x.x` (9-12). The 2018 additions (Indian Education for All, W.S. 21-4-602) are the lettered benchmarks on the Eastern Shoshone and Northern Arapaho, `SS5.1.5.a`, `SS5.5.3.a.ii`, `SS8.4.4.a`, `SS12.1.5.a`. Due for review in 2026-27.

## Placement

- **Math and English language arts** follow Michigan's placement (and so California's), keeping each unit's codes that exist in Wyoming's grade list. Units whose math codes are not in the 2023 priority set are left out.
- **Science** keeps only units that practise one of Wyoming's priority expectations. To give every K-3 course at least five units and 250 questions, Wyoming adds the Ontario unit "What Living Things Need" (K, `K-ESS3-1`), "Changing Materials" and Ontario's "Objects & Structures" (Grade 2, `2-PS1-2`), Prince Edward Island's "Magnets and Static" (Grade 3, `3-PS2-3`), Manitoba's "Solutions, Technology & Taking Action" (Grade 3, `3-5-ETS1-1`) and its own "Wild Wyoming Weather" (Grade 3, `3-ESS3-1`). Units built around California places are `wy-` copies with Wyoming examples.
- **Social studies** follows the bands: community and nation (K to 2), regions and money (3), Wyoming history and government (4), the colonies, the Revolution, the Constitution and the trails west (5), the ancient world (6), the world after the ancient era (7), United States and Wyoming history and civics (8), and civics, economics and personal finance (9).

## Tribal content

The Eastern Shoshone and Northern Arapaho, who share the Wind River Reservation, are named in the present tense as sovereign, living nations with their own business councils; the Lakota and Cheyenne appear where the trails and the Bozeman Trail crossed their lands. Federal policy (the Fort Bridger Treaty of 1868, the Arapaho placed at Wind River in 1878, allotment, boarding schools) is told plainly. Nothing sacred or ceremonial is described. Needs review by the nations' educators before it grows.
