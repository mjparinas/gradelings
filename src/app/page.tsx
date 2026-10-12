import { onColour } from "@/lib/contrast";
import { PricingCards } from "@/components/site/Pricing";
import { ParentQuotes } from "@/components/site/ParentQuotes";
import type { Metadata } from "next";
import Link from "next/link";
import { Critter } from "@/components/Critter";
import { SitePage } from "@/components/site/SiteChrome";
import { appJsonLd } from "@/components/site/jsonld";
import { curriculumPath } from "@/components/site/curriculum";
import { kidPracticeSteps, provinceCoverage, regionList } from "@/components/site/provinces";
import { DEFAULT_GOAL_MINUTES } from "@/lib/model";
import { GAMES } from "@/components/play/games/types";
import { FRAMEWORKS } from "@/content/frameworks";
import { GRADE_LABEL } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, TRIAL_DAYS } from "@/lib/plan";
import { TEACHER_SIGNUP, teacherPath } from "@/components/site/teachers";
import { Disclosure } from "@/components/Disclosure";
import { JsonLd, ORG_JSON_LD, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${APP_NAME} · Curriculum practice and learning games for Kindergarten to Grade 9` },
  description: `Ad-free practice for Kindergarten to Grade 9 that follows the curriculum. An adaptive Adventure mode, learning games earned with focused practice, trophies, offline play, and progress reports in the same language as the report card. Free for ${TRIAL_DAYS} days.`,
  alternates: { canonical: "/" },
};

const FEATURES = [
  { icon: "💛", title: "Kind when they get it wrong", body: "A wrong answer gets a hint and another try. Feedback is gentle and encouraging, never a buzzer and never shaming." },
  { icon: "⏱️", title: "Screen time you can feel good about", body: "Games unlock only after focused practice. You choose the ratio (20 minutes of learning for 5 minutes of games by default) and a daily cap." },
  { icon: "🏆", title: "Plays like a video game", body: "Trophies, levels, daily quests, streaks and critter companions keep kids coming back, and every one of them is earned by learning." },
  { icon: "🗺️", title: "Picks what to practise for them", body: "One tap starts Adventure, a mix of subjects that leans toward the skills that need work. No menus to dig through." },
  { icon: "📶", title: "Works offline", body: "Install it on a tablet or phone and it keeps working with no internet. Progress, scores and trophies sync when you're back online." },
  { icon: "🙈", title: "No ads, ever", body: "No ads, no tracking pixels and no selling data. Kids see a first name and an avatar, nothing more." },
];

const STEPS = [
  { title: "Add your child", body: "Pick their grade and province. It takes two minutes." },
  { title: "They play and practise", body: "One tap starts Adventure. A wrong answer gets a hint and another try, never a buzzer." },
  { title: "You see where they stand", body: "Reports use your report card's levels and suggest what to practise next." },
];

const INCLUSIVE = [
  { icon: "🧘", title: "Calm and focus options", body: "For children who find motion, noise or time pressure hard, including many with ADHD: calm motion, quiet sounds, hidden timers, trophy pop-ups held until the lesson ends, and five-question sessions." },
  { icon: "📖", title: "Easier reading", body: "Questions use Andika, a font designed for beginning readers. Parents can add roomy spacing between letters, words and lines, or high contrast." },
  { icon: "🔊", title: "Read-aloud", body: "Every question can be read aloud with the voices on the device, in French for French questions. It's on by default for Kindergarten and Grade 1." },
  { icon: "🎨", title: "Checked for colour blindness", body: "Screens are checked against WCAG 2.2 AA contrast rules and a simulated colour-blind pass. Right answers get a tick as well as green, and the reduced motion setting is always respected." },
];

const FAQS = [
  {
    q: "What happens when the free trial ends?",
    a: `Nothing is charged, because we never asked for a card. Your child keeps their progress and trophies, and the first ${FREE_UNITS_PER_COURSE} units of every subject stay free. Subscribe whenever you want the rest.`,
  },
  {
    q: "How much time does it take?",
    a: `The daily goal is ${DEFAULT_GOAL_MINUTES.little} minutes for Kindergarten and Grade 1 and ${DEFAULT_GOAL_MINUTES.other} minutes for older kids. You can change it in Settings.`,
  },
  {
    q: `Which grades does ${APP_NAME} cover?`,
    a: "Kindergarten to Grade 9, in math, English language arts, science and social studies, plus French Immersion and Core French where your province teaches them. The text, buttons and read-aloud adapt to the child's age: big pictures and spoken prompts for Kindergarten and Grade 1, more independence for older kids.",
  },
  {
    q: "Is it matched to our provincial curriculum?",
    a: `Yes. Choose ${regionList(FRAMEWORKS)} when you add a child. Every unit is tagged with that province's learning standard, and parent reports use that province's report-card levels. More provinces and states are on the way.`,
  },
  {
    q: "Does it work without internet?",
    a: "Yes. Once it has been opened, it works offline on tablets, phones and computers. Practice is saved on the device and syncs to your account automatically when the connection comes back, so nothing is lost.",
  },
  {
    q: "How does the learning-to-games timer work?",
    a: "Time spent answering questions earns arcade time. By default every 20 minutes of learning unlocks 5 minutes of learning games, with a daily maximum. Parents can change both numbers, turn games off, or allow free play.",
  },
  {
    q: "How much does it cost?",
    a: `Try everything free for ${TRIAL_DAYS} days, no card needed. After that, the family plan is ${PRICES.month.label} or ${PRICES.year.label} (CAD) for up to ${MAX_CHILDREN} children. Without a plan, the first ${FREE_UNITS_PER_COURSE} units of every subject stay free.`,
  },
  {
    q: "Are there ads or in-app purchases for kids?",
    a: "No. There are no ads, and kids can't buy anything. Coins earned by practising are spent in a pretend shop on critter companions and confetti styles.",
  },
];

/** A drawn preview of the app for the hero: a question with its hint, and a few rows of the parent report. */
function AppPreview() {
  const levels = FRAMEWORKS[0].scoringFor("3").levels;
  const rows = [
    { unit: "Multiplication facts", level: levels[2] },
    { unit: "Fractions", level: levels[1] },
    { unit: "Telling time", level: levels[3] },
  ];
  return (
    <figure className="relative mx-auto flex w-full max-w-md flex-col gap-3">
      <div className="card p-4" aria-hidden="true">
        <div className="flex items-center gap-3">
          <Critter id="hoot" mood="think" size={56} />
          <p className="font-read text-xl font-semibold">What is 3 × 4?</p>
        </div>
        <ul className="mt-3 grid grid-cols-4 gap-2 font-read text-lg">
          {["7", "10", "12", "14"].map((c) => (
            <li key={c} className={`rounded-xl border-2 py-2 text-center ${c === "7" ? "border-line text-ink-soft line-through" : "border-line bg-white"}`}>
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-xl bg-[#fff4cc] px-3 py-2 font-read text-[#5c4300]">💡 So close! Think of 3 groups of 4. Try again.</p>
      </div>
      <div className="card p-4" aria-hidden="true">
        <p className="text-sm font-bold text-ink-soft">Parent report · Math</p>
        <ul className="mt-2 flex flex-col gap-2">
          {rows.map((r) => (
            <li key={r.unit} className="flex items-center justify-between gap-2 font-read">
              <span>{r.unit}</span>
              <span className="rounded-full bg-paper px-3 py-0.5 text-sm font-semibold">
                {r.level.icon} {r.level.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="text-center text-sm text-ink-soft">A question with a hint, and the parent report it feeds.</figcaption>
    </figure>
  );
}

export default function Home() {
  const coverage = provinceCoverage(FRAMEWORKS);
  const kidSteps = kidPracticeSteps(FRAMEWORKS);

  return (
    <SitePage>
      <JsonLd
        data={[
          ORG_JSON_LD,
          { "@context": "https://schema.org", "@type": "WebSite", name: APP_NAME, url: SITE_URL },
          appJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      {/* Hero */}
      <section className="grid items-center gap-8 pb-6 md:grid-cols-[1.1fr_1fr] md:pt-4 md:pb-12">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-[#fff4cc] px-3 py-1 text-sm font-bold text-[#8a6400]">Canadian curriculum · Kindergarten to Grade 9</p>
          <h1 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Practice that feels like play. <span className="text-[#4f8ef7]">Progress you can read.</span>
          </h1>
          <p className="mt-4 max-w-xl font-read text-lg text-ink-soft sm:text-xl">
            About {DEFAULT_GOAL_MINUTES.other} minutes a day of practice matched to your child&apos;s grade and province, in math, reading, science, social studies and French. Your child earns game time by learning. You see their progress in the same words as their report card.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link prefetch={false} href="/play/" className="btn btn-good min-h-14 px-8 text-xl">
              Start your free {TRIAL_DAYS}-day trial
            </Link>
            <Link href="/pricing/" className="btn min-h-14 px-6 text-xl">
              See plans
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-soft">No card needed · Nothing is charged when the trial ends · No ads, ever · Works offline</p>
        </div>
        <AppPreview />
      </section>

      {/* How it works */}
      <section aria-labelledby="how" className="py-8">
        <h2 id="how" className="mb-6 text-3xl font-bold sm:text-4xl">
          How it works
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card flex gap-4 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#4f8ef7] text-2xl font-bold text-[#0f172a]" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-1 font-read text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section aria-labelledby="features" className="py-8">
        <h2 id="features" className="mb-2 text-3xl font-bold sm:text-4xl">
          Built so kids want to come back
        </h2>
        <p className="mb-6 max-w-2xl font-read text-lg text-ink-soft">The pull of a good video game, pointed at the skills on the report card.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <p className="text-4xl" aria-hidden="true">
                {f.icon}
              </p>
              <h3 className="mt-2 text-xl font-bold">{f.title}</h3>
              <p className="mt-1 font-read text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Games */}
      <section aria-labelledby="games" className="py-8">
        <h2 id="games" className="mb-6 text-3xl font-bold sm:text-4xl">
          Learning games, earned with practice
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((g) => (
            <div key={g.id} className="rounded-3xl p-5" style={{ background: g.colour, color: onColour(g.colour) }}>
              <p className="text-4xl" aria-hidden="true">
                {g.icon}
              </p>
              <h3 className="mt-2 text-xl font-bold">{g.title}</h3>
              <p className="text-sm font-semibold opacity-90">{g.subject}</p>
              <p className="mt-1 font-read text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section aria-labelledby="coverage" className="py-8">
        <h2 id="coverage" className="mb-2 text-3xl font-bold sm:text-4xl">
          Matched to your province
        </h2>
        <p className="mb-6 max-w-2xl font-read text-lg text-ink-soft">
          {coverage.range ? `${GRADE_LABEL[coverage.range.from]} to ${GRADE_LABEL[coverage.range.to]} across ${FRAMEWORKS.length} provinces and territories. ` : ""}
          Pick yours to see every unit your child will practise.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {FRAMEWORKS.map((f) => (
            <Link key={f.id} href={curriculumPath.framework(f)} className="card flex min-h-12 items-center p-4 text-lg font-bold hover:border-[#4f8ef7]">
              {f.region}
            </Link>
          ))}
        </div>
      </section>

      {/* Report cards */}
      <section aria-labelledby="report" className="my-8 rounded-3xl bg-white p-6 sm:p-10">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 id="report" className="text-3xl font-bold sm:text-4xl">
              Speaks your report card&apos;s language
            </h2>
            <p className="mt-3 font-read text-lg text-ink-soft">
              Parent reports use your province&apos;s own report-card levels, in plain words, so you can see what the wording means and what to practise next. Your child sees four friendly steps instead, from {kidSteps[0]?.icon} {kidSteps[0]?.kidLabel} to {kidSteps[kidSteps.length - 1]?.icon} {kidSteps[kidSteps.length - 1]?.kidLabel}. This describes practice, not a report-card mark.
            </p>
            <Link href="/report-cards/" className="btn mt-5 min-h-12 px-5 text-lg">
              Report cards by province
            </Link>
          </div>
          <ol className="grid grid-cols-2 gap-3">
            {kidSteps.map((l) => (
              <li key={l.kidLabel} className="rounded-2xl bg-paper p-4">
                <p className="text-3xl" aria-hidden="true">
                  {l.icon}
                </p>
                <p className="text-lg font-bold">{l.kidLabel}</p>
                <p className="font-read text-sm text-ink-soft">{l.atHome}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Accessibility */}
      <section aria-labelledby="inclusive" className="py-8">
        <h2 id="inclusive" className="mb-2 text-3xl font-bold sm:text-4xl">
          Made for every kind of learner
        </h2>
        <p className="mb-6 max-w-2xl font-read text-lg text-ink-soft">
          Each child gets their own settings. They change how things look and sound, never the scoring.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUSIVE.map((f) => (
            <div key={f.title} className="card p-5">
              <p className="text-4xl" aria-hidden="true">
                {f.icon}
              </p>
              <h3 className="mt-2 text-xl font-bold">{f.title}</h3>
              <p className="mt-1 font-read text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          <Link href="/accessibility/" className="font-semibold text-[#2f6fd6] underline">
            What we&apos;ve tested, and what we haven&apos;t yet
          </Link>
        </p>
      </section>

      <ParentQuotes />

      {/* Pricing */}
      <section aria-labelledby="pricing" className="py-8">
        <h2 id="pricing" className="mb-2 text-3xl font-bold sm:text-4xl">
          Simple pricing for the whole family
        </h2>
        <p className="mb-6 max-w-2xl font-read text-lg text-ink-soft">Up to {MAX_CHILDREN} children on one plan, each with their own grade, settings and progress.</p>
        <PricingCards />
        <p className="mt-4 text-center">
          <Link href="/pricing/" className="font-semibold text-[#2f6fd6] underline">
            Pricing and billing details
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="py-8">
        <h2 id="faq" className="mb-4 text-3xl font-bold sm:text-4xl">
          Questions from parents
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((f) => (
            <Disclosure key={f.q} className="rounded-2xl border border-line bg-white p-4" titleClassName="text-lg font-semibold" title={f.q}>
              <p className="mt-2 font-read text-ink-soft">{f.a}</p>
            </Disclosure>
          ))}
        </div>
      </section>
      {/* Last call to action */}
      <section aria-labelledby="try" className="my-8 rounded-3xl bg-white p-6 text-center sm:p-10">
        <h2 id="try" className="text-3xl font-bold sm:text-4xl">
          See if your child likes it
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-read text-lg text-ink-soft">Everything is open for {TRIAL_DAYS} days. No card, and nothing to cancel.</p>
        <Link prefetch={false} href="/play/" className="btn btn-good mt-5 min-h-14 px-8 text-xl">
          Start your free {TRIAL_DAYS}-day trial
        </Link>
      </section>

      {/* Teachers */}
      <section aria-labelledby="teachers" className="my-8 rounded-3xl bg-[#e8f1ff] p-6 sm:p-10">
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="teachers" className="text-3xl font-bold sm:text-4xl">
              Teaching a class?
            </h2>
            <p className="mt-3 font-read text-lg text-ink-soft">
              Create a class, pick your province, and assign units from that curriculum. Families join with a code and choose what is shared. Classes are free for now.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link prefetch={false} href={TEACHER_SIGNUP} className="btn btn-good min-h-12 px-5 text-lg">
                Create a free teacher account
              </Link>
              <Link href={teacherPath.hub()} className="btn min-h-12 px-5 text-lg">
                See how classes work
              </Link>
            </div>
          </div>
          <ul className="grid gap-2 font-read text-ink">
            <li className="rounded-2xl bg-white p-3">📋 Assign units in a few taps</li>
            <li className="rounded-2xl bg-white p-3">📈 See level, accuracy and attempts</li>
            <li className="rounded-2xl bg-white p-3">🔒 Parents decide what is shared</li>
          </ul>
        </div>
      </section>

    </SitePage>
  );
}
