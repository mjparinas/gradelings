import type { Entry } from "../kit";

// Florida social studies, Kindergarten to Grade 4: the units Florida uses from other frameworks, per grade
// ("<grade>/social"). Florida's social studies standards (the Next Generation Sunshine State Standards) number each
// benchmark by grade, strand, standard and benchmark: "SS.4.A.1.1" is Grade 4, American history, standard 1, benchmark 1
// (A American history, AA African American history, CG civics and government, E economics, FL financial literacy,
// G geography). Kindergarten to Grade 3 follow the standards' own order, and Grade 4 is Florida history.
//
// Only general units free of Canadian content and of other states' place names are adopted, and never another state's
// units about its Tribes or its own state studies. Florida's own units (`fl-` ids, in ../units/social-<grade>.ts) cover
// Florida's symbols, places and people, the North America and Caribbean geography of Grade 3 (which is why they may
// name Canada), and Florida history, government and financial literacy in Grade 4.
export const PLAN_SOCIAL_ELEMENTARY: Record<string, Entry[]> = {
  "k/social": [
    ["mb-k-yesterday-today-tomorrow", "adopt", "SS.K.A.3.1; SS.K.A.1.1", "time words, putting school events in order and starting a timeline"],
    ["ca-k-calendar", "adopt", "SS.K.A.3.2", "days of the week and months of the year on a calendar"],
    ["al-k-clues-from-the-past", "adopt", "SS.K.A.1.2; SS.K.A.2.1", "old photos, letters and objects as clues, and how life then compares with life now"],
    ["ca-k-good-citizens", "adopt", "SS.K.A.2.4; SS.K.CG.2.1", "stories of honesty, courage and responsibility, and being a responsible citizen"],
    ["ny-k-symbols-holidays", "adopt", "SS.K.A.2.2; SS.K.A.2.3; SS.K.A.2.5; SS.K.CG.2.4", "the flag, the eagle, holidays and the traditions families celebrate"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.CG.1.1; SS.K.CG.1.2; SS.K.E.1.1", "rules at home and school, who makes and enforces them, and the jobs people do"],
    ["mb-k-working-together", "adopt", "SS.K.CG.2.2", "taking turns, deciding together and solving problems fairly"],
    ["or-k-money-and-work", "adopt", "SS.K.E.1.1; SS.K.E.1.2; SS.K.E.1.3", "jobs and tools, coins and bills, and working to earn money"],
    ["needs-and-wants", "share", "SS.K.E.1.4", "telling needs from wants"],
    ["pe-first-maps-k", "adopt", "SS.K.G.1.2", "maps and globes as pictures of places"],
    ["places-near-me", "adopt", "SS.K.G.2.1", "places in the school and community"],
    ["ny-k-weather-and-me", "adopt", "SS.K.G.3.1; SS.K.G.3.2; SS.K.G.3.3", "land and water, seasons, weather and how they affect people"],
  ],
  "1/social": [
    ["social-studies-detectives", "adopt", "SS.1.A.1.1; SS.1.A.1.2; SS.1.A.2.5", "asking questions, using sources and telling fact from fiction"],
    ["ca-g1-long-ago", "adopt", "SS.1.A.2.1; SS.1.A.2.2", "how school, travel and daily life were different long ago"],
    ["changes-in-my-life", "adopt", "SS.1.A.3.1; SS.1.A.3.2", "putting events in order and making a timeline of a child's life"],
    ["ny-g1-rules-and-government", "adopt", "SS.1.CG.1.1; SS.1.CG.1.2", "why we have rules and laws, and what happens without them"],
    ["respect-and-inclusion", "adopt", "SS.1.CG.2.1; SS.1.CG.2.2", "rights and responsibilities in the school community"],
    ["my-roles", "adopt", "SS.1.CG.3.2", "roles, responsibilities and making decisions fairly"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.E.1.1; SS.1.E.1.2; SS.1.E.1.5", "how families earn, choose, save and trade"],
    ["pe-goods-and-services-1", "adopt", "SS.1.E.1.3; SS.1.E.1.4", "goods and services, and the buyers, sellers and producers who exchange them"],
    ["pe-needs-and-wants-1", "adopt", "SS.1.E.1.6", "needs, wants and choosing when resources are scarce"],
    ["maps", "share", "SS.1.G.1.2; SS.1.G.1.3", "map keys, symbols and cardinal directions"],
    ["our-land", "share", "SS.1.G.1.4; SS.1.G.1.6", "land and water features, and how weather and the land shape daily life"],
  ],
  "2/social": [
    ["then-and-now", "adopt", "SS.2.A.3.1; SS.2.A.2.4", "ordering events in time and how ways of life change over generations"],
    ["ns-community-change-2", "adopt", "SS.2.A.1.1; SS.2.A.1.2", "finding out about the past from primary and secondary sources"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.CG.1.1; SS.2.CG.2.1; SS.2.CG.2.2", "why people form governments, citizens and the leaders they choose"],
    ["mb-working-together", "adopt", "SS.2.CG.2.3", "working together fairly and helping the community"],
    ["ca-g2-work-and-money", "adopt", "SS.2.E.1.1; SS.2.E.1.4", "scarcity and the costs and benefits of saving and spending"],
    ["pe-work-and-prices-2", "adopt", "SS.2.E.1.2", "how people supply goods and services when consumers want them"],
    ["ny-g3-trade", "adopt", "SS.2.E.1.3", "how places trade goods and services"],
    ["al-g2-reading-maps", "adopt", "SS.2.G.1.1", "map elements on physical, political and thematic maps"],
    ["az-g2-continents-oceans", "adopt", "SS.2.G.1.3", "the continents and oceans on maps and globes"],
    ["ny-g3-globes-and-maps", "adopt", "SS.2.G.1.2; SS.2.G.1.3", "globes and maps, the Equator, hemispheres and locating places"],
  ],
  "3/social": [
    ["mb-ask-and-find", "adopt", "SS.3.A.1.1; SS.3.A.1.2; SS.3.A.1.3", "asking questions, finding information in sources and using the words of the social sciences"],
    ["ny-g3-governments-rights", "adopt", "SS.3.CG.1.2; SS.3.CG.2.1", "how governments get their power from the people, and civic virtues"],
    ["tx-g3-money-and-voting", "adopt", "SS.3.E.1.2; SS.3.E.1.3; SS.3.CG.2.2", "the characteristics of money, buyers and sellers, and the importance of voting"],
    ["ny-g3-trade", "adopt", "SS.3.E.1.1; SS.3.E.1.3", "scarcity, trade and how buyers and sellers exchange goods"],
    ["ny-g3-globes-and-maps", "adopt", "SS.3.G.1.1; SS.3.G.1.2; SS.3.G.1.3; SS.3.G.1.4; SS.3.G.1.5; SS.3.G.1.6", "map elements, thematic maps, continents and oceans, distortion and scale"],
    ["ny-g3-world-communities", "adopt", "SS.3.G.4.1; SS.3.G.4.3", "how the environment influences where people settle, and how communities compare"],
    ["ny-g3-culture", "adopt", "SS.3.G.2.6; SS.3.G.4.2", "the customs, languages and stories of different cultures"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS.4.A.1.1; SS.4.A.1.2", "using primary and secondary sources to learn about the past"],
    ["or-g5-earn-and-save", "adopt", "SS.4.FL.1.1; SS.4.FL.1.2; SS.4.FL.3.2; SS.4.FL.3.3", "jobs, income, saving and what banks do"],
  ],
};
