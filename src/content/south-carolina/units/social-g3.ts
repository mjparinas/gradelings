import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Carolina's own Grade 3 social studies units (`sc-` ids), for World Geography: natural hazards around the world,
// who is most at risk and how communities plan for them (3.3.1.ER, 3.3.2.ER, 3.3.3.AG), and why people explore and
// migrate, and how that changes places (3.5.1.HS to 3.5.4.AG).

const HAZARDS: Q[] = [
  ["A huge, spinning storm that forms over warm ocean water is a…", "hurricane", ["blizzard", "drought", "landslide"], "It brings strong wind and heavy rain to coasts."],
  ["A sudden shaking of the ground is an…", "earthquake", ["eclipse", "avalanche", "tide"], "It happens when rock moves along a fault."],
  ["A giant ocean wave caused by an earthquake under the sea is a…", "tsunami", ["tornado", "hurricane", "geyser"], "It can flood coasts far away."],
  ["A long time with very little rain is a…", "drought", ["flood", "tsunami", "blizzard"], "Crops can dry up."],
  ["A spinning column of air that reaches down from a thunderstorm is a…", "tornado", ["tsunami", "volcano", "drought"], "It can form quickly over land."],
  ["Hot melted rock bursting out of a mountain is a…", "volcanic eruption", ["flood", "blizzard", "hurricane"], "The melted rock is called lava."],
  ["Hurricanes are a hazard for South Carolina because the state is…", "on the Atlantic coast", ["in the desert", "high in the Rocky Mountains", "near the North Pole"], "Hurricanes form over warm ocean water."],
  ["Many earthquakes and volcanoes are found around the edge of the Pacific Ocean, in a zone called the…", "Ring of Fire", ["Great Plains", "Sahara", "Equator"], "Japan and Chile are on it."],
  ["Which country has many earthquakes and volcanoes?", "Japan", ["Egypt", "Denmark", "Sweden"], "It is a group of islands on the Ring of Fire."],
  ["Heavy rain makes a river rise over its banks. This is a…", "flood", ["drought", "earthquake", "volcano"], "Too much water."],
  ["What should be in a family's hurricane safety kit?", "water, food, a flashlight and medicine", ["only toys", "ice skates", "nothing"], "Things you need if the power goes out."],
  ["When leaders tell people on the coast to leave before a hurricane, it is called an…", "evacuation", ["election", "invention", "celebration"], "Leaving to stay safe."],
  ["During an earthquake, you should…", "drop, cover and hold on", ["run outside right away", "stand by a window", "climb a tree"], "Get under a sturdy table."],
  ["During a tornado warning, the safest place is…", "a small room on the lowest floor, away from windows", ["outside in a field", "on the roof", "in a car on the bridge"], "Put walls between you and the storm."],
  ["Scientists who track hurricanes and warn people are…", "meteorologists", ["farmers", "artists", "pilots"], "They study weather."],
  ["A map that shows where hurricanes have hit most often helps people…", "plan where and how to build", ["pick a favorite color", "count their toys", "find buried treasure"], "Maps show patterns.", true],
  ["Why can a poor town be harder hit by a disaster than a rich one?", "it may have weaker buildings and less money to rebuild", ["disasters only hit poor towns", "rich towns never have storms", "it has more mountains"], "Some people have fewer ways to get ready.", true],
  ["Why are people who live on low land near the ocean at more risk from hurricanes?", "storm waves can flood low land", ["the ocean is quieter there", "hurricanes avoid the coast", "low land is always dry"], "Water rushes in where land is low.", true],
  ["Building houses up on tall posts near the beach helps protect them from…", "flooding", ["earthquakes only", "volcanoes", "droughts"], "Water flows under the house.", true],
  ["A map key shows that red dots are earthquakes. Most red dots are around the Pacific Ocean. What can you conclude?", "earthquakes happen most often around the Pacific", ["earthquakes never happen", "the Pacific has no water", "red is the best color"], "Look for where the dots cluster.", true],
  ["A school's safety plan for disasters should include…", "where to go and how to stay together", ["which snacks to sell", "the class reading list", "the lunch menu"], "A plan tells people what to do.", true],
  ["Why do people still live near volcanoes?", "the soil can be very good for farming", ["volcanoes are quiet forever", "lava is cool", "there is nowhere else"], "Ash makes rich soil.", true],
  ["Which hazard can people help prevent by being careful with campfires?", "wildfire", ["earthquake", "hurricane", "tsunami"], "Most fires are started by people.", true],
  ["After a disaster, communities around the world often…", "send help, food and supplies", ["ignore it", "move the ocean", "stop all trade forever"], "People help each other.", true],
];

const EXPLORE_MIGRATE: Q[] = [
  ["A person who travels to find out about new places is an…", "explorer", ["inventor", "mayor", "author"], "They go where few have gone."],
  ["People moving from one place to live in another is called…", "migration", ["recycling", "voting", "exploration"], "Birds do it too."],
  ["Christopher Columbus sailed across the Atlantic Ocean in…", "1492", ["1776", "1865", "1969"], "He was looking for a sea route to Asia."],
  ["Many European explorers sailed west looking for a faster route to…", "Asia, for spices and silk", ["the North Pole", "Antarctica", "the Moon"], "Spices were worth a lot."],
  ["Ferdinand Magellan's crew were the first to…", "sail all the way around the world", ["reach the Moon", "cross the Sahara", "climb Mount Everest"], "The trip took about three years."],
  ["Explorers who wanted gold and riches had a…", "economic reason to explore", ["weather reason to explore", "sports reason to explore", "no reason at all"], "Economic means about money."],
  ["Some explorers wanted to spread their religion. That is a…", "religious reason", ["weather reason", "music reason", "food reason"], "It is about beliefs."],
  ["Sir Edmund Hillary and Tenzing Norgay were the first to climb…", "Mount Everest", ["Mount Rushmore", "a volcano in Japan", "a sand dune"], "It is the world's tallest mountain."],
  ["Roald Amundsen led the first people to reach the…", "South Pole", ["Moon", "Amazon River", "Sahara Desert"], "It is in Antarctica."],
  ["Astronauts are explorers of…", "space", ["the ocean floor only", "deserts", "caves"], "They ride rockets."],
  ["A push factor is a reason people…", "leave a place", ["stay in a place", "visit a place for fun", "draw a map"], "It pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "sleep", "vote"], "It pulls them in."],
  ["War, drought and too few jobs are…", "push factors", ["pull factors", "landforms", "holidays"], "They make people leave."],
  ["Good jobs, safety and family nearby are…", "pull factors", ["push factors", "natural hazards", "landforms"], "They draw people to a place."],
  ["People forced to flee their country to stay safe are…", "refugees", ["tourists", "explorers", "astronauts"], "They often leave because of war."],
  ["When people migrate, they bring their…", "food, language and customs", ["mountains", "oceans", "weather"], "They bring their culture."],
  ["Many cities grow because people move there for…", "jobs", ["snow", "quiet", "fewer schools"], "Work pulls people in."],
  ["A map with arrows from one continent to another most likely shows…", "migration or exploration routes", ["the weather today", "how tall mountains are", "a city's streets"], "Arrows show movement.", true],
  ["Vikings from Scandinavia reached North America about 1,000 years ago, nearly 500 years before…", "Columbus", ["George Washington", "the first airplane", "the first astronaut"], "Leif Erikson led them.", true],
  ["Why did exploration change life for peoples already living in the Americas?", "Europeans brought new diseases and took land", ["nothing changed", "they all became explorers", "the oceans dried up"], "Contact had big effects.", true],
  ["Plants, animals and ideas moving between the Americas and Europe after 1492 is called the…", "Columbian Exchange", ["Silk Road", "Great Migration", "Space Race"], "It is named after Columbus.", true],
  ["When many new families move into a town, the town might need…", "more schools and houses", ["fewer roads", "no stores", "a smaller hospital"], "More people need more services.", true],
  ["Marco Polo traveled from Europe to…", "China", ["Australia", "Antarctica", "the Arctic"], "He wrote about the court of Kublai Khan.", true],
  ["Why do scientists explore the deep ocean today?", "to learn about places and living things no one has seen", ["to find dragons", "to stop the tides", "to build cities on the sea floor"], "Much of the ocean is unexplored.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "sc-g3-natural-hazards",
    title: "Natural Hazards",
    emoji: "🌀",
    blurb: "Hurricanes, earthquakes and floods around the world, and staying safe",
    parentNote:
      "Natural hazards such as hurricanes, earthquakes, tsunamis, tornadoes, floods and droughts, where around the world they happen most, why some people are more at risk, and what goes in a disaster safety plan.",
    standards: ["3.3.1.ER; 3.3.2.ER; 3.3.3.AG", "natural hazards around the world, patterns in where they happen, and planning for safety"],
    items: HAZARDS,
  }),
  bankUnit({
    id: "sc-g3-explore-migrate",
    title: "Explorers & Migration",
    emoji: "🧭",
    blurb: "Why people explore, why they move, and how places change",
    parentNote:
      "Why people explore Earth (riches, trade, religion and curiosity), famous explorers, push and pull factors that make people migrate, and how migration changes places.",
    standards: ["3.5.1.HS; 3.5.2.AG; 3.5.3.HS; 3.5.4.AG", "why people explore and migrate, mapping their routes, and how migration changes places"],
    items: EXPLORE_MIGRATE,
  }),
];
