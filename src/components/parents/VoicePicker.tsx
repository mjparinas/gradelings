"use client";

import { APP_NAME } from "@/lib/brand";
import { getPiperState, PIPER_VOICES, piperSupported, setPiperEnabled, subscribePiper, type PiperState } from "@/lib/piper";
import { useSyncExternalStore } from "react";
import {
  canSpeak,
  chooseVoice,
  getVoiceOptions,
  getVoicePreference,
  previewPiper,
  previewVoice,
  setVoicePreference,
  stopSpeaking,
  subscribeVoices,
  type VoiceOption,
  type VoiceQuality,
} from "@/lib/speech";
import { Disclosure } from "../Disclosure";
import { SelectMenu } from "../SelectMenu";
import { Panel } from "./common";
import { PiperVoice } from "./PiperVoice";

const NONE: VoiceOption[] = [];

const QUALITY: Record<VoiceQuality, { label: string; className: string }> = {
  natural: { label: "Sounds natural", className: "bg-good-soft text-good-dark" },
  enhanced: { label: "Good", className: "bg-[#e6f0ff] text-[#2f6fd6]" },
  standard: { label: "OK", className: "bg-paper text-ink-soft" },
  basic: { label: "Robotic", className: "bg-nudge-soft text-nudge-dark" },
};

const ACCENT: Record<string, string> = {
  "en-CA": "Canadian",
  "en-US": "American",
  "en-GB": "British",
  "en-AU": "Australian",
  "en-NZ": "New Zealand",
  "en-IE": "Irish",
  "en-IN": "Indian",
  "en-ZA": "South African",
  "fr-CA": "Canadian French",
  "fr-FR": "French (France)",
  "fr-BE": "Belgian French",
  "fr-CH": "Swiss French",
};

/** "Microsoft Aria Online (Natural) - English (United States)" → "Aria". */
function shortName(name: string): string {
  return name
    .replace(/^Microsoft\s+/i, "")
    .replace(/\s+Online/i, "")
    .replace(/\s*\((Natural|Premium|Enhanced)\)/i, "")
    .replace(/\s+-\s+(English|French|français).*$/i, "")
    .replace(/\s*\((English|French|français).*\)$/i, "")
    .trim();
}

function describe(o: VoiceOption): string {
  const accent = ACCENT[o.lang.replace("_", "-")] ?? o.lang;
  return [shortName(o.name), accent, QUALITY[o.quality].label, o.online ? "needs internet" : ""].filter(Boolean).join(" · ");
}

function Tips({ open }: { open: boolean }) {
  return (
    <Disclosure open={open} className="rounded-xl bg-paper p-3 text-sm" title="How to get a more natural voice">
      <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-ink-soft">
        <li>
          <b>iPad and iPhone:</b> Settings → Accessibility → Spoken Content → Voices → English. Pick a voice and download its <i>Enhanced</i> or <i>Premium</i> version.
        </li>
        <li>
          <b>Android tablets and phones:</b> Settings → Accessibility → Text-to-speech output. Choose <i>Speech Services by Google</i>, then install the English voice data.
        </li>
        <li>
          <b>Windows:</b> open {APP_NAME} in Microsoft Edge. Its <i>Natural</i> voices are the most lifelike (they need internet).
        </li>
        <li>
          <b>Mac:</b> System Settings → Accessibility → Spoken Content → System voice → Manage Voices, and download a <i>Premium</i> voice.
        </li>
        <li>
          <b>Chromebook:</b> Settings → Accessibility → Text-to-Speech, and install the natural Google voices.
        </li>
      </ul>
      <p className="mt-2 text-ink-soft">Then close and reopen {APP_NAME} so it can see the new voice.</p>
    </Disclosure>
  );
}

/** What read-aloud uses on this device right now, with a sample, so most parents never need to change it. */
function CurrentVoice({ current }: { current: VoiceOption | undefined }) {
  const piper = useSyncExternalStore<PiperState | undefined>(subscribePiper, getPiperState, () => undefined);
  const supported = piper !== undefined && piperSupported();
  const amy = PIPER_VOICES.en.name;
  const usingPiper = supported && piper.enabled && piper.voices.en.state === "ready";
  const waiting = supported && piper.enabled && piper.voices.en.state !== "ready";
  const device = current ? `${shortName(current.name)} (${QUALITY[current.quality].label.toLowerCase()})` : "the device voice";
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-paper p-4">
      <p>
        <span className="font-semibold">Reading with: </span>
        {usingPiper ? `${amy}, the offline natural voice` : device}
      </p>
      {waiting && <p className="text-sm text-ink-soft">{amy}, a natural voice that works offline, downloads by itself once a child has &ldquo;Read questions out loud&rdquo; on (it waits while this device is on mobile data).</p>}
      <button
        type="button"
        className="self-start rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a]"
        onClick={() => {
          stopSpeaking();
          if (usingPiper) void previewPiper("en").catch(() => previewVoice(getVoicePreference()));
          else previewVoice(getVoicePreference());
        }}
      >
        ▶ Hear it
      </button>
    </div>
  );
}

/** Read-aloud voice for this device. Voices are part of each device, so this isn't synced. */
export function VoicePicker() {
  const options = useSyncExternalStore(subscribeVoices, getVoiceOptions, () => NONE);
  const preferred = useSyncExternalStore(subscribeVoices, getVoicePreference, () => null);
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const best = chooseVoice(options, null, offline);
  const current = chooseVoice(options, preferred, offline);

  return (
    <Panel title="🗣️ Read-aloud voice (this device)">
      {!canSpeak() ? (
        <p className="text-ink-soft">This browser can&apos;t read aloud.</p>
      ) : (
        <CurrentVoice current={current ?? undefined} />
      )}
      <Disclosure title="Change voice" className="mt-3 rounded-xl border-2 border-line px-4">
        <div className="flex flex-col gap-4 pb-4">
          <PiperVoice language="en" />
          {!canSpeak() ? null : options.length === 0 ? (
            <>
              <p className="text-ink-soft">No English voices found on this device yet.</p>
              <Tips open />
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <SelectMenu
                label="Device voice"
                value={preferred && options.some((o) => o.uri === preferred) ? preferred : ""}
                onChange={(next) => {
                  stopSpeaking();
                  setVoicePreference(next || null);
                  // Picking a device voice means the parent wants to hear it.
                  if (next) setPiperEnabled(false);
                }}
                options={[
                  { value: "", label: `Automatic: ${best ? describe(best) : "best available"}` },
                  ...options.map((o) => ({ value: o.uri, label: describe(o) })),
                ]}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a]" onClick={() => previewVoice(preferred)}>
                  ▶ Preview
                </button>
                {current && (
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${QUALITY[current.quality].className}`}>
                    {shortName(current.name)}: {QUALITY[current.quality].label}
                  </span>
                )}
              </div>
              {current?.online && <p className="text-sm text-ink-soft">This voice needs internet. When offline, read-aloud switches to the best voice on the device.</p>}
              <p className="text-sm text-ink-soft">Each device has its own voices, so choose one on every tablet or phone your children use. When the offline voice is on, this one is only used until it has downloaded or if it can&apos;t play. Choosing a voice here switches the offline voice off.</p>
              <Tips open={best?.quality === "basic" || best?.quality === "standard"} />
            </div>
          )}
          {canSpeak() && <FrenchVoice />}
        </div>
      </Disclosure>
    </Panel>
  );
}

/** The voice for French Immersion and Core French questions. Separate from the English voice because every voice speaks one language. */
function FrenchVoice() {
  const options = useSyncExternalStore((l) => subscribeVoices(l), () => getVoiceOptions("fr"), () => NONE);
  const preferred = useSyncExternalStore(subscribeVoices, () => getVoicePreference("fr"), () => null);
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const best = chooseVoice(options, null, offline);
  const current = chooseVoice(options, preferred, offline);
  return (
    <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4">
      <h3 className="text-lg font-bold">French voice</h3>
      <PiperVoice language="fr" />
      {options.length === 0 ? (
        <p className="text-sm text-ink-soft">
          No French voices found on this device yet, so French lessons will be read in an English voice. Add a French voice in your device&apos;s speech settings
          (the same place as the English tips above, but choose French, ideally Canadian French), then reopen {APP_NAME}.
        </p>
      ) : (
        <>
          <SelectMenu
            label="Voice for French lessons"
            value={preferred && options.some((o) => o.uri === preferred) ? preferred : ""}
            onChange={(next) => {
              stopSpeaking();
              setVoicePreference(next || null, "fr");
            }}
            options={[
              { value: "", label: `Automatic: ${best ? describe(best) : "best available"}` },
              ...options.map((o) => ({ value: o.uri, label: describe(o) })),
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-xl bg-[#4f8ef7] px-4 py-2.5 font-bold text-[#0f172a]" onClick={() => previewVoice(preferred, "fr")}>
              ▶ Preview French
            </button>
            {current && (
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${QUALITY[current.quality].className}`}>
                {shortName(current.name)}: {QUALITY[current.quality].label}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
