import { FRAMEWORKS } from "@/content/frameworks";
import { listRegions } from "@/content/regions";
import { APP_NAME } from "@/lib/brand";
import { MAX_CHILDREN, money, perChildMonthly, PRICES_BY_CURRENCY, type Country, type Currency } from "@/lib/plan";

/** "From $3.33 a month per child (C$119.99 a year for up to 3 children)": our price, led by the cost per child. */
const perChild = (c: Currency) =>
  `From ${money(perChildMonthly(c, "year"), c)} a month per child (${c === "USD" ? "US$" : "C$"}${PRICES_BY_CURRENCY[c].year.amount} a year for up to ${MAX_CHILDREN} children).`;
// Competitor comparison pages for the app. Facts about other products come from their public pages
// and app store listings (see docs/research/competitors.md) and are dated, because
// prices and features change. Keep the wording factual and fair, and re-check
// every figure when you change PRICE_CHECKED.
//
// One page serves families in every country we offer. A row, question or source that is only true in one
// country carries `country`, and is shown only while that country has a framework (`forCountries`).
// Every competitor needs a price and curriculum row for each country (guides.test.ts checks).

export const PRICE_CHECKED = "October 2026";

export interface Competitor {
  slug: string;
  name: string;
  /** One line for lists and search snippets. */
  summary: string;
  who: string;
  goodAt: string[];
  /** How they differ from us, written as plain facts. */
  differences: { topic: string; them: string; us: string; country?: Country }[];
  /** Pick them if... / pick us if... */
  chooseThem: string[];
  chooseUs: string[];
  sources: { label: string; url: string; country?: Country }[];
  faqs: { q: string; a: string; country?: Country }[];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "ixl",
    name: "IXL",
    summary: "IXL is a large, paid skill-practice site for Math, English, Science and more, with a SmartScore for each skill.",
    who: "Families who want a very large bank of skills to practise, and who are comfortable with a score that rises with correct streaks.",
    goodAt: [
      "A very large library of skills across many grades.",
      "Standards pages that list its skills by province.",
      "Detailed analytics for parents and teachers.",
    ],
    differences: [
      {
        topic: "Price in Canada",
        country: "CA",
        them: `IXL Canada lists C$12.95 a month for one subject, C$19.95 for Math and English together, and C$24.95 for All Access, as of ${PRICE_CHECKED}. The free tier limits how many questions a child can answer each day.`,
        us: `${perChild("CAD")} One family plan covers every subject. There is a 30-day free trial with no card, and the first 2 units of every course stay free afterwards.`,
      },
      {
        topic: "Price in the US",
        country: "US",
        them: `IXL's US site lists US$9.95 a month for one subject, US$15.95 for Math and English language arts together, and US$19.95 for Core subjects (Math, English language arts, Science and Social studies), as of ${PRICE_CHECKED}. The free tier limits how many questions a child can answer each day.`,
        us: `${perChild("USD")} One family plan in US dollars covers every subject. There is a 30-day free trial with no card, and the first 2 units of every course stay free afterwards.`,
      },
      {
        topic: "Curriculum",
        them: "Skills are mapped to provincial curricula in Canada and to state standards in the US, including Washington, Oregon, California, New York, Texas, Maine, Minnesota, Alaska, Alabama, Arizona, Arkansas, Florida, Illinois, Colorado, Pennsylvania, Georgia, Ohio and Tennessee.",
        us: "Every unit is matched to a learning standard in your child's province or state, and the units are ordered the way that grade is taught there.",
      },
      {
        topic: "How progress is shown",
        them: "SmartScore rises as kids answer correctly in a row and falls on mistakes. Common Sense Media notes that some children find this stressful.",
        us: "Wrong answers get a hint and another try. Only first-try answers count towards accuracy, and stars never go down. Progress is reported in your province's or state's own report-card levels.",
      },
      {
        topic: "Report card language",
        them: "Reports are organized around skills and scores.",
        us: "Reports use the words on your province's or state's report card, with a plain-language “at home” note for each level.",
      },
      {
        topic: "Games and offline use",
        them: "Practice is on the website and in its apps.",
        us: "Learning earns time in built-in games. The kids' app works offline once opened.",
      },
    ],
    chooseThem: ["You want the widest range of skills and grades in one place.", "Your child likes working towards a score."],
    chooseUs: [
      "You want practice that follows your province's or state's curriculum and speaks the language of your child's report card.",
      "You'd like a gentler feel, with hints, retries and no scores that go down.",
      "You have more than one child and want one price.",
    ],
    sources: [
      { label: "IXL Canada family pricing", url: "https://ca.ixl.com/membership/family/pricing", country: "CA" },
      { label: "IXL British Columbia math standards", url: "https://ca.ixl.com/standards/british-columbia/math", country: "CA" },
      { label: "IXL US family pricing", url: "https://www.ixl.com/membership/family/pricing", country: "US" },
      { label: "IXL Washington math standards", url: "https://www.ixl.com/standards/washington/math", country: "US" },
      { label: "Common Sense Media review of IXL", url: "https://www.commonsensemedia.org/website-reviews/ixl" },
    ],
    faqs: [
      {
        q: `Is ${APP_NAME} a good alternative to IXL for Canadian families?`,
        country: "CA",
        a: `It can be, depending on what you want. IXL has a much larger skill library. ${APP_NAME} is smaller and built around provincial curricula and report-card levels for ${listRegions(FRAMEWORKS.filter((f) => f.country === "CA"))}, with a gentler hint-and-retry style and one family price.`,
      },
      {
        q: `Is ${APP_NAME} a good alternative to IXL for US families?`,
        country: "US",
        a: `It can be, depending on what you want. IXL has a much larger skill library and covers every US state. ${APP_NAME} covers ${listRegions(FRAMEWORKS.filter((f) => f.country === "US"))}, with units matched to each state's learning standards, a gentler hint-and-retry style and one family price in US dollars for up to ${MAX_CHILDREN} children.`,
      },
      {
        q: `Does ${APP_NAME} have a SmartScore?`,
        a: `No. ${APP_NAME} shows each unit on your province's or state's report-card scale, based on recent first-try accuracy. It says clearly that this reflects practice, not a report card mark.`,
      },
    ],
  },
  {
    slug: "khan-academy",
    name: "Khan Academy",
    summary: "Khan Academy is a free nonprofit with video lessons and practice, and a separate Kids app for ages 2 to 8.",
    who: "Families who want free, high-quality lessons and are happy to follow a US-based course order.",
    goodAt: [
      "It is free, with no ads.",
      "Clear video lessons, especially for older students.",
      "Khan Academy Kids is a well-loved free app for the early years.",
    ],
    differences: [
      {
        topic: "Price",
        them: "Free.",
        us: `A family plan after a 30-day free trial, from ${money(perChildMonthly("CAD", "year"), "CAD")} a month per child with ${MAX_CHILDREN} children. The first 2 units of every course stay free forever.`,
      },
      {
        topic: "Curriculum in Canada",
        country: "CA",
        them: "Course order follows US standards. A 2015 mapping linked some Grade 4 to 6 content to Ontario and British Columbia, and it hasn't been updated for current provincial curricula, as far as we could find.",
        us: "Every unit is matched to a learning standard in your child's province, and that standard is listed for parents.",
      },
      {
        topic: "Curriculum in the US",
        country: "US",
        them: "Math courses are aligned to the Common Core, and Khan Academy maps its math content to state standards for most grades in every state. Science and social studies are organized as general courses rather than by state grade.",
        us: "Every unit, in math, English language arts, science and social studies, is matched to a learning standard in your child's state, and that standard is listed for parents.",
      },
      {
        topic: "Parent guidance",
        them: "Learning is largely self-directed, with limited guidance for parents.",
        us: "Reports for parents in your province's or state's report-card levels, with strengths, next steps and a guide to that province's or state's report card.",
      },
      {
        topic: "Games",
        them: "Lessons and exercises, plus the Kids app for little ones.",
        us: "Learning games, trophies and a pretend shop, with coins earned only by learning.",
      },
    ],
    chooseThem: ["Budget is the main concern.", "Your child likes watching video lessons and working independently."],
    chooseUs: [
      "You want practice that lines up with what your child's teacher is covering.",
      "You want to see progress in the language of your child's report card.",
      "You want a kids' app with learning games and parent controls.",
    ],
    sources: [
      { label: "Khan Academy: does it cost money?", url: "https://support.khanacademy.org/hc/en-us/articles/202260114-Does-it-cost-money-to-use-Khan-Academy" },
      { label: "Khan Academy blog, 2015: Ontario and BC mapping", url: "https://blog.khanacademy.org/the-learning-partnership-helps-bring-khan-academy/", country: "CA" },
      {
        label: "Khan Academy: is math content aligned to Common Core or state standards?",
        url: "https://support.khanacademy.org/hc/en-us/articles/16758363457805-Is-Khan-Academy-math-content-aligned-to-Common-Core-or-other-U-S-state-standards",
        country: "US",
      },
    ],
    faqs: [
      {
        q: "Is Khan Academy aligned to Canadian curricula?",
        country: "CA",
        a: "Khan Academy's courses follow US standards. We found a 2015 mapping to Ontario and British Columbia for some Grade 4 to 6 content, and nothing current for the provinces we cover. Check with your child's teacher if you want to be sure a topic is taught in their grade.",
      },
      {
        q: "Is Khan Academy aligned to my state's standards?",
        country: "US",
        a: "For math, largely yes: its courses follow the Common Core, and it maps its math content to most grades in every state's standards. For science and social studies, its courses are general rather than matched to your state's grade-by-grade standards. Check with your child's teacher if you want to be sure a topic is taught in their grade.",
      },
      {
        q: `Can I use Khan Academy and ${APP_NAME} together?`,
        a: "Yes. Many families use a free resource for videos and a curriculum-matched app for practice and reports. Use whichever your child enjoys.",
      },
    ],
  },
  {
    slug: "prodigy",
    name: "Prodigy",
    summary: "Prodigy is a fantasy role-playing game where kids battle monsters by answering math questions.",
    who: "Kids who are motivated by a long, story-style game and are fine with in-game membership offers.",
    goodAt: [
      "A big game world that many kids love.",
      "Free core math play.",
      "Strong adoption in schools, especially in Ontario.",
    ],
    differences: [
      {
        topic: "Price in Canada",
        country: "CA",
        them: `The core game is free. On the Canadian App Store, memberships were C$12.99 to C$25.99 a month, or C$74.99 to C$154.99 a year, as of ${PRICE_CHECKED}.`,
        us: `${perChild("CAD")} No in-game purchases: kids can never buy anything, and coins are earned only by learning.`,
      },
      {
        topic: "Price in the US",
        country: "US",
        them: `The core game is free. On the US App Store, memberships were US$12.99 to US$25.99 a month, or US$74.99 to US$154.99 a year, as of ${PRICE_CHECKED}.`,
        us: `${perChild("USD")} No in-game purchases: kids can never buy anything, and coins are earned only by learning.`,
      },
      {
        topic: "Selling inside the game",
        them: "The game shows kids membership offers, and parents have reported children asking them to upgrade.",
        us: "No ads and no upsells to children, ever.",
      },
      {
        topic: "Curriculum in Canada",
        country: "CA",
        them: "Canadian content follows the Ontario curriculum. We didn't find a match to the British Columbia curriculum.",
        us: `Matched to the curriculum in ${listRegions(FRAMEWORKS.filter((f) => f.country === "CA"))}.`,
      },
      {
        topic: "Curriculum in the US",
        country: "US",
        them: "US math content follows the Common Core, grade by grade.",
        us: `Matched to the state standards in ${listRegions(FRAMEWORKS.filter((f) => f.country === "US"))}, in math, English language arts, science and social studies from Kindergarten to Grade 9.`,
      },
      {
        topic: "Subjects",
        them: "Mostly math.",
        us: "Math, language arts, science and social studies from Kindergarten to Grade 9.",
      },
    ],
    chooseThem: ["Your child will only practise inside a big, story-driven game.", "You want a free math option to try."],
    chooseUs: [
      "You want practice matched to your province's or state's curriculum, in math, language arts, science and social studies.",
      "You don't want your child to see ads or purchase offers.",
      "You want clear reports in your province's or state's report-card language.",
    ],
    sources: [
      { label: "Prodigy on the Canadian App Store", url: "https://apps.apple.com/ca/app/id950795722", country: "CA" },
      { label: "Prodigy on the US App Store", url: "https://apps.apple.com/us/app/id950795722", country: "US" },
      { label: "Prodigy math curriculum standards", url: "https://www.prodigygame.com/main-en/math-curriculum-standards/" },
    ],
    faqs: [
      {
        q: `Does ${APP_NAME} have a game like Prodigy?`,
        a: `${APP_NAME} has quick learning games, such as Number Munchers and Word Ninja, and a coin-and-trophy system. They are shorter than a full role-playing game and unlock through learning time you choose.`,
      },
      {
        q: `Does ${APP_NAME} show ads or sell things to kids?`,
        a: "Never. There are no ads and no in-app purchases for kids. Parents control the plan.",
      },
    ],
  },
];

export function competitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

/** The countries we offer a curriculum in, in the order pages list them: Canada, then the US. */
export const OFFERED_COUNTRIES: Country[] = (["CA", "US"] as const).filter((c) => FRAMEWORKS.some((f) => f.country === c));

/** A competitor with only the rows, questions and sources for the countries we offer. */
export function forCountries(c: Competitor, countries: readonly Country[] = OFFERED_COUNTRIES): Competitor {
  const keep = (x: { country?: Country }) => !x.country || countries.includes(x.country);
  return { ...c, differences: c.differences.filter(keep), faqs: c.faqs.filter(keep), sources: c.sources.filter(keep) };
}

/** "Canadian families", or "families in Canada and the US" once a US state is offered. */
export function familiesWord(countries: readonly Country[] = OFFERED_COUNTRIES): string {
  return countries.includes("US") ? "families in Canada and the US" : "Canadian families";
}
