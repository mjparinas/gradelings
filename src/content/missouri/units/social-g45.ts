import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { UNITS as NEW_YORK_SOCIAL_8 } from "../../new-york/units/social-g8";
import { SOCIAL_5 as TEXAS_SOCIAL_5 } from "../../texas/units/social-g5";
import { bankUnit, type Q } from "../own";
import { from, localCopy } from "./kit";

// Missouri Grades 4 and 5 social studies: United States history before 1800 (Grade 4) and after it (Grade 5). Missouri
// copies of other states' units leave out questions about their states and about Tribes and treaties; the first
// Americans unit is Missouri's own. Native content is light and in the present tense, with nothing sacred or ceremonial.

const FIRST_AMERICANS: Q[] = [
  ["Many scientists think the first people in the Americas came from Asia…", "more than 15,000 years ago", ["about 500 years ago", "about 100 years ago", "in 1776"], "They may have crossed a land bridge or traveled by boat."],
  ["A land bridge once joined Asia and North America where the… is today.", "Bering Strait", ["Panama Canal", "Gulf of Mexico", "Great Lakes"], "Sea levels were lower during the Ice Age."],
  ["Early people in the Americas moved from place to place following…", "the animals they hunted", ["roads", "trains", "maps on phones"], "Hunters followed herds."],
  ["When people learned to farm corn, beans and squash, many…", "settled in villages", ["stopped eating", "moved to Europe", "lived only on boats"], "Farming let people stay in one place."],
  ["People in the Eastern Woodlands built homes from…", "trees and bark", ["ice blocks", "steel", "glass"], "They used what was around them."],
  ["On the Great Plains, many nations depended on…", "bison", ["whales", "camels", "llamas"], "Bison gave food, hides and tools."],
  ["People of the Pacific Northwest coast fished for…", "salmon", ["sharks only", "penguins", "seaweed only"], "Rivers were full of salmon."],
  ["In the Southwest, Pueblo peoples built homes of…", "adobe and stone", ["logs and bark", "ice", "paper"], "Adobe is sun-dried clay."],
  ["Mississippian peoples built large earthen mounds in the Mississippi Valley, including in what is now…", "Missouri", ["Hawaii", "Alaska", "Maine"], "St. Louis was once called the Mound City."],
  ["Archaeologists learn about the first Americans by studying…", "tools, bones and places they lived", ["their emails", "their newspapers", "their TV shows"], "Objects are clues."],
  ["Native nations in North America spoke…", "hundreds of different languages", ["one language", "only English", "only Spanish"], "Nations are not all the same."],
  ["Today, Native nations in the United States…", "have their own governments", ["no longer exist", "are all one nation", "live only in museums"], "Many nations govern themselves today."],
  ["Why did Native nations in different regions live in different kinds of homes?", "they used the materials and climate of their region", ["they all copied each other", "they had no homes", "the government told them to"], "Environment shapes ways of life.", true],
  ["Before 1800, many eastern nations moved west because…", "European settlers took over their lands", ["they wanted to see the ocean", "the climate was colder there", "they had no reason"], "Settlement pushed nations west.", true],
  ["The Osage moved into what is now Missouri long before Europeans arrived, from lands to the…", "east, along the Ohio River valley", ["Pacific coast", "far north in the Arctic", "islands of the Caribbean"], "Many nations migrated over centuries.", true],
  ["Trade networks in early North America carried goods such as…", "shells, copper and stone", ["plastic", "paper money", "cars"], "Goods traveled hundreds of miles.", true],
  ["How did horses, brought by the Spanish, change life for many Plains nations?", "they made hunting bison and traveling easier", ["they stopped all hunting", "they made people stay in one place", "nothing changed"], "New animals changed ways of life.", true],
  ["Diseases brought by Europeans harmed Native peoples because…", "they had no immunity to them", ["they caused better health", "they only affected animals", "they were cured right away"], "Smallpox spread quickly.", true],
  ["A primary source about the first Americans could be…", "a tool they made", ["a textbook from 2020", "a movie", "an encyclopedia"], "Primary sources come from the time.", true],
  ["Why do historians say many Native nations, not one Native people?", "each nation has its own culture and history", ["they were all the same", "no one knows", "it sounds nicer"], "Avoid treating all nations as one.", true],
  ["The Haudenosaunee, a group of nations in the Northeast, joined together in a…", "confederacy", ["kingdom", "empire", "colony"], "Several nations agreed to work together.", true],
  ["Many Native place names, like Mississippi and Missouri, come from…", "Native languages", ["Latin", "Japanese", "German"], "Names carry history."],
  ["Corn was first grown by people in…", "Mexico and Central America", ["Europe", "Australia", "Antarctica"], "Farming spread north from there."],
  ["Native peoples traveled on rivers in…", "canoes", ["trains", "planes", "trucks"], "Canoes were made of wood or bark."],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "mo-g4-first-americans",
    title: "The First Americans",
    emoji: "🏹",
    blurb: "How people came to the Americas and lived in each region",
    parentNote: "How people first came to the Americas, how Native nations lived in different regions before 1800, how they moved over time and how contact with Europeans changed their lives, with Native nations described as living communities today.",
    standards: ["4.H.3.A.a; 4.H.3.B.a", "the migrations of Native Americans before 1800, and cultural interactions among Native Americans, Europeans and Africans"],
    items: FIRST_AMERICANS,
  }),
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "mo-g4-explorers",
    ["4.H.3.A.b; 4.H.3.B.a", "European exploration and early settlement of America before 1800, and cultural interactions and conflicts"],
    [
      ["French explorers Marquette and Jolliet canoed down the Mississippi River in…", "1673", ["1492", "1776", "1803"], "They passed the mouth of the Missouri River."],
      ["La Salle claimed the whole Mississippi River valley for…", "France", ["Spain", "England", "the Netherlands"], "He named it Louisiana for the French king."],
      ["Spain's explorers in North America were mostly looking for…", "gold and new land", ["ice", "coal", "oil"], "They also spread their religion."],
      ["French traders along the Mississippi mostly wanted…", "furs", ["gold", "cotton", "tea"], "Beaver furs were valuable in Europe."],
      ["Why did explorers need help from Native guides?", "Native people knew the land and rivers", ["explorers had perfect maps", "there were no rivers", "guides were not needed"], "Local knowledge was vital.", true],
      ["Hernando de Soto's Spanish expedition in the 1540s was the first European group to see the…", "Mississippi River", ["Pacific Ocean", "Great Lakes", "Hudson River"], "They crossed it in 1541."],
      ["Explorers called the Americas the New World because it was…", "new to Europeans", ["just formed", "empty of people", "a planet"], "Millions of people already lived there."],
      ["The French founded New Orleans near the mouth of the Mississippi in…", "1718", ["1492", "1803", "1865"], "It controlled river trade."],
      ["The French built forts and trading posts along rivers so they could…", "trade furs and claim land", ["grow cotton", "mine gold", "build railroads"], "Rivers linked their posts.", true],
    ],
    {
      parentNote:
        "The aims, sponsors, routes and obstacles of European explorers, including the French on the Mississippi, the land claims of Spain, France, England and the Dutch, and cooperation and conflict between colonists and the peoples already living in the Americas.",
    },
  ),
];

export const SOCIAL_5: Unit[] = [
  localCopy(
    from(TEXAS_SOCIAL_5, "tx-g5-growing-nation"),
    "mo-g5-growing-nation",
    ["5.H.3.A.a; 5.H.3.B.a", "the territorial expansion of the United States, and cultural interactions and conflicts as it grew"],
    [
      ["The Louisiana Purchase of 1803 included the land that became…", "Missouri", ["Florida", "Maine", "Hawaii"], "Missouri became a state in 1821."],
      ["Lewis and Clark began their journey in 1804 near…", "St. Louis", ["Boston", "Miami", "New Orleans"], "They went up the Missouri River."],
      ["Wagon trains heading west in the 1840s often started in…", "Independence, Missouri", ["Philadelphia", "Atlanta", "Detroit"], "Missouri was the jumping-off point."],
      ["The Missouri Compromise of 1820 tried to settle arguments about…", "slavery in new states", ["the price of land", "railroad routes", "who could fish"], "Missouri entered as a slave state."],
      ["As the nation grew west, many Native nations were…", "forced off their lands", ["given new lands in the East", "made the rulers of the West", "left alone"], "Expansion brought removal.", true],
    ],
    {
      parentNote:
        "The causes and effects of the War of 1812, the Louisiana Purchase and Lewis and Clark, Manifest Destiny and the trails west from Missouri, the Industrial Revolution and sectional conflict, and the settlers and immigrants who moved west, told plainly for the nations who lost their lands.",
    },
  ),
  localCopy(
    from(NEW_YORK_SOCIAL_8, "ny-g8-civil-rights"),
    "mo-g5-civil-rights",
    ["5.RI.6.E.a; 5.PC.1.C.a", "the changing roles of African Americans, women and others, and the Bill of Rights in the civil rights era"],
    [
      ["In 1948, the Supreme Court case Shelley v. Kraemer, from St. Louis, said courts could not enforce rules that…", "kept Black families from buying homes", ["let children skip school", "set the price of bread", "named city streets"], "It was a step against housing discrimination."],
      ["Lucile Bluford, a Kansas City journalist, fought to be allowed into the University of Missouri's…", "journalism school", ["football team", "music hall", "zoo"], "She was turned away because she was Black."],
      ["The First Amendment protects the right to…", "peacefully protest", ["break laws", "hurt others", "skip voting forever"], "Many civil rights marches used this right."],
      ["Missouri's schools were segregated by law until the Supreme Court's 1954 decision in…", "Brown v. Board of Education", ["Dred Scott v. Sandford", "Marbury v. Madison", "Plessy v. Ferguson"], "Brown said separate schools were unequal."],
      ["Which method did most civil rights leaders use?", "nonviolent protest", ["violent attacks", "hiding", "doing nothing"], "Marches, sit-ins and boycotts.", true],
    ],
    {
      parentNote:
        "The civil rights movement from Brown v. Board of Education to the Voting Rights Act, its leaders and peaceful methods, Missouri cases and people such as Shelley v. Kraemer and Lucile Bluford, and the efforts it inspired by women, farm workers and people with disabilities.",
    },
  ),
];
