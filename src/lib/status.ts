// The public status page's reading of /api/health/. Kept apart from the component so it can be tested without a browser.

export type ServiceState = "checking" | "ok" | "degraded" | "unreachable";

/** What one health check says: the endpoint answers 200 with `status: "ok"` when the app and its database are up. */
export async function checkHealth(fetcher: typeof fetch = fetch): Promise<Exclude<ServiceState, "checking">> {
  try {
    const res = await fetcher("/api/health/", { cache: "no-store" });
    const body = (await res.json().catch(() => null)) as { status?: string } | null;
    if (res.ok && body?.status === "ok") return "ok";
    return "degraded";
  } catch {
    return "unreachable";
  }
}

export const STATE_TEXT: Record<ServiceState, { title: string; body: string }> = {
  checking: { title: "Checking…", body: "Asking our servers how they are." },
  ok: { title: "Everything is working", body: "The app, sign-in, syncing and the website are all answering normally." },
  degraded: {
    title: "We’re having trouble",
    body: "Our servers are answering, but something isn’t right. We’ve been alerted and are working on it. Practice still works offline on devices that have opened the app before, and it syncs when we’re back.",
  },
  unreachable: {
    title: "We can’t reach our servers",
    body: "If the rest of the internet works for you, the problem is probably ours, and we’re working on it. Practice still works offline on devices that have opened the app before.",
  },
};
