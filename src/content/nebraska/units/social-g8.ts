import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nebraska Grade 8 social studies, United States History from the Constitution through the Gilded Age: Nebraska's part
// in the nation's story, from the Louisiana Purchase, the explorers and the trails to the Kansas–Nebraska Act,
// statehood after the Civil War, homesteading and the railroads, the Plains wars and Standing Bear's case, and the
// Populists who met in Omaha in 1892, practising the impact of people, events and ideas (SS 8.4.1), the perspectives of
// marginalized groups (SS 8.4.3) and how land and water shaped decisions (SS 8.3.2). The new nation from Washington's
// Farewell Address to westward expansion is a second unit; the rest of the national story is practised with adopted
// units (see ../plan/social.ts).

const NEBRASKA_AND_NATION: Q[] = [
  ["Nebraska became United States land in 1803 through the…", "Louisiana Purchase", ["Mexican Cession", "Treaty of Paris", "Gadsden Purchase"], "The United States bought the land from France."],
  ["In 1804, Lewis and Clark held their first council with Otoe and Missouria leaders at a place on the Missouri River they named…", "Council Bluff", ["Independence Rock", "Plymouth Rock", "Pikes Peak"], "Fort Atkinson was later built nearby."],
  ["After his 1820 expedition across the plains, including Nebraska, Stephen Long called the land the…", "Great American Desert", ["Garden of the World", "Land of Lakes", "Gold Coast"], "He thought the dry grassland could not be farmed."],
  ["Between the 1840s and 1860s, hundreds of thousands of emigrants crossed Nebraska on trails that followed the…", "Platte River", ["Hudson River", "Rio Grande", "Ohio River"], "The river valley gave water, grass and a gentle path."],
  ["In 1846 and 1847, Mormon emigrants driven from their homes farther east spent the winter at…", "Winter Quarters, in what is now Omaha", ["Fort Robinson", "Chimney Rock", "Ogallala"], "They went on to the Great Salt Lake valley."],
  ["The Kansas–Nebraska Act of 1854, written by Senator Stephen Douglas, let settlers…", "vote on whether to allow slavery", ["elect the President", "buy land from Britain", "form their own country"], "It ended the Missouri Compromise line."],
  ["The Kansas–Nebraska Act angered many Northerners and led to the founding of the…", "Republican Party", ["Whig Party", "Federalist Party", "Populist Party"], "The new party opposed spreading slavery to the territories."],
  ["In 1861, Nebraska's territorial legislature passed a law, over the governor's veto, that…", "banned slavery in Nebraska Territory", ["made slavery legal everywhere", "moved the capital to Kearney", "ended the trails"], "A few enslaved people had been held in the territory."],
  ["During the Civil War, Nebraska Territory sent about 3,000 soldiers to fight for the…", "Union", ["Confederacy", "British army", "Mexican army"], "The 1st Nebraska Infantry fought at Shiloh."],
  ["The Homestead Act of 1862 offered settlers…", "160 acres of land if they lived on it and farmed it for five years", ["free trips to Europe", "gold from the government", "jobs in factories"], "Daniel Freeman claimed land near Beatrice on January 1, 1863."],
  ["Construction of the first transcontinental railroad's eastern part began at Omaha in 1865 and met the western part in…", "1869", ["1776", "1812", "1901"], "The two lines joined in the mountains of the West."],
  ["To pay for building, Congress gave the railroads…", "land grants along the tracks that they sold to settlers", ["all of Nebraska's cities", "gold from the Treasury every day", "the trails"], "Railroads advertised the land in the East and in Europe."],
  ["Nebraska became a state in 1867 after Congress overrode President Andrew Johnson's veto. Congress required Nebraska to…", "not deny the vote to any man because of race", ["give up its rivers", "become a slave state", "move its capital east"], "This was called the fundamental condition."],
  ["Crazy Horse, a Lakota leader who fought to protect his people's lands, died in 1877 at…", "Fort Robinson in northwestern Nebraska", ["Fort Atkinson", "Winter Quarters", "Fort Kearny"], "Fort Robinson is a state park today."],
  ["In 1877, the U.S. government forced the Ponca from their homeland at the mouth of the Niobrara River to…", "Indian Territory, far to the south", ["Washington, D.C.", "the Pacific coast", "Europe"], "Many Ponca died on the way and soon after."],
  ["In Standing Bear v. Crook in 1879, Judge Elmer Dundy ruled in Omaha that…", "an Indian is a person under the law and can ask a court for freedom", ["the Ponca must stay in Indian Territory", "the army could ignore the courts", "Standing Bear was not a person"], "It was a landmark civil rights case."],
  ["Standing Bear's lawyers asked for a writ of habeas corpus, which asks a court to decide…", "whether a person is being held lawfully", ["who owns a railroad", "the price of land", "how to elect a governor"], "Habeas corpus protects people from being held unlawfully."],
  ["The Dawes Act of 1887 divided Tribal lands into…", "separate farms for families, opening the rest to settlers", ["new states", "railroad towns", "national parks"], "Tribes lost much of their remaining land."],
  ["In the 1870s and 1880s, cattle herds from the south came north to the railroad at the cowboy town of…", "Ogallala", ["Beatrice", "Lincoln", "Fremont"], "Cattle were shipped east by train."],
  ["In 1874, a huge swarm of… destroyed crops across Nebraska.", "Rocky Mountain locusts, or grasshoppers", ["bees", "butterflies", "mosquitoes"], "Some homesteaders gave up and moved back east."],
  ["In 1892, the People's, or Populist, Party held its national convention in Omaha and wrote the Omaha Platform, which called for…", "government control of railroads and a graduated income tax", ["ending all elections", "a king for the United States", "closing every bank"], "Farmers were angry about railroad rates and low crop prices."],
  ["William Jennings Bryan of Lincoln gave the Cross of Gold speech in 1896, arguing for…", "free silver coinage to help farmers in debt", ["ending farming", "a gold-only currency", "closing the frontier"], "He ran for President three times."],
  ["Why did the Kansas–Nebraska Act cause so much conflict?", "it reopened the question of slavery in lands closed to it since 1820", ["no one wanted the land", "it gave Nebraska to Mexico", "it banned all settlers"], "Popular sovereignty made the territories a battleground.", true],
  ["Why did the railroads want settlers to come to Nebraska?", "settlers would buy railroad land and ship crops on the trains", ["they wanted fewer customers", "they were closing", "settlers built the trains"], "Railroads sold land and advertised in Europe.", true],
  ["Which pair shows both a gain and a loss from settlement in Nebraska?", "new farms and towns, and Native nations losing their lands", ["more rain and fewer people", "new oceans and fewer roads", "no change at all"], "Weigh the effects on different groups.", true],
  ["Why might a railroad's land poster and a homesteader's diary tell different stories about Nebraska?", "they were made by people with different purposes", ["one is always false", "posters never exaggerate", "diaries are not sources"], "Ask who made a source and why.", true],
  ["How did the Platte River valley shape where people built roads and towns across Nebraska?", "trails, the railroad and later highways all followed its flat, watered path", ["no one went near it", "towns were built only on hills", "it blocked all travel"], "Land and water features shape human decisions.", true],
  ["Which change shows continuity in Nebraska from the 1880s to today?", "farming and ranching are still a big part of the economy", ["wagon trains on the Oregon Trail", "the Great American Desert idea", "the grasshopper swarm of 1874"], "Continuity means something that stays the same.", true],
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
  ["The Monroe Doctrine of 1823 told European countries…", "not to start new colonies in the Americas", ["to invade the United States", "to buy Nebraska", "to end slavery"], "It was a warning to Europe."],
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
    id: "neb-g8-nebraska-and-the-nation",
    title: "Nebraska & the Nation",
    emoji: "🌾",
    blurb: "From the Louisiana Purchase to statehood, Standing Bear and the Populists",
    parentNote: "Nebraska's part in United States history: the Louisiana Purchase, Lewis and Clark at Council Bluff, Long's Great American Desert, the trails along the Platte and Winter Quarters, the Kansas–Nebraska Act, the end of slavery in the territory, Nebraska soldiers in the Civil War, the Homestead Act and the railroad from Omaha, statehood in 1867, Fort Robinson, the Ponca removal and Standing Bear v. Crook, the Dawes Act, cattle towns, and the Populists' Omaha Platform and William Jennings Bryan.",
    standards: ["SS 8.4.1.a; SS 8.4.2.a; SS 8.4.3.b; SS 8.3.2.b; SS 8.1.1.d", "the impact of people, events and ideas on the United States, multiple perspectives on the past, how marginalized groups understood events, how land and water shaped decisions, and how government decisions affected people"],
    items: NEBRASKA_AND_NATION,
  }),
  bankUnit({
    id: "neb-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["SS 8.1.1.c; SS 8.1.1.f; SS 8.4.1.a; SS 8.3.2.b", "the founding documents and the first political parties, the impact of people, events and ideas in the early republic, and how land and water shaped westward expansion"],
    items: NEW_NATION,
  }),
];
