import type { Metadata } from "next";
import { PrintButton } from "@/components/site/PrintButton";
import { TALK_CARDS, TALK_SUBJECT_LABEL, activitiesPath } from "@/components/site/activitiesData";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Free printable conversation cards for kids and families", "Printable conversation cards for families"],
  description: `${TALK_CARDS.length} free printable conversation cards about math, reading, science and the world, for dinner or the car, for any age from Pre-K to Grade 9. More learning in ${APP_NAME}.`,
  path: activitiesPath.talkCards(),
  type: "article",
});

export default function TalkCardsPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Activities", href: activitiesPath.hub() }, { label: "Conversation cards" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: "Printable conversation cards", description: "Open questions to talk about learning at home.", path: activitiesPath.talkCards() })]} />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold print:text-3xl">Conversation cards</h1>
        <PrintButton label="Print the cards" />
      </div>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft print:hidden">
        Cut them out, shuffle them and pick one at dinner or in the car. There are no right answers. Listen to the whole answer, then ask “why?”
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 print:grid-cols-3">
        {TALK_CARDS.map((c) => (
          <li key={c.q} className="flex min-h-32 flex-col justify-between break-inside-avoid rounded-xl border border-dashed border-line bg-white p-4 font-read text-lg">
            <span className="text-sm font-bold text-ink-soft">{TALK_SUBJECT_LABEL[c.subject]}</span>
            <span>{c.q}</span>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
