import type { Entry } from "../kit";

// Colorado social studies: the units Colorado uses from other frameworks, per grade ("<grade>/social"). The Colorado
// Academic Standards for Social Studies (2022) have four standards (history, geography, economics, civics) plus
// personal financial literacy in every grade, cited by grade, discipline, grade-level expectation and evidence outcome:
// "4.H.1.a", "2.PF.1.c", "HS.C.2.j". Kindergarten to Grade 3 move from self and family to the local community and
// region, Grade 4 is Colorado history and geography, Grade 5 is early North America to the founding of the United
// States, Grade 6 is the Western Hemisphere, Grade 7 the Eastern Hemisphere and Grade 8 United States history from the
// American Revolution through Reconstruction. Grade 9 is civics (the high school expectations), the government course
// Colorado requires for graduation. Only general units free of Canadian content and of other states' places are
// adopted, and never another state's units about its Tribes. Colorado's own units (its symbols, communities, land,
// history and government) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.H.2.a", "comparing the lives of children and families now and in the past, starting with each child"],
    ["families", "share", "K.H.2.a; K.H.1.b", "families and their traditions, and sources that tell about the past"],
    ["needs-and-wants", "share", "K.PF.1.c", "the difference between wants and needs when there isn't enough for everything"],
    ["places-near-me", "adopt", "K.G.1.b; K.G.2.b", "describing places with maps and globes, and how weather and land shape the way people live"],
    ["fair-and-kind", "adopt", "K.C.2.a; K.C.2.c", "why rules are needed, and how fair rules settle conflicts"],
    ["mb-k-jobs-and-rules", "adopt", "K.C.1.a; K.C.2.a", "community helpers and leaders, and why school has rules"],
    ["or-k-money-and-work", "adopt", "K.PF.1.b", "how money lets people buy goods and services"],
    ["ca-k-calendar", "adopt", "K.H.2.b; K.H.2.c", "days, weeks and months, and using first, next and last to put events in order"],
    ["ca-k-good-citizens", "adopt", "K.C.1.c; K.C.2.d", "courtesy, honesty and fairness, and helping make class decisions"],
  ],
  "1/social": [
    ["maps", "share", "1.G.1.a; 1.G.1.e", "maps and globes, and making simple maps of the neighborhood"],
    ["our-land", "share", "1.G.2.a; 1.G.2.b", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "1.E.1.a; 1.E.1.b", "the goods and services local businesses provide and the jobs people do"],
    ["changes-in-my-life", "adopt", "1.H.1.a; 1.H.1.b", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "1.H.2.a; 1.C.1.d", "how people are alike and different, and respectful teamwork"],
    ["community-services", "adopt", "1.E.1.b; 1.E.1.c", "the jobs people do in a community and the benefits and costs of each"],
    ["wa-g1-earn-save-share", "adopt", "1.PF.1.a; 1.PF.1.c", "ways to earn money, and saving, spending and sharing it"],
    ["ca-g1-long-ago", "adopt", "1.H.1.d", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2.E.1.a; 2.E.1.c", "scarcity, and the choices people make when there isn't enough"],
    ["then-and-now", "adopt", "2.H.2.b; 2.H.1.a", "how a community has changed over time, from sources about then and now"],
    ["communities-compared", "adopt", "2.H.2.a; 2.G.2.d", "comparing the land, jobs and ways of life of different communities"],
    ["ns-community-change-2", "adopt", "2.H.2.b; 2.H.1.b", "key events in a community's history and putting them on a timeline"],
    ["mb-working-together", "adopt", "2.C.1.c; 2.C.1.d", "how people take part in and improve their community"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.C.2.a; 2.C.2.b", "what governments do, and leaders at the local, state and national levels"],
    ["ca-g2-work-and-money", "adopt", "2.E.1.b; 2.PF.1.c", "goods and services, and how different things cost different amounts"],
    ["or-g2-world-maps", "adopt", "2.G.1.c", "continents, oceans, hemispheres, the Equator and the poles"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.E.1.a; 3.G.2.b", "producers and consumers, and how a region's land and resources shape what it produces"],
    ["mb-global-communities", "adopt", "3.G.2.c; 3.E.1.e", "comparing communities around the world, and how trade links them"],
    ["mb-working-together", "adopt", "3.C.2.c; 3.C.1.c", "the roles people play in local government, and rights and responsibilities"],
    ["or-g2-world-maps", "adopt", "3.G.1.b", "locating oceans, continents and major countries on maps"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "4.H.1.a; 4.H.2.a", "drawing inferences from primary sources and building timelines"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "5.G.1.a; 5.H.2.c", "the thirteen colonies, their regions and the reasons they were settled"],
    ["ca-g5-colonial-economy", "adopt", "5.E.1.c; 5.E.1.d", "the goods traded among the colonies and other regions, and how trade grew"],
    ["ca-g5-road-to-revolution", "adopt", "5.H.2.d; 5.H.1.b", "the Proclamation of 1763, the Stamp Act and other steps toward revolution"],
    ["ca-g5-revolution", "adopt", "5.H.2.d; 5.C.2.a", "the American Revolution and the Declaration of Independence"],
    ["wa-g5-constitution", "adopt", "5.C.2.b; 5.C.2.c", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "5.H.1.c", "putting events from early North America to the founding in order"],
    ["or-g5-earn-and-save", "adopt", "5.PF.1.a; 5.PF.1.b", "saving and investing, and what banks do"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "6.H.1.a; 6.H.1.b", "how cultures record history, and studying the past from primary and secondary sources"],
    ["ny-g5-countries-capitals", "adopt", "6.G.1.a; 6.G.2.d", "the countries and regions of the Americas"],
    ["ca-g7-aztec-inca", "adopt", "6.H.2.c; 6.G.2.b", "the Maya, Aztec and Inca and how their lands shaped them"],
    ["ny-g5-columbian-exchange", "adopt", "6.H.2.a; 6.G.2.a", "the Columbian Exchange and the movement of people, plants, animals and diseases"],
    ["ny-g5-cultures", "adopt", "6.H.2.a; 6.C.1.d", "the cultures of the Americas and how people of many backgrounds shaped them"],
    ["ny-g5-governments", "adopt", "6.C.2.a; 6.C.2.b; 6.C.2.c", "governments of the Western Hemisphere and how they relate to their citizens"],
    ["ny-g5-economics", "adopt", "6.E.1.a; 6.E.1.b; 6.E.1.d", "economic systems, specialization and trade, and supply and demand in the Americas"],
    ["ny-g5-timeline", "adopt", "6.H.2.b", "putting the history of the Western Hemisphere in order"],
  ],
  "7/social": [
    ["ny-g6-eastern-hemisphere", "adopt", "7.G.1.a; 7.G.2.a", "the continents, regions, rivers and climates of the Eastern Hemisphere"],
    ["wa-g6-mesopotamia-egypt", "adopt", "7.H.2.b", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["ny-g6-classical-china-india", "adopt", "7.H.2.b; 7.H.2.d", "classical China and India and what they gave the world"],
    ["wa-g6-greece-rome", "adopt", "7.H.2.b; 7.C.2.a", "Greece and Rome and the governments that began there"],
    ["world-beliefs", "share", "7.H.2.c", "the origins and central teachings of major world religions"],
    ["ny-g6-mediterranean", "adopt", "7.H.2.a; 7.H.2.c", "Byzantium, the caliphates and the Crusades"],
    ["islamic-world", "adopt", "7.H.2.b; 7.H.2.d", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-african-kingdoms", "adopt", "7.H.2.b; 7.G.2.b", "the kingdoms of West Africa and the gold and salt trade"],
    ["ny-g6-mongols-travelers", "adopt", "7.G.2.a; 7.E.1.c", "the Mongol Empire and how trade and travelers spread goods and ideas"],
    ["medieval-europe", "adopt", "7.H.2.b; 7.C.2.a", "medieval Europe and feudalism"],
    ["renaissance-and-reformation", "adopt", "7.H.2.a", "the Renaissance and the Reformation and how new ideas spread"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "8.H.2.a; 8.H.2.e", "the colonists' grievances and the causes and course of the American Revolution"],
    ["or-g8-founding-ideas", "adopt", "8.C.1.e; 8.C.2.d", "the ideas behind the Declaration of Independence and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "8.C.2.b; 8.C.2.e", "the rights the Bill of Rights protects, and individual rights and the law"],
    ["ca-g8-industry-reform", "adopt", "8.H.2.d; 8.PF.1.c", "factories, workers and the reformers of the 1800s"],
    ["ca-g8-civil-war", "adopt", "8.H.2.e; 8.H.2.f", "the causes, course and effects of the Civil War"],
    ["or-g8-reconstruction", "adopt", "8.C.1.a; 8.H.2.e", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["maps-graphs-8", "adopt", "8.G.1.a; 8.G.1.e", "using maps, graphs and data to show change over time"],
    ["mb-evidence-8", "adopt", "8.H.1.a; 8.H.1.c", "analyzing primary and secondary sources and detecting bias in them"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "HS.C.2.a; HS.C.2.d", "the origins of government, the thinkers behind democracy and how democratic values are balanced"],
    ["ca-g9-civic-action", "adopt", "HS.C.1.b; HS.C.3.a", "ways citizens take part, from voting and elections to civic action"],
    ["ca-g9-media", "adopt", "HS.C.1.c; HS.C.1.d; HS.C.3.b", "the press, media and interest groups, and judging media for reliability"],
  ],
};
