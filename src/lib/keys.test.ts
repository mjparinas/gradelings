// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { choiceIndexForKey, onControl, shortcutBlocked } from "./keys";

const key = (k: string, target: EventTarget, init: KeyboardEventInit = {}) => {
  const e = new KeyboardEvent("keydown", { key: k, bubbles: true, ...init });
  Object.defineProperty(e, "target", { value: target });
  return e;
};

describe("choiceIndexForKey", () => {
  it("maps 1 to the first choice and stops at the last", () => {
    expect(choiceIndexForKey("1", 4)).toBe(0);
    expect(choiceIndexForKey("4", 4)).toBe(3);
    expect(choiceIndexForKey("5", 4)).toBeNull();
  });
  it("ignores 0, letters and longer keys", () => {
    for (const k of ["0", "a", "Enter", "F1", "12"]) expect(choiceIndexForKey(k, 9)).toBeNull();
  });
});

describe("shortcutBlocked", () => {
  it("lets plain keys through on the page", () => expect(shortcutBlocked(key("1", document.body))).toBe(false));
  it("blocks keys with a modifier or held down", () => {
    expect(shortcutBlocked(key("1", document.body, { ctrlKey: true }))).toBe(true);
    expect(shortcutBlocked(key("1", document.body, { metaKey: true }))).toBe(true);
    expect(shortcutBlocked(key("1", document.body, { altKey: true }))).toBe(true);
    expect(shortcutBlocked(key("1", document.body, { repeat: true }))).toBe(true);
  });
  it("blocks keys typed into a field", () => {
    for (const tag of ["input", "textarea", "select"]) expect(shortcutBlocked(key("1", document.createElement(tag)))).toBe(true);
  });
});

describe("onControl", () => {
  it("is true on a button, a link or something inside one", () => {
    const button = document.createElement("button");
    const inner = document.createElement("span");
    button.append(inner);
    const link = document.createElement("a");
    link.href = "#x";
    expect(onControl(key("Enter", button))).toBe(true);
    expect(onControl(key("Enter", inner))).toBe(true);
    expect(onControl(key("Enter", link))).toBe(true);
  });
  it("is false on the page itself", () => expect(onControl(key("Enter", document.body))).toBe(false));
});
