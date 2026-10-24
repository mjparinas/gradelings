import type { Entry } from "../kit";

// New Jersey social studies: the units New Jersey uses from other frameworks, per grade ("<grade>/social"). The New
// Jersey Student Learning Standards for Social Studies (2020) are written in grade bands (K-2, 3-5, 6-8, 9-12) and
// cited by performance expectation: "6.1.2.CivicsPI.1", "6.1.5.HistoryCC.3", "6.1.8.HistoryCC.4.b" (United States
// history by era), "6.2.8.HistoryCC.4.a" (world history by era) and "6.3.5.CivicsPD.3" (active citizenship). NJDOE
// prints the K-2 geography codes with an extra dot ("6.1.2.Geo.SV.1"), and the codes are kept as printed. The personal
// financial literacy standards (NJSLS-CLKS 9.1, "9.1.5.PB.1") are cited here too.
//
// New Jersey leaves the order of topics inside each band to the district, so this app follows the usual pattern:
// self, family and community in Kindergarten to Grade 2 (with the state's symbols in Grade 1), New Jersey's land,
// regions and local government in Grade 3, New Jersey history and government in Grade 4, the colonies, the Revolution
// and the Constitution in Grade 5, early humans and ancient civilizations in Grade 6 (world history eras 1 to 3), the
// world from about 500 to 1450 in Grade 7 (era 4), and United States history from the Revolution to Reconstruction in
// Grade 8 (eras 3 to 5). Grade 9 is civics and personal finance (the 9-12 civics expectations, the New Jersey
// Constitution and 9.1.12), which New Jersey's graduation rules require. Only general units free of Canadian content
// and of other states' places are adopted, and never another state's units about its Tribes. New Jersey's own units
// are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "6.1.2.HistoryUP.2; 6.1.2.HistoryCC.1", "how each child's family, beliefs and traditions shape who they are, and putting events in order"],
    ["families", "share", "6.1.2.HistoryUP.2; 6.1.2.CivicsDP.3", "families and their traditions, and the holidays and symbols people share"],
    ["needs-and-wants", "share", "6.1.2.EconET.1; 9.1.2.FP.2", "the difference between needs and wants"],
    ["places-near-me", "adopt", "6.1.2.Geo.SV.1; 6.1.2.GeoPP.1", "places near home and school, maps and pictures, and what makes a place a good place to live"],
    ["fair-and-kind", "adopt", "6.1.2.CivicsPR.1; 6.1.2.CivicsPR.3", "what makes a good rule, and how classroom rules keep everyone safe and fair"],
    ["mb-k-jobs-and-rules", "adopt", "6.1.2.CivicsPR.4; 6.1.2.CivicsPI.1", "community helpers and leaders, and why school has rules"],
    ["or-k-money-and-work", "adopt", "6.1.2.EconEM.3; 6.1.2.EconEM.2", "how people exchange money for goods and services"],
    ["ca-k-calendar", "adopt", "6.1.2.HistoryCC.1; 6.1.2.HistoryCC.2", "days, weeks and months, and using before and after to put events in order"],
    ["ca-k-good-citizens", "adopt", "6.1.2.CivicsCM.1; 6.1.2.CivicsCM.3", "taking part in classroom decisions, being responsible and treating everyone with respect"],
  ],
  "1/social": [
    ["maps", "share", "6.1.2.Geo.SV.1; 6.1.2.Geo.SV.2", "making and reading simple maps of the neighborhood"],
    ["our-land", "share", "6.1.2.Geo.HE.1; 6.1.2.Geo.HE.2", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "6.1.2.CivicsPI.5; 6.1.2.EconEM.2", "how a community works together, and the goods and services local businesses provide"],
    ["changes-in-my-life", "adopt", "6.1.2.HistoryCC.1; 6.1.2.HistoryCC.2", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "6.1.2.CivicsCM.3; 6.1.2.HistoryUP.3", "how diversity, fairness and respect help a community, and why stereotypes are unfair"],
    ["community-services", "adopt", "6.1.2.EconEM.1; 6.1.2.CivicsPI.2", "the jobs people do in a community, the skills they need, and the services local government gives"],
    ["wa-g1-earn-save-share", "adopt", "9.1.2.PB.2; 9.1.2.CR.2", "earning, spending and saving money, and ways to give back"],
    ["ca-g1-long-ago", "adopt", "6.1.2.HistoryCC.3; 6.1.2.HistoryCA.1", "school, travel and daily life long ago compared with today, and how inventions changed them"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "6.1.2.EconET.2; 9.1.2.FP.3", "the choices people make when there isn't enough, and what makes people spend or save"],
    ["then-and-now", "adopt", "6.1.2.HistoryCA.1; 6.1.2.HistorySE.3", "how a community has changed over time, from sources about then and now"],
    ["communities-compared", "adopt", "6.1.2.GeoPP.1; 6.1.2.Geo.HE.2", "comparing the land, jobs and ways of life of different communities"],
    ["ns-community-change-2", "adopt", "6.1.2.HistoryCC.2; 6.1.2.HistoryCA.1", "key events in a community's history and putting them on a timeline"],
    ["mb-working-together", "adopt", "6.1.2.CivicsPI.4; 6.1.2.CivicsPD.2", "how everyone, not just leaders, helps a community work together and solve problems"],
    ["ca-g2-citizens-and-leaders", "adopt", "6.1.2.CivicsPI.6; 6.1.2.CivicsPI.3; 6.1.2.CivicsDP.1", "what government is and does, leaders at each level, and the nation's symbols"],
    ["ca-g2-work-and-money", "adopt", "6.1.2.EconET.3; 9.1.2.PB.1", "goods and services, prices, and places to save money"],
    ["or-g2-world-maps", "adopt", "6.1.2.Geo.SV.3; 6.1.2.Geo.GI.1", "continents, oceans and countries on maps and globes"],
  ],
  "3/social": [
    ["meeting-needs", "share", "6.1.5.EconEM.2; 6.1.5.GeoPP.2", "the resources used to produce goods, and how land, climate and resources shape where people live"],
    ["mb-global-communities", "adopt", "6.1.5.EconGE.4; 6.1.5.GeoGI.4", "comparing communities around the world and the resources they have"],
    ["mb-working-together", "adopt", "6.1.5.CivicsCM.3; 6.1.5.CivicsPI.1", "how people work together in groups and communities, and the behaviors that help"],
    ["or-g2-world-maps", "adopt", "6.1.5.GeoSV.3", "using maps and globes to find continents, oceans and countries"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "6.1.5.HistoryUP.5; 6.1.5.HistorySE.1", "using primary and secondary sources and comparing accounts of the past"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "6.1.5.HistoryCC.13; 6.1.5.GeoPP.1", "the thirteen colonies, their regions and how their early governments developed"],
    ["ca-g5-colonial-economy", "adopt", "6.1.5.EconEM.6; 6.1.5.EconEM.5", "trade among the colonies and other regions, and mercantilism"],
    ["ca-g5-road-to-revolution", "adopt", "6.1.5.HistoryCC.1; 6.1.5.HistoryCC.10", "the events and power struggles that led the colonies toward independence"],
    ["ca-g5-revolution", "adopt", "6.1.5.HistoryCC.3; 6.1.5.HistoryCC.15", "the American Revolution, its leaders and the Declaration of Independence"],
    ["wa-g5-constitution", "adopt", "6.1.5.CivicsPI.6; 6.1.5.CivicsPI.8; 6.1.5.CivicsHR.1", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "6.1.5.HistoryCC.1", "putting the events from the founding of the colonies to the Constitution in order"],
    ["or-g5-earn-and-save", "adopt", "9.1.5.PB.2; 9.1.5.FI.1", "choices people have with money, and what banks and other financial institutions do"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "6.2.8.HistorySE.1.a", "how archaeology and other sources tell us about the past, and counting time in BCE and CE"],
    ["first-farmers", "adopt", "6.2.8.HistoryCC.1.a; 6.2.8.HistoryCC.1.d", "early people, and how farming led to settled villages and growing populations"],
    ["where-civilizations-grew", "adopt", "6.2.8.GeoSV.2.a; 6.2.8.GeoHE.2.a", "how rivers and land shaped where the first civilizations grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.2.8.CivicsPI.2.a; 6.2.8.HistoryCC.2.c", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["wa-g6-india-china", "adopt", "6.2.8.HistoryCC.2.a; 6.2.8.HistoryCC.2.b", "ancient India and China, their achievements and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "6.2.8.CivicsDP.3.b; 6.2.8.HistoryCA.3.a", "democracy in Athens, the Roman Republic and their legacy"],
    ["world-beliefs", "adopt", "6.2.8.HistoryUP.3.c", "the tenets of major world religions"],
    ["trade-networks", "adopt", "6.2.8.EconEM.3.a; 6.2.8.GeoPP.3.b", "how land and sea trade routes spread goods and ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "6.2.8.CivicsDP.4.a; 6.2.8.HistoryCC.4.a", "medieval Europe, feudalism and the English legal ideas behind later governments"],
    ["islamic-world", "adopt", "6.2.8.GeoPP.4.a; 6.2.8.GeoPP.4.c", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-asian-empires", "adopt", "6.2.8.EconGE.4.a; 6.2.8.HistoryCC.4.f", "the empires of China and Asia, and their trade and inventions"],
    ["or-g7-african-kingdoms", "adopt", "6.2.8.GeoGI.4.a; 6.2.8.GeoPP.4.b", "the kingdoms of West Africa and trans-Saharan trade"],
    ["ca-g7-aztec-inca", "adopt", "6.2.8.GeoHE.4.c; 6.2.8.HistoryCC.4.g", "the Maya, Aztec and Inca and how their lands shaped them"],
    ["or-g7-age-of-revolutions", "adopt", "6.3.8.CivicsPR.1", "how democratic ideas grew from the Magna Carta to the revolutions of the 1700s"],
    ["or-g7-world-timeline", "adopt", "6.2.8.HistoryCC.4.b", "putting major events in world history in order and linking causes and effects"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "6.1.8.HistoryUP.3.a; 6.1.8.HistoryCC.3.d", "the ideas behind the Declaration of Independence, and the Articles of Confederation and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "6.1.8.CivicsPI.3.b; 6.3.8.CivicsDP.3", "the principles of the Constitution, the rights it protects and due process"],
    ["ca-g8-industry-reform", "adopt", "6.1.8.EconNE.4.a; 6.1.8.EconNE.4.b", "new technology, factories and workers, and the reformers of the 1800s"],
    ["or-g8-reconstruction", "adopt", "6.1.8.HistoryUP.5.a; 6.1.8.HistoryCC.5.e", "Reconstruction and the 13th, 14th and 15th Amendments"],
    ["maps-graphs-8", "adopt", "6.1.8.GeoSV.4.a", "using maps, graphs and data to show expansion and change over time"],
    ["mb-evidence-8", "adopt", "6.1.8.HistorySE.3.b", "analyzing primary and secondary sources and detecting bias in them"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "6.1.12.CivicsPI.2.a; 6.1.12.CivicsPD.2.a", "individual rights and the debate between Federalists and Anti-Federalists over the Constitution"],
    ["ca-g9-civic-action", "adopt", "6.1.12.CivicsPD.14.a; 6.3.12.CivicsPD.1", "how citizens take part, from voting and elections to holding government to account"],
    ["ca-g9-media", "adopt", "6.1.12.CivicsPD.16.a", "how media and technology shape political participation and public opinion"],
  ],
};
