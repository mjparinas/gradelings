# Colorado Pre-K research record

**Source:** the preschool expectations of the Colorado Academic Standards (Mathematics, Reading, Writing, and
Communicating and Science adopted 2018; Social Studies adopted 2022), Colorado Department of Education. cde.state.co.us
refuses scripted connections, so the files are the Common Standards Project's copies (each names its CDE page in
`sourceURL`), downloaded 29 October 2026, as for the K-12 standards in `../`.

| What | Cited as |
| --- | --- |
| Preschool evidence outcome or progress indicator | its CDE code, for example `P.CC.B.2`, `PK.2.2.b`, `LS2.PK.1.f` or `PK.C.1.c` |

## Files

- `fetch.sh` downloads the four preschool standard sets into `source/` as sorted JSON.
- `build_outcomes.py source` writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`), which
  `src/content/colorado/contract.ts` checks every Pre-K citation against.
