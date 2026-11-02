import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDayCard } from "@/components/site/WhatsNew";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { dayLabel, newsDay, WHATS_NEW } from "@/lib/whatsNew";

export const dynamicParams = false;

export function generateStaticParams() {
  return WHATS_NEW.map((d) => ({ day: d.day }));
}

export async function generateMetadata({ params }: { params: Promise<{ day: string }> }): Promise<Metadata> {
  const entry = newsDay((await params).day);
  if (!entry) return {};
  return pageMeta({
    title: [`${entry.headline} (${dayLabel(entry.day)})`, entry.headline, `What’s new, ${entry.day}`],
    description: `${APP_NAME} on ${dayLabel(entry.day)}: ${entry.items.map((i) => i.title).join("; ")}.`,
    path: `/whats-new/${entry.day}/`,
  });
}

export default async function WhatsNewDayPage({ params }: { params: Promise<{ day: string }> }) {
  const entry = newsDay((await params).day);
  if (!entry) notFound();
  return (
    <SitePage cta="short">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "What’s new", href: "/whats-new/" }, { label: dayLabel(entry.day) }]} />
      <div className="mx-auto max-w-3xl">
        <NewsDayCard entry={entry} />
      </div>
    </SitePage>
  );
}
