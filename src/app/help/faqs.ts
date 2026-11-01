import { FRAMEWORKS } from "@/content/frameworks";
import { listRegions } from "@/content/regions";
import { APP_NAME } from "@/lib/brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, PRICES_BY_CURRENCY, REFUND_DAYS, TAX_NOTE, TRIAL_DAYS } from "@/lib/plan";

const US_STATES = FRAMEWORKS.filter((f) => f.country === "US");
/** "Washington", or "Washington and Oregon": the US states offered, for answers that need a US sentence. */
const usStates = listRegions(US_STATES);

export interface HelpSection {
  id: string;
  title: string;
  faqs: { q: string; a: string }[];
}

// Plain-language answers. Plan numbers come from lib/plan.ts so they can't drift.
export const HELP: HelpSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    faqs: [
      {
        q: "How do I start?",
        a: `Open ${APP_NAME} on any tablet, phone or computer, tap Let’s go, and add your child’s name and grade. No account is needed to begin. Creating a free account later lets you keep progress safe and share it across devices.`,
      },
      {
        q: "Can I add more than one child?",
        a: `Yes. One family account holds up to ${MAX_CHILDREN} children, each with their own grade, progress, trophies and settings. You can switch players from the home screen.`,
      },
      {
        q: "How do I get to the Parent area?",
        a: "Open the Parent area from the link on the home page of the app. You’ll be asked for a PIN you choose the first time. The PIN keeps children out of settings, reports and billing, and it locks again every time the page is reloaded.",
      },
      {
        q: "I forgot my Parent area PIN.",
        a: "Choose “Forgot PIN” on the PIN screen and answer the multiplication question. It’s easy for adults and hard for young children. Then set a new PIN.",
      },
    ],
  },
  {
    id: "account",
    title: "Your account and devices",
    faqs: [
      {
        q: "I forgot my password.",
        a: "On the sign-in form in the Parent area, choose “Forgot your password?” and enter your email. We’ll send a link that works for one hour. Using it signs you in with your new password and signs out your other devices.",
      },
      {
        q: "I didn’t get an email.",
        a: "Check your spam or junk folder first, and make sure you typed the address you signed up with. Confirmation emails can be sent again from Parent area → Account. If it still doesn’t arrive, write to us and we’ll help.",
      },
      {
        q: "Does it work offline?",
        a: "Yes. After the app has been opened once, it works without internet. Everything your child does is saved on the device and uploads automatically when the connection returns. If a grade has never been opened on a device, it needs to connect once to download that grade’s lessons.",
      },
      {
        q: "How does syncing between devices work?",
        a: "Sign in with the same account on each device. Progress merges answer by answer, so nothing is lost even if two devices were used offline at the same time. Names, grades and settings sync too; the most recent change wins.",
      },
      {
        q: "Can I delete everything?",
        a: "Yes, any time. In Parent area → Privacy you can download all of your family’s data, erase this device, or permanently delete your account and everything stored on our servers.",
      },
    ],
  },
  {
    id: "learning",
    title: "How learning works",
    faqs: [
      {
        q: "Which curriculum and grades does it follow?",
        a: `Pre-K to Grade 9. Choose ${listRegions(FRAMEWORKS)} when you add a child, and you can switch ${US_STATES.length ? "province or state" : "province"} later in Children. Math, English language arts, science and social studies are in every province${US_STATES.length ? " and state" : ""}. Core French is in every province, and French Immersion is in every province except Newfoundland and Labrador, Prince Edward Island and Nunavut. Yukon and the Northwest Territories follow the BC curriculum, adapted with local First Nations, Dene and Inuit content.${US_STATES.length ? ` In ${usStates}, units follow the state's learning standards and are shown in US spelling, with grades named the US way (“4th grade”); there is no French in US states yet.` : ""} Every unit shows the learning standard it practises. More provinces and states are planned.`,
      },
      {
        q: "What is Adventure mode?",
        a: "One tap and the questions keep coming, mixing subjects and units. It favours skills your child finds tricky, hasn’t tried yet, or hasn’t seen in a while, and adjusts the difficulty as they go. Practice lets you pick a subject and unit, and Review revisits tricky spots.",
      },
      {
        q: "What happens when my child gets an answer wrong?",
        a: "They get a hint and a second try. After a second miss, the answer is shown with a short explanation. The tone is always gentle; there are no buzzers and no shaming.",
      },
      {
        q: "Can my child ask for a hint before answering?",
        a: "Yes. In practice, Adventure, Review and the Daily Challenge there’s a “Need a hint?” button. Because the hint helps, an answer given after opening it counts like a retry: it earns a little XP but doesn’t add to “right on the first try”. If your child tends to avoid asking for help, you can switch on “Hints count as first try” for them in Parent area → Settings → Advanced options. Reports show how many hints were opened.",
      },
      {
        q: "How are the report levels worked out?",
        a: `In BC, Yukon and the Northwest Territories, levels use the Provincial Proficiency Scale: Emerging, Developing, Proficient and Extending. In Ontario and Manitoba, they follow the Level 1 to 4 achievement scales. In Nova Scotia, reports use four steps that match the wording for your child’s grade band. In New Brunswick, they follow the four-point scale from working below to excelling. In Prince Edward Island, reports use four plain practice steps (Beginning, Approaching, Meeting, Exceeding) you can match to your child’s own report card. In Newfoundland and Labrador, Kindergarten to Grade 6 follow the four-point rating from Not Yet Achieving to Excellent, and Grades 7 to 9 use four practice steps alongside percentage marks. Alberta has no provincial report-card scale, so Alberta and Nunavut reports use four plain steps: Beginning, Approaching, Meeting and Exceeding. In Saskatchewan, they use four levels (Beginning, Approaching, Meeting, Exemplary), since school divisions set their own report-card wording.${US_STATES.length ? ` ${usStates} has no statewide report card, so reports use the same four plain steps: Beginning, Approaching, Meeting and Exceeding.` : ""} Only first-try answers count. Proficient needs at least 75% over at least 8 recent answers, and Extending also needs 90% over 16 answers and a passed Challenge. Reports show practice in the app. They are not a report-card mark; your child’s teacher decides proficiency.`,
      },
      {
        q: "How does earning game time work?",
        a: "Learning earns arcade time. By default every 20 minutes of learning unlocks 5 minutes of games, up to 20 minutes a day. In Parent area → Settings you can turn games off, allow free play or change the daily maximum, and change the learning-to-games ratio under Advanced options.",
      },
      {
        q: "What if a question seems wrong?",
        a: "Tap the flag above the answer bar and choose a reason. The report includes only the question and the reason you pick, nothing about your child. We read every one.",
      },
    ],
  },
  {
    id: "calm",
    title: "Calm and focus options",
    faqs: [
      {
        q: "Can I make the app calmer for my child?",
        a: "Yes. In Parent area → Settings there’s a “Calm and focus” section, set separately for each child. One “Calm mode” switch turns off confetti and other motion, keeps only gentle sounds, hides timers (timed modes show a quiet bar instead), holds trophy pop-ups until after a lesson and uses five-question sessions. “Customize calm mode” lets you pick just the ones you want.",
      },
      {
        q: "Can I make the text easier to read?",
        a: "Yes. Under “Reading and sound” in the same settings page, “Roomy text” adds space between letters, words and lines, and “High contrast” uses darker text and firmer outlines.",
      },
      {
        q: "Does turning these on change my child’s results?",
        a: "No. These options change how things look and sound, not how answers are scored or how levels are worked out.",
      },
      {
        q: "Is it designed for children with ADHD?",
        a: `${APP_NAME} is a learning tool, not a treatment. Many families find that less motion, noise and time pressure helps their child settle, so we made those options available to every family.`,
      },
    ],
  },
  {
    id: "billing",
    title: "Plans and billing",
    faqs: [
      {
        q: "What does it cost?",
        a: `You can subscribe straight away for ${PRICES.month.label} or ${PRICES.year.label} (${PRICES.year.note}), in Canadian dollars, ${TAX_NOTE.CAD.long}, for up to ${MAX_CHILDREN} children.${US_STATES.length ? ` Families in the US pay ${PRICES_BY_CURRENCY.USD.month.label} or ${PRICES_BY_CURRENCY.USD.year.label} in US dollars, ${TAX_NOTE.USD.long}.` : ""} The free trial is optional: the first ${TRIAL_DAYS} days include everything, and no card is needed.`,
      },
      {
        q: "What stays free after the trial?",
        a: `The first ${FREE_UNITS_PER_COURSE} units of every course stay free forever, so your child can keep practising without a plan.`,
      },
      {
        q: "How do I cancel?",
        a: "In Parent area → Subscription, open the billing portal and cancel. You keep access until the end of the period you’ve paid for and won’t be charged again.",
      },
      {
        q: "What changes after the trial or if I cancel?",
        a: `You go back to the free plan. The first ${FREE_UNITS_PER_COURSE} units of every course stay open. Adventure, Review, Speed Run, Challenge, the arcade games, later units and the full parent reports need the family plan; a summary of each child’s report stays free. Nothing is deleted: your children’s progress, trophies and coins are kept, and everything is there again if you subscribe.`,
      },
      {
        q: "Does the plan renew automatically?",
        a: "Yes. A paid plan renews each month or year at the price you signed up at, until you cancel. We’ll email you before a price change affects your plan.",
      },
      {
        q: "What if I subscribe during the free trial?",
        a: "Open Parent area → Subscribe and choose monthly or yearly. If you subscribe during the trial, you keep your free days: your card is saved at checkout and the first payment is taken when the trial ends. Cancel before then and you pay nothing.",
      },
      {
        q: "Can I switch between monthly and yearly?",
        a: "Yes. Open Parent area → Subscription, then the billing portal, where you can change plans or cancel.",
      },
      {
        q: "What if a payment fails?",
        a: "Your access continues while Stripe retries the card. Update your card in the billing portal. If the payment still can’t be taken, the plan ends and you return to the free plan.",
      },
      {
        q: "Can I get a refund?",
        a: `Yes. Ask within ${REFUND_DAYS} days of any payment, including a renewal, and we refund it in full, no reason needed. Your plan then ends and you go back to the free plan, with all progress kept. After ${REFUND_DAYS} days, if something went wrong with a charge, contact us and we’ll make it right where we reasonably can. The full wording is in the terms.`,
      },
      {
        q: "Does the plan cover all my children?",
        a: `Yes. One family plan covers up to ${MAX_CHILDREN} children. Without a plan, the free units are open to every child on the account.`,
      },
      {
        q: "How are taxes shown?",
        a: US_STATES.length
          ? "Canadian families pay in Canadian dollars and US families in US dollars. Where tax applies, including US sales tax based on your billing address, the total is shown at checkout before you pay."
          : "Prices are in Canadian dollars. Where tax applies, the total is shown at checkout before you pay.",
      },
      {
        q: "Why do I need to confirm my email before subscribing?",
        a: "So that receipts, renewals and password resets reach you. Use Parent area → Account to resend the confirmation email.",
      },
      {
        q: "Are there ads or purchases for kids?",
        a: "No ads, and we never sell information. Children can’t buy anything; coins are earned only by learning and spent in a pretend shop.",
      },
    ],
  },
];

export const ALL_FAQS = HELP.flatMap((s) => s.faqs);
