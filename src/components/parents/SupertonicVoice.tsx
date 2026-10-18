"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { downloadSupertonic, getSupertonicState, SUPERTONIC_VOICES, supertonicDownloadBytes, supertonicSupported, removeSupertonic, setSupertonicEnabled, subscribeSupertonic, type SupertonicState } from "@/lib/supertonic";
import { previewSupertonic, stopSpeaking, type SpeechLanguage } from "@/lib/speech";
import { useSay } from "@/lib/say";
import { Switch } from "./common";

const mb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1e6))} MB`;

/**
 * The Supertonic voice for one language on this device. English carries the on/off switch, which is on
 * by default: the voice then downloads by itself in the background for children with read-aloud on.
 */
export function SupertonicVoice({ language }: { language: SpeechLanguage }) {
  const supertonic = useSyncExternalStore<SupertonicState | undefined>(subscribeSupertonic, getSupertonicState, () => undefined);
  const [size, setSize] = useState<number>();
  const [previewing, setPreviewing] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const say = useSay();
  const voice = supertonic?.voices[language];
  const otherReady = supertonic?.voices[language === "en" ? "fr" : "en"].state === "ready";

  useEffect(() => {
    if (voice?.state === "missing") void supertonicDownloadBytes(language).then(setSize);
  }, [voice?.state, language, otherReady]);

  if (!supertonic || !voice || voice.state === "checking") return null;
  if (!supertonicSupported()) return language === "en" ? <p className="text-sm text-ink-soft">This browser can&apos;t run the offline voice.</p> : null;

  const french = language === "fr";
  // The French voice downloads by itself for a child with read-aloud and French on, so there's no button for it.
  if (french && voice.state === "missing") return null;
  const download = () => {
    // Downloading by hand means the parent wants to hear it.
    if (!french) setSupertonicEnabled(true);
    void downloadSupertonic(language);
  };
  const toggle = (
    <Switch
      label="Use the offline voice for read-aloud"
      value={supertonic.enabled}
      onChange={(on) => {
        stopSpeaking();
        setSupertonicEnabled(on);
      }}
      help="On this device only. Turn it off to use the device voice instead."
    />
  );
  const name = SUPERTONIC_VOICES[language].name;
  const preview = () => {
    stopSpeaking();
    setPreviewFailed(false);
    setPreviewing(true);
    previewSupertonic(language)
      .catch(() => setPreviewFailed(true))
      .finally(() => setPreviewing(false));
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border-2 border-line p-4" data-testid={`supertonic-${language}`}>
      <div>
        <h3 className="text-lg font-bold">{french ? "Offline French voice" : "Offline natural voice"}</h3>
        <p className="text-sm text-ink-soft">
          {french
            ? `${name}, a French voice that runs on this device. Used for French lessons when the offline voice is on.`
            : `${name}, a natural-sounding voice that runs on this device, so it sounds the same everywhere and works with no internet. It's a one-time download kept on this device.`}
        </p>
      </div>

      {!french && toggle}

      {voice.state === "missing" && (
        <>
          {supertonic.enabled && (
            <p className="text-sm text-ink-soft">
              {french
                ? "It downloads by itself for a child with \"Read questions out loud\" and French switched on, when this device isn't on mobile data."
                : say("It downloads by itself once a child has \"Read questions out loud\" on (Kindergarten and Grade 1 have it on) or taps 🔊, when this device isn't on mobile data. Until then, read-aloud uses the device voice below.")}
            </p>
          )}
          <button
            type="button"
            className="self-start rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a] disabled:opacity-40"
            disabled={supertonic.voices[french ? "en" : "fr"].state === "downloading"}
            onClick={download}
          >
            {`⬇ Download ${french ? "French voice" : "voice"}${supertonic.enabled ? " now" : ""}${size ? ` (${mb(size)})` : ""}`}
          </button>
          {voice.error && (
            <p role="alert" className="text-sm font-semibold text-nudge-dark">
              {voice.error}
            </p>
          )}
          {!french && !supertonic.enabled && <p className="text-sm text-ink-soft">Best on Wi-Fi. Until it&apos;s downloaded and switched on, read-aloud uses the device voice below.</p>}
        </>
      )}

      {voice.state === "downloading" && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Downloading… {voice.total ? `${mb(voice.loaded)} of ${mb(voice.total)}` : ""}</span>
          <div
            role="progressbar"
            aria-label={`Downloading the ${french ? "French " : ""}voice`}
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
              {previewing ? "Speaking…" : french ? "▶ Preview French" : "▶ Preview"}
            </button>
            <button type="button" className="rounded-xl border-2 border-line px-4 py-2.5 font-semibold" onClick={() => void removeSupertonic(language)}>
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
        {SUPERTONIC_VOICES[language].credit} Speech by <a className="underline" href="https://github.com/supertone-inc/supertonic">Supertonic</a>.
      </p>
    </div>
  );
}
