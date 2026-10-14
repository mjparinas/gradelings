# British Columbia research record

**Source:** the BC Ministry of Education and Child Care, curriculum.gov.bc.ca (the curriculum) and www2.gov.bc.ca (the K-12 Student Reporting Policy). Downloaded 14 October 2026.

BC (`ca-bc`) is the base framework: its units are shared by every other framework, and its Big Ideas are copied word for word from these PDFs. Each unit's `standards["ca-bc"]` repeats a Content learning standard (for example "Language elements: synonyms and antonyms"), and each course's `bigIdeas["ca-bc"]` the grade's Big Ideas. **Yukon and the Northwest Territories follow this curriculum** (adapted locally, see `../yukon/` and `../northwest-territories/`), so these files are their source too.

## Sources in this folder

`fetch.sh [dir]` downloads everything into `source/` (or `dir`): each PDF in `source/pdf/`, its `pdftotext -layout` text in `source/txt/` with the same name, and HTML pages in `source/html/` (with a text copy when pandoc is installed). Every download is commented in the script.

| File | What it is |
| --- | --- |
| `math_k-9` | Mathematics K-9, with elaborations |
| `ela_k-9` | English Language Arts K-9, with elaborations |
| `science_k-9` | Science K-9, with elaborations |
| `social_k-9` | Social Studies K-9, with elaborations |
| `immersion_k-9` | Français langue seconde – immersion K-9, English edition (`en_fral_k-9_elab.pdf`). Its fonts carry no text mapping, so the `.txt` is mostly symbols; read the PDF |
| `immersion_k-9_fr` | The same program, French edition (`fr_fral_k-9_elab.pdf`); its text extracts cleanly, so search this one |
| `core-french_5-10` | Core French 5-10 (`en_languages_5-10_core-french.pdf`); we use Grades 5 to 9 |
| `indigenous-social_k-12` | Indigenous knowledge and perspectives in social studies, K-12 |
| `glossary`, `competencies` | Curriculum glossary; Core Competencies page |
| `reporting-policy` (HTML) | K-12 Student Reporting Policy page |
| `reporting-guidelines` | Communicating Student Learning guidelines (the policy's full text) |
| `student-reporting-order` | Ministerial Order M184/23, the Student Reporting Order |
| `proficiency-scale` | Unpacking the Provincial Proficiency Scale (Emerging, Developing, Proficient, Extending) |
| `reporting-one-pager`, `reporting-k-9`, `reporting-faq`, `reporting` (HTML) | Parent one-pager, K-9 reporting and the F letter grade, the educators' FAQ, the curriculum site's reporting page |

Not downloaded, to keep the folder small: the plain `k-9` PDFs (the same standards without elaborations), Grades 10 to 12, other subjects (Arts, ADST, PHE, Career Education) and the French translations of the reporting documents.

## Refreshing

Run `./fetch.sh` and check `git diff --stat source/`. A changed `.txt` means the Ministry edited a document: compare the Big Ideas and Content against the course files in `src/content/grades/` and update those (then `npm run curriculum:lock`). If a URL moves, find the new link on the subject's page at curriculum.gov.bc.ca (the "Download" or "Elaborations" PDF) or on curriculum.gov.bc.ca/reporting.
