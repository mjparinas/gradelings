import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { TeacherCta } from "@/components/site/TeacherCta";
import { regionList, regionWord } from "@/components/site/provinces";
import { TEACHER_FRAMEWORKS, TEACHER_SIGNUP, teacherPath } from "@/components/site/teachers";
import { APP_NAME } from "@/lib/brand";
import { Disclosure } from "@/components/Disclosure";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";
import { US_CLASS_CONSENT } from "@/lib/classroom";

const curricula = TEACHER_FRAMEWORKS.map((f) => f.curriculumName).join(" or ");
const regions = regionList(TEACHER_FRAMEWORKS);
/** "province", or "province or state" once a US state can have classes. */
const region = regionWord(TEACHER_FRAMEWORKS);

export const metadata: Metadata = pageMeta({
  title: "Classroom practice for teachers, Kindergarten to Grade 9",
  description: `Create a class, assign curriculum-matched units and see how each student is practising. Free for teachers for now, ad-free, and families stay in control of what is shared.`,
  path: teacherPath.hub(),
});

const STEPS = [
  { title: "Create a class", body: `Sign up as a teacher, name your class, and choose its grade and ${region}. You get a short join code.` },
  {
    title: "Add students",
    body: "Type first names or nicknames and print login cards: each student signs in with the class code and their own code, with no email or password. Or families link their own child with the join code.",
  },
  { title: "Assign units", body: "Pick units from the class's curriculum, with an optional date to aim for. They appear as “From your teacher” on each child's home screen, even offline." },
  {
    title: "See practice results",
    body: "See each student's level, accuracy and attempts on the units you assigned, plus which units to reteach and who to check in with. It shows practice, not a report-card mark.",
  },
];

const usClasses = TEACHER_FRAMEWORKS.some((f) => f.country === "US");

const FAQS = [
  { q: "Does it cost anything for teachers?", a: `Classes are free for now. Students whose family has no plan can still open the units you assign.` },
  {
    q: "Do I have to enter students myself?",
    a: "You choose. You can type first names or nicknames and print login cards, with no email, password or birth year. Or parents link their own child with your join code, and can leave at any time.",
  },
  {
    q: "What can I see about my students?",
    a: "First name, avatar, grade, and level, accuracy and attempts on the units you assigned, with suggestions for what to look at next. Nothing else.",
  },
  {
    q: "Can I share a class with another teacher?",
    a: "Yes. Invite up to 5 co-teachers by email. They can see the class, assign units, add students and print login cards. Only the class owner can close the class or delete a student.",
  },
  {
    q: "What happens to student data?",
    a: "Deleting a student or closing the class deletes the student accounts you added straight away. A class nobody has signed in to for 12 months is deleted, after a warning email at 11 months. Children linked by a parent keep their family's progress.",
  },
  ...(usClasses ? [{ q: "Do US schools need parent consent?", a: US_CLASS_CONSENT }] : []),
  { q: "Is this a report-card mark?", a: `No. ${APP_NAME} shows how a student is practising. The teacher decides proficiency, as on the report card.` },
  { q: "Which curriculum does it follow?", a: `Each class follows one ${region}: ${regions}. Units are matched to the ${curricula}, from Kindergarten to Grade 9. Other provinces and states are on the way.` },
  { q: "Are there ads?", a: "No ads and no selling of data. Kids cannot buy anything." },
];

export default function TeachersHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "For teachers" }];
  return (
    <SitePage>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(FAQS)]} />
      <Crumbs items={crumbs} />
      <section className="py-4">
        <p className="mb-3 inline-flex rounded-full bg-[#fff4cc] px-3 py-1 text-sm font-bold text-[#8a6400]">For teachers · Kindergarten to Grade 9</p>
        <h1 className="text-4xl leading-tight font-bold sm:text-5xl">Classroom practice your students will want to do</h1>
        <p className="mt-4 max-w-2xl font-read text-lg text-ink-soft">
          Assign {regions} curriculum units, see how your students are practising, and let learning games be the reward for focused work. No ads, no student passwords, and families stay in control.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link prefetch={false} href={TEACHER_SIGNUP} className="btn btn-good min-h-14 px-6 text-xl">
            Create a free teacher account
          </Link>
          {TEACHER_FRAMEWORKS.map((f) => (
            <Link key={f.id} href={teacherPath.framework(f)} className="btn min-h-14 px-6 text-xl">
              See {f.region} units
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="how" className="py-8">
        <h2 id="how" className="mb-4 text-3xl font-bold">
          How classes work
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-5">
              <p className="text-3xl font-bold text-[#4f8ef7]" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 font-read text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq" className="py-8">
        <h2 id="faq" className="mb-4 text-3xl font-bold">
          Questions from teachers
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((f) => (
            <Disclosure key={f.q} className="rounded-2xl border border-line bg-white p-4" titleClassName="text-lg font-semibold" title={f.q}>
              <p className="mt-2 font-read text-ink-soft">{f.a}</p>
            </Disclosure>
          ))}
        </div>
        <p className="mt-4 font-read text-sm text-ink-soft">
          Using {APP_NAME} for a whole school? See the{" "}
          <Link href="/privacy/" className="underline">
            privacy policy
          </Link>{" "}
          and <Link href="/contact/" className="underline">get in touch</Link> first.
        </p>
      </section>
      <TeacherCta showHub={false} />
    </SitePage>
  );
}
