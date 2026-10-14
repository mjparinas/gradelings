# Alberta source and checking record

**Sources.** Alberta Education publications, read on 2026-10-10. All are Crown documents released under the Open Government Licence – Alberta.

- New K–6 curriculum overviews, with a "snapshot by grade" for each subject: English language arts and literature (2022), mathematics (April 2022), science (March 2023), social studies (May 2025) and French immersion language arts and literature (2023). Hosted on open.alberta.ca (dataset `da982352-b50d-49a2-8805-c9073a7ecebd`).
- Alberta Mathematics K–6 scope and sequence, 2022 numbered outcomes (Alberta Regional Professional Development Consortia, aplc.ca). It is the source of the K–6 math outcome codes (for example `4N1.1`).
- Science K–6 numbered outcomes, 2023–2024 (aplc.ca, revised May 17, 2024). It is the source of the K–6 science outcome codes (for example `3ES 1.2`).
- The Alberta K–9 Mathematics Program of Studies with Achievement Indicators (2007). It is the source of the Grade 7 to 9 specific outcomes, cited by strand and number (`N5`, `PR2`, `SS3`, `SP1`).
- Science Grades 7–8–9 Program of Studies (2003, updated 2009 and 2014): the five units in each grade.
- French as a Second Language Nine-Year Program of Studies, Grades 4 to 12 (2004): the four general outcomes (Applications, Language competence, Global citizenship, Strategies).
- Programme d'études par année scolaire, Français langue seconde – Immersion, septième année (Alberta Learning, 2000; ISBN 0-7785-0804-8), the grade edition of the 1998 French immersion program of studies. Read from https://open.alberta.ca/publications/0778508048 (PDF: `2398090-2000-7imm.pdf`). It is the source of the immersion general learning outcomes (résultats d'apprentissage généraux, RAG) for Grades 7 to 9: `V1`, `CO1`–`CO5` (compréhension orale), `CÉ1`–`CÉ5` (compréhension écrite), `PO1`–`PO5` (production orale) and `PÉ1`–`PÉ5` (production écrite). The document says the RAG apply from Kindergarten to Grade 12, and its tables of specific outcomes run across Grades 6 to 9.
- Alberta's curriculum renewal timeline (alberta.ca/curriculum-subject-areas): K–6 is in place, with Grades 4 to 6 social studies mandatory from September 2026. Draft Grades 7 to 9 mathematics and social studies are being piloted in 2026–27 and become mandatory in September 2027. Grades 7 to 9 science is following a different track.

**Sources in this folder.** `source/` holds copies of the official documents listed above, downloaded on 2026-10-14 by `fetch.sh` (each PDF with a `pdftotext -layout` `.txt` beside it, about 8 MB in all): the five K–6 curriculum overviews from open.alberta.ca, the aplc.ca math scope and sequence and science numbered outcomes, the 2007 K–9 math program with achievement indicators, Science 7–8–9 (2003, updated 2014), English Language Arts K–9 (2000), Social Studies K–12 (2005, in its Social Studies 10-1 edition, which carries the Grade 7 to 9 issue headings; the separate Grade 7 to 9 booklets aren't on open.alberta.ca), the FSL nine-year program (2004; an 11 MB rescan of the same program was skipped) and the Grade 7 immersion program (`2398090-2000-7imm.pdf`). To refresh, run `./fetch.sh`, then `python3 -I build_outcomes.py`, which rebuilds `outcomes.json` from `source/` and reports any difference (`--write` overwrites it). It reproduces the committed file except two parts kept by hand in the script (`HAND_KEPT`): the K–6 math Statistics codes (`1ST1` to `6ST1.2`), which aren't in the aplc.ca scope and sequence, and the Core French headings (Applications, Language competence, Global citizenship, Strategies), which don't match the 2004 FSL program, whose general outcomes are Communication, Language, Culture and Language Learning Strategies; both need checking. New LearnAlberta (curriculum.learnalberta.ca) couldn't be fetched, and the old education.alberta.ca program PDFs now only point to it.

`outcomes.json` holds the codes and lines the tests check against:

- `math` and `science["k-6"]`: every outcome code found in those documents.
- `math["7"|"8"|"9"]`: the strand-and-number codes found in the 2007 program.
- `science["7-9-units"]`: the Grade 7 to 9 science units.
- `snapshots`: the official "snapshot by grade" lines (English language arts, French immersion, science) and topic phrases (social studies). K–6 language, social studies and French immersion units cite these verbatim, because the full learning outcomes for those subjects are only published on the New LearnAlberta site (curriculum.learnalberta.ca), which we could not read automatically.
- `immersion-7-9`: the 21 general outcome codes of the French immersion program with their statements (in French, from the Grade 7 edition).
- `language-7-9`, `social-7-9`, `core-french`: the general outcome and issue headings for the older Grades 7 to 9 programs and the French as a Second Language program.

**How content is checked.** Each Alberta standard is written as `ab("4N1.1, 4N2.1", "plain words")` (`src/content/alberta/kit.ts`). `src/content/alberta/alberta.test.ts` reads the citation before the ` · ` and fails if it names a code, unit or snapshot line that is not in `outcomes.json` for that grade and subject. Questions go through the same fairness checks as BC and Ontario content.

**Report cards.** Alberta has no provincial report-card scale; school authorities choose their own. The Alberta framework uses four plain practice steps (Beginning, Approaching, Meeting, Exceeding) with the same kid labels and the same rule that this is practice, not a report-card mark.

**How units are shared.** Where an existing BC or Ontario unit truly fits an Alberta outcome, the Alberta course lists it under `Course.shares` with Alberta standards text. An Alberta child therefore downloads Ontario's file for the grade as well (`EXTRA_DEPENDS` in `src/content/index.ts`). Units that are BC- or Ontario-specific are not shared.

**Still to do before launch.**

- The full K–6 English language arts, social studies and French immersion learning outcomes should be read on the New LearnAlberta site and cited by code, replacing the snapshot lines.
- Grades 7 to 9: mathematics and social studies will change in September 2027 (draft curricula are in pilot). Science 7 to 9 and English language arts 7 to 9 have no new programs yet. Re-check when the new programs are final.
- Social studies Grade 7 to 9 and English language arts 7 to 9 are cited by general outcome or issue heading from the existing programs; confirm the headings against the current documents.
- French immersion for Grades 7 to 9 cites general outcomes only (`CÉ2`, `PÉ3` and so on). The Grade 8 and Grade 9 editions of the program could not be found: open.alberta.ca holds only the Grade 7 edition, the old education.alberta.ca program pages return 404, and the Internet Archive is blocked from our build environment. The Grade 7 edition's tables mark each specific outcome across Grades 6 to 9, so specific outcomes could be added from it, but they were not. A French teacher should confirm which general outcome each unit is matched to (`JH_BY_KIND` and `JH_BY_UNIT` in `src/content/alberta/french.ts`). The new Alberta K–6 immersion curriculum is on New LearnAlberta; Grades 7 to 9 follow the 1998 program until a new one is published.
- First Nations, Métis and Inuit content is deliberately light.
- Confirm the Provincial Achievement Test and screening wording in the Alberta parent guides against alberta.ca; the schedule is changing.
