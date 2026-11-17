# Free "Is my child ready for Grade N math?" checks

Melvin, November 17, 2026 ("do 1, 2, 3", from a look at mathbuilders.com).

- `/ready/` and `/ready/{grade}/` for Grades 2 to 9: ten untimed, tap-or-type questions from the end of the grade before, no sign-up, nothing stored or sent. Kindergarten is mostly pictures, so Grade 1 has no check.
- Questions come from the first framework's math units through the worksheet pipeline (`src/components/site/readiness.ts`), seeded so every build is the same. Region-free: nothing about money, a province or a country (a test checks).
- First tries count, as in the app: a miss gets a hint and a second try. The result is a band (looks ready, nearly there, worth a short review, calm reset) with kind wording, links to the free worksheets for missed skills and the free-trial link. It says it is practice, not a report-card mark.
- In the sitemap and linked from the Help at home hub.
