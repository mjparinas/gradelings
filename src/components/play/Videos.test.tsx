// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ events: [] as unknown[], plan: "premium" }));
vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ family: { plan: h.plan, trialEndsAt: 0, updatedAt: 0 }, events: h.events }),
  eventsFor: (events: { profileId: string }[], p: { id: string }) => events.filter((e) => e.profileId === p.id),
  useActiveProfile: () => ({ id: "p1", name: "Ava", grade: "3", framework: "ca-bc" }),
  useSubjectGrades: () => ({}),
}));
vi.mock("@/content", () => ({
  getUnitRef: (k: string) => ({ unit: { title: k === "3/math/fractions" ? "Fractions" : "Time" } }),
  practiceUnitRefs: () => [{ key: "3/math/fractions" }, { key: "3/math/time" }],
}));
vi.mock("./lazyScreens", () => ({
  HelpVideoPlayer: ({ video, library, onClose }: { video: { title: string }; library?: boolean; onClose: () => void }) => (
    <button type="button" onClick={onClose}>{`Playing ${video.title} ${library ? "library" : ""}`}</button>
  ),
}));
vi.mock("./Treasures", () => ({ TreasureBack: () => null }));
vi.mock("./MembershipLock", () => ({ MembershipLock: ({ open }: { open: boolean }) => (open ? <div>locked dialog</div> : null) }));

import { Videos } from "./Videos";
import { BandProvider } from "../band";

afterEach(cleanup);
const show = () => render(<BandProvider value="middle"><Videos /></BandProvider>);
const watched = { type: "video", id: "e1", profileId: "p1", t: 1000, unit: "3/math/fractions", video: "fractions-equal-parts", watched: 30, done: true };

describe("Videos", () => {
  it("lists unlocked videos to watch again and the ones still waiting", async () => {
    h.events = [watched];
    h.plan = "premium";
    show();
    expect(screen.getByRole("heading", { name: "Videos you unlocked" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /What a fraction is/ }));
    expect(screen.getByRole("button", { name: /Playing What a fraction is library/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Waiting to be unlocked" })).toBeInTheDocument();
    const locked = screen.getByRole("link", { name: /Time/ });
    expect(locked).toHaveAttribute("href", "#/lesson?scope=3%2Fmath%2Ftime");
  });
  it("says so when nothing is unlocked yet", () => {
    h.events = [];
    show();
    expect(screen.getByText(/No videos yet/)).toBeInTheDocument();
  });
  it("asks for a grown-up on the free plan", async () => {
    h.events = [watched];
    h.plan = "free";
    show();
    expect(screen.queryByRole("heading", { name: "Videos you unlocked" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Ask a grown-up/ }));
    expect(screen.getByText("locked dialog")).toBeInTheDocument();
  });
});
