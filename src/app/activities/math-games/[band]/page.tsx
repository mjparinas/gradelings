import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/site/PrintButton";
import { BANDS, BAND_LABEL, BAND_SLUG, MATH_GAMES, activitiesPath, bandFromSlug } from "@/components/site/activitiesData";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return BANDS.map((b) => ({ band: BAND_SLUG[b] }));
}

type Props = PageProps<"/activities/math-games/[band]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const band = bandFromSlug((await params).band);
  if (!band) return {};
  const label = BAND_LABEL[band];
  return pageMeta({
    title: [`Math games to play with dice and cards, ${label}`, `Math games with dice and cards, ${label}`, `Math games, ${label}`],
    description: `Four free math games for ${label} that you play with a grown-up using only dice, a deck of cards or paper. Printable, then more practice in ${APP_NAME}.`,
    path: activitiesPath.games(band),
    type: "article",
  });
}

export default async function MathGamesPage({ params }: Props) {
  const band = bandFromSlug((await params).band);
  if (!band) notFound();
  const label = BAND_LABEL[band];
  const crumbs = [{ label: "Home", href: "/" }, { label: "Activities", href: activitiesPath.hub() }, { label: `Math games, ${label}` }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: `Math games to play together, ${label}`, description: `Four math games for ${label} using dice, cards or paper.`, path: activitiesPath.games(band) })]} />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold print:text-3xl">Math games to play together: {label}</h1>
        <PrintButton label="Print these games" />
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {MATH_GAMES[band].map((g) => (
          <li key={g.name} className="rounded-2xl border border-line bg-white p-5 font-read text-lg">
            <h2 className="text-2xl font-bold">{g.name}</h2>
            <p className="text-ink-soft">
              <b>Practices:</b> {g.skill}
            </p>
            <p>
              <b>You need:</b> {g.need}
            </p>
            <ol className="mt-2 list-decimal pl-5">
              {g.how.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-read text-lg print:hidden">
        Other ages:{" "}
        {BANDS.filter((b) => b !== band).map((b, i) => (
          <span key={b}>
            {i > 0 && ", "}
            <Link href={activitiesPath.games(b)} className="font-bold underline">
              {BAND_LABEL[b]}
            </Link>
          </span>
        ))}
        . <Link href={activitiesPath.hub()} className="font-bold underline">More printable activities</Link>.
      </p>
    </SitePage>
  );
}
