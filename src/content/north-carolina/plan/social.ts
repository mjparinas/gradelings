import type { Entry } from "../kit";

// North Carolina social studies: the units North Carolina uses from other frameworks, per grade ("<grade>/social").
// The 2021 North Carolina Standard Course of Study for social studies is cited by objective, in five strands: behavioral
// sciences (B), civics and government (C&G), economics (E), geography (G) and history (H), "4.H.1.3". Kindergarten to
// Grade 3 move from the world around us to America and to communities and the state; Grade 4 is North Carolina history
// and Grade 5 United States history; Grades 6 and 7 are world studies, before and after about 1400; Grade 8 is North
// Carolina and United States history; Grade 9 is the Founding Principles of the United States of America and North
// Carolina: Civic Literacy ("CL.C&G.2.1"), with Economics and Personal Finance ("EPF.MCM.1.1"), both required for
// graduation. Only general units free of Canadian content and other states' places are adopted, never another state's
// units about its Tribes. North Carolina's own units (its regions, history, government and economy) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.H.1.1", "how people grow and change over time"],
    ["families", "share", "K.B.1.1; K.H.1.3", "family traditions, and life at home long ago and today"],
    ["fair-and-kind", "adopt", "K.B.1.3", "kindness, respect and fairness, and how they help people get along"],
    ["mb-k-jobs-and-rules", "adopt", "K.C&G.1.1; K.C&G.1.2; K.C&G.1.3", "rules at home, at school and in the community, and why we follow them"],
    ["ca-k-good-citizens", "adopt", "K.C&G.1.4", "working together to make the classroom and community better"],
    ["needs-and-wants", "share", "K.E.1.1", "needs and wants"],
    ["or-k-money-and-work", "adopt", "K.E.1.2", "goods and services, and the work people do"],
    ["places-near-me", "adopt", "K.G.1.1; K.G.1.3", "simple maps, and position words for where things are"],
  ],
  "1/social": [
    ["maps", "share", "1.G.1.1; 1.G.1.2", "maps and globes, landforms, and map symbols"],
    ["our-land", "share", "1.G.1.1; 1.G.2.1", "landforms and bodies of water, and how the land affects how people live"],
    ["my-community", "share", "1.C&G.1.1", "how people and groups help shape a community"],
    ["ca-k-good-citizens", "adopt", "1.C&G.1.3", "the rights and responsibilities of good citizens, like honesty, respect and fairness"],
    ["community-services", "adopt", "1.C&G.1.4", "community helpers and ways people make a community better"],
    ["respect-and-inclusion", "adopt", "1.B.1.2", "how people of many cultures help shape a community"],
    ["changes-in-my-life", "adopt", "1.H.1.1", "how people and communities change over time"],
    ["ca-g1-long-ago", "adopt", "1.H.1.2", "comparing life long ago and today using pictures and stories"],
    ["wa-g1-earn-save-share", "adopt", "1.E.1.1", "choosing what to buy when money and resources are limited"],
  ],
  "2/social": [
    ["ny-g1-american-symbols", "adopt", "2.B.1.1", "American symbols and the values they stand for"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.C&G.1.2", "how government and good citizens protect freedom and fairness"],
    ["meeting-needs", "adopt", "2.E.1.1", "scarcity, and making choices about resources"],
    ["ca-g2-work-and-money", "adopt", "2.E.1.2", "how the resources people have affect what they make"],
    ["ny-g2-jobs-and-taxes", "adopt", "2.E.1.2", "community jobs, and how taxes pay for services"],
    ["then-and-now", "adopt", "2.H.1.2", "how events of the past changed how people live today"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.E.1.2", "how a region's natural resources affect the goods people make and buy"],
    ["mb-global-communities", "adopt", "3.B.1.2", "comparing the traditions and cultures of communities"],
    ["communities-compared", "adopt", "3.G.1.2", "how climate and land affect how people live in a place"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "4.E.2.1; 4.E.2.2", "spending and saving, and the results of money choices"],
    ["or-g5-history-detective", "adopt", "4.H.1.5", "using primary and secondary sources to learn about the past"],
  ],
  "5/social": [
    ["wa-g5-us-geography", "adopt", "5.G.1.1", "how location and the land shaped where Americans live and work"],
    ["ca-g5-colonial-economy", "adopt", "5.E.1.4", "trade between the colonies, Britain and other countries"],
    ["wa-g5-road-to-revolution", "adopt", "5.H.1.3", "the causes of the American Revolution"],
    ["ca-g5-revolution", "adopt", "5.H.1.4", "the American Revolution"],
    ["wa-g5-constitution", "adopt", "5.C&G.1.1", "the Constitution and the three branches of government"],
    ["wa-g8-bill-of-rights", "adopt", "5.C&G.2.2", "how the Bill of Rights protects individual rights"],
    ["or-g5-timeline", "adopt", "5.H.1.4", "the order of events from the colonies to the Constitution"],
    ["ca-g5-westward", "adopt", "5.G.1.4", "westward expansion and the forced and voluntary movement of people"],
    ["ca-g8-civil-war", "adopt", "5.H.1.4", "the causes, events and results of the Civil War"],
    ["or-g8-reconstruction", "adopt", "5.H.1.2", "Reconstruction and the changing rights of African Americans"],
    ["ca-g8-industry-reform", "adopt", "5.E.1.3; 5.G.1.3", "how inventions, factories and railroads changed the United States"],
    ["ny-g8-great-depression", "adopt", "5.E.1.1", "the Great Depression, and times of economic growth and decline"],
    ["ny-g8-civil-rights", "adopt", "5.C&G.2.1; 5.H.1.1", "the civil rights movement, and how people worked for equal rights"],
    ["tx-g5-citizenship", "adopt", "5.H.1.6", "national symbols and traditions, and the rights of citizens"],
    ["or-g5-earn-and-save", "adopt", "5.E.2.1; 5.E.2.2", "budgets, spending and saving"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "6.H.1.3", "dating events and using sources to learn about ancient civilizations"],
    ["first-farmers", "adopt", "6.G.1.1; 6.G.1.4", "how early people settled, farmed and adapted to their environment"],
    ["where-civilizations-grew", "adopt", "6.G.1.2", "why early civilizations grew in river valleys"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.H.1.2; 6.C&G.1.1", "the achievements and governments of Mesopotamia and Egypt"],
    ["wa-g6-india-china", "adopt", "6.H.1.2; 6.B.1.1", "ancient India and China, and their beliefs and achievements"],
    ["wa-g6-greece-rome", "adopt", "6.C&G.1.1; 6.C&G.1.6", "government in ancient Greece and Rome, and the rise and fall of Rome"],
    ["world-beliefs", "adopt", "6.B.1.1", "how the world's major religions began and shaped societies"],
    ["trade-networks", "adopt", "6.E.1.1", "how trade routes linked civilizations"],
    ["or-g7-african-kingdoms", "adopt", "6.E.1.1; 6.H.1.1", "the kingdoms of Ghana, Mali and Songhai, and trade across the Sahara"],
    ["ca-g7-aztec-inca", "adopt", "6.H.1.1; 6.G.1.4", "the Maya, Aztec and Inca, and how they adapted to their land"],
    ["islamic-world", "adopt", "6.H.1.2", "the achievements of the early Islamic world"],
    ["medieval-europe", "adopt", "6.B.1.3", "social structure in medieval Europe"],
  ],
  "7/social": [
    ["renaissance-and-reformation", "adopt", "7.C&G.1.2; 7.C&G.1.4", "the Renaissance and the Reformation, and new ideas about religion and government"],
    ["ny-g5-columbian-exchange", "adopt", "7.E.1.5; 7.G.1.1", "the Columbian Exchange, and how it changed societies and Indigenous ways of life"],
    ["or-g7-age-of-revolutions", "adopt", "7.C&G.1.1; 7.H.1.1", "revolutions that changed governments around the world"],
    ["mn-g8-forms-of-government", "adopt", "7.C&G.1.1", "kinds of government, and who holds power in each"],
    ["tx-g6-governments", "adopt", "7.C&G.1.3", "how different governments affect their citizens"],
    ["tx-g6-economies", "adopt", "7.E.1.1; 7.E.1.3", "traditional, command, market and mixed economies"],
    ["world-beliefs", "share", "7.B.1.1", "the world's major religions and cultures today"],
    ["al-g9-interwar", "adopt", "7.H.1.1", "turning points between the world wars"],
    ["al-g9-holocaust", "adopt", "7.B.1.3; 7.H.1.5", "the Holocaust, and how intolerance harms people"],
    ["al-g9-decolonization", "adopt", "7.H.1.2", "independence movements and the end of empires"],
    ["or-g7-world-timeline", "adopt", "7.H.1.1", "putting major events in modern world history in order"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8.C&G.1.1", "the democratic ideals in the founding documents"],
    ["wa-g8-bill-of-rights", "adopt", "8.C&G.1.5", "the Bill of Rights, and access to rights and freedoms"],
    ["ca-g8-civil-war", "adopt", "8.H.1.1", "the causes and effects of the Civil War"],
    ["or-g8-reconstruction", "adopt", "8.H.1.3", "Reconstruction, and the laws used to keep African Americans from voting"],
    ["ca-g8-industry-reform", "adopt", "8.H.2.1; 8.E.1.2", "industry, inventions and reform movements"],
    ["maps-graphs-8", "adopt", "8.G.1.1", "reading maps, graphs and data about places"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "CL.H.1.1; CL.C&G.1.1", "the founding principles of American government"],
    ["ca-g9-three-branches", "adopt", "CL.C&G.2.1", "the three branches of government"],
    ["ca-g9-lawmaking", "adopt", "CL.B.1.1", "how laws and public policy are made"],
    ["ca-g9-rights", "adopt", "CL.C&G.4.5", "due process and the individual rights in the Bill of Rights"],
    ["ca-g9-supreme-court", "adopt", "CL.C&G.4.3", "landmark Supreme Court cases"],
    ["ca-g9-elections", "adopt", "CL.C&G.3.5; CL.C&G.3.7", "elections, voting and political parties"],
    ["ca-g9-civic-action", "adopt", "CL.C&G.3.1", "the duties and responsibilities of citizens, and taking part"],
    ["ca-g9-media", "adopt", "CL.C&G.3.6", "the media and government"],
    ["ca-g9-forms-of-government", "adopt", "CL.C&G.2.4; CL.C&G.3.4", "comparing the United States government with other kinds of government"],
    ["or-g9-supply-demand", "adopt", "EPF.E.1.3", "how supply and demand set prices"],
    ["az-g8-personal-finance", "adopt", "EPF.MCM.1.1; EPF.MCM.3.2", "spending plans, credit and managing debt"],
  ],
};
