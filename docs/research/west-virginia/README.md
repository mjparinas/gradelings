# West Virginia: sources and checking record

West Virginia (`us-wv`, slug `west-virginia`) follows the West Virginia College- and Career-Readiness Standards, set by the West Virginia Board of Education as policies (legislative rules in Title 126 of the Code of State Rules) and published by the West Virginia Department of Education (WVDE) at https://wvde.us/academics/content-standards-policies. Downloaded and checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and `build_outcomes.py --text` writes a plain-text copy of each Word file. `SHA256SUMS` records the files as committed. The board's policy page (`https://wveis.k12.wv.us/wvboe/policies/policy.php?p=<policy>`) serves each policy as a scanned PDF with no text layer and, with `&alt=1`, as a Word file; only the Word files are committed.

| File | Document |
| --- | --- |
| `ela-2520.1A.docx` | Policy 2520.1A, English language arts (126CSR44A, effective July 1, 2021) |
| `math-2520.2B.docx` | Policy 2520.2B, mathematics (126CSR44BB, effective July 1, 2024), with the Mathematical Habits of Mind |
| `science-2520.3C.docx` | Policy 2520.3C, science (126CSR44CC, effective July 1, 2022) |
| `social-2520.4.docx` | Policy 2520.4, social studies (126CSR44D, filed July 8, 2024) |
| `policy-2510.docx` | Policy 2510, programs of study, high school credits and the uniform A to F grading scale |
| `policy-2512.docx` | Policy 2512, the tiered system of support for early literacy and numeracy |
| `wvgsa.html`, `wvgsa-scale-scores.html`, `wvgsa-faq.html` | The WVDE's pages on the General Summative Assessment: grades tested, achievement levels and cut scores, and the family FAQ |
| `code-18-2-5h.html` | W. Va. Code § 18-2-5h, the Student Data Accessibility, Transparency and Accountability Act |
| `code-18-2e-10.html` | W. Va. Code § 18-2E-10, the Third Grade Success Act |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,375 entries): each standard becomes `{"idx": code, "kind": "standard" | "foundation", "content": text}` under `<grade>/<subject>`. Grade 9 lists the high school courses a ninth grader takes (Algebra I; Grade 9 English language arts; Earth and Space Science, Biology and Physical Science; World Studies, United States Studies, Contemporary Studies, Civics, Economics and Geography). Only `idx` is checked by `src/content/west-virginia/contract.ts`.

## Codes

- **Mathematics:** `M.<grade>.<n>`, `M.K.1`, `M.4.6`; Algebra I is `M.A1HS.<n>`.
- **English language arts:** `ELA.<grade>.<n>`, `ELA.4.2`; the literacy foundations (print concepts, phonological awareness, phonics, fluency, handwriting) carry Roman numerals, `ELA.1.III`.
- **Science:** `S.<grade>.<n>`, `S.4.2`; high school courses `S.ESS.`, `S.B.`, `S.PS.`.
- **Social studies:** `SS.<grade>.<n>`, `SS.8.22`; high school courses `SS.W.`, `SS.US.`, `SS.USC.`, `SS.CS.`, `SS.C.`, `SS.E.`, `SS.G.`.

## Placement

- Math, English language arts and science follow Connecticut's placement (and so California's), mapped topic by topic to West Virginia's codes; where West Virginia teaches a topic in another grade, the unit moves with it (see `docs/frameworks/west-virginia.md`).
- Social studies follows Policy 2520.4's grade descriptions. West Virginia's own units cover what no other framework teaches: our state (K, 1, 2), regions and work (3), counties and then-and-now (4), becoming West Virginia (5), economies, trade and time zones (6) and the seven units of West Virginia Studies (8).

## Guides

- **Mathematical Habits of Mind** (`/guides/west-virginia/math-habits-of-mind/`): MHM1 to MHM8 in Policy 2520.2B.
- **State tests** (`/guides/west-virginia/state-tests/`): the General Summative Assessment (grades 3 to 8, science in 5 and 8, four achievement levels; `source/wvgsa*.html`) and the SAT School Day. Dates change each year, so the guide points to the WVDE.

## Privacy

`/privacy/` states our commitments under W. Va. Code § 18-2-5h; see `docs/frameworks/west-virginia.md`.

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; the standards' "four regions" are unnamed; Grade 3 government, world maps and explorers have no unit; Grade 9 social studies cites World Studies only; Native content is light; no French subject.
