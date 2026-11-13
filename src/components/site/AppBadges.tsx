import { APP_NAME, PLAY_STORE_URL } from "@/lib/brand";

const BADGE = "inline-flex h-12 items-center gap-2 rounded-xl border border-black bg-black px-3 text-white";

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path d="M3.6 2.2v19.6L14 12z" fill="#00d2ff" />
      <path d="M3.6 2.2 17.2 9.8 14 12z" fill="#00f076" />
      <path d="M3.6 21.8 17.2 14.2 14 12z" fill="#ff3a44" />
      <path d="m17.2 9.8 3.4 1.9c.8.5.8 1.1 0 1.6l-3.4 1.9L14 12z" fill="#ffd400" />
    </svg>
  );
}

/** Store badges for the footer. Google Play links to the listing; the App Store is not live yet, so it is not a link. */
export function AppBadges() {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${APP_NAME} apps`}>
      <li>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={BADGE}>
          <PlayMark />
          <span className="leading-tight">
            <span className="block text-[10px] uppercase tracking-wide">Get it on</span>{" "}
            <span className="block text-base font-semibold">Google Play</span>
          </span>
        </a>
      </li>
      <li>
        <span className={`${BADGE} border-line bg-black/70`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="currentColor">
            <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.9zM14.1 5.9c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.8-1.3z" />
          </svg>
          <span className="leading-tight">
            <span className="block text-[10px] uppercase tracking-wide">Coming soon</span>{" "}
            <span className="block text-base font-semibold">App Store</span>
          </span>
        </span>
      </li>
    </ul>
  );
}
