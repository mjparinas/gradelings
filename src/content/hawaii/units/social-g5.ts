import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Hawaiʻi Grade 5 social studies, the United States to the Revolution: how the geography of North America shaped Native
// American societies (SS.5.1.14.1) and their cultures compared, with the Pacific Northwest, Cherokee and Pueblo peoples
// the standard names and the Eastern Woodland, whose lands the colonies grew on (SS.5.1.17.2). Kept light, in the present
// tense where it is about living nations, with nothing sacred or ceremonial. The rest of the grade (exploration, the
// colonies and the Revolution) is practised with adopted units (see ../plan/social.ts) and a copy of California's
// explorers unit (./copies-g5.ts).

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
  ["On a map of Eastern Woodland nations, the Anishinaabek live mostly around the…", "Great Lakes", ["Gulf of Mexico", "Rocky Mountains", "Pacific coast"], "Their homelands are around the lakes.", true],
  ["The Cherokee are a nation from the southern part of the Eastern Woodland. Their homeland was in the…", "southern Appalachian Mountains", ["Great Plains", "Arctic", "Sonoran Desert"], "Many Cherokee were later forced west.", true],
  ["Why do historians use both oral histories and written records to learn about Woodland nations?", "each gives part of the story", ["written records are always wrong", "oral histories don't count", "neither is useful"], "Nations kept their histories by telling them.", true],
  ["Councils in many Woodland nations made decisions by…", "talking until they agreed", ["flipping a coin", "letting one stranger decide", "never meeting"], "Consensus was important.", true],
  ["Pueblo farmers in the Southwest adapted to a dry land by…", "using river water to grow corn, beans and squash", ["growing rice in swamps", "fishing in the ocean", "living in longhouses"], "The Southwest has little rain.", true],
  ["Many peoples of the Pacific Northwest coast built large houses from…", "cedar planks", ["adobe bricks", "ice blocks", "bison hides"], "Tall cedar trees grow in that rainy forest."],
  ["A food that many Pacific Northwest peoples caught in rivers each year is…", "salmon", ["bison", "corn", "maple sugar"], "The fish swim upriver every year."],
  ["Why could many Pacific Northwest peoples live in large villages without farming much?", "rivers and the sea gave plenty of fish", ["they bought food in stores", "it never rained", "they ate only snow"], "Rich resources shape a way of life.", true],
  ["Compared with Eastern Woodland peoples, peoples of the Southwest had…", "fewer trees and less water to use", ["more forests", "more rain", "more rivers to the ocean"], "Each region gives people different resources.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "hi-g5-native-nations",
    title: "Nations of Early North America",
    emoji: "🌲",
    blurb: "How the land shaped Native American ways of life",
    parentNote: "How North America's geography shaped Native American societies, compared across regions: the Eastern Woodland (the Three Sisters, longhouses and wigwams, clans, councils and the Haudenosaunee Confederacy, the Cherokee), the Great Plains, the Pueblo peoples of the Southwest and the Pacific Northwest coast. Kept light, and in the present tense about nations that live on today.",
    standards: ["SS.5.1.14.1; SS.5.1.17.2", "how the geography of North America shaped Native American societies, and comparing their cultures"],
    items: WOODLAND,
  }),
];
