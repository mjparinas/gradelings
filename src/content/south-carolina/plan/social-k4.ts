import type { Entry } from "../kit";

// South Carolina social studies, Kindergarten to Grade 4: the units South Carolina uses from other frameworks, per grade
// ("<grade>/social"). The 2019 standards teach history, geography, economics and civics and government in Kindergarten
// to Grade 2 ("K.H.1", "1.G.2", "2.CG.3"), world geography in Grade 3 by theme and indicator ("3.1.2.AG") and United
// States and South Carolina history in Grade 4 by standard and skill ("4.2.CX": standard 2, contextualization).
//
// Grade themes: The Community Around Us (K), Life in South Carolina (1), Life in the United States (2), World Geography
// (3) and United States and South Carolina Studies I, about 1600 to Reconstruction (4). Only general units free of
// Canadian content and of other states' place names are adopted, and never another state's units about its Tribes or
// its own state studies. South Carolina's own units (`sc-` ids, in ../units/social-<grade>.ts) cover the South Carolina
// geography, government and history the standards name, natural hazards and exploration in Grade 3, and the American
// symbols and landforms of Grade 2.
export const PLAN_SOCIAL_ELEMENTARY: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.H.1; K.CG.1", "how each of us is alike and different from others"],
    ["families", "share", "K.H.2", "families, and how people change or stay the same over time"],
    ["needs-and-wants", "share", "K.E.1; K.E.2", "telling needs from wants, and how they change"],
    ["or-k-money-and-work", "adopt", "K.E.3; K.E.4", "why people have jobs, and how work and money help families and the community"],
    ["places-near-me", "adopt", "K.G.2; K.G.3", "natural and built features around home and school"],
    ["pe-first-maps-k", "adopt", "K.G.1", "what maps are, their features and what they are for"],
    ["mb-k-jobs-and-rules", "adopt", "K.CG.2", "why we have rules and laws, and what happens when they are broken"],
    ["fair-and-kind", "adopt", "K.CG.3; K.CG.4", "listening, taking turns and solving classroom problems fairly"],
    ["ca-k-good-citizens", "adopt", "K.CG.1", "respecting others and being a good citizen at school"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.H.2", "first, next and last, and how things change over time"],
    ["al-k-clues-from-the-past", "adopt", "K.H.3", "how photos, objects, maps and stories tell us about the past"],
  ],
  "1/social": [
    ["my-community", "share", "1.CG.1; 1.CG.3", "how people in a community work together and are good citizens"],
    ["respect-and-inclusion", "adopt", "1.CG.1", "respecting people with different beliefs and backgrounds"],
    ["maps", "share", "1.G.1", "map keys, symbols and directions, and what different maps are for"],
    ["our-land", "share", "1.G.4", "landforms and bodies of water, and how they shape daily life"],
    ["community-services", "adopt", "1.E.1", "public services such as police, fire fighters, libraries and parks"],
    ["pe-goods-and-services-1", "adopt", "1.E.1; 1.E.2", "goods and services, and the buyers and sellers who exchange them"],
    ["pe-needs-and-wants-1", "adopt", "1.E.4", "needs, wants and choosing when we can't have everything"],
    ["ca-g1-long-ago", "adopt", "1.E.2; 1.H.1", "comparing school, work, travel and technology long ago and today"],
    ["social-studies-detectives", "adopt", "1.H.3", "finding facts in sources and asking where they come from"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "2.CG.2; 2.CG.3", "citizens' rights and responsibilities, and people who served the nation"],
    ["mb-working-together", "adopt", "2.CG.4", "building agreement and working together on problems"],
    ["ca-g2-work-and-money", "adopt", "2.E.1; 2.E.3", "income, saving and spending, and what banks do"],
    ["pe-work-and-prices-2", "adopt", "2.E.2", "scarcity, choices and their costs and benefits"],
    ["climate-and-ways-of-life", "adopt", "2.E.4", "how location, climate and resources shape the way people live and work"],
    ["or-g2-world-maps", "adopt", "2.G.1", "continents, oceans and where the United States is in the world"],
    ["communities-compared", "adopt", "2.G.3", "how communities differ and how people and goods move between them"],
    ["then-and-now", "adopt", "2.H.3", "comparing life in the past and today"],
    ["ns-community-change-2", "adopt", "2.H.2", "how places change over time, and why"],
  ],
  "3/social": [
    ["ny-g3-globes-and-maps", "adopt", "3.1.1.AG; 3.1.2.AG", "globes, world maps, grids, hemispheres, latitude and longitude"],
    ["meeting-needs", "share", "3.2.2.ER", "how people in different places meet their needs from the land around them"],
    ["ny-g3-world-communities", "adopt", "3.2.3.ER", "how climate shapes the way people live in communities around the world"],
    ["mb-global-communities", "adopt", "3.4.1.PR", "how people live in communities around the world"],
    ["ny-g3-culture", "adopt", "3.4.1.PR; 3.4.3.AG", "culture and traditions of places and regions around the world"],
    ["ny-g3-trade", "adopt", "3.4.2.HS", "how places around the world make, use and trade goods"],
  ],
  "4/social": [
    ["ny-g5-columbian-exchange", "adopt", "4.1.CO", "how European colonization brought plants, animals, diseases and peoples together"],
    ["wa-g5-thirteen-colonies", "adopt", "4.1.P", "the New England, Middle and Southern colonies and how they were governed"],
    ["ca-g5-colonial-economy", "adopt", "4.1.CE; 4.1.CC", "trade and work in the colonies, including enslaved labor"],
    ["or-g5-history-detective", "adopt", "4.1.E", "primary and secondary sources, and different points of view"],
    ["wa-g5-road-to-revolution", "adopt", "4.2.CE", "British taxes and laws, and why colonists declared independence"],
    ["ca-g5-revolution", "adopt", "4.2.P", "the Declaration of Independence and the battles and leaders of the Revolution"],
    ["ca-g5-constitution", "adopt", "4.2.P", "the Articles of Confederation and the writing of the Constitution"],
    ["ca-g8-new-nation", "adopt", "4.2.CC; 4.2.E", "the first presidents, the new government and the War of 1812"],
    ["ca-g5-westward", "adopt", "4.3.CO; 4.3.CE; 4.3.P", "expeditions west, the Louisiana Purchase and the growth of the nation"],
    ["ca-g8-divided-nation", "adopt", "4.3.E; 4.4.CO", "slave and free states, and the conflicts that led to the Civil War"],
    ["ca-g8-civil-war", "adopt", "4.4.CE; 4.4.CC; 4.4.E", "the battles, strategies and leaders of the Civil War"],
    ["or-g8-reconstruction", "adopt", "4.5.CE; 4.5.P", "Reconstruction, the 13th, 14th and 15th Amendments, and how it ended"],
  ],
};
