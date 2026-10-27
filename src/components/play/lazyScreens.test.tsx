// @vitest-environment jsdom
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/router", () => ({ go: vi.fn() }));
vi.mock("@/lib/offline", () => ({ cacheLoadedScripts: vi.fn() }));

import { go } from "@/lib/router";
import { LazyScreen, lazyScreen } from "./lazyScreens";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const Hello = ({ who }: { who: string }) => <p>Hello {who}</p>;

describe("lazy screens", () => {
  it("shows the loading view until the screen arrives, then the screen with its props", async () => {
    const d = deferred<typeof Hello>();
    const Screen = lazyScreen(() => d.promise);
    await act(async () => {
      render(
        <LazyScreen name="hello">
          <Screen who="Maya" />
        </LazyScreen>,
      );
    });
    expect(screen.getByRole("status", { name: "Loading" })).toHaveTextContent("One moment");
    await act(async () => d.resolve(Hello));
    expect(await screen.findByText("Hello Maya")).toBeInTheDocument();
    expect(screen.queryByRole("status", { name: "Loading" })).not.toBeInTheDocument();
  });

  it("downloads a screen once, however often it is drawn", async () => {
    const load = vi.fn(async () => Hello);
    const Screen = lazyScreen(load);
    let rerender!: ReturnType<typeof render>["rerender"];
    await act(async () => {
      ({ rerender } = render(
        <LazyScreen name="a">
          <Screen who="A" />
        </LazyScreen>,
      ));
    });
    expect(await screen.findByText("Hello A")).toBeInTheDocument();
    await act(async () =>
      rerender(
        <LazyScreen name="b">
          <Screen who="B" />
        </LazyScreen>,
      ),
    );
    expect(screen.getByText("Hello B")).toBeInTheDocument();
    expect(load).toHaveBeenCalledTimes(1);
  });

  it("offers Try again when the download fails offline, and a retry downloads it again", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const load = vi.fn<() => Promise<typeof Hello>>().mockRejectedValueOnce(new Error("offline")).mockResolvedValue(Hello);
    const Screen = lazyScreen(load);
    await act(async () => {
      render(
        <LazyScreen name="hello">
          <Screen who="again" />
        </LazyScreen>,
      );
    });
    expect(await screen.findByRole("heading", { name: "We need the internet for a moment" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Go home" }));
    expect(go).toHaveBeenCalledWith("/");
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Try again" })));
    expect(await screen.findByText("Hello again")).toBeInTheDocument();
    expect(load).toHaveBeenCalledTimes(2);
  });
});
