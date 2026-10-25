import type { Unit } from "../../types";
import { SCIENCE_3 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3 } from "../../washington/units/science-35";
import { SCIENCE_4 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 4 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3, "wa-g3-fossils"), "tn-g4-fossils", ["4.LS4.1", "fossils as evidence of organisms and environments of long ago"], [
      ["Coon Creek in West Tennessee is famous for fossils of…", "sea shells, showing an ocean once covered it", ["dinosaur eggs on a mountain", "modern cars"], "The fossils are about 70 million years old."],
      ["Gray Fossil Site in East Tennessee has fossils of ancient…", "rhinos, tapirs and red pandas", ["whales", "penguins"], "It was once a sinkhole pond."],
      ["Finding sea shell fossils in Tennessee tells us that the land…", "was once under water", ["was always a desert", "has never changed"], "Fossils are clues to the past."],
      ["Tennessee's state fossil is a…", "sea shell called Pterotrigonia", ["mammoth", "shark tooth"], "It was found at Coon Creek."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-rocks-erosion"), "tn-g4-rocks-erosion", ["4.ESS1.2; 4.ESS3.2", "rock layers and fossils show landscape change, and weathering and erosion shape the land"], [
      ["The Tennessee River Gorge near Chattanooga was carved by…", "the river wearing away rock", ["a volcano", "people with shovels"], "Water erodes rock over time."],
      ["Rock layers in Tennessee road cuts show that…", "older layers are usually on the bottom", ["the top is always oldest", "rocks never form layers"], "Layers stack over time."],
      ["Water dissolving limestone made Tennessee's…", "caves and sinkholes", ["volcanoes", "glaciers"], "Limestone is soft rock."],
      ["Roots of trees on a hillside help stop…", "erosion", ["rain", "sunlight"], "Roots hold the soil."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-earth-hazards"), "tn-g4-earth-hazards", ["4.ESS2.2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"], [
      ["The New Madrid Seismic Zone near West Tennessee is a place where…", "earthquakes can happen", ["volcanoes erupt", "hurricanes start"], "Faults are cracks in Earth's crust."],
      ["Large earthquakes in 1811 and 1812 near the Mississippi River formed…", "Reelfoot Lake", ["the Smoky Mountains", "Lookout Mountain"], "The land sank and filled with water."],
      ["Buildings in earthquake zones can be made safer by…", "strong frames that bend without breaking", ["glass walls only", "building on sand"], "Engineers design for shaking."],
      ["A map showing where earthquakes happened helps people…", "see patterns and plan", ["make it rain", "stop all earthquakes"], "Maps show patterns."],
      ["The New Madrid Seismic Zone, near West Tennessee, is a place where…", "strong earthquakes have happened", ["volcanoes erupt every year", "hurricanes start"], "The 1811 and 1812 quakes were felt far away."],
      ["Reelfoot Lake in West Tennessee was formed after…", "strong earthquakes in 1811 and 1812", ["a volcano erupted", "a glacier melted"], "The land sank and filled with water."],
      ["In a tornado warning, the safest place is…", "a low inside room with no windows", ["next to a big window", "outside in a car"], "Get low and away from glass."],
    ], { parentNote: "Practises reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides and tsunamis, including the New Madrid fault zone near West Tennessee." }),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-energy-resources"), "tn-g4-energy-resources", ["4.ESS3.1", "energy and fuels come from natural resources, and their use affects the environment"], [
      ["TVA dams on the Tennessee River make electricity from…", "moving water", ["burning wood", "wind only"], "This is hydroelectric power."],
      ["Coal mined on the Cumberland Plateau is a…", "nonrenewable resource", ["renewable resource", "kind of plant alive today"], "It takes millions of years to form."],
      ["Solar panels on a Tennessee roof turn… into electricity.", "sunlight", ["coal", "rain"], "The sun is renewable."],
      ["A dam can change a river by…", "making a lake and blocking fish", ["making the river longer", "heating the water to boiling"], "Every energy source has effects."],
    ], { parentNote: "Practises how energy and fuels come from natural resources like moving water, wind, sunlight, coal, oil and gas, and how using them affects the environment, including TVA's hydroelectric dams on the Tennessee River." }),
];
