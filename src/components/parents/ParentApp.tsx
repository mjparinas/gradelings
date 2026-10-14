"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { APP_NAME } from "@/lib/brand";
import { refreshAccount, type BillingInfo } from "@/lib/account";
import { takeBillingPass } from "@/lib/billingReturn";
import { hasPaidPlan, isPremium, trialDaysLeft } from "@/lib/plan";
import { useRoute } from "@/lib/router";
import { useProfiles, useReady, useStore } from "@/lib/store";
import { VoicePreload } from "@/components/VoicePreload";
import { startBackgroundSync, syncNow } from "@/lib/sync";
import { isStoreApp } from "@/lib/twa";
import { ContentGate } from "../ContentGate";
import { LoadingScreen } from "../ui";
import { AccountPage } from "./Account";
import { ChildrenPage } from "./Children";
import { Gate } from "./Gate";
import { Overview } from "./Overview";
import { PlacementPage } from "./Placement";
import { ReportCardsPage } from "./ReportCards";
import { ReportsPage } from "./Reports";
import { SettingsPage } from "./Settings";
import { SubscriptionPage } from "./Subscription";
import { UpgradeBanner } from "./UpgradeBanner";
import { UsConsent } from "./UsConsent";
import { ReportTabs } from "./common";
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
const NAV_PARENT: Record<string, string> = { placement: "reports", "report-cards": "reports", privacy: "account" };

const noSubscribe = () => () => {};

function SyncBadge() {
  const sync = useStore((s) => s.sync);
  const account = useStore((s) => s.family.account);
  const text = !account
    ? "Saved on this device"
    : sync.status === "syncing"
      ? "Syncing…"
      : sync.status === "offline"
        ? "Offline · will sync later"
        : sync.status === "error"
          ? "Sync problem · retrying"
          : sync.lastSyncAt
            ? `Synced ${new Date(sync.lastSyncAt).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" })}`
            : "Ready to sync";
  return (
    <button type="button" onClick={() => void syncNow()} className="rounded-full bg-black/5 px-3 py-1 text-sm font-semibold text-ink-soft" title="Sync now">
      {account ? "☁️" : "💾"} {text}
    </button>
  );
}

function Shell({ children, active }: { children: ReactNode; active: string }) {
  const family = useStore((s) => s.family);
  const premium = isPremium(family);
  const paid = hasPaidPlan(family);
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const days = trialDaysLeft(family);
  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/play/" className="rounded-xl bg-[#4f8ef7] px-3 py-2 text-sm font-bold text-[#0f172a]">
              ← Kids&apos; area
            </Link>
            <span className="text-lg font-bold">
              {APP_NAME} <span className="font-semibold text-ink-soft">for parents</span>
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
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-6xl px-4 py-6" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
        <UsConsent />
        <UpgradeBanner />
        {children}
      </main>
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

export function ParentApp() {
  const ready = useReady();
  // Back from Stripe straight after typing the PIN: don't ask for it again (src/lib/billingReturn.ts).
  const [unlocked, setUnlocked] = useState(() => typeof window !== "undefined" && takeBillingPass(window.location.hash));
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const { path } = useRoute();
  const profiles = useProfiles();
  const isStudent = useStore((s) => Boolean(s.family.account?.student));

  useEffect(() => {
    if (ready) return;
    void useStore
      .getState()
      .init()
      .then(() => {
        startBackgroundSync();
        if (useStore.getState().family.account) void refreshAccount().then(setBilling);
      });
  }, [ready]);

  if (!ready) return <LoadingScreen />;
  if (isStudent) return <ClassAccountNotice />;
  if (!unlocked) return <Gate onPass={() => setUnlocked(true)} />;

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
    case "children":
      page = <ChildrenPage />;
      break;
    case "settings":
      page = <SettingsPage childId={path[1]} />;
      break;
    case "subscription":
      page = <SubscriptionPage billing={billing} onBilling={setBilling} />;
      break;
    case "account":
    case "privacy":
      page = <AccountPage onBilling={setBilling} />;
      break;
    default:
      page = <Overview />;
  }
  const tab = NAV_PARENT[section] ?? section;
  if (tab === "reports") {
    page = (
      <>
        <ReportTabs current={section} childId={path[1]} />
        {page}
      </>
    );
  }
  // Reports need each child's lessons; settings and billing still work if a download fails.
  return (
    <ContentGate targets={profiles.map((p) => ({ grade: p.grade, framework: p.framework }))} optional>
      <VoicePreload />
      <Shell active={tab}>{page}</Shell>
    </ContentGate>
  );
}
