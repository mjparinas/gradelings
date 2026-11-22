# Prince Edward Island outcomes: source and checking record

- **Source:** Prince Edward Island Department of Education and Early Years (princeedwardisland.ca), English programs. The checking source is the **Specific Curriculum Outcomes Framework** series (Kindergarten, Grades 1–6 separately, Grades 7–9 combined, dated 2012–2013). Subject curriculum guides elaborate the same SCOs.
- **Rebuild:** `sh fetch.sh` downloads known publication PDFs into `source/` (needs a normal browser User-Agent; HTML curriculum pages are JS shells and often blocked from cloud sandboxes). Then `python3 -I build_outcomes.py > outcomes.json` (needs `pdftotext` from poppler). Layout text is cached under `text/` and is safe to delete.
- **How units should cite them** (for a future `ca-pe` framework; not wired into `content.test.ts` yet):
  - **Math** Grades 1–9: WNCP-style codes (`N1`, `PR2`, `SS3`, `SP1`). Kindergarten: Early Numeracy SCO numbers (`1.1`, `2.1`).
  - **Language:** English Language Arts / Early Literacy SCO numbers (`1.1`, `4.5`, `10.2`). Where Emergent and Early both list a number, Early is kept.
  - **Science** Kindergarten: plain SCOs (`1.1`). Grades 1–3: local labels (`SP-1`, `LS-1`, `PS-1`, `ESS-1`). Grades 4–9: pan-Canadian Common Framework codes in parentheses (`104-6`, `308-1`).
  - **Social studies** Kindergarten: two-part SCOs (`1.1`, `2.1`). Grades 1–8: three-part SCOs (`4.1.1`, `7.3.2`). Grade 9: the 2012 framework is a **transition** curriculum with topic headings and bullets (no SCO codes); cite the topic headline for now.
- **French:** Core French from Grade 4; French Immersion from Grade 1 (publication pages exist). Sample PDFs: `eelc_corefrench_4-6.pdf`, `eelc_frenchimmersion_1.pdf`. French is not parsed into `outcomes.json` yet.

## What is in `source/`

| Kind | Files |
| --- | --- |
| Outcomes frameworks | `eelc_outcomes_framework_k.pdf`, `_1` … `_6`, `_7-9` |
| Program overviews | `eelc_program_of_studies_k-6.pdf`, `intermediate_program_of_studies_and_authorized_materials.pdf`, `eelc_kindergarten.pdf` |
| Math guides | `eelc_math_1` … `_8`, `eelc_math_9_5` |
| Science guides | `eelc_science_1` … `_3`, `_5`, `_6`, `_9`, plus `eelc_science_foundation_document.pdf` (no public `eelc_science_4` / `_7` / `_8` at the guessed URL) |
| Social studies guides | `eelc_socialstudies_1` … `_3`, `_5` … `_9` (no public `_4` at the guessed URL) |
| Language guides | `eelc_english_4-6.pdf`, `eecd_langart7-9.pdf.htm_.pdf` |
| French (sample) | `eelc_corefrench_4-6.pdf`, `eelc_frenchimmersion_1.pdf` |

## Report card

PEI does not publish a single provincial proficiency scale the way BC does. Until a public elementary/intermediate reporting guide is confirmed, a future PEI framework should use the same four plain practice steps as Saskatchewan and Alberta (Beginning, Approaching, Meeting, Exceeding) with the usual kid labels, and every report must say this is practice, not a report-card mark. Recheck against the department before launch.

## Known gaps

- **`outcomes.json` wording is provisional.** Two-column PDF layout makes `pdftotext` mix left-column GCOs into some science and social rows. Math codes are in good shape; science codes and Grade 9 social headlines need a cleaner pass before units cite them in tests.
- **Kindergarten social** Unit One (`1.1`–`1.3`) is under-parsed; Family/Community rows are present.
- **Grade 9 social studies** was under revision in the 2012 framework; prefer the current Grade 9 social studies guide (`eelc_socialstudies_9.pdf`) when building units, and refresh the citation scheme then.
- **French** PDFs are only sampled; Immersion and Core French still need a full fetch and a citation rule (strands vs codes).
- **Science Grades 4, 7 and 8** full guides were not at the `eelc_science_{n}.pdf` pattern; outcomes still come from the frameworks.
- **No `ca-pe` Framework, courses, guides or public pages yet.** This folder is research only.
- **Mi'kmaq and Acadian content** should stay light and present-tense, and needs partner review before any culture-specific units ship.

## Review needed

- PEI teachers for all content once courses exist.
- A French teacher for Core French and Immersion.
- Mi'kmaq and Acadian community partners for culture-related units.
- Provincial assessment details (common assessments / reading records) against the department’s site before any `/guides/prince-edward-island/` page launches.
