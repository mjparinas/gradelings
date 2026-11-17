# Teachers can set up a class before confirming their email (Melvin, November 17, 2026)

Nine teachers had signed up and almost none had practice, and a new teacher couldn't create a class until they confirmed their email. A teacher can now create a class and add students straight away. Students can sign in with their codes, and parents can link a child with the class code, only once the class owner's email is confirmed (`classOpenForJoining` in `src/server/classroom.ts`; the sign-in and join routes answer 403 with a short "class isn't open yet" message). The teacher area shows a gentle "Confirm your email so students can join" banner on the class list and on every class page until then. Roster import, co-teacher invitations and the Monday email still need a confirmed email.

Why: asking for confirmation before anything else was a dead end at the moment a teacher is most likely to give up; children's data is still only reachable once the address is confirmed.
