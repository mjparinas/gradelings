// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// A fresh module each time, so what one test cached doesn't leak into the next.
async function fresh() {
  vi.resetModules();
  return import("./remoteFlags");
}

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

describe("flags on the device", () => {
  it("use each flag's default before the server answers", async () => {
    const m = await fresh();
    expect(m.isOn("shop")).toBe(true);
  });

  it("fetch with a stable device id, keep the answer offline, and re-render users", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ flags: { shop: false }, variants: { "home-colours": "bright" } })));
    vi.stubGlobal("fetch", fetchMock);
    const m = await fresh();
    function Probe() {
      return <p>{`${m.useFlag("shop")}:${m.useVariant("home-colours")}:${m.useVariant("missing")}`}</p>;
    }
    render(<Probe />);
    expect(screen.getByText("true:null:null")).toBeInTheDocument();
    await act(() => m.refreshFlags());
    expect(screen.getByText("false:bright:null")).toBeInTheDocument();
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toMatch(/^\/api\/flags\/\?d=[0-9a-f]{24}$/);
    expect(m.deviceId()).toBe(url.split("=")[1]);

    // Offline: the last answer stays, including after a reload.
    fetchMock.mockRejectedValueOnce(new TypeError("offline"));
    await m.refreshFlags();
    expect(m.isOn("shop")).toBe(false);
    const again = await fresh();
    expect(again.isOn("shop")).toBe(false);
  });

  it("ignore a failed answer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    const m = await fresh();
    await m.refreshFlags();
    expect(m.isOn("arcade")).toBe(true);
  });
});
