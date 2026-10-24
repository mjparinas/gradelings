import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Michigan Grade 8 social studies, Integrated United States History from the Constitution to Reconstruction: Michigan's
// part in the nation's story, from the Northwest Ordinance, the War of 1812 and statehood to the fight over slavery, the
// founding of the Republican Party in Jackson and Michigan in the Civil War (8 – U4.3.1, U4.3.2, U5.1.1, U5.1.2, U5.2.4,
// U5.2.5), and the new nation from Washington's Farewell Address to westward expansion (8 – U4.1.1 to U4.2.4). The rest
// of the national story is practised with adopted units (see ../plan/social.ts).

const MICHIGAN_AND_NATION: Q[] = [
  ["The Northwest Ordinance of 1787 set up the territory that later became Michigan and…", "banned slavery there", ["made slavery legal everywhere", "gave the land to Spain", "created Canada"], "It applied north of the Ohio River."],
  ["Even after the Revolution, which country kept soldiers in Detroit until 1796?", "Great Britain", ["France", "Spain", "Russia"], "The Jay Treaty got them to leave."],
  ["At the start of the War of 1812, the American general William Hull…", "surrendered Detroit to the British", ["captured London", "won at Yorktown", "founded Lansing"], "It was an early defeat."],
  ["'Remember the Raisin!' became a rallying cry after a battle in 1813 near today's…", "Monroe", ["Marquette", "Holland", "Traverse City"], "The River Raisin flows into Lake Erie there."],
  ["Oliver Hazard Perry's victory in the Battle of Lake Erie in 1813 helped the Americans…", "take back Detroit", ["lose Michigan", "buy Louisiana", "end slavery"], "\"We have met the enemy and they are ours.\""],
  ["The Erie Canal, opened in 1825, helped Michigan grow because…", "settlers and goods could travel west by water", ["it carried oil", "it was a railroad", "it closed the Great Lakes"], "It linked the Hudson River and Lake Erie."],
  ["The Toledo War of 1835–1836 was a border quarrel between Michigan and…", "Ohio", ["Canada", "Indiana", "Wisconsin"], "Michigan gave up Toledo and got the western Upper Peninsula."],
  ["Michigan joined the Union in 1837 as a…", "free state", ["slave state", "territory of Britain", "colony of France"], "The Northwest Ordinance banned slavery there."],
  ["Michigan's first state superintendent of public instruction, John D. Pierce, helped build…", "a system of free public schools", ["the first car factory", "the Soo Locks", "the Mackinac Bridge"], "Michigan was among the first states with such an office."],
  ["In 1847, people in Marshall protected the Crosswhite family, who had escaped slavery, from…", "slave catchers from Kentucky", ["British soldiers", "lumber barons", "French traders"], "The case became famous in the debate over slavery."],
  ["The Fugitive Slave Act of 1850 angered many Michiganders because it…", "forced people in free states to help catch freedom seekers", ["freed everyone in the South", "banned the Underground Railroad's trains", "made Michigan a slave state"], "It reached into free states."],
  ["The Republican Party was founded in 1854 at a meeting 'under the oaks' in…", "Jackson, Michigan", ["Detroit, Michigan", "Boston", "Richmond"], "Its members opposed the spread of slavery."],
  ["The early Republican Party mainly wanted to…", "stop slavery from spreading into new territories", ["bring back British rule", "end public schools", "close the Erie Canal"], "Abraham Lincoln was its first President."],
  ["Sojourner Truth, who escaped slavery and spoke for abolition and women's rights, made her home in…", "Battle Creek", ["Mackinac Island", "Alpena", "Flint"], "She moved to Michigan in the 1850s."],
  ["About how many Michiganders served in the Union army and navy during the Civil War?", "about 90,000", ["about 900", "about 9 million", "none"], "Michigan had under a million people then."],
  ["The 24th Michigan Infantry fought in the Iron Brigade on the first day of the Battle of…", "Gettysburg", ["Yorktown", "Saratoga", "Lexington"], "It lost most of its soldiers there."],
  ["The 1st Michigan Colored Infantry, later the 102nd United States Colored Troops, was made up of…", "Black soldiers who enlisted in Michigan", ["British soldiers", "Confederate soldiers", "French sailors"], "It was organized in Detroit in 1863."],
  ["In 1865, the 4th Michigan Cavalry captured…", "Confederate President Jefferson Davis", ["General Robert E. Lee", "King George III", "Andrew Jackson"], "It happened in Georgia, after the war ended."],
  ["Sarah Emma Edmonds served in the 2nd Michigan Infantry disguised as a man named…", "Franklin Thompson", ["George Washington", "John Hancock", "Henry Ford"], "She also worked as a nurse.", true],
  ["In 1846, Michigan became the first English-speaking government in the world to…", "abolish the death penalty for murder", ["allow women to vote", "build a car", "end all taxes"], "It took effect in 1847.", true],
  ["How was life for free Black people in Michigan before the Civil War different from life under slavery?", "they could own property and keep families together, but faced unfair laws", ["they had every right white people had", "they were enslaved too", "they could not live anywhere in Michigan"], "Freedom did not mean equal rights.", true],
  ["Michigan's personal liberty law of 1855 tried to…", "protect freedom seekers from the Fugitive Slave Act", ["help slave catchers", "end free schools", "make Michigan part of Canada"], "Some free states passed such laws.", true],
  ["The Kalamazoo case of 1874 decided that towns could use taxes to pay for…", "public high schools", ["railroads", "churches", "army forts"], "It shaped public education across the nation.", true],
  ["How did the Civil War change life at home in Michigan?", "women ran farms and businesses while men were away", ["nothing changed", "everyone moved to Canada", "all factories closed forever"], "Families took on new work.", true],
  ["After the war, Michigan voters in 1870 approved…", "voting rights for Black men in the state constitution", ["slavery in Michigan", "a new king", "leaving the Union"], "The Fifteenth Amendment was ratified the same year.", true],
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
  ["The Monroe Doctrine of 1823 told European countries…", "not to start new colonies in the Americas", ["to invade the United States", "to buy Michigan", "to end slavery"], "It was a warning to Europe."],
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
  ["Why did the Northwest Territory fill with settlers after the War of 1812?", "British support for resistance to settlement ended and travel got easier", ["gold was found in Detroit", "the land was free of trees", "slavery was allowed there"], "Peace and the Erie Canal brought settlers.", true],
  ["Comparing the United States in 1800 with 1850, which change is true?", "it stretched to the Pacific Ocean", ["it had fewer states", "it lost the Great Lakes", "it had no railroads by 1850"], "Look at a map of each year.", true],
  ["Sequoyah created a written form of the…", "Cherokee language", ["English language", "French language", "Spanish language"], "Many Cherokee people learned to read it quickly.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "mi-g8-michigan-and-the-nation",
    title: "Michigan & the Nation",
    emoji: "🎖️",
    blurb: "From the Northwest Ordinance to the Civil War",
    parentNote: "Michigan's part in United States history to Reconstruction: the Northwest Ordinance's ban on slavery, the War of 1812 and the River Raisin, the Erie Canal, statehood as a free state, free public schools, the Crosswhite case, the founding of the Republican Party in Jackson, Sojourner Truth, and Michigan soldiers in the Civil War, including the 102nd United States Colored Troops.",
    standards: ["8-U5.1.2; 8-U5.1.1; 8-U4.3.1; 8-U4.3.2; 8-U5.2.4; 8-U5.2.5", "the Northwest Ordinance and slavery, free Black people's lives, public education, the abolitionist movement, and Michigan in the Civil War"],
    items: MICHIGAN_AND_NATION,
  }),
  bankUnit({
    id: "mi-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["8-U4.1.1; 8-U4.1.2; 8-U4.1.3; 8-U4.1.4; 8-U4.2.3; 8-U4.2.4", "Washington's Farewell, America's place in the world, early political parties, judicial review, and westward expansion and its consequences"],
    items: NEW_NATION,
  }),
];
