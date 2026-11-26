import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES, EMAIL_WORDMARK } from "@/lib/emailImages";
import { EMAIL_SHOTS } from "@/lib/emailImages";
import { FEATURE_TIPS, tipForWeek } from "@/lib/emailFeatures";
import { PLAY_STORE_URL } from "@/lib/brand";
import * as t from "./emailTemplates";
import { layout } from "./emailLayout";

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
      expect(e.html.match(/<img /g)!.length).toBeGreaterThanOrEqual(2);
      for (const src of e.html.matchAll(/<img src="([^"]+)"/g)) expect(src[1]).not.toContain("?");
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
      expect(e.html).toContain(`font-family:${EMAIL_FONTS.text.stack}`);
      for (const f of files) expect(e.html).toContain(`url(${O}${f.path}.woff2)`);
      expect(e.html).not.toContain("fonts.googleapis");
    }
    for (const f of files) for (const ext of ["woff2", "woff"]) expect(existsSync(join(process.cwd(), "public", `${f.path}.${ext}`))).toBe(true);
  });

  it("holds up in Outlook for Windows and dark modes: cell colours, a 560 px ghost table, padding on the button's cell", () => {
    for (const e of every) {
      expect(e.html).toContain('<body bgcolor="#f7f5f0"');
      expect(e.html).toContain("<!--[if mso]><table");
      expect(e.html).toContain('<td bgcolor="#ffffff"');
      expect(e.html).toContain('name="color-scheme" content="light"');
      // Padding on the link itself is dropped by Outlook, which would draw a thin button.
      expect(e.html).not.toMatch(/<a [^>]*padding:14px 24px/);
    }
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
  it("come after the children, in the family's English", () => {
    const line = "Summer sneak peek: Maya can try Grade 5 lessons from the Lessons screen. Whatever they practise counts once they move up.";
    const ca = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u", "CA", [line]);
    expect(ca.text.indexOf("Maya: 30 min")).toBeLessThan(ca.text.indexOf("Summer sneak peek"));
    expect(ca.text).not.toContain("report-card mark");
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

describe("invite line in the weekly email", () => {
  const kids = [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }];
  it("carries the invite link when given, and is absent otherwise", () => {
    const link = `${O}/account/invite/?ref=ABCD2345`;
    const withLink = t.weeklyEmail("a@example.com", O, kids, "u", "CA", [], link);
    expect(withLink.text).toContain(link);
    expect(withLink.text).toContain("you get a free month");
    expect(withLink.text).not.toContain("report-card mark");
    expect(t.weeklyEmail("a@example.com", O, kids, "u").text).not.toContain("free month");
  });
});

describe("conversion copy (owner, November 2026)", () => {
  const kids = [{ name: "Maya", answers: 40, activeDays: 3, minutes: 30 }];
  const everything = [
    t.verifyEmail("a@example.com", O, "x", true),
    t.verifyEmail("a@example.com", O, "x"),
    t.trialRecapEmail("a@example.com", O, 5, kids),
    t.trialEndingEmail("a@example.com", O, 2, kids),
    t.trialEndingEmail("a@example.com", O, 2, []),
  ];
  it("never says grademap and names the grade range as Pre-K to Grade 9", () => {
    const text = everything.map((e) => `${e.subject}\n${e.text}\n${e.html}`).join("\n");
    expect(text).not.toMatch(/grademap/i);
    expect(t.trialEndingEmail("a@example.com", O, 2, []).text).toContain("Pre-K to Grade 9");
    expect(t.verifyEmail("a@example.com", O, "x").text).toContain("Pre-K to Grade 9");
  });
  it("trial emails make the deadline and the refund promise clear, and still say no card was needed", () => {
    const ending = t.trialEndingEmail("a@example.com", O, 2, kids);
    expect(ending.text).toContain("refund within 14 days");
    expect(ending.text).toContain("No card was needed to start");
    expect(t.trialRecapEmail("a@example.com", O, 1, kids).subject).toMatch(/^1 day left/);
  });
  it("the final notice thanks the family by child, links to pricing and is warm, not pushy", () => {
    const two = [...kids, { name: "Leo", answers: 10, activeDays: 2, minutes: 9 }];
    const ending = t.trialEndingEmail("a@example.com", O, 3, two);
    expect(ending.subject).toBe("3 days left: here's how Maya and Leo did on Gradelings");
    expect(ending.text).toContain("Thanks for trying Gradelings with Maya and Leo");
    expect(ending.text).toContain("See plans and prices: " + O + "/pricing/");
    expect(ending.text).toContain("There's no rush");
    expect(t.trialEndingEmail("a@example.com", O, 3, []).subject).toBe("Your Gradelings free trial ends in 3 days");
  });
  it("sends a family with no practice to a first session, not an empty recap", () => {
    expect(t.trialEndingEmail("a@example.com", O, 2, []).text).toContain("Ten minutes today");
  });
});

describe("warm week headline in the weekly email", () => {
  const send = (days: number | undefined, answers = 40) => t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers, accuracy: 80, days }], "u");
  it("celebrates days practised and names the child in the subject", () => {
    const mail = send(5);
    expect(mail.subject).toBe("Maya practised on 5 days this week");
    expect(mail.text).toContain("Maya practised on 5 days this week. That's a real habit.");
  });
  it("uses singular wording and keeps the old subject without a day count", () => {
    expect(send(1).subject).toBe("Maya practised on 1 day this week");
    expect(send(undefined).subject).toBe(`${APP_NAME}: your week in learning`);
  });
  it("adds no headline for a quiet week", () => {
    const mail = send(0, 0);
    expect(mail.text).toContain("didn't practise this week");
    expect(mail.text).not.toMatch(/Every bit counts|real habit/);
  });
});

describe("the refreshed look (November 2026)", () => {
  it("has a screenshot file for every shot, as a JPEG, and none are bigger than 300 KB", () => {
    for (const shot of Object.values(EMAIL_SHOTS)) {
      const file = join(process.cwd(), "public", shot.path);
      expect(existsSync(file)).toBe(true);
      const bytes = readFileSync(file);
      expect([bytes[0], bytes[1]]).toEqual([0xff, 0xd8]);
      expect(bytes.length).toBeLessThan(300_000);
      expect(shot.alt.length).toBeGreaterThan(20);
    }
  });

  it("shows the colour stripe, dark text on the green button and a screenshot with alt text", () => {
    const e = t.verifyEmail("a@example.com", O, "tok");
    for (const c of WORDMARK_COLOURS) expect(e.html).toContain(`bgcolor="${c}"`);
    expect(e.html).toMatch(/background:#25b47e[^>]*><a [^>]*color:#0f172a/);
    expect(e.html).toContain(`<img src="${O}${EMAIL_SHOTS.adventure.path}" width="${EMAIL_SHOTS.adventure.width}" alt="${EMAIL_SHOTS.adventure.alt}"`);
  });

  it("keeps account-security and billing emails plain: no screenshot", () => {
    for (const e of [t.resetEmail("a@example.com", O, "x"), t.newSignInEmail("a@example.com", O, "iPad"), t.passwordChangedEmail("a@example.com", O), t.consentEmail("a@example.com", O, "x"), t.paymentProblemEmail("a@example.com", O, "admin")])
      expect(e.html).not.toContain("/email/shots/");
  });

  it("points parents to the Android app, says iPhone is coming and never links an iOS store", () => {
    const e = t.verifyEmail("a@example.com", O, "tok");
    expect(e.html).toContain(`href="${PLAY_STORE_URL}"`);
    expect(e.text).toContain(PLAY_STORE_URL);
    expect(e.text).toMatch(/iPhone and iPad app is on its way/);
    expect(e.html).not.toContain("apps.apple.com");
  });

  it("marks family-plan features in words, in the HTML and the plain text, and only those", () => {
    const recap = t.trialRecapEmail("a@example.com", O, 5, [{ name: "Maya", answers: 40, activeDays: 3, minutes: 30 }]);
    expect(recap.html).toContain(">Family plan</span>");
    expect(recap.text).toContain("(Family plan)");
    for (const tip of FEATURE_TIPS) {
      const e = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u", "CA", [], undefined, FEATURE_TIPS.indexOf(tip) * 7 * 86_400_000);
      expect(e.html.includes(">Family plan</span>")).toBe(Boolean(tip.paid));
      expect(e.text).toContain(tip.title);
    }
  });

  it("rotates the weekly tip by week, the same for everyone, and covers every tip", () => {
    const week = 7 * 86_400_000;
    const ids = FEATURE_TIPS.map((_, i) => tipForWeek(i * week).id);
    expect(new Set(ids).size).toBe(FEATURE_TIPS.length);
    expect(tipForWeek(0).id).toBe(tipForWeek(week - 1).id);
    expect(FEATURE_TIPS.some((x) => x.paid)).toBe(true);
    expect(FEATURE_TIPS.some((x) => !x.paid)).toBe(true);
  });

  it("makes web addresses links, keeps their full stop outside, and indents notes under a line", () => {
    const e = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80, strength: "Fractions" }], "u", "CA", [], `${O}/account/invite/?ref=AB`);
    expect(e.html).toContain(`<a href="${O}/account/invite/?ref=AB" style`);
    expect(e.html).toContain("border-left:3px solid #e3e2de");
    expect(e.html).not.toContain("report-card mark");
  });

  it("reads in US English for a US family, callout and picture text included", () => {
    const e = t.weeklyEmail("a@example.com", O, [{ name: "Maya", minutes: 30, answers: 40, accuracy: 80 }], "u", "US", [], undefined, 0);
    expect(`${e.html}${e.text}`).not.toMatch(/practis|colour|favourite/);
  });

  it("never names a price or the old name in a callout or picture", () => {
    const all = [...FEATURE_TIPS.map((x) => `${x.title} ${x.body} ${x.shot.alt}`), ...Object.values(EMAIL_SHOTS).map((x) => x.alt)].join("\n");
    expect(all).not.toMatch(/\$|C\$|US\$|grademap/i);
  });

  it("renders bullets as a list in the HTML and as dashes in the text", () => {
    const e = layout({ to: "a@example.com", origin: O, subject: "s", heading: "h", body: ["Hi"], bullets: ["One", "Two [link](https://x.test/a)"] });
    expect(e.html).toContain("<li");
    expect(e.html).toContain('<a href="https://x.test/a"');
    expect(e.text).toContain("- One\n- Two link: https://x.test/a");
  });
});
