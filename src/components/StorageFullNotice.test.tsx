// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { reportStorageFull, resetStorageFull } from "@/lib/storageFull";
import { StorageFullNotice } from "./StorageFullNotice";

beforeEach(() => resetStorageFull());

describe("StorageFullNotice", () => {
  it("shows nothing until the device is full", () => {
    render(<StorageFullNotice />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("asks a grown-up to free up space, and can be closed", () => {
    render(<StorageFullNotice />);
    act(() => reportStorageFull());
    expect(screen.getByRole("alert").textContent).toMatch(/out of space/i);
    expect(screen.getByRole("alert").textContent).toMatch(/removing apps, photos or files/i);
    fireEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
