# Arizona Academic Standards: sources and checking record

Arizona (`us-az`, slug `arizona`) follows the academic standards the Arizona State Board of Education adopts and the Arizona Department of Education (ADE) publishes at azed.gov/standards-practices. Files read on 14 October 2026.

The source documents are committed in `source/` (checksums in `source/SHA256SUMS`, a `.txt` extract beside each PDF), so the record can be rebuilt even if ADE moves or replaces a file:

```bash
python3 -I build_outcomes.py source                          # needs pdfplumber
xvfb-run -a ./fetch.sh /tmp/arizona-src && python3 -I build_outcomes.py /tmp/arizona-src   # fresh copies; replace source/ if they changed
```

azed.gov sits behind a Cloudflare browser check that answers curl with a challenge page. `fetch.sh` opens a headed Chromium through Playwright (under `xvfb-run` on a machine without a display), waits for the check to pass, and fetches each file from inside the page.

## Sources

| Subject | Document | File |
| --- | --- | --- |
| Mathematics | Arizona Mathematics Standards (adopted December 2016), one document per grade; Grades 3 to 8 are the 2025 editions that mark the essential standards; Algebra 1 for Grade 9 | `math-k.pdf` to `math-8.pdf`, `math-algebra-1.pdf` |
| English language arts | Arizona English Language Arts Standards (adopted 2016), one document per grade; Grades 3 to 8 are the 2025 editions with essential standards; Grades 9–10 for Grade 9 | `ela-k.pdf` to `ela-8.pdf`, `ela-9-10.pdf` |
| Science | Arizona Science Standards (adopted October 2018), complete K–12 set (March 2022 edition) | `science.pdf` |
| History and social science | Arizona History and Social Science Standards (adopted October 2018, updated 23 August 2019) | `social.pdf` |
| State tests | ADE Assessments Overview 2026–2027 | `assessments-overview.pdf` |

Every URL is listed in `fetch.sh`; all are under azed.gov/sites/default/files/.

## What `outcomes.json` holds

Keys are `"<grade>/<subject>"`; each entry has `idx` (the code a unit cites), `kind` and the standard's text.

| Subject | How a unit cites it | Entries per grade (K to 9) |
| --- | --- | --- |
| Math | Codes as printed, with cluster letters: `4.NBT.A.1`. Grade 1 splits `1.MD.B.3` into `3a` (time) and `3b` (coins). The Kindergarten document prints `K.0A` with a zero; it is read as `K.OA`. Grade 9 cites Algebra 1 (`A1.A-SSE.A.1`, `A1.F-IF.B.4`). | 23, 22, 26, 26, 29, 27, 29, 23, 30, 43 |
| ELA | Codes as printed: `4.RL.1`, `4.RI.2`, `4.RF.3`, `4.W.1`, `4.SL.1`, `4.L.4`; Grade 9 `9-10.RL.1`. Placeholders such as "(Begins in grade 2)" are left out. | 41, 43, 41, 42, 43, 43, 41, 41, 41, 41 |
| Science | Arizona's own codes: grade, core idea for knowing (P physical, E earth and space, L life) with U for using science, then the number: `4.P4U1.1`. Grade 9 lists the high school standards (`HS.L2U1.20`); a few advanced ones are printed with a `+` and kept as printed. | 8, 11, 10, 8, 10, 12, 14, 11, 11, 72 |
| Social studies | Grade, strand and anchor standard, number: `4.H2.1`. Strands are SP (disciplinary skills and processes), C (civics), E (economics), G (geography) and H (history). Grade 9 lists the high school standards (`HS.C2.1`). | 21, 31, 35, 30, 25, 29, 38, 55, 66, 94 |

### Parsing notes

- Math and ELA documents lay the standards out in tables, one grade per document; the script reads each table row's code and text. A stray space inside a printed code ("7. NS.A.1") is closed up.
- Science pages have two columns; only the left column (the standards) is read, because the right column ("Crosscutting Concepts & Background Information") starts at different places on different pages. Reading starts at Kindergarten's physical science page; earlier pages list changes and examples.
- Social studies standards are bulleted lists under each anchor standard; each code starts a new entry.

## Grade placement

- Math and English language arts follow California's placement, since Arizona's 2016 standards are close to the Common Core: the same units from the same files, with every citation converted to Arizona's codes and checked one by one.
- Science follows Arizona's own grade placement, which differs from the Next Generation Science Standards: light and sound in Grade 3, energy, electric currents and magnets in Grade 4, the solar system, tides and seasons in Grade 6, cells and Newton's laws in Grade 7, chemical reactions and heredity in Grade 8. Units are copied from whichever grade teaches the topic elsewhere.
- Social studies follows Arizona's grade themes: Children as Citizens (K), Communities: Living and Working Together (1), The World Around Me (2), **Arizona Studies (3)**, Regions and Cultures of the Americas (4), United States Studies: American Revolution to Industrialism (5), Global Studies: Eastern Hemisphere (6), Integrated Global Studies (7), Citizenship and Civic Engagement in Today's Society (8); Grade 9 is civics, as in the other states, with the Arizona Constitution, Arizona's government and the American civics test Arizona students pass to graduate.
- Arizona-only units (`az-` ids): Grade 3 social studies (land and regions, a timeline of Arizona, Arizona's Native Nations, governing Arizona, Arizona's economy), Grade 7 Industry & Empire and Grade 9 social studies (the Arizona Constitution, governing Arizona, the civics test). Filtered `az-` copies of other states' units, without the questions that name another state, Tribes or treaties and with Arizona items added, are in K, 2, 7, 8 and 9 social studies and Grades 4 and 8 science.

## Competencies page

The eight Standards for Mathematical Practice, which the Arizona Mathematics Standards list for every grade, are the competencies page (`/guides/arizona/math-practices/`). They are taught inside math lessons and not graded on their own.

## Report card and state tests

- No statewide report card scale; districts and charter schools choose, and many elementary schools use standards-based 1 to 4 reporting. The framework uses the four practice steps (Beginning, Approaching, Meeting, Exceeding). Schools get A–F letter grades from the state, which are about the school, not the child.
- From the Assessments Overview 2026–2027: AASA (Arizona's Academic Standards Assessment) in English language arts and math in grades 3 to 8; AzSCI (Arizona's science test) in grades 5, 8 and 11; ACT Aspire in grade 9 and the ACT with Writing in grade 11. Move On When Reading uses the Grade 3 reading results. Dates change each year, so the guide points to ADE.

## Known gaps

- Arizona's 22 federally recognized Tribes appear in Grade 3 and Grade 9 units, lightly and in the present tense, with nothing sacred or ceremonial.
- Writing, speaking and listening, and fluency standards in ELA, and the science and engineering practices, are covered only where California's placement already covers them.
- Grade 7 and Grade 8 social studies use mostly borrowed and copied units; Arizona's standards there are broad themes rather than an Arizona course.
