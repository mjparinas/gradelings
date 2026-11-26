# A nudge for teachers whose students haven't practised (2026-11-26)

Melvin approved a teacher follow-up after the funnel review (teachers add students but few students sign in).

- New email group "Teachers: students haven't started" (`teacher-no-practice`): a class made 3 to 60 days ago with students and no events from any of them. The existing "Add your students" nudge still covers classes with no students, so nobody gets both.
- New message "Get your students started" (print the login cards, sign in once) and a new automatic nudge of the same name. It follows the usual rules: off until an admin types `TURN ON` under Reach > Automations, a daily cap, once per 30 days per family.
- Nothing about a child is stored: it reads only whether any event exists for a class student's profile (indexed by `events_profile`).
- The Students tab already shows "Print login cards" in the "Your class is ready" panel, so no new in-app prompt was added.
