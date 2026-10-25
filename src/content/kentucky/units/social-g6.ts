import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kentucky Grade 6 social studies, River Valley Civilizations and Classical Empires: the influences of Classical Greece
// and Rome on the structures of Kentucky's state government (6.H.KH.1), with the political institutions behind them
// (6.C.CP.3). The civilizations themselves are practised with adopted units (see ../plan/social.ts).

const CLASSICAL: Q[] = [
  ["The word democracy comes from Greek words meaning…", "rule by the people", ["rule by one king", "rule by soldiers", "rule by priests"], "Demos means people; kratos means power."],
  ["The word republic comes from the Latin res publica, meaning…", "the public thing, or the people's affairs", ["the king's palace", "a secret army", "a temple"], "Rome was a republic before it was an empire."],
  ["In a republic, citizens…", "elect representatives to make laws", ["all obey one king", "never vote", "choose leaders by birth"], "Kentucky and the United States are republics."],
  ["In ancient Athens, citizens voted on laws themselves. This is called…", "direct democracy", ["monarchy", "theocracy", "empire"], "Every citizen could speak in the assembly."],
  ["Kentucky's General Assembly has a Senate. The word senate comes from Rome's Senate, from senex, meaning…", "old man, or elder", ["soldier", "farmer", "child"], "Roman senators were older, experienced men."],
  ["Kentucky's Capitol takes its name from…", "Rome's Capitoline Hill", ["a Greek ship", "an Egyptian pyramid", "a Chinese wall"], "Rome's great temple stood on that hill."],
  ["The columns on the front of Kentucky's Capitol in Frankfort copy the style of…", "Greek and Roman buildings", ["Egyptian pyramids", "Chinese pagodas", "Maya temples"], "Builders chose it to recall early democracies."],
  ["Rome's written laws, the Twelve Tables, were displayed so that…", "everyone could know the laws", ["only judges could read them", "the laws stayed secret", "the king could change them daily"], "Written laws protect people from unfair rulers."],
  ["Kentucky writes its laws down in statutes. This idea of public, written law goes back to…", "Rome's Twelve Tables", ["the Great Wall", "the Silk Road", "the first pyramids"], "Kentucky's laws are called the Kentucky Revised Statutes."],
  ["Roman tribunes could block a law by saying \"veto,\" Latin for…", "I forbid", ["I agree", "I am king", "I am tired"], "Kentucky's governor can veto bills."],
  ["Rome had two consuls at a time, so that…", "neither could hold all the power", ["they could share one house", "there were more parties", "taxes were lower"], "Sharing power is an early form of checks and balances."],
  ["Kentucky divides power among three branches. This idea grew from writers who studied…", "the Roman Republic", ["the Egyptian pharaohs", "the Mongol Empire", "the Stone Age"], "Separation of powers prevents tyranny."],
  ["The three branches of Kentucky's government are…", "legislative, executive and judicial", ["army, navy and air force", "city, county and state", "Senate, House and governor only"], "Each has its own job."],
  ["In Athens, juries of ordinary citizens decided court cases. In Kentucky today…", "citizens serve on juries too", ["only kings decide cases", "there are no courts", "juries are made of soldiers"], "Trial by jury is a right."],
  ["Roman consuls were elected for one year. Kentucky's governor is elected for…", "four years, and can serve two terms in a row", ["life", "one day", "as long as they want"], "Limits on terms stop one person keeping power."],
  ["Which Kentucky branch is most like the Roman Senate?", "the legislative branch", ["the executive branch", "the judicial branch", "the county sheriff"], "Senates make laws."],
  ["Ancient Greek city-states such as Athens and Sparta were small…", "independent states with their own governments", ["provinces of Kentucky", "parts of Egypt", "Roman towns"], "Each city-state ruled itself."],
  ["Which ancient government is most like Kentucky's, where people elect lawmakers?", "the Roman Republic", ["the Egyptian pharaohs", "the Persian kings", "Sparta's two kings"], "Elected lawmakers make a republic."],
  ["Only some people were citizens in Athens and Rome. Today in Kentucky…", "all adult citizens, women and men, can vote", ["only landowners vote", "only men vote", "no one votes"], "The idea of citizenship has grown.", true],
  ["Kentucky's official name, the Commonwealth of Kentucky, means a state governed…", "for the common good of the people", ["by a king", "by the army", "for one family"], "Commonwealth is an English word for res publica.", true],
  ["Why did America's founders and Kentucky's first lawmakers study Greece and Rome?", "to learn how republics work and why they fail", ["to copy their emperors", "to bring back slavery", "to learn to build pyramids"], "History holds lessons for government.", true],
  ["The Roman Republic fell when power passed to one ruler. Kentucky's constitution prevents this by…", "separating powers and holding regular elections", ["having one ruler for life", "ending all elections", "letting the army rule"], "Checks and balances limit power.", true],
  ["Kentucky's Capitol has 70 columns in the Ionic style, which first came from…", "ancient Greece", ["ancient China", "ancient Egypt", "the Maya"], "Ionic columns have scroll-shaped tops.", true],
  ["Which idea from Classical Greece is in the Kentucky Constitution's line \"All power is inherent in the people\"?", "democracy, rule by the people", ["monarchy", "theocracy", "empire"], "The people are the source of power.", true],
];

export const SOCIAL_6: Unit[] = [
  bankUnit({
    id: "ky-g6-greece-rome-kentucky",
    title: "Greece, Rome & Kentucky",
    emoji: "🏛️",
    blurb: "Ancient ideas in Kentucky's government",
    parentNote: "How Classical Greece and Rome shaped Kentucky's state government: democracy and the republic, the Senate and the Capitol, written laws, the veto, juries, sharing and separating power, term limits, citizenship, and Greek and Roman styles in the Capitol in Frankfort.",
    standards: ["6.H.KH.1; 6.C.CP.3", "the influences of Classical Greece and Rome on Kentucky's state government, and the institutions of democracy, republic and empire"],
    items: CLASSICAL,
  }),
];
