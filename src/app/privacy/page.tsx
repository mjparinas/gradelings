import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/site/Legal";
import { APP_NAME, CONTACT_EMAIL, LEGAL_NAME, MAILING_ADDRESS } from "@/lib/brand";
import { CONSENT_NOTICE } from "@/lib/coppa";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: "Privacy policy",
  description: `How ${APP_NAME} handles your family’s information: what we collect, why, who sees it, and how to export or delete everything.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`${APP_NAME} is built for children, so we collect as little as we can. This page explains, in plain words, what we keep, why, and how you stay in control. ${LEGAL_NAME} ("we", "us") runs ${APP_NAME}.`}
    >
      <Section title="The short version">
        <ul>
          <li>We show no ads and never sell or rent your family’s information.</li>
          <li>We measure visits to our public website, and our email provider tells us when an email we send you is opened or a link in it is clicked. See “Who we share it with” below.</li>
          <li>We keep a child’s first name or nickname, grade, an optional birth year, an avatar and their practice results. Nothing else about them.</li>
          <li>Children don’t type free text, upload photos or record their voice.</li>
          <li>You can export or delete everything yourself, at any time, from the Parent area.</li>
        </ul>
      </Section>

      <Section title="Who this applies to">
        <p>
          {APP_NAME} is used by children, but it is set up and paid for by a parent or guardian. By creating an account or adding a child, you confirm that you are that child’s parent or legal guardian (or have their permission) and agree to this policy on their behalf. Children are never asked to create accounts, enter an email address or buy anything. Your agreement is our consent to collect a child’s information, and you can withdraw it at any time by deleting the child’s profile or your account.
        </p>
        <p>
          {APP_NAME} is built for families. Where a school or teacher uses {APP_NAME} with a class, see “Schools and classes” below. A teacher should not enrol students through a family account.
        </p>
      </Section>

      <Section title="What we collect">
        <p>
          <strong>About you (the parent):</strong>
        </p>
        <ul>
          <li>Your email address and a password. Passwords are stored only as a salted scrypt hash, never in readable form.</li>
          <li>Subscription details: your plan, billing interval, renewal date and the amounts paid (when you delete your account, the amounts stay in our totals with nothing linking them to you). Payments are handled by Stripe, so we never see or store your card number.</li>
          <li>Referrals: a referral code for your family, and, if you signed up through a friend’s link, which family’s code you used. A parent can’t see who used their code, only how many families joined and how many free months that earned.</li>
        </ul>
        <p>
          <strong>About each child (up to four per family):</strong>
        </p>
        <ul>
          <li>A first name or nickname, grade, an avatar and, if you choose, a birth year (used only to suggest a grade).</li>
          <li>Practice activity: which questions were answered, whether they were right, when, and how long a lesson took. From this we work out progress, levels, trophies and your reports.</li>
          <li>Settings you choose, such as daily goal, timers, game time, sound, read-aloud and calm options.</li>
        </ul>
        <p>
          <strong>If you report a problem with a question:</strong> we keep the question as it was shown (its picture, answer choices and right answer), the province or state it was set for, the reason you picked from a fixed list and the date, linked to your family so we can follow up.
        </p>
        <p>
          <strong>If you write to us through the contact page:</strong> your name if you give it, your email address, the topic you pick and your message. They are emailed to our inbox through Resend so we can reply; we don’t copy them into our database. The same goes for anything you email us directly. To answer faster, we may send your message to Anthropic so its AI model, Claude, can suggest a first draft of our reply; a person reads and edits every reply before it is sent, and nothing is answered automatically.
        </p>
        <p>
          <strong>On your device:</strong> the app saves progress on the device first, so it works offline, using the browser’s local storage and IndexedDB. Your Parent area PIN is stored there too, salted and hashed, and your read-aloud voice choice is kept per device. If you never sign in, this information stays on that device and is not sent to us.
        </p>
        <p>
          <strong>Automatically:</strong> our servers keep ordinary technical logs (such as IP address, browser type and the time of a request) for security and to keep the service running. To block repeated guessing of passwords, we also keep a short-lived counter of sign-in, sign-up and reset attempts for each IP address. We also measure visits to our website and whether our emails are opened and clicked; see “Who we share it with” below.
        </p>
      </Section>

      <Section title="Schools and classes">
        <p>
          A teacher can use {APP_NAME} with a class in two ways. A parent can link their own child to a class with the class code, which is the parent’s choice and can be undone at any time. Or the teacher can add students by first name or nickname, and each student signs in with two short codes. Students added by a teacher have no email address and no password.
        </p>
        <p>
          <strong>What we keep about a student a teacher added:</strong> the first name or nickname the teacher typed, the class’s grade and curriculum, an avatar, comfort settings and practice results. Nothing else: no email, birth year, surname, photo, voice or free text. These accounts have no parent area and no billing, and a student’s sign-in works only for their own play.
        </p>
        <p>
          <strong>Who sees it:</strong> the teacher who owns the class sees each student’s first name, avatar, grade and practice results on the units they assigned. The owner can invite other teachers by email to co-teach the class, and each invited teacher has to accept first. Co-teachers see the same information and can assign units, add students and print login cards; only the owner can close the class, delete a student or manage co-teachers, and a co-teacher can leave at any time. Nobody else, including other teachers and other students, sees it. We send no email to student accounts, show no ads and never use their information for anything but running {APP_NAME}.
        </p>
        <p>
          <strong>Deleting it:</strong> when a teacher removes a student or closes a class, the related students’ accounts and practice history are deleted from our live systems straight away. When the owner of a class deletes their account, the class and its students are deleted straight away too, unless the class has a co-teacher: then the class passes to the co-teacher who has taught it longest, who could already see everything in it, and the students keep their accounts. A student’s device is cleared when they sign out.
        </p>
        <p>
          Classes with no sign-in by the owner, a co-teacher, a linked family or a class student for 11 months receive a warning email to the owner and co-teachers. After 12 months without a sign-in, we delete the class, its assignments and class-account student data (and the co-teacher links) automatically. A parent-linked child is unlinked, but their family account and practice history stay. Backups expire on the database provider’s schedule.
        </p>
        <p>
          <strong>Responsibility:</strong> a school or teacher decides whether to use {APP_NAME} with students and is responsible for telling families and getting any consent its own rules require, including the duties of public schools in British Columbia under the Freedom of Information and Protection of Privacy Act (FIPPA) of Ontario schools and of Alberta schools under their own privacy laws. For those uses we handle students’ information only to run the service for the school. If a breach affects a school’s students we will tell the school promptly so it can meet its own duties. Schools or districts that need a signed data agreement or privacy answers for a privacy impact assessment can email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="How we use it">
        <ul>
          <li>To run the app: choose questions, keep score, and show your child’s progress.</li>
          <li>To sync progress between your devices once you’ve signed in.</li>
          <li>To show you reports, including how practice lines up with report-card levels. These reflect practice only; they are not a school mark.</li>
          <li>To manage your subscription and send you important account messages (for example a password reset or a billing notice).</li>
          <li>To keep the service secure and fix problems.</li>
        </ul>
        <p>
          If you choose, we also send a short weekly progress email (it includes each child’s first name and practice totals, and nothing else about them), and you can create a read-only link to a child’s report. Anyone with that link can see that child’s name, grade and the practice totals in the report, until it expires after 30 days or you stop sharing it. You can also share a milestone card (such as “Grew into a Tree in Fractions” or “100 questions right on the first try”); it shows only that milestone and, for a topic, the grade and subject, never your child’s name, and we keep no record of it. You opt in to the weekly email yourself, after confirming your email address, and you can stop it at any time in the Parent area or with the unsubscribe link in each email. You can also opt in to a gentle practice reminder, sent only to you (never to your child) after a few quiet days and at most once a week; it includes only a child’s first name and how many days it has been, and has its own unsubscribe link. Account and billing messages are not marketing and are sent as long as you have an account.
        </p>
        <p>
          Once your email is confirmed, we may now and then send you news and tips: new features, ideas to try at home, or an offer. These can greet your child by first name, are sent only to you, and you can turn them off at any time under Account &amp; sync or with the unsubscribe link in each one. For each email we send to your account we keep a short record of which kind it was, when it went and whether it was delivered, bounced or marked as spam (reported to us by our email provider), never its contents, so we can stop emailing an address that doesn’t work. Our email provider also records whether each email was opened and which links in it were clicked (it adds a tiny image to the email and sends links through its own address first), and we use that to see which emails are useful. Turning off images in your email app stops the open count. If you email us, our email provider keeps your message and we keep only whether we have answered it.
        </p>
        <p>We don’t use children’s information for advertising or to build profiles for any other purpose.</p>
      </Section>

      <Section title="Who we share it with">
        <p>We share information only with service providers that help us run {APP_NAME}, and only what they need:</p>
        <ul>
          <li>
            <strong>Stripe</strong>, to take payments and manage subscriptions. Stripe receives your email and payment details under its own privacy policy.
          </li>
          <li>
            <strong>Resend</strong>, to deliver the emails we send you (such as email confirmation, password resets and the weekly report). It receives your email address and the message, which can include a child’s first name and practice totals. It also records when an email is opened and which links are clicked, along with the time, the device’s IP address and the email app or browser used.
          </li>
          <li>
            <strong>Anthropic</strong>, to suggest a first draft when we answer a message you sent us. It receives that message, your name and email address as written in it, and nothing else about your account or your children. Under Anthropic’s commercial terms it doesn’t use it to train its models.
          </li>
          <li>
            <strong>Sentry</strong>, to tell us when the app crashes. Error reports are stripped of names, email addresses, cookies and what was typed or tapped before they leave your device or our server, and are not used for anything else.
          </li>
          <li>
            <strong>Vercel Web Analytics and Speed Insights</strong>, to count anonymous page views and measure how fast our public website loads, such as which pages are visited, from which country, how quickly they appear and how often their buttons to try or subscribe are pressed. It sets no cookies. It is switched off in the kids’ app, the parent area, shared reports, shared milestones and account pages.
          </li>
          <li>
            <strong>Our hosting and database providers</strong>, which store the account and progress data described above on our behalf. Our servers are in Montréal, Canada, and our database is in Virginia, United States. Some other service providers above, such as Stripe, Resend, Anthropic and Sentry, may also process limited information outside Canada.
          </li>
        </ul>
        <p>
          We may also disclose information if the law requires it, or to protect the safety of a child or our service. If {APP_NAME} is ever sold or merged, your information would stay protected by this policy unless you agree to a change.
        </p>
      </Section>

      <Section title="Families in the United States" id="united-states">
        <p>
          This section is our notice to parents in the United States under the Children’s Online Privacy Protection Act (COPPA). A family is treated as a US family when the first child added follows a US state’s curriculum. Everything else in this policy applies too.
        </p>
        <p>
          <strong>What we collect from children, and why.</strong> {CONSENT_NOTICE.collect} {CONSENT_NOTICE.why} We collect no more than the app needs, and a child can use every part of it without giving more.
        </p>
        <p>
          <strong>What we don’t do.</strong> {CONSENT_NOTICE.never} Children can’t make their information public or send it to anyone.
        </p>
        <p>
          <strong>How you give consent.</strong> Before your children’s information is synced to our servers, the Parent area shows you this notice and asks you to tick that you agree. Until you do, their progress stays on your device only. When you agree, we email you a confirmation, and we email you again a day or more later, each time with a link to withdraw (the “email plus” method). If you subscribe to a paid plan, the payment also counts as your consent.
        </p>
        <p>
          <strong>How long we keep it.</strong> We keep a child’s information while your account is open and it is needed to run the app for your family. When you delete a child, delete your account or withdraw consent, we delete the children’s information from our live systems straight away. Read-only report links you create expire after 30 days. Classes with no sign-in for 12 months are deleted, as described under “Schools and classes”. Backups expire on our database provider’s schedule.
        </p>
        <p>
          <strong>Your rights as a parent.</strong> You can review your children’s information (download it as a file from the Parent area under Account), have it deleted (delete a child, or your account), and refuse further collection or use at any time by withdrawing consent in the Parent area or with the link in our confirmation emails. Withdrawing deletes the children’s information from our servers and stops syncing; the app keeps working on your device. You can also email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          <strong>Where it is stored.</strong> Our servers are in Montréal, Canada, and our database is in Virginia, United States. The service providers listed under “Who we share it with” may process limited information in the United States or elsewhere.
        </p>
        <p>
          <strong>Operator.</strong> {LEGAL_NAME} operates {APP_NAME} and is the only operator collecting children’s information through it. Contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {MAILING_ADDRESS ? `, ${MAILING_ADDRESS}` : ""}. If you believe we haven’t followed COPPA, you can also complain to the US Federal Trade Commission at reportfraud.ftc.gov.
        </p>
        <p>
          <strong>Schools in Washington State.</strong> When a school or teacher uses {APP_NAME} with students, the school gives consent for educational use on parents’ behalf, and we act for the school. In line with Washington’s Student User Privacy in Education Rights Act (SUPER Act) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; delete it when the school asks (and as described under “Schools and classes”); keep a security program in place to protect it, as described under “Security”; and give notice before we make a material change to how we handle it.
        </p>
        <p>
          <strong>Schools in Oregon.</strong> The same applies when an Oregon school or teacher uses {APP_NAME} with students. In line with the Oregon Student Information Protection Act (ORS 336.184) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.
        </p>
        <p>
          <strong>Schools in California.</strong> The same applies when a California school or teacher uses {APP_NAME} with students. In line with California’s Student Online Personal Information Protection Act (SOPIPA, Business and Professions Code section 22584) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks. A school’s contract with us can include the terms Education Code section 49073.1 requires, and parents can review their child’s information through the school.
        </p>
        <p>
          <strong>Schools in New York.</strong> The same applies when a New York school or teacher uses {APP_NAME} with students. In line with New York’s Education Law section 2-d and Part 121 of the Commissioner’s regulations we: never sell students’ information or use it or release it for marketing or any commercial purpose; use it only for the educational purposes the school sets; share it only with the service providers listed under “Who we share it with”, who are bound to protect it; keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and tell the school if a breach affects its students, so it can meet its own duties to notify families. A New York school’s contract with us can include the Parents’ Bill of Rights for Data Privacy and Security and the supplemental information the law requires, and parents can review their child’s information through the school.
        </p>
        <p>
          <strong>Schools in Texas.</strong> The same applies when a Texas school or teacher uses {APP_NAME} with students. In line with Texas Education Code chapter 32, subchapter D (sections 32.151 to 32.157) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.
          <strong>Schools in Minnesota.</strong> The same applies when a Minnesota school or teacher uses {APP_NAME} with students. In line with Minnesota Statutes section 13.32, which covers technology providers to schools, we: treat students’ information as the school’s, never ours; never sell, share or disseminate it except as the law allows (with the school, and with the service providers listed under “Who we share it with”); never use it for any commercial purpose, including marketing or advertising to students or parents; keep a security program in place to protect it, as described under “Security”; tell the school if a breach affects its students, so it can meet its own duties; and delete it, or return it to the school, when the school asks and within 90 days after the school’s agreement with us ends unless it is being renewed. {APP_NAME} doesn’t use the location, camera or microphone of a school device, and doesn’t monitor students’ keystrokes or web browsing.
        </p>
        <p>
          <strong>Schools in Maine.</strong> The same applies when a Maine school or teacher uses {APP_NAME} with students. In line with Maine’s Student Information Privacy Act (Title 20-A, sections 951 to 953) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.
        </p>
        <p>
          <strong>Schools in Alaska.</strong> The same applies when an Alaska school or teacher uses {APP_NAME} with students. Alaska has no student online privacy law of its own, so we give Alaska schools the same commitments as schools in other states: we never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only with the school and the service providers listed under “Who we share it with”; keep a security program in place to protect it, as described under “Security”; delete it when the school asks; and tell the school if a breach affects its students, in line with the Alaska Personal Information Protection Act (AS 45.48). FERPA and COPPA apply as for every US school.
        </p>
        <p>
          <strong>Schools in Alabama.</strong> The same applies when an Alabama school or teacher uses {APP_NAME} with students. Alabama has no student privacy law of its own beyond FERPA, so we work under the school district’s data agreement, as the Alabama State Board of Education’s data use policy expects, and make the same commitments as above: we never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.
        </p>
        <p>
          <strong>Schools in Arizona.</strong> The same applies when an Arizona school or teacher uses {APP_NAME} with students. In line with Arizona Revised Statutes section 15-1046 (student data privacy) we: never use students’ information for targeted advertising; never sell or rent it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; and delete it within a reasonable time when the school asks.
        </p>
        <p>
          <strong>Schools in Arkansas.</strong> The same applies when an Arkansas school or teacher uses {APP_NAME} with students. In line with Arkansas’s Student Online Personal Information Protection Act (Arkansas Code 6-18-109) we: never use students’ information for targeted advertising; never sell it, and never build a profile of a student except for the school’s educational purposes; share it only as the law allows (with the school, and with the service providers listed under “Who we share it with”, who are bound not to use or pass it on for anything else and to keep it secure); keep a security program in place to protect it, as described under “Security”; and delete it when the school asks.
        </p>
        <p>
          <strong>Health data.</strong> We don’t collect consumer health data as defined in Washington’s My Health My Data Act, or any other health information. The calm and focus options in Settings (calmer motion, quieter sounds, hidden timers) are presentation preferences a parent chooses; we never ask why, and they say nothing about a child’s health.
        </p>
      </Section>

      <Section title="Cookies and similar storage">
        <p>
          We use one essential, HttpOnly cookie to keep you signed in to your parent account. We also use your browser’s local storage and a service worker to save progress, settings and app files so {APP_NAME} works offline. We don’t use advertising or analytics cookies (our website analytics are cookieless), so there is no cookie banner to dismiss.
        </p>
      </Section>

      <Section title="Your choices and rights">
        <p>
          Everything below is in the Parent area under <strong>Privacy</strong>:
        </p>
        <ul>
          <li>
            <strong>Export:</strong> download all of your family’s data as a JSON file.
          </li>
          <li>
            <strong>Erase this device:</strong> remove everything saved on the device you’re using.
          </li>
          <li>
            <strong>Delete your account:</strong> permanently delete your account, your children’s profiles and all of their progress from our servers.
          </li>
        </ul>
        <p>
          You can also ask to see, correct or delete your information, or withdraw your consent, by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will answer within 30 days. Depending on where you live, you may have further rights under privacy laws such as Canada’s PIPEDA, British Columbia’s PIPA, or US state laws; we will honour them. If you’re unhappy with how we’ve handled a request, you can complain to us first, and you can contact the Office of the Privacy Commissioner of Canada (priv.gc.ca) or the Office of the Information and Privacy Commissioner for British Columbia (oipc.bc.ca).
        </p>
      </Section>

      <Section title="How long we keep it">
        <p>
          We keep account and progress data while your account is open, and we don’t keep a child’s information once it is no longer needed for that purpose. When you delete your account, we delete your family’s data from our live systems straight away. Attempt counters for sign-in expire within minutes, and error reports are kept by Sentry for a short period under its own settings. Stripe keeps its payment records under its own policy, and deleting your account here does not cancel a paid subscription, so cancel it first under Subscription. Copies in backups are removed on a regular cycle, and billing records may be kept for as long as tax and accounting law requires.
        </p>
      </Section>

      <Section title="Security">
        <p>
          Data is encrypted in transit (HTTPS). Passwords are hashed with scrypt, sign-in sessions are stored hashed, and the Parent area is behind a PIN on the device. No system is perfectly secure, but we limit what we collect so there is less to protect. If a breach puts your information at real risk of significant harm, we will tell you and the Office of the Privacy Commissioner of Canada as the law requires, and we keep a record of every breach.
        </p>
      </Section>

      <Section title="Where your information is stored">
        <p>
          Our providers may store and process data in Canada, the United States or other countries, where privacy laws can differ, and courts or authorities there may be able to ask for access to it. We choose providers that protect data to a high standard and we only send them what’s needed.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If we change this policy in a way that matters, we’ll update the date at the top and tell account holders by email or in the app before the change takes effect.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          {LEGAL_NAME} is responsible for the personal information it holds. Questions, requests or complaints go to our privacy contact at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {MAILING_ADDRESS ? ` or ${MAILING_ADDRESS}` : ""}. See also our <Link href="/terms/">terms of use</Link>.
        </p>
      </Section>
    </LegalPage>
  );
}
