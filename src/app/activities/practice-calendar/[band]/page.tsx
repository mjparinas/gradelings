import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/site/PrintButton";
import { BANDS, BAND_LABEL, BAND_SLUG, CALENDAR_DAYS, activitiesPath, bandFromSlug } from "@/components/site/activitiesData";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return BANDS.map((b) => ({ band: BAND_SLUG[b] }));
}

type Props = PageProps<"/activities/practice-calendar/[band]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const band = bandFromSlug((await params).band);
  if (!band) return {};
  const label = BAND_LABEL[band];
  return pageMeta({
    title: [`Free printable 30-day practice calendar, ${label}`, `30-day practice calendar, ${label}`, `Practice calendar, ${label}`],
    description: `A free printable 30-day calendar of tiny learning challenges for ${label}: math, reading, science and the world around us, a few minutes a day. Practice more in ${APP_NAME}.`,
    path: activitiesPath.calendar(band),
    type: "article",
  });
}

export default async function PracticeCalendarPage({ params }: Props) {
  const band = bandFromSlug((await params).band);
  if (!band) notFound();
  const label = BAND_LABEL[band];
  const crumbs = [{ label: "Home", href: "/" }, { label: "Activities", href: activitiesPath.hub() }, { label: `Practice calendar, ${label}` }];
  const days = CALENDAR_DAYS[band];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: `30-day practice calendar, ${label}`, description: `A printable 30-day calendar of tiny learning challenges for ${label}.`, path: activitiesPath.calendar(band) })]} />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold print:text-3xl">30-day practice calendar: {label}</h1>
        <PrintButton label="Print the calendar" />
      </div>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft print:hidden">
        One tiny challenge a day. Tick each box when it is done; skipping a day is fine. Name: ______________________
      </p>
      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 print:grid-cols-5">
        {days.map((d, i) => (
          <li key={d} className="flex min-h-24 flex-col justify-between rounded-xl border border-line bg-white p-3 font-read">
            <span className="font-bold">Day {i + 1}</span>
            <span>{d}</span>
            <span aria-hidden="true" className="mt-1 text-2xl">
              ☐
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-8 font-read text-lg print:hidden">
        Other ages:{" "}
        {BANDS.filter((b) => b !== band).map((b, i) => (
          <span key={b}>
            {i > 0 && ", "}
            <Link href={activitiesPath.calendar(b)} className="font-bold underline">
              {BAND_LABEL[b]}
            </Link>
          </span>
        ))}
        . <Link href={activitiesPath.hub()} className="font-bold underline">More printable activities</Link>.
      </p>
    </SitePage>
  );
}
