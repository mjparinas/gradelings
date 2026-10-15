import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Alaska Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Alaska examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ak-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils show what lived long ago and what those places were like, with Alaska examples such as woolly mammoths and the dinosaurs found on the North Slope.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Alaska's state fossil is the…", "woolly mammoth", ["Tyrannosaurus", "saber-toothed cat", "trilobite"], "It was a hairy relative of the elephant."],
      ["Woolly mammoths had thick fur. What does that tell us about where they lived?", "it was cold", ["it was a hot desert", "it was under the sea", "it was a rainforest"], "Fur keeps animals warm."],
      ["Dinosaur bones have been found along the Colville River on Alaska's…", "North Slope", ["moon", "Hawaiian beaches", "ocean floor"], "Scientists dig them out of the riverbanks."],
      ["Fossil seashells are found high in Alaska's mountains. What does that show?", "the land was once under the sea", ["clams can climb", "it rained shells", "birds dropped them there"], "Rock that formed under the sea can be pushed up into mountains.", true],
      ["Fossil palm leaves have been found in Alaska. What do they tell us?", "Alaska was once much warmer", ["palms grow there today", "the leaves are fake", "palms like snow"], "Palms grow in warm places.", true],
      ["Mammoth tusks are often found frozen in…", "permafrost", ["lava", "sea ice", "glaciers on the moon"], "Frozen ground keeps old bones and tusks."],
      ["Scientists who study fossils are called…", "paleontologists", ["astronauts", "pilots", "chefs"], "Paleo means old or ancient."],
      ["Which animal from long ago has no living animals of its kind today?", "woolly mammoth", ["moose", "caribou", "brown bear"], "An animal that is gone forever is extinct.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ak-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Alaska's rainy Southeast, its cold, dry Arctic and its Interior's warm summers and very cold winters.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["Southeast Alaska gets lots of rain all year. Its climate is…", "wet and mild", ["hot and dry", "dry and sandy", "always freezing"], "The ocean brings rain and keeps it mild."],
      ["Alaska's Interior has warm summers and…", "very cold winters", ["hot winters", "no seasons", "rain every day"], "Fairbanks is far from the ocean."],
      ["The Arctic coast gets little rain or snow. Its climate is…", "cold and dry", ["hot and wet", "warm and rainy", "mild all year"], "It can be called a polar desert."],
      ["Which tool measures how much rain falls?", "rain gauge", ["thermometer", "compass", "ruler for snow only"], "It collects rain in a tube."],
      ["Weather is what the air is like today. Climate is…", "the usual weather of a place over many years", ["tomorrow's weather", "only the wind", "one rainy day"], "Climate is the pattern over a long time."],
      ["A town records 0 °F in January and 70 °F in July. Which month is warmer?", "July", ["January", "They are the same", "You cannot tell"], "70 is more than 0."],
      ["Why is Kodiak's winter milder than Fairbanks' winter?", "the ocean near Kodiak keeps it warmer", ["Kodiak is on the equator", "Fairbanks has no sun", "Kodiak has no wind"], "Oceans warm and cool slowly.", true],
      ["Which season usually brings the most daylight in Alaska?", "summer", ["winter", "fall", "every season is the same"], "Summer days in Alaska are very long.", true],
    ],
  ),
];
