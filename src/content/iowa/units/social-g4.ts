import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Grade 4 social studies, Our New Nation: how Iowa's population changed from mostly Native American to mostly
// settlers from Europe and the eastern states (SS.4.14), what happened when these groups met (SS.4.15), and the
// policies meant to bring settlers west (SS.4.16); and the immigrants who came to Iowa, where they settled and why
// (SS.4.18, SS.4.19), the policies that welcomed or restricted them (SS.4.22), their civic virtues (SS.4.23) and Iowa's
// cultural makeup past and present (SS.4.21). The Revolution, westward expansion and budgets are adopted units.

const SETTLING: Q[] = [
  ["The Black Hawk Purchase opened land along the Mississippi to settlers in…", "1833", ["1492", "1776", "1950"], "It followed the Black Hawk War of 1832."],
  ["Before the 1830s, most people living in the land that is now Iowa were…", "Native Americans", ["settlers from Europe", "people from Asia", "no one"], "Many nations had homelands here."],
  ["By 1860, most Iowans were…", "settlers from Europe and the eastern states", ["Native Americans", "people from Asia", "soldiers"], "Hundreds of thousands of settlers arrived."],
  ["Iowa's population grew from about 43,000 in 1840 to about 675,000 in…", "1860", ["1700", "1800", "2020"], "Twenty years of fast growth."],
  ["Early settlers came to Iowa mostly because of…", "cheap, rich farmland", ["gold mines", "ocean ports", "tall mountains"], "The soil was some of the best in the world."],
  ["Many early settlers came to Iowa from states such as…", "Ohio, Indiana and Pennsylvania", ["Hawaii and Alaska", "California and Oregon", "Florida and Texas"], "They moved west, looking for land."],
  ["A treaty is…", "an agreement between nations", ["a kind of wagon", "a farm tool", "a school lesson"], "Many treaties traded away Native land."],
  ["In the 1842 treaty, the Sauk and Meskwaki nations gave up…", "their remaining land in Iowa", ["their language", "the Mississippi River", "Des Moines"], "They had to move to Kansas."],
  ["Native nations lost their land in Iowa through treaties and…", "pressure from the United States government", ["their own choice to leave", "a flood", "a lottery"], "Many treaties were signed under pressure."],
  ["Iowa became a territory in…", "1838", ["1492", "1776", "1920"], "Its first capital was Burlington."],
  ["The Homestead Act of 1862 gave settlers…", "160 acres if they farmed it for five years", ["a free car", "a gold mine", "a city house"], "It was meant to bring settlers west."],
  ["The United States government gave railroad companies land so they would…", "build railroads across the West", ["build ships", "plant forests", "stop settlers"], "Railroads sold land to settlers."],
  ["The first railroad across Iowa reached Council Bluffs in…", "1867", ["1776", "1920", "1990"], "It connected to the line heading west."],
  ["Breaking the tough prairie sod was easier with a…", "steel plow", ["wooden spoon", "shovel made of glass", "rake made of rope"], "John Deere sold a steel plow in 1837."],
  ["On the treeless prairie of northwest Iowa, some settlers built houses of…", "sod", ["stone castles", "glass", "ice"], "Sod is grass with soil and roots."],
  ["A hard part of life for early settlers was…", "harsh winters and prairie fires", ["too many stores", "too many trains", "too much free time"], "Settlers faced many dangers."],
  ["Fur traders and Native nations traded furs for…", "metal tools, cloth and guns", ["phones", "cars", "plastic toys"], "Trade helped both sides at first."],
  ["When settlers fenced and plowed the land, Native families lost…", "hunting grounds and village sites", ["their schools only", "their airplanes", "their stores"], "This led to conflicts over land."],
  ["The Ho-Chunk people were moved to the Neutral Ground in northeast Iowa and then to…", "Minnesota", ["Florida", "Mexico", "Canada"], "They were moved more than once."],
  ["Fort Atkinson and Fort Des Moines were built by the United States army in the…", "1840s", ["1600s", "1990s", "2010s"], "The army watched over the frontier."],
  ["Before land was sold, settlers formed claim clubs to…", "protect each other's land claims", ["start a band", "build a school bus", "elect a king"], "Members promised to stand together."],
  ["The city of Des Moines grew up around…", "Fort Des Moines", ["a gold mine", "an ocean port", "an airport"], "The fort was where two rivers meet."],
  ["A benefit of settling in Iowa was…", "owning a farm of your own", ["no hard work", "no winter", "no neighbors at all"], "Land was a family's future."],
  ["A cost for Native nations when settlers came was…", "losing their homeland", ["more land", "new villages in Iowa", "free schools"], "Removal took them far away."],
  ["Policies to settle the West helped many settlers but hurt…", "Native nations", ["railroad companies", "land offices", "most settlers"], "One group's gain was another's loss.", true],
  ["Some Sauk and Meskwaki people hid and stayed in Iowa after the 1842 treaty. Others…", "came back later and bought land near Tama", ["moved to Europe", "built the railroad", "became governor"], "The Meskwaki Settlement began in 1857.", true],
  ["Why did settlers often build their first towns along rivers?", "rivers were the easiest way to travel and ship goods", ["rivers kept bears away", "rivers had no water", "the government banned other places"], "Steamboats carried goods on the Mississippi.", true],
  ["Why was the Black Hawk War fought?", "Black Hawk's band tried to return to their homeland", ["settlers wanted gold", "France attacked", "a railroad broke"], "They crossed back over the Mississippi in 1832.", true],
];

const IMMIGRANTS: Q[] = [
  ["In the 1800s, the largest group of immigrants to Iowa came from…", "Germany", ["Japan", "Brazil", "Egypt"], "German towns and churches grew across Iowa."],
  ["Dutch settlers founded Pella in 1847, looking for…", "freedom to worship in their own way", ["gold", "an ocean beach", "mountains"], "Their leader was Dominie Hendrik Scholte."],
  ["Many Norwegian immigrants settled in northeast Iowa, around…", "Decorah", ["Sioux City", "Council Bluffs", "Ottumwa"], "Decorah has a Norwegian-American museum."],
  ["Danish immigrants settled in Elk Horn, where today visitors see a…", "Danish windmill", ["giant pyramid", "castle", "lighthouse"], "It was moved from Denmark."],
  ["Many Czech immigrants settled in…", "Cedar Rapids", ["Pella", "Elk Horn", "Decorah"], "Czech Village is there."],
  ["Irish immigrants who came to Iowa often worked building…", "railroads", ["skyscrapers", "airports", "pyramids"], "Many left Ireland after the potato famine."],
  ["A push factor is something that makes people…", "leave their home country", ["stay home", "go to school", "eat dinner"], "War and hunger are push factors."],
  ["A pull factor is something that…", "draws people to a new place", ["makes people leave", "keeps people asleep", "closes schools"], "Jobs and land are pull factors."],
  ["Famine in Ireland in the 1840s was a…", "push factor", ["pull factor", "holiday", "railroad"], "People left because there was little food."],
  ["Cheap farmland in Iowa was a…", "pull factor", ["push factor", "law", "war"], "It drew people to Iowa."],
  ["In 1870, Iowa printed a booklet called Iowa: The Home for Immigrants to…", "invite people to settle", ["keep people away", "sell cars", "teach math"], "It was printed in several languages."],
  ["The Amana Colonies were founded in 1855 by German-speaking people who…", "lived and worked together as a community", ["mined gold", "sailed ships", "built a city of glass"], "Seven villages share the name Amana."],
  ["Welsh and Italian immigrants often worked in Iowa's…", "coal mines", ["gold mines", "fishing fleets", "rice fields"], "Southern Iowa had many coal mines."],
  ["In the early 1900s, many Mexican workers came to Iowa to work on…", "the railroads", ["ocean ships", "space stations", "sugar plantations"], "Davenport and Fort Madison had Mexican neighborhoods."],
  ["In 1975, Governor Robert Ray welcomed refugees from Southeast Asia called the…", "Tai Dam", ["Pilgrims", "Vikings", "Romans"], "They had fled war in Laos."],
  ["A refugee is a person who…", "must flee danger in their home country", ["goes on vacation", "visits a farm", "moves next door for fun"], "War is a common reason."],
  ["In the 1990s, many Bosnian refugees made new homes in…", "Waterloo", ["Pella", "Decorah", "Elk Horn"], "They fled war in Europe."],
  ["Today, many Latino families work in Iowa's meatpacking towns, such as…", "Storm Lake and Marshalltown", ["Paris and Rome", "Tokyo and Seoul", "Cairo and Lima"], "These jobs drew many families."],
  ["In 1918, Governor William Harding's Babel Proclamation said people in Iowa must…", "speak only English in public", ["learn three languages", "move to cities", "stop farming"], "It was aimed at German speakers during World War I."],
  ["The Chinese Exclusion Act of 1882 was a United States law that…", "kept most Chinese workers out", ["welcomed all workers", "built railroads", "freed enslaved people"], "It restricted immigration."],
  ["A civic virtue immigrants showed when building new towns was…", "working together to build schools and churches", ["fighting neighbors", "breaking laws", "staying apart"], "Communities need cooperation."],
  ["Immigrants who become United States citizens take an oath and gain the right to…", "vote", ["skip taxes", "break laws", "never work"], "Citizens vote in elections."],
  ["Many immigrant groups in Iowa started newspapers in their own language to…", "share news with their community", ["hide news", "stop reading", "sell candy"], "Iowa had German, Czech and Norwegian newspapers."],
  ["How were the Dutch in Pella and the Germans in Amana alike?", "both came partly for religious freedom", ["both mined coal", "both came from Asia", "both came in 1990"], "Faith was a pull factor for both."],
  ["How were the Irish railroad workers and the Tai Dam refugees different?", "one group came for jobs, the other to escape war", ["both came in 1975", "both came from Laos", "both were Dutch"], "Push and pull factors differ.", true],
  ["West Liberty became the first Iowa town where most people are…", "Latino", ["Danish", "Dutch", "Welsh"], "That happened in 2000.", true],
  ["Why did immigrant groups often settle together in one town?", "to share language, faith and help", ["because laws forced them to", "to avoid farming", "because maps showed nowhere else"], "Friends and family made a new place feel like home.", true],
  ["The Babel Proclamation and the Chinese Exclusion Act were both policies that…", "restricted groups of people", ["welcomed everyone", "gave away land", "built schools"], "Not every policy welcomed newcomers.", true],
  ["Today Iowa's cultural makeup includes Native, European, Latino, Black, Asian and African communities, and many…", "farm families", ["ocean fishing villages", "mountain ski towns", "desert oases"], "Agriculture shapes much of Iowa's culture.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "ia-g4-settling-iowa",
    title: "Settling Iowa",
    emoji: "🐂",
    blurb: "Treaties, settlers and a growing state",
    parentNote: "How Iowa's population changed from mostly Native nations to mostly settlers: the Black Hawk Purchase, treaties and removal, the Iowa Territory, claim clubs, forts, steel plows and sod houses, the Homestead Act and railroad land grants, and what settlement cost the Sauk, Meskwaki, Ho-Chunk and other nations.",
    standards: ["SS.4.14; SS.4.15; SS.4.16", "how Iowa's population changed, what happened when groups came into contact, and the effects of policies meant to promote westward settlement"],
    items: SETTLING,
  }),
  bankUnit({
    id: "ia-g4-immigrants",
    title: "Coming to Iowa",
    emoji: "🧳",
    blurb: "The people who made Iowa home",
    parentNote: "The immigrants who came to Iowa and why: German, Dutch, Norwegian, Danish, Czech, Irish, Welsh and Italian settlers in the 1800s, Mexican railroad workers, Tai Dam and Bosnian refugees and today's Latino communities; push and pull factors; policies that welcomed or restricted newcomers, such as Iowa's 1870 booklet for immigrants, the Chinese Exclusion Act and the 1918 Babel Proclamation; and the civic virtues of building new communities.",
    standards: ["SS.4.18; SS.4.21; SS.4.22; SS.4.23", "where immigrant groups settled, Iowa's cultural makeup, policies that encouraged or restricted immigration, and the civic virtues of immigrant groups"],
    items: IMMIGRANTS,
  }),
];
