# Saskatchewan research record

**Source:** the Saskatchewan Curriculum (curriculum.gov.sk.ca), Kindergarten to Grade 9: math, English language arts, science and social studies (Kindergarten uses the same four areas of learning), plus Core French and French Immersion (see "French" below).

`outcomes.json` holds every outcome code and text, grouped as `{grade: {subject: [{name, outcomes: [{code, text}]}]}}`. `content.test.ts` checks every `ca-sk` standard against it, and checks that borrowed Ontario units don't leak Ontario wording.

## Mapping
- BC units that fit an outcome are shared with `share(...)` (`src/content/saskatchewan/kit.ts`).
- Ontario-only units are reused with `reuse(...)` and Saskatchewan outcome text.
- Saskatchewan-only units (treaties, the Prairies, the North, and others) are new `bankUnit` sets in `g2-social.ts`, `g3-social.ts`, `g4-social.ts`, `g5-science.ts`, `g7-social.ts`, `g8-social.ts` and `g9-social.ts`.
- Grade 9 social studies (Roots of Canadian Society) also reuses four BC Grade 7 ancient-civilization units (`where-civilizations-grew`, `laws-and-government`, `trade-networks`, `inventions-and-timelines`) with Grade 9 outcomes, and Grade 7 reuses Ontario's `sustainability-7` (RW7.3).
- `outcomes.ts` is generated from `outcomes.json` and used as `bigIdeas` (one strand per entry).

## Scale
Saskatchewan has no single provincial report-card scale. The framework uses the four-level pattern many divisions use (Beginning, Approaching, Meeting, Exemplary), with the same kid labels. Saskatchewan's cross-curricular competencies and broad areas of learning stand in for BC Core Competencies and Ontario learning skills.

## Known gaps
- Science units for Grade 3 soils, Grade 4 rocks, minerals and erosion, Grade 6 electricity use, Grade 8 water systems and Grade 9 exploring our universe are new, written for Saskatchewan.
- French strands with no unit yet: Immersion listening (`CO.1`, `CO.2`), language appreciation (`VC.1`, `VC.2`), and most Core French General Language Strategies (`GL`). Core French is taught by grade here, but the Ministry's levels are language levels, so a child who starts later than Grade 1 meets a level above their French. The Conseil des écoles fransaskoises (Francophone first-language) program is not built.
- French content needs review by a French teacher and by Fransaskois, Métis and First Nations partners (the culture units use widely shared facts only).
- First Nations, Métis and treaty content is light.
- Some outcomes are only partly covered (for example Grade 8 microscope work, Grade 6 flight design and Grade 9 human reproduction); extend the tables when adding units.
- Provincial assessment details (grades 4, 5, 7, 9) should be checked against the Ministry of Education before launch.

## French
**Sources (all read October 2026):**
- Core French 1 to 9: `https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id=395` to `403` (Levels 1 to 9; the Ministry lists Core French under Grades 1 to 9, and the Level 4 PDF at `https://curriculum.gov.sk.ca/CurriculumFile?id=398` says "Level 1 is the beginning level for Core French study, regardless of the actual grade level of students" and recommends at least 120 minutes a week in Levels 1 to 5).
- Français en immersion 3 to 9: `https://progetudes.gov.sk.ca/CurriculumOutcomeContent?id=268` to `274`; Programme d'études interdisciplinaire M, 1 and 2 (immersion Kindergarten to Grade 2): ids `407`, `408`, `409`.
- Which programs exist: "Studying French in Saskatchewan", `https://www.saskatchewan.ca/residents/education-and-learning/prek-12-education-early-learning-and-schools/studying-french-in-saskatchewan`. French Immersion and Core French are both described as Kindergarten to Grade 12 programs offered by a number of school divisions; the Conseil des écoles fransaskoises runs Francophone first-language schools.

**Data:** `outcomes.json` has `immersion` for every grade (Kindergarten to Grade 9) and `core-french` for Grades 1 to 9 (Level = grade). `build_french_outcomes.py` downloads the pages above, rewrites those entries and generates `src/content/saskatchewan/french-outcomes.ts` (the course overviews). Core French groups outcomes by goal (Communication Skills `CS`, General Language Strategies `GL`, Language Knowledge `LK`, Culture `C`). Immersion Grades 3 to 9 use strands (Valorisation de l'apprentissage du français et appréciation culturelle `VC`, Compréhension orale `CO`, Compréhension écrite `CÉ`, Production orale `PO`, Production écrite `PÉ`); Kindergarten and Grade 1 use `É-` component codes and Grade 2 uses `AP-` codes. The Ministry pages have a few typos that the script normalizes: `4.CE.2`, `5.CE.1` (no accent) and `6VC.1` (no dot), and a stray character where "œuvre" should be. Each Immersion page also lists unit themes after the last outcome; they are kept as `themes` on the last strand.

**Mapping:**
- Immersion units are BC units shared with Saskatchewan citations (`french.ts`). Grade 3 to 9 grammar units cite `PÉ.2` (writing with the language conventions), reading units `CÉ.1`/`CÉ.2`, speaking units `PO.1`/`PO.2`, and so on; Kindergarten to Grade 2 units cite the program components for vocabulary, sounds, sentences and stories.
- Core French Grades 5 to 9 are BC units shared with the Level's goals (`5.CS.2`, `7.LK.1`, `8.C.1`). Grade 4 reuses Ontario's six Grade 4 units. Grades 1 to 3 are written for Saskatchewan (`sk-cf1-*`, `sk-cf2-*`, `sk-cf3-*`; five units each: greetings, classroom, family, colours, animals; numbers, questions, articles, food, weather; numbers, possessives, describing, class instructions, calendar), as are two Grade 4 units and the culture units at Levels 4, 6 and 8 and in Immersion Grades 5 and 8.
- Coverage test: `src/content/saskatchewan/french.test.ts`.

**Not verified:** the Ministry does not say which grade a division must start Core French; the grades here follow the curriculum's levels. Level 2 and 3 Core French culture outcomes (`2.C.1`, `3.C.1`) and Levels 1 to 3 General Language Strategies are not practised by any unit. The facts in the culture units (Gravelbourg, Michif, the Qu'Appelle Valley name, Buffy Sainte-Marie's birthplace, Louis Riel and Gabriel Dumont, Treaty 6 in 1876) come from general knowledge, not from the Ministry, and need checking.
