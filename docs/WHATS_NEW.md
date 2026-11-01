# What's new posts

`/whats-new/` lists a short post for each day that changed something a parent or teacher would notice. The posts live in `src/lib/whatsNew.ts`, newest first; each day also gets its own page (`/whats-new/YYYY-MM-DD/`) and a sitemap entry.

To add a day, look at the pull requests merged that day and add an entry:

- Write for parents and teachers: what it does for them, in plain words. No file names, code, pull request numbers or internals.
- Items are `new`, `fixed` or `teachers`. Leave out CI, dependency bumps, admin-only changes and anything behind a flag that is still off (for example Spanish, until the owner turns it on).
- Say nothing about a security fix beyond what a family needs to know.
- Skip a day with nothing user-visible. Days before Oct 25 were written from PR titles and the project notes, so check them against the app if a detail matters. Practice is never described as a report-card mark.

`src/lib/whatsNew.test.ts` checks order, unique days and plain language.
