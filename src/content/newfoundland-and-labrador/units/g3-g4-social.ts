import { bankUnit, type Q } from "../own";

// Grades 3 and 4 social studies, Newfoundland and Labrador: Our Province, and Peoples of Newfoundland and Labrador.
// Indigenous content is light, in the present tense for living communities, and needs review by Innu, Inuit,
// Mi'kmaq and Southern Inuit partners and the NL Department of Education before launch. The Beothuk are treated
// briefly and respectfully, with no graphic detail.
//
// Sources checked (anything that could not be confirmed was left out):
// - Canada.ca, Newfoundland and Labrador's provincial symbols (flag, flower, bird, tree, animal, dog, mineral, game bird)
// - Parks Canada, Cape Spear (Canada's most easterly point of land; oldest surviving lighthouse in the province)
// - Parks Canada, Gros Morne National Park (Tablelands, fjords, Western Brook Pond, UNESCO World Heritage Site)
// - Parks Canada, L'Anse aux Meadows (Norse, over 1,000 years ago, Great Northern Peninsula, UNESCO 1978)
// - Parks Canada, Torngat Mountains National Park (an Inuit homeland; polar bears and caribou) and Signal Hill (Cabot Tower)
// - Parks Canada, Shanawdithit National Historic Person (died June 6, 1829, in St. John's)
// - Heritage NL (heritage.nf.ca), Beothuk distribution (Exploits River and Red Indian Lake), Port-au-Port Peninsula,
//   Modern Francophones, Inuit land claims, Newfoundland English
// - The Canadian Encyclopedia, Nunatsiavut; reserves and First Nations in Newfoundland and Labrador; Mumming;
//   Francophones of Newfoundland and Labrador
// - Government of Newfoundland and Labrador (gov.nl.ca), emblems, helpful contacts and newcomer settlement news release
// - Wikipedia, Newfoundland and Labrador and Newfoundland Time Zone (Confederation 1949, time zones, geography),
//   used only for facts that match the sources above

const PROVINCE: Q[] = [
  ["What is the capital city of Newfoundland and Labrador?", "St. John’s", ["Corner Brook", "Gander", "Happy Valley-Goose Bay"], "St. John’s is also the biggest city in the province."],
  ["Our province is made of an island and a part of the mainland. What is the mainland part called?", "Labrador", ["Cape Spear", "Gros Morne", "Avalon"], "The island is Newfoundland. The mainland part is Labrador."],
  ["What is an island?", "land with water all around it", ["land with a city on it", "a big hill in the sea", "water with land in the middle"], "Think of the island of Newfoundland, with the ocean on every side."],
  ["Which ocean is next to Newfoundland and Labrador?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Arctic Ocean"], "It is the ocean on the east coast of Canada."],
  ["Which province shares a land border with Labrador?", "Quebec", ["Nova Scotia", "Ontario", "Manitoba"], "Quebec is to the west of Labrador."],
  ["Which strait lies between the island of Newfoundland and Labrador?", "the Strait of Belle Isle", ["the Bay of Fundy", "Hudson Bay", "Lake Ontario"], "A strait is a narrow stretch of water between two pieces of land."],
  ["In 1949, Newfoundland and Labrador became the tenth what?", "province of Canada", ["city in Canada", "island in Canada", "ocean of Canada"], "That year it joined Canada as a province."],
  ["What is the provincial flower of Newfoundland and Labrador?", "the pitcher plant", ["the tulip", "the rose", "the sunflower"], "This plant is unusual because it eats insects."],
  ["Which seabird is the provincial bird?", "the Atlantic puffin", ["the bald eagle", "the robin", "the snowy owl"], "It has a colourful beak and nests on cliffs by the sea."],
  ["Which tree is the provincial tree?", "the black spruce", ["the maple", "the palm", "the willow"], "It is the most common tree in Labrador."],
  ["Which animal is the provincial animal?", "the Newfoundland pony", ["the moose", "the polar bear", "the beaver"], "These small, strong horses used to pull logs and boats."],
  ["Which kind of dog is named after our province?", "the Newfoundland dog", ["the poodle", "the beagle", "the pug"], "It is big, gentle and a very strong swimmer."],
  ["Which colour on the provincial flag stands for the sea?", "blue", ["red", "white", "gold"], "Think of the colour of the ocean around our coast."],
  ["On the provincial flag, what does the white stand for?", "snow and ice", ["the clouds", "the sand", "the fog"], "Winters here can be white and snowy."],
  ["Which famous cape is Canada’s most easterly point of land?", "Cape Spear", ["Cape Breton", "Cape Race", "Cape Bonavista"], "A lighthouse there is the oldest one left in the province."],
  ["Which national park has the Tablelands and tall fjords?", "Gros Morne National Park", ["Banff National Park", "Torngat Mountains Park", "Signal Hill"], "It is on the west coast of the island of Newfoundland."],
  ["Which place in St. John’s has a tower called Cabot Tower?", "Signal Hill", ["Cape Spear", "Gros Morne", "Western Brook Pond"], "The hill overlooks the harbour."],
  ["Many people live in cities and towns with lots of buildings. What do we call these places?", "urban", ["rural", "wild", "northern"], "St. John’s is an urban place."],
  ["A small community far from big cities, with lots of nature, is called…", "rural", ["urban", "crowded", "a harbour"], "Think of a quiet fishing village."],
  ["On a map, which way is the Atlantic Ocean from the island of Newfoundland?", "east", ["west", "inland", "north only"], "Labrador and Quebec are to the west. The ocean is on the other side.", true],
  ["On the provincial flag, the red stands for…", "human effort", ["fire", "fall leaves", "strawberries"], "The red stands for the hard work of people.", true],
  ["Which glacier-carved fjord, with tall waterfalls, is in Gros Morne National Park?", "Western Brook Pond", ["Witless Bay", "Quidi Vidi Lake", "Conception Bay"], "A fjord is a deep, narrow arm of water between steep cliffs.", true],
  ["Which people visited L’Anse aux Meadows over 1,000 years ago?", "the Norse", ["the Romans", "the Egyptians", "the Spanish"], "They sailed from Greenland.", true],
  ["On which part of the island is L’Anse aux Meadows?", "the Great Northern Peninsula", ["the Avalon Peninsula", "the Burin Peninsula", "the Port au Port Peninsula"], "It is at the very north end of the island.", true],
  ["Which park in northern Labrador is an Inuit homeland, with jagged mountains?", "Torngat Mountains National Park", ["Banff National Park", "Signal Hill", "Cape Spear"], "Polar bears and caribou live there.", true],
  ["Newfoundland time is half an hour ahead of Atlantic time. If it is 2:00 in Nova Scotia, it is…", "2:30 in Newfoundland", ["1:30 in Newfoundland", "3:00 in Newfoundland", "1:00 in Newfoundland"], "Ahead means later on the clock.", true],
  ["Which mineral, a shimmery stone named after a part of our province, is the provincial mineral?", "labradorite", ["quartz", "diamond", "coal"], "Its name starts like the mainland part of the province.", true],
  ["Which islands of France lie off the Burin Peninsula?", "Saint-Pierre and Miquelon", ["Prince Edward Island", "Cape Breton Island", "Anticosti Island"], "They are about 20 km from the coast of Newfoundland.", true],
  ["Where does the largest puffin colony in the province live?", "Witless Bay Ecological Reserve", ["Gros Morne Tablelands", "Signal Hill", "Torngat Mountains"], "It is south of St. John’s.", true],
];

const PEOPLES: Q[] = [
  ["Many different peoples have made their homes in Newfoundland and Labrador. This is called…", "diversity", ["geography", "weather", "a harbour"], "Diversity means people who are different from each other live together."],
  ["Who are the Innu?", "an Indigenous people of Labrador", ["settlers from Spain", "a group of sailors", "a kind of boat"], "Innu communities in Labrador include Sheshatshiu and Natuashish."],
  ["Which two communities in Labrador are home to the Innu?", "Sheshatshiu and Natuashish", ["Nain and Hopedale", "Conne River and Gander", "Cape St. George and Mainland"], "Each community has its own council."],
  ["What language do many Innu speak?", "Innu-aimun", ["Inuttitut", "Mi’kmaw", "Spanish"], "The word begins with the same name as the people."],
  ["Who are the Inuit of Nunatsiavut?", "an Indigenous people of northern Labrador", ["people who live only on the island", "visitors from Greenland", "a school club"], "Its name is in the Inuttitut language."],
  ["Which language do many Inuit in Labrador speak?", "Inuttitut", ["Innu-aimun", "Gaelic", "Portuguese"], "It is the language of Inuit in northern Labrador."],
  ["Which of these is a community in Nunatsiavut?", "Hopedale", ["Gander", "Placentia", "Stephenville"], "Hopedale is in northern Labrador."],
  ["The Nunatsiavut Government meets in Hopedale and has its head office in which community?", "Nain", ["Corner Brook", "Cartwright", "Goose Bay"], "Nain is the largest of the five Nunatsiavut communities."],
  ["How many communities does Nunatsiavut have?", "five", ["two", "nine", "twenty"], "They are Nain, Hopedale, Makkovik, Rigolet and Postville."],
  ["Who are the Mi’kmaq of Newfoundland?", "an Indigenous people who live on the island", ["sailors from Iceland", "a group from Labrador only", "a sports team"], "Mi’kmaw communities include Miawpukek and Qalipu."],
  ["Which Mi’kmaw reserve is the only one on the island of Newfoundland?", "Miawpukek", ["Natuashish", "Rigolet", "Postville"], "It is also called Conne River."],
  ["Which Mi’kmaw First Nation has members mostly on the west coast of the island?", "Qalipu First Nation", ["Innu Nation", "Nunatsiavut", "Torngat Nation"], "It is one of the largest bands in the country."],
  ["Which group are Southern Inuit of Labrador represented by?", "the NunatuKavut Community Council", ["the Provincial Parks Council", "the Gander Town Council", "the Labrador Sailors Club"], "The name sounds a bit like Nunatsiavut, but it is a different group."],
  ["What does the word “Indigenous” mean?", "the first peoples of a land", ["people who just arrived", "people who like to travel", "people who work at the harbour"], "Indigenous peoples were here long before settlers came."],
  ["Which people lived on the island of Newfoundland long ago and are known as the Beothuk?", "an Indigenous people of the island", ["Vikings from Greenland", "French fishers", "Irish farmers"], "The Beothuk lived near the Exploits River and Red Indian Lake."],
  ["Shanawdithit’s drawings help us to learn about…", "Beothuk life", ["French cooking", "Irish music", "modern sports"], "She drew pictures of her people’s way of life."],
  ["Where did many Irish settlers make their homes in the province?", "on the Avalon Peninsula", ["in Nunatsiavut", "in the Torngat Mountains", "in Labrador West only"], "Many came from the southeast of Ireland."],
  ["Many early English settlers in the province came from which part of England?", "the West Country", ["the Arctic", "London only", "the Prairies"], "They settled in many bays along the coast."],
  ["The Port au Port Peninsula is known for its…", "French-speaking communities", ["Inuit villages", "high mountains", "northern lights museum"], "Cape St. George and Mainland are French communities there."],
  ["What do we call a custom where people dress up in disguises and visit neighbours at Christmas?", "mummering", ["curling", "skiing", "kayaking"], "It is also called jannying in some places."],
  ["When does mummering or jannying happen?", "during the twelve days of Christmas", ["in the middle of summer", "on the first day of school", "every Friday"], "Visits start around Boxing Day."],
  ["What is a good way to show respect to people from other cultures?", "listen and learn about their traditions", ["laugh at their words", "tell them to change", "ignore them"], "Respect starts with listening."],
  ["Why do many newcomers come to the province as students?", "to study at Memorial University or College of the North Atlantic", ["to fish in Gros Morne", "to visit the Tablelands", "to climb Signal Hill"], "Many come first for school and then stay."],
  ["Which of these is an official language of Canada?", "French", ["Gaelic", "Portuguese", "Latin"], "It is spoken on the Port au Port Peninsula and in other places in the province."],
  ["Newcomers add what to a community?", "new foods, songs and ideas", ["more fog", "fewer neighbours", "fewer stories"], "Sharing helps everyone learn.", true],
  ["Miawpukek, also called Conne River, is what kind of place?", "a Mi’kmaw community", ["a French fishing port", "a Viking camp", "a lighthouse"], "It is on the south coast of the island.", true],
  ["Why is Nunatsiavut special?", "Labrador Inuit govern themselves there", ["it is a big city", "it is a ferry", "it is an island park"], "The government started in 2005.", true],
  ["In what year did the Nunatsiavut Government begin?", "2005", ["1949", "1980", "2023"], "A land claims agreement took effect on December 1 of that year.", true],
  ["In which year did Shanawdithit, the last known Beothuk person, die?", "1829", ["1949", "1701", "1905"], "It was almost two hundred years ago.", true],
  ["Beothuk people painted their canoes, tools and homes with what?", "red ochre", ["blue paint", "green leaves", "white chalk"], "It is a reddish earth colour.", true],
  ["Which two groups helped create the French communities on the Port au Port Peninsula?", "French fishers and Acadians", ["Vikings and Romans", "Spanish and Dutch", "Inuit and Innu"], "They came to fish or to farm.", true],
  ["Newfoundland English sounds different from some other English in Canada. Why?", "its settlers brought words and sounds from Ireland and England", ["it was invented last year", "it came from Mars", "it has no words"], "Long ago, settlers kept speaking the way they did at home.", true],
  ["Some Scottish families came from Cape Breton to farm. Where on the island did they settle?", "in the southwest", ["in the Torngat Mountains", "in Nunatsiavut", "at Signal Hill"], "They came looking for farmland.", true],
];

export const ourProvince = bankUnit({
  id: "nl-province-3",
  title: "Our Province: Newfoundland and Labrador",
  emoji: "🗺️",
  blurb: "Where we live: the island, Labrador and the sea.",
  parentNote:
    "Practises where Newfoundland and Labrador is, its island and mainland parts, its provincial symbols, and well-known natural and historic places. It follows the Grade 3 social studies expectations on people, place and environment in the Newfoundland and Labrador curriculum.",
  standards: ["People, place and environment (by Grade 3)", "the location, regions, symbols and natural features of Newfoundland and Labrador"],
  items: PROVINCE,
});

export const peoples = bankUnit({
  id: "nl-peoples-4",
  title: "Peoples of Newfoundland and Labrador",
  emoji: "🤝",
  blurb: "First peoples and newcomers who call this place home.",
  parentNote:
    "Practises the Indigenous peoples and the newcomers who have made their homes in Newfoundland and Labrador, and how cultures have shaped the province. The Indigenous content is light, in the present tense, and needs review by Innu, Inuit, Mi'kmaq and Southern Inuit partners.",
  standards: ["Culture and diversity (by Grade 6)", "the Indigenous peoples and the newcomers who have made their homes in Newfoundland and Labrador, and how cultures have shaped the province"],
  items: PEOPLES,
});
