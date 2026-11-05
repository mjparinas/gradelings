"use client";

import { useEffect, useRef, useState } from "react";
import { hasSeenVideo, markVideoSeen, type TrainingVideo } from "@/lib/trainingVideos";
import { cachedVideoUrl, saveVideo } from "@/lib/videoCache";

const SPEEDS = [0.75, 1, 1.25];

/** A captioned player in a dialog: play and pause, watch again, speed and a progress bar. Our own file in a native video element. */
export function TrainingVideoPlayer({ video, onClose }: { video: TrainingVideo; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(video.seconds || 60);

  useEffect(() => {
    let url: string | null = null;
    let alive = true;
    void cachedVideoUrl(video.src).then((blob) => {
      if (!alive) return;
      url = blob;
      setSrc(blob ?? video.src);
    });
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [video.src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
  };
  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => undefined);
  };
  const cycle = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (ref.current) ref.current.playbackRate = next;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-[2px] print:hidden" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="my-auto flex w-full max-w-3xl flex-col gap-3 rounded-3xl bg-paper p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold">🎬 {video.title}</h2>
        {failed ? (
          <p className="rounded-2xl bg-help-soft p-4 text-center font-read text-lg" role="alert">
            This video isn&apos;t here right now. Connect to the internet and try again. You can watch it any time from Training videos.
          </p>
        ) : (
          <>
            {src && (
              <video
                ref={ref}
                src={src}
                className="w-full rounded-2xl bg-black"
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => setLength(e.currentTarget.duration || video.seconds || 60)}
                onPlay={() => { setPlaying(true); void saveVideo(video.src); }}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                onError={() => setFailed(true)}
              >
                <track kind="captions" src={video.captions} srcLang="en" label="English" default />
              </video>
            )}
            <div className="progress-track h-2 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-label="Video progress" aria-valuemin={0} aria-valuemax={Math.round(length)} aria-valuenow={Math.round(time)}>
              <div className="progress-fill h-full bg-primary" style={{ width: `${length ? Math.min(100, (time / length) * 100) : 0}%` }} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" autoFocus className="btn btn-primary min-h-12 px-5 text-lg" onClick={toggle}>
                {playing ? "⏸ Pause" : "▶ Play"}
              </button>
              <button type="button" className="btn btn-soft min-h-12 px-4 text-base" onClick={replay}>↺ Watch again</button>
              <button type="button" className="btn btn-soft min-h-12 px-4 text-base" onClick={cycle} aria-label={`Speed ${speed} times. Change speed`}>{speed}×</button>
            </div>
          </>
        )}
        <button type="button" className="btn btn-soft min-h-12 self-start px-5 text-base" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/**
 * Opens a video once, the first time it is rendered on this device (the person can close it, and it is not shown
 * again; the library has it). Renders nothing when `video` is undefined, `enabled` is false or it has been seen.
 */
export function FirstUseVideo({ video, enabled = true }: { video: TrainingVideo | undefined; enabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = video?.id;
  useEffect(() => {
    if (!id || !enabled || hasSeenVideo(id)) return;
    // A moment after the page has drawn, so the screen the person came for is there first.
    const t = setTimeout(() => {
      markVideoSeen(id);
      setOpen(true);
    }, 600);
    return () => clearTimeout(t);
  }, [id, enabled]);
  return open && video ? <TrainingVideoPlayer video={video} onClose={() => setOpen(false)} /> : null;
}

/** The library: every video in a set as a card with a Watch button, and a mark for the ones this device has shown. */
export function TrainingLibrary({ heading = "Training videos", intro, videos }: { heading?: string; intro?: string; videos: readonly TrainingVideo[] }) {
  const [playing, setPlaying] = useState<TrainingVideo | null>(null);
  return (
    <section aria-labelledby="training-heading">
      <h1 id="training-heading" className="text-3xl font-bold">{heading}</h1>
      {intro && <p className="mt-1 font-read text-ink-soft">{intro}</p>}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <li key={v.id} className="rounded-2xl border border-line bg-white p-4">
            <h2 className="text-lg font-bold">🎬 {v.title}</h2>
            <p className="mt-1 font-read text-sm text-ink-soft">{v.blurb}</p>
            <button type="button" className="btn btn-primary mt-3 min-h-11 px-4" onClick={() => setPlaying(v)} aria-label={`Watch: ${v.title}`}>
              ▶ Watch{v.seconds ? ` (${Math.max(1, Math.round(v.seconds / 60 * 10) / 10)} min)` : ""}
            </button>
          </li>
        ))}
      </ul>
      {playing && <TrainingVideoPlayer video={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
}
