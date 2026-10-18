"use client";

import { useEffect, useState } from "react";

/** Whether the sign-in forms offer "Email me a sign-in link": the server says so, and until it does the option stays hidden. */
export function useMagicLinkOn(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let live = true;
    fetch("/api/auth/providers/", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { magic?: boolean } | null) => live && setOn(Boolean(d?.magic)))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);
  return on;
}
