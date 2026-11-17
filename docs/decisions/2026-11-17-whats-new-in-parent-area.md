# What's new in the parent area (Melvin, November 17, 2026)

Melvin asked for the What's new page to be reachable from the parent area.

- **Where:** `#/whats-new` (`WhatsNew.tsx`), linked from the parent area's footer (beside Training videos) and from a quiet "New in Gradelings" card on the Overview. There is no seventh tab: the parent area keeps its six (and Settings stays as simplified in `2026-11-16-simpler-parent-settings.md`).
- **What it shows** (`src/lib/parentNews.ts`): the same posts as `/whats-new/` (`src/lib/whatsNew.ts`), last 20 days, new things and fixes only; "For teachers" items are left out. In the Android and iOS apps anything that mentions trials, prices, plans or codes is dropped and there is no link to the website (store apps sell nothing).
- **"New" marks:** the newest day seen is kept on the device only (`localStorage` `gradelings.news.seen`, never synced, nothing about a child). A device that has never looked starts from the newest post, so nothing old is marked new. Opening the page, or "Not now" on the card, marks everything seen.
- Calm by design: a small dot on the footer link and one dismissible card, no badge counts on the tabs, nothing pushed.
