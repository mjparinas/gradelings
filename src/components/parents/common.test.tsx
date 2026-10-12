// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Profile } from "@/lib/model";

const profiles = vi.hoisted(() => ({ list: [] as unknown[] }));
vi.mock("@/lib/store", () => ({ useProfiles: () => profiles.list }));
vi.mock("../Critter", () => ({ CritterSvg: () => <svg data-testid="critter" /> }));

import { CheckBox, ChildTabs, Choice, NoChildren, PageTitle, Slider, Switch } from "./common";

const kid = (id: string, name: string, grade: number) => ({ id, name, grade, avatar: "otter", colour: "#fff" }) as unknown as Profile;

describe("parent common pieces", () => {
  it("PageTitle shows the title, optional sub line and action", () => {
    render(<PageTitle title="Reports" sub="Last 7 days" action={<button>Print</button>} />);
    expect(screen.getByRole("heading", { name: "Reports" })).toBeInTheDocument();
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Print" })).toBeInTheDocument();
  });

  it("NoChildren links to the Children page", () => {
    render(<NoChildren />);
    expect(screen.getByRole("link", { name: "Add a child" })).toHaveAttribute("href", "#/children");
  });

  describe("ChildTabs", () => {
    it("is hidden for a single child", () => {
      profiles.list = [kid("a", "Ava", 2)];
      const { container } = render(<ChildTabs base="reports" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("lists each child, links by id and marks the current one", () => {
      profiles.list = [kid("a", "Ava", 2), kid("b", "Ben", 4)];
      render(<ChildTabs base="reports" current={profiles.list[1] as Profile} />);
      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(2);
      expect(tabs[0]).toHaveAttribute("href", "#/reports/a");
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
      expect(tabs[1]).toHaveAttribute("href", "#/reports/b");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });
  });
});

describe("parent form controls", () => {
  const rect = { left: 100, width: 200, top: 0, height: 44, right: 300, bottom: 44, x: 100, y: 0, toJSON: () => ({}) };

  it("Slider snaps a tap on the track to the nearest step, inside its range", () => {
    const onChange = vi.fn();
    render(<Slider label="Goal" value={15} min={5} max={60} step={5} unit="min" onChange={onChange} help="Shown on the home screen." />);
    const slider = screen.getByRole("slider", { name: /Goal/ });
    expect(slider).toHaveAttribute("aria-valuetext", "15 min");
    expect(screen.getByText("Shown on the home screen.")).toBeInTheDocument();
    slider.getBoundingClientRect = () => rect;
    let captured = false;
    Object.assign(slider, {
      setPointerCapture: () => (captured = true),
      hasPointerCapture: () => captured,
    });
    fireEvent.pointerDown(slider, { clientX: 200, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith(35);
    fireEvent.pointerMove(slider, { clientX: 500, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith(60);
    fireEvent.pointerMove(slider, { clientX: -50, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it("Slider ignores pointer moves it doesn't own and keys it doesn't use", () => {
    const onChange = vi.fn();
    render(<Slider label="Games" value={1} min={1} max={30} unit="min" onChange={onChange} />);
    const slider = screen.getByRole("slider", { name: /Games/ });
    Object.assign(slider, { hasPointerCapture: () => false });
    fireEvent.pointerMove(slider, { clientX: 50, pointerId: 1 });
    fireEvent.keyDown(slider, { key: "a" });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(slider, { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith(1);
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("Choice marks the chosen option and reports a new one", () => {
    const onChange = vi.fn();
    render(<Choice label="Timers" value="b" options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} onChange={onChange} help="Pick one." />);
    expect(screen.getByRole("radiogroup", { name: "Timers" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(screen.getByRole("radio", { name: "A" }));
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("Switch and CheckBox report the flipped value", () => {
    const onSwitch = vi.fn();
    const onCheck = vi.fn();
    render(
      <>
        <Switch label="Sounds" value={true} onChange={onSwitch} />
        <CheckBox checked={false} onChange={onCheck}>
          Math
        </CheckBox>
      </>,
    );
    fireEvent.click(screen.getByRole("switch", { name: "Sounds" }));
    expect(onSwitch).toHaveBeenCalledWith(false);
    fireEvent.click(screen.getByRole("checkbox", { name: "Math" }));
    expect(onCheck).toHaveBeenCalled();
  });
});
