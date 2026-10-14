// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    expect(within(coverage).getByRole("link", { name: "Washington" }).getAttribute("href")).toMatch(/^\/curriculum\/washington\/?$/);
    expect(within(coverage).getByRole("link", { name: "Oregon" }).getAttribute("href")).toMatch(/^\/curriculum\/oregon\/?$/);
    expect(within(coverage).getByRole("link", { name: "California" }).getAttribute("href")).toMatch(/^\/curriculum\/california\/?$/);
    expect(within(coverage).getByRole("link", { name: "New York" }).getAttribute("href")).toMatch(/^\/curriculum\/new-york\/?$/);
    expect(coverage.textContent).toContain("Canadian provinces and territories, plus Washington, Oregon, California and New York State");
    const faq = screen.getByRole("heading", { name: "Questions from parents" }).closest("section")!;
    expect(faq.textContent).toContain(PRICES_BY_CURRENCY.USD.month.label);
    expect(faq.textContent).toContain("Washington");
  });
});
