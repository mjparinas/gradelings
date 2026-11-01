"use client";

import Link from "next/link";
import { memo, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { finishGoogleSignIn, refreshAccount, type BillingInfo } from "@/lib/account";
import { takeBillingPass } from "@/lib/billingReturn";
import { hasPaidPlan, isPremium, trialDaysLeft } from "@/lib/plan";
import { go, parse, ShownRoute, useRoute, useShownHash } from "@/lib/router";
import { useLocale } from "@/lib/say";
import { useProfiles, useReady, useStore } from "@/lib/store";
import { useFlag } from "@/lib/remoteFlags";
import { practiceTargets } from "@/lib/subjectGrades";
import { VoicePreload } from "@/components/VoicePreload";
import { startBackgroundSync, syncNow } from "@/lib/sync";
import { isStoreApp } from "@/lib/twa";
import { ContentGate } from "../ContentGate";
import { LoadingScreen } from "../ui";
import { RouteProgress } from "../RouteProgress";
import { AccountPage, AuthForm } from "./Account";
import { ChildrenPage } from "./Children";
import { Gate } from "./Gate";
import { Overview } from "./Overview";
import { PlacementPage } from "./Placement";
import { ReportCardsPage } from "./ReportCards";
import { YearReviewPage } from "./YearReview";
import { PracticeSheetPage } from "./PracticeSheet";
import { HoursLogPage, PortfolioPage } from "./Homeschool";
import { ReportsPage } from "./Reports";
import { SettingsPage } from "./Settings";
import { SubscriptionPage } from "./Subscription";
import { UpgradeBanner } from "./UpgradeBanner";
import { UsConsent } from "./UsConsent";
import { ReportTabs } from "./common";
import { FeedbackLink } from "@/components/FeedbackLink";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";

const NAV = [
  { path: "", label: "Overview", icon: "🏠" },
  { path: "subscription", label: "Subscription", icon: "⭐" },
  { path: "reports", label: "Reports", icon: "📈" },
  { path: "children", label: "Children", icon: "🧒" },
  { path: "settings", label: "Settings", icon: "⚙️" },
  { path: "account", label: "Account", icon: "☁️" },
];

/** Older links still open: Placement and Report cards live under Reports, Privacy under Account. */
const NAV_PARENT: Record<string, string> = { placement: "reports", "report-cards": "reports", year: "reports", sheet: "reports", hours: "reports", portfolio: "reports", privacy: "account" };

const noSubscribe = () => () => {};

function SyncBadge() {
  const sync = useStore((s) => s.sync);
  const account = useStore((s) => s.family.account);
  const locale = useLocale();
  const text = !account
    ? "Saved on this device"
    : sync.status === "syncing"
      ? "Syncing…"
      : sync.status === "offline"
        ? "Offline · will sync later"
        : sync.status === "error"
          ? "Sync problem · retrying"
          : sync.lastSyncAt
            ? `Synced ${new Date(sync.lastSyncAt).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}`
            : "Ready to sync";
  return (
    <button type="button" onClick={() => void syncNow()} className="rounded-full bg-black/5 px-3 py-1 text-sm font-semibold text-ink-soft" title="Sync now">
      {account ? "☁️" : "💾"} {text}
    </button>
  );
}

function Shell({ children, active, pending }: { children: ReactNode; active: string; pending: boolean }) {
  const family = useStore((s) => s.family);
  const premium = isPremium(family);
  const paid = hasPaidPlan(family);
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const days = trialDaysLeft(family);
  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="sticky top-0 z-30 border-b print:hidden border-line bg-white/90 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/play/" className="rounded-xl bg-[#4f8ef7] px-3 py-2 text-sm font-bold text-[#0f172a]">
              ← Kids&apos; area
            </Link>
            <span className="text-lg font-bold">
              <span data-testid="wordmark">
                <span className="sr-only">{APP_NAME}</span>
                {APP_NAME.split("").map((ch, i) => (
                  <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
                    {ch}
                  </span>
                ))}
              </span>{" "}
              <span className="font-semibold text-ink-soft">for parents</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SyncBadge />
            {paid ? (
              <span className="rounded-full bg-good-soft px-3 py-1 text-sm font-semibold text-good-dark">⭐ Premium</span>
            ) : inStoreApp ? null : (
              <a href="#/subscription" className="inline-flex min-h-11 items-center rounded-full bg-[#25b47e] px-3 text-sm font-bold text-[#0f172a]">
                {premium ? `Subscribe · ${days} ${days === 1 ? "day" : "days"} left` : "Subscribe"}
              </a>
            )}
          </div>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-2" aria-label="Parent sections">
          <ul className="flex gap-1 pb-2">
            {NAV.map((n) => {
              const subscribe = n.path === "subscription" && !paid && !inStoreApp;
              const label = subscribe ? "Subscribe" : n.label;
              return (
                <li key={n.path}>
                  <a
                    href={`#/${n.path}`}
                    aria-current={active === n.path ? "page" : undefined}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap ${
                      active === n.path ? "bg-[#253047] text-white" : subscribe ? "bg-good-soft text-[#0f172a]" : "text-ink-soft hover:bg-black/5"
                    }`}
                  >
                    <span aria-hidden="true">{n.icon}</span> {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <RouteProgress pending={pending} />
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-6xl px-4 py-6" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
        {/* Printed pages (sheets, reports) are the page alone, without the header or the plan banner. */}
        <div className="print:hidden">
          <UsConsent />
          <UpgradeBanner />
        </div>
        {children}
      </main>
      <div className="print:hidden">
        <FeedbackLink audience="parent" signedIn={Boolean(family.account)} />
      </div>
    </div>
  );
}

/** A class account has no parent area: the school manages it, and billing never applies. */
function ClassAccountNotice() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">This is a class account</h1>
      <p className="font-read text-lg text-ink-soft">
        Your teacher set this up, so there is no grown-ups area here. Ask your teacher for anything you need. A family can also make its own free account to see progress at home.
      </p>
      <a href="/play/" className="btn btn-good min-h-14 px-6 text-xl">
        Back to learning
      </a>
    </div>
  );
}

/** The sign-in form on its own, for a device that has no parent PIN yet. */
function SignInOnly() {
  return (
    <main id={MAIN_ID} tabIndex={-1} className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 py-6">
      <div>
        <a href="/play/" className="btn h-12 px-4 text-base">
          ← Back
        </a>
      </div>
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="font-read text-ink-soft">Sign in to get your children and their progress on this device.</p>
      <AuthForm initialMode="signin" onDone={() => { void refreshAccount(); go("/"); }} />
    </main>
  );
}

/** The page for a section. Memoised, so the old page isn't drawn again while the next one is on its way. */
const Section = memo(function Section({ hash, billing, onBilling }: { hash: string; billing: BillingInfo | null; onBilling: (b: BillingInfo | null) => void }) {
  const { path } = parse(hash);
  const section = path[0] ?? "";
  let page: ReactNode;
  switch (section) {
    case "reports":
      page = <ReportsPage childId={path[1]} />;
      break;
    case "placement":
      page = <PlacementPage childId={path[1]} />;
      break;
    case "report-cards":
      page = <ReportCardsPage childId={path[1]} />;
      break;
    case "year":
      page = <YearReviewPage childId={path[1]} />;
      break;
    case "sheet":
      page = <PracticeSheetPage childId={path[1]} />;
      break;
    case "hours":
      page = <HoursLogPage childId={path[1]} />;
      break;
    case "portfolio":
      page = <PortfolioPage childId={path[1]} />;
      break;
    case "children":
      page = <ChildrenPage />;
      break;
    case "settings":
      page = <SettingsPage childId={path[1]} />;
      break;
    case "subscription":
      page = <SubscriptionPage billing={billing} onBilling={onBilling} />;
      break;
    case "account":
    case "privacy":
      page = <AccountPage onBilling={onBilling} />;
      break;
    default:
      page = <Overview />;
  }
  if ((NAV_PARENT[section] ?? section) === "reports") {
    page = (
      <>
        <ReportTabs current={section} childId={path[1]} />
        {page}
      </>
    );
  }
  return page;
});

export function ParentApp() {
  const ready = useReady();
  // Back from Stripe straight after typing the PIN: don't ask for it again (src/lib/billingReturn.ts).
  const [unlocked, setUnlocked] = useState(() => typeof window !== "undefined" && takeBillingPass(window.location.hash));
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const { path, query } = useRoute();
  const { shown, pending } = useShownHash();
  const profiles = useProfiles();
  const childSettings = useStore((s) => s.settings);
  const levels = useFlag("subject-levels");
  const hasPin = useStore((s) => Boolean(s.pin));
  const signedIn = useStore((s) => Boolean(s.family.account));
  const isStudent = useStore((s) => Boolean(s.family.account?.student));

  useEffect(() => {
    if (ready) return;
    void useStore
      .getState()
      .init()
      .then(() => {
        startBackgroundSync();
        // Back from Google or an emailed sign-in link: the server has signed this browser in, so take the account (and its history) from it.
        const url = new URL(window.location.href);
        if (url.searchParams.get("google") === "1" || url.searchParams.get("signedin") === "1") {
          url.searchParams.delete("google");
          url.searchParams.delete("signedin");
          window.history.replaceState(null, "", url.pathname + url.search + url.hash);
          void finishGoogleSignIn().then(setBilling);
        } else if (useStore.getState().family.account) void refreshAccount().then(setBilling);
      });
  }, [ready]);

  if (!ready) return <LoadingScreen />;
  if (isStudent) return <ClassAccountNotice />;
  // No PIN has been made on this device yet, so there is nothing to unlock: a returning parent's "Sign in" link goes
  // straight to the form instead of asking them to invent a PIN first. Signing in then leads to the PIN screen as usual.
  if (!unlocked && !hasPin && !signedIn && path[0] === "account" && query.get("mode") === "signin") return <SignInOnly />;
  if (!unlocked) return <Gate onPass={() => setUnlocked(true)} />;

  // The tab lights up at once; its page is drawn in the background while the old one stays up (useShownHash).
  const tab = NAV_PARENT[path[0] ?? ""] ?? path[0] ?? "";
  // Reports need each child's lessons; settings and billing still work if a download fails.
  return (
    <ContentGate targets={profiles.flatMap((p) => (levels ? practiceTargets(p, childSettings[p.id]) : [{ grade: p.grade, framework: p.framework }]))} optional>
      <VoicePreload />
      <Shell active={tab} pending={pending}>
        <ShownRoute value={shown}>
          <Section hash={shown} billing={billing} onBilling={setBilling} />
        </ShownRoute>
      </Shell>
    </ContentGate>
  );
}
