import type { HolidayId } from "./holidays";

// The browser-tab icon during a holiday theme: the usual /icon.svg with the holiday's hat on the buddy
// (public/icons/holiday-<id>.svg, drawn from HolidayHat and checked by holidayIcon.test.ts).
// Only the tab icon changes. The installed app icons (home screen, iOS, Android) are fixed when the app is
// installed, and a store app's icon can't follow the date without a system prompt (iOS) or a native change (Android).

export const holidayIconUrl = (id: HolidayId | null): string => (id ? `/icons/holiday-${id}.svg` : "/icon.svg");

/** Points every tab icon link at the holiday's icon, or back at the usual one. Does nothing on the server. */
export function applyHolidayIcon(id: HolidayId | null): void {
  if (typeof document === "undefined") return;
  const url = holidayIconUrl(id);
  for (const link of document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')) {
    if (link.getAttribute("href") !== url) link.setAttribute("href", url);
    link.setAttribute("type", "image/svg+xml");
  }
}
