import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { Critter } from "@/components/Critter";
import { Section } from "@/components/site/Legal";
import { AppPreview } from "@/components/site/AppPreview";
import { regionSummary, regionWord } from "@/components/site/provinces";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { TRIAL_DAYS } from "@/lib/plan";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: `About us: why we made ${APP_NAME}`,
  description: `Why ${APP_NAME} exists, who makes it and what we believe: curriculum-matched practice for Pre-K to Grade 9 that kids enjoy and parents understand.`,
  path: "/about/",
});

/** The three pillars that differentiate; everything else sits quieter below. */
const BELIEFS_FEATURED: { title: string; body: string }[] = [
  {
    title: "Speak the language of the report card",
    body: `Every unit follows your ${regionWord(FRAMEWORKS)}’s own curriculum, and progress is shown in the same words your child’s report card uses, with a plain note on what it means at home.`,
  },
  {
    title: "Be kind",
    body: "A wrong answer gets a hint and another try, with a gentle sound and an encouraging word. We never shame a child for getting something wrong.",
  },
  {
    title: "Be honest with parents",
    body: "Reports say plainly that they show practice, not a report-card mark. The teacher decides your child’s level; we help you see what to practise next and what to ask.",
  },
];

const BELIEFS_MORE: { title: string; body: string }[] = [
  {
    title: "Be as fun as a good game",
    body: "Trophies, quests, buddies to collect and a room to decorate keep kids coming back. Arcade games are earned with learning time, and parents decide how much.",
  },
  {
    title: "No ads, and we never sell data",
    body: "Kids can never buy anything. Coins are earned only by learning. We keep very little about each child: a first name or nickname, grade, an avatar and practice results.",
  },
  {
    title: "Work for every child",
    body: "Read-aloud, calm mode, roomy text and high contrast are a switch away for any child. Practice works offline once it has loaded, so it keeps going in the car or on a patchy connection.",
  },
];

export default function AboutPage() {
  return (
    <SitePage cta lead="trial">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <section className="grid items-center gap-8 pb-4 md:grid-cols-[1.05fr_1fr] md:gap-10 md:pb-8">
        <div>
          <h1 className="text-4xl leading-tight font-bold sm:text-5xl">About {APP_NAME}</h1>
          <p className="mt-4 max-w-xl font-read text-lg text-ink-soft sm:text-xl">
            Curriculum-matched practice, learning games and progress reports for Pre-K to Grade 9. Kids practise; parents see where things stand in the report card’s own words.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SubscribeActions lead="trial" play="/play/" />
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            {TRIAL_DAYS} days free · No card needed · Across {regionSummary(FRAMEWORKS)}
          </p>
        </div>
        <AppPreview caption="A miss gets a kind hint. Parents see Emerging, Developing, Proficient — the same words as the report card." />
      </section>

      <article className="mx-auto mt-4 flex max-w-3xl flex-col gap-10">
        <Section title="Why we made it">
          <p>
            Practice apps tend to be either hard to use or not matched to what children are actually learning at school. Report cards use words like “Developing” or “Level 3” that can be hard to turn into something to do at home. We wanted one place where a child happily practises the skills their teacher reports on, and a parent can see, in the report card’s own words, where things stand.
          </p>
        </Section>

        <section aria-labelledby="who" className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="mx-auto shrink-0 sm:mx-0" aria-hidden="true">
            <Critter id="ollie" mood="wave" size={96} />
          </div>
          <div className="min-w-0">
            <h2 id="who" className="text-2xl font-bold">
              Who makes it
            </h2>
            <p className="mt-2 font-read text-lg leading-relaxed">
              {APP_NAME} is made by Melvin, a parent of two young children who use it themselves — the same hints, buddies and report words you see above. It is independent: not part of a publisher, a school board or a ministry of education.
            </p>
            <p className="mt-3 font-read text-lg leading-relaxed text-ink-soft">
              Questions or ideas? A person reads every message on the{" "}
              <Link href="/contact/" className="font-semibold text-ink underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="beliefs">
          <h2 id="beliefs" className="text-2xl font-bold">
            What we believe
          </h2>
          <ol className="mt-4 flex flex-col gap-6">
            {BELIEFS_FEATURED.map((b, i) => (
              <li key={b.title} className={i === 0 ? "rounded-2xl border border-line bg-white p-5" : undefined}>
                <h3 className="text-xl font-bold">{b.title}</h3>
                <p className="mt-2 font-read text-lg leading-relaxed text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
            {BELIEFS_MORE.map((b) => (
              <li key={b.title}>
                <p className="font-bold">{b.title}</p>
                <p className="mt-1 font-read text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="try" className="rounded-2xl border border-line bg-white p-6">
          <h2 id="try" className="text-2xl font-bold">
            Try it free
          </h2>
          <p className="mt-2 font-read text-lg leading-relaxed text-ink-soft">
            Every family gets {TRIAL_DAYS} days with everything on and no card needed. If something could be better, tell us on the{" "}
            <Link href="/contact/" className="font-semibold text-ink underline">
              contact page
            </Link>
            — a person reads every message.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <SubscribeActions lead="trial" play="/play/" />
          </div>
        </section>
      </article>
    </SitePage>
  );
}
