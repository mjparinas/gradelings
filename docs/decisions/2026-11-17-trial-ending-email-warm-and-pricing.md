# The final trial email thanks the family by child and links to pricing

Date: November 17, 2026. Owner (Melvin) approved converting active trial families to paid, and asked for an automatic email 3 days before a trial ends.

- The email already existed (`trialEndingEmail`, daily job phase `trial-notices`, `TRIAL_NOTICE_DAYS` days before the end, once per family, confirmed owners only). It was improved, not duplicated.
- When a child has practised, the subject names the children ("3 days left: here's how Maya and Leo did on Gradelings"), the body thanks the family, shows each child's totals and top strength, and says there is no rush. Families with no practice still get the "ten minutes today" version.
- The button is "See plans and prices" and goes to the public `/pricing/` page (not the PIN-gated Parent area), because pricing turns visits into sales well. The mid-trial recap still links to Subscription.
- Timings are read from `plan.ts` (`TRIAL_DAYS`, `TRIAL_NOTICE_DAYS`); never type them.
- Why a family signed up on November 10 had a 30-day trial: the 14-day change (#585) reached `main` only with the November 13 promotion, so production still ran 30-day trials until then. Not a bug. Families who signed up before it keep the trial they were given.
- No one-off emails go to customers without the owner's OK.
