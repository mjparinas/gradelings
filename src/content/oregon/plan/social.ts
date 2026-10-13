import type { Entry } from "../kit";

// Oregon social: the units Oregon uses from other frameworks, per grade ("<grade>/social"). Codes are Oregon's 2024
// social science standards; Grades 6 and 7 share the 6/7 band. Only general units free of Canadian content and of
// Washington State are used: Washington's units about its Tribes or its state are never adopted. Oregon's own units
// (Oregon history and government, the nine Tribes, world history 600–1900, civics) are in ../units/social*.ts.
// Grade 6 lifts BC Grade 7's ancient-world units, and Grade 7 lifts BC Grade 8, Alberta Grade 8 and Washington
// Grade 6 units on the world after 600 CE (see the pools in ../g6.ts and ../g7.ts).
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.C.IR.2; K.C.DP.4", "the parts of a person's identity and how words and actions affect others"],
    ["families", "share", "K.C.IR.2; K.H.CH.1", "family as part of identity, and events happening in order"],
    ["needs-and-wants", "share", "K.E.IC.3", "goods and services people buy, and choosing between needs and wants"],
    ["fair-and-kind", "adopt", "K.C.DP.4; K.C.IR.3; K.C.CE.6", "caring words and actions, respectful relationships, and rules that promote fairness"],
    ["places-near-me", "adopt", "K.G.GR.2; K.G.MM.5", "places where we live, work and play, and places that matter to families and schools"],
    ["mb-k-jobs-and-rules", "adopt", "K.C.CE.6; K.C.PI.1; K.E.ES.2", "rules that reduce conflict, the purpose of school, and jobs in the community"],
    ["i-am-me", "adopt", "K.C.IR.2", "recognizing the parts of a person's identity"],
  ],
  "1/social": [
    ["my-community", "share", "1.C.PI.1; 1.E.MI.5", "local government and the places in a community that provide goods and services"],
    ["our-land", "share", "1.G.HE.6; 1.G.HE.7", "local natural resources and the ways people change their environment"],
    ["maps", "share", "1.G.GR.1; 1.G.GR.2", "reading maps with legends and keys and locating places in the community"],
    ["changes-in-my-life", "adopt", "1.H.CH.1; 1.H.CE.3", "putting family events in order on a timeline"],
    ["respect-and-inclusion", "adopt", "1.C.IR.3; 1.C.DP.4; 1.H.CP.4", "belonging to groups, the values of civic life and how a person's identity fits with family and school"],
    ["community-services", "adopt", "1.C.PI.1; 1.E.MI.5", "the purpose of local government and the places that provide services"],
    ["wa-g1-earn-save-share", "adopt", "1.E.ES.1; 1.E.ES.2; 1.E.IC.3; 1.E.MI.4", "sources of income, choices about money, needs and wants, and buyers and sellers"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2.E.IC.5", "choices people make about buying goods and services"],
    ["then-and-now", "adopt", "2.H.CH.1; 2.H.CH.2", "telling the recent from the distant past, and community timelines"],
    ["communities-compared", "adopt", "2.G.GR.1; 2.G.HI.6", "the physical and human features of communities and what makes each community rich"],
    ["ns-community-change-2", "adopt", "2.H.CH.2; 2.H.CC.3", "how the local community changes over time and the people who change it"],
    ["mb-working-together", "adopt", "2.C.DP.5; 2.C.CE.6", "ways to resolve conflicts and seeing others' points of view about fairness"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.G.HE.7; 3.E.ST.8", "how people in different places use natural resources to meet their needs and wants"],
    ["mb-global-communities", "adopt", "3.G.HI.5; 3.H.CP.6", "comparing the cultures of communities and how identity shapes a community"],
    ["mb-working-together", "adopt", "3.C.IR.4; 3.C.DP.6", "taking part in decisions together and protecting the rights of the smaller group"],
  ],
  // Grade 4 is Oregon, from time immemorial to the present: every unit is Oregon's own (../units/social-g4.ts).
  // Grade 5 is colonial and early US history; Washington's Grade 5 units are not adopted because most mention
  // Native nations or treaties (oregon.test.ts keeps Washington units about Tribes out), so Oregon's own are used.
  "6/social": [
    ["wa-g6-world-regions", "adopt", "6/7.G.HI.4; 6/7.G.HE.6", "how physical geography and human characteristics shape culture, population and resource use"],
    ["wa-g6-time-sources", "adopt", "6/7.H.CH.1; 6/7.H.CC.4", "timelines of key periods and using primary and secondary sources about the ancient world"],
    ["first-farmers", "adopt", "6/7.H.CH.2; 6/7.G.HE.6", "how farming led to complex societies and how environments shaped early technology"],
    ["where-civilizations-grew", "adopt", "6/7.H.CH.2; 6/7.G.GR.1", "the characteristics of civilizations and how geography influenced where they grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6/7.H.CH.3; 6/7.H.CP.14", "the key features of Mesopotamia and Egypt, early civilizations of Western Asia and North Africa"],
    ["wa-g6-india-china", "adopt", "6/7.H.CH.3; 6/7.H.CP.8", "ancient India and China and the origins of early world religions"],
    ["wa-g6-greece-rome", "adopt", "6/7.C.PI.1; 6/7.C.IR.6", "governance in Greece and Rome and the rights and roles of their citizens"],
    ["laws-and-government", "adopt", "6/7.C.PI.1; 6/7.C.IR.6", "early forms of governance and law, and who had rights in ancient societies"],
    ["world-beliefs", "adopt", "6/7.H.CP.8; 6/7.H.CP.10", "the origins and central teachings of major world religions"],
    ["trade-networks", "adopt", "6/7.H.CC.4; 6/7.G.MM.3", "exchanges between ancient cultures and how trade and transport spread ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "6/7.C.PI.2; 6/7.C.IR.7", "governance and the roles of people in medieval Europe after 600 CE"],
    ["islamic-world", "adopt", "6/7.H.CP.14; 6/7.H.CC.5", "the Islamic world after 600 CE and its exchanges of ideas with other cultures"],
    ["wa-g6-trade-beliefs", "adopt", "6/7.G.MM.3; 6/7.H.CC.5", "trade routes after 600 CE and how they spread religions and ideas"],
    ["renaissance-and-reformation", "adopt", "6/7.H.CC.5; 6/7.C.PI.4", "the Renaissance and Reformation and how religion and ideas shaped government"],
    ["japan-land-values-ab", "adopt", "6/7.G.HI.4; 6/7.C.PI.2", "how Japan's geography shaped its culture and government"],
  ],
  "8/social": [
    ["wa-g8-bill-of-rights", "adopt", "8.C.IR.9; 8.C.DP.11", "rights and responsibilities under the Constitution, and liberty in tension with the common good"],
    ["wa-g8-civil-war", "adopt", "8.H.CE.7; 8.H.CE.8", "the conflict over slavery that led to the Civil War, and the war's political and military significance"],
    ["maps-graphs-8", "adopt", "8.G.GR.1; 8.G.GR.2", "using maps and other representations to show change in population and political geography"],
    ["mb-evidence-8", "adopt", "8.H.CC.4; 8.H.CP.9", "analyzing primary and secondary sources and judging their reliability"],
  ],
  // Grade 9 is civics and economics; Washington's civics units are about Washington State or its Tribes, so every
  // Grade 9 unit is Oregon's own.
};
