# Research

The research behind each framework lives in its own repository, [mjparinas/gradelings-research](https://github.com/mjparinas/gradelings-research) (moved out on 31 October 2026). Each region's folder there has the official documents (`source/`), `fetch.sh`, `build_outcomes.py` and a README with the sources, dates and checking record. The market and competitor research (`competitors.md` and the rest) is there too.

What stays here is only the standards JSON the tests read (`<folder>/outcomes.json`, `<folder>/prek/outcomes.json` and a few others, read through `research()` in `src/content/contract.ts`). A path in this repository such as `gradelings-research/<folder>/README.md` means that file in the research repository.

When you add or refresh a framework, build the JSON in the research repository, commit it there with its sources, and copy the same JSON files here at the same paths. The two copies should always match.
