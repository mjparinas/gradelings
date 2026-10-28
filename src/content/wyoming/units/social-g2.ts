import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Wyoming Grade 2 social studies: the symbols that honor the United States and the Indigenous Tribes of Wyoming, and
// the people and events honored on holidays (SS2.1.2, SS2.1.3, SS2.1.3.a), plus copies of California's difference
// makers (SS2.1.3, SS2.4.3), family journeys (SS2.4.1, SS2.5.3) and making and trading (SS2.3.1, SS2.3.3) units without
// their California places, with Wyoming items added.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Wyoming only", "the ocean floor"], "She holds a torch high."],
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
  ["Wyoming's Capitol in Cheyenne, where the state's laws are made, has a shining…", "gold dome", ["glass slide", "water tower", "pirate ship"], "You can see the dome from far away."],
  ["The leader of our state's government is the…", "governor", ["President", "principal", "mayor"], "Wyoming's governor works in Cheyenne."],
  ["A state government makes laws about things like…", "roads and schools in the state", ["the whole world", "what you eat for lunch", "the weather"], "The national government makes laws for the whole country."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["The Eastern Shoshone and Northern Arapaho Tribes each have their own flag. A flag is a…", "symbol", ["song", "holiday", "law"], "A symbol stands for a group of people."],
  ["A pow wow is a gathering where many Native families share…", "songs, dances and food", ["only homework", "car races", "spaceships"], "Many pow wows welcome visitors."],
  ["In Wyoming, Martin Luther King Jr. Day is also called Wyoming…", "Equality Day", ["Snow Day", "Rodeo Day", "Pizza Day"], "Wyoming is called the Equality State."],
  ["Wyoming Day, on December 10, remembers when Wyoming's women first got the right to…", "vote", ["drive", "fly", "swim"], "It happened in 1869, before any state.", true],
  ["Wyoming became the 44th state on July 10 in…", "1890", ["1776", "1950", "2000"], "That is more than 100 years ago.", true],
  ["Many Native American veterans are honored for serving in the…", "military", ["school band", "circus", "candy store"], "Veterans served our country.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Japan", "Spain", "China"], "It came across the ocean in 1885.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Esther Hobart Morris of South Pass City became the first woman in the country to serve as a…", "judge", ["pilot", "governor of Texas", "ship captain"], "She became a justice of the peace in 1870."],
  ["Nellie Tayloe Ross of Wyoming was the first woman in the country to be a state's…", "governor", ["astronaut", "president", "sheriff"], "She became governor in 1925."],
  ["Chief Washakie was a leader of the Eastern Shoshone who worked to keep his people's…", "homeland in Wyoming", ["ships", "gold mines", "castles"], "The Wind River Reservation is part of that homeland."],
  ["Sacagawea, a Shoshone woman, helped the explorers…", "Lewis and Clark", ["Christopher Columbus", "the astronauts", "the Wright brothers"], "She knew the land and the languages."],
  ["Liz Byrd, a teacher from Cheyenne, worked to make Martin Luther King Jr. Day a…", "Wyoming holiday", ["school test", "new state", "kind of food"], "She was the first Black woman in Wyoming's legislature."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families came to Wyoming to work on the…", "railroad and in the coal mines", ["moon", "ocean floor", "dinosaurs"], "Trains needed coal and workers."],
  ["Rock Springs has been called the home of 56…", "nationalities", ["dinosaurs", "volcanoes", "rivers"], "Miners came there from many countries."],
  ["Long ago, families from the Basque country in Europe came to Wyoming to herd…", "sheep", ["whales", "penguins", "camels"], "Sheep graze on Wyoming's grasslands."],
  ["Wagon trains on the Oregon Trail crossed Wyoming on their way…", "west", ["to the moon", "east to the ocean", "under the sea"], "Families walked beside their wagons."],
  ["A family moves to Casper to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Moving to a new town can change your future. You might go to a new…", "school", ["planet", "ocean", "sun"], "One event can change what happens next.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Wyoming ranchers raise cattle for…", "beef", ["cotton", "glass", "paper"], "Cattle ranching is a big Wyoming job."],
  ["Wool from Wyoming sheep is made into…", "yarn and clothing", ["bread", "juice", "rocks"], "The wool is cleaned, spun and woven."],
  ["Sugar beets grown in Wyoming go to a factory where they are made into…", "sugar", ["cheese", "gasoline", "paper"], "The factory turns roots into white sugar."],
  ["Long trains carry Wyoming coal to power plants in…", "other states", ["the ocean", "the moon", "a toy store"], "Trade connects places far apart.", true],
  ["Most of the bananas sold in Wyoming grocery stores are grown…", "in other countries and shipped in", ["in Wyoming's mountains", "in Cheyenne", "in Yellowstone"], "Bananas need a warm, wet climate.", true],
  ["A machine that milks many cows at once shows how technology…", "helps farms make more", ["stops all farming", "makes milk disappear", "grows bananas"], "New tools change how goods are made.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "wy-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), the flags of the Eastern Shoshone and Northern Arapaho, landmarks such as the Lincoln Memorial and Wyoming's Capitol in Cheyenne, the holidays that honor the nation's people and events (including Martin Luther King Jr./Wyoming Equality Day and Wyoming Day), pow wows, the President's job, and the state and national governments that serve Wyoming.",
    standards: ["SS2.1.2; SS2.1.3; SS2.1.3.a", "the symbols that honor the United States, including those of the Indigenous Tribes of Wyoming, the people and events honored on holidays, and how Tribes honor people and celebrate"],
    items: SYMBOLS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "wy-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and people from Wyoming's story like Esther Hobart Morris, Nellie Tayloe Ross, Chief Washakie, Sacagawea and Liz Byrd.",
      standards: ["SS2.1.3; SS2.4.3", "people who are honored for what they did, and significant people and places in Wyoming"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "wy-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (sailing ships, railroads and airplanes), when they moved, and the reasons people move, from the families who came to Wyoming's railroad, mines and sheep ranches to new neighbors today.",
      standards: ["SS2.4.1; SS2.5.3", "how an event such as moving can change the future, and why people move to or from a place"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "wy-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, processors, distributors and grocers, and why people trade, with Wyoming examples like beef cattle, wool, sugar beets and coal trains.",
      standards: ["SS2.3.1; SS2.3.3", "needs, wants, goods and services, and how science and technology affect how things are made"],
    },
    TRADING_EXTRA,
  ),
];
