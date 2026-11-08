import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { notFound } from "next/navigation";
import { TryChoices } from "@/components/site/TryChoices";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { BAND_LABEL, LEARN_ITEMS, learnDescription, learnItem, learnPath, learnQuestions, learnTitles, relatedItems, topicName } from "@/components/site/learn";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEARN_ITEMS.map((i) => ({ id: i.id }));
}

type Props = PageProps<"/learn/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = learnItem((await params).id);
  if (!item) return {};
  return pageMeta({ title: learnTitles(item), description: learnDescription(item), path: learnPath.item(item.id), type: "article" });
}

export default async function LearnPage({ params }: Props) {
  const item = learnItem((await params).id);
  if (!item) notFound();
  const questions = learnQuestions(item);
  const related = relatedItems(item);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Fun facts and reading", href: learnPath.hub() }, { label: item.title }];
  const lead = item.kind === "card" ? item.card.facts[0] : item.article.paragraphs[0];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: item.title, description: lead, path: learnPath.item(item.id) })]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">
        <span aria-hidden="true">{item.emoji} </span>
        {item.title}
      </h1>
      <p className="mt-1 font-read text-sm text-ink-soft">
        {topicName(item.topic)} · {BAND_LABEL[item.band]}
      </p>
      <section aria-labelledby="read" className="mt-6 max-w-3xl">
        <h2 id="read" className="sr-only">
          {item.kind === "card" ? "Facts" : "Read"}
        </h2>
        {item.kind === "card" ? (
          <ul className="flex flex-col gap-3">
            {item.card.facts.map((f) => (
              <li key={f} className="rounded-2xl border border-line bg-white p-4 font-read text-xl">
                {f}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-4 font-read text-lg">
            {item.article.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </section>
      <section aria-labelledby="try" className="mt-10 max-w-3xl">
        <h2 id="try" className="text-2xl font-bold">
          {questions.length > 1 ? "Try two questions" : "Try a question"}
        </h2>
        <div className="mt-3 flex flex-col gap-6">
          {questions.map((q) => (
            <div key={q.prompt} className="rounded-2xl border border-line bg-white p-5">
              <p className="mb-3 text-2xl font-bold">{q.prompt}</p>
              <TryChoices choices={q.choices.map((c) => ({ id: c, content: c }))} answer={q.answer} answerLabel={q.answer} hint={q.why} play="/play/" playLabel="Practise" />
            </div>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section aria-labelledby="more" className="mt-10 max-w-3xl">
          <h2 id="more" className="text-2xl font-bold">
            More to read
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={learnPath.item(r.id)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-3 py-1.5 font-read text-lg hover:border-[#4f8ef7]">
                  <span aria-hidden="true">{r.emoji}</span> {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-10 font-read text-lg">
        More pages: <Link href={learnPath.hub()} className="font-bold underline">all fun facts and short reading</Link>. These are for curiosity, not a report-card mark.
      </p>
    </SitePage>
  );
}
