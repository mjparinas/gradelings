"use client";

import { track } from "@vercel/analytics";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import { ctaEvent, isPublic } from "@/lib/ctaEvents";

// Cookieless page-view counts and page-speed measurements for the public site only (see ctaEvents.ts).

function viewsBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isPublic(event.url) ? event : null;
}

function speedBeforeSend<T extends { url: string }>(event: T): T | null {
  return isPublic(event.url) ? event : null;
}

function CtaClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      const event = ctaEvent(link?.getAttribute("href") ?? null, window.location.href);
      if (event) track(event.name, { from: event.from });
    };
    // Capture, so a link that navigates or a handler that stops the click is still counted.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

export function SiteAnalytics() {
  if (!process.env.NEXT_PUBLIC_ON_VERCEL) return null;
  return (
    <>
      <CtaClicks />
      <Analytics beforeSend={viewsBeforeSend} />
      <SpeedInsights beforeSend={speedBeforeSend} />
    </>
  );
}
