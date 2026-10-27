import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Mexico Grade 8 social studies, United States history to 1920: New Mexico's part in the nation's story, from the
// war with Mexico and the treaty's promises to residents (8.69), how the United States gained new territory (8.70), how
// Indigenous nations resisted expansion and the Western Campaign of the Civil War (8.71, 8.88), New Mexico as a territory
// in the Civil War (8.83), the assimilation experiences of Indigenous and Hispanic people (8.68), and an environmental
// concern of expansion (8.67); and the new nation from Washington's precedents to Indian removal and westward expansion.
// The rest of the national story is practised with adopted units (see ../plan/social.ts).

const NM_AND_NATION: Q[] = [
  ["New Mexico became part of the United States in 1848, at the end of the war with…", "Mexico", ["Britain", "France", "Spain"], "The Treaty of Guadalupe Hidalgo gave the United States the Mexican Cession."],
  ["The United States gained the land of New Mexico mainly through…", "war and a treaty", ["a gift from Britain", "a trade with France", "a vote in Mexico"], "Purchases, treaties, wars and annexation all added land."],
  ["One cause of the Mexican-American War was a dispute over the border of…", "Texas", ["Florida", "Oregon", "Alaska"], "The United States had annexed Texas in 1845."],
  ["The Treaty of Guadalupe Hidalgo promised Mexican citizens who stayed in the new US lands…", "citizenship and protection of their property and religion", ["free land in Mexico", "no taxes ever", "a trip to Spain"], "About 100,000 people lived in the Mexican Cession."],
  ["Many Hispano families in New Mexico lost land grants after 1848 because…", "US courts and officials often refused to recognize them", ["they sold them for gold", "floods washed them away", "Mexico took them back"], "Promises in the treaty were often not kept."],
  ["The Gadsden Purchase of 1853 added land in southern New Mexico and Arizona so the United States could build a…", "southern railroad", ["canal to the ocean", "new capital", "naval base"], "The United States paid Mexico $10 million."],
  ["During the Civil War, New Mexico was a…", "US territory that stayed with the Union", ["Confederate state", "part of Mexico", "independent country"], "Territories had a role in the war too."],
  ["Confederate soldiers from Texas invaded New Mexico in 1862 hoping to reach…", "the gold fields of Colorado and the ports of California", ["the Atlantic coast", "Florida", "New York"], "They wanted Western gold and ports."],
  ["The Battle of Glorieta Pass in 1862 ended when Union soldiers…", "destroyed the Confederate supply train", ["surrendered", "ran out of water", "sailed away"], "Without supplies, the Confederates retreated to Texas."],
  ["The Civil War fighting in New Mexico and the Southwest is part of the…", "Western Campaign", ["Atlantic Campaign", "Pacific War", "War of 1812"], "It also included campaigns against Native nations."],
  ["During the Civil War, General James Carleton ordered campaigns that forced Diné and Mescalero Apache people to move to…", "Bosque Redondo", ["Santa Fe", "Mexico City", "Chaco Canyon"], "The forced march is called the Long Walk."],
  ["The Treaty of 1868 between the United States and the Navajo Nation allowed the Diné to…", "return to part of their homeland", ["move to Mexico", "stay at Bosque Redondo forever", "leave the Southwest"], "The treaty is still honored by the Navajo Nation today."],
  ["Apache leaders such as Victorio and Geronimo resisted US expansion by…", "fighting to stay in their homelands", ["selling the land", "moving to Europe", "joining the railroad"], "Resistance continued into the 1880s."],
  ["Schools that took Native children far from home to make them give up their languages were part of a policy of…", "assimilation", ["independence", "annexation", "secession"], "The Albuquerque and Santa Fe Indian Schools began this way."],
  ["How were the assimilation experiences of Indigenous and Hispanic New Mexicans different from many later immigrants'?", "they were already living on the land when the United States arrived", ["they chose to move to the United States", "they all came by ship", "they had no languages of their own"], "They didn't move to the United States; the border moved."],
  ["Overgrazing by huge herds of cattle and sheep in territorial New Mexico led to…", "soil erosion and loss of grassland", ["more rain", "new forests", "deeper rivers"], "It was a human-caused environmental problem."],
  ["The railroad changed New Mexico after 1880 by…", "bringing new settlers, towns and markets", ["ending all trade", "closing every mine", "making travel slower"], "Towns like Gallup and Las Vegas grew along the tracks."],
  ["Why did New Mexico wait until 1912 to become a state?", "Congress hesitated to admit a mostly Spanish-speaking, Catholic territory", ["no one lived there", "it asked to stay a territory forever", "it was part of Mexico until 1910"], "Prejudice slowed statehood.", true],
  ["Why is New Mexico called a border territory in the Civil War, even though few battles happened there?", "both sides wanted its routes west", ["it was the capital", "it had the most people", "it made all the weapons"], "Geography shaped the war in the West.", true],
  ["Comparing the Treaty of Guadalupe Hidalgo's promises with what happened next shows…", "a gap between the treaty and how it was carried out", ["every promise was kept", "no one lived in the Cession", "Mexico kept the land"], "Use evidence to compare ideals and results.", true],
  ["Taking land through a treaty after a war is different from a purchase because…", "it followed a military defeat", ["no papers are signed", "money is always paid", "it never happens"], "The ways the US gained land differed.", true],
  ["Kit Carson led US soldiers in burning Diné crops and orchards in Canyon de Chelly in 1863 and 1864, which…", "forced many Diné families to surrender from hunger", ["helped Diné farms grow", "ended the Civil War", "built a railroad"], "This campaign led to the Long Walk.", true],
  ["How did Hispano soldiers from New Mexico take part in the Civil War?", "many joined New Mexico volunteer units for the Union", ["they all joined the Confederacy", "none took part", "they fought for Spain"], "Volunteers fought at Valverde and Glorieta.", true],
  ["Losing grazing land and water after 1848 pushed many Hispano villagers to…", "work for wages on railroads, ranches and mines", ["sail to Europe", "become bankers", "stop working"], "The economy and land use changed.", true],
  ["Why is it important to read both US Army reports and Diné oral histories about the Long Walk?", "each shows a different perspective on the same event", ["one is always made up", "only army reports count", "oral histories are always wrong"], "Different sources give different views.", true],
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
    id: "nm-g8-new-mexico-and-the-nation",
    title: "New Mexico & the Nation",
    emoji: "🎖️",
    blurb: "From the war with Mexico to the Civil War in the West",
    parentNote: "New Mexico's part in United States history: the Mexican-American War and the Treaty of Guadalupe Hidalgo's promises to residents, the Gadsden Purchase, the Civil War in New Mexico at Valverde and Glorieta Pass, the Western Campaign and the Long Walk, Apache resistance, assimilation and boarding schools, overgrazing, and the railroad and statehood.",
    standards: ["8.67; 8.68; 8.69; 8.70; 8.71; 8.83; 8.88", "an environmental concern of expansion, Indigenous and Hispanic assimilation, the Mexican-American War and its residents, how the US gained territory, Indigenous resistance, territories in the Civil War, and the Western Campaign"],
    items: NM_AND_NATION,
  }),
  bankUnit({
    id: "nm-g8-new-nation",
    title: "The New Nation Grows",
    emoji: "🗺️",
    blurb: "Parties, the courts and moving west",
    parentNote: "The early United States: Washington's Farewell Address, the first political parties, Marbury v. Madison and judicial review, the War of 1812 and the Monroe Doctrine, the Louisiana Purchase and westward expansion, Indian removal and the Trail of Tears, the war with Mexico, and the question of slavery in new states.",
    standards: ["8.59; 8.62; 8.65; 8.66; 8.75", "precedents of the Early Republic, diverse ideologies in early US politics, policies defining federal, state and Tribal relationships, US expansion and Tribal self-government, and citizens' responses to changing policies"],
    items: NEW_NATION,
  }),
];
