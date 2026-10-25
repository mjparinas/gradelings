import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kansas Grade 8 social studies, U.S. history 1789 to 1898: Kansas's part in the nation's story, from the Louisiana
// Purchase, the explorers and the trails to Bleeding Kansas, statehood on the eve of the Civil War, the war itself,
// homesteading, cattle towns, the Exodusters and the Populists, practising the benchmarks on choices and consequences,
// rights and responsibilities, continuity and change, and dynamic relationships. The new nation from Washington's
// Farewell Address to westward expansion is a second unit; the rest of the national story is practised with adopted
// units (see ../plan/social.ts).

const KANSAS_AND_NATION: Q[] = [
  ["Most of Kansas became United States land in 1803 through the…", "Louisiana Purchase", ["Mexican Cession", "Treaty of Paris", "Gadsden Purchase"], "The United States bought the land from France."],
  ["On July 4, 1804, Lewis and Clark's expedition celebrated near present-day Atchison, Kansas, by…", "naming a stream Independence Creek", ["founding a city", "finding gold", "building a fort"], "It was the first Fourth of July celebrated in Kansas."],
  ["In 1806 Zebulon Pike crossed Kansas and visited a village of the…", "Pawnee", ["Haudenosaunee", "Cherokee", "Aztec"], "The site is in Republic County."],
  ["After his 1820 expedition, Stephen Long called the plains, including western Kansas, the…", "Great American Desert", ["Garden of the World", "Land of Lakes", "Gold Coast"], "He thought the dry grassland could not be farmed."],
  ["The Santa Fe Trail, opened in 1821, carried trade between Missouri and…", "Santa Fe, then part of Mexico", ["Boston", "Chicago", "New Orleans"], "Wagons crossed Kansas for weeks."],
  ["Under the Indian Removal Act of 1830, the government moved nations such as the Shawnee, Delaware and Kickapoo to land in…", "Kansas", ["Florida", "Maine", "Oregon"], "They were promised the land would be theirs forever."],
  ["Wagons on the Oregon and California Trails crossed…", "northeastern Kansas", ["southern Florida", "the Great Lakes", "New England"], "Many crossed the Big Blue River near Marysville."],
  ["The Kansas-Nebraska Act of 1854, written by Senator Stephen Douglas, let settlers…", "vote on whether to allow slavery", ["elect the President", "buy land from Britain", "form their own country"], "It ended the Missouri Compromise line."],
  ["In 1856 a proslavery force attacked Lawrence, and John Brown answered with killings along Pottawatomie Creek. These events were part of…", "Bleeding Kansas", ["the War of 1812", "the Gold Rush", "Reconstruction"], "The fighting was a warning of the Civil War."],
  ["The proslavery Lecompton Constitution of 1857 was…", "rejected by Kansas voters and Congress", ["used for 100 years", "signed by Lincoln", "written in Spanish"], "Most settlers wanted a free state."],
  ["Kansas finally entered the Union as a free state in 1861 under the…", "Wyandotte Constitution", ["Lecompton Constitution", "Articles of Confederation", "Mayflower Compact"], "It was written in 1859."],
  ["Kansas became a state on January 29, 1861, just months before…", "the Civil War began", ["the Revolution began", "the Louisiana Purchase", "the Dust Bowl"], "Southern senators had left Congress."],
  ["On August 21, 1863, William Quantrill's raiders attacked and burned…", "Lawrence", ["Wichita", "Topeka", "Dodge City"], "About 150 men and boys were killed."],
  ["The 1st Kansas Colored Infantry fought at Island Mound, Missouri, in 1862, becoming one of the first Black regiments to…", "fight in battle in the Civil War", ["sail to Africa", "explore Alaska", "build a canal"], "Many soldiers had escaped slavery in Missouri."],
  ["The Homestead Act of 1862 offered settlers in Kansas…", "160 acres of land if they lived on it and farmed it", ["free trips to Europe", "gold from the government", "jobs in factories"], "Settlers had to stay five years."],
  ["After 1867, Texas cattle came north on the Chisholm Trail to the railroad at…", "Abilene", ["Boston", "Seattle", "Atlanta"], "Joseph McCoy built stockyards there."],
  ["The Medicine Lodge Treaty of 1867 between the United States and several Plains nations…", "moved those nations to reservations in Indian Territory", ["made them part of Kansas's Legislature", "gave them all of Kansas", "ended the railroad"], "Many promises in it were later broken."],
  ["Thousands of Black Americans who moved from the South to Kansas in 1879 were called…", "Exodusters", ["Forty-Niners", "Sooners", "Pilgrims"], "Nicodemus was founded by Black settlers in 1877."],
  ["Mennonite immigrants from Russia in the 1870s helped Kansas farming by bringing…", "Turkey Red winter wheat", ["coffee plants", "rice seeds", "cotton gins"], "It grew well on the plains."],
  ["In the 1890s many Kansas farmers joined the Populist Party because they were angry about…", "high railroad rates and low crop prices", ["too much rain", "the price of gold mines", "the Dust Bowl"], "Mary Elizabeth Lease spoke for the farmers."],
  ["Why did the Kansas-Nebraska Act cause so much conflict?", "people on both sides rushed in to win the vote on slavery", ["no one wanted the land", "it gave Kansas to Mexico", "it banned all settlers"], "Popular sovereignty made Kansas a battleground.", true],
  ["How did events in Kansas in the 1850s affect the nation?", "they deepened the divide that led to the Civil War", ["they ended slavery at once", "they made the nation smaller", "they had no effect"], "Bleeding Kansas was national news.", true],
  ["Why did the railroads want settlers to come to Kansas?", "settlers would buy land and ship crops on the trains", ["they wanted fewer customers", "they were closing", "settlers built the trains"], "Railroads sold land and advertised in Europe.", true],
  ["How did the nations moved to Kansas in the 1830s lose land again after 1854?", "treaties and settlers took much of their land when the territory opened", ["they sold it all for gold", "they moved to the ocean", "they never lived there"], "Promises of land forever were broken.", true],
  ["Why might an Exoduster family's letters and a newspaper ad for Kansas land tell different stories?", "people wrote them with different purposes", ["one is always false", "newspapers never lie", "letters are not sources"], "Ask who made a source and why.", true],
  ["Which change shows continuity in Kansas from the 1870s to today?", "farming wheat is still a big part of the economy", ["cattle drives on the Chisholm Trail", "wagon trains to Santa Fe", "fighting over slavery"], "Continuity means something that stays the same.", true],
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
  ["The Monroe Doctrine of 1823 told European countries…", "not to start new colonies in the Americas", ["to invade the United States", "to buy Kansas", "to end slavery"], "It was a warning to Europe."],
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
    id: "ks-g8-kansas-and-the-nation",
    title: "Kansas & the Nation",
    emoji: "🌾",
    blurb: "From the Louisiana Purchase to Bleeding Kansas and the Populists",
    parentNote: "Kansas's part in United States history: the Louisiana Purchase, Lewis and Clark, Pike and Long, the Santa Fe and Oregon Trails, Indian removal to Kansas, the Kansas-Nebraska Act and Bleeding Kansas, statehood as a free state in 1861, Quantrill's raid and the 1st Kansas Colored Infantry, the Homestead Act, cattle towns, the Medicine Lodge Treaty, the Exodusters and Nicodemus, Turkey Red wheat and the Populists.",
    standards: ["1.1; 1.2; 2.1; 4.1; 5.1", "the choices and consequences of the slavery question in Kansas, rights in the territory and the state, how Kansas changed from 1789 to 1898, and Kansas's ties to the nation"],
    items: KANSAS_AND_NATION,
  }),
  bankUnit({
    id: "ks-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["1.1; 2.1; 4.1; 5.1", "the choices of the early republic and their consequences, the growth of rights and representative government, westward expansion, and relations with other nations"],
    items: NEW_NATION,
  }),
];
