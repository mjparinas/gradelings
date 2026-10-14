import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Arkansas's own Grade 2 social studies units (`ar-` ids): the founding documents, state and national symbols, mottos and
// landmarks the Arkansas standards name for Grade 2 (C.1.2.1, C.1.2.4, H.1.2.5); maps of Arkansas and the United States
// and how resources shaped where people settled (G.1.2.1, G.1.2.3, G.1.2.7); and an Arkansas copy of California's
// "Making & Trading" with its California questions left out and Arkansas items (trucking, markets, money) added.

const SYMBOLS: Q[] = [
  ["Which document said the American colonies were free from Great Britain?", "the Declaration of Independence", ["the Bill of Rights", "a library card", "the state song"], "It was signed in 1776."],
  ["The Declaration of Independence was signed in…", "1776", ["1492", "1836", "1950"], "Our country's birthday is July 4 of this year."],
  ["Which document is the plan for how the United States government works?", "the U.S. Constitution", ["the Declaration of Independence", "a newspaper", "a map"], "It begins with \"We the People.\""],
  ["The first ten amendments to the Constitution are called the…", "Bill of Rights", ["Pledge of Allegiance", "Star-Spangled Banner", "Declaration of Independence"], "They list freedoms, like freedom of speech."],
  ["The Bill of Rights protects freedoms such as…", "freedom of speech", ["free ice cream", "no homework", "free cars"], "Being able to say what you think."],
  ["The national motto of the United States is…", "In God We Trust", ["Regnat Populus", "Home Sweet Home", "Go Team"], "It is printed on our money."],
  ["Where can you find the national motto?", "on coins and paper money", ["on stop signs", "on cereal boxes", "on library books"], "Look closely at a penny."],
  ["The Arkansas state motto is…", "Regnat Populus", ["In God We Trust", "E Pluribus Unum", "Land of Lincoln"], "It is in Latin."],
  ["Regnat Populus means…", "the people rule", ["the king rules", "we love rice", "home of the brave"], "In a democracy, people choose leaders."],
  ["Which bird is on the Arkansas State Seal, holding the state motto?", "an eagle", ["a duck", "a mockingbird", "an owl"], "It is also a symbol of the United States."],
  ["A state seal is used to…", "mark official state papers", ["seal envelopes for fun", "catch fish", "close windows"], "It shows a paper is real."],
  ["The Arkansas state butterfly is the…", "Diana fritillary", ["monarch", "swallowtail", "painted lady"], "Its name sounds like a girl's name."],
  ["The Arkansas state musical instrument is the…", "fiddle", ["drum", "piano", "trumpet"], "It is played with a bow, like a violin."],
  ["The Arkansas state flag has a white diamond because…", "Arkansas is known for its diamonds", ["diamonds are easy to draw", "Arkansas is shaped like a diamond", "baseball fields are diamonds"], "Diamonds are found in the ground here."],
  ["How many white stars are around the diamond on the Arkansas flag?", "25", ["13", "50", "4"], "Arkansas was the 25th state."],
  ["At Crater of Diamonds State Park, visitors can…", "dig for diamonds and keep what they find", ["ride roller coasters", "see the ocean", "climb a volcano that is erupting"], "It is near Murfreesboro."],
  ["Hot Springs National Park is famous for its…", "warm water that comes out of the ground", ["snowy mountains", "sandy beaches", "giant waterfalls"], "The town has bathhouses for this water."],
  ["The Buffalo National River was the first river in the United States to be…", "named a national river", ["dug by people", "frozen solid", "turned into a road"], "It became one in 1972."],
  ["The Arkansas State Capitol is in…", "Little Rock", ["Fayetteville", "Hot Springs", "Jonesboro"], "It is the capital city."],
  ["The Arkansas State Capitol is where…", "state leaders make laws", ["people buy groceries", "children go to school", "trains are repaired"], "The General Assembly meets there."],
  ["Little Rock Central High School is a landmark because…", "nine Black students bravely integrated the all-white school in 1957", ["it is the oldest building in the world", "it is where the state flag was sewn", "a president was born there"], "They are called the Little Rock Nine."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "school lunch", "sports"], "Liberty means freedom."],
  ["The Statue of Liberty holds a…", "torch", ["flag", "sword", "book only"], "It lights the way for people coming to America."],
  ["A landmark is…", "an important place that is easy to recognize", ["a kind of food", "a rule at school", "a type of weather"], "People visit it and remember it."],
  ["Why do we keep and visit landmarks?", "to remember people and events from the past", ["to make money only", "to hide them", "because they are new"], "They tell a story.", true],
  ["Which Arkansas landmark helps us remember the fight for equal rights in schools?", "Little Rock Central High School", ["Crater of Diamonds State Park", "the Buffalo National River", "Mount Magazine"], "Think of the Little Rock Nine.", true],
  ["Which is an Arkansas state symbol and not a United States symbol?", "the Diana fritillary butterfly", ["the bald eagle", "the Liberty Bell", "the Statue of Liberty"], "Three are national symbols.", true],
  ["\"In God We Trust\" is a national motto, and \"Regnat Populus\" is a…", "state motto", ["song", "landmark", "holiday"], "It belongs to Arkansas.", true],
];

const MAPS: Q[] = [
  ["The capital of Arkansas is…", "Little Rock", ["Fort Smith", "Pine Bluff", "Fayetteville"], "It is near the middle of the state."],
  ["On a map, a star in a circle usually marks…", "a capital city", ["a lake", "a school", "a farm"], "Look for it at Little Rock."],
  ["Which state is north of Arkansas?", "Missouri", ["Louisiana", "Mississippi", "Oklahoma"], "Look at the top of the map."],
  ["Which state is south of Arkansas?", "Louisiana", ["Missouri", "Kansas", "Kentucky"], "Look at the bottom of the map."],
  ["Which state is west of Arkansas?", "Oklahoma", ["Tennessee", "Mississippi", "Georgia"], "Look at the left side of the map."],
  ["Which big river forms most of Arkansas's eastern border?", "the Mississippi River", ["the Buffalo River", "the Red River", "the White River"], "It is one of the longest rivers in the country."],
  ["Which river flows across Arkansas, through Little Rock?", "the Arkansas River", ["the Nile River", "the Buffalo River", "the Ohio River"], "It has the same name as the state."],
  ["Arkansas is in which part of the United States?", "the South", ["the far North", "the West Coast", "New England"], "It is near the Gulf of Mexico."],
  ["Fayetteville is in the northwest of Arkansas. Pine Bluff is in the…", "southeast", ["northwest", "north", "west"], "The opposite of northwest."],
  ["Jonesboro is northeast of Little Rock. Little Rock is ___ of Jonesboro.", "southwest", ["northeast", "northwest", "east"], "Go the opposite way."],
  ["On a map, the direction between south and west is…", "southwest", ["northeast", "southeast", "northwest"], "Put the two words together."],
  ["Northeast, northwest, southeast and southwest are called…", "intermediate directions", ["cardinal directions", "map titles", "symbols"], "They are in between."],
  ["The part of a map that tells what the symbols mean is the…", "map key", ["title", "compass rose", "scale"], "It unlocks the map."],
  ["The part of a map that tells how far apart places really are is the…", "scale", ["title", "key", "compass rose"], "1 inch might stand for 10 miles."],
  ["On a map, 1 inch stands for 10 miles. Two towns are 3 inches apart. How far apart are they?", "30 miles", ["3 miles", "13 miles", "10 miles"], "3 × 10."],
  ["On a map, blue lines usually show…", "rivers", ["roads", "borders", "railroads"], "Water is often blue on maps."],
  ["A line on a map where one state ends and another begins is a…", "border", ["river", "highway", "title"], "Arkansas has six neighbor states."],
  ["How many states are in the United States?", "50", ["13", "25", "48"], "Count the stars on the flag."],
  ["Which ocean is on the east coast of the United States?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is between America and Europe."],
  ["Which ocean is on the west coast of the United States?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is the biggest ocean."],
  ["Long ago, many towns in Arkansas grew up next to rivers because rivers gave…", "water and a way to move goods by boat", ["snow for sledding", "gold for everyone", "nothing useful"], "People need water, and boats carry goods."],
  ["The town of Hot Springs grew because people came to…", "visit its warm spring water", ["see the ocean", "go skiing", "hunt whales"], "The town is named for it."],
  ["Oil was found near El Dorado in 1921. What happened to the town?", "many people moved there and it grew fast", ["everyone moved away", "it became a lake", "nothing changed"], "Jobs bring people.", true],
  ["Logging towns grew near Arkansas forests because people could get jobs…", "cutting and selling timber", ["catching ocean fish", "mining gold", "growing pineapples"], "Forests give wood.", true],
  ["Rich, flat land in eastern Arkansas brought farmers there to grow…", "rice, cotton and soybeans", ["oranges", "coffee", "bananas"], "The Delta is good farmland.", true],
  ["Which map would best show where the rivers and mountains of Arkansas are?", "a physical map", ["a road map", "a map of a mall", "a seating chart"], "Physical maps show land and water.", true],
  ["Which tool shows the whole Earth as a round model?", "a globe", ["a map key", "a compass rose", "a ruler"], "It is shaped like a ball.", true],
];

const MAKING_EXTRA: Q[] = [
  ["Trucks are important to Arkansas because they…", "carry goods from farms and factories to stores", ["grow rice", "make the rain fall", "teach school"], "Most goods ride on a truck at some point."],
  ["Rice grows on an Arkansas farm, then is cleaned and bagged at a mill, then sold at a store. The trip from farm to store is carried by…", "trucks, trains and barges", ["bicycles only", "horses only", "nobody"], "Goods must be moved."],
  ["A market is any place where…", "buyers and sellers trade goods and services", ["only farmers meet", "people vote", "children learn to read"], "It can be a store, a farm stand or a website."],
  ["Buying a book on the Internet happens in a…", "market", ["museum", "court", "library"], "Buyers and sellers are trading."],
  ["Money makes trading easier because…", "everyone agrees what it is worth", ["it grows on trees", "it is heavy", "it never runs out"], "You don't have to find someone who wants your chickens."],
  ["Before money, people often traded goods for goods. This is called…", "bartering", ["saving", "voting", "taxing"], "Two eggs for a loaf of bread."],
  ["A worker, a tractor and good soil all help grow rice. The tractor is a…", "capital resource", ["natural resource", "human resource", "service"], "A tool made by people to help make goods."],
  ["The soil and water a farmer uses are…", "natural resources", ["capital resources", "human resources", "services"], "They come from nature."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g2-symbols-landmarks",
    title: "Documents, Symbols & Landmarks",
    emoji: "📜",
    blurb: "Founding papers, mottos and famous Arkansas places",
    parentNote:
      "The Declaration of Independence, the Constitution and the Bill of Rights; the national and state mottos, the state seal and symbols; and Arkansas landmarks such as Hot Springs National Park, Crater of Diamonds State Park, the Buffalo National River and Little Rock Central High School.",
    standards: ["C.1.2.1; C.1.2.4; H.1.2.5", "the founding documents, state and national symbols and mottos, and the landmarks and people connected with them"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "ar-g2-arkansas-maps",
    title: "Maps of Arkansas",
    emoji: "🗺️",
    blurb: "Our capital, neighbors, rivers and directions",
    parentNote:
      "Reading maps of Arkansas and the United States: the capital, neighboring states, the Mississippi and Arkansas rivers, map keys, scale and in-between directions, and how rivers, springs, oil and forests drew people to settle.",
    standards: ["G.1.2.1; G.1.2.3; G.1.2.7", "reading state and national maps with keys, scale and directions, and how natural resources shaped settlement"],
    items: MAPS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "ar-g2-making-trading",
      title: "Making & Trading",
      emoji: "🚚",
      blurb: "From farm to store, and why we trade",
      parentNote:
        "How goods are grown, made, moved and sold, the resources that go into them, the trucks, trains and barges that carry them, markets in stores and online, and how money makes trading easier than bartering.",
      standards: ["E.1.2.4; E.1.2.5; E.1.2.6; E.1.2.10", "how resources produce goods, where markets are, the role of money, and how products are made, shipped and sold"],
    },
    MAKING_EXTRA,
  ),
];
