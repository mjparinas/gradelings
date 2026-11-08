import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { BAND_LABEL, LEARN_ITEMS, learnPath, topicName } from "@/components/site/learn";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { helpAtHomePath } from "@/components/site/helpAtHome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";
import type { AgeBand } from "@/content/types";

export const metadata: Metadata = pageMeta({
  title: ["Fun facts and short reading for kids: science and our world", "Fun facts and short reading for kids"],
  description: `Free fun facts and short reading for kids from Pre-K to Grade 9, about science and our world, each with a quick question. Then practice in ${APP_NAME}.`,
  path: learnPath.hub(),
});

const BANDS: AgeBand[] = ["little", "middle", "big"];

export default function LearnHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Fun facts and reading" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Fun facts and short reading", LEARN_ITEMS.map((i) => ({ name: i.title, path: learnPath.item(i.id) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Fun facts and short reading for kids</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Short, original pages about science and our world, written for Pre-K to Grade 9. Each one ends with a quick question to try. Pick your child&apos;s age and read together.
      </p>
      {BANDS.map((band) => (
        <section key={band} aria-labelledby={band} className="mt-10">
          <h2 id={band} className="text-3xl font-bold">
            {BAND_LABEL[band]}
          </h2>
          {(["science", "world"] as const).map((topic) => (
            <div key={topic} className="mt-4">
              <h3 className="text-xl font-bold">{topicName(topic)}</h3>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {LEARN_ITEMS.filter((i) => i.band === band && i.topic === topic).map((i) => (
                  <li key={i.id}>
                    <Link href={learnPath.item(i.id)} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 font-read text-lg hover:border-[#4f8ef7]">
                      <span aria-hidden="true" className="text-3xl">
                        {i.emoji}
                      </span>
                      <span className="font-bold">{i.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
      <p className="mt-10 font-read text-lg">
        Looking for ideas to try together? See <Link href={helpAtHomePath.hub()} className="font-bold underline">how to help your child at home</Link>. These pages are for curiosity, not a report-card mark.
      </p>
    </SitePage>
  );
}
