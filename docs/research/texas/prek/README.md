# Texas Pre-K research record

**Source:** *2022 Texas Prekindergarten Guidelines* for four-year-olds (PK4), Texas Education Agency, tea.texas.gov,
downloaded 29 October 2026. TEA has asked for feedback on revisions; check its Prekindergarten Guidelines page before a
refresh.

| What | Cited as |
| --- | --- |
| Child behaviors in each domain and skill | their code, for example `PK4.V.A.3` or `PK4.I.B.2.a` |

The source prints one code with a stray space (`PK4.III.D. 1`); `build_outcomes.py` drops it.

## Files

- `fetch.sh` downloads the PK4 PDF into `source/` (committed) and extracts the text with `pdftotext`. TEA's certificate
  chain is incomplete for some curl builds; set `CURL_CA_BUNDLE` if curl reports "unable to get local issuer certificate".
- `build_outcomes.py source` reads every coded behavior and writes `outcomes.json` (`{"pk/<subject>": [{idx, text}]}`).
  `src/content/texas/contract.ts` checks every Pre-K citation against it.
