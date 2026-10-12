// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const NOW = new Date(2026, 9, 12, 10, 0).getTime();
const h = vi.hoisted(() => ({
  family: {} as Record<string, unknown>,
  sessions: 1,
  flag: true,
}));

vi.mock("@/lib/store", () => ({
  useStore: (pick: (s: { family: unknown }) => unknown) => pick({ family: h.family }),
  useActiveProfile: () => ({ id: "p1", name: "Ava" }),
  useDerived: () => ({ totals: { sessions: h.sessions }, days: { "2026-10-12": { sessions: h.sessions } } }),
}));
vi.mock("@/lib/useNow", () => ({ useNow: () => NOW }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => h.flag }));

import { SaveProgress } from "./SaveProgress";

const card = () => screen.queryByRole("region", { name: "For grown-ups" });

beforeEach(() => {
  h.family = { plan: "trial", trialEndsAt: NOW + 20 * 86_400_000, updatedAt: 1 };
  h.sessions = 1;
  h.flag = true;
});

describe("SaveProgress", () => {
  it("asks a grown-up to save progress after the first lesson, through the parent area", () => {
    render(<SaveProgress />);
    expect(card()).toHaveTextContent("Ava's progress is saved on this device only");
    expect(screen.getByRole("link", { name: "Save progress" })).toHaveAttribute("href", "/parents/#/account");
  });

  it("stays away once the family has an account", () => {
    h.family = { ...h.family, account: { email: "p@example.com", familyId: "f" } };
    render(<SaveProgress />);
    expect(card()).toBeNull();
  });

  it("stays away after the first lesson, and when the flag is off", () => {
    h.sessions = 2;
    const { unmount } = render(<SaveProgress />);
    expect(card()).toBeNull();
    unmount();
    h.sessions = 1;
    h.flag = false;
    render(<SaveProgress />);
    expect(card()).toBeNull();
  });
});
