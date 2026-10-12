// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Before = (e: { url: string }) => { url: string } | null;
const seen = vi.hoisted(() => ({ views: undefined as Before | undefined, speed: undefined as Before | undefined }));
vi.mock("@vercel/analytics/next", () => ({
  Analytics: ({ beforeSend }: { beforeSend: Before }) => {
    seen.views = beforeSend;
    return null;
  },
}));
vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: ({ beforeSend }: { beforeSend: Before }) => {
    seen.speed = beforeSend;
    return null;
  },
}));

import { SiteAnalytics } from "./SiteAnalytics";

beforeEach(() => {
  seen.views = undefined;
  seen.speed = undefined;
});
afterEach(() => vi.unstubAllEnvs());

describe("SiteAnalytics", () => {
  it("loads nothing off Vercel", () => {
    vi.stubEnv("NEXT_PUBLIC_ON_VERCEL", "");
    render(<SiteAnalytics />);
    expect(seen.views).toBeUndefined();
    expect(seen.speed).toBeUndefined();
  });

  it.each([
    "https://gradelings.com/play/",
    "https://gradelings.com/play",
    "https://gradelings.com/parents/#/reports",
    "https://gradelings.com/shared/abc123/",
    "https://gradelings.com/account/reset/?token=x",
    "https://gradelings.com/api/sync/",
  ])("never measures the private page %s", (url) => {
    vi.stubEnv("NEXT_PUBLIC_ON_VERCEL", "1");
    render(<SiteAnalytics />);
    expect(seen.views!({ url })).toBeNull();
    expect(seen.speed!({ url })).toBeNull();
  });

  it.each(["https://gradelings.com/", "https://gradelings.com/guides/bc/", "https://gradelings.com/player-guide/", "/pricing/"])("measures the public page %s", (url) => {
    vi.stubEnv("NEXT_PUBLIC_ON_VERCEL", "1");
    render(<SiteAnalytics />);
    const event = { url };
    expect(seen.views!(event)).toBe(event);
    expect(seen.speed!(event)).toBe(event);
  });
});
