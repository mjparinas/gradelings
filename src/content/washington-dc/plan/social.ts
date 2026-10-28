import type { Entry } from "../kit";

// Washington, DC social studies: the units the District uses from other frameworks, per grade ("<grade>/social"). The
// State Board of Education adopted new DC Social Studies Standards in June 2023, used in schools from 2024-25. Each
// standard is numbered within its grade or course, such as "3.20" (Grade 3, standard 20) or "WH1.1" (World History and
// Geography I, standard 1), and units cite them as printed. The grades follow OSSE's course themes: me and my community
// in Kindergarten, our community and city in Grade 1, people and places around the world in Grade 2, Washington, DC
// past and present in Grade 3, North America's first peoples and a new nation in Grade 4, the United States from
// expansion to the civil rights movement in Grade 5, world geography in Grade 6, United States history to 1877 in Grade
// 7, civics in action in Grade 8, and World History and Geography I (early humans to about 1600) in Grade 9.
//
// Only general units free of Canadian content and of other states' places are adopted (the US history and civics grades
// may name the states the history does), and never another state's units about its Tribes. The District's own units
// (its city and symbols, leaders and wards, world climates and ancient civilizations, DC's land, first peoples, history,
// culture and government, the first Americans, the Great Migration and civil rights, world geography, the capital to
// 1877, governing the District, protest and human rights, early humans and world heritage) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.3; K.17", "how each person is special, and how we change as we grow"],
    ["families", "share", "K.2; K.1", "different kinds of families, and the people in our communities"],
    ["needs-and-wants", "share", "K.24; K.26", "needs and wants, and making choices about what to buy"],
    ["places-near-me", "adopt", "K.19; K.20", "maps of familiar places, and where things are in our community"],
    ["fair-and-kind", "adopt", "K.5; K.18", "fair rules, and treating others with kindness and respect"],
    ["mb-k-jobs-and-rules", "adopt", "K.23; K.5", "jobs people do, and why we have rules"],
    ["or-k-money-and-work", "adopt", "K.25; K.23", "how people earn money, and the work people do"],
    ["ca-k-calendar", "adopt", "K.9", "putting days, months and events in order"],
    ["ca-k-good-citizens", "adopt", "K.7; K.8", "being a good member of the class community, and helping others"],
  ],
  "1/social": [
    ["maps", "share", "1.19; 1.21", "physical features on maps, and making a simple map"],
    ["our-land", "share", "1.23; 1.22", "how weather and land affect how people live, and how people change the landscape"],
    ["my-community", "share", "1.1; 1.7", "what makes a community, and how people in it help each other"],
    ["changes-in-my-life", "adopt", "1.25; 1.28", "long ago and not so long ago on a timeline, and comparing life then and now"],
    ["respect-and-inclusion", "adopt", "1.4; 1.5", "people with different beliefs and ways of life working together, and respecting each other's rights"],
    ["community-services", "adopt", "1.33; 1.7", "the goods and services communities need, and who provides them"],
    ["wa-g1-earn-save-share", "adopt", "1.32; 1.34", "how people earn income, and choices about saving and spending"],
    ["ca-g1-long-ago", "adopt", "1.28; 1.25", "comparing school and travel in the past and the present"],
  ],
  "2/social": [
    ["az-g2-continents-oceans", "adopt", "2.4", "the seven continents and five oceans, and major features around the world"],
    ["communities-compared", "adopt", "2.6; 2.7", "how people around the world live, and how they get food and water"],
    ["or-g2-world-maps", "adopt", "2.2; 2.4", "physical and political maps and their parts, and finding places in the world"],
  ],
  "3/social": [
    ["ny-g3-globes-and-maps", "adopt", "3.2", "using directions, scales, legends and globes to locate places"],
    ["ny-g3-culture", "adopt", "3.38; 3.37", "how groups keep their cultural heritage, and the contributions of immigrants"],
  ],
  "4/social": [
    ["ny-g5-early-civilizations", "adopt", "4.8; 4.10", "major civilizations of the early Americas, and the Aztec and Inca empires"],
    ["ca-g5-thirteen-colonies", "adopt", "4.30; 4.36", "the geography, cultures and economies of the Thirteen Colonies, and daily life in colonial society"],
    ["ca-g5-colonial-economy", "adopt", "4.30; 4.31", "the economies of the colonies, and enslaved people's experiences in the North and South"],
    ["ca-g5-road-to-revolution", "adopt", "4.37; 4.38; 4.39", "the events that led colonists to resist Britain, and the different sides people took"],
    ["ca-g5-revolution", "adopt", "4.40; 4.42", "the battles and leaders of the Revolution, and the ideals of the Declaration of Independence"],
    ["ca-g5-constitution", "adopt", "4.43; 4.44", "why the Constitution was written, and the compromises reached at the Convention"],
  ],
  "5/social": [
    ["ca-g5-westward", "adopt", "5.9; 5.16", "the causes and consequences of territorial expansion, and the people who moved west"],
    ["ca-g5-slavery-and-resistance", "adopt", "5.20; 5.26", "how enslaved people resisted, and the Underground Railroad"],
    ["ca-g8-civil-war", "adopt", "5.29; 5.32", "how arguments over slavery led to secession and war, and major battles of the Civil War"],
    ["or-g8-reconstruction", "adopt", "5.37; 5.38", "the 13th, 14th and 15th Amendments, and the political successes of Reconstruction"],
    ["ny-g8-city-immigrants", "adopt", "5.15", "the lived experiences of immigrant communities between 1850 and 1900"],
    ["ny-g8-roaring-twenties", "adopt", "5.43; 5.42", "the art, music and culture of the 1920s, and the changes the Great Migration brought"],
    ["ny-g8-world-war-ii", "adopt", "5.44; 5.45", "the causes of World War II, and major events such as Pearl Harbor and D-Day"],
    ["ny-g8-civil-rights", "adopt", "5.53; 5.54", "key moments and figures in the fight for equality and voting rights, and movements it inspired"],
  ],
  "6/social": [
    ["ga-g7-africa", "adopt", "6.8; 6.9", "maps of Africa's environments, and its regions"],
    ["ga-g7-southwest-asia", "adopt", "6.20; 6.24", "maps of southwest Asia's environments, and how they shape its economies"],
    ["ga-g7-southern-eastern-asia", "adopt", "6.21; 6.25", "the regions of South and East Asia, and the growth of its cities"],
    ["ga-g6-latin-america", "adopt", "6.32; 6.33", "maps of South America and the Caribbean, and their regions"],
    ["ga-g6-europe", "adopt", "6.42; 6.43", "maps of Europe's environments, and its regions"],
    ["ga-g6-australia", "adopt", "6.56; 6.57", "maps of Oceania's environments, and its regions"],
    ["ga-g7-population", "adopt", "6.27; 6.52", "the reasons for and effects of migration, and where people live"],
  ],
  "7/social": [
    ["ca-g7-aztec-inca", "adopt", "7.5; 7.7", "the innovations and governments of Indigenous societies of the Americas before 1500"],
    ["or-g5-encounters", "adopt", "7.10; 7.12", "the causes and consequences of European colonization, and its impact on Indigenous nations"],
    ["ca-g8-revolutionary-ideas", "adopt", "7.26; 7.27", "the ideas behind the American Revolution, and the Declaration of Independence"],
    ["wa-g5-revolution", "adopt", "7.30; 7.31", "the course of the war for independence, and the people who took part"],
    ["ca-g8-early-republic", "adopt", "7.44; 7.47", "the early political parties, and changes in the Jacksonian era"],
    ["ca-g8-westward", "adopt", "7.48; 7.49", "perspectives on territorial expansion, and how the United States acquired territory"],
    ["wa-g8-civil-war", "adopt", "7.64; 7.66", "the reasons for the Civil War, and the Union and Confederate approaches to it"],
    ["wa-g8-reconstruction", "adopt", "7.71; 7.72", "the 13th, 14th and 15th Amendments, and the different approaches to Reconstruction"],
    ["ca-g8-freedom-and-change", "adopt", "7.58; 7.61", "the abolitionist movement, and the struggle for women's rights"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8.2; 8.4", "the documents that shape constitutional democracy, and the influences on American government"],
    ["wa-g8-bill-of-rights", "adopt", "8.41; 8.36", "the Bill of Rights and later amendments, and debates about applying them"],
    ["ca-g8-constitution-at-work", "adopt", "8.10; 8.11", "the structures and functions of the three branches, and how a bill becomes a law"],
    ["ca-g9-supreme-court", "adopt", "8.37; 8.15", "historic Supreme Court cases on individual rights, and the role of the courts"],
    ["az-g8-citizens-and-society", "adopt", "8.46; 8.16", "how individuals and groups influence policy, and the ways people take part"],
    ["az-g8-personal-finance", "adopt", "8.17; 8.32", "personal savings and economic resilience, and making informed consumer decisions"],
    ["ca-g9-media", "adopt", "8.24; 8.28", "judging digital sources by reading laterally, and comparing news accounts"],
    ["ca-g9-civic-action", "adopt", "8.62; 8.33", "planning action on an issue, and using technology for civic engagement"],
  ],
  "9/social": [
    ["where-civilizations-grew", "adopt", "WH1.13; WH1.14", "the geography that encouraged complex societies, and the landforms and rivers they grew beside"],
    ["first-farmers", "adopt", "WH1.8; WH1.12", "foraging and farming, and the evidence for early domestication"],
    ["wa-g6-mesopotamia-egypt", "adopt", "WH1.15; WH1.16", "the innovations of early complex societies, and the first cities"],
    ["ca-g6-greece-rome", "adopt", "WH1.24; WH1.26", "how ancient Greece and Rome were governed"],
    ["ny-g6-classical-china-india", "adopt", "WH1.23; WH1.25", "the empires of classical China and India, and their lasting achievements"],
    ["world-beliefs", "adopt", "WH1.22; WH1.17", "the belief systems of ancient empires and how they spread, and how they shaped states"],
    ["trade-networks", "adopt", "WH1.30; WH1.38", "trade networks across Afro-Eurasia, and the routes that linked them"],
    ["ca-g7-rome-byzantium", "adopt", "WH1.32; WH1.34", "the decline of Rome, and the empire that followed it"],
    ["or-g7-african-kingdoms", "adopt", "WH1.37; WH1.36", "how geography shaped Africa's kingdoms, and the role of belief in governing them"],
    ["ca-g7-arabia-islam", "adopt", "WH1.40; WH1.37", "the spread of Islam and cultural diffusion, and new centers of learning and trade"],
    ["medieval-europe", "adopt", "WH1.35; WH1.36", "changes after Rome's fall in Europe, and the role of religion in society"],
    ["ca-g7-imperial-china", "adopt", "WH1.41; WH1.34", "innovations from Asia, and the dynasties of imperial China"],
    ["ny-g9-ottoman-ming", "adopt", "WH1.43; WH1.44", "the rise of powerful early modern empires, and how rulers consolidated power"],
  ],
};
