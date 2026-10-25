import type { Entry } from "../kit";

// Iowa social studies: the units Iowa uses from other frameworks, per grade ("<grade>/social"). The Iowa Academic
// Content Standards for Social Studies (adopted January 2026) number each standard within its grade: "SS.4.14" in
// Kindergarten to Grade 8, and "SS.9-12.Gov.13", "SS.9-12.Econ.5" or "SS.9-12.FL.4" in the high school courses. Each
// grade has a theme: Me and My Community (K), Places Near and Far (1), Our State (2), America's Early Story (3), Our New
// Nation (4), Our Changing Nation (5), Ancient and Medieval World Studies (6), Modern World Studies (7) and U.S. History
// and Civics (8). Grade 9 is the high school government course, with economics and financial literacy.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Iowa's own units (rules in Iowa, Iowa places and festivals, Iowa's Native nations, communities and
// symbols, explorers of the Upper Mississippi, settling Iowa, immigrants to Iowa, Iowa and change, money choices, Iowa
// in the world, Iowa and the nation, and governing Iowa) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.6; SS.K.7", "a child's roles in family, school and community, and how people are alike and different"],
    ["families", "share", "SS.K.7; SS.K.10", "how families are alike and different, in the past and today"],
    ["needs-and-wants", "share", "SS.K.19", "describing needs and wants"],
    ["places-near-me", "adopt", "SS.K.8; SS.K.9", "making a route to a place, and why and how people move from place to place"],
    ["fair-and-kind", "adopt", "SS.K.14; SS.K.13", "working together to improve the classroom, and the rules and responsibilities of a group"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.13; SS.K.16", "rules and responsibilities at home and school, and the roles of community helpers and leaders"],
    ["or-k-money-and-work", "adopt", "SS.K.21; SS.K.22", "ways to earn and save money, and forms of money"],
    ["ca-k-calendar", "adopt", "SS.K.11", "putting days and events in order from the past to the present"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "SS.K.12; SS.K.10", "comparing life in the past with life today"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.7; SS.1.8", "physical features on maps, and making a simple map"],
    ["our-land", "share", "SS.1.7; SS.1.11", "land and water on maps, and why people choose to live in different places"],
    ["my-community", "share", "SS.1.14; SS.1.19", "goods from near and far, and how jobs in the community meet people's needs"],
    ["respect-and-inclusion", "adopt", "SS.1.17; SS.1.15", "respecting others' beliefs, traditions and customs, and the different traditions in a community"],
    ["community-services", "adopt", "SS.1.19; SS.1.13", "how jobs and services meet people's needs, and the rights and responsibilities of community members"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.21", "spending, saving and borrowing"],
    ["ca-g1-long-ago", "adopt", "SS.1.22; SS.1.16", "how tools and transportation changed work from the past to today, and traditions passed down"],
    ["ca-g1-models-and-maps", "adopt", "SS.1.8; SS.1.9", "making simple maps and models, and comparing routes on them"],
    ["ny-g1-family-history", "adopt", "SS.1.16", "how traditions and customs pass from earlier generations to today"],
  ],
  "2/social": [
    ["caring-citizens", "share", "SS.2.5", "ways people make a difference in their community"],
    ["needs-and-wants", "share", "SS.2.18", "how people earn and spend money on needs and wants"],
    ["ca-g2-work-and-money", "adopt", "SS.2.18; SS.2.19", "ways people earn, spend and borrow money, and why and how they save"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.12; SS.2.5", "the contributions of people in the past and present, and how people make a difference"],
    ["communities-compared", "adopt", "SS.2.16; SS.2.10", "comparing environments in different places, and how communities change over time"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.10; SS.3.9", "how geography shapes communities and settlements, and how people use natural resources"],
    ["wa-g5-thirteen-colonies", "adopt", "SS.3.14; SS.3.16; SS.3.12", "the regions of the Thirteen Colonies, why they were founded, and the Mayflower Compact"],
    ["ca-g5-colonial-economy", "adopt", "SS.3.15", "how the colonies used natural, human and capital resources to produce goods and services"],
    ["ca-g5-slavery-and-resistance", "adopt", "SS.3.17", "the impact of slavery on early American history"],
    ["or-g5-earn-and-save", "adopt", "SS.3.19; SS.3.18", "why and how people save and invest, and how careers help people earn income"],
  ],
  "4/social": [
    ["ca-g5-road-to-revolution", "adopt", "SS.4.6", "the causes of the American Revolution"],
    ["ca-g5-revolution", "adopt", "SS.4.7; SS.4.11", "the strategies of the Revolutionary War, and the key principles of the Declaration of Independence"],
    ["ca-g5-home-front", "adopt", "SS.4.9", "the perspectives and impact of individuals and groups during the American Revolution"],
    ["ca-g5-westward", "adopt", "SS.4.12; SS.4.13", "how land was added to the United States, and how westward expansion and the landscape shaped each other"],
    ["ny-g8-city-immigrants", "adopt", "SS.4.19; SS.4.20", "the push and pull factors behind immigration, and the experiences of different immigrant groups"],
    ["or-g5-earn-and-save", "adopt", "SS.4.24; SS.4.25", "what shapes spending and saving choices, and planning a simple budget"],
  ],
  "5/social": [
    ["wa-g5-constitution", "adopt", "SS.5.6; SS.5.8", "the origin and purpose of the Constitution, and how it shares power between the federal and state governments"],
    ["ca-g5-constitution", "adopt", "SS.5.7", "how laws are created, changed, limited, upheld and removed"],
    ["wa-g8-bill-of-rights", "adopt", "SS.5.9", "the protections of the Bill of Rights and the responsibilities that come with them"],
    ["ca-g8-civil-war", "adopt", "SS.5.10; SS.5.11", "the changes and divisions that brought about the Civil War, and how the regions shaped it"],
    ["ca-g8-divided-nation", "adopt", "SS.5.12", "laws, court decisions and movements before, during and after the Civil War"],
    ["ca-g8-industrial-america", "adopt", "SS.5.14; SS.5.16", "the inventions of the Industrial Revolution, and the population shifts it caused"],
    ["ny-g8-civil-rights", "adopt", "SS.5.17; SS.5.19", "events, people and campaigns for positive social change, and the Civil Rights Movement"],
  ],
  "6/social": [
    ["mb-mesopotamia", "adopt", "SS.6.7; SS.6.12", "the physical features and lasting achievements of Mesopotamia"],
    ["where-civilizations-grew", "adopt", "SS.6.11; SS.6.8", "the characteristics of a civilization, and how geography shaped daily life in the river valleys"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.6.14; SS.6.16", "how geography shaped daily life in Ancient Egypt, and what made it a civilization"],
    ["mb-egypt-8", "adopt", "SS.6.15", "the eras of Egyptian history"],
    ["ca-g6-hebrews-kush", "adopt", "SS.6.17; SS.6.18", "the origins and spread of Judaism, and its central beliefs"],
    ["ca-g6-greek-world", "adopt", "SS.6.22; SS.6.23", "the forms of government in Ancient Greece, and life in Athens and Sparta"],
    ["ca-g6-roman-empire", "adopt", "SS.6.28; SS.6.29; SS.6.31", "Roman law and government, the change from republic to empire, and the fall of the Western Empire"],
    ["ca-g6-qin-and-han", "adopt", "SS.6.36; SS.6.38", "dynasties in Ancient China, and Chinese philosophies of government and society"],
    ["trade-networks", "adopt", "SS.6.35", "how the Silk Road connected people through trade, ideas and beliefs"],
    ["ca-g7-aztec-inca", "adopt", "SS.6.40; SS.6.42", "how geography and religion shaped the Maya, Aztec and Inca civilizations"],
    ["medieval-europe", "adopt", "SS.6.45; SS.6.46", "the medieval Church, and how laws in medieval England shaped later freedoms"],
    ["ny-g9-crusades-plague", "adopt", "SS.6.47", "the causes and course of the Crusades and their impact"],
    ["renaissance-and-reformation", "adopt", "SS.6.49; SS.6.51", "the start of the Renaissance, and the Protestant Reformation"],
    ["ca-g7-exploration-and-empire", "adopt", "SS.6.53; SS.6.55", "why European countries explored the world, and how exploration affected Indigenous peoples"],
    ["wa-g6-time-sources", "adopt", "SS.6.10; SS.6.2", "time labels historians use, and gathering information from primary and secondary sources"],
  ],
  "7/social": [
    ["ny-g5-countries-capitals", "adopt", "SS.7.12; SS.7.21", "the physical characteristics of North America and Latin America on maps"],
    ["ny-g6-eastern-hemisphere", "adopt", "SS.7.18; SS.7.24; SS.7.28", "the physical characteristics of Europe, Asia and Africa on maps"],
    ["ny-g5-governments", "adopt", "SS.7.16; SS.7.22", "the governments of Canada, Mexico and the United States, and how Latin American governments changed"],
    ["world-beliefs", "share", "SS.7.10", "the origins, practices and traditions of major world religions"],
    ["ny-g5-economics", "adopt", "SS.7.11; SS.7.27", "economic globalization, and the countries that lead production and trade"],
    ["or-g7-age-of-revolutions", "adopt", "SS.7.20", "how revolutions in Europe influenced revolutions in other regions"],
    ["maps-graphs-8", "adopt", "SS.7.12", "using maps, charts and graphs as geographic resources"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "SS.8.10; SS.8.12", "the tensions between the colonies and Britain, and the Declaration of Independence"],
    ["or-g8-founding-ideas", "adopt", "SS.8.15; SS.8.16", "why the Constitution was written, and the debate over ratifying it"],
    ["ca-g8-constitution-at-work", "adopt", "SS.8.17; SS.8.14", "the functions and structure of government under the Constitution, and the responsibilities of citizens"],
    ["or-g8-new-nation", "adopt", "SS.8.18; SS.8.19", "the first political parties, and how early presidents shaped the executive branch"],
    ["wa-g8-westward", "adopt", "SS.8.21; SS.8.23", "push and pull factors in migration, and the impact of westward expansion on Native Americans"],
    ["wa-g8-industry-reform", "adopt", "SS.8.27; SS.8.28", "the first Industrial Revolution, and social and political reforms"],
    ["ca-g8-divided-nation", "adopt", "SS.8.29; SS.8.25", "laws and court decisions about slavery, and how regions shaped antebellum culture"],
    ["wa-g8-civil-war", "adopt", "SS.8.30; SS.8.31", "why the Civil War ended as it did, and Abraham Lincoln's presidency"],
    ["wa-g8-reconstruction", "adopt", "SS.8.34; SS.8.37", "plans for Reconstruction, and the Thirteenth, Fourteenth and Fifteenth Amendments"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.9-12.Gov.1; SS.9-12.Gov.2", "the origins and purposes of government, and the Enlightenment ideas behind the United States government"],
    ["ca-g9-three-branches", "adopt", "SS.9-12.Gov.6; SS.9-12.Gov.7; SS.9-12.Gov.8", "the legislative, executive and judicial branches and their powers"],
    ["ca-g9-rights", "adopt", "SS.9-12.Gov.17; SS.9-12.Gov.14", "the rights, liberties and duties of citizens, and who is a citizen"],
    ["ca-g9-elections", "adopt", "SS.9-12.Gov.13", "the electoral process and election systems in the United States"],
    ["ca-g9-civic-action", "adopt", "SS.9-12.Gov.11; SS.9-12.8", "patterns of political action and activism, and democratic ways to make decisions"],
    ["ca-g9-media", "adopt", "SS.9-12.Gov.12; SS.9-12.4", "the influence of the media and interest groups, and judging the credibility of sources"],
  ],
};
