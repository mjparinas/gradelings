import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Legal";
import { regionSummary, regionWord } from "@/components/site/provinces";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { TRIAL_DAYS } from "@/lib/plan";

export const metadata: Metadata = {
  title: "About us",
  description: `Why ${APP_NAME} exists, who makes it and what we believe: curriculum-matched practice for Kindergarten to Grade 9 that kids enjoy and parents understand.`,
  alternates: { canonical: "/about/" },
};

/** What the product stands for, taken from the decisions that shape it. */
const BELIEFS: { title: string; body: string }[] = [
  {
    title: "Speak the language of the report card",
    body: `Every unit follows your ${regionWord(FRAMEWORKS)}’s own curriculum, and progress is shown in the same words your child’s report card uses, with a plain note on what it means at home.`,
  },
  {
    title: "Be kind",
    body: "A wrong answer gets a hint and another try, with a gentle sound and an encouraging word. We never shame a child for getting something wrong.",
  },
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
  {
    title: "Be honest with parents",
    body: "Reports say plainly that they show practice, not a report-card mark. The teacher decides your child’s level; we help you see what to practise next and what to ask.",
  },
];

export default function AboutPage() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">About {APP_NAME}</h1>
        <p className="mt-4 font-read text-lg">
          {APP_NAME} is curriculum-matched practice, learning games and progress reports for Kindergarten to Grade 9, across {regionSummary(FRAMEWORKS)}. Kids use it to practise math, reading, science and social studies. Parents choose it, set it up and see how it’s going.
        </p>
        <div className="mt-8 flex flex-col gap-8">
          <Section title="Why we made it">
            <p>
              Practice apps tend to be either hard to use or not matched to what children are actually learning at school. Report cards use words like “Developing” or “Level 3” that can be hard to turn into something to do at home. We wanted one place where a child happily practises the skills their teacher reports on, and a parent can see, in the report card’s own words, where things stand.
            </p>
          </Section>
          <Section title="Who makes it">
            <p>
              {APP_NAME} is made by Melvin, a parent of two young children who use it themselves. It is independent: not part of a publisher, a school board or a ministry of education.
            </p>
          </Section>
          <section aria-labelledby="beliefs">
            <h2 id="beliefs" className="text-2xl font-bold">
              What we believe
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {BELIEFS.map((b) => (
                <li key={b.title} className="card flex flex-col gap-2 p-5">
                  <h3 className="text-xl font-bold">{b.title}</h3>
                  <p className="font-read text-lg">{b.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <Section title="Try it, and tell us what you think">
            <p>
              Every family gets {TRIAL_DAYS} days with everything on and no card needed. If something could be better, we’d love to hear it on our <Link href="/contact/">contact page</Link>. A person reads every message.
            </p>
          </Section>
        </div>
      </article>
    </SitePage>
  );
}
