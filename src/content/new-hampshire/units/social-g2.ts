import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Hampshire Grade 2 social studies: the symbols and documents of the United States and the purposes of state and
// national government (SS:CV:2:1.2, SS:CV:2:1.3), and national and New Hampshire celebrations and monuments
// (SS:HI:2:1.1), plus copies of California's difference makers (SS:HI:2:3.1), family journeys (SS:HI:2:3.3) and making
// and trading (SS:EC:2:1.2) units without their California places, with New Hampshire items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "New Hampshire only", "the ocean floor"], "She holds a torch high."],
  ["Who lives and works in the White House?", "the President", ["the governor", "the mayor", "the principal"], "It is in Washington, D.C."],
  ["The President is the leader of…", "the whole country", ["one city", "one school", "one state"], "The governor leads a state."],
  ["The President is chosen by…", "voters, every four years", ["a coin toss", "the last President", "the teachers"], "Presidential elections are in November."],
  ["One job of the President is to…", "sign or veto laws Congress passes", ["teach every class", "fix every road", "run every store"], "A veto means saying no."],
  ["The President is also commander in chief of the…", "armed forces", ["school band", "baseball league", "post office"], "The armed forces protect the country."],
  ["Which song is our national anthem?", "The Star-Spangled Banner", ["Happy Birthday", "Jingle Bells", "Old MacDonald"], "We sing it at ball games."],
  ["Why do we say the Pledge of Allegiance?", "to show we are loyal to our country", ["to start lunch", "to win a game", "to go home"], "We face the flag."],
  ["On the Fourth of July, we celebrate…", "the birthday of the United States", ["the first snow", "a new school year", "Thanksgiving"], "It began in 1776."],
  ["On Martin Luther King Jr. Day, we remember a leader who worked for…", "fair rules for everyone", ["more homework", "faster cars", "bigger stores"], "He shared a famous dream."],
  ["On Presidents' Day, we remember George Washington and…", "Abraham Lincoln", ["Santa Claus", "a pilgrim", "a cowboy"], "Both were great presidents."],
  ["George Washington was our country's first…", "President", ["teacher", "astronaut", "doctor"], "His face is on the dollar bill."],
  ["On Veterans Day, we thank people who…", "served in the military", ["drive buses", "bake bread", "build toys"], "It is on November 11."],
  ["On Memorial Day, we remember soldiers who…", "died serving our country", ["won races", "were teachers", "went to space"], "It is in late May."],
  ["On Labor Day, we honor…", "workers", ["pets", "snowmen", "birthdays"], "It is in early September."],
  ["The State House in Concord, where New Hampshire's laws are made, has a shining…", "gold dome", ["glass slide", "water tower", "pirate ship"], "You can see the dome from far away."],
  ["The leader of our state's government is the…", "governor", ["President", "principal", "mayor"], "New Hampshire's governor works in Concord."],
  ["A state government makes laws about things like…", "roads and schools in the state", ["the whole world", "what you eat for lunch", "the weather"], "The national government makes laws for the whole country."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["In 1788, New Hampshire was the ninth state to say yes to the…", "Constitution", ["Liberty Bell", "national anthem", "Statue of Liberty"], "Nine states had to agree before it could start.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Japan", "Spain", "China"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["Mount Washington", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Sarah Josepha Hale, who grew up in Newport, New Hampshire, wrote the poem \"Mary Had a Little Lamb\" and worked for years to make… a national holiday.", "Thanksgiving", ["Halloween", "Labor Day", "New Year's Day"], "President Lincoln made it a holiday in 1863."],
  ["Christa McAuliffe, a teacher from Concord, was chosen to be the first teacher in…", "space", ["the ocean", "Congress", "the White House"], "She wanted to teach lessons from space."],
  ["Alan Shepard, from Derry, New Hampshire, was the first American to travel into…", "space", ["the deep sea", "a volcano", "the North Pole"], "He flew in 1961 and later walked on the moon."],
  ["Harriet Wilson of Milford, New Hampshire, made a difference by writing a…", "book about her life", ["new song for the flag", "map of the moon", "law for the state"], "She was one of the first African American women to publish a novel in the United States."],
  ["Franklin Pierce, from Hillsborough, New Hampshire, became the 14th…", "President of the United States", ["governor of Texas", "astronaut", "mayor of Boston"], "He is the only President from New Hampshire."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families from Ireland came to New Hampshire to find…", "work", ["gold", "dinosaurs", "the ocean"], "Mills and railroads needed workers."],
  ["About 100 years ago, many families came to Manchester to work in its big…", "mills", ["airports", "space stations", "volcanoes"], "The mills made cloth beside the river."],
  ["Long ago, a fast way to travel between New Hampshire towns was the…", "railroad", ["airplane", "subway", "spaceship"], "Trains were much faster than wagons."],
  ["Today, families from places like Africa and Asia make new homes in cities such as Concord and Manchester. They bring their own…", "languages, foods and traditions", ["mountains", "oceans", "weather"], "New neighbors add to the community."],
  ["A family moves to Nashua to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Many early English settlers came to New Hampshire by sailing across the…", "Atlantic Ocean", ["Pacific Ocean", "Indian Ocean", "Arctic Ocean"], "England is across the ocean to the east.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Dairy farms in New Hampshire send milk to a plant where it is…", "cleaned, packed and cooled", ["painted", "frozen into rocks", "turned into paper"], "Milk is processed before it goes to the store."],
  ["In late winter, New Hampshire farmers boil maple sap to make…", "maple syrup", ["cheese", "bread", "juice"], "It takes about 40 gallons of sap to make one gallon of syrup."],
  ["Lobsters caught off New Hampshire's coast reach restaurants far away by…", "truck and airplane", ["canoe", "hot air balloon", "bicycle only"], "They must stay cold and fresh."],
  ["Apples grown in New Hampshire orchards are sold in other states. This shows that…", "people in different places trade", ["no one eats apples", "trade is not allowed", "apples grow only in stores"], "Buyers and sellers depend on each other.", true],
  ["Most of the bananas sold in New Hampshire grocery stores are grown…", "in other countries and shipped in", ["in New Hampshire forests", "in Concord", "in Lake Winnipesaukee"], "Bananas need a warm, wet climate.", true],
  ["New Hampshire's forests are a natural resource used to make…", "lumber and paper", ["glass", "plastic", "gasoline"], "Trees are cut, sawed and shipped.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "nh-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), landmarks such as the Lincoln Memorial and the State House in Concord, the holidays that remember the nation's people and events, the President's job, and the state and national governments that serve New Hampshire.",
    standards: ["SS:CV:2:1.2; SS:CV:2:1.3; SS:HI:2:1.1", "the symbols that stand for the United States, the purposes of state and national government, and national and New Hampshire celebrations and monuments"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "nh-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and people from New Hampshire like Sarah Josepha Hale, Harriet Wilson, Franklin Pierce, Alan Shepard and Christa McAuliffe.",
      standards: ["SS:HI:2:3.1", "people and groups who have greatly changed life in the United States"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "nh-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (sailing ships, railroads and airplanes), when they moved, and the reasons people move, from the Irish and other families who came to work in New Hampshire's mills to new neighbors today.",
      standards: ["SS:HI:2:3.3; SS:HI:2:5.2", "how groups who came to the United States have enriched our nation, and the idea of diversity"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "nh-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, processors, distributors and grocers, and why people trade, with New Hampshire examples like dairy farms, maple syrup, apple orchards and Seacoast lobsters.",
      standards: ["SS:EC:2:1.2; SS:HI:2:2.1", "the steps and materials needed to make a product, and how trade and transportation connect the world"],
    },
    TRADING_EXTRA,
  ),
];
