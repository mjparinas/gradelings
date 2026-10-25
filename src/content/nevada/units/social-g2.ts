import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nevada Grade 2 social studies, Our National Identity and Culture: events and symbols that shaped the nation's identity
// (SS.2.10), the role and responsibilities of the president (SS.2.17), and national landmarks (SS.2.21), with the
// holidays that remember them, plus copies of California's difference makers (SS.2.11, SS.2.15) and family journeys
// (SS.2.23) and making and trading (SS.2.25) units without their California places, with Nevada items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Nevada only", "the ocean floor"], "She holds a torch high."],
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
  ["Hoover Dam is a national landmark on the Colorado River. It was built to…", "hold back water and make electricity", ["make snow", "catch fish", "hide gold"], "It made Lake Mead."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["Nevada became a state while Abraham Lincoln was…", "President", ["a baby", "a governor of Nevada", "a mayor"], "Nevada joined in 1864.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Mexico", "Japan", "Spain"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["Hoover Dam", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Sarah Winnemucca, a Northern Paiute woman from Nevada, made a difference by…", "speaking and writing for her people's rights", ["building a dam", "inventing the car", "flying to the moon"], "She gave speeches across the country."],
  ["Anne Martin helped women in Nevada win the right to…", "vote", ["drive", "swim", "read"], "Nevada women won the vote in 1914."],
  ["Ruby Duncan helped families in Las Vegas get…", "food, health care and jobs", ["new cars", "toys", "boats"], "She worked to help poor families."],
  ["Dat So La Lee was a Washoe artist who made beautiful…", "baskets", ["cars", "rockets", "bridges"], "Her baskets are in museums today."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families came to Nevada in…", "covered wagons", ["airplanes", "cars", "rockets"], "Wagons followed trails across the desert."],
  ["In 1869 a new way to travel across Nevada was the…", "railroad", ["airplane", "subway", "spaceship"], "Trains were much faster than wagons."],
  ["Today, many families move to Las Vegas by car or…", "airplane", ["covered wagon", "stagecoach", "canoe"], "Las Vegas has a big airport."],
  ["Many people moved to Nevada in 1859 because they hoped to find…", "silver", ["oceans", "snow", "rain forests"], "The Comstock Lode was a huge silver find."],
  ["A family moves to Nevada to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Basque families came to Nevada from Spain and France. To find Spain on a map, look in…", "Europe", ["Asia", "Australia", "South America"], "Spain is in southwest Europe.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Ranchers in northern Nevada raise cattle. Beef from the ranch reaches stores by…", "truck and train", ["canoe", "hot air balloon", "bicycle only"], "Goods travel on highways and railroads."],
  ["Farmers near Fallon grow alfalfa, a crop that is used to…", "feed cattle and horses", ["make glass", "build houses", "make shoes"], "Alfalfa is hay for animals."],
  ["Onions grown near Yerington are sold in other states. This shows that…", "people in different places trade", ["no one eats onions", "trade is not allowed", "onions grow only in stores"], "Buyers and sellers depend on each other."],
  ["Long ago, miners in Virginia City bought food that came from…", "farms and ranches in valleys nearby", ["the moon", "a grocery app", "an airplane"], "Food had to travel to the mining towns.", true],
  ["Most of the food sold in Las Vegas grocery stores is grown…", "in other places and shipped in", ["on the Strip", "in the hotels", "in Lake Mead"], "The desert city trades for most of its food.", true],
  ["Water from rivers is a natural resource Nevada farmers use to…", "grow crops", ["make movies", "build phones", "sell cars"], "Farms in the desert need irrigation.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "nv-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), national landmarks such as Hoover Dam and the Lincoln Memorial, the holidays that remember the nation's people and events, and the role and responsibilities of the President.",
    standards: ["SS.2.10; SS.2.17; SS.2.21", "events and symbols that shaped national identity, the role and responsibilities of the president, and national landmarks"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "nv-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and Nevadans like Sarah Winnemucca, Anne Martin, Ruby Duncan and Dat So La Lee.",
      standards: ["SS.2.11; SS.2.15", "how individuals have made a difference in their communities, and the contributions of diverse people in U.S. history"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "nv-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (from covered wagons and the railroad across Nevada to airplanes), when they moved, and the reasons people move.",
      standards: ["SS.2.23; SS.2.20", "why people decided to move in U.S. history, and finding places and events on a map"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "nv-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, ranchers, processors, distributors and grocers, and why people trade, with Nevada examples like cattle ranches, alfalfa and onion farms and the food trucked into Las Vegas.",
      standards: ["SS.2.25", "how natural resources are used to produce goods and services in the past and present"],
    },
    TRADING_EXTRA,
  ),
];
