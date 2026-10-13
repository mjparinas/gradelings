"use client";

import { useCallback, useEffect, useState } from "react";
import { CANCEL_CONFIRM, REFUND_CONFIRM } from "@/lib/adminBilling";
import { call } from "@/lib/classroom";
import { Badge, formatDay, Notice } from "./Engage";
import { Bars } from "./Skeleton";

// A family's billing on its admin page: payments with refunds, the live subscription with cancel and resume,
// and the "please update your card" email when a payment failed. Refunding and cancelling now need a word typed.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";

interface Payment {
  id: string;
  amount: number;
  refunded: number;
  currency: string;
  interval: string | null;
  paidAt: number;
}
interface Subscription {
  id: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: number | null;
}
interface BillingData {
  stripe: boolean;
  customer: string | null;
  payments: Payment[];
  subscriptions: Subscription[];
  stripeError: string | null;
}

const money = (cents: number, currency: string) => `$${(cents / 100).toFixed(2)} ${currency}`;

/** Dollars typed in the refund box, as cents; null when it isn't an amount. */
export function parseCents(text: string): number | null {
  const m = text.trim().replace(/^\$/, "").match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? "").padEnd(2, "0"));
}

function RefundRow({ p, familyId, onDone }: { p: Payment; familyId: string; onDone: () => void }) {
  const left = p.amount - p.refunded;
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState((left / 100).toFixed(2));
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const cents = parseCents(amount);
  const refund = async () => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/billing/", "POST", { familyId, action: "refund", paymentId: p.id, amount: cents, confirm });
      setMsg({ ok: `Refunded ${money(cents ?? 0, p.currency)}.` });
      setOpen(false);
      setConfirm("");
      onDone();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <li className="border-t border-line py-2 first:border-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p>
          <span className="font-semibold">{money(p.amount, p.currency)}</span> on {formatDay(p.paidAt)}
          {p.interval ? ` (${p.interval === "year" ? "yearly" : "monthly"})` : ""}
          {p.refunded > 0 && (
            <>
              {" "}
              <Badge tone="bad">{p.refunded >= p.amount ? "Refunded" : `${money(p.refunded, p.currency)} refunded`}</Badge>
            </>
          )}
        </p>
        {left > 0 && (
          <button type="button" className={quiet} aria-expanded={open} onClick={() => setOpen(!open)}>
            Refund
          </button>
        )}
      </div>
      {open && (
        <div className="mt-2 flex flex-wrap items-end gap-2 rounded-xl bg-[#f1f5f9] p-3">
          <label className="flex flex-col text-sm font-semibold">
            Amount ({p.currency})
            <input className={`${field} w-32`} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label className="flex flex-col text-sm font-semibold">
            Type {REFUND_CONFIRM} to confirm
            <input className={`${field} w-40 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button type="button" className={danger} disabled={busy || confirm !== REFUND_CONFIRM || !cents || cents > left} onClick={() => void refund()}>
            {busy ? "Refunding…" : "Refund now"}
          </button>
          <p className="w-full text-sm text-ink-soft">The money goes back to their card through Stripe. A refund can&apos;t be undone. Up to {money(left, p.currency)} is left to refund.</p>
        </div>
      )}
      <Notice {...msg} />
    </li>
  );
}

function SubscriptionRow({ s, familyId, onDone }: { s: Subscription; familyId: string; onDone: () => void }) {
  const [confirm, setConfirm] = useState("");
  const [askNow, setAskNow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const act = async (action: string, ok: string, extra: Record<string, unknown> = {}) => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/billing/", "POST", { familyId, action, subscriptionId: s.id, ...extra });
      setMsg({ ok });
      onDone();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <li className="border-t border-line py-2 first:border-0">
      <p>
        <Badge tone={s.status === "past_due" ? "bad" : s.status === "active" ? "good" : "plain"}>{s.status === "past_due" ? "Payment failed" : s.status}</Badge>{" "}
        {s.cancelAtPeriodEnd ? `Cancels on ${formatDay(s.currentPeriodEnd)}` : s.currentPeriodEnd ? `Renews on ${formatDay(s.currentPeriodEnd)}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {s.cancelAtPeriodEnd ? (
          <button type="button" className={quiet} disabled={busy} onClick={() => void act("resume", "The subscription will renew again.")}>
            Undo the cancellation
          </button>
        ) : (
          <button type="button" className={quiet} disabled={busy} onClick={() => void act("cancel-at-end", "It will end at the end of the paid period.")}>
            Cancel at the end of the period
          </button>
        )}
        <button type="button" className={danger} aria-expanded={askNow} onClick={() => setAskNow(!askNow)}>
          Cancel now
        </button>
      </div>
      {askNow && (
        <div className="mt-2 flex flex-wrap items-end gap-2 rounded-xl bg-[#f1f5f9] p-3">
          <label className="flex flex-col text-sm font-semibold">
            Type {CANCEL_CONFIRM} to confirm
            <input className={`${field} w-40 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button type="button" className={danger} disabled={busy || confirm !== CANCEL_CONFIRM} onClick={() => void act("cancel-now", "Cancelled now.", { confirm })}>
            End it now
          </button>
          <p className="w-full text-sm text-ink-soft">Ends the plan today with no refund for the rest of the period (refund a payment above if you want to).</p>
        </div>
      )}
      <Notice {...msg} />
    </li>
  );
}

export function FamilyBilling({ familyId, pastDue }: { familyId: string; pastDue: boolean }) {
  const [d, setD] = useState<BillingData | null>(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const [busy, setBusy] = useState(false);
  const load = useCallback(() => {
    call<BillingData>(`/api/admin/billing/?familyId=${encodeURIComponent(familyId)}`).then(setD, (e: Error) => setErr(e.message));
  }, [familyId]);
  useEffect(load, [load]);
  const cardEmail = async () => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/billing/", "POST", { familyId, action: "card-email" });
      setMsg({ ok: "Email sent with a link to update their card." });
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={card}>
      <h3 className="text-xl font-bold">Billing</h3>
      <Notice err={err} />
      {pastDue && (
        <div className="mt-2 rounded-xl bg-[#fdeee2] p-3">
          <p className="font-semibold text-[#8a3b00]">Their last payment failed.</p>
          <p className="text-sm">Send them a short email with a link to update their card. It&apos;s a billing notice, so it goes even if they turned off news and tips.</p>
          <button type="button" className={`${primary} mt-2`} disabled={busy} onClick={() => void cardEmail()}>
            Email them to update their card
          </button>
          <Notice {...msg} />
        </div>
      )}
      {!d ? (
        !err && (
          <div aria-busy="true" className="mt-2">
            <p className="sr-only">Loading…</p>
            <Bars widths={["w-1/3", "w-2/3", "w-1/2"]} />
          </div>
        )
      ) : (
        <>
          {!d.stripe && <p className="mt-1 text-sm text-ink-soft">Stripe isn&apos;t set up, so refunds and cancelling are off.</p>}
          {d.stripeError && <Notice err={`Couldn't read the subscription from Stripe: ${d.stripeError}`} />}
          {d.subscriptions.length > 0 && (
            <>
              <h4 className="mt-3 font-bold">Subscription</h4>
              <ul>
                {d.subscriptions.map((s) => (
                  <SubscriptionRow key={`${s.id}:${s.cancelAtPeriodEnd}`} s={s} familyId={familyId} onDone={load} />
                ))}
              </ul>
            </>
          )}
          <h4 className="mt-3 font-bold">Payments</h4>
          {d.payments.length === 0 ? (
            <p className="font-read text-ink-soft">No payments yet.</p>
          ) : (
            <ul>
              {d.payments.map((p) => (d.stripe ? <RefundRow key={`${p.id}:${p.refunded}`} p={p} familyId={familyId} onDone={load} /> : <li key={p.id}>{money(p.amount, p.currency)} on {formatDay(p.paidAt)}</li>))}
            </ul>
          )}
          {d.customer && (
            <p className="mt-2 text-sm">
              <a className="font-semibold text-[#2a5bd7] underline" href={`https://dashboard.stripe.com/customers/${encodeURIComponent(d.customer)}`} target="_blank" rel="noreferrer">
                Open in Stripe
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}
