// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PRICES, PRICES_BY_CURRENCY } from "@/lib/plan";
import TermsPage from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("terms page", () => {
  it("gives Canadian prices for everyone and a US section with US prices, sales tax and consumer rights", () => {
    render(<TermsPage />);
    expect(screen.getByRole("article")).toHaveTextContent(`${PRICES.month.label} or ${PRICES.year.label} (CAD)`);
    const us = screen.getByRole("heading", { name: "Families in the United States" }).closest("section")!;
    expect(us).toHaveTextContent(`${PRICES_BY_CURRENCY.USD.month.label} or ${PRICES_BY_CURRENCY.USD.year.label}, plus sales tax where it applies`);
    expect(us).toHaveTextContent("consumer laws of the state where you live");
    expect(us.querySelector('a[href="/privacy/#united-states"]')).not.toBeNull();
  });
});
