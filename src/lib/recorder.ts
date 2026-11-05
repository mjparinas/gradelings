// Listening for one answer: the microphone is opened only while a child is answering, the sound is kept in memory
// as samples for one attempt, and the microphone is closed again straight after. Nothing is stored or sent.

export type MicResult = "granted" | "denied" | "unavailable";

/** Asks for the microphone once (a parent does this in Settings) and closes it again at once. */
export async function checkMicrophone(): Promise<MicResult> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return "unavailable";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return "granted";
  } catch (e) {
    return e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError") ? "denied" : "unavailable";
  }
}

export interface VadOptions {
  /** Stop this long after the child stops talking. */
  trailingMs: number;
  /** Give up if nobody has started talking after this long. */
  startMs: number;
  /** Never listen longer than this. */
  maxMs: number;
}

export type VadStatus = "waiting" | "speaking" | "done" | "none";

/**
 * Decides when a child has finished talking, from the loudness of the sound over time. A child may take a moment to
 * start and pause mid-word, so the trailing silence is long. The quiet baseline comes from the first moments, so a
 * noisy room doesn't count as speech.
 */
export function makeDetector(opts: VadOptions) {
  const baseline: number[] = [];
  let spoke = false;
  let lastLoud = 0;
  let voiceMs = 0;
  let lastAt = 0;
  return {
    push(rms: number, at: number): VadStatus {
      const dt = at - lastAt;
      lastAt = at;
      if (at < 300) {
        baseline.push(rms);
        return "waiting";
      }
      const sorted = [...baseline].sort((a, b) => a - b);
      const floor = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
      const loud = rms > Math.max(0.02, floor * 3);
      if (loud) {
        spoke = true;
        lastLoud = at;
        voiceMs += dt;
      }
      if (at >= opts.maxMs) return spoke ? "done" : "none";
      if (!spoke) return at >= opts.startMs ? "none" : "waiting";
      return at - lastLoud >= opts.trailingMs ? "done" : "speaking";
    },
    /** Time the child was actually loud, to ignore a bump or a cough. */
    get voiceMs() {
      return voiceMs;
    },
  };
}

export interface Listening {
  /** Resolves with 16 kHz mono samples, or null if nobody spoke. */
  result: Promise<Float32Array | null>;
  /** Stop now and use what was heard. */
  stop: () => void;
  /** Throw it all away. */
  cancel: () => void;
}

const TARGET_RATE = 16_000;

/** Opens the microphone and listens for one answer. `onLevel` gets 0 to 1 about ten times a second. */
export function listen({ maxMs = 6000, startMs = 7000, onLevel }: { maxMs?: number; startMs?: number; onLevel?: (level: number) => void } = {}): Listening {
  let stopNow = false;
  let cancelled = false;
  const result = (async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    const ctx = new AudioContext();
    try {
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const stopped = new Promise<void>((done) => (recorder.onstop = () => done()));
      recorder.start();
      const vad = makeDetector({ trailingMs: 1100, startMs, maxMs });
      const buf = new Float32Array(analyser.fftSize);
      const t0 = performance.now();
      let status: VadStatus = "waiting";
      while (!stopNow && !cancelled && status !== "done" && status !== "none") {
        await new Promise((r) => setTimeout(r, 90));
        analyser.getFloatTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += v * v;
        const rms = Math.sqrt(sum / buf.length);
        onLevel?.(Math.min(1, rms * 8));
        status = vad.push(rms, performance.now() - t0);
      }
      recorder.stop();
      await stopped;
      onLevel?.(0);
      if (cancelled || status === "none" || vad.voiceMs < 120) return null;
      const decoded = await new AudioContext().decodeAudioData(await new Blob(chunks).arrayBuffer());
      const length = Math.ceil(decoded.duration * TARGET_RATE);
      const offline = new OfflineAudioContext(1, length, TARGET_RATE);
      const src = offline.createBufferSource();
      src.buffer = decoded;
      src.connect(offline.destination);
      src.start();
      const rendered = await offline.startRendering();
      return rendered.getChannelData(0).slice();
    } finally {
      stream.getTracks().forEach((t) => t.stop());
      void ctx.close();
    }
  })();
  return { result, stop: () => (stopNow = true), cancel: () => ((cancelled = true), (stopNow = true)) };
}
