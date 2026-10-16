// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEACHER_FRAMEWORKS } from "./teachers";
import { kidPracticeSteps } from "./provinces";
import { STUDENTS, TeacherDemo } from "./TeacherDemo";
import { TURN_MS } from "./useCarousel";

const levels = kidPracticeSteps(TEACHER_FRAMEWORKS);
const current = () => document.querySelector("[data-current]")!;

describe("TeacherDemo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("tells the class's week in four screens, one visible at a time", () => {
    render(<TeacherDemo levels={levels} />);
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides).toHaveLength(4);
    expect(slides.filter((s) => s.getAttribute("aria-hidden") === "false")).toHaveLength(1);
    expect(current()).toHaveTextContent("Assign a unit");
  });

  it("only shows first names, and levels in the framework's own kid labels", () => {
    render(<TeacherDemo levels={levels} />);
    for (const s of STUDENTS) expect(s.name).toMatch(/^[A-Z][a-z]+$/);
    const results = screen.getByRole("table", { hidden: true });
    expect(results).toHaveTextContent(`${levels[3].icon} ${levels[3].kidLabel}`);
    expect(results).toHaveTextContent("Not started");
  });

  it("flags the tricky unit and the students to check in with, matching the real thresholds", () => {
    render(<TeacherDemo levels={levels} />);
    const next = screen.getByText("What to look at next", { selector: "p" }).parentElement!;
    expect(next).toHaveTextContent("2 of 4 who tried it are finding it tricky");
    expect(next).toHaveTextContent("Hasn’t started yet");
    expect(next).toHaveTextContent("not a report-card mark");
  });

  it("moves with the arrows, wraps, and turns by itself until someone takes over", () => {
    render(<TeacherDemo levels={levels} />);
    act(() => vi.advanceTimersByTime(TURN_MS));
    expect(current()).toHaveTextContent("It opens on the student");
    fireEvent.click(screen.getByRole("button", { name: "Previous screen" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous screen" }));
    expect(current()).toHaveTextContent("What to look at next");
    act(() => vi.advanceTimersByTime(TURN_MS * 2));
    expect(current()).toHaveTextContent("What to look at next");
  });
});
