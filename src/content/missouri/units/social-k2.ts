import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Missouri Kindergarten to Grade 2 social studies units: the flag, the Pledge of Allegiance and the people remembered
// on national holidays (K.PC.1.F, K.H.3.C), national and community symbols, among them the Gateway Arch (1.PC.1.F),
// and the student's own region of Missouri (2.EG.5.B.b, 2.EG.5.C.b, 2.EG.5.C.c). Prompts for little kids stay short.

const FLAG_K: Q[] = [
  ["Our country's flag has stars and…", "stripes", ["circles", "dots", "squares"], "Red and white stripes."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Look at the stars and stripes."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "pet"], "It stands for the United States."],
  ["Each star on the flag stands for a…", "state", ["city", "school", "river"], "There are 50 stars."],
  ["How many stars are on the American flag?", "50", ["13", "10", "100"], "One for each state."],
  ["When we say the Pledge of Allegiance, we face the…", "flag", ["door", "clock", "window"], "We show respect to the flag."],
  ["During the Pledge, we put our right hand…", "over our heart", ["on our head", "in our pocket", "on our knee"], "It shows respect."],
  ["The Pledge of Allegiance is a promise to be loyal to our…", "country", ["toys", "lunch box", "shoes"], "It starts, I pledge allegiance."],
  ["George Washington was our country's first…", "president", ["teacher", "astronaut", "baker"], "We remember him on Presidents' Day."],
  ["Abraham Lincoln helped end…", "slavery", ["recess", "winter", "rain"], "He was a president."],
  ["Martin Luther King Jr. worked so people would be treated…", "fairly", ["badly", "unkindly", "rudely"], "We honor him in January."],
  ["On Thanksgiving, many families share a meal and give…", "thanks", ["homework", "tickets", "speeding cars"], "It is a day to be thankful."],
  ["On the Fourth of July, we celebrate our country's…", "birthday", ["first snow", "first school bus", "new park"], "Fireworks light the sky."],
  ["On Veterans Day, we thank people who served in the…", "military", ["kitchen", "library", "zoo"], "Soldiers, sailors and pilots."],
  ["A good role model is…", "kind and helpful", ["mean", "bossy", "rude"], "Role models set a good example."],
  ["Which is a good way to treat the flag?", "keep it off the ground", ["step on it", "throw it", "use it as a napkin"], "We show the flag respect.", true],
  ["Why do we have holidays for people like George Washington?", "to remember what they did", ["to skip lunch", "to buy toys", "to go to bed early"], "Holidays help us remember.", true],
  ["Which holiday has fireworks for our country's birthday?", "the Fourth of July", ["Thanksgiving", "Presidents' Day", "Labor Day"], "It is in summer.", true],
  ["Rosa Parks is remembered because she bravely…", "kept her bus seat", ["drove a race car", "flew a plane", "sailed a ship"], "She stood up for fair treatment.", true],
  ["Which word tells how a good citizen acts?", "honest", ["sneaky", "selfish", "unfair"], "Good citizens tell the truth.", true],
  ["Which holiday honors the first president?", "Presidents' Day", ["Halloween", "Valentine's Day", "Earth Day"], "It is in February.", true],
  ["The flag on a pole sometimes flies halfway down to show…", "sadness", ["a party", "the weather", "a birthday"], "We call it half-staff.", true],
  ["Missouri has its own flag too. It is red, white and…", "blue", ["green", "orange", "purple"], "Like the American flag.", true],
  ["Who is a role model at school?", "a teacher who helps everyone", ["someone who pushes", "someone who cheats", "someone who yells"], "Role models help others.", true],
];

const SYMBOLS_1: Q[] = [
  ["The big statue holding a torch in New York Harbor is the…", "Statue of Liberty", ["Gateway Arch", "Liberty Bell", "White House"], "She welcomes people to America."],
  ["The Statue of Liberty stands for…", "freedom", ["winter", "sports", "food"], "Her torch lights the way."],
  ["Where does Congress meet to make our country's laws?", "the U.S. Capitol", ["the Gateway Arch", "a farm", "a school"], "It has a big dome."],
  ["Our national bird is the…", "bald eagle", ["bluebird", "robin", "cardinal"], "It is strong and free."],
  ["The bald eagle is a symbol of our…", "country", ["school", "town park", "lunch"], "You can see it on money."],
  ["The Liberty Bell has a famous…", "crack", ["clock", "door", "window"], "It is in Philadelphia."],
  ["The Liberty Bell is a symbol of…", "freedom", ["snow", "games", "food"], "It rang for liberty."],
  ["The tall silver arch in St. Louis is the…", "Gateway Arch", ["Statue of Liberty", "Liberty Bell", "U.S. Capitol"], "It shines by the river."],
  ["The Gateway Arch reminds us of people moving…", "west", ["to the moon", "under the sea", "to the North Pole"], "St. Louis was the gateway."],
  ["Missouri's state bird is the…", "bluebird", ["penguin", "parrot", "owl"], "It is blue and orange."],
  ["A community symbol could be…", "a town's flag or seal", ["a sandwich", "a shoe", "a crayon"], "It stands for the community."],
  ["A community's mascot or logo helps people feel…", "proud of their town", ["sleepy", "lost", "hungry"], "Symbols bring people together."],
  ["Missouri's state flag has 24…", "stars", ["moons", "hearts", "trees"], "Missouri was the 24th state.", true],
  ["Why do we keep the Liberty Bell safe?", "it is part of our history", ["it is a toy", "it is new", "it rings every hour"], "Symbols remind us of the past.", true],
  ["Why is the Statue of Liberty near the sea?", "to greet people arriving by ship", ["to catch fish", "to stop storms", "to hold up a bridge"], "Many immigrants came by boat.", true],
  ["Which symbol is in Missouri?", "the Gateway Arch", ["the Statue of Liberty", "the Liberty Bell", "the U.S. Capitol"], "It is in St. Louis.", true],
  ["The U.S. Capitol is in…", "Washington, D.C.", ["St. Louis", "Kansas City", "Springfield"], "It is our nation's capital city.", true],
  ["Why did people choose the bald eagle as a symbol?", "it is strong and free", ["it is tiny", "it cannot fly", "it lives in houses"], "Symbols show what we value.", true],
  ["A school's mascot is a kind of…", "symbol", ["lunch", "test", "bus"], "It stands for the school.", true],
  ["Missouri's state tree has white flowers in spring. It is the…", "dogwood", ["palm", "cactus", "pine"], "Look for it in April.", true],
  ["Missouri's state animal is the…", "mule", ["lion", "panda", "shark"], "Mules pulled wagons.", true],
  ["Which is a symbol you might see on a dollar bill?", "the bald eagle", ["a pizza", "a rocket", "a tree house"], "It is our national bird.", true],
  ["Where can you go to the top and look out tiny windows?", "the Gateway Arch", ["the Liberty Bell", "a stop sign", "a mailbox"], "A tram rides to the top.", true],
  ["Your city hall is a symbol of your…", "local government", ["favorite food", "school bus", "pet"], "Leaders meet there.", true],
];

const REGIONS_2: Q[] = [
  ["Missouri is divided into smaller parts called…", "counties", ["countries", "continents", "oceans"], "Missouri has 114 of them."],
  ["The hilly, rocky part of southern Missouri is the…", "Ozarks", ["Bootheel", "Great Plains", "Gulf Coast"], "It has caves and springs."],
  ["The flat land in the far southeast corner of Missouri is the…", "Bootheel", ["Ozarks", "Rocky Mountains", "Great Lakes"], "Its shape looks like a boot heel."],
  ["Northern Missouri has rolling farmland where farmers grow…", "corn and soybeans", ["oranges", "bananas", "coconuts"], "The soil there is rich."],
  ["Which river flows across the middle of Missouri?", "the Missouri River", ["the Nile", "the Amazon", "the Thames"], "The state shares its name."],
  ["Which big river runs along Missouri's eastern edge?", "the Mississippi River", ["the Ohio River", "the Colorado River", "the Hudson River"], "St. Louis sits on it."],
  ["Missouri has hot summers, cold winters and…", "four seasons", ["no seasons", "only winter", "only summer"], "Spring, summer, fall and winter."],
  ["A landmark is…", "a place that is easy to recognize", ["a kind of tax", "a type of food", "a holiday"], "The Gateway Arch is one."],
  ["Which is a famous Missouri landmark?", "the Gateway Arch", ["the Eiffel Tower", "Big Ben", "the Great Wall"], "It is in St. Louis."],
  ["The Lake of the Ozarks is a big…", "lake made by a dam", ["ocean", "glacier", "desert"], "People boat and fish there."],
  ["A city has many people, tall buildings and busy streets. A rural area has…", "farms and open land", ["skyscrapers", "subways", "huge airports"], "Rural means countryside."],
  ["Many people in the Ozarks enjoy…", "fishing, floating rivers and hiking", ["surfing ocean waves", "skiing big mountains", "riding camels"], "The hills have rivers and forests."],
  ["Kansas City and St. Louis are Missouri's two biggest…", "cities", ["farms", "lakes", "caves"], "Many people live in them."],
  ["Why do farmers in the Bootheel grow cotton and rice?", "the land is flat and warm", ["the land is icy", "it is very rocky", "there is no water"], "Crops need the right land and climate.", true],
  ["Why are there many caves in the Ozarks?", "water slowly dissolves the rock", ["people dug them all", "volcanoes made them", "giants made them"], "Limestone dissolves over time.", true],
  ["Which would you most likely see in rural northern Missouri?", "big farm fields and barns", ["ocean beaches", "tall glaciers", "palm trees"], "Look at how people use land.", true],
  ["How is a county different from a city?", "a county is bigger and can have many towns", ["a county is one street", "a city is bigger than a state", "they are the same"], "Counties hold cities and towns.", true],
  ["In which region is Springfield?", "the Ozarks", ["the Bootheel", "the far north", "the Great Lakes"], "It is in southwest Missouri.", true],
  ["Why do many people live near Missouri's rivers?", "rivers give water and a way to move goods", ["rivers are always dry", "there are no rivers", "rivers keep people away"], "Water is important for life and trade.", true],
  ["Which describes the Ozarks?", "hills, forests, springs and caves", ["flat cotton fields", "sandy beaches", "snowy mountains all year"], "Picture the hilly south.", true],
  ["Branson, in the Ozarks, is famous for its…", "music shows", ["oil wells", "ocean ships", "glaciers"], "Many visitors go there.", true],
  ["A historical landmark helps us…", "remember the past", ["forget history", "build roads", "grow crops"], "Old places tell stories.", true],
  ["Which is a natural feature?", "a river", ["a bridge", "a school", "a road"], "Nature made it.", true],
  ["Which is a human feature?", "a highway", ["a hill", "a lake", "a forest"], "People built it.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "mo-k-flag-and-holidays",
    title: "Flag & Holidays",
    emoji: "🇺🇸",
    blurb: "The flag, the Pledge and special days",
    parentNote: "The American flag as a symbol of our country, the Pledge of Allegiance, the people we remember on national holidays such as George Washington, Abraham Lincoln and Martin Luther King Jr., and the traits of good role models.",
    standards: ["K.PC.1.F.a; K.PC.1.F.b; K.H.3.C.a; K.PC.1.E.a", "the flag as a symbol of our nation, the Pledge of Allegiance, people honored on national holidays, and role models"],
    items: FLAG_K,
  }),
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "mo-g1-american-symbols",
    title: "American Symbols",
    emoji: "🗽",
    blurb: "The Statue of Liberty, the eagle and the Arch",
    parentNote: "What the Statue of Liberty, the U.S. Capitol, the bald eagle and the Liberty Bell stand for, and symbols close to home such as the Gateway Arch, Missouri's state symbols and a town's own flag or seal.",
    standards: ["1.PC.1.F.a; 1.PC.1.F.b", "the Statue of Liberty, U.S. Capitol, bald eagle and Liberty Bell, and symbols of the local community"],
    items: SYMBOLS_1,
  }),
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "mo-g2-missouri-regions",
    title: "My Missouri Region",
    emoji: "🏞️",
    blurb: "Counties, landmarks, the Ozarks and the Bootheel",
    parentNote: "Missouri's counties and landmarks, the land, water and climate of Missouri's regions (the northern plains, the Ozarks and the Bootheel), and how people live, work and play in each.",
    standards: ["2.EG.5.B.b; 2.EG.5.C.b; 2.EG.5.C.c", "regions and landmarks in the community, and the physical and human characteristics of the student's region of Missouri"],
    items: REGIONS_2,
  }),
];
