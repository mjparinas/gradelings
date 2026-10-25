import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Louisiana Grade 6 social studies: colonial Louisiana (6.10). French Louisiana, from La Salle's claim to the founding
// of Natchitoches and New Orleans, John Law and the Code Noir; then Spanish Louisiana, from the Treaty of Fontainebleau
// to the Third Treaty of San Ildefonso, with the Acadians, Isleños, Haitians and Gens de Couleur Libres, and Bernardo
// de Gálvez's part in the American Revolution (6.11). Slavery is told plainly.

const FRENCH: Q[] = [
  ["In 1682, the French explorer La Salle claimed the Mississippi River basin for France and named it Louisiana after…", "King Louis XIV", ["Queen Isabella", "King George III"], "He was the king of France."],
  ["Which brothers led the French colony in Louisiana starting in 1699?", "Iberville and Bienville", ["Lewis and Clark", "the Wright Brothers"], "They were the Le Moyne brothers from Canada."],
  ["Who founded New Orleans in 1718?", "Jean-Baptiste Le Moyne de Bienville", ["Alejandro O'Reilly", "Bernardo de Gálvez"], "He is called the Father of Louisiana."],
  ["Why did Bienville build New Orleans where he did?", "it was high ground near the river and close to a lake route to the Gulf", ["it was on a mountain", "it was far from any water"], "Location helped trade and defense."],
  ["Natchitoches, founded in 1714, is important because it is the…", "oldest permanent European settlement in the Louisiana Purchase lands", ["capital of Louisiana today", "largest city in Louisiana"], "It began as a trading post near Spanish Texas."],
  ["Why was Natchitoches founded on the Red River?", "to trade with Native nations and the Spanish", ["to mine gold", "to build ships for the Pacific"], "It was a trading post."],
  ["John Law's company was given control of Louisiana in 1717 to…", "bring settlers and make money for France", ["free all enslaved people", "give Louisiana to Spain"], "It sold shares to investors."],
  ["What happened when John Law's company failed in 1720?", "many investors in France lost their money", ["Louisiana became a state", "the colony grew rich"], "It was called the Mississippi Bubble."],
  ["German settlers brought by John Law's company farmed along the Mississippi in an area called the…", "German Coast", ["Gold Coast", "Bayou Teche"], "They grew food for New Orleans."],
  ["The Code Noir of 1724 was a set of French laws that…", "controlled the lives of enslaved people and limited free people of color", ["gave everyone the right to vote", "set up public schools"], "It made slavery part of the law."],
  ["Most Africans in colonial Louisiana were brought…", "by force and enslaved", ["as paid workers", "as tourists"], "Many came from the Senegal region of West Africa."],
  ["Which crops did enslaved people grow on plantations in French Louisiana?", "indigo and tobacco", ["coffee and bananas", "wheat and potatoes"], "Indigo made blue dye."],
  ["Many French settlers traded with Native nations for…", "deer skins and furs", ["iron and steel", "gold coins"], "Trade linked the colony to Native peoples."],
  ["French Louisiana grew slowly mostly because…", "few settlers came and France sent little help", ["it had too many people", "it had no rivers"], "Heat, floods and disease made life hard."],
  ["Who ruled French Louisiana?", "governors chosen by the king of France", ["an elected assembly of colonists", "a president"], "Colonists had little say."],
  ["How was government in French Louisiana different from the British colonies?", "the British colonies had elected assemblies", ["French Louisiana elected its own king", "the British colonies had no government"], "British colonists voted for lawmakers.", true],
  ["How was French Louisiana's economy different from New England's?", "it relied on plantations and trade along the river", ["it relied on whaling and factories", "it had no economy"], "Climate and geography shaped work.", true],
  ["Gens de Couleur Libres were…", "free people of color", ["French soldiers", "Spanish priests"], "Many owned businesses and land.", true],
  ["Which contribution did Gens de Couleur Libres make in colonial Louisiana?", "they worked as skilled builders, artisans and merchants", ["they ruled the colony", "they were all enslaved"], "They helped build New Orleans.", true],
  ["The Ursuline nuns who came to New Orleans in 1727 started a…", "school for girls", ["bank", "fort"], "It is one of the oldest in the country.", true],
  ["The French and Indian War ended in 1763 with France losing…", "almost all its land in North America", ["only New Orleans", "nothing at all"], "Britain and Spain gained land.", true],
  ["Louisiana's civil law today is different from other states because it grew from…", "French and Spanish law and the Napoleonic Code", ["English common law alone", "the laws of ancient Rome only"], "Louisiana has a Civil Code.", true],
  ["The Natchez, Choctaw and other nations were important to French Louisiana as…", "trading partners and sometimes enemies", ["French citizens", "Spanish soldiers"], "Relations changed over time.", true],
  ["Which came first?", "La Salle's claim", ["the founding of New Orleans", "the Code Noir"], "1682 comes before 1718 and 1724.", true],
  ["Which settlement was founded first?", "Natchitoches", ["New Orleans", "St. Martinville"], "1714 is earliest.", true],
];

const SPANISH: Q[] = [
  ["In the Treaty of Fontainebleau of 1762, France secretly gave Louisiana west of the Mississippi and New Orleans to…", "Spain", ["Great Britain", "the United States"], "France's ally in the war."],
  ["Why did France give Louisiana to Spain?", "France was losing a war with Britain and Louisiana cost too much", ["Spain bought it for gold", "Louisiana voted to join Spain"], "Spain was France's ally."],
  ["Many Acadians came to Louisiana after the British forced them out of…", "Acadia, in what is now Nova Scotia", ["Haiti", "the Canary Islands"], "It was called the Great Upheaval."],
  ["Acadians in Louisiana became known as…", "Cajuns", ["Creoles", "Isleños"], "The word comes from “Acadian.”"],
  ["Where did many Acadians settle in Louisiana?", "along the bayous of south-central Louisiana", ["in the northern pine hills only", "on islands in the Pacific"], "Today this region is called Acadiana."],
  ["Which Spanish governor crushed the Creoles' rebellion of 1768 and set up Spanish rule?", "Alejandro O'Reilly", ["Bernardo de Gálvez", "Bienville"], "He arrived in 1769 with soldiers."],
  ["Under Spain, New Orleans was governed by a council called the…", "Cabildo", ["Senate", "Parliament"], "Its building still stands by Jackson Square."],
  ["The Isleños who settled in Louisiana under Spain came from the…", "Canary Islands", ["Caribbean only", "Philippines"], "Spain recruited them in the 1770s."],
  ["Which Spanish governor of Louisiana helped the Americans win the Revolution?", "Bernardo de Gálvez", ["Alejandro O'Reilly", "John Law"], "He fought the British along the Gulf."],
  ["Bernardo de Gálvez helped the American Revolution by…", "capturing British forts and sending supplies", ["fighting for the British", "selling Louisiana to France"], "He took Baton Rouge in 1779."],
  ["Under Spanish law, enslaved people could…", "buy their own freedom", ["vote in elections", "own the plantation"], "This was called coartación."],
  ["Because of Spain's rules on buying freedom, the number of free people of color…", "grew", ["fell to zero", "stayed exactly the same"], "Many paid for their freedom."],
  ["In the 1790s, Étienne de Boré made sugar from Louisiana sugarcane that could be…", "turned into dry grains and sold widely", ["grown in snow", "used as fuel"], "Sugar became a huge crop."],
  ["New Orleans burned in great fires in 1788 and 1794. It was rebuilt in a style that was…", "Spanish, with brick walls and courtyards", ["English, with log cabins", "Chinese, with pagodas"], "The French Quarter's buildings show it."],
  ["In the Third Treaty of San Ildefonso of 1800, Spain secretly gave Louisiana back to…", "France", ["Great Britain", "Haiti"], "Napoleon wanted it."],
  ["After the Haitian Revolution, thousands of refugees from Haiti came to…", "New Orleans", ["Shreveport", "Monroe"], "Many came by way of Cuba in 1809."],
  ["Refugees from Haiti included white Creoles, free people of color and…", "enslaved people", ["Spanish soldiers", "Acadians"], "They doubled New Orleans's population.", true],
  ["How was Spanish rule different from French rule in Louisiana?", "Spain sent more soldiers and money and brought new settlers", ["Spain freed every enslaved person", "Spain left Louisiana with no government"], "The colony grew under Spain.", true],
  ["Why did Spain welcome Acadians and Isleños to Louisiana?", "to settle and defend the colony", ["to start a revolution", "to build pyramids"], "More settlers made the colony stronger.", true],
  ["What did French and Spanish Louisiana have in common?", "both were ruled by governors chosen by a king", ["both had elected presidents", "both banned trade"], "Neither had elected assemblies.", true],
  ["Which happened first?", "the Treaty of Fontainebleau", ["the Third Treaty of San Ildefonso", "the Louisiana Purchase"], "1762, 1800, 1803.", true],
  ["Which happened last?", "the Louisiana Purchase", ["the Treaty of Fontainebleau", "O'Reilly's arrival"], "1803 is latest.", true],
  ["The Cabildo building is famous today because…", "Louisiana was handed over to the United States there in 1803", ["it is the State Capitol", "it is a sports stadium"], "It is a museum now.", true],
  ["Why is St. Bernard Parish important to Isleño history?", "many Isleños settled there and their descendants live there today", ["it is where Bienville was born", "it is in Spain"], "It is southeast of New Orleans.", true],
  ["How did Louisiana's colonial past shape its culture today?", "French and Spanish law, buildings, food and language are still part of it", ["it left nothing behind", "it made Louisiana like every other state"], "Look at the French Quarter.", true],
];

export const SOCIAL_6: Unit[] = [
  bankUnit({
    id: "la-g6-colonial-louisiana",
    title: "French Louisiana",
    emoji: "⚜️",
    blurb: "La Salle, Bienville, Natchitoches and New Orleans",
    parentNote:
      "French Louisiana from La Salle's claim in 1682: Iberville and Bienville, the founding of Natchitoches and New Orleans, John Law's company and the German Coast, the Code Noir and slavery, Gens de Couleur Libres, trade with Native nations, and how French Louisiana compared with the British colonies.",
    standards: ["6.10", "the growth and development of colonial Louisiana under France, and how it compared with the British colonies"],
    items: FRENCH,
  }),
  bankUnit({
    id: "la-g6-spanish-louisiana",
    title: "Spanish Louisiana",
    emoji: "🏰",
    blurb: "Acadians, Isleños, O'Reilly and Gálvez",
    parentNote:
      "Louisiana under Spain, from the Treaty of Fontainebleau (1762) to the Third Treaty of San Ildefonso (1800): the Acadians, the Isleños, Alejandro O'Reilly and the Cabildo, free people of color and buying freedom, sugar, the rebuilt French Quarter, refugees from Haiti, and Bernardo de Gálvez's help in the American Revolution.",
    standards: ["6.10; 6.11", "Spanish colonial Louisiana and the groups who came to it, and Spain's part in the American Revolution"],
    items: SPANISH,
  }),
];
