import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nevada Grade 8 social studies, Early U.S. History and Civic Ideals: Nevada's part in the nation's story, from the
// Mexican Cession, emigrant trails and the Comstock Lode to statehood in the Civil War and the 13th Amendment
// (SS.6-8.EUSH.18, SS.6-8.EUSH.23), what westward expansion meant for Nevada's Native communities (SS.6-8.EUSH.19) and
// who came to Nevada and why (SS.6-8.EUSH.20), and the new nation from Washington's Farewell Address to westward
// expansion. The rest of the national story is practised with adopted units (see ../plan/social.ts).

const NEVADA_AND_NATION: Q[] = [
  ["Nevada's land became part of the United States in 1848, at the end of the war with…", "Mexico", ["Britain", "France", "Spain"], "The Treaty of Guadalupe Hidalgo gave the United States the Mexican Cession."],
  ["In 1844 John C. Frémont named the Great Basin because he found that its rivers…", "never reach the ocean", ["all flow to the Gulf", "freeze all year", "flow uphill"], "He mapped the region with Kit Carson."],
  ["Emigrants heading west in the 1840s and 1850s crossed northern Nevada by following the…", "Humboldt River", ["Colorado River", "Hudson River", "Ohio River"], "The river gave water and grass across the desert."],
  ["Mormon Station, founded in 1851 and later named Genoa, began as a…", "trading post for travelers on the trails", ["silver mine", "railroad town", "fort for the Spanish"], "It was the first non-Native settlement in Nevada."],
  ["From 1850 until 1861, the land that is now Nevada was mostly part of the…", "Utah Territory", ["Oregon Territory", "Indian Territory", "Louisiana Territory"], "Congress created the Nevada Territory in 1861."],
  ["The Comstock Lode, found in 1859, made Virginia City…", "one of the richest mining towns in the West", ["a fishing village", "the capital of the United States", "a ghost town at once"], "Silver drew people from around the world."],
  ["The Pony Express carried mail across Nevada in 1860 and 1861 until it was replaced by the…", "telegraph", ["telephone", "airplane", "railroad"], "The telegraph sent messages in minutes."],
  ["Nevada became a state on October 31, 1864, during the…", "Civil War", ["Revolutionary War", "War of 1812", "Mexican-American War"], "That is why its motto and flag say Battle Born."],
  ["Nevada had far fewer people than most new states. Congress admitted it partly because Republicans wanted…", "more votes to pass the 13th Amendment and support the Union", ["a new capital", "to sell the land to Mexico", "fewer states in Congress"], "Lincoln was running for reelection that fall."],
  ["The 13th Amendment, which Nevada ratified in 1865,…", "abolished slavery in the United States", ["gave women the vote", "created income tax", "ended the Pony Express"], "Nevada's new lawmakers voted for it soon after statehood."],
  ["Thousands of Chinese workers built the Central Pacific Railroad, which crossed Nevada in…", "1868 and 1869", ["1776", "1905", "1936"], "It met the Union Pacific in Utah in 1869."],
  ["The railroad changed Nevada by…", "creating towns like Reno and Elko along its line", ["ending mining", "making Nevada smaller", "closing the trails"], "Towns grew where trains stopped."],
  ["Westward travel hurt Northern Paiute and Western Shoshone communities because emigrants' cattle…", "ate the grasses and seeds families gathered for food", ["brought more food", "built schools", "planted forests"], "Settlers changed the land Native peoples relied on."],
  ["Miners cut down many piñon pine trees for fuel and mine timbers. For Great Basin peoples this meant…", "losing an important source of pine nuts", ["more pine nuts to gather", "no change", "new forests"], "Piñon nuts were a key food."],
  ["Conflict in 1860 between the Northern Paiute and settlers near Pyramid Lake is called the…", "Pyramid Lake War", ["Toledo War", "War of 1812", "Black Hawk War"], "It followed years of growing pressure on Paiute lands."],
  ["Sarah Winnemucca's book of 1883, one of the first written by a Native American woman, told readers about…", "the Paiute people and how they were treated", ["silver mining methods", "railroad schedules", "life in Europe"], "She also spoke in cities across the country."],
  ["Mark Twain came to Nevada in 1861 and wrote for the… in Virginia City.", "Territorial Enterprise", ["New York Times", "Boston Globe", "Pony Express"], "His book Roughing It describes Nevada."],
  ["Why did people from Ireland, Cornwall, China, Italy and Mexico come to the Comstock?", "jobs in the mines and the businesses around them", ["free land by the ocean", "to escape the cold", "to join the army"], "The mines needed many workers."],
  ["Basque immigrants who came to Nevada in the late 1800s often worked as…", "sheepherders", ["sailors", "bankers", "railroad owners"], "Many came from Spain and France.", true],
  ["How did the Civil War help Nevada become a state so quickly?", "the Union wanted another loyal state and its votes in Congress", ["the South wanted Nevada", "Mexico asked for it", "nobody lived in Nevada"], "National events shaped Nevada's history.", true],
  ["Silver from the Comstock affected the nation by…", "adding wealth to the national economy and building San Francisco's banks", ["ending trade", "closing the railroads", "making silver worthless at once"], "Events in Nevada had national effects.", true],
  ["The Chinese Exclusion Act of 1882 affected Nevada's Chinese communities by…", "stopping most new immigrants from China", ["inviting more workers", "giving them land", "making them citizens"], "Many Chinatowns in Nevada shrank afterward.", true],
  ["Why did the Pony Express route cross Nevada?", "it was the most direct way from Missouri to the Pacific", ["Nevada had the most rain", "it followed the ocean", "it was the only state"], "Riders changed horses at stations across the desert.", true],
  ["Westward expansion brought Nevada both growth and loss. Which pair shows that?", "new towns and mines, and Native families losing land and food", ["more rain and fewer people", "new oceans and fewer roads", "no change at all"], "Weigh effects on different groups.", true],
];

const NEW_NATION: Q[] = [
  ["In his Farewell Address of 1796, George Washington warned Americans against…", "political parties and permanent foreign alliances", ["building roads", "public schools", "farming"], "He feared division at home and wars abroad."],
  ["The first two political parties formed around the ideas of Alexander Hamilton and…", "Thomas Jefferson", ["Abraham Lincoln", "Henry Ford", "Andrew Johnson"], "Federalists and Democratic-Republicans."],
  ["Hamilton's Federalists wanted…", "a strong national government", ["no national government", "a king", "rule by Britain"], "Jefferson's party favored the states and farmers."],
  ["Marbury v. Madison (1803) established the Supreme Court's power to…", "declare a law unconstitutional", ["elect the President", "declare war", "collect taxes"], "This is called judicial review."],
  ["Chief Justice John Marshall wrote the decision in…", "Marbury v. Madison", ["Brown v. Board of Education", "Plessy v. Ferguson", "Miranda v. Arizona"], "It was decided in 1803."],
  ["In 1803 the United States bought a huge territory west of the Mississippi from France. This was the…", "Louisiana Purchase", ["Gadsden Purchase", "Alaska Purchase", "Northwest Ordinance"], "It doubled the size of the country."],
  ["Who led the expedition to explore the Louisiana Purchase in 1804?", "Lewis and Clark", ["Marquette and Joliet", "Hamilton and Burr", "Lincoln and Douglas"], "Sacagawea helped guide them."],
  ["The War of 1812 was fought between the United States and…", "Great Britain", ["France", "Spain", "Mexico"], "British ships seized American sailors."],
  ["The Monroe Doctrine of 1823 told European countries…", "not to start new colonies in the Americas", ["to invade the United States", "to buy Nevada", "to end slavery"], "It was a warning to Europe."],
  ["The Indian Removal Act of 1830 forced many Native nations to…", "leave their homelands for land west of the Mississippi", ["move to Europe", "join the army", "move to Canada"], "President Andrew Jackson signed it."],
  ["The forced removal of the Cherokee Nation in 1838 and 1839, in which thousands died, is called the…", "Trail of Tears", ["Oregon Trail", "Underground Railroad", "Santa Fe Trail"], "Many Cherokee people died on the march."],
  ["Manifest Destiny was the belief that the United States should…", "spread across North America to the Pacific", ["stay east of the Appalachians", "return land to Britain", "end all trade"], "The phrase became popular in the 1840s."],
  ["The United States gained much of the Southwest after the war with…", "Mexico", ["Canada", "Spain", "France"], "The war ended in 1848."],
  ["Which invention helped settlers farm the tough prairie soil?", "the steel plow", ["the airplane", "the telephone", "the car"], "John Deere sold one in the 1830s."],
  ["The Erie Canal and new railroads helped the nation by…", "moving goods and people west faster and cheaper", ["stopping trade", "closing the frontier", "ending farming"], "Transportation tied regions together."],
  ["Growing westward expansion raised a hard question:", "whether new states would allow slavery", ["whether to build schools", "whether to have a flag", "whether to hold elections"], "Each new state upset the balance."],
  ["Washington set a precedent by serving only…", "two terms as President", ["one month", "for life", "five terms"], "Later the 22nd Amendment made it law.", true],
  ["The Alien and Sedition Acts of 1798 were criticized because they…", "limited free speech against the government", ["freed enslaved people", "lowered taxes", "built canals"], "Jefferson and Madison opposed them.", true],
  ["One positive result of expansion for many settlers was…", "cheap land to farm", ["fewer jobs", "less food", "smaller towns"], "Land drew families west.", true],
  ["One negative result of expansion was…", "Native nations losing their homelands", ["more farmland for everyone", "new railroads", "new states joining"], "Expansion came at a high cost to Native peoples.", true],
  ["Judicial review is an example of which constitutional principle?", "checks and balances", ["popular sovereignty only", "monarchy", "federal taxes"], "The courts check the other branches.", true],
  ["The Treaty of Ghent in 1814 ended the…", "War of 1812", ["Civil War", "Revolution", "Mexican-American War"], "Borders went back to how they were.", true],
  ["Why did the Northwest Territory fill with settlers after the War of 1812?", "British support for resistance to settlement ended and travel got easier", ["gold was found on every farm", "the land was free of trees", "slavery was allowed there"], "Peace and the Erie Canal brought settlers.", true],
  ["Comparing the United States in 1800 with 1850, which change is true?", "it stretched to the Pacific Ocean", ["it had fewer states", "it lost the Great Lakes", "it had no railroads by 1850"], "Look at a map of each year.", true],
  ["Sequoyah created a written form of the…", "Cherokee language", ["English language", "French language", "Spanish language"], "Many Cherokee people learned to read it quickly.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "nv-g8-nevada-and-the-nation",
    title: "Nevada & the Nation",
    emoji: "🎖️",
    blurb: "From the Mexican Cession to Battle Born statehood",
    parentNote: "Nevada's part in United States history: the Mexican Cession, Frémont and the emigrant trails along the Humboldt, Mormon Station, the Comstock Lode, the Pony Express and telegraph, statehood during the Civil War and the 13th Amendment, the railroad and Chinese workers, what expansion meant for the Paiute and Shoshone, Sarah Winnemucca, and the people who came to Nevada and why.",
    standards: ["SS.6-8.EUSH.18; SS.6-8.EUSH.19; SS.6-8.EUSH.20; SS.6-8.EUSH.23", "how Nevada's history influenced and was influenced by the nation's, westward expansion and Nevada's Native communities, migration to Nevada, and the abolition of slavery"],
    items: NEVADA_AND_NATION,
  }),
  bankUnit({
    id: "nv-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["SS.6-8.EUSH.12; SS.6-8.EUSH.21; SS.6-8.EUSH.32; SS.6-8.EUSH.41", "early political ideas and parties, conflict and diplomacy, the growth of representative government, and the Louisiana Purchase and westward expansion"],
    items: NEW_NATION,
  }),
];
