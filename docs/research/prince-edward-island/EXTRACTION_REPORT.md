# PEI outcomes: extraction report

`outcomes.json` holds the official Prince Edward Island curriculum outcomes read from the PDFs in `source/`. Shape: `{"<grade>/<subject>": [{"code", "group", "text"}]}`, grades `k`, `1` to `9`, subjects `math`, `language`, `science`, `social`, `core-french`. 46 keys, 882 entries.

Rebuild and check (scratch text lives outside the repo):

```
mkdir -p /tmp/claude-0/pei-extract
for f in source/*.pdf; do pdftotext -layout "$f" /tmp/claude-0/pei-extract/$(basename "$f" .pdf).txt; done
python3 -I build_outcomes.py /tmp/claude-0/pei-extract > outcomes.json
python3 -I verify_outcomes.py /tmp/claude-0/pei-extract outcomes.json
```

Files: `extract_frameworks.py` (Kindergarten to Grade 6 framework parser), `build_outcomes.py` (merges everything, adds Grade 7 to 9), `verify_outcomes.py` (checks).

## Counts (outcomes + GCO entries)

| Grade | math | language | science | social | core-french |
| --- | --- | --- | --- | --- | --- |
| K | 11 | 37 + 3 | 1 | 8 + 2 | none |
| 1 | 18 | 67 + 10 | 4 + 3 | 13 + 6 | none |
| 2 | 25 | 67 + 10 | 4 + 3 | 12 + 6 | none |
| 3 | 25 | 33 + 10 | 4 + 3 | 9 + 6 | none |
| 4 | 25 | 33 + 10 | 4 + 3 | 11 + 6 | 23 + 5 |
| 5 | 25 | 33 + 10 | 4 + 3 | 7 + 6 | 26 + 5 |
| 6 | 26 | 33 + 10 | 4 + 3 | 19 + 6 | 26 + 5 |
| 7 | 4 placeholders | 0 + 10 | 4 + 3 | 5 | 1 placeholder |
| 8 | 4 placeholders | 0 + 10 | 4 + 3 | 5 | 1 placeholder |
| 9 | 17 | 0 + 10 | 3 + 3 | 17 + 6 | 1 placeholder |

Math ranges (all as printed, no gaps): Grade 1 N1-10, PR1-4, SS1-4 (no SP strand printed); Grade 2 N1-10, PR1-4, SS1-9, SP1-2; Grade 3 N1-13, PR1-3, SS1-7, SP1-2; Grade 4 N1-11, PR1-6, SS1-6, SP1-2; Grade 5 N1-11, PR1-2, SS1-8, SP1-4; Grade 6 N1-9, PR1-4, SS1-9, SP1-4; Grade 9 N1-7, PR1-6, SS1-4 (no SP strand in this guide). Kindergarten math is the Early Numeracy table (1.1 to 4.2).

## Verification (all run by `verify_outcomes.py`)

1. **Text and code check, 874 entries read from a PDF: 0 failures.** For each entry the code appears in the PDF text, the first 60 characters of the text appear in a second, independent extraction (pdftotext in reading order, without `-layout`), and so does the whole text. Comparison ignores case, punctuation, spacing and bullet marks, so hyphenation repairs and `; ` joins do not matter, but words and their order do.
   - 28 entries (mostly science units) were found piece by piece, because the two columns interleave in reading order.
   - 8 entries could not be matched automatically for the same reason and were compared by hand against the `-layout` text (listed in `MANUAL` in the script): K science unit, Grade 1 social 1.3.3, 1.3.4 and the Individuals and Interdependence GCOs, Grade 2 language 8.2 and GCO 8, Grade 6 social Time GCO. All are correct.
   - Grade 9 math PR2 is typeset equations. Its text was transcribed from the rendered page (page 35 of the PDF) with fractions written as `x/a` and the "not equal" sign as `≠`.
   - Not checked against a PDF: Grade 7 and 8 math placeholders, and the Grade 7 and 8 social paraphrases (checked only that their key words appear in the program of studies).
2. **Code scan.** A separate regex scan of each subject's pages finds the same codes, with the same repeats, as the file, for every grade and subject. No gaps in numbering within any strand, GCO or unit.
3. **Sub-points.** The number of bullet or dash lines in the PDF (math, language, science) equals the number of sub-points kept in the file, for every grade.
4. **Hand read of Grade 4.** Every Grade 4 math, language, science, social studies and Core French entry and every Grade 4 GCO statement was read against the PDF page text. Nothing is truncated or merged. Every science bullet ends with its bracketed code (see the Grade 6 exception below). Grades 1, 2 and 6 samples were also hand-read where the layout differs.

## How entries are written

- Sub-points are joined to their outcome with `; ` (no doubled punctuation after `:` or `;`). Where the PDF has no colon, this gives `... texts by; asking questions` (language 7.3, Grade 4) and `e.g.,; use drawing` (Grade 1 10.1 Emergent). That follows the instructions literally.
- Hyphenation at line ends is repaired. Joined: applying, application, citizenship, and similar. Kept with the hyphen: `non-fiction`, `non-standard`, `problem-solve`, `small-group`. Judgement calls worth a glance: `microorganisms` (the PDF may print `micro-organisms`), `proofreading`, `loanwords`, `newsletter`. `and/` followed by `or` on the next line becomes `and/or`.
- Language (Grades 1 to 3 have stages): the stage is added to the group, for example `Reading & Viewing (Emergent)`, `(Early)`, `(Transitional)`, because codes repeat in each stage. Group uses the strand heading as printed (Grade 1 prints `Reading & Viewing`); Grade 4 does not print the Writing heading, so the name from Grades 1 to 3 is used.
- Language Kindergarten: group is the printed heading next to the outcomes (Oral Language - Speaking & Listening, Oral Language - Phonological Awareness, Reading and Viewing, Writing and Representing). Only GCO 1, 4 and 8 are printed in Kindergarten, so only three GCO entries exist.
- Science: one entry per unit as printed (`Life Science: Habitats`); sub-cluster headings such as `Habitats and Populations` are not copied. Grade 1 uses `SP-1`, `PS-1`, `LS-1`, `ESS-1` codes; its unit text keeps them. Grade 4 prints `Space and Earth Science` (not `Earth and Space Science`), so that is the group. Kindergarten science is one cluster with outcomes `1.1` and `1.2` kept in the text; the PDF prints `GCO 1:` with no statement, so there is no Kindergarten science GCO entry. Science GCO entries are GCO 1 STSE, GCO 2 Skills, GCO 3 Knowledge as asked; GCO 4 (Attitudes) is printed too but was not added.
- Social studies: group is the unit title. Grade 6 prints two conceptual organizers whose unit numbers repeat (6.1.1 appears in both), so its group is `Prince Edward Island History - Unit One: Time` or `World Cultures - Unit One: ...`. Kindergarten uses its plain headings (I Am Unique, Family, Community).
- Core French: Grades 4 to 6 only; the framework has no Core French for Kindergarten to Grade 3. Group is the strand as printed (Grade 6 prints `General language education` and `Fields of experience` in lower case).
- Grades 7 to 9 language and science GCO entries are the Grade 6 framework's statements; the PEI GCOs are the same K to 12 statements, but the Grade 7 to 9 guides are not in the repository, so these are not confirmed from a Grade 7 to 9 document.
- Grade 9 math: codes are `9.N1`, `9.PR1`, `9.SS1` (the Number and Shape and Space lists print `9.N1`; the Patterns list prints `PR1` while its detail pages print `9.PR1`). Text comes from the "Specific Curriculum Outcomes" list pages.
- Grade 9 social studies: 17 outcomes (`DT1` to `DT4`, `SCO1` to `SCO13`) from the SCO block on each outcome's page, group = unit from Table 6. The text starts with the verb, as in the guide ("Learners are expected to ..." is printed above it). Table 6 and the detail pages differ slightly (DT1 "evaluate the significance of places" against "evaluate the geographic significance of places ... characterise"); the detail-page wording is used. Six GCO entries come from Table 1 (`Learners will be expected to ...`).
- Grades 7 and 8 social studies and the Grade 7 to 9 science and Core French entries come from the Intermediate Program of Studies (2022-2023); the social paraphrases are shorter than the source sentences.

## PDF anomalies (copied as printed)

Spelling and typing errors: Grade 3 social 3.1.1 "Altantic"; Kindergarten language GCO 1 "clairfy"; Kindergarten social GCO "perpectives" and strand headings "Cutlure and Diversity" and "People, Places, and Environment" (codes use the standard names); Grade 3 math N11 "contxt", N12 "muliplication"; Grade 4 math N9 "pictorically", N11 "Demonstrte"; Grade 6 math N3 "muliples", N6 "demonstrae"; Grade 6 Core French 2.1 "recongize", 2.2 "respresentations", 4.1 "communicaiton", GCO 3 "culticultural" (after repairing the hyphen); Grade 5 Core French 1.3 "passtimes", GCO 4 "On the basis on their"; Grade 5 language 1.4 "pionts"; Grade 1 math N9 "substraction", language 10.1 "sharingwriting/representing", 10.2 "predominate"; Grade 2 language 10.1 "technigues"; Grades 1 to 3 social "Students will expected to" in the Individuals, Societies, and Economic Decisions GCO; Grade 2 math N9 and Grade 5 math N5 "2- digit"; Grade 6 science Electricity: unit ends "(303-29" with no closing bracket; Grade 2 science: a cluster says "Students will be expected tov" (not copied, it is a header).

Structure:
- Grade 6 English language arts pages 13 and 14 carry the title "ENGLISH LANGUAGE ARTS" but contain Health outcomes (codes W-6.1, R-6.5, L-6.1); they are skipped.
- Grade 3 math page 15 (SS4 to SP2) has no column header; handled.
- Grade 1 social studies page: the right column starts three characters further left on some rows; handled.
- Grade 1 prints no Statistics and Probability strand; Grade 9 math has none either.
- Several language outcomes in Grades 1 to 3 are stage-specific, so the same code appears in two or three stages (distinguished by group).
- Math sub-points sometimes continue on a line that is not a bullet ("according to the number of sides."); it is appended to the last sub-point.

## Not extracted / limits

- Grade 7 and 8 math, language outcomes for Grades 7 to 9, Grade 7 to 9 science and Core French outcomes: no guides in the repository. Entries are placeholders or program-of-studies headings.
- Kindergarten and Grade 1 to 3 have no Core French. Core French outcomes in the framework are "key-stage" outcomes with sample specific outcomes, as printed; the complete list is in the Elementary Core French guide (not in the repository).
- Grade 9 science and language outcomes (2022-2023 program only names three topics and the GCOs).
- `eelc_program_of_studies_k-6.pdf` was not needed (it lists courses and codes, not outcomes).
- The parser's separate logic for pages, columns and sections is tuned to these 2013 PDFs; run `verify_outcomes.py` after any change.
