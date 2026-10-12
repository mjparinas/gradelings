// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FREE_UNITS_PER_COURSE, TRIAL_DAYS } from "@/lib/plan";
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
});
