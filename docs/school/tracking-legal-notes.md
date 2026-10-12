# Tracking and children's privacy: notes for the lawyer review

Written October 2026, when the owner dropped the "no tracking" promise. These are questions and pointers for the lawyer reviewing `/privacy/`, `/terms/` and the school data agreement. They are not legal advice.

## What is in use

| Tool | What it sees | Where it runs |
| --- | --- | --- |
| Vercel Web Analytics and Speed Insights | Page, country, referrer, load speed. No cookies. | Public pages only. Off in `/play/`, `/parents/`, `/shared/`, `/account/` (`src/components/SiteAnalytics.tsx`). |
| Cloudflare Web Analytics | Page, country, referrer. No cookies. | Set up at Cloudflare, not in the code. **Confirm which pages it covers.** Its script was not on the live home page on 2026-10-12, and the site's Content Security Policy would block it, so it may be counting at Cloudflare's edge instead. |
| Resend open and click tracking | Per email: opened or not, links clicked, time, IP address, email client. | Every email from the domain, including the weekly progress email and practice reminders, which carry a child's first name. Teacher emails too. |

Nothing measures what a child does in the kids' app or the parent area. `/privacy/` lists all three.

## Questions for the lawyer

1. **Cloudflare on the kids' app.** If Cloudflare Web Analytics covers every page, it reaches `/play/` and collects a child's IP address and device details. Under COPPA (below) and the Privacy Commissioner's guidance on children, that is the riskiest item. Cloudflare can exclude paths; the simplest fix is to exclude `/play/`, `/parents/`, `/shared/`, `/account/` and `/teachers/`, matching Vercel.
2. **Email tracking on emails that name a child.** Resend's open and click records are tied to the parent's address and sit next to a child's first name and practice totals. Parents are adults, so COPPA doesn't apply directly, but PIPEDA's openness and meaningful-consent rules do. Is the `/privacy/` disclosure enough, or should tracking be off for child-related emails (Resend sets tracking per domain, so this would mean a separate sending subdomain with tracking off)? Should parents get an opt-out beyond turning images off (which doesn't stop click tracking)?
3. **PIPEDA (federal, private sector).** The OPC's *Guidelines for obtaining meaningful consent* say parents consent for children under 13, and list tracking children for behavioural advertising as a "no-go zone". We do none of that, but the lawyer should confirm that cookieless page counts and email-engagement records are covered by the current consent wording. Cross-border processing (Cloudflare, Resend, Vercel edge) must be disclosed; `/privacy/` now names Cloudflare.
4. **CASL.** Open and click tracking is allowed, but every commercial email still needs consent, sender identification and an unsubscribe link. Already in place (`src/server/adminEmail.ts`); confirm nothing changes with tracking on.
5. **Provincial law.** Alberta's and BC's PIPA apply to private-sector collection in those provinces in place of PIPEDA; their consent and notice rules are similar. For schools, BC's FIPPA, Ontario's MFIPPA and Alberta's FOIP (Access to Information and Protection of Privacy Acts since 2025) put the duty on the school or board, which will ask about every sub-processor. `docs/school/pia-pack.md` now lists Cloudflare and Resend's tracking.
6. **Quebec Law 25.** Quebec isn't supported, but the public site is reachable from Quebec. Law 25 requires technologies that identify, locate or profile a person to be off by default and disclosed. Ask whether cookieless analytics and email tracking fall under that, in case Quebec support is added later.
7. **COPPA (United States, under 13).** It applies to a service directed at children that collects personal information from US children, and a persistent identifier such as an IP address counts. Collection for "support for internal operations" (analytics to run and improve the site, with no profiling or contacting the child) needs no parental consent. The 2025 amendments (in force June 2025, compliance by April 22, 2026) add separate consent for disclosure to third parties, a written retention policy and a written security program. Ask whether US families are in scope at launch.
8. **Google Play Families policy.** The Android app wraps `/play/`. Families apps may not send device identifiers from children to analytics providers that aren't self-certified for families. Keep all analytics off `/play/` (see 1) before submitting.

## Not changed

- The school data agreement still says Gradelings won't load third-party trackers in the student experience (`docs/school/school-data-agreement.md`). That stays true as long as `/play/` carries no analytics. Point 1 is what could break it.
- No new tracking or analytics were added.
