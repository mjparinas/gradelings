import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES } from "@/lib/emailImages";
import * as t from "./emailTemplates";

const O = "https://app.test";
const every = [
  t.verifyEmail("a@example.com", O, "tok"),
  t.resetEmail("a@example.com", O, "tok"),
  t.trialRecapEmail("a@example.com", O, 5, [{ name: "Maya", answers: 40, activeDays: 3, minutes: 30 }]),
  t.trialEndingEmail("a@example.com", O, 2),
  t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u"),
  t.reminderEmail("a@example.com", O, [{ name: "Maya", daysQuiet: 5 }], "u"),
  t.questionReportEmail("a@example.com", { unitKey: "math/add", prompt: "2+2", reason: "typo" }, O),
  t.newSignInEmail("a@example.com", O, "Safari on iPad"),
  t.passwordChangedEmail("a@example.com", O),
  t.accountDeletedEmail("a@example.com", O),
  t.inactiveClassEmail("a@example.com", O, "Room 4", "June 1"),
  t.classInviteEmail("a@example.com", O, "Room 4", "b@example.com"),
  t.adminMessageEmail("a@example.com", O, { subject: "News", label: "n", paragraphs: ["Hi"], button: null }, "u", "admin"),
  t.alertEmail("a@example.com", O, { subject: "Alert", heading: "Alert", lines: ["x"] }),
  t.paymentProblemEmail("a@example.com", O, "admin"),
];

describe("branding in every email", () => {
  it("shows Ollie from our own site, the same image for everyone", () => {
    const ollie = EMAIL_IMAGES.ollie;
    for (const e of every) {
      expect(e.html).toContain(`<img src="${O}${ollie.path}" width="${ollie.size}" height="${ollie.size}" alt="${ollie.alt}"`);
      // One <img>, with no query string: nothing that could tell us who opened it.
      expect(e.html.match(/<img /g)).toHaveLength(1);
      expect(ollie.path).not.toContain("?");
    }
  });

  it("spells the name in the logo's colours, one per letter", () => {
    const letters = APP_NAME.split("").map((ch, i) => `<span style="color:${WORDMARK_COLOURS[i % WORDMARK_COLOURS.length]}">${ch}</span>`).join("");
    for (const e of every) expect(e.html).toContain(`font-family:${EMAIL_FONTS.wordmark.stack};font-size:30px;font-weight:700;letter-spacing:-0.75px;line-height:1">${letters}`);
  });

  it("sets the text in Andika and the name in Fredoka, as on the site, loaded from our own site", () => {
    const files = Object.values(EMAIL_FONTS).flatMap((font) => font.files);
    for (const e of every) {
      expect(e.html).toContain(`<body style="margin:0;background:#f7f5f0;font-family:${EMAIL_FONTS.text.stack}`);
      for (const f of files) expect(e.html).toContain(`url(${O}${f.path}.woff2)`);
      expect(e.html).not.toContain("fonts.googleapis");
    }
    for (const f of files) for (const ext of ["woff2", "woff"]) expect(existsSync(join(process.cwd(), "public", `${f.path}.${ext}`))).toBe(true);
  });

  it("has the image files the emails point to, as PNGs (mail clients don't show SVG)", () => {
    for (const img of Object.values(EMAIL_IMAGES)) {
      const file = join(process.cwd(), "public", img.path);
      expect(existsSync(file)).toBe(true);
      expect(readFileSync(file).subarray(1, 4).toString()).toBe("PNG");
    }
  });
});
