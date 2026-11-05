import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { BANDS, BAND_LABEL, activitiesPath } from "@/components/site/activitiesData";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Free printable learning activities for kids, Pre-K to Grade 9", "Printable learning activities for kids"],
  description: `Free printable activity packs: a 30-day practice calendar, math games to play with a grown-up, a reading log and conversation cards, for Pre-K to Grade 9. Then practice in ${APP_NAME}.`,
  path: activitiesPath.hub(),
});

export default function ActivitiesHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Activities" }];
  const items = [
    ...BANDS.map((b) => ({ name: `30-day practice calendar, ${BAND_LABEL[b]}`, path: activitiesPath.calendar(b) })),
    ...BANDS.map((b) => ({ name: `Math games to play together, ${BAND_LABEL[b]}`, path: activitiesPath.games(b) })),
    { name: "Reading log", path: activitiesPath.readingLog() },
    { name: "Conversation cards", path: activitiesPath.talkCards() },
  ];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Printable activities", items)]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Printable learning activities</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Free sheets and games for learning away from the screen: a calendar of tiny daily challenges, math games you play with dice and cards, a reading log and conversation cards for the dinner table. Print what you need.
      </p>
      <section aria-labelledby="cal" className="mt-8">
        <h2 id="cal" className="text-2xl font-bold">
          30-day practice calendar
        </h2>
        <p className="font-read text-ink-soft">One small challenge a day, a few minutes each, to tick off.</p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {BANDS.map((b) => (
            <li key={b}>
              <Link href={activitiesPath.calendar(b)} className="btn min-h-12 px-5 text-lg">
                {BAND_LABEL[b]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="games" className="mt-8">
        <h2 id="games" className="text-2xl font-bold">
          Math games to play together
        </h2>
        <p className="font-read text-ink-soft">Four games for each age group. All you need is dice, a deck of cards or paper.</p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {BANDS.map((b) => (
            <li key={b}>
              <Link href={activitiesPath.games(b)} className="btn min-h-12 px-5 text-lg">
                {BAND_LABEL[b]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="more" className="mt-8">
        <h2 id="more" className="text-2xl font-bold">
          More to print
        </h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          <li>
            <Link href={activitiesPath.readingLog()} className="btn min-h-12 px-5 text-lg">
              Reading log
            </Link>
          </li>
          <li>
            <Link href={activitiesPath.talkCards()} className="btn min-h-12 px-5 text-lg">
              Conversation cards
            </Link>
          </li>
        </ul>
      </section>
    </SitePage>
  );
}
