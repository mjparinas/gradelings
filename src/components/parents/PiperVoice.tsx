"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { downloadPiper, getPiperState, PIPER_VOICES, piperDownloadBytes, piperSupported, removePiper, setPiperEnabled, subscribePiper, type PiperState } from "@/lib/piper";
import { LANGUAGE_NAME } from "@/content/subjects";
import { previewPiper, stopSpeaking, type SpeechLanguage } from "@/lib/speech";
import { useSay } from "@/lib/say";
import { Switch } from "./common";

const mb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1e6))} MB`;

/**
 * The Piper voice for one language on this device. English carries the on/off switch, which is on
 * by default: the voice then downloads by itself in the background for children with read-aloud on.
 */
export function PiperVoice({ language }: { language: SpeechLanguage }) {
  const piper = useSyncExternalStore<PiperState | undefined>(subscribePiper, getPiperState, () => undefined);
  const [size, setSize] = useState<number>();
  const [previewing, setPreviewing] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const say = useSay();
  const voice = piper?.voices[language];
  const others = (Object.keys(piper?.voices ?? {}) as SpeechLanguage[]).filter((l) => l !== language);
  const otherReady = others.some((l) => piper?.voices[l].state === "ready");

  useEffect(() => {
    if (voice?.state === "missing") void piperDownloadBytes(language).then(setSize);
  }, [voice?.state, language, otherReady]);

  if (!piper || !voice || voice.state === "checking") return null;
  if (!piperSupported()) return language === "en" ? <p className="text-sm text-ink-soft">This browser can&apos;t run the offline voice.</p> : null;

  // French or Spanish: "French" for the headings and buttons, undefined for English.
  const second = language === "en" ? undefined : LANGUAGE_NAME[language];
  // The French and Spanish voices download by themselves for a child with read-aloud and that language on, so there's no button for them.
  if (second && voice.state === "missing") return null;
  const download = () => {
    // Downloading by hand means the parent wants to hear it.
    if (!second) setPiperEnabled(true);
    void downloadPiper(language);
  };
  const toggle = (
    <Switch
      label="Use the offline voice for read-aloud"
      value={piper.enabled}
      onChange={(on) => {
        stopSpeaking();
        setPiperEnabled(on);
      }}
      help="On this device only. Turn it off to use the device voice instead."
    />
  );
  const name = PIPER_VOICES[language].name;
  const preview = () => {
    stopSpeaking();
    setPreviewFailed(false);
    setPreviewing(true);
    previewPiper(language)
      .catch(() => setPreviewFailed(true))
      .finally(() => setPreviewing(false));
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border-2 border-line p-4" data-testid={`piper-${language}`}>
      <div>
        <h3 className="text-lg font-bold">{second ? `Offline ${second} voice` : "Offline natural voice"}</h3>
        <p className="text-sm text-ink-soft">
          {second
            ? `${name}, a ${second} voice that runs on this device. Used for ${second} lessons when the offline voice is on.`
            : `${name}, a natural-sounding voice that runs on this device, so it sounds the same everywhere and works with no internet. It's a one-time download kept on this device.`}
        </p>
      </div>

      {!second && toggle}

      {voice.state === "missing" && (
        <>
          {piper.enabled && (
            <p className="text-sm text-ink-soft">
              {second
                ? `It downloads by itself for a child with "Read questions out loud" and ${second} switched on, when this device isn't on mobile data.`
                : say("It downloads by itself once a child has \"Read questions out loud\" on (Kindergarten and Grade 1 have it on) or taps 🔊, when this device isn't on mobile data. Until then, read-aloud uses the device voice below.")}
            </p>
          )}
          <button
            type="button"
            className="self-start rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a] disabled:opacity-40"
            disabled={others.some((l) => piper.voices[l].state === "downloading")}
            onClick={download}
          >
            {`⬇ Download ${second ? `${second} voice` : "voice"}${piper.enabled ? " now" : ""}${size ? ` (${mb(size)})` : ""}`}
          </button>
          {voice.error && (
            <p role="alert" className="text-sm font-semibold text-nudge-dark">
              {voice.error}
            </p>
          )}
          {!second && !piper.enabled && <p className="text-sm text-ink-soft">Best on Wi-Fi. Until it&apos;s downloaded and switched on, read-aloud uses the device voice below.</p>}
        </>
      )}

      {voice.state === "downloading" && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Downloading… {voice.total ? `${mb(voice.loaded)} of ${mb(voice.total)}` : ""}</span>
          <div
            role="progressbar"
            aria-label={`Downloading the ${second ? `${second} ` : ""}voice`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={voice.total ? Math.round((voice.loaded / voice.total) * 100) : 0}
            className="h-3 overflow-hidden rounded-full bg-paper"
          >
            <div className="h-full bg-[#2a78d6] transition-[width]" style={{ width: `${voice.total ? (voice.loaded / voice.total) * 100 : 0}%` }} />
          </div>
        </div>
      )}

      {voice.state === "ready" && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a]" onClick={preview} disabled={previewing}>
              {previewing ? "Speaking…" : second ? `▶ Preview ${second}` : "▶ Preview"}
            </button>
            <button type="button" className="rounded-xl border-2 border-line px-4 py-2.5 font-semibold" onClick={() => void removePiper(language)}>
              Remove from this device
            </button>
          </div>
          {previewFailed && (
            <p role="alert" className="text-sm font-semibold text-nudge-dark">
              The voice couldn&apos;t play on this device. Read-aloud will use the device voice.
            </p>
          )}
        </>
      )}
      <p className="text-xs text-ink-soft">
        {PIPER_VOICES[language].credit} Speech by <a className="underline" href="https://github.com/rhasspy/piper">Piper</a> and{" "}
        <a className="underline" href="https://github.com/espeak-ng/espeak-ng">eSpeak NG</a> (GPL-3.0).
      </p>
    </div>
  );
}
