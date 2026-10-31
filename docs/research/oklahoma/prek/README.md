# Oklahoma Pre-K research record

**Source:** the pre-kindergarten standards in the *Oklahoma Academic Standards* (Oklahoma State Department of
Education): Mathematics (2022), English Language Arts (2021), Science (2020) and Social Studies (2025). The standards
are published as PDFs laid out in tables, so the files are the Common Standards Project's copies, downloaded
31 October 2026. The 2026 science standards keep the same six pre-K codes (PK.S.1 to PK.S.6) with nearly the same
words; the Common Standards Project's copy of them misprints most codes as "APK.S", so the 2020 copy is used.

| What | Cited as |
| --- | --- |
| Pre-K standard or objective | its own code, for example `PK.N.2.2`, `PK.2.PA.2`, `PK.S.3` or `PK.4.4` |

The standards have no social and emotional strand, so the feelings unit cites respect for others in the class (PK.1.2).

## Files

- `fetch.sh` downloads the standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/oklahoma/contract.ts` checks every Pre-K citation against.
