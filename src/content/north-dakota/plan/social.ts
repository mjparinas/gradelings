import type { Entry } from "../kit";

// North Dakota social studies: the units North Dakota uses from other frameworks, per grade ("<grade>/social"). The North
// Dakota Social Studies Content Standards (2019, published on the Department's CASE server) are written for grade bands,
// not single grades: Kindergarten to Grade 2 ("C.K_2.4"), Grades 3 to 5 ("H.3_5.10") and Grades 6 to 12, where each
// standard has benchmarks ("ND.6_12.4.1", "C.6_12.2.3") and the history strands are split into eras ("US.6_12.1-6.E2.3",
// "WH.6_12.1-6.E1.2"). The Department's scope and sequence sets the theme of each grade: kindergarten is my family, Grade 1
// my school, Grade 2 my community, Grade 3 communities and the nation's regions, Grade 4 North Dakota studies, Grade 5
// exploration and the colonies to the new nation, Grade 6 world history to the Renaissance, Grade 7 world geography,
// Grade 8 North Dakota studies and United States history to Reconstruction, and Grade 9 here is the high school
// government and civics course. North Dakota law (NDCC 15.1-21-01) requires North Dakota studies in Grade 4 and Grade 8.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. North Dakota's own units (its flag and symbols, then and now, North Dakota communities, city
// government, the Midwest, the nine Grade 4 North Dakota units, the explorers, the Grade 8 North Dakota studies units, and
// governing North Dakota and personal finance in Grade 9) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "H.K_2.4; C.K_2.6", "changes over time in a child's own life, and rights and responsibilities"],
    ["families", "share", "H.K_2.1; C.K_2.6", "families now and long ago, and the responsibilities of family members"],
    ["needs-and-wants", "share", "E.K_2.3", "consumer decisions and the difference between needs and wants"],
    ["places-near-me", "adopt", "G.K_2.1", "simple maps of places near home and school, with symbols and labels"],
    ["fair-and-kind", "adopt", "C.K_2.1; C.K_2.6", "why we have rules, and the rights and responsibilities of classmates"],
    ["mb-k-jobs-and-rules", "adopt", "C.K_2.1; E.K_2.4", "rules and the people in charge, and how community helpers help others"],
    ["or-k-money-and-work", "adopt", "E.K_2.1; E.K_2.5", "how people earn money and pay for goods and services"],
    ["ca-k-calendar", "adopt", "H.K_2.2", "days, months and national holidays through the year"],
    ["ca-k-good-citizens", "adopt", "C.K_2.5; C.K_2.6", "taking part in decisions, and being a good citizen"],
  ],
  "1/social": [
    ["maps", "share", "G.K_2.1", "reading and making simple maps with symbols, labels and legends"],
    ["our-land", "share", "G.K_2.2", "how the land and water near home affect people, and how people affect them"],
    ["my-community", "share", "E.K_2.4; C.K_2.3", "community helpers, and the services a community provides"],
    ["changes-in-my-life", "adopt", "H.K_2.4", "putting events in order and describing changes over time"],
    ["respect-and-inclusion", "adopt", "C.K_2.6", "fairness, respect and the responsibilities of a good classmate"],
    ["community-services", "adopt", "C.K_2.3", "services the local government provides and how they help people"],
    ["wa-g1-earn-save-share", "adopt", "E.K_2.5", "how people earn income and save money"],
    ["ca-g1-long-ago", "adopt", "H.K_2.1", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["ny-g3-globes-and-maps", "adopt", "G.K_2.1", "maps and globes, with symbols, labels and legends"],
    ["az-g2-continents-oceans", "adopt", "G.K_2.1", "the continents and oceans on a map and a globe"],
    ["or-g2-world-maps", "adopt", "G.K_2.1", "reading world maps with symbols, labels and legends"],
    ["communities-compared", "adopt", "G.K_2.2", "how the land shapes communities, and how people change the land"],
    ["ny-g3-culture", "adopt", "H.K_2.1", "how people's ways of life and points of view differ"],
    ["ny-g3-world-communities", "adopt", "G.K_2.2; H.K_2.3", "communities around the world, their land and their news"],
    ["ca-g2-work-and-money", "adopt", "E.K_2.2; E.K_2.5", "producers and consumers, and earning and saving money"],
    ["ca-g2-citizens-and-leaders", "adopt", "H.K_2.5; C.K_2.5", "people who made changes, and how citizens take part in decisions"],
  ],
  "3/social": [
    ["meeting-needs", "share", "E.3_5.1; E.3_5.2", "needs, wants and resources, and how goods and services are produced"],
    ["or-g5-history-detective", "adopt", "H.3_5.2; H.3_5.7", "how a writer's point of view shapes history, and causes and effects found in sources"],
    ["ny-g3-globes-and-maps", "adopt", "G.3_5.1; G.3_5.2", "maps, globes and other geographic tools"],
    ["ga-g3-us-map", "adopt", "G.3_5.3", "the states, rivers and landforms of the United States on a map"],
    ["fl-g3-us-regions", "adopt", "G.3_5.6; E.3_5.6", "the regions of the United States and their economies"],
    ["ny-g3-governments-rights", "adopt", "C.3_5.2; C.3_5.4; C.3_5.6", "how government is structured, the principles of American government, and personal and civic responsibilities"],
  ],
  "4/social": [
    ["fl-g4-earning-income", "adopt", "E.3_5.1; E.3_5.3", "jobs and income, and the choices behind saving and spending"],
    ["or-g5-history-detective", "adopt", "H.3_5.2", "how people's points of view shape the history they write"],
  ],
  "5/social": [
    ["wa-g5-us-geography", "adopt", "G.3_5.1; G.3_5.6", "maps of the regions, states, rivers and mountains of the United States"],
    ["ny-g5-columbian-exchange", "adopt", "H.3_5.7; H.3_5.1", "the causes and effects of European contact with the Americas, from more than one point of view"],
    ["wa-g5-thirteen-colonies", "adopt", "G.3_5.8", "patterns of settlement in the thirteen colonies"],
    ["ca-g5-colonial-economy", "adopt", "E.3_5.2; E.3_5.7", "how the colonies produced and traded goods, and how resources shaped their economies"],
    ["ca-g5-slavery-and-resistance", "adopt", "H.3_5.1; H.3_5.2", "slavery in the colonies and resistance to it, from the points of view of the people who lived it"],
    ["ca-g5-road-to-revolution", "adopt", "H.3_5.7", "the causes and effects that led to the American Revolution"],
    ["ca-g5-revolution", "adopt", "H.3_5.8; H.3_5.1", "the people who shaped the American Revolution, and their points of view"],
    ["wa-g5-constitution", "adopt", "C.3_5.2; C.3_5.4", "the Constitution and Bill of Rights, and the principles of American government"],
    ["or-g5-timeline", "adopt", "H.3_5.7", "the events from the colonies to the Constitution, in order"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "WH.6_12.5", "primary and secondary sources, and dating events in the past"],
    ["first-farmers", "adopt", "WH.6_12.1-6.E1.3", "how farming changed people's lives"],
    ["where-civilizations-grew", "adopt", "WH.6_12.1-6.E1.1; G.6_12.2.2", "the first civilizations, and why people settled in river valleys"],
    ["wa-g6-mesopotamia-egypt", "adopt", "WH.6_12.1-6.E1.1; WH.6_12.1-6.E1.2", "the achievements and beliefs of Mesopotamia and Egypt"],
    ["wa-g6-greece-rome", "adopt", "WH.6_12.1-6.E1.4", "the political systems of Greece and Rome, and their connection to today"],
    ["ny-g6-classical-china-india", "adopt", "WH.6_12.1-6.E1.1; WH.6_12.1-6.E1.2", "the achievements and belief systems of classical China and India"],
    ["world-beliefs", "adopt", "WH.6_12.1-6.E1.2; WH.6_12.2", "the belief systems of early civilizations and how religions spread"],
    ["medieval-europe", "adopt", "WH.6_12.1-6.E2.1; WH.6_12.1-6.E2.2", "medieval social structures, and the Church and kings in medieval Europe"],
    ["islamic-world", "adopt", "WH.6_12.1-6.E2.3", "the Islamic world and its contact with Europe and other civilizations"],
    ["trade-networks", "adopt", "WH.6_12.1-6.E2.3; E.6_12.6.1", "the trade routes that connected Europe, Africa and Asia"],
    ["or-g7-african-kingdoms", "adopt", "WH.6_12.1-6.E2.3", "the kingdoms of Africa and their trade with other civilizations"],
    ["renaissance-and-reformation", "adopt", "WH.6_12.1-6.E2.3; WH.6_12.1-6.E3.1", "the Renaissance, and the religious division of the Reformation"],
  ],
  "7/social": [
    ["or-g6-world-maps", "adopt", "G.6_12.4; G.6_12.4.1", "geographic tools for studying the world at global, regional and local scales"],
    ["ny-g6-eastern-hemisphere", "adopt", "G.6_12.1.4; G.6_12.1.2", "the physical and human characteristics of places, and their climates"],
    ["ga-g6-latin-america", "adopt", "G.6_12.3.2", "the physical and human characteristics of Latin America"],
    ["ga-g6-europe", "adopt", "G.6_12.3.2; G.6_12.3.1", "the land, countries and cultures of Europe"],
    ["ga-g7-africa", "adopt", "G.6_12.3.2; G.6_12.5.1", "the land and people of Africa, and how people change their environment"],
    ["ga-g7-southwest-asia", "adopt", "G.6_12.3.2; G.6_12.1.3", "the land and people of Southwest Asia, and its raw materials"],
    ["ga-g7-southern-eastern-asia", "adopt", "G.6_12.3.2; G.6_12.1.5", "the land and people of southern and eastern Asia, and natural disasters"],
    ["ga-g7-population", "adopt", "G.6_12.2.2; G.6_12.2.3", "patterns of settlement, and the causes and effects of migration"],
    ["ga-g7-economies", "adopt", "E.6_12.2.1; E.6_12.6.1", "command and market economies, and how trade connects countries"],
    ["trade-networks", "share", "G.6_12.2.1; E.6_12.6.1", "how goods, ideas and people move around the world"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "US.6_12.1-6.E1.1", "the causes and consequences of the American Revolution"],
    ["or-g8-founding-ideas", "adopt", "US.6_12.1-6.E1.2; C.6_12.1.3", "the founding documents and the early government of the United States"],
    ["wa-g8-bill-of-rights", "adopt", "US.6_12.1-6.E1.2; C.6_12.3.1", "the Bill of Rights and how its amendments apply today"],
    ["ca-g8-constitution-at-work", "adopt", "US.6_12.1-6.E1.2; C.6_12.2.3", "the structure and principles of the Constitution"],
    ["ca-g8-early-republic", "adopt", "US.6_12.1-6.E1.3; US.6_12.1-6.E1.4", "society and the decisions of the early United States government"],
    ["ca-g8-westward", "adopt", "US.6_12.1-6.E2.3", "how westward expansion changed the United States"],
    ["ca-g8-civil-war", "adopt", "US.6_12.1-6.E2.2; US.6_12.1-6.E2.5", "the sectional divide, and the causes and effects of the Civil War"],
    ["or-g8-reconstruction", "adopt", "US.6_12.1-6.E2.6", "the effects of Reconstruction"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "C.6_12.1.1; C.6_12.1.2; C.6_12.1.3", "political philosophers, British and colonial history, and the founding documents"],
    ["ca-g9-forms-of-government", "adopt", "C.6_12.2.1", "forms and origins of government"],
    ["ca-g9-rights", "adopt", "C.6_12.3.1", "the amendments to the Constitution and the rights they protect"],
    ["ca-g9-three-branches", "adopt", "C.6_12.2.3", "the structure and principles of the Constitution: the three branches"],
    ["ca-g9-lawmaking", "adopt", "C.6_12.2.2; C.6_12.4.1", "how Congress makes laws, and how citizens can influence them"],
    ["ca-g9-supreme-court", "adopt", "C.6_12.3.2", "court cases and the rights and liberties of individuals"],
    ["ca-g9-citizens-and-society", "adopt", "C.6_12.4.2; C.6_12.4.3", "becoming a citizen, and citizens' personal and civic responsibilities"],
    ["ca-g9-elections", "adopt", "C.6_12.4.1; C.6_12.4.5", "elections and how citizens take part in them"],
    ["ca-g9-civic-action", "adopt", "C.6_12.4.1; C.6_12.4.5", "how citizens influence government and take part in civic life"],
    ["ca-g9-media", "adopt", "C.6_12.4.4", "bias in media sources"],
    ["az-g8-supply-demand", "adopt", "E.6_12.3.1; E.6_12.3.3", "the law of supply and demand and its effect on prices"],
  ],
};
