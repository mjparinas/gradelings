// @vitest-environment jsdom
import { createElement, type ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { back, go, href, parse, ShownRoute, useRoute, useShownHash } from "./router";

describe("hash router", () => {
  it("decodes path parts and parses query values", () => {
    expect(parse("/parents/child%20one/reports?range=30&tab=math")).toEqual({
      path: ["parents", "child one", "reports"],
      query: new URLSearchParams("range=30&tab=math"),
    });
    expect(parse("")).toEqual({ path: [], query: new URLSearchParams() });
  });

  it("builds links while omitting undefined query values", () => {
    expect(href("/play", { mode: "review", grade: 4, unused: undefined })).toBe("#/play?mode=review&grade=4");
    expect(href("/parents")).toBe("#/parents");
  });

  it("navigates by hash or replaces the current location", () => {
    go("/play", { mode: "adventure" });
    expect(window.location.hash).toBe("#/play?mode=adventure");
    const replace = vi.fn();
    vi.stubGlobal("window", { location: { replace } });
    go("/parents", undefined, true);
    expect(replace).toHaveBeenCalledWith("#/parents");
    vi.unstubAllGlobals();
  });

  it("goes back when history is available and otherwise uses the fallback", () => {
    const historyBack = vi.spyOn(window.history, "back").mockImplementation(() => {});
    vi.spyOn(window.history, "length", "get").mockReturnValue(2);
    back("/play");
    expect(historyBack).toHaveBeenCalledOnce();

    vi.spyOn(window.history, "length", "get").mockReturnValue(1);
    go("/parents");
    const previous = window.location.hash;
    back("/play");
    expect(window.location.hash).not.toBe(previous);
  });
});

describe("useRoute", () => {
  const navigate = (hash: string) =>
    act(() => {
      window.location.hash = hash;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

  it("follows the hash, treating an empty one as home, and scrolls each new screen to the top", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "";
    const { result, unmount } = renderHook(() => useRoute());
    expect(result.current.path).toEqual([]);

    navigate("#/unit/math%2Fadd?mode=review");
    expect(result.current.path).toEqual(["unit", "math/add"]);
    expect(result.current.query.get("mode")).toBe("review");
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });

    unmount();
    navigate("#/shop");
    expect(result.current.path).toEqual(["unit", "math/add"]);
    scrollTo.mockRestore();
  });
});

describe("useShownHash", () => {
  const navigate = (hash: string) =>
    act(() => {
      window.location.hash = hash;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
  const nextFrame = () => act(() => new Promise((r) => setTimeout(r, 50)));

  it("keeps the old screen up, pending, until the tap has been painted, then shows the new one", async () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/";
    const { result } = renderHook(() => useShownHash());
    expect(result.current).toEqual({ shown: "/", pending: false });
    navigate("#/trophies");
    expect(result.current).toEqual({ shown: "/", pending: true });
    await nextFrame();
    expect(result.current).toEqual({ shown: "/trophies", pending: false });
  });

  it("draws a screen that was quick last time straight away, with no bar", async () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/";
    const { result } = renderHook(() => useShownHash());
    navigate("#/map");
    await nextFrame();
    navigate("#/");
    await nextFrame();
    // Drawn in well under SLOW_DRAW_MS in a test, so the second visit needs no bar.
    navigate("#/map?from=home");
    expect(result.current).toEqual({ shown: "/map?from=home", pending: false });
  });

  it("goes straight to the latest address when taps come quickly", async () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/";
    const { result } = renderHook(() => useShownHash());
    navigate("#/shop");
    navigate("#/room");
    await nextFrame();
    expect(result.current).toEqual({ shown: "/room", pending: false });
  });

  it("lets a screen still on show read its own address, not the one being drawn next", async () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/start?unit=add";
    const { result } = renderHook(
      () => {
        const { shown } = useShownHash();
        return { shown, inside: useRoute() };
      },
      { wrapper: ({ children }: { children: ReactNode }) => createElement(ShownRoute, { value: "/start?unit=add" }, children) },
    );
    navigate("#/practice/math?unit=add");
    // The switcher sees the new address; a screen inside the provider keeps reading the one it was drawn for.
    expect(result.current.shown).toBe("/start?unit=add");
    expect(result.current.inside.path).toEqual(["start"]);
    await nextFrame();
    expect(result.current.shown).toBe("/practice/math?unit=add");
  });
});
