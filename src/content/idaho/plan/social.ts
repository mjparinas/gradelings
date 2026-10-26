import type { Entry } from "../kit";

// Idaho social studies: the units Idaho uses from other frameworks, per grade ("<grade>/social"). The Idaho Content
// Standards for Social Studies (2024, revised 2025) number each Kindergarten to Grade 5 standard by grade, strand and
// number ("4.SS.1.6"). Grades 6 to 9 cite the middle and high school courses Idaho's districts place: World Geography and
// World History and Civilizations ("6-9.WG.2.7", "6-9.WH.1.4"), United States History I ("6-12.US1.14"), and in Grade 9
// American Government ("9-12.GOV.45") and Economics ("9-12.EC.1"). Kindergarten to Grade 3 are about the child's
// community, Grade 4 is Idaho history and government, and Grade 5 is the United States from the colonies to westward
// expansion.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Idaho's own units (flags and holidays, Idaho on the map, the tribes of Idaho, Idaho's land and work,
// laws and leaders, calling Idaho home, local and state government, the five tribes, explorers, miners and settlers,
// treaties and land conflicts, Idaho's regions, government and symbols, public lands, Idaho in the world, territory to
// statehood and governing Idaho) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.SS.1.1", "how people are alike and different, sharing stories of one's own life, family and culture"],
    ["families", "share", "K.SS.1.1; K.SS.1.2", "how families are alike and different, and how things change from the past to the present"],
    ["needs-and-wants", "share", "K.SS.3.1", "telling wants from needs"],
    ["places-near-me", "adopt", "K.SS.2.2; K.SS.2.1", "describing where people, places and things are with position words, and simple maps"],
    ["fair-and-kind", "adopt", "K.SS.4.1", "practicing citizenship in the classroom: responsibility, honesty, kindness and fair rules"],
    ["mb-k-jobs-and-rules", "adopt", "K.SS.3.3; K.SS.4.1", "jobs done at home, at school and in the community, and following rules"],
    ["or-k-money-and-work", "adopt", "K.SS.3.2", "the benefits of saving money and how people use money to buy things"],
    ["ca-k-calendar", "adopt", "K.SS.1.2", "putting days and events in order from the past to the present"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.SS.1.2", "how things change over time, from the past to the present"],
  ],
  "1/social": [
    ["maps", "share", "1.SS.2.1", "map symbols, directions and making a simple map"],
    ["our-land", "share", "1.SS.2.1; 1.SS.2.2", "land and water on maps, and how people adjust to and change their environment"],
    ["my-community", "share", "1.SS.3.1; 1.SS.4.5", "how people meet their needs by sharing, trading and buying, and the helpers in a community"],
    ["respect-and-inclusion", "adopt", "1.SS.5.2; 1.SS.5.1", "belonging to many groups, and family life and customs in different cultures"],
    ["community-services", "adopt", "1.SS.4.5; 1.SS.4.1", "people who help us every day, and the traits of good citizens"],
    ["wa-g1-earn-save-share", "adopt", "1.SS.3.3; 1.SS.3.1", "ways to save money for future needs and wants, and using money to buy goods and services"],
    ["ca-g1-long-ago", "adopt", "1.SS.1.1", "how the ways families live today compare with how they lived in the past"],
    ["ca-g1-models-and-maps", "adopt", "1.SS.2.1", "making simple maps with a title, a key and a compass rose"],
    ["ny-g1-family-history", "adopt", "1.SS.1.2; 1.SS.1.3", "timelines of personal and family history, and comparing personal histories"],
  ],
  "2/social": [
    ["caring-citizens", "share", "2.SS.4.6; 2.SS.4.7", "the characteristics of good citizenship, and people who model them"],
    ["needs-and-wants", "share", "2.SS.3.1", "the wants and needs of families, and the purpose of a budget"],
    ["ca-g2-work-and-money", "adopt", "2.SS.3.2; 2.SS.3.3", "employment, income and wages, and producers, consumers, goods and services"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.SS.4.7", "historical and present-day people who model good citizenship"],
    ["communities-compared", "adopt", "2.SS.5.1; 2.SS.2.2", "comparing communities in different parts of the world, and how environments shape how people live"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.SS.3.3; 3.SS.2.3", "how land, natural resources and labor shape local economies, and how geography shaped settlement"],
    ["ny-g3-globes-and-maps", "adopt", "3.SS.2.1", "map and globe terms: the Equator, the Prime Meridian, hemispheres and regions"],
    ["ny-g3-culture", "adopt", "3.SS.5.2", "how cultures from other parts of the world add to a community and make it unique"],
    ["ny-g3-world-communities", "adopt", "3.SS.5.1", "connections between the local community and communities around the world"],
    ["mb-working-together", "adopt", "3.SS.4.7", "ways children and adults take part in their community"],
    ["or-g5-earn-and-save", "adopt", "3.SS.3.4; 3.SS.3.1", "economic choices such as using a bank, saving and budgeting, and supply and demand"],
  ],
  "4/social": [],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "5.SS.1.5; 5.SS.1.1", "how the 13 colonies were founded and grew, and the meetings of colonists with established societies"],
    ["ca-g5-colonial-economy", "adopt", "5.SS.1.9; 5.SS.3.3", "the economic motives that moved people, and the characteristics of a market economy"],
    ["ca-g5-slavery-and-resistance", "adopt", "5.SS.1.8", "the history of indentured servitude and the slave trade"],
    ["ca-g5-road-to-revolution", "adopt", "5.SS.1.6; 5.SS.3.4", "the conflicts and economic policies that led to the American Revolution"],
    ["ca-g5-revolution", "adopt", "5.SS.4.2; 5.SS.1.2", "the important ideas of the Declaration of Independence, and the founders who led the change"],
    ["ca-g5-home-front", "adopt", "5.SS.1.3", "the political and cultural groups of the Revolution and their impact"],
    ["wa-g5-constitution", "adopt", "5.SS.4.3; 5.SS.4.4", "the Articles of Confederation, and the principles of the Constitution and Bill of Rights"],
    ["ca-g5-constitution", "adopt", "5.SS.4.6; 5.SS.4.11", "the three branches of government and their powers, and how the United States is a republic"],
    ["wa-g8-bill-of-rights", "adopt", "5.SS.4.9", "the basic rights and personal responsibilities of American citizens"],
    ["ca-g5-westward", "adopt", "5.SS.1.10; 5.SS.1.11", "the impact of westward expansion on tribes, and the technologies that drove it"],
    ["wa-g5-us-geography", "adopt", "5.SS.2.2; 5.SS.2.3", "the regions of the United States and their resources, and the 50 states and their capitals"],
  ],
  "6/social": [
    ["mb-mesopotamia", "adopt", "6-9.WH.1.4; 6-9.WH.2.6", "the characteristics of early civilizations, and the impact of waterways on them"],
    ["where-civilizations-grew", "adopt", "6-9.WH.1.3; 6-9.WH.2.4", "how hunter-gatherers became farming settlements, and how physical features drew people to settle"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6-9.WH.2.6; 6-9.WH.1.5", "the impact of rivers on civilizations, and how people adapted the environment as populations grew"],
    ["mb-egypt-8", "adopt", "6-9.WH.1.7; 6-9.WH.1.8", "how writing, art, architecture and science developed, and the social classes of early civilizations"],
    ["ca-g6-hebrews-kush", "adopt", "6-9.WG.1.4; 6-9.WH.1.10", "the origins, central beliefs and spread of major religions, and how religion shaped civilizations"],
    ["ca-g6-greek-world", "adopt", "6-9.WH.4.2; 6-9.WH.1.8", "the political systems that shaped civilizations, and social classes in Athens and Sparta"],
    ["ca-g6-roman-empire", "adopt", "6-9.WH.4.2; 6-9.WH.5.1", "Roman law and government, and the political and economic causes of conflict"],
    ["ca-g6-qin-and-han", "adopt", "6-9.WH.1.9; 6-9.WH.1.6", "belief systems and how people understood the world, and technological advances in ancient China"],
    ["trade-networks", "adopt", "6-9.WH.2.5; 6-9.WG.3.7", "how trade routes spread goods and ideas, and how geography, resources and trade shaped regions"],
    ["ca-g7-aztec-inca", "adopt", "6-9.WG.1.1", "the civilizations of the Americas before European contact"],
    ["medieval-europe", "adopt", "6-9.WH.1.11; 6-9.WH.4.1", "how religion, economics and politics shaped society in the Middle Ages"],
    ["ny-g9-crusades-plague", "adopt", "6-9.WH.5.1", "the religious, political and economic causes of the Crusades and their effects"],
    ["renaissance-and-reformation", "adopt", "6-9.WH.1.12; 6-9.WH.1.7", "religious diversity and the Reformation, and the art and science of the Renaissance"],
    ["ca-g7-exploration-and-empire", "adopt", "6-9.WG.1.2; 6-9.WG.1.3", "the motives for European colonization, and its impact on native cultures"],
    ["wa-g6-time-sources", "adopt", "6-9.WH.6.1; 6-9.WH.1.1", "using evidence from primary and secondary sources, and the evidence historians and archaeologists study"],
  ],
  "7/social": [
    ["ny-g5-countries-capitals", "adopt", "6-9.WG.2.7; 6-9.WG.2.8", "the countries and major cities of world regions, and their physical characteristics"],
    ["ny-g6-eastern-hemisphere", "adopt", "6-9.WG.2.8; 6-9.WG.2.4", "the physical characteristics and climates of Europe, Asia and Africa"],
    ["ny-g5-governments", "adopt", "6-9.WG.4.1", "the major forms of government in regions of the world"],
    ["world-beliefs", "share", "6-9.WG.2.10", "cultural patterns such as religion and language in regions of the world"],
    ["ny-g5-economics", "adopt", "6-9.WG.3.2; 6-9.WG.2.11", "how economic systems guide decisions, and where the world's major farming and manufacturing areas are"],
    ["or-g7-age-of-revolutions", "adopt", "6-9.WH.4.3", "the global expansion of liberty and democracy through revolutions"],
    ["maps-graphs-8", "adopt", "6-9.WG.6.3; 6-9.WG.6.2", "reading charts, graphs and maps, and comparing map projections"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "6-12.US1.8; 6-12.US1.9", "how the French and Indian War changed British policy, and the ideas behind the American Revolution"],
    ["or-g8-founding-ideas", "adopt", "6-12.US1.14; 6-12.US1.15", "the concerns and compromises of the Constitutional Convention, and the ratification debate"],
    ["ca-g8-constitution-at-work", "adopt", "6-12.US1.16", "the powers of the branches of government in the original Constitution"],
    ["or-g8-new-nation", "adopt", "6-12.US1.18", "the political differences among the early Republic's leaders and parties"],
    ["wa-g8-westward", "adopt", "6-12.US1.23; 6-12.US1.30", "westward expansion in the early Republic, and treaties and federal policies affecting tribes"],
    ["wa-g8-industry-reform", "adopt", "6-12.US1.20; 6-12.US1.34", "changes in manufacturing, transportation and communication, and the reform movements"],
    ["ca-g8-divided-nation", "adopt", "6-12.US1.24; 6-12.US1.28", "the events that led to the Civil War, and the defenses of and arguments against slavery"],
    ["wa-g8-civil-war", "adopt", "6-12.US1.39; 6-12.US1.38", "the major military events of the Civil War, and Lincoln's thought on slavery and rights"],
    ["wa-g8-reconstruction", "adopt", "6-12.US1.42; 6-12.US1.43", "the outcomes of the Civil War, Reconstruction and the Compromise of 1877"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "9-12.GOV.1; 9-12.GOV.6", "the European thinkers behind American government, and the purposes of government in the Preamble"],
    ["ca-g9-three-branches", "adopt", "9-12.GOV.30; 9-12.GOV.35; 9-12.GOV.38", "the legislative, executive and judicial branches under Articles I, II and III"],
    ["ca-g9-rights", "adopt", "9-12.GOV.22; 9-12.GOV.19", "civil rights and civil liberties, and who is a citizen"],
    ["ca-g9-elections", "adopt", "9-12.GOV.51; 9-12.GOV.37", "the nomination and election process, and the Electoral College"],
    ["ca-g9-civic-action", "adopt", "9-12.GOV.18", "ways citizens take part responsibly in the political process"],
    ["ca-g9-media", "adopt", "9-12.GOV.17; 9-12.GOV.52", "the role of the media, and the influence of parties, media coverage and interest groups"],
  ],
};
