import { pick, sample, textChoice } from "../../random";
import type { Question, Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from, fromItems, mixUnit, type Difficulty } from "./kit";

// New York's own Grade 3 social units (`ny-` ids), from the NYS K-12 Social Studies Framework ("Communities around the
// World"): geography tools and world locations, world communities and how they live, governments and human rights,
// economies and trade, and a copy of California's culture unit with California's items left out and world-culture
// items added. The framework lets teachers pick the world communities, so these use a spread of countries from
// different continents. Content stays factual and neutral.

// ---------------------------------------------------------------------------------------------------------------
// Globes and maps

const CONTINENTS = ["Africa", "Asia", "Europe", "North America", "South America", "Australia", "Antarctica"] as const;

/** Countries and the continent each is on (none straddles two). */
const COUNTRY_CONTINENT: readonly (readonly [string, (typeof CONTINENTS)[number]])[] = [
  ["Japan", "Asia"],
  ["India", "Asia"],
  ["China", "Asia"],
  ["South Korea", "Asia"],
  ["Vietnam", "Asia"],
  ["the Philippines", "Asia"],
  ["Kenya", "Africa"],
  ["Ghana", "Africa"],
  ["Nigeria", "Africa"],
  ["Ethiopia", "Africa"],
  ["South Africa", "Africa"],
  ["Brazil", "South America"],
  ["Peru", "South America"],
  ["Argentina", "South America"],
  ["Colombia", "South America"],
  ["Chile", "South America"],
  ["Mexico", "North America"],
  ["Jamaica", "North America"],
  ["the Dominican Republic", "North America"],
  ["Guatemala", "North America"],
  ["France", "Europe"],
  ["Italy", "Europe"],
  ["Greece", "Europe"],
  ["Ireland", "Europe"],
  ["Poland", "Europe"],
  ["Norway", "Europe"],
];

function continentQuestions(n: number): Question[] {
  return sample(COUNTRY_CONTINENT, n).map(([country, continent]) =>
    textChoice(
      `On which continent is ${country}?`,
      continent,
      sample(
        CONTINENTS.filter((c) => c !== continent),
        3,
      ),
      `Find ${country} on a world map, then name the large land mass it is on.`,
    ),
  );
}

/** Cities clearly away from the equator and the prime meridian: [city, north?, east?]. */
const CITIES: readonly (readonly [string, boolean, boolean])[] = [
  ["New York City", true, false],
  ["Tokyo", true, true],
  ["Cairo", true, true],
  ["Mexico City", true, false],
  ["Beijing", true, true],
  ["Mumbai", true, true],
  ["Moscow", true, true],
  ["Lima", false, false],
  ["Buenos Aires", false, false],
  ["Rio de Janeiro", false, false],
  ["Sydney", false, true],
  ["Cape Town", false, true],
  ["Santiago", false, false],
  ["Johannesburg", false, true],
];

function hemisphereQuestions(n: number): Question[] {
  return sample(CITIES, n).map(([city, north, east]) =>
    pick([true, false])
      ? textChoice(
          `Is ${city} in the Northern Hemisphere or the Southern Hemisphere?`,
          north ? "the Northern Hemisphere" : "the Southern Hemisphere",
          [north ? "the Southern Hemisphere" : "the Northern Hemisphere"],
          "The equator divides Earth into a northern half and a southern half. Look at which side the city is on.",
        )
      : textChoice(
          `Is ${city} in the Eastern Hemisphere or the Western Hemisphere?`,
          east ? "the Eastern Hemisphere" : "the Western Hemisphere",
          [east ? "the Western Hemisphere" : "the Eastern Hemisphere"],
          "The prime meridian divides Earth into an eastern half and a western half. The Americas are in the western half.",
        ),
  );
}

const MAP_TOOLS: Q[] = [
  ["Most of Earth's surface is covered by…", "water", ["sand", "ice", "cities"], "Look at a globe: it is mostly blue."],
  ["How many continents are there?", "7", ["5", "4", "10"], "Africa, Antarctica, Asia, Australia, Europe, North America, South America."],
  ["Which is the largest ocean?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"], "It lies between Asia and the Americas."],
  ["Which ocean is between North America and Europe?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Southern Ocean"], "Ships from New York cross it to reach Europe."],
  ["The equator is an imaginary line that…", "circles Earth halfway between the poles", ["runs from pole to pole", "marks the edge of the ocean", "divides two countries"], "It is the 0° line of latitude."],
  ["The prime meridian runs from…", "the North Pole to the South Pole", ["east to west around the middle", "New York to Japan", "one ocean to the next"], "It is the 0° line of longitude."],
  ["Lines of latitude are also called…", "parallels", ["meridians", "borders", "highways"], "They run side by side and never meet."],
  ["Lines of longitude are also called…", "meridians", ["parallels", "rivers", "scales"], "They meet at the poles."],
  ["The equator divides Earth into the…", "Northern and Southern Hemispheres", ["Eastern and Western Hemispheres", "land and water", "day and night"], "Hemi means half."],
  ["The prime meridian helps divide Earth into the…", "Eastern and Western Hemispheres", ["Northern and Southern Hemispheres", "seven continents", "five oceans"], "It runs north to south."],
  ["The United States is in which two hemispheres?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern", "Southern and Western"], "It is north of the equator and west of the prime meridian."],
  ["A map key, or legend, tells you…", "what the symbols mean", ["who drew the map", "what time it is", "how old the map is"], "Look for the box of symbols."],
  ["A compass rose on a map shows…", "directions", ["distances", "the weather", "the population"], "N, S, E and W."],
  ["A map scale helps you figure out…", "real distances between places", ["the temperature", "which way is north", "what symbols mean"], "It is often a small bar with numbers."],
  ["A map's title tells you…", "what the map shows", ["how far apart places are", "which way is east", "what a symbol means"], "It is usually at the top."],
  ["Letters and numbers along the edges of a map make a…", "grid", ["scale", "compass rose", "legend"], "You can find square B3."],
  ["A photo of Earth taken from space is a…", "satellite image", ["timeline", "biography", "postcard"], "Satellites circle Earth."],
  ["Which shows the whole Earth without stretching the shapes?", "a globe", ["a city map", "a road map", "a floor plan"], "It is round like Earth."],
  ["Why do flat world maps stretch some places?", "Earth is round and the map is flat", ["mapmakers make mistakes on purpose", "countries change size", "the oceans move"], "Try flattening an orange peel."],
  ["Which continent is at the South Pole?", "Antarctica", ["Australia", "South America", "Africa"], "It is covered in ice."],
  ["Which continent is the United States on?", "North America", ["South America", "Europe", "Asia"], "Mexico is on it too."],
  ["Which is the largest continent?", "Asia", ["Europe", "Australia", "Antarctica"], "China and India are on it."],
  ["Places near the equator are usually…", "warm all year", ["frozen all year", "dark all year", "snowy in summer"], "The sun shines strongly there."],
  ["Places near the poles are usually…", "cold", ["hot", "rainy jungles", "deserts of hot sand"], "Think of ice and snow."],
  ["A region is an area with…", "features in common", ["no people", "only one house", "no name"], "It might share land, climate or language."],
  ["Which tells the relative location of Mexico?", "south of the United States", ["at 10 Main Street", "in the Pacific Ocean", "in the middle of Europe"], "Relative location tells where a place is compared with another.", true],
  ["Which is the smallest ocean?", "the Arctic Ocean", ["the Pacific Ocean", "the Atlantic Ocean", "the Indian Ocean"], "It is around the North Pole.", true],
  ["A physical map mainly shows…", "landforms and bodies of water", ["countries' leaders", "bus routes", "how many people vote"], "Think mountains, rivers and lakes.", true],
  ["A political map mainly shows…", "countries, states and their borders", ["only mountains", "only the weather", "ocean depths"], "It shows lines between places.", true],
];

// ---------------------------------------------------------------------------------------------------------------
// World communities

const WORLD_COMMUNITIES: Q[] = [
  ["Japan is a country made up of many…", "islands", ["deserts", "lakes", "canyons"], "It is surrounded by water."],
  ["Because Japan is near the ocean, many people there eat…", "fish and seafood", ["mostly cactus", "only wheat", "camel milk"], "Coastal communities fish."],
  ["Tokyo, the capital of Japan, is a very…", "large city", ["small farm town", "empty desert", "quiet island with no people"], "Millions of people live there."],
  ["The main language of Brazil is…", "Portuguese", ["Japanese", "Russian", "Swahili"], "Explorers from Portugal brought it long ago."],
  ["Most of the Amazon rainforest is in…", "Brazil", ["Egypt", "Norway", "Japan"], "It is in South America."],
  ["Many people in Kenya speak Swahili and…", "English", ["Japanese", "Portuguese", "Greek"], "Both are official languages there."],
  ["Most people in Egypt live near the…", "Nile River", ["Amazon River", "Hudson River", "Mississippi River"], "Much of Egypt is desert, so the river is important."],
  ["Why do most people in Egypt live near the river?", "it gives water for farming and drinking", ["the desert is too crowded", "the river is cold", "mountains are there"], "Water is a basic need."],
  ["The main language of Mexico is…", "Spanish", ["French", "Hindi", "Korean"], "It is spoken in much of Latin America."],
  ["India is a country where people speak…", "many different languages", ["only one language", "no languages", "only English"], "Hindi is the most widely spoken."],
  ["Diwali, the festival of lights, is celebrated by many people in…", "India", ["Norway", "Peru", "Ireland"], "Families light small lamps."],
  ["Lunar New Year is a big celebration in…", "China, Korea and Vietnam", ["Brazil and Peru", "Kenya and Ghana", "Ireland and France"], "It follows the moon's calendar."],
  ["People in the high Andes Mountains of Peru often raise…", "llamas and alpacas", ["camels", "kangaroos", "penguins"], "Their wool keeps people warm."],
  ["The Andes Mountains are on which continent?", "South America", ["Africa", "Europe", "Asia"], "Peru and Chile are there."],
  ["Stories about Anansi the spider come from…", "Ghana in West Africa", ["Japan", "Norway", "Mexico"], "They are told to teach lessons."],
  ["Folktales and legends help a community…", "pass its history and values to children", ["predict the weather", "pay taxes", "build roads"], "They are told from one generation to the next."],
  ["Why do people often settle near rivers?", "for water, food and travel", ["rivers are noisy", "rivers keep people away", "rivers are dry"], "Rivers meet basic needs."],
  ["Which might stop people from settling in a place?", "a very dry desert", ["fresh water", "rich soil", "a mild climate"], "Think about what people need to live."],
  ["People in very cold places build homes that…", "keep heat inside", ["have no walls", "let snow in", "are made of paper"], "They adapt to the climate."],
  ["People in rainy places may build houses on stilts to…", "stay above floodwater", ["catch fish in the kitchen", "keep warm", "see the stars"], "Water can rise."],
  ["Farmers in some hilly places cut steps into hillsides to…", "grow rice on flat land", ["make slides", "build roads to the moon", "stop the rain"], "These steps are called terraces."],
  ["Changing the land, like building a dam, is called…", "modifying the environment", ["adapting a story", "voting", "trading"], "People change the environment to meet needs."],
  ["Cutting down forests can have the unintended effect of…", "taking away animals' homes", ["making more trees", "cleaning the air", "making rivers bigger"], "Trees are habitats."],
  ["Children in many countries wear school uniforms. This shows schools can be…", "alike and different around the world", ["all exactly the same", "closed everywhere", "only for adults"], "Some schools have uniforms and some do not."],
  ["Families around the world are alike because they…", "care for each other", ["eat the same food", "speak the same language", "live in the same kind of home"], "Love and care are shared."],
  ["Holi, a spring festival of colors, is celebrated by many people in…", "India", ["Ireland", "Argentina", "Norway"], "People throw colored powder.", true],
  ["Carnival, with music, dancing and parades, is a famous festival in…", "Brazil", ["Japan", "Egypt", "Poland"], "People wear bright costumes.", true],
  ["Norway has long, dark winters because it is far…", "north", ["south", "below the sea", "from any ocean"], "It is close to the Arctic.", true],
  ["Many people in Kenya and Ethiopia grow…", "coffee and tea", ["apples in snow", "wheat on glaciers", "rice in deserts"], "These crops like warm, high land.", true],
  ["Which is an example of a community's art?", "its music, dance and stories", ["its bus schedule", "its tax forms", "its street signs"], "Art grows through a community's history.", true],
];

// ---------------------------------------------------------------------------------------------------------------
// Governments and human rights

const GOVERNMENT_RIGHTS: Q[] = [
  ["The government of the United States is a…", "democracy", ["monarchy with no voting", "dictatorship", "kingdom of one family"], "The people choose their leaders."],
  ["In a democracy, citizens choose leaders by…", "voting", ["fighting", "guessing", "buying the job"], "Each citizen has a voice."],
  ["A country led by a king or queen is a…", "monarchy", ["democracy", "republic", "council"], "Mono means one."],
  ["A dictatorship is a government where…", "one ruler has all the power", ["everyone votes on every law", "there are no leaders", "children make the laws"], "Citizens have little say."],
  ["Some countries have a king or queen and also…", "elect leaders to make laws", ["have no laws", "have no citizens", "have no schools"], "The United Kingdom and Japan are examples."],
  ["In Australia, adults are required by law to…", "vote in elections", ["live on a farm", "own a kangaroo", "speak French"], "Voting is a duty there."],
  ["Governments everywhere make laws to…", "keep order and keep people safe", ["stop all fun", "make people poor", "close schools"], "Laws protect people."],
  ["The leader of the United States is the…", "president", ["king", "emperor", "mayor"], "This leader is elected every four years."],
  ["A citizen is…", "a member of a country or community", ["a visitor for one day", "a kind of building", "a type of money"], "Citizens have rights and responsibilities."],
  ["Which is a responsibility of a citizen in a democracy?", "obeying laws and voting", ["breaking rules", "ignoring neighbors", "never helping"], "Citizens take part."],
  ["Human rights are rights that…", "every person has", ["only rich people have", "only adults have", "only leaders have"], "They belong to everyone."],
  ["Which is a human right?", "having food and shelter", ["owning a pony", "having a big TV", "eating dessert first"], "It is a basic need."],
  ["Every child has the right to…", "go to school", ["drive a car", "stay up all night", "skip meals"], "Learning is a right."],
  ["The Universal Declaration of Human Rights was written by the…", "United Nations", ["city council", "school board", "post office"], "Many countries worked on it in 1948."],
  ["The United Nations is a group of…", "countries working together", ["schools", "sports teams", "stores"], "Its headquarters is in New York City."],
  ["Prejudice means…", "judging people unfairly before knowing them", ["helping a neighbor", "sharing lunch", "learning a language"], "Pre means before."],
  ["Discrimination means…", "treating people unfairly because of who they are", ["treating everyone the same", "making a new friend", "voting"], "It is an unfair action."],
  ["Which is an example of discrimination?", "not letting someone play because of their skin color", ["taking turns on a swing", "sharing crayons", "helping a new student"], "It treats someone unfairly."],
  ["When people see unfair treatment, they can…", "speak up and ask for change", ["laugh along", "join in", "look away"], "This is social action."],
  ["Writing letters to leaders to change an unfair rule is…", "social action", ["littering", "a holiday", "a map"], "It is a peaceful way to bring change."],
  ["Malala Yousafzai worked for the right of girls to…", "go to school", ["drive buses", "play video games", "eat candy"], "She is from Pakistan."],
  ["Nelson Mandela worked to end unfair laws that separated people by race in…", "South Africa", ["Japan", "Norway", "Peru"], "He later became that country's president."],
  ["Martin Luther King Jr. used peaceful protest to work for…", "equal rights", ["more holidays", "bigger roads", "new flags"], "He spoke about a dream."],
  ["Governments and citizens both have a duty to…", "protect human rights", ["ignore human rights", "take away rights", "sell rights"], "Everyone shares this job."],
  ["Leaders in different countries are chosen in…", "different ways", ["exactly the same way", "no way at all", "a single contest"], "Some are elected and some are not.", true],
  ["In some countries, citizens have a bigger role in government than in others because…", "they can vote and speak freely", ["they are taller", "they live near the sea", "they have more snow"], "Rights to vote and speak matter.", true],
  ["Fairness and equality mean that all people…", "have the same rights", ["have the same name", "like the same food", "wear the same clothes"], "No one should be left out.", true],
  ["A peaceful march to ask for fair treatment is a…", "protest", ["parade for a sports team", "school recess", "census"], "People gather to make their voices heard.", true],
];

// ---------------------------------------------------------------------------------------------------------------
// Economies and trade

const TRADE_ECONOMIES: Q[] = [
  ["Every community must decide what to produce, how to produce it, and…", "who gets what is produced", ["what color it is", "when it rains", "who sings best"], "These are the three economic questions."],
  ["Natural resources are…", "things from nature that people use", ["things made in factories", "jobs people do", "money in a bank"], "Water, soil and trees are examples."],
  ["Human resources are…", "the people who do the work", ["rivers and lakes", "rocks and soil", "coins and bills"], "Workers and their skills."],
  ["Trade is…", "exchanging goods and services", ["throwing things away", "making a map", "a kind of weather"], "One community gives something to get something."],
  ["Why do communities trade with each other?", "to get things they cannot make or grow", ["to get rid of everything", "to stop working", "because trading is a rule"], "No place has everything."],
  ["Goods brought into a country from another country are…", "imports", ["exports", "taxes", "wages"], "Im means in."],
  ["Goods sent out of a country to sell are…", "exports", ["imports", "taxes", "rights"], "Ex means out."],
  ["A surplus means a community has…", "more than it needs", ["less than it needs", "nothing at all", "only money"], "Extra can be traded."],
  ["Scarcity means…", "there is not enough of something", ["there is too much of everything", "something is free", "a store is open"], "Wants are bigger than what is there."],
  ["Bananas grow where it is warm. How do they reach stores in New York?", "by ship, train and truck", ["by bike", "they grow in the store", "by mail carrier on foot"], "Goods travel long distances."],
  ["Big container ships help communities…", "trade goods across oceans", ["make rain", "vote", "build mountains"], "They carry boxes of goods."],
  ["The internet has made it easier for people around the world to…", "communicate and trade", ["grow taller", "stop the rain", "move mountains"], "Messages travel fast."],
  ["Coffee grows well in warm, high places such as…", "Colombia and Ethiopia", ["Antarctica and Norway", "the Arctic", "the moon"], "It needs warmth and rain."],
  ["A community near the ocean might earn a living by…", "fishing", ["mining glaciers", "herding camels", "growing rice in a desert"], "Use the nearby resource."],
  ["A community with rich soil might earn a living by…", "farming", ["fishing in the desert", "skiing", "mining the sky"], "Soil grows crops."],
  ["Different countries use different money. Japan uses the…", "yen", ["dollar", "peso", "rupee"], "Each country has its own currency."],
  ["Mexico uses money called the…", "peso", ["yen", "euro", "rupee"], "It is also used in some other Spanish-speaking countries."],
  ["India uses money called the…", "rupee", ["peso", "yen", "dollar"], "Its name comes from an old word for silver."],
  ["Many countries in Europe share money called the…", "euro", ["peso", "yen", "rupee"], "France, Italy and Greece use it."],
  ["A factory worker who makes shoes produces a…", "good", ["service", "right", "law"], "You can hold shoes."],
  ["A tour guide in Italy provides a…", "service", ["good", "tax", "map key"], "It is work done for people."],
  ["Long ago, goods were carried far away by camels and sailing ships. Today they also go by…", "airplanes and trucks", ["kites", "bicycles only", "hot-air balloons only"], "Transportation has changed.", true],
  ["When a country makes more food than it needs, it might…", "sell the extra to other countries", ["throw it all away", "stop farming", "hide it"], "Surplus can be traded.", true],
  ["Specializing means a community…", "makes what it is best at", ["makes everything itself", "never trades", "has no jobs"], "Then it trades for the rest.", true],
  ["People earn a living by…", "working at a job", ["sleeping", "watching TV", "waiting"], "Work brings in money.", true],
  ["Cultural diffusion happens when…", "ideas, foods and goods spread between cultures", ["a culture stays the same forever", "people stop talking", "a river floods"], "Pizza and soccer spread around the world.", true],
];

const CULTURE_WORLD: Q[] = [
  ["Pizza first came from Italy and is now eaten around the world. This is…", "cultural diffusion", ["discrimination", "scarcity", "a monarchy"], "Ideas and foods spread between cultures."],
  ["Soccer is played in countries all over the world. This shows that ideas…", "spread between cultures", ["never change", "stay in one place", "are against the law"], "Games travel too."],
  ["Many neighborhoods in New York City have restaurants from around the world because…", "people brought their foods from many countries", ["everyone eats the same food", "food grows on buildings", "it is a rule"], "People bring their culture with them."],
  ["In many world communities, schools and families are…", "both alike and different from ours", ["all exactly like ours", "nothing like ours at all", "not important"], "Compare and contrast."],
  ["People in Mexico celebrate the Day of the Dead to…", "remember loved ones who have died", ["start the school year", "count the harvest", "elect a leader"], "Families share stories and favorite foods."],
  ["Which is part of a community's culture?", "its language, food and holidays", ["its rainfall", "its mountains", "its ocean"], "Culture is a way of life."],
];

export const UNITS: Unit[] = [
  mixUnit({
    id: "ny-g3-globes-and-maps",
    title: "Globes & World Maps",
    emoji: "🌐",
    blurb: "Continents, oceans and hemispheres",
    parentNote:
      "Continents and oceans, the equator, prime meridian and hemispheres, map tools such as the title, key, compass rose, grid and scale, and finding world communities on a map or globe.",
    standards: [
      "3.1a; 3.1b; 3.2a; 3.2b",
      "Earth's land and water, the tools on maps and globes, and locating world communities by continent, hemisphere and the equator and prime meridian",
    ],
    make: (d: Difficulty) => [...continentQuestions(3), ...hemisphereQuestions(2), ...fromItems(MAP_TOOLS, 3, d)],
  }),
  bankUnit({
    id: "ny-g3-world-communities",
    title: "Communities Around the World",
    emoji: "🌏",
    blurb: "How people live in world communities",
    parentNote:
      "Communities in countries such as Japan, Brazil, Kenya, Egypt, India, Mexico and Peru: where people settle and why, how they adapt to and change their environment, languages, festivals, folktales and families.",
    standards: [
      "3.3a; 3.3b; 3.4a; 3.4b; 3.5a; 3.5b",
      "where world communities settle, how they adapt to and change their environment, and their stories, arts, languages and celebrations",
    ],
    items: WORLD_COMMUNITIES,
  }),
  bankUnit({
    id: "ny-g3-governments-rights",
    title: "Governments & Human Rights",
    emoji: "⚖️",
    blurb: "Kinds of government and fair treatment",
    parentNote:
      "Democracy, monarchy and dictatorship, how leaders are chosen around the world, the role of citizens, human rights, prejudice and discrimination, and peaceful ways people work for change.",
    standards: [
      "3.7a; 3.7b; 3.7d; 3.8a; 3.8b; 3.8c",
      "how governments around the world choose leaders and make laws, the role of citizens, human rights, and taking action against prejudice and discrimination",
    ],
    items: GOVERNMENT_RIGHTS,
  }),
  bankUnit({
    id: "ny-g3-trade",
    title: "Trade Around the World",
    emoji: "🚢",
    blurb: "Resources, money and trade",
    parentNote:
      "Natural and human resources, the three economic questions, surplus and scarcity, how communities earn a living, money in other countries, and how ships, planes and the internet help communities trade.",
    standards: [
      "3.9a; 3.9b; 3.10a; 3.10b",
      "how world communities use resources, earn a living, produce goods and services, and trade with each other",
    ],
    items: TRADE_ECONOMIES,
  }),
  copyOf(
    from(CALIFORNIA, "ca-g3-culture"),
    {
      id: "ny-g3-culture",
      title: "Culture & Traditions",
      emoji: "🎎",
      blurb: "Ways of life and how ideas spread",
      parentNote:
        "What culture is, cultural universals such as food, shelter and language, traditions, diversity, and how foods, games and ideas spread between communities.",
      standards: [
        "3.5b; 3.6a",
        "the languages, customs and celebrations of communities around the world, and how cultures share ideas, goods and foods",
      ],
    },
    CULTURE_WORLD,
  ),
];
