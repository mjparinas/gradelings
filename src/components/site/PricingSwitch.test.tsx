// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PricingWithCurrency } from "./PricingSwitch";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const flags = (on: boolean) => vi.fn(async () => new Response(JSON.stringify({ flags: { "us-launch": on }, variants: {} }), { status: 200 }));

afterEach(() => vi.unstubAllGlobals());

describe("PricingWithCurrency", () => {
  it("shows Canadian prices only while the us-launch flag is off, and asks without a device id", async () => {
    const fetchMock = flags(false);
    vi.stubGlobal("fetch", fetchMock);
    render(<PricingWithCurrency />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0]).toEqual(["/api/flags/", expect.anything()]);
    expect(screen.queryByRole("group", { name: "Currency" })).not.toBeInTheDocument();
    expect(screen.getByText(/Prices are in Canadian dollars/)).toBeInTheDocument();
    expect(screen.queryByText(/US\$/)).not.toBeInTheDocument();
  });

  it("keeps Canadian prices when the flags can't be read", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("offline"))));
    render(<PricingWithCurrency />);
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByRole("group", { name: "Currency" })).not.toBeInTheDocument();
  });

  it("offers a CAD/USD switch once the flag is on", async () => {
    vi.stubGlobal("fetch", flags(true));
    render(<PricingWithCurrency />);
    const usd = await screen.findByRole("button", { name: "United States (USD)" });
    expect(screen.getByRole("button", { name: "Canada (CAD)" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(usd);
    expect(usd).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Prices are in US dollars; sales tax is added where it applies/)).toBeInTheDocument();
    expect(screen.getAllByText(/US\$/).length).toBeGreaterThan(0);
  });
});
