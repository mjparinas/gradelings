import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { G5 as WASHINGTON } from "../../washington/units/social-59-g5";
import { OWN_SOCIAL_5 as OREGON } from "../../oregon/units/social-g5";

// California social studies, Grade 5: US history and geography to 1850. Washington's and Oregon's units are copied
// without their state's places or their Tribal items, with California items added; California's own units fill the
// rest. Content about American Indian nations is light and in the present tense, and religions are described factually
// and neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 5

const FIRST_PEOPLES_5: Q[] = [
  [
    "Ancestral Puebloans built cliff dwellings in places like…",
    "Mesa Verde in Colorado",
    ["the Everglades", "the Great Lakes", "Cape Cod"],
    "Homes were built under rock overhangs.",
  ],
  [
    "Pueblo people of the desert Southwest farmed corn, beans and…",
    "squash",
    ["rice", "wheat", "coffee"],
    "These three crops grow well together.",
  ],
  [
    "Many Pueblo nations, such as the Hopi and Zuni, live today in…",
    "Arizona and New Mexico",
    ["Maine", "Alaska", "Florida"],
    "They are among the oldest communities in the US.",
  ],
  [
    "Adobe is a building material made of…",
    "sun-dried mud and straw",
    ["redwood planks", "ice blocks", "steel"],
    "It keeps homes cool in desert heat.",
  ],
  [
    "Many nations of the Pacific Northwest coast built large homes and canoes from…",
    "cedar trees",
    ["adobe", "buffalo hides", "stone blocks"],
    "Huge cedars grow in the rainy forest.",
  ],
  [
    "Many nations of the Northwest coast have long caught salmon in…",
    "rivers and the ocean",
    ["deserts", "cornfields", "mountain caves"],
    "Salmon swim up rivers to spawn.",
  ],
  [
    "Many nations of the Great Plains, such as the Lakota, relied on the…",
    "buffalo (bison)",
    ["salmon", "camel", "seal"],
    "Buffalo gave food, clothing and shelter.",
  ],
  [
    "Plains nations that followed the buffalo used portable homes called…",
    "tipis",
    ["longhouses", "pueblos", "igloos"],
    "They could be moved quickly.",
  ],
  [
    "After Spanish horses spread north, many Plains nations…",
    "hunted buffalo on horseback",
    ["stopped hunting", "built cliff dwellings", "became sailors"],
    "Horses changed Plains life in the 1700s.",
  ],
  [
    "The Haudenosaunee (Iroquois) Confederacy united nations in the…",
    "Northeast woodlands",
    ["desert Southwest", "Great Plains", "Pacific coast"],
    "Six nations joined together.",
  ],
  [
    "Many woodland nations east of the Mississippi lived in villages and grew…",
    "corn, beans and squash",
    ["only rice", "only wheat", "cotton for export"],
    "They also hunted and fished.",
  ],
  [
    "The Haudenosaunee lived in long, bark-covered homes called…",
    "longhouses",
    ["tipis", "pueblos", "plank houses"],
    "Several families shared one.",
  ],
  [
    "Cahokia, near today's St. Louis, was a large city built by the…",
    "Mississippian culture",
    ["Inca", "Vikings", "Romans"],
    "It had huge earthen mounds.",
  ],
  [
    "How did geography shape the way different nations lived?",
    "each used the plants, animals and materials of its own region",
    [
      "they all lived the same way",
      "they ignored the land",
      "they bought goods from Europe",
    ],
    "Desert, plains, coast and forest lives differed.",
  ],
  [
    "Why did nations of the Plains move often?",
    "to follow the buffalo herds",
    ["to visit cities", "to escape rain", "to farm rice"],
    "The herds moved with the seasons.",
  ],
  [
    "Which nation's people are known for the Great Law of Peace?",
    "the Haudenosaunee",
    ["the Aztec", "the Inca", "the Maya"],
    "It set up a council of nations.",
  ],
  [
    "Wampum belts, made of shell beads, were used by woodland nations to…",
    "record agreements and important events",
    ["pay taxes to Spain", "decorate cars", "build canoes"],
    "Belts held messages and memory.",
  ],
  [
    "Corn was first grown, or domesticated, in…",
    "Mexico",
    ["Europe", "Australia", "China"],
    "Farmers there bred it from a wild grass.",
  ],
  [
    "Many nations governed themselves through…",
    "councils of leaders and elders",
    ["kings chosen by Europe", "no rules at all", "elections run by Congress"],
    "Systems of government varied by nation.",
  ],
  [
    "Trade among nations moved goods such as…",
    "shells, copper, obsidian and turquoise",
    ["plastic and steel", "paper money", "telephones"],
    "Trade routes crossed the continent.",
  ],
  [
    'Why is it important to say "many nations" rather than "the Indians"?',
    "each nation has its own language, government and ways",
    ["they are all the same", "the word nation is wrong", "there was only one"],
    "Nations are distinct.",
    true,
  ],
  [
    "The Navajo (Diné) Nation, the largest reservation in the US, is in…",
    "the Southwest",
    ["New England", "the Great Lakes", "Hawaii"],
    "It spreads across three states.",
    true,
  ],
  [
    "Chaco Canyon, in New Mexico, was a center of…",
    "Ancestral Puebloan trade and building",
    ["Viking settlement", "Spanish gold mining", "Roman roads"],
    "Great houses had hundreds of rooms.",
    true,
  ],
  [
    "Many nations stored food such as dried corn and fish to…",
    "survive winter and dry seasons",
    ["sell to Europe", "feed horses only", "throw away"],
    "Storage helped in hard times.",
    true,
  ],
  [
    "How do we know about nations before written records?",
    "from archaeology and nations' own oral histories",
    ["from TV shows", "from guesses only", "from newspapers of the time"],
    "Artifacts and spoken history both teach us.",
    true,
  ],
  [
    "The Cherokee Nation today is a sovereign nation with its capital in…",
    "Tahlequah, Oklahoma",
    ["Boston", "Los Angeles", "Miami"],
    "Many Cherokee were forced west in the 1830s.",
    true,
  ],
];

const EXPLORERS_5: Q[] = [
  [
    "Christopher Columbus sailed for Spain in…",
    "1492",
    ["1776", "1607", "1849"],
    "He reached the Caribbean.",
  ],
  [
    "Why did many European explorers sail west?",
    "to find a sea route to Asia's spices and riches",
    ["to visit Australia", "to find snow", "to escape the Moon"],
    "Spices were worth a fortune.",
  ],
  [
    "Which country's explorers claimed much of Mexico and the Southwest?",
    "Spain",
    ["Sweden", "Russia", "Italy"],
    "Spain built missions and towns there.",
  ],
  [
    "France claimed land along the St. Lawrence and…",
    "Mississippi Rivers",
    ["Amazon River", "Nile River", "Colorado River only"],
    "Fur traders traveled these rivers.",
  ],
  [
    "Henry Hudson explored a river in today's New York for…",
    "the Dutch and the English",
    ["Spain only", "China", "Mexico"],
    "The Hudson River is named for him.",
  ],
  [
    "Hernán Cortés is known for…",
    "leading the Spanish conquest of the Aztec Empire",
    ["finding the Pacific", "founding Jamestown", "exploring Alaska"],
    "Tenochtitlan fell in 1521.",
  ],
  [
    "Ferdinand Magellan's expedition was the first to…",
    "sail around the world",
    ["reach the Moon", "cross Africa on foot", "find gold in California"],
    "Magellan died on the way; his crew finished.",
  ],
  [
    "Juan Ponce de León explored…",
    "Florida",
    ["California", "Alaska", "Canada's Arctic"],
    "He landed in 1513.",
  ],
  [
    "Francisco Vásquez de Coronado searched the Southwest for…",
    "cities of gold",
    ["a route to the Moon", "salmon", "coal"],
    "He found none.",
  ],
  [
    "Explorers' sponsors were usually…",
    "kings and queens who paid for voyages",
    ["schoolchildren", "farm animals", "newspapers"],
    "Sponsors wanted riches and land.",
  ],
  [
    "Which obstacle did explorers often face?",
    "storms, sickness and running out of food",
    ["traffic jams", "too much fresh fruit", "electric outages"],
    "Long voyages were dangerous.",
  ],
  [
    "Lewis and Clark explored the land of the…",
    "Louisiana Purchase and beyond to the Pacific",
    ["Arctic Circle", "Amazon", "Sahara"],
    "Their trip began in 1804.",
  ],
  [
    "Sacagawea helped Lewis and Clark as a…",
    "Shoshone interpreter and guide",
    ["ship captain", "map printer", "soldier from Spain"],
    "She traveled with her baby.",
  ],
  [
    "Zebulon Pike explored the…",
    "southern Louisiana Territory and the Rocky Mountains",
    ["Pacific Ocean floor", "Arctic", "Caribbean"],
    "Pikes Peak is named for him.",
  ],
  [
    "On a map, Spain's land claims in 1700 included…",
    "Florida, Mexico and the Southwest",
    ["New England", "the Great Lakes", "Hudson Bay"],
    "Spain held the south and west.",
  ],
  [
    "English colonies in the 1600s were along the…",
    "Atlantic coast",
    ["Pacific coast", "Gulf of California", "Rocky Mountains"],
    "Jamestown was founded in 1607.",
  ],
  [
    "How did European explorers affect American Indian nations?",
    "diseases and conflict took many lives and lands",
    [
      "they had no effect",
      "they only brought good things",
      "they all stayed home",
    ],
    "Contact changed life for nations.",
  ],
  [
    "The Columbian Exchange moved horses and wheat to the Americas and…",
    "corn, potatoes and tomatoes to Europe",
    ["cars to Asia", "coffee to the Moon", "nothing"],
    "Plants and animals crossed the ocean.",
  ],
  [
    "Early colonists and nations sometimes cooperated through…",
    "trade, sharing farming knowledge and alliances",
    ["building freeways", "using telephones", "playing video games"],
    "Squanto helped the Pilgrims farm.",
  ],
  [
    "The French and English competed with each other and with nations for…",
    "land and the fur trade",
    ["oil", "gold in California", "space"],
    "Beaver fur was valuable.",
  ],
  [
    "Which explorer reached the Pacific Ocean from Panama in 1513?",
    "Vasco Núñez de Balboa",
    ["Columbus", "Cabrillo", "Drake"],
    "He crossed the isthmus.",
    true,
  ],
  [
    "Why did many explorers keep journals and make maps?",
    "to report to sponsors and guide later travelers",
    ["for school homework", "for fun only", "to hide routes"],
    "Maps were valuable.",
    true,
  ],
  [
    "Metacom, called King Philip by colonists, led a war in 1675 to…",
    "resist colonists taking Wampanoag land",
    ["help England", "start a colony", "build a fort for France"],
    "It was one of the deadliest colonial wars.",
    true,
  ],
  [
    "Pontiac, an Odawa leader, led resistance in 1763 against…",
    "British forts and settlers in the Great Lakes region",
    ["Spain in Florida", "Mexico", "Russia"],
    "Many nations joined.",
    true,
  ],
  [
    "Which explorer is honored in San Diego for sailing there in 1542?",
    "Juan Rodríguez Cabrillo",
    ["Henry Hudson", "Jacques Cartier", "John Cabot"],
    "Cabrillo National Monument is on Point Loma.",
    true,
  ],
  [
    "Jacques Cartier explored the St. Lawrence River for…",
    "France",
    ["Spain", "England", "Portugal"],
    "He sailed in the 1530s.",
    true,
  ],
];

const WESTWARD_5: Q[] = [
  [
    "Between 1789 and 1850, many immigrants came to the US from…",
    "Ireland and Germany",
    ["Australia", "Japan", "Brazil"],
    "Many came for land and jobs.",
  ],
  [
    "The Louisiana Purchase in 1803 bought land from…",
    "France",
    ["Spain", "Britain", "Mexico"],
    "It doubled the size of the US.",
  ],
  [
    "The Louisiana Purchase was made by President…",
    "Thomas Jefferson",
    ["George Washington", "Abraham Lincoln", "Andrew Jackson"],
    "He then sent Lewis and Clark.",
  ],
  [
    "Settlers on the overland trails traveled in…",
    "covered wagons pulled by oxen",
    ["cars", "trains", "airplanes"],
    "Oxen were slow but strong.",
  ],
  [
    "Which was a danger on the overland trails?",
    "disease, river crossings and running out of water",
    ["traffic lights", "too many stores", "snowplows"],
    "Cholera killed many travelers.",
  ],
  [
    "The Oregon Trail began in…",
    "Missouri",
    ["California", "Florida", "Maine"],
    "Wagon trains left from Independence.",
  ],
  [
    "The Donner Party became trapped in the Sierra Nevada in the winter of…",
    "1846",
    ["1776", "1906", "1812"],
    "Heavy snow closed the pass.",
  ],
  [
    "The Santa Fe Trail linked Missouri with…",
    "Santa Fe, then part of Mexico",
    ["Boston", "Seattle", "Chicago"],
    "It was a trade route.",
  ],
  [
    "Texas won independence from Mexico in…",
    "1836",
    ["1776", "1850", "1900"],
    "It became a US state in 1845.",
  ],
  [
    "The Mexican-American War ended in 1848, and Mexico gave the US land including…",
    "California",
    ["Florida", "Alaska", "Maine"],
    "This was the Mexican Cession.",
  ],
  [
    "California became a state in…",
    "1850",
    ["1776", "1869", "1912"],
    "It joined as a free state.",
  ],
  [
    "Mexican settlers had moved into Texas, New Mexico and California before…",
    "the United States took over these lands",
    ["Columbus sailed", "the Romans came", "the Pilgrims"],
    "Many families had lived there for generations.",
  ],
  [
    "Manifest Destiny was the belief that the US should…",
    "spread across North America to the Pacific",
    ["stay small", "return land to Britain", "move to Europe"],
    "Many settlers believed it.",
  ],
  [
    "Who lost the most when settlers moved west?",
    "American Indian nations, who lost land and lives",
    ["no one", "only the settlers", "the British king"],
    "Expansion came at a great cost.",
  ],
  [
    "Which of these were already states in 1850?",
    "Missouri, Texas and California",
    ["Hawaii and Alaska", "Arizona and New Mexico", "Utah and Nevada"],
    "Many western lands were still territories.",
  ],
  [
    "The Gadsden Purchase of 1853 bought land from Mexico for…",
    "a southern railroad route",
    ["a fort in Canada", "a seaport in Florida", "a gold mine in Alaska"],
    "It is now southern Arizona and New Mexico.",
  ],
  [
    "Why did many families move west?",
    "for cheap land, gold and a fresh start",
    ["to find snow", "to avoid all work", "to visit Europe"],
    "Land was the big draw.",
  ],
  [
    "Why did many immigrants come to the US in the 1840s from Ireland?",
    "a famine destroyed the potato crop",
    ["they won a lottery", "Ireland had too much food", "to find gold in 1840"],
    "Many people were starving.",
  ],
  [
    "Mormon pioneers settled near the Great Salt Lake in…",
    "1847",
    ["1607", "1900", "1776"],
    "They were seeking religious freedom.",
  ],
  [
    "The Gold Rush drew people to California from…",
    "around the world",
    ["only Texas", "only one town", "nowhere"],
    "Thousands arrived in 1849.",
  ],
  [
    "Which river was the western border of the US before 1803?",
    "the Mississippi",
    ["the Pacific", "the Colorado", "the Hudson"],
    "The Louisiana Purchase moved the border west.",
    true,
  ],
  [
    "In 1846, Britain and the US agreed to divide the land north of California at…",
    "the 49th parallel",
    ["the equator", "the Mississippi", "the Rio Grande"],
    "It is now the border with Canada in the west.",
    true,
  ],
  [
    "Women on the trails often…",
    "drove wagons, cooked, cared for children and nursed the sick",
    ["stayed behind every time", "ran the railroads", "flew ahead"],
    "Their work kept families alive.",
    true,
  ],
  [
    "The Rio Grande became the border between Texas and…",
    "Mexico",
    ["Canada", "Louisiana", "Cuba"],
    "The war in 1846 began over this border.",
    true,
  ],
  [
    "Why did the US want California's ports?",
    "for trade across the Pacific with Asia",
    ["to fish for whales only", "to block Canada", "to build missions"],
    "San Francisco Bay is a great harbor.",
    true,
  ],
  [
    "Which was a reason travel west got faster after 1869?",
    "the transcontinental railroad",
    ["the Pony Express", "the covered wagon", "the stagecoach"],
    "Trains crossed in about a week.",
    true,
  ],
];

// Copies of Washington's and Oregon's Grade 5 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON, ...OREGON], id);

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "ca-g5-first-nations",
    title: "Nations Before 1500",
    emoji: "🏜️",
    blurb: "Pueblos, plains, coasts and woodlands",
    parentNote:
      "Nations of the desert Southwest, the Pacific Northwest coast, the Great Plains and the eastern woodlands: how geography shaped their homes, food, trade and governments. Light, in the present tense, with nations as living communities today.",
    standards: [
      "5.1.1; 5.1.3",
      "how geography and climate shaped how the major pre-Columbian nations lived, and their varied economies and systems of government",
    ],
    items: FIRST_PEOPLES_5,
  }),
  bankUnit({
    id: "ca-g5-explorers",
    title: "Explorers & Encounters",
    emoji: "⛵",
    blurb: "Why they sailed and what changed",
    parentNote:
      "The aims, sponsors, routes and obstacles of European explorers, the land claims of Spain, France, England and the Dutch, and the cooperation and conflict between colonists and American Indian nations.",
    standards: [
      "5.2.1; 5.2.2; 5.2.3; 5.2.4; 5.3.1; 5.3.2; 5.3.3",
      "the aims and routes of early explorers, the land each country claimed, and cooperation and conflict among colonists and nations",
    ],
    items: EXPLORERS_5,
  }),
  copyOf(K("wa-g5-thirteen-colonies"), {
    id: "ca-g5-thirteen-colonies",
    title: "The Thirteen Colonies",
    emoji: "🏘️",
    blurb: "New England, Middle and Southern colonies",
    parentNote:
      "Why the colonies were founded, how land and climate shaped the three regions, the people who founded them, and early self-government such as the Mayflower Compact and the House of Burgesses.",
    standards: [
      "5.4.1; 5.4.2; 5.4.7",
      "how location shaped the founding of the colonies, their founders, and early democratic ideas and practices",
    ],
  }),
  copyOf(K("wa-g5-colonial-economy"), {
    id: "ca-g5-colonial-economy",
    title: "Colonial Trade & Work",
    emoji: "⚓",
    blurb: "Resources, trade and choices",
    parentNote:
      "Resources, specialization and trade in the colonies, mercantilism, and the Atlantic slave trade and its impact on African peoples, told plainly and age-appropriately.",
    standards: [
      "5.4.5; 5.4.6",
      "how the British colonial period shaped the economy and the introduction of slavery into America",
    ],
  }),
  copyOf(
    K("wa-g5-road-to-revolution"),
    {
      id: "ca-g5-road-to-revolution",
      title: "Road to Revolution",
      emoji: "📜",
      blurb: "Taxes, protests and Patriots",
      parentNote:
        "British taxes, colonial protests such as boycotts and the Boston Tea Party, the Continental Congresses, and why Loyalists and Patriots saw things differently.",
      standards: [
        "5.5.1; 5.5.2",
        "how ideas and interests led to the Revolution, and the significance of the Continental Congresses",
      ],
    },
    [
      [
        "The First Continental Congress met in Philadelphia in…",
        "1774",
        ["1607", "1812", "1850"],
        "Delegates came from 12 colonies.",
      ],
      [
        "The Stamp Act of 1765 taxed…",
        "printed papers such as newspapers and documents",
        ["only tea", "gold", "horses"],
        'Colonists protested "no taxation without representation."',
      ],
      [
        "The Committees of Correspondence helped colonists…",
        "share news and plan protests",
        ["collect British taxes", "build ships", "elect a king"],
        "Letters linked the colonies.",
      ],
    ],
  ),
  copyOf(K("wa-g5-revolution"), {
    id: "ca-g5-revolution",
    title: "The American Revolution",
    emoji: "🥁",
    blurb: "Independence and the war",
    parentNote:
      "The Declaration of Independence and its ideals, key battles from Lexington to Yorktown, help from France and others, and the people of many backgrounds who shaped the war.",
    standards: [
      "5.5.3; 5.6.1; 5.6.2; 5.6.3; 5.6.7",
      "the Declaration of Independence, the major battles, the contributions of France and others, the roles of women, and how the Declaration's ideals changed society",
    ],
  }),
  copyOf(K("wa-g5-constitution"), {
    id: "ca-g5-constitution",
    title: "Building a Government",
    emoji: "🏛️",
    blurb: "Articles, Constitution and Bill of Rights",
    parentNote:
      "Why the Articles of Confederation were replaced, the compromises of 1787, the three branches, checks and balances, federalism and the Bill of Rights (1791).",
    standards: [
      "5.7.1; 5.7.2; 5.7.3; 5.7.4",
      "the weaknesses of the Articles of Confederation, the Constitution of 1787, and how it protects liberty",
    ],
  }),
  copyOf(
    K("or-g5-slavery-and-resistance"),
    {
      id: "ca-g5-slavery-and-resistance",
      title: "Slavery & Resistance",
      emoji: "⛓️",
      blurb: "Enslaved people and their struggle for freedom",
      parentNote:
        "How slavery came to the colonies, the Middle Passage, the lives and resistance of enslaved families, and early steps toward abolition, told plainly and age-appropriately.",
      standards: [
        "5.4.6",
        "the introduction of slavery into America, the responses of enslaved families, and the ongoing struggle against slavery",
      ],
    },
    [
      [
        "In 1619, enslaved Africans were brought to…",
        "Virginia",
        ["California", "Canada", "Hawaii"],
        "They arrived at Point Comfort near Jamestown.",
      ],
      [
        "Enslaved families kept their cultures alive through…",
        "music, stories, faith and family ties",
        ["owning land", "voting", "newspapers they ran"],
        "Culture was a form of resistance.",
      ],
      [
        "Phillis Wheatley, who was enslaved, became famous as a…",
        "poet",
        ["general", "governor", "ship captain"],
        "Her poems were published in 1773.",
      ],
      [
        "Elizabeth Freeman sued for her freedom in Massachusetts in 1781 and…",
        "won",
        ["lost", "moved to England", "became a judge"],
        "Her case helped end slavery in Massachusetts.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g5-westward",
    title: "Moving West",
    emoji: "🐂",
    blurb: "Immigrants, trails and new states",
    parentNote:
      "Immigrants from Europe, the Louisiana Purchase and Lewis and Clark, life on the overland trails, Mexican settlement in the Southwest, Texas, the Mexican-American War and how California and other western lands became part of the United States.",
    standards: [
      "5.8.1; 5.8.2; 5.8.3; 5.8.4; 5.8.5; 5.8.6",
      "immigration, the states and territories of 1850, western exploration, the overland trails, Mexican settlement, and how western lands became part of the US",
    ],
    items: WESTWARD_5,
  }),
];
