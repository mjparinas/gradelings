import type { Entry } from "../kit";

// Maryland social studies: the units Maryland uses from other frameworks, per grade ("<grade>/social"). MSDE's Social
// Studies Standards and Frameworks are cited by code. Kindergarten to Grade 3 have civics, geography, economics and
// history standards ("C.1", "G.2", "E.3", "H.1", with indicators such as "C.1.a"); Grade 3 is about Maryland. Grades 4,
// 5 and 8 are United States history in units named by their own codes: Grade 4 Worlds Collide, Colonization and the
// Revolution ("WC.1", "RC.4", "AR.3"), Grade 5 the government, the Civil War and civil rights ("AG.1", "CN.1",
// "CA.4"), Grade 8 colonial America to the Gilded Age ("CL.1", "FN.2", "GE.2", "CW.3", "GI.1"). Grades 6 and 7 share the
// 2025 framework of eight geographic themes ("6/7.2.1", "6/7.7.2"); this app teaches the ancient world, religions and
// early trade in Grade 6 and the world from about 600 to 1900 in Grade 7. Grade 9 is American Government, the high
// school course Maryland tests ("SOG.2", "LB.1", "JB.2", "EP.3"). Only general units free of Canadian content are
// adopted, and never another state's units about its Tribes. Maryland's own units (its symbols, economy, land, history
// and government) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "H.1", "putting events of a child's own life in order: past, present and future"],
    ["families", "share", "H.2", "families, their traditions, and life long ago compared with today"],
    ["needs-and-wants", "share", "E.1; E.2", "why people can't have everything they want, and making choices"],
    ["places-near-me", "adopt", "G.1; G.2", "places near home and school, maps and pictures, and how people change and protect their surroundings"],
    ["fair-and-kind", "adopt", "C.2; C.3", "classroom rules, compromise and settling conflicts peacefully"],
    ["mb-k-jobs-and-rules", "adopt", "C.3; E.4", "community workers and their jobs, and why school has rules"],
    ["or-k-money-and-work", "adopt", "E.3; G.3", "trading money for goods and services, and how goods move from place to place"],
    ["ca-k-calendar", "adopt", "H.1", "days, weeks and months, and using before and after to put events in order"],
    ["ca-k-good-citizens", "adopt", "C.1; C.2", "freedom, fairness and taking part in classroom decisions"],
  ],
  "1/social": [
    ["maps", "share", "G.1", "making and reading simple maps of the neighborhood"],
    ["our-land", "share", "G.2", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "C.1; C.3", "how people in a community work together and share goals"],
    ["changes-in-my-life", "adopt", "H.1", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "C.1; C.2", "fair rules, leaders and the people and groups who make a community"],
    ["community-services", "adopt", "E.2; G.3", "goods and services in a community, and the jobs people do"],
    ["wa-g1-earn-save-share", "adopt", "E.3; E.4", "earning, spending, saving and sharing, trade-offs, and borrowing and lending"],
    ["ca-g1-long-ago", "adopt", "H.2", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "E.2", "how scarcity makes consumers choose between needs and wants"],
    ["then-and-now", "adopt", "H.1; H.2", "how the local community has changed over time, from sources about then and now"],
    ["communities-compared", "adopt", "G.2; G.3", "comparing the land, jobs and ways of life of different communities"],
    ["ns-community-change-2", "adopt", "H.1", "key events in a community's history and how it has changed"],
    ["mb-working-together", "adopt", "C.1; C.4", "how people in a community work together for the common good"],
    ["ca-g2-citizens-and-leaders", "adopt", "C.2; C.3", "what governments and leaders do, voting, and the symbols of the nation"],
    ["ca-g2-work-and-money", "adopt", "E.1; E.3", "producers, earning money, and saving or spending it"],
    ["or-g2-world-maps", "adopt", "G.1", "using maps and globes to find continents, oceans and countries"],
  ],
  "3/social": [
    ["meeting-needs", "share", "E.1; E.3", "how people in different places use resources and climate to decide what to produce"],
    ["mb-global-communities", "adopt", "H.1", "comparing how societies in different parts of the world shape and are shaped by their environment"],
    ["mb-working-together", "adopt", "C.1; C.3", "how groups and governments work together to improve communities"],
  ],
  "4/social": [
    ["ny-g5-columbian-exchange", "adopt", "WC.3", "the plants, animals, people and diseases that crossed the Atlantic, and their effects on different groups"],
    ["ca-g5-thirteen-colonies", "adopt", "RC.1; RC.2", "why the colonies were founded and how geography shaped culture and work in each region"],
    ["ca-g5-colonial-economy", "adopt", "RC.2", "how colonial producers, workers and trade specialized and traded"],
    ["ca-g5-road-to-revolution", "adopt", "AR.1", "the British policies and colonial protests that led toward independence"],
    ["ca-g5-revolution", "adopt", "AR.2; AR.4", "the Declaration of Independence, the war and the new American government"],
  ],
  "5/social": [
    ["wa-g5-constitution", "adopt", "AG.1", "how the Constitution divides power among the branches and between the nation and the states"],
    ["wa-g8-bill-of-rights", "adopt", "AG.2", "the rights the Bill of Rights and later amendments protect, and their limits"],
    ["wa-g8-civil-war", "adopt", "CN.1; CN.2", "how the conflict over slavery led to secession and war, and the war's key events and people"],
    ["or-g8-reconstruction", "adopt", "CN.2", "Reconstruction and the amendments that ended slavery and promised equal rights"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "6/7.1.1", "studying the past with geographic tools and sources, and counting time in BCE and CE"],
    ["first-farmers", "adopt", "6/7.2.1", "early people, and how farming led to settled villages"],
    ["where-civilizations-grew", "adopt", "6/7.2.1; 6/7.1.1", "how rivers and land shaped where the first complex societies grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6/7.2.1; 6/7.3.1", "Mesopotamia and Egypt: rivers, farming, laws and early governments"],
    ["wa-g6-india-china", "adopt", "6/7.3.1; 6/7.4.1", "ancient India and China, their governments and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "6/7.3.1", "democracy in Athens, the Roman Republic and other early political structures"],
    ["world-beliefs", "adopt", "6/7.4.1", "the origins and spread of major world religions"],
    ["trade-networks", "adopt", "6/7.6.1", "how control of resources led to trade that spread goods and ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "6/7.3.2; 6/7.4.2", "medieval Europe, the Church's power, feudalism and the Black Death"],
    ["islamic-world", "adopt", "6/7.5.1", "the expansion of Islam, its cities and trade, and the exchange of ideas"],
    ["or-g7-asian-empires", "adopt", "6/7.5.2; 6/7.7.2", "the empires of Asia, the Mongol Empire, and feudal Japan"],
    ["or-g7-african-kingdoms", "adopt", "6/7.6.1", "the kingdoms of West Africa and the trans-Saharan trade in salt and gold"],
    ["ca-g7-aztec-inca", "adopt", "6/7.7.1", "the Maya, Aztec and Inca: geography, social structure and decline"],
    ["renaissance-and-reformation", "adopt", "6/7.4.1", "the Renaissance and the Reformation and how new ideas and beliefs spread"],
    ["or-g7-age-of-revolutions", "adopt", "6/7.3.3; 6/7.4.3", "Enlightenment ideas and the democratic revolutions they inspired"],
    ["or-g7-world-timeline", "adopt", "6/7.1.1", "putting major events in world history from 600 to 1900 in order and linking causes and effects"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "AR.2; AR.3", "the ideas behind the Revolution and why the Americans won"],
    ["or-g8-founding-ideas", "adopt", "FN.1; FN.2", "why the Articles of Confederation failed and the ideas behind the Constitution"],
    ["ca-g8-constitution-at-work", "adopt", "FN.3; NN.1", "how the Constitution structures the government and how the early government put it to work"],
    ["wa-g8-bill-of-rights", "adopt", "FN.4", "how the Bill of Rights answered the fears raised during ratification"],
    ["ca-g8-industry-reform", "adopt", "GE.1; GE.4", "factories, canals and railroads, immigration and the reformers of the 1800s"],
    ["wa-g8-civil-war", "adopt", "GE.6; CW.1; CW.2", "the causes of the Civil War, and its key events, people and outcome"],
    ["or-g8-reconstruction", "adopt", "CW.3; CW.4", "Reconstruction, its goals and the amendments that promised equal rights"],
    ["maps-graphs-8", "adopt", "CL.2", "using maps, graphs and data to show how geography and economics shaped regions"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SOG.1; SOG.2", "types of government and the roots and principles of the Constitution"],
    ["ca-g9-civic-action", "adopt", "LB.2; DP.1", "how individuals and groups take part and push for changes in policy"],
    ["ca-g9-media", "adopt", "DP.1; LB.3", "how the media, parties and interest groups shape public opinion and policy"],
  ],
};
