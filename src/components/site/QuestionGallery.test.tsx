// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuestionGallery, SLIDES, TURN_MS } from "./QuestionGallery";

const current = () => document.querySelector("[data-current]")!;

describe("QuestionGallery", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("has at least five questions across more than math, each with its crossed-out try among the choices", () => {
    expect(SLIDES.length).toBeGreaterThanOrEqual(5);
    expect(new Set(SLIDES.map((s) => s.subject)).size).toBeGreaterThanOrEqual(4);
    for (const s of SLIDES) {
      expect(s.choices).toContain(s.wrong);
      expect(new Set(s.choices).size).toBe(s.choices.length);
      expect(s.choices.length).toBeLessThanOrEqual(4);
    }
  });

  it("shows one question at a time and keeps the others hidden from screen readers", () => {
    render(<QuestionGallery />);
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides).toHaveLength(SLIDES.length);
    expect(slides.filter((s) => s.getAttribute("aria-hidden") === "false")).toHaveLength(1);
    expect(current()).toHaveTextContent(SLIDES[0].prompt);
  });

  it("moves left and right with the arrows, wrapping around", () => {
    render(<QuestionGallery />);
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(current()).toHaveTextContent(SLIDES[1].prompt);
    fireEvent.click(screen.getByRole("button", { name: "Previous question" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous question" }));
    expect(current()).toHaveTextContent(SLIDES[SLIDES.length - 1].prompt);
  });

  it("turns by itself every few seconds", () => {
    render(<QuestionGallery />);
    act(() => vi.advanceTimersByTime(TURN_MS));
    expect(current()).toHaveTextContent(SLIDES[1].prompt);
    act(() => vi.advanceTimersByTime(TURN_MS));
    expect(current()).toHaveTextContent(SLIDES[2].prompt);
  });

  it("stops turning once someone uses the arrows, and pauses while hovered", () => {
    render(<QuestionGallery />);
    const region = screen.getByRole("region", { name: "Sample questions" });
    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(TURN_MS * 2));
    expect(current()).toHaveTextContent(SLIDES[0].prompt);
    fireEvent.mouseLeave(region);
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    act(() => vi.advanceTimersByTime(TURN_MS * 2));
    expect(current()).toHaveTextContent(SLIDES[1].prompt);
  });

  it("doesn't turn by itself when motion is reduced", () => {
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    try {
      render(<QuestionGallery />);
      act(() => vi.advanceTimersByTime(TURN_MS * 2));
      expect(current()).toHaveTextContent(SLIDES[0].prompt);
    } finally {
      window.matchMedia = original;
    }
  });
});
