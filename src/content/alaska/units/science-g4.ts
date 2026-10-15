import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Alaska Grade 4 science: copies of California's Earth-hazards and energy-resources units without their California
// places, with Alaska examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ak-g4-earth-hazards",
      title: "Quakes, Volcanoes & Maps",
      emoji: "🌋",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides and tsunamis, with Alaska examples.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["On a map, Alaska's volcanoes form a long curved line along the…", "Aleutian Islands", ["Arctic coast", "Yukon River", "Brooks Range"], "The islands stretch west into the Pacific."],
      ["Most of Alaska's big earthquakes happen near…", "the southern coast", ["the Arctic coast", "the middle of the Interior only", "nowhere"], "That is where two plates meet."],
      ["Which tool warns people that a tsunami may be coming?", "sirens and phone alerts", ["a rain gauge", "a thermometer", "a compass"], "Warnings give people time to reach high ground."],
      ["Why do some coastal towns have signs pointing uphill?", "to show the way to safety from a tsunami", ["to show the way to the beach", "for a race", "to find a store"], "A tsunami route leads to high ground."],
      ["Strong buildings that bend a little in an earthquake are…", "less likely to fall down", ["more likely to fall down", "no different", "only for summer"], "Building rules help keep people safe."],
      ["Scientists put instruments on volcanoes to…", "notice small changes before an eruption", ["make the volcano bigger", "stop all eruptions", "heat the rock"], "Small earthquakes and gas can be warning signs.", true],
      ["After a 1964 earthquake, the town of Valdez was moved. Why?", "the old ground was unsafe", ["they found gold", "it was too sunny", "the ocean dried up"], "Moving away from danger is one solution.", true],
      ["Which solution helps pilots stay safe from volcanic ash?", "ash cloud warnings so flights can change course", ["flying through the ash", "turning off the radio", "flying lower into it"], "Ash can harm airplane engines.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ak-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, wind, sunlight, heat inside Earth, oil and gas, and how using them affects the environment, with Alaska examples.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Oil from Alaska's North Slope travels south through a long…", "pipeline", ["river", "glacier", "tunnel under the sea"], "The Trans-Alaska Pipeline is about 800 miles long."],
      ["Many towns in Southeast Alaska get electricity from moving water. This is called…", "hydropower", ["coal power", "solar power", "nuclear power"], "Dams turn falling water into electricity."],
      ["Some Alaska villages use spinning turbines that run on…", "wind", ["oil", "sand", "snow"], "Wind turns the blades."],
      ["Chena Hot Springs near Fairbanks makes electricity from…", "heat inside Earth", ["moonlight", "ocean waves", "burning trees"], "This is geothermal energy."],
      ["Which energy resource will run out someday?", "oil", ["wind", "sunlight", "moving water"], "Oil takes millions of years to form."],
      ["Many small villages make electricity by burning diesel fuel. Why can that be costly?", "fuel must be shipped or flown in from far away", ["diesel is free", "villages are next to oil wells", "diesel grows on trees"], "Moving fuel a long way costs a lot.", true],
      ["Which is a way to use less fuel at home?", "seal drafts and add insulation", ["leave doors open", "turn up the heat and open windows", "leave lights on all night"], "Insulation keeps heat inside.", true],
      ["Burning oil and gas releases carbon dioxide into the…", "air", ["rocks only", "snowpack only", "deep sea only"], "Carbon dioxide traps heat in the air.", true],
    ],
  ),
];
