// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { FREE_UNITS_PER_COURSE, PRICES_BY_CURRENCY, TRIAL_DAYS } from "@/lib/plan";
import Home from "./page";

describe("home page", () => {
  it("leads with the free trial, not Subscribe", () => {
    render(<Home />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    const links = within(hero).getAllByRole("link");
    expect(links[0]).toHaveTextContent(`Start your free ${TRIAL_DAYS}-day trial`);
    expect(links[0].getAttribute("href")).toMatch(/^\/play\/?$/);
    expect(within(hero).queryByText("Subscribe")).toBeNull();
    expect(within(hero).getByText(/Nothing is charged when the trial ends/)).toBeInTheDocument();
  });

  it("explains how it works in three steps", () => {
    render(<Home />);
    const how = screen.getByRole("heading", { name: "How it works" }).closest("section")!;
    expect(within(how).getAllByRole("listitem")).toHaveLength(3);
  });

  it("answers what happens when the trial ends, first", () => {
    render(<Home />);
    const faq = screen.getByRole("heading", { name: "Questions from parents" }).closest("section")!;
    const first = within(faq).getAllByRole("button")[0];
    expect(first).toHaveTextContent("What happens when the free trial ends?");
    expect(faq.textContent).toContain(`the first ${FREE_UNITS_PER_COURSE} units of every subject stay free`);
  });

  it("doesn't claim every province", () => {
    render(<Home />);
    expect(screen.queryByText(/Every province/)).toBeNull();
  });

  it("offers Canadian provinces and US states, grouped, with US prices in the FAQ", () => {
    render(<Home />);
    const coverage = screen.getByRole("heading", { name: "Matched to your province or state" }).closest("section")!;
    expect(within(coverage).getByRole("heading", { name: "Canada" })).toBeInTheDocument();
    expect(within(coverage).getByRole("heading", { name: "United States" })).toBeInTheDocument();
    // Every offered framework has a link to its curriculum page, whichever states exist.
    for (const f of FRAMEWORKS) {
      expect(within(coverage).getByRole("link", { name: f.region }).getAttribute("href"), f.region).toMatch(new RegExp(`^/curriculum/${f.slug}/?$`));
    }
    const us = FRAMEWORKS.filter((f) => f.country === "US");
    const usStates = us.filter((f) => f.regionKind !== "district").length;
    // Washington, DC is a district, so it is named after the states rather than counted as one.
    const districts = us.filter((f) => f.regionKind === "district").map((f) => f.region);
    expect(coverage.textContent).toContain(
      districts.length
        ? `Canadian provinces and territories, ${usStates} US states and ${districts.join(" and ")}`
        : `Canadian provinces and territories and ${usStates} US states`,
    );
    const faq = screen.getByRole("heading", { name: "Questions from parents" }).closest("section")!;
    expect(faq.textContent).toContain(PRICES_BY_CURRENCY.USD.month.label);
    expect(faq.textContent).toContain("Washington");
  });
});

describe("home page build line", () => {
  it("shows the commit this build was made from at the foot of the page", () => {
    vi.stubEnv("NEXT_PUBLIC_BUILD_SHA", "3f9a1c2d4e5b6a7980716253443526170819abcd");
    render(<Home />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Build 3f9a1c2");
    vi.unstubAllEnvs();
  });
});
