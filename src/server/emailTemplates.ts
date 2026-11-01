import "server-only";
import { APP_NAME, CONTACT_EMAIL, LEGAL_NAME, MAILING_ADDRESS, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES, EMAIL_WORDMARK } from "@/lib/emailImages";
import { CONSENT_NOTICE } from "@/lib/coppa";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, REFUND_DAYS, SUBSCRIBE_HREF } from "@/lib/plan";
import { countryOf, type CountryCode } from "@/lib/country";
import type { EmailKind } from "@/lib/emailKinds";
import { localizeCopy } from "@/content/locale";
import { stakeLine } from "@/lib/paywall";
import type { Email } from "./email";
import { schoolYearName, yearReviewLines, type YearReviewChild } from "@/lib/yearReview";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

interface Parts {
  to: string;
  /** Logged in the admin panel's email log; left out for mail that isn't to an account (question reports). */
  kind?: EmailKind;
  subject: string;
  heading: string;
  /** Plain paragraphs. */
  body: string[];
  button?: { label: string; url: string };
  /** Small print under the button. */
  footnote?: string;
  /** One-click endpoint for the List-Unsubscribe header. */
  unsubscribeUrl?: string;
  /** Page the footer link opens. */
  unsubscribePage?: string;
  origin: string;
  /** The family's country: a US family reads the email in US English ("practiced", "favorite"). Canada when left out. */
  country?: CountryCode;
}

/**
 * The name drawn in Fredoka, as on the site. An image, because Gmail and Outlook for Windows ignore web fonts; with
 * images off, the alt text shows in the logo's first colour and in Fredoka where the client has it.
 */
function wordmark(origin: string): string {
  const w = EMAIL_WORDMARK;
  return `<img src="${esc(origin)}${w.path}" width="${w.width}" height="${w.height}" alt="${esc(w.alt)}" style="display:block;border:0;font-family:${EMAIL_FONTS.wordmark.stack};font-size:${w.fontSize}px;font-weight:700;line-height:1;color:${WORDMARK_COLOURS[0]}">`;
}

/** The logo and Ollie at the top of every email, linking to the site. Tables, because Outlook ignores flexbox. */
function header(origin: string): string {
  const ollie = EMAIL_IMAGES.ollie;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px"><tr>
<td style="vertical-align:middle;padding-right:10px"><a href="${esc(origin)}/" style="text-decoration:none;color:#5b6478"><img src="${esc(origin)}${ollie.path}" width="${ollie.size}" height="${ollie.size}" alt="${esc(ollie.alt)}" style="display:block;border:0;font-size:12px;color:#5b6478"></a></td>
<td style="vertical-align:middle"><a href="${esc(origin)}/" style="text-decoration:none">${wordmark(origin)}</a></td>
</tr></table>`;
}

/** Andika and Fredoka from our own site, for the clients that load web fonts. */
function fontFaces(origin: string): string {
  return Object.values(EMAIL_FONTS)
    .flatMap((font) => font.files.map((f) => ({ ...f, family: font.family })))
    .map((f) => `@font-face{font-family:${f.family};font-style:normal;font-weight:${f.weight};src:url(${esc(origin)}${f.path}.woff2) format("woff2"),url(${esc(origin)}${f.path}.woff) format("woff")}`)
    .join("");
}

/** One simple layout for every email: the logo and Ollie from our own site. */
function layout(parts: Parts): Email {
  const locale = countryOf(parts.country).locale;
  const say = (t: string) => localizeCopy(t, locale);
  const p: Parts = {
    ...parts,
    subject: say(parts.subject),
    heading: say(parts.heading),
    body: parts.body.map(say),
    button: parts.button && { ...parts.button, label: say(parts.button.label) },
    footnote: parts.footnote && say(parts.footnote),
  };
  const button = p.button
    ? `<p style="margin:24px 0"><a href="${esc(p.button.url)}" style="background:#25b47e;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:12px;display:inline-block">${esc(p.button.label)}</a></p>`
    : "";
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${fontFaces(p.origin)}</style></head><body style="margin:0;background:#f7f5f0;font-family:${EMAIL_FONTS.text.stack};color:#1d2233">
<div style="max-width:520px;margin:0 auto;padding:24px">
${header(p.origin)}
<div style="background:#fff;border-radius:16px;padding:24px;line-height:1.55">
<h1 style="font-size:22px;margin:0 0 12px">${esc(p.heading)}</h1>
${p.body.map((t) => `<p style="margin:0 0 12px">${esc(t)}</p>`).join("")}
${button}
${p.footnote ? `<p style="font-size:13px;color:#5b6478;margin:0">${esc(p.footnote)}</p>` : ""}
</div>
<p style="font-size:12px;color:#5b6478;margin:16px 4px 0">${esc(APP_NAME)} has no ads and never sells your information. <a href="${esc(p.origin)}/privacy/" style="color:#5b6478">Privacy</a> · Questions? ${esc(CONTACT_EMAIL)}${p.unsubscribePage ? ` · <a href="${esc(p.unsubscribePage)}" style="color:#5b6478">Unsubscribe</a>` : ""}</p>
${MAILING_ADDRESS ? `<p style="font-size:12px;color:#5b6478;margin:4px 4px 0">${esc(LEGAL_NAME)} · ${esc(MAILING_ADDRESS)}</p>` : ""}
</div></body></html>`;
  const text = [
    p.heading,
    "",
    ...p.body,
    ...(p.button ? ["", `${p.button.label}: ${p.button.url}`] : []),
    ...(p.footnote ? ["", p.footnote] : []),
    "",
    `${APP_NAME} has no ads and never sells your information. Privacy: ${p.origin}/privacy/`,
    ...(p.unsubscribePage ? [`Unsubscribe: ${p.unsubscribePage}`] : []),
    // CASL requires the sender's postal address in every commercial message.
    ...(MAILING_ADDRESS ? [`${LEGAL_NAME} · ${MAILING_ADDRESS}`] : []),
  ].join("\n");
  return { to: p.to, subject: p.subject, html, text, unsubscribeUrl: p.unsubscribeUrl, kind: p.kind };
}

/** `reports`: the account was made from an email alone to get the weekly report, so it has no password yet. */
export function verifyEmail(to: string, origin: string, token: string, reports = false): Email {
  return layout({
    kind: "verify",
    to,
    origin,
    subject: `Confirm your email for ${APP_NAME}`,
    heading: `Welcome to ${APP_NAME}!`,
    body: reports
      ? [
          "Please confirm your email address, and we'll start sending the weekly progress report and a note before the free trial ends.",
          "Your child's progress is now backed up. To open the parent area on another device, ask for a sign-in link there: there's no password to remember.",
        ]
      : ["Please confirm your email address so we can reach you about your account, and so you can reset your password if you ever forget it."],
    button: { label: "Confirm my email", url: `${origin}/account/verify/?token=${encodeURIComponent(token)}` },
    footnote: "This link works for 3 days. If you didn't create an account, you can ignore this email.",
  });
}

export function resetEmail(to: string, origin: string, token: string): Email {
  return layout({
    kind: "reset",
    to,
    origin,
    subject: `Reset your ${APP_NAME} password`,
    heading: "Reset your password",
    body: ["We received a request to reset the password for your account. Use the button below to choose a new one."],
    button: { label: "Choose a new password", url: `${origin}/account/reset/?token=${encodeURIComponent(token)}` },
    footnote: "This link works for 1 hour and can be used once. If you didn't ask for this, you can ignore this email; your password hasn't changed.",
  });
}

/** `to` picks where the link lands once signed in: the parent area or the teacher area. */
export function magicLinkEmail(to: string, origin: string, token: string, dest: "parents" | "teachers" = "parents"): Email {
  return layout({
    kind: "magic",
    to,
    origin,
    subject: `Your ${APP_NAME} sign-in link`,
    heading: "Sign in with one tap",
    body: ["Use the button below to sign in. You won't need your password."],
    button: { label: "Sign in", url: `${origin}/account/magic/?token=${encodeURIComponent(token)}${dest === "teachers" ? "&to=teachers" : ""}` },
    footnote: "This link works for 15 minutes and can be used once. If you didn't ask for it, you can ignore this email; nobody can sign in without it.",
  });
}

/** For an account that signs in with its password (and a code), when someone asks it for a sign-in link. */
export function magicLinkUnavailableEmail(to: string, origin: string): Email {
  return layout({
    kind: "magic",
    to,
    origin,
    subject: `Sign-in links aren't available for your ${APP_NAME} account`,
    heading: "Please use your password",
    body: ["Someone asked for a sign-in link for this account. For security, this account signs in with its password (and a code from your authenticator app, if it has two-step sign-in turned on) instead of a link."],
    button: { label: "Go to sign in", url: `${origin}/parents/` },
    footnote: "If you didn't ask for this, you can ignore this email; nothing has changed.",
  });
}

/** What a child did during the trial: first name and practice totals only. */
export interface TrialChild {
  name: string;
  answers: number;
  activeDays: number;
  minutes: number;
  strength?: string;
  /** Units started, and the titles of those that lock when the trial ends (flag `personal-paywall`). */
  started?: number;
  locking?: string[];
}

function recapLines(children: TrialChild[]): string[] {
  return children
    .filter((c) => c.answers > 0)
    .flatMap((c) => {
      const stake = c.locking && stakeLine({ name: c.name, started: c.started ?? c.locking.length, locking: c.locking }, "trial");
      return [
        `${c.name} has practised on ${c.activeDays} ${c.activeDays === 1 ? "day" : "days"}: ${c.minutes} min and ${c.answers} questions so far.`,
        ...(c.strength ? [`  Going well: ${c.strength}`] : []),
        ...(stake ? [`  ${stake}`] : []),
      ];
    });
}

const KEEP_FREE = `After the trial, the first ${FREE_UNITS_PER_COURSE} units of every course and a summary of each child's report stay free forever. The family plan keeps every unit, mode, game and full report open for up to ${MAX_CHILDREN} children.`;

/** Mid-trial: what the trial has done so far. Sent once, to parents whose children have practised. */
export function trialRecapEmail(to: string, origin: string, daysLeft: number, children: TrialChild[], country?: CountryCode): Email {
  return layout({
    country,
    kind: "trial-recap",
    to,
    origin,
    subject: `${APP_NAME}: what your trial has done so far`,
    heading: "Your trial so far",
    body: [
      ...recapLines(children),
      `${daysLeft} ${daysLeft === 1 ? "day" : "days"} of the free trial left. This reflects practice in the app, not a report-card mark.`,
      KEEP_FREE,
      "You can subscribe now, before the trial ends. You'll be charged at checkout and the paid plan starts that day. Full reports are in the Parent area during the trial, and with the family plan after it.",
    ],
    button: { label: "Subscribe", url: `${origin}${SUBSCRIBE_HREF}` },
  });
}

export function trialEndingEmail(to: string, origin: string, daysLeft: number, children: TrialChild[] = [], country?: CountryCode): Email {
  const recap = recapLines(children);
  return layout({
    country,
    kind: "trial-ending",
    to,
    origin,
    subject: `Your ${APP_NAME} free trial ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}`,
    heading: `Your free trial ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}`,
    body: [
      ...(recap.length ? ["Here's what the trial has done:", ...recap] : []),
      KEEP_FREE,
      "Subscribe before the trial ends to keep everything open. You'll be charged at checkout and the paid plan starts that day. There's nothing to do if you'd like to stay on the free units. No card was needed to start.",
    ],
    button: { label: "Subscribe", url: `${origin}${SUBSCRIBE_HREF}` },
  });
}

export interface WeeklyChild {
  name: string;
  minutes: number;
  answers: number;
  accuracy: number | null;
  strength?: string;
  next?: string;
  /** Set on the first Sunday of the month: the last 30 days against the 30 before. */
  month?: { minutes: number; answers: number; previousAnswers: number; activeDays: number };
  /** Homework from the child's class (`homeworkEmailLines`), already indented. */
  homework?: string[];
  /** Math facts, stories and an idea to try at home (`weeklyExtras.ts`), already indented. */
  extras?: string[];
}

/** One sentence about a month of practice. Warm either way: a quieter month is never framed as a loss. */
export function monthLine(name: string, m: NonNullable<WeeklyChild["month"]>): string {
  if (!m.answers) return `Your month: ${name} didn't practise in the last 30 days. Any day is a good day to start again.`;
  const days = `${m.activeDays} ${m.activeDays === 1 ? "day" : "days"}`;
  const base = `Your month: ${name} practised on ${days}, ${m.minutes} min in all, ${m.answers} questions`;
  if (m.previousAnswers && m.answers > m.previousAnswers) return `${base}, up from ${m.previousAnswers} the month before. 🎉`;
  return `${base}.`;
}

/** `schoolYear`: lines from `schoolYearLines` (src/lib/schoolYear.ts), shown after the children. */
export function weeklyEmail(to: string, origin: string, children: WeeklyChild[], unsubToken: string, country?: CountryCode, schoolYear: string[] = []): Email {
  const lines = children.flatMap((c) => [
    c.answers
      ? `${c.name}: ${c.minutes} min of practice, ${c.answers} questions${c.accuracy === null ? "" : `, ${c.accuracy}% right on the first try`}.`
      : `${c.name} didn't practise this week. A short session today is a great restart.`,
    ...(c.strength ? [`  Going well: ${c.strength}`] : []),
    ...(c.next ? [`  Next up: ${c.next}`] : []),
    ...(c.homework ?? []),
    ...(c.extras ?? []),
    ...(c.month ? [monthLine(c.name, c.month)] : []),
  ]);
  return layout({
    country,
    kind: "weekly",
    to,
    origin,
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?token=${encodeURIComponent(unsubToken)}`,
    unsubscribePage: `${origin}/account/unsubscribe/?token=${encodeURIComponent(unsubToken)}`,
    subject: `${APP_NAME}: your week in learning`,
    heading: "Your week in learning",
    body: [...lines, ...schoolYear, "This reflects practice in the app. It isn't a report-card mark; your child's teacher decides proficiency."],
    button: { label: "Open full reports", url: `${origin}/parents/#/reports` },
  });
}

/** The June year in review: each child's school year in practice totals, with a button to the printable page. Goes with progress emails, so it unsubscribes like the weekly report. */
export function yearReviewEmail(to: string, origin: string, children: YearReviewChild[], unsubToken: string, country: CountryCode | undefined, year: number): Email {
  const q = encodeURIComponent(unsubToken);
  const names = children.map((c) => c.name);
  const who = names.length === 1 ? `${names[0]}'s` : "your family's";
  return layout({
    country,
    kind: "year-review",
    to,
    origin,
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?token=${q}`,
    unsubscribePage: `${origin}/account/unsubscribe/?token=${q}`,
    subject: `${APP_NAME}: ${who} ${schoolYearName(year)} school year`,
    heading: `The ${schoolYearName(year)} school year in review`,
    body: [
      ...children.flatMap(yearReviewLines),
      "The parent area has a page for each child with stickers, trophies and every unit that grew, ready to print or keep.",
      "This reflects practice in the app. It isn't a report-card mark; your child's teacher decides proficiency.",
    ],
    button: { label: "See the year in review", url: `${origin}/parents/#/year` },
  });
}

export interface ReminderChild {
  name: string;
  /** Whole days since the last practice. */
  daysQuiet: number;
}

/** A gentle, parent-only nudge. Warm and brief, never guilt: a child's name and a day count, nothing else. */
export function reminderEmail(to: string, origin: string, children: ReminderChild[], unsubToken: string, country?: CountryCode): Email {
  const names = children.map((c) => c.name);
  const who = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
  const lines = children.map((c) => `${c.name} last practised ${c.daysQuiet} days ago. A short session today, even 10 minutes, picks the momentum right back up.`);
  const q = encodeURIComponent(unsubToken);
  return layout({
    country,
    kind: "reminder",
    to,
    origin,
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?kind=reminders&token=${q}`,
    unsubscribePage: `${origin}/account/unsubscribe/?kind=reminders&token=${q}`,
    subject: `A good day for a little ${APP_NAME} with ${who}`,
    heading: "A good day for a short session",
    body: [...lines, "Every bit counts, and there's no streak to lose. Their favourite lessons are always waiting."],
    button: { label: `Open ${APP_NAME}`, url: `${origin}/play/` },
    footnote: "You asked for practice reminders. We send at most one a week, and only after a few quiet days.",
  });
}

/** A message from the contact form, to our own inbox. Replying answers the sender. */
export function contactMessageEmail(to: string, p: { name: string; email: string; topic: string; message: string }, origin: string): Email {
  const who = p.name ? `${p.name} <${p.email}>` : p.email;
  return {
    ...layout({
      to,
      origin,
      subject: `Contact form: ${p.topic} from ${p.name || p.email}`,
      heading: `Contact form: ${p.topic}`,
      body: [`From: ${who}`, ...p.message.split(/\n{2,}/)],
      footnote: "Sent from the contact page. Reply to this email to answer them.",
    }),
    replyTo: p.email,
  };
}

export function newSignInEmail(to: string, origin: string, device: string): Email {
  return layout({
    kind: "new-sign-in",
    to,
    origin,
    subject: `New sign-in to your ${APP_NAME} account`,
    heading: "New sign-in",
    body: [`Your account was just signed in to from ${device}.`, "If that was you, there's nothing to do. If it wasn't, reset your password now; that signs every device out."],
    button: { label: "Open the parent area to reset it", url: `${origin}/parents/` },
  });
}

export function googleLinkedEmail(to: string, origin: string): Email {
  return layout({
    kind: "google-linked",
    to,
    origin,
    subject: `Google sign-in was added to your ${APP_NAME} account`,
    heading: "You can now sign in with Google",
    body: [
      "Someone just signed in to your account with a Google account that uses this email address, so \"Continue with Google\" now works for it. Your children and progress are all there.",
      "If that was you, there's nothing to do. If it wasn't, reset your password now; that signs every device out.",
    ],
    button: { label: "Open the parent area to reset it", url: `${origin}/parents/` },
  });
}

export function passwordChangedEmail(to: string, origin: string): Email {
  return layout({
    kind: "password-changed",
    to,
    origin,
    subject: `Your ${APP_NAME} password was changed`,
    heading: "Your password was changed",
    body: ["The password for your account was just changed, and other devices were signed out.", `If this wasn't you, reply to this email or write to ${CONTACT_EMAIL} straight away.`],
  });
}

export function accountDeletedEmail(to: string, origin: string): Email {
  return layout({
    to,
    origin,
    subject: `Your ${APP_NAME} account was deleted`,
    heading: "Your account was deleted",
    body: ["Your account, your children's progress on our servers and any shared report links have been deleted, and any subscription was cancelled.", `If you didn't do this, write to ${CONTACT_EMAIL} straight away.`],
  });
}

/**
 * US parental consent (COPPA "email plus"): the confirmation sent when a parent agrees, and the delayed one
 * sent a day or more later. Both repeat the notice and carry a link to withdraw consent, which deletes the
 * children's information from our servers. Transactional: no unsubscribe link, no child's name.
 */
export function consentEmail(to: string, origin: string, token: string, followUp = false): Email {
  return layout({
    kind: "consent",
    to,
    origin,
    subject: followUp ? `Reminder: you gave ${APP_NAME} permission for your children` : `You gave ${APP_NAME} permission for your children`,
    heading: followUp ? "A reminder about your permission" : "Thanks for your permission",
    body: [
      followUp
        ? `A day or more ago, someone using this email address agreed that ${APP_NAME} may keep their children's information to sync it between devices. We're writing again so you can be sure it was you.`
        : `You agreed that ${APP_NAME} may keep your children's information on our servers, so their progress syncs between your devices and shows in your reports.`,
      `What we keep: ${CONSENT_NOTICE.collect}`,
      `Why: ${CONSENT_NOTICE.why}`,
      CONSENT_NOTICE.never,
      CONSENT_NOTICE.retention,
      "If this wasn't you, or you change your mind, use the button below. We'll delete your children's information from our servers and stop syncing it. Progress on your devices stays where it is.",
    ],
    button: { label: "Withdraw my permission", url: `${origin}/account/consent/?token=${encodeURIComponent(token)}` },
    footnote: `You can also review or delete everything in the Parent area under Account. Our full privacy policy, including the section for families in the United States, is at ${origin}/privacy/.`,
  });
}

export function inactiveClassEmail(to: string, origin: string, className: string, deleteDate: string): Email {
  return layout({
    kind: "class-inactive",
    to,
    origin,
    subject: `Your ${APP_NAME} class “${className}” will be deleted in 1 month`,
    heading: "Your class will be deleted in 1 month",
    body: [
      `“${className}” has had no sign-ins for at least 11 months. ${APP_NAME} will delete the class and its class-account students on ${deleteDate}.`,
      "To keep the class, sign in to your teacher account before that date. This resets the inactivity period.",
      "Deleting the class removes its assignments and class-account student profiles, settings, practice history and sessions. Children linked by a parent are unlinked; their family data is kept.",
    ],
    button: { label: `Sign in to ${APP_NAME}`, url: `${origin}/teachers/` },
  });
}

/**
 * The Monday class email a teacher turned on: per class, who practised, current homework, units to reteach and students to
 * check in with (src/lib/classDigest.ts). First names and practice only. `button` opens the one class, or the class list.
 */
export function classDigestEmail(to: string, origin: string, classes: string[][], unsubToken: string, buttonPath: string, country?: CountryCode): Email {
  const q = encodeURIComponent(unsubToken);
  return layout({
    country,
    kind: "class-digest",
    to,
    origin,
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?kind=class&token=${q}`,
    unsubscribePage: `${origin}/account/unsubscribe/?kind=class&token=${q}`,
    subject: `${APP_NAME}: your class this week`,
    heading: "Your class this week",
    body: [...classes.flat(), "This reflects practice in the app, not a report-card mark. You decide proficiency."],
    button: { label: classes.length === 1 ? "Open the class" : "Open your classes", url: `${origin}${buttonPath}` },
    footnote: "You turned on the Monday class email in the teacher area. You can turn it off there, or with the unsubscribe link below.",
  });
}

export function classInviteEmail(to: string, origin: string, className: string, ownerEmail: string): Email {
  return layout({
    kind: "class-invite",
    to,
    origin,
    subject: `${ownerEmail} invited you to co-teach “${className}” on ${APP_NAME}`,
    heading: "You were invited to co-teach a class",
    body: [
      `${ownerEmail} invited you to share the class “${className}”. As a co-teacher you can see the class, its students’ first names and practice results on the assigned units, and you can assign units and print login cards.`,
      "Sign in to your teacher page and choose Accept to join. The invitation lasts 14 days. If you weren't expecting it, ignore this email and nothing is shared.",
    ],
    button: { label: "See the invitation", url: `${origin}/teachers/` },
  });
}

/**
 * A message the owner sends from the admin panel. It is marketing under Canada's anti-spam law, so it always has the
 * unsubscribe link (news and tips only) and the mailing address in the footer.
 */
export function adminMessageEmail(
  to: string,
  origin: string,
  m: { subject: string; label: string; paragraphs: string[]; button: { label: string; path: string } | null },
  unsubToken: string,
  sentBy: string,
): Email {
  const q = encodeURIComponent(unsubToken);
  return {
    ...layout({
      kind: "admin",
      to,
      origin,
      unsubscribeUrl: `${origin}/api/email/unsubscribe/?kind=updates&token=${q}`,
      unsubscribePage: `${origin}/account/unsubscribe/?kind=updates&token=${q}`,
      subject: m.subject,
      heading: m.subject,
      body: m.paragraphs,
      button: m.button ? { label: m.button.label, url: `${origin}${m.button.path}` } : undefined,
      footnote: "You're getting this because you have an account. You can turn off news and tips any time.",
    }),
    label: m.label,
    sentBy,
  };
}

/** An alert or the morning digest, to an admin account. Account emails only; never children's names. */
export function alertEmail(to: string, origin: string, a: { subject: string; heading: string; lines: string[]; path?: string; button?: string }): Email {
  return layout({
    kind: "alert",
    to,
    origin,
    subject: a.subject,
    heading: a.heading,
    body: a.lines,
    button: { label: a.button ?? "Open the admin panel", url: `${origin}${a.path ?? "/admin/"}` },
    footnote: "You get this because your account is an admin. Turn alerts or the digest off in the admin panel under Automations.",
  });
}

/** Tells a family a payment didn't go through, with a link to update the card. A billing notice, so it goes even with news and tips off. */
export function paymentProblemEmail(to: string, origin: string, sentBy: string): Email {
  return {
    ...layout({
      kind: "billing",
      to,
      origin,
      subject: `Your ${APP_NAME} payment didn't go through`,
      heading: "Your payment didn't go through",
      body: [
        `We couldn't take the latest payment for your ${APP_NAME} family plan. This often happens when a card expires or a bank holds a charge.`,
        "You can update your card in the Parent area under Subscription. Everything stays unlocked while you sort it out, and nothing is lost.",
      ],
      button: { label: "Update payment details", url: `${origin}/parents/#/subscription` },
      footnote: "Questions? Just reply to this email.",
    }),
    sentBy,
  };
}

/** The receipt for a gift: the code to pass on, how to use it and how to get a refund. Sent to the buyer only; we never write to the person who gets the gift. */
export function giftEmail(to: string, origin: string, p: { code: string; days: number; expires: string }): Email {
  return layout({
    kind: "gift",
    to,
    origin,
    subject: `Your ${APP_NAME} gift code`,
    heading: "Thank you for your gift",
    body: [
      `Here is the gift code for ${p.days} days of the ${APP_NAME} family plan, with everything unlocked for up to ${MAX_CHILDREN} children:`,
      p.code,
      `Pass it on to the family you're giving it to. They sign in to the Parent area, open Subscription and choose “Have a code?”. One family can use it once, any time before ${p.expires}.`,
      `Changed your mind? Reply to this email within ${REFUND_DAYS} days and we'll refund you in full.`,
    ],
    button: { label: "How to use the code", url: `${origin}/help/` },
    footnote: "Keep this email: the code is the gift. We don't store who it's for.",
  });
}
