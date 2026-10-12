// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ColumnChart, LevelStacks, LineChart, niceMax, RowBars, StatTile } from "./charts";

describe("StatTile", () => {
  it("shows label, value and optional sub text", () => {
    render(<StatTile label="Minutes" value="42" sub="this week" />);
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("this week")).toBeInTheDocument();
  });

  it("marks the change as up or down", () => {
    const { rerender } = render(<StatTile label="A" value="1" delta={{ text: "5 more", good: true }} />);
    expect(screen.getByText("▲")).toBeInTheDocument();
    rerender(<StatTile label="A" value="1" delta={{ text: "5 fewer", good: false }} />);
    expect(screen.getByText("▼")).toBeInTheDocument();
    expect(screen.getByText(/5 fewer/)).toBeInTheDocument();
  });

  it("omits the change line when there is none", () => {
    render(<StatTile label="A" value="1" />);
    expect(screen.queryByText("▲")).not.toBeInTheDocument();
    expect(screen.queryByText("▼")).not.toBeInTheDocument();
  });
});

describe("ColumnChart", () => {
  const data = [
    { label: "Mon", value: 10 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 25 },
  ];

  it("labels the chart for assistive tech and includes every day in the table view", () => {
    render(<ColumnChart title="Minutes per day" data={data} unit="Minutes" />);
    expect(screen.getByRole("img", { name: "Minutes per day" })).toBeInTheDocument();
    for (const d of data) expect(screen.getAllByText(d.label).length).toBeGreaterThan(0);
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("copes with all-zero data", () => {
    expect(() => render(<ColumnChart title="Empty" data={[{ label: "Mon", value: 0 }]} unit="Minutes" />)).not.toThrow();
  });
});

describe("chart table views and tooltips", () => {
  const toggle = (name: "Table" | "Chart") => fireEvent.click(screen.getByRole("button", { name }));

  it("ColumnChart switches to a table with the axis and unit as headings, and back", () => {
    render(<ColumnChart title="Minutes" xLabel="Month" unit="Revenue" data={[{ label: "Jan", value: 12.4 }, { label: "Feb", value: 3 }]} format={(v) => `$${v.toFixed(2)}`} />);
    toggle("Table");
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Month", "Revenue"]);
    expect(screen.getByRole("row", { name: "Jan $12.40" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    toggle("Chart");
    expect(screen.getByRole("img", { name: "Minutes" })).toBeInTheDocument();
  });

  it("ColumnChart shows a tooltip with the value, unit and detail for a tapped day", () => {
    const { container } = render(<ColumnChart title="Minutes" unit="min" data={[{ label: "Mon", value: 10, detail: "12 questions" }, { label: "Tue", value: 4 }]} />);
    const hit = container.querySelectorAll('rect[fill="transparent"]');
    fireEvent.click(hit[0]);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Mon · 10 min12 questions");
    fireEvent.mouseEnter(hit[1]);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Tue · 4 min");
    fireEvent.mouseLeave(screen.getByRole("img"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("ColumnChart hangs a loss below a zero line", () => {
    const { container } = render(<ColumnChart title="Profit" unit="$" data={[{ label: "Jan", value: 30 }, { label: "Feb", value: -20 }]} />);
    const ticks = [...container.querySelectorAll("text")].map((t) => t.textContent);
    expect(ticks).toEqual(expect.arrayContaining(["-20", "0", "50"]));
    // The negative month is drawn as a bar under the axis, the positive one as a rounded column.
    expect(container.querySelectorAll('rect[fill="#2a78d6"]')).toHaveLength(1);
    expect(container.querySelectorAll('path[fill="#2a78d6"]')).toHaveLength(1);
  });

  it("LineChart's table shows a dash for weeks without enough answers", () => {
    render(<LineChart title="Accuracy" data={[{ label: "Sep 1", value: 0.5 }, { label: "Sep 8", value: null }, { label: "Sep 15", value: 0.9 }]} format={(v) => `${Math.round(v * 100)}%`} />);
    toggle("Table");
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Week of", "Value"]);
    expect(screen.getByRole("row", { name: "Sep 8 –" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: "Sep 15 90%" })).toBeInTheDocument();
  });

  it("LineChart labels the latest value and follows the pointer with a 'Week of' tooltip", () => {
    const data = [{ label: "Sep 1", value: 0.5, detail: "8 questions" }, { label: "Sep 8", value: null }, { label: "Sep 15", value: 0.9 }];
    const { container } = render(<LineChart title="Accuracy" data={data} format={(v) => `${Math.round(v * 100)}%`} />);
    expect(container.querySelector('text[font-weight="700"]')).toHaveTextContent("90%");
    // Two line pieces: the gap week breaks the line.
    expect(container.querySelectorAll('path[stroke="#2a78d6"]')).toHaveLength(2);
    const svg = screen.getByRole("img");
    svg.getBoundingClientRect = () => ({ left: 0, width: 600, top: 0, height: 200, right: 600, bottom: 200, x: 0, y: 0, toJSON: () => ({}) });
    fireEvent.mouseMove(svg, { clientX: 40 });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Week of Sep 1 · 50%8 questions");
    fireEvent.mouseMove(svg, { clientX: 320 });
    // The gap week has no tooltip.
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    fireEvent.mouseMove(svg, { clientX: 9999 });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Sep 15 · 90%");
    fireEvent.mouseLeave(svg);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("LineChart uses a custom x label in the tooltip as is", () => {
    render(<LineChart title="Families" xLabel="Month" max={100} data={[{ label: "May", value: 40 }]} format={String} />);
    const svg = screen.getByRole("img");
    svg.getBoundingClientRect = () => ({ left: 0, width: 600, top: 0, height: 200, right: 600, bottom: 200, x: 0, y: 0, toJSON: () => ({}) });
    fireEvent.mouseMove(svg, { clientX: 100 });
    expect(screen.getByRole("tooltip")).toHaveTextContent(/^May · 40$/);
  });

  it("RowBars shows its empty message, and its table uses the given headings", () => {
    const { unmount } = render(<RowBars title="Subjects" rows={[]} empty="Nothing yet." />);
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument();
    unmount();
    render(<RowBars title="Plans" headers={["Plan", "Families", "Share"]} rows={[{ label: "Yearly", value: 7, note: "70%" }, { label: "Monthly", value: 3, note: "30%" }]} />);
    expect(screen.getByText("7 · 70%")).toBeInTheDocument();
    toggle("Table");
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Plan", "Families", "Share"]);
    expect(screen.getByRole("row", { name: "Monthly 3 30%" })).toBeInTheDocument();
  });

  it("LevelStacks has a legend, a count per level in its table and a tooltip per segment", () => {
    const levels = ["Emerging", "Developing", "Proficient", "Extending"];
    const { container } = render(<LevelStacks title="Proficiency" levels={levels} rows={[{ label: "Math", counts: [0, 1, 2, 0], notStarted: 3 }]} />);
    expect(within(screen.getByRole("list", { name: "Legend" })).getAllByRole("listitem").map((li) => li.textContent)).toEqual([...levels, "Not started"]);
    // Empty levels draw no segment.
    const segments = container.querySelectorAll("span.relative.h-full");
    expect(segments).toHaveLength(3);
    fireEvent.click(segments[0]);
    expect(screen.getByText("Developing: 1 unit")).toBeInTheDocument();
    fireEvent.mouseEnter(segments[1]);
    expect(screen.getByText("Proficient: 2 units")).toBeInTheDocument();
    fireEvent.mouseLeave(segments[1]);
    expect(screen.queryByText(/units?$/)).not.toBeInTheDocument();
    toggle("Table");
    expect(screen.getByRole("row", { name: "Math 0 1 2 0 3" })).toBeInTheDocument();
  });
});

describe("niceMax", () => {
  it("rounds an axis top up to 1, 2, 5 or 10 times a power of ten", () => {
    expect([0, 0.3, 7, 12, 30, 51, 999].map(niceMax)).toEqual([1, 0.5, 10, 20, 50, 100, 1000]);
  });
});
