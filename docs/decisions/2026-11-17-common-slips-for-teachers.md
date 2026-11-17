# Common slips for teachers

Melvin, November 17, 2026 (from a look at IXL's teacher reports: "common slip for teachers"). The thread's own recommendation, recorded here.

- **What:** on a class's Progress tab, a "Common slips" section lists, per assigned unit, the wrong answer at least 2 students gave to the same question on a first try ("7 × 8: 4 students answered “54”"), most common first, 3 per unit. When the answers came from practising a Grade 3 skill (`Unit.skills`, PR #619), the line starts with the skill's title.
- **How:** an answer event on a wrong first try carries `w`, what the child picked or typed (24 characters at most, `slipLabel` in `src/lib/slips.ts`), for choice and typed questions only, never for math facts or questions with a picture. `studentSlips` and `commonSlips` count students, not answers; `classProgressAndMisses` returns `slips`.
- **Flag:** `common-slips` (server, off by default) decides whether `/api/classes/?id=` sends `slips`. Devices record `w` whether or not it is on, so data is waiting when it is switched on. Only answers given after this shipped are listed.
- **Privacy:** `w` is one of our own generated choices or a number typed on our keypad, not free text, and is deleted with the student, class or family like every other event field. It names no child on the page beyond what the class view already shows (nothing). Practice, not a report-card mark.
