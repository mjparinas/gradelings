import "server-only";
import { APP_NAME, CONTACT_EMAIL, LEGAL_NAME, MAILING_ADDRESS, WORDMARK_COLOURS } from "@/lib/brand";
import { EMAIL_FONTS, EMAIL_IMAGES, EMAIL_WORDMARK, type EmailShot } from "@/lib/emailImages";
import { ON_BRIGHT } from "@/lib/contrast";
import { countryOf, type CountryCode } from "@/lib/country";
import type { EmailKind } from "@/lib/emailKinds";
import { localizeCopy } from "@/content/locale";
import type { Email } from "./email";

/**
 * The one branded layout every email uses, so a new email only supplies words. Tables and inline styles, because
 * Outlook ignores flexbox and most clients drop <style>. Nothing here is per recipient: the images are the same URL
 * for everyone, so they can't tell us who opened an email.
 */

export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** A callout under the text: a feature to try, a "did you know", or a family-plan feature. */
export interface Spotlight {
  /** One short line, such as "Did you know?" or "Calm mode". */
  title: string;
  body: string;
  /** Index into the wordmark colours; sets the callout's tint. Blue when left out. */
  accent?: number;
  /** Marks the feature as one only the family plan has, in words ("Family plan"), never by colour alone. */
  paid?: boolean;
}

export interface Parts {
  to: string;
  /** Logged in the admin panel's email log; left out for mail that isn't to an account (question reports). */
  kind?: EmailKind;
  subject: string;
  heading: string;
  /** Plain paragraphs. A line that starts with two spaces is a smaller note under the line before it; web addresses become links. */
  body: string[];
  /** Short points shown as a list after the body (links work as in the body). */
  bullets?: string[];
  button?: { label: string; url: string };
  /** A screenshot of the app, drawn into public/email/shots/ by scripts/email-screenshots.mjs. */
  hero?: EmailShot;
  /** One callout, or several one after the other (a feature email has a plan note and a "Did you know?"). */
  spotlight?: Spotlight | Spotlight[];
  /** The text mail clients show beside the subject; hidden in the email itself. */
  preheader?: string;
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

const INK = "#1d2233";
const MUTED = "#5b6478";
const GREEN = "#25b47e";

/** Paler versions of the wordmark colours for callout backgrounds, with the same hue for the edge. */
const TINTS = ["#eaf1fe", "#fdebf3", "#e4f6ee", "#fff1e2", "#f0eafd", "#e0f6fa"] as const;
/** Darker versions that keep 4.5:1 against their tint, for the callout's title. */
const DEEPS = ["#1b4fb0", "#a3205f", "#146b4a", "#9a4a00", "#5b2fc0", "#0b6b7d"] as const;

/**
 * The name drawn in Fredoka, as on the site. An image, because Gmail and Outlook for Windows ignore web fonts; with
 * images off, the alt text shows in the logo's first colour and in Fredoka where the client has it.
 */
function wordmark(origin: string): string {
  const w = EMAIL_WORDMARK;
  return `<img src="${esc(origin)}${w.path}" width="${w.width}" height="${w.height}" alt="${esc(w.alt)}" style="display:block;border:0;font-family:${EMAIL_FONTS.wordmark.stack};font-size:${w.fontSize}px;font-weight:700;line-height:1;color:${WORDMARK_COLOURS[0]}">`;
}

/** The six wordmark colours as a stripe across the top: a quiet brand signature that needs no image. */
function stripe(): string {
  const cells = WORDMARK_COLOURS.map((c) => `<td width="${100 / WORDMARK_COLOURS.length}%" height="6" bgcolor="${c}" style="background:${c};height:6px;font-size:0;line-height:0">&nbsp;</td>`).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:3px;overflow:hidden"><tr>${cells}</tr></table>`;
}

/** The logo and Ollie at the top of every email, linking to the site. */
function header(origin: string): string {
  const ollie = EMAIL_IMAGES.ollie;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px"><tr>
<td style="vertical-align:middle;padding-right:10px"><a href="${esc(origin)}/" style="text-decoration:none;color:${MUTED}"><img src="${esc(origin)}${ollie.path}" width="${ollie.size}" height="${ollie.size}" alt="${esc(ollie.alt)}" style="display:block;border:0;font-size:12px;color:${MUTED}"></a></td>
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

/** `[label](https://…)` in copy becomes a link with that label, and "label: https://…" in the plain-text version. */
const LABELLED = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const plain = (t: string) => t.replace(LABELLED, "$1: $2");

/** Escapes a line and turns web addresses into links (a sentence's closing full stop stays outside the link). */
function linked(text: string): string {
  return text
    .split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s<]+)/g)
    .map((part, i) => {
      if (i % 2 === 0) return esc(part);
      const labelled = /^\[([^\]]+)\]\((.+)\)$/.exec(part);
      if (labelled) return `<a href="${esc(labelled[2])}" style="color:#1b4fb0;font-weight:700">${esc(labelled[1])}</a>`;
      const url = part.replace(/[.,;:!?)]+$/, "");
      return `<a href="${esc(url)}" style="color:#1b4fb0;word-break:break-all">${esc(url)}</a>${esc(part.slice(url.length))}`;
    })
    .join("");
}

function bodyHtml(lines: string[]): string {
  return lines
    .map((t) =>
      /^ {2}\S/.test(t)
        ? `<p style="margin:-6px 0 10px;padding-left:14px;border-left:3px solid #e3e2de;font-size:14px;color:${MUTED}">${linked(t.trim())}</p>`
        : `<p style="margin:0 0 12px">${linked(t)}</p>`,
    )
    .join("");
}

function bulletsHtml(items: string[]): string {
  return `<ul style="margin:0 0 12px;padding-left:22px">${items.map((t) => `<li style="margin:0 0 6px">${linked(t)}</li>`).join("")}</ul>`;
}

function spotlightHtml(s: Spotlight): string {
  const i = (s.accent ?? 0) % WORDMARK_COLOURS.length;
  const pill = s.paid
    ? `<span style="display:inline-block;background:${ON_BRIGHT};color:#fff;font-size:12px;font-weight:700;padding:2px 9px;border-radius:99px;margin-left:8px;vertical-align:middle">Family plan</span>`
    : "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0"><tr><td bgcolor="${TINTS[i]}" style="background:${TINTS[i]};border-left:5px solid ${WORDMARK_COLOURS[i]};border-radius:12px;padding:14px 16px">
<div style="font-family:${EMAIL_FONTS.wordmark.stack};font-weight:700;font-size:16px;color:${DEEPS[i]};margin:0 0 4px">${esc(s.title)}${pill}</div>
<div style="font-size:15px;line-height:1.5;color:${INK}">${linked(s.body)}</div>
</td></tr></table>`;
}

function heroHtml(origin: string, shot: EmailShot, href: string): string {
  return `<p style="margin:18px 0 0"><a href="${esc(href)}" style="text-decoration:none"><img src="${esc(origin)}${shot.path}" width="${shot.width}" alt="${esc(shot.alt)}" style="display:block;border:0;width:100%;max-width:${shot.width}px;height:auto;border-radius:14px;font-size:13px;color:${MUTED}"></a></p>`;
}

/** One simple layout for every email: the colour stripe, the logo and Ollie, then a white card. */
export function layout(parts: Parts): Email {
  const locale = countryOf(parts.country).locale;
  const say = (t: string) => localizeCopy(t, locale);
  const p: Parts = {
    ...parts,
    subject: say(parts.subject),
    heading: say(parts.heading),
    body: parts.body.map(say),
    bullets: parts.bullets?.map(say),
    button: parts.button && { ...parts.button, label: say(parts.button.label) },
    footnote: parts.footnote && say(parts.footnote),
    spotlight: parts.spotlight && [parts.spotlight].flat().map((sp) => ({ ...sp, title: say(sp.title), body: say(sp.body) })),
    preheader: parts.preheader && say(parts.preheader),
    hero: parts.hero && { ...parts.hero, alt: say(parts.hero.alt) },
  };
  // Dark navy on the bright green, not white: white fails the contrast rules (src/lib/contrast.ts).
  // The padding sits on the cell, not the link: Outlook for Windows ignores padding on an inline-block link and
  // would draw a button as thin as its text.
  const button = p.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0"><tr><td bgcolor="${GREEN}" style="background:${GREEN};border-radius:12px;padding:14px 24px"><a href="${esc(p.button.url)}" style="color:${ON_BRIGHT};text-decoration:none;font-family:${EMAIL_FONTS.wordmark.stack};font-weight:700;font-size:17px;line-height:20px;display:inline-block">${esc(p.button.label)}</a></td></tr></table>`
    : "";
  const footer = `<p style="font-size:12px;color:${MUTED};margin:16px 4px 0">${esc(APP_NAME)} has no ads and never sells your information. <a href="${esc(p.origin)}/privacy/" style="color:${MUTED}">Privacy</a> · Questions? ${esc(CONTACT_EMAIL)}${p.unsubscribePage ? ` · <a href="${esc(p.unsubscribePage)}" style="color:${MUTED}">Unsubscribe</a>` : ""}</p>
${MAILING_ADDRESS ? `<p style="font-size:12px;color:${MUTED};margin:4px 4px 0">${esc(LEGAL_NAME)} · ${esc(MAILING_ADDRESS)}</p>` : ""}`;
  // Outlook for Windows ignores max-width on a div, so the column is a 560 px table there (the conditional comments);
  // the card is a table cell so its colour, border and padding hold in every client. Page and card colours are on
  // cells too (bgcolor), which Gmail's dark mode keeps better than a body style. "light dark" is not claimed: the
  // email is designed light, and the meta tags only ask clients not to recolour it where they honour them.
  const html = `<!doctype html><html lang="${locale.startsWith("en-US") ? "en-US" : "en-CA"}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><style>:root{color-scheme:light only}${fontFaces(p.origin)}</style></head><body bgcolor="#f7f5f0" style="margin:0;padding:0;background:#f7f5f0;font-family:${EMAIL_FONTS.text.stack};color:${INK};-webkit-text-size-adjust:100%">
${p.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#f7f5f0">${esc(p.preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f5f0" style="background:#f7f5f0"><tr><td align="center" style="padding:0 16px 24px">
<!--[if mso]><table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<div style="max-width:560px;margin:0 auto;text-align:left">
<div style="padding:16px 0 0">${stripe()}</div>
<div style="padding:18px 0 0">${header(p.origin)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#ffffff" style="background:#ffffff;border:1px solid #ece8df;border-radius:20px;padding:26px 24px;line-height:1.55;font-size:16px;font-family:${EMAIL_FONTS.text.stack};color:${INK}">
<h1 style="font-family:${EMAIL_FONTS.wordmark.stack};font-size:24px;line-height:1.25;margin:0 0 14px;color:${INK}">${esc(p.heading)}</h1>
${bodyHtml(p.body)}
${p.bullets?.length ? bulletsHtml(p.bullets) : ""}
${[p.spotlight ?? []].flat().map(spotlightHtml).join("")}
${button}
${p.hero ? heroHtml(p.origin, p.hero, p.button?.url ?? `${p.origin}/`) : ""}
${p.footnote ? `<p style="font-size:13px;color:${MUTED};margin:${p.hero ? "16px" : "0"} 0 0">${linked(p.footnote)}</p>` : ""}
</td></tr></table>
${footer}
</div>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  const text = [
    p.heading,
    "",
    ...p.body.map(plain),
    ...(p.bullets?.length ? ["", ...p.bullets.map((b) => `- ${plain(b)}`)] : []),
    ...[p.spotlight ?? []].flat().flatMap((sp) => ["", plain(`${sp.title}${sp.paid ? " (Family plan)" : ""}: ${sp.body}`)]),
    ...(p.button ? ["", `${p.button.label}: ${p.button.url}`] : []),
    ...(p.footnote ? ["", plain(p.footnote)] : []),
    "",
    `${APP_NAME} has no ads and never sells your information. Privacy: ${p.origin}/privacy/`,
    ...(p.unsubscribePage ? [`Unsubscribe: ${p.unsubscribePage}`] : []),
    // CASL requires the sender's postal address in every commercial message.
    ...(MAILING_ADDRESS ? [`${LEGAL_NAME} · ${MAILING_ADDRESS}`] : []),
  ].join("\n");
  return { to: p.to, subject: p.subject, html, text, unsubscribeUrl: p.unsubscribeUrl, kind: p.kind };
}
