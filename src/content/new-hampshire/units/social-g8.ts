import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Hampshire Grade 8 social studies, United States history and civics: New Hampshire's part in the nation's story,
// from the Revolution and the Constitution to the first-in-the-nation presidential primary (SS:HI:8:1.2), Daniel Webster,
// Franklin Pierce and the quarrel between states' rights and national authority (SS:HI:8:1.4), the mills of the
// Merrimack, child labor and the Amoskeag strike (SS:HI:8:4.2, SS:HI:8:5.1), and the Treaty of Portsmouth and the Bretton
// Woods conference (SS:HI:8:2.3, SS:EC:8:5.4); and the new nation from Washington's precedents to Indian removal and
// westward expansion. The rest of the national story is practised with adopted units (see ../plan/social.ts).

const NH_AND_NATION: Q[] = [
  ["In December 1774, colonists raided Fort William and Mary near Portsmouth to seize…", "gunpowder and cannons from the British", ["gold coins", "the governor's ship", "tea"], "It was one of the first open acts of the Revolution."],
  ["In January 1776, New Hampshire became the first colony to…", "set up its own government independent of Britain", ["join Canada", "elect a king", "end all trade"], "It wrote a short constitution of its own."],
  ["General John Stark led New Hampshire soldiers to victory at the Battle of…", "Bennington", ["Gettysburg", "New Orleans", "the Alamo"], "His toast \"Live free or die\" became the state motto."],
  ["In June 1788, New Hampshire became the ninth state to ratify the Constitution, which meant the Constitution…", "could go into effect", ["was thrown out", "had to be rewritten", "applied only to New Hampshire"], "Nine of the thirteen states had to agree."],
  ["New Hampshire is known for holding the nation's first…", "presidential primary", ["Supreme Court case", "state fair", "railroad"], "A state law keeps its primary ahead of other states'."],
  ["In a presidential primary, voters choose…", "who each party's candidate for President will be", ["the governor", "a new state flag", "Supreme Court justices"], "The general election comes later."],
  ["Why do candidates spend so much time talking with voters in New Hampshire towns?", "an early win can give a campaign attention and support", ["New Hampshire picks the President alone", "only New Hampshire can vote", "it is the largest state"], "Small town meetings let voters ask candidates questions."],
  ["In tiny Dixville Notch, voters in the New Hampshire primary are famous for…", "casting their ballots at midnight", ["voting by mail only", "voting in the summer", "voting by raising hands at noon"], "Their results come in first."],
  ["Daniel Webster, born in Salisbury, New Hampshire, is famous for a Senate speech defending…", "the Union over the power of single states", ["the king of England", "breaking up the country", "ending elections"], "\"Liberty and Union, now and forever, one and inseparable!\""],
  ["The fight over whether a state could ignore a national law is a fight between states' rights and…", "national authority", ["local sports", "the British king", "town meetings"], "South Carolina tried to cancel a tariff law in 1832."],
  ["Franklin Pierce of Hillsborough, New Hampshire, was the 14th President. He signed a law in 1854 that let settlers in Kansas and Nebraska…", "vote on whether to allow slavery", ["vote for President early", "build the first railroad", "join Canada"], "The Kansas-Nebraska Act led to violence in Kansas."],
  ["John P. Hale, a senator from New Hampshire in the 1840s and 1850s, was known for speaking out against…", "slavery", ["public schools", "railroads", "voting"], "He ran for President on an antislavery ticket in 1852."],
  ["In the Civil War, the 5th New Hampshire Infantry is remembered because it…", "lost more soldiers killed in battle than any other Union regiment", ["never fought", "fought for the Confederacy", "was made of sailors only"], "It fought at Fredericksburg and Gettysburg."],
  ["Mills along the Merrimack River in Manchester and Nashua used the river to…", "power machines that made cloth", ["grow rice", "mine gold", "make electricity for Boston only"], "Falling water turned the mill wheels."],
  ["The Amoskeag Manufacturing Company in Manchester was once one of the largest…", "cotton cloth mills in the world", ["car factories", "airports", "gold mines"], "Thousands of workers came from Quebec, Ireland, Greece and Poland."],
  ["In 1922, Amoskeag workers went on strike for months because the company…", "cut their pay and made the work week longer", ["gave them a raise", "closed for a holiday", "built a park"], "Strikes are one way workers push back."],
  ["Photos taken in New Hampshire mills about 1909 helped Americans see the problem of…", "child labor", ["too many vacations", "empty factories", "free college"], "Lewis Hine photographed young mill workers."],
  ["Concord coaches, built in Concord, New Hampshire, carried passengers and mail across the…", "American West", ["Atlantic Ocean", "Pacific Ocean", "Arctic"], "Stagecoaches linked towns before railroads."],
  ["In 1905, peace talks in Portsmouth, New Hampshire, ended a war between…", "Russia and Japan", ["the North and the South", "Britain and France", "Mexico and Texas"], "President Theodore Roosevelt won the Nobel Peace Prize for his part."],
  ["In 1944, leaders from 44 countries met at Bretton Woods, New Hampshire, to plan…", "how the world's money and trade would work after World War II", ["a new Olympics", "the first moon landing", "a new state flag"], "They created the International Monetary Fund and the World Bank."],
  ["Josiah Bartlett, William Whipple and Matthew Thornton signed this document for New Hampshire in 1776:", "the Declaration of Independence", ["the Treaty of Paris", "the Bill of Rights", "the Emancipation Proclamation"], "They were New Hampshire's delegates to the Continental Congress."],
  ["Women in New Hampshire, and across the country, won the right to vote in every election when the 19th Amendment was ratified in…", "1920", ["1776", "1865", "1965"], "Suffrage expanded to new groups over time."],
  ["During World War II, workers at the Portsmouth Naval Shipyard built many…", "submarines", ["airplanes", "railroads", "cars"], "The shipyard sits where the Piscataqua River meets the sea."],
  ["Why did workers in Manchester's mills form unions in the early 1900s?", "to bargain together for better pay and hours", ["to close the mills", "to elect the President", "to build railroads"], "Workers have more power when they act together.", true],
  ["Why does New Hampshire's first-in-the-nation primary give its voters extra influence?", "candidates who do badly there often drop out", ["their votes count twice", "they vote for every state", "the winner always becomes President"], "Early results shape the race.", true],
  ["Webster wanted to keep the Union together, while some Southern leaders argued states could leave. This shows a tension between…", "states' rights and national authority", ["farms and cities", "boats and trains", "summer and winter"], "The Civil War settled the question.", true],
  ["When mills in New Hampshire closed in the 1930s, many workers lost their jobs. This is an example of how the business cycle…", "affects people's lives", ["never changes", "only affects other countries", "makes everyone richer"], "Recessions bring job losses.", true],
  ["Why did so many French Canadian families move to Manchester and Nashua around 1900?", "to find work in the mills", ["to find gold", "to escape a volcano", "to go to college"], "Migration often follows jobs.", true],
  ["The Treaty of Portsmouth shows New Hampshire playing a part in…", "international diplomacy", ["sports", "the Gold Rush", "the space race"], "Diplomacy is how countries settle disagreements by talking.", true],
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
    id: "nh-g8-new-hampshire-and-the-nation",
    title: "New Hampshire & the Nation",
    emoji: "🗳️",
    blurb: "From the Revolution to the first primary",
    parentNote: "New Hampshire's part in United States history: Fort William and Mary and the first independent government, ratifying the Constitution, the first-in-the-nation presidential primary, Daniel Webster and Franklin Pierce, the Civil War, the Merrimack mills, child labor and the Amoskeag strike, and the Treaty of Portsmouth and the Bretton Woods conference.",
    standards: ["SS:HI:8:1.2; SS:HI:8:1.4; SS:HI:8:4.2; SS:HI:8:5.1; SS:HI:8:2.3", "New Hampshire voters' role in presidential elections, states' rights and national authority, conflict between management and labor, how society's changes affected families, and the reasons for war and peace"],
    items: NH_AND_NATION,
  }),
  bankUnit({
    id: "nh-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["SS:CV:8:2.3; SS:HI:8:1.4; SS:HI:8:2.2", "the events and documents that shaped American government, states' rights and national authority, and efforts to remove European influence from the Western Hemisphere"],
    items: NEW_NATION,
  }),
];
