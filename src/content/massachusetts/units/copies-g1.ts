import type { Unit } from "../../types";
import { UNITS as NEW_YORK_SOCIAL_1 } from "../../new-york/units/social-g1";
import { OWN_SOCIAL_1 as WASHINGTON_SOCIAL_1 } from "../../washington/units/social-k4-g1";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 1 units that fit Massachusetts except for a few questions naming another state's
// places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SOCIAL_1, "wa-g1-continents-oceans"), "ma-g1-continents-oceans", ["1.T2.4", "continents, oceans and other physical features on maps"], [
    ["Which ocean is next to Massachusetts?", "Atlantic", ["Pacific", "Arctic"], "It is east of us."],
    ["Massachusetts is on which continent?", "North America", ["Africa", "Asia"], "So is the rest of our country."],
    ["The Connecticut River is a…", "river", ["mountain", "ocean"], "It flows to the sea."],
    ["Cape Cod reaches into the…", "ocean", ["desert", "sky"], "It is near the beach."],
    ["Mount Greylock is a…", "mountain", ["lake", "river"], "It is the tallest place in Massachusetts."],
  ], { parentNote: "Practises naming the seven continents and five oceans on a map or globe, and the water and land near home, like the Atlantic Ocean and the Connecticut River." }),
  localCopy(from(NEW_YORK_SOCIAL_1, "ny-g1-american-symbols"), "ma-g1-american-symbols", ["1.T3.1; 1.T1.4", "what unites the people of the United States, and leaders from history"], [
    ["Where is the Liberty Bell?", "Philadelphia", ["Boston", "Chicago"], "The Declaration of Independence was signed there too."],
    ["Which Massachusetts man became the second President?", "John Adams", ["Paul Revere", "Abraham Lincoln"], "He was from Braintree."],
    ["Paul Revere rode at night to warn…", "that soldiers were coming", ["of a big storm", "about a fire"], "He rode in 1775."],
    ["The Fourth of July is our country's…", "birthday", ["bedtime", "first snow"], "We celebrate with fireworks."],
  ]),
  localCopy(from(WASHINGTON_SOCIAL_1, "wa-g1-families-near-far"), "ma-g1-families-near-far", ["1.T2.5", "different ways of living, customs and traditions around the world"], [
    ["Bananas don't grow in Massachusetts. How do we get them?", "They come from warm places", ["They grow in snow", "They fall from clouds"], "Trucks and ships bring them."],
    ["Families in many places eat rice every day. That is a…", "custom", ["planet", "storm"], "A way people often do things."],
    ["Some families speak more than one…", "language", ["shoe", "weather"], "Spanish and English, for example."],
    ["Lunar New Year, Diwali and Eid are…", "celebrations", ["mountains", "oceans"], "Families celebrate in many ways."],
    ["Kids around the world all like to…", "play", ["drive", "vote"], "Games are different, but play is fun everywhere."],
  ]),
];
