# Vermont: sources and checking record

Vermont (`us-vt`, slug `vermont`) follows the standards adopted by the Vermont State Board of Education and published by the Vermont Agency of Education (https://education.vermont.gov/). Checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below; `SHA256SUMS` records them as committed, and each PDF has a `.txt` extract (`pdftotext -layout`). The Agency of Education publishes the Common Core and NGSS by linking to the national documents rather than as Vermont files with their own codes, so the standards themselves come from the Achievement Standards Network (ASN, https://asn.desire2learn.com), which publishes each document statement by statement with its code, text and grade levels. ASN has no Vermont copy of the C3 Framework, so the social studies standards are ASN's copy of the National Council for the Social Studies document Vermont adopted; the Agency's own files record the adoption and the grade themes.

| File | Document |
| --- | --- |
| `asn-math-D2472998.json` (+ `-document.json`) | Common Core State Standards for Mathematics (2010), Vermont's mathematics standards, with the eight Standards for Mathematical Practice |
| `asn-ela-D2473702.json` (+ `-document.json`) | Common Core State Standards for English Language Arts & Literacy (2010) |
| `asn-science-D2599182.json` (+ `-document.json`) | Next Generation Science Standards (2013), Vermont's science standards |
| `asn-social-c3-D2607350.json` (+ `-document.json`) | College, Career, and Civic Life (C3) Framework for Social Studies State Standards (NCSS, 2013) |
| `asn-vermont.html` | ASN's list of Vermont documents and their status |
| `aoe-state-board-item-092017-d2.pdf` | State Board of Education agenda item, September 20, 2017: adoption of the C3 Framework as Vermont's social studies standards |
| `aoe-vermont-framework-for-k-8-social-studies.pdf` | The Agency's Vermont Framework for K-8 Social Studies (grade themes and inquiry design) |
| `aoe-k-8-sample-scope-and-sequence.pdf` | The Agency's sample K-8 scope and sequence |
| `aoe-grade-k-…` to `aoe-grade-8-…` (9 PDFs) | The Agency's grade documents: Me and My Community (K), People, Places and the Environment (1), The Americas (2), Global Interactions (3), Vermont, the Early Republic and the US, pre-colonial times to the Civil War (4), World Geography and Ancient Civilizations I (5) and II (6), The US and Vermont from Reconstruction to the Civil Rights Movement (7), Civics and Economics in Action (8) |
| `aoe-statewide-assessments.html` | The Agency's statewide assessments page (VTCAP, MSAA, ACCESS, testing windows) |
| `ncss-c3-framework-rev0617.pdf` | The C3 Framework itself (NCSS, revised June 2017) |
| `vtcap-2026-score-interpretation-guide.pdf` | Cognia's VTCAP Spring 2026 Score Interpretation Guide (grades and subjects, the 1500-2000 scale, four performance levels) |
| `vsa-09-chapter-062-personal-information.html` | 9 V.S.A. chapter 62, including subchapter 3A, Student Privacy (§§ 2443 to 2443f) |
| `vsa-16-section-164-state-board.html` | 16 V.S.A. § 164, the State Board's duty to adopt standards |
| `vsa-01-chapter-023-native-american-affairs.html` | 1 V.S.A. chapter 23, the Vermont Commission on Native American Affairs and state recognition of Native American tribes |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,836 standards: math 385, language 414, science 338, social studies 699): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/vermont/contract.ts`.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards with a hyphen, `A-SSE.1`, `F-IF.4` (ASN prints `A.SSE.1`).
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** NGSS performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** the C3 Framework's Dimension 2 indicators, `D2.Civ.1.3-5`: dimension, discipline (Civ civics, Eco economics, Geo geography, His history), indicator number and grade band (K-2, 3-5, 6-8, 9-12). Each grade lists its band's indicators (Kindergarten to Grade 2 the K-2 band, Grades 3 to 5 the 3-5 band, Grades 6 to 8 the 6-8 band, Grade 9 the 9-12 band). The inquiry indicators of Dimensions 1, 3 and 4 are kept in `outcomes.json` but no unit cites them. `vermont.test.ts` checks every social studies citation uses its grade's band.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because Vermont teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `vt-` copies with Vermont examples (`copyOf`, `units/science-g*.ts`), and borrowed units that name another state's places are filtered `vt-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the grade themes of the Agency's Vermont Framework for K-8 Social Studies (see `src/content/vermont/plan/social.ts`), with Grade 9 as high school civics and economics with personal finance.

## Guides

- **Mathematical Practices** (`/guides/vermont/math-practices/`): the eight Standards for Mathematical Practice in the mathematics standards.
- **VTCAP** (`/guides/vermont/vtcap-tests/`): the Vermont Comprehensive Assessment Program (language arts and math in grades 3 to 9, science in grades 5, 8 and 11), scale scores from 1500 to 2000, four performance levels (Level 3 and above is proficient), the MSAA alternate assessment and ACCESS for English learners, from the Agency's page and the score interpretation guide.

## Schools

- 9 V.S.A. §§ 2443 to 2443f (Student Privacy, added by 2019, No. 89 (Adj. Sess.)) set the rules for operators of sites and apps used for PreK-12 school purposes: no targeted advertising, no profiles except for school purposes, no selling or renting, disclosure only as allowed, reasonable security, and deletion when the school asks. `src/content/vermont/schools.ts` states our commitments under it.
