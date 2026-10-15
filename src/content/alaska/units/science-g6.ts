import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Alaska Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Alaska examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "ak-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including the storms that come off the Gulf of Alaska and the drier air of the Interior.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["A cold, dry air mass that forms over the Arctic is called…", "continental polar or arctic air", ["maritime tropical air", "a sea breeze", "a warm front"], "Air masses take on the traits of where they form."],
      ["Storms that hit Southcentral Alaska often form over the…", "Gulf of Alaska", ["Sahara", "Great Plains", "Gulf of Mexico"], "Warm, moist ocean air feeds the storms."],
      ["Why is the Interior drier than the southern coast?", "mountains wring moisture out of ocean air first", ["the Interior is closer to the sun", "the Interior has no air", "rivers soak up the rain"], "This is a rain shadow."],
      ["A long, narrow band of moist air that brings heavy rain to Southeast Alaska is an…", "atmospheric river", ["ocean current", "ice jam", "aurora"], "It carries water vapor from warmer seas."],
      ["When cold arctic air pushes under warmer air, it often brings…", "a sudden drop in temperature", ["a heat wave", "no change at all", "a tsunami"], "This is a cold front.", true],
      ["Snow on Alaska's mountains melts in spring and flows to the sea. What moves the water downhill?", "gravity", ["sunlight", "wind only", "magnetism"], "Gravity pulls water down.", true],
      ["What gives the water cycle its energy to evaporate water?", "the sun", ["the moon", "Earth's core", "the wind alone"], "Sunlight heats water.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "ak-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, oceans, mountains and winds shape regional climate, such as Alaska's mild coast and cold Interior, and the evidence for and causes of rising global temperatures, including shrinking sea ice and thawing permafrost.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is Kodiak's climate milder than Fairbanks' at a similar latitude?", "the ocean keeps coastal temperatures steady", ["Kodiak is closer to the sun", "Fairbanks is underground", "the moon warms Kodiak"], "Water warms and cools slowly."],
      ["The Arctic is warming faster than most of the planet. One sign is…", "less summer sea ice", ["more glaciers growing", "shorter summers", "colder rivers"], "Scientists measure sea ice from satellites."],
      ["Why can melting sea ice make the Arctic warm even faster?", "dark ocean water absorbs more sunlight than white ice", ["ice makes heat", "water reflects all sunlight", "the sun moves closer"], "This is a feedback.", true],
      ["Thawing permafrost can release…", "greenhouse gases stored in frozen soil", ["more ice", "oxygen only", "seawater"], "Frozen soil holds old plant material."],
      ["Many of Alaska's glaciers are…", "shrinking", ["growing every year", "turning into rock", "moving uphill"], "Photos taken years apart show the change."],
      ["What is the main cause of the recent rise in global temperatures?", "more greenhouse gases from burning fuels", ["the moon getting closer", "more volcanoes on the moon", "Earth spinning faster"], "Carbon dioxide traps heat.", true],
      ["Why are Alaska's winters colder than Hawaii's?", "Alaska is at a higher latitude and gets less direct sunlight", ["Alaska is closer to the sun", "Hawaii has no ocean", "Alaska has more people"], "Latitude shapes climate."],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "ak-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and how asexual and sexual reproduction differ, with Alaska plants and animals.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Salmon swim back to the stream where they hatched. This behavior helps them…", "reproduce", ["sleep", "change color only", "grow wings"], "They lay eggs in the gravel."],
      ["Fireweed spreads by seeds and also by underground roots. Spreading by roots is…", "asexual reproduction", ["sexual reproduction", "migration", "hibernation"], "New plants from roots are copies of the parent."],
      ["Alaska vegetables can grow very large in summer partly because of…", "long hours of daylight", ["no water", "cold soil", "short days"], "More light means more photosynthesis."],
      ["Bright flowers and nectar help a plant by…", "attracting pollinators", ["scaring away all insects", "stopping seed growth", "keeping water out"], "Bees and flies carry pollen."],
      ["Animals spread blueberry seeds by…", "eating the berries and leaving the seeds elsewhere", ["burying the plant", "eating the leaves", "making nests of it"], "Seeds pass through the animal.", true],
      ["Why do offspring from sexual reproduction differ from their parents?", "they get genes from two parents", ["they get no genes", "they are exact copies", "the sun changes their genes"], "Each parent gives half the genes.", true],
      ["Two spruce seedlings have the same genes. One grows in shade and one in sun. Why might they grow differently?", "the environment affects growth", ["genes never matter", "shade adds genes", "sunlight removes genes"], "Both genes and environment shape growth.", true],
    ],
  ),
];
