import { parseUnitKey } from "@/content";
import type { AppEvent } from "./model";

// Short help videos for a child who has missed a question twice (flag `video-help`, members only). The list is
// small and lives in code; the files are in public/videos/help/. See docs/video-help/README.md.

export interface HelpVideo {
  id: string;
  title: string;
  /** Length in seconds, 30 to 90 for a real video. */
  seconds: number;
  src: string;
  captions: string;
  /** A stand-in clip, not narrated. Never switch the flag on while one is listed. */
  placeholder?: boolean;
}

/** Videos by unit key (`<grade>/<subject>/<unit id>`). Shared units share the video, so it names no region or money. */
export const HELP_VIDEOS: Record<string, HelpVideo> = {
  "3/math/fractions": {
    id: "sample-fractions",
    title: "What a fraction is",
    seconds: 8,
    src: "/videos/help/sample-fractions.mp4",
    captions: "/videos/help/sample-fractions.vtt",
    placeholder: true,
  },
};

export function helpVideoFor(unitKey: string): HelpVideo | undefined {
  return HELP_VIDEOS[unitKey];
}

export const VIDEO_DAYS = 30;
/** The next answer on the same unit counts as "after the video" only within this long. */
const FOLLOW_MS = 24 * 3_600_000;

export interface VideoStats {
  /** Videos watched in the last `VIDEO_DAYS` days. */
  watched: number;
  /** Of those, how many were followed by an answer on the same unit, and how many of those were right on the first try. */
  followed: number;
  right: number;
  /** Units watched, most recent first. */
  units: string[];
}

/** What one child did with help videos lately. Read from events only; practice, not a report-card mark. */
export function videoStats(events: AppEvent[], profileId: string, now: number, resetAt = 0): VideoStats {
  const since = Math.max(now - VIDEO_DAYS * 86_400_000, resetAt);
  const mine = events.filter((e) => e.profileId === profileId && e.t > resetAt).sort((a, b) => a.t - b.t);
  const out: VideoStats = { watched: 0, followed: 0, right: 0, units: [] };
  const seen = new Set<string>();
  for (let i = 0; i < mine.length; i++) {
    const v = mine[i];
    if (v.type !== "video" || v.t <= since || seen.has(v.id) || !parseUnitKey(v.unit)) continue;
    seen.add(v.id);
    out.watched++;
    out.units.unshift(v.unit);
    const next = mine.slice(i + 1).find((e) => e.type === "answer" && e.unit === v.unit && !e.fact);
    if (next && next.type === "answer" && next.t - v.t <= FOLLOW_MS) {
      out.followed++;
      if (next.correct) out.right++;
    }
  }
  out.units = [...new Set(out.units)];
  return out;
}
