# Connecticut: sources and checking record

Connecticut (`us-ct`, slug `connecticut`) follows the standards adopted by the Connecticut State Board of Education and published by the Connecticut State Department of Education (CSDE) at https://portal.ct.gov/sde. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again and writes a `pdftotext -layout` copy of each PDF; `extract_law.py` writes the text of the student data privacy sections from the chapter's web page. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-k8.html`, `math-hs.html` | The CSDE's pages listing the Connecticut Core Standards for Mathematics, Kindergarten to Grade 8 and high school, with each standard's code and text |
| `ela.pdf` | The Common Core State Standards for English Language Arts, which Connecticut adopted in 2010 as the Connecticut Core Standards (the CSDE links to the national document) |
| `science.pdf` | The Next Generation Science Standards, all performance expectations by topic (the CSDE links to nextgenscience.org) |
| `science-adoption.pdf` | The CSDE's page on the State Board's adoption of the NGSS (November 4, 2015) |
| `science-assessment.pdf` | The CSDE's overview of the Next Generation Science Assessment (grades 5, 8 and 11) |
| `social.pdf` | Connecticut Elementary and Secondary Social Studies Standards (2023) |
| `social-adoption.pdf` | The State Board's resolution adopting the social studies standards (October 4, 2023) |
| `sbac-parent-guide.pdf` | The CSDE's parent guide to the Smarter Balanced Individual Student Report |
| `chap170.htm`, `chap170-10-234aa-dd.txt` | Conn. Gen. Stat. chapter 170 and the text of §§ 10-234aa to 10-234dd, student data privacy. `www.cga.ct.gov` serves an incomplete certificate chain, so the legislature's other host, `prdext3.cga.ct.gov`, which serves the same pages, is used |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,648 entries): each standard becomes `{"idx": code, "kind": ..., "content": text}` under `<grade>/<subject>`. Spans are listed under every grade they cover (science K-2 and 3-5 engineering, middle school under 6 to 8, high school under 9; English language arts 9-10 under 9; high school math and the high school social studies courses under 9). Only `idx` is checked by `src/content/connecticut/contract.ts`.

## Codes

- **Mathematics:** the codes the CSDE's pages print, without the `CCSS.Math.Content.` prefix: `K.CC.A.2`, `4.NBT.A.1`, `8.F.B.4`. High school drops the `HS`: `A-SSE.A.1`, `F-IF.B.4`.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.5.4`. Grade 9 cites the Grades 9-10 band, `RL.9-10.2`.
- **Science:** NGSS performance expectations, `K-PS2-1`, `4-PS3-2`, `MS-LS1-1`, `HS-ESS2-4`.
- **Social studies:** grade, discipline, standard and letter, printed without the final full stop: `K.Civ.1.a`, `3.His.3.a`, `8.Eco.7.a`, and the inquiry standards `4.Inq.3.a`. High school courses: `CG.` (Civics and Government), `MW.` (Modern World History), `US.` (United States History III). Drop caps in the PDF leave a space after a standard's first letter; the parser closes it.

## Placement

- Math, English language arts and science follow California's placement (both states teach the Common Core and the NGSS), mapped to Connecticut's codes.
- Social studies follows the 2023 standards' grade themes (see `docs/frameworks/connecticut.md`). Connecticut's own units cover what no other framework teaches: Connecticut, our state (1), Connecticut and local history (3), US regions, settlement and hazards (4), colonial and Revolutionary Connecticut (5), Connecticut and the nation to Reconstruction, with the Connecticut Compromise (8), and governing Connecticut (9). Grade 9 also copies Maine's US government and economics units without their Maine items.

## Guides

- **Mathematical Practices** (`/guides/connecticut/math-practices/`): the eight Standards for Mathematical Practice in the Connecticut Core Standards.
- **State tests** (`/guides/connecticut/state-tests/`): Smarter Balanced (grades 3 to 8, four achievement levels; `source/sbac-parent-guide.pdf`), the Next Generation Science Assessment (grades 5, 8 and 11; `source/science-assessment.pdf`) and the SAT School Day. Dates change each year, so the guide points to the CSDE.

## Privacy

`/privacy/` states our commitments under Conn. Gen. Stat. §§ 10-234aa to 10-234dd; see `docs/frameworks/connecticut.md`.

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Grade 9 social studies cites Civics and Government only; Native content is light and needs partner review; no French subject.
