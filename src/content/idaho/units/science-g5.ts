import type { Unit } from "../../types";
import { SCIENCE_COPIES as CA3_COPIES } from "../../california/units/science-g3";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Idaho Grade 5 science: copies of California's sun-and-stars, Earth's-systems and fossil units without their
// California places, with Idaho examples added. Idaho places fossils and variation within a species in Grade 5
// (5-LS-2.1, 5-LS-2.2), where other states teach them in Grade 3.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "id-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Idaho, home of one of the darkest night skies in the country.",
      standards: ["5-ESS-1.1; 5-ESS-1.2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Idaho, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Boise, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Idaho, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Idaho is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars from the mountains of central Idaho than from downtown Boise?", "there is much less light from cities", ["the stars are closer there", "there is no moon there", "the mountains make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "id-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Idaho examples like mountain snowpack, the Snake River Plain aquifer and Thousand Springs.",
      standards: ["5-ESS-2.1; 5-ESS-2.2; 5-ESS-3.1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Rain from a spring storm washes soil off a bare hillside into a creek. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Rivers of melted snow carve canyons in Idaho's rock. That shows the hydrosphere changing the…", "geosphere", ["biosphere only", "atmosphere only", "moon"], "Moving water wears rock away."],
      ["Sagebrush and other plants take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["moon", "core", "sun"], "The atmosphere is the air."],
      ["Water that soaks into the ground and fills the rock under the Snake River Plain is stored in an…", "aquifer", ["ocean", "glacier", "volcano"], "Farms and towns pump water from it."],
      ["Wetlands help Idaho's rivers by…", "soaking up floodwater and cleaning it", ["making the river saltier", "stopping all rain", "heating the water"], "Wetlands work like sponges."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["The water pouring out of the canyon walls at Thousand Springs…", "flowed there underground through the aquifer", ["came straight from the ocean", "melted from a glacier last week", "was pumped there by people"], "Water moves slowly through rock underground.", true],
      ["Why do towns and farms along the Snake River try to use water carefully?", "the same water is shared by many people downstream", ["river water never runs low", "rivers make new water every hour", "it makes the river longer"], "Water is a shared resource.", true],
    ],
  ),
  copyOf(
    from(CA3_COPIES, "ca-g3-fossils"),
    {
      id: "id-g5-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form, what they show about plants, animals and environments long ago, and how differences between animals of the same kind help some survive, with Idaho examples like the Hagerman horse, Idaho's state fossil, and the fossil leaves of Clarkia.",
      standards: ["5-LS-2.1; 5-LS-2.2", "fossils as evidence of organisms and environments of long ago, and variation that helps individuals survive"],
    },
    [
      ["The Hagerman horse, Idaho's state fossil, shows that… once lived in Idaho.", "an early kind of horse", ["whales", "penguins", "polar bears"], "Many of its fossils were found near Hagerman."],
      ["Fossil leaves found at Clarkia in northern Idaho show the area was once…", "a warm, wet forest by a lake", ["a frozen desert", "the bottom of an ocean", "a glacier"], "Leaves fell into the mud of an old lake."],
      ["Mammoth bones found in Idaho show the land was once…", "colder, during the Ice Age", ["a rainforest", "under lava", "the bottom of a deep ocean"], "Mammoths had thick fur for the cold."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Some deer in a herd can run faster than others. The faster deer are more likely to…", "escape predators and survive", ["turn into elk", "stop eating", "lose their spots"], "Small differences can help an animal survive."],
      ["Two cutthroat trout of the same kind have different spots. This shows that…", "animals of the same kind can vary", ["they are different kinds of fish", "spots never matter", "trout have no traits"], "Members of a species are not all the same."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils found far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
      ["In a very cold winter, which rabbits are most likely to survive?", "the ones with the thickest fur", ["the ones with the thinnest fur", "the ones that eat the least", "all of them the same"], "Traits that fit the environment help survival.", true],
    ],
  ),
];
