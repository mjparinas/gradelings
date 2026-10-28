import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wyoming Grade 8 social studies, United States history and civics: how the 1868 Fort Bridger Treaty, the territory and
// the 1890 constitution shaped Wyoming and Tribal government (SS8.1.3), the contributions of and tensions between groups
// in Wyoming (SS8.2.4), how land and resources steered events such as the route of the Union Pacific (SS8.5.2), and how
// federal policies affected the Eastern Shoshone and Northern Arapaho (SS8.4.4.a); and the new nation from Washington's
// precedents to Indian removal and westward expansion. The rest of the national story is practised with adopted units
// (see ../plan/social.ts).

const WY_AND_WEST: Q[] = [
  ["The Union Pacific Railroad was built across southern Wyoming partly because the route had…", "gentler grades through the mountains and coal for fuel", ["no rivers to cross", "the tallest peaks", "a seaport"], "Physical features steered the route."],
  ["Congress created Wyoming Territory in…", "1868", ["1776", "1912", "1959"], "The railroad had brought new towns and settlers."],
  ["In 1869, Wyoming Territory became the first government in the nation to…", "give women the right to vote and hold office", ["build a railroad", "elect a President", "end all taxes"], "Its nickname became the Equality State."],
  ["In 1870, Esther Hobart Morris of South Pass City became one of the first women in the country to serve as a…", "justice of the peace", ["governor", "senator", "general"], "She settled local cases as a judge."],
  ["Wyoming became the 44th state in…", "1890", ["1803", "1868", "1920"], "Its constitution kept women's right to vote."],
  ["Congress almost refused statehood because Wyoming insisted on…", "keeping women's right to vote", ["having its own army", "printing its own money", "leaving out a governor"], "Lawmakers said they would rather stay out than give it up."],
  ["In 1925, Nellie Tayloe Ross became the first woman in the United States to serve as…", "a state governor", ["a Supreme Court justice", "President", "a mayor"], "She later led the US Mint."],
  ["The Fort Bridger Treaty of 1868 set aside a reservation in the Wind River country for the…", "Eastern Shoshone", ["Cherokee", "Seminole", "Iroquois"], "Chief Washakie chose the Wind River valley."],
  ["In 1878, the federal government placed the Northern Arapaho on the Wind River Reservation, which the Eastern Shoshone…", "had not agreed to share", ["had asked for", "owned with Mexico", "had already left"], "The two nations share it to this day."],
  ["Today, the Eastern Shoshone and Northern Arapaho each govern themselves through…", "their own elected business councils", ["the governor alone", "the US Army", "a king"], "Each nation is sovereign."],
  ["Which part of the US Constitution gives Congress power to regulate commerce \"with the Indian Tribes\"?", "the Commerce Clause", ["the Bill of Rights", "the Preamble", "the 19th Amendment"], "Article I, Section 8."],
  ["Under the Dawes Act of 1887, reservation land was…", "divided into small plots for individual owners", ["returned to every nation", "given to Mexico", "turned into national parks"], "Much land passed out of Tribal hands."],
  ["Boarding schools for Native children in the late 1800s and 1900s tried to…", "replace their languages and cultures", ["teach their own languages", "let families visit daily", "train them as Tribal leaders"], "This is called forced assimilation."],
  ["Native Americans born in the United States became citizens by law in…", "1924", ["1776", "1868", "1965"], "The Indian Citizenship Act."],
  ["In 1872, Congress made part of northwest Wyoming the world's first national park:", "Yellowstone", ["Grand Teton", "Glacier", "Acadia"], "Its geysers and hot springs drew explorers."],
  ["In 1906, Devils Tower became the nation's first…", "national monument", ["state capital", "railroad stop", "army fort"], "President Theodore Roosevelt proclaimed it."],
  ["Thousands of Chinese miners were attacked and driven out of Rock Springs in 1885. This shows…", "tensions between groups of workers", ["a peaceful election", "a new treaty", "a flood"], "Some miners blamed Chinese workers for low wages."],
  ["The Johnson County War of 1892 was a conflict between large cattle ranchers and…", "small ranchers and homesteaders", ["the British army", "the railroad", "Mexico"], "It was a fight over land, cattle and water."],
  ["During World War II, about 10,000 Japanese Americans were forced to live at…", "Heart Mountain, near Cody and Powell", ["Fort Laramie", "Yellowstone", "Cheyenne"], "It was one of ten incarceration camps."],
  ["The Teapot Dome scandal of the 1920s was about a federal official who…", "took bribes to lease government oil land", ["stole a train", "sold Yellowstone", "rigged an election"], "Teapot Dome is an oil field north of Casper."],
  ["Today, Wyoming produces more coal than any other state, most of it from the…", "Powder River Basin", ["Wind River Range", "Great Divide", "Snake River"], "Trains carry it to power plants."],
  ["Why is Wyoming called the Equality State?", "it was first to give women the vote", ["it has equal mountains and plains", "every county is the same size", "it has equal rain all year"], "The nickname comes from 1869.", true],
  ["Why did the location of the Wind River Reservation matter to the Eastern Shoshone?", "Washakie chose land with good rivers, hunting and shelter", ["it was the only flat land", "it had a seaport", "it was near a big city"], "Physical features shaped the choice.", true],
  ["The Fort Bridger Treaty is a primary source because it is…", "the actual agreement signed in 1868", ["a textbook chapter", "a movie", "a summary written today"], "Treaties are original documents.", true],
  ["How did the railroad affect where Wyoming's towns are?", "most early towns grew along the line in the south", ["towns avoided the line", "every town is on a river", "it had no effect"], "Cheyenne, Laramie, Rawlins and Rock Springs.", true],
  ["Wyoming has only one member in the US House of Representatives because…", "it has the smallest population of any state", ["it is the largest state", "it joined last", "it chose to"], "House seats are divided by population.", true],
  ["How is the Wind River Reservation's government like a state's?", "it makes and enforces its own laws for its members", ["it has no laws", "the President runs it", "it is part of Cheyenne"], "Tribal nations are sovereign.", true],
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
  ["The Monroe Doctrine of 1823 told European countries…", "not to start new colonies in the Americas", ["to invade the United States", "to buy Florida", "to end slavery"], "It was a warning to Europe."],
  ["The Indian Removal Act of 1830 forced many Native nations to…", "leave their homelands for land west of the Mississippi", ["move to Europe", "join the army", "move to Mexico"], "President Andrew Jackson signed it."],
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
    id: "wy-g8-wyoming-and-the-west",
    title: "Wyoming & the West",
    emoji: "🦬",
    blurb: "Territory, treaties and the Equality State",
    parentNote: "Wyoming's part in United States history: the Union Pacific route, the territory and women's vote in 1869, statehood in 1890, Esther Hobart Morris and Nellie Tayloe Ross, the Fort Bridger Treaty and the Wind River Reservation of the Eastern Shoshone and Northern Arapaho, federal policies such as allotment and boarding schools, Yellowstone and Devils Tower, Rock Springs, the Johnson County War, Heart Mountain, Teapot Dome and coal.",
    standards: ["SS8.1.3; SS8.2.4; SS8.5.2; SS8.4.4.a", "how treaties and constitutions shaped Wyoming and Tribal government, tensions between groups in Wyoming, how physical features steered events, and how federal policies affected the Tribes of Wyoming"],
    items: WY_AND_WEST,
  }),
  bankUnit({
    id: "wy-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["SS8.1.3; SS8.4.1; SS8.4.4", "the historical development of the Constitution, how events such as Manifest Destiny and Indian removal shaped what came next, and interactions between groups and institutions"],
    items: NEW_NATION,
  }),
];
