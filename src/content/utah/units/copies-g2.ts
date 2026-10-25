import type { Unit } from "../../types";
import { SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Utah copies of Grade 2 science units that fit Utah except for a few questions naming another state's places, with
// Utah examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_2, "wa-g2-habitats"), "ut-g2-habitats", ["2.2.1", "comparing the living things in different habitats"], [
    ["Which habitat in southern Utah is hot and dry with little rain?", "desert", ["rainforest", "ocean"], "Lizards and cactuses live there."],
    ["Tiny brine shrimp live in the Great Salt Lake because they can live in…", "very salty water", ["fresh river water only", "ice"], "The lake is much saltier than the ocean."],
    ["Many birds stop at the wetlands by the Great Salt Lake to…", "rest and eat on long trips", ["build houses", "sleep all winter in caves"], "Wetlands are full of food."],
    ["Which animal lives in Utah's high mountain forests?", "elk", ["shark", "camel"], "It is a big animal in the deer family."],
    ["A desert tortoise in southern Utah stays cool by…", "resting in a burrow underground", ["swimming in the ocean", "growing thick fur"], "Underground is shady and cool.", true],
  ], {
    parentNote: "Practises comparing the plants and animals that live in different habitats, from Utah's deserts, mountain forests and Great Salt Lake wetlands to oceans and grasslands.",
  }),
  localCopy(from(SCIENCE_2, "wa-g2-earth-changes"), "ut-g2-earth-changes", ["2.1.2; 2.1.3", "Earth events that happen quickly or slowly, and ways to slow wind and water from changing the land"], [
    ["The stone arches in Arches National Park formed over…", "a very long time", ["one day", "one week"], "Water and ice wear rock away slowly."],
    ["A flash flood rushing through a Utah canyon is a…", "fast change", ["slow change", "change that takes a million years"], "It happens in minutes."],
    ["The tall rock spires called hoodoos at Bryce Canyon were shaped by…", "ice, rain and wind over many years", ["people with tools", "one big storm"], "Water freezes in cracks again and again."],
    ["A landslide that covers a mountain road is a…", "fast change", ["slow change", "change no one can see"], "It happens all at once."],
    ["Planting grass on a bare hillside helps slow…", "soil washing away", ["the sun", "snow from falling"], "Roots hold the soil.", true],
  ]),
];
