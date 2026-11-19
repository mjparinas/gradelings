# Notifications for parents and children (November 19, 2026)

Melvin asked for "app icon notifications". Answers in the thread:

- The badge shows homework and lessons that aren't complete.
- Real push notifications, for both parents and children.
- Parents get a weekly summary plus practice reminders.

**Decision:** build Web Push for parents and for children's devices, plus an app icon badge, both behind flags that start off (`push-notifications`, `app-badge`). This overrides the October 2026 rules "no push notifications" and "never push to children".

**How it stays kind and safe:** a parent switches it on (children never see a permission prompt); messages are one sentence and a link with no results; at most one a day per device with gaps of 3 to 6 days; a US child's device needs COPPA consent; class student accounts are left out; subscriptions hold only the push address and keys and are deleted with the family.

**Not done here:** an Android build with notifications on (needs Melvin to build and upload), and a "lesson left partway" push (that state lives only on the device, so the badge covers it).
