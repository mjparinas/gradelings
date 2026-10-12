// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { InstallKind } from "@/lib/install";

const h = vi.hoisted(() => ({
  kind: null as InstallKind,
  listeners: [] as (() => void)[],
  prompt: null as null | { prompt: () => Promise<void>; userChoice: Promise<unknown> },
  snooze: vi.fn(),
  clear: vi.fn(),
}));
vi.mock("@/lib/install", () => ({
  installKind: () => h.kind,
  onInstallChange: (fn: () => void) => {
    h.listeners.push(fn);
    return () => (h.listeners = h.listeners.filter((l) => l !== fn));
  },
  getInstallPrompt: () => h.prompt,
  clearInstallPrompt: h.clear,
  snooze: h.snooze,
  bookmarkKeys: () => "Ctrl+D",
}));

import { APP_NAME } from "@/lib/brand";
import { InstallNudge } from "./InstallNudge";

beforeEach(() => {
  h.kind = null;
  h.listeners = [];
  h.prompt = null;
  h.snooze.mockReset();
  h.clear.mockReset();
});

describe("InstallNudge", () => {
  it("shows nothing where the app can't be installed or bookmarked", () => {
    const { container } = render(<InstallNudge />);
    expect(container).toBeEmptyDOMElement();
  });

  it("appears when the browser later offers to install", () => {
    render(<InstallNudge />);
    h.kind = "prompt";
    act(() => h.listeners.forEach((l) => l()));
    expect(screen.getByText(`Add ${APP_NAME} to your home screen`)).toBeInTheDocument();
  });

  it("opens the browser's install prompt and forgets it afterwards", async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    h.kind = "prompt";
    // A dismissed prompt rejects its choice; the nudge must cope with that.
    h.prompt = {
      prompt,
      get userChoice() {
        return Promise.reject(new Error("dismissed"));
      },
    };
    render(<InstallNudge />);
    expect(screen.getByText(/keeps working offline/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Add to Home Screen" }));
    expect(prompt).toHaveBeenCalled();
    expect(h.clear).toHaveBeenCalled();
  });

  it("does nothing when the install prompt has already gone", async () => {
    h.kind = "prompt";
    render(<InstallNudge />);
    await userEvent.click(screen.getByRole("button", { name: "Add to Home Screen" }));
    expect(h.clear).not.toHaveBeenCalled();
  });

  it("gives iPad and iPhone parents the Share steps instead of a button", () => {
    h.kind = "ios";
    render(<InstallNudge />);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Tap the Share button (a square with an arrow pointing up) in Safari.",
      "Scroll down and tap Add to Home Screen.",
      "Tap Add.",
    ]);
    expect(screen.queryByRole("button", { name: "Add to Home Screen" })).not.toBeInTheDocument();
  });

  it("suggests a bookmark on a computer, with the right keys", () => {
    h.kind = "bookmark";
    render(<InstallNudge />);
    expect(screen.getByText(`Bookmark ${APP_NAME}`)).toBeInTheDocument();
    expect(screen.getByText("Ctrl+D")).toBeInTheDocument();
  });

  it("goes quiet when the parent says Not now", async () => {
    h.kind = "ios";
    const { container } = render(<InstallNudge />);
    await userEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(h.snooze).toHaveBeenCalled();
    expect(container).toBeEmptyDOMElement();
  });
});
