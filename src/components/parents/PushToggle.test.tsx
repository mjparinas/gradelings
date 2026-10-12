// @vitest-environment jsdom
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PushState } from "@/lib/push";

const h = vi.hoisted(() => ({ supported: true, state: vi.fn(), enable: vi.fn(), disable: vi.fn() }));
vi.mock("@/lib/push", () => ({ pushSupported: () => h.supported, pushState: h.state, enablePush: h.enable, disablePush: h.disable }));

import { PushToggle } from "./PushToggle";

const state = (over: Partial<PushState> = {}): PushState => ({ available: true, on: false, blocked: false, ...over });

beforeEach(() => {
  h.supported = true;
  h.state.mockReset().mockResolvedValue(state());
  h.enable.mockReset().mockResolvedValue(undefined);
  h.disable.mockReset().mockResolvedValue(undefined);
});

const toggle = () => screen.findByRole("switch", { name: /Weekly report notification/ });

describe("PushToggle", () => {
  it("is hidden where the browser can't do push, without asking the server", async () => {
    h.supported = false;
    const { container } = render(<PushToggle />);
    await act(async () => {});
    expect(container).toBeEmptyDOMElement();
    expect(h.state).not.toHaveBeenCalled();
  });

  it("is hidden when the server has no notification keys, or the check fails", async () => {
    h.state.mockResolvedValueOnce(state({ available: false }));
    const first = render(<PushToggle />);
    await act(async () => {});
    expect(first.container).toBeEmptyDOMElement();
    first.unmount();
    h.state.mockRejectedValueOnce(new Error("offline"));
    const second = render(<PushToggle />);
    await act(async () => {});
    expect(second.container).toBeEmptyDOMElement();
  });

  it("promises the notification never includes a child's name or results", async () => {
    render(<PushToggle />);
    expect(await toggle()).toHaveTextContent("It never includes a child's name or results.");
  });

  it("turns notifications on, then off, reading the state back each time", async () => {
    render(<PushToggle />);
    const sw = await toggle();
    expect(sw).toHaveAttribute("aria-checked", "false");
    h.state.mockResolvedValueOnce(state({ on: true }));
    await userEvent.click(sw);
    await waitFor(() => expect(sw).toHaveAttribute("aria-checked", "true"));
    expect(h.enable).toHaveBeenCalledTimes(1);
    h.state.mockResolvedValueOnce(state({ on: false }));
    await userEvent.click(sw);
    await waitFor(() => expect(sw).toHaveAttribute("aria-checked", "false"));
    expect(h.disable).toHaveBeenCalledTimes(1);
  });

  it("shows why turning it on failed", async () => {
    h.enable.mockRejectedValueOnce(new Error("Notifications are blocked."));
    render(<PushToggle />);
    await userEvent.click(await toggle());
    expect(await screen.findByRole("alert")).toHaveTextContent("Notifications are blocked.");
    expect(await toggle()).toBeEnabled();
  });

  it("can't be switched when the browser blocks notifications for the site", async () => {
    h.state.mockResolvedValue(state({ blocked: true }));
    render(<PushToggle />);
    const sw = await toggle();
    expect(sw).toBeDisabled();
    expect(sw).toHaveTextContent("Blocked in your browser settings for this site.");
  });
});
