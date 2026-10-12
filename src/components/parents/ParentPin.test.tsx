// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The real store runs; the device database is faked.
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));

import { useStore } from "@/lib/store";
import { ParentPin } from "./ParentPin";

beforeEach(() => {
  useStore.setState({ pin: null });
});

describe("ParentPin", () => {
  it("says the PIN belongs to this device", () => {
    render(<ParentPin />);
    expect(screen.getByRole("heading", { name: "🔒 Parent PIN (this device)" })).toBeInTheDocument();
    expect(screen.getByText("The PIN is stored on this device only.")).toBeInTheDocument();
  });

  it("changes the parent PIN: digits only, 4 to 6 of them", async () => {
    render(<ParentPin />);
    const box = screen.getByRole("textbox", { name: "New PIN (4–6 digits)" });
    const change = screen.getByRole("button", { name: "Change PIN" });
    fireEvent.change(box, { target: { value: "12a" } });
    expect(box).toHaveValue("12");
    expect(change).toBeDisabled();
    fireEvent.change(box, { target: { value: "12345678" } });
    expect(box).toHaveValue("123456");
    await userEvent.click(change);
    expect(await screen.findByText("Saved ✓")).toBeInTheDocument();
    expect(box).toHaveValue("");
    expect(await useStore.getState().checkPin("123456")).toBe(true);
    expect(await useStore.getState().checkPin("1234")).toBe(false);
    // Typing again hides the old confirmation.
    fireEvent.change(box, { target: { value: "9" } });
    await waitFor(() => expect(screen.queryByText("Saved ✓")).not.toBeInTheDocument());
  });
});
