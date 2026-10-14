import type { Unit } from "../../types";
import { UNITS as MINNESOTA_SCIENCE_6 } from "../../minnesota/units/science-g6";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { SOCIAL_9 as CALIFORNIA_9 } from "../../california/units/social-g9";
import { SOCIAL_8 as CALIFORNIA_8 } from "../../california/units/social-g8";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of other states' units for Grade 8: the questions that name another state are left out, and Arizona
// items fill in. Natural hazards and limited resources (8.E1U3.7, 8.E1U3.8), and, for citizenship and civic engagement,
// elections (8.C3.1, 8.C2.1), civic virtues (8.C1.2, 8.C1.3), personal finance (8.E1.5, 8.E1.2) and economics (8.E3.2,
// 8.E3.1, 8.E4.1, 8.E5.2).

const RESOURCES_EXTRA: Q[] = [
  ["Arizona is one of the world's big producers of copper because…", "ancient volcanic and mineral processes left rich ore here", ["copper falls with the rain", "copper grows in the desert"], "Ores form where geologic processes concentrate minerals."],
  ["Much of central Arizona's water comes through the Central Arizona Project from…", "the Colorado River", ["the Pacific Ocean", "melting glaciers in town"], "The canal is more than 300 miles long."],
  ["Pumping groundwater faster than rain refills it can cause…", "the land to sink and wells to dry up", ["more rainfall", "the aquifer to overflow"], "This is called overdraft."],
  ["Scientists forecast monsoon storms using…", "radar, satellites and weather data", ["coin flips", "the shape of clouds alone"], "Better forecasts give people time to prepare.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["A budget is a plan for…", "how to spend and save your money", ["how to borrow without paying back", "how to avoid all spending"], "List income first, then expenses."],
  ["Interest on a savings account is…", "money the bank pays you for keeping your money there", ["a fee for spending", "a tax on your allowance"], "Saving early lets interest grow."],
];

const ELECTIONS_EXTRA: Q[] = [
  ["To vote in Arizona, a citizen must be at least…", "18 years old", ["16 years old", "21 years old"], "The 26th Amendment set the voting age at 18."],
  ["Arizona voters can pass laws themselves through the…", "initiative", ["veto", "filibuster"], "Citizens gather signatures to put a law on the ballot."],
  ["An election to choose each party's candidate is a…", "primary", ["recall", "census"], "The winners face each other in the general election."],
  ["Arizona has how many electoral votes in presidential elections?", "11", ["2", "30"], "Two senators plus nine House members."],
  ["Arizona voters can remove an elected official before the term ends with a…", "recall election", ["census", "veto"], "Arizona's constitution allows recalls.", true],
];

const ECONOMY_EXTRA: Q[] = [
  ["When prices across the economy keep rising, that is…", "inflation", ["unemployment", "a surplus"], "Each dollar buys a little less."],
  ["GDP measures…", "the value of all goods and services a country makes", ["how many people vote", "the size of a country's land"], "GDP stands for gross domestic product."],
  ["The Federal Reserve can slow inflation by…", "raising interest rates", ["printing more money", "lowering all taxes"], "Higher rates make borrowing cost more.", true],
  ["People who want a job but can't find one are counted as…", "unemployed", ["retired", "students"], "The unemployment rate is a key number."],
];

const FREEDOM_EXTRA: Q[] = [
  ["Harriet Tubman led many enslaved people to freedom on the…", "Underground Railroad", ["Pony Express", "Santa Fe Trail"], "It was a secret network of routes and safe houses."],
  ["Frederick Douglass escaped slavery and became a famous…", "speaker and writer against slavery", ["general in the Confederate army", "gold miner"], "His autobiography told the truth about slavery."],
  ["The Seneca Falls Convention of 1848 called for…", "equal rights for women, including the vote", ["the end of public schools", "a new state in the West"], "Elizabeth Cady Stanton wrote its Declaration of Sentiments."],
  ["Arizona women won the right to vote in 1912, eight years before the…", "19th Amendment", ["13th Amendment", "1st Amendment"], "Arizona voters approved it by initiative.", true],
  ["Many Black families who moved west to Kansas in 1879 were called…", "Exodusters", ["Forty-Niners", "Loyalists"], "They hoped for land and freedom from violence."],
];

export const COPIES_8: Unit[] = [
  copyOf(
    from(MINNESOTA_SCIENCE_6, "mn-g6-resources"),
    {
      id: "az-g8-resources-hazards",
      title: "Resources & Hazards",
      emoji: "🌋",
      blurb: "Where resources are found and how hazards are forecast",
      parentNote: "Why Earth's mineral, energy and water resources are spread unevenly, how scientists forecast natural hazards, and how using limited resources affects living things, with Arizona examples: copper, groundwater and Colorado River water, and monsoon forecasts.",
      standards: ["8.E1U3.7; 8.E1U3.8", "predicting natural hazards from data, and how using limited resources affects the biosphere"],
    },
    RESOURCES_EXTRA,
  ),
  copyOf(from(MINNESOTA_9, "mn-g9-elections"), {
    id: "az-g8-elections",
    title: "Elections & Voting",
    emoji: "🗳️",
    blurb: "Registering, parties, campaigns and the Electoral College",
    parentNote: "How people register and vote, primaries and political parties, campaigns and polls, the Electoral College and redistricting, and the powers citizens have in elections.",
    standards: ["8.C3.1; 8.C2.1", "the impact of political parties, interest groups and elections, and the powers of citizens"],
  }, ELECTIONS_EXTRA),
  copyOf(from(CALIFORNIA_9, "ca-g9-citizens-and-society"), {
    id: "az-g8-citizens-and-society",
    title: "Citizens & Civil Society",
    emoji: "🤝",
    blurb: "Civic virtues, volunteering and the common good",
    parentNote: "Civic virtues such as honesty, respect and responsibility, how volunteers, nonprofits and community groups help the common good, and how personal interests shape the way people address problems.",
    standards: ["8.C1.2; 8.C1.3", "civic virtues that contribute to the common good, and how personal interests influence how people address issues"],
  }),
  copyOf(
    from(MAINE_9, "me-g9-personal-finance"),
    {
      id: "az-g8-personal-finance",
      title: "Money Smarts",
      emoji: "💵",
      blurb: "Budgets, saving, interest and credit",
      parentNote: "Personal finance: income and taxes, making a budget, saving and compound interest, credit and debt, investing and risk, and insurance.",
      standards: ["8.E1.5; 8.E1.2", "creating a budget, and the relationship between interest rates, saving and credit"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(from(MINNESOTA_9, "mn-g9-supply-demand"), {
    id: "az-g8-supply-demand",
    title: "Supply & Demand",
    emoji: "📈",
    blurb: "How buyers and sellers set prices",
    parentNote: "How supply and demand set prices in markets, shortages and surpluses, competition, and the roles of buyers, sellers and profits.",
    standards: ["8.E3.2; 8.E3.1", "how supply, demand and competition influence prices, and the roles of buyers, sellers and profits"],
  }),
  copyOf(from(MAINE_9, "me-g9-economics"), {
    id: "az-g8-economy",
    title: "Markets & the Economy",
    emoji: "🏦",
    blurb: "Inflation, unemployment and economic systems",
    parentNote: "How the whole economy works: GDP, inflation and unemployment, the Federal Reserve and interest rates, specialization and trade, and command, market and mixed economic systems.",
    standards: ["8.E4.1; 8.E5.2", "how inflation and unemployment affect people, and comparing economic systems"],
  }, ECONOMY_EXTRA),
  copyOf(
    from(CALIFORNIA_8, "ca-g8-freedom-and-change"),
    {
      id: "az-g8-freedom-and-change",
      title: "Freedom & Change",
      emoji: "🛤️",
      blurb: "Abolitionists, reformers and people on the move",
      parentNote: "Free Black communities in the North, abolitionists and the Underground Railroad, the women's rights movement, pioneer women in the West and the Exodusters, including Arizona's early vote for women in 1912.",
      standards: ["8.H3.2; 8.H3.1", "how individuals and groups worked for change in American society"],
    },
    FREEDOM_EXTRA,
  ),
];
