import type { Unit } from "../../types";
import { SOCIAL_8 as CALIFORNIA_8 } from "../../california/units/social-g8";
import { bankUnit, type Q } from "../own";
import { copyOf, from, timelineUnit, type Dated } from "./kit";

// Arkansas's own Grade 7 social studies units (`ar-` ids). Arkansas History: the six natural regions, their resources,
// water and natural events (G.1.ARH.1 to G.1.ARH.5), the first peoples of Arkansas and the Caddo, Osage and Quapaw
// (H.1.ARH.1, H.1.ARH.2), European exploration and the French and Spanish years (H.1.ARH.1, H.3.7.3), and the territory
// and early statehood (H.1.ARH.3); plus a copy of California's westward expansion unit without its California, Texas and
// treaty questions, with Arkansas items added (H.3.7.15, H.3.7.17, H.3.7.18). Indigenous nations are named one by one,
// never as one people; living nations are in the present tense and nothing sacred or ceremonial is named.

const LAND: Q[] = [
  ["How many natural regions do geographers usually divide Arkansas into?", "6", ["2", "4", "10"], "Two highland regions, two lowland plains, a river valley and a ridge."],
  ["The Ozark Plateau is in which part of Arkansas?", "the north and northwest", ["the southeast", "the far south", "the east along the Mississippi"], "Rugged hills and deep valleys."],
  ["The Ouachita Mountains are unusual because they run…", "east to west", ["north to south", "in a circle", "under the sea"], "Most US ranges run north to south."],
  ["The flat, rich farmland along the Mississippi River in eastern Arkansas is the…", "Delta (Mississippi Alluvial Plain)", ["Ozark Plateau", "Ouachita Mountains", "Great Plains"], "Rivers left rich soil here."],
  ["Crowley's Ridge is…", "a narrow line of hills that rises above the flat Delta", ["a mountain range in the Ozarks", "a desert in the south", "a lake made by a dam"], "It runs north to south in eastern Arkansas."],
  ["The region of pine forests in southern Arkansas is the…", "West Gulf Coastal Plain", ["Ozark Plateau", "Crowley's Ridge", "Delta"], "Timber country."],
  ["The highest point in Arkansas is…", "Mount Magazine", ["Crowley's Ridge", "Pinnacle Mountain", "Petit Jean Mountain"], "About 2,753 feet high."],
  ["The river that forms most of Arkansas's eastern border is the…", "Mississippi River", ["Arkansas River", "White River", "Ouachita River"], "The biggest river in North America."],
  ["The Arkansas River flows across the state past Fort Smith and…", "Little Rock", ["Fayetteville", "El Dorado", "Jonesboro"], "The capital is on its banks."],
  ["Arkansas grows more of which crop than any other state?", "rice", ["oranges", "wheat", "potatoes"], "Delta fields are flooded to grow it."],
  ["Why is the Delta good for growing rice?", "It is flat, with rich soil and plenty of water", ["It is high and rocky", "It is dry and sandy", "It is covered in snow"], "Rice needs flooded fields."],
  ["Crater of Diamonds State Park, near Murfreesboro, lets visitors…", "search for real diamonds and keep what they find", ["ride roller coasters", "see the ocean", "climb the highest peak"], "A rare place open to the public."],
  ["Hot Springs, in the Ouachita Mountains, is famous for its…", "naturally hot spring water", ["glaciers", "sand dunes", "volcano"], "A national park today."],
  ["The Buffalo River in the Ozarks became America's first…", "national river", ["state capital", "canal", "dam"], "Protected in 1972."],
  ["The McClellan-Kerr Arkansas River Navigation System uses locks and dams so that…", "barges can travel up the Arkansas River", ["the river runs backward", "the river dries up", "trains can cross the river"], "It opened in 1971."],
  ["Many of the big lakes in Arkansas, such as Bull Shoals and Greers Ferry, were made by…", "dams built on rivers", ["glaciers", "meteors", "volcanoes"], "They are reservoirs."],
  ["Lakes made by dams in Arkansas are used for…", "flood control, electricity and recreation", ["growing coffee", "mining gold", "making salt"], "One lake, many uses."],
  ["Arkansas is part of a stormy area of the central United States sometimes called…", "Tornado Alley", ["the Rust Belt", "the Sun Belt", "the Corn Belt"], "Spring storms can spin up tornadoes."],
  ["In 1811 and 1812, a series of strong earthquakes centered near New Madrid shook…", "northeastern Arkansas", ["only the Pacific coast", "Hawaii", "the Gulf of Mexico"], "The New Madrid Seismic Zone."],
  ["The Flood of 1927 covered much of eastern Arkansas when…", "the Mississippi River and its tributaries overflowed their levees", ["a hurricane hit the Ozarks", "a dam broke on Mount Magazine", "snow melted on the Ouachitas"], "One of the worst floods in US history."],
  ["Much of Arkansas's natural gas comes from a deep rock layer in north-central Arkansas called the…", "Fayetteville Shale", ["Gulf Stream", "Delta rice fields", "Great Salt Lake"], "A rock layer deep underground.", true],
  ["Why did the mountains of north and west Arkansas slow early settlement?", "Steep, rocky land was hard to travel and farm", ["They were covered in ice", "They were part of another country", "They had no water at all"], "Settlers chose easier routes.", true],
  ["Delta farmers pump water from aquifers to flood rice fields. A problem with pumping too much is that…", "the groundwater level drops", ["the aquifer fills with oil", "the soil turns into rock", "rain stops falling"], "Underground water refills slowly.", true],
  ["Southern Arkansas produces much of the nation's bromine, a chemical taken from…", "salty underground water (brine)", ["tree sap", "rice straw", "river sand"], "Wells pump up the brine.", true],
  ["The severe drought of 1930 hurt Arkansas farmers because…", "crops dried up and many families had no food", ["too much rain fell", "the rivers froze", "the soil turned to sand overnight"], "Little rain fell for months.", true],
];

const PEOPLES: Q[] = [
  ["People have lived in what is now Arkansas for…", "thousands of years", ["about 100 years", "about 300 years", "only since 1836"], "Long before Europeans came."],
  ["Archaeologists learn about early peoples of Arkansas mainly from…", "artifacts such as tools, pottery and mounds", ["old newspapers", "photographs", "television"], "No written records survive."],
  ["The Mississippian peoples of Arkansas lived in towns and built…", "large earthen mounds", ["stone castles", "brick skyscrapers", "steel bridges"], "Flat-topped mounds."],
  ["Mississippian farmers depended mainly on…", "corn, beans and squash", ["wheat and oats", "rice and tea", "potatoes and apples"], "Often called the Three Sisters."],
  ["Parkin Archeological State Park in northeast Arkansas protects the site of…", "a Mississippian town with a large mound", ["a Spanish fort", "a gold mine", "a Civil War battle"], "On the St. Francis River."],
  ["Toltec Mounds near Little Rock was built by the…", "Plum Bayou people, long before Europeans came", ["Toltec people of Mexico", "French settlers", "Spanish soldiers"], "The name Toltec was a mistake."],
  ["Which three nations lived in Arkansas when Europeans arrived?", "the Caddo, Osage and Quapaw", ["the Aztec, Maya and Inca", "the Vikings, Celts and Saxons", "the Zulu, Maasai and Yoruba"], "Three different nations."],
  ["The Caddo lived mainly in which part of Arkansas?", "the southwest, along the Red and Ouachita Rivers", ["the far northeast", "the Ozark mountaintops only", "the Mississippi Delta only"], "Near the Red River."],
  ["The Caddo were known as skilled…", "potters and farmers", ["shipbuilders and whalers", "gold miners", "glassmakers"], "Their pottery is admired today."],
  ["The Osage mostly hunted in which part of Arkansas?", "the Ozarks in the north and west", ["the Gulf Coast", "the far southeast", "the Delta swamps only"], "Their villages were farther north."],
  ["The Quapaw lived near where the Arkansas River meets the…", "Mississippi River", ["Red River", "White River", "Buffalo River"], "In eastern Arkansas."],
  ["The name Arkansas comes from a name other nations used for the…", "Quapaw", ["Caddo", "Osage", "Spanish"], "French explorers wrote it down."],
  ["Why did the Caddo, Osage and Quapaw each live in different parts of Arkansas?", "each nation used the land, rivers and animals of its own homeland", ["they were all one nation", "they had no homelands", "Europeans told them where to live"], "Different places, different ways of life."],
  ["How did diseases brought by Europeans affect the nations of Arkansas?", "Smallpox and other diseases killed many people", ["They had no effect", "They made people stronger", "They only affected animals"], "People had no immunity."],
  ["In the early 1800s, the US government pressured the Osage and the Quapaw to…", "give up their lands in Arkansas", ["become a state", "build Little Rock", "join the French army"], "Land cessions came one after another."],
  ["The forced removal of Native nations from the Southeast in the 1830s is known as the…", "Trail of Tears", ["Oregon Trail", "Santa Fe Trail", "Silk Road"], "Many people died along the way."],
  ["Which nations were forced through Arkansas on the Trail of Tears?", "the Cherokee, Choctaw, Muscogee (Creek), Chickasaw and Seminole", ["the Aztec and Inca", "the Caddo and Osage only", "the Vikings"], "Five nations from the Southeast."],
  ["Many groups on the Trail of Tears passed through Little Rock on their way to…", "Indian Territory, now Oklahoma", ["Canada", "Florida", "Mexico City"], "West of Arkansas."],
  ["Today the Caddo Nation, the Osage Nation and the Quapaw Nation are…", "living nations with their own governments", ["gone from history", "part of France", "only stories"], "Present tense!"],
  ["The Caddo Nation, Osage Nation and Quapaw Nation today have their headquarters in…", "Oklahoma", ["Florida", "Ohio", "Hawaii"], "West of Arkansas.", true],
  ["The Quapaw signed treaties in 1818 and 1824 that…", "gave up nearly all their land in Arkansas", ["made them owners of the whole state", "created Arkansas Post", "ended the Civil War"], "They were later removed west.", true],
  ["Why did the Trail of Tears follow rivers such as the Arkansas River?", "Boats and riverside roads were the main ways to travel", ["Rivers were the only places with no people", "The government owned all rivers", "Rivers were shorter than roads"], "Some groups traveled by steamboat.", true],
  ["Mississippian towns were often built on river floodplains because…", "the soil was rich and rivers were travel routes", ["floodplains never flooded", "there were no animals there", "the land was too rocky to farm"], "Rich soil and easy travel.", true],
  ["Why do historians use the stories and records of the Caddo, Osage and Quapaw nations?", "to understand their history from their own point of view", ["because no one else lived in Arkansas", "to find buried gold", "to write new laws"], "Many voices, fuller history.", true],
];

const EXPLORERS: Q[] = [
  ["The first Europeans to reach Arkansas came with the Spanish explorer…", "Hernando de Soto", ["Christopher Columbus", "Henry Hudson", "Captain James Cook"], "In 1541."],
  ["De Soto's expedition crossed the Mississippi into Arkansas in…", "1541", ["1492", "1673", "1803"], "Just under 50 years after Columbus."],
  ["De Soto's expedition was searching for…", "gold and riches", ["a place to build a railroad", "oil", "a route for trucks"], "Spain wanted wealth."],
  ["In 1673, a French priest and an explorer canoed down the Mississippi to the mouth of the Arkansas River. They were…", "Marquette and Jolliet", ["Lewis and Clark", "Hunter and Dunbar", "Cortés and Pizarro"], "They met the Quapaw."],
  ["Why did Marquette and Jolliet turn back instead of going to the Gulf of Mexico?", "They feared meeting Spanish soldiers farther south", ["They ran out of river", "They found gold", "Their canoes turned into ships"], "Spain claimed the lands to the south."],
  ["In 1682, La Salle claimed the whole Mississippi River valley for…", "France", ["Spain", "England", "Portugal"], "He named it Louisiana."],
  ["La Salle named the land Louisiana in honor of…", "King Louis XIV of France", ["Queen Elizabeth I", "George Washington", "King Ferdinand of Spain"], "Louis → Louisiana."],
  ["Arkansas Post, founded in 1686, was the first permanent European settlement in…", "the lower Mississippi River valley", ["New England", "Florida", "the Great Plains"], "A French trading post."],
  ["Who founded Arkansas Post in 1686?", "Henri de Tonti", ["Hernando de Soto", "Thomas Jefferson", "Stephen F. Austin"], "He traveled with La Salle."],
  ["French traders at Arkansas Post traded with the Quapaw mainly for…", "furs and deerskins", ["gold coins", "cotton", "oil"], "The fur trade."],
  ["In 1722, Bénard de la Harpe named a rocky bluff on the Arkansas River…", "the Little Rock", ["the Big Apple", "the Rocky Top", "the Golden Gate"], "La Petite Roche in French."],
  ["Spain's main goals in exploring the Americas are often summed up as…", "gold, God and glory", ["furs, fish and forts", "tea, taxes and trade", "farms, families and freedom"], "Wealth, religion and fame."],
  ["France's North American settlements grew mainly around the…", "fur trade", ["cotton trade", "tea trade", "gold rush"], "Beaver and deer skins were valuable."],
  ["In 1762, France gave the Louisiana territory, including Arkansas, to…", "Spain", ["England", "the United States", "Russia"], "Spain held it for almost 40 years."],
  ["Arkansas belonged in turn to which three nations?", "Spain, France and the United States", ["England, Russia and Mexico", "Portugal, Italy and Germany", "only the United States"], "The stars on the Arkansas flag remember them."],
  ["The deadliest effect of European exploration on Native nations was…", "diseases such as smallpox", ["new crops", "new languages", "new music"], "They had no immunity."],
  ["Europeans brought horses, cattle and pigs to the Americas. This was part of the…", "Columbian Exchange", ["Industrial Revolution", "Louisiana Purchase", "Great Migration"], "Plants, animals and diseases crossed the ocean."],
  ["Explorers' journals and maps are valuable today because they are…", "primary sources", ["textbooks", "novels", "movies"], "Written by people who were there."],
  ["In 1783, the only Revolutionary War fighting in Arkansas took place at…", "Arkansas Post", ["Little Rock", "Hot Springs", "Fort Smith"], "A small attack called the Colbert Incident.", true],
  ["Why did European nations want to control the Mississippi River?", "It was a main route for trade deep into North America", ["It led to the Pacific Ocean", "It had no water", "It was full of gold"], "Goods moved by river.", true],
  ["How was Spanish exploration of Arkansas different from French settlement?", "De Soto passed through, while the French built a lasting trading post", ["Spain built big cities, France built none", "Both founded Little Rock", "Neither ever reached Arkansas"], "Passing through versus staying.", true],
  ["Why did the French work closely with the Quapaw at Arkansas Post?", "They depended on Quapaw trade and alliance", ["The Quapaw were French", "The French ruled every nation", "The Quapaw lived in France"], "Trade partners and allies.", true],
  ["In 1800, Spain secretly gave Louisiana back to…", "France", ["England", "the United States", "Mexico"], "Napoleon soon sold it.", true],
  ["Which happened first?", "de Soto's expedition", ["Arkansas Post is founded", "La Salle claims Louisiana", "Marquette and Jolliet reach the Arkansas River"], "1541 comes before the 1600s.", true],
];

const STATEHOOD: Q[] = [
  ["The United States bought Arkansas from France as part of the…", "Louisiana Purchase", ["Gadsden Purchase", "Missouri Compromise", "Treaty of Paris"], "It doubled the size of the country."],
  ["Which president made the Louisiana Purchase?", "Thomas Jefferson", ["George Washington", "Andrew Jackson", "Abraham Lincoln"], "In 1803."],
  ["The Hunter-Dunbar Expedition of 1804–1805 explored the Ouachita River and the…", "hot springs", ["Pacific coast", "Great Lakes", "Rocky Mountains"], "Sent by President Jefferson."],
  ["Arkansas Territory was created in…", "1819", ["1541", "1776", "1861"], "Before that, Arkansas was part of Missouri Territory."],
  ["The first capital of Arkansas Territory was…", "Arkansas Post", ["Little Rock", "Hot Springs", "Fort Smith"], "The old French settlement."],
  ["In 1821, the territorial capital moved to…", "Little Rock", ["Arkansas Post", "Helena", "Batesville"], "It was more central."],
  ["Why was the capital moved to Little Rock?", "It was closer to the center of the territory and less flood-prone", ["It had a gold mine", "It was on the ocean", "The king of France asked"], "Arkansas Post often flooded."],
  ["Arkansas's first newspaper, the Arkansas Gazette, was started in 1819 by…", "William Woodruff", ["Thomas Jefferson", "Daisy Bates", "Henri de Tonti"], "He printed it at Arkansas Post."],
  ["Fort Smith was founded in 1817 as a…", "military post on the Arkansas River", ["Spanish mission", "gold mine", "seaport"], "Soldiers kept the peace on the frontier."],
  ["Many settlers came to Arkansas on the Southwest Trail, a road that crossed the state through…", "Little Rock", ["Fayetteville", "Jonesboro", "Hot Springs"], "It ran from the northeast to the southwest."],
  ["Arkansas became a state on…", "June 15, 1836", ["July 4, 1776", "March 2, 1819", "May 6, 1861"], "Statehood Day."],
  ["Arkansas was the ___ state to join the Union.", "25th", ["13th", "1st", "50th"], "The 25 stars on its flag."],
  ["Arkansas entered the Union as a…", "slave state", ["free state", "territory", "colony"], "Slavery was legal there."],
  ["Arkansas was admitted at about the same time as Michigan, a free state, to keep…", "the balance of free and slave states in the Senate", ["the same number of rivers", "the same population", "the same governor"], "Each state gets two senators."],
  ["Arkansas's first state governor was…", "James S. Conway", ["William Woodruff", "Orval Faubus", "Bill Clinton"], "Elected in 1836."],
  ["The Old State House in Little Rock was Arkansas's…", "first state capitol building", ["first school", "first church", "first fort"], "Today it is a museum."],
  ["Before Arkansas could become a state, its people wrote a…", "state constitution", ["national anthem", "treaty with France", "newspaper"], "A plan for the state government."],
  ["A territory is different from a state because a territory…", "is governed by officials named by the national government", ["has two senators", "elects its own president", "is a separate country"], "Territories had no vote in Congress.", true],
  ["To become a state, a territory needed enough people and the approval of…", "Congress", ["the Supreme Court", "France", "the king of Spain"], "Congress admits new states.", true],
  ["Arkansas's first territorial governor, appointed in 1819, was…", "James Miller", ["James S. Conway", "Thomas Jefferson", "Henry Rector"], "He was a War of 1812 hero.", true],
  ["Before Arkansas Territory was created in 1819, Arkansas was part of…", "Missouri Territory", ["Florida Territory", "Indiana Territory", "Mexico"], "From 1812 to 1819.", true],
  ["Why did settlers often travel into Arkansas by steamboat in the 1820s and 1830s?", "Rivers were easier to travel than the swamps and mountains", ["There were no roads anywhere", "Steamboats could fly", "Trains were not allowed"], "Rivers were highways.", true],
];

const EVENTS: Dated[] = [
  ["De Soto's expedition reaches Arkansas", 1541],
  ["Marquette and Jolliet reach the Arkansas River", 1673],
  ["La Salle claims Louisiana for France", 1682],
  ["Arkansas Post is founded", 1686],
  ["France gives Louisiana to Spain", 1762],
  ["The Louisiana Purchase", 1803],
  ["Fort Smith is founded", 1817],
  ["Arkansas Territory is created", 1819],
  ["The capital moves to Little Rock", 1821],
  ["The Indian Removal Act is signed", 1830],
  ["Arkansas becomes the 25th state", 1836],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g7-arkansas-land",
    title: "Arkansas's Land & Regions",
    emoji: "🏞️",
    blurb: "Six regions, rivers and resources",
    parentNote:
      "Arkansas's six natural regions (the Ozark Plateau, Ouachita Mountains, Arkansas River Valley, Crowley's Ridge, the Delta and the West Gulf Coastal Plain), their resources, rivers, lakes and aquifers, and natural events such as tornadoes, the New Madrid earthquakes and the Flood of 1927.",
    standards: ["G.1.ARH.1; G.1.ARH.2; G.1.ARH.3; G.1.ARH.4; G.1.ARH.5", "the six regions of Arkansas, their resources and water, and natural events"],
    items: LAND,
  }),
  bankUnit({
    id: "ar-g7-first-peoples",
    title: "First Peoples of Arkansas",
    emoji: "🏺",
    blurb: "Mound builders, the Caddo, Osage and Quapaw",
    parentNote:
      "Arkansas's first peoples: the Mississippian and Plum Bayou mound builders, the Caddo, Osage and Quapaw nations and where each lived, the effects of European diseases and land cessions, and Indian Removal and the Trail of Tears through Arkansas. The Caddo Nation, Osage Nation and Quapaw Nation are living nations with their own governments today.",
    standards: ["H.1.ARH.1; H.1.ARH.2", "Indigenous peoples of Arkansas before and after European contact, and Indian Removal"],
    items: PEOPLES,
  }),
  bankUnit({
    id: "ar-g7-explorers",
    title: "Explorers & Arkansas Post",
    emoji: "⛵",
    blurb: "De Soto, Marquette and Jolliet, La Salle",
    parentNote:
      "European exploration of Arkansas and its effects: Hernando de Soto (1541), Marquette and Jolliet (1673), La Salle's claim of Louisiana (1682), Arkansas Post (1686), the French fur trade with the Quapaw, and the years under Spain and France.",
    standards: ["H.1.ARH.1; H.3.7.2; H.3.7.3", "European exploration and settlement of Arkansas and its effects"],
    items: EXPLORERS,
  }),
  timelineUnit({
    id: "ar-g7-territory-statehood",
    title: "Territory to Statehood",
    emoji: "⭐",
    blurb: "From the Louisiana Purchase to 1836",
    parentNote:
      "How Arkansas became a state: the Louisiana Purchase, the Hunter-Dunbar Expedition, Arkansas Territory (1819), the move of the capital from Arkansas Post to Little Rock, early settlers and government, and statehood on June 15, 1836, as the 25th state.",
    standards: ["H.1.ARH.3", "Arkansas's territorial and early statehood period"],
    events: EVENTS,
    items: STATEHOOD,
  }),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-westward"),
    {
      id: "ar-g7-westward",
      title: "Westward Expansion",
      emoji: "🐂",
      blurb: "Manifest Destiny, removal and war with Mexico",
      parentNote:
        "Westward expansion before 1850: Manifest Destiny, Jacksonian democracy and Indian Removal, the Mexican-American War, wagon trails and railroads, and why expansion raised the question of slavery, with Arkansas's part in it.",
      standards: ["H.3.7.15; H.3.7.17; H.3.7.18", "Manifest Destiny, Jacksonian policies and the Mexican-American War"],
    },
    [
      ["Manifest Destiny was the belief that the United States should…", "spread across North America to the Pacific", ["stay east of the Appalachians", "return land to Britain", "end all trade"], "A popular idea in the 1840s."],
      ["The Louisiana Purchase of 1803 doubled the size of the United States and included…", "Arkansas", ["Florida", "Ohio", "Hawaii"], "Bought from France."],
      ["In the 1830s, Native nations forced west under Indian Removal passed through Arkansas on their way to…", "Indian Territory, now Oklahoma", ["Canada", "Florida", "Cuba"], "The Trail of Tears."],
      ["Arkansas volunteers fought in the Mexican-American War at the Battle of Buena Vista in 1847, where they were led by…", "Archibald Yell, a former Arkansas governor", ["Hernando de Soto", "Abraham Lincoln", "William Woodruff"], "Yell County is named for him."],
      ["Steamboats on the Arkansas River in the 1830s carried…", "settlers, cotton and supplies", ["airplanes", "cars and trucks", "oil from the Gulf"], "Rivers were the highways of the time."],
      ["Andrew Jackson's policy of moving Native nations west of the Mississippi was called…", "Indian Removal", ["Reconstruction", "the New Deal", "Manifest Destiny"], "The Indian Removal Act of 1830."],
    ],
  ),
];
