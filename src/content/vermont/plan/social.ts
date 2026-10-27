import type { Entry } from "../kit";

// Vermont social studies: the units Vermont uses from other frameworks, per grade ("<grade>/social"). Vermont's State
// Board of Education adopted the College, Career, and Civic Life (C3) Framework for Social Studies State Standards in
// 2017. Its Dimension 2 indicators are set for grade bands, not single grades, and units cite them as printed, such as
// "D2.Civ.1.3-5" (civics, indicator 1, the Grade 3 to 5 band), across civics (Civ), economics (Eco), geography (Geo) and
// history (His): Kindergarten to Grade 2 cite the K-2 band, Grades 3 to 5 the 3-5 band, Grades 6 to 8 the 6-8 band and
// Grade 9 the 9-12 band. The grades follow the Agency of Education's Vermont Framework for K-8 Social Studies: me and my
// community in Kindergarten, people, places and the environment in Grade 1, the Americas in Grade 2, global interactions
// (Africa, Asia, Europe and Oceania) in Grade 3, Vermont, the early republic and the United States to the Civil War in
// Grade 4, world geography and ancient civilizations of western Asia and Africa in Grade 5, then of Latin America, South
// and East Asia, Oceania and Europe in Grade 6, the United States and Vermont from Reconstruction to the civil rights
// movement in Grade 7, civics and economics in action in Grade 8, and high school civics and economics with personal
// finance in Grade 9.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Vermont's own units (its flag and symbols, then and now, the Americas, difference makers, world
// regions, migration, Vermont history and government, Vermont from 1865 to 1970, civics in action, and governing
// Vermont) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "D2.Civ.2.K-2; D2.His.2.K-2", "how every person plays a role in a community, and comparing life in the past with life today"],
    ["families", "share", "D2.Civ.6.K-2; D2.His.4.K-2", "how families and communities share tasks and roles, and how people's perspectives differ"],
    ["needs-and-wants", "share", "D2.Eco.1.K-2; D2.Eco.2.K-2", "how scarcity means making choices, and the benefits and costs of personal decisions"],
    ["places-near-me", "adopt", "D2.Geo.1.K-2; D2.Geo.6.K-2", "making maps of familiar places, and the characteristics of specific places"],
    ["fair-and-kind", "adopt", "D2.Civ.3.K-2; D2.Civ.8.K-2", "why we have rules, and democratic principles such as fairness and respect"],
    ["mb-k-jobs-and-rules", "adopt", "D2.Civ.1.K-2; D2.Civ.12.K-2", "the roles of people in authority, and how rules work at school"],
    ["or-k-money-and-work", "adopt", "D2.Eco.6.K-2; D2.Eco.3.K-2", "how people earn income, and the skills needed to make goods and services"],
    ["ca-k-calendar", "adopt", "D2.His.1.K-2", "putting days, months and celebrations in order"],
    ["ca-k-good-citizens", "adopt", "D2.Civ.7.K-2; D2.Civ.2.K-2", "civic virtues at school, and how all people play a role in their community"],
  ],
  "1/social": [
    ["maps", "share", "D2.Geo.1.K-2; D2.Geo.3.K-2", "making maps of familiar places, and using maps and globes"],
    ["our-land", "share", "D2.Geo.4.K-2; D2.Geo.5.K-2", "how weather and the land affect people's lives, and how people change places"],
    ["my-community", "share", "D2.Civ.2.K-2; D2.Eco.4.K-2", "the roles people play in a community, and the goods and services people produce"],
    ["changes-in-my-life", "adopt", "D2.His.1.K-2; D2.His.2.K-2", "putting events in order, and comparing life in the past with life today"],
    ["respect-and-inclusion", "adopt", "D2.Civ.8.K-2; D2.Civ.10.K-2", "equality, fairness and respect, and comparing one's own point of view with others'"],
    ["community-services", "adopt", "D2.Eco.12.K-2; D2.Civ.5.K-2", "the goods and services governments provide, and what governments do"],
    ["wa-g1-earn-save-share", "adopt", "D2.Eco.10.K-2; D2.Eco.9.K-2", "why people save, and the role of banks"],
    ["ca-g1-long-ago", "adopt", "D2.His.2.K-2; D2.His.9.K-2", "comparing life in the past with life today, and kinds of historical sources"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "D2.Civ.1.K-2; D2.Civ.14.K-2", "the roles of people in authority, and how people have tried to improve their communities"],
    ["mb-working-together", "adopt", "D2.Civ.6.K-2; D2.Civ.11.K-2", "how communities work together on common tasks, and making decisions together"],
    ["ca-g2-work-and-money", "adopt", "D2.Eco.3.K-2; D2.Eco.7.K-2", "the skills needed to produce goods and services, and the costs of production"],
    ["communities-compared", "adopt", "D2.Geo.8.K-2; D2.Geo.2.K-2", "how people in different kinds of communities meet their needs, and describing places with maps and photographs"],
    ["az-g2-continents-oceans", "adopt", "D2.Geo.3.K-2", "using maps and globes to find the continents and oceans"],
  ],
  "3/social": [
    ["meeting-needs", "share", "D2.Geo.8.3-5; D2.Geo.4.3-5", "how settlement relates to natural resources, and how culture shapes the way people adapt to their environments"],
    ["or-g2-world-maps", "adopt", "D2.Geo.3.3-5; D2.Geo.1.3-5", "using maps of different scales to locate places, and making maps of unfamiliar places"],
    ["ny-g3-globes-and-maps", "adopt", "D2.Geo.2.3-5", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "D2.Geo.5.3-5; D2.Geo.4.3-5", "how the cultural characteristics of places change, and how culture influences the way people live"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "D2.Eco.1.3-5; D2.Eco.9.3-5", "the benefits and costs of individual choices such as saving, and the role of banks and other financial institutions"],
    ["wa-g5-thirteen-colonies", "adopt", "D2.His.2.3-5; D2.Geo.8.3-5", "life in the colonies compared with life today, and how settlement relates to natural resources"],
    ["ca-g5-road-to-revolution", "adopt", "D2.His.14.3-5; D2.His.4.3-5", "the causes of the Revolution, and why colonists differed in their perspectives"],
    ["ca-g5-revolution", "adopt", "D2.His.14.3-5; D2.His.3.3-5", "the causes and effects of the war for independence, and the people who shaped it"],
    ["wa-g5-constitution", "adopt", "D2.Civ.3.3-5; D2.Civ.5.3-5", "key US constitutional provisions, and the structure of the government the Constitution created"],
    ["ca-g8-civil-war", "adopt", "D2.His.14.3-5; D2.His.4.3-5", "the causes and effects of the Civil War, and why people in the same period differed in their perspectives"],
  ],
  "5/social": [
    ["first-farmers", "adopt", "D2.His.2.3-5; D2.Geo.8.3-5", "comparing early ways of life with life today, and how settlement relates to natural resources"],
    ["where-civilizations-grew", "adopt", "D2.Geo.6.3-5; D2.Geo.10.3-5", "how environmental characteristics shaped where people lived, and why environments vary among world regions"],
    ["world-beliefs", "adopt", "D2.Geo.7.3-5; D2.His.3.3-5", "how ideas moved from place to place, and the people and groups who shaped history"],
    ["trade-networks", "adopt", "D2.Geo.7.3-5; D2.Eco.4.3-5", "how goods and ideas moved between regions, and why people specialize and trade"],
    ["wa-g6-mesopotamia-egypt", "adopt", "D2.His.2.3-5; D2.Geo.4.3-5", "life in the first civilizations compared with life today, and how people adapted to river environments"],
    ["or-g7-african-kingdoms", "adopt", "D2.Eco.4.3-5; D2.His.14.3-5", "the trade that built Africa's kingdoms, and the causes and effects of their rise"],
    ["ca-g7-west-african-life", "adopt", "D2.Geo.7.3-5; D2.His.2.3-5", "trade across the Sahara, and life in West Africa long ago"],
    ["ca-g7-arabia-islam", "adopt", "D2.Geo.7.3-5; D2.Geo.10.3-5", "how goods and ideas spread from Arabia, and the environment of the Arabian Peninsula"],
    ["ga-g7-africa", "adopt", "D2.Geo.10.3-5; D2.Geo.6.3-5", "the environments of Africa's regions, and how they influence where people live"],
    ["ga-g7-southwest-asia", "adopt", "D2.Geo.10.3-5; D2.Geo.8.3-5", "the environments of southwest Asia, and how settlement relates to natural resources such as water and oil"],
  ],
  "6/social": [
    ["ny-g6-classical-china-india", "adopt", "D2.His.3.6-8; D2.Geo.6.6-8", "the people and ideas that shaped classical India and China, and how places shape identity and culture"],
    ["wa-g6-india-china", "adopt", "D2.Geo.4.6-8; D2.His.14.6-8", "how river valleys shaped early India and China, and the causes and effects of their growth"],
    ["wa-g6-greece-rome", "adopt", "D2.Civ.8.6-8; D2.His.1.6-8", "the ideas of ancient Greek and Roman government, and their place in broader history"],
    ["medieval-europe", "adopt", "D2.His.1.6-8; D2.His.14.6-8", "medieval Europe in its broader historical context, and its causes and effects"],
    ["ca-g7-aztec-inca", "adopt", "D2.Geo.4.6-8; D2.His.14.6-8", "how the Aztec and Inca shaped their environments, and the causes and effects of their rise and fall"],
    ["ga-g6-latin-america", "adopt", "D2.Geo.10.6-8; D2.Geo.5.6-8", "how cultural and environmental characteristics vary across Latin America"],
    ["ga-g6-europe", "adopt", "D2.Geo.10.6-8; D2.Geo.2.6-8", "the regions of Europe, and using maps to explain locations and environments"],
    ["ga-g6-australia", "adopt", "D2.Geo.10.6-8; D2.Geo.6.6-8", "the land and people of Australia, and how places shape identity"],
    ["ga-g7-southern-eastern-asia", "adopt", "D2.Geo.10.6-8; D2.Geo.12.6-8", "the regions of South and East Asia, and how population changes affect land use"],
  ],
  "7/social": [
    ["or-g8-reconstruction", "adopt", "D2.His.1.6-8; D2.Civ.14.6-8", "Reconstruction in its broader context, and how voting rights were expanded and challenged"],
    ["ca-g8-industry-reform", "adopt", "D2.His.14.6-8; D2.Eco.9.6-8", "the causes and effects of industrial growth, and the role of labor unions"],
    ["ny-g8-city-immigrants", "adopt", "D2.Geo.8.6-8; D2.His.4.6-8", "how cities and immigration changed settlement, and the perspectives of newcomers"],
    ["ny-g8-workers-progressives", "adopt", "D2.Civ.14.6-8; D2.His.3.6-8", "how reformers changed society, and why the people they shaped matter"],
    ["ny-g8-world-war-i", "adopt", "D2.His.14.6-8; D2.His.1.6-8", "the causes and effects of World War I, and its place in broader history"],
    ["ny-g8-roaring-twenties", "adopt", "D2.His.2.6-8; D2.His.4.6-8", "change and continuity in the 1920s, and the perspectives of the era"],
    ["ny-g8-great-depression", "adopt", "D2.His.14.6-8; D2.Eco.12.6-8", "the causes and effects of the Depression, and how unemployment affects different groups"],
    ["ny-g8-world-war-ii", "adopt", "D2.His.14.6-8; D2.His.1.6-8", "the causes and effects of World War II, and its place in broader history"],
    ["ny-g8-civil-rights", "adopt", "D2.Civ.14.6-8; D2.His.3.6-8", "how the civil rights movement changed society, and the people who led it"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "D2.Civ.8.6-8; D2.Civ.3.6-8", "the ideas in the founding documents, and the purposes of constitutions"],
    ["wa-g8-bill-of-rights", "adopt", "D2.Civ.8.6-8; D2.Civ.2.6-8", "the rights in the founding documents, and the roles citizens play"],
    ["ca-g8-constitution-at-work", "adopt", "D2.Civ.4.6-8; D2.Civ.5.6-8", "the powers and limits of the three branches, and the structure of government under the Constitution"],
    ["ca-g9-supreme-court", "adopt", "D2.Civ.4.6-8; D2.Civ.12.6-8", "the powers of the courts, and how laws are tested and changed"],
    ["az-g8-citizens-and-society", "adopt", "D2.Civ.2.6-8; D2.Civ.6.6-8", "the roles citizens play, and how political, civil and economic organizations shape people's lives"],
    ["az-g8-personal-finance", "adopt", "D2.Eco.10.6-8; D2.Eco.1.6-8", "how interest rates affect borrowing and saving, and how economic decisions affect individuals"],
    ["az-g8-supply-demand", "adopt", "D2.Eco.6.6-8; D2.Eco.4.6-8", "how supply and demand change prices, and the role of competition"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "D2.Civ.4.9-12; D2.Civ.8.9-12", "how the Constitution sets up a government with powers and limits, and the principles behind democratic systems"],
    ["ca-g9-civic-action", "adopt", "D2.Civ.14.9-12; D2.Civ.2.9-12", "the means of changing society and protecting rights, and the role of citizens"],
    ["ca-g9-media", "adopt", "D2.Civ.10.9-12; D2.Civ.2.9-12", "how personal interests and perspectives shape civic life, and the role of citizens and the media"],
  ],
};
