import Link from "next/link";
import { Section } from "@/components/site/Legal";
import { APP_NAME, CONTACT_EMAIL, REPLY_TIME } from "@/lib/brand";

// The public trust centre (/trust/). Every line here must be true of what is live on gradelings.com: claim only controls
// that are merged and deployed, and put work still in review under IN_PROGRESS until it ships. Keep it consistent with
// /privacy/ (providers, where data is stored) and /accessibility/.

/** The day this page's claims were last checked against the code. */
export const TRUST_UPDATED = "October 14, 2026";

/** Security work under way but not live yet. Move an item into its section once it ships. */
export const IN_PROGRESS: { title: string; text: string }[] = [
  {
    title: "A script policy on every page",
    text: "Each page is meant to carry its own list of the exact scripts and styles it may run, so anything injected is refused. Our host recently changed how it builds pages and that list was left out of the live pages. The fix is written and in review. Until it is live, pages still carry the header protections listed above, and nothing on our pages loads code from other sites.",
  },
];

export function TrustCentre() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold">Trust centre</h1>
      <p className="mt-1 text-sm text-ink-soft">Last checked {TRUST_UPDATED}</p>
      <p className="mt-4 font-read text-lg">
        {APP_NAME} is used by children, so we try to deserve the trust of the parents and teachers who choose it. This page lists the security and privacy controls that are in place today, in plain words. Where something is still being built, we say so. Our{" "}
        <Link className="text-[#2f6fd6] underline" href="/privacy/">
          privacy policy
        </Link>{" "}
        has the full detail of what we collect and who we share it with.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <Section title="At a glance">
          <ul>
            <li>No ads, ever, and we never sell or rent anyone’s information.</li>
            <li>We keep very little about a child: a first name or nickname, grade, an avatar, an optional birth year and practice results.</li>
            <li>Children never type free text, upload photos or record their voice, and can never buy anything.</li>
            <li>Everything travels over HTTPS, passwords and sign-in sessions are stored only as hashes, and card numbers never reach us.</li>
            <li>One family can never see another family’s children or progress.</li>
            <li>Parents can export or delete everything themselves, at any time.</li>
          </ul>
        </Section>

        <Section title="Your family’s information">
          <ul>
            <li>
              <strong>Collect less.</strong> The less we keep, the less there is to protect. See{" "}
              <Link href="/privacy/">what we collect</Link> in the privacy policy.
            </li>
            <li>
              <strong>Works without an account.</strong> The app saves progress on the device first. If you never sign in, nothing about your child leaves that device.
            </li>
            <li>
              <strong>Where it is stored.</strong> Our servers are in Montréal, Canada, and our database is in Virginia, United States. The providers listed in the privacy policy may also process limited information outside Canada.
            </li>
            <li>
              <strong>You stay in control.</strong> The Parent area lets you download all of your family’s data as a file, erase a device, delete a child or delete your account. Deleting removes your family’s data from our live systems straight away.
            </li>
            <li>
              <strong>Families in the United States</strong> give consent in the Parent area before any child’s information is synced to our servers (COPPA). Withdrawing consent deletes it.
            </li>
            <li>
              <strong>No tracking in the kids’ app.</strong> Our cookieless website analytics run on public pages only, never in the kids’ app, the Parent area, shared reports or account pages. There are no advertising cookies anywhere.
            </li>
          </ul>
        </Section>

        <Section title="Signing in">
          <ul>
            <li>Passwords are stored only as salted scrypt hashes, never in readable form.</li>
            <li>A sign-in is a long random token, stored on our side only as a hash, in a cookie scripts on the page can’t read and that is only ever sent over HTTPS.</li>
            <li>Repeated wrong passwords are slowed down per network and per email address.</li>
            <li>Password reset and email confirmation links are single use and expire. Changing or resetting a password signs out your other devices. “Forgot password” never says whether an account exists.</li>
            <li>The Parent area sits behind a PIN on each device, salted and hashed, and locks again every time the page reloads. Its “forgot PIN” question is one young children can’t answer.</li>
          </ul>
        </Section>

        <Section title="Keeping families and classes apart">
          <ul>
            <li>Every read and write is limited to the signed-in family. Each change is checked against the family on our server, not only in the app.</li>
            <li>
              A shared report link is a long random code, stored as a hash, that shows one child’s first name, grade and practice. It expires after 30 days, you can stop it at any time, it is never listed by search engines, and devices don’t keep a copy once it is stopped.
            </li>
            <li>Shared milestone cards never carry a child’s name.</li>
            <li>
              Teachers see only the classes they own or co-teach, and only first names, avatars, grade and results on the units they assigned. Student accounts a teacher creates have no email or password and can only practise. Removing a student or closing a class deletes the student accounts straight away, and classes with no sign-in for 12 months are deleted.
            </li>
          </ul>
        </Section>

        <Section title="Payments">
          <ul>
            <li>Payments go through Stripe. We never see or store a card number.</li>
            <li>Prices, plans and discounts are set on our server, so they can’t be changed from a browser.</li>
            <li>Messages from Stripe are checked against a secret signature, refused if they are more than 5 minutes old, and handled only once.</li>
            <li>The store apps sell nothing, and children can never make a purchase. Coins in the app are earned only by learning.</li>
          </ul>
        </Section>

        <Section title="The website and app">
          <ul>
            <li>HTTPS everywhere, with HSTS so browsers never fall back to an unencrypted connection.</li>
            <li>Our pages can’t be framed by another site, browsers aren’t allowed to guess file types, and other sites see as little as possible about where you came from.</li>
            <li>The camera, microphone, location and payment features of the browser are switched off for our pages. The app only uses speech output for read-aloud.</li>
            <li>Read-aloud voices run on the device. We host the voice files ourselves and check each one against a known fingerprint when we build the site.</li>
            <li>The kids’ app and Parent area load no scripts from other companies, and no ads or tracking code.</li>
            <li>Error reports (Sentry) are stripped of names, email addresses, cookies and anything typed or tapped before they leave the device or our server.</li>
            <li>The app works offline. If we have an outage, practice is saved on the device and synced later, so nothing is lost.</li>
          </ul>
        </Section>

        <Section title="Email">
          <ul>
            <li>Our email is signed (DKIM) and our domain publishes SPF and a DMARC policy that tells mail providers to quarantine mail that pretends to be from us.</li>
            <li>An email never carries more about a child than a first name and practice totals.</li>
            <li>Progress emails, reminders and news each have an unsubscribe link.</li>
          </ul>
        </Section>

        <Section title="AI">
          <ul>
            <li>
              When you write to us, we may ask Anthropic’s Claude to suggest a first draft of our reply. It sees only your message, never your account or your children’s information, and under Anthropic’s commercial terms it isn’t used to train models.
            </li>
            <li>A person reads, edits and sends every reply. Nothing is answered automatically.</li>
            <li>Children never talk to an AI in {APP_NAME}.</li>
          </ul>
        </Section>

        <Section title="Who can see what on our side">
          <ul>
            <li>Admin access is limited to a short list of named accounts set on the server. An account only counts as admin after its email is confirmed and it has signed in again, so nobody can claim it by signing up first.</li>
            <li>The admin panel never shows children’s names or results, and leaves class student accounts out. Downloads from it carry no children’s information.</li>
            <li>Every admin change is written to a log. Refunds, cancelling, deleting, group emails and maintenance mode each need a confirmation typed in full.</li>
          </ul>
        </Section>

        <Section title="How we build it">
          <ul>
            <li>Every change runs type checks, lint, thousands of unit tests, the production build, browser tests on phones and tablets, accessibility and keyboard checks, and a check of our dependencies against known vulnerabilities before it is merged.</li>
            <li>Dependencies are reviewed for updates every week, and installs come only from the official npm registry with a lockfile.</li>
            <li>We use mutation testing to check that the tests on scoring, sync, billing and sign-in really catch mistakes.</li>
            <li>We did a full security review in October 2026. Every high and medium issue it found was fixed and given a test.</li>
            <li>The app and its database are checked every 15 minutes, day and night, and a failure alerts us. You can see a live check on our <Link href="/status/">status page</Link>.</li>
          </ul>
        </Section>

        <Section title="In progress">
          <ul>
            {IN_PROGRESS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.text}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Report a security problem">
          <p>
            If you think you’ve found a security or privacy problem, please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. A person replies within {REPLY_TIME}. Our contact details for security reports are also at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
          </p>
          <p>If a breach puts your information at real risk of significant harm, we will tell you and the regulators the law requires, and we will tell a school promptly if its students are affected.</p>
          <p>
            Schools and districts can ask for our privacy impact assessment pack and data agreement, and read our <Link href="/accessibility/">accessibility statement</Link>.
          </p>
        </Section>
      </div>
    </article>
  );
}
