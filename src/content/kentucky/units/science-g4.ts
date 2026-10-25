import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { SCIENCE_COPIES as CALIFORNIA_SCIENCE_3 } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Kentucky Grade 4 science: copies of California's earth-hazards, energy-resources and fossils units without their
// California places, with Kentucky examples added. Kentucky teaches fossils in Grade 4 (4-LS4-1), not Grade 3.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ky-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Kentucky knows: tornadoes, river floods, sinkholes and earthquakes in the far west of the state.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A tornado siren helps people…", "take shelter in time", ["stop the wind", "cool the air", "find their way home"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Louisville's floodwall along the Ohio River helps…", "keep floodwater out of the city", ["make tornadoes", "start earthquakes", "melt snow"], "It was built after the great flood of 1937."],
      ["Building on high ground away from creeks helps keep homes in eastern Kentucky safe from…", "flash floods", ["droughts", "earthquakes", "lightning only"], "Water rises fast in narrow valleys."],
      ["A sinkhole can open in Kentucky's limestone because…", "water dissolves the rock underground", ["the wind blows it open", "volcanoes push it up", "trees pull it down"], "Caves and sinkholes form in limestone."],
      ["Western Kentucky is near the New Madrid fault zone, so schools there practice…", "earthquake drills", ["hurricane drills", "volcano drills", "tsunami drills"], "Drop, cover and hold on."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Kentucky", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ky-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight, moving water and uranium, using Kentucky examples such as its coal fields, its hydroelectric dams and solar farms built on old mine land.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Kentucky's coal comes from coal fields in the…", "east and west of the state", ["Atlantic Ocean", "Bluegrass horse farms only", "air"], "Miners dig it from underground and from the surface."],
      ["Kentucky Dam on the Tennessee River makes electricity from…", "moving water", ["coal dust", "wind", "corn oil"], "Water spins turbines."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Some old Kentucky coal mines have become sites for…", "solar farms", ["oceans", "volcanoes", "glaciers"], "Flat, open land works well for panels."],
      ["Many Kentucky homes are heated with a fossil fuel piped in called…", "natural gas", ["sunlight", "wind", "sand"], "Gas is found underground in Kentucky."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Surface coal mining in the mountains changes the land by…", "removing soil, trees and rock", ["adding new mountains", "making oceans", "growing forests at once"], "Mined land is later reclaimed.", true],
    ],
  ),
  copyOf(
    from(CALIFORNIA_SCIENCE_3, "ca-g3-fossils"),
    {
      id: "ky-g4-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as the brachiopods and coral of Kentucky's ancient seas and the mastodons at Big Bone Lick.",
      standards: ["4-LS4-1; 4-ESS1-1", "fossils as evidence of organisms and environments of long ago, and rock layers as evidence of a changing landscape"],
    },
    [
      ["Kentucky's state fossil, the brachiopod, was an ancient…", "sea animal with two shells", ["bird", "tree", "dinosaur"], "Brachiopods lived in warm seas."],
      ["Brachiopod and coral fossils in Kentucky rocks show the land was once…", "a warm, shallow sea", ["a frozen desert", "a high mountain", "a volcano"], "Sea animals lived where Kentucky is now."],
      ["Big Bone Lick in northern Kentucky is famous for bones of…", "mastodons and mammoths", ["T. rex", "sharks", "whales"], "Ice Age animals came to its salty springs."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Mastodon bones found in Kentucky show it was once…", "much colder", ["a rainforest", "under lava", "a desert"], "Mastodons lived in the Ice Age."],
      ["The Falls of the Ohio at Louisville have rock full of fossil…", "coral", ["dinosaurs", "birds", "flowers"], "It was once a coral reef in a warm sea."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Coral fossils far from any ocean tell us…", "the place was once a warm sea", ["coral can walk", "it was always dry land", "coral lives in deserts"], "Coral grows in warm, shallow seas.", true],
    ],
  ),
];
