import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { SPANISH_LEVEL_WORDS, spanishCourses, spanishGradeLabel, spanishPath } from "@/components/site/spanishPages";
import { getSubjectMeta } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Spanish for kids: Grades 3 to 9 practice and stories", "Spanish for kids, Grades 3 to 9", "Spanish for kids"],
  description: `Free Spanish practice for Grades 3 to 9: greetings, numbers, family, food and more, with sample questions, read-aloud and short stories in Spanish. Try it in ${APP_NAME}.`,
  path: spanishPath.hub(),
});

export default function SpanishHub() {
  const courses = spanishCourses();
  const meta = getSubjectMeta("spanish");
  const crumbs = [{ label: "Home", href: "/" }, { label: "Spanish" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Spanish for kids by grade", courses.map((c) => ({ name: `${spanishGradeLabel(c.grade)} Spanish`, path: spanishPath.grade(c.grade) })))]} />
      <Crumbs items={crumbs} />
      <header className="flex flex-col gap-2 rounded-3xl p-6" style={{ background: meta.colourSoft }}>
        <h1 className="text-4xl font-bold">
          <span aria-hidden="true">{meta.emoji} </span>Spanish for kids, Grades 3 to 9
        </h1>
        <p className="max-w-3xl font-read text-lg">
          A gentle beginner course for children learning Spanish as an extra language. Questions are in English and the Spanish is what children learn, so no one needs to speak Spanish at home. Every word and phrase can be read aloud by a Spanish voice, and there are short stories to read along with, each page one tap from its English.
        </p>
      </header>

      <section aria-labelledby="grades" className="mt-8">
        <h2 id="grades" className="text-2xl font-bold">
          Pick a grade
        </h2>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.grade} className="card p-5">
              <h3 className="text-xl font-bold">
                <Link href={spanishPath.grade(c.grade)} className="underline-offset-4 hover:underline">
                  {spanishGradeLabel(c.grade)} Spanish
                </Link>
              </h3>
              <p className="mt-1 font-read text-ink-soft">{c.units.length} units · aims for {SPANISH_LEVEL_WORDS[c.grade]}</p>
              <p className="mt-2 font-read">{c.units.map((u) => u.title).join(", ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="mt-10 max-w-3xl">
        <h2 id="how" className="text-2xl font-bold">
          How it works
        </h2>
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 font-read text-lg">
          <li>Parents turn Spanish on for a child under Settings, then Subjects. It is optional and never counts toward a child&apos;s grade goals.</li>
          <li>Latin American Spanish, with a clear Spanish voice that reads the Spanish words and an English voice for everything else.</li>
          <li>Hints and a second try on every question, the same kind way as every other subject.</li>
          <li>Stories in Spanish with the English one tap away, and questions after each one.</li>
        </ul>
        <p className="mt-3 font-read text-lg">
          Each unit follows the Spanish curriculum where a province has one (British Columbia, Alberta and Manitoba) and the World-Readiness Standards for Learning Languages everywhere else. Practice shows what a child knows. It is not a report-card mark.
        </p>
      </section>
    </SitePage>
  );
}
