// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UnitMilestone, { dynamic, generateMetadata } from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (unit: string, level: string) => ({ params: Promise.resolve({ framework: "bc", grade: "grade-4", subject: "math", unit, level }) }) as never;

describe("shared unit milestone page", () => {
  it("celebrates the milestone with no child's name, says it is practice and invites a try", async () => {
    render(await UnitMilestone(props("fractions", "2")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("🌳 Grew into a Tree in Fractions!");
    expect(screen.getByText("A milestone · Grade 4 Math")).toBeInTheDocument();
    expect(screen.getByText("Milestones reflect practice in the app, not a report-card mark.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Try it free" })).toHaveAttribute("href", "/play/");
    expect(screen.getByRole("link", { name: "Try Grade 4 Fractions questions" })).toHaveAttribute("href", "/curriculum/bc/grade-4/math/fractions/");
    // The share card itself, and no style="" attributes: the page runs under a nonce policy that forbids them.
    expect(document.querySelector("img")).toHaveAttribute("src", "/milestone/unit/bc/grade-4/math/fractions/2/opengraph-image/");
    expect(document.querySelector("[style]")).toBeNull();
  });

  it("is rendered per request and kept out of search", async () => {
    expect(dynamic).toBe("force-dynamic");
    expect((await generateMetadata(props("fractions", "3"))).robots).toEqual({ index: false, follow: true });
  });

  it("is not found for a link we never make", async () => {
    await expect(UnitMilestone(props("fractions", "9"))).rejects.toThrow();
  });
});
