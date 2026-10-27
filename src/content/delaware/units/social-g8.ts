import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Delaware Grade 8 social studies, United States history to Reconstruction and its connections to Delaware history
// (H.4.6-8.a): Delaware's part in the nation's story, from the Lower Counties and the Revolution to the first state to
// ratify the Constitution and the small states' fight for an equal vote (C.2.6-8.b), the Brandywine mills and the
// canal, slavery, the Underground Railroad and a slave state that stayed in the Union, and how Delawareans saw these
// events differently (H.2.6-8.b); and the new nation from Washington's precedents to Indian removal and westward
// expansion. The rest of the national story is practised with adopted units (see ../plan/social.ts).

const DE_AND_NATION: Q[] = [
  ["Until 1776, Delaware's Three Lower Counties had their own assembly but shared a governor with…", "Pennsylvania", ["New York", "Virginia", "Massachusetts"], "William Penn's family held both colonies."],
  ["On June 15, 1776, Delaware's assembly voted to separate from Great Britain and from…", "Pennsylvania", ["Maryland", "New Jersey", "Virginia"], "Delawareans remember it as Separation Day."],
  ["Caesar Rodney's ride to Philadelphia on July 1-2, 1776, mattered because his vote…", "broke a tie and put Delaware on the side of independence", ["chose the first President", "ended the war", "made Dover the national capital"], "Thomas McKean voted yes and George Read voted no."],
  ["Delaware's Continental soldiers earned the nickname…", "the Blue Hen's Chickens", ["the Green Mountain Boys", "the Minutemen", "the Rough Riders"], "The blue hen became the state bird."],
  ["In September 1777, the only Revolutionary War battle fought in Delaware took place at…", "Cooch's Bridge", ["Saratoga", "Yorktown", "Bunker Hill"], "British troops were marching toward Philadelphia."],
  ["John Dickinson of Delaware wrote the first draft of the…", "Articles of Confederation", ["Gettysburg Address", "Monroe Doctrine", "Emancipation Proclamation"], "He was called the Penman of the Revolution."],
  ["At the Constitutional Convention, Delaware's delegates insisted that small states have…", "an equal vote in at least one house of Congress", ["no say at all", "a king of their own", "more votes than large states in every house"], "The Great Compromise gave every state two senators."],
  ["On December 7, 1787, the delegates at Delaware's convention in Dover voted…", "unanimously to ratify the Constitution", ["to reject the Constitution", "to leave the Union", "to wait ten years"], "Delaware became the first state."],
  ["In 1802, the du Pont gunpowder mills began on the Brandywine. In the War of 1812 they…", "supplied gunpowder to the United States", ["closed for good", "sold only to Britain", "made cotton cloth"], "Government orders helped the company grow."],
  ["In 1813, during the War of 1812, British warships fired on the town of…", "Lewes", ["Dover", "Newark", "Seaford"], "Lewes sits at the mouth of Delaware Bay."],
  ["The Chesapeake and Delaware Canal, opened in 1829, was part of a transportation revolution that…", "cut the shipping route between Baltimore and Philadelphia", ["ended all trade", "joined Delaware to the Pacific", "replaced railroads"], "Canals, roads and railroads tied markets together."],
  ["The Mason-Dixon survey of the 1760s helped settle the boundary between Delaware and…", "Maryland", ["New Jersey", "New York", "Virginia"], "The line later came to divide North and South."],
  ["By 1860, most Black people living in Delaware were…", "free", ["enslaved", "in the army", "living in Pennsylvania"], "Many enslaved people had been freed by their owners or had bought their freedom."],
  ["In 1848, Quaker abolitionist Thomas Garrett was fined so heavily that he lost most of his property for…", "helping enslaved people escape", ["selling gunpowder", "refusing to pay a tax on tea", "building a canal"], "He kept helping, saying he would never stop."],
  ["The Fugitive Slave Act of 1850 required people in free states to…", "help return people who had escaped slavery", ["free every enslaved person", "build railroads", "stop voting"], "It made the Underground Railroad more dangerous."],
  ["In 1861, Abraham Lincoln offered Delaware money to free its enslaved people gradually. The General Assembly…", "refused", ["agreed at once", "asked for more", "joined the Confederacy"], "Delaware held on to slavery until the 13th Amendment."],
  ["During the Civil War, Delaware was a border state, meaning a slave state that…", "stayed in the Union", ["joined the Confederacy", "had no slavery", "was part of Maryland"], "Kentucky, Maryland and Missouri were border states too."],
  ["Fort Delaware, on Pea Patch Island in the Delaware River, served during the Civil War as a…", "prison for captured Confederate soldiers", ["hospital for horses", "lighthouse", "gunpowder mill"], "Thousands of prisoners were held there."],
  ["Delaware's General Assembly voted against the 13th, 14th and 15th Amendments and finally approved them in…", "1901", ["1865", "1870", "1965"], "The amendments became law across the nation without Delaware's vote."],
  ["After the Civil War, Delaware passed an 1873 law that made voters pay a tax first, which was meant to…", "keep Black men from voting", ["pay for the canal", "help farmers", "build schools for everyone"], "Laws like this held back the promise of the 15th Amendment."],
  ["The Delaware Railroad, finished down the peninsula in the 1850s, helped farmers by…", "carrying peaches and other crops quickly to city markets", ["ending farming", "moving farms to the city", "replacing the canal with a road"], "Peach orchards spread along the railroad."],
  ["Many people in Sussex County stayed loyal to Britain during the Revolution. This shows that…", "Delawareans did not all agree about independence", ["everyone supported independence", "Sussex County was in England", "there were no Loyalists in America"], "People in the same state can see events differently.", true],
  ["Why did Delaware stay in the Union even though slavery was legal there?", "few people were enslaved and its trade was tied to Northern cities", ["it had no army", "the Confederacy refused it", "it was an island"], "Economic ties and geography shaped its choice.", true],
  ["A historian reads a Delaware newspaper from 1861 that supported slavery. To judge it as a source, she asks…", "who wrote it, for whom and why", ["what color the paper was", "how many pages it had", "whether it was long"], "Credibility depends on the author's purpose and point of view.", true],
  ["Why did small states like Delaware care so much about equal votes in the Senate?", "they feared large states would outvote them on everything", ["they wanted a king", "they had more people than large states", "they wanted no Congress"], "Representation protects the interests of smaller groups.", true],
  ["Delaware approved the 13th Amendment 36 years after it became law. This shows that…", "national change and a state's own choices can differ", ["Delaware ended slavery first", "the amendment didn't apply to Delaware", "every state agreed at once"], "The Constitution is above state law.", true],
  ["Delaware's 1776 constitution was the first state constitution written by a convention elected for that purpose. It also banned…", "bringing enslaved people into the state from Africa", ["all trade with other states", "voting by men", "building churches"], "The ban was a first step, but slavery itself went on."],
  ["Wilmington shipyards built iron ships and railroad cars in the 1800s. This shows Delaware's economy…", "growing beyond farming into industry", ["ending all industry", "depending only on fishing", "staying the same for 100 years"], "Factories grew along the rivers.", true],
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
    id: "de-g8-delaware-and-the-nation",
    title: "Delaware & the Nation",
    emoji: "🗳️",
    blurb: "From the Lower Counties to the Civil War",
    parentNote: "Delaware's part in United States history: the Lower Counties and Separation Day, Caesar Rodney and the Blue Hen's Chickens, John Dickinson and the small states at the Constitutional Convention, ratifying first, the powder mills and the canal, slavery, Thomas Garrett and the Underground Railroad, Delaware as a border state, Fort Delaware, and the long refusal of the 13th, 14th and 15th Amendments.",
    standards: ["H.4.6-8.a; C.2.6-8.b; H.2.6-8.b", "pre-industrial United States history and its connections to Delaware, the major state papers of the founding, and judging historical sources for credibility and point of view"],
    items: DE_AND_NATION,
  }),
  bankUnit({
    id: "de-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["H.4.6-8.a; C.2.6-8.b; H.1.6-8.a", "the new nation, expansion and reform, the founding documents in practice, and how the country changed over time"],
    items: NEW_NATION,
  }),
];
