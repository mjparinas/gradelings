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
  [
    "Many nations pass down history, values and lessons from one generation to the next through…",
    "oral storytelling",
    ["printed newspapers", "television", "telegrams"],
    "Elders tell stories to young people.",
  ],
  [
    "Lacrosse, a team game played with a stick and net, was first played by nations of the…",
    "eastern woodlands",
    ["desert Southwest", "Arctic", "Pacific islands"],
    "The Haudenosaunee still play it today.",
  ],
  [
    "Customs such as styles of homes, clothing, food and games…",
    "differed from nation to nation",
    ["were the same everywhere", "came from Europe", "did not exist"],
    "Each nation has its own ways.",
  ],
  [
    "Navajo (Diné) weavers are known for…",
    "wool rugs and blankets with bold designs",
    ["glass bottles", "steel tools", "paper kites"],
    "Weaving is a living art.",
  ],
  [
    "Many Plains nations recorded events on buffalo hides in pictures called…",
    "winter counts",
    ["newspapers", "maps of Europe", "price tags"],
    "Each year got one picture.",
    true,
  ],
  [
    "Trickster characters, such as Coyote or Raven, appear in stories told by many nations to…",
    "teach lessons and entertain",
    ["sell goods", "collect taxes", "announce elections"],
    "Folklore teaches as it entertains.",
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

// Religion in the colonies (5.4.3) and the First Great Awakening (5.4.4), added to the copy of the colonies unit.
// Described factually: what groups believed and did, never whether a belief is true.

const COLONIAL_FAITH_5: Q[] = [
  ["The official church of colonial Virginia was the…", "Church of England (Anglican Church)", ["Quaker meeting", "Catholic Church", "Puritan church"], "Virginia's colonists followed the English state church."],
  ["The First Great Awakening of the 1730s and 1740s was a…", "religious revival that spread across the colonies", ["war with France", "tax on tea", "gold rush"], "Crowds gathered to hear preachers."],
  ["George Whitefield was famous for…", "preaching outdoors to huge crowds in many colonies", ["writing the Constitution", "leading the Continental Army", "founding Maryland"], "He traveled from colony to colony."],
  ["Jonathan Edwards was a New England minister who was a leader of the…", "First Great Awakening", ["Boston Tea Party", "Gold Rush", "Lewis and Clark expedition"], "He preached in Massachusetts."],
  ["The Great Awakening encouraged many colonists to…", "question old authorities and choose their own churches", ["obey the king in everything", "stop going to school", "move to England"], "New churches formed."],
  ["After the Great Awakening, many new colleges were founded, partly to…", "train ministers", ["train pirates", "build forts", "collect taxes"], "Princeton and Brown began then."],
  ["The Great Awakening helped colonists from different colonies feel…", "a shared experience", ["more divided than ever", "loyal only to France", "no interest in religion"], "The same preachers toured many colonies."],
  ["Rhode Island was known for allowing…", "freedom of religion for many groups", ["only one church", "no churches at all", "only the Church of England"], "Roger Williams founded it.", true],
  ["Pennsylvania welcomed people of many faiths because William Penn and the Quakers believed in…", "religious tolerance", ["one official church", "banning newcomers", "rule by bishops"], "Penn called it a holy experiment.", true],
];

// Grade 5: American Indian nations and the new nation (5.3.4; 5.3.5; 5.3.6). Factual and in the present tense
// where nations today are named; no sacred or ceremonial content.

const NATIONS_NEW_NATION_5: Q[] = [
  ["A treaty is…", "a formal agreement between nations", ["a kind of tax", "a type of ship", "a law for one town"], "The US signed hundreds with American Indian nations."],
  ["The US government often broke treaties with American Indian nations by…", "letting settlers take land it had promised to the nations", ["giving the nations more land", "paying them twice", "making them states"], "Settlers pushed onto treaty lands."],
  ["In 1782, militia at Gnadenhutten, Ohio, killed nearly 100 peaceful Lenape (Delaware) people. This was a…", "massacre", ["treaty", "trade fair", "peace council"], "A massacre is the killing of many people who cannot defend themselves."],
  ["Which was a factor in American Indian nations losing land to the United States?", "diseases, a growing number of settlers and broken treaties", ["the nations asked to leave", "they had no leaders", "they never used the land"], "Several causes worked together."],
  ["Tecumseh, a Shawnee leader, tried to…", "unite many nations to resist the loss of their lands", ["sell land to settlers", "become president", "join the British Parliament"], "He traveled widely to build an alliance."],
  ["Tecumseh's brother Tenskwatawa, called the Prophet, urged nations to…", "return to their own ways and reject settlers' goods", ["move to Europe", "build cities of stone", "join the US army"], "Their town was Prophetstown, in Indiana."],
  ["At the Battle of Fallen Timbers in 1794, US troops defeated a…", "confederacy of nations in the Ohio country", ["British fleet", "Spanish army", "group of pirates"], "The Treaty of Greenville followed in 1795."],
  ["After the Treaty of Greenville (1795), nations in the Ohio country gave up…", "much of what is now Ohio", ["all of California", "Florida", "New York City"], "Settlers then poured in."],
  ["Logan, a Mingo leader, is remembered for a famous speech in 1774 about…", "the killing of his family by settlers", ["the price of tea", "building a canal", "the Gold Rush"], "It is called Logan's Lament."],
  ["Sequoyah, a Cherokee man, created a…", "system for writing the Cherokee language", ["new kind of plow", "map of the Pacific", "steam engine"], "Within a few years many Cherokee could read and write."],
  ["The Cherokee Phoenix (1828) was the first…", "newspaper published by an American Indian nation", ["train in the South", "bank in Georgia", "US college"], "It used Sequoyah's writing system."],
  ["John Ross, Principal Chief of the Cherokee Nation, fought removal by…", "taking the Cherokee case to the courts and Congress", ["starting a war with Britain", "moving to Europe", "selling all Cherokee land"], "He led the nation for almost 40 years."],
  ["In Worcester v. Georgia (1832), Chief Justice John Marshall ruled that…", "Georgia's laws had no force in the Cherokee Nation", ["Georgia owned all Cherokee land", "the Cherokee had to leave", "treaties did not matter"], "The court saw the Cherokee as a nation."],
  ["President Andrew Jackson supported the Indian Removal Act of 1830, which…", "moved nations of the Southeast to land west of the Mississippi", ["gave nations more land in Georgia", "ended all treaties fairly", "made the nations states"], "Jackson ignored the court's ruling."],
  ["The forced removal of the Cherokee in 1838–1839, when thousands died, is called the…", "Trail of Tears", ["Oregon Trail", "Wilderness Road", "Santa Fe Trail"], "Many died of cold, hunger and disease."],
  ["Which nations were among those forced west by Indian removal?", "the Cherokee, Muscogee (Creek), Choctaw, Chickasaw and Seminole", ["the Aztec and Inca", "the Pomo and Chumash", "the Maya and Olmec"], "They lived in the Southeast."],
  ["Some nations also fought each other. In the 1600s the Haudenosaunee and the Wendat (Huron) competed over…", "the fur trade", ["gold mines", "cotton farms", "railroads"], "European traders wanted beaver furs."],
  ["On the northern Plains, the Lakota and the Crow competed for…", "buffalo hunting lands", ["seaports", "gold mines", "cotton fields"], "Control of the hunt meant food and goods."],
  ["Why did competition for land and trade lead to conflict among some nations?", "Europeans' demand for furs and settlers' pressure made land scarcer", ["nations had too much land", "no one wanted furs", "the nations were all one people"], "Pressure from outside raised tensions."],
  ["European powers often made alliances with different nations, which…", "drew nations into European wars", ["ended all wars", "made every nation an ally of every other", "had no effect"], "In the French and Indian War, nations fought on both sides."],
  ["Many nations removed in the 1830s live today in…", "Oklahoma, where they govern themselves", ["Europe", "Hawaii", "nowhere"], "The Cherokee Nation's capital is Tahlequah."],
  ["Why did many settlers want American Indian land in the Southeast?", "to grow cotton and other crops", ["to build ski resorts", "to mine for diamonds", "to raise reindeer"], "Cotton farming was spreading fast.", true],
  ["How did Jackson and Marshall disagree about the Cherokee?", "Marshall's court protected the Cherokee Nation, but Jackson did not enforce the ruling", ["they agreed on everything", "Jackson protected the Cherokee and Marshall did not", "neither cared about the case"], "A court ruling needs the executive to enforce it.", true],
  ["Tecumseh fought alongside the British in the War of 1812 because he hoped…", "to protect his people's lands from US settlement", ["to become a British king", "to sell land to Spain", "to end the fur trade"], "He died in battle in 1813.", true],
  ["Which source would best show a Cherokee view of removal?", "a letter written by John Ross", ["a settler's land ad", "a Georgia land lottery ticket", "a modern cartoon"], "Look for a source by the people affected.", true],
];

// Grade 5: the war at home, state constitutions and land policy (5.6.4; 5.6.5; 5.6.6).

const HOME_FRONT_5: Q[] = [
  ["During the Revolution, many families faced hardship because…", "men were away at war and goods were scarce", ["the war ended in a week", "prices went down", "no one fought"], "Women and children ran farms and shops."],
  ["Congress paid for the war partly by printing paper money called…", "Continentals", ["pounds", "pesos", "credit cards"], "So much was printed that it lost value."],
  ['"Not worth a Continental" came to mean something was…', "worth almost nothing", ["very valuable", "made of gold", "brand new"], "Too much paper money made prices soar."],
  ["When prices keep rising and money buys less, it is called…", "inflation", ["a boycott", "a treaty", "a tariff"], "Wartime inflation hurt many families."],
  ["Some states passed laws against hoarding. Hoarding means…", "buying up and hiding goods so others can't get them", ["sharing food", "planting crops", "paying taxes"], "Hoarders hoped to sell later at high prices."],
  ["Profiteering during the war meant…", "charging unfairly high prices to make money from the war", ["giving goods away", "joining the army", "lending money for free"], "States passed laws against it."],
  ["Congress also paid for the war by…", "borrowing money from France and the Netherlands", ["selling the colonies to Spain", "taxing Britain", "finding gold in California"], "Foreign loans kept the army supplied."],
  ["Soldiers at Valley Forge in the winter of 1777–1778 lacked…", "food, clothing and shoes", ["horses only", "music", "maps"], "Congress had trouble paying for supplies."],
  ["After 1776, each former colony wrote a…", "state constitution", ["royal charter", "letter to the king", "treaty with Spain"], "States set up their own governments."],
  ["Many of the first state constitutions began with a…", "declaration of rights", ["list of taxes", "map of the state", "royal order"], "They listed freedoms the government must protect."],
  ["George Mason's Virginia Declaration of Rights (1776) later served as a model for the…", "Bill of Rights", ["Stamp Act", "Mayflower Compact", "Treaty of Paris"], "It protected freedom of the press and religion."],
  ["John Adams drafted the Massachusetts Constitution of 1780, which divided power among…", "three branches of government", ["one king and his council", "the army alone", "the churches"], "It is the oldest written constitution still in use."],
  ["State constitutions showed the ideals of the Revolution because they…", "made government get its power from the people", ["gave power to the king", "ended all elections", "banned constitutions"], "Elected leaders replaced royal governors."],
  ["Most state constitutions made the legislature strong and the governor weak because people feared…", "a powerful ruler like a king", ["too many elections", "a strong legislature", "free speech"], "They had just broken away from a king."],
  ["The Land Ordinance of 1785 divided western land into square…", "townships of 36 sections", ["circles", "states of one mile", "plantations"], "Each township was six miles on a side."],
  ["Congress sold western land to…", "raise money to pay the national debt", ["give it to Britain", "build castles", "start a navy in Europe"], "The new government had war debts."],
  ["Under the Land Ordinance of 1785, one section of every township was set aside for…", "public schools", ["a palace", "a prison", "a fort for the king"], "Education mattered to the new nation."],
  ["The Northwest Ordinance of 1787 set up a plan for territories to become…", "states equal to the original 13", ["British colonies", "Spanish missions", "a separate country"], "A territory needed 60,000 people to ask for statehood."],
  ["The Northwest Ordinance banned slavery in…", "the Northwest Territory", ["all of the South", "every state", "Virginia"], "It covered land north of the Ohio River."],
  ["Which states were later made from the Northwest Territory?", "Ohio, Indiana, Illinois, Michigan and Wisconsin", ["Texas and California", "Georgia and Florida", "Maine and Vermont"], "They lie around the Great Lakes region."],
  ["The Northwest Ordinance said that good faith should be shown toward American Indian nations and…", "their land should not be taken without their consent", ["they must leave at once", "they had no rights", "they must become soldiers"], "In practice, this promise was often broken."],
  ["The land between the Appalachians and the Mississippi was claimed by several states. They agreed to…", "give their western claims to the national government", ["sell it to Britain", "keep fighting over it", "give it to Spain"], "This helped Maryland agree to the Articles.", true],
  ["How did the Northwest Ordinance show the ideals of the Revolution?", "new states would govern themselves equally, with rights protected", ["new lands would be ruled as colonies forever", "only the king could rule them", "no one could vote there"], "It promised freedom of religion and trial by jury.", true],
  ["Why did many Loyalist families suffer during and after the war?", "their property was taken and many had to leave", ["they received land from Congress", "they were made generals", "they paid no taxes"], "About 60,000 Loyalists left.", true],
  ["Why did the value of the Continental fall so fast?", "Congress printed more and more of it without gold or silver behind it", ["it was made of gold", "people stopped buying anything", "Britain banned printing"], "More money chasing the same goods raises prices.", true],
];

// Grade 5: the American creed and patriotic songs (5.7.5; 5.7.6).

const CREED_5: Q[] = [
  ['The motto "E pluribus unum" means…', "out of many, one", ["in God we trust", "liberty or death", "land of the free"], "Many states and people form one nation."],
  ["The American creed calls on citizens to protect each person's liberty while keeping the nation…", "united", ["divided", "ruled by a king", "closed to newcomers"], "Freedom and unity go together."],
  ["Which idea is part of the American creed?", "all people are created equal and have rights", ["only kings have rights", "the government owns the people", "laws apply only to the poor"], "It comes from the Declaration of Independence."],
  ["The rule of law means…", "everyone, including leaders, must follow the law", ["leaders can ignore the law", "there are no laws", "only children follow laws"], "No one is above the law."],
  ["A citizen's responsibility in a free nation includes…", "respecting the rights of others and obeying the law", ["ignoring elections", "taking others' property", "silencing people they disagree with"], "Rights come with responsibilities."],
  ["The Pledge of Allegiance ends with the words…", "with liberty and justice for all", ["and the home of the brave", "from sea to shining sea", "let freedom ring"], "It names two American ideals."],
  ['Who wrote the words of "The Star-Spangled Banner"?', "Francis Scott Key", ["Thomas Jefferson", "Katharine Lee Bates", "Paul Revere"], "He wrote it in 1814."],
  ['"The Star-Spangled Banner" was inspired by the British attack on…', "Fort McHenry in Baltimore", ["Boston Harbor", "Yorktown", "the Alamo"], "The flag was still there at dawn."],
  ['"The Star-Spangled Banner" became the national anthem in…', "1931", ["1776", "1814", "2001"], "Congress made it official."],
  ['Which song begins "O say can you see"?', '"The Star-Spangled Banner"', ['"America the Beautiful"', '"Yankee Doodle"', '"This Land Is Your Land"'], "It is the national anthem."],
  ['"America the Beautiful" was written by…', "Katharine Lee Bates", ["Francis Scott Key", "Benjamin Franklin", "George Washington"], "She was a teacher and poet."],
  ['Katharine Lee Bates was inspired to write "America the Beautiful" by the view from…', "Pikes Peak in Colorado", ["the Statue of Liberty", "the Golden Gate Bridge", "the Liberty Bell"], "She saw the plains below."],
  ['Which song includes the words "from sea to shining sea"?', '"America the Beautiful"', ['"The Star-Spangled Banner"', '"Yankee Doodle"', '"Twinkle, Twinkle, Little Star"'], "It praises the land and its people."],
  ['Which song includes the words "let freedom ring"?', '"My Country, \'Tis of Thee"', ['"The Star-Spangled Banner"', '"Yankee Doodle"', '"Jingle Bells"'], "It is also called \"America.\""],
  ['"Yankee Doodle" was a popular song during the…', "American Revolution", ["Gold Rush", "Civil War only", "space race"], "British soldiers first sang it to tease colonists."],
  ['"Lift Every Voice and Sing" was written by…', "James Weldon Johnson and his brother J. Rosamond Johnson", ["Francis Scott Key", "Katharine Lee Bates", "Paul Revere"], "It is often called the Black national anthem."],
  ['"This Land Is Your Land" was written by…', "Woody Guthrie", ["Francis Scott Key", "Abraham Lincoln", "John Adams"], "He wrote it in 1940."],
  ["Songs like \"America the Beautiful\" express ideals such as…", "freedom, brotherhood and love of the land", ["obeying a king", "conquering others", "keeping people apart"], "Listen to the words."],
  ["Why do people stand and remove their hats for the national anthem?", "to show respect for the nation and its ideals", ["because the music is loud", "to get a better view", "because it is the law"], "It is a custom of respect."],
  ["The Constitution's first words, \"We the People,\" show that the government's power comes from…", "the people", ["the king", "the army", "other nations"], "This is popular sovereignty."],
  ["Which shows citizens safeguarding liberty within a unified nation?", "voting and speaking out peacefully on an issue", ["breaking laws they dislike", "silencing opponents", "refusing to let others vote"], "Liberty is protected by taking part.", true],
  ["Why can the American creed be described as a goal the nation keeps working toward?", "its ideals have not always been true for everyone, and people work to extend them", ["it was fully reached in 1776", "it has no ideals", "it applies to only one state"], "Think of slavery and the struggle for civil rights.", true],
  ['In "The Star-Spangled Banner," the "ramparts" are the…', "walls of the fort", ["ships' sails", "city streets", "clouds"], "Key watched the fort under attack.", true],
  ["How is the national motto different from the creed?", "a motto is a short phrase; the creed is a set of shared beliefs", ["they mean the same thing", "a motto is a song", "the creed is a law"], "Compare their length and purpose.", true],
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
      "5.1.1; 5.1.2; 5.1.3",
      "how geography and climate shaped how the major pre-Columbian nations lived, their varied customs and folklore traditions, and their economies and systems of government",
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
  copyOf(
    K("wa-g5-thirteen-colonies"),
    {
      id: "ca-g5-thirteen-colonies",
      title: "The Thirteen Colonies",
      emoji: "🏘️",
      blurb: "New England, Middle and Southern colonies",
      parentNote:
        "Why the colonies were founded, how land and climate shaped the three regions, the people who founded them, the religious life of the colonies and the First Great Awakening, and early self-government such as the Mayflower Compact and the House of Burgesses.",
      standards: [
        "5.4.1; 5.4.2; 5.4.3; 5.4.4; 5.4.7",
        "how location shaped the founding of the colonies, their founders, their religious life and the First Great Awakening, and early democratic ideas and practices",
      ],
    },
    COLONIAL_FAITH_5,
  ),
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
        "5.5.1; 5.5.2; 5.5.4",
        "how ideas and interests led to the Revolution, the significance of the Continental Congresses, and the views and lives of key people of the time",
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
      [
        "King George III believed the colonists should…",
        "obey Parliament and pay its taxes",
        ["form their own country", "elect their own king", "pay no taxes at all"],
        "He saw the colonies as part of his empire.",
      ],
      [
        "Before the war, Benjamin Franklin went to London to…",
        "speak for the colonies to the British government",
        ["become king", "join the British army", "sell the colonies"],
        "He hoped to settle the quarrel peacefully.",
      ],
      [
        "In 1774, Thomas Jefferson wrote that Parliament…",
        "had no right to make laws for the colonies",
        ["should rule the colonies forever", "could tax the colonies freely", "was always right"],
        "His ideas later shaped the Declaration.",
        true,
      ],
      [
        "George Washington, a Virginia planter, joined the Patriots because he believed…",
        "the colonies should govern themselves",
        ["Britain's taxes were fair", "kings should rule forever", "the colonies should join France"],
        "He was chosen to lead the army in 1775.",
        true,
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
  bankUnit({
    id: "ca-g5-nations-and-new-nation",
    title: "Nations & the New Nation",
    emoji: "🪶",
    blurb: "Treaties, resistance and removal",
    parentNote:
      "Broken treaties and massacres, the resistance of nations such as Tecumseh's alliance, conflicts among nations over land and trade, and leaders of the time such as John Marshall, Andrew Jackson, Logan, John Ross and Sequoyah. Told plainly, in the present tense for nations today, with nothing sacred or ceremonial.",
    standards: [
      "5.3.4; 5.3.5; 5.3.6",
      "broken treaties, massacres and resistance, competing claims among nations, and leaders such as John Marshall, Andrew Jackson, Tecumseh, Logan, John Ross and Sequoyah",
    ],
    items: NATIONS_NEW_NATION_5,
  }),
  bankUnit({
    id: "ca-g5-home-front",
    title: "The War at Home",
    emoji: "🏠",
    blurb: "Hard times, new states and western land",
    parentNote:
      "How the Revolution affected families, paying for the war, wartime inflation and laws against hoarding and profiteering, the first state constitutions, and the land policies of the Land Ordinance and the Northwest Ordinance.",
    standards: [
      "5.6.4; 5.6.5; 5.6.6",
      "the war's impact on families, paying for it and wartime inflation, the first state constitutions, and the land policies of the Continental Congress",
    ],
    items: HOME_FRONT_5,
  }),
  bankUnit({
    id: "ca-g5-american-creed",
    title: "The American Creed",
    emoji: "🎶",
    blurb: "Shared ideals and patriotic songs",
    parentNote:
      "The ideals Americans share, such as liberty, equality and the rule of law within one nation, the national motto, and songs that express American ideals, from \"The Star-Spangled Banner\" to \"America the Beautiful\".",
    standards: [
      "5.7.5; 5.7.6",
      "the American creed of individual liberty within a unified nation, and the songs that express American ideals",
    ],
    items: CREED_5,
  }),
];
