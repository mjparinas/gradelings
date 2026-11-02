"use client";

import { useEffect, useRef, useState } from "react";
import type { HelpVideo as Video } from "@/lib/videoHelp";
import { cachedVideoUrl, saveVideo } from "@/lib/videoCache";

const SPEEDS = [0.75, 1, 1.25];

/**
 * A captioned player for one help video: play/pause, replay, speed and a progress bar, then "Try one more".
 * Our own file in a native video element, no third-party player. If it can't load (offline and never saved),
 * it says so and offers the text lesson instead.
 */
export function HelpVideoPlayer({
  video,
  onClose,
  onNext,
  onWatched,
  onLesson,
}: {
  video: Video;
  onClose: () => void;
  /** "Try one more": close and go on to the next question. */
  onNext: () => void;
  /** Called once when the player closes, with the seconds played and whether the video reached its end. */
  onWatched: (seconds: number, done: boolean) => void;
  onLesson?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(video.seconds);
  const furthest = useRef(0);
  const reported = useRef(false);

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

  const finish = (next = false) => {
    if (!reported.current) {
      reported.current = true;
      if (furthest.current > 0) onWatched(Math.min(Math.round(furthest.current), Math.ceil(length)), ended);
    }
    onClose();
    if (next) onNext();
  };
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
    setEnded(false);
    void v.play().catch(() => undefined);
  };
  const cycle = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (ref.current) ref.current.playbackRate = next;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={video.title} onClick={() => finish()}>
      <div className="my-auto flex w-full max-w-2xl animate-pop-in flex-col gap-3 rounded-3xl bg-paper p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold">🎬 {video.title}</h2>
        {failed ? (
          <div className="rounded-2xl bg-help-soft p-4 text-center font-read text-lg" role="alert">
            <p>This video isn&apos;t here right now. Connect to the internet once and it will be saved for next time.</p>
            {onLesson && (
              <button type="button" className="btn btn-soft mt-3 min-h-12 px-4" onClick={() => { finish(); onLesson(); }}>
                <span aria-hidden="true">📖</span> Show me another way
              </button>
            )}
          </div>
        ) : (
          <>
            {src && (
              <video
                ref={ref}
                src={src}
                className="w-full rounded-2xl bg-black"
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => setLength(e.currentTarget.duration || video.seconds)}
                onPlay={() => { setPlaying(true); void saveVideo(video.src); }}
                onPause={() => setPlaying(false)}
                onEnded={() => { setPlaying(false); setEnded(true); furthest.current = Math.max(furthest.current, length); }}
                onTimeUpdate={(e) => { setTime(e.currentTarget.currentTime); furthest.current = Math.max(furthest.current, e.currentTarget.currentTime); }}
                onError={() => setFailed(true)}
              >
                <track kind="captions" src={video.captions} srcLang="en" label="English" default />
              </video>
            )}
            <div className="h-2 overflow-hidden rounded-full bg-ink/10 progress-track" role="progressbar" aria-label="Video progress" aria-valuemin={0} aria-valuemax={Math.round(length)} aria-valuenow={Math.round(time)}>
              <div className="progress-fill h-full bg-primary" style={{ width: `${length ? Math.min(100, (time / length) * 100) : 0}%` }} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" autoFocus className="btn btn-primary min-h-12 px-5 text-lg" onClick={toggle}>
                {playing ? "⏸ Pause" : "▶ Play"}
              </button>
              <button type="button" className="btn btn-soft min-h-12 px-4 text-base" onClick={replay}>
                ↺ Watch again
              </button>
              <button type="button" className="btn btn-soft min-h-12 px-4 text-base" onClick={cycle} aria-label={`Speed ${speed} times. Change speed`}>
                {speed}×
              </button>
            </div>
          </>
        )}
        <button type="button" className="btn btn-good min-h-14 text-xl" onClick={() => finish(true)}>
          Try one more
        </button>
      </div>
    </div>
  );
}
