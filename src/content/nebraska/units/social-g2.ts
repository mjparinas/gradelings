import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nebraska Grade 2 social studies, Neighborhood: patriotic symbols, landmarks and national holidays (SS 2.1.2.b and
// SS 2.1.2.c) and the people, events and symbols that shaped communities (SS 2.4.3.a), plus copies of California's
// difference makers, family journeys and making and trading units without their California places, with Nebraska
// items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Nebraska only", "the ocean floor"], "She holds a torch high."],
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
  ["Chimney Rock in western Nebraska is a landmark. Long ago, pioneers on the trails used it to…", "know they were on the right path", ["catch fish", "mail letters", "charge their phones"], "You can see the tall rock from far away."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["Gerald R. Ford, who was born in Omaha, Nebraska, became…", "President of the United States", ["a baker in Paris", "the first astronaut", "king of England"], "He was President from 1974 to 1977.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Mexico", "Japan", "Spain"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["the Lincoln Memorial", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["In 1879, Standing Bear, a Ponca chief, went to court in Omaha. The judge said a Native American is a…", "person with rights under the law", ["visitor with no rights", "soldier", "king"], "Standing Bear had walked home to bury his son."],
  ["Susan La Flesche Picotte, of the Omaha Tribe, was the first Native American woman to become a…", "doctor", ["pilot", "President", "astronaut"], "She cared for people on horseback and later built a hospital."],
  ["J. Sterling Morton of Nebraska City made a difference by starting…", "Arbor Day, a day to plant trees", ["the first airplane", "the post office", "summer vacation"], "Nebraska had few trees, so he wanted people to plant more."],
  ["Willa Cather made a difference with her books about…", "pioneer life on the Nebraska prairie", ["life on the moon", "pirates", "the ocean floor"], "She grew up in Red Cloud."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families crossed Nebraska on the Oregon and Mormon Trails beside the Platte River in…", "covered wagons", ["airplanes", "cars", "rockets"], "Wagons followed the river across the prairie."],
  ["In the 1860s, a faster way to travel across Nebraska was the…", "railroad", ["airplane", "subway", "spaceship"], "The first railroad across the country began building west from Omaha in 1865."],
  ["Today, many families move to Nebraska by car or…", "airplane", ["covered wagon", "stagecoach", "canoe"], "Omaha and Lincoln have airports."],
  ["After 1862, many families moved to Nebraska because the Homestead Act gave them…", "free land to farm", ["oceans", "gold mines", "rain forests"], "They had to live on the land and farm it for five years."],
  ["A family moves to Nebraska to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Many Czech and German families came to Nebraska in the 1800s. To find their home countries on a map, look in…", "Europe", ["Australia", "South America", "Antarctica"], "They sailed across the Atlantic Ocean.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Nebraska farmers grow a lot of corn. Much of it is used to…", "feed cattle and make ethanol fuel", ["make glass", "build roads", "fill swimming pools"], "Corn is food for animals and a fuel for cars."],
  ["Nebraska ranchers raise cattle on Sandhills grass. Beef reaches stores by…", "truck and train", ["canoe", "hot air balloon", "bicycle only"], "Goods travel on highways and railroads."],
  ["Nebraska beef and soybeans are sold to people in other countries. This shows that…", "people in different places trade", ["no one eats beef", "trade is not allowed", "soybeans grow only in stores"], "Buyers and sellers depend on each other."],
  ["Long ago, cowboys drove herds of cattle north to Ogallala, Nebraska, so the cattle could…", "ride the railroad to cities in the East", ["swim to Europe", "fly to market", "live on mountains"], "The trains carried cattle to buyers.", true],
  ["A Nebraska farmer sells sweet corn at a farmers market in Lincoln. The sweet corn is a…", "good", ["service", "tax", "kind of weather"], "Goods are things you can buy and hold.", true],
  ["Water from the Ogallala Aquifer is a natural resource Nebraska farmers use to…", "grow crops", ["make movies", "build phones", "sell cars"], "Center-pivot sprinklers water round fields.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "neb-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), national landmarks such as the Lincoln Memorial and Nebraska's Chimney Rock, the holidays that remember the nation's people and events, and the role and responsibilities of the President.",
    standards: ["SS 2.1.2.b; SS 2.1.2.c; SS 2.4.3.a", "how patriotic symbols, songs and holidays reflect democratic traditions, the background of national holidays, and the people, events and symbols that shaped communities"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "neb-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and Nebraskans like Standing Bear, Susan La Flesche Picotte, J. Sterling Morton and Willa Cather.",
      standards: ["SS 2.4.3.a; SS 2.1.2.d", "historical people, including various cultures and ethnic groups, who made a difference, and ways to improve a community"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "neb-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (from covered wagons and the railroad across Nebraska to airplanes), when they moved, and the reasons people move.",
      standards: ["SS 2.4.1.b; SS 2.3.4.a", "how travel and communities have changed over time, and the cultures families bring with them"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "neb-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, ranchers, processors, distributors and grocers, and why people trade, with Nebraska examples like corn and soybean farms, Sandhills cattle ranches and the old cattle drives to Ogallala.",
      standards: ["SS 2.2.3.a; SS 2.2.3.b; SS 2.3.3.c", "goods and services in a community, how people earn income through work, and matching resources to their sources"],
    },
    TRADING_EXTRA,
  ),
];
