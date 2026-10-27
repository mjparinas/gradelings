import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { OWN_SOCIAL_2 as OREGON_2 } from "../../oregon/units/social-k3";
import { COPIES_2 as ARIZONA_2 } from "../../arizona/units/copies-g2";
import { copyOf, from, localCopy } from "./kit";

// Hawaiʻi Grade 3 social studies: the reasons people migrate and where they settle (SS.3.3.15.2), how cultural practices
// shape communities (SS.3.3.14.4) and putting migrations to Hawaiʻi in order on a timeline (SS.3.3.17.5), from the first
// voyagers to the plantation workers and the families who still arrive today. Globes, cultures and sources are
// practised with adopted units (see ../plan/social.ts); world maps and the continents and oceans with copies of Oregon's
// and Arizona's units that leave out "Which continent do we live on?" (Hawaiʻi is on none); and money, public services and
// citizenship with a copy of California's unit without its California places (SS.3.1.10.1, SS.3.2.10.2, SS.3.2.7.3).

const COMING: Q[] = [
  ["Moving from one place to live in another is called…", "migration", ["vacation", "election", "erosion"], "People and animals migrate."],
  ["A reason that pulls people to a new place, like a good job, is a…", "pull factor", ["push factor", "tax", "map key"], "Pull factors draw people in."],
  ["A reason that pushes people to leave a place, like war or hunger, is a…", "push factor", ["pull factor", "holiday", "vote"], "Push factors make it hard to stay."],
  ["The first people to settle Hawaiʻi were…", "Polynesian voyagers", ["European sailors", "plantation owners", "astronauts"], "They came by canoe from islands to the south."],
  ["Polynesian voyagers found their way across the ocean using the stars, the waves and…", "the birds", ["a GPS", "a road map", "street signs"], "Some seabirds fly toward land at night."],
  ["In the 1800s, plantation owners brought workers to Hawaiʻi to grow and harvest…", "sugarcane", ["wheat", "apples", "potatoes"], "Sugar was Hawaiʻi's biggest crop."],
  ["The first big group of plantation workers from Asia came to Hawaiʻi from…", "China", ["Mexico", "Italy", "Brazil"], "They began arriving in 1852."],
  ["Many workers came to Hawaiʻi's plantations from Japan, starting with a small group in…", "1868", ["1492", "1776", "1959"], "Many more came after 1885."],
  ["Workers from the Philippines who came to the plantations were called…", "sakadas", ["aliʻi", "voyagers", "senators"], "The first came in 1906."],
  ["Families also came to work on the plantations from Portugal's islands of…", "Madeira and the Azores", ["Hawaiʻi and Maui", "Japan and Korea", "Cuba and Haiti"], "They brought sweet bread and the ukulele's ancestor."],
  ["The ʻukulele grew from a small guitar brought to Hawaiʻi by…", "Portuguese immigrants", ["Polynesian voyagers", "astronauts", "whalers from the Arctic"], "Hawaiians made it their own."],
  ["Plantation workers who spoke many different languages made a new way of talking together called…", "Pidgin", ["Latin", "sign language", "Morse code"], "Its full name is Hawaiʻi Creole English."],
  ["Why did many plantation workers move away from the plantations later?", "to start their own businesses and find better jobs", ["the plantations floated away", "it started to snow", "they were never allowed to leave"], "Many opened stores, farms and restaurants."],
  ["A plate lunch with rice, macaroni salad and teriyaki chicken shows that in Hawaiʻi, foods from many cultures…", "mix together", ["are not allowed", "never change", "stay apart"], "Food travels with people."],
  ["Many Hawaiʻi families celebrate the Lunar New Year, Obon dances and Flores de Mayo. This shows that…", "many cultures shape our communities", ["everyone has the same holiday", "no one moves", "culture never changes"], "Families bring traditions with them."],
  ["Today, many families come to Hawaiʻi from the islands of Micronesia, such as Chuuk and the Marshall Islands, looking for…", "jobs, schools and health care", ["snow", "gold mines", "dinosaur fossils"], "These are pull factors."],
  ["The way of saying hello and welcoming guests that many Hawaiʻi families share is…", "aloha", ["goodbye forever", "go away", "hurry up"], "It is a value from Hawaiian culture."],
  ["Most people who move to Hawaiʻi today arrive by…", "airplane", ["canoe", "covered wagon", "train"], "Hawaiʻi is far out in the ocean."],
  ["Many early towns in Hawaiʻi grew near good harbors because…", "ships could bring people and goods", ["harbors had snow", "there was no water", "ships were not allowed"], "Honolulu Harbor helped Honolulu grow."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Put these in order, from first to last: plantation workers arrive, Polynesian voyagers arrive, families fly in by jet. Which came first?", "Polynesian voyagers arrive", ["plantation workers arrive", "families fly in by jet", "they all came at once"], "Voyagers came hundreds of years before the plantations.", true],
  ["Workers from Korea first came to Hawaiʻi's plantations in…", "1903", ["1778", "1852", "1959"], "They came after workers from China and Japan.", true],
  ["Plantation owners in the 1800s brought workers from far away because…", "they needed many workers for hard field work", ["the islands were empty of people", "workers wanted snow", "sugarcane grows itself"], "Disease had greatly lowered the number of Native Hawaiians.", true],
  ["A plantation camp often had people from one country living near each other. Over time, their children…", "went to school together and mixed cultures", ["never met", "all moved away", "spoke no language"], "Schools brought children together.", true],
  ["A family leaves a country because of a war and finds safety in Hawaiʻi. They are called…", "refugees", ["tourists", "senators", "voyagers"], "Refugees are pushed to leave their homes.", true],
  ["People from Puerto Rico first came to work on Hawaiʻi's plantations in…", "1900", ["1700", "1800", "2000"], "They traveled by ship and train.", true],
];

/** Hawaiʻi is a chain of islands in the Pacific, not part of any continent. */
const NOT_A_CONTINENT = /continent do we live|continent we live|We live in North America/i;

const WORLD_EXTRA: Q[] = [
  ["Hawaiʻi is not part of any continent. It is a chain of islands in the…", "Pacific Ocean", ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean"], "It is the biggest ocean on Earth."],
  ["Most of the United States is on the continent of…", "North America", ["South America", "Europe", "Asia"], "Hawaiʻi is the one state out in the Pacific."],
  ["Which continent is closest to Hawaiʻi?", "North America", ["Africa", "Europe", "Antarctica"], "Planes fly east to California."],
  ["The big triangle of Pacific islands that Hawaiʻi is part of is called…", "Polynesia", ["Antarctica", "Europe", "the Arctic"], "Aotearoa and Rapa Nui are its other corners."],
  ["On a world map, Hawaiʻi is in the middle of the…", "Pacific Ocean", ["Sahara Desert", "Atlantic Ocean", "Amazon rain forest"], "Look for the blue between Asia and North America."],
  ["Hawaiʻi is north of the…", "Equator", ["North Pole", "Arctic Circle", "Prime Meridian"], "It is in the Northern Hemisphere, in the tropics."],
];

const MONEY_EXTRA: Q[] = [
  ["Fresh water from the mountains, fish in the ocean and sunshine for solar panels are Hawaiʻi's…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new surfboard. Which is a want?", "the surfboard", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["Keoni puts part of his allowance in the bank each week to buy a bike later. He is…", "saving", ["spending", "borrowing", "trading"], "Saving means keeping money for later."],
  ["Hawaiʻi voters choose their mayor, governor and lawmakers by…", "voting in elections", ["flipping a coin", "a race", "asking the President"], "Adults 18 and older can vote.", true],
];

export const SOCIAL_3: Unit[] = [
  localCopy(from(OREGON_2, "or-g2-world-maps"), "hi-g3-world-maps", ["SS.3.3.13.1", "maps of the world, and how geographic features affect people in communities around the world"], WORLD_EXTRA, {
    omit: NOT_A_CONTINENT,
  }),
  localCopy(from(ARIZONA_2, "az-g2-continents-oceans"), "hi-g3-continents-oceans", ["SS.3.3.13.1", "the continents and oceans, and how geography affects people around the world"], WORLD_EXTRA, {
    omit: NOT_A_CONTINENT,
    parentNote: "Finding the United States, Hawaiʻi, the seven continents and the main oceans on maps and globes, and using simple map tools to compare places near and far.",
  }),
  bankUnit({
    id: "hi-g3-coming-to-hawaii",
    title: "Coming to Hawaiʻi",
    emoji: "⛵",
    blurb: "Why people move, and who has come to Hawaiʻi",
    parentNote: "Migration to Hawaiʻi in order: Polynesian voyagers, then plantation workers from China, Japan, Portugal, Puerto Rico, Korea and the Philippines, and families from Micronesia and around the world today; push and pull factors, refugees, where people settle and why, and how the foods, languages (Pidgin among them), music and celebrations newcomers brought shape Hawaiʻi's communities.",
    standards: ["SS.3.3.15.2; SS.3.3.14.4; SS.3.3.17.5", "why people migrate and where they settle, how cultural practices shape communities, and putting migrations in order on a timeline"],
    items: COMING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "hi-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for public services, and how citizens vote and take part, with Hawaiʻi examples.",
      standards: ["SS.3.1.10.1; SS.3.2.10.2; SS.3.2.7.3", "how money makes exchange easier, how public goods and services meet community needs, and being a responsible citizen in a democracy"],
    },
    MONEY_EXTRA,
  ),
];
