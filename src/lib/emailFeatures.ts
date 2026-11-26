import { APP_NAME, PLAY_STORE_URL } from "./brand";
import { EMAIL_SHOTS } from "./emailImages";
import type { EmailShot } from "./emailImages";

/**
 * One short, true thing about a feature, for the "Did you know" callout in our emails. `paid` marks a feature only the
 * family plan has (the email says so in words); everything else is open to every family. Only features that exist: when one
 * changes, change its tip. No prices, no dates and no promise of a mark.
 */
export interface FeatureTip {
  id: string;
  title: string;
  body: string;
  /** Index into the wordmark colours (see emailLayout). */
  accent: number;
  paid?: boolean;
  shot: EmailShot;
}

export const FEATURE_TIPS: readonly FeatureTip[] = [
  {
    id: "calm",
    title: "Calm mode, one switch",
    body: "In the Parent area under Settings, one switch calms the motion and sounds, hides the timers, holds trophy pop-ups until after the lesson and keeps sessions short. Easier reading adds roomy text on a cream page. Both are free.",
    accent: 5,
    shot: EMAIL_SHOTS.calm,
  },
  {
    id: "facts",
    title: "The math facts chart",
    body: "Math Facts gives short rounds of typed facts, brings tricky ones back more often and fills a 10 × 10 chart as each fact becomes quick. Known facts show their answer.",
    accent: 0,
    paid: true,
    shot: EMAIL_SHOTS.facts,
  },
  {
    id: "stories",
    title: "Read-along stories",
    body: "Short original stories read aloud, with each sentence lighting up as it's read, and a few questions after. They're matched to a child's reading level. The first two stories at each level are free.",
    accent: 1,
    shot: EMAIL_SHOTS.stories,
  },
  {
    id: "reports",
    title: "Reports that speak the report card's language",
    body: "Full reports show strengths, what's worth another go, charts and every unit in your province's own levels, with printing and share links. A summary of each child's report stays free.",
    accent: 2,
    paid: true,
    shot: EMAIL_SHOTS.reports,
  },
  {
    id: "games",
    title: "Games that are earned",
    body: "Learning earns game time, 20 minutes of learning for 5 of games by default, and new games unlock as a child levels up. Every game teaches something, and you can switch games off.",
    accent: 4,
    paid: true,
    shot: EMAIL_SHOTS.games,
  },
  {
    id: "rewards",
    title: "Trophies, stickers and no pressure",
    body: "Every lesson a child grows in earns a sticker, and coins come only from learning, never from money. There are no ads and nothing for sale to kids.",
    accent: 3,
    shot: EMAIL_SHOTS.rewards,
  },
  {
    id: "android",
    title: `${APP_NAME} on Android`,
    body: `The Android app is on Google Play: [Get it on Google Play](${PLAY_STORE_URL}). It works offline, and progress syncs with the website. An iPhone and iPad app is on its way; until then, the website works on any device.`,
    accent: 2,
    shot: EMAIL_SHOTS.adventure,
  },
  {
    id: "parent",
    title: "Your week at a glance",
    body: "The Parent area's Overview shows each child's week: days practised, what's going well and one small next step, with goals you can set and kind notes you can send.",
    accent: 0,
    shot: EMAIL_SHOTS.parent,
  },
];

/** The tip for a week: the same for everyone in that week, rotating through the list. */
export function tipForWeek(now: number): FeatureTip {
  const week = Math.floor(now / (7 * 86_400_000));
  return FEATURE_TIPS[week % FEATURE_TIPS.length];
}
