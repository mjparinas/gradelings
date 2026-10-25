import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_UNITS_SOCIAL_G2_SOCIAL_2 } from "../../california/units/social-g2";
import { SCIENCE_2 as WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Louisiana copies of Grade 2 units that fit Louisiana except for a few questions naming another state's places, with
// Louisiana examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2, "wa-g2-earth-changes"), "la-g2-earth-changes", ["2-ESS1-1; 2-ESS2-1", "Earth events that happen quickly or slowly, and ways to slow wind or water from changing the land"], [
      ["A hurricane changes a Louisiana beach in…", "a few hours or days", ["millions of years", "exactly one second"], "Storms change land fast."],
      ["The Mississippi River built the land of southern Louisiana by dropping…", "mud and sand over thousands of years", ["rocks from space", "snow and ice"], "Rivers carry sediment."],
      ["People plant marsh grass along the Louisiana coast to…", "hold the soil so waves don't wash it away", ["make the water saltier", "attract more storms"], "Roots hold soil in place."],
      ["Which slows a river from washing away its bank?", "rocks and plants along the bank", ["removing all the plants", "digging the bank away"], "Plants and rocks protect soil."],
      ["Land along the Louisiana coast is slowly washing away. This change is…", "slow, over many years", ["instant, in one second", "not happening at all"], "Erosion often takes a long time."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2, "wa-g2-land-water"), "la-g2-land-water", ["2-ESS2-2; 2-ESS2-3", "models of land and water, and where water is found on Earth as solid or liquid"], [
      ["A bayou is a…", "slow-moving stream in low, wet land", ["tall mountain", "hot desert"], "Louisiana has many bayous."],
      ["Lake Pontchartrain, near New Orleans, holds water that is…", "liquid", ["solid ice all year", "a gas"], "It is a large lake."],
      ["On a map of Louisiana, the long blue line flowing south is the…", "Mississippi River", ["Rocky Mountains", "Great Plains"], "Blue shows water."],
      ["A marsh is land that is…", "wet and covered with grasses", ["dry and sandy", "covered in snow all year"], "Louisiana's coast has many marshes."],
      ["Where does the Mississippi River end?", "the Gulf, south of Louisiana", ["a mountain top", "the Arctic"], "Rivers flow to the sea."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_K2_SCIENCE_2, "wa-g2-habitats"), "la-g2-habitats", ["2-LS4-1", "the different kinds of plants and animals that live in different habitats"], [
      ["Which animal lives in Louisiana's swamps and bayous?", "an alligator", ["a polar bear", "a camel"], "It likes warm, wet places."],
      ["Brown pelicans, Louisiana's state bird, find food by…", "diving into water for fish", ["digging for roots in the desert", "eating snow"], "They live near the coast."],
      ["Bald cypress trees grow well in…", "swamps with standing water", ["dry sand dunes", "icy tundra"], "Their roots can stand in water."],
      ["Crawfish live in…", "muddy fresh water", ["hot dry rocks", "the treetops"], "They hide in mud."],
    ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(CALIFORNIA_UNITS_SOCIAL_G2_SOCIAL_2, "ca-g2-reading-maps"), "la-g2-reading-maps", ["2.20", "making and using maps with a key, scale and compass rose"], [
      ["On a map of Louisiana, a star usually marks the…", "state capital, Baton Rouge", ["biggest swamp", "tallest tree"], "Check the map key."],
      ["On a map of Louisiana, the Gulf is at the…", "bottom, to the south", ["top, to the north", "left, to the west"], "North is usually at the top."],
      ["A map of New Orleans would show…", "streets, parks and the Mississippi River", ["the whole world", "the planets"], "It shows one city."],
      ["On a map, the blue line through Baton Rouge and New Orleans is the…", "Mississippi River", ["state border", "highway"], "Blue shows water."],
    ]),
];
