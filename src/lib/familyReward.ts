import type { ChildSettings } from "./model";

// A reward a parent promises for coins earned by learning ("500 coins = movie night"). The reward is
// given by the parent outside the app: coins are never spent on it, and a child can't buy anything.
// It lives in the child's synced settings. Progress is the coins earned since the parent set it, read
// from the same total as the trophies, so nothing else is stored.

export interface FamilyReward {
  id: string;
  /** What the parent promised, in their own words (40 characters at most). */
  name: string;
  /** Coins to earn. */
  coins: number;
  /** The child's total coins earned when the reward was set. */
  startCoins: number;
  setAt: number;
}

export const REWARD_COINS = [100, 250, 500, 1000, 2500] as const;
export const REWARD_NAME_MAX = 40;
export const REWARD_IDEAS = ["Movie night", "Ice cream trip", "Pick the family game", "A trip to the park", "Choose the dinner"] as const;

/** Trims, collapses spaces and keeps the first 40 characters; empty if nothing is left. */
export function cleanRewardName(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, REWARD_NAME_MAX).trim();
}

export interface RewardProgress {
  earned: number;
  goal: number;
  met: boolean;
}

export function rewardProgress(reward: FamilyReward, coinsEarned: number): RewardProgress {
  const earned = Math.min(reward.coins, Math.max(0, coinsEarned - reward.startCoins));
  return { earned, goal: reward.coins, met: earned >= reward.coins };
}

/** The reward as stored, or undefined when the saved value isn't a usable reward. */
export function readReward(settings: Pick<ChildSettings, "reward"> | undefined): FamilyReward | undefined {
  const r = settings?.reward;
  if (!r || typeof r.name !== "string" || !cleanRewardName(r.name) || !(r.coins > 0)) return undefined;
  return { ...r, name: cleanRewardName(r.name), startCoins: Math.max(0, r.startCoins || 0) };
}
