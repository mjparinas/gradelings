import { countryOf } from "./country";
import { familyCountry } from "./coppa";
import { deviceId } from "./remoteFlags";
import type { AppEvent, FamilyInfo, Profile } from "./model";

// Tells the server, once a day, that this device was played with no parent account, so the admin dashboard can count
// guest players. Only the device's random id is sent (the server keeps a one-way hash and the day); nothing about
// the children or their practice. Skipped for a US child: their curriculum asks for a parent's consent before
// anything about them is stored, and a guest has no parent to give it.

const KEY = "grademap.guestPing";
const DAY = 86_400_000;
const RETRY_MS = 10 * 60_000;
let lastTry = 0;

/** Whether this device should be counted as a guest today: no account, a child who answered a question today, none from the US. */
export function guestPlayedToday(state: { family: Pick<FamilyInfo, "account">; profiles: Pick<Profile, "framework" | "createdAt" | "deleted">[]; events: Pick<AppEvent, "type" | "t">[] }, now: number): boolean {
  if (state.family.account) return false;
  const kids = state.profiles.filter((p) => !p.deleted);
  if (kids.length === 0 || kids.some((p) => countryOf(familyCountry([p])).parentalConsent)) return false;
  const start = Math.floor(now / DAY) * DAY;
  for (let i = state.events.length - 1; i >= 0; i--) {
    const e = state.events[i];
    if (e.type === "answer" && e.t >= start && e.t <= now) return true;
  }
  return false;
}

export async function pingGuestDevice(state: Parameters<typeof guestPlayedToday>[0], now = Date.now()): Promise<void> {
  // Automated browsers (test runs, crawlers) are not players, and a request cut short by a page change would be logged as a page error.
  if (typeof navigator !== "undefined" && navigator.webdriver) return;
  const today = String(Math.floor(now / DAY));
  try {
    if (localStorage.getItem(KEY) === today) return;
  } catch {
    return; // Without storage we couldn't limit this to once a day.
  }
  if (now - lastTry < RETRY_MS || !guestPlayedToday(state, now)) return;
  const d = deviceId();
  if (!d) return;
  lastTry = now;
  try {
    const res = await fetch("/api/guests/seen/", { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ d }) });
    if (res.ok) localStorage.setItem(KEY, today);
  } catch {
    /* offline: the next sync tries again */
  }
}
