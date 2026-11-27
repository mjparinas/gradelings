"use client";

import { useEffect } from "react";
import { reportHandled } from "@/lib/reportError";

/** Last resort when even the root layout fails. Plain markup: the site's styles may not have loaded. */
export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => reportHandled(error), [error]);
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "4rem 1rem", background: "#fffdf8", color: "#0f172a" }}>
        <h1>Oops, something got mixed up</h1>
        <p>Nothing is lost. Your progress is saved on this device.</p>
        <p>
          {/* A full reload on purpose: the router itself may be what failed. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Reload Gradelings</a>
        </p>
      </body>
    </html>
  );
}
