import Link from "next/link";
import { APP_NAME, CONTACT_EMAIL, REPLY_TIME } from "@/lib/brand";

// The public trust centre (/trust/): one short line per control, each with a shield. Every "live" line must be true
// of what is deployed on gradelings.com; work still in review is "progress" until it ships. Keep it consistent with
// /privacy/ (providers, where data is stored) and /accessibility/.

/** The day this page's claims were last checked against the code. */
export const TRUST_UPDATED = "October 14, 2026";

export type Control = { title: string; note: string; status?: "live" | "progress" };

export const TRUST_GROUPS: { title: string; controls: Control[] }[] = [
  {
    title: "Privacy",
    controls: [
      { title: "No ads, no data sales", note: "Never, for anyone." },
      { title: "Minimal child data", note: "First name, grade, avatar and practice only." },
      { title: "No free text, photos or voice", note: "Children can’t share anything about themselves." },
      { title: "Export or delete anytime", note: "From the Parent area, in a few taps." },
      { title: "Parental consent (COPPA)", note: "US children sync only after a parent agrees." },
      { title: "Where data lives", note: "Servers and database in Virginia, US." },
    ],
  },
  {
    title: "Accounts",
    controls: [
      { title: "Hashed passwords", note: "Salted scrypt, never stored readable." },
      { title: "Secure sessions", note: "Random tokens, hashed, in HTTPS-only cookies." },
      { title: "Sign-in rate limits", note: "Repeated wrong passwords are slowed down." },
      { title: "Parent PIN", note: "Keeps children out of the Parent area." },
      { title: "Family isolation", note: "No family can see another’s children or progress." },
      { title: "Classroom limits", note: "Teachers see only their own classes." },
    ],
  },
  {
    title: "Payments",
    controls: [
      { title: "Stripe checkout", note: "We never see or store card numbers." },
      { title: "Signed webhooks", note: "Payment events are verified before we act." },
      { title: "No purchases by children", note: "Coins are earned only by learning." },
    ],
  },
  {
    title: "Infrastructure",
    controls: [
      { title: "HTTPS everywhere", note: "With HSTS, so connections are always encrypted." },
      { title: "Security headers", note: "No framing, no sniffing, camera and mic off." },
      { title: "No third-party scripts in the app", note: "No ads or trackers for kids." },
      { title: "Strict script policy", note: "Each page runs only the scripts it lists." },
      { title: "Scrubbed error reports", note: "Names, emails and cookies removed first." },
      { title: "Uptime monitoring", note: "Checked every 5 minutes from outside, with alerts." },
    ],
  },
  {
    title: "Email and AI",
    controls: [
      { title: "SPF, DKIM and DMARC", note: "Spoofed mail from our domain is quarantined." },
      { title: "AI drafts, human replies", note: "A person sends every reply; kids never talk to AI." },
    ],
  },
  {
    title: "Operations",
    controls: [
      { title: "Locked-down admin access", note: "Named, confirmed accounts only, every change logged." },
      { title: "No child data for staff", note: "The admin panel never shows names or results." },
      { title: "Tested on every change", note: "Thousands of tests plus a dependency audit." },
      { title: "Security review", note: "October 2026; every high and medium issue fixed." },
    ],
  },
];

function Shield({ status }: { status: "live" | "progress" }) {
  const live = status === "live";
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-6 w-6 shrink-0 ${live ? "text-good-dark" : "text-nudge-dark"}`}>
      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
      {live ? (
        <path fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="m8.5 12 2.4 2.4 4.6-4.8" />
      ) : (
        <path fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" d="M12 7.5V12l2.5 2" />
      )}
    </svg>
  );
}

function ControlRow({ control }: { control: Control }) {
  const status = control.status ?? "live";
  return (
    <li className="flex items-start gap-3 py-2.5">
      <Shield status={status} />
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug">
          {control.title}
          {status === "progress" && <span className="ml-2 rounded-full bg-nudge-soft px-2 py-0.5 align-middle text-xs font-bold text-nudge-dark">In progress</span>}
        </p>
        <p className="font-read text-sm text-ink-soft">{control.note}</p>
      </div>
    </li>
  );
}

export function TrustCentre() {
  return (
    <article className="mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold">Trust centre</h1>
      <p className="mt-1 text-sm text-ink-soft">Last checked {TRUST_UPDATED}</p>
      <p className="mt-3 max-w-2xl font-read text-lg">
        How {APP_NAME} keeps families, children and classes safe. Details are in our{" "}
        <Link className="text-[#2f6fd6] underline" href="/privacy/">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TRUST_GROUPS.map((group) => (
          <section key={group.title} className="rounded-2xl border border-line bg-white p-4">
            <h2 className="text-xl font-bold">{group.title}</h2>
            <ul className="mt-1 divide-y divide-line">
              {group.controls.map((c) => (
                <ControlRow key={c.title} control={c} />
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold">Report a security problem</h2>
        <p className="mt-1 font-read">
          Email <a className="text-[#2f6fd6] underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. A person replies within {REPLY_TIME}. See also{" "}
          <a className="text-[#2f6fd6] underline" href="/.well-known/security.txt">security.txt</a> and our{" "}
          <Link className="text-[#2f6fd6] underline" href="/status/">status page</Link>.
        </p>
      </section>
    </article>
  );
}
