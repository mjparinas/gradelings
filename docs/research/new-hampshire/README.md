# New Hampshire: sources and checking record

New Hampshire (`us-nh`, slug `new-hampshire`) follows the standards adopted by the New Hampshire State Board of Education and published by the New Hampshire Department of Education (https://www.education.nh.gov/). Checked October 27, 2026.

## Sources (in `source/`)

The Department's site (www.education.nh.gov) and the General Court's statutes site (gc.nh.gov) answer automated downloads with "Access Denied" (HTTP 403), so their files are not committed. `fetch.sh` instead downloads New Hampshire's standards from the Achievement Standards Network (ASN, https://asn.desire2learn.com), which publishes each New Hampshire document statement by statement with its code, text and grade levels, and names the official file it was built from. `SHA256SUMS` records the files as committed. If the owner downloads the Department's PDFs by hand, commit them here beside the ASN copies.

| File | Document |
| --- | --- |
| `asn-math-D2522215.json` (+ `-document.json`) | NH Common Core State Standards for Mathematics (2010), the New Hampshire College and Career Ready Standards for mathematics, with the eight Standards for Mathematical Practice |
| `asn-ela-D2522919.json` (+ `-document.json`) | NH Common Core State Standards for English Language Arts & Literacy (2010) |
| `asn-science-D2777191.json` (+ `-document.json`) | NH Career & College-Ready Science Standards (NGSS), adopted 2016 |
| `asn-social-D10002B7.json` (+ `-document.json`) | K-12 Social Studies New Hampshire Curriculum Framework (2006), built from the Department's `frameworks.pdf` |
| `asn-new-hampshire.html` | ASN's list of New Hampshire documents and their status |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,726 standards: math 385, language 414, science 338, social studies 589): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/new-hampshire/contract.ts`.

## Codes

- **Mathematics:** the Common Core codes, `K.CC.4`, `4.NBT.1`, `8.F.4`. Grade 9 cites the high school standards with a hyphen, `A-SSE.1`, `F-IF.4` (ASN prints `A.SSE.1`).
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.1`.
- **Science:** NGSS performance expectation codes, `K-PS2-1`, `4-PS3-2`. Middle school codes (`MS-LS1-1`) are listed under Grades 6, 7 and 8, and high school codes (`HS-ESS2-4`) under Grade 9.
- **Social studies:** the framework's own codes, `SS:CV:4:2.1`: strand (CV civics and government, EC economics, GE geography, HI US and New Hampshire history, WH world history and contemporary issues), the last grade of the span (2 for K-2, 4 for 3-4, 6 for 5-6, 8 for 7-8, 12 for 9-12), then standard and expectation. Each grade lists its span's expectations; Grade 9 lists the 9-12 span. `new-hampshire.test.ts` checks every social studies citation uses its grade's span.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), because New Hampshire teaches the same Common Core and NGSS standards. Borrowed science units built around California places are `nh-` copies with New Hampshire examples (`copyOf`, `units/science-g*.ts`: the White Mountains and Mount Washington, the Merrimack and Connecticut Rivers, Great Bay, granite and glacial sand and gravel, nor'easters and spring floods), and borrowed units that name another state's places are filtered `nh-` copies (`localCopy`, `units/copies-g*.ts`).
- Social studies: the framework sets expectations for grade spans, not grades, so the grades follow the usual order inside each span: community and nation (K to 2), New Hampshire's regions and communities (3), New Hampshire history, geography and government (4), United States history to the Constitution (5), the ancient world (6), the world after the ancient era (7), United States history and civics with New Hampshire's part in it (8), and high school civics and economics with personal finance (9).

## Guides

- **Mathematical Practices** (`/guides/new-hampshire/math-practices/`): the eight Standards for Mathematical Practice in the mathematics standards.
- **State tests** (`/guides/new-hampshire/state-tests/`): the New Hampshire Statewide Assessment System (NH SAS: language arts and math in grades 3 to 8, science in grades 5, 8 and 11), four achievement levels, and the SAT in grade 11. The Department's assessment pages couldn't be downloaded, so the page keeps to the program's lasting facts and points families to the Department for dates.

## Schools

- RSA 189:68-a (student online personal information, 2015) sets the rules for operators of sites and apps used for K-12 school purposes: no targeted advertising, no profiling except for school purposes, no selling, disclosure only as allowed, reasonable security, and deletion when the school asks. `src/content/new-hampshire/schools.ts` states our commitments under it. The statutes site refused automated downloads, so the text is not committed.
