// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { offersUsd } from "./provinces";
import { PricingWithCurrency } from "./PricingSwitch";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("PricingWithCurrency", () => {
  it("shows Canadian prices only while no US curriculum is offered", () => {
    render(<PricingWithCurrency usd={false} />);
    expect(screen.queryByRole("group", { name: "Currency" })).not.toBeInTheDocument();
    expect(screen.getByText(/Prices are in Canadian dollars/)).toBeInTheDocument();
    expect(screen.queryByText(/US\$/)).not.toBeInTheDocument();
  });

  it("offers a CAD/USD switch once a US curriculum is offered, Canadian first", async () => {
    render(<PricingWithCurrency usd />);
    const usd = screen.getByRole("button", { name: "United States (USD)" });
    expect(screen.getByRole("button", { name: "Canada (CAD)" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(usd);
    expect(usd).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Prices are in US dollars, plus sales tax where it applies/)).toBeInTheDocument();
    expect(screen.getAllByText(/US\$/).length).toBeGreaterThan(0);
  });

  it("offers US dollars exactly when a US framework is in FRAMEWORKS", () => {
    expect(offersUsd(FRAMEWORKS)).toBe(FRAMEWORKS.some((f) => f.country === "US"));
    expect(offersUsd(FRAMEWORKS.filter((f) => f.country === "CA"))).toBe(false);
  });
});
