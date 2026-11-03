import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { MATH_FACTS_PAGES, factSetOf, mathFactsPath } from "@/components/site/mathFacts";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Math facts practice: addition, subtraction, times tables", "Math facts practice for kids"],
  description: `Free math facts practice: addition and subtraction to 20, times tables and division facts. Charts, strategies and sample questions, then unlimited practice in ${APP_NAME}.`,
  path: mathFactsPath.hub(),
});

export default function MathFactsHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math facts" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Math facts practice", MATH_FACTS_PAGES.map((p) => ({ name: p.title, path: mathFactsPath.set(p) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Math facts practice</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Knowing addition, subtraction, times table and division facts quickly makes everything after them easier. Pick a set for a chart, the strategies that make the facts stick and a few questions to try. {APP_NAME} then keeps the facts a child misses coming back until they know them.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {MATH_FACTS_PAGES.map((p) => (
          <li key={p.slug} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-2xl font-bold">
              <Link href={mathFactsPath.set(p)} className="underline-offset-4 hover:underline">
                <span aria-hidden="true">{factSetOf(p).emoji} </span>
                {p.title}
              </Link>
            </h2>
            <p className="mt-1 font-read text-sm text-ink-soft">{p.grades}</p>
            <p className="mt-2 font-read text-lg">{p.intro}</p>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
