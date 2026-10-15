import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Alaska Grade 7 social studies, World History and Geography: the Alaska connections the Grade 7 standards ask for.
// Earth's physical systems, landforms and biomes with Alaska as the local example (SS.7.1.18.1, SS.7.1.18.4,
// SS.7.4.17.2), the circumpolar north and Alaska's place in the global economy (SS.7.1.16.3, SS.7.4.16.2, SS.7.1.16.1),
// and Russia's empire reaching America (SS.7.3.16.4, SS.7.3.16.2, SS.7.4.23.2, SS.7.4.24.1). Indigenous content is
// light, in the present tense, about living communities, with nothing sacred or ceremonial.

const LANDFORMS: Q[] = [
  ["A glacier moving down a valley carves it into the shape of a…", "U", ["V", "W"], "Rivers carve V-shaped valleys; glaciers carve U-shaped ones."],
  ["A long, narrow inlet of the sea carved by a glacier is a…", "fjord", ["delta", "mesa"], "Kenai Fjords National Park is named for them."],
  ["A ridge of rock and gravel left behind by a melting glacier is a…", "moraine", ["sand dune", "coral reef"], "Glaciers push and drop rock as they move."],
  ["About how many glaciers does Alaska have?", "about 100,000", ["about 10", "about 1,000,000,000"], "Most are small and unnamed."],
  ["The Hubbard Glacier flows into the sea. A glacier that ends in the ocean is a…", "tidewater glacier", ["hanging valley", "sand spit"], "Ice breaks off its face into the water."],
  ["The Yukon-Kuskokwim Delta formed mainly by…", "rivers depositing sediment", ["volcanoes erupting", "glaciers carving rock"], "A delta builds up where a river slows and drops sand and mud."],
  ["The Aleutian volcanoes formed because…", "one tectonic plate sinks under another", ["meteors hit the islands", "rivers piled up rock"], "This is called subduction."],
  ["In 1912 Novarupta, in what is now Katmai National Park, had…", "the largest volcanic eruption of the 20th century", ["the first earthquake ever recorded", "no eruption at all"], "Ash fell on Kodiak for days."],
  ["Why do tides rise and fall about twice a day?", "the moon's gravity pulls on Earth's oceans as Earth spins", ["wind blows the water in and out", "rivers fill the sea"], "The sun's gravity adds to the pull."],
  ["The highest high tides, called spring tides, happen when…", "the sun, moon and Earth line up", ["it is spring", "the moon is far from the sun in the sky"], "They come at new moon and full moon."],
  ["Why do Alaska's seasons change so much in daylight?", "Earth's tilt matters more at high latitudes", ["Alaska is closer to the sun", "the moon blocks the sun in winter"], "Day length changes most near the poles."],
  ["The tundra biome has…", "low plants, permafrost and short summers", ["tall trees and warm winters", "cactus and sand"], "Tundra covers much of northern and western Alaska."],
  ["The boreal forest, or taiga, is mostly…", "spruce, birch and other cold-tolerant trees", ["palm trees", "grass with no trees"], "It is the largest land biome on Earth."],
  ["Southeast Alaska's temperate rainforest is like the tropical rainforest because both have…", "lots of rain", ["hot weather all year", "no trees"], "One is cool and one is warm, but both are wet."],
  ["Which biome would you find in the Sahara?", "desert", ["tundra", "taiga"], "Deserts get very little rain."],
  ["Why do tundra and desert both have few trees?", "both are short on something trees need, like warmth or water", ["both are too wet", "both have too many trees"], "Limits shape what grows.", true],
  ["How do the atmosphere, water and land interact to make a glacier?", "snow falls, piles up and presses into ice that flows downhill", ["the sun turns rock into ice", "ocean water freezes on mountaintops"], "Earth's systems work together.", true],
  ["Coastal erosion is speeding up in parts of western Alaska. Which two changes work together?", "less sea ice to block storm waves and thawing permafrost", ["more sea ice and colder ground", "fewer storms and more glaciers"], "Physical systems affect each other.", true],
  ["Why are Alaska's earthquakes and volcanoes found in a band along the south and west?", "that is where the Pacific Plate meets the North American Plate", ["those areas are coldest", "the ocean is shallow there"], "Plate boundaries mark hazard zones.", true],
  ["A U-shaped valley with a small stream in it most likely shows that…", "a glacier once filled the valley", ["a river carved it last year", "wind made it"], "The shape is evidence of the past.", true],
  ["Which pair of places share the same biome?", "interior Alaska and northern Russia", ["interior Alaska and the Amazon", "the Arctic coast and the Sahara"], "The boreal forest circles the northern world.", true],
  ["How can a biome map help explain where people farm?", "it shows where the growing season and rainfall allow crops", ["it shows phone signal strength", "it lists every city"], "Climate and biome shape land use.", true],
  ["Why does a delta make a good habitat for birds and fish?", "its wetlands are full of food and shelter", ["it has no water", "it is always frozen solid"], "The Yukon-Kuskokwim Delta is a major nesting ground.", true],
  ["How do scientists know glaciers once covered more of Alaska?", "they find moraines, U-shaped valleys and scratched rock far from today's ice", ["they read it in newspapers from 20,000 years ago", "there is no evidence"], "Landforms record the past.", true],
];

const CIRCUMPOLAR: Q[] = [
  ["The circumpolar north is…", "the region that circles the Arctic", ["the land around the equator", "the middle of Africa"], "Circum means around."],
  ["Which country is Alaska's closest neighbor across the Bering Strait?", "Russia", ["Japan", "Norway"], "Only about 50 miles of water separate the two at the narrowest point."],
  ["Little Diomede (United States) and Big Diomede (Russia) are about how far apart?", "about 2.5 miles", ["about 250 miles", "about 2,500 miles"], "The International Date Line runs between them."],
  ["Because the Date Line runs between the Diomedes, Big Diomede is…", "almost a full day ahead", ["one hour behind", "on the same day and time"], "It is sometimes called Tomorrow Island."],
  ["The Sámi people herd reindeer in northern…", "Norway, Sweden, Finland and Russia", ["Brazil and Peru", "Egypt and Sudan"], "Their homeland spans four countries."],
  ["St. Lawrence Island Yupik communities have relatives who live…", "across the Bering Strait in Chukotka, Russia", ["only in Hawaii", "in Antarctica"], "Families and languages cross the border."],
  ["The Arctic Council brings together…", "eight Arctic countries and six Indigenous organizations", ["every country in the world", "only scientists from one country"], "Indigenous organizations are Permanent Participants."],
  ["Which is one of the Indigenous Permanent Participants of the Arctic Council?", "the Gwich'in Council International", ["the World Bank", "the Olympic Committee"], "Gwich'in communities live in Alaska and the neighboring north."],
  ["How have many Arctic peoples adapted to cold climates?", "warm layered clothing, shelters suited to the land and food from the sea and land", ["by growing bananas", "by living only in caves"], "Each people adapts to its own environment."],
  ["Many Arctic communities today travel in winter by…", "snowmachine", ["camel", "gondola"], "Dog teams are still used too."],
  ["Why is the Arctic Ocean becoming more important for shipping?", "summer sea ice is shrinking", ["the ocean is getting deeper", "ships can now fly"], "Shorter routes between Asia and Europe may open."],
  ["Much of Alaska's seafood is sold to buyers in…", "Asia and other parts of the world", ["only Alaska", "only Antarctica"], "Alaska's seafood is a global export."],
  ["Anchorage's airport is one of the world's busiest for cargo because…", "it sits on short air routes between Asia and North America", ["it is the warmest airport", "it is on the equator"], "Planes stop to refuel and switch cargo."],
  ["Greenland is part of the Kingdom of…", "Denmark", ["Japan", "Mexico"], "Most people in Greenland are Indigenous Greenlanders."],
  ["Which country has the longest Arctic coastline?", "Russia", ["Iceland", "Finland"], "It stretches across northern Asia."],
  ["Why does Alaska make the United States an Arctic nation?", "part of Alaska lies north of the Arctic Circle", ["the US has a South Pole base", "it is cold in Florida"], "Utqiaġvik is the northernmost US city."],
  ["Reindeer herding in Alaska began in the 1890s with reindeer brought from…", "Siberia", ["Australia", "India"], "Some Alaska Native families herd reindeer today.", true],
  ["Why do people in different Arctic regions live in different ways?", "their land, resources, histories and governments differ", ["they all live the same way", "the Arctic is one country"], "Never treat all Arctic peoples as one.", true],
  ["What is one push factor that leads some Arctic residents to move to cities?", "few jobs and high costs in small villages", ["cities are colder", "villages have too many jobs"], "Push factors push people away.", true],
  ["How does melting sea ice affect Arctic communities that hunt on it?", "travel on the ice is less safe and hunting seasons change", ["it has no effect", "it makes hunting easier every year"], "Communities adapt to changes.", true],
  ["How can a storm in Asia affect prices in an Alaska village?", "it can delay shipments and raise the cost of goods", ["it cannot reach Alaska", "it lowers all prices"], "Global trade connects places.", true],
  ["Why do Arctic countries cooperate through the Arctic Council?", "they share problems like pollution, climate and safety at sea", ["they have no borders", "they want to stop all ships"], "Cooperation solves shared problems.", true],
  ["Cultural diffusion happens when…", "ideas and goods spread from one group to another", ["a culture stays completely isolated", "people forget their language"], "Trade and travel spread ideas.", true],
  ["Which idea best explains why Arctic and desert peoples both value sharing food?", "sharing helps families survive in places where food can be scarce", ["deserts and the Arctic have the same weather", "sharing is required by one world law"], "Similar challenges can shape similar values.", true],
];

const RUSSIA_EVENTS: Dated[] = [
  ["Russian explorers reach the Pacific coast of Siberia and found Okhotsk", 1647],
  ["Vitus Bering sails through the strait later named for him", 1728],
  ["Bering and Chirikov reach the coast of Alaska", 1741],
  ["Russian traders build a settlement at Three Saints Bay on Kodiak", 1784],
  ["Russian Orthodox missionaries arrive on Kodiak", 1794],
  ["The Russian-American Company receives its charter", 1799],
  ["Tlingit warriors destroy the Russian fort near Sitka", 1802],
  ["Russians return and win the Battle of Sitka", 1804],
  ["New Archangel (Sitka) becomes the capital of Russian America", 1808],
  ["Ivan Veniaminov arrives in Unalaska and helps write the Unangax̂ language", 1824],
  ["A smallpox epidemic begins in Russian America", 1835],
  ["Russia loses the Crimean War", 1856],
  ["Russia sells its claim to Alaska to the United States", 1867],
];

const RUSSIA_ITEMS: Q[] = [
  ["Why did Russian fur hunters push east across Siberia and the Bering Sea?", "to find more furs to sell", ["to find oil", "to build railroads"], "Sea otter furs sold for high prices in China."],
  ["Russian fur hunters who sailed to the Aleutians were called…", "promyshlenniki", ["conquistadors", "samurai"], "They worked for merchant companies."],
  ["How did Russian traders treat many Unangax̂ and Sugpiaq men?", "they forced them to hunt sea otters", ["they paid them in gold and left them alone", "they never met them"], "Families were sometimes held hostage."],
  ["The Russian-American Company was given control of…", "trade and settlement in Russian America", ["all of Europe", "the Pacific islands of the south"], "It was a company with powers like a government."],
  ["Which is a lasting sign of Russian America in Alaska today?", "Russian Orthodox churches in many communities", ["Russian is Alaska's main language", "Alaska uses rubles"], "Many Alaska Native families are Orthodox today."],
  ["Baranof Island is named after…", "Alexander Baranov, who managed the Russian-American Company", ["a Tlingit chief", "an American president"], "Place names record history."],
  ["Why did Russia decide to sell Alaska?", "it was far away, costly to defend and the fur trade had declined", ["gold was found in Moscow", "the US invaded Alaska"], "Losing the Crimean War also strained Russia."],
  ["What does the Battle of Sitka in 1802 and 1804 show about Russian control?", "Tlingit nations resisted Russian rule", ["everyone welcomed the Russians", "there was no conflict"], "Russian control never covered all of Alaska."],
  ["How did over-hunting change the fur trade?", "sea otters became scarce and profits fell", ["sea otters multiplied", "fur prices dropped to zero instantly"], "The resource changed over time.", true],
  ["Russia claimed Alaska, but how much of it did Russians actually control?", "mostly a few coastal trading posts", ["every village and river", "none of it at any time"], "Most Alaska Native nations governed themselves.", true],
  ["How did the smallpox epidemic of 1835 to 1838 affect Alaska Native communities?", "many people died", ["it had no effect", "it only affected Russian sailors"], "Diseases brought by outsiders spread quickly.", true],
  ["Why did empires such as Russia, Britain and Spain all send ships to the North Pacific in the 1700s?", "they competed to claim land and trade", ["they were on vacation", "they were looking for the South Pole"], "Competition drove exploration.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ak-g7-landforms-biomes",
    title: "Alaska's Landforms & Biomes",
    emoji: "🏔️",
    blurb: "Glaciers, volcanoes, tides and biomes, from Alaska to the world",
    parentNote: "World geography with Alaska as the local example: how glaciers, rivers and volcanoes shape land, how the moon and Earth's tilt cause tides and seasons, and how tundra, boreal forest and rainforest compare with biomes around the world.",
    standards: ["SS.7.1.18.1; SS.7.1.18.4; SS.7.4.17.2; SS.7.1.18.3", "the earth, sun, moon, tides and seasons locally and globally, how landforms form by glaciation, deposition and volcanic processes, and the world's biomes"],
    items: LANDFORMS,
  }),
  bankUnit({
    id: "ak-g7-circumpolar-north",
    title: "The Circumpolar North",
    emoji: "🧭",
    blurb: "Alaska's Arctic neighbors and its place in the world",
    parentNote: "Alaska as part of the circumpolar north: its neighbors across the Bering Strait, how some Arctic peoples in different countries adapt to their lands, the Arctic Council, and Alaska's place in global trade. Indigenous content is light, in the present tense and never treats Arctic peoples as one.",
    standards: ["SS.7.1.16.3; SS.7.4.16.2; SS.7.1.16.1; SS.7.4.23.2", "how people adapt to their environments, relationships between countries and regions in the global economy, and cultural diffusion"],
    items: CIRCUMPOLAR,
  }),
  timelineUnit({
    id: "ak-g7-russian-america",
    title: "Russian America",
    emoji: "⛵",
    blurb: "Russia's empire reaches across the Bering Sea",
    parentNote: "World history through Alaska: how the Russian Empire expanded across Siberia for furs, Bering's voyages, the Russian-American Company, Tlingit resistance at Sitka, the harm done to Unangax̂ and Sugpiaq people, and why Russia sold its claim in 1867, with timeline practice.",
    standards: ["SS.7.3.16.4; SS.7.3.16.2; SS.7.4.24.1; SS.7.2.24.1", "how conflict and cooperation divided control of land, how the use of resources changed over time, and cause and effect in history"],
    events: RUSSIA_EVENTS,
    items: RUSSIA_ITEMS,
  }),
];
