# Manitoba
- **Framework `ca-mb`, slug `manitoba`**, Kindergarten to Grade 9 in math, language, science, social studies and both French subjects (Immersion Kindergarten to Grade 9, Core French Grade 4 to 9). Standards are the learning outcomes of the Manitoba curriculum, cited by code (`5.N.1`, `ELA.5.B2.3`, `SCI.5.E.3`, `5-KH-040`) and checked by its `contract.ts` against `docs/research/manitoba/outcomes.json` (record: `docs/research/manitoba/README.md`; rebuild with `fetch.sh` and `build_outcomes.py`). Core French cites strands, not codes.
- **Report card:** Levels 1 to 4 (with NYD). Grades 1 to 6 show levels only, Grades 7 to 9 add percentages, Kindergarten shows neither. Same kid labels and "practice, not a report-card mark" rule.
- **Content:** BC units via `share`, Ontario units via `adopt(...)`, Manitoba-only units in `src/content/manitoba/` (`mb-` ids, `bankUnit` in `own.ts`). Helpers are in `src/content/manitoba/kit.ts`.
- **First Nations, Métis and Inuit content** is light.
