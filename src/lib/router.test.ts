// @vitest-environment jsdom
import { act, render, renderHook } from "@testing-library/react";
import { createElement, Suspense, use } from "react";
import { describe, expect, it, vi } from "vitest";
import { back, go, href, parse, useRoute, useShownHash } from "./router";

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

  it("moves to the new address once it is drawn, and isn't pending once there", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/";
    const { result } = renderHook(() => useShownHash());
    expect(result.current).toEqual({ shown: "/", pending: false });
    navigate("#/trophies");
    expect(result.current).toEqual({ shown: "/trophies", pending: false });
  });

  it("keeps the old screen up, pending, while the next one is still on its way", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.location.hash = "#/";
    const never = new Promise<never>(() => {});
    function Screen({ hash }: { hash: string }) {
      if (hash === "/slow") use(never);
      return createElement("p", null, `screen ${hash}`);
    }
    function App() {
      const { shown, pending } = useShownHash();
      return createElement("div", { "data-pending": pending }, createElement(Suspense, { fallback: "loading" }, createElement(Screen, { hash: shown })));
    }
    const { container } = render(createElement(App));
    navigate("#/slow");
    // No loading view: the home screen stays, marked pending.
    expect(container.textContent).toBe("screen /");
    expect(container.firstElementChild).toHaveAttribute("data-pending", "true");
  });
});
