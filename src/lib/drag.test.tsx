// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDrag } from "./drag";

function Demo({ onDrop, onClick, enabled = true }: { onDrop: (id: string, target: string) => void; onClick: () => void; enabled?: boolean }) {
  const drag = useDrag((id, target) => onDrop(id, target), enabled);
  return (
    <div>
      <button type="button" data-testid="item" onClick={onClick} {...drag("a")}>
        item
      </button>
      <div data-testid="target" data-drop="bin" />
    </div>
  );
}

const move = (x: number, y: number) => act(() => void window.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientX: x, clientY: y })));
const up = (x: number, y: number) => act(() => void window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1, clientX: x, clientY: y })));

afterEach(() => {
  // @ts-expect-error jsdom has no elementFromPoint; the tests add one
  delete document.elementFromPoint;
});

describe("useDrag", () => {
  it("drops an item on the target under the pointer and does not also click it", () => {
    const onDrop = vi.fn();
    const onClick = vi.fn();
    render(<Demo onDrop={onDrop} onClick={onClick} />);
    document.elementFromPoint = () => screen.getByTestId("target");
    fireEvent.pointerDown(screen.getByTestId("item"), { pointerId: 1, isPrimary: true, clientX: 5, clientY: 5 });
    move(40, 40);
    // A copy of the item follows the finger while dragging.
    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBe(1);
    up(40, 40);
    expect(onDrop).toHaveBeenCalledWith("a", "bin");
    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBe(0);
    fireEvent.click(screen.getByTestId("item"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("a tap (no movement) still clicks and never drops", () => {
    const onDrop = vi.fn();
    const onClick = vi.fn();
    render(<Demo onDrop={onDrop} onClick={onClick} />);
    fireEvent.pointerDown(screen.getByTestId("item"), { pointerId: 1, isPrimary: true, clientX: 5, clientY: 5 });
    up(6, 6);
    fireEvent.click(screen.getByTestId("item"));
    expect(onDrop).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("dropping away from any target does nothing", () => {
    const onDrop = vi.fn();
    render(<Demo onDrop={onDrop} onClick={() => {}} />);
    document.elementFromPoint = () => document.body;
    fireEvent.pointerDown(screen.getByTestId("item"), { pointerId: 1, isPrimary: true, clientX: 5, clientY: 5 });
    move(80, 80);
    up(80, 80);
    expect(onDrop).not.toHaveBeenCalled();
  });

  it("does nothing when switched off", () => {
    const onDrop = vi.fn();
    render(<Demo onDrop={onDrop} onClick={() => {}} enabled={false} />);
    document.elementFromPoint = () => screen.getByTestId("target");
    fireEvent.pointerDown(screen.getByTestId("item"), { pointerId: 1, isPrimary: true, clientX: 5, clientY: 5 });
    move(80, 80);
    up(80, 80);
    expect(onDrop).not.toHaveBeenCalled();
  });

  it("removes the copy when the component goes away mid-drag", () => {
    const { unmount } = render(<Demo onDrop={() => {}} onClick={() => {}} />);
    fireEvent.pointerDown(screen.getByTestId("item"), { pointerId: 1, isPrimary: true, clientX: 5, clientY: 5 });
    move(80, 80);
    unmount();
    expect(document.body.querySelectorAll('[aria-hidden="true"]').length).toBe(0);
  });
});
