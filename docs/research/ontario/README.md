# Ontario source and checking record

**Source.** The Ontario Ministry of Education's curriculum site (https://www.dcp.edu.gov.on.ca/en/curriculum), read from its public content API on 2026-10-09.

- Mathematics (2020), Grades 1 to 8
- Language (2023), Grades 1 to 8
- Kindergarten Curriculum (2026)

`expectations.json` holds every strand, overall expectation and specific expectation, keyed by `grade/subject` (`k`, `1` to `8`). Each entry has `idx` (for example `B1.1`), `kind`, `title` and `content` exactly as published. `src/content/ontario/overall.ts` holds the strand headings used as Big Ideas.

**Sources in this folder.** `source/` holds the raw responses from the site's content API (`https://ws.api.dcp.edu.gov.on.ca/content/api`), downloaded on 2026-10-14: one JSON file per grade and course (for example `math-2020-g4.json`, `fsl-immersion-2013-g6.json`, `g9-snc1w-2022.json`), each with the course item and the strands and expectations it links to, plus `curricula.json` and `courses.json`, the site's index of curriculum documents and courses. Only the fields the expectations live in are requested, which keeps the folder at about 6 MB; the curriculum PDFs and the elaborations (teacher supports, examples) are not saved. To refresh, run `./fetch.sh` (it overwrites `source/`), then `python3 -I build_outcomes.py source expectations.json`, and read the diff: with the 2026-10-14 download the rebuild is byte-identical to the committed `expectations.json`. If an item's codename changes on the site, find the new one in `courses.json` and update `fetch.sh`.

**How content is checked.**

- Each Ontario standard is written as `on("B2.4, B2.7", "plain words")` (`src/content/ontario/kit.ts`). `content.test.ts` reads the codes and fails if any code is missing from `expectations.json` for that grade and subject. Ranges such as `C1.1–C1.3` are checked at both ends.
- Questions go through the same fairness checks as BC content (answer among the choices, no look-alike choices, the maths evaluates, keypad fit).
- Report cards follow *Growing Success* (2010): Levels 1 to 4; letter grades in Grades 1 to 6; percentages in Grades 7 to 9. Kindergarten has no grades.

**Scope today.** Kindergarten to Grade 9: math, language, science and technology, social studies (Grades 7 and 8 combine Geography and History, whose strand letters repeat, so standards name the subject, e.g. "History A1.1"), plus French (Core French from Grade 4, French Immersion from Grade 1) from the FSL curriculum (2013) and the Grade 9 courses FSF1D and FIF1D. The FSL curriculum is skills-based, so French units cite the strand-level expectations (A Listening, B Speaking, C Reading, D Writing); most share BC French units. 

**Still to do before launch.**

- Grade 7 to 9 report-card percentages should be confirmed against the current *Growing Success* text.
- Grade 9 uses the destreamed courses MTH1W and ENL1W; confirm with a teacher that this matches what families expect.
