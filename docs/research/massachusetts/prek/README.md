# Massachusetts Pre-K research record

**Sources:** the pre-K standards in the *Massachusetts Curriculum Frameworks* (Department of Elementary and Secondary
Education): Mathematics (2017), English Language Arts and Literacy (2017), Science and Technology/Engineering (2016)
and History and Social Science (2018); and the Social and Emotional Development and Approaches to Play and Learning
guidelines in the *Guidelines for Preschool and Kindergarten Learning Experiences* (2019, Department of Early Education
and Care). The frameworks are long PDFs laid out for print, so the files are the Common Standards Project's copies,
downloaded 31 October 2026.

| What | Cited as |
| --- | --- |
| Pre-K standard | its own code, for example `PK.CC.C.4`, `RF.P.2.a`, `PreK-LS1-2(MA)` or `PreK.T4.1` |
| Social-emotional guideline | `SEL1` to `SEL12`, `APL 1` to `APL 8` |

Standards marked "Begins in kindergarten" are kept in outcomes.json but never cited.

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/massachusetts/contract.ts` checks every Pre-K citation against.
