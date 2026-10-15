import type { Entry } from "../kit";

// Arkansas social studies, Kindergarten to Grade 4: the units Arkansas uses from other frameworks, per grade
// ("<grade>/social"). The Arkansas Social Studies Academic Standards (2022) teach civics, economics, geography and
// history in every elementary grade, and number each standard by strand, standard, grade and number: "C.1.K.3" is
// civics standard 1, Kindergarten, number 3 (C civics and government, E economics, G geography, H history).
//
// Only general units free of Canadian content and of other states' place names are adopted, and never another state's
// units about its Tribes or its own state studies. Arkansas's own units (`ar-` ids, in ../units/social-<grade>.ts) cover
// the Arkansas symbols, goods, landmarks, regions, government and history the standards name, plus Arkansas copies of
// other states' units with their state questions left out.
export const PLAN_SOCIAL_ELEMENTARY: Record<string, Entry[]> = {
  "k/social": [
    ["mb-k-jobs-and-rules", "adopt", "C.1.K.1; C.1.K.2; C.1.K.6", "why we have rules at home and school, and what leaders and helpers do"],
    ["fair-and-kind", "adopt", "C.1.K.5; C.1.K.8", "taking turns, listening and solving classroom problems fairly"],
    ["ca-k-good-citizens", "adopt", "C.1.K.4; C.1.K.7", "being a good citizen at school and helping the community"],
    ["families", "share", "G.1.K.5", "family customs, celebrations and traditions"],
    ["needs-and-wants", "share", "E.1.K.1; E.1.K.2", "telling needs from wants, and making choices"],
    ["or-k-money-and-work", "adopt", "E.1.K.3; E.1.K.6; E.1.K.7; E.1.K.8", "goods and services, using money to buy them, and saving"],
    ["places-near-me", "adopt", "G.1.K.1; G.1.K.2", "describing places near us and their land and water"],
    ["pe-first-maps-k", "adopt", "G.1.K.3", "what maps are and how to read simple maps of familiar places"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "H.1.K.1; H.1.K.2", "first, next and last, and putting events in order"],
    ["al-k-clues-from-the-past", "adopt", "H.1.K.3; H.1.K.7", "comparing daily life now and long ago, and how photos, objects and stories tell about the past"],
    ["ny-k-symbols-holidays", "adopt", "H.1.K.5", "national holidays and the people and events they honor"],
  ],
  "1/social": [
    ["my-community", "share", "C.1.1.2; C.1.1.9", "the people who lead and serve a community, and how communities work together"],
    ["respect-and-inclusion", "adopt", "C.1.1.1; C.1.1.5", "fairness and equality, and the responsibilities of a good citizen"],
    ["community-services", "adopt", "E.1.1.8", "public services such as police, fire fighters, libraries and parks"],
    ["wa-g1-earn-save-share", "adopt", "E.1.1.3; E.1.1.7", "working to earn money, and why and how people save it"],
    ["pe-goods-and-services-1", "adopt", "E.1.1.4; E.1.1.5", "goods and services, and the buyers and sellers who exchange them"],
    ["pe-needs-and-wants-1", "adopt", "E.1.1.1; E.1.1.2", "needs, wants and choosing when we can't have everything"],
    ["maps", "share", "G.1.1.1; G.1.1.3", "map keys, symbols and directions, and making maps of local places"],
    ["our-land", "share", "G.1.1.2; G.1.1.6", "landforms and bodies of water, and how they shape daily life"],
    ["changes-in-my-life", "adopt", "H.1.1.2", "timelines of a child's life and family"],
    ["ca-g1-long-ago", "adopt", "H.1.1.1; H.1.1.3", "comparing school, work, travel and technology long ago and today"],
    ["social-studies-detectives", "adopt", "H.1.1.7; H.1.1.8", "finding facts in sources and asking where they come from"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "C.1.2.2; C.1.2.5", "citizens' rights and responsibilities, and the leaders of a community"],
    ["ny-g2-jobs-and-taxes", "adopt", "C.1.2.3; E.1.2.8", "what local government does and how taxes pay for public services"],
    ["mb-working-together", "adopt", "C.1.2.6; C.1.2.9", "building agreement and working together on problems"],
    ["ca-g2-work-and-money", "adopt", "E.1.2.3; E.1.2.7", "the skills workers need, and saving money in banks"],
    ["pe-work-and-prices-2", "adopt", "E.1.2.1; E.1.2.2", "scarcity, choices and their costs and benefits"],
    ["or-g2-world-maps", "adopt", "G.1.2.2", "continents, oceans and the Equator on maps and globes"],
    ["climate-and-ways-of-life", "adopt", "G.1.2.6", "how weather, climate and the land shape the way people live"],
    ["communities-compared", "adopt", "G.1.2.5; G.1.2.8", "how communities differ and how people and goods move between them"],
    ["then-and-now", "adopt", "H.1.2.3", "comparing life in a community in the past and today"],
    ["ns-community-change-2", "adopt", "H.1.2.1; H.1.2.2", "how a community is founded and changes over time"],
  ],
  "3/social": [
    ["ny-g3-globes-and-maps", "adopt", "G.1.3.1; G.1.3.2", "globes, world maps, directions, scale and thematic maps"],
    ["mb-global-communities", "adopt", "G.1.3.5", "how people live in communities around the world"],
    ["ny-g3-culture", "adopt", "G.1.3.5; G.1.3.9", "culture and traditions, and why groups of people move and settle"],
    ["ny-g3-trade", "adopt", "E.1.3.10; E.1.3.11", "imports, exports and how trade connects places around the world"],
    ["ny-g3-governments-rights", "adopt", "C.1.3.5", "rights and responsibilities of citizens in different places"],
    ["mb-ask-and-find", "adopt", "H.1.3.7; H.1.3.8", "asking questions and finding and recording answers from sources"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "E.1.4.3; E.1.4.7", "earning income, budgeting and saving, and what banks do"],
    ["or-g5-history-detective", "adopt", "H.1.4.8; H.1.4.9", "primary and secondary sources, and making claims with evidence"],
    ["ny-g3-world-communities", "adopt", "G.1.4.5", "comparing the cultures of places and regions around the world"],
  ],
};
