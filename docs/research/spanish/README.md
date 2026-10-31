# Spanish (Grades 3 to 9, every framework)

Sources for the shared Spanish course (`src/content/grades/g<N>/spanish.ts`, helpers in `src/content/spanish.ts`).
Spanish is one course that every province and state offers (`everywhere` in `src/content/subjects.ts`), so its sources
live here rather than in each framework's folder. Downloaded on 2026-10-31 by `fetch.sh`; `build_outcomes.py` rebuilds
`outcomes.json` from `source/` exactly, and `spanishCite` in `src/content/contract.ts` checks every unit's citation
against it.

| Who cites it | Document | URL |
| --- | --- | --- |
| British Columbia, Grades 5 to 9 (and Yukon and the Northwest Territories, which follow BC) | Second Languages: Spanish 5 to 10 (March 2018). A unit cites one Content item of its grade word for word. | https://curriculum.gov.bc.ca/sites/curriculum.gov.bc.ca/files/curriculum/languages/en_languages_5-10_spanish.pdf |
| Alberta, Grades 4 to 9 | Spanish Language and Culture Nine-Year Program, Grade 4 to Grade 12 (April 2004 field validation draft; the University of Alberta Library's scan on archive.org, because education.alberta.ca now redirects to the new LearnAlberta, which has no PDF). A unit cites its general outcome clusters (A-1 to A-6, LC-1 to LC-4, GC-1 to GC-3, S-1 to S-3). | https://archive.org/download/spanlangcult9y4to1204albe/spanlangcult9y4to1204albe.pdf |
| Manitoba, Grades 7 to 9 | Grade 7 to Senior 4 Spanish Language and Culture: Manitoba Curriculum Framework of Outcomes (2004). A unit cites its numbered strands (1.1.1, 2.1.3, ...). | https://www.edu.gov.mb.ca/k12/cur/languages/spanish/framework/gr7-s4.pdf |
| Every other framework and grade (Ontario has no elementary Spanish curriculum; US states adopt these standards) | World-Readiness Standards for Learning Languages (eleven standards, ACTFL's summary page), with one proficiency sublevel from the NCSSFL-ACTFL Can-Do Statements: Novice Low (Grades 3 and 4), Novice Mid (5 and 6), Novice High (7 and 8), Intermediate Low (9). | https://www.actfl.org/educator-resources/world-readiness-standards-for-learning-languages/standards-summary and https://www.actfl.org/uploads/files/general/Resources-Publications/Can-Do-Novice.pdf |

## Notes

- The Alberta document is a 2004 draft; the program's outcome clusters are unchanged in later versions, which are not
  published as a PDF any more. If Alberta posts the current program, refresh `fetch.sh` and re-check the clusters.
- BC's Spanish starts in Grade 5 and Manitoba's in Grade 7, so their earlier grades cite the World-Readiness Standards.
- The course teaches Latin American Spanish (the read-aloud voice is Mexican Spanish).
