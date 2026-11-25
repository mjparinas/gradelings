// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TRIAL_DAYS } from "@/lib/plan";
import AboutPage from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("about page", () => {
  it("leads with Try it free (green) and drops the phone Subscribe bar", () => {
    render(<AboutPage />);
    const header = screen.getByRole("banner");
    const fullWidthSubscribe = [...header.querySelectorAll("a")].filter(
      (a) => a.textContent === "Subscribe" && a.className.includes("w-full"),
    );
    expect(fullWidthSubscribe).toHaveLength(0);

    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    const trial = within(hero).getAllByRole("link", { name: "Try it free" })[0];
    expect(trial).toHaveClass("btn-good");
    expect(trial).toHaveAttribute("href", expect.stringMatching(/^\/play\/?$/));
  });

  it("shows product proof: sample questions and report-card levels", () => {
    render(<AboutPage />);
    expect(screen.getByRole("region", { name: "Sample questions" })).toBeInTheDocument();
    expect(screen.getByText(/Parent report/)).toBeInTheDocument();
    expect(screen.getByText(/same words as the report card/i)).toBeInTheDocument();
  });

  it("features three beliefs and keeps the rest quieter", () => {
    render(<AboutPage />);
    const beliefs = screen.getByRole("heading", { name: "What we believe" }).closest("section")!;
    expect(within(beliefs).getAllByRole("listitem").length).toBeGreaterThanOrEqual(6);
    expect(within(beliefs).getByRole("heading", { name: "Speak the language of the report card" })).toBeInTheDocument();
    expect(within(beliefs).getByRole("heading", { name: "Be kind" })).toBeInTheDocument();
    expect(within(beliefs).getByRole("heading", { name: "Be honest with parents" })).toBeInTheDocument();
  });

  it("puts a real trial CTA in the try section, with contact as secondary", () => {
    render(<AboutPage />);
    const trySection = screen.getByRole("heading", { name: "Try it free" }).closest("section")!;
    const trial = within(trySection).getByRole("link", { name: "Try it free" });
    expect(trial).toHaveClass("btn-good");
    expect(within(trySection).getByRole("link", { name: "contact page" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/contact\/?$/),
    );
    expect(trySection.textContent).toContain(`${TRIAL_DAYS} days`);
  });

  it("does not interrupt the trust story with a mid-page Android card", () => {
    render(<AboutPage />);
    expect(screen.queryByRole("heading", { name: /is on Google Play/i })).toBeNull();
  });
});
