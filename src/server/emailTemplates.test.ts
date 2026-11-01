import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES, EMAIL_WORDMARK } from "@/lib/emailImages";
import * as t from "./emailTemplates";

const O = "https://app.test";
const every = [
  t.verifyEmail("a@example.com", O, "tok"),
  t.resetEmail("a@example.com", O, "tok"),
  t.trialRecapEmail("a@example.com", O, 5, [{ name: "Maya", answers: 40, activeDays: 3, minutes: 30 }]),
  t.trialEndingEmail("a@example.com", O, 2),
  t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u"),
  t.reminderEmail("a@example.com", O, [{ name: "Maya", daysQuiet: 5 }], "u"),
  t.newSignInEmail("a@example.com", O, "Safari on iPad"),
  t.passwordChangedEmail("a@example.com", O),
  t.accountDeletedEmail("a@example.com", O),
  t.inactiveClassEmail("a@example.com", O, "Room 4", "June 1"),
  t.classInviteEmail("a@example.com", O, "Room 4", "b@example.com"),
  t.adminMessageEmail("a@example.com", O, { subject: "News", label: "n", paragraphs: ["Hi"], button: null }, "u", "admin"),
  t.alertEmail("a@example.com", O, { subject: "Alert", heading: "Alert", lines: ["x"] }),
  t.paymentProblemEmail("a@example.com", O, "admin"),
  t.consentEmail("a@example.com", O, "tok"),
  t.consentEmail("a@example.com", O, "tok", true),
];

describe("branding in every email", () => {
  it("shows Ollie from our own site, the same image for everyone", () => {
    const ollie = EMAIL_IMAGES.ollie;
    for (const e of every) {
      expect(e.html).toContain(`<img src="${O}${ollie.path}" width="${ollie.size}" height="${ollie.size}" alt="${ollie.alt}"`);
      // Ollie and the name, with no query string: nothing that could tell us who opened it.
      expect(e.html.match(/<img /g)).toHaveLength(2);
      expect(ollie.path).not.toContain("?");
      expect(EMAIL_WORDMARK.path).not.toContain("?");
    }
  });

  it("shows the name as a picture in the site's logo font, so Gmail and Outlook don't swap in Arial", () => {
    const w = EMAIL_WORDMARK;
    expect(w.alt).toBe(APP_NAME);
    for (const e of every) {
      expect(e.html).toContain(`<a href="${O}/" style="text-decoration:none"><img src="${O}${w.path}" width="${w.width}" height="${w.height}" alt="${APP_NAME}"`);
      // With images off, the alt text still looks like the logo.
      expect(e.html).toContain(`font-family:${EMAIL_FONTS.wordmark.stack};font-size:${w.fontSize}px;font-weight:700;line-height:1;color:${WORDMARK_COLOURS[0]}">`);
    }
  });

  it("draws the name at 3x its size in the email, for sharp screens", () => {
    const png = readFileSync(join(process.cwd(), "public", EMAIL_WORDMARK.path));
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([EMAIL_WORDMARK.width * 3, EMAIL_WORDMARK.height * 3]);
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
    for (const img of [...Object.values(EMAIL_IMAGES), EMAIL_WORDMARK]) {
      const file = join(process.cwd(), "public", img.path);
      expect(existsSync(file)).toBe(true);
      expect(readFileSync(file).subarray(1, 4).toString()).toBe("PNG");
    }
  });
});

describe("US parental consent emails", () => {
  it("repeat the notice and carry the withdraw link, now and in the delayed confirmation", () => {
    for (const followUp of [false, true]) {
      const e = t.consentEmail("a@example.com", O, "t/1", followUp);
      expect(e.kind).toBe("consent");
      expect(e.text).toContain(`${O}/account/consent/?token=t%2F1`);
      expect(e.text).toContain("first name or nickname");
      expect(e.text).toMatch(/don’t sell/);
      expect(e.text).toMatch(/delete your children's information from our servers/);
      // Transactional: no unsubscribe header.
      expect(e.unsubscribeUrl).toBeUndefined();
    }
    expect(t.consentEmail("a@example.com", O, "x", true).subject).toMatch(/^Reminder/);
    expect(t.consentEmail("a@example.com", O, "x").subject).not.toMatch(/^Reminder/);
  });
});

describe("school-year lines in the weekly email", () => {
  it("come after the children, before the practice note, in the family's English", () => {
    const line = "Summer sneak peek: Maya can try Grade 5 lessons from the Lessons screen. Whatever they practise counts once they move up.";
    const ca = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u", "CA", [line]);
    expect(ca.text.indexOf("Maya: 30 min")).toBeLessThan(ca.text.indexOf("Summer sneak peek"));
    expect(ca.text.indexOf("Summer sneak peek")).toBeLessThan(ca.text.indexOf("This reflects practice"));
    expect(ca.html).toContain("Whatever they practise counts");
    expect(t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u", "US", [line]).text).toContain("Whatever they practice counts");
    expect(t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u").text).not.toContain("sneak peek");
  });
});

describe("emails to a US family", () => {
  const kids = [{ name: "Maya", answers: 40, activeDays: 3, minutes: 30, strength: "Colours and shapes" }];
  it("are in US English, and the same emails stay Canadian for a Canadian family", () => {
    const us = [
      t.trialRecapEmail("a@example.com", O, 5, kids, "US"),
      t.trialEndingEmail("a@example.com", O, 2, kids, "US"),
      t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 0, answers: 0, accuracy: null, month: { minutes: 30, answers: 40, previousAnswers: 0, activeDays: 3 } }], "u", "US"),
      t.reminderEmail("a@example.com", O, [{ name: "Maya", daysQuiet: 5 }], "u", "US"),
    ];
    const text = us.map((e) => `${e.subject}\n${e.text}\n${e.html}`).join("\n");
    expect(text).not.toMatch(/practis|favourite|[Cc]olour(?!:)/);
    expect(text).toContain("Maya has practiced on 3 days");
    expect(text).toContain("didn't practice this week");
    expect(text).toContain("Their favorite lessons");
    expect(t.reminderEmail("a@example.com", O, [{ name: "Maya", daysQuiet: 5 }], "u").text).toContain("Their favourite lessons");
    expect(t.trialRecapEmail("a@example.com", O, 5, kids, "CA").text).toContain("Maya has practised on 3 days");
  });
});

describe("trial emails name the units that lock (flag personal-paywall)", () => {
  it("adds one line per child under their totals, and none when nothing would lock", () => {
    const kids = [
      { name: "Maya", answers: 40, activeDays: 3, minutes: 30, started: 5, locking: ["Fractions", "Place value", "Patterns"] },
      { name: "Leo", answers: 12, activeDays: 1, minutes: 8, started: 2, locking: [] },
    ];
    const text = t.trialEndingEmail("a@example.com", O, 2, kids).text;
    expect(text).toContain("Maya has started 5 units. 3 of them lock when the trial ends: Fractions, Place value and 1 more.");
    expect(text).not.toMatch(/Leo has started/);
    expect(t.trialRecapEmail("a@example.com", O, 5, kids).text).toContain("3 of them lock when the trial ends");
  });
});


describe("goal plan lines in the weekly email", () => {
  it("come under the child, before homework", () => {
    const goal = ["  Maya's goal: Ready for Grade 5 Math by Sep 1. 3 of 12 units at Proficient, on track.", "  Up next: Fractions."];
    const mail = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80, goal, homework: ["  Homework: Decimals"] }], "u");
    expect(mail.text.indexOf("Maya: 30 min")).toBeLessThan(mail.text.indexOf("Maya's goal"));
    expect(mail.text.indexOf("Up next: Fractions")).toBeLessThan(mail.text.indexOf("Homework: Decimals"));
  });
});
