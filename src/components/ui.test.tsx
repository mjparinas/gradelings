// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getSubjectMeta } from "@/content/subjects";
import { BackLink, BackgroundDecor, LoadingScreen, ProgressBar, Stars, subjectVars } from "./ui";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

describe("subjectVars", () => {
  it("exposes a subject's colours as CSS variables", () => {
    const math = getSubjectMeta("math");
    expect(subjectVars(math)).toEqual({ "--c": math.colour, "--c-dark": math.colourDark, "--c-soft": math.colourSoft });
  });
});

describe("Stars", () => {
  it("says how many stars were earned and fills that many", () => {
    const { container } = render(<Stars count={2} />);
    expect(screen.getByRole("img", { name: "2 of 3 stars" })).toBeInTheDocument();
    const fills = [...container.querySelectorAll("path")].map((p) => p.getAttribute("fill"));
    expect(fills).toEqual(["var(--color-star)", "var(--color-star)", "#e5e7eb"]);
  });

  it("pops only the earned stars, one after another", () => {
    const { container } = render(<Stars count={1} max={5} size={30} animate />);
    expect(screen.getByRole("img", { name: "1 of 5 stars" })).toBeInTheDocument();
    const svgs = [...container.querySelectorAll("svg")];
    expect(svgs).toHaveLength(5);
    expect(svgs.map((s) => s.classList.contains("animate-star-pop"))).toEqual([true, false, false, false, false]);
    expect(svgs[2].style.animationDelay).toBe("240ms");
    expect(svgs[0]).toHaveAttribute("width", "30");
  });
});

describe("ProgressBar", () => {
  it("reports its value to screen readers and fills in proportion", () => {
    render(<ProgressBar value={3} max={12} label="Daily goal" />);
    const bar = screen.getByRole("progressbar", { name: "Daily goal" });
    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "12");
    expect((bar.firstElementChild as HTMLElement).style.width).toBe("25%");
  });

  it("never overfills, and stays empty with nothing to measure", () => {
    const { rerender } = render(<ProgressBar value={30} max={12} />);
    expect((screen.getByRole("progressbar", { name: "Progress" }).firstElementChild as HTMLElement).style.width).toBe("100%");
    rerender(<ProgressBar value={0} max={0} />);
    const fill = screen.getByRole("progressbar").firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("0%");
    expect(fill.style.minWidth).toBe("0px");
  });
});

describe("BackLink", () => {
  it("is a named link back", () => {
    render(<BackLink href="/play/" label="Back to home" />);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/play/");
  });
});

describe("BackgroundDecor and LoadingScreen", () => {
  it("keeps the floating shapes away from screen readers and taps", () => {
    const { container } = render(<BackgroundDecor />);
    const decor = container.firstElementChild!;
    expect(decor).toHaveAttribute("aria-hidden", "true");
    expect(decor).toHaveClass("pointer-events-none");
    expect(decor.querySelectorAll("svg")).toHaveLength(6);
  });

  it("tells the child the app is getting ready", () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("main")).toHaveTextContent("Getting ready…");
  });
});
