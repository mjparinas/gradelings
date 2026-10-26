import type { Entry } from "../kit";

// New Mexico social studies: the units New Mexico uses from other frameworks, per grade ("<grade>/social"). The New
// Mexico Social Studies Standards (6.29.11 NMAC, adopted 2022) number each standard within its grade: "4.12" in
// Kindergarten to Grade 8, and "9-12.Civ.23" or "9-12.Econ.47" in the high school strands (Civics, Economics,
// Geography, New Mexico History, US History, World History and Ethnic, Cultural and Identity Studies). Each grade has a
// theme: kindergarten and Grade 1 build community, Grade 2 is national identity, Grade 3 is global immigration and
// migration, Grade 4 is New Mexico history and geography, Grade 5 is United States history and government, Grade 6 is
// world history to about 1300, Grade 7 is New Mexico history, and Grade 8 is United States history to 1920. Grade 9 here
// is the high school Civics and Economics strands, with personal finance.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. New Mexico's own units (its symbols, migration, money and voting, New Mexico history and geography,
// the Eastern Woodland, New Mexico history in Grade 7, New Mexico in the nation and governing New Mexico) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.13; K.24", "sequencing important events in a child's life, and exploring their personal history"],
    ["families", "share", "K.14; K.11", "how people are similar and different, and comparing traditions over time"],
    ["needs-and-wants", "share", "K.15; K.17", "telling needs from wants, and how scarcity affects goods and services"],
    ["places-near-me", "adopt", "K.18; K.21", "maps of familiar places, and how and why people move around the community"],
    ["fair-and-kind", "adopt", "K.6; K.7", "the purpose of rules, and how rules help us work together"],
    ["mb-k-jobs-and-rules", "adopt", "K.8; K.9", "what happens when rules are followed or not, and authority figures and their roles"],
    ["or-k-money-and-work", "adopt", "K.16; K.26", "goods and services, and the money choices people make"],
    ["ca-k-calendar", "adopt", "K.11; K.13", "traditions and celebrations through the year, and putting events in order"],
    ["ca-k-good-citizens", "adopt", "K.4; K.7", "acting to help with problems, and how rules help us work together"],
  ],
  "1/social": [
    ["maps", "share", "1.16; 1.17", "making simple maps of familiar places, and common map symbols"],
    ["our-land", "share", "1.18; 1.20", "landforms and bodies of water on maps, and how people interact with the environment"],
    ["my-community", "share", "1.7; 1.8", "the important roles people play, and how people work together on a common task"],
    ["changes-in-my-life", "adopt", "1.11", "past, present and future in a child's own life"],
    ["respect-and-inclusion", "adopt", "1.12; 1.21", "cultural differences in the community, and how groups live in their own ways"],
    ["community-services", "adopt", "1.7", "the people and services that help the community"],
    ["wa-g1-earn-save-share", "adopt", "1.15; 1.24", "spending and saving, and earning money to buy goods and services"],
    ["ca-g1-long-ago", "adopt", "1.11; 1.13", "life long ago and today, and significant events, people and observances"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "2.9; 2.11", "how diverse individuals helped shape the nation, and qualities of leadership"],
    ["mb-working-together", "adopt", "2.12", "how people from diverse groups worked together"],
    ["ca-g2-work-and-money", "adopt", "2.25; 2.29", "how people use and conserve natural resources, and jobs in the community"],
    ["communities-compared", "adopt", "2.13; 2.22", "comparing communities and their customs, and comparing two regions of the country"],
    ["ny-g1-american-symbols", "adopt", "2.9", "the symbols and people that make up the national identity"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.22; 3.29", "how geography shapes where people settle, and the ways people earn a living"],
    ["or-g2-world-maps", "adopt", "3.23; 3.24", "maps of the world, and how the characteristics of world regions affect people"],
    ["or-g5-history-detective", "adopt", "3.3; 3.4", "judging the credibility of sources, and citing evidence"],
    ["ny-g3-globes-and-maps", "adopt", "3.23", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "3.27; 3.10", "comparing cultural identities, and how migration affects people, culture and ideas"],
    ["az-g2-continents-oceans", "adopt", "3.24", "the continents and oceans, and how world regions affect the people who live there"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "4.3; 4.24", "citing evidence from sources, and why people in the same period saw things differently"],
    ["or-g5-earn-and-save", "adopt", "4.27; 4.28", "what banks do, and what checking and savings accounts are for"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "5.19; 5.21", "scarcity and exchange in the Western Hemisphere, and comparing resources across countries"],
    ["wa-g5-thirteen-colonies", "adopt", "5.16; 5.18", "the sequence of colonial events, and people's perspectives in their time"],
    ["ca-g5-colonial-economy", "adopt", "5.12; 5.19", "inequity in early American history, including slavery, and the colonial economies"],
    ["ca-g5-road-to-revolution", "adopt", "5.14", "the causes of the American Revolution and the roles of individuals and groups"],
    ["ca-g5-revolution", "adopt", "5.14; 5.10", "the war for independence, and the founding principle of liberty"],
    ["wa-g5-constitution", "adopt", "5.8; 5.9", "the three branches of government, and how people shaped the founding documents"],
    ["or-g5-timeline", "adopt", "5.16", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "6.29; 6.23", "how farming changed where people lived, and early technology"],
    ["where-civilizations-grew", "adopt", "6.24; 6.26", "the river valleys where the first civilizations grew, and maps of early civilizations"],
    ["world-beliefs", "adopt", "6.41; 6.39", "the belief systems of early civilizations and how they spread"],
    ["trade-networks", "adopt", "6.45; 6.46", "trade between civilizations, and the spread of goods and ideas"],
    ["wa-g6-time-sources", "adopt", "6.1; 6.2", "dating the past, and how historians gather and check sources"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.26; 6.22", "the first civilizations in Mesopotamia and Egypt"],
    ["wa-g6-greece-rome", "adopt", "6.31; 6.34", "the governments and laws of ancient Greece and Rome, and their gifts to the modern world"],
    ["ny-g6-classical-china-india", "adopt", "6.30; 6.34", "the achievements and belief systems of classical India and China"],
    ["or-g7-african-kingdoms", "adopt", "6.46; 6.43", "the trading kingdoms of Africa and how trade built their economies"],
  ],
  "7/social": [
    ["ny-g5-cultures", "adopt", "7.20; 7.36", "how groups keep their cultural heritage, and the link between heritage and identity"],
    ["ny-g5-governments", "adopt", "7.38", "comparing government systems around the world with the US federal system"],
    ["maps-graphs-8", "adopt", "7.18; 7.19", "using maps, charts and graphs to explain places and how environment shapes human activity"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8.55; 8.58", "the Articles of Confederation and the Constitution, and the Enlightenment ideas behind them"],
    ["wa-g8-bill-of-rights", "adopt", "8.57; 8.63", "the Bill of Rights, and civil rights and civil liberties"],
    ["maps-graphs-8", "adopt", "8.27; 8.29", "the five themes of geography, and defining regions by their human and physical characteristics"],
    ["mb-evidence-8", "adopt", "8.4; 8.10", "evaluating sources for bias and perspective, and conflicting points of view"],
    ["ca-g8-industry-reform", "adopt", "8.98; 8.90", "growing cities and industry, and reform movements for civil rights and liberties"],
    ["ca-g8-civil-war", "adopt", "8.76; 8.77", "the economic differences between North and South, and how slavery led to war"],
    ["or-g8-reconstruction", "adopt", "8.89; 8.93", "the laws and court decisions that kept inequality in place, and the changes after the Civil War and Reconstruction"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "9-12.Civ.23; 9-12.Civ.35", "the US Constitution and its founding principles, and the founding documents' impact on national unity"],
    ["ca-g9-civic-action", "adopt", "9-12.Civ.47; 9-12.Civ.49", "how active citizens can make change, and taking informed action"],
    ["ca-g9-media", "adopt", "9-12.Civ.42; 9-12.Civ.43", "evaluating sources meant to inform the public, and bias in the media"],
  ],
};
