# Honest habit nudges: Just 5 and parent cheers

Date: 2026-11-28. Decided by Melvin ("yes please", after asking about "dark psychology" to get kids practising more).

**Decision:** no dark patterns with children: no guilt streaks, fake scarcity, loot-box rewards or "you'll lose it" pressure (they cost trust with parents, who pay, and risk Google Play's Families policy and children's privacy rules). Practice habits are built with the same honest ideas the app already has (forgiving streak shields, visible progress, spaced review, push at calm times) plus two small additions, both off until Melvin turns them on:

- **Just 5 questions** (flag `quick-five`): a small button under Adventure for children in Grade 2 and up, shown only until they have practised that day, that starts a five-question Adventure (`quick=1`, `QUICK_FIVE` in `plans.ts`). It counts like any lesson for the day and the streak. It disappears once the child has practised, and never shows for little kids, class student accounts or in a way that pushes late-night use.
- **Parent cheers** (flag `parent-cheer`, needs `push-notifications`): when a child reaches a 3, 7, 14, 30, 50 or 100 day streak and practised today, a parent's notification-enabled device gets one kind line ("Maya is on a 3-day streak"), so the parent can say well done (`cheerMessage`, `cheerStreak`, in the daily job's `push` phase). Never results, never about a missed day, at most one a day (the longest streak wins), and it leaves the device's last-sent day alone so it never uses up the weekly summary or a reminder.

**Not built, on purpose:** streak-loss warnings to children, countdown or "last chance" messages, and push to children about streaks.
