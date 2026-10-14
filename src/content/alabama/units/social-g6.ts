import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_5 } from "../../california/units/social-g5";
import { SOCIAL_8 as CALIFORNIA_8 } from "../../california/units/social-g8";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Alabama's own Grade 6 social studies units (`al-` ids), for Making a New Nation: Indigenous societies of North
// America before European contact (6.1), choosing leaders under the Constitution (6.14), federalism and the branches
// at the national, Alabama and local levels (6.15, 6.16), and copies of California's explorers and new nation units
// without their California questions, with Alabama items added (6.2, 6.3, 6.19, 6.20). Indigenous nations are named
// one by one, never as one people; living nations are in the present tense and nothing sacred or ceremonial is named.

const BEFORE: Q[] = [
  ["People lived in North America for…", "thousands of years before Europeans arrived", ["only a few years before 1492", "no time at all before 1492", "about 100 years before 1492"], "Many nations, many cultures."],
  ["The Mississippian culture is known for building…", "large earthen mounds", ["stone castles", "iron bridges", "brick skyscrapers"], "Flat-topped mounds."],
  ["A large Mississippian mound center in Alabama is…", "Moundville", ["Mesa Verde", "Jamestown", "Plymouth"], "Near the Black Warrior River."],
  ["The largest Mississippian city, near present-day St. Louis, was…", "Cahokia", ["Tenochtitlan", "Cusco", "Moundville"], "It may have had more than 10,000 people."],
  ["Mississippian towns grew mainly because people farmed…", "corn", ["wheat", "rice", "potatoes"], "Maize was a key crop."],
  ["Corn, beans and squash, often planted together, are called the…", "Three Sisters", ["Three Kings", "Great Plains", "Silk Road"], "They help each other grow."],
  ["Mississippian societies were often led by…", "chiefs who ruled towns and nearby villages", ["elected presidents", "European kings", "no leaders at all"], "Chiefdoms."],
  ["Ancestral Puebloans in the Southwest built homes from…", "stone and adobe, some in cliffs", ["ice blocks", "bamboo", "steel"], "Mesa Verde is famous."],
  ["Mesa Verde is known for its…", "cliff dwellings", ["giant mounds", "longhouses", "pyramids"], "Homes built into canyon walls."],
  ["Farmers in the dry Southwest used canals and dams to…", "bring water to their crops", ["stop all rain", "make ice", "power factories"], "Irrigation."],
  ["The Haudenosaunee Confederacy united several nations under the…", "Great Law of Peace", ["Magna Carta", "Articles of Confederation", "Mayflower Compact"], "An agreement to settle disputes peacefully."],
  ["The Haudenosaunee lived in long wooden homes called…", "longhouses", ["igloos", "pueblos", "castles"], "Many families shared one."],
  ["Which nation was one of the original five nations of the Haudenosaunee Confederacy?", "the Mohawk", ["the Aztec", "the Maya", "the Inca"], "Mohawk, Oneida, Onondaga, Cayuga and Seneca."],
  ["Many nations of the Great Plains depended on hunting…", "bison", ["whales", "camels", "kangaroos"], "Food, clothing and tools."],
  ["Which nations have homelands in the Southeast, including Alabama?", "the Muscogee (Creek), Cherokee, Choctaw and Chickasaw", ["the Aztec and Maya", "the Inca", "the Vikings"], "Four large nations of the region."],
  ["Native nations in North America spoke…", "hundreds of different languages", ["one shared language", "only Spanish", "no languages"], "Very diverse."],
  ["Trade networks before contact moved goods such as…", "shells, copper and stone over long distances", ["cars and trucks", "paper money", "steel tools from Europe"], "Gulf shells reached far inland."],
  ["How the land and climate differed from region to region affected…", "the foods, homes and clothing of each nation", ["nothing", "only the weather", "only the animals"], "People used what was nearby."],
  ["Archaeologists learn about Moundville by studying…", "artifacts and the mounds themselves", ["text messages", "photographs taken then", "newspapers from then"], "No written records survive."],
  ["The Muscogee (Creek) Nation, the Cherokee Nation and the Choctaw Nation today are…", "living nations with their own governments", ["gone from history", "parts of Spain", "only legends"], "Present tense!", true],
  ["Why were many Mississippian centers built near rivers?", "Rivers gave water, rich soil and travel routes", ["Rivers kept people away", "Rivers were dry", "Rivers had no fish"], "Floodplains are good for farming.", true],
  ["The Haudenosaunee Confederacy, which still exists today, is sometimes compared to the US government because it…", "joined separate nations under a shared council", ["had a king", "had no rules", "was founded by Europeans"], "A union of nations.", true],
  ["Before horses arrived from Europe, people on the Great Plains hunted bison…", "on foot", ["from cars", "with rifles", "from airplanes"], "Horses came later with the Spanish.", true],
  ["Cahokia and Moundville were both…", "Mississippian centers with large mounds", ["Spanish missions", "English colonies", "French forts"], "Built centuries before Europeans came.", true],
];

const ELECTIONS: Q[] = [
  ["The president is elected by the…", "Electoral College", ["Supreme Court", "Senate alone", "governors"], "Electors from every state."],
  ["How many electoral votes does a candidate need to win the presidency?", "270", ["100", "538", "50"], "A majority of 538."],
  ["How many electoral votes are there in all?", "538", ["270", "100", "435"], "435 + 100 + 3."],
  ["A state's number of electoral votes equals its number of…", "senators plus representatives", ["counties", "cities", "governors"], "Two senators plus its House seats."],
  ["Alabama has how many electoral votes?", "9", ["2", "7", "20"], "2 senators + 7 representatives."],
  ["How many senators does each state have?", "2", ["1", "7", "100"], "Equal for every state."],
  ["How many members does Alabama send to the US House of Representatives?", "7", ["2", "9", "35"], "Based on population."],
  ["The number of House seats a state gets is based on…", "its population, counted in the census", ["its size in square miles", "its age", "its number of rivers"], "Every 10 years."],
  ["A president serves a term of…", "4 years", ["2 years", "6 years", "for life"], "Elections every four years."],
  ["The 22nd Amendment limits a president to…", "two elected terms", ["one term", "three terms", "no limit"], "Up to 8 years."],
  ["A US senator serves a term of…", "6 years", ["2 years", "4 years", "for life"], "Longer terms in the Senate."],
  ["A member of the House serves a term of…", "2 years", ["4 years", "6 years", "10 years"], "Elections every even year."],
  ["Before the 17th Amendment (1913), US senators were chosen by…", "state legislatures", ["voters", "the president", "the Supreme Court"], "Now voters choose them directly."],
  ["The 19th Amendment (1920) gave the right to vote to…", "women", ["18-year-olds", "people without land", "children"], "Women's suffrage."],
  ["The 26th Amendment (1971) lowered the voting age to…", "18", ["16", "21", "25"], "Old enough to be drafted, old enough to vote."],
  ["The 15th Amendment (1870) said the right to vote cannot be denied because of…", "race", ["age", "income", "height"], "Passed after the Civil War."],
  ["The Voting Rights Act of 1965 followed marches in…", "Selma, Alabama", ["Boston", "Denver", "Miami"], "Selma to Montgomery."],
  ["The 24th Amendment banned…", "poll taxes in federal elections", ["voting by mail", "political parties", "elections"], "Paying to vote was unfair."],
  ["To be president, a person must be at least…", "35 years old", ["18 years old", "25 years old", "50 years old"], "Set by the Constitution."],
  ["A primary election is when…", "voters choose a party's candidate", ["the president is sworn in", "the Supreme Court votes", "states write constitutions"], "Before the general election."],
  ["If the president dies or resigns, the next president is the…", "vice president", ["Speaker of the House", "chief justice", "secretary of state"], "First in line.", true],
  ["Supreme Court justices are chosen by…", "the president, with the Senate's approval", ["voters", "governors", "the House alone"], "Nominated and confirmed.", true],
  ["Why do larger states have more electoral votes?", "They have more representatives in the House", ["They are older", "They have more senators", "They asked for more"], "Population matters.", true],
  ["The Constitution first let states decide who could vote, which meant that in 1789 most voters were…", "white men who owned property", ["all adults", "women", "everyone over 18"], "Amendments widened voting over time.", true],
  ["The 12th Amendment changed elections so electors cast…", "separate votes for president and vice president", ["no votes", "votes only for the Senate", "votes by lottery"], "After the tie of 1800.", true],
];

const FEDERALISM: Q[] = [
  ["Federalism means power is divided between…", "the national government and the states", ["the army and the navy", "two political parties", "the president and the vice president"], "Shared power."],
  ["Which power belongs to the national government?", "printing money", ["issuing driver's licenses", "running public schools", "setting up city councils"], "One money for the whole country."],
  ["Which power belongs only to the national government, through Congress?", "declaring war", ["running elections for mayor", "making marriage laws", "creating counties"], "Only Congress can do it."],
  ["Which power is reserved to the states?", "running public schools", ["making treaties", "coining money", "declaring war"], "States set up schools."],
  ["Which power do the national and state governments share?", "collecting taxes", ["declaring war", "printing money", "making treaties"], "Concurrent powers."],
  ["The 10th Amendment says powers not given to the national government belong to…", "the states or the people", ["the president", "other countries", "the Supreme Court"], "Reserved powers."],
  ["The Supremacy Clause says that when state and national laws conflict…", "national law wins", ["state law wins", "the governor decides", "both are thrown out"], "The Constitution is supreme."],
  ["States create local governments such as…", "counties and cities", ["countries", "provinces of Mexico", "embassies"], "Closer to home."],
  ["How many counties does Alabama have?", "67", ["50", "100", "12"], "Each has a county seat."],
  ["Many Alabama counties are governed by a…", "county commission", ["Supreme Court", "Senate", "Cabinet"], "Elected commissioners."],
  ["A city is often led by a mayor and a…", "city council", ["Congress", "Cabinet", "chief justice"], "It passes city laws called ordinances."],
  ["Alabama's Legislature has two houses: the Senate and the…", "House of Representatives", ["Assembly of Nations", "Council of Elders", "Cabinet"], "Bicameral, like Congress."],
  ["How many members serve in the Alabama Senate?", "35", ["2", "100", "435"], "Smaller than the House."],
  ["How many members serve in the Alabama House of Representatives?", "105", ["35", "7", "435"], "More than 100."],
  ["The head of Alabama's executive branch is the…", "governor", ["lieutenant governor", "chief justice", "speaker"], "Elected statewide."],
  ["The Alabama governor serves a term of…", "4 years", ["2 years", "6 years", "for life"], "Like the president."],
  ["The highest court in Alabama is the…", "Alabama Supreme Court", ["US Supreme Court", "county court", "city council"], "Its justices are elected by Alabama voters."],
  ["Alabama's current constitution dates from…", "1901", ["1776", "1819", "1965"], "It was recompiled in 2022."],
  ["Which branch makes laws at the national level?", "Congress", ["the president", "the Supreme Court", "the Cabinet"], "Legislative branch."],
  ["Which branch carries out laws at the state level?", "the governor and state agencies", ["the Alabama Legislature", "the Alabama Supreme Court", "county juries"], "Executive branch."],
  ["Which branch decides what laws mean?", "the courts", ["the legislature", "the governor", "the mayor"], "Judicial branch."],
  ["A sheriff in Alabama is elected by the voters of a…", "county", ["country", "state senate", "school"], "Local law enforcement.", true],
  ["Who presides over the Alabama Senate?", "the lieutenant governor", ["the chief justice", "the president", "the mayor of Montgomery"], "Like the vice president in the US Senate.", true],
  ["Why might the framers have divided power between the nation and the states?", "to keep any one government from becoming too powerful", ["to make government slower for fun", "because kings asked them to", "to end elections"], "Limited government.", true],
  ["A city council passing a law about trash pickup is an example of…", "local government", ["national government", "the judicial branch", "a treaty"], "Close to home.", true],
  ["Issuing driver's licenses is a power of…", "the states", ["the national government", "other countries", "the Supreme Court"], "Each state issues its own.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "al-g6-before-contact",
    title: "North America Before Contact",
    emoji: "🏺",
    blurb: "Moundville, Cahokia and other nations",
    parentNote:
      "Major Indigenous societies of North America before European contact: the Mississippian mound builders of Moundville and Cahokia, Ancestral Puebloans, the Haudenosaunee Confederacy, nations of the Great Plains, and the nations of the Southeast, many of which are living nations today.",
    standards: ["6.1", "major Indigenous societies of North America before European contact"],
    items: BEFORE,
  }),
  copyOf(
    from(CALIFORNIA_5, "ca-g5-explorers"),
    {
      id: "al-g6-explorers",
      title: "Explorers & Colonizers",
      emoji: "⛵",
      blurb: "Why Europeans came, and what followed",
      parentNote:
        "Why Spain, France and England explored and colonized North America (mercantilism, religion, wealth and new opportunities), the expeditions that reached Alabama, and the effects on Indigenous peoples.",
      standards: ["6.2; 6.3", "reasons for British, French and Spanish colonization, and its effects on Indigenous peoples"],
    },
    [
      ["Mercantilism was the idea that colonies existed to…", "make the home country rich", ["govern themselves", "trade only with each other", "stay independent"], "Raw materials flowed to Europe."],
      ["Spain's main goals in the Americas were often called…", "gold, God and glory", ["furs, fish and forts", "tea, taxes and trade", "farms, families and freedom"], "Wealth, religion and fame."],
      ["France's colonies in North America were built mostly around the…", "fur trade", ["cotton trade", "tea trade", "gold rush"], "Beaver pelts were valuable."],
      ["Hernando de Soto's expedition crossed present-day Alabama in…", "1540", ["1492", "1776", "1819"], "The Spanish searched for gold."],
      ["The French founded Mobile in 1702 as a capital of…", "French Louisiana", ["New Spain", "New England", "New Netherland"], "On the Gulf Coast."],
      ["The deadliest effect of European contact on Indigenous peoples was…", "diseases such as smallpox", ["new crops", "new languages", "new music"], "They had no immunity."],
      ["Many poor Europeans paid for passage to the colonies by becoming…", "indentured servants", ["governors", "ship captains", "bankers"], "They worked for several years to pay the debt."],
    ],
  ),
  bankUnit({
    id: "al-g6-elections",
    title: "Choosing Our Leaders",
    emoji: "🗳️",
    blurb: "The Electoral College, terms and amendments",
    parentNote:
      "How the Constitution and its amendments set up the selection of leaders: the Electoral College, terms of office, Alabama's senators, representatives and electoral votes, and the amendments that widened the right to vote.",
    standards: ["6.14", "how political leaders are selected under the Constitution and its amendments"],
    items: ELECTIONS,
  }),
  bankUnit({
    id: "al-g6-federalism",
    title: "Federalism in Alabama",
    emoji: "⚖️",
    blurb: "National, state and local government",
    parentNote:
      "How federalism divides power between the national government and the states, and between Alabama and its counties and cities, and how the legislative, executive and judicial branches work at each level.",
    standards: ["6.15; 6.16", "federalism, and the branches of government at the national, state and local levels"],
    items: FEDERALISM,
  }),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-new-nation"),
    {
      id: "al-g6-new-nation",
      title: "A New Nation",
      emoji: "🦅",
      blurb: "Washington's presidency and the first parties",
      parentNote:
        "George Washington's presidency (the first Cabinet, the new capital in the District of Columbia, religious freedom), and the rise of the Federalist and Democratic-Republican parties in the 1790s.",
      standards: ["6.19; 6.20", "George Washington's presidency, and the first political parties"],
    },
    [
      ["Washington's first Cabinet included Thomas Jefferson as…", "secretary of state", ["chief justice", "vice president", "speaker of the House"], "In charge of foreign affairs."],
      ["Alexander Hamilton was Washington's…", "secretary of the treasury", ["secretary of state", "vice president", "general of the army"], "He managed the nation's money."],
      ["The national capital was placed in the District of Columbia, along the…", "Potomac River", ["Mississippi River", "Hudson River", "Alabama River"], "Between Maryland and Virginia."],
      ["In his letter to the Touro Synagogue (1790), Washington promised…", "religious freedom for all", ["a national church", "lower taxes", "a new army"], "The government gives bigotry no sanction."],
      ["The Federalists, led by Hamilton, wanted…", "a strong national government and a national bank", ["no national government", "a king", "only state banks"], "Stronger central power."],
      ["The Democratic-Republicans, led by Jefferson and Madison, favored…", "states' rights and farmers", ["a national bank", "a king", "rule by bankers"], "Limited national power."],
    ],
  ),
];
