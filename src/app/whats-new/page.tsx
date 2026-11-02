import type { Metadata } from "next";
import { NewsDayCard } from "@/components/site/WhatsNew";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { WHATS_NEW } from "@/lib/whatsNew";

export const metadata: Metadata = pageMeta({
  title: "What’s new",
  description: `A day-by-day note for parents and teachers on what’s new and what we fixed in ${APP_NAME}.`,
  path: "/whats-new/",
});

export default function WhatsNewPage() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "What’s new" }]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">What’s new</h1>
        <p className="mt-2 font-read text-lg">
          A short note for parents and teachers on what changed in {APP_NAME} each day, including bug fixes.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {WHATS_NEW.map((d) => (
            <NewsDayCard key={d.day} entry={d} link />
          ))}
        </div>
      </div>
    </SitePage>
  );
}
