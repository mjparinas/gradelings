// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
    expect(within(coverage).getByRole("link", { name: "Texas" }).getAttribute("href")).toMatch(/^\/curriculum\/texas\/?$/);
    expect(within(coverage).getByRole("link", { name: "New York" }).getAttribute("href")).toMatch(/^\/curriculum\/new-york\/?$/);
    expect(within(coverage).getByRole("link", { name: "Maine" }).getAttribute("href")).toMatch(/^\/curriculum\/maine\/?$/);
    expect(within(coverage).getByRole("link", { name: "Minnesota" }).getAttribute("href")).toMatch(/^\/curriculum\/minnesota\/?$/);
    expect(within(coverage).getByRole("link", { name: "Alaska" }).getAttribute("href")).toMatch(/^\/curriculum\/alaska\/?$/);
    expect(within(coverage).getByRole("link", { name: "Alabama" }).getAttribute("href")).toMatch(/^\/curriculum\/alabama\/?$/);
    expect(within(coverage).getByRole("link", { name: "Arizona" }).getAttribute("href")).toMatch(/^\/curriculum\/arizona\/?$/);
    expect(within(coverage).getByRole("link", { name: "Arkansas" }).getAttribute("href")).toMatch(/^\/curriculum\/arkansas\/?$/);
    expect(within(coverage).getByRole("link", { name: "Florida" }).getAttribute("href")).toMatch(/^\/curriculum\/florida\/?$/);
    expect(within(coverage).getByRole("link", { name: "Illinois" }).getAttribute("href")).toMatch(/^\/curriculum\/illinois\/?$/);
    expect(within(coverage).getByRole("link", { name: "Colorado" }).getAttribute("href")).toMatch(/^\/curriculum\/colorado\/?$/);
    expect(within(coverage).getByRole("link", { name: "Pennsylvania" }).getAttribute("href")).toMatch(/^\/curriculum\/pennsylvania\/?$/);
    expect(within(coverage).getByRole("link", { name: "Georgia" }).getAttribute("href")).toMatch(/^\/curriculum\/georgia\/?$/);
    expect(within(coverage).getByRole("link", { name: "Ohio" }).getAttribute("href")).toMatch(/^\/curriculum\/ohio\/?$/);
    expect(within(coverage).getByRole("link", { name: "New Jersey" }).getAttribute("href")).toMatch(/^\/curriculum\/new-jersey\/?$/);
    expect(within(coverage).getByRole("link", { name: "Missouri" }).getAttribute("href")).toMatch(/^\/curriculum\/missouri\/?$/);
    expect(within(coverage).getByRole("link", { name: "Indiana" }).getAttribute("href")).toMatch(/^\/curriculum\/indiana\/?$/);
    expect(within(coverage).getByRole("link", { name: "Virginia" }).getAttribute("href")).toMatch(/^\/curriculum\/virginia\/?$/);
    expect(coverage.textContent).toContain("Canadian provinces and territories and 21 US states");
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
