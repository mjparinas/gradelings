// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ profile: { id: "p1", name: "Maya", grade: "5", framework: "bc" } }));
vi.mock("@/lib/store", () => ({ useActiveProfile: () => h.profile }));
vi.mock("@/lib/juice", () => ({ celebrate: vi.fn() }));
vi.mock("@/lib/sound", () => ({ sounds: { complete: vi.fn() } }));
vi.mock("./Companion", () => ({ Companion: () => null }));

import { GraduationCard } from "./GraduationCard";

beforeEach(() => localStorage.clear());

describe("GraduationCard", () => {
  it("shows nothing for a child who has not moved up", () => {
    localStorage.setItem("gradelings.grad.p1", "5");
    render(<GraduationCard />);
    expect(screen.queryByTestId("graduation-card")).toBeNull();
  });
  it("congratulates a child who moved up, once", () => {
    localStorage.setItem("gradelings.grad.p1", "4");
    const { unmount } = render(<GraduationCard />);
    expect(screen.getByText("You finished Grade 4!")).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Grade 5, Maya/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /let's go/i }));
    expect(screen.queryByTestId("graduation-card")).toBeNull();
    unmount();
    render(<GraduationCard />);
    expect(screen.queryByTestId("graduation-card")).toBeNull();
  });
});
