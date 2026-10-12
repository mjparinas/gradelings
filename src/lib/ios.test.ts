// Keeps the iPhone and iPad app (ios/, docs/IOS.md) and the web app agreeing on the few things
// they share. The Swift side has its own tests, run on a Mac by .github/workflows/ios.yml.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { IOS_APP_AGENT } from "./twa";
import { ANDROID_PACKAGE } from "./android";
import { SITE_HOST } from "./brand";

const plist = readFileSync("ios/Gradelings/Info.plist", "utf8");
const project = readFileSync("ios/project.yml", "utf8");
const swift = readFileSync("ios/Gradelings/WebViewController.swift", "utf8");

/** The <string> values of one key's <array> in Info.plist. */
function plistArray(key: string): string[] {
  const m = plist.match(new RegExp(`<key>${key.replace(/[~]/g, "\\$&")}</key>\\s*<array>([\\s\\S]*?)</array>`));
  return m ? [...m[1].matchAll(/<string>([^<]*)<\/string>/g)].map((x) => x[1]) : [];
}
const plistString = (key: string) => plist.match(new RegExp(`<key>${key}</key>\\s*<string>([^<]*)</string>`))?.[1];

describe("iOS app", () => {
  it("opens the kids' app with the flag that hides purchases", () => {
    const start = new URL(plistString("GradelingsStartPath")!, "https://example.com");
    expect(start.pathname).toBe("/play/");
    expect(start.searchParams.get("app")).toBe("ios");
  });

  it("tells the site it's the app in its user agent", () => {
    expect(swift).toContain(`static let agentName = "${IOS_APP_AGENT}"`);
  });

  it("points at the production site, which is its only app-bound domain (needed for the offline service worker)", () => {
    expect(project).toMatch(new RegExp(`APP_ORIGIN: https://${SITE_HOST.replace(".", "\\.")}\\n`));
    expect(project).toMatch(new RegExp(`APP_DOMAIN: ${SITE_HOST.replace(".", "\\.")}\\n`));
    expect(plistArray("WKAppBoundDomains")).toEqual(["$(APP_DOMAIN)"]);
  });

  it("is one universal app for iPhone and iPad, in every orientation", () => {
    expect(project).toContain('TARGETED_DEVICE_FAMILY: "1,2"');
    expect(plistArray("UISupportedInterfaceOrientations~ipad")).toHaveLength(4);
    expect(plistArray("UISupportedInterfaceOrientations")).toEqual(
      expect.arrayContaining(["UIInterfaceOrientationPortrait", "UIInterfaceOrientationLandscapeLeft", "UIInterfaceOrientationLandscapeRight"]),
    );
    expect(plist).toMatch(/<key>UIRequiresFullScreen<\/key>\s*<false\/>/);
  });

  it("uses the same app id as the Android app", () => {
    expect(project).toContain(`PRODUCT_BUNDLE_IDENTIFIER: ${ANDROID_PACKAGE}\n`);
  });
});
