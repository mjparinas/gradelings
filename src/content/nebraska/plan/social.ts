import type { Entry } from "../kit";

// Nebraska social studies: the units Nebraska uses from other frameworks, per grade ("<grade>/social"). The Nebraska
// Social Studies Standards (2019) have four strands, 1 civics, 2 economics, 3 geography and 4 history, and units cite
// the indicators as printed, such as "SS 4.1.1.c" (grade 4, civics, standard 1, indicator c) and "SS HS.2.5.b" for
// high school. Each grade has a theme: Kindergarten Myself and Others, Grade 1 Families, Grade 2 Neighborhood, Grade 3
// Communities Near and Far, Grade 4 Nebraska Studies, Grade 5 U.S. Studies (the Pre-Columbian era through the
// Constitution), Grade 6 World Studies I (ancient civilizations), Grade 7 World Studies II (post-classical societies,
// region by region), Grade 8 United States History (the Constitution through the Gilded Age), and Grade 9 the high
// school civics and economics standards.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Nebraska's own units (its symbols, local government, family journeys, migration to Nebraska,
// Nebraska Studies with its Native nations, trails and statehood, economy and Unicameral, the regions of the U.S.,
// Nebraska and the nation, and governing Nebraska) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS K.4.1.b; SS K.4.4.a", "the sequence of personal events, and questions about a child's own history"],
    ["families", "share", "SS K.1.1.b", "roles in a family and why they matter"],
    ["needs-and-wants", "share", "SS K.2.1.a", "sorting wants and needs, and the choices that follow"],
    ["places-near-me", "adopt", "SS K.3.1.a; SS K.3.1.b", "describing where people and things are, and finding places at school"],
    ["fair-and-kind", "adopt", "SS K.1.1.a; SS K.1.2.a", "rules and their purpose, and citizenship skills such as respect and honesty"],
    ["mb-k-jobs-and-rules", "adopt", "SS K.1.1.a", "rules at home and school and why we have them"],
    ["or-k-money-and-work", "adopt", "SS K.2.2.a", "the purposes of money"],
    ["ca-k-calendar", "adopt", "SS K.4.1.a", "yesterday, today and tomorrow, and putting days and events in order"],
    ["ca-k-good-citizens", "adopt", "SS K.1.2.a", "citizenship skills such as respect, courtesy and honesty"],
  ],
  "1/social": [
    ["maps", "share", "SS 1.3.1.a; SS 1.3.1.c", "the four cardinal directions, and making and using simple maps"],
    ["our-land", "share", "SS 1.3.2.a; SS 1.3.3.b", "physical features on maps and in the world, and Earth's natural resources"],
    ["my-community", "share", "SS 1.1.1.b; SS 1.2.3.a", "community leaders and their roles, and the resources used to make goods and services"],
    ["changes-in-my-life", "adopt", "SS 1.4.1.a; SS 1.4.1.b", "life events over time, and family life long ago and today"],
    ["respect-and-inclusion", "adopt", "SS 1.3.4.b; SS 1.4.2.a", "the cultures of individuals, and family traditions across cultures"],
    ["community-services", "adopt", "SS 1.1.1.b", "leaders in the school and community and why their roles matter"],
    ["wa-g1-earn-save-share", "adopt", "SS 1.2.2.a; SS 1.2.1.a", "saving for future purchases, and the gains and losses of choices"],
    ["ca-g1-long-ago", "adopt", "SS 1.4.1.b; SS 1.4.3.c", "comparing family life long ago and today, and how artifacts help us understand the past"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "SS 2.1.2.a; SS 2.1.2.e", "civic responsibilities that matter to communities, and the characteristics of good citizenship"],
    ["mb-working-together", "adopt", "SS 2.1.1.a; SS 2.1.1.b", "making rules by considering many points of view, and managing conflict"],
    ["ca-g2-work-and-money", "adopt", "SS 2.2.3.b; SS 2.2.2.a", "how people earn income through work, and using money to buy goods"],
    ["communities-compared", "adopt", "SS 2.3.2.b; SS 2.4.1.b", "describing local places and regions, and how different communities have changed over time"],
    ["ny-g1-american-symbols", "adopt", "SS 2.1.2.b", "how patriotic symbols, songs and holidays reflect democratic traditions"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS 3.3.3.a; SS 3.3.3.c", "how the environment shapes what people do and how people change it, and the importance of natural resources"],
    ["or-g2-world-maps", "adopt", "SS 3.3.1.e; SS 3.3.1.a", "the continents, oceans and hemispheres, and map elements such as scale and directions"],
    ["or-g5-history-detective", "adopt", "SS 3.4.3.a; SS 3.4.4.b", "finding facts about the past in artifacts, pictures and documents, and primary and secondary sources"],
    ["ny-g3-globes-and-maps", "adopt", "SS 3.3.1.e", "the continents, oceans and hemispheres on globes and maps"],
    ["ny-g3-culture", "adopt", "SS 3.3.4.a; SS 3.3.4.b", "cultural traits within a community, and how and why cultures change"],
    ["az-g2-continents-oceans", "adopt", "SS 3.3.1.e", "the seven continents and five oceans"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS 4.4.2.a; SS 4.4.4.b", "comparing primary and secondary sources about Nebraska, and citing them in research"],
    ["or-g5-earn-and-save", "adopt", "SS 4.2.2.a", "financial institutions in the community and their purposes"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS 5.4.3.a; SS 5.2.6.b", "the impact of people and ideas on the cultures that met in the Americas, and how trade shaped relationships"],
    ["wa-g5-thirteen-colonies", "adopt", "SS 5.3.1.c; SS 5.3.5.b", "why the colonies were located where they were, and how geography shaped their settlement"],
    ["ca-g5-colonial-economy", "adopt", "SS 5.2.6.b; SS 5.1.1.c", "trade in the colonial economy, and how colonial laws affected majority and marginalized groups"],
    ["ca-g5-road-to-revolution", "adopt", "SS 5.4.1.a; SS 5.1.2.e", "the events that led to the American Revolution, and how conflict shaped them"],
    ["ca-g5-revolution", "adopt", "SS 5.1.1.a; SS 5.4.2.b", "the founding of the United States, and the perspectives of people in the Revolution"],
    ["wa-g5-constitution", "adopt", "SS 5.1.1.b; SS 5.1.1.e", "the three branches of government, and the principles of the American Republic"],
    ["or-g5-timeline", "adopt", "SS 5.4.1.a", "the chronology of key events from the colonies to the Constitution"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "SS 6.3.3.b; SS 6.4.4.b", "how early humans adapted to their environment, and agriculture then and now"],
    ["where-civilizations-grew", "adopt", "SS 6.3.1.a; SS 6.3.1.b", "the locations of the first cities and civilizations and why they grew there"],
    ["world-beliefs", "adopt", "SS 6.4.1.a; SS 6.3.4.a", "the impact of beliefs and ideas on early civilizations, and comparing their cultures"],
    ["trade-networks", "adopt", "SS 6.3.4.b; SS 6.2.3.b", "how ideas spread along trade routes, and how producers and consumers met their needs"],
    ["wa-g6-time-sources", "adopt", "SS 6.4.4.a; SS 6.4.2.b", "comparing primary and secondary sources, and using them to understand different perspectives"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS 6.1.1.b; SS 6.4.1.b", "the first written laws, and the impact of events in Mesopotamia and Egypt"],
    ["wa-g6-greece-rome", "adopt", "SS 6.1.1.a; SS 6.1.2.b", "forms of government in ancient Greece and Rome, and citizens' roles and rights then and now"],
    ["ny-g6-classical-china-india", "adopt", "SS 6.4.1.a; SS 6.2.1.b", "the achievements and ideas of classical India and China, and how their governments shaped their economies"],
    ["or-g7-african-kingdoms", "adopt", "SS 6.4.3.b; SS 6.2.3.a", "the trading kingdoms of Africa, and producers and consumers in ancient civilizations"],
  ],
  "7/social": [
    ["ca-g7-rome-byzantium", "adopt", "SS 7.4.1.a; SS 7.1.1.c", "the fall of Rome and the Byzantine Empire, and how governments changed over time"],
    ["ca-g7-arabia-islam", "adopt", "SS 7.4.1.a; SS 7.3.4.b", "the rise and spread of Islam, and how ideas spread from culture to culture"],
    ["ca-g7-west-african-life", "adopt", "SS 7.4.3.b; SS 7.2.6.a", "the kingdoms of West Africa, and how trade across the Sahara built them"],
    ["ca-g7-imperial-china", "adopt", "SS 7.4.1.b; SS 7.1.1.b", "the dynasties of imperial China and their inventions, and the documents and exams that shaped its government"],
    ["ca-g7-medieval-japan", "adopt", "SS 7.3.4.b; SS 7.4.1.a", "how ideas from China shaped Japan, and the people and events of medieval Japan"],
    ["ca-g7-church-and-crowns", "adopt", "SS 7.1.1.b; SS 7.4.1.a", "documents such as Magna Carta that shaped governments, and the people and events of medieval Europe"],
    ["ca-g7-aztec-inca", "adopt", "SS 7.4.3.b; SS 7.3.3.b", "the civilizations of the Americas, and how they adapted to their environments"],
    ["ny-g5-countries-capitals", "adopt", "SS 7.3.2.a; SS 7.3.5.b", "classifying world regions, and mapping their countries"],
    ["ny-g5-cultures", "adopt", "SS 7.3.4.a; SS 7.3.4.b", "comparing cultures around the world, and how cultural diffusion happens"],
    ["ny-g5-governments", "adopt", "SS 7.1.1.a; SS 7.1.2.a", "forms of government around the world, and how people take part in them"],
    ["ny-g5-economics", "adopt", "SS 7.2.4.a; SS 7.2.5.b", "economic systems around the world, and the indicators used to measure them"],
    ["maps-graphs-8", "adopt", "SS 7.3.5.a", "using maps and charts to explain the geographic patterns of world events"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS 8.1.1.c; SS 8.1.1.b", "the foundational documents of the United States, and how its government was structured to meet citizens' needs"],
    ["wa-g8-bill-of-rights", "adopt", "SS 8.1.1.e; SS 8.1.2.a", "how freedom and individual rights are shown in American government, and how people take part"],
    ["maps-graphs-8", "adopt", "SS 8.3.2.a", "using maps and images to evaluate the characteristics of places and regions in early U.S. history"],
    ["mb-evidence-8", "adopt", "SS 8.4.2.b; SS 8.4.5.b", "judging the accuracy and completeness of sources, and citing them in research"],
    ["ca-g8-industry-reform", "adopt", "SS 8.4.1.a; SS 8.2.4.a", "the impact of inventions, industry and reform movements, and the growth of the U.S. economy"],
    ["ca-g8-civil-war", "adopt", "SS 8.4.1.b; SS 8.1.2.d", "the causes and consequences of the Civil War, and how conflict shaped the nation"],
    ["or-g8-reconstruction", "adopt", "SS 8.4.3.b; SS 8.4.1.a", "the end of slavery and Reconstruction, and how freedpeople understood those events"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS HS.1.1.a; SS HS.1.1.b", "the historical foundations of the Constitution, and the structure of American constitutional government"],
    ["ca-g9-civic-action", "adopt", "SS HS.1.2.c; SS HS.1.2.e", "taking part in civic life, and how individuals, groups and the media check government"],
    ["ca-g9-media", "adopt", "SS HS.1.2.f; SS HS.1.1.g", "judging media sources for accuracy and perspective, and the roles of political parties"],
  ],
};
