"use client";

import { dismissStorageFull, useStorageFull } from "@/lib/storageFull";

/**
 * Shown once when the device has no room left to save progress. It is written for the grown-up, and the
 * child can close it too. Only the card takes taps; the rest of the screen stays usable.
 */
export function StorageFullNotice() {
  const full = useStorageFull();
  if (!full) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex justify-center px-3" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
      <div role="alert" className="pointer-events-auto w-full max-w-md rounded-2xl bg-[#fff4d6] px-4 py-3 text-left text-[#3b2a00] shadow-2xl ring-1 ring-[#e0b84a]">
        <p className="text-base font-bold">This device is out of space</p>
        <p className="mt-1 text-sm">
          Gradelings can&rsquo;t save progress right now, so this visit may be lost when the app closes. Please ask a grown-up to free up room by removing apps, photos or files you don&rsquo;t use.
        </p>
        <button type="button" onClick={dismissStorageFull} className="mt-2 min-h-12 rounded-xl bg-[#3b2a00] px-4 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b2a00]">
          Got it
        </button>
      </div>
    </div>
  );
}
