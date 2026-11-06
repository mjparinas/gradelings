"use client";

import { useEffect, useState } from "react";
import { inviteAdult, leaveFamily, loadAdults, removeAdultOrInvite, type FamilyAdults } from "@/lib/account";
import { useLocale } from "@/lib/say";
import { useStore } from "@/lib/store";
import { Panel } from "./common";

/**
 * Another grown-up on the family (a co-parent, grandparent or tutor): their own sign-in to the same children, reports and
 * settings. The owner invites and removes; billing, codes and deleting the family stay with the owner.
 */
export function AdultsPanel() {
  const locale = useLocale();
  const adult = useStore((s) => Boolean(s.family.account?.adult));
  const verified = useStore((s) => s.family.account?.verified !== false);
  const [data, setData] = useState<FamilyAdults | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!adult) void loadAdults().then(setData, () => setData(null));
  }, [adult]);

  const act = async (fn: () => Promise<FamilyAdults | void>, done: string) => {
    setError("");
    setMessage("");
    try {
      const next = await fn();
      if (next) setData(next);
      setMessage(done);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  if (adult) {
    return (
      <Panel title="👪 Family">
        <p className="mb-3 font-read text-ink-soft">You&apos;re signed in as another adult on this family. You can see and manage the children, reports and settings. The person who made the account manages the plan.</p>
        <button type="button" className="rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => void act(() => leaveFamily(), "")}>
          Leave this family
        </button>
        {error && <p className="mt-2 font-semibold text-nudge-dark">{error}</p>}
      </Panel>
    );
  }
  if (!data) return null;
  return (
    <Panel title="👪 Another adult">
      <p className="mb-3 font-read text-ink-soft">Invite a co-parent, grandparent or tutor to follow the same children with their own sign-in. They see first names, reports and settings, and can change them. Billing, codes and deleting the account stay with you.</p>
      {(data.adults.length > 0 || data.invites.length > 0) && (
        <ul className="mb-3 flex flex-col gap-1.5 text-sm">
          {data.adults.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2">
              <span>
                <b>{a.email}</b> · joined {new Date(a.since).toLocaleDateString(locale)}
              </span>
              <button type="button" className="font-semibold underline" onClick={() => void act(() => removeAdultOrInvite({ id: a.id }), "Removed.")}>
                Remove
              </button>
            </li>
          ))}
          {data.invites.map((i) => (
            <li key={i.email} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2">
              <span>
                <b>{i.email}</b> · invited, waiting
              </span>
              <button type="button" className="font-semibold underline" onClick={() => void act(() => removeAdultOrInvite({ email: i.email }), "Invitation cancelled.")}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
      {verified ? (
        <form
          className="flex max-w-md flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void act(async () => {
              const next = await inviteAdult(email);
              setEmail("");
              return next;
            }, "Invitation sent. The link works for 7 days.");
          }}
        >
          <input type="email" required autoComplete="off" placeholder="Their email address" aria-label="Their email address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2" />
          <button type="submit" className="self-start rounded-xl border border-line px-4 py-2 font-semibold">
            Send invitation
          </button>
        </form>
      ) : (
        <p className="text-sm text-ink-soft">Confirm your email first, then you can invite someone.</p>
      )}
      {message && <p className="mt-2 font-semibold">{message}</p>}
      {error && <p className="mt-2 font-semibold text-nudge-dark">{error}</p>}
    </Panel>
  );
}
