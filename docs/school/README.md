# Using Gradelings in a school or district

Everything here is a **draft prepared for the owner**. None of it has been reviewed by a lawyer, and the contract and consent texts must be before anyone signs or sends them. Placeholders are marked `[...]`.

BC has no provincial approval list: each of the 60 districts decides for itself, usually through a Privacy Impact Assessment (PIA) under FIPPA, and sometimes a Supplemental Review when data leaves Canada. See `/mnt/project-files/school-approval/bc-school-approval-gaps.md` in the project files for the research behind this. Ontario boards run their own privacy reviews on the same pattern.

| File | What it is | Status |
| --- | --- | --- |
| [pia-pack.md](pia-pack.md) | The answers a district asks for: data inventory, data flow, service providers, retention, access, security, breach handling. Written from the code as it is today. | Draft. Facts checked against the repo; items marked **(confirm)** need a provider's written answer. |
| [school-data-agreement.md](school-data-agreement.md) | A short data agreement a school or district can sign. | Draft template. Needs a lawyer and a real legal entity. |
| [parent-consent-letter.md](parent-consent-letter.md) | A letter a teacher can send home. | Draft template for teachers and districts to adapt. |
| [accessibility-conformance.md](accessibility-conformance.md) | WCAG 2.2 A/AA conformance report in the shape districts ask for (a VPAT-style table). | Automated checks and a scripted keyboard-only run-through. Screen reader testing and a keyboard run-through by a person are still to do. |

Public pages that go with this: `/privacy/` (with a "Schools and classes" section), `/terms/` (teachers and classes) and `/accessibility/`.

## What the product does today

- A teacher has an ordinary account (confirmed email) and creates classes for one province's curriculum.
- **Two ways to get students in.** A parent can link their own child with the class code (the parent decides, and can unlink). Or the teacher adds students by first name or nickname, and each gets a login code. There is no email or password for a student.
- A student account holds a first name or nickname, the class's grade, an avatar and practice results. It has no parent area, no billing and no way to see anything but its own play.
- The teacher sees first name, grade, avatar and results on the units they assigned, plus a "what to look at next" list.
- Removing a student, closing a class and deleting a teacher account each delete the students' data at once.

## Schools in the United States (Washington, Oregon, California and New York)

Classes can follow Washington, Oregon, California or New York (`TEACHER_FRAMEWORK_IDS` in `src/components/site/teachers.ts`).

- **Consent.** Under COPPA a school can consent on parents' behalf for educational use. Student accounts a teacher adds are never asked for parental consent (only family accounts are; `src/lib/coppa.ts`), and the teacher's screens for a US class carry one line saying the school consents on parents' behalf for educational use only (`US_CLASS_CONSENT` in `src/lib/classroom.ts`).
- **FERPA.** For a school, the Provider acts as a "school official" with a legitimate educational interest: it works under the school's direct control, uses education records only for the purpose they were shared for, and doesn't re-disclose them. Section 12 of `school-data-agreement.md` says so.
- **Data agreement.** Washington, Oregon and California districts mostly sign the Student Data Privacy Consortium's National Data Privacy Agreement (NDPA) with their state's exhibit (in Washington through the Washington Student Privacy Alliance, in Oregon through the Oregon Student Privacy Alliance, in California through the California Student Privacy Alliance). Offer to sign that rather than our own template; `school-data-agreement.md` section 12 lists what we can commit to.
- **Washington law.** `/privacy/` ("Families in the United States") states our SUPER Act commitments (no targeted advertising, no sale, no profiling beyond the school's purpose, deletion on request, a security program, notice before material changes) and that we collect no consumer health data under the My Health My Data Act.
- **Oregon law.** `/privacy/` states the matching commitments under the Oregon Student Information Protection Act (ORS 336.184): no targeted advertising, no sale, no profiling beyond the school's purpose, sharing only as the law allows, a security program and deletion when the school asks.
- **California law.** `/privacy/` states the matching commitments under SOPIPA (Business and Professions Code 22584): no targeted advertising, no sale, no profiling beyond the school's purpose, sharing only as the law allows, a security program and deletion when the school asks. A California district's contract must carry the terms in Education Code 49073.1 (AB 1584); `school-data-agreement.md` and the NDPA's California exhibit cover them.
- **New York law.** `/privacy/` states our commitments under Education Law 2-d and Part 121 of the Commissioner's regulations: no sale, no use or release for marketing or commercial purposes, use only for the school's educational purposes, sharing only with the listed service providers, a security program, deletion when the school asks and telling the school about a breach affecting its students. Every New York district contract must carry the district's Parents' Bill of Rights for Data Privacy and Security and supplemental information about the product, and Part 121 asks a contractor for a data security and privacy plan, encryption in transit and at rest, security practices aligned with the NIST Cybersecurity Framework and breach notice to the district within 7 calendar days of discovery. Encryption at rest (Turso) is still a **(confirm)** item, and the breach window in `school-data-agreement.md` section 7 is blank; settle both before signing with a New York district.

## Still to do before a district can say yes

1. **Real legal entity and contact details** in `src/lib/brand.ts` (`LEGAL_NAME`, `CONTACT_EMAIL`, `MAILING_ADDRESS`), then a lawyer's review of the privacy policy, terms and the agreement.
2. **Provider answers** for the **(confirm)** items in the PIA pack (Turso encryption at rest and backups, database region, Resend and Sentry data handling).
3. **Screen reader testing** (VoiceOver, TalkBack, NVDA) and a keyboard run-through by a person, then update the conformance report.
4. **Decisions for the owner**, listed at the end of the PIA pack: whether a school plan exists (needs the owner's pricing decision) and whether co-teachers should be able to delete students or a school office role is needed. Co-teaching itself is built.
5. **A pilot** with one friendly school or district, which will show their actual process.
