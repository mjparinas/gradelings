import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Mexico Grade 2 social studies, We the People: the purposes and structures of Tribal, local, state and national
// government (2.8) and the people, symbols and holidays that shaped the nation's identity (2.9), plus copies of
// California's difference makers (2.9, 2.11), family journeys (2.24, 2.20) and making and trading (2.16, 2.19) units
// without their California places, with New Mexico items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "New Mexico only", "the ocean floor"], "She holds a torch high."],
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
  ["White Sands, a national park in New Mexico, is famous for its…", "white sand dunes", ["ice caves", "ocean beaches", "tall rainforests"], "The sand is made of a mineral called gypsum."],
  ["The leader of our state's government is the…", "governor", ["President", "principal", "mayor"], "New Mexico's governor works in Santa Fe."],
  ["The Navajo Nation and the Pueblos have their own…", "Tribal governments", ["oceans", "planets", "kings"], "Tribal nations make many of their own laws."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["New Mexico became the 47th state in…", "1912", ["1776", "1492", "2012"], "That was more than 100 years ago.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Mexico", "Japan", "Spain"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["White Sands", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Maria Martinez of San Ildefonso Pueblo made a difference with her famous black…", "pottery", ["cars", "rockets", "bridges"], "Her pots are in museums around the world."],
  ["Miguel Trujillo, from Isleta Pueblo, went to court in 1948 and won Native Americans in New Mexico the right to…", "vote", ["drive", "swim", "read"], "He had served in the Marines."],
  ["Nina Otero-Warren helped New Mexico women win the right to vote and led schools in…", "Santa Fe County", ["the Pacific Ocean", "the moon", "Antarctica"], "She was one of the first women to lead schools in the state."],
  ["The Navajo Code Talkers helped the United States in World War II by…", "sending secret messages in the Navajo language", ["building a dam", "inventing the car", "flying to the moon"], "The enemy could never break their code."],
  ["Dennis Chávez, a senator from New Mexico, worked for…", "fair treatment of workers", ["more homework", "faster cars", "bigger stores"], "He served in Congress for many years."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["In 1598, Spanish settlers came north into New Mexico along a long road called…", "El Camino Real", ["Route 66", "the Oregon Trail", "the subway"], "It means the royal road."],
  ["In the 1820s, traders brought goods to Santa Fe in…", "covered wagons on the Santa Fe Trail", ["airplanes", "cars", "rockets"], "The trail started in Missouri."],
  ["Around 1880, a faster way to travel to New Mexico was the…", "railroad", ["airplane", "subway", "spaceship"], "Trains were much faster than wagons."],
  ["Later, many families drove to New Mexico on a famous highway called…", "Route 66", ["El Camino Real", "the Santa Fe Trail", "the Nile"], "It passed through Albuquerque."],
  ["A family moves to Albuquerque to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["The first Spanish settlers in New Mexico came from Spain by way of Mexico. To find Spain on a map, look in…", "Europe", ["Asia", "Australia", "South America"], "Spain is in southwest Europe.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Farmers near Hatch grow a famous crop that is roasted and sold all over the country. It is…", "green chile", ["bananas", "coconuts", "pineapples"], "Hatch chile is a New Mexico favorite."],
  ["Ranchers in New Mexico raise cattle. Beef from the ranch reaches stores by…", "truck and train", ["canoe", "hot air balloon", "bicycle only"], "Goods travel on highways and railroads."],
  ["Pecans grown near Las Cruces are sold in other states. This shows that…", "people in different places trade", ["no one eats pecans", "trade is not allowed", "pecans grow only in stores"], "Buyers and sellers depend on each other."],
  ["Long ago, traders on the Santa Fe Trail brought cloth and tools to Santa Fe and took home…", "silver, furs and mules", ["phones", "plastic toys", "airplanes"], "Both sides got things they wanted.", true],
  ["Most of the bananas sold in New Mexico grocery stores are grown…", "in other countries and shipped in", ["in the desert", "in Santa Fe", "in the Rio Grande"], "Bananas need a warm, wet climate.", true],
  ["Water from the Rio Grande is a natural resource New Mexico farmers use to…", "grow crops", ["make movies", "build phones", "sell cars"], "Farms in a dry land need irrigation.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "nm-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), landmarks such as White Sands and the Lincoln Memorial, the holidays that remember the nation's people and events, the President's job, and the Tribal, local, state and national governments that serve New Mexicans.",
    standards: ["2.8; 2.9", "the purposes and structures of Tribal, local, state and national government, and the people, symbols and events that shaped our national identity"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "nm-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and New Mexicans like Maria Martinez, Miguel Trujillo, Nina Otero-Warren, Dennis Chávez and the Navajo Code Talkers.",
      standards: ["2.9; 2.11", "how the contributions of diverse individuals helped develop our national identity, and the qualities of leadership"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "nm-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (from El Camino Real and the Santa Fe Trail to the railroad, Route 66 and airplanes), when they moved, and the reasons people move.",
      standards: ["2.24; 2.20", "waves of migration to the Western Hemisphere in order, and locating the United States, Canada and Mexico on maps"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "nm-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, ranchers, processors, distributors and grocers, and why people trade, with New Mexico examples like Hatch chile, Las Cruces pecans, cattle ranches and the Santa Fe Trail.",
      standards: ["2.16; 2.19", "how people, goods and ideas spread from one community to another, and the resources communities have"],
    },
    TRADING_EXTRA,
  ),
];
