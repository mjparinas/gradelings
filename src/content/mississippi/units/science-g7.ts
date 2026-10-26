import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Mississippi Grade 7 science: a copy of California's climate unit without its California places, with Mississippi
// examples added.

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g6-climate"),
    {
      id: "ms-g7-climate",
      title: "Climate & Climate Change",
      emoji: "🌡️",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices what shapes a region's climate, how greenhouse gases trap heat, and how natural events and human activity change global climate, with Mississippi examples like the warm Gulf of Mexico, rising sea levels on the coast and stronger rainstorms.",
      standards: ["E.7.9B", "the relationship between natural phenomena, human activity and global climate change"],
    },
    [
      ["Mississippi's mild winters and humid summers are shaped mostly by its nearness to the…", "warm Gulf of Mexico", ["Arctic Ocean", "Rocky Mountains", "Sahara Desert"], "Large bodies of warm water add heat and moisture to the air."],
      ["Carbon dioxide from burning coal, oil and gas warms Earth because it…", "traps heat in the atmosphere", ["blocks all sunlight", "cools the oceans", "makes the sun hotter"], "It acts like a blanket around Earth."],
      ["As Earth warms, sea level along the Mississippi coast is rising because…", "ocean water expands and land ice melts", ["the Gulf is getting saltier", "rivers are flowing backward", "the moon is closer"], "Warm water takes up more space."],
      ["Warmer Gulf water can make hurricanes…", "stronger and wetter", ["colder", "disappear forever", "move only over land"], "Hurricanes get energy from warm water."],
      ["A large volcanic eruption can cool Earth for a year or two because…", "ash and gases block some sunlight", ["lava warms the oceans", "it adds more sunlight", "it stops the wind"], "Particles high in the air reflect light."],
      ["Planting forests helps slow climate change because trees…", "take carbon dioxide out of the air", ["make the sun dimmer", "add more carbon dioxide", "melt ice"], "Plants use carbon dioxide in photosynthesis."],
      ["Which is a way a Mississippi town could cut its greenhouse gas emissions?", "using solar power for some of its electricity", ["burning more coal", "leaving lights on all day", "driving more"], "Solar panels do not burn fuel.", true],
      ["Weather is today's conditions; climate is…", "the average conditions over many years", ["tomorrow's forecast", "one storm", "the temperature right now"], "Climate uses decades of data.", true],
    ],
  ),
];
