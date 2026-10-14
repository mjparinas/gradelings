import type { Unit } from "../../types";
import { bankUnit } from "../own";
import { timelineUnit } from "./kit";
import { GEOGRAPHY, NATIONS, COLONY, REVOLUTION } from "./social-g4-early";
import { GOVERNMENT, FREEDOM, CANAL, ECONOMY, IMMIGRATION, TIMELINE } from "./social-g4-later";

// New York's own Grade 4 social units (`ny-` ids): New York State and Local History and Government, key ideas 4.1 to
// 4.7 of the NYS K-12 Social Studies Framework. Every unit is written for New York. Haudenosaunee and
// Algonquian-speaking content is light, in the present tense for living nations, and keeps nothing sacred or ceremonial.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g4-geography",
    title: "New York's Land & Maps",
    emoji: "🗺️",
    blurb: "Mountains, rivers, lakes and cities",
    parentNote:
      "Reading physical, political and climate maps of New York State: the Adirondacks and Catskills, the Hudson, Mohawk and St. Lawrence rivers, the Great Lakes and Finger Lakes, Long Island Sound, Albany and the largest cities, and the states and country that border New York.",
    standards: [
      "4.1; 4.1a; 4.1b",
      "using physical, political and climate maps to find New York's mountains, rivers, lakes, capital, largest cities and neighbors",
    ],
    items: GEOGRAPHY,
  }),
  bankUnit({
    id: "ny-g4-first-nations",
    title: "Haudenosaunee & Algonquian Peoples",
    emoji: "🌽",
    blurb: "Living with the land, then and now",
    parentNote:
      "The Haudenosaunee (Mohawk, Oneida, Onondaga, Cayuga, Seneca and Tuscarora) and Algonquian-speaking peoples such as the Lenape, Mohican, Shinnecock and Unkechaug: how they used the land, longhouses and wigwams, the Three Sisters, clans and the Haudenosaunee Confederacy, and nations in New York today. Light, in the present tense, and with nothing sacred or ceremonial.",
    standards: [
      "4.2; 4.2a; 4.2b; 4.2c",
      "how the Haudenosaunee and Algonquian-speaking peoples used the land, governed themselves and built their ways of life",
    ],
    items: NATIONS,
  }),
  bankUnit({
    id: "ny-g4-new-netherland",
    title: "Explorers & New Netherland",
    emoji: "⛵",
    blurb: "From New Amsterdam to New York",
    parentNote:
      "Verrazzano, Hudson and Champlain, the Dutch fur trade and New Netherland, the English takeover in 1664, Dutch words and place names that last today, and the many peoples of colonial New York, including free and enslaved Africans.",
    standards: [
      "4.3; 4.3a; 4.3b",
      "European exploration of New York's waterways, the Dutch colony of New Netherland and life in colonial New York",
    ],
    items: COLONY,
  }),
  bankUnit({
    id: "ny-g4-revolution",
    title: "Wars for New York",
    emoji: "🥁",
    blurb: "The French and Indian War and the Revolution",
    parentNote:
      "The French and Indian War and its battles in New York, why the colonies broke with Britain, Patriots and Loyalists, the Battle of Long Island and the turning point at Saratoga, and the sides Haudenosaunee nations and African Americans took.",
    standards: [
      "4.3; 4.3c; 4.3d",
      "the French and Indian War and the American Revolution in New York, and why New York's location mattered",
    ],
    items: REVOLUTION,
  }),
  bankUnit({
    id: "ny-g4-government",
    title: "Governing New York",
    emoji: "🏛️",
    blurb: "Federal, state and local government",
    parentNote:
      "The three branches of the federal government, the New York State Constitution, the governor, Senate and Assembly in Albany, how a bill becomes a law, the state seal, counties, cities, towns, villages and boroughs, and citizens' rights and responsibilities.",
    standards: [
      "4.4; 4.4a; 4.4b; 4.4c; 4.4d; 4.4e",
      "the levels and branches of government, New York's constitution and local governments, and citizens' rights and responsibilities",
    ],
    items: GOVERNMENT,
  }),
  bankUnit({
    id: "ny-g4-freedom",
    title: "Freedom & Rights",
    emoji: "🕯️",
    blurb: "Abolition, women's rights and the Civil War",
    parentNote:
      "Slavery in New York and its end in 1827, abolitionists such as Frederick Douglass, Harriet Tubman, Sojourner Truth and Samuel Cornish, the Underground Railroad, the Seneca Falls Convention and the fight for women's right to vote, and New York's part in the Civil War.",
    standards: [
      "4.5; 4.5a; 4.5b; 4.5c",
      "the fight against slavery in New York, the struggle for women's rights, and New York's support for the Union in the Civil War",
    ],
    items: FREEDOM,
  }),
  bankUnit({
    id: "ny-g4-erie-canal",
    title: "The Erie Canal",
    emoji: "🚤",
    blurb: "Roads, canals, steam and wires",
    parentNote:
      "Moving west after the Revolution, corduroy roads and turnpikes, the Erie Canal (opened 1825) and the towns that grew along it, its effect on the Haudenosaunee, and steamboats, railroads, the telegraph and later ways to travel and communicate.",
    standards: [
      "4.6; 4.6a; 4.6b; 4.6c",
      "westward movement in New York, the Erie Canal, and how new transportation and communication changed communities",
    ],
    items: CANAL,
  }),
  bankUnit({
    id: "ny-g4-industry",
    title: "Making & Earning in New York",
    emoji: "🏭",
    blurb: "Farms, factories, finance and inventors",
    parentNote:
      "Farming, mining, lumbering and finance in New York, inventors and entrepreneurs such as Lewis Latimer, Thomas Jennings, Willis Carrier and Elisha Otis, the growth of factories from 1865 to 1915, and today's service and high-technology jobs.",
    standards: [
      "4.6; 4.6d; 4.6e; 4.6f; 4.6g",
      "New York's farming, resources and finance, its inventors and entrepreneurs, industrialization and today's service and high-tech industries",
    ],
    items: ECONOMY,
  }),
  bankUnit({
    id: "ny-g4-immigration",
    title: "Coming to New York",
    emoji: "🗽",
    blurb: "Immigration and migration",
    parentNote:
      "Why people came to New York (push and pull factors), Irish immigration after the potato famine, Ellis Island and the Statue of Liberty, tenements and neighborhoods, the Great Migration and Harlem, and newcomers from around the world today. Factual and neutral.",
    standards: [
      "4.7; 4.7a; 4.7b",
      "why immigrants and migrants came to New York, where they settled and how they shaped the state",
    ],
    items: IMMIGRATION,
  }),
  timelineUnit({
    id: "ny-g4-timeline",
    title: "New York Through Time",
    emoji: "⏳",
    blurb: "Put New York's history in order",
    parentNote:
      "Ordering events in New York's history, from Hudson's voyage and New Netherland to the Revolution, the Erie Canal, Seneca Falls, Ellis Island and the 1900s.",
    standards: [
      "4.3; 4.5; 4.6; 4.7",
      "putting New York's history in order, from the colonial period to the growth of the state and immigration",
    ],
    events: TIMELINE,
  }),
];
