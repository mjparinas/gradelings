import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from, timelineUnit, type Dated } from "./kit";

// Arkansas's own Grade 3 social studies units (`ar-` ids): Arkansas's natural regions and where people live and work
// (G.1.3.3, G.1.3.6), its rivers, lakes and natural resources (G.1.3.4, G.1.3.7, G.1.3.10), the three branches of
// government and Arkansas state and local government (C.1.3.2, C.1.3.3, C.1.3.7, C.1.3.9), the founding documents and
// the origins of state and national symbols and historic places (C.1.3.1, C.1.3.4, H.1.3.5), a timeline of Arkansas and
// US history (H.1.3.1, H.1.3.2), and an Arkansas copy of California's "Money, Taxes & Voting" with its California
// questions left out and Arkansas items on supply, demand, money and businesses added.

const REGIONS: Q[] = [
  ["Arkansas's nickname is…", "The Natural State", ["The Sunshine State", "The Empire State", "The Lone Star State"], "It is known for its forests, rivers and mountains."],
  ["The Ozark Mountains are in which part of Arkansas?", "the north and northwest", ["the far south", "the southeast", "only the east"], "They continue north into Missouri."],
  ["The Ozarks are a high plateau cut by…", "deep river valleys", ["ocean beaches", "sand dunes", "glaciers"], "Rivers have carved into the high land."],
  ["Which mountains in west-central Arkansas have ridges that run east and west?", "the Ouachita Mountains", ["the Rocky Mountains", "the Appalachian Mountains", "Crowley's Ridge"], "Most mountain ranges in the country run north and south."],
  ["The Arkansas River Valley lies between which two mountain areas?", "the Ozarks and the Ouachitas", ["the Rockies and the Andes", "the Delta and the Gulf", "Crowley's Ridge and the Delta"], "The river flows through the low land between them."],
  ["Arkansas's highest point, Mount Magazine, is in the…", "Arkansas River Valley", ["Delta", "West Gulf Coastal Plain", "Crowley's Ridge"], "It rises above the river valley."],
  ["The flat, rich farmland along the Mississippi River in eastern Arkansas is called the…", "Delta", ["Ozarks", "Ouachitas", "Timberlands"], "Its official name is the Mississippi Alluvial Plain."],
  ["The Delta is a great place to grow rice, cotton and soybeans because it has…", "flat land and rich soil left by rivers", ["steep mountains", "rocky ground", "very little water"], "Rivers flooded and left good soil."],
  ["Which narrow strip of hills rises out of the flat Delta in northeast Arkansas?", "Crowley's Ridge", ["Mount Magazine", "the Ozark Plateau", "the Ouachita Mountains"], "Jonesboro is built on it."],
  ["The West Gulf Coastal Plain in southern Arkansas is known for its…", "pine forests, oil and natural gas", ["snowy peaks", "coral reefs", "deserts"], "It is sometimes called the Timberlands."],
  ["Arkansas's mountains, the Ozarks and Ouachitas, are mostly in the…", "northwest and west", ["southeast", "east", "far south"], "The highlands are in the northwest half."],
  ["Arkansas's lowlands are mostly in the…", "south and east", ["north and west", "very center only", "Ozarks"], "Flat land is near the Mississippi and the Gulf."],
  ["Why do many people in the Delta work on farms?", "the flat land and rich soil are good for crops", ["it is too cold for anything else", "there are no rivers", "the mountains have gold"], "Think about the land."],
  ["Why do many visitors go to the Ozarks?", "to hike, canoe and enjoy the mountains and rivers", ["to swim in the ocean", "to ski on glaciers", "to see the desert"], "Outdoor fun!"],
  ["The largest city in Arkansas and its capital is…", "Little Rock", ["Fort Smith", "Jonesboro", "Hot Springs"], "It is near the center of the state on the Arkansas River."],
  ["Little Rock grew where the Arkansas River meets the…", "edge of the mountains and the flat plains", ["Gulf of Mexico", "Rocky Mountains", "Great Lakes"], "Boats stopped at a rock on the riverbank."],
  ["Which area of Arkansas has grown fast, with many new people and jobs, in recent years?", "Northwest Arkansas", ["the Delta", "the Ouachita Mountains", "the Timberlands of the south"], "Fayetteville, Springdale, Rogers and Bentonville are there."],
  ["People often settle near rivers because rivers give…", "water, farmland and transportation", ["snow", "deserts", "volcanoes"], "Think about what people need."],
  ["A map that shows land regions with different shading is a…", "thematic map", ["road map", "seating chart", "calendar"], "It shows one theme."],
  ["The city of Hot Springs is in which mountains?", "the Ouachita Mountains", ["the Ozark Mountains", "Crowley's Ridge", "the Rocky Mountains"], "These mountains are in west-central Arkansas."],
  ["Arkansas has a mild climate with a long growing season. This helps…", "farmers grow crops", ["glaciers form", "deserts spread", "volcanoes erupt"], "Plants need warm months.", true],
  ["Why do fewer people live in the Ouachita Mountains than in central Arkansas?", "steep, forested land is hard to farm and build on", ["it is against the law", "there is no air", "it is under the ocean"], "Land shapes where people live.", true],
  ["Mount Magazine is about 2,753 feet high. That makes it Arkansas's…", "highest point", ["lowest point", "longest river", "biggest lake"], "It is the tallest place in the state.", true],
  ["Which region would be the best place to build a large rice farm?", "the Delta", ["the Ouachita Mountains", "the Ozark Plateau", "Mount Magazine"], "Rice needs flat, wet land.", true],
  ["On a map, Crowley's Ridge stands out from the land around it because it is…", "higher than the flat Delta", ["under water", "covered in snow", "a city"], "It is a ridge of hills.", true],
  ["Arkansas is split by geographers into highlands and lowlands. The line between them runs roughly from…", "northeast to southwest", ["north to south down the middle", "east to west across the top", "around the edges"], "Highlands to the northwest, lowlands to the southeast.", true],
];

const RESOURCES: Q[] = [
  ["Which big river flows across Arkansas from west to east?", "the Arkansas River", ["the Buffalo River", "the St. Francis River", "the Little Missouri River"], "It shares its name with the state."],
  ["Which river forms most of Arkansas's eastern border?", "the Mississippi River", ["the Arkansas River", "the White River", "the Ouachita River"], "It is one of the longest rivers in North America."],
  ["The White River flows out of the…", "Ozark Mountains", ["Gulf of Mexico", "Delta only", "Ouachita River"], "It starts in the northwest highlands."],
  ["The Ouachita River flows through southern Arkansas into…", "Louisiana", ["Missouri", "Tennessee", "Kansas"], "It flows south."],
  ["Lake Ouachita, Bull Shoals Lake and Greers Ferry Lake were made by…", "building dams on rivers", ["glaciers", "earthquakes", "meteorites"], "People built walls across rivers."],
  ["Dams on Arkansas rivers help people by…", "making electricity and controlling floods", ["making rivers saltier", "melting snow", "growing coconuts"], "Water flows through a dam's turbines."],
  ["Barges on the Arkansas River carry…", "heavy goods such as grain and fertilizer", ["only people on vacation", "airplanes", "mail by air"], "Boats can carry very heavy loads."],
  ["Bauxite is a rock mined in Arkansas that is used to make…", "aluminum", ["glass", "paper", "rubber"], "Soda cans are made of this metal."],
  ["Arkansas has a park where anyone can dig for real diamonds. It is called…", "Crater of Diamonds State Park", ["Hot Springs National Park", "Lake Ouachita", "the Buffalo National River"], "Visitors keep what they find."],
  ["Before a diamond can go into a ring, it must be…", "cut and polished", ["melted into liquid", "painted", "planted"], "A rough diamond looks like a dull pebble."],
  ["The Ouachita Mountains are famous for clear, shiny rocks called…", "quartz crystals", ["coal", "marble", "salt"], "Mount Ida digs many of them."],
  ["Southern Arkansas has oil and natural gas. These are used for…", "fuel and energy", ["food", "drinking water", "building nests"], "They power cars and heat homes."],
  ["Timber from Arkansas's pine forests is made into…", "lumber and paper", ["glass and steel", "cheese and milk", "rice and beans"], "Trees give us wood."],
  ["Rice farmers in the Delta need lots of…", "fresh water", ["salt water", "snow", "sand"], "Rice fields are flooded."],
  ["Soil, water, trees, minerals and wildlife are all…", "natural resources", ["services", "imports", "laws"], "They come from nature."],
  ["Planting new trees after cutting a forest is called…", "reforestation", ["pollution", "erosion", "littering"], "Re means again."],
  ["When rain washes soil off bare land, it is called…", "erosion", ["recycling", "harvesting", "voting"], "Plant roots help hold soil in place."],
  ["Which helps keep Arkansas rivers clean?", "not dumping trash or oil in them", ["throwing litter in the water", "washing cars in the river", "cutting every tree by the bank"], "Protect the water."],
  ["Recycling aluminum cans helps because…", "less new bauxite has to be mined", ["cans grow back", "it makes more trash", "it uses more energy"], "Old cans become new cans."],
  ["The Buffalo National River is protected so that…", "its water and land stay natural for everyone", ["no one can ever visit it", "it can be filled with dams", "factories can be built on it"], "It was the first national river."],
  ["Why do many towns in Arkansas sit beside rivers?", "rivers give water and a way to ship goods", ["rivers keep people away", "rivers have no fish", "rivers stop all floods"], "People need water and transportation."],
  ["Cotton from the Delta becomes a T-shirt. Cotton is the…", "raw material", ["finished product", "store", "service"], "The thing a product is made from."],
  ["Bauxite → aluminum → soda can. The soda can is the…", "finished product", ["raw material", "natural resource", "mine"], "It is what you buy at the end.", true],
  ["For many years, Arkansas mined most of the country's…", "bauxite", ["gold", "silver", "coal"], "A town in Saline County is even named for it.", true],
  ["Arkansas makes more bromine than any other state. It comes from…", "salty water deep underground", ["pine trees", "rice fields", "the air"], "Wells pump up the salty brine in southern Arkansas.", true],
  ["Floods along the Mississippi and Arkansas rivers are a problem. People address it with…", "levees and dams", ["more litter", "cutting all the trees", "doing nothing"], "Levees are walls of earth along rivers.", true],
  ["A rough diamond found in Arkansas may be cut in one country and sold in another. This shows…", "raw materials connect places around the world", ["diamonds never leave Arkansas", "trade does not happen", "diamonds are made in stores"], "Products travel far.", true],
];

const GOVERNMENT: Q[] = [
  ["Which branch of government makes laws?", "the legislative branch", ["the executive branch", "the judicial branch", "the school board"], "Legislate means to make laws."],
  ["Which branch of government carries out and enforces laws?", "the executive branch", ["the legislative branch", "the judicial branch", "the city library"], "The president or governor leads it."],
  ["Which branch of government decides what laws mean?", "the judicial branch", ["the legislative branch", "the executive branch", "the post office"], "Judges and courts."],
  ["Who leads the executive branch of the United States?", "the President", ["the Governor", "the Chief Justice", "the mayor"], "This person lives in the White House."],
  ["Who leads the executive branch of Arkansas?", "the Governor", ["the President", "the mayor", "the Chief Justice"], "The state's top leader."],
  ["Arkansas's legislature, which makes state laws, is called the…", "General Assembly", ["Supreme Court", "City Council", "Cabinet"], "It meets in the State Capitol."],
  ["The Arkansas General Assembly has two parts, the Senate and the…", "House of Representatives", ["Supreme Court", "Governor's Office", "School Board"], "Like the United States Congress."],
  ["The highest court in Arkansas is the…", "Arkansas Supreme Court", ["General Assembly", "Governor's Office", "City Council"], "It is part of the judicial branch."],
  ["The United States Congress is part of which branch?", "the legislative branch", ["the executive branch", "the judicial branch", "no branch"], "Congress makes national laws."],
  ["The highest court in the United States is the…", "U.S. Supreme Court", ["Arkansas Supreme Court", "Congress", "White House"], "Nine justices sit on it."],
  ["The Arkansas State Capitol, where the General Assembly meets, is in…", "Little Rock", ["Fort Smith", "Hot Springs", "Pine Bluff"], "The capital city."],
  ["Who leads a city government?", "a mayor", ["the President", "the Chief Justice", "a principal"], "Working with a city council."],
  ["A law made by a city council is called an…", "ordinance", ["amendment", "election", "allowance"], "It is a city rule, such as a speed limit on a street."],
  ["A city decides that one area is only for homes and another only for stores. This is called…", "zoning", ["voting", "taxing", "trading"], "Zones are areas."],
  ["State government in Arkansas does things like…", "build state highways and run state parks", ["print money for the country", "make treaties with other countries", "choose the President"], "Some jobs belong to the state."],
  ["Why are there three branches of government?", "so no one branch has too much power", ["to make laws take longer for fun", "because there are three states", "so the President can make every decision"], "Each branch can check the others."],
  ["Who chooses the Governor of Arkansas?", "the voters of Arkansas", ["the President", "the Supreme Court", "the mayor of Little Rock"], "Citizens vote in elections."],
  ["How long is a term for the Governor of Arkansas?", "4 years", ["1 year", "10 years", "for life"], "The same as a President's term."],
  ["A citizen can help change a city rule by…", "speaking at a city council meeting or writing to leaders", ["breaking the rule", "hiding from the council", "ignoring the problem"], "Share your ideas with leaders."],
  ["After a tornado, a town, the state and volunteers work together to…", "clean up and help people rebuild", ["make new holidays", "close every school forever", "move the capital"], "Communities help each other."],
  ["Which is a job of the state government, not a city government?", "making laws for the whole state", ["fixing one town's streetlight", "running one town's library", "picking up one town's trash"], "The state covers all of Arkansas."],
  ["Laws for the whole United States are made by…", "Congress", ["the Arkansas General Assembly", "a city council", "a school board"], "It meets in Washington, D.C."],
  ["The Arkansas Senate has 35 members and the House has 100. Together they are the…", "General Assembly", ["Supreme Court", "Cabinet", "City Council"], "Arkansas's lawmakers.", true],
  ["A judge decides whether someone broke a law. This is a power of the…", "judicial branch", ["legislative branch", "executive branch", "school board"], "Courts and judges.", true],
  ["The General Assembly passes a bill, and the Governor signs it. Now it is a…", "law", ["court case", "holiday", "tax refund"], "Both branches have a part.", true],
  ["The Governor can veto a bill. Veto means…", "to reject it", ["to sign it", "to rewrite it", "to vote for it"], "Latin for \"I forbid.\"", true],
  ["Arkansas is divided into 75…", "counties", ["countries", "states", "capitals"], "Each one has its own county government.", true],
];

const FOUNDING: Q[] = [
  ["Who was the main writer of the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Abraham Lincoln", "Benjamin Franklin"], "He later became the third President."],
  ["The Declaration of Independence was approved on…", "July 4, 1776", ["July 4, 1836", "December 25, 1776", "January 1, 1800"], "That's why we celebrate the Fourth of July."],
  ["Why did the colonists write the Declaration of Independence?", "to say the colonies were free from British rule", ["to start a new sports team", "to choose a state bird", "to build roads"], "Independence means freedom from another country's rule."],
  ["The Declaration and the Constitution were both signed in…", "Philadelphia", ["Little Rock", "London", "Paris"], "The Liberty Bell is in this city too."],
  ["The opening part of the U.S. Constitution is called the…", "Preamble", ["Bill of Rights", "Pledge", "Anthem"], "It begins \"We the People.\""],
  ["The first three words of the Constitution are…", "We the People", ["In God We Trust", "Regnat Populus", "Land of Liberty"], "The government belongs to the people."],
  ["The Constitution was written in…", "1787", ["1776", "1836", "1957"], "About ten years after the Declaration."],
  ["The Bill of Rights was added to the Constitution to…", "protect people's freedoms", ["make taxes higher", "name the state capitals", "choose the national bird"], "It lists rights like free speech."],
  ["Who wrote the words of \"The Star-Spangled Banner\"?", "Francis Scott Key", ["Thomas Jefferson", "Eva Ware Barnett", "Daisy Bates"], "He saw the flag still flying after a battle."],
  ["\"The Star-Spangled Banner\" was written during the…", "War of 1812", ["Civil War", "Revolutionary War", "World War II"], "Francis Scott Key watched a battle in 1814."],
  ["Who wrote the Arkansas state song, \"Arkansas\"?", "Eva Ware Barnett", ["Francis Scott Key", "Thomas Jefferson", "Willie Hocker"], "She wrote both the words and the music."],
  ["Who designed the Arkansas state flag?", "Willie Hocker", ["Daisy Bates", "Eva Ware Barnett", "Francis Scott Key"], "She won a contest in 1913."],
  ["The four blue stars inside the diamond on the Arkansas flag stand for…", "nations Arkansas has belonged to, and the Confederacy", ["four rivers", "four seasons", "four presidents"], "Spain, France and the United States are three.", true],
  ["The Arkansas motto, Regnat Populus, means \"the people rule.\" It shows that in Arkansas…", "citizens choose their leaders", ["a king makes all the rules", "only judges vote", "no one makes laws"], "That is democracy."],
  ["The Liberty Bell is a symbol of…", "American independence and freedom", ["the Civil War", "Arkansas statehood", "the Gold Rush"], "It rang in Philadelphia."],
  ["The Fourth of July celebrates…", "the Declaration of Independence", ["the end of the Civil War", "Arkansas statehood", "the first Thanksgiving"], "Our country's birthday."],
  ["The Little Rock Nine were…", "nine Black students who integrated Little Rock Central High School in 1957", ["nine governors of Arkansas", "nine early explorers", "nine judges on a court"], "They were brave teenagers."],
  ["Why was the Little Rock Nine's first year at Central High so hard?", "angry crowds and some leaders tried to keep them out", ["the school had no books", "they lived too far away", "the school was closed for summer"], "They faced a lot of hate and stayed strong."],
  ["Who sent soldiers to protect the Little Rock Nine?", "President Dwight D. Eisenhower", ["President Abraham Lincoln", "President George Washington", "President Thomas Jefferson"], "He was president in 1957."],
  ["Daisy Bates helped the Little Rock Nine. She was…", "a civil rights leader and newspaper publisher", ["a governor", "an explorer", "a soldier in the Civil War"], "She guided and supported the students."],
  ["Arkansas honors Daisy Bates with a state holiday in…", "February", ["July", "October", "December"], "It is on the same day as George Washington's birthday holiday."],
  ["Little Rock Central High School is still a school today, and it is also a…", "National Historic Site", ["state capitol", "national forest", "sports arena"], "People visit to learn its history."],
  ["Why do we stand for the national anthem and the Pledge?", "to show respect for our country and the people who serve it", ["to stretch before lunch", "because we are leaving", "to see better"], "It is a way to show we care about our country.", true],
  ["Which is a national symbol, and not just an Arkansas one?", "the Liberty Bell", ["the Arkansas flag", "Regnat Populus", "the mockingbird"], "It belongs to the whole country.", true],
  ["The Constitution has lasted a long time partly because it can be changed by…", "amendments", ["holidays", "songs", "landmarks"], "The Bill of Rights is the first ten of them.", true],
  ["Why is Little Rock Central High School connected to a holiday in Arkansas?", "Daisy Bates Day honors the leader who helped the Little Rock Nine", ["it is where Independence Day began", "it is where the state song was written", "it was the first capitol"], "Her name is on the holiday.", true],
];

const TIMELINE: Dated[] = [
  ["Hernando de Soto's Spanish expedition reaches Arkansas", 1541],
  ["The French build Arkansas Post", 1686],
  ["The 13 colonies declare independence", 1776],
  ["The U.S. Constitution is written", 1787],
  ["The United States buys the Louisiana Territory, including Arkansas", 1803],
  ["Arkansas Territory is created", 1819],
  ["Little Rock becomes the territorial capital", 1821],
  ["Arkansas becomes the 25th state", 1836],
  ["The Civil War begins", 1861],
  ["The Civil War ends", 1865],
  ["The Arkansas flag is adopted", 1913],
  ["Hot Springs becomes a national park", 1921],
  ["The Little Rock Nine integrate Central High School", 1957],
  ["The Buffalo River becomes the first national river", 1972],
  ["Bill Clinton of Arkansas becomes President", 1993],
];

const TIMELINE_ITEMS: Q[] = [
  ["Arkansas became a state in 1836. How many years later did the Civil War begin, in 1861?", "25 years", ["15 years", "35 years", "5 years"], "1861 − 1836."],
  ["On a timeline, events that happened earlier are usually on the…", "left", ["right", "top", "back"], "Read a timeline like a sentence."],
  ["A decade is 10 years. A century is…", "100 years", ["1,000 years", "50 years", "10 years"], "Cent means hundred."],
  ["Arkansas became a state 60 years after the Declaration of Independence (1776). In what year?", "1836", ["1776", "1816", "1860"], "1776 + 60."],
];

const MONEY_EXTRA: Q[] = [
  ["When many people want to buy something and there isn't much of it, the price usually…", "goes up", ["goes down", "stays at zero", "disappears"], "High demand, low supply."],
  ["Supply means…", "how much of something there is to sell", ["how much people want something", "the price tag", "the store's name"], "What sellers have."],
  ["Demand means…", "how much people want to buy something", ["how much there is", "the cost of making it", "where it is sold"], "What buyers want."],
  ["A huge rice harvest means lots of rice for sale. The price of rice will probably…", "go down", ["go up", "stay the same forever", "become free"], "High supply."],
  ["Two lemonade stands are on the same street. One lowers its price to get more customers. This is…", "competition", ["a tax", "a law", "a donation"], "Sellers try to win buyers."],
  ["A person who starts a new business and takes a risk is an…", "entrepreneur", ["employee", "consumer", "elected official"], "They hope to earn a profit."],
  ["A sale with a lower price is an incentive. An incentive is…", "something that encourages people to act", ["a kind of tax", "a type of money", "a rule against buying"], "It gives a reason to buy."],
  ["United States money is called the…", "dollar", ["peso", "euro", "pound"], "One hundred cents."],
  ["Money is useful because it is a way to…", "trade, save and measure what things are worth", ["grow crops", "make it rain", "build mountains"], "It makes buying and selling easy."],
  ["Banks keep money safe and also…", "make loans to people and businesses", ["make laws", "grow food", "run elections"], "A loan is borrowed money."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g3-land-regions",
    title: "Arkansas's Land Regions",
    emoji: "⛰️",
    blurb: "Ozarks, Ouachitas, the Delta and more",
    parentNote:
      "Arkansas's natural regions (the Ozark Plateau, the Ouachita Mountains, the Arkansas River Valley, the Delta, Crowley's Ridge and the West Gulf Coastal Plain), and how the land shapes where people live and work.",
    standards: ["G.1.3.3; G.1.3.6", "Arkansas's physical regions on maps, and how physical characteristics affect where people live and work"],
    items: REGIONS,
  }),
  bankUnit({
    id: "ar-g3-rivers-resources",
    title: "Rivers & Resources",
    emoji: "💎",
    blurb: "Rivers, lakes, bauxite, diamonds and forests",
    parentNote:
      "Arkansas's rivers and lakes, natural resources such as bauxite, diamonds, quartz, oil, natural gas and timber, how raw materials become products, and how people protect rivers, soil and forests.",
    standards: ["G.1.3.4; G.1.3.7; G.1.3.10", "how natural resources shape settlement, how raw materials connect places, and how people address environmental problems"],
    items: RESOURCES,
  }),
  bankUnit({
    id: "ar-g3-government",
    title: "Three Branches & Arkansas Government",
    emoji: "🏛️",
    blurb: "Who makes, carries out and judges laws",
    parentNote:
      "The legislative, executive and judicial branches in the United States and Arkansas (the General Assembly, the Governor and the Arkansas Supreme Court), city councils, ordinances and zoning, and how communities and the state work together after a disaster.",
    standards: ["C.1.3.2; C.1.3.3; C.1.3.7; C.1.3.9", "the three branches of government, the structure of Arkansas state government, and how local rules and laws are made"],
    items: GOVERNMENT,
  }),
  bankUnit({
    id: "ar-g3-founding-symbols",
    title: "Founding Papers & Historic Places",
    emoji: "🔔",
    blurb: "The Declaration, the Constitution and the Little Rock Nine",
    parentNote:
      "The origins of the Declaration of Independence, the Constitution and its Preamble, and the Bill of Rights; who wrote the national anthem and the Arkansas song and designed the state flag; and the Liberty Bell, the Fourth of July, Daisy Bates Day, the Little Rock Nine and Little Rock Central High School.",
    standards: ["C.1.3.1; C.1.3.4; H.1.3.5", "the origins of the founding documents and of state and national symbols, and the historic events behind them"],
    items: FOUNDING,
  }),
  timelineUnit({
    id: "ar-g3-timeline",
    title: "Arkansas Through Time",
    emoji: "🗓️",
    blurb: "Put Arkansas and US events in order",
    parentNote:
      "Putting events in Arkansas and US history in order, from de Soto's expedition and Arkansas Post to independence, the Louisiana Purchase, statehood, the Civil War and the Little Rock Nine.",
    standards: ["H.1.3.1; H.1.3.2", "historical narratives and timelines of events in Arkansas and the United States"],
    events: TIMELINE,
    items: TIMELINE_ITEMS,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "ar-g3-money-choices",
      title: "Money, Markets & Choices",
      emoji: "💵",
      blurb: "Costs and benefits, supply and demand, taxes and voting",
      parentNote:
        "Scarcity, costs and benefits, public and private goods, taxes and voting, plus Arkansas items on supply and demand, competition, entrepreneurs, US money and what banks do.",
      standards: ["E.1.3.1; E.1.3.2; E.1.3.4; E.1.3.5; E.1.3.6; E.1.3.8; C.1.3.8", "decision-making, markets, money, public and private goods, and how people influence rules and laws"],
    },
    MONEY_EXTRA,
  ),
];
