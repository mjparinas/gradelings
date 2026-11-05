// Short how-to videos for grown-ups: teachers today, parents next (owner, November 2026). Each plays once on its own the
// first time a person uses the feature it explains, and a library lets them watch any of them again. The files are ours
// (public/videos/<set>/, made by scripts/help-videos, `--set teachers`), played with no third-party player.
// What has been seen is kept on the device, never synced: it is a convenience, so a new device just shows them again.

export interface TrainingVideo {
  id: string;
  title: string;
  /** One line for the library: what it shows. */
  blurb: string;
  /** Length in seconds. */
  seconds: number;
  src: string;
  captions: string;
}

const file = (set: string, id: string) => ({ src: `/videos/${set}/${id}.mp4`, captions: `/videos/${set}/${id}.vtt` });

/** The teacher videos, in the order a new teacher needs them. */
export const TEACHER_VIDEOS: readonly TrainingVideo[] = [
  { id: "teacher-class-setup", title: "Set up your class", blurb: "Create a class, find its class code and the five tabs.", seconds: 62, ...file("teachers", "teacher-class-setup") },
  { id: "teacher-add-students", title: "Add students and print login cards", blurb: "Add names, hand out codes and print cards.", seconds: 46, ...file("teachers", "teacher-add-students") },
  { id: "teacher-homework", title: "Assign homework", blurb: "Choose units, dates, question counts and who gets them.", seconds: 45, ...file("teachers", "teacher-homework") },
  { id: "teacher-progress", title: "Read your class progress", blurb: "Levels, who to check in with, printing and the class goal.", seconds: 56, ...file("teachers", "teacher-progress") },
  { id: "teacher-live", title: "Ask live questions", blurb: "The class timer, live questions and the answer desks.", seconds: 61, ...file("teachers", "teacher-live") },
];

/** Which video explains each class tab, shown the first time a teacher opens it. */
export const TEACHER_TAB_VIDEOS: Record<string, string> = {
  progress: "teacher-progress",
  homework: "teacher-homework",
  live: "teacher-live",
  students: "teacher-add-students",
};

export const videoById = (list: readonly TrainingVideo[], id: string) => list.find((v) => v.id === id);

const SEEN_KEY = "gradelings.trainvideo.seen";

/** Ids of the videos already shown on this device. Never throws: with no storage, nothing counts as seen. */
export function seenVideos(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export const hasSeenVideo = (id: string) => seenVideos().includes(id);

export function markVideoSeen(id: string): void {
  try {
    const seen = seenVideos();
    if (!seen.includes(id)) localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id].slice(-100)));
  } catch {
    /* no storage: the video may show again next time, which is harmless */
  }
}
