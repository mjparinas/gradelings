# Montana: sources and checking record

Montana (`us-mt`, slug `montana`). Every source below was downloaded on 2026-10-27 into `source/` (with `pdftotext -layout` extracts beside each PDF and `SHA256SUMS`). `./fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (docs/ADDING_A_PROVINCE.md, step 2).

## Where the codes come from

Montana's Office of Public Instruction (OPI) publishes its standards as IMS CASE packages on its standards server, Satchel (`https://mt-satchel.commongoodlt.com/ims/case/v1p0/CFPackages/<id>`; the ids are in `fetch.sh`). The CASE items carry the official codes (`humanCodingScheme`), which matters most for science and social studies, whose printed documents have no codes. `build_outcomes.py` reads the five packages and writes every standard, with its parts, under the grade and subject the app uses (`k/math` … `9/social`; 1,951 entries).

| Subject | Edition | In schools | Codes | Notes |
| --- | --- | --- | --- | --- |
| Mathematics | Montana Mathematics Content Standards (2026), adopted 2025 | from July 1, 2026 | `MT.4.NBT.1`, parts `MT.4.NF.3.a`; high school `MT.HS.CORE.ALG.LIN.2`, `MT.HS.PLUS.ALG.POLY.1` | Seven practices, `MT.MP.1` to `MT.MP.7`. Appendix A maps each standard to the Common Core. Grade 9 cites the high school Core and Plus standards. |
| English language arts | Montana Content Standards for ELA and Literacy (2011) | until June 30, 2027 | `RL.4.2`, parts `L.4.1.a` | Grade 9 cites the 9-10 band; Grades 6 to 8 also carry the RH, RST and WHST 6-8 literacy standards. The 2027 standards (`case-ela-2027.json`, `ela-2027.pdf`) are committed for the switch but not cited yet. |
| Science | Montana Science Content Standards (2016) | since 2016 | NGSS performance expectation codes, `4-PS3-2`, `MS-ESS2-4`, `HS-LS2-6` | A subset of the NGSS: no engineering design (ETS) standards, and no MS-LS1-8, MS-LS2-4, MS-PS4-3, HS-LS2-2, HS-LS2-5, HS-LS2-8, HS-LS3-1, HS-ESS3-6 or HS-PS4-2. |
| Social studies | Montana Content Standards for Social Studies (2021) | since July 1, 2021 | `SS.CG.4.4`, `SS.E.2.1`, `SS.G.6-8.2`, `SS.H.9-12.10` | Four disciplines (CG, E, G, H) plus inquiry skills `SS.K12.1` to `.6` in every grade. Kindergarten geography and history are single statements (`SS.G.K`, `SS.H.K`). Grades 6 to 8 share one band, and high school another. |

## Sources (`source/`)

- `case-math-2026.json`, `case-ela-2011.json`, `case-ela-2027.json`, `case-science-2016.json`, `case-social-2021.json`: the CASE packages above.
- `math-pk12-2026.pdf`, `math-practices-poster.pdf`, `math-appendix-a.pdf` (Montana to Common Core), `math-hs-pathways.pdf`: the printed math standards, from `https://opifiles.mt.gov/Portals/182/Page%20Files/K-12%20Content%20Standards%20%26%20Revision/Math/`.
- `ela-Kindergarten.pdf` … `ela-9-10th.pdf` (2011) and `ela-2027.pdf`: the printed ELA standards.
- `science-2016.pdf`; `social-2021.pdf` and `social-2021.xlsx`: the printed science and social studies standards.
- `revisions-2025.pdf`: the OPI's table of current standards and when the next take effect (July 2025).
- `essential-understandings.pdf`: the Essential Understandings Regarding Montana Indians (Indian Education for All).
- `opi-assessment-overview-2026.pdf` (the OPI's results overview to the Education Interim Committee, from archive.legmt.gov) and `data-release-talking-points.pdf`: the statewide tests (MAST in Grades 3 to 8 with Novice, Nearing Proficient, Proficient and Advanced; the Montana Science Assessment in Grades 5 and 8; the ACT in Grade 11).
- Landing page: `https://opi.mt.gov/Educators/Teaching-Learning/K-12-Content-Standards/`.

## Statutes (cited by section, not downloaded)

leg.mt.gov and the Montana Code Annotated pages answer scripts with a bot check, so these are cited by section only:

- Montana Pupil Online Personal Information Protection Act, MCA 20-7-1323 to 20-7-1326 (HB 745, 2019): the school privacy paragraph on `/privacy/` (`src/content/montana/schools.ts`).
- Indian Education for All, MCA 20-1-501, carrying out Article X, section 1(2) of the 1972 Montana Constitution.

## Facts used in Montana's own units

Montana's own social studies units name the twelve Tribal Nations (Blackfeet; Chippewa and Cree at Rocky Boy's; A'aninin/Gros Ventre and Nakoda/Assiniboine at Fort Belknap; Assiniboine and Sioux at Fort Peck; Apsáalooke/Crow; Northern Cheyenne; Salish, Pend d'Oreille and Kootenai, the Confederated Salish and Kootenai Tribes of the Flathead Reservation; and the Little Shell Chippewa, federally recognized in 2019, with no reservation), the 1851, 1855 and 1868 treaties, state government under the 1972 constitution (a 150-member legislature meeting 90 days in odd-numbered years, amendatory and line-item vetoes, a seven-justice elected Supreme Court, initiatives, 56 counties) and Montana history from Lewis and Clark to Fort Peck Dam. These follow the OPI's Essential Understandings and the Montana Constitution and are written in the present tense, as living communities, naming no ceremony. They need a review by Montana Tribal education partners before they grow.

## Checking record

- 2026-10-27: sources downloaded; `outcomes.json` built from the CASE packages; every Montana citation checked by `src/content/contract.test.ts` (`codeCite`).
