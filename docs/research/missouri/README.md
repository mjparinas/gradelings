# Missouri (`us-mo`): sources and checking record

Missouri is the framework `us-mo`, slug `missouri`: Kindergarten to Grade 9 in math, English language arts, science and
social studies (no French). Built October 24, 2026.

## Sources

Every document is in `source/`, with a `.txt` extract of each PDF and Word file, and `SHA256SUMS`. `fetch.sh` downloads
them again (plain curl with a browser user agent works on dese.mo.gov; each `/media/pdf/<name>` address is a viewer page
whose `src` is the file). `build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly.

- **Missouri Learning Standards, Grade-Level Expectations** (Missouri Department of Elementary and Secondary Education,
  DESE; adopted by the State Board of Education in April 2016): the State Board grids for math, English language arts,
  science and social studies (`curr-mls-standards-*-sboe-2016.pdf`), the coding sheet (`curr-mls-coding-sheet.pdf`) and
  the personal finance course-level expectations.
- **Math:** the expanded expectations per grade, Algebra 1 and Geometry, and the Department's crosswalks from the 2010
  (Common Core) standards to the 2016 expectations (`cur-mls-crosswalk-ma-*.pdf`).
- **English language arts:** the standards with examples (K-5, 6, 7, 8, 9-10) and the K-5 and 6-12 crosswalks.
- **Science:** the K-5 and 6-12 grids (read with `pdftotext -raw`, because the grid prints each cell twice, offset).
- **Social studies:** the teacher views (K-5, middle school American history, geography and world history, high school
  government, American history and world history) and the crosswalks.
- **Statutes** (Revisor of Statutes, revisor.mo.gov): sections 170.011 (the US and Missouri Constitutions course and
  test), 170.345 (the civics test for graduation), 167.268 and 167.645 (reading assessments and reading success plans),
  161.096 (the state's own student data system) and 407.1500 (breach notice).

## Codes

See the docstring of `build_outcomes.py` for every format. In short:

| Subject | Format | Example |
| --- | --- | --- |
| Math | grade.domain.cluster.expectation; Grade 9 cites Algebra 1 and Geometry | `4.NBT.A.1`, `A1.LQE.A.3`, `G.CO.A.1` |
| English language arts | K-5 grade.strand.big idea.concept.item; 6-8 grade.strand.big idea.concept; Grade 9 the 9-10 band | `4.R.1.A.a`, `6.RL.1.A`, `9-10.RL.1.A` |
| Science | grade.core idea.component.expectation; middle school one 6-8 band; Grade 9 the 9-12 band | `4.PS3.A.1`, `6-8.LS1.A.2`, `9-12.LS2.A.1` |
| Social studies | K-5 grade.strand.theme.concept.item; 6-8 one band by course; Grade 9 high school Government | `4.H.3.B.a`, `6-8.AH.5.CC.C`, `9-12.GV.3.GS.C` |

Citations are `"CODES · plain text"` (`mos()` in `src/content/missouri/cite.ts`), and `src/content/missouri/contract.ts`
checks every code against `outcomes.json`.

Two typos in the teacher view are fixed while reading (`build_outcomes.py`, `social()`): Grade 4 Governance Systems codes
printed without the theme number (`4.GS.A` for `4.GS.2.A`) and `3.E.G.5` for `3.EG.5`.

## Placement

- **Math and English language arts** follow California's placement where Missouri teaches the same idea in the same
  grade, with Missouri codes.
- **Science** has Missouri's own Kindergarten to Grade 5 placement (forces and motion in Grade 4, light in Grade 5).
  Middle school is one band; the placement follows California's integrated model (Earth and space mostly in 6, life and
  ecosystems in 7, space and physical science in 8). Units built around another state's places are Missouri copies with
  Missouri examples (`units/science-g*.ts`).
- **Social studies:** Kindergarten to Grade 2 from the child to the community and nation (American symbols in 1, Missouri's
  regions in 2), **Missouri studies in Grade 3** (all Missouri's own units), United States history before 1800 in Grade 4
  and after it in Grade 5, world geography in 6, world history to about 1450 in 7, American history to about 1870 with
  Missouri as the crossroads of the nation in 8, and Government in 9 (with the US and Missouri Constitutions and the civics
  test, both required for graduation).

## Known gaps

- **Expectations with no text in the sources:** the teacher views print these codes with an empty cell, so no unit cites
  them: 2.TS.7.B.a, 2.TS.7.C.a, 2.TS.7.C.b, 2.TS.7.E.b, 3.H.3.G.b, 3.PC.1.C.a, 4.GS.2.A.a, 4.H.3.D.b, 4.PC.1.B.a,
  6-8.AH.4.CC.B, 6-8.AH.4.EC.C, 6-8.GEO.2.G.A, 6-8.GEO.2.GS.A, 6-8.WH.1.PC.B, 9-12.GV.2.EC.A, 9-12.GV.3.CC.C,
  9-12.GV.3.PC.A, 9-12.GV.4.EC.A. Recheck them against the State Board grids when DESE republishes.
- **Science:** 2.PS2.A.1 (Missouri's Grade 2 pushes and pulls) and the high school heredity and evolution expectations
  9-12.LS3.B.1, 9-12.LS3.B.2 and 9-12.LS4.A.2 have no unit yet.
- **English language arts:** writing, speaking and listening, fluency and reading-range expectations need free text or
  voice, so no unit practises them.
- **Native content** (the Osage, Missouria and the Mississippian mound builders) is light, in the present tense, with
  nothing sacred or ceremonial; it needs partner review before it grows. No federally recognized tribe is headquartered
  in Missouri today.
- **Middle school order** varies by district (the 6-8 bands), so a Missouri child may meet a topic a year earlier or later
  at school.

## Report card and tests

Missouri has no statewide report-card scale, so the framework uses the four practice steps the other states use. State
tests are the Missouri Assessment Program (MAP): Grade-Level Assessments in English language arts and math in grades 3 to
8 and science in grades 5 and 8, End-of-Course assessments in high school (Algebra I, English II, Biology and Government
required), four achievement levels (Below Basic, Basic, Proficient, Advanced), and reading assessments with reading success
plans in kindergarten to 3rd grade (section 167.645, RSMo).

## Schools

Missouri has no student online privacy statute for technology providers: section 161.096 covers the state's own data
system. `/privacy/` and `docs/school/` give Missouri schools the same commitments as the other states', with breach notice
under section 407.1500.
