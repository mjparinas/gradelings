import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Kansas Grade 2 social studies, Societies Then and Now (focus standard 4, continuity and change): the nation's symbols,
// landmarks and holidays, and the President's job (the civics/government unit), plus copies of California's difference
// makers, family journeys and making and trading units without their California places, with Kansas items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Kansas only", "the ocean floor"], "She holds a torch high."],
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
  ["Monroe Elementary School in Topeka is now a national park site. It remembers a court case that ended…", "separate schools for Black and white children", ["recess", "school buses", "summer vacation"], "The case was Brown v. Board of Education."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["Dwight D. Eisenhower, who grew up in Abilene, Kansas, became…", "President of the United States", ["a baker in Paris", "the first astronaut", "king of England"], "His presidential library is in Abilene.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Mexico", "Japan", "Spain"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["the Lincoln Memorial", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Amelia Earhart, who was born in Atchison, Kansas, made a difference by…", "flying alone across the Atlantic Ocean", ["building a dam", "inventing the car", "writing the Constitution"], "She was a famous pilot."],
  ["Susanna Madora Salter of Argonia, Kansas, was the first woman in the country elected…", "mayor", ["President", "governor", "pilot"], "She was elected in 1887."],
  ["Linda Brown's family in Topeka went to court so that children of every race could…", "go to the same schools", ["drive cars", "skip school", "vote at age seven"], "The case was Brown v. Board of Education."],
  ["Gordon Parks, who grew up in Fort Scott, Kansas, made a difference with his…", "photographs, books and films", ["rockets", "bridges", "race cars"], "His pictures showed how people really lived."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families crossed Kansas on the Santa Fe and Oregon Trails in…", "covered wagons", ["airplanes", "cars", "rockets"], "Wagons followed trails across the prairie."],
  ["In the 1860s and 1870s, a faster way to travel across Kansas was the…", "railroad", ["airplane", "subway", "spaceship"], "Trains were much faster than wagons."],
  ["Today, many families move to Kansas by car or…", "airplane", ["covered wagon", "stagecoach", "canoe"], "Wichita and Kansas City have airports."],
  ["In 1879, many Black families called Exodusters moved to Kansas because they hoped to find…", "freedom, land and fair treatment", ["oceans", "snow", "rain forests"], "Some of them built the town of Nicodemus."],
  ["A family moves to Kansas to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Mennonite farm families came to Kansas from Russia in the 1870s. To find Russia on a map, look in…", "Europe and Asia", ["Australia", "South America", "Africa"], "Russia stretches across two continents.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Kansas farmers grow a lot of wheat. Wheat goes to a flour mill, where it is…", "ground into flour", ["frozen into ice", "made into gasoline", "turned into glass"], "Flour is used to bake bread."],
  ["Ranchers in the Flint Hills raise cattle on the prairie grass. Beef reaches stores by…", "truck and train", ["canoe", "hot air balloon", "bicycle only"], "Goods travel on highways and railroads."],
  ["Kansas wheat is sold to people in other countries. This shows that…", "people in different places trade", ["no one eats bread", "trade is not allowed", "wheat grows only in stores"], "Buyers and sellers depend on each other."],
  ["Long ago, cowboys drove herds of cattle north from Texas to Abilene and Dodge City so the cattle could…", "ride the railroad to cities in the East", ["swim to Europe", "fly to market", "live on mountains"], "The trains carried cattle to buyers.", true],
  ["Sorghum, corn and soybeans grown in Kansas are a…", "natural resource used to make food", ["kind of rock", "kind of weather", "kind of money"], "Crops come from the land.", true],
  ["Water from the Ogallala Aquifer is a natural resource Kansas farmers use to…", "grow crops", ["make movies", "build phones", "sell cars"], "Farms in dry western Kansas need irrigation.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "ks-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), national landmarks such as the Lincoln Memorial and Monroe Elementary School in Topeka, the holidays that remember the nation's people and events, and the role and responsibilities of the President.",
    standards: ["4.1; 2.1", "the nation's symbols, landmarks and holidays and what has changed and stayed the same, and the role and responsibilities of the President"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "ks-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and Kansans like Amelia Earhart, Susanna Madora Salter, Linda Brown and Gordon Parks.",
      standards: ["1.1; 4.1", "the choices individuals made that changed their communities, and how life changed because of diverse people in U.S. history"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "ks-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (from covered wagons and the railroad across Kansas to airplanes), when they moved, and the reasons people move.",
      standards: ["4.1; 1.1", "how travel and moving have changed over time, and the choices families made when they moved"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "ks-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, ranchers, processors, distributors and grocers, and why people trade, with Kansas examples like wheat farms and flour mills, cattle ranches and the old cattle drives to Abilene.",
      standards: ["4.1; 1.1", "how people have used natural resources to make and trade goods in the past and today, and the choices producers and buyers make"],
    },
    TRADING_EXTRA,
  ),
];
