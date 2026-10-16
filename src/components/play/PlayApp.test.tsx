// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useBand } from "../band";

const h = vi.hoisted(() => ({
  ready: true,
  profiles: [] as { id: string; grade: string; framework: string }[],
  active: undefined as { id: string; grade: string; framework: string } | undefined,
  route: "",
  off: new Set<string>(),
  init: vi.fn(),
  setActive: vi.fn(),
  refreshFlags: vi.fn(),
  startBackgroundSync: vi.fn(),
  prefetchGrades: vi.fn(),
  gate: vi.fn(),
  go: vi.fn(),
  start: null as null | { framework: string; grade?: string; subject?: string; unit?: string },
  card: null as null | { classCode?: string; studentCode: string },
}));

vi.mock("@/lib/router", () => ({
  useRoute: () => {
    const [p, q = ""] = h.route.split("?");
    return { path: p.split("/").filter(Boolean), query: new URLSearchParams(q) };
  },
  go: h.go,
}));
vi.mock("@/content", () => ({
  getCourse: (grade: string, subject: string) => (grade === "3" && subject === "math" ? { grade, subject, units: [{ id: "fractions" }] } : undefined),
}));
vi.mock("@/lib/remoteFlags", () => ({ refreshFlags: h.refreshFlags, useIsOn: () => (k: string) => !h.off.has(k) }));
vi.mock("@/lib/sync", () => ({ startBackgroundSync: h.startBackgroundSync }));
vi.mock("@/lib/useGradeContent", () => ({ prefetchGrades: h.prefetchGrades }));
vi.mock("@/components/VoicePreload", () => ({ VoicePreload: () => null }));
vi.mock("./LiveQuestion", () => ({ useLiveQuestion: () => ({ live: null, offline: false, note: "", answer: () => {} }), LiveQuestionCard: () => null }));
vi.mock("@/lib/store", () => ({
  useReady: () => h.ready,
  useProfiles: () => h.profiles,
  useActiveProfile: () => h.active,
  useStore: Object.assign((select: (s: unknown) => unknown) => select({ family: {} }), {
    getState: () => ({ init: h.init, setActive: h.setActive }),
  }),
}));
vi.mock("../ContentGate", () => ({
  ContentGate: (props: { children: React.ReactNode; targets: unknown; onSwitch?: () => void }) => {
    h.gate(props);
    return <>{props.children}</>;
  },
}));
vi.mock("../ui", () => ({ LoadingScreen: () => <p>Getting ready…</p> }));
// Every screen is a stand-in that names itself and the props that pick what it shows.
const screenStub = vi.hoisted(() => (name: string) => {
  const Stub = (props: Record<string, unknown>) => {
    const Band = () => <>{useBand()}</>;
    return (
      <p data-testid="screen">
        {name}
        {Object.entries(props)
          .map(([k, v]) => ` ${k}=${String(v)}`)
          .join("")}{" "}
        band=<Band />
      </p>
    );
  };
  Stub.displayName = name;
  return Stub;
});
vi.mock("./Arcade", () => ({ Arcade: screenStub("Arcade"), GameScreen: screenStub("GameScreen") }));
vi.mock("./Hub", () => ({ Hub: screenStub("Hub") }));
vi.mock("./Practice", () => ({ SpeedPicker: screenStub("SpeedPicker"), SubjectPicker: screenStub("SubjectPicker"), UnitList: screenStub("UnitList") }));
vi.mock("./PlacementTest", () => ({ PlacementTest: screenStub("PlacementTest") }));
vi.mock("./Secrets", () => ({ SecretsListener: () => <p>secrets on</p> }));
vi.mock("./Session", () => ({ Session: screenStub("Session") }));
vi.mock("./Shop", () => ({ Shop: screenStub("Shop") }));
vi.mock("./Start", () => ({
  FirstRun: screenStub("FirstRun"),
  Picker: screenStub("Picker"),
  usePlayStart: () => h.start,
  useClassSignInLink: () => h.card,
  CardSignIn: (props: { codes: { studentCode: string }; onDone: () => void }) => (
    <p data-testid="screen">
      CardSignIn {props.codes.studentCode}
      <button type="button" onClick={props.onDone}>
        done
      </button>
    </p>
  ),
}));
vi.mock("./Toasts", () => ({ Toasts: () => null }));
vi.mock("./ClassTimer", () => ({ ClassTimerChip: () => null }));
vi.mock("./LessonScreen", () => ({ LessonScreen: screenStub("LessonScreen") }));
vi.mock("./StickerBook", () => ({ StickerBook: screenStub("StickerBook") }));
vi.mock("./Room", () => ({ Room: screenStub("Room") }));
vi.mock("./TrailMap", () => ({ TrailMap: screenStub("TrailMap") }));
vi.mock("./Trophies", () => ({ TrophyRoom: screenStub("TrophyRoom") }));
vi.mock("./Treasures", () => ({ Treasures: screenStub("Treasures") }));

import { PlayApp } from "./PlayApp";

const ava = { id: "a", grade: "3", framework: "ca-bc" };
const shown = () => screen.getByTestId("screen").textContent;

beforeEach(() => {
  vi.clearAllMocks();
  h.ready = true;
  h.profiles = [ava];
  h.active = ava;
  h.route = "";
  h.off = new Set();
  h.init.mockResolvedValue(undefined);
  h.start = null;
});

describe("a link from a public page", () => {
  it("opens the subject's lessons with the unit when the child follows that curriculum and grade", () => {
    h.route = "/start";
    h.start = { framework: "ca-bc", grade: "3", subject: "math", unit: "fractions" };
    render(<PlayApp />);
    expect(h.go).toHaveBeenCalledWith("/practice/math", { unit: "fractions" }, true);
  });

  it("drops a unit the course doesn't have but keeps the subject", () => {
    h.route = "/start";
    h.start = { framework: "ca-bc", grade: "3", subject: "math", unit: "nope" };
    render(<PlayApp />);
    expect(h.go).toHaveBeenCalledWith("/practice/math", { unit: undefined }, true);
  });

  it.each([
    ["another grade", { framework: "ca-bc", grade: "5", subject: "math" }],
    ["another curriculum", { framework: "ca-on", grade: "3", subject: "math" }],
    ["no subject", { framework: "ca-bc", grade: "3" }],
  ])("goes home for %s", (_, start) => {
    h.route = "/start";
    h.start = start;
    render(<PlayApp />);
    expect(h.go).toHaveBeenCalledWith("/", undefined, true);
  });
});

describe("a class login card scanned on a device that already has players", () => {
  beforeEach(() => {
    h.card = { studentCode: "KM7PQR3XTA" };
    h.profiles = [ava];
    h.active = ava;
  });
  afterEach(() => {
    h.card = null;
  });

  it("asks before it signs in, and goes back to the player screens when the child says no", () => {
    render(<PlayApp />);
    expect(shown()).toContain("CardSignIn KM7PQR3XTA");
    act(() => screen.getByRole("button", { name: "done" }).click());
    expect(shown()).toContain("Hub");
  });

  it("does nothing on a brand-new device, where the first-run screens already handle the card", () => {
    h.profiles = [];
    h.active = undefined;
    render(<PlayApp />);
    expect(shown()).toContain("FirstRun");
  });

  it("leaves a device alone when the page has no card in its address", () => {
    h.card = null;
    render(<PlayApp />);
    expect(shown()).toContain("Hub");
  });
});

describe("PlayApp start-up", () => {
  it("loads the store, then starts syncing", async () => {
    h.ready = false;
    render(<PlayApp />);
    expect(screen.getByText("Getting ready…")).toBeInTheDocument();
    await act(async () => {});
    expect(h.init).toHaveBeenCalled();
    expect(h.startBackgroundSync).toHaveBeenCalled();
  });

  it("first visit with no children goes to the welcome screens", () => {
    h.profiles = [];
    h.active = undefined;
    render(<PlayApp />);
    expect(shown()).toMatch(/^FirstRun/);
  });

  it("asks who is playing when no child is picked", () => {
    h.active = undefined;
    render(<PlayApp />);
    expect(shown()).toMatch(/^Picker/);
  });

  it("refreshes feature flags on open and whenever the app comes back into view", () => {
    render(<PlayApp />);
    expect(h.refreshFlags).toHaveBeenCalledTimes(1);
    act(() => void document.dispatchEvent(new Event("visibilitychange")));
    expect(h.refreshFlags).toHaveBeenCalledTimes(2);
  });

  it("waits for the active child's grade, and lets a family with several children switch", () => {
    render(<PlayApp />);
    expect(h.gate).toHaveBeenLastCalledWith(expect.objectContaining({ targets: [{ grade: "3", framework: "ca-bc" }], onSwitch: undefined }));
    h.profiles = [ava, { id: "b", grade: "k", framework: "ca-on" }];
    render(<PlayApp />);
    const { onSwitch } = h.gate.mock.calls.at(-1)![0];
    onSwitch();
    expect(h.setActive).toHaveBeenCalledWith(null);
  });

  it("downloads brothers' and sisters' grades for offline use", () => {
    h.profiles = [ava, { id: "b", grade: "k", framework: "ca-on" }, { id: "c", grade: "3", framework: "ca-bc" }];
    render(<PlayApp />);
    expect(h.prefetchGrades).toHaveBeenCalledWith([
      { framework: "ca-bc", grade: "3" },
      { framework: "ca-on", grade: "k" },
    ]);
  });

  it("sets the age band from the grade", () => {
    h.active = { id: "k", grade: "k", framework: "ca-bc" };
    render(<PlayApp />);
    expect(shown()).toContain("band=little");
    expect(document.querySelector("[data-band='little']")).not.toBeNull();
  });

  it("only listens for secrets when the flag is on", () => {
    const { unmount } = render(<PlayApp />);
    expect(screen.getByText("secrets on")).toBeInTheDocument();
    unmount();
    h.off = new Set(["secrets"]);
    render(<PlayApp />);
    expect(screen.queryByText("secrets on")).not.toBeInTheDocument();
  });
});

describe("PlayApp routes", () => {
  it.each([
    ["", "Hub"],
    ["practice", "SubjectPicker"],
    ["practice/math", "UnitList subject=math"],
    ["lesson?scope=3/math/add", "LessonScreen unitKey=3/math/add"],
    ["map", "TrailMap"],
    ["treasures", "Treasures"],
    ["stickers", "StickerBook"],
    ["room", "Room"],
    ["speed", "SpeedPicker"],
    ["session?mode=review", "Session mode=review scope=mix"],
    ["session?mode=practice&scope=3/math/add", "Session mode=practice scope=3/math/add"],
    ["placement/math", "PlacementTest subject=math"],
    ["arcade", "Arcade"],
    ["arcade/ninja", "GameScreen id=ninja"],
    ["trophies", "TrophyRoom"],
    ["shop", "Shop"],
    ["nowhere", "Hub"],
  ])("#/%s shows %s", (route, expected) => {
    h.route = route;
    render(<PlayApp />);
    expect(shown()).toMatch(new RegExp(`^${expected.replace(/[/?]/g, "\\$&")} band=middle$`));
  });

  it("an unknown session mode or placement subject goes home", () => {
    h.route = "session?mode=cheat";
    const { unmount } = render(<PlayApp />);
    expect(shown()).toMatch(/^Hub/);
    unmount();
    h.route = "placement/science";
    render(<PlayApp />);
    expect(shown()).toMatch(/^Hub/);
  });

  it.each([
    ["stickers", "sticker-book"],
    ["room", "my-room"],
    ["speed", "speed-run"],
    ["arcade/memory", "arcade"],
    ["shop", "shop"],
    ["session?mode=daily", "daily-challenge"],
    ["session?mode=speed&scope=mix", "speed-run"],
  ])("#/%s shows the home screen when %s is switched off", (route, flag) => {
    h.route = route;
    h.off = new Set([flag]);
    render(<PlayApp />);
    expect(shown()).toMatch(/^Hub/);
  });
});
