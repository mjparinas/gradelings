# Ask guests for an email sooner (November 25, 2026)

Owner go-ahead ("ok go") after the conversion health check. In the last 28 days about 435 "Try it free" clicks became about 26 accounts, and 170 guest players never left an email. The "For grown-ups" card (`src/lib/saveNudge.ts`) now shows after the first, second, third, fifth and seventh lessons (it was the first, third and seventh). It is still one quiet card with an email-only form, never shown once an account exists, and unchanged in the final stretch of the trial.

Also found: the admin panel's $0 revenue next to $14.99 recurring revenue is expected for a subscriber who subscribed during the trial. Checkout keeps the trial days, so Stripe's first charge (and the `invoice.paid` payment record) happens when the trial ends. It is not a webhook gap.
