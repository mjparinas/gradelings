import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { HELP_FAQS, HELP_GRADES, gradeName, helpAtHomePath, helpGradeFromSlug, tipsFor } from "@/components/site/helpAtHome";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return HELP_GRADES.map((g) => ({ grade: gradeSlug(g) }));
}

type Props = PageProps<"/help-at-home/[grade]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const grade = helpGradeFromSlug((await params).grade);
  if (!grade) return {};
  const label = gradeName(grade);
  return pageMeta({
    title: [`How to help your ${label} child at home: math, reading, science`, `Help your ${label} child at home`, `${label}: help at home`],
    description: `What ${label} children usually work on in math, reading and writing, science and social studies, with three quick things to try at home in each. Free, no supplies, then practice in ${APP_NAME}.`,
    path: helpAtHomePath.grade(grade),
    type: "article",
  });
}

export default async function HelpAtHomeGradePage({ params }: Props) {
  const grade = helpGradeFromSlug((await params).grade);
  if (!grade) notFound();
  const label = gradeName(grade);
  const faqs = HELP_FAQS(grade);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Help at home", href: helpAtHomePath.hub() }, { label }];
  const intro = `Quick ideas for helping a ${label} child at home, by subject. Each takes a few minutes and needs nothing to buy.`;
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs), articleJsonLd({ headline: `Help your ${label} child at home`, description: intro, path: helpAtHomePath.grade(grade) })]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Help your {label} child at home</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">{intro}</p>
      {tipsFor(grade).map(({ subject, title, tips }) => (
        <section key={subject} aria-labelledby={subject} className="mt-10 max-w-3xl">
          <h2 id={subject} className="text-2xl font-bold">
            {title}
          </h2>
          <p className="mt-1 font-read text-lg text-ink-soft">
            <b>Usually working on:</b> {tips.focus}
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {tips.ideas.map((idea) => (
              <li key={idea.title} className="rounded-2xl border border-line bg-white p-4 font-read text-lg">
                <b>{idea.title}.</b> {idea.text}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section aria-labelledby="faq" className="mt-10 max-w-3xl">
        <h2 id="faq" className="text-2xl font-bold">
          Questions parents ask
        </h2>
        <dl className="mt-3 flex flex-col gap-4 font-read text-lg">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-bold">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <p className="mt-10 font-read text-lg">
        Other grades: <Link href={helpAtHomePath.hub()} className="font-bold underline">all help at home pages</Link>. These are ideas for a few minutes at home, not a report-card mark; your child&apos;s teacher decides how they are doing at school.
      </p>
    </SitePage>
  );
}
