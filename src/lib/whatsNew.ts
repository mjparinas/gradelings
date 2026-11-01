/**
 * The "What's new" daily posts, written for parents and teachers: what changed and what got fixed, in plain words.
 * No code, file names or internals. One entry per day that had changes a family or class would notice; newest first.
 * See docs/WHATS_NEW.md for how to add a day.
 */
export type NewsItem = {
  kind: "new" | "fixed" | "teachers";
  title: string;
  body: string;
};

export type NewsDay = {
  /** ISO day, e.g. 2026-11-01. Used in the URL. */
  day: string;
  headline: string;
  items: NewsItem[];
};

export const NEWS_KIND_LABEL: Record<NewsItem["kind"], string> = {
  new: "New",
  fixed: "Fixed",
  teachers: "For teachers",
};

export const WHATS_NEW: NewsDay[] = [
  {
    day: "2026-11-01",
    headline: "Goal plans for parents, and safer sign-in links",
    items: [
      {
        kind: "new",
        title: "Goal plans on the family plan",
        body: "Set a goal like “Get ready for Grade 5” in one subject, or “Catch up on a few units”, with a date. We spread the units over the weeks, show this week’s units and a progress bar on your child’s Overview card, and mention it in the weekly email. It is practice, not a report-card mark.",
      },
      {
        kind: "fixed",
        title: "Safer “Email me a sign-in link”",
        body: "We tightened how sign-in links work for accounts whose email was never confirmed, so only the person who owns the email keeps access.",
      },
    ],
  },
  {
    day: "2026-10-31",
    headline: "Finish a lesson later, a Math Facts chart, and homework for parents",
    items: [
      {
        kind: "new",
        title: "Finish your lesson",
        body: "If a child stops partway through a lesson, the home screen offers “Finish your lesson?” for the next 48 hours, picking up at the next question with earlier answers still counted.",
      },
      {
        kind: "new",
        title: "A 10 × 10 chart for Math Facts",
        body: "Adding and times-table sets now open as a chart. A known fact shows its answer, a fact being practised shows a dot, and new facts stay blank, so kids can see what they have already learned.",
      },
      {
        kind: "new",
        title: "Homework in the parent area and a fuller weekly email",
        body: "If your child is in a class, you can see the teacher’s current homework, how far along each unit is and when it is due. The weekly email now also shows Math Facts progress, stories read and one “try at home” idea.",
      },
      {
        kind: "teachers",
        title: "Schedule assignments ahead",
        body: "Give a unit a start date, up to a year ahead. Until that day it stays out of sight for students and parents, so you can plan a week at a time.",
      },
      {
        kind: "new",
        title: "More regions get a Pre-K year",
        body: "Pre-K (the year before Kindergarten) is now in many more provinces, territories and states, with picture-only questions and read-aloud.",
      },
    ],
  },
  {
    day: "2026-10-30",
    headline: "Bug fixes, and Pre-K in more places",
    items: [
      {
        kind: "fixed",
        title: "Practice no longer breaks behind a school web filter",
        body: "On some school networks, a filter replaced part of the app with a web page, which stopped it loading. The app now ignores those replacements, so it keeps working at home afterwards.",
      },
      {
        kind: "fixed",
        title: "Rare saving error on devices",
        body: "A few devices could lose their connection to the place where practice is saved on the device until the page was reloaded. The app now reconnects by itself.",
      },
      {
        kind: "new",
        title: "Pre-K reaches eight more states",
        body: "More families can now pick Pre-K for a four-year-old.",
      },
    ],
  },
  {
    day: "2026-10-29",
    headline: "A weekly “you grew” recap and the first Pre-K year",
    items: [
      {
        kind: "new",
        title: "Weekly “you grew” recap for kids",
        body: "Each week kids can look back at last week: days practised, questions, minutes, lessons that grew a level, new stickers, stories read and trophies earned. It only says what happened, never what didn’t, and shows nothing for a week without practice.",
      },
      {
        kind: "new",
        title: "Pre-K",
        body: "A new year for four-year-olds, with 26 picture-only lessons in math, language, science and social studies. It starts in the first regions and is rolling out to the rest. Pre-K has no report card; levels are practice steps only.",
      },
    ],
  },
  {
    day: "2026-10-28",
    headline: "Five more US places",
    items: [
      {
        kind: "new",
        title: "North Dakota, Vermont, South Dakota, Washington, DC and Wyoming",
        body: "Each follows its own state standards for Kindergarten to Grade 9, with US spelling, parent guides, report-card pages and teacher pages.",
      },
    ],
  },
  {
    day: "2026-10-27",
    headline: "Faster taps, a level for each subject, and more states",
    items: [
      {
        kind: "new",
        title: "Every tap answers right away",
        body: "Buttons now respond at once, with a progress bar while a bigger screen loads and a spinner on “Play free” links. Less waiting on older tablets.",
      },
      {
        kind: "new",
        title: "A level for each subject",
        body: "After the placement test, a parent can let a child practise one subject at a different grade, such as Grade 4 math while staying in Grade 3 for everything else. Progress is kept, and you can switch back any time.",
      },
      {
        kind: "new",
        title: "New Mexico, West Virginia, Hawaiʻi, New Hampshire, Montana, Delaware and Rhode Island",
        body: "Each follows its own state standards for Kindergarten to Grade 9.",
      },
    ],
  },
  {
    day: "2026-10-26",
    headline: "Six more US states",
    items: [
      {
        kind: "new",
        title: "Mississippi, Kansas, Connecticut, Iowa, Nebraska and Idaho",
        body: "Practice, parent guides, report-card pages and teacher pages for Kindergarten to Grade 9, matched to each state’s own standards.",
      },
    ],
  },
  {
    day: "2026-10-25",
    headline: "A better read-aloud voice, and a dozen more US states",
    items: [
      {
        kind: "new",
        title: "A natural read-aloud voice that works offline",
        body: "Questions are read in a clearer voice (Amy for English, Siwis for French) that downloads once and then works without internet. A parent can switch voices under Account.",
      },
      {
        kind: "new",
        title: "More US states",
        body: "North Carolina, Massachusetts, Maryland, South Carolina, Wisconsin, Tennessee, Michigan, Louisiana, Oklahoma, Kentucky, Utah and Nevada now follow their own standards from Kindergarten to Grade 9.",
      },
    ],
  },
];

/** "Sunday, November 1, 2026" */
export function dayLabel(day: string): string {
  return new Date(`${day}T12:00:00Z`).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const newsDay = (day: string): NewsDay | undefined => WHATS_NEW.find((d) => d.day === day);
