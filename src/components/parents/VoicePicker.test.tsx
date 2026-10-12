// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SpeechLanguage, VoiceOption } from "@/lib/speech";

// The device's voices are faked at the speech module; the offline voice is off here (it has its own tests).
const h = vi.hoisted(() => ({
  canSpeak: true,
  voices: { en: [] as VoiceOption[], fr: [] as VoiceOption[] },
  prefs: { en: null as string | null, fr: null as string | null },
  setPref: vi.fn(),
  preview: vi.fn(),
  stop: vi.fn(),
}));
vi.mock("@/lib/speech", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/speech")>();
  return {
    chooseVoice: real.chooseVoice,
    canSpeak: () => h.canSpeak,
    subscribeVoices: () => () => {},
    getVoiceOptions: (lang: SpeechLanguage = "en") => h.voices[lang],
    getVoicePreference: (lang: SpeechLanguage = "en") => h.prefs[lang],
    setVoicePreference: h.setPref,
    previewVoice: h.preview,
    previewPiper: vi.fn(),
    stopSpeaking: h.stop,
  };
});
vi.mock("@/lib/piper", () => ({
  subscribePiper: () => () => {},
  getPiperState: () => undefined,
  PIPER_VOICES: {},
  piperSupported: () => false,
  piperDownloadBytes: vi.fn(),
  downloadPiper: vi.fn(),
  removePiper: vi.fn(),
  setPiperEnabled: vi.fn(),
}));

import { VoicePicker } from "./VoicePicker";

const voice = (over: Partial<VoiceOption>): VoiceOption => ({ uri: "u", name: "Voice", lang: "en-US", quality: "standard", online: false, score: 0, ...over });
const aria = voice({ uri: "aria", name: "Microsoft Aria Online (Natural) - English (United States)", quality: "natural", online: true });
const karen = voice({ uri: "karen", name: "Karen (Enhanced)", lang: "en_AU", quality: "enhanced" });
const fred = voice({ uri: "fred", name: "Fred", lang: "en-US", quality: "basic" });
const amelie = voice({ uri: "amelie", name: "Amélie (français (Canada))", lang: "fr-CA", quality: "enhanced" });

const setOnline = (online: boolean) => Object.defineProperty(navigator, "onLine", { value: online, configurable: true });

beforeEach(() => {
  h.canSpeak = true;
  h.voices = { en: [aria, karen, fred], fr: [] };
  h.prefs = { en: null, fr: null };
  h.setPref.mockReset();
  h.preview.mockReset();
  h.stop.mockReset();
  setOnline(true);
});

describe("VoicePicker", () => {
  it("says so when this browser can't read aloud", () => {
    h.canSpeak = false;
    render(<VoicePicker />);
    expect(screen.getByText("This browser can't read aloud.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "French voice" })).not.toBeInTheDocument();
  });

  it("opens the tips when the device has no English voices", () => {
    h.voices.en = [];
    render(<VoicePicker />);
    expect(screen.getByText("No English voices found on this device yet.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "How to get a more natural voice", expanded: true })).toBeInTheDocument();
  });

  it("describes each voice by short name, accent and quality, and picks the best automatically", async () => {
    render(<VoicePicker />);
    const menu = screen.getByRole("combobox", { name: "Device voice" });
    expect(menu).toHaveTextContent("Automatic: Aria · American · Sounds natural · needs internet");
    await userEvent.click(menu);
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "Automatic: Aria · American · Sounds natural · needs internet",
      "Aria · American · Sounds natural · needs internet",
      "Karen · Australian · Good",
      "Fred · American · Robotic",
    ]);
    expect(screen.getByText("Aria: Sounds natural")).toBeInTheDocument();
    expect(screen.getByText(/This voice needs internet\./)).toBeInTheDocument();
    // The best voice is natural, so the tips stay closed.
    expect(screen.getByRole("button", { name: "How to get a more natural voice", expanded: false })).toBeInTheDocument();
  });

  it("uses an on-device voice while offline, even if a cloud voice is best", () => {
    setOnline(false);
    render(<VoicePicker />);
    expect(screen.getByRole("combobox", { name: "Device voice" })).toHaveTextContent("Automatic: Karen · Australian · Good");
    expect(screen.getByText("Karen: Good")).toBeInTheDocument();
    expect(screen.queryByText(/This voice needs internet\./)).not.toBeInTheDocument();
  });

  it("saves a chosen voice for this device and stops any speech first", async () => {
    render(<VoicePicker />);
    await userEvent.click(screen.getByRole("combobox", { name: "Device voice" }));
    fireEvent.pointerDown(screen.getByRole("option", { name: "Karen · Australian · Good" }));
    expect(h.stop).toHaveBeenCalled();
    expect(h.setPref).toHaveBeenCalledWith("karen");
  });

  it("goes back to automatic with null", async () => {
    h.prefs.en = "fred";
    render(<VoicePicker />);
    const menu = screen.getByRole("combobox", { name: "Device voice" });
    expect(menu).toHaveTextContent("Fred · American · Robotic");
    expect(screen.getByText("Fred: Robotic")).toBeInTheDocument();
    await userEvent.click(menu);
    fireEvent.pointerDown(screen.getAllByRole("option")[0]);
    expect(h.setPref).toHaveBeenCalledWith(null);
  });

  it("ignores a saved voice that is no longer installed", () => {
    h.prefs.en = "gone";
    render(<VoicePicker />);
    expect(screen.getByRole("combobox", { name: "Device voice" })).toHaveTextContent(/^Automatic:/);
  });

  it("previews the saved voice", async () => {
    h.prefs.en = "karen";
    render(<VoicePicker />);
    await userEvent.click(screen.getByRole("button", { name: "▶ Preview" }));
    expect(h.preview).toHaveBeenCalledWith("karen");
  });

  it("opens the tips when the best voice sounds robotic", () => {
    h.voices.en = [fred];
    render(<VoicePicker />);
    expect(screen.getByRole("button", { name: "How to get a more natural voice", expanded: true })).toBeInTheDocument();
  });

  it("explains that French is read in English until a French voice is added", () => {
    render(<VoicePicker />);
    expect(screen.getByRole("heading", { name: "French voice" })).toBeInTheDocument();
    expect(screen.getByText(/No French voices found on this device yet, so French lessons will be read in an English voice\./)).toBeInTheDocument();
  });

  it("keeps a separate French voice choice and preview", async () => {
    h.voices.fr = [amelie];
    render(<VoicePicker />);
    const menu = screen.getByRole("combobox", { name: "Voice for French lessons" });
    expect(menu).toHaveTextContent("Automatic: Amélie · Canadian French · Good");
    await userEvent.click(menu);
    fireEvent.pointerDown(screen.getByRole("option", { name: "Amélie · Canadian French · Good" }));
    expect(h.setPref).toHaveBeenCalledWith("amelie", "fr");
    await userEvent.click(screen.getByRole("button", { name: "▶ Preview French" }));
    expect(h.preview).toHaveBeenCalledWith(null, "fr");
  });
});
