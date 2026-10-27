# Delaware: sources and checking record

Delaware (`us-de`, slug `delaware`) follows the content standards adopted by the Delaware State Board of Education (14 DE Admin. Code 501) and published by the Delaware Department of Education (https://education.delaware.gov/). Checked October 27, 2026.

## Sources (in `source/`)

The Department's site (education.delaware.gov) answers automated downloads with a Cloudflare challenge (HTTP 403), and the Register of Regulations (regulations.delaware.gov) is a JavaScript app with no plain pages, so neither is fetched. `fetch.sh` instead downloads Delaware's standards from the Achievement Standards Network (ASN, https://asn.desire2learn.com), which publishes each Delaware document statement by statement with its code, text and grade levels and names the official file it was built from; the Delaware Code from delcode.delaware.gov; and the administrative code sections from Cornell's Legal Information Institute (law.cornell.edu). `SHA256SUMS` records the files as committed. If the owner downloads the Department's files by hand, commit them here beside the ASN copies.

| File | Document |
| --- | --- |
| `asn-math-D2547470.json` (+ `-document.json`) | Common Core State Standards for Mathematics (2010), Delaware's mathematics standards, with the eight Standards for Mathematical Practice |
| `asn-ela-D2548174.json` (+ `-document.json`) | Common Core State Standards for English Language Arts & Literacy (2010), built from the Department's coded files |
| `asn-science-D2603111.json` (+ `-document.json`) | Next Generation Science Standards (2013), Delaware's science standards |
| `asn-civics-D21189430.json` (+ `-document.json`) | Delaware Standards for Civics (2018), built from the Department's `DE K-12 Civics Standards 2018.docx` |
| `asn-economics-D21189461.json` (+ `-document.json`) | Delaware Standards for Economics (2018) |
| `asn-geography-D21189484.json` (+ `-document.json`) | Delaware Standards for Geography (2018) |
| `asn-history-D21189378.json` (+ `-document.json`) | Delaware Standards for History (2018) |
| `asn-de.html` | ASN's list of Delaware documents and their status |
| `delcode-14-c081a-student-data-privacy.html` | 14 Del. C. ch. 81A, the Student Data Privacy Protection Act (§§ 8101A to 8106A) |
| `delcode-14-c041-sc01-regulatory-provisions.html` | 14 Del. C. ch. 41, subchapter I: required instruction, including Holocaust (§ 4141), Black history (§ 4143), evidence-based K-3 reading (§ 4145), media literacy (§ 4146) and the half credit of financial literacy (§ 4152) |
| `admin-code-14-101-3.0-assessments.html` | 14 DE Admin. Code 101-3.0: who takes the state tests |
| `admin-code-14-101-5.0-levels.html` | 14 DE Admin. Code 101-5.0: the four performance levels |
| `admin-code-14-501-1.0-content-standards.html` | 14 DE Admin. Code 501-1.0: the content standards documents schools must follow |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,347 entries; 1,090 distinct standards: math 385, language 411, science 208, social studies 86): each standard becomes `{"idx": code, "kind": ..., "content": text}` under every `<grade>/<subject>` it covers. Only `idx` is checked by `src/content/delaware/contract.ts`. ASN's financial literacy document is not used: the Grade 9 personal finance unit cites the economics standards.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards with a hyphen, `A-SSE.1`, `F-IF.4` (ASN prints `A.SSE.1`).
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1` (ASN prints `CC4RL2` and `CC9-10RL1`).
- **Science:** NGSS performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** the 2018 standards' own benchmark codes, `H.4.4-5.a`: discipline (C civics, E economics, G geography, H history), standard number, grade cluster (K-3, 4-5, 6-8, 9-12) and benchmark letter. Each grade lists its cluster's benchmarks; Grade 9 lists the 9-12 cluster. ASN prints two codes out of pattern, `G.14-5.a` and `G.1.9-12b`, which `build_outcomes.py` reads as `G.1.4-5.a` and `G.1.9-12.b`. `delaware.test.ts` checks every social studies citation uses its grade's cluster.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because Delaware teaches the same Common Core and NGSS standards. Borrowed science units built around another state's places are `de-` copies with Delaware examples (`copyOf`, `units/science-g*.ts`: Delaware Bay and its horseshoe crabs and red knots, the Inland Bays, Bombay Hook, Cape Henlopen, the Delmarva fox squirrel, hurricanes and nor'easters, belemnite fossils, solar farms and the Lewes wind turbine), and borrowed units that name another state's places are filtered `de-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies: the standards set benchmarks for grade clusters, not grades, so the grades follow the usual order inside each cluster: community and nation (K to 2), Delaware's counties, regions and communities (3), Delaware history, geography and government (4, the cluster that asks students to connect state and national history), United States history to the Constitution (5), the ancient world (6), the world after the ancient era (7), United States history to Reconstruction with Delaware's part in it (8), and high school civics and economics with personal finance (9).
- Delaware's own Grade 3, 4 and 5 units teach the Lenape and Nanticoke peoples in the present tense, as living communities, with nothing sacred or ceremonial.

## Guides

- **Mathematical Practices** (`/guides/delaware/math-practices/`): the eight Standards for Mathematical Practice in the mathematics standards.
- **State tests** (`/guides/delaware/state-tests/`): the Delaware System of Student Assessments (DeSSA) as 14 DE Admin. Code 101-3.0 and 101-5.0 set it out: language arts and math in grades 3 to 8 and 11 (Smarter Balanced in grades 3 to 8, the SAT in grade 11), science in grades 5 and 8 and high school Biology, social studies in grades 4 to 8 and 11, and four performance levels. The Department's assessment pages couldn't be downloaded, so the page keeps to these lasting facts and points families to the Department for dates.

## Schools

- The Student Data Privacy Protection Act (14 Del. C. ch. 81A) sets the rules for operators of sites and apps used for K-12 school purposes: no targeted advertising, no profiling except for school purposes, no selling, disclosure only as § 8105A allows (including to service providers bound by contract), reasonable security, and deletion within 45 days when a school or district asks (§ 8104A). `src/content/delaware/schools.ts` states our commitments under it.
