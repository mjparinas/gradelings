# Manitoba
- **Framework `ca-mb`, slug `manitoba`**, Pre-K and Kindergarten to Grade 9 in math, language, science, social studies and both French subjects (Immersion Kindergarten to Grade 9, Core French Grade 4 to 9). Standards are the learning outcomes of the Manitoba curriculum, cited by code (`5.N.1`, `ELA.5.B2.3`, `SCI.5.E.3`, `5-KH-040`) and checked by its `contract.ts` against `docs/research/manitoba/outcomes.json` (record: `gradelings-research/manitoba/README.md`; rebuild with `fetch.sh` and `build_outcomes.py`). Core French cites strands, not codes.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), each citing Early Returns, Manitoba's curriculum framework for preschool centres and nursery schools, by area of development and play area (`Cognitive development; Numeracy`; `src/content/manitoba/pk.ts`), checked against `docs/research/manitoba/prek/outcomes.json` (PDF in `source/`, `fetch.sh`, `build_outcomes.py`). Early Returns has no outcomes, and an update is being developed. Manitoba has no Pre-K school year. Practice steps only.
- **Report card:** Levels 1 to 4 (with NYD). Grades 1 to 6 show levels only, Grades 7 to 9 add percentages, Kindergarten shows neither. Same kid labels and "practice, not a report-card mark" rule.
- **Content:** BC units via `share`, Ontario units via `adopt(...)`, Manitoba-only units in `src/content/manitoba/` (`mb-` ids, `bankUnit` in `own.ts`). Helpers are in `src/content/manitoba/kit.ts`.
- **First Nations, Métis and Inuit content** is light.

## Social studies depth
- Grade 3 social studies units have about 40 questions each (the original bank plus `g3-social-deeper.ts`), added November 2026 so a child who practises every day sees few repeats.
- Grade 9 social studies units have about 40 questions each (the original bank plus `g9-social-deeper.ts`, 15 units), added November 2026 for the same reason.
- Grade 4 social studies (11 units, `g4-social-deeper.ts`) and Grade 7 social studies (5 units, `g7-social-deeper.ts`) gained about 14 questions each, November 2026. `mb-power-conflict` is adopted by Nunavut and US states, so its added questions name no province or Manitoba.
