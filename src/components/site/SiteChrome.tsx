import Link from "next/link";
import type { ReactNode } from "react";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME, LEGAL_NAME, socialLinks, WORDMARK_COLOURS } from "@/lib/brand";
import { SUBSCRIBE_HREF, TRIAL_DAYS } from "@/lib/plan";
import { teacherPath, TEACHER_SIGNUP } from "./teachers";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";
import { HeaderSignIn } from "./HeaderSignIn";
import { NavLink } from "./NavLink";
import { PromoBanner } from "./PromoBanner";
import { RefCapture } from "./ShareButton";
import { byCountry, regionList } from "./provinces";
import { AppLink } from "./AppLink";

/**
 * `play` is the "Try it free" link for this page (`playHref`), so the app opens on what the visitor was reading.
 * `lead`: which button comes first (see `Lead`). A page that leads with the trial has no full-width Subscribe bar on phones.
 */
export function SiteHeader({ play = "/play/", lead = "subscribe" }: { play?: string; lead?: Lead }) {
  return (
    <header className="print:hidden sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <NavLink href="/" className="text-2xl font-bold tracking-tight" label={APP_NAME}>
          {APP_NAME.split("").map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
              {ch}
            </span>
          ))}
        </NavLink>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-semibold sm:gap-3 sm:text-base">
          <NavLink href="/curriculum/" className="hidden rounded-lg px-2 py-1 hover:bg-black/5 sm:inline">
            Curriculum
          </NavLink>
          <NavLink href="/report-cards/" className="hidden rounded-lg px-2 py-1 hover:bg-black/5 sm:inline">
            Report cards
          </NavLink>
          <AppLink href="/parents/" className="hidden rounded-lg px-2 py-1 hover:bg-black/5 sm:inline">
            Parents
          </AppLink>
          <NavLink href={teacherPath.hub()} className="hidden rounded-lg px-2 py-1 hover:bg-black/5 sm:inline">
            Teachers
          </NavLink>
          <NavLink href="/about/" className="hidden rounded-lg px-2 py-1 hover:bg-black/5 lg:inline">
            About
          </NavLink>
          <a href={SUBSCRIBE_HREF} className="hidden rounded-lg px-2 py-1 font-bold hover:bg-black/5 lg:inline">
            Subscribe
          </a>
          <HeaderSignIn />
          {/* The apps are big single-page bundles: fetch them on tap, not on every public page view. */}
          <AppLink href={play} className="btn btn-good h-11 px-4 text-base">
            Play free
          </AppLink>
        </nav>
      </div>
      {lead === "subscribe" && (
        <div className="border-t border-line px-4 py-2 lg:hidden">
          <a href={SUBSCRIBE_HREF} className="btn btn-good h-11 w-full text-base">
            Subscribe
          </a>
        </div>
      )}
    </header>
  );
}

/** One footer column: a heading and its links. `app` links open a big single-page app, so they are fetched on tap. */
function FooterColumn({ title, links }: { title: string; links: { label: string; href: string; app?: boolean }[] }) {
  return (
    <nav aria-label={title}>
      <p className="font-bold">{title}</p>
      <ul className="mt-2 space-y-1 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link prefetch={l.app ? false : undefined} className="text-ink-soft hover:underline" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Plain one-colour marks for the brand's social profiles (drawn here, so no icon library or third-party script). */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
      <path d="M10 9v6l5-3z" fill="white" />
    </>
  ),
  Pinterest: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3l.1.4-.3 1.1c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z"
    />
  ),
  Facebook: <path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />,
};

/** The brand's social profiles that exist (`SOCIAL_PROFILES`), as icon links. A platform shows up once its URL is listed. */
function SocialLinks() {
  const links = socialLinks();
  if (!links.length) return null;
  return (
    <ul className="mt-3 flex gap-1" aria-label={`${APP_NAME} on social media`}>
      {links.map((l) => (
        <li key={l.name}>
          <a
            href={l.href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${APP_NAME} on ${l.name}`}
            title={l.name}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-soft hover:bg-black/5 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              {SOCIAL_ICONS[l.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

// One link per section: each region's curriculum, report-card and guide pages are reached from these hubs, so the
// footer stays the same short list as provinces and states are added.
export function SiteFooter({ build }: { /** A build line such as "Build 3f9a1c2" (`buildLabel`), shown on the home page only. */ build?: string } = {}) {
  return (
    <footer className="print:hidden mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">{APP_NAME}</p>
          <p className="mt-1 font-read text-sm text-ink-soft">Curriculum-matched practice, games and progress reports for Kindergarten to Grade 9.</p>
          <SocialLinks />
        </div>
        <FooterColumn
          title="Explore"
          links={[
            { label: "Curriculum", href: "/curriculum/" },
            { label: "Report cards explained", href: "/report-cards/" },
            { label: "Parent guides", href: "/guides/" },
            { label: "Compare apps", href: "/compare/" },
            { label: "Pricing", href: "/pricing/" },
          ]}
        />
        <FooterColumn
          title="Use it"
          links={[
            { label: "Start learning", href: "/play/", app: true },
            { label: "Parent area", href: "/parents/", app: true },
            { label: "For teachers", href: teacherPath.hub() },
            { label: "Teacher sign in", href: TEACHER_SIGNUP, app: true },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { label: "About us", href: "/about/" },
            { label: "Help", href: "/help/" },
            { label: "Contact", href: "/contact/" },
            { label: "What’s new", href: "/whats-new/" },
            { label: "Status", href: "/status/" },
            { label: "Trust centre", href: "/trust/" },
            { label: "Privacy policy", href: "/privacy/" },
            { label: "Terms of use", href: "/terms/" },
            { label: "Accessibility", href: "/accessibility/" },
          ]}
        />
      </div>
      <p className="pb-8 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} {LEGAL_NAME}. Not affiliated with any ministry of education.
      </p>
      {build && <p className="-mt-6 pb-8 text-center font-mono text-xs text-ink-soft">{build}</p>}
    </footer>
  );
}

/**
 * The closing call to action for public pages that bring in search visitors. Every page that
 * explains the curriculum or a guide ends with it (`<SitePage cta>`), so a parent who has read
 * enough always has a button to start practising.
 */
export function PageCta({ play, lead = "subscribe" }: { play?: string; lead?: Lead }) {
  // Every region by name, Canadian provinces and territories first, then US states.
  const provinces = byCountry(FRAMEWORKS)
    .map((g) => regionList(g.frameworks))
    .join(", and in ");
  return (
    <section aria-labelledby="page-cta" className="card mt-10 flex flex-col gap-3 p-6">
      <h2 id="page-cta" className="text-2xl font-bold">
        Ready to try {APP_NAME}?
      </h2>
      <p className="font-read text-ink-soft">
        Curriculum-matched practice for Kindergarten to Grade 9 in {provinces}, with kind hints, learning games and no ads. {lead === "trial" ? `Try everything free for ${TRIAL_DAYS} days with no card, then subscribe if it helps.` : `Subscribe now, or try everything free for ${TRIAL_DAYS} days with no card.`}
      </p>
      <div className="flex flex-wrap gap-3">
        <SubscribeActions play={play} lead={lead} />
        <Link href="/pricing/" className="btn min-h-14 px-6 text-lg">
          See pricing
        </Link>
      </div>
    </section>
  );
}

/**
 * Which button a page puts first. Subscribe leads where people come to look at buying (home, pricing, about).
 * Pages people find from a search (curriculum, guides, worksheets, report cards) lead with the free trial: a
 * stranger from Google tries before paying (October 2026: 7 Subscribe clicks against about 45 trial clicks there).
 */
export type Lead = "subscribe" | "trial";

/** Subscribe and the free trial, `lead` first and green. */
export function SubscribeActions({
  size = "lg",
  trialLabel = "Try it free",
  className = "",
  play = "/play/",
  lead = "subscribe",
}: {
  size?: "md" | "lg";
  trialLabel?: string;
  className?: string;
  /** The trial link (`playHref`). */
  play?: string;
  lead?: Lead;
}) {
  const cls = size === "lg" ? "min-h-14 px-8 text-xl" : "min-h-12 px-6 text-lg";
  const subscribe = (
    <a key="subscribe" href={SUBSCRIBE_HREF} className={`btn ${lead === "subscribe" ? "btn-good" : ""} ${cls} ${className}`}>
      Subscribe
    </a>
  );
  const trial = (
    <Link key="trial" prefetch={false} href={play} className={`btn ${lead === "trial" ? "btn-good" : ""} ${cls} ${className}`}>
      {trialLabel}
    </Link>
  );
  return <>{lead === "trial" ? [trial, subscribe] : [subscribe, trial]}</>;
}

export function SitePage({
  children,
  cta = false,
  play,
  lead,
  build,
}: {
  children: ReactNode;
  /** Ends the page with the call to action. */
  cta?: boolean;
  /** Which button leads on this page (`Lead`); Subscribe unless said. */
  lead?: Lead;
  /** Where this page's "Try it free" buttons open the app (`playHref`): the page's province or state, grade and unit. */
  play?: string;
  /** A build line for the footer (`buildLabel`); the home page passes it. */
  build?: string;
}) {
  return (
    <>
      <RefCapture />
      {/* First, so it is the first thing a keyboard reaches; outside the header, whose blur would anchor it. */}
      <SkipLink />
      <PromoBanner />
      <SiteHeader play={play} lead={lead} />
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8">
        {children}
        {cta && <PageCta play={play} lead={lead} />}
      </main>
      <SiteFooter build={build} />
    </>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-soft">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
