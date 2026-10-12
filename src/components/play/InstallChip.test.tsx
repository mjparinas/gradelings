// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { InstallKind } from "@/lib/install";

const h = vi.hoisted(() => ({
  kind: null as InstallKind,
  listeners: [] as (() => void)[],
  prompt: undefined as undefined | { prompt: () => Promise<void>; userChoice: Promise<unknown> },
  snoozeKids: vi.fn(),
  clearInstallPrompt: vi.fn(),
}));

vi.mock("@/lib/install", () => ({
  installKind: () => h.kind,
  onInstallChange: (fn: () => void) => {
    h.listeners.push(fn);
    return () => {};
  },
  getInstallPrompt: () => h.prompt,
  clearInstallPrompt: h.clearInstallPrompt,
  snoozeKids: h.snoozeKids,
  bookmarkKeys: () => "Ctrl+D",
}));

import { APP_NAME } from "@/lib/brand";
import { InstallChip } from "./InstallChip";

const click = (name: string) => fireEvent.click(screen.getByRole("button", { name }));
const chip = () => screen.queryByRole("region", { name: `Put ${APP_NAME} on your home screen` });

beforeEach(() => {
  vi.clearAllMocks();
  h.kind = null;
  h.listeners = [];
  h.prompt = undefined;
});

describe("InstallChip", () => {
  it("stays hidden where the app can't be added or is already installed", () => {
    render(<InstallChip little={false} />);
    expect(chip()).toBeNull();
  });

  it("appears when the browser becomes ready to install", () => {
    render(<InstallChip little={false} />);
    h.kind = "prompt";
    act(() => h.listeners.forEach((fn) => fn()));
    expect(chip()).toHaveTextContent(`Put ${APP_NAME} on your home screen`);
  });

  it("uses the browser's install prompt, then forgets it", async () => {
    h.kind = "prompt";
    const prompt = vi.fn().mockResolvedValue(undefined);
    h.prompt = {
      prompt,
      // The child closes the browser's dialog.
      get userChoice() {
        return Promise.reject(new Error("dismissed"));
      },
    };
    render(<InstallChip little />);
    expect(screen.getByText("Put me on your screen!")).toBeInTheDocument();
    await act(async () => void fireEvent.click(screen.getByRole("button", { name: "Add" })));
    expect(prompt).toHaveBeenCalled();
    expect(h.clearInstallPrompt).toHaveBeenCalled();
  });

  it("does nothing if the prompt has gone", async () => {
    h.kind = "prompt";
    render(<InstallChip little={false} />);
    await act(async () => void fireEvent.click(screen.getByRole("button", { name: "Add" })));
    expect(h.clearInstallPrompt).not.toHaveBeenCalled();
  });

  it("on an iPhone or iPad, shows the Share > Add to Home Screen steps", () => {
    h.kind = "ios";
    render(<InstallChip little={false} />);
    click("Add");
    expect(screen.getByRole("dialog", { name: "Add to Home Screen" })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Got it" }).at(-1)!);
    expect(h.snoozeKids).toHaveBeenCalled();
    expect(chip()).toBeNull();
  });

  it("where installing isn't possible, suggests a bookmark", () => {
    h.kind = "bookmark";
    render(<InstallChip little={false} />);
    expect(screen.getByText("Save this page!")).toBeInTheDocument();
    expect(screen.getByText(/Press Ctrl\+D/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
    click("Got it");
    expect(h.snoozeKids).toHaveBeenCalled();
    expect(chip()).toBeNull();
  });

  it('"Not now" snoozes it', () => {
    h.kind = "prompt";
    render(<InstallChip little={false} />);
    click("Not now");
    expect(h.snoozeKids).toHaveBeenCalled();
    expect(chip()).toBeNull();
  });
});
