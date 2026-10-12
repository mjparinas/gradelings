// @vitest-environment jsdom
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PiperState, PiperVoiceState } from "@/lib/piper";

const h = vi.hoisted(() => ({
  state: undefined as PiperState | undefined,
  listeners: new Set<() => void>(),
  supported: true,
  bytes: vi.fn(),
  download: vi.fn(),
  remove: vi.fn(),
  setEnabled: vi.fn(),
  previewPiper: vi.fn(),
  stop: vi.fn(),
}));
vi.mock("@/lib/piper", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/piper")>();
  return {
    PIPER_VOICES: real.PIPER_VOICES,
    subscribePiper: (l: () => void) => {
      h.listeners.add(l);
      return () => h.listeners.delete(l);
    },
    getPiperState: () => h.state,
    piperSupported: () => h.supported,
    piperDownloadBytes: h.bytes,
    downloadPiper: h.download,
    removePiper: h.remove,
    setPiperEnabled: h.setEnabled,
  };
});
vi.mock("@/lib/speech", () => ({ previewPiper: h.previewPiper, stopSpeaking: h.stop }));

import { PIPER_VOICES } from "@/lib/piper";
import { PiperVoice } from "./PiperVoice";

const voice = (state: PiperVoiceState, over: { loaded?: number; total?: number; error?: string } = {}) => ({ state, loaded: 0, total: 0, ...over });
const setState = (en: ReturnType<typeof voice>, fr = voice("missing"), enabled = false) => {
  h.state = { enabled, voices: { en, fr } };
};
const publish = () => act(() => h.listeners.forEach((l) => l()));

beforeEach(() => {
  h.supported = true;
  h.listeners.clear();
  setState(voice("missing"));
  h.bytes.mockReset().mockResolvedValue(63_500_000);
  for (const f of [h.download, h.remove, h.setEnabled, h.stop]) f.mockReset();
  h.previewPiper.mockReset().mockResolvedValue(undefined);
});

describe("PiperVoice", () => {
  it("shows nothing while the device is still being checked", () => {
    setState(voice("checking"));
    const { container } = render(<PiperVoice language="en" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("says when the browser can't run it, in the English section only", () => {
    h.supported = false;
    const { unmount } = render(<PiperVoice language="en" />);
    expect(screen.getByText("This browser can't run the offline voice.")).toBeInTheDocument();
    unmount();
    const { container } = render(<PiperVoice language="fr" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("offers a one-time download with its size, and credits the voice", async () => {
    render(<PiperVoice language="en" />);
    expect(screen.getByText(new RegExp(`^${PIPER_VOICES.en.name}, a natural-sounding voice`))).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "⬇ Download voice (64 MB)" })).toBeInTheDocument();
    expect(h.bytes).toHaveBeenCalledWith("en");
    expect(screen.getByText(/Best on Wi-Fi\./)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(PIPER_VOICES.en.credit.slice(0, 20)))).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Download voice/ }));
    expect(h.download).toHaveBeenCalledWith("en");
  });

  it("shows the size-less button when the size is unknown, and a failed download's error", async () => {
    h.bytes.mockResolvedValue(undefined);
    setState(voice("missing", { error: "The download stopped. Try again on Wi-Fi." }));
    render(<PiperVoice language="en" />);
    expect(screen.getByRole("alert")).toHaveTextContent("The download stopped. Try again on Wi-Fi.");
    await waitFor(() => expect(h.bytes).toHaveBeenCalled());
    expect(screen.getByRole("button", { name: "⬇ Download voice" })).toBeInTheDocument();
  });

  it("shows nothing for a French voice that isn't here yet: it downloads by itself when French is read aloud", () => {
    setState(voice("missing"), voice("missing"));
    const { container } = render(<PiperVoice language="fr" />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("button", { name: /Download French voice/ })).not.toBeInTheDocument();
  });

  it("shows download progress", () => {
    setState(voice("downloading", { loaded: 10e6, total: 40e6 }));
    render(<PiperVoice language="en" />);
    expect(screen.getByText("Downloading… 10 MB of 40 MB")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Downloading the voice" })).toHaveAttribute("aria-valuenow", "25");
  });

  it("shows progress at zero before the size is known", () => {
    setState(voice("missing"), voice("downloading"));
    render(<PiperVoice language="fr" />);
    expect(screen.getByRole("progressbar", { name: "Downloading the French voice" })).toHaveAttribute("aria-valuenow", "0");
  });

  it("turns the downloaded voice on for read-aloud, on this device", async () => {
    setState(voice("ready"));
    render(<PiperVoice language="en" />);
    const sw = screen.getByRole("switch", { name: /Use the offline voice for read-aloud/ });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    expect(h.stop).toHaveBeenCalled();
    expect(h.setEnabled).toHaveBeenCalledWith(true);
    setState(voice("ready"), voice("missing"), true);
    publish();
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("has no on/off switch for French, which follows the English one", () => {
    setState(voice("ready"), voice("ready"));
    render(<PiperVoice language="fr" />);
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Offline French voice" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "▶ Preview French" })).toBeInTheDocument();
  });

  it("previews the voice, and says so if it can't play", async () => {
    setState(voice("ready"));
    let finish!: () => void;
    h.previewPiper.mockReturnValueOnce(new Promise<void>((r) => (finish = r)));
    render(<PiperVoice language="en" />);
    await userEvent.click(screen.getByRole("button", { name: "▶ Preview" }));
    expect(screen.getByRole("button", { name: "Speaking…" })).toBeDisabled();
    expect(h.previewPiper).toHaveBeenCalledWith("en");
    await act(async () => finish());
    expect(screen.getByRole("button", { name: "▶ Preview" })).toBeEnabled();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    h.previewPiper.mockRejectedValueOnce(new Error("no audio"));
    await userEvent.click(screen.getByRole("button", { name: "▶ Preview" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The voice couldn't play on this device. Read-aloud will use the device voice.");
  });

  it("removes the voice from this device", async () => {
    setState(voice("ready"), voice("ready"));
    render(<PiperVoice language="fr" />);
    await userEvent.click(screen.getByRole("button", { name: "Remove from this device" }));
    expect(h.remove).toHaveBeenCalledWith("fr");
  });

  it("checks the French size again once English is ready, since they share the engine", async () => {
    setState(voice("downloading"), voice("missing"));
    render(<PiperVoice language="fr" />);
    await waitFor(() => expect(h.bytes).toHaveBeenCalledTimes(1));
    setState(voice("ready"), voice("missing"));
    publish();
    await waitFor(() => expect(h.bytes).toHaveBeenCalledTimes(2));
  });
});
