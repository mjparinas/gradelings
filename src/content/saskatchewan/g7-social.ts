import type { SortSet } from "../bank";
import type { Question, Unit } from "../types";
import { pick, randInt, sample, textChoice } from "../random";
import type { Level } from "../ontario/kit";
import { bankUnit, hq, q, type Item } from "../ontario/g3-4-kit";
import { sk } from "./kit";

// Saskatchewan Grade 7 Social Studies: Canada and the circumpolar and Pacific Rim countries (IN7.1–RW7.3).
// Neither BC nor Ontario teaches this course, so these units are written for Saskatchewan.

// ---------- The North and the Pacific Rim ----------

const REGION_SORT: SortSet = {
  prompt: "Is it a circumpolar (Arctic) country or a Pacific Rim country? Tap a country, then tap its basket.",
  hint: "Norway, Sweden, Finland, Iceland and Russia border or reach into the Arctic. Japan, Australia, Chile and the Philippines border the Pacific Ocean.",
  bins: [
    { id: "arctic", label: "circumpolar (Arctic)", emoji: "🧊" },
    { id: "pacific", label: "Pacific Rim", emoji: "🌊" },
  ],
  items: [
    { label: "Norway", emoji: "🇳🇴", bin: "arctic" },
    { label: "Finland", emoji: "🇫🇮", bin: "arctic" },
    { label: "Iceland", emoji: "🇮🇸", bin: "arctic" },
    { label: "Sweden", emoji: "🇸🇪", bin: "arctic" },
    { label: "Japan", emoji: "🇯🇵", bin: "pacific" },
    { label: "Australia", emoji: "🇦🇺", bin: "pacific" },
    { label: "Chile", emoji: "🇨🇱", bin: "pacific" },
    { label: "the Philippines", emoji: "🇵🇭", bin: "pacific" },
  ],
};

const NORTH: Item[] = [
  q("The Arctic Circle is the line of latitude at about…", "66.5° N", ["23.5° N", "0°", "45° N"], "North of this line, the sun does not set on some summer days and does not rise on some winter days.", "🧭"),
  q("Which word describes countries that surround the North Pole?", "circumpolar", ["tropical", "landlocked", "equatorial"], "“Circum” means around, and “polar” refers to the pole.", "🧊"),
  q("Which of these countries has land inside the Arctic Circle?", "Norway", ["Brazil", "Australia", "Egypt"], "Norway, Sweden, Finland, Russia, Canada, the United States, Iceland and Denmark (through Greenland) are Arctic countries.", "🌌"),
  q("What is the Arctic Council?", "a group of Arctic countries and Indigenous organizations that work together on Arctic issues", ["a type of weather", "a hockey league", "an ocean current"], "Canada and seven other Arctic countries are members, with Indigenous groups taking part as permanent participants.", "🤝"),
  q("What name do the Inuit use for their homeland in Canada?", "Inuit Nunangat", ["Rupert's Land", "New France", "the Prairies"], "Inuit Nunangat includes the land, water and ice of the Inuit homeland.", "🗺️"),
  q("Which territory was created in 1999?", "Nunavut", ["Yukon", "Northwest Territories", "Saskatchewan"], "Nunavut means “our land” in Inuktut.", "📅"),
  q("What is permafrost?", "ground that stays frozen for at least two years", ["a type of snow", "warm soil", "a mineral"], "Much of northern Canada and Russia sits on permafrost.", "🧊"),
  q("What is the tundra?", "a cold, treeless region with low plants", ["a thick tropical forest", "a sandy desert", "a deep ocean"], "Few trees grow in the tundra because of the cold and the frozen ground.", "🏔️"),
  q("The Sámi are Indigenous people who live in…", "northern Norway, Sweden, Finland and Russia", ["Southern Chile", "Japan's islands", "Australia's centre"], "Sámi traditionally herd reindeer and have their own languages and culture.", "🦌"),
  q("Which ocean touches the west coast of Canada?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Indian Ocean"], "The Pacific Ocean borders British Columbia and many Pacific Rim countries.", "🌊"),
  q("What is the “Ring of Fire”?", "an area around the Pacific Ocean with many volcanoes and earthquakes", ["a circle of campfires", "a type of cloud", "a hockey tournament"], "Plates meet around the edge of the Pacific Ocean.", "🌋"),
  q("Which of these countries is on the Pacific Rim?", "Japan", ["Egypt", "Switzerland", "Poland"], "Japan is a group of islands in the western Pacific.", "🇯🇵"),
  q("A map projection is…", "a way of showing the curved Earth on a flat map", ["a type of cloud", "a travel ticket", "a weather forecast"], "Every flat map changes size, shape, distance or direction in some way.", "🗺️"),
  q("On a flat world map, places near the poles often look…", "larger than they really are", ["smaller than they are", "exactly the same size", "missing"], "Some map projections stretch the polar regions.", "🌐"),
  q("Which map would be best for finding a mountain's height?", "a topographic map", ["a map of time zones", "a map of languages", "a road map of a city"], "Topographic maps show elevation with contour lines.", "⛰️"),
  q("Why are sea routes through the Arctic getting more attention?", "sea ice is melting, so ships can travel in new places", ["the Arctic is getting colder", "more land is appearing", "there is more snow"], "The Northwest Passage may become easier to sail as sea ice shrinks.", "🚢"),
  q("How does climate change affect people in the Arctic?", "thawing permafrost and thinner sea ice affect homes, travel and hunting", ["it has no effect", "it makes winters longer everywhere", "it adds more ice"], "Many northern communities are adapting to change.", "🌡️"),
  q("A map that shows population is useful for…", "seeing where people live", ["finding rivers only", "naming oceans", "checking the weather"], "Different maps answer different questions.", "👥"),
  q("What is one reason that few people live in the far north of Canada?", "the cold climate and long winters", ["too many mountains of sugar", "no sunlight in summer", "too much sand"], "Environment affects where people settle.", "🧥"),
  q("Which people traditionally lived across the circumpolar north and depended on hunting and fishing?", "Indigenous peoples such as the Inuit and Sámi", ["Roman soldiers", "Viking kings only", "ancient Greeks"], "Many Arctic peoples still hunt, fish and herd today.", "🎣"),
  q("Which Canadian region has the largest land area, with very few people?", "the North (Yukon, Northwest Territories and Nunavut)", ["the Maritimes", "Southern Ontario", "Vancouver Island"], "The three territories cover more than one third of Canada but have few people.", "🧊"),
  hq("Why do many countries on the Pacific Rim have earthquakes and volcanoes?", "tectonic plates meet along the edge of the Pacific", ["they are close to the Arctic", "the moon is close", "they have lots of rain"], "The Ring of Fire follows plate boundaries.", "🌋"),
  hq("Why might a Mercator map mislead a student about Greenland?", "it makes Greenland look much larger than it is", ["it removes Greenland", "it shrinks Greenland", "it moves Greenland to Africa"], "Mercator maps stretch areas far from the equator.", "🗺️"),
  hq("Why do Arctic and Pacific Rim countries need to cooperate on some issues?", "oceans, wildlife and climate cross borders", ["borders stop all weather", "they speak the same language", "they all have the same laws"], "Shared oceans and migrating animals mean decisions in one country can affect others.", "🌍"),
  hq("Why might rising seas threaten some Pacific islands?", "they sit only a little above sea level", ["they are very tall mountains", "they are far inland", "they have no water around them"], "Low-lying islands are especially at risk.", "🏝️"),
];

// ---------- Democracy and other systems ----------

const SYSTEM_SORT: SortSet = {
  prompt: "Which system of government does it describe? Tap an item, then tap its basket.",
  hint: "In a democracy, citizens have a voice. In a dictatorship, one person holds all the power.",
  bins: [
    { id: "democracy", label: "democracy", emoji: "🗳️" },
    { id: "dictatorship", label: "dictatorship", emoji: "👑" },
  ],
  items: [
    { label: "citizens vote in free elections", emoji: "🗳️", bin: "democracy" },
    { label: "laws apply to leaders too", emoji: "⚖️", bin: "democracy" },
    { label: "a free press can criticize leaders", emoji: "📰", bin: "democracy" },
    { label: "power can change hands peacefully", emoji: "🤝", bin: "democracy" },
    { label: "one person holds all power", emoji: "👑", bin: "dictatorship" },
    { label: "critics can be silenced", emoji: "🤐", bin: "dictatorship" },
    { label: "no real elections", emoji: "🚫", bin: "dictatorship" },
    { label: "the leader makes laws alone", emoji: "📜", bin: "dictatorship" },
  ],
};

const DEMOCRACY: Item[] = [
  q("The word “democracy” comes from Greek words meaning…", "rule by the people", ["rule by one king", "rule by soldiers", "rule by money"], "In a democracy, people choose who governs.", "🗳️"),
  q("What is an oligarchy?", "rule by a small group of people", ["rule by everyone", "rule by one person", "rule by the courts"], "The small group may be rich, powerful or both.", "👥"),
  q("What is a dictatorship?", "a system where one person holds all the power", ["a system of town councils", "a type of school", "a system where all adults vote"], "Dictators often do not allow free elections.", "👑"),
  q("Canada is a constitutional monarchy and a parliamentary democracy. What does that mean?", "the King is head of state, and elected representatives make the laws", ["the King makes every law", "there are no elections", "judges run the country"], "The Crown has a symbolic role, and elected Members of Parliament make decisions.", "🍁"),
  q("Who is the head of the federal government in Canada?", "the Prime Minister", ["the Governor General", "the Chief Justice", "the Senate Speaker"], "The Prime Minister usually leads the party with the most seats in the House of Commons.", "👤"),
  q("Which part of Parliament has elected Members of Parliament (MPs)?", "the House of Commons", ["the Senate", "the Supreme Court", "the Cabinet only"], "MPs are elected in ridings across the country.", "🏛️"),
  q("How are Senators in Canada chosen?", "they are appointed", ["they are elected by students", "they are chosen by lottery", "they are born into the role"], "Senators are appointed and can serve until age 75.", "📜"),
  q("What does the Governor General do?", "represents the Crown and gives Royal Assent to bills", ["leads the opposition", "makes all laws alone", "runs the courts"], "Royal Assent is the final step before a bill becomes law.", "👑"),
  q("What is a bill?", "a proposed law", ["a tax receipt", "a vote for mayor", "a type of court"], "Bills are debated and voted on before they become laws.", "📄"),
  q("What are the three branches of government?", "legislative, executive and judicial", ["north, south and east", "federal, local and school", "law, money and sport"], "The legislative branch makes laws, the executive carries them out and the judicial branch interprets them.", "🏛️"),
  q("What does the judicial branch do?", "interprets laws and settles disputes in courts", ["makes the budget", "chooses the Prime Minister", "draws maps"], "Judges apply and interpret the law.", "⚖️"),
  q("The Canadian Charter of Rights and Freedoms was added to the Constitution in…", "1982", ["1867", "1905", "2015"], "The Charter protects rights such as freedom of expression and equality.", "📘"),
  q("What is “rule of law”?", "everyone, including leaders, must follow the law", ["only citizens follow laws", "laws are optional", "leaders write laws for themselves only"], "Rule of law protects people from unfair use of power.", "⚖️"),
  q("What is one strength of a democracy?", "citizens have a voice and rights are protected", ["decisions are never debated", "one person decides everything", "elections are not allowed"], "Democracies give people ways to take part and to change leaders.", "🗳️"),
  q("What is one weakness of a democracy?", "decisions can take a long time because many views are heard", ["leaders cannot be criticized", "there are no rules", "no one can vote"], "Debate takes time, but it also leads to fairer choices.", "⏳"),
  q("What is one strength of a dictatorship that some people point to?", "decisions can be made quickly", ["everyone has a say", "the leader can be voted out", "courts are independent"], "Speed is gained at the cost of freedom and accountability.", "⚡"),
  q("What is a major weakness of a dictatorship?", "people have little freedom and no way to change leaders peacefully", ["too many elections", "too much debate", "too many free newspapers"], "Power with no limits can be abused.", "🚫"),
  q("How often must a federal election be held in Canada, at most?", "within five years", ["every month", "every 20 years", "never"], "The Constitution says a House of Commons lasts no more than five years.", "📆"),
  q("An individual's power can come from…", "knowledge, wealth, a position or the support of others", ["only muscles", "only height", "only luck"], "Sources of power include authority, resources, knowledge and the trust of others.", "💪"),
  q("A nation's power can come from…", "its economy, military, resources and relationships with other countries", ["its weather only", "its flag colours", "its time zone"], "Different nations hold different kinds of power.", "🌍"),
  hq("Why do democracies protect the right to criticize the government?", "so citizens can hold leaders accountable", ["to make leaders unhappy", "to stop elections", "to avoid laws"], "A free press and free speech help keep power in check.", "📰"),
  hq("A small group of wealthy families controls a country's government. This is closest to…", "an oligarchy", ["a democracy", "a school board", "a parliament of students"], "Power is in the hands of a few.", "💰"),
  hq("Why does Canada have a Senate to review bills passed by the House of Commons?", "to give laws a second look", ["to vote on hockey rules", "to appoint the Premier", "to replace elections"], "The Senate reviews and can suggest changes to bills.", "🔍"),
  hq("Which action is a way a citizen can take part in Canadian democracy?", "voting, writing to an MP or joining a community group", ["ignoring every issue", "never reading about news", "avoiding every election"], "Active citizens help shape decisions.", "🤲"),
  hq("Why do many Indigenous nations in the circumpolar world seek a voice in decisions about their lands?", "the decisions affect their homelands and ways of life", ["they have no interest", "they live far away", "they don't use the land"], "Self-determination is an important part of governance for Indigenous peoples.", "🪶"),
];

// ---------- Trade, resources and globalization ----------

const ECONOMY: Item[] = [
  q("Barter means…", "trading goods or services without using money", ["paying with a credit card", "giving money to the bank", "selling only for cash"], "Early trading often meant swapping one useful thing for another.", "🔄"),
  q("In many traditional Indigenous economies in Canada, sharing was important because…", "it helped communities survive and stay strong", ["there were no people", "it was against the law", "people did not need food"], "Sharing food and tools helped everyone.", "🤲"),
  q("A traditional Inuit hunter shares the catch with the community. This is an example of…", "sharing", ["selling for profit", "taxes", "advertising"], "Sharing food is a core value in many Inuit communities.", "🐟"),
  q("Which item did First Nations trade for European goods in the fur trade?", "furs", ["televisions", "cars", "computers"], "Furs, especially beaver, were traded for metal tools, cloth and other goods.", "🦫"),
  q("What is globalization?", "the growing connections among countries through trade, travel and communication", ["a type of weather", "a map of the Earth", "a school subject only"], "The world is more connected than ever.", "🌍"),
  q("Which technology has made globalization much faster?", "the internet and container ships", ["horse-drawn carts", "candles", "quill pens"], "Fast communication and cheap shipping link countries.", "🚢"),
  q("Canada sells a lot of canola, potash and wheat to other countries. This is called…", "exports", ["imports", "barter", "taxes"], "Exports are goods that are sold to other countries.", "📦"),
  q("Goods that a country buys from other countries are called…", "imports", ["exports", "gifts only", "taxes"], "Canada imports many electronics and cars, for example.", "📥"),
  q("Which Pacific Rim country has few natural energy resources and imports a lot of oil and gas?", "Japan", ["Canada", "Russia", "Norway"], "Japan has to buy much of its energy from other countries.", "🇯🇵"),
  q("Which Arctic country produces almost all of its electricity from renewable sources like geothermal and hydro?", "Iceland", ["Russia", "Mexico", "Greece"], "Iceland uses hot springs and rivers to make power.", "🇮🇸"),
  q("A country with a lot of oil can have a stronger economy because…", "it can sell the oil to other countries", ["oil is free", "oil makes snow", "oil can't be sold"], "Resources can bring income, but prices can rise and fall.", "🛢️"),
  q("Why can depending on a single resource be risky for a region?", "if the price falls, many people can lose income", ["resources never change", "every resource is the same", "prices always go up"], "A varied economy is less risky.", "📉"),
  q("What is overfishing?", "catching fish faster than the population can recover", ["fishing in the dark", "feeding fish too much", "fishing with a rod"], "Overfishing harms ocean ecosystems and the people who depend on them.", "🐟"),
  q("What is one way a company can show stewardship of the environment?", "reduce pollution and restore the land it uses", ["dump waste in rivers", "ignore laws", "cut down more trees without replanting"], "Stewardship means looking after the environment for the future.", "♻️"),
  q("Which is a sustainable choice for a fishing community?", "setting catch limits so fish can recover", ["fishing as much as possible", "ignoring the numbers", "using bigger and bigger nets"], "Limits protect fish and future jobs.", "🎣"),
  q("What is one benefit of globalization for Canadians?", "a wider choice of products and markets for exports", ["no one trades", "fewer new ideas", "slower communication"], "Goods and ideas move across borders.", "🛍️"),
  q("What is one challenge of globalization?", "jobs can move to other countries and local businesses may struggle", ["nothing ever changes", "no one needs cars", "every product is the same price"], "Globalization brings both opportunities and challenges.", "⚖️"),
  q("Many clothes sold in Canada are made in other countries. This shows…", "global trade connects people far apart", ["clothes cannot be shipped", "factories only exist in Canada", "there is no trade"], "Products often travel across oceans.", "👕"),
  q("The Pacific Rim is an important trading area for Canada because…", "many of Canada's trading partners are across the Pacific", ["there are no ships", "it is close to Saskatchewan", "it has no countries"], "Ports such as Vancouver and Prince Rupert connect Canada to Asia.", "🚢"),
  hq("How is a barter economy different from a money economy?", "goods are traded directly instead of being bought with money", ["there are no goods", "everything is free", "only banks are used"], "Money makes trading easier because it has a shared value.", "💱"),
  hq("Why might Indigenous peoples in the Arctic worry about industrial development?", "it can affect the animals, land and water they depend on", ["it brings no change", "it makes the sun shine longer", "it only affects cities"], "Decisions about development affect traditional food and culture.", "🦌"),
  hq("How does technology link globalization and the economy?", "faster communication and transport let businesses sell across the world", ["technology slows trade", "technology only affects games", "technology stops shipping"], "Technology helps goods, money and ideas move quickly.", "💻"),
  hq("Why do some people argue that resource wealth should be shared with the communities where it is found?", "those communities carry the impacts of resource development", ["the communities do not matter", "resources are free", "sharing is illegal"], "Fair sharing of benefits and responsibilities matters in resource decisions.", "⚖️"),
  hq("Which action shows ecological stewardship by an economy?", "shifting to renewable energy and protecting habitats", ["increasing waste", "ignoring pollution", "draining wetlands for no reason"], "Stewardship balances the economy with caring for the environment.", "🌱"),
];

// ---------- Maps, coordinates and time zones ----------

const HEMISPHERE_SORT: SortSet = {
  prompt: "Is the country north or south of the equator? Tap a country, then tap its basket.",
  hint: "Canada, Japan, Norway and Russia are north of the equator. Australia, New Zealand, Chile and Fiji are south of it.",
  bins: [
    { id: "north", label: "Northern Hemisphere", emoji: "⬆️" },
    { id: "south", label: "Southern Hemisphere", emoji: "⬇️" },
  ],
  items: [
    { label: "Canada", emoji: "🍁", bin: "north" },
    { label: "Japan", emoji: "🗾", bin: "north" },
    { label: "Norway", emoji: "🏔️", bin: "north" },
    { label: "Russia", emoji: "🌲", bin: "north" },
    { label: "Australia", emoji: "🦘", bin: "south" },
    { label: "New Zealand", emoji: "🥝", bin: "south" },
    { label: "Chile", emoji: "🌶️", bin: "south" },
    { label: "Fiji", emoji: "🏝️", bin: "south" },
  ],
};

// Places that keep the same UTC offset all year (no daylight saving time), so the answer never depends on the season.
const ZONES: [place: string, offset: number][] = [
  ["Regina", -6],
  ["Honolulu", -10],
  ["Lima", -5],
  ["Reykjavik", 0],
  ["Moscow", 3],
  ["Manila", 8],
  ["Tokyo", 9],
  ["Brisbane", 10],
];

const utc = (n: number) => (n === 0 ? "UTC+0" : n > 0 ? `UTC+${n}` : `UTC−${-n}`);

/** 0–23 as a clock time children read: "7 a.m.", "noon", "midnight". */
function clock(h: number): string {
  const x = ((h % 24) + 24) % 24;
  if (x === 0) return "midnight";
  if (x === 12) return "noon";
  return x < 12 ? `${x} a.m.` : `${x - 12} p.m.`;
}

function timeZoneQuestion(d: Level): Question {
  const [from, to] = sample(ZONES, 2);
  const start = d === 1 ? randInt(8, 11) : randInt(7, 16);
  const diff = to[1] - from[1];
  const answer = clock(start + diff);
  const wrong = [clock(start - diff), clock(start + diff + 1), clock(start + diff - 1), clock(start + diff + 12)].filter((w, i, all) => w !== answer && all.indexOf(w) === i);
  return textChoice(
    `When it is ${clock(start)} in ${from[0]} (${utc(from[1])}), what time is it in ${to[0]} (${utc(to[1])})?`,
    answer,
    wrong.slice(0, 3),
    `${to[0]} is ${Math.abs(diff)} hour${Math.abs(diff) === 1 ? "" : "s"} ${diff > 0 ? "ahead of" : "behind"} ${from[0]}. ${diff > 0 ? "Add" : "Subtract"} ${Math.abs(diff)} hour${Math.abs(diff) === 1 ? "" : "s"}. (It may be a different day there.)`,
    { type: "emoji", emoji: "🕒" },
  );
}

function scaleQuestion(d: Level): Question {
  const per = pick(d === 1 ? [10, 100] : d === 2 ? [25, 50, 100, 200, 250] : [50, 100, 200]);
  const cm = d === 3 ? pick([1.5, 2.5, 3.5, 4.5, 6, 7]) : randInt(2, 9);
  const km = per * cm;
  const fmt = (n: number) => `${n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, "0")}` : n} km`;
  const wrong = [km * 10, km + per, km - per, km / 10, per + cm, km * 2].filter((n, i, all) => n !== km && Number.isInteger(n) && n > 0 && all.indexOf(n) === i);
  return textChoice(
    `On a map, 1 cm stands for ${per} km. Two towns are ${cm} cm apart on the map. How far apart are they really?`,
    fmt(km),
    wrong.slice(0, 3).map(fmt),
    `Multiply the map distance by the scale: ${cm} × ${per} km.`,
    { type: "emoji", emoji: "📏" },
  );
}

const MAPS: Item[] = [
  q("Lines of latitude run…", "east and west, parallel to the equator", ["north and south, from pole to pole", "only through Canada", "diagonally across oceans"], "Latitude lines are called parallels. They never meet.", "🌐"),
  q("Lines of longitude run…", "from the North Pole to the South Pole", ["east and west around Earth", "only around the equator", "along coastlines"], "Longitude lines are called meridians. They all meet at the poles.", "🌐"),
  q("The equator is at…", "0° latitude", ["0° longitude", "90° N", "180° longitude"], "Latitude is measured north and south of the equator.", "🧭"),
  q("The prime meridian (0° longitude) passes through…", "Greenwich, England", ["Regina, Canada", "Tokyo, Japan", "the North Pole only"], "Longitude is measured east and west of Greenwich.", "🧭"),
  q("Which coordinates are closest to Regina?", "50° N, 105° W", ["50° S, 105° W", "105° N, 50° W", "50° N, 105° E"], "Regina is north of the equator and west of the prime meridian. Latitude comes first.", "📍"),
  q("Saskatchewan's southern border follows which line of latitude?", "49° N", ["60° N", "0°", "66.5° N"], "Much of the Canada–United States border in the west follows the 49th parallel.", "📍"),
  q("Saskatchewan's northern border follows which line of latitude?", "60° N", ["49° N", "23.5° N", "90° N"], "North of 60° N are the Northwest Territories.", "📍"),
  q("Canada is in which two hemispheres?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern", "Southern and Western"], "Canada is north of the equator and west of the prime meridian.", "🍁"),
  q("Australia is in which two hemispheres?", "Southern and Eastern", ["Northern and Western", "Northern and Eastern", "Southern and Western"], "Australia is south of the equator and east of the prime meridian.", "🦘"),
  q("Earth turns 360° in 24 hours. About how wide is one time zone?", "15° of longitude", ["1° of longitude", "24° of longitude", "90° of longitude"], "360 ÷ 24 = 15.", "🕒"),
  q("Why do we have time zones?", "so that noon is close to when the sun is highest in each place", ["so that every place has the same time", "so that days last longer", "because the moon moves"], "Earth turns, so the sun is highest at different times in different places.", "☀️"),
  q("Places to the east of you have clock times that are…", "later", ["earlier", "always the same", "always noon"], "The sun rises in the east first.", "🌅"),
  q("Most of Saskatchewan does not change its clocks in spring and fall. It stays on…", "Central Standard Time all year", ["Pacific time all year", "Atlantic time all year", "a different time each month"], "Most of Saskatchewan does not use daylight saving time.", "🕒"),
  q("The International Date Line is close to…", "180° longitude", ["0° longitude", "0° latitude", "49° N"], "It is on the opposite side of Earth from the prime meridian.", "📅"),
  q("A political map mainly shows…", "countries, provinces, borders and cities", ["mountains and valleys only", "rainfall only", "ocean currents only"], "Political maps are about the ways people divide land.", "🗺️"),
  q("A physical map mainly shows…", "landforms and bodies of water", ["provincial borders only", "election results", "time zones only"], "Physical maps show mountains, plains, rivers and lakes.", "⛰️"),
  q("A thematic map shows…", "one topic, such as population or climate", ["every topic at once", "only roads", "only street names"], "Theme means topic.", "🗺️"),
  q("On a topographic map, contour lines that are close together show…", "a steep slope", ["flat land", "a lake", "a road"], "Close lines mean the height changes quickly.", "⛰️"),
  q("What does a map's legend (key) explain?", "what the symbols and colours mean", ["who drew the map", "how old the map is", "the price of the map"], "Check the legend before you read a map.", "🔑"),
  q("What does a compass rose show?", "directions such as north, south, east and west", ["distances", "time zones", "population"], "It is often in a corner of the map.", "🧭"),
  q("What does a GPS receiver use to find your location?", "signals from satellites", ["the stars at night only", "a paper map", "the wind"], "GPS stands for Global Positioning System.", "🛰️"),
  q("A GIS (geographic information system) is useful because it can…", "stack layers of data, such as roads, rivers and population, on one map", ["only print paper maps", "only show the weather today", "replace all data with drawings"], "Each layer adds another kind of information.", "💻"),
  q("Satellite images taken years apart can show…", "how sea ice, forests or cities have changed", ["what people are thinking", "the exact age of a rock", "the sound of the ocean"], "Comparing images over time shows change.", "🛰️"),
  q("Which map would best show where most people in Japan live?", "a population density map", ["a map of time zones", "a map of ocean depth", "a map of world religions"], "Population density maps shade areas by how many people live there.", "👥"),
  q("Which is the largest ocean?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Indian Ocean"], "The Pacific Rim countries all border this ocean.", "🌊"),
  q("Which ocean is surrounded by the circumpolar countries?", "the Arctic Ocean", ["the Indian Ocean", "the Southern Ocean", "the Atlantic Ocean only"], "Circumpolar means around the North Pole.", "🧊"),
  hq("Why might a map centred on the North Pole be best for studying circumpolar countries?", "it shows how close the Arctic countries are to each other across the Arctic Ocean", ["it shows the equator in the middle", "it removes all oceans", "it makes Africa look larger"], "A polar view puts the Arctic Ocean in the centre.", "🧊"),
  hq("A Mercator map keeps shapes and directions useful for sailors, but it…", "makes places near the poles look too big", ["shrinks places near the poles", "leaves out the oceans", "shows the correct area of every country"], "Every flat map changes something about the curved Earth.", "🗺️"),
  hq("An equal-area map (such as the Gall–Peters map) shows land areas correctly, but…", "the shapes of countries are stretched", ["it leaves out Africa", "it has no equator", "it shows only one country"], "Each projection makes a trade-off.", "🗺️"),
  hq("Two maps of the same Arctic area use different place names. What is the best explanation?", "different peoples and mapmakers have named the places in their own languages", ["one map must be fake", "places never have more than one name", "names on maps are chosen at random"], "Who made a map, and when, shapes what it shows.", "🗺️"),
  hq("A student flies from Vancouver to Tokyo and crosses the International Date Line going west. The date…", "moves ahead by one day", ["goes back one day", "stays the same", "goes back one week"], "Going west across the line, travellers skip ahead a day.", "✈️"),
  hq("Which tool would best help a planner choose where a new Arctic port might harm the fewest animals?", "a GIS map that layers shipping routes with wildlife habitats", ["a road map of a southern city", "a globe with no labels", "a list of capital cities"], "Layered data helps compare human activity and the environment.", "🚢"),
  hq("Why do historical maps of Canada look different from today's maps?", "borders, names and knowledge of the land have changed over time", ["the continents were in different places 200 years ago", "old maps are always wrong", "the oceans were smaller"], "Maps record what people knew and decided at the time.", "📜"),
];

export const units: Unit[] = [
  {
    id: "sk-north-pacific",
    title: "The North & the Pacific Rim",
    emoji: "🧭",
    blurb: "Circumpolar countries, the Pacific, and maps that tell different stories",
    standards: { "ca-sk": sk("DR7.1–DR7.3, IN7.1", "maps, northern Canada and the circumpolar and Pacific Rim countries, and the connections between people and environments") },
    parentNote: "Where the circumpolar and Pacific Rim countries are, how the environment shapes life in the north, why different maps tell different stories, and how countries work together on shared issues.",
    generate: bankUnit(NORTH, { sorts: [REGION_SORT] }),
  },
  {
    id: "sk-democracy-7",
    title: "Democracy & Other Systems",
    emoji: "🗳️",
    blurb: "How Canada governs itself, and how other systems differ",
    standards: { "ca-sk": sk("PA7.1–PA7.3", "sources of power, how democratic government works in Canada, and the strengths and weaknesses of democracy, oligarchy and dictatorship") },
    parentNote: "Sources of power for individuals and nations, the parts of Canada's federal government and how a bill becomes law, and comparing democracy, oligarchy and dictatorship.",
    generate: bankUnit(DEMOCRACY, { sorts: [SYSTEM_SORT] }),
  },
  {
    id: "sk-trade-7",
    title: "Trade, Resources & Globalization",
    emoji: "🚢",
    blurb: "Barter, sharing, exports and caring for the environment",
    standards: { "ca-sk": sk("RW7.1–RW7.3, IN7.2, IN7.3", "traditional economies, how resources shape economies, globalization and technology, and ecological stewardship") },
    parentNote: "Barter, trade and sharing in traditional economies, how resources affect economies in Canada and other countries, how technology links the world, and how economies care for the environment.",
    generate: bankUnit(ECONOMY),
  },
  {
    id: "sk-maps-time-7",
    title: "Maps, Coordinates & Time Zones",
    emoji: "🌐",
    blurb: "Latitude, longitude, map types and world time",
    standards: { "ca-sk": sk("DR7.1", "using different types of maps, latitude and longitude, scale and time zones to locate places in Canada and in Pacific Rim and circumpolar countries") },
    parentNote: "Latitude and longitude, hemispheres, map scale, time zones and the International Date Line, and choosing the right type of map (political, physical, thematic, topographic, GIS) for a question.",
    generate: bankUnit(MAPS, { sorts: [HEMISPHERE_SORT], makers: [timeZoneQuestion, scaleQuestion] }),
  },
];
