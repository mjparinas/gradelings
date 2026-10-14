import { SUBSCRIBE_HREF } from "./plan";

// Analytics (page views, page speed and the two click counts below) is for the public site only. The kids' app, the parent area and
// shared reports and shared milestones are never measured, so nothing a child does reaches analytics.
const PRIVATE_PREFIXES = ["/play", "/parents", "/shared", "/milestone", "/account", "/api"];

export function isPublic(url: string): boolean {
  const { pathname } = new URL(url, "https://example.invalid");
  return !PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// Two click counts, so the admin Traffic tab can say which public pages lead to the app: a tap on any "Try it free"
// or "Play free" link (to /play/) and on any Subscribe link. Each carries only the path of the page it was on.
export const CTA_EVENTS = { trial: "Start trial", subscribe: "Subscribe" } as const;

/** The event for a click on a link to `href` on the page at `page` (a URL), or null when it isn't counted. */
export function ctaEvent(href: string | null, page: string): { name: string; from: string } | null {
  if (!href || !isPublic(page)) return null;
  const from = new URL(page, "https://example.invalid").pathname;
  const target = new URL(href, "https://example.invalid").pathname;
  if (target === "/play" || target === "/play/") return { name: CTA_EVENTS.trial, from };
  if (href.startsWith(SUBSCRIBE_HREF)) return { name: CTA_EVENTS.subscribe, from };
  return null;
}

