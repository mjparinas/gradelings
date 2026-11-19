// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Visual } from "@/content/types";
import { QuestionVisual } from "./visuals";

const show = (visual: Visual) => render(<QuestionVisual visual={visual} />);

describe("map picture", () => {
  const rows = [
    [null, { emoji: "🏫", label: "school" }, null],
    [{ emoji: "🌳", label: "park" }, { emoji: "🏠", label: "house" }, { emoji: "📚", label: "library" }],
    [null, { emoji: "🏪", label: "store" }, null],
  ];

  it("draws every square with its name and a compass rose with north at the top", () => {
    const { container } = show({ type: "map", title: "Map of Maple Town", rows });
    const map = screen.getByRole("img", { name: /^Map of Maple Town\. A map with north at the top\./ });
    expect(map).toHaveTextContent("school");
    expect(map).toHaveTextContent("library");
    expect(map.querySelectorAll("svg text")).toHaveLength(4);
    expect([...container.querySelectorAll("svg text")].map((t) => t.textContent)).toEqual(["N", "E", "S", "W"]);
  });

  it("reads the squares to a screen reader in order, saying which are empty", () => {
    show({ type: "map", rows });
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("row 1: empty, school, empty");
    expect(label).toContain("row 2: park, house, library");
  });

  it("labels the columns and rows of a grid map and names squares by them", () => {
    show({ type: "map", cols: ["A", "B"], rowLabels: ["1", "2"], rows: [[{ emoji: "🌳" }, { emoji: "🏠" }], [{ emoji: "🏫" }, { emoji: "🏪" }]] });
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("1: A: 🌳, B: 🏠");
    expect(label).toContain("2: A: 🏫, B: 🏪");
  });

  it("leaves the compass rose off when asked", () => {
    const { container } = show({ type: "map", compass: false, rows });
    expect(container.querySelector("svg")).toBeNull();
  });
});

describe("compass rose", () => {
  it("is a labelled picture with the four letters", () => {
    show({ type: "compass" });
    const rose = screen.getByRole("img", { name: /compass rose with north at the top, east on the right/ });
    expect([...rose.querySelectorAll("text")].map((t) => t.textContent)).toEqual(["N", "E", "S", "W"]);
  });

  it("rings the marked direction and says so", () => {
    show({ type: "compass", mark: "S" });
    const rose = screen.getByRole("img");
    expect(rose.getAttribute("aria-label")).toContain("south is ringed");
    expect(rose.querySelectorAll("circle")).toHaveLength(2);
  });

  it("puts a picture at a direction and one in the middle", () => {
    show({ type: "compass", center: "🧍", around: [{ at: "E", emoji: "☀️" }] });
    const rose = screen.getByRole("img");
    expect(rose.getAttribute("aria-label")).toContain("🧍 in the middle");
    expect(rose.getAttribute("aria-label")).toContain("☀️ to the east");
    expect(rose).toHaveTextContent("☀️");
    expect(rose).toHaveTextContent("🧍");
  });
});
