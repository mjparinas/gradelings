# Maine Learning Results: sources and checking record

Maine (`us-me`, slug `maine`) follows the **Maine Learning Results**, the standards the Maine Department of Education (DOE) sets for every public school. Files read on 14 October 2026 from maine.gov/doe. `fetch.sh` downloads them and `build_outcomes.py` turns them into `outcomes.json`, which `src/content/maine/contract.ts` uses to check every citation.

The source documents are committed in `source/` (read 14 October 2026, checksums in `source/SHA256SUMS`), so the record can be rebuilt even if the DOE moves or replaces a file. To rebuild from them, or to refresh them from the DOE:

```bash
python3 -I build_outcomes.py source                      # needs pdfplumber and python-docx
./fetch.sh /tmp/maine-src && python3 -I build_outcomes.py /tmp/maine-src   # fresh copies; replace source/ if they changed
```

## Sources

| Subject | Document | Page |
| --- | --- | --- |
| Mathematics | Maine Learning Results for Mathematics (adopted 2020), three PDFs: Childhood (K–5), Early Adolescence (6–8), Adolescence (high school) | maine.gov/doe/learning/standards/mathematics |
| English language arts | 2020 Maine ELA Standards (Word) | maine.gov/doe/learning/standardsreview/ela |
| Science | 2019 Maine Learning Results: Science and Engineering (NGSS performance expectations; PDF dated 4.1.2026) | maine.gov/doe/learning/standardsreview/science |
| Social studies | Maine Learning Results: Social Studies, 2019 revision (Word, posted October 2025) | maine.gov/doe/learning/standards/socialstudies |
| State tests | MeCAS calendar | maine.gov/doe/Testing_Accountability/MECAS/calendar |

## What `outcomes.json` holds

Keys are `"<grade>/<subject>"`; each entry has `idx` (the code or name a unit cites) and the standard's text.

| Subject | How a unit cites it | Entries per grade |
| --- | --- | --- |
| Math | Common Core codes with the cluster letter, as Maine writes them: `4.NBT.A.1`. Grade 9 lists the high school codes (`HSN.RN.A.1`, `HSA.SSE.A.1`, `HSF.IF.A.1`, `HSS.ID.A.1`). Maine adds `1.MD.D.5` (coins). | K 22, 1 22, 2 26, 3 25, 4 28, 5 26, 6 29, 7 24, 8 28, 9 154 |
| ELA | No codes: named standards, `Reading 4`, `Writing 2`, `Language 3`, `Speaking and Listening 1`. Grades 6–8 share one span and Grade 9 uses the 9–Diploma span. Reading 1–3 (foundational skills) stop at Grade 2 or 5. | K 25, 1 25, 2 24, 3–5 23, 6–9 22 |
| Science | NGSS codes (`4-PS3-2`, `K-2-ETS1-1`). Maine has one middle school span, so `MS-` codes are listed under Grades 6, 7 and 8; `HS-` codes under Grade 9. | K 13, 1 12, 2 14, 3 18, 4 17, 5 16, 6–8 59, 9 71 |
| Social studies | Named expectations: `Civics & Government 1`–`6` (fewer in some grades), `Personal Finance`, `Economics`, `Global Connections`, `Geography 1`–`2`, `History 1`–`3`. Kindergarten to Grade 5 are per grade; 6–8 and 9–Diploma are spans whose Foundational (F) and Developmental (D) parts are kept as text. | K 13, 1 11, 2 12, 3–5 13, 6–9 10 |

### Parsing notes

- The math PDFs are laid out in columns that pdfplumber mixes, so codes are read from the PDF and the standard's wording comes from the Common Core text (shared with California's record); `MAINE_TEXT` holds Maine's own `1.MD.D.5`. `8 .G.B.8` style spacing is normalised.
- ELA span headings ("Early Adolescence: Grades 6-8", "Adolescence: 9-Diploma") are matched anywhere in the heading. Placeholder rows such as "some learners may enter…" are skipped.
- Social studies span tables have an empty first cell; their F and D parts are read from every cell in the row.

## Grade placement

Maine's middle school science and ELA are spans, and high school is 9–Diploma, so the app places them: math, ELA and science follow California's placement (California teaches the same Common Core and NGSS, with its integrated middle school science), with the citations converted to Maine's codes and names. ELA codes map from Common Core by strand: RL/RI 1→Reading 4, 2→5, 3→6, 4→7, 5→8, 6→9, 7 and 9→11, 8→10; RF 1–3→Reading 1–3, RF 4→Reading 12; W 1–3→Writing 3, W 4–6→Writing 2, W 7–9→Writing 1; SL 1→SL 1, SL 2–3→SL 2, SL 4–5→SL 3, SL 6→SL 4; L n→Language n. Social studies 6–9 placement (world history in 6 and 7, US history to Reconstruction in 8, civics, personal finance and economics in 9) is the app's choice within Maine's spans.

## Guiding Principles

The Maine Learning Results open with five Guiding Principles: each student is a clear and effective communicator, a self-directed and lifelong learner, a creative and practical problem solver, a responsible and involved citizen, and an integrative and informed thinker. They are the competencies page (`/guides/maine/guiding-principles/`). They are not a graded subject.

## Report card and state tests

- No statewide report card scale; many Maine schools report on standards from 1 to 4. The framework uses the four practice steps (Beginning, Approaching, Meeting, Exceeding).
- MeCAS: the Maine Through Year Assessment (NWEA) in mathematics and reading, grades 3 to 8 and the second year of high school, with required fall and spring windows and an optional winter window; the Maine Science Assessment in grades 5 and 8 and the third year of high school; an alternate assessment for students with significant cognitive disabilities. Dates change each year, so the guide points to the DOE.

## Known gaps

- Social studies Personal Finance and Economics are practised mainly in Grades 4 and 9; Grades 5 to 8 rely on borrowed units for them.
- Wabanaki content (Grades 1, 3, 4 and 8) is light and should be reviewed with Wabanaki partners before it grows.
- ELA Reading 1–3 and the science and engineering practices are covered only where California's placement already covers them.
- Maine's middle school spans mean a Maine school may teach a topic in a different grade from the one the app chose.
