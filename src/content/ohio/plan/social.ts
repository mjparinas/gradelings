import type { Entry } from "../kit";

// Ohio social studies: the units Ohio uses from other frameworks, per grade ("<grade>/social"). Ohio's Learning
// Standards for Social Studies (Kindergarten to Grade 8 updated July 2026) number their content statements within each
// grade and print them without codes, so a unit cites them as "Statement 6". Kindergarten to Grade 3 move from the
// child to Ohio's communities and regions, Grade 4 is Ohio history and government, Grade 5 the Western Hemisphere,
// Grade 6 the Eastern Hemisphere, Grade 7 world history and Grade 8 United States history from exploration to
// Reconstruction. Grade 9 cites the high school American Government ("American Government 16") and Economics and
// Financial Literacy courses, which Ohio requires for graduation. Only general units free of Canadian content and of
// other states' places are adopted, and never another state's units about its Tribes. Ohio's own units (its symbols,
// regions, communities, history and government) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "Statement 8", "each person is unique but shares things with the groups they belong to"],
    ["families", "share", "Statement 5; Statement 2", "families' traditions and customs, and photographs and objects that tell about the past"],
    ["needs-and-wants", "share", "Statement 7; Statement 10", "food, clothing and shelter, and the goods and services people use every day"],
    ["places-near-me", "adopt", "Statement 3", "using landmarks and direction words to describe where familiar places are"],
    ["fair-and-kind", "adopt", "Statement 4", "working together toward shared goals at school"],
    ["mb-k-jobs-and-rules", "adopt", "Statement 9; Statement 4", "community helpers and leaders, and why school has rules"],
    ["or-k-money-and-work", "adopt", "Statement 10", "how money lets people buy goods and services"],
    ["ca-k-calendar", "adopt", "Statement 1", "measuring time in days, weeks and months, and putting events in order"],
  ],
  "1/social": [
    ["maps", "share", "Statement 3", "maps, globes and simple models for finding places"],
    ["our-land", "share", "Statement 7; Statement 8", "landforms, bodies of water and what people build, and how the land shapes ways of life"],
    ["my-community", "share", "Statement 11; Statement 12", "being a producer and a consumer, and trading for goods and services"],
    ["changes-in-my-life", "adopt", "Statement 1", "dividing time into past, present and future"],
    ["respect-and-inclusion", "adopt", "Statement 5; Statement 4", "respecting others' rights and opinions when working in a group"],
    ["community-services", "adopt", "Statement 11", "the jobs people do and the goods and services they provide"],
    ["wa-g1-earn-save-share", "adopt", "Statement 10", "choices about money when wants are unlimited and resources are scarce"],
    ["ca-g1-long-ago", "adopt", "Statement 2; Statement 6", "sources about the past, and how technology changed the way people meet their needs"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "Statement 11", "choices, scarcity and the incentives that affect them"],
    ["then-and-now", "adopt", "Statement 2", "showing change over time with primary and secondary sources"],
    ["ns-community-change-2", "adopt", "Statement 1; Statement 2", "putting a community's history on a timeline"],
    ["communities-compared", "adopt", "Statement 9", "sharing customs, celebrations, languages and food to understand different ways of life"],
    ["mb-working-together", "adopt", "Statement 4; Statement 5", "expressing opinions, compromising and being accountable as a group"],
    ["ca-g2-citizens-and-leaders", "adopt", "Statement 10", "laws that protect rights and assign responsibilities"],
    ["ca-g2-work-and-money", "adopt", "Statement 12; Statement 13", "earning income by working, and different ways to pay for goods and services"],
  ],
  "3/social": [
    ["meeting-needs", "share", "Statement 15; Statement 16", "using resources to produce goods and services, and markets where producers and consumers meet"],
    ["or-g2-world-maps", "adopt", "Statement 3; Statement 8", "different kinds of maps, and places from the smallest units to the largest"],
    ["mb-global-communities", "adopt", "Statement 11", "communities share characteristics and form their own cultures"],
    ["or-g5-history-detective", "adopt", "Statement 1; Statement 2", "cause and effect on timelines, and the questions primary and secondary sources raise"],
  ],
  "4/social": [
    ["ca-g5-road-to-revolution", "adopt", "Statement 8", "the colonists' objections to British rule and the road to the American Revolution"],
    ["ca-g5-revolution", "adopt", "Statement 8", "the Declaration of Independence and the American Revolution"],
  ],
  "5/social": [
    ["ca-g7-aztec-inca", "adopt", "Statement 6", "the Maya, Aztec and Inca civilizations and how they used their environments"],
    ["ny-g5-columbian-exchange", "adopt", "Statement 7; Statement 11", "European colonization and the movement of people, products and ideas in the Western Hemisphere"],
    ["ny-g5-countries-capitals", "adopt", "Statement 8", "the continents, regions and countries of the Western Hemisphere"],
    ["ny-g5-cultures", "adopt", "Statement 12; Statement 10", "how many world cultures shaped life in the Western Hemisphere"],
    ["ny-g5-governments", "adopt", "Statement 13", "democracies, dictatorships and monarchies in the Western Hemisphere"],
    ["ny-g5-economics", "adopt", "Statement 14; Statement 15; Statement 16", "what to produce, how and for whom, productive resources, and markets"],
    ["ny-g5-timeline", "adopt", "Statement 1", "putting the history of the Western Hemisphere in order and looking at it from several sides"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "Statement 1", "dating events with B.C. and A.D. or B.C.E. and C.E., and studying the past from sources"],
    ["ny-g6-eastern-hemisphere", "adopt", "Statement 8; Statement 9", "the regions of the Eastern Hemisphere and how their physical environments shape human activity"],
    ["wa-g6-mesopotamia-egypt", "adopt", "Statement 7", "the early civilizations of Mesopotamia and Egypt"],
    ["ny-g6-classical-china-india", "adopt", "Statement 7; Statement 11", "the early civilizations of China and India and their lasting advances"],
    ["trade-networks", "adopt", "Statement 12; Statement 15", "trade routes linking Africa, Europe and Asia and the spread of goods, ideas and religions"],
    ["tx-g6-governments", "adopt", "Statement 13", "citizens' rights and responsibilities in democracies, dictatorships, monarchies and theocracies"],
    ["tx-g6-economies", "adopt", "Statement 14; Statement 15; Statement 16", "specialization, trade and interdependence among regions and countries"],
  ],
  "7/social": [
    ["world-beliefs", "share", "Statement 14", "how the major world religions spread as civilizations and empires traded and interacted"],
    ["wa-g6-greece-rome", "adopt", "Statement 5; Statement 15", "Greek and Roman contributions, and Greek democracy and the Roman Republic"],
    ["medieval-europe", "adopt", "Statement 6; Statement 16", "the fall of Rome, feudalism, and the rise of nation-states"],
    ["ny-g6-mongols-travelers", "adopt", "Statement 7; Statement 11", "the Mongol conquests and empires that grew along trade routes"],
    ["islamic-world", "adopt", "Statement 8", "Islamic achievements in medicine, science, mathematics and geography"],
    ["ny-g6-mediterranean", "adopt", "Statement 8; Statement 6", "Byzantium, the caliphates and the Crusades around the Mediterranean"],
    ["renaissance-and-reformation", "adopt", "Statement 9; Statement 10", "the Renaissance and the Reformation"],
    ["or-g7-african-kingdoms", "adopt", "Statement 11; Statement 12", "the kingdoms of West Africa, trade across the Sahara and the trans-Saharan slave trade"],
  ],
  "8/social": [
    ["wa-g5-thirteen-colonies", "adopt", "Statement 6; Statement 7", "why Europeans colonized North America, and the thirteen colonies"],
    ["ca-g8-revolutionary-ideas", "adopt", "Statement 9", "the grievances and ideas of the Declaration of Independence and the American Revolution"],
    ["or-g8-founding-ideas", "adopt", "Statement 10; Statement 11", "the Articles of Confederation, the Constitution and the debate over ratification"],
    ["wa-g8-bill-of-rights", "adopt", "Statement 20", "how the Constitution and the Bill of Rights protect citizens' rights"],
    ["ca-g8-industry-reform", "adopt", "Statement 21; Statement 18", "the Industrial Revolution, workers and reformers"],
    ["ca-g8-civil-war", "adopt", "Statement 14; Statement 15", "the sectional divisions over slavery and the Civil War"],
    ["or-g8-reconstruction", "adopt", "Statement 16", "Reconstruction and the amendments that redefined rights"],
    ["maps-graphs-8", "adopt", "Statement 2", "maps and geographic tools that show how geography shaped history"],
    ["mb-evidence-8", "adopt", "Statement 1; Statement 4", "using credible sources from several perspectives, and how media shape opinion"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "American Government 5; American Government 6", "the principles of the Constitution and the Federalist and Anti-Federalist debate"],
    ["ca-g9-civic-action", "adopt", "American Government 1; American Government 4", "civic engagement, and persuasion, compromise and consensus in a democracy"],
    ["ca-g9-media", "adopt", "American Government 2; American Government 3", "political parties, interest groups and the media, and analyzing issues with credible sources"],
  ],
};
