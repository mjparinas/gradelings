import type { Entry } from "../kit";

// Missouri social studies: the units Missouri uses from other frameworks, per grade ("<grade>/social"). The Missouri
// Learning Standards for social studies (2016) give Kindergarten to Grade 5 grade-level expectations by strand
// ("4.H.3.D.a": grade, strand, theme number, concept, item; PC principles of constitutional democracy, GS governance
// systems, H history, E economics, EG elements of geography, RI relationships of individuals and groups, TS tools of
// social science inquiry). Kindergarten to Grade 2 move from the child to the community and the nation, Grade 3 is
// Missouri studies (all Missouri's own units, in ../units), Grade 4 United States history before 1800 and Grade 5
// after it. Grades 6 to 8 cite the middle school courses, which share one 6-8 band: world geography ("6-8.GEO.2.PC.A")
// in Grade 6, world history to about 1450 ("6-8.WH.3.CC.A") in Grade 7 and American history to about 1870
// ("6-8.AH.5.CC.C") in Grade 8. Grade 9 cites the high school government course ("9-12.GV.3.GS.C"), which Missouri
// pairs with the US and Missouri Constitutions test and the civics test. Only general units free of Canadian content and
// of other states' places are adopted, and never another state's units about its Tribes; Missouri copies of units that
// fit except for a few questions are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.H.3.B.a; K.H.3.B.b", "making a personal history and comparing a family's past and present"],
    ["families", "share", "K.RI.6.A.a; K.RI.6.C.a; K.RI.6.D.a", "family traditions, celebrations and stories, and how families remember their heritage"],
    ["needs-and-wants", "share", "K.E.4.A.a; K.E.4.A.b; K.E.4.A.c", "needs and wants, scarcity and choosing one thing over another at home and school"],
    ["places-near-me", "adopt", "K.EG.5.A.a; K.EG.5.A.b; K.EG.5.B.a", "maps of familiar places, and position words such as above, below, left and right"],
    ["fair-and-kind", "adopt", "K.PC.1.B.a; K.PC.1.C.a; K.RI.6.B.a", "why schools have rules, individual rights, and settling disagreements peacefully"],
    ["mb-k-jobs-and-rules", "adopt", "K.GS.2.D.a; K.PC.1.B.a", "the roles of people in authority at home and school, and why school has rules"],
    ["ca-k-good-citizens", "adopt", "K.GS.2.C.a; K.PC.1.E.a", "how groups make decisions, and the traits of good role models"],
    ["ca-k-calendar", "adopt", "K.H.3.B.a; K.TS.7.B.a", "days, weeks and months, and using before and after to put events in order"],
    ["or-k-money-and-work", "adopt", "K.E.4.A.c", "needs, wants and how money is traded for goods and services"],
  ],
  "1/social": [
    ["maps", "share", "1.EG.5.A.b; 1.EG.5.A.d; 1.EG.5.B.a", "reading maps with a title and key, using a compass rose, and describing where places are"],
    ["our-land", "share", "1.EG.5.C.a", "the land, water and weather of a community"],
    ["my-community", "share", "1.EG.5.C.b; 1.GS.2.C.a", "the people, buildings and work of a community, and how its decisions are made"],
    ["ca-g1-long-ago", "adopt", "1.H.3.B.a", "school, travel and daily life in the community long ago compared with today"],
    ["respect-and-inclusion", "adopt", "1.RI.6.A.a; 1.RI.6.B.a; 1.PC.1.C.a", "the cultures in a school and community, peaceful ways to settle disputes, and protecting everyone's rights"],
    ["community-services", "adopt", "1.E.4.A.b; 1.E.4.A.c", "goods and services, and the producers and consumers in a community"],
    ["wa-g1-earn-save-share", "adopt", "1.E.4.A.a", "scarcity, choices, and earning, spending and saving"],
    ["ga-g1-american-heroes", "adopt", "1.H.3.C.a; 1.PC.1.E.a", "the people remembered on national holidays and the traits of good role models"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2.E.4.B.a", "weighing costs and benefits when choosing between needs and wants"],
    ["then-and-now", "adopt", "2.H.3.A.a", "how the people and culture of a community have changed over time"],
    ["communities-compared", "adopt", "2.EG.5.F.a; 2.EG.5.F.b; 2.EG.5.F.c", "kinds of regions, such as urban and rural, and why people settle where they do"],
    ["or-g2-world-maps", "adopt", "2.EG.5.B.a; 2.EG.5.A.a", "continents, oceans and hemispheres, and maps with a title and key"],
    ["mb-working-together", "adopt", "2.PC.1.D.a", "how active, informed citizens make a difference in a community"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.PC.1.F.b; 2.GS.2.C.a", "national symbols such as the White House and the Capitol, and the jobs of government leaders"],
    ["ca-g2-work-and-money", "adopt", "2.E.4.A.b; 2.E.4.A.d", "using money to buy and sell goods and services, and how work earns income"],
  ],
  "3/social": [
    ["mb-ask-and-find", "adopt", "3.TS.7.E.a; 3.TS.7.E.c", "asking questions about a social studies topic and finding answers in good sources"],
  ],
  "4/social": [
    ["ny-g5-columbian-exchange", "adopt", "4.H.3.B.a", "the exchange of plants, animals and diseases between the Americas and Europe, and how it changed people's lives"],
    ["ca-g5-thirteen-colonies", "adopt", "4.H.3.A.b; 4.EG.5.D.a", "the New England, Middle and Southern colonies and how people adapted to their land"],
    ["ca-g5-colonial-economy", "adopt", "4.E.4.A.c; 4.E.4.D.a", "natural, capital and human resources, and work and trade in the colonies"],
    ["ca-g5-slavery-and-resistance", "adopt", "4.H.3.A.c; 4.RI.6.E.a", "why African people were enslaved and brought to the colonies, and how they resisted"],
    ["ca-g5-road-to-revolution", "adopt", "4.H.3.D.a", "the causes of the American Revolution from the views of Patriots, Loyalists and others"],
    ["ca-g5-revolution", "adopt", "4.H.3.D.a; 4.PC.1.A.a", "the American Revolution and the main ideas of the Declaration of Independence"],
    ["ca-g5-home-front", "adopt", "4.H.3.F.a; 4.H.3.C.a", "hardships during the Revolution, the Northwest Territory, and people who shaped the new nation"],
    ["ca-g5-constitution", "adopt", "4.H.3.E.a; 4.GS.2.D.a", "writing the Constitution and the three branches of the federal government"],
    ["wa-g8-bill-of-rights", "adopt", "4.PC.1.C.a; 4.PC.1.C.b", "the purpose of the Bill of Rights and the freedoms it protects"],
    ["ca-g5-american-creed", "adopt", "4.PC.1.F.a", "national symbols and the ideals they stand for"],
    ["or-g5-history-detective", "adopt", "4.TS.7.A.a; 4.TS.7.C.a", "primary and secondary sources, fact and opinion, and point of view"],
    ["or-g5-timeline", "adopt", "4.TS.7.B.b", "putting events from the first colonies to the Constitution in order on a timeline"],
    ["or-g5-earn-and-save", "adopt", "4.E.4.A.a; 4.E.4.A.b", "saving and investing, and profit and loss in economic decisions"],
    ["or-g5-states-capitals", "adopt", "4.EG.5.B.a", "naming and locating the states and their capitals"],
  ],
  "5/social": [
    ["ca-g8-civil-war", "adopt", "5.H.3.G.a", "the causes and consequences of the Civil War"],
    ["wa-g8-reconstruction", "adopt", "5.H.3.G.a; 5.PC.1.C.a", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["ca-g8-industry-reform", "adopt", "5.E.4.D.a; 5.H.3.E.a", "factories, inventions and the reformers who worked to change society"],
    ["ny-g8-city-immigrants", "adopt", "5.H.3.A.b; 5.E.4.D.b; 5.RI.6.A.b", "immigrants, growing cities and how migration changed the United States"],
    ["ny-g8-workers-progressives", "adopt", "5.H.3.E.a; 5.PC.1.D.a", "workers, unions and the reforms of the Progressive Era"],
    ["ny-g8-roaring-twenties", "adopt", "5.RI.6.A.a; 5.RI.6.C.a", "life, music and culture in the 1920s"],
    ["ny-g8-great-depression", "adopt", "5.H.3.H.a", "the causes and consequences of the Great Depression and the New Deal"],
    ["al-g9-world-war-ii", "adopt", "5.H.3.I.a", "the causes and consequences of World War II"],
    ["ny-g8-postwar-america", "adopt", "5.H.3.I.b; 5.EG.5.E.a", "life after World War II, the Cold War years and new technology"],
    ["tx-g5-modern-america", "adopt", "5.H.3.I.b; 5.PC.1.E.a", "the United States in the 1900s and 2000s and the people who shaped it"],
    ["ny-g8-timeline", "adopt", "5.TS.7.B.a", "putting events from 1865 to the present in order on a timeline"],
  ],
  "6/social": [
    ["ga-g6-europe", "adopt", "6-8.GEO.2.PC.A; 6-8.GEO.2.CC.A", "the land, people and cultures of Europe"],
    ["ga-g7-africa", "adopt", "6-8.GEO.2.PC.A; 6-8.GEO.2.EC.A", "the land, people, resources and cultures of Africa"],
    ["ga-g7-southwest-asia", "adopt", "6-8.GEO.2.PC.D; 6-8.GEO.2.EC.A", "the land, people, beliefs and resources of Southwest Asia"],
    ["ga-g7-southern-eastern-asia", "adopt", "6-8.GEO.2.PC.A; 6-8.GEO.2.G.D", "the land, people and cultures of Southern and Eastern Asia"],
    ["ga-g7-population", "adopt", "6-8.GEO.2.G.D; 6-8.GEO.2.CC.C", "where people live, why they move, and how settlement changes places"],
    ["ga-g7-economies", "adopt", "6-8.GEO.2.EC.C; 6-8.GEO.2.EC.D", "economic systems, trade and measures such as GDP"],
    ["quality-of-life-8", "adopt", "6-8.GEO.2.PC.B; 6-8.GEO.2.EC.B", "quality of life around the world and how places meet people's needs"],
  ],
  "7/social": [
    ["wa-g6-time-sources", "adopt", "6-8.WH.1.CC.A; 6-8.WH.1.PC.A", "studying the past from primary and secondary sources, and counting time in BCE and CE"],
    ["first-farmers", "share", "6-8.WH.2.CC.A", "early people, and how farming led to settled villages"],
    ["where-civilizations-grew", "share", "6-8.WH.2.G.A", "how river valleys supported the first civilizations"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6-8.WH.2.CC.B; 6-8.WH.2.GS.C", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["ca-g6-hebrews-kush", "adopt", "6-8.WH.2.PC.A; 6-8.WH.2.PC.B", "ancient Israel and the beliefs of Judaism, and the kingdom of Kush"],
    ["wa-g6-india-china", "adopt", "6-8.WH.2.PC.B; 6-8.WH.3.CC.A", "ancient India and China and the beliefs that began there"],
    ["ca-g6-greek-world", "adopt", "6-8.WH.3.CC.A; 6-8.WH.3.PC.A", "the rise of Greek civilization and its art, myths and ideas"],
    ["wa-g6-greece-rome", "adopt", "6-8.WH.3.GS.B; 6-8.WH.3.GS.C", "democracy in Athens, the Roman Republic and the rule of law"],
    ["ca-g7-rome-byzantium", "adopt", "6-8.WH.3.CC.A; 6-8.WH.3.PC.D", "the fall of Rome, the Byzantine Empire and the spread of Christianity"],
    ["trade-networks", "share", "6-8.WH.3.EC.A", "trade between early civilizations and the movement of goods and ideas"],
    ["medieval-europe", "adopt", "6-8.WH.4.CC.A; 6-8.WH.4.GS.B", "feudal kingdoms in medieval Europe and the Magna Carta"],
    ["islamic-world", "adopt", "6-8.WH.4.PC.B; 6-8.WH.4.CC.B", "the origins and spread of Islam and the Islamic world's cities and learning"],
    ["ny-g9-crusades-plague", "adopt", "6-8.WH.4.CC.C", "how the Crusades and the Black Death changed Europe, Asia and Africa"],
    ["or-g7-african-kingdoms", "adopt", "6-8.WH.4.CC.D; 6-8.WH.4.EC.A", "the kingdoms of West Africa and trans-Saharan trade"],
    ["ca-g7-aztec-inca", "adopt", "6-8.WH.4.CC.D", "the Maya, Aztec and Inca civilizations"],
    ["world-beliefs", "share", "6-8.WH.2.PC.B; 6-8.WH.3.PC.D; 6-8.WH.4.PC.B", "the origins and central teachings of major world religions"],
  ],
  "8/social": [
    ["mb-evidence-8", "adopt", "6-8.AH.1.CC.B; 6-8.AH.1.PC.A", "analyzing primary and secondary sources and how perspective shapes them"],
    ["maps-graphs-8", "adopt", "6-8.AH.2.G.C", "using maps, graphs and population data to show change over time"],
    ["tx-g8-colonies-revolution", "adopt", "6-8.AH.2.CC.B; 6-8.AH.3.CC.A", "why Europeans settled the colonies, and the road to independence"],
    ["ca-g8-revolutionary-ideas", "adopt", "6-8.AH.3.CC.B; 6-8.AH.3.EC.A", "the grievances and ideas of the Declaration of Independence"],
    ["or-g8-founding-ideas", "adopt", "6-8.AH.3.GS.C; 6-8.AH.3.GS.D", "natural rights and the social contract, and the Articles of Confederation"],
    ["ca-g8-constitution-at-work", "adopt", "6-8.AH.3.CC.D; 6-8.AH.3.GS.E", "debates over the Constitution, and separation of powers, checks and balances and federalism"],
    ["ca-g8-new-nation", "adopt", "6-8.AH.3.CC.E; 6-8.AH.3.CC.F", "the first presidents, the first political parties and the War of 1812"],
    ["wa-g8-industry-reform", "adopt", "6-8.AH.4.PC.A; 6-8.AH.5.EC.A", "factories, workers and the reform movements of the 1800s"],
    ["tx-g8-divided-nation", "adopt", "6-8.AH.5.CC.A; 6-8.AH.5.CC.B", "compromises over slavery and the conflicts that divided North and South"],
    ["wa-g8-civil-war", "adopt", "6-8.AH.5.CC.C; 6-8.AH.5.EC.B", "the turning points and battles of the Civil War and the strengths of each side"],
    ["fl-g8-freedom-struggle", "adopt", "6-8.AH.5.PC.D; 6-8.AH.4.PC.B", "the experiences of enslaved people and the abolitionist movement"],
    ["or-g8-reconstruction", "adopt", "6-8.AH.5.GS.B; 6-8.AH.5.PC.E", "Reconstruction and the amendments that redefined rights"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "9-12.GV.2.CC.B; 9-12.GV.2.GS.B", "the ideas behind the Declaration of Independence, and natural law, the social contract and popular sovereignty"],
    ["ca-g9-dictatorship-democracy", "adopt", "9-12.GV.2.CC.D", "comparing democratic and authoritarian governments"],
    ["me-g9-us-government", "adopt", "9-12.GV.3.GS.C; 9-12.GV.3.GS.D", "the three branches of the federal government, and how checks and balances limit power"],
    ["or-g9-three-branches", "adopt", "9-12.GV.3.GS.C; 9-12.GV.4.CC.A", "the roles of Congress, the President and the courts, and how their power has changed"],
    ["ga-g9-congress-president", "adopt", "9-12.GV.4.GS.C; 9-12.GV.4.G.A", "how Congress and the President are chosen, and reading election results"],
    ["ga-g9-criminal-justice", "adopt", "9-12.GV.3.GS.E", "how the Bill of Rights protects people accused of crimes"],
    ["ca-g9-civic-action", "adopt", "9-12.GV.4.CC.C; 9-12.GV.4.GS.B", "citizens' duties and the ways they take part in government"],
    ["ca-g9-media", "adopt", "9-12.GV.4.PC.A; 9-12.GV.4.PC.B", "how political parties, interest groups and the media shape public opinion"],
  ],
};
