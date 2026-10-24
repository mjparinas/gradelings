import type { Entry } from "../kit";

// Pennsylvania social studies, Kindergarten to Grade 4: the units Pennsylvania uses from other frameworks, per grade
// ("<grade>/social"). Pennsylvania's standards (the 2003 civics and government, geography and history standards, the
// 2025 economics standards and the 2026 personal finance standards) are written by area and repeated at every grade with
// grade-level wording: civics and government 5.1 to 5.3, economics 6.1 to 6.4, geography 7.1 to 7.4, history 8.1 to 8.4
// and personal finance 17.1 to 17.6 (economics and personal finance in the bands K-2 and 3-5). The standards don't say
// which topics belong to which grade, so the grades follow how Pennsylvania schools teach: Kindergarten to Grade 2
// families, rules, jobs, maps, then and now, money and choices; Grade 3 communities and local government with the
// basics of Pennsylvania; Grade 4 Pennsylvania studies (Chapter 4 of the Pennsylvania Code asks every elementary
// student to study the history of the Commonwealth, geography and civics at least once).
//
// Only general units free of Canadian content and of other states' place names are adopted, and never another state's
// units about its Tribes or its own state studies. Pennsylvania's own units (`pa-` ids, in ../units/social-<grade>.ts)
// cover Pennsylvania's symbols, places, government and history, and the personal finance standards.
export const PLAN_SOCIAL_ELEMENTARY: Record<string, Entry[]> = {
  "k/social": [
    ["mb-k-yesterday-today-tomorrow", "adopt", "8.1.K.A; 8.3.K.C", "time words and putting events in order, using days, weeks and months"],
    ["ca-k-calendar", "adopt", "8.1.K.A", "days of the week and months of the year on a calendar"],
    ["al-k-clues-from-the-past", "adopt", "8.1.K.B; 8.1.K.C", "old photos, letters and objects as clues, and how to find information in a source"],
    ["ca-k-good-citizens", "adopt", "5.2.K.D; 5.3.K.F", "honesty, courage and responsibility, and being a responsible member of the class"],
    ["ny-k-symbols-holidays", "adopt", "5.1.K.F; 8.3.K.A; 8.4.K.A; 8.4.K.C", "American symbols and holidays, and how families and cultures celebrate"],
    ["mb-k-jobs-and-rules", "adopt", "5.1.K.A; 5.2.K.A; 5.2.K.C; 5.3.K.D", "the purpose of rules, jobs at school, and who is in charge"],
    ["mb-k-working-together", "adopt", "5.2.K.B; 8.2.K.D; 8.4.K.D", "taking turns, solving problems fairly and getting along"],
    ["or-k-money-and-work", "adopt", "6.2.K-2.A; 17.2.K-2.A; 17.3.K-2.C; 17.3.K-2.D", "goods and services, why people need income, and using money to spend, save and share"],
    ["needs-and-wants", "share", "6.1.K-2.B; 17.1.K-2.B", "telling needs from wants and choosing when we cannot have everything"],
    ["pe-first-maps-k", "adopt", "7.1.K.A", "maps as pictures of places"],
    ["places-near-me", "adopt", "7.1.K.B; 7.2.K.A; 6.2.K-2.H", "places in the community, what they are for, and businesses nearby"],
    ["ca-k-signs-and-school", "adopt", "7.1.K.A; 5.3.K.D", "map and traffic symbols, the layout of the school and the jobs people do there"],
    ["ny-k-weather-and-me", "adopt", "7.2.K.A", "land and water, weather and seasons, and how they affect the way people live"],
    ["mb-k-find-out", "adopt", "8.1.K.C; 8.1.K.B", "finding out from sources, sorting and telling what we know"],
    ["families", "share", "8.4.K.A; 8.4.K.C", "how families are alike and different and celebrate in different ways"],
    ["fair-and-kind", "adopt", "5.2.K.D; 8.4.K.D", "being fair and kind, and getting along with others"],
    ["all-about-me", "share", "5.2.K.A; 5.2.K.C", "what makes each person special, and responsibilities at school"],
  ],
  "1/social": [
    ["social-studies-detectives", "adopt", "8.1.1.C; 8.1.1.B", "asking questions, using sources and telling fact from fiction"],
    ["changes-in-my-life", "adopt", "8.1.1.A; 8.3.1.C", "putting events in order and making a timeline of a child's life"],
    ["ca-g1-long-ago", "adopt", "8.3.1.C; 8.1.1.C", "how school and travel were different long ago"],
    ["ny-g1-rules-and-government", "adopt", "5.1.1.A; 5.1.1.B; 5.3.1.D; 5.3.1.E", "why we have rules, who makes them and how leaders are chosen"],
    ["respect-and-inclusion", "adopt", "5.2.1.D; 8.3.1.D", "respectful and inclusive behavior at school"],
    ["my-roles", "adopt", "5.2.1.A; 5.2.1.C", "responsibilities at home and at school"],
    ["community-services", "adopt", "5.3.1.C; 6.3.K-2.I", "fire fighters, police officers and other services in the community"],
    ["wa-g1-earn-save-share", "adopt", "6.1.K-2.B; 17.2.K-2.A; 17.3.K-2.D; 17.4.K-2.B", "how families earn, choose, save and share"],
    ["pe-goods-and-services-1", "adopt", "6.2.K-2.A; 6.1.K-2.J", "goods and services, and why people trade"],
    ["pe-needs-and-wants-1", "adopt", "6.1.K-2.B; 17.1.K-2.B", "needs, wants and choosing when resources are limited"],
    ["maps", "share", "7.1.1.A", "simple maps, symbols and directions"],
    ["our-land", "share", "7.2.1.A; 7.2.1.B", "land and water features, and what shapes them"],
    ["my-community", "share", "5.2.1.A; 8.2.1.A", "people and places in the local community, and groups that contribute to it"],
    ["ny-g1-family-history", "adopt", "8.1.1.A; 8.1.1.C; 8.4.1.A", "family history, timelines, and old photos and letters as sources"],
    ["mb-g1-thinking-skills", "adopt", "8.1.1.B; 8.1.1.C", "asking questions, comparing sources and telling fact from opinion"],
    ["places-in-my-community", "adopt", "7.1.1.B; 7.2.1.A", "natural and built places in a community and where they are"],
    ["measure-and-map", "adopt", "7.1.1.A", "reading map parts and drawing a simple map"],
    ["ca-g1-models-and-maps", "adopt", "7.1.1.A", "comparing a model, a picture and a map of the same place"],
  ],
  "2/social": [
    ["then-and-now", "adopt", "8.1.2.A; 8.3.2.C", "ordering events in time and how ways of life change over generations"],
    ["ns-community-change-2", "adopt", "8.1.2.C; 8.1.2.B", "finding out about the past from different sources"],
    ["ca-g2-citizens-and-leaders", "adopt", "5.3.2.D; 5.3.2.E; 5.3.2.F", "how people choose leaders, elections and the work of leaders"],
    ["ca-g2-work-and-money", "adopt", "6.1.K-2.B; 17.1.K-2.A; 17.4.K-2.B", "scarcity, and the costs and benefits of saving and spending"],
    ["pe-work-and-prices-2", "adopt", "6.2.K-2.A; 6.2.K-2.J", "how people supply goods and services and why prices change"],
    ["ny-g2-jobs-and-taxes", "adopt", "6.3.K-2.E; 6.3.K-2.I; 5.3.2.C", "community workers, taxes and the services government provides"],
    ["al-g2-reading-maps", "adopt", "7.1.2.A", "map features and directions"],
    ["pe-changing-land-2", "adopt", "7.4.2.A; 7.4.2.B", "how places change and how people use and care for the environment"],
    ["needs-and-wants", "share", "6.1.K-2.B; 6.1.K-2.I", "how needs and wants are met in communities and why people divide tasks"],
    ["caring-citizens", "share", "5.2.2.A; 5.2.2.C", "rights, roles and responsibilities in the community"],
    ["climate-and-ways-of-life", "adopt", "7.2.2.A; 7.4.2.A", "how climate and landforms shape the way communities live"],
    ["communities-compared", "adopt", "8.4.2.C; 7.2.2.A", "comparing our community with communities in other parts of the world"],
    ["az-g2-continents-oceans", "adopt", "7.1.2.A; 7.2.2.A", "maps and globes, continents and oceans"],
    ["pe-technology-2", "adopt", "8.2.2.C; 8.3.2.C", "how technology has changed daily life over time"],
    ["pe-people-who-change-things-2", "adopt", "8.3.2.A; 8.2.2.A", "how people and groups contribute to change"],
    ["pe-changes-in-my-life-2", "adopt", "8.1.2.A", "changes in a child's life shown on a timeline"],
  ],
  "3/social": [
    ["mb-ask-and-find", "adopt", "8.1.3.C; 8.1.3.B", "asking questions, finding information in sources and using social studies words"],
    ["ny-g3-governments-rights", "adopt", "5.1.3.C; 5.2.3.A; 5.3.3.F", "how governments get their power from the people, and rights and fairness"],
    ["tx-g3-money-and-voting", "adopt", "6.4.3-5.A; 6.2.3-5.A; 5.3.3.E", "money, buyers and sellers, and voting"],
    ["ny-g3-trade", "adopt", "6.1.3-5.K; 6.1.3-5.J; 6.1.3-5.C", "scarcity, trade and how buyers and sellers exchange goods"],
    ["ny-g3-globes-and-maps", "adopt", "7.1.3.A; 7.1.3.B", "globes and maps, hemispheres and locating places"],
    ["ny-g3-world-communities", "adopt", "7.3.3.A; 7.4.3.A", "how the environment influences where people settle"],
    ["ny-g3-culture", "adopt", "8.4.3.A; 8.4.3.C", "the customs, languages and stories of different cultures"],
    ["mb-working-together", "adopt", "5.2.3.B; 8.4.3.D", "working together fairly and resolving conflict"],
    ["meeting-needs", "share", "6.1.3-5.C; 7.4.3.A", "how people meet their needs in different places"],
    ["mb-global-communities", "adopt", "8.4.3.C; 7.3.3.A", "how communities around the world are alike and different"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "8.1.4.B; 8.1.4.C", "using primary and secondary sources, telling fact from opinion and asking research questions"],
    ["or-g5-earn-and-save", "adopt", "17.2.3-5.A; 17.4.3-5.B; 17.4.3-5.C; 17.3.3-5.D", "income, saving, what banks do and making a budget"],
    ["mb-power-conflict", "adopt", "5.2.4.B; 5.3.4.F", "where conflict comes from and peaceful ways to solve it"],
    ["ca-g5-colonial-economy", "adopt", "6.1.3-5.I; 8.3.4.C", "colonial trade and work, specialization and interdependence"],
  ],
};
