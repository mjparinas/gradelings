// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectMenu } from "./SelectMenu";

const options = [
  { value: "bc", label: "British Columbia" },
  { value: "ab", label: "Alberta", disabled: true },
  { value: "on", label: "Ontario" },
];

describe("SelectMenu", () => {
  it("picks an option and closes", async () => {
    const onChange = vi.fn();
    render(<SelectMenu label="Province" value="bc" onChange={onChange} options={options} />);
    const box = screen.getByRole("combobox", { name: "Province" });
    expect(box).toHaveAttribute("aria-expanded", "false");
    expect(box).toHaveTextContent("British Columbia");

    await userEvent.click(box);
    const list = screen.getByRole("listbox", { name: "Province" });
    expect(within(list).getByRole("option", { name: "British Columbia" })).toHaveAttribute("aria-selected", "true");
    expect(within(list).getByRole("option", { name: "Alberta" })).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(within(list).getByRole("option", { name: "Ontario" }));
    expect(onChange).toHaveBeenCalledWith("on");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(box).toHaveFocus();
  });

  it("skips a disabled option with the arrow keys", async () => {
    const onChange = vi.fn();
    render(<SelectMenu label="Province" value="bc" onChange={onChange} options={options} />);
    screen.getByRole("combobox", { name: "Province" }).focus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("on");
  });

  it("shows grouped options and ignores a disabled one", async () => {
    const onChange = vi.fn();
    render(
      <SelectMenu
        label="Add a unit"
        value=""
        onChange={onChange}
        options={[{ value: "", label: "Choose a unit…" }]}
        groups={[{
          label: "Math",
          options: [
            { value: "counting", label: "Counting", disabled: true },
            { value: "patterns", label: "Patterns" },
          ],
        }]}
      />,
    );
    await userEvent.click(screen.getByRole("combobox", { name: "Add a unit" }));
    const list = screen.getByRole("listbox", { name: "Add a unit" });
    expect(within(list).getByRole("group", { name: "Math" })).toBeInTheDocument();
    await userEvent.click(within(list).getByRole("option", { name: "Counting" }));
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.click(within(list).getByRole("option", { name: "Patterns" }));
    expect(onChange).toHaveBeenCalledWith("patterns");
  });

  it("closes on Escape and on a click outside", async () => {
    const onChange = vi.fn();
    render(
      <div>
        <SelectMenu label="Province" value="bc" onChange={onChange} options={options} />
        <button type="button">Elsewhere</button>
      </div>,
    );
    const box = screen.getByRole("combobox", { name: "Province" });
    await userEvent.click(box);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.click(box);
    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("jumps with Home and End, past disabled options, and moves back with ArrowUp", async () => {
    const onChange = vi.fn();
    const many = [
      { value: "x", label: "Excluded", disabled: true },
      { value: "bc", label: "British Columbia" },
      { value: "on", label: "Ontario" },
      { value: "z", label: "Zzz", disabled: true },
    ];
    render(<SelectMenu label="Province" value="on" onChange={onChange} options={many} />);
    const box = screen.getByRole("combobox", { name: "Province" });
    box.focus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("on");

    await userEvent.keyboard("{Home}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("bc");

    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}{ArrowUp}{ArrowUp} ");
    // Opened on Ontario, then up to British Columbia; it can't go further up onto a disabled option.
    expect(onChange).toHaveBeenLastCalledWith("bc");
  });

  it("finds options by typing their first letters", async () => {
    const onChange = vi.fn();
    const many = [
      { value: "ab", label: "Alberta" },
      { value: "bc", label: "British Columbia" },
      { value: "mb", label: "Manitoba" },
      { value: "nb", label: "New Brunswick" },
      { value: "nl", label: "Newfoundland and Labrador" },
      { value: "ns", label: "Nova Scotia" },
    ];
    render(<SelectMenu label="Province" value="ab" onChange={onChange} options={many} />);
    const box = screen.getByRole("combobox", { name: "Province" });
    box.focus();
    // Typing opens the list on the first match.
    await userEvent.keyboard("m");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("mb");

    // Letters typed together narrow the match.
    await userEvent.keyboard("newf{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("nl");
  });

  it("cycles through options that share a first letter, and ignores letters that match nothing", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const onChange = vi.fn();
      const many = [
        { value: "nb", label: "New Brunswick" },
        { value: "nl", label: "Newfoundland and Labrador" },
        { value: "ns", label: "Nova Scotia" },
      ];
      render(<SelectMenu label="Province" value="nb" onChange={onChange} options={many} />);
      screen.getByRole("combobox", { name: "Province" }).focus();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      await user.keyboard("q");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      await user.keyboard("n");
      vi.advanceTimersByTime(600);
      await user.keyboard("n");
      vi.advanceTimersByTime(600);
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenLastCalledWith("nl");
    } finally {
      vi.useRealTimers();
    }
  });

  it("opens upward when there is no room below", async () => {
    render(<SelectMenu label="Province" value="bc" onChange={vi.fn()} options={options} size="lg" block={false} />);
    const box = screen.getByRole("combobox", { name: "Province" });
    vi.spyOn(box, "getBoundingClientRect").mockReturnValue({ top: 700, bottom: 744, left: 0, right: 200, width: 200, height: 44, x: 0, y: 700, toJSON: () => ({}) });
    const height = window.innerHeight;
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
    try {
      await userEvent.click(box);
      const list = screen.getByRole("listbox");
      expect(list).toHaveClass("bottom-full");
      expect(list.style.maxHeight).toBe("320px");
    } finally {
      Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
    }
  });

  it("leaves modified keys alone and closes when focus leaves", async () => {
    const onChange = vi.fn();
    render(
      <div>
        <SelectMenu label="Province" value="bc" onChange={onChange} options={options} />
        <button type="button">Next field</button>
      </div>,
    );
    const box = screen.getByRole("combobox", { name: "Province" });
    box.focus();
    await userEvent.keyboard("{Control>}o{/Control}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
