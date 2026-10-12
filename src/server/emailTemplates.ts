import "server-only";
import { APP_NAME, CONTACT_EMAIL, LEGAL_NAME, MAILING_ADDRESS, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES } from "@/lib/emailImages";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, SUBSCRIBE_HREF } from "@/lib/plan";
import type { EmailKind } from "@/lib/emailKinds";
import type { Email } from "./email";

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
}

/** The name in the logo's colours, one per letter as on the site. Text, not an image, so it shows even with images off. */
function wordmark(): string {
  const letters = APP_NAME.split("")
    .map((ch, i) => `<span style="color:${WORDMARK_COLOURS[i % WORDMARK_COLOURS.length]}">${esc(ch)}</span>`)
    .join("");
  return `<span style="font-family:${EMAIL_FONTS.wordmark.stack};font-size:30px;font-weight:700;letter-spacing:-0.75px;line-height:1">${letters}</span>`;
}

/** The logo and Ollie at the top of every email, linking to the site. Tables, because Outlook ignores flexbox. */
function header(origin: string): string {
  const ollie = EMAIL_IMAGES.ollie;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px"><tr>
<td style="vertical-align:middle;padding-right:10px"><a href="${esc(origin)}/" style="text-decoration:none;color:#5b6478"><img src="${esc(origin)}${ollie.path}" width="${ollie.size}" height="${ollie.size}" alt="${esc(ollie.alt)}" style="display:block;border:0;font-size:12px;color:#5b6478"></a></td>
<td style="vertical-align:middle"><a href="${esc(origin)}/" style="text-decoration:none">${wordmark()}</a></td>
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
function layout(p: Parts): Email {
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

export function verifyEmail(to: string, origin: string, token: string): Email {
  return layout({
    kind: "verify",
    to,
    origin,
    subject: `Confirm your email for ${APP_NAME}`,
    heading: `Welcome to ${APP_NAME}!`,
    body: ["Please confirm your email address so we can reach you about your account, and so you can reset your password if you ever forget it."],
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

/** What a child did during the trial: first name and practice totals only. */
export interface TrialChild {
  name: string;
  answers: number;
  activeDays: number;
  minutes: number;
  strength?: string;
}

function recapLines(children: TrialChild[]): string[] {
  return children
    .filter((c) => c.answers > 0)
    .flatMap((c) => [
      `${c.name} has practised on ${c.activeDays} ${c.activeDays === 1 ? "day" : "days"}: ${c.minutes} min and ${c.answers} questions so far.`,
      ...(c.strength ? [`  Going well: ${c.strength}`] : []),
    ]);
}

const KEEP_FREE = `After the trial, the first ${FREE_UNITS_PER_COURSE} units of every course stay free forever. The family plan keeps everything unlocked for up to ${MAX_CHILDREN} children.`;

/** Mid-trial: what the trial has done so far. Sent once, to parents whose children have practised. */
export function trialRecapEmail(to: string, origin: string, daysLeft: number, children: TrialChild[]): Email {
  return layout({
    kind: "trial-recap",
    to,
    origin,
    subject: `${APP_NAME}: what your trial has done so far`,
    heading: "Your trial so far",
    body: [
      ...recapLines(children),
      `${daysLeft} ${daysLeft === 1 ? "day" : "days"} of the free trial left. This reflects practice in the app, not a report-card mark.`,
      KEEP_FREE,
      "You can subscribe now, before the trial ends. You'll be charged at checkout and the paid plan starts that day. Full reports stay in the Parent area.",
    ],
    button: { label: "Subscribe", url: `${origin}${SUBSCRIBE_HREF}` },
  });
}

export function trialEndingEmail(to: string, origin: string, daysLeft: number, children: TrialChild[] = []): Email {
  const recap = recapLines(children);
  return layout({
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
}

/** One sentence about a month of practice. Warm either way: a quieter month is never framed as a loss. */
export function monthLine(name: string, m: NonNullable<WeeklyChild["month"]>): string {
  if (!m.answers) return `Your month: ${name} didn't practise in the last 30 days. Any day is a good day to start again.`;
  const days = `${m.activeDays} ${m.activeDays === 1 ? "day" : "days"}`;
  const base = `Your month: ${name} practised on ${days}, ${m.minutes} min in all, ${m.answers} questions`;
  if (m.previousAnswers && m.answers > m.previousAnswers) return `${base}, up from ${m.previousAnswers} the month before. 🎉`;
  return `${base}.`;
}

export function weeklyEmail(to: string, origin: string, children: WeeklyChild[], unsubToken: string): Email {
  const lines = children.flatMap((c) => [
    c.answers
      ? `${c.name}: ${c.minutes} min of practice, ${c.answers} questions${c.accuracy === null ? "" : `, ${c.accuracy}% right on the first try`}.`
      : `${c.name} didn't practise this week. A short session today is a great restart.`,
    ...(c.strength ? [`  Going well: ${c.strength}`] : []),
    ...(c.next ? [`  Next up: ${c.next}`] : []),
    ...(c.month ? [monthLine(c.name, c.month)] : []),
  ]);
  return layout({
    kind: "weekly",
    to,
    origin,
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?token=${encodeURIComponent(unsubToken)}`,
    unsubscribePage: `${origin}/account/unsubscribe/?token=${encodeURIComponent(unsubToken)}`,
    subject: `${APP_NAME}: your week in learning`,
    heading: "Your week in learning",
    body: [...lines, "This reflects practice in the app. It isn't a report-card mark; your child's teacher decides proficiency."],
    button: { label: "Open full reports", url: `${origin}/parents/#/reports` },
  });
}

export interface ReminderChild {
  name: string;
  /** Whole days since the last practice. */
  daysQuiet: number;
}

/** A gentle, parent-only nudge. Warm and brief, never guilt: a child's name and a day count, nothing else. */
export function reminderEmail(to: string, origin: string, children: ReminderChild[], unsubToken: string): Email {
  const names = children.map((c) => c.name);
  const who = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
  const lines = children.map((c) => `${c.name} last practised ${c.daysQuiet} days ago. A short session today, even 10 minutes, picks the momentum right back up.`);
  const q = encodeURIComponent(unsubToken);
  return layout({
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

export function questionReportEmail(to: string, p: { unitKey: string; prompt: string; reason: string }, origin: string): Email {
  return layout({
    to,
    origin,
    subject: `Question reported: ${p.unitKey}`,
    heading: "A question was reported",
    body: [`Unit: ${p.unitKey}`, `Reason: ${p.reason}`, `Question: ${p.prompt}`],
  });
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
