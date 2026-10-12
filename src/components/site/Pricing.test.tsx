// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, SUBSCRIBE_HREF, TRIAL_DAYS } from "@/lib/plan";
import { PricingCards } from "./Pricing";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const card = (heading: string) => screen.getByRole("heading", { name: heading }).parentElement!;

describe("PricingCards", () => {
  it("shows the trial, monthly and yearly plans from the plan settings", () => {
    render(<PricingCards />);
    expect(card("Free trial")).toHaveTextContent(`$0 for ${TRIAL_DAYS} days`);
    expect(card("Free trial")).toHaveTextContent(`the first ${FREE_UNITS_PER_COURSE} units of every subject stay free`);
    expect(card("Family · monthly")).toHaveTextContent(`$${PRICES.month.amount} CAD / month`);
    expect(card("Family · monthly")).toHaveTextContent(`Up to ${MAX_CHILDREN} children.`);
    expect(card("Family · yearly")).toHaveTextContent(`$${PRICES.year.amount} CAD / year`);
    expect(card("Family · yearly")).toHaveTextContent(PRICES.year.note);
  });

  it("states a yearly saving and monthly equivalent that match the prices", () => {
    render(<PricingCards />);
    const saving = Math.round((1 - PRICES.year.amount / (PRICES.month.amount * 12)) * 100);
    expect(PRICES.year.note).toBe(`Save ${saving}%`);
    const perMonth = card("Family · yearly").textContent!.match(/about \$(\d+) a month/)![1];
    expect(Number(perMonth)).toBe(Math.round(PRICES.year.amount / 12));
  });

  it("starts the trial in the app and subscribes in the parent area", () => {
    render(<PricingCards />);
    expect(screen.getByRole("link", { name: "Start free" })).toHaveAttribute("href", "/play/");
    expect(screen.getByRole("link", { name: "Subscribe monthly" })).toHaveAttribute("href", SUBSCRIBE_HREF);
    expect(screen.getByRole("link", { name: "Subscribe yearly" })).toHaveAttribute("href", SUBSCRIBE_HREF);
  });
});
