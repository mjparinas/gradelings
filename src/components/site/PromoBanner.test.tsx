// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LivePromo } from "@/lib/promo";
import { savedPromoCode } from "@/lib/promoCode";
import { forgetPromo, PromoBanner } from "./PromoBanner";

const promo: LivePromo = {
  id: "p1",
  emoji: "🌱",
  headline: "Founding family price: 33% off for life",
  body: "Use code FOUNDER when you subscribe.",
  code: "FOUNDER",
  link: "/pricing/",
  linkLabel: "See pricing",
  endsAt: Date.now() + 3 * 86_400_000 + 60_000,
};

function serve(p: LivePromo | null) {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ promo: p }))));
}

beforeEach(() => {
  forgetPromo();
  localStorage.clear();
  sessionStorage.clear();
});
afterEach(() => vi.unstubAllGlobals());

describe("PromoBanner", () => {
  it("shows the live sale with its code, countdown and button, and remembers the code", async () => {
    serve(promo);
    render(<PromoBanner />);
    expect(await screen.findByText("Founding family price: 33% off for life")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /FOUNDER/ })).toBeInTheDocument();
    expect(screen.getByText("Ends in 3 days")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See pricing" })).toHaveAttribute("href", "/pricing/");
    expect(savedPromoCode()).toBe("FOUNDER");
  });

  it("shows nothing when there is no sale or the feed fails", async () => {
    serve(null);
    const { container } = render(<PromoBanner />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("offline"))));
    const again = render(<PromoBanner />);
    await act(async () => {});
    expect(again.container).toBeEmptyDOMElement();
  });

  it("shows at once on the next page, without fetching again, so a nav-bar link doesn't shift the page", async () => {
    serve(promo);
    const first = render(<PromoBanner />);
    await screen.findByText(promo.headline);
    first.unmount();
    render(<PromoBanner />);
    expect(screen.getByText(promo.headline)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("asks again on the next page when the feed failed", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("offline"))));
    render(<PromoBanner />).unmount();
    await act(async () => {});
    serve(promo);
    render(<PromoBanner />);
    expect(await screen.findByText(promo.headline)).toBeInTheDocument();
  });

  it("stays hidden once dismissed", async () => {
    serve(promo);
    const first = render(<PromoBanner />);
    await userEvent.click(await screen.findByRole("button", { name: "Hide this sale" }));
    expect(screen.queryByText(promo.headline)).not.toBeInTheDocument();
    first.unmount();
    const { container } = render(<PromoBanner />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
  });

  it("never shows in the store apps, which sell nothing", async () => {
    serve(promo);
    sessionStorage.setItem("grademap.android-app", "1");
    const { container } = render(<PromoBanner />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stays off the account pages, such as resetting a password", async () => {
    serve(promo);
    render(<PromoBanner />).unmount();
    await act(async () => {});
    window.history.replaceState(null, "", "/account/reset/");
    const { container } = render(<PromoBanner />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
    window.history.replaceState(null, "", "/");
  });

  it("leaves out the button where the visitor is already subscribing", async () => {
    serve(promo);
    render(<PromoBanner showLink={false} />);
    await screen.findByText(promo.headline);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
