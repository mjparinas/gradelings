// @vitest-environment jsdom
import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GROWTH_STAGES } from "@/lib/buddy";
import { SHOP } from "@/lib/shop";
import { AVATARS, CRITTERS, Critter, CritterSvg, SpeechBubble, getCritter, type Mood } from "./Critter";

const svgOf = (props: { id: string; mood?: Mood; stage?: number }) => render(<CritterSvg {...props} />).container.querySelector("svg")!;

// Each buddy stage's accessory, by the colour that only it uses.
const CAPE = 'path[fill="#c43a7c"]';
const BOW_TIE = 'path[fill="#e9559a"][stroke="#c43a7c"]';
const MEDAL = 'circle[r="10"][fill="#f0bd2a"]';
const CROWN = 'path[fill="#f0bd2a"][stroke="#b88905"]';

afterEach(() => vi.restoreAllMocks());

describe("getCritter", () => {
  it("finds a critter by id and falls back to Ollie the guide", () => {
    expect(getCritter("hoot").species).toBe("owl");
    expect(getCritter("nobody").id).toBe("ollie");
    expect(getCritter(undefined).id).toBe("ollie");
  });

  it("gives every critter a unique id and name", () => {
    expect(new Set(CRITTERS.map((c) => c.id)).size).toBe(CRITTERS.length);
    expect(new Set(CRITTERS.map((c) => c.name)).size).toBe(CRITTERS.length);
  });

  it("sells every critter as a buddy, and offers only the non-shop ones as avatars", () => {
    const buddies = SHOP.filter((i) => i.kind === "companion").map((i) => i.critter);
    expect(buddies.sort()).toEqual(CRITTERS.map((c) => c.id).sort());
    expect(AVATARS.map((c) => c.id)).toEqual(CRITTERS.filter((c) => !c.shopOnly).map((c) => c.id));
    expect(AVATARS.length).toBe(15);
    expect(CRITTERS.filter((c) => c.shopOnly).length).toBe(15);
  });
});

describe("CritterSvg", () => {
  it("is decorative for screen readers", () => {
    expect(svgOf({ id: "ollie" })).toHaveAttribute("aria-hidden", "true");
  });

  it.each(GROWTH_STAGES.map((s) => [s.name, s.stage] as const))("dresses a %s buddy for its stage", (_, stage) => {
    const svg = svgOf({ id: "ollie", stage });
    expect(!!svg.querySelector(BOW_TIE), "bow tie").toBe(stage >= 2);
    expect(!!svg.querySelector(CAPE), "cape").toBe(stage >= 3);
    expect(!!svg.querySelector(MEDAL), "medal").toBe(stage >= 4);
    expect(!!svg.querySelector(CROWN), "crown").toBe(stage >= 5);
  });

  it("shows sleepy z's only when sleepy and a thought bubble only when thinking", () => {
    // Drawn as lines with no text, so they never join the name of a button the critter sits in.
    const zs = (mood: Mood) => svgOf({ id: "ruby", mood }).querySelectorAll('[data-part="zz"] path').length;
    expect(zs("sleepy")).toBe(2);
    expect(svgOf({ id: "ruby", mood: "sleepy" }).querySelector("text")).toBeNull();
    for (const mood of ["happy", "cheer", "think", "oops", "wave"] as const) expect(zs(mood)).toBe(0);
    expect(svgOf({ id: "ruby", mood: "think" }).querySelectorAll('g[fill="#4f8ef7"] circle')).toHaveLength(2);
    expect(svgOf({ id: "ruby", mood: "happy" }).querySelector('g[fill="#4f8ef7"]')).toBeNull();
  });

  it("closes the eyes to happy arcs when cheering, and blinks otherwise", () => {
    expect(svgOf({ id: "bolt", mood: "cheer" }).querySelector(".animate-blink")).toBeNull();
    expect(svgOf({ id: "bolt", mood: "sleepy" }).querySelector(".animate-blink")).toBeNull();
    expect(svgOf({ id: "bolt", mood: "happy" }).querySelector(".animate-blink")).not.toBeNull();
  });

  it("wiggles only on a miss and waves only when waving", () => {
    expect(svgOf({ id: "juniper", mood: "oops" }).querySelector(".animate-wiggle")).not.toBeNull();
    expect(svgOf({ id: "juniper", mood: "happy" }).querySelector(".animate-wiggle")).toBeNull();
    expect(svgOf({ id: "juniper", mood: "wave" }).querySelector(".animate-wave")).not.toBeNull();
    expect(svgOf({ id: "juniper", mood: "think" }).querySelector(".animate-wave")).toBeNull();
  });

  it("draws each guide's own accessories", () => {
    expect(svgOf({ id: "hoot" }).querySelector('g[stroke="#2b2f45"] circle'), "Hoot's glasses").not.toBeNull();
    expect(svgOf({ id: "bolt" }).querySelector('circle[fill="#9fe3ff"]'), "Bolt's goggles").not.toBeNull();
    expect(svgOf({ id: "juniper" }).querySelector('path[fill="#76a64a"]'), "Juniper's hat").not.toBeNull();
    expect(svgOf({ id: "ruby" }).querySelector('rect[fill="#3b78e0"]'), "Ruby's scarf").not.toBeNull();
    expect(svgOf({ id: "ollie" }).querySelector('path[fill="#ffb4c6"]'), "Ollie's shell").not.toBeNull();
    expect(svgOf({ id: "ollie", mood: "cheer" }).querySelector('path[fill="#ffb4c6"]'), "the shell is put down to cheer").toBeNull();
    expect(svgOf({ id: "nori" }).querySelector('path[fill="#f3ead2"]'), "Nori's horn").not.toBeNull();
    expect(svgOf({ id: "maple" }).querySelector('g[fill="#d9b277"]'), "Maple's antlers").not.toBeNull();
    expect(svgOf({ id: "shelly" }).querySelector('ellipse[fill="#8a6b3a"]'), "Shelly's shell").not.toBeNull();
    expect(svgOf({ id: "rocco" }).querySelector('path[fill="#3b3f46"]'), "Rocco's mask").not.toBeNull();
    expect(svgOf({ id: "poppy" }).querySelector('path[fill="#f7f8fb"]'), "Poppy's white face").not.toBeNull();
  });

  it("draws the shop buddies' own features", () => {
    expect(svgOf({ id: "sunny" }).querySelectorAll('g[fill="#c4622d"] circle').length, "Sunny's mane").toBeGreaterThan(10);
    expect(svgOf({ id: "hazel" }).querySelector('path[fill="#6f4e36"]'), "Hazel's spikes").not.toBeNull();
    expect(svgOf({ id: "ember" }).querySelector('g[fill="#8fd6e8"]'), "Ember's wings").not.toBeNull();
    expect(svgOf({ id: "luna" }).querySelector('path[fill="#ffd45e"]'), "Luna's horn").not.toBeNull();
    expect(svgOf({ id: "pepper" }).querySelector('path[fill="#e0433a"]'), "Pepper's toque").not.toBeNull();
    expect(svgOf({ id: "daisy" }).querySelector('path[fill="#ffffff"]'), "Daisy's stripe").not.toBeNull();
    expect(svgOf({ id: "mochi" }).querySelector('g[stroke="#d7832d"]'), "Mochi's tabby stripes").not.toBeNull();
    expect(svgOf({ id: "biscuit" }).querySelectorAll('g[fill="#a8743f"] path'), "Biscuit's floppy ears").toHaveLength(2);
    expect(svgOf({ id: "petunia" }).querySelectorAll('ellipse[fill="#9b4a5e"]'), "Petunia's nostrils").toHaveLength(2);
    expect(svgOf({ id: "pip" }).querySelectorAll('circle[r="26"]'), "Pip's big ears").toHaveLength(2);
  });

  it("gives whiskers to a cat but not to a dragon or unicorn", () => {
    const whiskers = (id: string) => svgOf({ id }).querySelector('g[stroke="#c9a98a"]');
    expect(whiskers("mochi")).not.toBeNull();
    for (const id of ["ember", "luna", "juniper", "bao", "shelly"]) expect(whiskers(id), id).toBeNull();
  });

  it("gives each nose type its own shape, and a beak opens only to cheer", () => {
    expect(svgOf({ id: "hoot" }).querySelector('path[fill="#ffa83d"]'), "beak").not.toBeNull();
    expect(svgOf({ id: "poppy" }).querySelector('path[fill="#ff7b39"]'), "bill").not.toBeNull();
    expect(svgOf({ id: "maple" }).querySelectorAll('ellipse[rx="4"][ry="5"]'), "snout nostrils").toHaveLength(2);
    expect(svgOf({ id: "hoot", mood: "cheer" }).querySelector('path[fill="#7a2e35"]')).not.toBeNull();
    expect(svgOf({ id: "hoot", mood: "happy" }).querySelector('path[fill="#7a2e35"]')).toBeNull();
  });

  it("draws every ear style and mouth without breaking", () => {
    for (const c of CRITTERS) {
      for (const mood of ["happy", "cheer", "think", "oops", "wave", "sleepy"] as const) {
        const svg = svgOf({ id: c.id, mood });
        expect(svg.querySelector('circle[r="56"]'), `${c.id} ${mood} head`).not.toBeNull();
      }
    }
  });

  it("gives the panda dark ears and eye patches", () => {
    const svg = svgOf({ id: "bao" });
    expect(svg.querySelectorAll('circle[r="17"][fill="#2b2f36"]')).toHaveLength(2);
    expect(svg.querySelectorAll('g[fill="#2b2f36"] ellipse[rx="15"]')).toHaveLength(2);
  });
});

describe("Critter", () => {
  it("sizes the critter and picks the motion for its mood", () => {
    const { container, rerender } = render(<Critter id="hoot" mood="cheer" size={80} className="extra" />);
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.width).toBe("80px");
    expect(box.style.height).toBe("80px");
    expect(box).toHaveClass("animate-cheer", "extra");
    rerender(<Critter id="hoot" mood="oops" />);
    expect(container.firstElementChild).not.toHaveClass("animate-float");
    rerender(<Critter id="hoot" mood="sleepy" />);
    expect(container.firstElementChild).toHaveClass("animate-float");
  });

  it("looks toward the pointer", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    const { container } = render(<Critter size={100} />);
    const box = container.firstElementChild as HTMLElement;
    vi.spyOn(box, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}) });
    act(() => {
      fireEvent.pointerMove(window, { clientX: 400, clientY: 42 });
    });
    // Far to the right at eye level: look fully right, not up or down.
    expect(box.style.getPropertyValue("--look-x")).toBe("1.00");
    expect(box.style.getPropertyValue("--look-y")).toBe("0.00");
    act(() => {
      fireEvent.pointerDown(window, { clientX: 50, clientY: 42 + 40 });
    });
    // Close by and below: look down, only partly.
    expect(box.style.getPropertyValue("--look-x")).toBe("0.00");
    expect(box.style.getPropertyValue("--look-y")).toBe("0.25");
  });

  it("stops watching the pointer once it is gone", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Critter />);
    unmount();
    expect(remove.mock.calls.map((c) => c[0])).toEqual(expect.arrayContaining(["pointermove", "pointerdown"]));
  });
});

describe("SpeechBubble", () => {
  it("wraps its content with a decorative tail", () => {
    const { container } = render(<SpeechBubble className="mt-2">Hi there</SpeechBubble>);
    const bubble = container.firstElementChild!;
    expect(bubble).toHaveTextContent("Hi there");
    expect(bubble).toHaveClass("mt-2");
    expect(bubble.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
});
