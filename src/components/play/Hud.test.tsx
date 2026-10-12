// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ shop: true, go: vi.fn() }));
vi.mock("@/lib/router", () => ({ go: state.go }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: (key: string) => (key === "shop" ? state.shop : true) }));
vi.mock("../Critter", () => ({ CritterSvg: () => <svg /> }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ name: "Sam", avatar: "otter", colour: "#fff", title: undefined }),
  useDerived: () => ({
    coins: 42,
    trophies: {},
    level: 3,
    levelXp: 10,
    levelNeed: 160,
    activeDays: 0,
    streak: { current: 0, activeToday: false, shields: 0 },
  }),
  useStore: () => () => {},
}));

import { BandProvider } from "../band";
import { Hud } from "./Hud";

describe("Hud coins", () => {
  beforeEach(() => state.go.mockClear());

  it("opens the shop when the coins are tapped", async () => {
    state.shop = true;
    render(<Hud />);
    await userEvent.click(screen.getByRole("button", { name: "42 coins. Open the shop" }));
    expect(state.go).toHaveBeenCalledWith("/shop");
  });

  it("opens the shop from the keyboard", async () => {
    state.shop = true;
    render(<Hud />);
    screen.getByRole("button", { name: "42 coins. Open the shop" }).focus();
    await userEvent.keyboard("{Enter}");
    expect(state.go).toHaveBeenCalledWith("/shop");
  });

  it("is only a counter when the shop is switched off", () => {
    state.shop = false;
    render(<Hud />);
    expect(screen.queryByRole("button", { name: /Open the shop/ })).not.toBeInTheDocument();
    expect(screen.getByLabelText("42 coins")).toBeInTheDocument();
  });
});

describe("Hud level", () => {
  it("shows the XP numbers to older kids, and only the level ring to little kids", () => {
    const first = render(<Hud />);
    expect(screen.getByText(/10\/160/)).toBeInTheDocument();
    first.unmount();
    render(
      <BandProvider value="little">
        <Hud />
      </BandProvider>,
    );
    expect(screen.getByLabelText("Level 3")).toBeInTheDocument();
    expect(screen.queryByText(/10\/160/)).not.toBeInTheDocument();
  });
});
