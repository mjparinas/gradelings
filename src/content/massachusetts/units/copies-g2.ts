import type { Unit } from "../../types";
import { OWN_SOCIAL_2 as OREGON_SOCIAL_2 } from "../../oregon/units/social-k3";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { OWN_SOCIAL_2 as WASHINGTON_SOCIAL_2 } from "../../washington/units/social-k4-g2";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 2 units that fit Massachusetts except for a few questions naming another state's
// places, or (in Making & Trading) Washington's Tribes, whose content stays Washington's.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"), "ma-g2-earth-changes", ["2-ESS2-1", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"], [
    ["Waves wear away the sand cliffs of Cape Cod. Is that fast or slow?", "slow", ["fast", "it never changes"], "It happens a little each year."],
    ["A big storm washes away part of a beach in one night. Is that fast or slow?", "fast", ["slow", "it never changes"], "One night is a short time."],
    ["People plant beach grass on sand dunes to…", "hold the sand in place", ["make the dunes melt", "feed whales", "build roads"], "Roots grip the sand."],
    ["Rock walls along a coast help stop…", "waves from washing away the land", ["the sun from rising", "birds from flying", "rain from falling"], "They are called seawalls."],
    ["Long ago, glaciers left big rocks all over Massachusetts. Was that fast or slow?", "slow", ["fast", "it happened in one day"], "Glaciers move very slowly."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SOCIAL_2, "wa-g2-reading-maps"), "ma-g2-reading-maps", ["2.T1.1; 2.T1.3", "the parts of a map, and making a map of a familiar place"], [
    ["Massachusetts is in which part of the United States?", "the Northeast", ["the Southwest", "the West", "the South"], "It is near the top right of a US map."],
    ["On a map, Boston is east of Worcester. Worcester is ___ of Boston.", "west", ["east", "north", "south"], "East and west are opposites."],
    ["A map of your school would show…", "classrooms, the gym and the office", ["the whole country", "the Moon", "every ocean"], "It shows a small, familiar place."],
    ["Which tool on a map tells you how far apart places are?", "the scale", ["the title", "the key", "the compass rose"], "It might say 1 inch = 1 mile."],
    ["Cape Cod is east of the rest of Massachusetts. On most maps, east is to the…", "right", ["left", "top", "bottom"], "North is usually at the top."],
  ]),
  localCopy(from(OREGON_SOCIAL_2, "or-g2-work-and-money"), "ma-g2-work-and-money", ["2.T5.4; 2.T5.9", "earning income, and why people save"], [
    ["Massachusetts cranberry farms grow lots of…", "cranberries", ["oranges", "bananas", "coconuts"], "They grow in bogs."],
    ["A fisher in Gloucester sells fish to earn…", "income", ["a vacation", "homework", "a holiday"], "Income is money earned from work."],
    ["Money paid for each hour of work is called a…", "wage", ["gift", "loan", "tax"], "It adds up hour by hour."],
    ["Putting some money in a bank for later is…", "saving", ["spending", "borrowing", "trading"], "Savings can grow over time."],
    ["Why might a family save money?", "to buy something big later", ["so money disappears", "to pay no bills", "because coins are heavy"], "Saving helps with bigger goals."],
  ]),
  localCopy(from(WASHINGTON_SOCIAL_2, "wa-g2-making-trading"), "ma-g2-making-trading", ["2.T5.5; 2.T5.6; 2.T5.8", "goods, services and the choices people make about buying"], [
    ["A bakery that sells bread is selling a…", "good", ["service", "tax", "vote"], "Bread is something you can hold."],
    ["A dentist cleaning your teeth gives a…", "service", ["good", "tax", "trade"], "It is a job done for you."],
    ["Choosing to buy from a store close to home is a…", "voluntary choice", ["law", "tax", "service"], "You decide where to shop."],
    ["Boats from Massachusetts once carried fish to trade for…", "goods from other places", ["nothing at all", "the Moon", "snow"], "Trade brings things that aren't made nearby."],
    ["If you buy a book, you can't use that money for a toy. That is…", "a choice with a cost", ["free", "a gift", "a service"], "What you give up is the cost."],
  ], { parentNote: "Practises goods and services, scarcity and choices, and how people produce, trade and depend on each other." }),
];
