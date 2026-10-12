// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SystemReport } from "@/lib/systemHealth";

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

describe("System", () => {
  it("shows the overall state, each check and the status pages", async () => {
    mocks.call.mockResolvedValue(report());
    render(<System />);
    expect(await screen.findByText("Worth a look: Errors (Sentry).")).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/system/");
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

  it("says when everything works, and checks again on request", async () => {
    mocks.call.mockResolvedValue(report({ checks: [report().checks[0]], statusPages: [] }));
    const user = userEvent.setup();
    render(<System />);
    expect(await screen.findByText("Everything is working.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Check again" }));
    expect(mocks.call).toHaveBeenLastCalledWith("/api/admin/system/?refresh=1");
  });

  it("names what's down, and shows an error when the page can't load", async () => {
    mocks.call.mockResolvedValueOnce(report({ checks: [{ id: "database", title: "Database", state: "down", summary: "No answer.", rows: [] }], statusPages: [] }));
    const { unmount } = render(<System />);
    expect(await screen.findByText("Something is down: Database.")).toBeInTheDocument();
    unmount();
    mocks.call.mockRejectedValueOnce(new Error("Not found"));
    render(<System />);
    expect(await screen.findByRole("alert")).toHaveTextContent("Not found");
  });

  it("writes times plainly", () => {
    expect(sinceText(now, now)).toBe("just now");
    expect(sinceText(now - 5 * 60_000, now)).toBe("5 min ago");
    expect(sinceText(now - 3 * 3_600_000, now)).toBe("3 h ago");
    expect(sinceText(now - 3 * 86_400_000, now)).toBe("3 days ago");
  });
});
