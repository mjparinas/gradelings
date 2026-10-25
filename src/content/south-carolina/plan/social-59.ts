import type { Entry } from "../kit";

// South Carolina social studies, Grades 5 to 9: the units South Carolina uses from other frameworks, per grade
// ("<grade>/social"). The 2019 standards number Grades 4, 5, 6 and 8 by standard and skill ("5.4.CC": standard 4,
// continuities and changes; CO comparison, CE causation, P periodization, CX contextualization, E evidence), Grade 7
// by theme and indicator ("7.2.3.HS"), and Grade 9 by course: United States Government ("USG.2.CC") and Economics and
// Personal Finance ("EPF.3.ER"), both required for graduation.
//
// Grade themes: United States and South Carolina Studies II, about 1860 to today (5), World Civilizations (6), World
// Regional Geography (7), South Carolina and the United States (8) and civics and economics (9). Only general units free
// of Canadian content and of other states' place names are adopted, and never another state's units about its Tribes.
// South Carolina's own units (`sc-` ids, in ../units/social-<grade>.ts) are the South Carolina history units of Grades 5
// and 8 and South Carolina's government in Grade 9.
export const PLAN_SOCIAL_MIDDLE: Record<string, Entry[]> = {
  "5/social": [
    ["tx-g5-growing-nation", "adopt", "5.1.CO", "how the nation grew and changed in the 1800s"],
    ["ca-g8-industrial-america", "adopt", "5.1.CE; 5.1.CX", "the Second Industrial Revolution, railroads, big business and immigration"],
    ["ny-g8-expansion-empire", "adopt", "5.1.P; 5.1.CC", "American expansion overseas and the Spanish-American War"],
    ["ny-g8-world-war-i", "adopt", "5.2.CE", "the causes of World War I and why the United States joined it"],
    ["ny-g8-roaring-twenties", "adopt", "5.2.CX", "the economy and culture of the 1920s"],
    ["ny-g8-great-depression", "adopt", "5.2.P; 5.2.CC", "the Great Depression and the New Deal"],
    ["ny-g8-world-war-ii", "adopt", "5.3.CO; 5.3.P; 5.3.CX", "the causes, battles and home front of World War II"],
    ["ny-g8-cold-war", "adopt", "5.4.CO; 5.4.CX", "capitalism and communism, and the Cold War"],
    ["ny-g8-civil-rights", "adopt", "5.4.CE; 5.4.E", "the Civil Rights Movement and its leaders"],
    ["ny-g8-new-era", "adopt", "5.5.CO; 5.5.P; 5.5.CE", "the end of the Cold War, September 11, and a connected, digital world"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "6.1.CE", "how farming changed the way early people lived"],
    ["where-civilizations-grew", "adopt", "6.1.CE; 6.1.CO", "what makes a civilization, and how rivers and climate shaped where the first ones grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.1.CO", "the river valley civilizations of Mesopotamia and Egypt and their social systems"],
    ["wa-g6-india-china", "adopt", "6.1.CC", "the Indus Valley and ancient China, and their lasting contributions"],
    ["ca-g6-greece-rome", "adopt", "6.1.P; 6.1.E", "the classical civilizations of Greece and Rome and what they left us"],
    ["world-beliefs", "adopt", "6.1.CX", "the origins and key ideas of the world's major religions"],
    ["trade-networks", "adopt", "6.2.CE", "the Silk Road and other trade routes, and how they spread goods and ideas"],
    ["medieval-europe", "adopt", "6.2.CO", "feudalism, manors and the Church in medieval Europe"],
    ["ny-g9-crusades-plague", "adopt", "6.2.P", "the Crusades and the Black Death, and how they changed Europe"],
    ["ny-g6-mongols-travelers", "adopt", "6.2.CX", "the Mongol Empire and the travelers who connected Europe and Asia"],
    ["ca-g7-aztec-inca", "adopt", "6.2.CC; 6.3.CX", "the Maya, Aztec and Inca, and how European conquest affected them"],
    ["ny-g9-atlantic-world", "adopt", "6.3.CO; 6.3.P", "European exploration and the Transatlantic Slave Trade"],
    ["renaissance-and-reformation", "adopt", "6.3.CC", "the Renaissance and the Reformation"],
    ["ny-g9-absolutism-enlightenment", "adopt", "6.3.CC; 6.4.CO", "Enlightenment ideas and the revolutions they inspired"],
    ["al-g9-industrial-revolution", "adopt", "6.4.P; 6.4.CX", "the Industrial Revolution and its effects on people and the environment"],
    ["al-g9-imperialism", "adopt", "6.4.CE", "colonialism and the Age of Imperialism"],
    ["al-g9-world-today", "adopt", "6.5.CC; 6.5.CX", "technology, trade and sustainability in today's connected world"],
  ],
  "7/social": [
    ["maps-graphs-8", "adopt", "7.1.6.AG; 7.5.6.AG", "using maps, graphs and data to study a region's issues"],
    ["ny-g6-eastern-hemisphere", "adopt", "7.1.1.PR; 7.2.1.PR; 7.4.1.PR", "the landforms, rivers and regions of Africa, Asia and Europe"],
    ["al-g7-world-regions", "adopt", "7.1.4.HS; 7.4.5.HS", "comparing world regions by their physical and cultural characteristics"],
    ["tx-g6-world-regions", "adopt", "7.3.1.PR; 7.3.5.HS", "the countries and regions of the world, including Oceania"],
    ["ny-g5-countries-capitals", "adopt", "7.5.5.HS; 7.6.5.HS", "the countries and capitals of the Americas"],
    ["quality-of-life-8", "adopt", "7.6.3.HS", "population, development and quality of life around the world"],
  ],
  "8/social": [
    ["ca-g5-thirteen-colonies", "adopt", "8.1.CO", "the New England, Middle and Southern colonies compared"],
    ["ca-g5-road-to-revolution", "adopt", "8.2.CE", "British taxes and the protests that led to the Revolution"],
    ["ca-g8-revolutionary-ideas", "adopt", "8.2.CE", "the ideas behind the American Revolution"],
    ["or-g8-founding-ideas", "adopt", "8.2.P", "the founding principles behind the Constitution and federalism"],
    ["wa-g8-bill-of-rights", "adopt", "8.2.P", "the rights in the Bill of Rights, and how amendments change the Constitution"],
    ["tx-g8-divided-nation", "adopt", "8.3.CO; 8.3.CC", "debates over slavery, states' rights and the Constitution"],
    ["wa-g8-civil-war", "adopt", "8.3.CE", "the key battles, strategies and effects of the Civil War"],
    ["wa-g8-reconstruction", "adopt", "8.3.P", "Reconstruction and the 13th, 14th and 15th Amendments"],
    ["ny-g8-workers-progressives", "adopt", "8.4.CO", "the reforms of the Progressive Era"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "USG.1.ER; USG.1.IN", "the ideas and documents behind the US Constitution"],
    ["me-g9-us-government", "adopt", "USG.1.CC; USG.2.ER; USG.2.IN", "how the Constitution organizes and limits the national government"],
    ["ca-g9-supreme-court", "adopt", "USG.2.IP; USG.4.CC", "the rule of law and landmark Supreme Court cases"],
    ["ca-g9-lawmaking", "adopt", "USG.3.ER", "how a bill becomes a law and how policy is made"],
    ["ca-g9-media", "adopt", "USG.3.CC", "the media, interest groups and parties, and how they shape public opinion"],
    ["ca-g9-elections", "adopt", "USG.3.IP", "how federal elections work"],
    ["tx-g9-rights", "adopt", "USG.4.IN", "citizens' rights and responsibilities, and how rights can conflict"],
    ["ca-g9-civic-action", "adopt", "USG.4.IP", "how citizens take part at the local, state, national and global levels"],
    ["az-g8-economy", "adopt", "EPF.1.IN; EPF.4.IN", "economic systems, markets and government's role in the economy"],
    ["az-g8-supply-demand", "adopt", "EPF.3.ER; EPF.3.CC", "supply, demand and market prices"],
    ["me-g9-personal-finance", "adopt", "EPF.2.IN; EPF.2.CC; EPF.2.IP", "banks, credit, saving and investing"],
    ["me-g9-economics", "adopt", "EPF.4.ER; EPF.4.CC", "economic indicators, inflation and trade"],
  ],
};
