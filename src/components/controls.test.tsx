// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateField } from "./DateField";
import { Disclosure } from "./Disclosure";
import { CheckBox, Slider } from "./parents/common";

describe("DateField", () => {
  it("picks a day and can clear it", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<DateField label="Due date" value="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Due date" }));
    const calendar = screen.getByRole("dialog", { name: "Due date" });
    expect(calendar).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /^15 / }));
    const picked = onChange.mock.calls.at(-1)?.[0] as string;
    expect(picked).toMatch(/^\d{4}-\d{2}-15$/);

    rerender(<DateField label="Due date" value={picked} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Due date" }));
    await userEvent.click(screen.getByRole("button", { name: "Clear date" }));
    expect(onChange).toHaveBeenLastCalledWith("");
  });
});

describe("Slider", () => {
  it("moves with the arrow keys and Home and End", async () => {
    const onChange = vi.fn();
    render(<Slider label="Minutes" value={10} min={5} max={20} step={5} unit="min" onChange={onChange} />);
    const slider = screen.getByRole("slider", { name: /Minutes/ });
    expect(slider).toHaveAttribute("aria-valuenow", "10");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(15);
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenCalledWith(5);
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenCalledWith(20);
  });
});

describe("CheckBox", () => {
  it("toggles when pressed", async () => {
    const onChange = vi.fn();
    render(<CheckBox checked={false} onChange={onChange}>Math</CheckBox>);
    const box = screen.getByRole("checkbox", { name: "Math" });
    expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe("Disclosure", () => {
  it("keeps the answer in the page and shows it when opened", async () => {
    render(<Disclosure title="How does it work?">Practice at home.</Disclosure>);
    const button = screen.getByRole("button", { name: "How does it work?" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    const panel = document.getElementById(button.getAttribute("aria-controls")!);
    expect(panel).toHaveAttribute("hidden");
    expect(panel).toHaveTextContent("Practice at home.");

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("starts open when asked", () => {
    render(<Disclosure title="Units" open>The table</Disclosure>);
    expect(screen.getByRole("button", { name: "Units" })).toHaveAttribute("aria-expanded", "true");
  });
});
