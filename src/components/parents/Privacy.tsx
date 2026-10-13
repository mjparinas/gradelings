"use client";

import { countryOf } from "@/lib/country";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { withdrawConsent } from "@/lib/account";
import { APP_NAME } from "@/lib/brand";
import { useStore } from "@/lib/store";
import { Dialog } from "../ui";
import { Panel } from "./common";

/** What we store, export and erase-this-device, on the Account page. */
export function PrivacyPanels() {
  const [confirm, setConfirm] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const wipe = useStore((s) => s.wipeDevice);
  const family = useStore((s) => s.family);
  const usConsent = countryOf(family).parentalConsent && Boolean(family.consentAt) && Boolean(family.account) && !family.account?.student;
  const router = useRouter();

  const exportData = () => {
    const s = useStore.getState();
    const data = {
      exportedAt: new Date().toISOString(),
      app: APP_NAME,
      family: { country: s.family.country ?? "CA", consentAt: s.family.consentAt ? new Date(s.family.consentAt).toISOString() : null },
      profiles: s.profiles,
      settings: s.settings,
      events: s.events,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${APP_NAME.toLowerCase()}-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Panel title="🔐 What we store">
        <ul className="flex list-disc flex-col gap-2 pl-5 font-read text-ink-soft">
          <li>A first name (or nickname), grade, optional birth year and avatar for each child.</li>
          <li>Practice results: which unit, right or wrong, and how long it took. No free text, photos or voice recordings.</li>
          <li>Your email and a securely hashed password if you create an account.</li>
          <li>No ads, and we never sell data.</li>
        </ul>
      </Panel>
      <Panel title="Your data, your choice">
        <div className="flex flex-col gap-3">
          <button type="button" className="rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a]" onClick={exportData}>
            ⬇️ Download all data (JSON)
          </button>
          <button type="button" className="rounded-xl border border-[#e57a12] px-4 py-2.5 font-semibold text-nudge-dark" onClick={() => setConfirm(true)}>
            Erase everything on this device
          </button>
          <p className="text-sm text-ink-soft">If you have an account, “Delete account” on this page removes data on our servers too.</p>
        </div>
      </Panel>
      {usConsent && (
        <Panel title="Your permission (United States)">
          <p className="font-read text-ink-soft">
            You gave permission on {new Date(family.consentAt!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} for us to keep your children’s information so it syncs. You can withdraw it at any time: we delete your children’s information from our servers and stop syncing it. This device keeps its copy.
          </p>
          <button type="button" className="mt-3 rounded-xl border border-[#e57a12] px-4 py-2.5 font-semibold text-nudge-dark" onClick={() => setWithdraw(true)}>
            Withdraw permission
          </button>
        </Panel>
      )}
      <Dialog open={withdraw} title="Withdraw your permission?" onClose={() => setWithdraw(false)}>
        <p className="mb-4 font-read text-ink-soft">We’ll delete your children’s profiles and progress from our servers straight away, and stop syncing them. Your account and plan stay.</p>
        {withdrawError && (
          <p role="alert" className="mb-3 font-semibold text-nudge-dark">
            {withdrawError}
          </p>
        )}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-nudge min-h-14 text-xl"
            onClick={() =>
              void withdrawConsent().then(
                () => setWithdraw(false),
                (e: Error) => setWithdrawError(e.message),
              )
            }
          >
            Yes, withdraw
          </button>
          <button type="button" className="btn min-h-14 text-xl" onClick={() => setWithdraw(false)}>
            Cancel
          </button>
        </div>
      </Dialog>
      <Dialog open={confirm} title="Erase this device?" onClose={() => setConfirm(false)}>
        <p className="mb-4 font-read text-ink-soft">Removes every child, all progress and settings from this device. If you&apos;re signed in, your account keeps a copy.</p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-nudge min-h-14 text-xl"
            onClick={() =>
              void wipe().then(() => router.push("/play/"))
            }
          >
            Yes, erase
          </button>
          <button type="button" className="btn min-h-14 text-xl" onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </div>
      </Dialog>
    </>
  );
}
