import { beforeEach, describe, expect, it, vi } from "vitest";
import { cachedStats, clearStatsCache } from "./statsCache";

describe("admin stats cache", () => {
  beforeEach(() => {
    delete process.env.STATS_CACHE_MS;
    clearStatsCache();
  });

  it("builds once for repeat requests, per key, until cleared or expired", async () => {
    const build = vi.fn(async () => ({ n: 1 }));
    await cachedStats("all", build);
    await cachedStats("all", build);
    expect(build).toHaveBeenCalledTimes(1);
    await cachedStats("money", build);
    expect(build).toHaveBeenCalledTimes(2);
    clearStatsCache();
    await cachedStats("all", build);
    expect(build).toHaveBeenCalledTimes(3);
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 121_000);
    await cachedStats("all", build);
    expect(build).toHaveBeenCalledTimes(4);
    vi.useRealTimers();
  });

  it("does not cache when switched off", async () => {
    process.env.STATS_CACHE_MS = "0";
    const build = vi.fn(async () => ({}));
    await cachedStats("all", build);
    await cachedStats("all", build);
    expect(build).toHaveBeenCalledTimes(2);
  });
});
