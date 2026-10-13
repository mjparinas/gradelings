// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ShapeName, Visual } from "@/content/types";
import { Coin, QuestionVisual, Shape, WithBlanks } from "./visuals";

const show = (visual: Visual) => render(<QuestionVisual visual={visual} />);

describe("WithBlanks", () => {
  it("draws each ☐ as a blank box between the text", () => {
    const { container } = render(<WithBlanks text="3 + ☐ = ☐" />);
    expect(screen.getAllByRole("img", { name: "blank" })).toHaveLength(2);
    expect(container.textContent).toBe("3 +  = ");
  });
});

describe("Coin", () => {
  it.each([
    [5, "nickel, 5¢"],
    [10, "dime, 10¢"],
    [25, "quarter, 25¢"],
    [100, "loonie, $1"],
    [200, "toonie, $2"],
  ])("names the %i¢ coin and prints its value", (cents, name) => {
    render(<Coin cents={cents} />);
    const coin = screen.getByRole("img", { name });
    expect(coin).toHaveTextContent(name.split(", ")[1]);
  });

  it("draws the loonie with eleven sides and the toonie with a gold centre", () => {
    const { container, rerender } = render(<Coin cents={100} />);
    expect(container.querySelector("polygon")!.getAttribute("points")!.split(" ")).toHaveLength(11);
    rerender(<Coin cents={200} />);
    expect(container.querySelector("polygon")).toBeNull();
    expect(container.querySelector('circle[fill="#f2c74e"]')).not.toBeNull();
  });

  it.each([
    [500, "$5 bill"],
    [1000, "$10 bill"],
    [2000, "$20 bill"],
    [5000, "$50 bill"],
  ])("draws a %i¢ bill as a bill", (cents, name) => {
    render(<Coin cents={cents} scale={2} />);
    const bill = screen.getByRole("img", { name });
    expect(bill).toHaveTextContent(name.replace(" bill", ""));
    expect(bill).toHaveAttribute("width", "220");
  });
});

describe("US coins", () => {
  it.each([
    [1, "penny, 1¢"],
    [5, "nickel, 5¢"],
    [10, "dime, 10¢"],
    [25, "quarter, 25¢"],
    [50, "half-dollar, 50¢"],
  ])("names the %i¢ US coin and prints its value", (cents, name) => {
    render(<Coin cents={cents} currency="USD" />);
    expect(screen.getByRole("img", { name })).toHaveTextContent(name.split(", ")[1]);
  });

  it("draws US $1 as a bill, not a loonie", () => {
    const { container } = render(<Coin cents={100} currency="USD" />);
    expect(screen.getByRole("img", { name: "$1 bill" })).toHaveAttribute("width", "110");
    expect(container.querySelector("polygon")).toBeNull();
  });

  it("passes a coins picture's currency to each coin", () => {
    show({ type: "coins", coins: [1, 50], currency: "USD" });
    expect(screen.getByRole("img", { name: "penny, 1¢" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "half-dollar, 50¢" })).toBeInTheDocument();
  });
});

describe("Shape", () => {
  const shapes: ShapeName[] = ["triangle", "square", "rectangle", "pentagon", "hexagon", "octagon", "circle", "oval", "rhombus", "trapezoid", "parallelogram", "cube", "sphere", "cylinder", "cone", "rectangular-prism", "pyramid"];

  it.each(shapes)("names the %s for screen readers and draws it", (shape) => {
    const { container } = render(<Shape shape={shape} size={90} />);
    const svg = screen.getByRole("img", { name: shape.replace("-", " ") });
    expect(svg).toHaveAttribute("width", "90");
    expect(container.querySelectorAll("svg *").length).toBeGreaterThan(0);
  });

  it("gives polygons the right number of corners", () => {
    const corners = (shape: ShapeName) => {
      const { container, unmount } = render(<Shape shape={shape} />);
      const n = container.querySelector("polygon")!.getAttribute("points")!.trim().split(" ").length;
      unmount();
      return n;
    };
    expect(corners("triangle")).toBe(3);
    expect(corners("rhombus")).toBe(4);
    expect(corners("pentagon")).toBe(5);
    expect(corners("hexagon")).toBe(6);
    expect(corners("octagon")).toBe(8);
  });
});

describe("QuestionVisual", () => {
  it("shows an equation with its blanks", () => {
    show({ type: "equation", text: "7 × ☐ = 56" });
    expect(screen.getByText(/7 ×/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "blank" })).toBeInTheDocument();
  });

  it("shows an emoji with its caption, and spaces out a word with blanks", () => {
    const { container, rerender } = show({ type: "emoji", emoji: "🐱", caption: "c_t" });
    expect(screen.getByText("🐱")).toBeInTheDocument();
    expect(screen.getByText("c_t")).toHaveClass("tracking-[0.12em]");
    rerender(<QuestionVisual visual={{ type: "emoji", emoji: "🐶" }} />);
    expect(container.textContent).toBe("🐶");
  });

  it("shows a pattern row with a ? at the end only when asked", () => {
    const { container, rerender } = show({ type: "emojiRow", items: ["🔴", "🔵", "🔴"], showBlank: true });
    expect(container.textContent).toBe("🔴🔵🔴?");
    rerender(<QuestionVisual visual={{ type: "emojiRow", items: ["🔴", "🔵"] }} />);
    expect(container.textContent).toBe("🔴🔵");
  });

  it("lays out counting objects in rows of five", () => {
    show({ type: "dots", count: 12, emoji: "🍎" });
    const dots = screen.getByRole("img", { name: "12 🍎" });
    expect([...dots.children].map((row) => row.children.length)).toEqual([5, 5, 2]);
  });

  it("uses a blue dot when no emoji is given", () => {
    show({ type: "dots", count: 3 });
    expect(screen.getByRole("img", { name: "3 🔵" }).textContent).toBe("🔵🔵🔵");
  });

  it("builds base-ten blocks and describes them", () => {
    show({ type: "blocks", hundreds: 2, tens: 3, ones: 4 });
    const blocks = screen.getByRole("img", { name: "2 hundreds, 3 tens and 4 ones" });
    const [flats, rods, cubes] = [...blocks.children];
    expect(flats.children).toHaveLength(2);
    expect(rods.children).toHaveLength(3);
    // Each rod is ten unit squares.
    expect(rods.firstElementChild!.firstElementChild!.children).toHaveLength(10);
    expect(cubes.children).toHaveLength(4);
  });

  it("leaves out hundreds and ones that are zero", () => {
    show({ type: "blocks", tens: 5, ones: 0 });
    const blocks = screen.getByRole("img", { name: "5 tens and 0 ones" });
    expect(blocks.children).toHaveLength(1);
  });

  it("shows each coin in a coins visual", () => {
    show({ type: "coins", coins: [25, 25, 10, 500] });
    expect(screen.getAllByRole("img", { name: "quarter, 25¢" })).toHaveLength(2);
    expect(screen.getByRole("img", { name: "dime, 10¢" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "$5 bill" })).toBeInTheDocument();
  });

  it("puts an object of the given length on a 0 to 15 cm ruler", () => {
    show({ type: "ruler", length: 6, emoji: "✏️" });
    const ruler = screen.getByRole("img", { name: "an object 6 centimetres long on a ruler" });
    const marks = [...ruler.querySelectorAll("span")].map((s) => s.textContent).filter((t) => /^\d+$/.test(t!));
    expect(marks).toEqual(Array.from({ length: 16 }, (_, i) => String(i)));
    expect((ruler.querySelector('[style*="width"]') as HTMLElement).style.width).toBe("40%");
  });

  it("draws a pictograph row per category with its count of pictures", () => {
    show({ type: "pictograph", title: "Favourite fruit", each: 2, rows: [{ label: "apples", emoji: "🍎", count: 3 }, { label: "pears", emoji: "🍐", count: 1 }] });
    expect(screen.getByText("Favourite fruit")).toBeInTheDocument();
    expect(screen.getByText("apples").nextElementSibling!.textContent).toBe("🍎🍎🍎");
    expect(screen.getByText("pears").nextElementSibling!.textContent).toBe("🍐");
    expect(screen.getByText("Each picture = 2")).toBeInTheDocument();
  });

  it("says each picture is one when no scale is given", () => {
    show({ type: "pictograph", title: "Pets", rows: [{ label: "cats", emoji: "🐱", count: 2 }] });
    expect(screen.getByText("Each picture = 1")).toBeInTheDocument();
  });

  it("draws a bar graph with a readable scale and bar heights in proportion", () => {
    show({ type: "bars", title: "Books read", bars: [{ label: "Mon", value: 4, emoji: "📘" }, { label: "Tue", value: 8 }] });
    const graph = screen.getByRole("img", { name: "Books read" });
    expect(screen.getByRole("figure")).toHaveTextContent("Books read");
    // Values up to 10 count by ones.
    const scale = [...graph.querySelectorAll('text[text-anchor="end"]')].map((t) => t.textContent);
    expect(scale).toEqual(["0", "1", "2", "3", "4", "5", "6", "7", "8"]);
    const heights = [...graph.querySelectorAll("rect")].map((r) => Number(r.getAttribute("height")));
    expect(heights[1]).toBeCloseTo(heights[0] * 2);
    expect(graph).toHaveTextContent("📘 Mon");
  });

  it.each([
    [18, 2],
    [45, 5],
    [90, 10],
    [240, 30],
  ])("counts a bar graph up to %i in steps of %i", (max, step) => {
    show({ type: "bars", title: "Scale", bars: [{ label: "A", value: max }] });
    const scale = [...screen.getByRole("img", { name: "Scale" }).querySelectorAll('text[text-anchor="end"]')].map((t) => Number(t.textContent));
    expect(scale[1] - scale[0]).toBe(step);
    expect(scale.at(-1)).toBeGreaterThanOrEqual(max);
  });

  it("shows a data table with its title, headers and rows", () => {
    show({ type: "table", title: "Weather", headers: ["Day", "°C"], rows: [["Mon", 12], ["Tue", -3]] });
    const table = screen.getByRole("table");
    expect(screen.getByRole("figure")).toHaveTextContent("Weather");
    expect(within(table).getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Day", "°C"]);
    expect(within(table).getAllByRole("row").slice(1).map((r) => r.textContent)).toEqual(["Mon12", "Tue-3"]);
  });

  it("shows a table without a caption when it has no title", () => {
    show({ type: "table", headers: ["x"], rows: [[1]] });
    expect(screen.getByRole("figure").querySelector("figcaption")).toBeNull();
  });

  it("shows a named shape", () => {
    show({ type: "shape", shape: "rectangular-prism" });
    expect(screen.getByRole("img", { name: "rectangular prism" })).toHaveAttribute("width", "150");
  });

  it("draws a spinner with one slice per colour", () => {
    show({ type: "spinner", segments: ["#f00", "#0f0", "#00f"] });
    const spinner = screen.getByRole("img", { name: "a spinner" });
    expect([...spinner.querySelectorAll(":scope > path")].map((p) => p.getAttribute("fill"))).toEqual(["#f00", "#0f0", "#00f"]);
  });

  it("stacks towers of blocks with their heights, and a blank tower", () => {
    show({ type: "towers", heights: [2, 4], showBlank: true });
    const towers = screen.getByRole("img", { name: "towers 2, 4 blocks tall" });
    const [a, b, blank] = [...towers.children];
    expect(a.firstElementChild!.children).toHaveLength(2);
    expect(b.firstElementChild!.children).toHaveLength(4);
    expect(a).toHaveTextContent("2");
    expect(blank).toHaveTextContent("??");
  });

  it("tells a short story line by line", () => {
    show({ type: "story", lines: ["Sam has 3 apples.", "He eats 1."] });
    expect(screen.getAllByText(/^(Sam|He)/).map((p) => p.textContent)).toEqual(["Sam has 3 apples.", "He eats 1."]);
  });

  it("shows a passage with a title and a gap between stanzas", () => {
    const { container } = show({ type: "passage", title: "Rain", paragraphs: ["Drip, drop,\non the roof.", "", "Splash!"] });
    expect(screen.getByRole("heading", { name: "Rain" })).toBeInTheDocument();
    const article = screen.getByRole("article");
    expect(article.querySelectorAll("p")).toHaveLength(2);
    expect(article.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(container).toHaveTextContent("Drip, drop, on the roof.");
  });

  it("shows a passage with no title", () => {
    show({ type: "passage", paragraphs: ["Once upon a time."] });
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("fills one ten frame, or two past ten, with red then blue counters", () => {
    const { container, rerender } = show({ type: "tenFrame", filled: 7 });
    expect(screen.getByRole("img", { name: "7 red counters" }).children).toHaveLength(1);
    const counters = () => [...container.querySelectorAll<HTMLElement>(".rounded-full")].map((c) => c.style.background);
    expect(counters()).toHaveLength(7);

    rerender(<QuestionVisual visual={{ type: "tenFrame", filled: 8, extra: 5 }} />);
    const frames = screen.getByRole("img", { name: "8 red and 5 blue counters" });
    expect(frames.children).toHaveLength(2);
    expect(counters().filter((c) => c === "rgb(239, 68, 68)")).toHaveLength(8);
    expect(counters().filter((c) => c === "rgb(79, 142, 247)")).toHaveLength(5);
  });

  it("points a clock's hands at the time", () => {
    show({ type: "clock", hour: 3, minute: 0 });
    const clock = screen.getByRole("img", { name: "an analog clock" });
    const numbers = [...clock.querySelectorAll("text")].map((t) => t.textContent);
    expect(numbers).toEqual(Array.from({ length: 12 }, (_, i) => String(i + 1)));
    const [hourHand, minuteHand] = [...clock.querySelectorAll("line[stroke-linecap]")];
    // 3:00: the hour hand points right, the minute hand straight up.
    expect(Number(hourHand.getAttribute("x2"))).toBeCloseTo(71);
    expect(Number(hourHand.getAttribute("y2"))).toBeCloseTo(50);
    expect(Number(minuteHand.getAttribute("x2"))).toBeCloseTo(50);
    expect(Number(minuteHand.getAttribute("y2"))).toBeCloseTo(16);
  });

  it("moves the hour hand along with the minutes", () => {
    show({ type: "clock", hour: 6, minute: 30 });
    const hourHand = screen.getByRole("img", { name: "an analog clock" }).querySelector("line[stroke-linecap]")!;
    // Half past six: halfway between the 6 and the 7, so a little left of straight down.
    expect(Number(hourHand.getAttribute("x2"))).toBeLessThan(50);
    expect(Number(hourHand.getAttribute("y2"))).toBeGreaterThan(65);
  });

  it("labels a number line, hides the blank's label and draws marks and jumps", () => {
    show({ type: "numberLine", min: 0, max: 10, step: 1, marks: [3], blankAt: 7, jumps: [{ from: 3, to: 5 }, { from: 5, to: 2 }] });
    const line = screen.getByRole("img", { name: "a number line from 0 to 10" });
    const labels = [...line.querySelectorAll("text")].map((t) => t.textContent);
    expect(labels).toEqual(["0", "1", "2", "3", "4", "5", "6", "8", "9", "10", "?"]);
    expect(line.querySelectorAll('circle[fill="#4f8ef7"]')).toHaveLength(1);
    expect(line.querySelectorAll('path[stroke="#e9559a"]')).toHaveLength(4);
  });

  it("labels only every few ticks on a long number line", () => {
    show({ type: "numberLine", min: 0, max: 100, step: 5 });
    const labels = [...screen.getByRole("img", { name: "a number line from 0 to 100" }).querySelectorAll("text")].map((t) => t.textContent);
    // 21 ticks would crowd the line, so labels are spread evenly from the start, at most about ten of them.
    const values = labels.map(Number);
    expect(values[0]).toBe(0);
    expect(values.length).toBeLessThanOrEqual(11);
    expect(new Set(values.slice(1).map((v, i) => v - values[i])).size).toBe(1);
    expect(values[1] % 5).toBe(0);
  });

  it("respects an explicit label spacing, including decimals", () => {
    show({ type: "numberLine", min: 0, max: 1, step: 0.1, labelEvery: 0.5 });
    const labels = [...screen.getByRole("img", { name: "a number line from 0 to 1" }).querySelectorAll("text")].map((t) => t.textContent);
    expect(labels).toEqual(["0", "0.5", "1"]);
  });

  it("shades fraction bars, using extra wholes for improper fractions", () => {
    show({ type: "fraction", numerator: 5, denominator: 4 });
    const model = screen.getByRole("img", { name: "5 out of 4 parts shaded" });
    const bars = [...model.children];
    expect(bars).toHaveLength(2);
    const shaded = (bar: Element) => [...bar.children].filter((p) => (p as HTMLElement).style.background === "rgb(233, 85, 154)").length;
    expect(bars.map(shaded)).toEqual([4, 1]);
  });

  it("shades fraction circles slice by slice, and a whole circle for one part", () => {
    const { rerender } = show({ type: "fraction", numerator: 2, denominator: 3, shape: "circle" });
    const slices = [...screen.getByRole("img", { name: "2 out of 3 parts shaded" }).querySelectorAll("path")].map((p) => p.getAttribute("fill"));
    expect(slices).toEqual(["#e9559a", "#e9559a", "#fff"]);
    rerender(<QuestionVisual visual={{ type: "fraction", numerator: 1, denominator: 1, shape: "circle" }} />);
    expect(screen.getByRole("img", { name: "1 out of 1 parts shaded" }).querySelector("circle")).toHaveAttribute("fill", "#e9559a");
  });

  it("lays out a multiplication array of rows by columns", () => {
    const { rerender } = show({ type: "array", rows: 3, cols: 4, emoji: "🍪" });
    const grid = screen.getByRole("img", { name: "3 rows of 4" });
    expect(grid.children).toHaveLength(12);
    expect(grid.style.gridTemplateColumns).toBe("repeat(4, minmax(0, 1fr))");
    expect(grid.textContent).toBe("🍪".repeat(12));
    rerender(<QuestionVisual visual={{ type: "array", rows: 2, cols: 2 }} />);
    expect(screen.getByRole("img", { name: "2 rows of 2" }).textContent).toBe("");
  });

  it("shows a letter card with an optional caption", () => {
    const { container, rerender } = show({ type: "letter", text: "Bb", caption: "ball" });
    expect(container).toHaveTextContent("Bbball");
    rerender(<QuestionVisual visual={{ type: "letter", text: "Q" }} />);
    expect(container.textContent).toBe("Q");
  });

  it("plots labelled points on a coordinate grid, including below zero", () => {
    show({ type: "grid", size: 3, min: -3, points: [{ x: 2, y: -1, label: "A" }, { x: 0, y: 0 }] });
    const grid = screen.getByRole("img", { name: "a coordinate grid" });
    const axis = [...grid.querySelectorAll('text[x="-12"]')].map((t) => t.textContent);
    expect(axis).toEqual(["-3", "-2", "-1", "0", "1", "2", "3"]);
    expect(grid.querySelectorAll('circle[fill="#e9559a"]')).toHaveLength(2);
    expect(grid).toHaveTextContent("A");
  });

  it("draws an angle, using the long arc past 180°", () => {
    const { rerender } = show({ type: "angle", degrees: 90 });
    const arc = () => screen.getByRole("img", { name: "an angle" }).querySelector("path")!.getAttribute("d")!;
    expect(arc()).toMatch(/A26 26 0 0 0/);
    rerender(<QuestionVisual visual={{ type: "angle", degrees: 270 }} />);
    expect(arc()).toMatch(/A26 26 0 1 0/);
  });
});
