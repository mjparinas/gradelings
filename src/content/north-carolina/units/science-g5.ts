import type { Unit } from "../../types";
import { bankUnit } from "../own";

// North Carolina's own Grade 5 science unit: the ocean's effect on North Carolina's weather and climate.

export const SCIENCE_5: Unit[] = [
  bankUnit({
    id: "nc-g5-ocean-weather",
    title: "The Ocean and North Carolina's Weather",
    emoji: "🌊",
    blurb: "How the Atlantic shapes weather and climate along the coast.",
    parentNote:
      "Practices how the ocean affects North Carolina's weather and climate: water heats and cools more slowly than land, sea breezes, the warm Gulf Stream, why the coast has milder winters than the mountains, and how warm ocean water feeds hurricanes.",
    standards: ["ESS.5.1.3", "the ocean's influences on weather and climate in North Carolina"],
    items: [
      ["Compared with land, ocean water heats up and cools down…", "more slowly", ["much faster", "at exactly the same speed"], "Water stores heat well."],
      ["On a sunny summer afternoon at the beach, the breeze usually blows…", "from the ocean toward the land", ["from the land toward the ocean", "straight down from the sky"], "This is a sea breeze."],
      ["Why does a sea breeze form during the day?", "the land warms faster, so warm air rises and cooler ocean air moves in", ["the ocean is hotter than the land", "the moon pulls the air"], "Air moves from cool to warm areas."],
      ["The warm ocean current that flows past North Carolina's coast is the…", "Gulf Stream", ["Labrador Current", "Jet Stream"], "It carries warm water north."],
      ["Which part of North Carolina usually has the mildest winters?", "the coast", ["the highest mountains", "the top of Mount Mitchell"], "The ocean keeps it warmer."],
      ["Hurricanes get their energy from…", "warm ocean water", ["cold mountain air", "snowfields"], "They weaken over land."],
      ["Hurricane season in the Atlantic runs from June 1 to…", "November 30", ["January 1", "March 31"], "Most storms come in late summer and fall."],
      ["When a hurricane moves over land, it usually…", "weakens", ["grows stronger", "turns into snow"], "It loses its warm water fuel."],
      ["Why is the coast often more humid than the mountains in summer?", "water evaporates from the ocean into the air", ["the mountains have more water", "the sun doesn't shine on the coast"], "Humidity is water vapor in the air."],
      ["A storm surge is…", "ocean water pushed onto land by a storm's winds", ["a sudden snowfall", "a kind of earthquake"], "It causes coastal flooding."],
      ["Which place in North Carolina is most likely to feel a hurricane first?", "the Outer Banks", ["Asheville", "Boone"], "They stick out into the Atlantic."],
      ["Winter nights on the coast are usually warmer than inland because…", "the ocean releases stored heat", ["the coast is closer to the sun", "there is less air there"], "The ocean acts like a heater."],
      ["A nor'easter is a storm that brings strong winds from the…", "northeast, off the ocean", ["southwest, from the desert", "inside the mountains only"], "It is common in fall and winter.", true],
      ["Cape Hatteras sees many storms partly because it is where the warm Gulf Stream meets…", "cooler water from the north", ["a desert", "a volcano"], "Different air and water collide there.", true],
      ["Climate differs from weather because climate is…", "the usual pattern over many years", ["what happens today", "only about rain"], "Weather changes daily.", true],
      ["If ocean water near the coast is warmer than usual, hurricanes that pass over it may…", "become stronger", ["disappear", "turn into tornadoes only"], "More heat means more energy.", true],
      ["Why do beach towns warm up more slowly in spring than inland towns?", "the cold ocean takes a long time to warm", ["the sun rises later there", "sand reflects all sunlight"], "Water heats slowly.", true],
      ["Rain from a hurricane can flood inland rivers because…", "the storm carries huge amounts of water vapor from the ocean", ["rivers flow uphill", "the mountains melt"], "Florence flooded rivers far inland.", true],
      ["The ocean moderates coastal temperatures, which means…", "summers are less hot and winters less cold", ["it is always freezing", "it never rains"], "Moderate means less extreme.", true],
      ["A land breeze at night blows…", "from the land toward the ocean", ["from the ocean toward the land", "straight up"], "At night the land cools faster.", true],
      ["Which tool measures how fast the wind blows?", "an anemometer", ["a thermometer", "a rain gauge"], "Its cups spin in the wind.", true],
      ["Fog often forms over the coast when…", "warm, moist air moves over cooler water or land", ["the air is very dry", "the sun is overhead at noon"], "The air cools and condenses.", true],
      ["Which is the best evidence that the ocean affects coastal climate?", "average winter temperatures are higher on the coast than inland at the same latitude", ["it rains everywhere sometimes", "the mountains are tall"], "Compare data from different places.", true],
      ["Hurricanes in the Northern Hemisphere spin…", "counterclockwise", ["clockwise", "not at all"], "Earth's rotation causes the spin.", true],
      ["Why do forecasters watch ocean temperatures in summer?", "warm water helps hurricanes form and grow", ["it tells them the date", "cold water causes heat waves"], "Ocean data helps predict storms.", true],
    ],
  }),
];
