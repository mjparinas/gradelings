# Privacy Impact Assessment pack

For a school or district that is completing a PIA (BC: FIPPA s. 69; Ontario and Alberta boards: their own privacy review). Written from the code as of October 2026. **(confirm)** marks a fact that depends on a provider and has not been confirmed in writing.

## 1. The service

Gradelings is a web app (installable, with an Android wrapper) for practice and games matched to the BC, Ontario and Alberta curricula, Kindergarten to Grade 9. In a school it is a practice aid. Its levels reflect practice, not a report-card mark; the teacher decides proficiency. There are no ads and no sale of data.

## 2. Who uses it and how accounts work

| Role | Account | What they can do |
| --- | --- | --- |
| Teacher | Email and password. Email must be confirmed before a class can be created. | Create classes, add students, assign units, see results on assigned units. |
| Student, added by the teacher | A personal login code (ten characters, unique across every class; older codes also need the class code). No email, no password. | Practise and play. No parent area, no billing, no other accounts, no free-text input. |
| Student, linked by a parent | The child's family account. The parent enters the class code. | Same play as at home. The parent can unlink at any time. |

## 3. Data inventory

| Data | About | Why | Where | Kept until |
| --- | --- | --- | --- | --- |
| First name or nickname (the teacher types it, at most 20 characters) | Student | So the child and teacher recognise the account | Database | Student removed, class closed or teacher account deleted |
| Grade and curriculum | Student | Chooses content | Database | Same |
| Avatar, cosmetics, settings | Student | Gameplay and comfort options (calm motion, quiet sounds and similar) | Database | Same |
| Practice events: unit, right or wrong on the first try, time, mode, date | Student | Progress, levels, teacher view | Database | Same |
| Login code | Student | Sign-in | Database | Replaced on request; removed with the student |
| Email and password hash (scrypt) | Teacher | Sign-in, account messages | Database | Account deleted |
| Class name, grade, province, class code, assigned units (homework), due dates and number of questions | Class | Running the class | Database | Class closed |
| Live class questions (the question shown) and each student's answer to it (which choice, right or not, time) | Student | Questions the teacher asks the class in real time; never counted as practice | Database | A day after the question, or student removed, class closed or account deleted |
| Co-teacher links (teacher account id, date joined) and open invitations (the invited email address, who invited, date) | Teacher | Sharing a class with colleagues | Database | Left, removed, class closed or deleted, invitation accepted, declined, cancelled or 14 days old, or either account deleted |
| Sign-in sessions (hashed token, browser type, time) | Both | Staying signed in, 90 days | Database | Expiry, sign-out or deletion |
| Request logs (IP address, browser type, time) | Both | Security and operation | Host logs | **(confirm)** host retention |
| Attempt counters per IP address and class code, and a site-wide count of wrong codes | Both | Blocking code guessing | Database | Minutes to an hour |

**Not collected from students:** email address, birth year (class accounts never have one), surname, photos, voice, location, free text, device identifiers, advertising identifiers.

**Not shared with other students.** There are no leaderboards, chat or any way for a student to see another student's data.

## 4. Who can see what

- **Teacher:** each student's first name, avatar, grade, last active date, and level, first-try accuracy and number of questions for the units they assigned. Not the student's play on other units, not coins, trophies or games.
- **Student:** only their own account.
- **Monday class email (teacher's choice, off until they turn it on):** sent only to the teacher's own confirmed address. It carries what the teacher already sees: students' first names, homework done and not started on the assigned units, units worth reteaching and students to check in with. It is labelled as practice, not a report-card mark, and has its own unsubscribe link. Nothing is emailed to students.
- **Co-teachers:** a class belongs to the teacher who created it (the owner). The owner can invite other teacher accounts by email; the invitee must accept while signed in with that confirmed email. A co-teacher sees exactly what the owner sees (first name, avatar, grade, results on the assigned units, login codes) and can assign units, add students, reset a student's code and print cards. Only the owner can close the class, get a new class code, delete a student, or invite and remove co-teachers. A class has at most five co-teachers, and a co-teacher can leave at any time. The owner and co-teachers see each other's account email.
- **Other teachers:** nothing.
- **Gradelings staff:** operational access for support and security only **(confirm access policy before signing)**. The admin panel (`/admin/`, limited to listed, confirmed staff accounts) shows parent account emails and billing state but never children's names or results, and leaves class student accounts out entirely. Every change made there is logged.
- **Parents** (for linked children): the full family view at home, as for any family.

## 5. Data flow

```
Student's device (browser, saves on the device first)
   |  HTTPS, signed-in cookie
   v
Gradelings app servers, Virginia  --->  Database (Turso, Virginia, US)
   |
   +--> Resend: teacher account emails only (confirmation, password reset)
   +--> Sentry: crash reports and request timing, scrubbed of names, emails, cookies and what was tapped
   +--> Stripe: parents' payments only. No school or student data.
```

Students' devices also keep a copy of progress in the browser (IndexedDB and local storage) so the app works offline. On a **class sign-in the device is cleared first and again on sign-out**, so one child's data does not stay for the next.

## 6. Service providers (sub-processors)

| Provider | Purpose | Data it sees | Location |
| --- | --- | --- | --- |
| Vercel | App hosting, functions in Washington, D.C. (`iad1`, beside the database) | Requests, logs | United States for functions **(confirm: edge and logging location)** |
| Turso (on AWS) | Database | All account data above | Virginia, United States (`aws-us-east-1`) **(confirm encryption at rest)** |
| Resend | Teacher emails | Teacher email address and message; whether each email was opened and which links were clicked (open and click tracking is on) | United States |
| Sentry | Crash reports and request timing | Scrubbed errors; route names and durations | United States or EU |
| Stripe | Parent payments | Parent email and payment | United States. Not used for schools while classes are free. |
| Google Classroom, Clever, ClassLink (only when a teacher imports a roster) | The teacher signs in with the service and we read their class names and each student's first name and the service's ID for them, once. No email, family name or token is kept | The service learns the teacher signed in; the roster is held up to 30 minutes in our database, then deleted | United States (the services' own locations) **(confirm)** |
| Vercel Web Analytics | Anonymous page counts, and counts of trial and subscribe button presses, on public pages only | Page, country | Switched off in the student app and teacher area |

If a district requires all providers to be in Canada, the app functions (Vercel, moved from Montréal to Washington, D.C. in October 2026), the database (Turso, Virginia), Resend and Sentry are the gaps. Resend and Sentry can be switched off for a school-only deployment; the functions can go back to `yul1` in `vercel.json` (at the cost of the slower hop to the database); the database would need a different host, since Turso has no Canadian location. Decision for the owner.

## 7. Retention and deletion

| Event | What is deleted |
| --- | --- |
| Teacher removes a student | The student's account, profile, settings, practice history and sessions, at once |
| Teacher closes a class | Every student account in it, at once, and the assignments |
| Teacher deletes their account | A class with no co-teacher: the class and every student account in it, at once. A class with a co-teacher passes to the one who has taught it longest (who could already see all of it), and its students stay. The deleted teacher's own co-teacher links and invitations are removed |
| Co-teacher leaves, is removed, or deletes their account | Their link to the class, at once. The students and the class stay |
| Teacher gets a new code for a student | The old code stops working and the student is signed out everywhere |
| Parent unlinks a child | The teacher stops seeing the child at once; the family keeps its data |

Classes with no owner, co-teacher, parent or student sign-in for 11 months trigger a warning email to the owner and co-teachers. At 12 months, the class, its assignments and class-account student data (and the co-teacher links and invitations) are deleted automatically. Children linked by a parent are unlinked, but their family data is kept. Backups roll off on the database provider's cycle **(confirm)**.

## 8. Security controls

- HTTPS everywhere. Content Security Policy with no `unsafe-inline` for scripts.
- Passwords hashed with scrypt; sessions stored hashed; HttpOnly, SameSite cookies; `__Host-` prefix in production; same-origin checks on changes.
- Student login codes are eight characters from a 31-character alphabet. Wrong sign-in attempts are limited per network and per class on that network (correct sign-ins never count, so a whole class can sign in together), which makes guessing impractical; the site owner is alerted when one class sees many wrong attempts. A teacher can issue a new code at any time. The printed login card also carries a QR code with the same two codes (after the # of the sign-in link, so they are never sent to a server). It only fills in the sign-in screen: the student still taps “Let’s go”. For ten minutes after that the teacher can undo it, so the previous code is kept for that long (it stops working after ten minutes and is deleted by the daily job).
- A student session works only for syncing the student's own play. Every teacher, parent and billing endpoint refuses it. A student cannot rename, regrade or delete their own profile or add others.
- Teacher access to a class is checked against the signed-in owner or accepted co-teacher on every request, and owner-only actions are checked against the owner. An invitation belongs to an email address, so it never reveals whether an account exists, and it can be accepted only by a confirmed account with that address.
- Error reports are scrubbed of personal data before leaving the server or device.
- Not done yet: an independent penetration test, SOC 2, a written incident-response plan. **A pen test before a first district contract is recommended.**

## 9. Breach handling

We will tell the school or district without undue delay once we confirm a breach affecting its students, with what happened, what data was involved and what we have done, so it can meet its own duties to notify under FIPPA and to the OIPC. We keep a record of every breach. **(Wording and time limit to be set by the lawyer in the data agreement.)**

## 10. Individual rights

Parents and students go through the school. We help the school find, correct, export or delete a student's data on request; deletion is available to the teacher directly. A parent with a family account also has export and delete in the Parent area.

## 11. Accessibility

See [accessibility-conformance.md](accessibility-conformance.md) and `/accessibility/`.

## 12. Decisions for the owner

1. **Canadian-only providers.** Move the database to a Canadian host, and replace or switch off Resend and Sentry, for school deployments?
2. **School or district plan.** Classes are free today. Say so in the agreement or set a price.
3. **Several teachers on one class.** Co-teaching is built (an owner plus up to five invited co-teachers; only the owner closes the class or deletes students). Still open: a school office or administrator role, and whether a co-teacher should also be allowed to delete students.
4. **Birth year.** Already absent from class accounts. Keep it that way.
