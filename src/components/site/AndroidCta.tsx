import Link from "@/components/PublicLink";
import { APP_NAME } from "@/lib/brand";
import { PlayBadge } from "./AppBadges";
import { androidPath } from "./android";

/** A quiet "get the Android app" block for public pages. Never shown inside the store apps (public pages aren't opened there). */
export function AndroidCta({ className = "mt-10" }: { className?: string }) {
  return (
    <aside aria-labelledby="android-cta" className={`${className} flex max-w-3xl flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-5`}>
      <div className="min-w-[14rem] flex-1">
        <h2 id="android-cta" className="text-xl font-bold">
          {APP_NAME} is on Google Play
        </h2>
        <p className="mt-1 font-read text-ink-soft">
          The Android app for phones and tablets, with lessons that keep working offline.{" "}
          <Link href={androidPath.hub()} className="font-semibold text-ink underline">
            About the Android app
          </Link>
        </p>
      </div>
      <PlayBadge />
    </aside>
  );
}
