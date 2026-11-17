"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { markNewsSeen, newsSeen, parentNews, subscribeNewsSeen, unseenNews } from "@/lib/parentNews";
import { dayLabel, NEWS_KIND_LABEL } from "@/lib/whatsNew";
import { isStoreApp } from "@/lib/twa";
import { Panel } from "./common";

const noSubscribe = () => () => {};

/** The posts for this device and how many are new since it last looked. In a store app the list leaves out anything about paying. */
export function useParentNews() {
  const storeApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const seen = useSyncExternalStore(subscribeNewsSeen, newsSeen, () => null);
  const news = parentNews(storeApp);
  const latest = news[0]?.day;
  // A device that has never looked starts from today's newest post, so nothing old is marked new.
  useEffect(() => {
    if (seen === null && latest) markNewsSeen(latest);
  }, [seen, latest]);
  return { news, unseen: unseenNews(news, seen), storeApp };
}

/** A quiet note on the Overview when there are posts since the last visit; one tap to read, one to put it away. */
export function WhatsNewCard() {
  const { news, unseen } = useParentNews();
  if (unseen.length === 0) return null;
  const newest = unseen[0];
  return (
    <Panel className="mb-5 border-[#25b47e]/40 bg-[#f1faf5]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">✨</span>
        <div className="flex-1">
          <p className="font-bold">New in Gradelings</p>
          <p className="font-read text-sm">{newest.headline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="#/whats-new" className="inline-flex min-h-11 items-center rounded-xl bg-[#253047] px-4 text-sm font-bold text-white">
              See what&apos;s new
            </a>
            <button type="button" onClick={() => markNewsSeen(news[0].day)} className="min-h-11 rounded-xl px-4 text-sm font-semibold text-ink-soft underline">
              Not now
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/** The footer link, with a small dot while there is something new. */
export function WhatsNewLink() {
  const { news, unseen } = useParentNews();
  if (news.length === 0) return null;
  return (
    <a href="#/whats-new" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft underline">
      What&apos;s new
      {unseen.length > 0 && (
        <>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#e9559a]" />
          <span className="sr-only">({unseen.length} new)</span>
        </>
      )}
    </a>
  );
}

const KIND_STYLE = {
  new: "bg-[#e3f4ea] text-[#14532d]",
  fixed: "bg-[#e7effc] text-[#173a73]",
  teachers: "bg-[#fdf0d9] text-[#7a3d00]",
} as const;

/** `#/whats-new`: the recent posts for parents. Opening it counts them as seen. */
export function WhatsNewPage() {
  const { news, storeApp } = useParentNews();
  const latest = news[0]?.day;
  // Remember what was new on arrival, so it stays marked while the page is open.
  const [seenOnArrival] = useState(newsSeen);
  const newDays = new Set(unseenNews(news, seenOnArrival).map((d) => d.day));
  useEffect(() => {
    if (latest) markNewsSeen(latest);
  }, [latest]);
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">What&apos;s new</h1>
        <p className="font-read text-ink-soft">What changed in Gradelings lately, in plain words.</p>
      </div>
      {news.length === 0 && <p className="font-read">Nothing new to show yet.</p>}
      {news.map((entry) => (
        <Panel key={entry.day}>
          <p className="text-sm text-ink-soft">
            <time dateTime={entry.day}>{dayLabel(entry.day)}</time>
            {newDays.has(entry.day) && <span className="ml-2 rounded-full bg-[#e9559a] px-2 py-0.5 text-xs font-bold text-[#0f172a]">New</span>}
          </p>
          <h2 className="mt-1 text-xl font-bold">{entry.headline}</h2>
          <ul className="mt-3 flex flex-col gap-4">
            {entry.items.map((item) => (
              <li key={item.title}>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${KIND_STYLE[item.kind]}`}>{NEWS_KIND_LABEL[item.kind]}</span>
                <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                <p className="font-read">{item.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      ))}
      {!storeApp && (
        <p className="text-center text-sm text-ink-soft">
          <Link href="/whats-new/" className="font-semibold underline">Every update since the start</Link>
        </p>
      )}
    </div>
  );
}
