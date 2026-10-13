// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { endOf, Sales, startOf } from "./Sales";

const founder = { code: "FOUNDER", display: "FOUNDER", kind: "discount", days: null, percent_off: 33, duration: "forever", months: null, max_uses: null, uses: 0, expires_at: null, disabled_at: null };
const save20 = { ...founder, code: "SAVE20", display: "SAVE20", percent_off: 20, duration: "once" };
const disabled = { ...founder, code: "OLDONE", display: "OLDONE", disabled_at: 1 };
const live = { id: "p1", preset: "founder", emoji: "🌱", headline: "Founding family price: {percent} off {for}", body: "", code: "FOUNDER", link: "/pricing/", starts_at: 1, ends_at: Date.now() + 86_400_000, stopped_at: null, status: "live" };

beforeEach(() => {
  mocks.call.mockReset();
  mocks.call.mockImplementation(async (url: string, method = "GET") => {
    if (url === "/api/admin/codes/") return { codes: [founder, save20, disabled] };
    if (url === "/api/admin/promos/" && method === "GET") return { promos: [live] };
    return { ok: true };
  });
});

describe("Sales tab", () => {
  it("starts from the founding-family preset with the FOUNDER code, and previews the banner's words", async () => {
    render(<Sales />);
    expect(await screen.findByText("Founding family price: 33% off for life")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Founding families/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Start sale" })).toBeEnabled();
    expect(await screen.findByText("Live")).toBeInTheDocument();
  });

  it("fills in a preset's words and creates the sale with the picked code and dates", async () => {
    render(<Sales />);
    await screen.findByText("Live");
    await userEvent.click(screen.getByRole("button", { name: /Black Friday/ }));
    expect(screen.getByLabelText("Headline")).toHaveValue("Black Friday: {percent} off {for}");
    await userEvent.click(screen.getByRole("button", { name: /Schedule sale|Start sale/ }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/admin/promos/", "POST", expect.objectContaining({ preset: "black-friday", code: "FOUNDER", link: "/pricing/" })));
    const body = mocks.call.mock.calls.find((c) => c[1] === "POST")![2];
    expect(body.endsAt).toBeGreaterThan(body.startsAt);
  });

  it("only offers codes that still work", async () => {
    render(<Sales />);
    await screen.findByText("Live");
    expect(screen.queryByText(/OLDONE/)).not.toBeInTheDocument();
  });

  it("stops a live sale", async () => {
    render(<Sales />);
    await userEvent.click(await screen.findByRole("button", { name: "Stop now" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/admin/promos/", "PATCH", { id: "p1" }));
  });

  it("starts a sale picked for today at once, and ends it at the end of the last day", () => {
    const now = new Date(2026, 9, 13, 15, 30).getTime();
    expect(startOf("2026-10-13", now)).toBe(now);
    expect(startOf("2026-10-20", now)).toBe(new Date(2026, 9, 20).getTime());
    expect(endOf("2026-10-20")).toBe(new Date(2026, 9, 20, 23, 59, 59).getTime());
  });
});
