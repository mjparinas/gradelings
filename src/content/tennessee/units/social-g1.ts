import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Grade 1 social studies: Tennessee's cities and Washington, D.C. on a map, and the three grand divisions and
// the rivers and mountains that mark them (1.10, 1.13); Tennessee's products and symbols (1.07, 1.20); and leaders,
// voting and national holidays (1.14, 1.15, 1.17, 1.19, 1.24). Leaders are taught by role, not by name. Prompts stay
// short for little kids.

const MAP: Q[] = [
  ["Tennessee has three parts called grand…", "divisions", ["oceans", "towers"], "East, Middle and West."],
  ["Which part of Tennessee has the Great Smoky Mountains?", "East Tennessee", ["West Tennessee", "Middle Tennessee"], "The mountains are in the east."],
  ["Which big river is on Tennessee's west side?", "the Mississippi River", ["the Nile", "the Amazon"], "Memphis sits beside it."],
  ["The Tennessee River marks the line between…", "West and Middle Tennessee", ["two oceans", "two countries"], "It runs north and south there."],
  ["Which city is in West Tennessee, by the Mississippi?", "Memphis", ["Knoxville", "Chattanooga"], "It is in the far west."],
  ["Which city is our state capital?", "Nashville", ["Memphis", "Chattanooga"], "It is in Middle Tennessee."],
  ["Knoxville is in which part of Tennessee?", "East Tennessee", ["West Tennessee", "Middle Tennessee"], "It is near the mountains."],
  ["Chattanooga is in which part of Tennessee?", "East Tennessee", ["West Tennessee", "Middle Tennessee"], "It is near the southern border."],
  ["Nashville is in which part of Tennessee?", "Middle Tennessee", ["East Tennessee", "West Tennessee"], "It is in the middle."],
  ["Our country's capital is…", "Washington, D.C.", ["Nashville", "Memphis"], "The President works there."],
  ["Nashville is the capital of our…", "state", ["country", "school"], "Washington, D.C. is the country's capital."],
  ["On a map, which way is north?", "up", ["down", "left"], "Look for the N."],
  ["Memphis is on which side of Tennessee?", "west", ["east", "north"], "It is by the Mississippi."],
  ["Knoxville is on which side of Tennessee?", "east", ["west", "south"], "It is near the mountains."],
  ["The Appalachian Mountains are on Tennessee's…", "east side", ["west side", "north pole"], "The Smokies are part of them."],
  ["What does a blue line on a map often show?", "a river", ["a road", "a mountain"], "Water is often blue."],
  ["Tennessee is long and thin. It is wide from…", "east to west", ["north to south", "top to bottom"], "Memphis to the mountains is far.", true],
  ["Washington, D.C. is northeast of Tennessee. Which way is that?", "up and to the right", ["down and left", "straight down"], "North is up, east is right.", true],
  ["Which river runs past Nashville?", "the Cumberland River", ["the Mississippi River", "the Ohio River"], "It flows through Middle Tennessee.", true],
  ["How many grand divisions does Tennessee have?", "3", ["2", "8"], "Count East, Middle and West.", true],
  ["The three stars on our state flag stand for the…", "three grand divisions", ["three rivers", "three cities"], "One star for each part.", true],
  ["Which part of Tennessee is flat land by the big river?", "West Tennessee", ["East Tennessee", "the Smokies"], "It is near the Mississippi.", true],
  ["You drive from Memphis to Knoxville. Which way do you go?", "east", ["west", "south"], "Knoxville is in East Tennessee.", true],
  ["A map key tells you…", "what the symbols mean", ["the time", "the weather"], "Look in the corner of the map.", true],
  ["Which city is between Memphis and Knoxville?", "Nashville", ["Washington, D.C.", "Chattanooga"], "It is in the middle.", true],
];

const SYMBOLS: Q[] = [
  ["Tennessee's state bird is the…", "mockingbird", ["robin", "eagle"], "It copies other birds' songs."],
  ["Tennessee's state flower is the…", "iris", ["rose", "daisy"], "It is often purple."],
  ["Tennessee's state tree is the…", "tulip poplar", ["palm tree", "cactus"], "Its flowers look like tulips."],
  ["Tennessee's state animal is the…", "raccoon", ["lion", "penguin"], "It has a mask and a striped tail."],
  ["Tennessee's nickname is the… State.", "Volunteer", ["Sunshine", "Lone Star"], "Many people offered to help."],
  ["A volunteer is someone who…", "offers to help", ["sleeps all day", "never shares"], "Tennesseans helped in wars long ago."],
  ["The raccoon has a black…", "mask", ["hat", "shell"], "Look at its eyes."],
  ["The mockingbird is good at…", "copying sounds", ["swimming", "digging"], "It sings many songs."],
  ["Farmers in Tennessee grow…", "soybeans and corn", ["bananas", "coconuts"], "They grow well here."],
  ["Many cars are made in Tennessee in…", "factories", ["caves", "oceans"], "Making things is manufacturing."],
  ["Nashville is famous for…", "country music", ["penguins", "snow"], "It is called Music City."],
  ["Memphis is famous for blues and…", "rock and roll", ["opera only", "ballet only"], "Music has a long history there."],
  ["People visit the Great Smoky Mountains to…", "hike and see nature", ["swim in the ocean", "ride camels"], "Visitors are called tourists."],
  ["Digging coal or stone out of the ground is…", "mining", ["farming", "fishing"], "Tennessee has mines."],
  ["Visitors who travel to see a place are…", "tourists", ["farmers", "miners"], "Tourism helps Tennessee earn money."],
  ["Which is a Tennessee product from a farm?", "cotton", ["plastic cups", "phones"], "It grows in West Tennessee."],
  ["Which is a symbol of Tennessee?", "the iris", ["the cactus", "the palm tree"], "It is the state flower.", true],
  ["Why is Tennessee called the Volunteer State?", "many people volunteered to help in wars", ["it has many beaches", "it is very cold"], "They offered to help.", true],
  ["Which job makes music for people?", "a singer", ["a miner", "a farmer"], "Music is a big Tennessee job.", true],
  ["A factory worker who builds cars is a…", "producer", ["tourist", "tree"], "Producers make goods.", true],
  ["Why do states pick a state bird?", "to show what is special there", ["to count birds", "to stop rain"], "Symbols stand for a place.", true],
  ["Which belongs on a farm in Tennessee?", "cattle", ["sharks", "camels"], "Many farms raise cows.", true],
  ["Tennessee's state tree has flowers shaped like…", "tulips", ["stars", "bells"], "It is the tulip poplar.", true],
  ["Which helps Tennessee earn money from visitors?", "tourism", ["snow", "pencils"], "People come to see the mountains.", true],
  ["Tennessee's flag has three stars for…", "East, Middle and West Tennessee", ["three animals", "three songs"], "They are the grand divisions.", true],
];

const LEADERS: Q[] = [
  ["The leader of Tennessee is the…", "governor", ["President", "mayor"], "The governor works in Nashville."],
  ["The leader of our country is the…", "President", ["governor", "principal"], "The President lives in the White House."],
  ["The leader of a town or city is the…", "mayor", ["President", "governor"], "A mayor helps a town run."],
  ["A mayor helps a city with…", "roads, parks and safety", ["the whole country", "the ocean"], "The city is the mayor's job."],
  ["Voting is a way to…", "make a choice together", ["eat lunch", "run fast"], "Everyone gets a turn to choose."],
  ["When a class votes, the choice with the most votes…", "wins", ["loses", "goes home"], "Count the votes."],
  ["A rule is for a small group. A law is for…", "everyone in a place", ["only pets", "nobody"], "Laws are made by leaders."],
  ["Which is a law?", "stop at a red light", ["raise your hand in class", "line up for recess"], "Laws are for everyone."],
  ["A good citizen is…", "kind and helpful", ["mean", "messy on purpose"], "Good citizens help others."],
  ["On Independence Day, July 4, we celebrate…", "our country's birthday", ["the first snow", "summer camp"], "It began in 1776."],
  ["Martin Luther King, Jr. Day honors a leader who worked for…", "fair treatment for all", ["more homework", "bigger cars"], "He spoke out peacefully."],
  ["Presidents' Day honors…", "presidents", ["dogs", "farmers only"], "It is in February."],
  ["Thanksgiving is a day to…", "give thanks", ["start school", "plant snow"], "Families share a meal."],
  ["Veterans Day honors people who…", "served in the military", ["sell shoes", "drive taxis"], "It is in November."],
  ["Labor Day honors…", "workers", ["pets", "kings"], "It is in September."],
  ["Memorial Day remembers people who…", "died serving our country", ["won races", "baked pies"], "It is at the end of May."],
  ["Juneteenth celebrates the end of…", "slavery in the United States", ["summer", "school"], "It is on June 19.", true],
  ["Columbus Day and Indigenous Peoples' Day are in…", "October", ["July", "January"], "Some places mark one, some the other.", true],
  ["Why do we say the Pledge of Allegiance?", "to show respect for our country", ["to start a race", "to sing a song"], "It is a patriotic tradition.", true],
  ["Singing the national anthem is a way to show…", "pride in our country", ["that we are tired", "that it is lunch"], "Stand and listen.", true],
  ["Who chooses the governor of Tennessee?", "voters in Tennessee", ["the President", "the mayor"], "Grown-ups vote.", true],
  ["Why do we have laws?", "to keep people safe and fair", ["to make people sad", "to stop all fun"], "Laws protect us.", true],
  ["The governor leads a state. The President leads…", "the country", ["a city", "a school"], "A country has many states.", true],
  ["Which holiday is in July?", "Independence Day", ["Thanksgiving", "Labor Day"], "Fireworks!", true],
  ["A good citizen who sees trash in the park…", "picks it up", ["adds more", "walks away laughing"], "Citizens care for their community.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "tn-g1-tennessee-map",
    title: "Tennessee on the Map",
    emoji: "🗺️",
    blurb: "Three grand divisions, rivers and cities",
    parentNote:
      "Finding Tennessee, Memphis, Nashville, Knoxville, Chattanooga and Washington, D.C. on a map, using north, south, east and west, and the three grand divisions of Tennessee with the Mississippi River, the Tennessee River and the Appalachian Mountains that mark them.",
    standards: ["1.10; 1.11; 1.13", "locating Tennessee's cities and Washington, D.C., and the three grand divisions and their borders"],
    items: MAP,
  }),
  bankUnit({
    id: "tn-g1-tennessee-symbols",
    title: "Tennessee Symbols & Products",
    emoji: "🦝",
    blurb: "The mockingbird, the iris and the Volunteer State",
    parentNote:
      "Tennessee's symbols (the flag, the tulip poplar, the iris, the mockingbird, the raccoon and why it is the Volunteer State) and what Tennesseans make and do for work: farming, factories, mining, music and tourism.",
    standards: ["1.07; 1.20", "Tennessee's major products and industries, and its state symbols and nickname"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "tn-g1-leaders-holidays",
    title: "Leaders, Voting & Holidays",
    emoji: "🗳️",
    blurb: "Governor, President, mayor and our holidays",
    parentNote:
      "What the governor, the President and a mayor do, voting as a way to make choices, rules and laws, patriotic traditions like the Pledge, and the people and events our national holidays honor. Leaders are taught by role, so share the current governor's and President's names at home.",
    standards: ["1.14; 1.15; 1.17; 1.19; 1.24", "the roles of the governor, the President and the mayor, voting, patriotic traditions and national holidays"],
    items: LEADERS,
  }),
];
