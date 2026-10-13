import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { SOURCE } from "./sources";

// California social studies, Grades 5 to 9: US history and geography to 1850 (Grade 5), ancient civilizations
// (Grade 6), medieval and early modern times (Grade 7), the United States to 1914 (Grade 8) and the Principles of
// American Democracy, standards 12.1 to 12.10 (Grade 9). Washington's and Oregon's units are copied without their
// state's places or their Tribal items, with California items added; California's own units fill the rest. Content
// about American Indian nations is light and in the present tense, and religions are described factually and
// neutrally.

const K = (id: string) => from(SOURCE, id);

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

// ---------------------------------------------------------------------------------------------------------------
// Grade 6

const HEBREWS_KUSH: Q[] = [
  [
    "Judaism was one of the first religions to teach belief in…",
    "one God",
    ["many gods", "no gods", "the Sun as a god"],
    "Belief in one God is monotheism.",
  ],
  [
    "The Hebrew Bible's first five books are called the…",
    "Torah",
    ["Qur'an", "Vedas", "Analects"],
    "They are central to Judaism.",
  ],
  [
    "According to the Hebrew Bible, Moses led the Israelites out of…",
    "Egypt",
    ["Rome", "China", "Greece"],
    "This is called the Exodus.",
  ],
  [
    "The Ten Commandments are rules about…",
    "how to worship God and treat other people",
    ["farming only", "building pyramids", "sailing ships"],
    "They are part of the Torah.",
  ],
  [
    "Abraham is important in Judaism, Christianity and Islam because he is seen as…",
    "the father of the Hebrew people and a founder of monotheism",
    ["a Roman emperor", "a Greek philosopher", "an Egyptian pharaoh"],
    "All three faiths honor him.",
  ],
  [
    "King David made which city the capital of the Israelite kingdom?",
    "Jerusalem",
    ["Athens", "Babylon", "Memphis"],
    "His son Solomon built the First Temple there.",
  ],
  [
    "The Babylonians destroyed the First Temple and sent many Jews into exile in…",
    "587 BCE",
    ["70 CE", "1492 CE", "1000 BCE"],
    "This is the Babylonian Exile.",
  ],
  [
    "The Romans destroyed the Second Temple in Jerusalem in…",
    "70 CE",
    ["587 BCE", "1776 CE", "300 BCE"],
    "Many Jews scattered across the Mediterranean.",
  ],
  [
    "The spreading of Jewish communities far from their homeland is called the…",
    "Diaspora",
    ["Exodus", "Renaissance", "Crusade"],
    "Diaspora means scattering.",
  ],
  [
    "Yohanan ben Zaccai is remembered for…",
    "founding a center of learning at Yavneh after 70 CE",
    ["building the pyramids", "leading Rome", "sailing to India"],
    "Study helped Judaism survive.",
  ],
  [
    "A synagogue is a place where Jewish people…",
    "pray and study",
    ["sell grain", "train soldiers", "bury pharaohs"],
    "Synagogues helped communities everywhere.",
  ],
  [
    "The Talmud is…",
    "a collection of Jewish law and teachings",
    ["a Roman road", "an Egyptian tomb", "a Greek play"],
    "Rabbis wrote it over centuries.",
  ],
  [
    "The story of Ruth and Naomi teaches about…",
    "loyalty and kindness",
    ["war", "trade", "farming tools"],
    "Ruth stays with Naomi.",
  ],
  [
    "Judaism's ideas of justice and the worth of each person influenced…",
    "later Western ideas of law and ethics",
    ["the Great Wall", "the Maya calendar", "Egyptian mummies"],
    "Many laws reflect these ideas.",
  ],
  [
    "The kingdom of Kush was located along the Nile River, south of…",
    "Egypt",
    ["Greece", "Rome", "Mesopotamia"],
    "Today it is part of Sudan.",
  ],
  [
    "Kush was famous for its…",
    "iron working and gold",
    ["silk", "olive oil", "potatoes"],
    "Meroë was an iron-making center.",
  ],
  [
    "In the 700s BCE, Kushite kings conquered and ruled…",
    "Egypt",
    ["Rome", "China", "Persia"],
    "They were Egypt's 25th dynasty.",
  ],
  [
    "The Kushite king Piye is known for…",
    "conquering Egypt",
    ["founding Rome", "building the Great Wall", "writing the Torah"],
    "He united Egypt and Kush.",
  ],
  [
    "Kush built more pyramids than Egypt at…",
    "Meroë and Napata",
    ["Giza only", "Athens", "Jerusalem"],
    "Kushite pyramids are small and steep.",
  ],
  [
    "Kush traded gold, ivory and ebony with…",
    "Egypt and the Mediterranean world",
    ["the Inca", "Australia", "the Maya"],
    "The Nile connected them.",
  ],
  [
    "Kush developed its own writing system called…",
    "Meroitic",
    ["cuneiform", "Latin", "Sanskrit"],
    "It is not yet fully understood.",
    true,
  ],
  [
    "Kush was ruled at times by powerful queens called…",
    "kandakes",
    ["pharaohs of Rome", "emperors of China", "consuls"],
    "Amanirenas fought Rome.",
    true,
  ],
  [
    "Why did Kush and Egypt influence each other?",
    "the Nile linked them through trade and conflict",
    [
      "they were on different continents",
      "they never met",
      "they spoke the same language",
    ],
    "Rivers carry goods and ideas.",
    true,
  ],
  [
    "Rabbinic Judaism grew after 70 CE by focusing on…",
    "study, prayer and community instead of temple sacrifice",
    ["building a new empire", "worshipping many gods", "moving to China only"],
    "Learning kept the faith alive.",
    true,
  ],
  [
    "The Hebrew prophets taught that people should…",
    "act with justice and care for the poor",
    ["build bigger pyramids", "obey only kings", "avoid all rules"],
    "Prophets called for fairness.",
    true,
  ],
  [
    "Where did the early Israelites settle?",
    "Canaan, along the eastern Mediterranean",
    ["the Indus Valley", "the Huang He Valley", "Gaul"],
    "Canaan is today's Israel and nearby lands.",
    true,
  ],
];

// ---------------------------------------------------------------------------------------------------------------
// Grade 7

const ROME_BYZANTIUM: Q[] = [
  [
    "At its height, around 117 CE, the Roman Empire circled the…",
    "Mediterranean Sea",
    ["Pacific Ocean", "Baltic Sea", "Indian Ocean"],
    "Romans called it 'our sea'.",
  ],
  [
    "Roman law influenced later legal systems with the idea that…",
    "people are innocent until proven guilty",
    ["kings make all rules", "laws are secret", "there are no courts"],
    "Many countries still use Roman legal ideas.",
  ],
  [
    "Latin, the language of Rome, is the root of…",
    "Spanish, French, Italian and Portuguese",
    ["Chinese", "Arabic", "Swahili"],
    "These are Romance languages.",
  ],
  [
    "Roman engineers built aqueducts to…",
    "carry water to cities",
    ["store grain", "launch ships", "build pyramids"],
    "Some still stand today.",
  ],
  [
    "The Pax Romana was…",
    "about 200 years of relative peace in the empire",
    ["a Roman war", "a kind of coin", "a Roman temple"],
    "Pax means peace.",
  ],
  [
    "Which was a reason the Western Roman Empire weakened?",
    "civil wars, high taxes and invasions",
    ["too much peace", "no army at all", "it was too small"],
    "Many problems added up.",
  ],
  [
    "Emperor Diocletian divided the empire into…",
    "eastern and western parts",
    ["ten kingdoms", "city-states", "two continents"],
    "It was too big to rule from one place.",
  ],
  [
    "Emperor Constantine moved the capital to…",
    "Constantinople",
    ["Athens", "Paris", "Alexandria"],
    "Today it is Istanbul.",
  ],
  [
    "Constantine was the first Roman emperor to…",
    "become a Christian",
    ["visit China", "build the Colosseum", "conquer Britain"],
    "He ended the persecution of Christians.",
  ],
  [
    "The Western Roman Empire fell in…",
    "476 CE",
    ["1453 CE", "44 BCE", "1066 CE"],
    "A Germanic leader removed the last emperor.",
  ],
  [
    "The Eastern Roman Empire lasted about a thousand more years as the…",
    "Byzantine Empire",
    ["Mongol Empire", "Mughal Empire", "Inca Empire"],
    "It fell in 1453.",
  ],
  [
    "Emperor Justinian is known for a law code that…",
    "organized Roman law",
    ["banned writing", "ended the empire", "started the Olympics"],
    "It is Justinian's Code.",
  ],
  [
    "The Hagia Sophia, a huge domed church, was built in…",
    "Constantinople",
    ["Rome", "Jerusalem", "Venice"],
    "Justinian ordered it built.",
  ],
  [
    "Empress Theodora helped rule the Byzantine Empire with…",
    "Justinian",
    ["Constantine", "Augustus", "Charlemagne"],
    "She was a strong adviser.",
  ],
  [
    "The Christian church split in 1054 into the Roman Catholic Church and the…",
    "Eastern Orthodox Church",
    ["Protestant Church", "Coptic Church only", "Anglican Church"],
    "This is called the Great Schism.",
  ],
  [
    "The leader of the Roman Catholic Church is the…",
    "pope",
    ["patriarch of Constantinople", "caliph", "emperor"],
    "The pope was based in Rome.",
  ],
  [
    "Byzantine churches are famous for…",
    "mosaics and icons",
    ["skyscrapers", "pyramids", "totem poles"],
    "Mosaics are made of small tiles.",
  ],
  [
    "Constantinople was well placed for trade because it sat between…",
    "Europe and Asia",
    ["Africa and Australia", "two deserts", "North and South America"],
    "It controlled sea routes.",
  ],
  [
    "The Byzantine Empire ended when the Ottoman Turks captured Constantinople in…",
    "1453",
    ["476", "1066", "1776"],
    "The city became Istanbul.",
  ],
  [
    "The Romans built a network of…",
    "paved roads across the empire",
    ["railroads", "canals to China", "airfields"],
    "All roads led to Rome.",
    true,
  ],
  [
    "Why did invaders such as the Visigoths enter the empire?",
    "they were pushed by the Huns and sought land",
    [
      "they were invited as tourists",
      "they wanted to learn Latin only",
      "the empire was empty",
    ],
    "Migration added pressure on the borders.",
    true,
  ],
  [
    "In 410 CE, the Visigoths…",
    "sacked the city of Rome",
    ["built Constantinople", "wrote the Code", "founded Athens"],
    "It shocked the Roman world.",
    true,
  ],
  [
    "Inflation in the late empire meant…",
    "money bought less and less",
    ["prices fell", "coins were made of more gold", "taxes ended"],
    "Rulers put less silver in coins.",
    true,
  ],
  [
    "Byzantine scholars helped keep alive…",
    "ancient Greek and Roman writings",
    ["Maya codices", "Chinese poems only", "Viking sagas"],
    "They copied old books.",
    true,
  ],
  [
    "The Eastern Orthodox Church used which language in its services?",
    "Greek",
    ["Latin only", "Arabic", "English"],
    "Greek was spoken in the East.",
    true,
  ],
  [
    "How did Rome's size make it hard to govern?",
    "news and armies took months to cross it",
    ["it had no borders", "it had too few people", "everyone spoke Chinese"],
    "Distance slowed communication.",
    true,
  ],
];

const SCIENCE_ENLIGHTENMENT: Q[] = [
  [
    "Nicolaus Copernicus argued that…",
    "Earth and the planets move around the Sun",
    [
      "the Sun moves around Earth",
      "Earth is flat",
      "stars are holes in the sky",
    ],
    "This is the heliocentric model.",
  ],
  [
    "Galileo Galilei used a telescope to see…",
    "moons orbiting Jupiter",
    ["atoms", "germs", "radio waves"],
    "It supported Copernicus.",
  ],
  [
    "Johannes Kepler showed that planets travel in…",
    "ellipses, or ovals",
    ["perfect squares", "straight lines", "zigzags"],
    "Kepler studied Mars's orbit.",
  ],
  [
    "Isaac Newton explained the motion of planets with the law of…",
    "universal gravitation",
    ["supply and demand", "the Ten Commandments", "the Magna Carta"],
    "Gravity pulls on everything.",
  ],
  [
    "The scientific method relies on…",
    "observation, experiments and evidence",
    ["guesses only", "old books only", "majority vote"],
    "Test ideas with experiments.",
  ],
  [
    "Francis Bacon urged scientists to…",
    "learn from careful observation and experiment",
    [
      "accept ancient ideas without question",
      "stop asking questions",
      "rely on dreams",
    ],
    "He promoted inductive reasoning.",
  ],
  [
    "René Descartes is known for the phrase…",
    '"I think, therefore I am"',
    ['"Veni, vidi, vici"', '"Give me liberty"', '"E pluribus unum"'],
    "He valued reason and doubt.",
  ],
  [
    "The microscope helped scientists discover…",
    "cells and tiny living things",
    ["planets", "continents", "comets"],
    "Anton van Leeuwenhoek saw microbes.",
  ],
  [
    "Roots of the Scientific Revolution included…",
    "Greek reasoning and Muslim, Jewish and Christian scholarship",
    ["only modern computers", "the Inca road system", "no earlier ideas"],
    "Scholars built on older knowledge.",
  ],
  [
    "Why did Galileo face a trial in 1633?",
    "his support for a Sun-centered universe conflicted with church teaching",
    ["he stole a telescope", "he refused to pay taxes", "he started a war"],
    "He was put under house arrest.",
  ],
  [
    "The Enlightenment was a movement that valued…",
    "reason and individual rights",
    ["rule by force", "superstition", "ending education"],
    "It is also called the Age of Reason.",
  ],
  [
    "John Locke wrote that people have natural rights to…",
    "life, liberty and property",
    ["kingship", "free land in Asia", "no rights at all"],
    "Governments should protect them.",
  ],
  [
    "Montesquieu argued that government power should be…",
    "separated into branches",
    ["held by one person", "given to the church", "kept secret"],
    "This prevents abuse of power.",
  ],
  [
    "Voltaire is known for defending…",
    "freedom of speech and religion",
    ["absolute kings", "censorship", "the feudal system"],
    "He wrote with sharp wit.",
  ],
  [
    "Jean-Jacques Rousseau wrote about the social contract, the idea that…",
    "government rests on the will of the people",
    [
      "kings rule by birth only",
      "people have no say",
      "laws come from the stars",
    ],
    "People agree to be governed.",
  ],
  [
    "Enlightenment ideas grew from the Renaissance and the…",
    "Scientific Revolution",
    ["Stone Age", "Ice Age", "Bronze Age"],
    "Reason was applied to society.",
  ],
  [
    "The Magna Carta (1215) limited the power of…",
    "the English king",
    ["the pope", "Parliament", "the Roman emperor"],
    "Nobles forced King John to sign it.",
  ],
  [
    "The English Bill of Rights (1689) said the monarch could not…",
    "raise taxes or an army without Parliament",
    ["live in London", "speak English", "own a horse"],
    "Parliament gained power.",
  ],
  [
    "Which American document reflects Locke's ideas about natural rights?",
    "the Declaration of Independence",
    ["the Treaty of Paris", "the Monroe Doctrine", "a royal decree"],
    '"Life, liberty and the pursuit of happiness."',
  ],
  [
    "Mary Wollstonecraft argued that women…",
    "deserved equal education",
    ["should not read", "had no rights", "should rule alone"],
    "She wrote in 1792.",
    true,
  ],
  [
    "Why did the printing press help spread Enlightenment ideas?",
    "books and pamphlets could be made quickly and cheaply",
    ["it made books more rare", "it banned new ideas", "it only printed maps"],
    "Ideas traveled faster.",
    true,
  ],
  [
    "Salons in Paris were places where…",
    "thinkers met to discuss new ideas",
    ["soldiers trained", "kings were crowned", "ships were built"],
    "Many were hosted by women.",
    true,
  ],
  [
    "Enlightenment thinkers influenced which revolutions?",
    "the American and French Revolutions",
    [
      "the Stone Age and Iron Age",
      "the Agricultural Revolution only",
      "the Gold Rush",
    ],
    "Ideas of rights and consent spread.",
    true,
  ],
  [
    "Newton's 1687 book on motion and gravity is called the…",
    "Principia",
    ["Iliad", "Torah", "Prince"],
    "Its full name is in Latin.",
    true,
  ],
  [
    "How did the Scientific Revolution change how people saw authority?",
    "people began to test claims with evidence instead of only trusting tradition",
    [
      "people stopped thinking",
      "kings gained more power",
      "science was banned",
    ],
    "Evidence became the test.",
    true,
  ],
  [
    "Which idea from the Enlightenment is in the US Constitution?",
    "checks and balances among branches",
    ["rule by divine right", "a single all-powerful king", "no written laws"],
    "It came from Montesquieu.",
    true,
  ],
];

// ---------------------------------------------------------------------------------------------------------------
// Grade 8

const INDUSTRIAL: Q[] = [
  [
    "After the Civil War, US industry grew because of…",
    "railroads, natural resources and new inventions",
    ["fewer workers", "no new machines", "less trade"],
    "The US became an industrial power.",
  ],
  [
    "Andrew Carnegie built a fortune in…",
    "steel",
    ["cotton", "gold mining", "movies"],
    "Steel built railroads and cities.",
  ],
  [
    "John D. Rockefeller built a fortune in…",
    "oil refining",
    ["steel", "fur trading", "farming"],
    "His company controlled most of the industry.",
  ],
  [
    "A monopoly is…",
    "one company controlling a whole industry",
    ["a small family farm", "a labor union", "a city park"],
    "Monopolies can raise prices.",
  ],
  [
    "The Sherman Antitrust Act of 1890 tried to…",
    "break up monopolies and protect competition",
    ["build railroads", "end immigration", "raise tariffs"],
    "Trusts limited competition.",
  ],
  [
    "Thomas Edison's inventions included the phonograph and a practical…",
    "light bulb",
    ["airplane", "telephone", "automobile"],
    "His lab was in Menlo Park, New Jersey.",
  ],
  [
    "Alexander Graham Bell is known for the…",
    "telephone",
    ["steel plow", "cotton gin", "telegraph"],
    "He patented it in 1876.",
  ],
  [
    "Between 1880 and 1914, many new immigrants came from…",
    "southern and eastern Europe",
    ["Australia", "Antarctica", "Canada only"],
    "Many came through Ellis Island.",
  ],
  [
    "Many immigrants arriving on the East Coast passed through…",
    "Ellis Island",
    ["Angel Island", "Alcatraz", "Plymouth Rock"],
    "It opened in 1892.",
  ],
  [
    "Many cities grew quickly because…",
    "factory jobs drew workers from farms and other countries",
    [
      "farms needed more workers",
      "cities banned newcomers",
      "factories were in the country",
    ],
    "This is urbanization.",
  ],
  [
    "Tenements were…",
    "crowded, unsafe apartment buildings",
    ["large farms", "factories", "railroad cars"],
    "Many immigrant families lived in them.",
  ],
  [
    "Jacob Riis's book How the Other Half Lives showed…",
    "the hard lives of the poor in tenements",
    ["the lives of kings", "the West's gold fields", "farm machines"],
    "He used photographs.",
  ],
  [
    "Child labor meant that many children…",
    "worked long hours in factories, mines and mills",
    ["went to college early", "ran companies", "had long vacations"],
    "Reformers fought to end it.",
  ],
  [
    "Workers formed labor unions to…",
    "bargain together for better pay and safer work",
    ["own the factories", "stop all trade", "raise prices"],
    "There is strength in numbers.",
  ],
  [
    "Samuel Gompers led the…",
    "American Federation of Labor",
    ["Sierra Club", "Grange", "Red Cross"],
    "It united skilled workers.",
  ],
  [
    "Laissez-faire means the government should…",
    "leave business mostly alone",
    ["run every business", "ban all trade", "set every price"],
    "It is French for 'let do'.",
  ],
  [
    "Farmers formed the Grange to…",
    "fight high railroad rates and help one another",
    ["build factories", "end farming", "mine gold"],
    "It began in 1867.",
  ],
  [
    "The Populist Party of the 1890s spoke for…",
    "farmers and workers",
    ["railroad owners", "bankers only", "foreign kings"],
    "It called for railroad regulation.",
  ],
  [
    "Jane Addams founded Hull House in Chicago to…",
    "help immigrants and the poor",
    ["build railroads", "sell steel", "run elections"],
    "It was a settlement house.",
  ],
  [
    "The government encouraged railroads by giving them…",
    "land grants",
    ["no help", "only taxes", "free airplanes"],
    "Railroads got millions of acres.",
  ],
  [
    "The Chinese Exclusion Act of 1882 shows that…",
    "some Americans turned against immigrants",
    [
      "immigration was always welcomed",
      "only Europeans faced limits",
      "China banned travel",
    ],
    "It was the first major limit by nationality.",
    true,
  ],
  [
    "How did federal Indian policy change Plains nations after the Civil War?",
    "the government forced nations onto reservations as settlers and railroads took land",
    ["nations gained more land", "nothing changed", "settlers moved east"],
    "Wars and broken agreements followed.",
    true,
  ],
  [
    "The slaughter of the buffalo in the 1870s and 1880s harmed Plains nations because…",
    "they depended on the buffalo for food and shelter",
    ["buffalo were pets", "buffalo pulled wagons", "it had no effect"],
    "Millions of bison were killed.",
    true,
  ],
  [
    "Why did farms in the West grow wheat and cattle while the South grew cotton?",
    "climate, soil and resources differed by region",
    [
      "laws banned other crops",
      "everyone chose randomly",
      "railroads chose the crops",
    ],
    "Geography shapes farming.",
    true,
  ],
  [
    "The Homestead Act of 1862 offered settlers…",
    "160 acres of land if they farmed it for five years",
    ["free railroad tickets", "gold coins", "a house in the city"],
    "Many families moved west.",
    true,
  ],
  [
    "The Triangle Shirtwaist Factory fire of 1911 led to…",
    "new workplace safety laws",
    ["more child labor", "lower wages", "the end of unions"],
    "Locked doors trapped workers.",
    true,
  ],
  [
    "Tariffs helped American industry by…",
    "making imported goods more expensive",
    [
      "banning all factories",
      "lowering prices on imports",
      "ending trade between states",
    ],
    "Higher prices on imports helped US makers.",
  ],
  [
    "George Westinghouse and Nikola Tesla helped spread…",
    "alternating current (AC) electricity",
    ["the steam engine", "the cotton gin", "the telegraph"],
    "AC power could travel long distances.",
  ],
  [
    "The Wright brothers made the first powered airplane flight in…",
    "1903",
    ["1869", "1849", "1776"],
    "They flew at Kitty Hawk, North Carolina.",
  ],
  [
    "Henry Ford's moving assembly line made cars…",
    "faster and cheaper to build",
    ["by hand one at a time", "more expensive", "only for kings"],
    "The Model T sold millions.",
  ],
  [
    "The Pullman Strike of 1894 began when the Pullman Company…",
    "cut wages but not rents in its company town",
    ["raised wages", "closed all railroads", "hired more children"],
    "Federal troops ended the strike.",
    true,
  ],
  [
    'Mary Harris "Mother" Jones was known for…',
    "organizing workers and fighting child labor",
    ["owning steel mills", "inventing the telephone", "running for president"],
    "She led a march of child workers in 1903.",
    true,
  ],
];

const ANTEBELLUM: Q[] = [
  [
    "The cotton gin, invented in 1793, made cotton farming…",
    "much more profitable, which increased slavery",
    ["impossible", "less common", "legal only in the North"],
    "Eli Whitney invented it.",
  ],
  [
    "The South's economy before the Civil War depended mostly on…",
    "farming cash crops like cotton with enslaved labor",
    ["factories", "fishing", "gold mining"],
    "Cotton was called 'King Cotton'.",
  ],
  [
    "Enslaved people resisted slavery by…",
    "escaping, slowing work, keeping culture and rebelling",
    ["never resisting", "buying plantations", "voting"],
    "Resistance took many forms.",
  ],
  [
    "Nat Turner led a rebellion against slavery in Virginia in…",
    "1831",
    ["1776", "1865", "1800"],
    "Southern states then passed harsher laws.",
  ],
  [
    "Frederick Douglass escaped slavery and became…",
    "a famous speaker and writer against slavery",
    ["a plantation owner", "a Confederate general", "president"],
    "He published the North Star newspaper.",
  ],
  [
    "Harriet Tubman made many trips south to…",
    "lead enslaved people to freedom",
    ["sell cotton", "join the Confederacy", "find gold"],
    "She was a conductor on the Underground Railroad.",
  ],
  [
    "Sojourner Truth spoke out for…",
    "abolition and women's rights",
    ["more slavery", "the gold rush", "railroads"],
    'Her famous speech is "Ain\'t I a Woman?"',
  ],
  [
    "William Lloyd Garrison published The Liberator to…",
    "call for an immediate end to slavery",
    ["sell newspapers about sports", "support slavery", "advertise farms"],
    "It began in 1831.",
  ],
  [
    "The Northwest Ordinance of 1787 banned slavery in…",
    "the territory north of the Ohio River",
    ["the whole country", "the South", "California"],
    "It also set up public schools.",
  ],
  [
    "Some Northern states ended slavery after the Revolution through…",
    "their state constitutions and laws",
    ["royal orders", "the Gold Rush", "foreign treaties"],
    "Vermont banned it first in 1777.",
  ],
  [
    "Free Black people in the North still faced…",
    "unfair laws and limits on voting and jobs",
    ["no limits at all", "free land", "special privileges"],
    "Freedom was not equality.",
  ],
  [
    "Free Black people in the South often had to…",
    "carry papers proving their freedom",
    ["own plantations", "serve in Congress", "live in castles"],
    "They risked being kidnapped into slavery.",
  ],
  [
    "The Missouri Compromise of 1820…",
    "admitted Missouri as a slave state and Maine as a free state",
    ["ended slavery", "made California a state", "started the Civil War"],
    "It drew a line at 36°30′.",
  ],
  [
    "The Wilmot Proviso proposed to…",
    "ban slavery in land won from Mexico",
    ["make slavery legal everywhere", "buy Alaska", "end the railroad"],
    "It never passed the Senate.",
  ],
  [
    "California's admission as a free state in 1850 was part of a compromise that also included…",
    "a stronger Fugitive Slave Act",
    ["the end of slavery", "the Louisiana Purchase", "the Missouri Compromise"],
    "It upset the balance of free and slave states.",
  ],
  [
    "The Fugitive Slave Act of 1850 required people in free states to…",
    "help return people who had escaped slavery",
    ["free all enslaved people", "move west", "pay no taxes"],
    "Many Northerners refused.",
  ],
  [
    "The Kansas-Nebraska Act of 1854 let settlers…",
    "vote on whether to allow slavery",
    ["ban all farming", "join Canada", "found missions"],
    "This was popular sovereignty.",
  ],
  [
    "Violence between pro- and antislavery settlers in the 1850s was called…",
    "Bleeding Kansas",
    ["the Boston Massacre", "the Trail of Tears", "the Whiskey Rebellion"],
    "Kansas became a battleground.",
  ],
  [
    "The Dred Scott decision of 1857 ruled that…",
    "Black Americans were not citizens and Congress could not ban slavery in territories",
    ["slavery was illegal", "all people were citizens", "Kansas was free"],
    "It inflamed the nation.",
  ],
  [
    "The annexation of Texas in 1845 raised the slavery issue because…",
    "Texas would enter as a slave state",
    ["Texas banned slavery", "Texas was part of Canada", "Texas had no people"],
    "It added slave-state power.",
    true,
  ],
  [
    "States' rights supporters argued that states could…",
    "reject federal laws they believed unconstitutional",
    [
      "print their own money only",
      "elect the president alone",
      "ignore the Constitution entirely",
    ],
    "This is called nullification.",
    true,
  ],
  [
    "John C. Calhoun of South Carolina was a leading voice for…",
    "states' rights and slavery",
    ["abolition", "women's suffrage", "free soil"],
    "He served as vice president.",
    true,
  ],
  [
    "Uncle Tom's Cabin, by Harriet Beecher Stowe, turned many Northerners against…",
    "slavery",
    ["railroads", "immigration", "the Constitution"],
    "It was published in 1852.",
    true,
  ],
  [
    "How did the South's warm climate and rich soil shape its society?",
    "large plantations grew cash crops worked by enslaved people",
    [
      "factories filled every town",
      "no one farmed",
      "it had the most railroads",
    ],
    "Geography shaped the economy.",
    true,
  ],
  [
    "The Underground Railroad was…",
    "a secret network of people and safe houses helping people escape slavery",
    [
      "a real train under the ground",
      "a railroad company",
      "a road to California",
    ],
    "Many routes led to the North and Canada.",
    true,
  ],
  [
    "The Free Soil Party wanted to…",
    "stop slavery from spreading into new territories",
    ["spread slavery west", "end all farming", "buy Cuba"],
    "Its slogan was free soil, free speech, free labor.",
    true,
  ],
];

// ---------------------------------------------------------------------------------------------------------------
// Grade 9: Principles of American Democracy

const FOUNDATIONS_9: Q[] = [
  [
    "John Locke's idea that government needs the consent of the governed means…",
    "power comes from the people",
    [
      "power comes from the king's birth",
      "only judges hold power",
      "people have no say",
    ],
    "The Declaration says so too.",
  ],
  [
    "The idea of separation of powers in the US Constitution came largely from…",
    "Montesquieu",
    ["Machiavelli", "Confucius", "Hammurabi"],
    "He wrote The Spirit of the Laws.",
  ],
  [
    "Athenian democracy gave Americans the idea of…",
    "citizens taking part in government",
    ["rule by one king", "no written law", "military rule"],
    "Athens practiced direct democracy.",
  ],
  [
    "The Roman Republic gave Americans the idea of…",
    "elected representatives",
    ["rule by the pope", "absolute monarchy", "no laws"],
    "The Senate is named after Rome's.",
  ],
  [
    "The Magna Carta influenced the US by establishing that…",
    "even rulers must obey the law",
    ["kings are above the law", "Parliament has no power", "taxes are illegal"],
    "This is the rule of law.",
  ],
  [
    "Alexis de Tocqueville, who visited in the 1830s, praised Americans for…",
    "forming voluntary associations",
    ["obeying a king", "avoiding politics", "having no laws"],
    "He wrote Democracy in America.",
  ],
  [
    "Tocqueville warned of a danger in democracy he called the…",
    "tyranny of the majority",
    ["rule of law", "separation of powers", "Bill of Rights"],
    "A majority could trample minority rights.",
  ],
  [
    "The Founders created checks and balances because they believed…",
    "people in power can abuse it",
    [
      "leaders are always perfect",
      "government should have no limits",
      "only kings are trustworthy",
    ],
    '"If men were angels…" (Federalist 51).',
  ],
  [
    "Federalist No. 10, by James Madison, argued that a large republic…",
    "controls the effects of factions",
    ["should be ruled by one party", "will always fail", "needs a king"],
    "Many groups balance one another.",
  ],
  [
    "The Bill of Rights limits…",
    "the power of government over individuals",
    ["the rights of citizens", "the number of states", "voting"],
    "The 14th Amendment applied most of it to states.",
  ],
  [
    "Classical republicanism stresses…",
    "civic virtue and the common good",
    ["only private interests", "rule by force", "no public duties"],
    "Citizens serve the community.",
  ],
  [
    "Classical liberalism stresses…",
    "individual rights and limited government",
    ["a powerful king", "no rights", "rule by the military"],
    "Locke is a key thinker.",
  ],
  [
    "The Declaration of Independence says governments are created to…",
    "secure people's unalienable rights",
    ["make kings rich", "collect taxes only", "control trade"],
    "Life, liberty and the pursuit of happiness.",
  ],
  [
    "Popular sovereignty means…",
    "the people are the source of government's power",
    [
      "the most popular person rules",
      "kings own the land",
      "the courts choose leaders",
    ],
    '"We the People…"',
  ],
  [
    "Federalism divides power between…",
    "the national and state governments",
    [
      "the president and the pope",
      "two political parties",
      "cities and businesses",
    ],
    "Both levels govern the same people.",
  ],
  [
    "Which principle lets each branch limit the others?",
    "checks and balances",
    ["judicial restraint", "manifest destiny", "laissez-faire"],
    "The veto is one example.",
  ],
  [
    "The rule of law means…",
    "everyone, including leaders, must follow the law",
    ["leaders can break laws", "laws are optional", "only judges follow laws"],
    "No one is above the law.",
  ],
  [
    "Which document did the Constitution replace?",
    "the Articles of Confederation",
    [
      "the Magna Carta",
      "the Mayflower Compact",
      "the Declaration of Independence",
    ],
    "The Articles left the national government too weak.",
  ],
  [
    "The Mayflower Compact of 1620 was an early example of…",
    "self-government by agreement",
    ["a royal law", "a peace treaty with France", "a trade deal"],
    "Settlers agreed to make fair laws.",
  ],
  [
    "The Constitution's preamble begins with the words…",
    '"We the People"',
    ['"When in the course"', '"Four score and seven"', '"I pledge allegiance"'],
    "It names the people as the source of power.",
  ],
  [
    "Why did the Founders create a republic rather than a direct democracy?",
    "representatives could deliberate and protect minority rights",
    ["they wanted a king", "they banned voting", "the country was too small"],
    "Madison feared hasty majorities.",
    true,
  ],
  [
    "Tocqueville saw both promise and peril in American democracy, including…",
    "the danger of individualism weakening civic life",
    ["too many kings", "no elections", "no newspapers"],
    "He worried people might withdraw from public life.",
    true,
  ],
  [
    'Which Federalist Paper explains why each branch needs "the means to resist encroachments" of the others?',
    "No. 51",
    ["No. 10", "No. 78", "No. 1"],
    "Ambition must counteract ambition.",
    true,
  ],
  [
    "The Constitution balances majority rule with…",
    "protection of individual and minority rights",
    ["rule by the wealthy only", "no limits on majorities", "royal power"],
    "The Bill of Rights is one safeguard.",
    true,
  ],
  [
    "The idea of natural rights says rights come from…",
    "being human, not from government",
    ["the king's permission", "a person's wealth", "the army"],
    "Governments are formed to protect them.",
    true,
  ],
  [
    "An example of shared powers is…",
    "the Senate confirming the president's nominees",
    [
      "the president writing all laws",
      "courts electing Congress",
      "states printing money",
    ],
    "Branches must work together.",
    true,
  ],
];

const CALIFORNIA_GOV_9: Q[] = [
  [
    "California voters can propose and pass laws directly through the…",
    "initiative",
    ["veto", "filibuster", "impeachment"],
    "Enough signatures put a measure on the ballot.",
  ],
  [
    "A referendum in California lets voters…",
    "approve or reject a law the legislature passed",
    [
      "choose the president",
      "name judges for life",
      "write the US Constitution",
    ],
    "Voters get the final word.",
  ],
  [
    "A recall lets California voters…",
    "remove an elected official before the term ends",
    ["change the US Constitution", "pardon criminals", "admit a new state"],
    "Governor Gray Davis was recalled in 2003.",
  ],
  [
    "California's direct democracy features were added in 1911 during the…",
    "Progressive Era",
    ["Gold Rush", "Civil War", "colonial era"],
    "Governor Hiram Johnson backed them.",
  ],
  [
    "The California Legislature has two houses: the Senate and the…",
    "Assembly",
    ["House of Commons", "Council", "Supreme Court"],
    "40 senators and 80 Assembly members.",
  ],
  [
    "The governor of California can veto a bill, and the legislature can override with…",
    "a two-thirds vote in each house",
    ["a simple majority in one house", "a court order", "a recall"],
    "Overrides are rare.",
  ],
  [
    "The governor's line-item veto lets the governor…",
    "cut specific spending items from the budget",
    [
      "veto parts of the US Constitution",
      "fire judges",
      "change election dates",
    ],
    "It applies to spending items.",
  ],
  [
    "Which is a major source of revenue for California's state government?",
    "personal income tax",
    ["tariffs on imports", "selling stamps", "printing money"],
    "It brings in the largest share.",
  ],
  [
    "Local governments in California rely heavily on…",
    "property and sales taxes",
    ["income tax only", "tariffs", "printing money"],
    "Proposition 13 (1978) limits property taxes.",
  ],
  [
    "Which is a responsibility of state and local governments?",
    "public schools, police and roads",
    ["the army", "foreign treaties", "printing currency"],
    "These are mostly state and local jobs.",
  ],
  [
    "Reserved powers are powers that…",
    "the Constitution leaves to the states",
    [
      "only the president holds",
      "belong to other countries",
      "courts may not use",
    ],
    "The 10th Amendment reserves them.",
  ],
  [
    "Concurrent powers are powers that…",
    "both the federal and state governments have",
    ["only states have", "only cities have", "no one has"],
    "Taxing and borrowing are examples.",
  ],
  [
    "The Tenth Amendment says powers not given to the federal government are…",
    "reserved to the states or the people",
    ["held by the president", "banned forever", "given to the courts"],
    "It protects state powers.",
  ],
  [
    "The Ninth Amendment says that…",
    "listing some rights does not deny others the people keep",
    [
      "only listed rights exist",
      "states may ban speech",
      "the president can add rights",
    ],
    "Rights are not limited to the list.",
  ],
  [
    "California's trial courts are called…",
    "superior courts",
    ["supreme courts", "appellate kingdoms", "federal district courts"],
    "Each county has one.",
  ],
  [
    "Appeals from California's superior courts go first to the…",
    "Courts of Appeal",
    ["US Senate", "governor", "county board"],
    "Then the California Supreme Court.",
  ],
  [
    "Federal and state courts both exist. A case about a federal law usually goes to…",
    "a federal court",
    ["a city council", "a school board", "the state legislature"],
    "Each system has its own jurisdiction.",
  ],
  [
    "Conflicts between federal and state law are resolved by the…",
    "Supremacy Clause, which makes federal law supreme",
    ["governor's choice", "majority of states", "oldest law"],
    "Courts apply it.",
  ],
  [
    "Tribal governments in California…",
    "are sovereign and deal with the state and federal governments as governments",
    ["are run by counties", "have no courts", "are part of the legislature"],
    "Over 100 tribes in California are federally recognized.",
  ],
  [
    "Public policy is formed when…",
    "issues reach the agenda and governments pass and carry out laws and rules",
    ["a single citizen decides", "courts close", "newspapers vote"],
    "Lobbying and media shape the agenda.",
  ],
  [
    "California's Citizens Redistricting Commission draws district lines to…",
    "keep lawmakers from drawing their own districts",
    ["choose the governor", "count taxes", "pick judges"],
    "Voters created it in 2008.",
    true,
  ],
  [
    "How does lawmaking in a city differ from the state?",
    "a city council passes ordinances, often with one house and a mayor",
    [
      "cities make treaties",
      "cities need Congress's approval for every rule",
      "cities have two houses always",
    ],
    "Local lawmaking is simpler.",
    true,
  ],
  [
    "Lobbying means…",
    "trying to influence lawmakers' decisions",
    ["counting votes", "running a court", "printing ballots"],
    "Groups and citizens lobby.",
    true,
  ],
  [
    "Why do some people criticize California's initiative process?",
    "costly campaigns and complex measures can confuse voters",
    ["it lets voters decide", "it has no rules", "it is never used"],
    "There are pros and cons.",
    true,
  ],
  [
    "The president's decision to drop the atomic bomb in 1945 is a case study of…",
    "the scope of presidential power in war",
    ["state budgets", "local zoning", "jury duty"],
    "Presidents command the armed forces.",
    true,
  ],
  [
    "Which body reviews whether a California law agrees with the state constitution?",
    "the California Supreme Court",
    ["the Assembly", "the governor's cabinet", "a county board"],
    "Courts interpret constitutions.",
    true,
  ],
];

const COURT_9: Q[] = [
  [
    "Marbury v. Madison (1803) established…",
    "judicial review",
    ["the right to vote", "the income tax", "segregation"],
    "Courts can strike down unconstitutional laws.",
  ],
  [
    "McCulloch v. Maryland (1819) held that…",
    "Congress has implied powers and states cannot tax a federal bank",
    [
      "states can ignore federal laws",
      "banks are illegal",
      "Maryland owned the bank",
    ],
    "The necessary and proper clause.",
  ],
  [
    "Plessy v. Ferguson (1896) allowed…",
    'racial segregation under "separate but equal"',
    ["integration of schools", "women to vote", "child labor laws"],
    "It was overturned in 1954.",
  ],
  [
    "Brown v. Board of Education (1954) ruled that…",
    "segregated public schools are unconstitutional",
    [
      "separate but equal is fine",
      "schools may charge tuition",
      "states run all colleges",
    ],
    "It overturned Plessy.",
  ],
  [
    "Miranda v. Arizona (1966) requires police to…",
    "tell arrested people their rights",
    ["search any home", "hold people forever", "skip trials"],
    '"You have the right to remain silent."',
  ],
  [
    "Gideon v. Wainwright (1963) said that…",
    "people accused of serious crimes must be given a lawyer if they can't afford one",
    ["trials are optional", "only the rich get lawyers", "juries are banned"],
    "It applies the 6th Amendment to states.",
  ],
  [
    "Tinker v. Des Moines (1969) protected students' right to…",
    "peaceful symbolic speech at school",
    ["skip school", "carry weapons", "avoid homework"],
    "Students wore black armbands.",
  ],
  [
    "Brandenburg v. Ohio (1969) held that the government may punish speech only when it…",
    "is meant to and likely to stir up immediate lawless action",
    ["criticizes officials", "is unpopular", "is printed in a newspaper"],
    "It set a high bar for limiting speech.",
  ],
  [
    "Judicial activism describes judges who…",
    "are willing to strike down laws or expand rights broadly",
    ["never rule", "always defer to lawmakers", "refuse to hear cases"],
    "Critics and supporters disagree about it.",
  ],
  [
    "Judicial restraint describes judges who…",
    "defer to elected lawmakers and precedent when possible",
    ["make new laws", "overturn every law", "ignore the Constitution"],
    "They limit their own power.",
  ],
  [
    "Precedent, or stare decisis, means courts…",
    "follow earlier rulings in similar cases",
    ["ignore earlier rulings", "let juries write laws", "rule by coin toss"],
    "It keeps law stable.",
  ],
  [
    "Korematsu v. United States (1944) upheld…",
    "the forced removal of Japanese Americans during World War II",
    ["school integration", "the right to a lawyer", "free speech"],
    "The Court later called it wrong.",
  ],
  [
    "Loving v. Virginia (1967) struck down laws that…",
    "banned marriage between people of different races",
    ["allowed segregation", "required voting tests", "limited speech"],
    "The Lovings won.",
  ],
  [
    "Obergefell v. Hodges (2015) held that…",
    "same-sex couples have a constitutional right to marry",
    [
      "states may ban all marriages",
      "only courts can marry people",
      "marriage is a federal job",
    ],
    "It relied on the 14th Amendment.",
  ],
  [
    "New York Times v. United States (1971) allowed newspapers to publish…",
    "the Pentagon Papers",
    ["secret recipes", "ballots", "tax returns"],
    "It limited prior restraint.",
  ],
  [
    "Which amendment's equal protection clause is at the center of many civil rights cases?",
    "the 14th",
    ["the 2nd", "the 3rd", "the 21st"],
    "It was ratified in 1868.",
  ],
  [
    "Mapp v. Ohio (1961) held that…",
    "illegally seized evidence can't be used in state courts",
    ["police may search anywhere", "trials are secret", "juries are optional"],
    "This is the exclusionary rule.",
  ],
  [
    "Who appoints Supreme Court justices?",
    "the president, with the Senate's consent",
    ["the House alone", "state governors", "voters directly"],
    "The Senate holds hearings and votes.",
  ],
  [
    "Supreme Court justices serve…",
    "for life, during good behavior",
    ["four years", "six years", "until age 50"],
    "Lifetime terms protect independence.",
  ],
  [
    "How many justices sit on the US Supreme Court?",
    "9",
    ["7", "12", "50"],
    "One chief justice and eight associate justices.",
  ],
  [
    "Mendez v. Westminster (1947), a California case, ruled against…",
    "segregating Mexican American students",
    ["integrating schools", "free speech", "jury trials"],
    "It came seven years before Brown.",
    true,
  ],
  [
    "Regents of the University of California v. Bakke (1978) ruled that…",
    "racial quotas in admissions were unconstitutional, but race could be one factor",
    [
      "all admissions must be random",
      "universities must close",
      "race could never be considered in any way",
    ],
    "It was later revisited.",
    true,
  ],
  [
    "Why can interpretations of the Bill of Rights change over time?",
    "new cases, new facts and new justices lead to new readings",
    [
      "the text is rewritten every year",
      "presidents edit it",
      "it is never read",
    ],
    "The words stay; readings can change.",
    true,
  ],
  [
    "In Gibbons v. Ogden (1824), the Court ruled that…",
    "Congress controls interstate commerce",
    [
      "states control all trade",
      "steamboats were illegal",
      "New York could ban ships",
    ],
    "It strengthened federal power.",
    true,
  ],
  [
    "United States v. Nixon (1974) held that…",
    "the president must obey a subpoena; executive privilege is not absolute",
    [
      "the president is above the law",
      "tapes are private property",
      "Congress can't investigate",
    ],
    "Nixon resigned soon after.",
    true,
  ],
  [
    "Shelby County v. Holder (2013) changed the Voting Rights Act by…",
    "striking down the formula for which places needed federal approval to change voting rules",
    ["ending all voting", "giving women the vote", "banning mail ballots"],
    "Debate over its effects continues.",
    true,
  ],
];

const MEDIA_9: Q[] = [
  [
    "Why is a free press important in a democracy?",
    "it informs citizens and holds officials accountable",
    ["it tells people how to vote", "it replaces elections", "it makes laws"],
    "The First Amendment protects it.",
  ],
  [
    "Which amendment protects freedom of the press?",
    "the First",
    ["the Fifth", "the Second", "the Tenth"],
    "It also protects speech and religion.",
  ],
  [
    "A responsible press checks facts and…",
    "corrects its mistakes",
    ["hides its sources' errors", "only prints rumors", "never names sources"],
    "Accuracy builds trust.",
  ],
  [
    "Investigative journalism…",
    "digs deep to uncover wrongdoing",
    [
      "only reports sports",
      "prints press releases unchanged",
      "avoids officials",
    ],
    "The Watergate stories are an example.",
  ],
  [
    "Prior restraint means the government…",
    "stops something from being published",
    ["pays for newspapers", "reviews books after printing", "owns all TV"],
    "US courts rarely allow it.",
  ],
  [
    "Which is a broadcast medium?",
    "television and radio",
    ["newspapers", "magazines", "pamphlets"],
    "Broadcast signals go through the air.",
  ],
  [
    "Social media changed politics by…",
    "letting anyone share information instantly, true or false",
    ["ending all news", "banning campaigns", "making TV illegal"],
    "Speed can spread errors.",
  ],
  [
    "Misinformation is…",
    "false information shared, even by mistake",
    ["true information", "a type of ballot", "an official record"],
    "Check before sharing.",
  ],
  [
    "Disinformation is…",
    "false information spread on purpose to mislead",
    ["an honest mistake", "a correction", "a weather report"],
    "It is deliberate.",
  ],
  [
    "How can you check if a news story is reliable?",
    "look for named sources and check other trusted outlets",
    ["trust the headline", "count the likes", "believe it if it's shocking"],
    "Lateral reading helps.",
  ],
  [
    "A press conference lets officials…",
    "speak to reporters and the public directly",
    ["pass laws", "hold trials", "count votes"],
    "Reporters can ask questions.",
  ],
  [
    "Presidents have used radio talks, such as FDR's fireside chats, to…",
    "explain policies and build public support",
    ["avoid the public", "replace Congress", "sell products"],
    "Media helps leaders reach people.",
  ],
  [
    "An editorial is…",
    "an opinion piece from a news outlet",
    ["a news report with no opinion", "an advertisement", "a court ruling"],
    "It is labeled opinion.",
  ],
  [
    "Media bias means…",
    "a slant that favors one side",
    ["perfect balance", "only weather news", "a legal ruling"],
    "Compare several sources.",
  ],
  [
    "Agenda setting means the media…",
    "influences which issues people think about",
    ["writes laws", "counts votes", "appoints judges"],
    "Coverage signals importance.",
  ],
  [
    "A political ad's main goal is to…",
    "persuade voters",
    ["teach math", "report neutral facts only", "count ballots"],
    "Look for who paid for it.",
  ],
  [
    'Officials "spin" a story when they…',
    "present facts in the light that helps them most",
    ["read facts word for word", "refuse to speak", "count votes"],
    "Spin is selective framing.",
  ],
  [
    "Why do public officials post on social media?",
    "to speak directly to citizens without reporters in between",
    ["because it is required by law", "to hold trials", "to end elections"],
    "It shapes public opinion.",
  ],
  [
    "A primary source for a news story could be…",
    "a court document or an interview with a witness",
    ["a summary on a blog", "a rumor", "a meme"],
    "Primary sources are firsthand.",
  ],
  [
    "Which question helps you judge a source?",
    "Who made this, and why?",
    ["How many colors does it use?", "Is the font big?", "Is it short?"],
    "Purpose matters.",
    true,
  ],
  [
    "The Pentagon Papers case (1971) strengthened the press's right to…",
    "publish without government prior restraint",
    ["access any classified site", "vote in Congress", "run campaigns"],
    "The Times won.",
    true,
  ],
  [
    "Echo chambers form when people…",
    "only see views they already agree with",
    ["read many sources", "talk to opponents", "check facts"],
    "Algorithms can narrow what we see.",
    true,
  ],
  [
    "Polls reported in the news can mislead if…",
    "the sample is small or not representative",
    [
      "they ask many people",
      "they show a margin of error",
      "they explain methods",
    ],
    "Check the sample and margin.",
    true,
  ],
  [
    "Why might a story with no named source be less reliable?",
    "readers can't check who said it or why",
    ["it is always false", "it is always true", "sources are illegal"],
    "Anonymous sources need extra care.",
    true,
  ],
  [
    "The Fairness Doctrine, ended in 1987, once required broadcasters to…",
    "present contrasting views on public issues",
    ["show only sports", "avoid politics", "support the president"],
    "It applied to licensed broadcasters.",
    true,
  ],
  [
    "Deepfakes are…",
    "realistic fake videos or audio made with software",
    ["live news broadcasts", "court transcripts", "public records"],
    "Verify surprising clips.",
    true,
  ],
];

// ---------------------------------------------------------------------------------------------------------------
// The units

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

export const SOCIAL_6: Unit[] = [
  copyOf(K("wa-g6-greece-rome"), {
    id: "ca-g6-greece-rome",
    title: "Greece & Rome",
    emoji: "🏛️",
    blurb: "Democracy, republic and law",
    parentNote:
      "Athens and Sparta, direct and representative democracy, the Roman Republic and Empire, and the Greek and Roman ideas found in US government.",
    standards: [
      "6.4.2; 6.4.3; 6.4.6; 6.7.1; 6.7.2",
      "early democracy in Greece, Athens and Sparta, and the Roman Republic and its influence on the US",
    ],
  }),
  bankUnit({
    id: "ca-g6-hebrews-kush",
    title: "Ancient Israel & Kush",
    emoji: "📜",
    blurb: "The early Hebrews and the kingdom of Kush",
    parentNote:
      "The origins and central teachings of Judaism, key figures and the Diaspora, how Judaism endured, and the kingdom of Kush on the Nile: its iron, trade, pyramids and rule over Egypt. Religions are described factually and neutrally.",
    standards: [
      "6.2.8; 6.3.1; 6.3.2; 6.3.3; 6.3.4; 6.3.5",
      "the location and culture of Kush, and the origins, teachings, settlements and survival of Judaism among the ancient Hebrews",
    ],
    items: HEBREWS_KUSH,
  }),
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ca-g7-rome-byzantium",
    title: "Rome's Fall & Byzantium",
    emoji: "🏺",
    blurb: "From Rome to Constantinople",
    parentNote:
      "Rome's lasting contributions, why the Western Empire fell, Constantine and Constantinople, Justinian and the Byzantine Empire, and the split between the Roman Catholic and Eastern Orthodox churches.",
    standards: [
      "7.1.1; 7.1.2; 7.1.3",
      "Rome's strengths and lasting contributions, the reasons for its decline, and the rise of Constantinople and the Byzantine Empire",
    ],
    items: ROME_BYZANTIUM,
  }),
  copyOf(
    K("or-g7-aztec-inca"),
    {
      id: "ca-g7-aztec-inca",
      title: "Maya, Aztec & Inca",
      emoji: "☀️",
      blurb: "Empires of the Americas",
      parentNote:
        "How the Maya, Aztec (Mexica) and Inca arose, their cities, farming, achievements in mathematics and astronomy, and how the Aztec and Inca empires were defeated by Spain. Maya, Nahua and Quechua peoples are living communities today.",
      standards: [
        "7.7.1; 7.7.2; 7.7.3; 7.7.4; 7.7.5",
        "the geography, societies, rise and fall, arts and achievements of the Maya, Aztec and Inca",
      ],
    },
    [
      [
        "The Maya developed a number system that included…",
        "a symbol for zero",
        ["Roman numerals", "only even numbers", "no numbers above 10"],
        "Few ancient peoples used zero.",
      ],
      [
        "Maya cities such as Tikal were built in the…",
        "rainforests of Central America",
        ["Andes Mountains", "Sahara", "Great Plains"],
        "Tikal is in today's Guatemala.",
      ],
      [
        "The Aztec grew crops on floating gardens called…",
        "chinampas",
        ["terraces", "rice paddies", "oases"],
        "They were built in lake water.",
      ],
      [
        "Today, millions of people in Mexico and Guatemala speak…",
        "Maya languages and Nahuatl",
        ["only Latin", "only English", "Greek"],
        "These languages are living today.",
      ],
    ],
  ),
  copyOf(
    K("or-g7-exploration-and-empire"),
    {
      id: "ca-g7-exploration-and-empire",
      title: "Exploration & Exchange",
      emoji: "🧭",
      blurb: "Voyages, maps and the Columbian Exchange",
      parentNote:
        "The great voyages, the ships and tools that made them possible, mapmaking, the Columbian Exchange and the rise of colonial empires and mercantilism.",
      standards: [
        "7.11.1; 7.11.2; 7.11.3",
        "the great voyages and cartography, the exchanges among Europe, Africa, Asia and the Americas, and the origins of modern capitalism",
      ],
    },
    [
      [
        "Vasco da Gama was the first European to reach India by sailing around…",
        "Africa",
        ["South America", "Australia", "Asia"],
        "He reached India in 1498.",
      ],
      [
        "The Mercator map projection helped sailors because…",
        "it kept compass directions straight",
        ["it showed true sizes", "it was round", "it had no lines"],
        "It made navigation easier.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g7-science-enlightenment",
    title: "Science & the Enlightenment",
    emoji: "🔭",
    blurb: "New ideas about nature and government",
    parentNote:
      "Copernicus, Galileo, Kepler and Newton, the scientific method, the roots of the Scientific Revolution, and the Enlightenment thinkers whose ideas about rights and government shaped the American founding.",
    standards: [
      "7.10.1; 7.10.2; 7.10.3; 7.11.4; 7.11.5; 7.11.6",
      "the roots and theories of the Scientific Revolution, the scientific method, and how Enlightenment ideas and the Magna Carta shaped democratic thought",
    ],
    items: SCIENCE_ENLIGHTENMENT,
  }),
];

export const SOCIAL_8: Unit[] = [
  copyOf(
    K("wa-g8-founding-ideals"),
    {
      id: "ca-g8-founding-ideals",
      title: "Founding Ideals",
      emoji: "📜",
      blurb: "Declaration, Constitution and their roots",
      parentNote:
        "The Magna Carta, English Bill of Rights and Mayflower Compact, the Declaration of Independence, the debates of 1787, the Federalist Papers, and the principles of the Constitution.",
      standards: [
        "8.1.2; 8.2.1; 8.2.2; 8.2.3; 8.2.4; 8.2.7",
        "the Declaration of Independence, the roots and principles of the Constitution, and the debates over it",
      ],
    },
    [
      [
        "The Federalist Papers were written to persuade New York to…",
        "ratify the Constitution",
        ["reject the Constitution", "join Canada", "declare war"],
        "Hamilton, Madison and Jay wrote them.",
      ],
      [
        "Anti-Federalists worried the Constitution would…",
        "make the national government too strong",
        ["make states too strong", "end elections", "create a king"],
        "They pushed for a Bill of Rights.",
      ],
      [
        "Jefferson's Virginia Statute for Religious Freedom was a forerunner of…",
        "the First Amendment",
        [
          "the Second Amendment",
          "the Articles of Confederation",
          "the Electoral College",
        ],
        "It separated church and state in Virginia.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-new-nation"),
    {
      id: "ca-g8-new-nation",
      title: "A New Nation",
      emoji: "🦅",
      blurb: "The first presidents to the Monroe Doctrine",
      parentNote:
        "The first presidents and parties, judicial review, the Louisiana Purchase, Lewis and Clark, the War of 1812 and early foreign policy.",
      standards: [
        "8.3.4; 8.3.5; 8.4.1; 8.4.2; 8.5.1; 8.5.2",
        "the first political parties, early resistance movements, territorial growth, famous speeches, the War of 1812 and early foreign policy",
      ],
    },
    [
      [
        "The first two political parties formed around…",
        "Alexander Hamilton and Thomas Jefferson",
        ["Lincoln and Douglas", "Grant and Lee", "Adams and Kennedy"],
        "Federalists and Democratic-Republicans.",
      ],
      [
        "George Washington's Farewell Address warned against…",
        "political parties and permanent foreign alliances",
        ["building roads", "public schools", "farming"],
        "He gave it in 1796.",
      ],
      [
        "The Whiskey Rebellion of 1794 showed that…",
        "the new federal government could enforce its laws",
        [
          "states could ignore taxes",
          "the army was disbanded",
          "Britain still ruled",
        ],
        "George Washington sent troops to end it.",
      ],
      [
        "The Monroe Doctrine of 1823 warned European powers not to…",
        "start new colonies in the Americas",
        ["trade with the US", "visit Mexico", "cross the Atlantic"],
        "It became a pillar of US foreign policy.",
      ],
      [
        "During the War of 1812, British troops burned…",
        "the White House",
        ["the Alamo", "the Golden Gate", "Fort Ross"],
        "Dolley Madison saved a portrait.",
      ],
      [
        "The Star-Spangled Banner was written during the attack on…",
        "Fort McHenry in Baltimore",
        ["Bunker Hill", "Gettysburg", "Pearl Harbor"],
        "Francis Scott Key wrote it in 1814.",
      ],
      [
        "Jefferson's first inaugural address said…",
        '"We are all Republicans, we are all Federalists"',
        [
          '"Remember the Alamo"',
          '"Give me liberty"',
          '"Four score and seven years ago"',
        ],
        "He called for unity.",
      ],
      [
        "Shays' Rebellion (1786–1787) convinced many leaders that…",
        "the Articles of Confederation were too weak",
        [
          "the states needed kings",
          "taxes should end",
          "Britain should return",
        ],
        "Farmers rose up in Massachusetts.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-westward"),
    {
      id: "ca-g8-westward",
      title: "Westward Expansion",
      emoji: "🐂",
      blurb: "Manifest Destiny and its costs",
      parentNote:
        "Jackson and Indian removal, Manifest Destiny, Mexican California and the land grants, Texas and the Mexican-American War, and the Gold Rush, told accurately for the people who moved and the nations who lost their lands.",
      standards: [
        "8.8.1; 8.8.2; 8.8.4; 8.8.5; 8.8.6",
        "Jacksonian democracy and Indian removal, westward expansion, water rights, Mexican settlements, and the Texas and Mexican-American wars",
      ],
    },
    [
      [
        "The Indian Removal Act of 1830 was signed by President…",
        "Andrew Jackson",
        ["George Washington", "Abraham Lincoln", "James Polk"],
        "It forced nations from the Southeast.",
      ],
      [
        "The forced march of the Cherokee to Indian Territory in 1838 is called the…",
        "Trail of Tears",
        ["Oregon Trail", "Santa Fe Trail", "Pony Express"],
        "Thousands died on the way.",
      ],
      [
        "Mexican land grants in California created large…",
        "ranchos for raising cattle",
        ["factories", "railroad towns", "gold mines"],
        "Californios owned many.",
      ],
      [
        "The Treaty of Guadalupe Hidalgo (1848) promised Mexicans who stayed in the US…",
        "citizenship and protection of their property",
        ["free gold", "a new country", "nothing"],
        "Many still lost their land.",
      ],
      [
        "Why did water rights matter so much in the West?",
        "the dry land made river water scarce and valuable",
        ["it rained too much", "rivers were useless", "no one farmed"],
        "Whoever controls water controls farming.",
      ],
      [
        "Jacksonian democracy expanded voting to…",
        "most white men, without property requirements",
        ["women", "all people", "enslaved people"],
        "It was still limited.",
      ],
      [
        "President James K. Polk led the US into war with…",
        "Mexico in 1846",
        ["Spain in 1898", "Britain in 1812", "France in 1798"],
        "He wanted California and the Southwest.",
      ],
      [
        "At the Alamo in 1836, Texan defenders were defeated by…",
        "Mexican troops under Santa Anna",
        ["British troops", "the US Army", "Spanish missionaries"],
        '"Remember the Alamo" became a rallying cry.',
      ],
    ],
  ),
  copyOf(
    K("wa-g8-industry-reform"),
    {
      id: "ca-g8-industry-reform",
      title: "Factories & Reformers",
      emoji: "⚙️",
      blurb: "Inventions, immigrants and reform",
      parentNote:
        "The Industrial Revolution in the North, canals, roads and railroads, immigration, public schools, and the abolition and women's rights movements before 1861.",
      standards: [
        "8.6.1; 8.6.2; 8.6.3; 8.6.5; 8.6.6",
        "industrialization, transportation networks, immigration, the American education system and the women's suffrage movement",
      ],
    },
    [
      [
        "The Seneca Falls Convention of 1848 called for…",
        "equal rights for women, including the vote",
        ["ending all schools", "a new king", "closing factories"],
        "Elizabeth Cady Stanton wrote its Declaration of Sentiments.",
      ],
      [
        "Horace Mann worked to build…",
        "free public schools for all children",
        ["private castles", "railroads", "canals only"],
        "He led schools in Massachusetts.",
      ],
      [
        "The Lowell mills in Massachusetts hired many…",
        "young women from farms",
        ["kings", "soldiers", "sailors from Spain"],
        "They were called mill girls.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-civil-war"),
    {
      id: "ca-g8-civil-war",
      title: "The Civil War",
      emoji: "⚔️",
      blurb: "Slavery, secession and war",
      parentNote:
        "How the conflict over slavery led to secession and war, Lincoln's leadership, key events and people from Fort Sumter to Appomattox, and how enslaved people helped win their own freedom.",
      standards: [
        "8.10.1; 8.10.2; 8.10.3; 8.10.4; 8.10.5; 8.10.6; 8.10.7",
        "state and federal authority, the geography of North and South, secession, Lincoln, the war's leaders and major battles, and its effects",
      ],
    },
    [
      [
        "At the start of the Civil War, the North had more…",
        "factories, railroads and people",
        ["cotton plantations", "enslaved workers", "warm farmland"],
        "Industry gave the Union an advantage.",
      ],
      [
        "Which advantage did the South have early in the war?",
        "fighting on home ground with skilled generals",
        ["more factories", "a larger navy", "more railroads"],
        "Defenders knew the land.",
      ],
      [
        "The Union's Anaconda Plan aimed to…",
        "blockade Southern ports and control the Mississippi",
        ["invade Canada", "buy Cuba", "end the war in a week"],
        "Like a snake squeezing its prey.",
      ],
      [
        "California, a free state, mostly supported the…",
        "Union",
        ["Confederacy", "British", "neutral Mexico"],
        "Its gold helped pay for the war.",
      ],
      [
        "Ulysses S. Grant led the Union to victory at…",
        "Vicksburg in 1863",
        ["Fort Sumter in 1861", "Yorktown in 1781", "the Alamo in 1836"],
        "It split the Confederacy in two.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g8-divided-nation",
    title: "A Nation Divided",
    emoji: "🧭",
    blurb: "The South, abolition and compromise",
    parentNote:
      "Cotton and slavery in the South, the resistance of enslaved people, free Black Americans in the North and South, abolitionists, and the compromises and conflicts from the Missouri Compromise to the Dred Scott decision.",
    standards: [
      "8.7.1; 8.7.2; 8.7.4; 8.9.1; 8.9.2; 8.9.3; 8.9.4; 8.9.5; 8.9.6",
      "the South's economy and slavery, free Black Americans, the abolition movement, and the compromises and conflicts over slavery's spread",
    ],
    items: ANTEBELLUM,
  }),
  bankUnit({
    id: "ca-g8-industrial-america",
    title: "Industrial America",
    emoji: "🏭",
    blurb: "Big business, cities and workers",
    parentNote:
      "Industry, railroads and inventors after the Civil War, big business and monopolies, new immigrants and growing cities, child labor and unions, farmers' movements, and federal Indian policy on the Plains.",
    standards: [
      "8.12.1; 8.12.2; 8.12.3; 8.12.4; 8.12.5; 8.12.6; 8.12.7; 8.12.8; 8.12.9",
      "the transformation of the economy after the Civil War: industry, federal Indian policy, business, immigration and cities, labor, farmers' movements and inventors",
    ],
    items: INDUSTRIAL,
  }),
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ca-g9-foundations",
    title: "Foundations of Democracy",
    emoji: "📜",
    blurb: "Ideas behind the Constitution",
    parentNote:
      "Greek, Roman, English and Enlightenment roots of American government, Tocqueville's view of American democracy, republican and liberal ideas, the Federalist Papers and the Bill of Rights as a limit on government.",
    standards: [
      "12.1.1; 12.1.2; 12.1.3; 12.1.4; 12.1.5; 12.1.6",
      "the influence of earlier thinkers, Tocqueville on American democracy, the Constitution's balance of ideas, separated powers and the Bill of Rights as limits on government",
    ],
    items: FOUNDATIONS_9,
  }),
  copyOf(K("wa-g9-three-branches"), {
    id: "ca-g9-three-branches",
    title: "Three Branches",
    emoji: "🏛️",
    blurb: "Congress, the president and the courts",
    parentNote:
      "How Articles I, II and III set up Congress, the presidency and the courts, terms and numbers, amending the Constitution, and choosing and confirming justices.",
    standards: [
      "12.4.1; 12.4.2; 12.4.4; 12.4.5; 12.4.6",
      "Articles I, II and III, amending the Constitution, and selecting and confirming Supreme Court justices",
    ],
  }),
  copyOf(K("wa-g9-rights"), {
    id: "ca-g9-rights",
    title: "Rights & Responsibilities",
    emoji: "⚖️",
    blurb: "The Bill of Rights and citizens' duties",
    parentNote:
      "The rights in the Bill of Rights and later amendments, civil rights laws, citizens' duties such as jury service and paying taxes, and how rights are balanced with the common good.",
    standards: [
      "12.2.1; 12.2.3; 12.2.5; 12.5.4",
      "the rights in the Bill of Rights, citizens' legal obligations, the link between rights and obligations, and changing interpretations of civil rights",
    ],
  }),
  bankUnit({
    id: "ca-g9-supreme-court",
    title: "Landmark Supreme Court Cases",
    emoji: "👩‍⚖️",
    blurb: "How the Court reads the Constitution",
    parentNote:
      "Landmark decisions from Marbury v. Madison to recent cases, judicial activism and restraint, precedent, and how readings of the Bill of Rights and civil rights have changed, presented factually and from more than one side.",
    standards: [
      "12.5.1; 12.5.2; 12.5.3; 12.5.4",
      "landmark Supreme Court interpretations of the Constitution, judicial activism and restraint, and changing readings of rights",
    ],
    items: COURT_9,
  }),
  copyOf(
    K("wa-g9-elections"),
    {
      id: "ca-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "From pre-registering to the Electoral College",
      parentNote:
        "How Californians register and vote, the top-two primary, parties and nominations, the Electoral College, polls and campaign money, and redistricting.",
      standards: [
        "12.6.1; 12.6.2; 12.6.3; 12.6.4; 12.6.6",
        "political parties, presidential nominations, polls, ads and campaign funding, ways citizens take part, turnout and redistricting",
      ],
    },
    [
      [
        "In California, 16- and 17-year-olds can…",
        "pre-register to vote",
        ["vote in every election", "run for governor", "serve on juries"],
        "They are registered automatically at 18.",
      ],
      [
        "Since 2022, every registered California voter is…",
        "mailed a ballot for each statewide election",
        [
          "required to vote in person",
          "banned from mail voting",
          "sent a ballot only on request",
        ],
        "Voters can still vote in person.",
      ],
      [
        "California uses a top-two primary, which means…",
        "the top two vote-getters advance, whatever their party",
        [
          "only two parties may run",
          "each party picks one candidate",
          "there is no primary",
        ],
        "Voters passed it in 2010.",
      ],
      [
        "How many electoral votes does California have in the 2024 to 2028 elections?",
        "54",
        ["55", "38", "2"],
        "It has the most of any state.",
      ],
      [
        "How many members does California send to the US House?",
        "52",
        ["53", "2", "80"],
        "Seats are based on population.",
      ],
      [
        "Who oversees elections statewide in California?",
        "the Secretary of State",
        ["the governor's chef", "the chief justice", "the mayor of Sacramento"],
        "County registrars run local voting.",
      ],
      [
        "A California mail ballot counts if it is postmarked by Election Day and…",
        "arrives within seven days",
        [
          "arrives a month later",
          "is never signed",
          "is mailed after the results",
        ],
        "Signatures are checked.",
      ],
      [
        "Redistricting happens every ten years after the…",
        "census",
        ["Olympics", "World Cup", "Super Bowl"],
        "Lines shift as populations change.",
      ],
    ],
  ),
  copyOf(
    K("wa-g9-lawmaking"),
    {
      id: "ca-g9-lawmaking",
      title: "How Laws Are Made",
      emoji: "📑",
      blurb: "Bills, vetoes and initiatives",
      parentNote:
        "How a bill becomes law in Congress and in Sacramento, committees, vetoes and overrides, regulations, and how citizens and interest groups influence lawmaking.",
      standards: [
        "12.7.5; 12.7.6",
        "how public policy is formed and carried out, and lawmaking at the federal, state and local levels",
      ],
    },
    [
      [
        "In California, a bill passed by both houses goes to the governor, who has how long to act?",
        "12 days",
        ["1 year", "1 hour", "no limit"],
        "Otherwise it becomes law without a signature.",
      ],
      [
        "The California Legislature meets in the State Capitol in…",
        "Sacramento",
        ["Los Angeles", "San Francisco", "Fresno"],
        "It has a Senate and an Assembly.",
      ],
      [
        "To override a governor's veto, the California Legislature needs…",
        "a two-thirds vote in each house",
        ["a simple majority", "a court order", "a recall"],
        "Overrides are rare.",
      ],
      [
        "In California, citizens can put a proposed law on the ballot through…",
        "an initiative petition",
        ["a veto", "a filibuster", "an executive order"],
        "They must gather enough signatures.",
      ],
      [
        "Members of the public can speak about a bill at a…",
        "committee hearing",
        ["closed jury room", "private dinner", "governor's home"],
        "Committees take public testimony.",
      ],
      [
        "An interest group that hires people to talk to lawmakers is…",
        "lobbying",
        ["voting", "campaigning for president", "running a court"],
        "Lobbyists must register in California.",
      ],
    ],
  ),
  copyOf(K("wa-g9-civic-action"), {
    id: "ca-g9-civic-action",
    title: "Taking Part",
    emoji: "📣",
    blurb: "Speak up, check facts, decide together",
    parentNote:
      "Ways to take part before and after 18, volunteering and civil society, petitions and peaceful protest, deliberating about tensions in our democracy, and checking news for reliability.",
    standards: [
      "12.2.4; 12.3.1; 12.3.2; 12.10",
      "civic-mindedness, how civil society lets people associate and influence government, and tensions within our constitutional democracy",
    ],
  }),
  copyOf(K("or-g9-forms-of-government"), {
    id: "ca-g9-forms-of-government",
    title: "Forms of Government",
    emoji: "🌐",
    blurb: "Democracy, monarchy and more",
    parentNote:
      "Democracies, monarchies, oligarchies and authoritarian states, federal, confederal and unitary systems, and the roots of American ideas about limited government.",
    standards: [
      "12.9.1; 12.9.2; 12.9.3",
      "different political systems, how power is shared and limited, and federal, confederal and unitary systems",
    ],
  }),
  bankUnit({
    id: "ca-g9-california-government",
    title: "Governing California",
    emoji: "🐻",
    blurb: "State, local and tribal government",
    parentNote:
      "California's initiative, referendum and recall, its legislature, governor and courts, state and local revenue, reserved and concurrent powers, the Ninth and Tenth Amendments, tribal governments, and how conflicts between levels of government are resolved.",
    standards: [
      "12.6.5; 12.7.1; 12.7.2; 12.7.3; 12.7.4; 12.7.7; 12.7.8",
      "direct democracy, conflicts between levels of government, state and local revenue, reserved and concurrent powers, the courts and presidential power",
    ],
    items: CALIFORNIA_GOV_9,
  }),
  bankUnit({
    id: "ca-g9-media",
    title: "Media & Democracy",
    emoji: "📰",
    blurb: "A free press and a careful public",
    parentNote:
      "Why a free and responsible press matters, broadcast, print and online media, how officials use media to shape opinion, and how to spot misinformation, bias and spin.",
    standards: [
      "12.8.1; 12.8.2; 12.8.3",
      "a free and responsible press, the roles of broadcast, print and electronic media, and how officials use media to shape public opinion",
    ],
    items: MEDIA_9,
  }),
];
