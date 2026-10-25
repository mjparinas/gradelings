import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 9 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g9-ecosystems": lesson(
    ["A population grows until limits stop it at the carrying capacity, so a logistic curve levels off.", "Density-dependent factors, like disease, grow stronger in crowds; density-independent ones, like storms, don't.", "Only about 10% of energy passes to each next trophic level. Producers are the first level."],
    "Disease spreads faster in a crowded population. Density-dependent or density-independent?",
    ["Its effect grows with crowding.", "That makes it density-dependent."],
    "density-dependent",
  ),
  "social/co-g6-world-regions": lesson(
    ["World regions share features like climate, landforms and culture. Know which countries are in which region: India in Asia, New Zealand in Oceania.", "People adapt to climate, like warm clothing and insulated homes in the cold.", "The Ring of Fire around the Pacific has many volcanoes and earthquakes. Trade connects regions."],
    "The Amazon rainforest is mostly in which country?",
    ["The Amazon is in South America.", "Most of it lies in the largest South American country."],
    "Brazil",
  ),
  "social/ga-g6-australia": lesson(
    ["Australia is a country and a continent, with the Great Barrier Reef and the Outback.", "Most Australians live near the coast, where the climate is milder.", "Aboriginal Australians have lived there for tens of thousands of years."],
    "Why do most Australians live near the coast?",
    ["The middle is hot and dry.", "The coast has more rain and milder weather."],
    "the coast has a milder climate and more water",
  ),
  "social/ga-g6-europe": lesson(
    ["Key features include the Alps, the Pyrenees, the Ural Mountains and the Rhine River.", "Europe has many languages and religions in a small area.", "The European Union helps member countries trade and work together."],
    "Which mountains are often called the line between Europe and Asia?",
    ["They run north to south through Russia.", "Their name starts with U."],
    "the Ural Mountains",
  ),
  "social/ga-g7-africa": lesson(
    ["Key features include the Sahara, the Sahel, the Nile and the Congo River.", "Desertification in the Sahel and unsafe water are big environmental issues.", "Many African countries gained independence in the 1950s and 1960s."],
    "What is desertification?",
    ["Desert means dry land.", "Land slowly becomes like a desert."],
    "good land turning into desert",
  ),
  "social/ga-g7-economies": lesson(
    ["In a command economy the government decides what to make; in a market economy buyers and sellers do; a mixed economy blends both.", "Exports are sold to other countries; imports are bought from them. A tariff is a tax on imports.", "Comparative advantage: make what you can produce at the lowest opportunity cost, then trade."],
    "In a command economy, who makes the main decisions about production?",
    ["“Command” means orders from the top.", "The government gives those orders."],
    "the government",
  ),
  "social/ga-g7-population": lesson(
    ["Demography is the study of human populations. Population density is how many people live in an area.", "Cities often grow along rivers and coasts for water and trade.", "Push factors drive people away; pull factors draw them. Newcomers keep culture alive with language and festivals."],
    "Why do cities often grow along rivers and coasts?",
    ["People need water.", "Rivers and coasts are also routes for trade."],
    "They offer water and trade routes",
  ),
  "social/ga-g7-southern-eastern-asia": lesson(
    ["Key features include the Himalayas, the Ganges and the Yangtze Rivers.", "The Ganges is polluted and the Yangtze has huge dams.", "China, India and Japan have large economies."],
    "Which mountains are the highest in the world?",
    ["They are in southern Asia.", "Mount Everest is part of them."],
    "the Himalayas",
  ),
  "social/ga-g7-southwest-asia": lesson(
    ["Key features include the Tigris and Euphrates Rivers, the Persian Gulf and the Arabian Peninsula.", "Oil is the region's most important export.", "Water is scarce, so sharing rivers is an important issue."],
    "What is Southwest Asia's most important export?",
    ["It is found under the desert and the Gulf.", "It is used for fuel."],
    "oil",
  ),
  "social/mn-g8-forms-of-government": lesson(
    ["In a monarchy a king or queen rules; in a republic citizens elect leaders; in a dictatorship one person holds all power.", "In a presidential system, the president is elected separately from the legislature; in a parliamentary system, the leader comes from the legislature.", "Popular sovereignty means power comes from the people, shown in free and fair elections."],
    "Citizens vote in free and fair elections. Which idea does this show?",
    ["It shows where power comes from.", "The people choose their leaders.", "Power from the people is popular sovereignty."],
    "popular sovereignty",
  ),
  "social/ny-g5-countries-capitals": lesson(
    ["North America: Canada, the US, Mexico. Panama connects Central and South America.", "Learn capitals in pairs: Bogotá, Colombia; Kingston, Jamaica; Belmopan, Belize; Georgetown, Guyana.", "Mexico borders the US to the south."],
    "What is the capital of Colombia?",
    ["Colombia is in the north of South America.", "Its capital is high in the Andes."],
    "Bogotá",
  ),
  "social/ny-g6-eastern-hemisphere": lesson(
    ["The Eastern Hemisphere holds Africa, Asia, Europe and Australia.", "The Ural Mountains divide Europe and Asia. The Nile is Africa's longest river; the Tigris and Euphrates flow through Iraq.", "A peninsula has water on three sides."],
    "What is a peninsula?",
    ["“Pen” means almost and “insula” means island.", "It is almost an island."],
    "land surrounded by water on three sides",
  ),
  "social/quality-of-life-8": lesson(
    ["Indicators measure quality of life: life expectancy, literacy rate, infant mortality, and access to clean water and health care.", "High literacy and long life expectancy usually mean higher quality of life; high infant mortality usually means lower.", "To estimate doubling time, divide 70 by the yearly growth rate."],
    "A population grows by 2% each year. About how many years will it take to double?",
    ["Doubling time ≈ 70 ÷ growth rate.", "70 ÷ 2 = 35."],
    "35",
  ),
  "social/tx-g6-economies": lesson(
    ["Factors of production: land (resources), labour (work people do) and capital (tools).", "Industries: agricultural (farming), manufacturing (factories), service.", "In free enterprise, private people own most businesses. GDP per capita is GDP divided by population."],
    "Is a car factory part of agriculture or manufacturing?",
    ["A factory makes goods from parts.", "Making goods is manufacturing."],
    "manufacturing",
  ),
  "social/wa-g6-trade-beliefs": lesson(
    ["The Silk Road and Indian Ocean routes carried goods, ideas, religions and diseases.", "Judaism, Christianity and Islam share belief in one God (monotheism).", "In medieval Europe, serfs were bound to a lord’s land. The Black Death (1340s) killed about a third of Europe."],
    "Besides goods, what else travelled along the Silk Road?",
    ["Traders met people from many lands.", "They shared ideas and beliefs, and carried germs."],
    "Ideas, religions and diseases",
  ),
  "social/wa-g6-world-regions": lesson(
    ["World regions share features like climate, landforms and culture. Know which countries are in which region: India in Asia, New Zealand in Oceania.", "People adapt to climate, like warm clothing and insulated homes in the cold.", "The Ring of Fire around the Pacific has many volcanoes and earthquakes. Trade connects regions."],
    "The Amazon rainforest is mostly in which country?",
    ["The Amazon is in South America.", "Most of it lies in the largest South American country."],
    "Brazil",
  ),
};
