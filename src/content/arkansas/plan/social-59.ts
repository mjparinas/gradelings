import type { Entry } from "../kit";

// Arkansas social studies, Grades 5 to 9: the units Arkansas uses from other frameworks, per grade ("<grade>/social").
// The Arkansas Social Studies Academic Standards (2022) number each standard by strand, standard, grade and number:
// "G.2.5.1" is geography standard 2, Grade 5, number 1 (C civics, E economics, G geography, H history). Arkansas History
// (taught in Grades 7 and 8) adds course codes ("H.1.ARH.3", "G.1.ARH.1"), and Grade 9 Civics uses "C.2.CIV.5".
//
// Grade themes: World Geography (5: maps, regions, population and migration, resources, trade and how people change
// the environment), World History (6: first farmers and the river valley civilizations to Greece, Rome, the world's
// belief systems, medieval Europe, the Renaissance and the civilizations of the Americas), United States History to
// about 1850 with Arkansas History (7: the colonies, the Revolution, the Constitution and the new nation, with
// Arkansas's land, first peoples, explorers, territory and statehood), United States History from 1850 with Arkansas
// History (8: the road to the Civil War, the war and Reconstruction, industry, immigration, reform, empire, World War I
// and the 1920s, with Arkansas in the Civil War, the twentieth century and Arkansas's economy and government) and Civics
// (9). Only general units free of Canadian content and of other states' place names are adopted, and never another
// state's units about its Tribes. Arkansas's own units (`ar-` ids, in ../units/social-<grade>.ts) are the Arkansas
// History units, Arkansas government, and copies of other states' units with their state questions left out.
export const PLAN_SOCIAL_MIDDLE: Record<string, Entry[]> = {
  "5/social": [
    ["maps-graphs-8", "adopt", "G.2.5.2; G.2.5.3", "using maps, graphs and data to answer geographic questions"],
    ["al-g7-world-regions", "adopt", "G.2.5.6; G.3.5.4", "comparing world regions by their physical and cultural characteristics"],
    ["ny-g6-eastern-hemisphere", "adopt", "G.2.5.5; G.3.5.4; G.3.5.8", "the landforms, rivers, regions and borders of Africa, Asia, Europe and Australia"],
    ["tx-g6-economies", "adopt", "G.3.5.5; G.3.5.6", "how resources, workers and capital shape the economic activities of different countries"],
    ["quality-of-life-8", "adopt", "G.3.5.9; G.4.5.4", "quality of life around the world, and how people work together on problems such as clean water"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "H.2.6.1", "comparing hunter-gatherer and farming societies"],
    ["where-civilizations-grew", "adopt", "H.2.6.3; G.1.6.6", "what makes a civilization, and how rivers and climate shaped where the first ones grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "H.2.6.4; H.2.6.6", "the river valley civilizations of Mesopotamia and Egypt, their rulers, laws and achievements"],
    ["wa-g6-india-china", "adopt", "H.2.6.4; H.2.6.10", "the Indus Valley and ancient China, and their lasting contributions"],
    ["ca-g6-greece-rome", "adopt", "H.2.6.7; C.1.6.2", "the governments and lasting achievements of ancient Greece and Rome"],
    ["world-beliefs", "adopt", "H.2.6.9; H.2.6.13", "the key ideas of Buddhism, Christianity, Confucianism, Hinduism, Islam and Judaism"],
    ["trade-networks", "adopt", "E.1.6.9; G.1.6.8; H.2.6.16", "the Silk Road and other trade routes, and how they spread goods, ideas and cultures"],
    ["ca-g7-rome-byzantium", "adopt", "H.2.6.12", "the fall of the Western Roman Empire and the rise of the Byzantine Empire"],
    ["medieval-europe", "adopt", "E.1.6.6; H.2.6.17", "feudalism, manors and the Church in medieval Europe"],
    ["ny-g9-crusades-plague", "adopt", "H.2.6.17; E.1.6.8", "the Crusades and the Black Death, and how war and disease changed Europe"],
    ["renaissance-and-reformation", "adopt", "H.2.6.14; H.2.6.16", "the Renaissance and the Reformation, and the people whose ideas spread around the world"],
    ["ca-g7-aztec-inca", "adopt", "H.2.6.18; H.2.6.15", "the Maya, Aztec and Inca, and how European exploration and conquest affected them"],
  ],
  "7/social": [
    ["ca-g5-thirteen-colonies", "adopt", "H.3.7.5; H.3.7.4", "the New England, Middle and Southern colonies, and indentured servitude and slavery in them"],
    ["ca-g5-colonial-economy", "adopt", "E.1.7.1; E.1.7.2", "trade between the colonies, Great Britain and other nations, and work in each colonial region"],
    ["ca-g5-road-to-revolution", "adopt", "H.3.7.6", "the French and Indian War, British taxes and the protests that led to the Revolution"],
    ["ca-g5-revolution", "adopt", "H.3.7.9; H.3.7.10; H.3.7.11", "the Declaration of Independence, the battles and leaders of the Revolution, and its effects"],
    ["ca-g5-constitution", "adopt", "C.1.7.11; H.3.7.12", "the Articles of Confederation and the writing and signing of the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "C.1.7.7; C.1.7.10", "the rights in the Bill of Rights, and how amendments change the Constitution"],
    ["ca-g8-new-nation", "adopt", "H.3.7.13; H.3.7.14; E.1.7.5", "the first presidents, the national bank and the War of 1812"],
  ],
  "8/social": [
    ["tx-g8-divided-nation", "adopt", "H.4.8.2; H.4.8.3; H.4.8.4", "growing tensions between North and South, and the laws and compromises about slavery"],
    ["wa-g8-civil-war", "adopt", "H.4.8.6; H.4.8.7; H.4.8.8", "the key battles, people and effects of the Civil War"],
    ["or-g8-reconstruction", "adopt", "H.4.8.9", "Reconstruction, the 13th, 14th and 15th Amendments, and how it ended"],
    ["ca-g8-industrial-america", "adopt", "H.4.8.10; H.4.8.11", "the Second Industrial Revolution, railroads and big business, and immigration after 1870"],
    ["ny-g8-workers-progressives", "adopt", "H.4.8.13; H.5.8.5; H.5.8.6", "labor unions, muckrakers and the reforms of the Progressive Era"],
    ["ny-g8-expansion-empire", "adopt", "H.5.8.1; H.5.8.4", "American expansion overseas and the Spanish-American War"],
    ["ny-g8-world-war-i", "adopt", "H.5.8.2; H.5.8.3", "why the United States entered World War I, and how the war changed the country"],
    ["ny-g8-roaring-twenties", "adopt", "H.5.8.7; H.5.8.8", "the social, economic and cultural changes of the 1920s"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "C.3.CIV.6; C.3.CIV.7", "the documents and Enlightenment ideas behind the US Constitution"],
    ["ca-g9-forms-of-government", "adopt", "C.2.CIV.3", "comparing democracy, monarchy, dictatorship and other forms of government"],
    ["me-g9-us-government", "adopt", "C.2.CIV.4; C.2.CIV.9; C.3.CIV.8", "how the Constitution organizes the national government, and its amendments"],
    ["tx-g9-rights", "adopt", "C.3.CIV.1; C.3.CIV.10", "the rights and responsibilities of citizens, and civil rights laws"],
    ["ca-g9-media", "adopt", "C.3.CIV.15", "the media's influence on elections and how to judge news sources"],
    ["ca-g9-civic-action", "adopt", "C.4.CIV.4; C.2.CIV.2", "how citizens take part in their communities and weigh the effects of public decisions"],
  ],
};
