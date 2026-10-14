import type { PlanEntry } from "../../placement";

// Texas social: the units Texas uses from other frameworks, per grade ("<grade>/<subject>"), each cited by TEKS student
// expectation (19 TAC Chapter 113). Kindergarten to Grade 3 are self, family and community; Grade 5 is United States
// history and geography; Grade 6 is contemporary world cultures; Grade 8 is United States history to 1877; Grade 9 is
// United States Government (GOV.). Only general units are adopted: none that names Washington State, Oregon or
// California as a place, and never another state's Tribal units. Where such a unit fits except for those items, Texas
// has a filtered `tx-` copy in ../units/social-g*.ts, and Texas's own units cover what the TEKS name for Texas.
// Grades 4 and 7 (Texas history) are in ./social-texas.ts.
export const PLAN_SOCIAL: Record<string, readonly PlanEntry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.10", "how people are alike and different"],
    ["families", "share", "K.11(A); K.11(B)", "family traditions and how traditions differ between families"],
    ["needs-and-wants", "share", "K.5(A); K.5(B); K.5(C)", "basic needs of food, clothing and shelter, needs and wants, and how they are met"],
    ["mb-k-jobs-and-rules", "adopt", "K.6(A); K.7(B); K.8(A)", "jobs at home and school, rules that keep order and safety, and the people in charge"],
    ["places-near-me", "adopt", "K.4(A); K.6(A)", "natural and built places in the community and the people who work there"],
    ["fair-and-kind", "adopt", "K.15(A); K.15(B)", "solving problems fairly and kindly with others"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.14(A); K.14(B)", "putting events in order and the words yesterday, today, tomorrow, before and after"],
    ["ca-k-calendar", "adopt", "K.14(B)", "days, weeks and months, and using time words correctly"],
    ["mb-k-find-out", "adopt", "K.13(C); K.13(D)", "gathering information from pictures, people and objects, and sorting it"],
  ],
  "1/social": [
    ["maps", "share", "1.4(A)", "reading and making simple maps of the classroom, school and community"],
    ["our-land", "share", "1.5(A); 1.5(B)", "landforms, water, resources and weather, and how place shapes the way people live"],
    ["my-community", "share", "1.11(A); 1.12(A)", "the helpers and responsibilities of people at home, at school and in the community"],
    ["community-services", "adopt", "1.7(A); 1.9(B)", "goods and services in the community and the jobs that provide them"],
    ["wa-g1-earn-save-share", "adopt", "1.7(B); 1.8(A); 1.8(B); 1.8(C)", "exchanging goods and services, wanting more than we can have, and choices families make"],
    ["respect-and-inclusion", "adopt", "1.12(A); 1.18(A)", "respect, fairness and responsibility, and deciding together at school"],
    ["changes-in-my-life", "adopt", "1.17(A)", "putting the events of a child's life in order on a timeline of past, present and future"],
    ["ca-g1-long-ago", "adopt", "1.15(A); 1.15(B)", "how technology changed family life, school and travel"],
    ["social-studies-detectives", "adopt", "1.16(A); 1.16(C); 1.16(D)", "asking questions, gathering facts from sources and sorting information"],
  ],
  "2/social": [
    ["ca-g2-work-and-money", "adopt", "2.6(A); 2.6(B)", "how work provides income, and choices about earning, spending and saving money"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.9(C); 2.9(D); 2.17(A)", "how leaders are chosen, how citizens take part, and deciding together fairly"],
    ["or-g2-world-maps", "adopt", "2.3(A); 2.4(A)", "using maps and globes to find continents, oceans, landforms and countries"],
    ["then-and-now", "adopt", "2.16(A); 2.16(B)", "comparing life in the past and the present with the words past, present and future"],
    ["ns-community-change-2", "adopt", "2.2(B); 2.16(C)", "how people and events change a community over time, and putting them on a timeline"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.3(B)", "how people in different places adapt to their environment to meet their needs"],
    ["mb-working-together", "adopt", "3.16(A); 3.16(B)", "making decisions together and solving problems step by step"],
    ["mb-ask-and-find", "adopt", "3.14(A); 3.14(C)", "asking questions, gathering information about the community and sorting it"],
  ],
  // Grade 4 is Texas history (./social-texas.ts).
  "5/social": [
    ["ca-g5-thirteen-colonies", "adopt", "5.1(A); 5.1(B); 5.13(B)", "why and where the colonies were founded, their founders, and early representative government"],
    ["ca-g5-colonial-economy", "adopt", "5.9(A); 5.9(B); 5.10(A)", "the economic patterns and major industries of the colonies and the start of free enterprise"],
    ["ca-g5-road-to-revolution", "adopt", "5.2(A); 5.2(B)", "taxation after the French and Indian War, colonists' responses and the Sons of Liberty"],
    ["ca-g5-revolution", "adopt", "5.2(B); 5.2(C); 5.14(A)", "the Declaration of Independence, the people and battles of the Revolution, and its results"],
    ["ca-g5-constitution", "adopt", "5.3; 5.14(B); 5.14(C); 5.15(A)", "the framers of the Constitution, its purposes, the Bill of Rights and the three branches"],
    // Every state and capital appears in this unit, Washington, Oregon and California among them.
    ["or-g5-states-capitals", "adopt", "5.6(C)", "locating the 50 states and naming their capitals"],
    ["or-g5-history-detective", "adopt", "5.23(A); 5.23(B)", "using primary and secondary sources and asking whether they are credible"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "6.19(A); 6.19(B)", "counting years in BCE and CE, artifacts, and primary and secondary sources"],
    ["wa-g6-trade-beliefs", "adopt", "6.15(A); 6.15(D); 6.17(A)", "how trade and travel spread goods, ideas and religions between cultures"],
  ],
  "8/social": [
    ["ca-g8-founding-ideals", "adopt", "8.15(A); 8.15(E); 8.20(A); 8.22(A)", "the ideas behind the Declaration and the Constitution, and the founders as models of civic virtue"],
    ["wa-g8-bill-of-rights", "adopt", "8.16(A); 8.19(A); 8.19(B); 8.21(B); 8.25(C)", "unalienable rights, the Bill of Rights, free speech and press, and why the Constitution is amended"],
    ["ca-g8-industry-reform", "adopt", "8.13(B); 8.23(A); 8.24(A); 8.24(B); 8.27(A); 8.28(B)", "inventions and industry, immigration, and the abolition, women's rights and school reform movements"],
    ["or-g8-reconstruction", "adopt", "8.9(A); 8.9(B); 8.9(C); 8.16(B)", "Reconstruction, the 13th, 14th and 15th Amendments, and Black officeholders such as Hiram Rhodes Revels"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "GOV.1(A); GOV.1(B); GOV.1(C); GOV.1(D); GOV.6(A); GOV.6(C)", "the ideas, traditions and thinkers behind the founding documents, and the Federalist Papers"],
    ["ca-g9-forms-of-government", "adopt", "GOV.11(A); GOV.11(B)", "comparing the US constitutional republic with other forms of government, and presidential and parliamentary systems"],
    ["ca-g9-civic-action", "adopt", "GOV.13(A); GOV.13(B); GOV.14(A); GOV.14(B); GOV.19(D)", "civic responsibilities, ways to take part in the political process, citizen movements and judging sources"],
    ["ca-g9-media", "adopt", "GOV.2(A); GOV.15(B); GOV.18(B)", "how the media affects public policy, freedom of the press, and the internet and the political process"],
  ],
};

export const FOCUS_SOCIAL: Record<string, string[]> = {
  "k/social": [
    "History: national holidays and people who shaped Texas and the nation",
    "Geography: location words, maps and globes, weather and the land",
    "Economics and government: needs and wants, jobs, rules and authority figures",
    "Citizenship and culture: the US and Texas flags and pledges, voting and family traditions",
  ],
  "1/social": [
    "History: where holidays come from, and people who shaped Texas and the nation",
    "Geography: directions, simple maps, and Texas and the United States on maps and globes",
    "Economics and government: goods and services, choices, rules, laws and public officials",
    "Citizenship and culture: state and national symbols, anthems and mottoes, and good citizens",
  ],
  "2/social": [
    "History: celebrations, landmarks, and people who influenced Texas and the nation",
    "Geography: map elements, continents and oceans, and how people change the land",
    "Economics: work and income, saving, and producers and consumers",
    "Government and citizenship: public officials, government services, good citizens and patriotic symbols",
  ],
  "3/social": [
    "History: how individuals, events and ideas shape communities, past and present",
    "Geography: directions, map scale and grids, and how people adapt to and change the land",
    "Economics: earning, saving and donating, budgets, supply and demand, and profit",
    "Government, citizenship and culture: levels of government, heroes, writers, artists and inventors",
  ],
  "5/social": [
    "United States history: the colonies, the Revolution and the Constitution",
    "The 19th century: expansion, the Civil War and Reconstruction; and the 20th and 21st centuries",
    "Geography and economics: regions, landforms, the 50 states, and the free enterprise system",
    "Government and citizenship: the three branches, the Bill of Rights, symbols and landmarks",
  ],
  "6/social": [
    "Contemporary world cultures: societies in the world's regions today",
    "Geography: world maps, regions, countries, population and migration",
    "Economics and government: economic systems, development, and limited and unlimited governments",
    "Culture: culture traits, religious observances, diffusion, and science and technology",
  ],
  "8/social": [
    "United States history to 1877: the colonies, the Revolution and the Constitution",
    "The new nation: early presidents, expansion west, Indian removal and the Mexican-American War",
    "Sectionalism, slavery, the Civil War and Reconstruction, with the amendments that followed",
    "Government and citizenship: founding documents, the Bill of Rights and landmark Supreme Court cases",
  ],
  "9/social": [
    "United States Government: the ideas behind the founding documents and forms of government",
    "The Constitution: the three branches, checks and balances, federalism, and how Texas is governed",
    "Citizenship: the Bill of Rights, landmark Supreme Court cases, voting and taking part",
    "Politics and the economy: parties and elections, lawmaking, the media, taxes and trade",
  ],
};
