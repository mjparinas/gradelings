import { bankUnit, type Q } from "../own";

// Grade 5 social studies, Newfoundland and Labrador: early visitors and the fishery. Indigenous content is light, in the
// present tense for living communities, and needs review by Innu, Inuit, Mi’kmaq and Southern Inuit partners and the
// Newfoundland and Labrador Department of Education before launch.
//
// Sources checked:
// Parks Canada, L'Anse aux Meadows National Historic Site and World Heritage Sites of Canada (parks.canada.ca)
// The Canadian Encyclopedia, "L'Anse aux Meadows" (thecanadianencyclopedia.ca)
// UNESCO World Heritage List, Red Bay Basque Whaling Station, no. 1412 (whc.unesco.org/en/list/1412)
// Parks Canada, Red Bay National Historic Site backgrounder (parks.canada.ca/lhn-nhs/nl/redbay)
// Heritage NL, Samuel Abbott House and Fishing Premises (heritagenl.ca)
// Heritage NL, Resettlement and the Drake House, Arnold's Cove (heritagenl.ca, historicplaces.ca)
// The Canadian Encyclopedia, "Cod Moratorium of 1992" (thecanadianencyclopedia.ca)
// The Canadian Encyclopedia, "Jacques Cartier" (thecanadianencyclopedia.ca)
// CBC Learning, "Humphrey Gilbert's final voyage" and "John Cabot" (cbc.ca/history)
// CBC News, "Moratorium at 30" (cbc.ca)
// Hibernia Management and Development Company, 25 years since first oil (hibernia.ca)

const EXPLORERS: Q[] = [
  ["About 1000 years ago, which people built a camp at L’Anse aux Meadows?", "the Norse", ["Basque whalers", "Portuguese fishers", "Roman soldiers"], "They sailed across the Atlantic from the north in wooden ships."],
  ["Where on the island of Newfoundland is L’Anse aux Meadows?", "the northern tip", ["the Avalon Peninsula", "the Burin Peninsula", "the west coast near Corner Brook"], "It is at the far north end of the island, near the Strait of Belle Isle."],
  ["What special honour does L’Anse aux Meadows have?", "It is a UNESCO World Heritage Site", ["It is the capital of the province", "It is a busy airport", "It is the largest city in Canada"], "UNESCO protects places that matter to people all over the world."],
  ["What did archaeologists find at L’Anse aux Meadows?", "the remains of buildings made of sod and wood", ["a stone castle", "a Roman road", "a steel bridge"], "The walls were built from turf laid over a wooden frame."],
  ["Why is L’Anse aux Meadows so special to historians?", "It is the only known Norse site in North America", ["It is the oldest city in Canada", "It is where Cabot first stepped ashore", "It was a Basque whaling station"], "Think about who built it and how long ago.", true],
  ["About how long ago was the Norse camp at L’Anse aux Meadows used?", "about 1000 years ago", ["about 100 years ago", "about 300 years ago", "about 5000 years ago"], "It is much older than Cabot’s voyage in 1497."],
  ["Which people ran a whaling station at Red Bay in the 1500s?", "the Basques", ["the Norse", "the English army", "the Dutch"], "They came from the Basque region of Europe in big ships."],
  ["In which part of the province is Red Bay?", "Labrador, on the Strait of Belle Isle", ["the Avalon Peninsula", "the Bonavista Peninsula", "the Burin Peninsula"], "The Strait of Belle Isle runs between Labrador and the island."],
  ["What were Basque whalers mainly hunting whales for?", "oil", ["gold", "spices", "timber"], "The oil was used in lamps in Europe."],
  ["Which of these is a UNESCO World Heritage Site in Labrador?", "Red Bay", ["Gander", "Corner Brook", "St. John’s"], "It is named for the Basque whaling station found there."],
  ["What do archaeologists do?", "study objects and places left behind by people in the past", ["predict the weather", "build ships", "draw maps of the stars"], "They often dig carefully to find clues."],
  ["In 1497, John Cabot sailed across the Atlantic for which country?", "England", ["France", "Spain", "Portugal"], "His voyage was paid for by English merchants and backed by the English king."],
  ["Which English king backed John Cabot’s voyage?", "Henry VII", ["Louis XIV", "Philip II", "Victoria"], "He ruled England at the end of the 1400s.", true],
  ["Cabot’s ship, the Matthew, set out from which English port?", "Bristol", ["London", "Paris", "Lisbon"], "It is a busy port on the west coast of England."],
  ["What did John Cabot believe he had found?", "the east coast of Asia", ["a brand new planet", "the North Pole", "the Pacific Ocean"], "He did not know that a whole continent lay in the way.", true],
  ["Why did explorers like Cabot sail west across the Atlantic?", "to look for a sea route to Asia", ["to visit the Norse", "to escape the cold", "to build a new capital city"], "Asia had goods that Europeans wanted to trade for."],
  ["In 1583, Humphrey Gilbert arrived at which harbour and claimed land for England?", "St. John’s", ["Red Bay", "L’Anse aux Meadows", "Bonavista"], "Today this harbour is the capital city of the province."],
  ["What did Gilbert find in the harbour when he arrived in 1583?", "fishing ships from several European countries", ["an empty harbour", "only Norse ships", "a Basque whaling fleet only"], "Fishers had been coming here for many years already.", true],
  ["Why did Gilbert not start a lasting colony in 1583?", "He did not have enough supplies to stay the winter", ["He did not like the harbour", "The king told him to go home", "The Norse were already there"], "Staying through a long winter takes lots of food and tools.", true],
  ["What are the Grand Banks?", "shallow fishing grounds in the ocean off Newfoundland", ["mountains in Labrador", "a bank for saving money", "a river in Quebec"], "Many fish live in the cold, shallow water there."],
  ["Why did so many European fishing crews come to Newfoundland waters?", "to catch cod", ["to collect gold", "to hunt dinosaurs", "to cut down tall palm trees"], "Cod was easy to preserve and sell in Europe."],
  ["Which countries sent fishing crews to the waters around Newfoundland?", "England, France, Portugal and Spain", ["Japan, Brazil and Egypt", "Australia, India and Chile", "Russia and Mexico only"], "They all lay across the Atlantic Ocean."],
  ["Many early fishers were migratory. What does that mean?", "They fished here in the warm months and then sailed home", ["They lived here all year", "They never used boats", "They only fished in winter"], "Think of birds that fly south and come back.", true],
  ["Jacques Cartier sailed through the Strait of Belle Isle in 1534. Which country did he sail for?", "France", ["England", "Norway", "Portugal"], "He later sailed farther into the Gulf of St. Lawrence.", true],
  ["Who lived in the land we now call Newfoundland and Labrador long before any Europeans arrived?", "Indigenous peoples", ["Basque whalers", "English fishers", "No one"], "Their communities are still here today."],
  ["Which Indigenous peoples have communities in Labrador today?", "Innu and Inuit", ["Haida and Squamish", "Mohawk and Oneida", "Blackfoot and Cree"], "Some Inuit communities in southern Labrador are called Southern Inuit."],
  ["Which Indigenous people live in communities on the island of Newfoundland today?", "Mi’kmaq", ["Haida", "Cree", "Blackfoot"], "Their language is Mi’kmaw."],
  ["Which of these is a primary source?", "a diary written by a sailor on a voyage", ["a textbook written last year", "a movie about Vikings", "a website that sums up history"], "A primary source comes from someone who was there."],
  ["A secondary source is…", "a book written later about events in the past", ["a letter written during the event", "a tool found in a dig", "a photo taken at the time"], "Someone wrote it after studying other sources."],
  ["Why do historians compare many sources?", "One source may leave things out or disagree with another", ["All sources are always the same", "Sources are only for pictures", "It makes history shorter"], "Different people may tell the same story in different ways."],
  ["In history, a consequence is…", "something that happens because of an earlier event", ["the date of an event", "a kind of map", "a person who studies the past"], "Cause comes first, consequence follows."],
  ["Which of these events happened first?", "the Norse camp at L’Anse aux Meadows", ["Cabot’s 1497 voyage", "Cartier’s 1534 voyage", "Gilbert’s 1583 claim"], "Check which one is about 1000 years ago."],
  ["Which event took place between Cabot’s voyage and Gilbert’s claim?", "Cartier’s voyage in 1534", ["the Norse camp at L’Anse aux Meadows", "the 1992 cod moratorium", "the first airplane flight"], "Put the years in order: 1497, 1583, and the one between.", true],
  ["What did Basque whalers leave behind at Red Bay that archaeologists study?", "ovens, wharves, graves and a sunken ship", ["a castle and a cathedral", "a railway station", "a hockey rink"], "They left traces on shore and under the water.", true],
  ["What work did people do at L’Anse aux Meadows that archaeologists found signs of?", "making iron", ["weaving cotton", "printing books", "making glass"], "Bits of iron and a hearth were found in the ground.", true],
  ["The Strait of Belle Isle lies between Labrador and…", "the island of Newfoundland", ["Nova Scotia", "Prince Edward Island", "Baffin Island"], "Look at a map of the province.", true],
];

const FISHERY: Q[] = [
  ["What is an outport?", "a small coastal community, often far from larger towns", ["a big city inland", "a ship that carries mail", "a kind of fishing net"], "The word has “out” in it because these places were out along the coast."],
  ["In the past, how did people usually travel to many outports?", "by boat", ["by train", "by subway", "by jet plane"], "Roads came late to many coastal communities."],
  ["Why were many outports built right on the coast?", "so families could fish close to home", ["so they could farm wheat", "so they could mine coal", "so they could be near big cities"], "The ocean was where the work was."],
  ["Which fish was the most important in the early Newfoundland and Labrador fishery?", "cod", ["tuna", "goldfish", "trout"], "It was salted and sold in many countries."],
  ["What is the inshore fishery?", "fishing close to shore in small boats", ["fishing far out at sea on large ships", "fishing in lakes in winter", "fishing from a bridge"], "Inshore means near the shore."],
  ["Why did people salt and dry cod?", "so it would keep without spoiling", ["to make it sweet", "to make it glow", "to make it float"], "There were no fridges then."],
  ["What was a fish flake used for?", "drying salted cod in the sun and air", ["sleeping at night", "storing boats in winter", "growing vegetables"], "It was a raised platform made of wood poles."],
  ["A punt was a…", "small open boat used for inshore fishing", ["type of fish", "wooden dock", "storage shed for salt"], "A fisher could row it or sail it close to shore."],
  ["Today, why do some communities fix up old fish stages and flakes?", "to remember and share their fishing history", ["to start a new moratorium", "to store oil", "to build airports"], "Old buildings tell a story about how people lived."],
  ["What was resettlement?", "a program that helped people move from small communities to larger ones", ["a plan to build new boats", "a holiday for fishers", "a law about salt"], "Governments paid some families to move."],
  ["Resettlement programs in the province mainly took place in…", "the 1950s, 1960s and 1970s", ["the 1700s", "the 1880s", "the 2000s"], "It was after Newfoundland joined Canada in 1949."],
  ["What did governments hope to gain from resettlement?", "easier ways to provide services like schools and health care", ["more people living far apart", "fewer fish to catch", "no more boats"], "It is hard to bring a school to a very tiny place.", true],
  ["Why was resettlement hard for many families?", "They left homes and places their families had known for generations", ["They had to learn to swim", "They had to give up all their money", "They moved onto ships forever"], "A home is more than a building."],
  ["People felt differently about resettlement. Why?", "Some welcomed better services, while others missed their home communities", ["Everyone liked it the same way", "No one was affected", "It only happened in cities"], "Think about what people gained and what they lost.", true],
  ["What is a moratorium on fishing?", "an official pause or ban on fishing", ["a fishing contest", "a tax on boats", "a kind of net"], "Governments use it to give fish time to recover."],
  ["In what year was the cod moratorium announced?", "1992", ["1892", "1952", "2012"], "It was announced on July 2 of that year."],
  ["Why was the cod moratorium announced?", "There were too few cod left", ["Cod had become too expensive", "Fishers wanted a holiday", "A new road was built"], "Scientists saw that the stock had dropped a great deal."],
  ["Which federal fisheries minister announced the 1992 cod moratorium?", "John Crosbie", ["Joey Smallwood", "Clyde Wells", "Brian Mulroney"], "He was a Newfoundland politician in the federal government.", true],
  ["About how many people in the province lost work because of the moratorium?", "nearly 30 000", ["about 300", "about 2000", "about 3 million"], "It affected people in many communities at once.", true],
  ["What happened to many outports after 1992?", "Many families moved away to find work", ["They became big cities", "They all started new cod fisheries", "They sailed to Europe"], "People needed jobs to support their families."],
  ["After the cod collapse, which shellfish became more important to the fishery?", "crab and shrimp", ["oysters and clams", "whales and seals", "eels and frogs"], "Fishers asked for more licences to catch these."],
  ["Which kind of work helps many communities earn money today besides fishing?", "tourism", ["growing oranges", "building volcanoes", "making ice cubes for the desert"], "Visitors come to see icebergs, trails and historic sites."],
  ["Which resource, taken from under the ocean floor, has created jobs in the province since 1997?", "oil", ["pearls", "sugar", "cotton"], "Hibernia was the first big offshore project."],
  ["If many people want to buy something but there is little of it, the price usually…", "goes up", ["goes down", "stays at zero", "disappears"], "This idea is called supply and demand."],
  ["Why is cod called a renewable resource?", "It can grow back if we do not catch too many", ["It never runs out no matter what", "It is made in a factory", "It cannot be replaced"], "Renewable does not mean unlimited."],
  ["Sustainable fishing means…", "catching fish so the population stays healthy for the future", ["catching every fish you can find", "only fishing at night", "never selling fish"], "Think about people who will fish here years from now."],
  ["What is a fishing quota?", "a limit on how much fish can be caught", ["a kind of boat", "a fishing licence fee only", "a place to dry fish"], "A quota keeps the catch to a safe amount."],
  ["How does limiting the catch help fish stocks recover?", "More fish survive to grow and have young", ["Fish learn to swim faster", "The ocean gets warmer", "Fish stop eating"], "A fish that is not caught can keep growing.", true],
  ["Which choice is fair to future fishers?", "catching only as many fish as the stock can replace", ["catching as many as possible before others do", "ignoring what scientists measure", "fishing only in one tiny spot forever"], "Fairness includes people who are not born yet.", true],
  ["Who counts fish and advises how many can be caught?", "scientists at Fisheries and Oceans Canada", ["cooks at restaurants", "ship builders", "tourists"], "They study fish stocks and the ocean.", true],
  ["What is a fish stock?", "a group of one kind of fish living in an area", ["a pile of fish in a store", "a type of fishing net", "a soup made with fish"], "Scientists track the size of each stock."],
  ["In 2024, what happened with northern cod for the first time since 1992?", "A limited commercial fishery reopened", ["Fishing became free with no limits", "The cod all disappeared", "Fishing was banned for ever"], "It came after more than thirty years.", true],
];

export const explorers = bankUnit({
  id: "nl-explorers-5",
  title: "Early Visitors to Newfoundland and Labrador",
  emoji: "⛵",
  blurb: "Norse, Basque, English and French voyagers, and what they left behind.",
  parentNote:
    "Your child learns who came to Newfoundland and Labrador long ago, why they came, and how historians use sources such as archaeology and maps to find out. It also reminds them that Indigenous peoples were already here and still are. This is practice, not a report-card mark.",
  standards: ["Time, continuity and change (by Grade 6)", "early visitors and settlers to Newfoundland and Labrador and what they left behind"],
  items: EXPLORERS,
});

export const fishery = bankUnit({
  id: "nl-fishery-5",
  title: "The Fishery and Outport Life",
  emoji: "🎣",
  blurb: "Cod, outports and how communities changed.",
  parentNote:
    "Your child learns about the cod fishery, outport life, resettlement and the 1992 cod moratorium, and thinks about fair, sustainable economic choices such as quotas. This is practice, not a report-card mark.",
  standards: ["Individuals, societies and economic decisions (by Grade 6)", "the fishery, outport life and how economic decisions changed communities"],
  items: FISHERY,
});
