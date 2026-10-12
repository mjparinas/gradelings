import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./haptics", () => ({ buzz: { tap: 8, correct: [10, 40, 18], tryAgain: 28, pop: 10 }, vibrate: vi.fn() }));

// A recording AudioContext: each note is an oscillator with a start frequency, a start time and a peak volume.
interface Note {
  freq: number;
  slideTo?: number;
  at: number;
  type: string;
  volume: number;
}
class FakeAudioContext {
  static made = 0;
  static notes: Note[] = [];
  static failNext = false;
  static last: FakeAudioContext | undefined;
  state = "suspended";
  currentTime = 10;
  destination = {};
  resume = vi.fn(async () => void (this.state = "running"));
  constructor() {
    if (FakeAudioContext.failNext) throw new Error("NotAllowedError");
    FakeAudioContext.made++;
    FakeAudioContext.last = this;
  }
  createOscillator() {
    const note: Note = { freq: 0, at: 0, type: "", volume: 0 };
    return {
      set type(t: string) {
        note.type = t;
      },
      frequency: {
        setValueAtTime: (f: number, at: number) => Object.assign(note, { freq: f, at }),
        exponentialRampToValueAtTime: (f: number) => void (note.slideTo = f),
      },
      connect: (gain: { note?: Note }) => {
        // The gain node records the peak volume into this note.
        Object.assign(note, { volume: gain.note?.volume ?? 0 });
        FakeAudioContext.notes.push(note);
        return { connect: () => undefined };
      },
      start: vi.fn(),
      stop: vi.fn(),
    };
  }
  createGain() {
    const g = { note: { volume: 0 } as { volume: number } };
    return {
      ...g,
      gain: {
        setValueAtTime: () => undefined,
        exponentialRampToValueAtTime: (v: number) => {
          if (v > 0.001) g.note.volume = v;
        },
      },
      get note() {
        return g.note;
      },
    };
  }
}

type SoundModule = typeof import("./sound");
let mod: SoundModule;
let vibrate: ReturnType<typeof vi.fn>;
const notes = () => FakeAudioContext.notes;

beforeEach(async () => {
  vi.resetModules();
  FakeAudioContext.made = 0;
  FakeAudioContext.notes = [];
  FakeAudioContext.failNext = false;
  vi.stubGlobal("window", {});
  vi.stubGlobal("AudioContext", FakeAudioContext);
  mod = await import("./sound");
  vibrate = vi.mocked((await import("./haptics")).vibrate);
});
afterEach(() => vi.unstubAllGlobals());

describe("sounds", () => {
  it("plays a rising three-note chime for a right answer that climbs with the streak", () => {
    mod.sounds.correct(0);
    expect(notes().map((n) => n.freq)).toEqual([523, 659, 880]);
    expect(notes().map((n) => n.at)).toEqual([10, 10.08, 10.16]);
    FakeAudioContext.notes = [];
    mod.sounds.correct(9); // Capped at a streak of 4 so it never leaves the scale.
    expect(notes().map((n) => n.freq)).toEqual([880, 1175, 1568]);
    expect(vibrate).toHaveBeenCalledWith([10, 40, 18]);
  });

  it("makes one audio context, and wakes it if the browser suspended it", () => {
    mod.sounds.tap();
    mod.sounds.clink();
    expect(FakeAudioContext.made).toBe(1);
    expect(FakeAudioContext.last?.resume).toHaveBeenCalledOnce();
    expect(notes()).toHaveLength(3);
    // Taps vary a little in pitch but stay near 620 Hz.
    expect(notes()[0].freq).toBeGreaterThan(620 * 0.87);
    expect(notes()[0].freq).toBeLessThan(620 * 1.13);
  });

  it("tries again with soft, low triangle notes, not a buzzer", () => {
    mod.sounds.tryAgain();
    expect(notes().map((n) => [n.freq, n.type])).toEqual([
      [392, "triangle"],
      [330, "triangle"],
    ]);
    expect(Math.max(...notes().map((n) => n.volume))).toBeLessThanOrEqual(0.11);
  });

  it("stays silent when the child has sound off, but still buzzes", () => {
    mod.setSoundCheck(() => false);
    mod.sounds.tryAgain();
    mod.sounds.levelUp();
    expect(FakeAudioContext.made).toBe(0);
    expect(notes()).toEqual([]);
    expect(vibrate).toHaveBeenCalledWith(28);
  });

  it("quiet mode keeps gentle sounds and one soft note for a right answer, and drops fanfares", () => {
    mod.setQuietCheck(() => true);
    mod.sounds.trophy(true);
    mod.sounds.levelUp();
    mod.sounds.complete();
    mod.sounds.tick();
    mod.sounds.starLand(1);
    expect(notes()).toEqual([]);
    mod.sounds.correct(3);
    expect(notes()).toEqual([expect.objectContaining({ freq: 659, volume: 0.08 })]);
    mod.sounds.tryAgain();
    expect(notes()).toHaveLength(3);
  });

  it("gives gold and platinum trophies a bigger chime", () => {
    mod.sounds.trophy(false);
    expect(notes()).toHaveLength(2);
    FakeAudioContext.notes = [];
    mod.sounds.trophy(true);
    expect(notes().map((n) => n.freq)).toEqual([1319, 1760, 2093, 2637]);
  });

  it("climbs the scale for pops, clamped to its ends, and slides up", () => {
    mod.sounds.pop(-3);
    mod.sounds.pop(2.7);
    mod.sounds.pop(99);
    expect(notes().map((n) => n.freq)).toEqual([523, 659, 1568]);
    expect(notes()[0].slideTo).toBeCloseTo(523 * 1.25);
  });

  it("plays the remaining effects as their own notes", () => {
    mod.sounds.clack();
    mod.sounds.whoosh();
    mod.sounds.boop();
    mod.sounds.starLand(0);
    mod.sounds.complete();
    mod.sounds.levelUp();
    mod.sounds.tick();
    expect(notes()).toHaveLength(1 + 1 + 1 + 2 + 5 + 5 + 1);
    expect(notes().find((n) => n.freq === 220)?.slideTo).toBe(150);
  });

  it("never throws when the browser refuses an audio context", () => {
    FakeAudioContext.failNext = true;
    expect(() => mod.sounds.correct()).not.toThrow();
    expect(notes()).toEqual([]);
  });

  it("does nothing on the server", () => {
    vi.stubGlobal("window", undefined);
    mod.sounds.complete();
    expect(FakeAudioContext.made).toBe(0);
  });
});
