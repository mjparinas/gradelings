// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgeBand } from "@/content/types";
import { BandProvider } from "../band";

const h = vi.hoisted(() => ({ off: new Set<string>(), go: vi.fn() }));
vi.mock("@/lib/router", () => ({ go: h.go }));
vi.mock("@/lib/remoteFlags", () => ({ useIsOn: () => (key: string) => !h.off.has(key) }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1", name: "Leo", grade: "k", framework: "ca-bc" }),
  useDerived: () => ({ coins: 120, trophies: { "first-steps": 1, "streak-3": 2 } }),
}));

vi.mock("./FamilyCards", () => ({ RewardCard: () => <div data-testid="reward-card" /> }));

import { TreasureBack, Treasures } from "./Treasures";

const inBand = (band: AgeBand, ui: React.ReactElement) => render(<BandProvider value={band}>{ui}</BandProvider>);

beforeEach(() => {
  h.off = new Set();
  h.go.mockClear();
});

describe("Treasures", () => {
  it("opens every collection screen from one place, with trophy and coin counts", () => {
    inBand("little", <Treasures />);
    expect(screen.getByRole("heading", { name: /My Treasures/ })).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["#/stickers", "#/trophies", "#/room", "#/shop", "#/map"]);
    expect(screen.getByRole("link", { name: /Trophies/ })).toHaveTextContent("2");
    expect(screen.getByRole("link", { name: /Shop/ })).toHaveTextContent("🪙 120");
  });

  it("shows a promised reward below the chest", () => {
    inBand("little", <Treasures />);
    expect(screen.getByTestId("reward-card")).toBeInTheDocument();
  });

  it("leaves out the screens the admin switched off", () => {
    h.off = new Set(["sticker-book", "my-room", "shop"]);
    inBand("little", <Treasures />);
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["#/trophies", "#/map"]);
  });

  it("goes back home from the chest", () => {
    inBand("little", <Treasures />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenCalledWith("/");
  });
});

describe("TreasureBack", () => {
  it("takes little kids back to the chest and older kids home", () => {
    const first = inBand("little", <TreasureBack />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenLastCalledWith("/treasures");
    first.unmount();
    inBand("big", <TreasureBack />);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(h.go).toHaveBeenLastCalledWith("/");
  });
});
