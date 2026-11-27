import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { notFound } from "next/navigation";
import { Critter } from "@/components/Critter";
import { ReportCardGuide } from "@/components/ReportCardGuide";
import { breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { curriculumPath, frameworkBySlug, gradeLabel, gradesWithContent } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { guidesFor } from "@/content/guides";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { ShareButton } from "@/components/site/ShareButton";
import { pageMeta } from "@/lib/pageMeta";
import { playHref } from "@/lib/playLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return FRAMEWORKS.map((f) => ({ framework: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/report-cards/[framework]">): Promise<Metadata> {
  const f = frameworkBySlug((await params).framework);
  if (!f) return {};
  const levels = f.scoringFor("3").levels.map((l) => l.label);
  return pageMeta({
    // "report card" (singular) first: it's what parents type ("manitoba report card", "nova scotia report card").
    title: [`${f.shortName} report card levels: what ${levels.join(", ")} mean`, `${f.shortName} report card: ${levels.join(", ")} explained`, `${f.shortName} report card levels explained for parents`, `${f.shortName} report card explained`],
    description: `Decode your child's ${f.name} report card: what ${levels.join(", ")} mean in plain words, what each looks like at home, and how to help your child move up. Free.`,
    path: `/report-cards/${f.slug}/`,
    framework: f,
    type: "article",
  });
}

export default async function ReportCardsPage({ params }: PageProps<"/report-cards/[framework]">) {
  const f = frameworkBySlug((await params).framework);
  if (!f) notFound();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Report cards", href: "/report-cards/" }, { label: f.name }];

  return (
    <SitePage lead="trial" play={playHref({ framework: f.id })}>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(f.reportCard.faqs)]} />
      <Crumbs items={crumbs} />
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <ReportCardGuide framework={f} grade="3" headingLevel={1} />
        <aside className="flex flex-col gap-4">
          <div className="card flex flex-col items-center gap-3 p-5 text-center lg:sticky lg:top-24">
            <Critter id="ollie" mood="wave" size={110} />
            <p className="text-xl font-bold">See it skill by skill</p>
            <p className="font-read text-ink-soft">
              {APP_NAME} tracks every unit on the same four levels, so you know exactly which skills are {f.country === "US" ? f.scoringFor("3").levels[2]?.label : "Proficient"} and which need a little more practice before the next report card.
            </p>
            <SubscribeActions lead="trial" className="w-full" play={playHref({ framework: f.id })} />
            <ShareButton path={`/report-cards/${f.slug}/`} title={`${f.shortName} report cards, explained`} text={`What the ${f.shortName} report card levels mean, in plain words:`} label="Share this explainer" />
            <Link href={curriculumPath.framework(f)} className="font-semibold text-[#2f6fd6] underline">
              Browse the {f.curriculumName}
            </Link>
            <Link href={guidePath.competencies(f)} className="font-semibold text-[#2f6fd6] underline">
              {guidesFor(f.id).competencies.label} explained
            </Link>
            <Link href={guidePath.hub(f)} className="font-semibold text-[#2f6fd6] underline">
              More {f.shortName} parent guides
            </Link>
          </div>
        </aside>
      </div>
      <section aria-labelledby="by-grade" className="mt-10">
        <h2 id="by-grade" className="mb-3 text-xl font-bold">
          {f.shortName} help at home, by grade
        </h2>
        <ul className="flex flex-wrap gap-2">
          {gradesWithContent(f).map((g) => (
            <li key={g}>
              <Link href={guidePath.grade(f, g)} className="inline-flex min-h-11 items-center rounded-full bg-white px-3 py-1.5 font-semibold hover:bg-[#e6f0ff]">
                {gradeLabel(f, g)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SitePage>
  );
}
