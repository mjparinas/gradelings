// @vitest-environment jsdom
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CHECKS, STATUS_PAGES, type HealthCheck, type StatusPage, type SystemReport } from "@/lib/systemHealth";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { sinceText, System } from "./System";

const now = Date.now();
const report = (over: Partial<SystemReport> = {}): SystemReport => ({
  checkedAt: now,
  checks: [
    { id: "database", title: "Database", state: "ok", summary: "Turso answered in 40 ms.", rows: [{ label: "Answer time", value: "40 ms", state: "ok" }] },
    {
      id: "errors",
      title: "Errors (Sentry)",
      state: "warn",
      summary: "1 open issue, 1 seen in the last day.",
      rows: [{ label: "TypeError", value: "3 events, open 2 days", at: now - 2 * 3_600_000, href: "https://sentry.example/1", state: "warn" }],
      link: { label: "Sentry issues", href: "https://sentry.example/" },
    },
    { id: "deploys", title: "Deploys (Vercel)", state: "off", summary: "Not connected to Vercel.", rows: [], setup: "Set VERCEL_TOKEN and VERCEL_PROJECT_ID." },
  ],
  statusPages: [{ name: "Vercel", url: "https://www.vercel-status.com", state: "warn", description: "Minor Service Outage", incidents: [{ name: "Slow builds", startedAt: now - 3 * 3_600_000, href: "https://stspg.io/x" }] }],
  ...over,
});

beforeEach(() => {
  mocks.call.mockReset();
});

/** Answers each card's request from a report; checks the report leaves out come back "off". */
function serve(r: SystemReport, opts: { hold?: string[] } = {}) {
  const held: Record<string, () => void> = {};
  mocks.call.mockImplementation((url: string) => {
    const u = new URL(url, "http://x");
    const id = u.searchParams.get("check");
    const name = u.searchParams.get("page");
    const result: HealthCheck | StatusPage =
      (id && (r.checks.find((c) => c.id === id) ?? { id, title: CHECKS.find((c) => c.id === id)!.title, state: "off", summary: "Not set up.", rows: [] })) ||
      (r.statusPages.find((p) => p.name === name) ?? { name: name!, url: "https://status.example", state: "ok", description: "All Systems Operational", incidents: [] });
    const answer = { checkedAt: r.checkedAt, result };
    const key = id ?? name!;
    if (opts.hold?.includes(key)) return new Promise((resolve) => (held[key] = () => resolve(answer)));
    return Promise.resolve(answer);
  });
  return held;
}

describe("System", () => {
  it("shows the overall state, each check and the status pages", async () => {
    serve(report());
    render(<System />);
    expect(await screen.findByText("Worth a look: Errors (Sentry).")).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/system/?check=database");
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/system/?page=Vercel");
    expect(mocks.call).toHaveBeenCalledTimes(CHECKS.length + STATUS_PAGES.length);
    const errors = screen.getByRole("heading", { name: "Errors (Sentry)" }).closest("li")!;
    expect(within(errors).getByText("Needs a look")).toBeInTheDocument();
    expect(within(errors).getByRole("link", { name: "3 events, open 2 days" })).toHaveAttribute("href", "https://sentry.example/1");
    expect(within(errors).getByText(/2 h ago/)).toBeInTheDocument();
    const deploys = screen.getByRole("heading", { name: "Deploys (Vercel)" }).closest("li")!;
    expect(within(deploys).getByText("Not set up")).toBeInTheDocument();
    expect(within(deploys).getByText("Set VERCEL_TOKEN and VERCEL_PROJECT_ID.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Slow builds" })).toBeInTheDocument();
    expect(screen.getByText(/open 3 h/)).toBeInTheDocument();
  });

  it("draws every card at once and fills each in as its answer arrives", async () => {
    const held = serve(report(), { hold: ["errors", "Vercel"] });
    render(<System />);
    // Every card is there before any answer, as a placeholder under its own title.
    for (const c of CHECKS) expect(screen.getByRole("heading", { name: c.title })).toBeInTheDocument();
    expect(await screen.findByText("Turso answered in 40 ms.")).toBeInTheDocument();
    const errors = screen.getByRole("heading", { name: "Errors (Sentry)" }).closest("li")!;
    expect(errors).toHaveAttribute("aria-busy", "true");
    expect(within(errors).getByText("Checking…")).toBeInTheDocument();
    expect(screen.getByText(/^Checking every service… 13 of 15 done\.$/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checking…" })).toBeDisabled();
    await act(async () => held.errors());
    expect(within(screen.getByRole("heading", { name: "Errors (Sentry)" }).closest("li")!).getByText("Needs a look")).toBeInTheDocument();
    expect(screen.getByText("Checking… so far worth a look: Errors (Sentry).")).toBeInTheDocument();
    await act(async () => held.Vercel());
    expect(screen.getByText("Worth a look: Errors (Sentry).")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check again" })).toBeEnabled();
  });

  it("says when everything works, and checks again on request", async () => {
    serve(report({ checks: [report().checks[0]], statusPages: [] }));
    const user = userEvent.setup();
    render(<System />);
    expect(await screen.findByText("Everything is working.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Check again" }));
    expect(mocks.call).toHaveBeenLastCalledWith("/api/admin/system/?page=Turso&refresh=1");
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/system/?check=database&refresh=1");
  });

  it("names what's down, and shows an error when a card can't load", async () => {
    serve(report({ checks: [{ id: "database", title: "Database", state: "down", summary: "No answer.", rows: [] }], statusPages: [] }));
    const { unmount } = render(<System />);
    expect(await screen.findByText("Something is down: Database.")).toBeInTheDocument();
    unmount();
    mocks.call.mockReset();
    mocks.call.mockRejectedValue(new Error("Not found"));
    render(<System />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Not found");
    const db = screen.getByRole("heading", { name: "Database" }).closest("li")!;
    expect(within(db).getByText("Couldn't load this check: Not found")).toBeInTheDocument();
  });

  it("writes times plainly", () => {
    expect(sinceText(now, now)).toBe("just now");
    expect(sinceText(now - 5 * 60_000, now)).toBe("5 min ago");
    expect(sinceText(now - 3 * 3_600_000, now)).toBe("3 h ago");
    expect(sinceText(now - 3 * 86_400_000, now)).toBe("3 days ago");
  });
});
