"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { checkMicrophone, type MicResult } from "@/lib/recorder";
import { checkWhisper, downloadWhisper, removeWhisper, subscribeWhisper, whisperDownloadBytes, whisperSnapshot, WHISPER_CREDIT } from "@/lib/whisper";
import { Switch } from "./common";

const mb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1e6))} MB`;

const MIC_TEXT: Record<MicResult, string> = {
  granted: "The microphone works.",
  denied: "This device is blocking the microphone. Allow it for Gradelings in the browser or app settings, then test again.",
  unavailable: "This device has no microphone we can use.",
};

/**
 * Settings > Advanced options: letting a child answer some questions out loud (flag `voice-practice`). The listening
 * model downloads once per device (and works offline); the microphone is only ever open while a child is answering.
 */
export function VoicePractice({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  const whisper = useSyncExternalStore(subscribeWhisper, whisperSnapshot, whisperSnapshot);
  const [size, setSize] = useState<number>();
  const [mic, setMic] = useState<MicResult>();
  const [error, setError] = useState("");

  useEffect(() => {
    void checkWhisper().then((s) => {
      if (s === "missing") void whisperDownloadBytes().then((b) => setSize(b ?? 0));
    });
  }, []);

  const download = () => {
    setError("");
    downloadWhisper().catch((e) => setError(e instanceof Error ? e.message : "The download failed."));
  };

  return (
    <div className="flex flex-col gap-2">
      <Switch
        label="Let them answer out loud"
        value={value}
        onChange={onChange}
        help="On some Pre-K to Grade 1 questions, like naming a picture or counting, your child can say the answer. It is understood on this device. Sound is never sent anywhere or saved, and they can always tap instead."
      />
      {value && (
        <div className="rounded-xl bg-[#eef4ff] p-3 text-sm" data-testid="voice-practice">
          {whisper.state === "unsupported" && <p>This browser can&apos;t listen for answers, so questions stay tap-to-answer.</p>}
          {whisper.state === "missing" && (
            <div className="flex flex-col gap-2">
              <p>
                To listen, this device needs a download{size ? ` (${mb(size)})` : ""}. Use Wi-Fi. It works offline after that.
              </p>
              {size === undefined ? null : size === 0 ? (
                <p className="text-ink-soft">The listening model isn&apos;t available right now, so questions stay tap-to-answer.</p>
              ) : (
                <button type="button" className="btn btn-primary min-h-12 self-start px-5" onClick={download}>
                  Download
                </button>
              )}
            </div>
          )}
          {whisper.state === "downloading" && <p role="status">Downloading… {Math.round(whisper.progress * 100)}%</p>}
          {whisper.state === "ready" && (
            <div className="flex flex-col gap-2">
              <p>✓ Ready on this device.</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-soft min-h-12 px-4" onClick={() => void checkMicrophone().then(setMic)}>
                  Test the microphone
                </button>
                <button type="button" className="btn btn-soft min-h-12 px-4" onClick={() => void removeWhisper()}>
                  Remove the download
                </button>
              </div>
              {mic && <p role="status">{MIC_TEXT[mic]}</p>}
            </div>
          )}
          {error && (
            <p role="alert" className="mt-2 font-semibold text-[#9b2c2c]">
              {error}
            </p>
          )}
          <p className="mt-2 text-xs text-ink-soft">{WHISPER_CREDIT}</p>
        </div>
      )}
    </div>
  );
}
