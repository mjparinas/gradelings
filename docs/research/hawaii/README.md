# Hawaiʻi: sources and checking record

Hawaiʻi (`us-hi`, slug `hawaii`) follows the content standards of the Hawaiʻi State Department of Education (HIDOE), linked from https://hawaiipublicschools.org/academics/subject-matter-standards/. Checked October 27, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (HIDOE, Google Docs and Google Drive answer plain `curl` with a browser user agent), writes a `pdftotext -layout` copy of each PDF and records `SHA256SUMS`.

| File | Document |
| --- | --- |
| `math.pdf` | Hawaiʻi Common Core Standards for Mathematics (HCCS-M, approved 2026, dated July 17, 2026), from HIDOE's mathematics site |
| `math-standards-page.html` | HIDOE's mathematics standards page, with the phase-in years |
| `ela.txt` | Hawaiʻi Common Core Standards for English Language Arts (approved April 2024), saved as text from HIDOE's Google Doc (its PDF export stops after the anchor standards) |
| `science.pdf` | The Next Generation Science Standards by disciplinary core idea (HIDOE's science standards) |
| `HCSSSgrK.pdf` to `HCSSSgr5.pdf` | Hawaiʻi Core Standards for Social Studies (2018), Kindergarten to Grade 5 |
| `HCSSSgr6WorldHist.pdf` | HCSSS Grade 6, World History and Cultures |
| `HCSSSHawaiianKingdom.pdf`, `HCSSSPacificIslandStudies.pdf` | HCSSS Grade 7 courses: Hawaiian History, the Hawaiian Kingdom, and Pacific Island Studies |
| `HCSSSgr8USHist.pdf` | HCSSS Grade 8, U.S. History |
| `HCSSSModernHistoryHawaii.pdf`, `HCSSSDemocracy.pdf`, `HCSSSUSHistoryGovernment.pdf`, `HCSSSWorldHistoryCulture.pdf` | HCSSS high school courses (Grade 9 cites Modern History of Hawaiʻi and Participation in Democracy) |
| `subject-matter-standards.html`, `elementary.html`, `graduation-requirements.html` | HIDOE pages on standards, elementary school and graduation |
| `general-learner-outcomes.html` | HIDOE's General Learner Outcomes page (the competencies guide) |
| `types-of-testing.html` | HIDOE's testing page (Smarter Balanced, science, KĀʻEO, HSA-Alt) |
| `hrs-302A-0499.htm`, `hrs-302A-0500.htm`, `act40-2016.pdf` | HRS 302A-499 and 302A-500, the Student Online Personal Information Protection law (Act 40 of 2016) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from the text copies in `source/` exactly: each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Only `idx` is checked by `src/content/hawaii/contract.ts`. The script's header describes each subject's codes and how spans (middle school science, high school courses, inquiry bands) are listed.

## Codes

- **Mathematics:** grade, domain and number as printed: `K.CC.1`, `4.NBT.1`, `6.EEI.3`, `8.LR.2`. Grade 9 cites Algebra 1 + Data Analytics (`A1.2.3`) and Geometry + Probability (`G.1.1`).
- **English language arts:** grade, strand and number: `4.RL.2`, `K.RF.3`, `2.WF.1`, `6.L.1`; Grade 9 cites `9/10.RI.2`. Lettered parts are joined into the standard's text.
- **Science:** NGSS performance expectations (`4-PS3-2`, `MS-LS1-1`, `HS-ESS2-4`); middle school under Grades 6 to 8, high school under Grade 9.
- **Social studies:** `SS.`, grade, theme, anchor standard and number: `SS.4.1.18.1`; Grade 7 `SS.7HHK.…` and `SS.7PI.…`; Grade 9 `SS.MHH.…` and `SS.PID.…`; inquiry standards `SS.3-5.2.1`, `SS.9-12.2.2` under each grade of their band.

## Placement

- Math, English language arts and science follow Michigan's placement (and so California's), moved to Hawaiʻi's codes. Borrowed science units built around California places are `hi-` copies with Hawaiʻi examples, and borrowed units that name another state's places are filtered `hi-` copies.
- Social studies follows HCSSS grade by grade; Grade 4 (Hawaiʻi studies) and Grade 7 (the Hawaiian Kingdom and Pacific Island Studies) are Hawaiʻi's own units. See `docs/frameworks/hawaii.md`.

## Left out on purpose

- SS.4.1.18.1 and SS.4.5.6.1 (the akua and creation stories) and SS.4.5.6.2 (mana): sacred content.
