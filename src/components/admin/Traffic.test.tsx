// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { Traffic } from "./Traffic";

const search = {
  site: "sc-domain:example.com",
  start: "2026-09-12",
  end: "2026-10-09",
  totals: { clicks: 120, impressions: 4000, ctr: 0.03, position: 9.5 },
  previous: { clicks: 100, impressions: 3000, ctr: 0.033, position: 12 },
  daily: [{ date: "2026-10-09", clicks: 9, impressions: 200 }],
  queries: [{ key: "grade 4 math practice", clicks: 30, impressions: 600, ctr: 0.05, position: 4.2 }],
  pages: [{ key: "https://www.example.com/guides/bc/grade-4/", clicks: 25, impressions: 500, ctr: 0.05, position: 5 }],
  sitemaps: [{ path: "https://www.example.com/sitemap.xml", lastDownloaded: Date.now() - 3_600_000, errors: 1, warnings: 0, submitted: 8400 }],
};
const visits = {
  start: "2026-09-15",
  end: "2026-10-12",
  visitors: 80,
  pageviews: 300,
  previous: { visitors: 50, pageviews: 200 },
  daily: [{ date: "2026-10-12", visitors: 25, pageviews: 90 }],
  pages: [{ key: "/report-cards/bc/", visitors: 52, pageviews: 141 }],
  referrers: [{ key: "www.google.com", visitors: 20, pageviews: 40 }],
  countries: [{ key: "CA", visitors: 70, pageviews: 260 }],
};

beforeEach(() => {
  mocks.call.mockReset();
});

describe("Traffic", () => {
  it("shows Google search and visits, and changes the period", async () => {
    mocks.call.mockResolvedValue({ days: 28, search: { state: "ok", report: search }, visits: { state: "ok", report: visits } });
    const user = userEvent.setup();
    render(<Traffic />);
    expect(await screen.findByText("Clicks from Google")).toBeInTheDocument();
    expect(screen.getByText("up 20% on the 28 days before")).toBeInTheDocument();
    expect(screen.getByText("3%")).toBeInTheDocument();
    expect(screen.getAllByText("grade 4 math practice").length).toBeGreaterThan(0);
    expect(screen.getAllByText("/guides/bc/grade-4/").length).toBeGreaterThan(0);
    expect(screen.getByText(/8,400 pages listed/)).toHaveTextContent("1 errors");
    expect(screen.getByText("up 60% on the 28 days before")).toBeInTheDocument();
    expect(screen.getAllByText("www.google.com").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("combobox", { name: "Period" }));
    await user.click(screen.getByRole("option", { name: "Last 90 days" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/admin/traffic/?days=90"));
    await user.click(screen.getByRole("button", { name: "Check again" }));
    expect(mocks.call).toHaveBeenLastCalledWith("/api/admin/traffic/?days=90&refresh=1");
  });

  it("says what to set up, and why a part failed", async () => {
    mocks.call.mockResolvedValue({ days: 28, search: { state: "setup", setup: "Set GOOGLE_SERVICE_ACCOUNT_KEY." }, visits: { state: "error", error: "Vercel Analytics answered 403." } });
    render(<Traffic />);
    expect(await screen.findByText(/Set GOOGLE_SERVICE_ACCOUNT_KEY/)).toBeInTheDocument();
    expect(screen.getByText("Couldn't read it: Vercel Analytics answered 403.")).toBeInTheDocument();
  });

  it("says when the plan keeps fewer days, and skips the comparison", async () => {
    mocks.call.mockResolvedValue({ days: 90, search: { state: "setup", setup: "Set it." }, visits: { state: "ok", report: { ...visits, start: "2026-09-12", keptDays: 31, previous: null } } });
    render(<Traffic />);
    expect(await screen.findByText(/Vercel keeps 31 days on this plan/)).toBeInTheDocument();
    expect(screen.queryByText(/days before/)).not.toBeInTheDocument();
  });
});
