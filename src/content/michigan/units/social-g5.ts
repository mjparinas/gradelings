import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Michigan Grade 5 social studies, Integrated United States History: the Indigenous Peoples of the Eastern Woodland
// and how they and the peoples of another region adapted to their environments (5 – U1.1.1 to U1.1.3). Kept light, in the
// present tense, about living nations, with nothing sacred or ceremonial. The rest of the grade (exploration, the
// colonies, the Revolution and the Constitution) is practised with adopted units (see ../plan/social.ts).

const WOODLAND: Q[] = [
  ["The Eastern Woodland is the land of forests east of the…", "Mississippi River", ["Rocky Mountains", "Pacific Ocean", "Sahara"], "The river runs down the middle of the country."],
  ["Eastern Woodland peoples used the forest for…", "food, wood, bark and animal skins", ["only gold", "only sand", "only oil"], "The forest met many needs."],
  ["Many Eastern Woodland peoples grew corn, beans and squash, which are called the…", "Three Sisters", ["Three Lakes", "Three Hills", "Three Rivers"], "The three crops help each other grow."],
  ["In a Three Sisters garden, the bean vines climb…", "the corn stalks", ["the squash leaves", "a fence of stone", "nothing at all"], "Corn is tall and strong."],
  ["The Haudenosaunee built long homes of wood and bark that held several families, called…", "longhouses", ["igloos", "tipis", "pueblos"], "Many related families shared one."],
  ["Many Anishinaabe families built dome-shaped homes of saplings and bark called…", "wigwams", ["castles", "skyscrapers", "adobe houses"], "They could be built from forest materials."],
  ["The Haudenosaunee Confederacy joined several nations under the…", "Great Law of Peace", ["Magna Carta", "Treaty of Paris", "Mayflower Compact"], "It set out how the nations would govern together."],
  ["How many nations are in the Haudenosaunee Confederacy today?", "six", ["two", "twelve", "fifty"], "The Tuscarora joined the first five."],
  ["In many Eastern Woodland nations, families belong to groups called…", "clans", ["counties", "colonies", "companies"], "Clans are often named for animals."],
  ["Eastern Woodland peoples traveled rivers and lakes in…", "canoes", ["steamboats", "trains", "cars"], "Birchbark and dugout canoes were common."],
  ["Eastern Woodland nations traded with each other for…", "food, tools, shells and furs", ["phones", "cars", "plastic"], "Trade routes followed rivers."],
  ["People of the Great Plains followed herds of…", "bison", ["camels", "penguins", "elephants"], "Bison gave food, hides and tools."],
  ["Many Plains peoples lived in homes that were easy to move, called…", "tipis", ["longhouses", "brick houses", "castles"], "They followed the herds."],
  ["Pueblo peoples of the Southwest built homes from…", "adobe, sun-dried clay bricks", ["birchbark", "ice blocks", "pine logs only"], "Clay keeps homes cool in the desert."],
  ["Why did Southwest peoples build homes of adobe instead of bark?", "the desert has few trees", ["they did not like trees", "bark is too heavy", "adobe floats"], "People use what the land gives them."],
  ["Why did Plains peoples move their homes more often than Woodland peoples?", "they followed bison herds", ["they disliked forests", "they had no families", "they lived in cities"], "The way people get food shapes how they live."],
  ["Which statement about Eastern Woodland nations is true?", "each nation has its own language, government and history", ["they are all one nation", "they no longer exist", "they all lived in tipis"], "Never treat all nations as one.", true],
  ["Today, many Eastern Woodland nations run…", "their own governments, schools and businesses", ["no governments", "only museums", "only farms"], "They are living communities.", true],
  ["Women in Haudenosaunee nations have an important role in…", "choosing clan leaders", ["building ships", "mining copper", "running railroads"], "Clan mothers choose and advise leaders.", true],
  ["How did Eastern Woodland peoples change their work with the seasons?", "planting and gathering in summer, hunting in winter", ["mining in every season", "shopping in malls", "sailing the ocean"], "Each season had its work.", true],
  ["Making maple sugar in early spring is an example of using…", "a forest resource", ["a desert resource", "an ocean resource", "a mountain glacier"], "Maple trees grow in the Woodland.", true],
  ["On a map of Eastern Woodland nations, the Anishinaabek live mostly around the…", "Great Lakes", ["Gulf of Mexico", "Rocky Mountains", "Pacific coast"], "Michigan is Anishinaabe land.", true],
  ["The Cherokee are a nation from the southern part of the Eastern Woodland. Their homeland was in the…", "southern Appalachian Mountains", ["Great Plains", "Arctic", "Sonoran Desert"], "Many Cherokee were later forced west.", true],
  ["Why do historians use both oral histories and written records to learn about Woodland nations?", "each gives part of the story", ["written records are always wrong", "oral histories don't count", "neither is useful"], "Nations kept their histories by telling them.", true],
  ["Councils in many Woodland nations made decisions by…", "talking until they agreed", ["flipping a coin", "letting one stranger decide", "never meeting"], "Consensus was important.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "mi-g5-eastern-woodland",
    title: "Peoples of the Eastern Woodland",
    emoji: "🌲",
    blurb: "Forest nations, and how peoples adapted to the land",
    parentNote: "The Indigenous Peoples of the Eastern Woodland, east of the Mississippi: the Three Sisters, longhouses and wigwams, clans, councils and the Haudenosaunee Confederacy, trade by canoe, and how Woodland, Plains and Southwest peoples adapted to their environments. Kept light and in the present tense.",
    standards: ["5-U1.1.1; 5-U1.1.2; 5-U1.1.3", "the location of Eastern Woodland peoples, how they and another region's peoples adapted to their environments, and their governments, families and trade"],
    items: WOODLAND,
  }),
];
