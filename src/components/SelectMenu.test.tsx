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
});
