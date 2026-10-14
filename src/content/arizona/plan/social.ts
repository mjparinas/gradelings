import type { Entry } from "../kit";

// Arizona social studies: the units Arizona uses from other frameworks, per grade ("<grade>/social"). The Arizona History
// and Social Science Standards (2018) give each grade a theme and number each standard by grade, strand and number:
// "4.H2.1" is Grade 4, history standard 2, number 1 (SP disciplinary skills and processes, C civics, E economics,
// G geography, H history). Grade 9 cites the high school standards ("HS.C2.5").
//
// Grade themes: Children as Citizens (K), Communities: Living and Working Together (1), The World Around Me (2), Arizona
// Studies (3), Regions and Cultures of the Americas (4), United States Studies: American Revolution to Industrialism (5),
// Global Studies: World Regions and Cultures of the Eastern Hemisphere (6), Integrated Global Studies (7), Citizenship and
// Civic Engagement in Today's Society (8); Grade 9 is civics, as in the other US states, with Arizona's own constitution
// and government. Only general units free of Canadian content and of other states' place names are adopted, and never
// another state's units about its Tribes. Arizona's own units (Grade 3 Arizona studies and Grade 9 Arizona government)
// are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.H1.1; K.SP2.1", "comparing a child's own culture and traditions with those of others"],
    ["families", "share", "K.SP1.1; K.SP1.2", "words for past, present and future, and how past events shape a family"],
    ["needs-and-wants", "share", "K.E2.1; K.E2.2", "needs, wants and making choices about what to give up"],
    ["places-near-me", "adopt", "K.G1.1; K.G1.2", "simple maps of familiar places"],
    ["fair-and-kind", "adopt", "K.C1.1; K.C1.3", "respect, responsibility and fairness, and listening to other people's ideas"],
    ["mb-k-jobs-and-rules", "adopt", "K.C2.1; K.C2.2", "the people in authority in a child's life, and the important jobs everyone does"],
    ["or-k-money-and-work", "adopt", "K.E2.1", "how people work and use money to meet their needs"],
    ["ca-k-calendar", "adopt", "K.SP1.1", "days, weeks and months, and the beginning, middle and end of events"],
    ["ca-k-good-citizens", "adopt", "K.C4.1; K.C4.2; K.C1.2", "working together to solve problems, and why classroom rules matter"],
  ],
  "1/social": [
    ["maps", "share", "1.G1.1; 1.G1.2", "making and reading maps, and using a grid to find places"],
    ["our-land", "share", "1.G2.1; 1.G3.2", "how people use and change the land, now and in the past"],
    ["my-community", "share", "1.C3.3; 1.E3.3", "how community groups work together, and people as producers and consumers"],
    ["changes-in-my-life", "adopt", "1.SP1.1", "putting important life events in order on a timeline"],
    ["respect-and-inclusion", "adopt", "1.C1.1; 1.C1.3", "respect, equality and fairness, and comparing points of view"],
    ["community-services", "adopt", "1.C3.2; 1.C3.1", "what local governments do, and why communities have rules and laws"],
    ["wa-g1-earn-save-share", "adopt", "1.E1.2; 1.E2.1", "reasons to save or spend money, and choosing between needs and wants"],
    ["ca-g1-long-ago", "adopt", "1.SP1.2; 1.G3.2", "how daily life in communities has changed, comparing places past and present"],
    ["ca-g1-american-symbols", "adopt", "1.H4.1", "American symbols, documents, landmarks, holidays and leaders"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2.E1.2", "reasons to spend or save, and choosing with limited resources"],
    ["ny-g3-globes-and-maps", "adopt", "2.G1.2; 2.G1.1", "using maps and globes to find and compare places around the world"],
    ["ny-g3-world-communities", "adopt", "2.G2.1; 2.G4.1", "communities in different regions of the world, and how climate shapes life there"],
    ["ny-g3-culture", "adopt", "2.SP2.1; 2.H1.2", "comparing cultures and traditions around the world"],
    ["ny-g3-trade", "adopt", "2.E3.1; 2.E5.1", "goods made around the world, and how resources shape what countries produce and trade"],
    ["communities-compared", "adopt", "2.G2.2; 2.G2.3", "how people use and change their environments"],
    ["ca-g2-work-and-money", "adopt", "2.E1.1; 2.E3.2", "jobs and earning income"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.C2.1; 2.C2.2", "leaders and their roles, and how everyone plays a part"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.E2.2", "how people specialize and trade to get what their community needs"],
    ["mb-working-together", "adopt", "3.C3.2; 3.C1.2", "how people benefit from working together, and deciding as a group"],
  ],
  "4/social": [
    ["ny-g5-hemisphere-geography", "adopt", "4.G1.1", "maps of the Americas and their physical features"],
    ["ny-g5-early-civilizations", "adopt", "4.H1.1; 4.G2.1", "early civilizations of the Americas and how they adapted to their environments"],
    ["ca-g7-aztec-inca", "adopt", "4.H1.1; 4.H3.1", "the Maya, Aztec and Inca, their cities, governments and ideas"],
    ["ny-g5-columbian-exchange", "adopt", "4.G3.1; 4.G4.1", "the Columbian Exchange and its effects on the people of the Americas, Europe and Africa"],
    ["ca-g7-exploration-and-empire", "adopt", "4.H2.1; 4.SP4.1", "why Europeans explored, and the causes and effects of their empires in the Americas"],
    ["wa-g5-thirteen-colonies", "adopt", "4.H3.1; 4.G2.1", "the English colonies, their regions and how ideas and the land shaped them"],
    ["ca-g5-colonial-economy", "adopt", "4.E3.1; 4.E2.1", "industries, work and trade in the colonies, and scarcity and choice"],
    ["or-g5-history-detective", "adopt", "4.SP3.4; 4.SP3.2", "judging a source by its author, date and purpose, and comparing sources"],
    ["ny-g5-timeline", "adopt", "4.SP1.1", "putting events in the Americas in order"],
  ],
  "5/social": [
    ["ca-g5-road-to-revolution", "adopt", "5.SP4.1; 5.E4.1", "the causes of the American Revolution, including British taxes"],
    ["ca-g5-revolution", "adopt", "5.H2.1; 5.SP2.1", "the American Revolution and the perspectives of the people who lived through it"],
    ["wa-g5-constitution", "adopt", "5.C3.1; 5.C2.1", "the Constitution, the three branches of government and the Bill of Rights"],
    ["or-g5-states-capitals", "adopt", "5.G1.1", "using maps to find the states of the United States and their capitals"],
    ["ca-g8-new-nation", "adopt", "5.SP1.3; 5.C2.1", "the people who shaped the new nation and the challenges it faced"],
    ["ca-g8-industry-reform", "adopt", "5.E4.2; 5.H4.1", "new industries and inventions, and the reform movements they led to"],
    ["ca-g8-civil-war", "adopt", "5.H2.1; 5.SP4.1", "slavery, the causes of the Civil War and its key events"],
    ["or-g8-reconstruction", "adopt", "5.C4.1; 5.H4.1", "Reconstruction and the 13th, 14th and 15th Amendments"],
    ["or-g5-earn-and-save", "adopt", "5.E1.1; 5.E2.1", "financial risks, and the costs and benefits of choices"],
    ["or-g5-timeline", "adopt", "5.SP1.1", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["wa-g6-world-maps", "adopt", "6.G1.1", "maps of the Eastern Hemisphere, latitude and longitude"],
    ["first-farmers", "adopt", "6.H1.1; 6.SP1.3", "the first farming societies and the change from hunting and gathering"],
    ["where-civilizations-grew", "adopt", "6.G3.2; 6.G2.1", "how rivers, land and climate shaped the first civilizations"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.H1.1; 6.H3.1", "Mesopotamia and Egypt, their rulers, laws and religions"],
    ["wa-g6-india-china", "adopt", "6.H3.2; 6.H1.1", "ancient India and China and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "6.H3.1; 6.H3.3", "citizens and government in Athens and Rome"],
    ["world-beliefs", "adopt", "6.H3.2", "the world's major religions and how they compare"],
    ["trade-networks", "adopt", "6.E5.1; 6.H1.2", "the Silk Road and other trade routes, and how trade spread people and ideas"],
    ["medieval-europe", "adopt", "6.H2.1; 6.H3.1", "medieval Europe, feudalism and the church"],
    ["islamic-world", "adopt", "6.H1.2; 6.E3.3", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["renaissance-and-reformation", "adopt", "6.H3.2; 6.SP1.2", "the Renaissance and Reformation and the changes they brought"],
    ["wa-g6-time-sources", "adopt", "6.SP3.3; 6.SP1.1", "how historians know about the past, using primary and secondary sources"],
  ],
  "7/social": [
    ["ca-g7-science-enlightenment", "adopt", "7.H1.2; 7.H3.1", "the Scientific Revolution and the ideas of the Enlightenment"],
    ["or-g7-age-of-revolutions", "adopt", "7.C2.1; 7.H2.1", "how revolutions changed governments and citizens' rights"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8.C1.1", "the ideas in the Declaration of Independence, the Constitution and the Bill of Rights"],
    ["wa-g8-bill-of-rights", "adopt", "8.C2.2; 8.C2.3", "the rights and responsibilities of people in a democracy, and the rule of law"],
    ["ca-g9-civic-action", "adopt", "8.C1.4; 8.C4.1", "how citizens work for change and help their communities"],
    ["ca-g9-media", "adopt", "8.SP3.5; 8.C3.1", "judging news sources and the role of the media in politics"],
    ["mb-evidence-8", "adopt", "8.SP3.4; 8.SP4.4", "judging sources and comparing arguments about the past"],
    ["maps-graphs-8", "adopt", "8.G1.1", "using maps and graphs to study issues"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "HS.C3.1; HS.C1.1", "the ideas behind the US Constitution and the principles it is built on"],
    ["tx-g9-rights", "adopt", "HS.C2.4; HS.C2.1", "the rights and responsibilities of citizens"],
    ["ca-g9-forms-of-government", "adopt", "HS.C1.2", "democracy compared with other forms of government around the world"],
  ],
};
