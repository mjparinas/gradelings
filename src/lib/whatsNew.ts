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
    day: "2026-11-07",
    headline: "Many more questions to practise, new things to read, and a fix for school networks",
    items: [
      {
        kind: "new",
        title: "More practice questions in language, science and French",
        body: "Grade 8 and Grade 9 language arts, Grade 8 science, Grade 5, 6 and 7 Core French and Kindergarten French Immersion have many more questions, so a unit stays fresh for longer. Grade 9 language arts is also deeper in Manitoba, and Washington and South Dakota social studies have more questions too.",
      },
      {
        kind: "new",
        title: "More articles and Explore cards",
        body: "Twelve new short articles and 48 new Explore cards, on science and our world topics families often ask about. They are read along, and nothing is scored or saved.",
      },
      {
        kind: "fixed",
        title: "Lessons no longer get stuck on some school networks",
        body: "On a few school networks, a web filter could block part of the app and leave a child on a loading screen. The app now says plainly that the network blocked something, and Try again works.",
      },
      {
        kind: "new",
        title: "Free Spanish pages for Grades 3 to 9",
        body: "Anyone can now look at what a beginner Spanish course covers, grade by grade and unit by unit, with sample questions. The Spanish course in the app itself is not switched on yet.",
      },
    ],
  },
  {
    day: "2026-11-06",
    headline: "A clearer refund promise, a nudge to save progress, and more Ontario practice",
    items: [
      {
        kind: "new",
        title: "Our refund promise, where you decide",
        body: "When you look at the plans, you now see that any payment is refunded in full if you ask within 14 days, no reason needed. It shows beside the plan buttons on Subscription and in the upgrade banner.",
      },
      {
        kind: "new",
        title: "A reminder to save your child's progress",
        body: "On a device with no account, a quiet card at the end of a lesson now also appears after the third and seventh lessons, asking for an email so you can get progress reports. It only asks for an email, and you can ignore it.",
      },
      {
        kind: "new",
        title: "Free trial note on practice question pages",
        body: "Sample questions on our public unit pages now say that the app is free for 30 days with everything open and no card needed.",
      },
      {
        kind: "new",
        title: "More Ontario practice questions",
        body: "Ontario Grade 7, 8 and 9 language units (grammar, writing, punctuation and more) and Grade 8 social studies have many more questions, so practice stays fresh for longer.",
      },
      {
        kind: "new",
        title: "More to read and wonder about",
        body: "Twelve new short articles and 48 new Explore cards, on topics families often search for, are now in the app.",
      },
      {
        kind: "new",
        title: "More practice in French and language arts",
        body: "French Immersion, Core French and language arts units from Kindergarten to Grade 9, plus some social studies and Grade 8 science units, have many more questions, so practice stays fresh for longer.",
      },
      {
        kind: "fixed",
        title: "No more endless loading on school networks",
        body: "When a school's web filter blocks part of the app, it now says so and offers Try again, instead of waiting forever.",
      },
    ],
  },
  {
    day: "2026-11-05",
    headline: "New things to read, puzzle over and print, plus a second grown-up on your family",
    items: [
      {
        kind: "new",
        title: "Brain breaks, rhymes, explore cards, story problems and articles",
        body: "Five new ways to learn without a score. Brain breaks are short puzzles for a rest between lessons. Rhymes are read along line by line. Explore cards are quick \"did you know\" facts about science and our world. Story problems give five fresh word problems each round. Articles are short non-fiction reading with two questions. Nothing is scored or saved, so they never count as practice. Little kids find them in My Treasures and older kids on the home screen.",
      },
      {
        kind: "new",
        title: "Add a second grown-up to your family",
        body: "A co-parent, grandparent or tutor can now sign in with their own password and see the same children and reports. You stay in charge of the plan and payments. Find it under Account.",
      },
      {
        kind: "new",
        title: "Printable activity packs",
        body: "Free 30-day practice calendars, math games that need only dice or cards, a reading log and conversation cards for every age group. Find them from the Help at home pages.",
      },
      {
        kind: "new",
        title: "Short how-to videos for parents",
        body: "The first time you use a part of the parent area, a short video explains it. You can watch any of them again from the Training videos list.",
      },
      {
        kind: "new",
        title: "More practice questions",
        body: "Many French Immersion, Core French and social studies units (Nunavut, New Brunswick, Manitoba, PEI and several US states) have more questions, so practice stays fresh for longer. Many fractions, decimals, percents, integers and Grade 6 to 9 language arts and science units also mix in new kinds of questions, such as matching pairs and finding the mistake.",
      },
      {
        kind: "fixed",
        title: "A full device now says so",
        body: "When a phone or tablet has no storage left, the app now shows a friendly note asking a grown-up to free up some space, instead of failing quietly.",
      },
    ],
  },
  {
    day: "2026-11-04",
    headline: "Help at home pages, quicker live questions and teacher how-to videos",
    items: [
      {
        kind: "new",
        title: "Help at home pages",
        body: "For each grade from Pre-K to Grade 9, three quick no-supplies ideas each for math, reading and writing, science and social studies, plus what children usually work on that year. They are free for anyone and suit every province and state.",
      },
      {
        kind: "new",
        title: "New kinds of questions",
        body: "Practice now includes more ways to answer: matching pairs, picking every right answer, spotting the mistake, filling in blanks, tapping words and building answers from tiles. They appear gradually in the units where they fit.",
      },
      {
        kind: "new",
        title: "More questions in Pre-K, French and social studies",
        body: "Pre-K science and social studies, Nova Scotia and PEI social studies, and Grade 5 Core French all have many more questions to practise with.",
      },
      {
        kind: "teachers",
        title: "Live questions arrive in about a second",
        body: "When you ask a live question, children's devices now get it almost at once instead of after a short wait.",
      },
      {
        kind: "teachers",
        title: "Training videos for teachers",
        body: "Short narrated videos show how to set up a class, add students, give homework, check progress and run live questions. Each plays once the first time you use that part, and you can watch them again any time from Training videos.",
      },
    ],
  },
  {
    day: "2026-11-03",
    headline: "Free math facts pages and printable worksheets for every grade",
    items: [
      {
        kind: "new",
        title: "Math facts pages",
        body: "Addition, subtraction, times tables and division each have a page with the strategies we teach in the app, a few questions to try, a chart where it helps, and answers to common questions. Anyone can use them, no account needed.",
      },
      {
        kind: "new",
        title: "Free printable math worksheets",
        body: "Pick a grade, then a skill such as fractions, and print a sheet of 10 questions with an answer key. They are the same for every province and state, so they suit any family.",
      },
      {
        kind: "new",
        title: "An invite line in the weekly email",
        body: "On the first Sunday of the month, a weekly email for a week with practice adds one line with your invite link. A family that joins through it earns you a free month.",
      },
    ],
  },
  {
    day: "2026-11-02",
    headline: "More holidays, friendlier buddies, and certificates for the fridge",
    items: [
      {
        kind: "new",
        title: "Lunar New Year, Diwali and Eid al-Fitr",
        body: "For two weeks before each one, the app gets a festive look and every character wears a matching hat. There is a limited-time keepsake for My Room too.",
      },
      {
        kind: "new",
        title: "Buddies with more personality",
        body: "Characters now hop, tilt and stretch when they have nothing to do, the next question slides in, and praise is warmer and more varied. Calm mode and reduced motion keep everything still.",
      },
      {
        kind: "new",
        title: "Streak days, graduations and fun facts",
        body: "Big streaks get a celebration, a child who moves up a grade gets a little graduation, and each lesson can end with a short \u201cDid you know?\u201d.",
      },
      {
        kind: "new",
        title: "Printable certificates",
        body: "Parents can print a certificate when a child finishes a grade or grows a unit into a Tree or a Star. It is labelled as practice, not a report-card mark.",
      },
    ],
  },
  {
    day: "2026-11-01",
    headline: "Goal plans, holiday looks, Pre-K in more places, and safer sign-in links",
    items: [
      {
        kind: "new",
        title: "A festive look for the holidays",
        body: "For a couple of weeks before Valentine’s Day, St. Patrick’s Day, Easter, Halloween, Thanksgiving and Christmas, the kids’ app and parent area get a festive tint and every character wears a matching hat or ears. Nothing changes the rest of the year.",
      },
      {
        kind: "new",
        title: "Short help videos for members",
        body: "After a second miss on a question, members can watch a short captioned video that explains the idea, then try one more. There are 36 for math, from Grade 1 to Grade 9, and they also play without a connection once watched.",
      },
      {
        kind: "new",
        title: "Pre-K in more places",
        body: "Pre-K, the year before Kindergarten, is now available for more provinces and states, with picture-only questions and read-aloud.",
      },
      {
        kind: "fixed",
        title: "No more stuck “Getting ready” in Safari",
        body: "On some Safari devices the app could sit on “Getting ready” and never open. It now carries on after a few seconds.",
      },
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
    headline: "A better read-aloud voice, festivals and more US states",
    items: [
      {
        kind: "new",
        title: "A natural read-aloud voice that works offline",
        body: "Questions are read in a clearer voice (Amy for English, Siwis for French) that downloads once and then works without internet. A parent can switch voices under Account.",
      },
      {
        kind: "new",
        title: "More US states",
        body: "Virginia, Missouri, North Carolina, Massachusetts, Maryland, South Carolina, Wisconsin, Tennessee, Michigan, Louisiana, Oklahoma, Kentucky, Utah and Nevada now follow their own standards from Kindergarten to Grade 9.",
      },
      {
        kind: "new",
        title: "Seasonal festivals and mystery boxes",
        body: "Four festivals a year, based on the seasons rather than holidays, each with its own page of stickers to find. After about one lesson in three, kids can tap open a mystery box with coins or a surprise sticker. Boxes are earned only by learning and never cost anything.",
      },
    ],
  },
  {
    day: "2026-10-24",
    headline: "Math Facts, a Story Library, and a Monday email for teachers",
    items: [
      {
        kind: "new",
        title: "Math Facts",
        body: "Typed practice for each fact on its own: addition and subtraction to 10 and 20, then times tables and division to 10 × 10. Missed facts come back most often, and “Show me another way” opens a short strategy lesson. Parent reports show how many facts your child knows in each set.",
      },
      {
        kind: "new",
        title: "Story Library",
        body: "Short original read-along stories in five reading levels, with a picture on every page, “Read to me” that lights up each sentence, and a few questions after. Stories help us find the right reading level for your child.",
      },
      {
        kind: "new",
        title: "School-year prompts and a year in review",
        body: "In late summer the Overview asks “Is Maya starting Grade 5?” with one tap to move up. In June you get a printable year in review for each child. Both are about practice, never a report-card mark.",
      },
      {
        kind: "teachers",
        title: "A Monday email for teachers",
        body: "Turn on a short Monday email that tells you how many students practised last week, current homework, units worth reteaching and students to check in with.",
      },
      {
        kind: "fixed",
        title: "Devices stay in step after a data restore",
        body: "If we ever have to restore our database from a backup, families’ devices now catch up on their own.",
      },
      {
        kind: "new",
        title: "Six more US states",
        body: "Pennsylvania, Colorado, Ohio, Georgia, New Jersey and Indiana now follow their own standards from Kindergarten to Grade 9.",
      },
    ],
  },
  {
    day: "2026-10-23",
    headline: "Exit tickets, easier sign-in, and feedback from inside the app",
    items: [
      {
        kind: "new",
        title: "Tell us what you think from inside the app",
        body: "Parents and teachers can now send feedback without leaving the app.",
      },
      {
        kind: "new",
        title: "Signing in is easy to find",
        body: "Every public page has a Sign in button, and the first screen of the kids’ app offers “Already have an account? Sign in”. A device a parent has used before says “Welcome back!” first.",
      },
      {
        kind: "teachers",
        title: "Exit tickets and larger-print login cards",
        body: "Ask 3 to 5 questions back to back at the end of a lesson and see each question’s results, each student’s score and who to check in with. Login cards can be printed in larger type, and a class summary with many units prints sideways.",
      },
      {
        kind: "new",
        title: "Illinois",
        body: "Illinois now follows its own standards from Kindergarten to Grade 9.",
      },
    ],
  },
  {
    day: "2026-10-18",
    headline: "Sign-in links, a class-wide goal, and number-line questions",
    items: [
      {
        kind: "new",
        title: "“Email me a sign-in link”",
        body: "Parents and teachers can sign in with a link sent to their email, with no password to remember.",
      },
      {
        kind: "teachers",
        title: "A class-wide weekly goal",
        body: "Set a question target for the whole class. Students see one shared progress bar, with counts only and no names or rankings.",
      },
      {
        kind: "new",
        title: "Tap-the-parts and number-line questions",
        body: "Grades 2, 5, 6 and 7 math now include questions where kids tap equal parts of a shape or place a marker on a number line.",
      },
      {
        kind: "fixed",
        title: "Sign-in link and billing messages",
        body: "Sign-in links now say clearly when an account is blocked and show your account once you are in. The Manage panel explains what to do when billing can’t be opened.",
      },
      {
        kind: "fixed",
        title: "The moose’s “Sorry!” bubble",
        body: "The bubble was cut off at the top of the screen. It now fits.",
      },
    ],
  },
  {
    day: "2026-10-17",
    headline: "Reading-level matching, Continue with Google, and Florida",
    items: [
      {
        kind: "new",
        title: "Reading passages that fit your child",
        body: "In Language Arts, practice now picks passages that read closest to your child’s level, worked out from their answers. The parent Reports page shows the estimate in one quiet line.",
      },
      {
        kind: "new",
        title: "Continue with Google",
        body: "Parents and teachers can sign in with their Google account. Class students never use it.",
      },
      {
        kind: "new",
        title: "A focus unit, rewards, and an “Ask a grown-up” button",
        body: "Pick one unit for your child to work on and name a real-world reward to earn with coins. When a child is stuck, they can ask a grown-up for help, and the Overview shows what they asked about. There is also a dyslexia-friendly font and page tint in Settings.",
      },
      {
        kind: "teachers",
        title: "Live questions get a desk per student, and you can try a unit as a student",
        body: "Live class questions now give each student a desk, the class timer stays on top during a question, and “Try it” lets you play an assigned unit the way a student sees it, with nothing saved.",
      },
      {
        kind: "fixed",
        title: "Dropdowns on touch screens",
        body: "Scrolling a dropdown list on a tablet or phone no longer picks an item by accident.",
      },
      {
        kind: "new",
        title: "Florida",
        body: "Florida now follows its own standards from Kindergarten to Grade 9.",
      },
    ],
  },
  {
    day: "2026-10-16",
    headline: "A big day for teachers",
    items: [
      {
        kind: "teachers",
        title: "Live class questions",
        body: "Ask a multiple-choice question from any unit and it appears on students’ screens. Preview the next question or swap it, show a class timer on every screen, see a recap of the day’s questions, and use a projector view and read-aloud.",
      },
      {
        kind: "teachers",
        title: "One code per student",
        body: "Each student you add gets a single ten-character login code. Scan the QR code on a printed login card to sign in.",
      },
      {
        kind: "teachers",
        title: "Homework, assignments and more",
        body: "Give homework a question goal, assign a unit to chosen students, assign several units at once with due-date shortcuts, teach a class split across two grades, and see which questions students missed most.",
      },
      {
        kind: "teachers",
        title: "Easier class management",
        body: "Sort and filter the progress table, download it as a CSV, rename a class, start the next school year in two taps, take bulk actions on students, hide classes you don’t need, and follow a getting-started checklist. Classes are now split into tabs.",
      },
      {
        kind: "new",
        title: "The teacher sign-up page opens faster",
        body: "The create-account form shows at once, without waiting for the rest of the page.",
      },
    ],
  },
  {
    day: "2026-10-15",
    headline: "Arkansas, and shared links that look better",
    items: [
      {
        kind: "new",
        title: "Arkansas",
        body: "Arkansas now follows its own standards from Kindergarten to Grade 9. Alaska’s content gaps were also closed.",
      },
      {
        kind: "new",
        title: "Nicer shared links",
        body: "Links to units, guides and grades now show a sharper preview with a sample question, such as “Can your Grade 4 solve this?”. Parents can also share a good week.",
      },
      {
        kind: "new",
        title: "The Gradelings name in emails",
        body: "Our emails now show the name in its own lettering instead of plain text.",
      },
    ],
  },
  {
    day: "2026-10-14",
    headline: "Seven more US states, 14-day refunds, and the US version of the app",
    items: [
      {
        kind: "new",
        title: "Alabama, Arizona, Alaska, Minnesota, Texas, New York and Maine",
        body: "Each follows its own state standards from Kindergarten to Grade 9. California gained units for every standard a child can practise, including Grade 9 chemistry and physics.",
      },
      {
        kind: "new",
        title: "US English for US families",
        body: "The kids’ app, the parent area and progress emails now use US spelling and wording for US children, and chemical safety lessons use the US labels.",
      },
      {
        kind: "new",
        title: "14-day refunds, a status page and a trust centre",
        body: "Any payment is refunded in full if you ask within 14 days. Prices say “plus tax”. We added a live status page and a trust centre explaining our security and privacy controls in plain words.",
      },
      {
        kind: "new",
        title: "Lessons for every subject",
        body: "Every unit in every subject now has a short “How it works” lesson, not just math. Grade guides also explain each report-card level.",
      },
      {
        kind: "new",
        title: "Buddies read their speech bubbles aloud",
        body: "Each speech bubble has a 🔊 button.",
      },
      {
        kind: "fixed",
        title: "Read-aloud in sorting questions",
        body: "The first item to sort is now read aloud right after the question.",
      },
    ],
  },
  {
    day: "2026-10-13",
    headline: "Washington, Oregon and California launch, and the iPhone and iPad app",
    items: [
      {
        kind: "new",
        title: "Washington, Oregon and California",
        body: "Our first US states are open, with US dollar prices, US spelling and the parental consent notice US families need.",
      },
      {
        kind: "new",
        title: "The iPhone and iPad app",
        body: "Gradelings now has an app for iPhone and iPad. It works offline once loaded.",
      },
      {
        kind: "new",
        title: "Printable sheets and an About page",
        body: "Each grade guide has a gallery of printable practice sheets. We also added an About page and a contact form.",
      },
      {
        kind: "new",
        title: "Sales and clearer pricing",
        body: "Pricing now leads with the cost per child. Seasonal sales show a banner with a code and a countdown.",
      },
      {
        kind: "fixed",
        title: "Sale banner stays in view",
        body: "Opening a page from the menu no longer scrolls the sale banner away.",
      },
    ],
  },
  {
    day: "2026-10-12",
    headline: "A calmer parent area, six new games and fifteen new buddies",
    items: [
      {
        kind: "new",
        title: "A simpler parent area",
        body: "Six tabs and about eight settings per child on first view. Two timer settings became one “Timers in lessons” choice, and the PIN can be typed on a keyboard.",
      },
      {
        kind: "new",
        title: "Six new games, fifteen buddies and fourteen celebrations",
        body: "New arcade games unlock as kids level up, with more rounds for Grades 6 to 9. The shop has 15 new buddies and 14 new celebrations, and My Room has more to buy.",
      },
      {
        kind: "new",
        title: "A calmer home screen for Kindergarten and Grade 1",
        body: "Fewer cards and three big picture tiles: Lessons, Games and Treasures.",
      },
      {
        kind: "new",
        title: "Keyboard access and high contrast",
        body: "Every page has a skip link, every screen works with the keyboard, and the app follows Windows high-contrast mode.",
      },
      {
        kind: "new",
        title: "Invite friends and redeem codes",
        body: "Parents can invite friends and earn a reward. A code under Subscription gives free access or a discount.",
      },
      {
        kind: "new",
        title: "Newfoundland and Labrador, and more of Nunavut",
        body: "Newfoundland and Labrador is now available. Nunavut Kindergarten to Grade 3 units now match its new curriculum.",
      },
      {
        kind: "fixed",
        title: "Safer, and kinder to batteries",
        body: "Fixes from a full security review, and idle devices no longer sync every few seconds. Letter sounds read aloud more naturally, and the Number Munchers goal is read aloud each round.",
      },
    ],
  },
  {
    day: "2026-10-11",
    headline: "Nova Scotia, New Brunswick, Yukon and the Northwest Territories",
    items: [
      {
        kind: "new",
        title: "Four more regions",
        body: "Nova Scotia, New Brunswick, Yukon and the Northwest Territories are now available, along with Nunavut and Saskatchewan French (Core and Immersion). Manitoba gained units for outcomes that were still missing.",
      },
      {
        kind: "new",
        title: "Three children per family plan",
        body: "The family plan covers up to three children, and subscribing is easier to find before the trial ends.",
      },
      {
        kind: "fixed",
        title: "Read-aloud voices on Android Chrome",
        body: "Device voices now work properly on Android Chrome.",
      },
    ],
  },
  {
    day: "2026-10-10",
    headline: "Alberta, Saskatchewan and Manitoba, sticker books, My Room and an Android app",
    items: [
      {
        kind: "new",
        title: "Alberta, Saskatchewan and Manitoba",
        body: "All three are available from Kindergarten to Grade 9, with French where each province teaches it.",
      },
      {
        kind: "new",
        title: "Sticker Book and My Room",
        body: "Kids earn a sticker for every lesson they grow in, and spend coins on walls, floors, plants and toys in My Room. Their buddy now grows with their level.",
      },
      {
        kind: "new",
        title: "Easy, regular or stretch goals",
        body: "Kids can pick a lighter or stretch daily goal. The home screen shows the lesson closest to its next level, and units your child knew well but left for two weeks offer a quick refresher.",
      },
      {
        kind: "new",
        title: "More for parents",
        body: "A weekly practice goal with kind notes you can send, a month summary in the weekly email, an “Is it working?” panel in Reports, trial recap emails, and an invite for a partner or grandparent to see reports.",
      },
      {
        kind: "new",
        title: "Student accounts and teacher tools",
        body: "Teachers can add students who sign in with a code, and every math unit has a “How it works” lesson. A printable conversation sheet helps with parent-teacher meetings. Teacher pages on the site and an Android app for phones and tablets also arrived.",
      },
      {
        kind: "new",
        title: "Now called Gradelings",
        body: "The app has a new name and a new look.",
      },
      {
        kind: "fixed",
        title: "Taps that did nothing",
        body: "“Try this lesson” and other home cards now respond when tapped, and the iPad no longer bounces when you scroll.",
      },
    ],
  },
  {
    day: "2026-10-09",
    headline: "The first day: accounts, French, Ontario and classrooms",
    items: [
      {
        kind: "new",
        title: "Accounts and the parent area",
        body: "Parents can create an account, confirm their email, sign in on several devices and have progress sync between them.",
      },
      {
        kind: "new",
        title: "Ontario, plus French Immersion and Core French",
        body: "Ontario follows its own curriculum from Kindergarten to Grade 9, with a province switch for each child and parent guides. French Immersion and Core French were added for British Columbia.",
      },
      {
        kind: "new",
        title: "Grades 8 and 9, a placement test and parent guides",
        body: "British Columbia now goes to Grade 9. An adaptive placement test finds the right starting grade in math and language, and there are parent guides, practice sheets and comparison pages.",
      },
      {
        kind: "teachers",
        title: "Classroom mode",
        body: "Teachers can create classes, share join codes and assign units. Assigned units show on children’s home screens.",
      },
      {
        kind: "new",
        title: "More rewards and a few surprises",
        body: "Longer-term trophies, light vibration on taps, and some hidden easter eggs for kids to find.",
      },
      {
        kind: "fixed",
        title: "Spelling and security",
        body: "Grade 7 science now uses Canadian spelling (“sulphur”), and we hardened sign-in, sessions and payments.",
      },
    ],
  },
  {
    day: "2026-10-08",
    headline: "The very first version",
    items: [
      {
        kind: "new",
        title: "Practice for Kindergarten to Grade 7 in British Columbia",
        body: "The app began as a Grade 2 practice site and grew the same day to Kindergarten through Grade 7, following the BC curriculum. Kids earn XP, coins, trophies and daily quests, and every wrong answer gets a hint and another try.",
      },
      {
        kind: "new",
        title: "Works offline, with a parent area",
        body: "Practice keeps working without internet and syncs across devices later. Parents get reports on each child’s progress, written as practice and never as a report-card mark.",
      },
      {
        kind: "new",
        title: "Read-aloud and calm options",
        body: "Questions can be read aloud in the most natural voice on the device, and parents can choose a different voice. Per-child calm and focus options reduce motion, noise and time pressure.",
      },
      {
        kind: "new",
        title: "Privacy policy and terms",
        body: "Plain-language privacy and terms pages went up from the start.",
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
