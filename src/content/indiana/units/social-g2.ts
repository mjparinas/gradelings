import type { Unit } from "../../types";
import { bankUnit } from "../own";

// Indiana Grade 2 social studies: the Pledge of Allegiance and the part Benjamin Harrison, the President from Indiana,
// played in it (2.C.5), with the belief in equal rights the United States is founded on (2.C.1).

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "in-g2-pledge-harrison",
    title: "The Pledge & Benjamin Harrison",
    emoji: "🇺🇸",
    blurb: "What the Pledge means, and a President from Indiana",
    parentNote:
      "Practices what the words of the Pledge of Allegiance mean, how to say it with respect, and how Benjamin Harrison, the President from Indianapolis, called for the 1892 school celebration where the Pledge was first said across the country.",
    standards: ["2.C.5; 2.C.1", "the meaning of the Pledge of Allegiance and Benjamin Harrison's part in it, and equal rights for citizens"],
    items: [
      ["The Pledge of Allegiance is a promise to be loyal to…", "the United States", ["a sports team", "one city only", "a school club"], "It is said to the flag of our country."],
      ["The word 'allegiance' means…", "loyalty", ["a parade", "a song", "a holiday"], "To pledge allegiance is to promise loyalty."],
      ["When you say the Pledge, you usually face…", "the flag", ["the door", "the clock", "the window"], "The Pledge is said to the flag."],
      ["Where do people often place their right hand during the Pledge?", "over their heart", ["on their head", "in their pocket", "on a desk"], "It is a sign of respect."],
      ["The Pledge ends with 'liberty and justice for…'", "all", ["some", "kings", "nobody"], "It is a promise of fairness for everyone."],
      ["'Liberty' means…", "freedom", ["a kind of food", "a large building", "a river"], "The Liberty Bell is a symbol of freedom."],
      ["'Justice' means…", "fairness under the law", ["running fast", "being the tallest", "winning a game"], "Laws should treat people fairly."],
      ["'Indivisible' in the Pledge means the nation…", "cannot be split apart", ["is very small", "is invisible", "is new"], "The states stay together as one country."],
      ["Benjamin Harrison was a President of the United States who lived in…", "Indianapolis, Indiana", ["Boston", "a castle", "Paris"], "His home in Indianapolis is now a museum."],
      ["Benjamin Harrison was the nation's… President.", "23rd", ["1st", "50th", "100th"], "He was President from 1889 to 1893."],
      ["In 1892, President Harrison asked schools across the country to hold a celebration. At that celebration, students said…", "the Pledge of Allegiance", ["a weather report", "a grocery list", "a spelling test"], "It was the first time so many children said it."],
      ["Who wrote the Pledge of Allegiance in 1892?", "Francis Bellamy", ["Benjamin Harrison", "George Washington", "Abraham Lincoln"], "Bellamy wrote it for the school celebration."],
      ["Benjamin Harrison's grandfather, William Henry Harrison, was also…", "a President", ["a pirate", "a king of England", "an astronaut"], "They are the only grandfather and grandson to both be President."],
      ["Before he was President, Benjamin Harrison was a lawyer and a…", "senator from Indiana", ["famous baker", "ship captain", "mayor of London"], "He worked in Indianapolis."],
      ["People who say the Pledge show… for their country.", "respect and loyalty", ["anger", "boredom", "fear"], "It is a promise to the nation."],
      ["The flag the Pledge is said to has…", "50 stars and 13 stripes", ["one big star", "13 stars only", "no stripes"], "Each star stands for a state."],
      ["The United States government is based on the belief that citizens have…", "equal rights", ["different rights by height", "no rights", "rights only on weekends"], "Everyone is equal under the law."],
      ["'All people are equal under the law' means…", "the same laws protect everyone", ["only some people follow laws", "adults have no rights", "laws change every day"], "Laws should be fair to all."],
      ["Which is a right many Americans have?", "speaking freely", ["taking other people's things", "skipping all laws", "never going to school"], "Freedom of speech is in the Bill of Rights."],
      ["Today the Pledge is often said…", "at the start of the school day", ["only at midnight", "only on birthdays", "never"], "Many Indiana schools say it each morning."],
      ["Why do you think Harrison wanted children across the nation to celebrate together?", "to help them feel part of one country", ["to skip their lessons", "to sell flags", "to start a war"], "Celebrating together brings people closer.", true],
      ["The Pledge is a promise. Which word in it shows we are one country together?", "indivisible", ["liberty", "flag", "stand"], "It means it cannot be divided.", true],
      ["Benjamin Harrison is buried in Indianapolis. Why might Indiana remember him?", "he is the President elected from Indiana", ["he invented the car", "he built the Statehouse alone", "he was born on the moon"], "Communities honor their leaders.", true],
      ["If two students disagree about a class rule, a fair way to decide is…", "listen to both and vote", ["let the loudest win", "never talk about it", "let one person choose for everyone"], "Equal rights mean everyone gets a say.", true],
      ["'Republic' in the Pledge means a country where people…", "choose leaders to make laws for them", ["have a king who chooses everything", "have no laws", "live on one island"], "We vote for our leaders.", true],
      ["Why is it respectful to stand quietly during the Pledge even if you choose not to say it?", "others are making their promise", ["it is a race", "standing makes you taller", "you might win a prize"], "You may choose not to say it, and still be respectful.", true],
    ],
  }),
];
