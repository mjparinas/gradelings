import { BANDS, activitiesPath } from "./activitiesData";

export function allActivitiesPaths(): { path: string }[] {
  return [
    { path: activitiesPath.hub() },
    { path: activitiesPath.readingLog() },
    { path: activitiesPath.talkCards() },
    ...BANDS.flatMap((b) => [{ path: activitiesPath.calendar(b) }, { path: activitiesPath.games(b) }]),
  ];
}
