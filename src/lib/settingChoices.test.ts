import { describe, expect, it } from "vitest";
import { defaultChildSettings } from "./model";
import { calmOn, calmPatch, emailChoice, emailPatch, gamesChoice, gamesPatch, soundChoice, soundPatch, vibrationOn } from "./settingChoices";

describe("sounds choice", () => {
  it("reads every saved combination of the old sound switches", () => {
    expect(soundChoice({ sound: true })).toBe("full");
    expect(soundChoice({ sound: true, quietSounds: true })).toBe("gentle");
    expect(soundChoice({ sound: false, quietSounds: true })).toBe("off");
    expect(soundChoice({ sound: false })).toBe("off");
    expect(soundChoice(defaultChildSettings("p", false))).toBe("full");
  });

  it("round-trips each choice, and vibration follows sound", () => {
    for (const choice of ["full", "gentle", "off"] as const) {
      const s = { ...defaultChildSettings("p", false), ...soundPatch(choice) };
      expect(soundChoice(s)).toBe(choice);
      expect(vibrationOn(s)).toBe(choice !== "off");
    }
  });

  it("turns vibration back on for a device that had switched it off on its own", () => {
    const old = { ...defaultChildSettings("p", false), haptics: false };
    expect(vibrationOn(old)).toBe(false);
    expect(vibrationOn({ ...old, ...soundPatch("full") })).toBe(true);
  });

  it("keeps vibration off whenever motion is calmed or sound is off", () => {
    expect(vibrationOn({ sound: true, calmMotion: true })).toBe(false);
    expect(vibrationOn({ sound: false, haptics: true })).toBe(false);
    expect(vibrationOn(undefined)).toBe(true);
  });
});

describe("arcade games choice", () => {
  it("reads every saved combination of the old switches", () => {
    expect(gamesChoice({ gamesEnabled: true, freePlay: false })).toBe("earn");
    expect(gamesChoice({ gamesEnabled: true, freePlay: true })).toBe("free");
    expect(gamesChoice({ gamesEnabled: false, freePlay: true })).toBe("off");
    expect(gamesChoice(defaultChildSettings("p", false))).toBe("earn");
  });

  it("round-trips each choice, and turning games back on restores free play", () => {
    for (const choice of ["earn", "free", "off"] as const) expect(gamesChoice({ ...defaultChildSettings("p", false), ...gamesPatch(choice) })).toBe(choice);
    const free = { ...defaultChildSettings("p", false), ...gamesPatch("free") };
    const off = { ...free, ...gamesPatch("off") };
    expect(gamesChoice({ ...off, gamesEnabled: true })).toBe("free");
  });
});

describe("calm mode", () => {
  it("is off by default, and on only when every calm option is on", () => {
    const s = defaultChildSettings("p", false);
    expect(calmOn(s)).toBe(false);
    expect(calmOn({ ...s, ...calmPatch(true) })).toBe(true);
    expect(calmOn({ ...s, ...calmPatch(true), shortSessions: false })).toBe(false);
    expect(calmOn({ ...s, ...calmPatch(true), ...calmPatch(false) })).toBe(false);
  });

  it("turns on gentle sounds, which the sounds choice shows", () => {
    expect(soundChoice({ ...defaultChildSettings("p", false), ...calmPatch(true) })).toBe("gentle");
  });
});

describe("parent emails choice", () => {
  it("reads every saved combination of the old two switches", () => {
    expect(emailChoice({ weeklyReport: true, practiceReminders: false })).toBe("weekly");
    expect(emailChoice({ weeklyReport: true, practiceReminders: true })).toBe("both");
    expect(emailChoice({ weeklyReport: false, practiceReminders: false })).toBe("none");
    expect(emailChoice({ weeklyReport: false, practiceReminders: true })).toBeNull();
  });

  it("round-trips each choice", () => {
    for (const choice of ["weekly", "both", "none"] as const) expect(emailChoice(emailPatch(choice))).toBe(choice);
  });
});
