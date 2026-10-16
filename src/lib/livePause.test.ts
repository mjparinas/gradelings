import { afterEach, expect, it } from "vitest";
import { isLivePaused, setLivePaused } from "./livePause";

afterEach(() => setLivePaused(false));

it("holds games still only while a live question is up", () => {
  expect(isLivePaused()).toBe(false);
  setLivePaused(true);
  expect(isLivePaused()).toBe(true);
  setLivePaused(false);
  expect(isLivePaused()).toBe(false);
});
