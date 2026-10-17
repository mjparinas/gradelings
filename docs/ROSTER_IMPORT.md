# Roster import and the school plan

A teacher can bring a class in from Google Classroom, Clever or ClassLink instead of typing names. Everything is off until the owner switches it on.

## What it does

1. On `/teachers/`, "Bring in a class" shows one button per provider whose keys are set.
2. The teacher signs in with the provider (OAuth authorization code; Google also uses PKCE). The callback is `/api/roster/callback/`.
3. We read the teacher's classes and each class's students **once**, keeping only a first name and the provider's id for each student. No email, family name or token is stored.
4. The roster waits up to 30 minutes in `roster_imports` while the teacher ticks classes and picks a name, grade and province or state for each (`#/import/{id}`).
5. Each chosen class becomes an ordinary class, and each student an ordinary class student account with a ten-character login code (`addStudents`). Students sign in with codes as before. There is no student single sign-on.
6. Importing again (a fresh trip to the provider) finds the class by the provider's class id (`classes.roster_provider`, `roster_course_id`) and adds only new students (`students.external_id`). Students who left the provider's list are counted, never deleted.

Same-first-name students are numbered ("Sam", "Sam 2"). A class holds 40 students; the rest are reported as left out.

## Not built, and why

- **Signing in to Gradelings with Clever or ClassLink.** Joining an account by an email the provider supplies would let a district-supplied address take over an existing account; Google sign-in avoids this by requiring a verified email. Teachers still sign in with email and password or Google, then connect a provider.
- **Student single sign-on.** Students keep their codes.
- **Automatic background sync.** No token is kept, so there is nothing to refresh.
- **Taking payment for the school plan.** See below.

## Keys to get

Register this redirect URI with every provider (trailing slash included): `{NEXT_PUBLIC_SITE_URL}/api/roster/callback/`

| Provider | Where | Env vars | Notes |
| --- | --- | --- | --- |
| Google Classroom | Google Cloud console > a **separate** OAuth client from "Continue with Google" | `GOOGLE_CLASSROOM_CLIENT_ID`, `GOOGLE_CLASSROOM_CLIENT_SECRET` | Scopes `classroom.courses.readonly` and `classroom.rosters.readonly` are sensitive: the OAuth consent screen needs Google's verification before anyone outside your test users can use it. Enable the Google Classroom API. |
| Clever | Clever developer dashboard > a Clever application (library or district app) | `CLEVER_CLIENT_ID`, `CLEVER_CLIENT_SECRET` | Needs approval in the Clever app library before districts can use it. |
| ClassLink | ClassLink developer portal > an OAuth application with the OneRoster/roster scope | `CLASSLINK_CLIENT_ID`, `CLASSLINK_CLIENT_SECRET` | Needs ClassLink app approval and each district's consent. |

**The provider calls follow the providers' public documentation but have not been run against a live account.** The parsers are tested with sample answers (`src/server/rostering.test.ts`). Before launch, run one import per provider against its sandbox and fix any field that differs: Google `courses`/`students`, Clever `/v3.0/users/{id}/sections` and `/v3.0/sections/{id}/users`, ClassLink `/v2/my/classes` and `/v2/classes/{id}/students`.

## Switching it on

1. Set the keys (above) and deploy.
2. Admin > Flags: turn on **Roster import** (`roster-import`). Roster import is then open to every confirmed teacher account.
3. To charge for it, decide the price (below), set the price variables, and turn on **School plan** (`school-plan`). Roster import then needs the plan, which you give under Users > Access > School plan (a year, or lifetime). A teacher without it sees what the plan includes and an "Ask about the school plan" button to `/contact/`.

## The pricing decision still needed

The plan is built, but nothing charges for it. The owner needs to decide:

- the price: per student per year (what `SCHOOL_PRICE_PER_STUDENT_CENTS` and `SCHOOL_PRICE_CURRENCY` are for, shown to teachers as "C$4 per student per year"), per teacher, or per school;
- how schools pay (an invoice and purchase order, or Stripe checkout);
- whether the free classes keep working without the plan (today they do; only importing is gated).

Until a price is set, the teacher area names no amount.

## Privacy and schools

`/privacy/` ("Importing a roster") and `docs/school/pia-pack.md` say what is read and kept. Keep both true if the scopes, fields or retention change. Deleting an account deletes any roster it left waiting (`deleteFamilyData`); a student's provider id is on the student row and goes with it.
