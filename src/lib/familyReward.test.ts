import { describe, expect, it } from "vitest";
import { cleanRewardName, readReward, rewardProgress, REWARD_NAME_MAX } from "./familyReward";

const reward = { id: "r", name: "Movie night", coins: 500, startCoins: 200, setAt: 1 };

describe("rewardProgress", () => {
  it("counts coins earned since the reward was set, capped at the goal", () => {
    expect(rewardProgress(reward, 200)).toEqual({ earned: 0, goal: 500, met: false });
    expect(rewardProgress(reward, 450)).toEqual({ earned: 250, goal: 500, met: false });
    expect(rewardProgress(reward, 700)).toEqual({ earned: 500, goal: 500, met: true });
    expect(rewardProgress(reward, 9000)).toMatchObject({ earned: 500, met: true });
  });

  it("never goes below zero if the child's total drops (a parent reset their progress)", () => {
    expect(rewardProgress(reward, 50).earned).toBe(0);
  });
});

describe("cleanRewardName", () => {
  it("trims, collapses spaces and keeps 40 characters", () => {
    expect(cleanRewardName("  Movie   night \n")).toBe("Movie night");
    expect(cleanRewardName("x".repeat(100))).toHaveLength(REWARD_NAME_MAX);
    expect(cleanRewardName("   ")).toBe("");
  });
});

describe("readReward", () => {
  it("returns undefined for nothing or a reward that can't be shown", () => {
    expect(readReward(undefined)).toBeUndefined();
    expect(readReward({})).toBeUndefined();
    expect(readReward({ reward: { ...reward, name: "  " } })).toBeUndefined();
    expect(readReward({ reward: { ...reward, coins: 0 } })).toBeUndefined();
  });

  it("cleans up a saved reward", () => {
    expect(readReward({ reward: { ...reward, name: "  Ice   cream " } })?.name).toBe("Ice cream");
  });
});
