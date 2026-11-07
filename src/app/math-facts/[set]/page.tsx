import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/site/PrintButton";
import { TryChoices } from "@/components/site/TryChoices";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { MATH_FACTS_PAGES, factChart, factQuizzes, factSetOf, mathFactsBySlug, mathFactsPath } from "@/components/site/mathFacts";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return MATH_FACTS_PAGES.map((p) => ({ set: p.slug }));
}

type Props = PageProps<"/math-facts/[set]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = mathFactsBySlug((await params).set);
  if (!p) return {};
  return pageMeta({
    title: [`${p.title}: free practice, chart and tips`, `${p.title}: practice and tips`, p.title],
    description: `${p.intro} Free ${p.search} with a chart, easy strategies and sample questions, then more in ${APP_NAME}.`,
    path: mathFactsPath.set(p),
    type: "article",
  });
}

export default async function MathFactsSetPage({ params }: Props) {
  const p = mathFactsBySlug((await params).set);
  if (!p) notFound();
  const set = factSetOf(p);
  const chart = factChart(p);
  const quizzes = factQuizzes(p);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math facts", href: mathFactsPath.hub() }, { label: p.title }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(p.faqs), articleJsonLd({ headline: p.title, description: p.intro, path: mathFactsPath.set(p) })]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">{p.title}</h1>
      <p className="mt-1 font-read text-sm text-ink-soft">{p.grades}</p>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">{p.intro}</p>

      <section aria-labelledby="how" className="mt-8 max-w-3xl">
        <h2 id="how" className="text-2xl font-bold">
          How to learn them
        </h2>
        <ol className="mt-2 flex list-decimal flex-col gap-1 pl-5 font-read text-lg">
          {set.lesson.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-3 rounded-2xl border border-line bg-white p-4 font-read text-lg">
          <b>Example: {set.lesson.example.question}</b> {set.lesson.example.work.join(" ")} <b>Answer: {set.lesson.example.answer}.</b>
        </p>
      </section>

      <section aria-labelledby="try" className="mt-10 max-w-3xl">
        <h2 id="try" className="text-2xl font-bold">
          Try three
        </h2>
        <div className="mt-3 flex flex-col gap-6">
          {quizzes.map((q) => (
            <div key={q.prompt} className="rounded-2xl border border-line bg-white p-5">
              <p className="mb-3 text-2xl font-bold">{q.prompt}</p>
              <TryChoices
                choices={q.choices.map((c) => ({ id: c.id, content: c.label }))}
                answer={q.answer}
                answerLabel={q.answer}
                hint={q.hint}
                play="/play/"
                playLabel="Practise"
              />
            </div>
          ))}
        </div>
      </section>

      {chart && (
        <section aria-labelledby="chart" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="chart" className="text-2xl font-bold">
              {chart.sign === "+" ? "Addition chart" : "Times table chart"}
            </h2>
            <PrintButton label="Print this chart" />
          </div>
          <p className="mt-1 font-read text-ink-soft">Find a row and a column. The answer is where they meet.</p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[32rem] text-center font-read text-lg">
              <caption className="sr-only">{p.title}</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-2">
                    {chart.sign}
                  </th>
                  {chart.rows.map((_, c) => (
                    <th key={c} scope="col" className="p-2">
                      {c + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, r) => (
                  <tr key={r} className="border-t border-line">
                    <th scope="row" className="bg-paper p-2">
                      {r + 1}
                    </th>
                    {row.map((v, c) => (
                      <td key={c} className="p-2">
                        {v ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section aria-labelledby="faq" className="mt-10 max-w-3xl">
        <h2 id="faq" className="text-2xl font-bold">
          Questions parents ask
        </h2>
        <dl className="mt-3 flex flex-col gap-4 font-read text-lg">
          {p.faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-bold">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 font-read text-lg">
        More sets: <Link href={mathFactsPath.hub()} className="font-bold underline">all math facts practice</Link>. Math facts practice is not a report-card mark; it shows what a child knows by heart.
      </p>
    </SitePage>
  );
}
