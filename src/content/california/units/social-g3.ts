import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { OWN_SOCIAL_3 as WASHINGTON } from "../../washington/units/social-k4-g3";
import { OWN_SOCIAL_3 as OREGON } from "../../oregon/units/social-k3";

// California social studies, Grade 3 (History–Social Science Content Standards). Copies of Washington and Oregon
// units leave out their state's places and Tribes and add California items. California Indian content is light
// and in the present tense, and names nations as they name themselves; nothing sacred or ceremonial.

// ---------------------------------------------------------------------------------------------------------------
// Grade 3: the local region, California Indian nations, local history and government

const REGION_3: Q[] = [
  [
    "Low land between hills or mountains is a…",
    "valley",
    ["peak", "coast", "island"],
    "Rivers often run through valleys.",
  ],
  [
    "Land beside the ocean is the…",
    "coast",
    ["desert", "valley", "plateau"],
    "California has a long coast.",
  ],
  [
    "A dry place with little rain is a…",
    "desert",
    ["rainforest", "swamp", "lake"],
    "The Mojave is a desert.",
  ],
  [
    "The Sierra Nevada is a range of…",
    "mountains",
    ["lakes", "deserts", "islands"],
    "It runs along eastern California.",
  ],
  [
    "The Central Valley is known for…",
    "farms that grow much of the nation's food",
    ["snowy peaks all year", "tall redwood forests", "sand dunes"],
    "Flat land and rivers help crops grow.",
  ],
  [
    "A body of water partly closed in by land is a…",
    "bay",
    ["river", "pond", "canyon"],
    "San Francisco Bay is one.",
  ],
  [
    "Which ocean is on California's coast?",
    "the Pacific Ocean",
    ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"],
    "It is west of California.",
  ],
  [
    "Which is a natural feature?",
    "a river",
    ["a bridge", "a highway", "a shopping center"],
    "People didn't build it.",
  ],
  [
    "Which is a human-made feature?",
    "a dam",
    ["a mountain", "a lake made by a glacier", "a canyon"],
    "People built it.",
  ],
  [
    "People in a valley built canals to bring water to crops. They…",
    "changed the land to meet their needs",
    ["left the land as it was", "stopped farming", "moved to the desert"],
    "A canal is a human change.",
  ],
  [
    "Why did many towns start near rivers?",
    "Rivers gave water and a way to move goods",
    [
      "Rivers are always dry",
      "Rivers keep people away",
      "There is no soil near rivers",
    ],
    "Water is a key resource.",
  ],
  [
    "A map key, or legend, tells you…",
    "what the map symbols mean",
    ["the time", "the weather tomorrow", "who drew the map"],
    "Look in the box on the map.",
  ],
  [
    "On a map, the compass rose shows…",
    "directions",
    ["temperature", "population", "elevation only"],
    "N, E, S and W.",
  ],
  [
    "Look at a table of rainfall. Town A gets 5 inches a year and Town B gets 40. Which is drier?",
    "Town A",
    ["Town B", "They are the same", "You can't tell"],
    "Less rain means drier.",
  ],
  [
    "Which resource do people in the Central Valley use most to grow crops?",
    "water from rivers and wells",
    ["snow from the beach", "sand from deserts", "salt water"],
    "Crops need fresh water.",
  ],
  [
    "Which is a way people use forests?",
    "for lumber to build houses",
    ["for salt", "for gold coins", "for ocean waves"],
    "Wood comes from trees.",
  ],
  [
    "Why do people build bridges?",
    "To cross rivers and bays",
    ["To stop rain", "To grow food", "To make rivers bigger"],
    "Bridges connect places.",
  ],
  [
    "A photo shows tall buildings and busy streets. It is likely a…",
    "city",
    ["desert", "farm", "forest"],
    "Cities have many people.",
  ],
  [
    "Lake Tahoe is high in the…",
    "Sierra Nevada",
    ["Central Valley", "Mojave Desert", "Pacific Ocean"],
    "It is a mountain lake.",
  ],
  [
    "Death Valley is one of the hottest places on Earth. It is a…",
    "desert",
    ["rainforest", "glacier", "bay"],
    "It gets very little rain.",
  ],
  [
    "Building a freeway through hills is an example of…",
    "people changing the environment",
    ["a natural event", "a weather change", "erosion"],
    "People moved earth to build it.",
    true,
  ],
  [
    "Why might a community be built on a hill near the coast?",
    "to stay safe from flooding and have a view of the sea",
    [
      "because hills have more rain than oceans",
      "to be far from all water",
      "because valleys are illegal",
    ],
    "Think about water and safety.",
    true,
  ],
  [
    "A graph shows a town's population grew from 2 000 to 20 000. The town has…",
    "grown much bigger",
    ["shrunk", "stayed the same", "disappeared"],
    "20 000 is ten times 2 000.",
    true,
  ],
  [
    "Which change to the land can harm wildlife habitats?",
    "draining a wetland to build homes",
    ["planting native trees", "cleaning a creek", "making a park"],
    "Wetlands are home to many animals.",
    true,
  ],
  [
    "An aqueduct is built to…",
    "carry water a long way",
    ["hold cars", "grow rice", "make electricity from wind"],
    "Aqua means water.",
    true,
  ],
  [
    "Which tool shows the land's shape: hills, valleys and mountains?",
    "a physical map",
    ["a calendar", "a bus schedule", "a menu"],
    "Physical maps show landforms.",
    true,
  ],
];

const FIRST_PEOPLES_3: Q[] = [
  [
    "California Indian nations have lived in California for…",
    "thousands of years",
    ["about fifty years", "only since 1900", "one hundred years"],
    "Their history here is very long.",
  ],
  [
    "Is there just one California Indian nation?",
    "No, there are many different nations",
    ["Yes, just one", "No, only two", "Yes, but only in the north"],
    "Each nation has its own language and ways.",
  ],
  [
    "Many California Indian nations…",
    "are living communities today",
    ["only lived long ago", "all live in one city", "speak one language"],
    "They are part of California now.",
  ],
  [
    "How did the land shape how nations lived long ago?",
    "People used the plants and animals near them",
    [
      "Everyone ate the same food",
      "No one used local resources",
      "They bought food in stores",
    ],
    "Coast, valley and desert nations used what was near.",
  ],
  [
    "Acorns were an important food for many California nations. They come from…",
    "oak trees",
    ["palm trees", "cactus", "seaweed"],
    "Acorns were ground into meal.",
  ],
  [
    "The Chumash, of the central coast, build plank canoes called…",
    "tomols",
    ["kayaks", "rafts", "steamboats"],
    "Tomols carry people across the sea to the islands.",
  ],
  [
    "Many nations near the coast fished and gathered…",
    "shellfish",
    ["corn", "wheat", "potatoes"],
    "The ocean gave food.",
  ],
  [
    "Some nations in the desert, like the Cahuilla, used plants such as…",
    "mesquite beans and palm fruit",
    ["seaweed", "redwood bark only", "apples"],
    "Desert plants gave food.",
  ],
  [
    "Pomo weavers are known for their…",
    "baskets",
    ["skyscrapers", "steel tools", "glass windows"],
    "Basket weaving is a living art.",
  ],
  [
    "People trade to get things they don't have. Long ago, nations traded…",
    "goods like shell beads, salt and obsidian",
    ["phones", "plastic toys", "paper money"],
    "Shell beads were valued.",
  ],
  [
    "Obsidian is a black, glassy rock used long ago to make…",
    "sharp tools",
    ["clothes", "paint", "bread"],
    "It breaks into sharp edges.",
  ],
  [
    "Who leads many California Indian nations today?",
    "an elected tribal council and chair",
    ["the US president alone", "the mayor of a city", "no one"],
    "Nations choose their leaders.",
  ],
  [
    "A tribal constitution is…",
    "a written plan for a nation's government",
    ["a story about animals", "a map", "a song"],
    "Like the US Constitution, it sets up a government.",
  ],
  [
    "When settlers came, many California Indian people lost…",
    "their land and many lives",
    ["nothing at all", "only their pets", "their cars"],
    "Settlement caused great harm.",
  ],
  [
    "Many nations today work to keep their languages alive by…",
    "teaching them in classes and camps",
    ["forgetting them", "never speaking", "only writing in English"],
    "Language programs teach young people.",
  ],
  [
    "Long ago, homes were built from…",
    "local materials such as wood, bark and tule reeds",
    ["bricks shipped from far away", "steel beams", "plastic"],
    "People used what grew nearby.",
  ],
  [
    "Tule is a tall reed that grows in…",
    "marshes and lakes",
    ["deserts", "mountaintops", "the open ocean"],
    "It grows where there is water.",
  ],
  [
    "Which question would help you learn about a nation in your area?",
    "What is the nation's name for itself?",
    [
      "What car does it drive?",
      "What is its favorite TV show?",
      "How many stores does it own?",
    ],
    "Start with how people name themselves.",
  ],
  [
    "Many nations tell stories that teach lessons about…",
    "how to live with the land and each other",
    ["video games", "outer space travel", "skyscrapers"],
    "Stories pass on knowledge.",
  ],
  [
    "Why did coastal and desert nations eat different foods?",
    "Different plants and animals lived in each place",
    [
      "They lived in the same place",
      "Food was delivered",
      "They never ate fish",
    ],
    "Geography shapes food.",
    true,
  ],
  [
    "The Ohlone live around San Francisco Bay and…",
    "are working to restore their lands and culture",
    ["live only in museums", "all moved away", "never lived there"],
    "Ohlone people are active today.",
    true,
  ],
  [
    "The Yurok live along the Klamath River, where salmon…",
    "have been an important food for a very long time",
    ["have never lived", "only live in lakes", "are a kind of tree"],
    "Rivers and salmon matter to the Yurok.",
    true,
  ],
  [
    "How did settlers' arrival change the land?",
    "Ranches, farms and towns replaced places nations used for food",
    ["Nothing changed", "More oaks grew everywhere", "Rivers got wider"],
    "Land use changed quickly.",
    true,
  ],
  [
    "What does it mean that a tribe is sovereign?",
    "It has the right to govern itself",
    ["It is part of a city", "It has no rules", "It is a club"],
    "Sovereign nations make their own laws.",
    true,
  ],
  [
    "Some nations today run businesses, schools and health clinics. These help…",
    "support their communities",
    ["close their communities", "end their languages", "move away"],
    "Nations provide services for members.",
    true,
  ],
  [
    "Which is a good primary source about a nation's history?",
    "an elder's spoken story recorded today",
    ["a cartoon movie", "a made-up comic", "a guess"],
    "Oral history comes from people who know it.",
    true,
  ],
];

const LOCAL_HISTORY_3: Q[] = [
  [
    "An explorer is a person who…",
    "travels to learn about new places",
    ["stays home", "only sells food", "builds cars"],
    "Explorers make maps of new lands.",
  ],
  [
    "Juan Rodríguez Cabrillo sailed along the California coast in…",
    "1542",
    ["1942", "1776", "2002"],
    "He sailed for Spain.",
  ],
  [
    "A settler is someone who…",
    "moves to a place to live there",
    ["visits for one day", "only reads about it", "never moves"],
    "Settlers build homes.",
  ],
  [
    "Many California towns began near…",
    "missions, forts, ports, rivers or railroads",
    ["airports only", "shopping malls", "freeways"],
    "Old towns grew where people gathered.",
  ],
  [
    "Why did many towns grow near railroads?",
    "Trains brought people and goods",
    ["Trains scared people away", "Tracks made rain", "Railroads grew food"],
    "Trains connected towns.",
  ],
  [
    "The Gold Rush brought many newcomers to California in…",
    "1849",
    ["1949", "1700", "2010"],
    "They were called forty-niners.",
  ],
  [
    "Many early towns grew because of…",
    "farming, mining, fishing or trade",
    ["video games", "space travel", "online shopping"],
    "Jobs brought people.",
  ],
  [
    "A historical society or museum helps us learn about…",
    "our community's past",
    ["tomorrow's weather", "math facts", "outer space"],
    "They keep old photos and objects.",
  ],
  [
    "Which is a primary source about your town long ago?",
    "an old photo of Main Street",
    ["a movie made last year about dragons", "a video game", "a cartoon"],
    "Primary sources come from the time.",
  ],
  [
    "A street named Mission Street might tell you that…",
    "there was a mission nearby long ago",
    ["it is brand new", "it has no history", "fish live there"],
    "Names can hold history.",
  ],
  [
    "A town's founders are the people who…",
    "started the town",
    ["visit it today", "will live there later", "drew a cartoon of it"],
    "Founders begin something.",
  ],
  [
    "Long ago, families came to California from…",
    "many places around the world",
    ["only one country", "nowhere", "the Moon"],
    "California has always welcomed newcomers.",
  ],
  [
    "What is the same about your town now and long ago?",
    "People still need homes, food and work",
    ["Everyone rides horses", "There are no schools", "There is no water"],
    "Needs stay the same.",
  ],
  [
    "Many farmers in the Central Valley came from…",
    "Mexico, Asia, Europe and other states",
    ["Antarctica", "the Moon", "only one town"],
    "Farm work drew people from far away.",
  ],
  [
    "A timeline helps you…",
    "put events in order",
    ["measure rain", "find north", "add numbers"],
    "Earliest to latest.",
  ],
  [
    "Which is a secondary source?",
    "a book written today about the town's history",
    ["a letter from 1890", "an old diary", "a photo from 1900"],
    "Secondary sources are written later.",
  ],
  [
    "Chinese immigrants helped build California by…",
    "working on railroads, farms and in mines",
    ["sailing to the Moon", "building airplanes in 1850", "closing schools"],
    "Many came in the 1850s and 1860s.",
  ],
  [
    "Many people still live in the same town where their families…",
    "have lived for many years",
    ["have never been", "only visit online", "can't go"],
    "Communities have long-time families.",
  ],
  [
    "How can you learn about your town's history?",
    "Talk to older neighbors and visit the library",
    ["Watch any cartoon", "Guess", "Ask a pet"],
    "People and records hold history.",
  ],
  [
    "Long ago, a ranch was a large piece of land for…",
    "raising cattle",
    ["building ships", "making cars", "mining salt only"],
    "Cattle grazed on open land.",
    true,
  ],
  [
    "Why might a fishing town grow near a bay?",
    "Boats can dock safely and fish are nearby",
    [
      "Bays have no water",
      "Fish only live in deserts",
      "Bays are always frozen",
    ],
    "A bay is a safe harbor.",
    true,
  ],
  [
    "Which change happened as towns grew?",
    "Dirt roads became paved streets",
    [
      "Schools disappeared",
      "People stopped working",
      "Houses got smaller each year",
    ],
    "Growth brings new roads.",
    true,
  ],
  [
    "How did early settlers influence your town's economy today?",
    "Some farms and businesses they started still run",
    [
      "They have no effect",
      "They banned all work",
      "They moved every business away",
    ],
    "Old businesses can last a long time.",
    true,
  ],
  [
    "When explorers and settlers came, California Indian nations already…",
    "lived on and cared for the land",
    ["were not there", "lived in big cities with cars", "had moved away"],
    "Nations were already home here.",
    true,
  ],
  [
    "An oral history is…",
    "a person telling what they remember",
    ["a math test", "a road sign", "a weather map"],
    "It is spoken history.",
    true,
  ],
  [
    "A plaque on an old building tells…",
    "who built it and when",
    ["what is for lunch", "the score of a game", "today's weather"],
    "Plaques mark history.",
    true,
  ],
];

const GOVERNMENT_3: Q[] = [
  [
    "Why do we have laws?",
    "To keep people safe and treat them fairly",
    ["To make life harder", "So leaders can have fun", "To stop all games"],
    "Laws protect people.",
  ],
  [
    "The US Constitution is…",
    "the plan for our nation's government",
    ["a storybook", "a city map", "a song"],
    'It begins, "We the People."',
  ],
  [
    "The three branches of government are legislative, executive and…",
    "judicial",
    ["military", "school", "business"],
    "Judicial means courts.",
  ],
  [
    "The legislative branch…",
    "makes laws",
    ["enforces laws only", "decides court cases", "runs schools"],
    "Legislators write laws.",
  ],
  [
    "The executive branch…",
    "carries out laws",
    ["writes all laws", "decides court cases", "runs the weather"],
    "The president, governor or mayor lead it.",
  ],
  [
    "The judicial branch…",
    "decides what laws mean in court cases",
    ["collects trash", "makes all laws", "builds roads"],
    "Judges work in courts.",
  ],
  [
    "Who leads many cities?",
    "a mayor",
    ["a king", "a principal", "a president"],
    "Mayors lead city governments.",
  ],
  [
    "A city council…",
    "makes local laws",
    ["teaches classes", "runs the army", "flies planes"],
    "Council members vote on city rules.",
  ],
  [
    "Who leads California's state government?",
    "the governor",
    ["the mayor", "the president", "the principal"],
    "The governor works in Sacramento.",
  ],
  [
    "Who leads the United States government?",
    "the president",
    ["the governor", "the mayor", "a judge"],
    "The president works in Washington, D.C.",
  ],
  [
    "A city law that sets the speed limit near schools is a…",
    "local law",
    ["national law", "school rule", "family rule"],
    "Cities make local laws.",
  ],
  [
    "Local taxes help pay for…",
    "parks, libraries, police and firefighters",
    ["toys for each family", "vacations", "private cars"],
    "Taxes pay for things we share.",
  ],
  [
    "Which is a way citizens take part in local government?",
    "Speak at a city council meeting",
    ["Ignore all rules", "Litter", "Hide"],
    "Citizens can share ideas.",
  ],
  [
    "Adults choose leaders by…",
    "voting",
    ["flipping coins", "arm wrestling", "drawing pictures"],
    "Voting lets people decide.",
  ],
  [
    "Which is a public virtue, or good citizen trait?",
    "honesty",
    ["selfishness", "rudeness", "laziness"],
    "Good citizens are honest.",
  ],
  [
    "A county is…",
    "a part of a state with its own government",
    ["a kind of city park", "a country", "a school"],
    "California has 58 counties.",
  ],
  [
    "California, the other states and tribal nations each have…",
    "their own governments",
    ["no laws", "the same mayor", "one shared city hall"],
    "Each makes laws for its people.",
  ],
  [
    "Who decides if someone broke a law?",
    "a judge or jury",
    ["a store clerk", "a bus driver", "a librarian"],
    "Courts settle cases.",
  ],
  [
    "Which is a national landmark?",
    "the White House",
    ["your backyard", "a grocery store", "a playground"],
    "The president lives there.",
  ],
  [
    "The state capitol building is where…",
    "state lawmakers meet",
    ["sports games happen", "movies are made", "trains are kept"],
    "California's is in Sacramento.",
  ],
  [
    "Why do we need different levels of government?",
    "Some problems are local and some are national",
    [
      "So there are fewer rules",
      "Because one level is enough",
      "To confuse people",
    ],
    "Each level handles different jobs.",
    true,
  ],
  [
    "A tribal government can…",
    "make laws for its own lands and people",
    [
      "make laws for all of California",
      "choose the president",
      "run every city",
    ],
    "Tribes are sovereign.",
    true,
  ],
  [
    "The US Constitution was written in…",
    "1787",
    ["1987", "1492", "1849"],
    "It was written in Philadelphia.",
    true,
  ],
  [
    "Which branch can say a law goes against the Constitution?",
    "the judicial branch",
    ["the legislative branch", "a city park", "a school board only"],
    "Courts interpret laws.",
    true,
  ],
  [
    "A school board…",
    "makes decisions about local public schools",
    ["runs the state", "makes national laws", "picks the governor"],
    "Voters elect school board members.",
    true,
  ],
  [
    "Why is voting important?",
    "It lets people choose leaders and laws",
    ["It is only for fun", "It ends all laws", "It is a test"],
    "Every vote is a voice.",
    true,
  ],
];

// Copies of Washington's and Oregon's Grade 3 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON, ...OREGON], id);

export const SOCIAL_3: Unit[] = [
  copyOf(
    K("wa-g3-money-and-voting"),
    {
      id: "ca-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part.",
      standards: [
        "3.5.1; 3.5.2; 3.5.3; 3.4.2",
        "how local producers use resources, goods made near and far, trade-offs, and how citizens take part in government",
      ],
    },
    [
      [
        "Grapes grown in a California valley and sold nearby are made…",
        "locally",
        ["in another country", "on the Moon", "nowhere"],
        "Local means nearby.",
      ],
      [
        "A phone made in another country and sold here is…",
        "made elsewhere and traded",
        ["grown on a farm", "made locally", "a service"],
        "Many goods come from far away.",
      ],
      [
        "Doing your best in school now can help you later get…",
        "a job you want",
        ["fewer choices", "less pay", "no skills"],
        "Learning builds skills.",
      ],
    ],
  ),
  copyOf(
    K("wa-g3-culture"),
    {
      id: "ca-g3-culture",
      title: "Culture & Traditions",
      emoji: "🎉",
      blurb: "Many people, one community",
      parentNote:
        "Culture, diversity and unity in a community, the traditions newcomers bring, and national symbols and mottoes that tie people together.",
      standards: [
        "3.3.1; 3.4.3",
        "the people who settled and continue to settle the community, and landmarks and symbols that express American ideals",
      ],
    },
    [
      [
        "Diego's family came to California from Mexico. He shares a family recipe. He is sharing his…",
        "culture",
        ["homework", "address", "bike"],
        "Food is part of culture.",
      ],
      [
        "Many people from Mexico, the Philippines, China and Vietnam live in California. This shows its…",
        "diversity",
        ["weather", "mountains", "size"],
        "Diversity means many kinds of people.",
      ],
    ],
  ),
  copyOf(
    K("or-g3-changemakers"),
    {
      id: "ca-g3-changemakers",
      title: "Changemakers & Allies",
      emoji: "✊",
      blurb: "People who took risks for freedom",
      parentNote:
        "Americans who took risks to secure freedoms, majority rule with respect for others, and using sources to learn about them.",
      standards: [
        "3.4.6",
        "the lives of American heroes who took risks to secure our freedoms",
      ],
    },
    [
      [
        "Martin Luther King Jr. led peaceful marches for…",
        "equal rights",
        ["longer school days", "more taxes", "bigger cars"],
        "He believed in nonviolence.",
      ],
      [
        "Harriet Tubman risked her life to lead people…",
        "out of slavery to freedom",
        ["across the ocean", "to the Moon", "into the army"],
        "She made many trips north.",
      ],
      [
        "Benjamin Franklin helped write the…",
        "Declaration of Independence",
        ["first cookbook", "rules of baseball", "California flag"],
        "He signed it in 1776.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g3-our-region",
    title: "Our Region's Land",
    emoji: "🏔️",
    blurb: "Landforms, resources and changes",
    parentNote:
      "Deserts, mountains, valleys, coasts, rivers and bays in California, reading maps and tables, and how people use the region's resources and change the land with farms, dams, canals and freeways.",
    standards: [
      "3.1.1; 3.1.2",
      "the geographic features of the local region and how people have used its resources and changed the environment",
    ],
    items: REGION_3,
  }),
  bankUnit({
    id: "ca-g3-first-peoples",
    title: "First Peoples of Our Region",
    emoji: "🧺",
    blurb: "California Indian nations, long ago and today",
    parentNote:
      "California Indian nations such as the Chumash, Pomo, Cahuilla, Ohlone and Yurok: how the land shaped how they lived, trade, tribal governments and constitutions, what settlers' arrival meant for them, and nations today. Light, in the present tense, and with nothing sacred or ceremonial.",
    standards: [
      "3.2.2; 3.2.3; 3.2.4",
      "how geography shaped how local Indian nations lived, their economies and governments, and their interaction with settlers",
    ],
    items: FIRST_PEOPLES_3,
  }),
  bankUnit({
    id: "ca-g3-local-history",
    title: "How Our Community Began",
    emoji: "🏘️",
    blurb: "Explorers, settlers and change",
    parentNote:
      "The explorers and settlers who came to California, why towns started where they did, the economies settlers built, primary and secondary sources, and how communities change over time.",
    standards: [
      "3.3.1; 3.3.2; 3.3.3",
      "explorers, newcomers and settlers, the economies settlers established, and why the community was founded and how it changed",
    ],
    items: LOCAL_HISTORY_3,
  }),
  bankUnit({
    id: "ca-g3-government",
    title: "Rules, Laws & Government",
    emoji: "⚖️",
    blurb: "Three branches and local leaders",
    parentNote:
      "Why we have rules, laws and the Constitution, the three branches of government with a focus on cities and counties, and how California, the other states and tribal nations each govern.",
    standards: [
      "3.4.1; 3.4.4; 3.4.5",
      "reasons for rules, laws and the Constitution, the three branches of government with an emphasis on local government, and the governments of states and sovereign American Indian tribes",
    ],
    items: GOVERNMENT_3,
  }),
];
