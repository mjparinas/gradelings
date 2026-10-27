import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Delaware Grade 2 social studies: major people, events and symbols of the United States and Delaware (H.4.K-3.b),
// how leaders are chosen and what they are expected to do (C.1.K-3.a), and calendars of national and Delaware
// celebrations (H.1.K-3.a), plus copies of California's difference makers (H.4.K-3.b), family journeys (H.4.K-3.b) and
// making and trading (E.4.K-3.a) units without their California places, with Delaware items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Delaware only", "the ocean floor"], "She holds a torch high."],
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
  ["Delaware's laws are made in Dover, in a brick building called Legislative…", "Hall", ["Slide", "Tower", "Ship"], "Lawmakers from all over the state meet there."],
  ["The leader of our state's government is the…", "governor", ["President", "principal", "mayor"], "Delaware's governor works in Dover and Wilmington."],
  ["A state government makes laws about things like…", "roads and schools in the state", ["the whole world", "what you eat for lunch", "the weather"], "The national government makes laws for the whole country."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["On December 7, 1787, Delaware was the first state to say yes to the…", "Constitution", ["Liberty Bell", "national anthem", "Statue of Liberty"], "That is why Delaware is called the First State.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Japan", "Spain", "China"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["Cape Henlopen", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Annie Jump Cannon, born in Dover, Delaware, studied the night sky and sorted thousands of…", "stars", ["seashells", "rocks", "flowers"], "She grouped stars by their light."],
  ["Absalom Jones was born enslaved in Delaware. After he won his freedom, he started a…", "church in Philadelphia", ["space program", "toy store", "football team"], "He helped other Black Americans build a strong community."],
  ["Caesar Rodney of Delaware rode all night in 1776 to vote for…", "independence", ["a new flag", "a holiday", "a new song"], "His vote helped the colonies declare independence."],
  ["Louis Redding, a lawyer from Wilmington, worked so that Black and white children could…", "go to the same schools", ["skip school", "drive cars", "stay home"], "Schools were kept apart by race back then."],
  ["Joe Biden, who lived in Delaware for most of his life, became the 46th…", "President of the United States", ["governor of Texas", "astronaut", "mayor of Boston"], "He was a senator from Delaware for many years first."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["In 1638, settlers from Sweden and Finland sailed to Delaware and built…", "Fort Christina", ["the White House", "a space station", "a subway"], "It was where Wilmington is today."],
  ["The Swedish and Finnish settlers brought a new kind of house to America, the…", "log cabin", ["igloo", "skyscraper", "tent"], "They stacked whole logs to make the walls."],
  ["Long ago, many families came from Ireland and Italy to work in Delaware's…", "mills and factories", ["airports", "space stations", "volcanoes"], "The mills along the Brandywine needed many workers."],
  ["Today, families from places like Latin America, Africa and Asia make new homes in Delaware. They bring their own…", "languages, foods and traditions", ["mountains", "oceans", "weather"], "New neighbors add to the community."],
  ["A family moves to Newark to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Many early settlers came to Delaware by sailing across the…", "Atlantic Ocean", ["Pacific Ocean", "Indian Ocean", "Arctic Ocean"], "Europe is across the ocean to the east.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Many Delaware farms raise chickens. The chickens go to a plant where they are…", "cleaned, packed and cooled", ["painted", "frozen into rocks", "turned into paper"], "Food is processed before it goes to the store."],
  ["Delaware farmers grow lots of corn and soybeans. Much of it becomes…", "food for chickens", ["car tires", "glass windows", "paper money"], "Chickens eat grain feed."],
  ["Blue crabs caught in Delaware Bay reach restaurants far away by…", "truck", ["canoe", "hot air balloon", "bicycle only"], "They must stay cold and fresh."],
  ["Watermelons grown in Sussex County are sold in other states. This shows that…", "people in different places trade", ["no one eats watermelons", "trade is not allowed", "melons grow only in stores"], "Buyers and sellers depend on each other.", true],
  ["Ships bring bananas from other countries to the Port of Wilmington because bananas…", "need a warm, wet climate to grow", ["grow in Delaware forests", "grow in the snow", "grow in Delaware Bay"], "Then trucks carry them to stores.", true],
  ["A farmer sells peaches at a stand by the road. The farmer is a…", "producer", ["consumer", "governor", "judge"], "Producers make or grow things to sell.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "de-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), landmarks such as the Lincoln Memorial and Legislative Hall in Dover, the holidays that remember the nation's people and events, the President's job, and the state and national governments that serve Delaware.",
    standards: ["H.4.K-3.b; C.1.K-3.a; H.1.K-3.a", "major people, events and symbols of the United States and Delaware, how leaders are chosen, and the calendar of national and Delaware celebrations"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "de-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and people from Delaware like Caesar Rodney, Absalom Jones, Annie Jump Cannon, Louis Redding and Joe Biden.",
      standards: ["H.4.K-3.b", "important people in the history of the United States and Delaware"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "de-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (sailing ships, railroads and airplanes), when they moved, and the reasons people move, from the Swedish and Finnish settlers of 1638 and the families who came to work in Delaware's mills to new neighbors today.",
      standards: ["H.4.K-3.b; H.4.K-3.a", "who lives in Delaware and the United States and how they got here, and families now and in the past"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "de-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, processors, distributors and grocers, and why people trade, with Delaware examples like chicken farms, corn and soybeans, Delaware Bay crabs, Sussex County watermelons and bananas arriving at the Port of Wilmington.",
      standards: ["E.4.K-3.a; E.2.K-3.a", "how trading goods and services around the world makes people depend on each other, and how money is used in exchange"],
    },
    TRADING_EXTRA,
  ),
];
