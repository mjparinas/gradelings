// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import CurriculumIndex from "./page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("curriculum index", () => {
  it("leads with finding a child's school region, not a card wall", () => {
    render(<CurriculumIndex />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Where does your child go to school?");
    expect(screen.getByLabelText(/Find your province or state/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Canada" })).toBeInTheDocument();
    expect(screen.queryByText(/More coming/i)).toBeNull();
    expect(screen.getByRole("region", { name: /Ready to try/ })).toBeInTheDocument();
  });

  it("lists every Canadian curriculum on the page", () => {
    render(<CurriculumIndex />);
    for (const f of FRAMEWORKS.filter((x) => x.country === "CA")) {
      expect(screen.getByRole("link", { name: new RegExp(f.curriculumName) })).toHaveAttribute("href", `/curriculum/${f.slug}/`);
    }
  });
});
