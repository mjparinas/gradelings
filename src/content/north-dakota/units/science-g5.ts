import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// North Dakota Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with North Dakota examples added (long summer days and long winter nights, dark skies in the Badlands, the
// northern lights, Lake Sakakawea, prairie wetlands and aquifers).

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "nd-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from North Dakota, where summer days are long and winter nights are long.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In June, the sun in Bismarck rises early and sets late, so the days are…", "long", ["short", "dark all day", "the same as December"], "Summer days are longest."],
      ["In December, the days in North Dakota are…", "short, with long nights", ["longer than in June", "sunny all night", "exactly 12 hours"], "Winter has the longest nights."],
      ["Your shadow at noon on a summer day is…", "short", ["very long", "in front of the sun", "gone forever"], "The sun is high in the sky at noon in summer."],
      ["The sun looks much brighter than other stars because it is…", "much closer to Earth", ["the biggest star in space", "made of fire", "the only star"], "Other stars are very far away."],
      ["On a clear night far from city lights, like in the Badlands, you can see…", "many more stars", ["no stars at all", "the sun", "only the moon"], "City lights hide faint stars."],
      ["The northern lights are glowing colors sometimes seen in North Dakota's night sky. They are caused by…", "particles from the sun hitting the air high above Earth", ["city lights", "clouds of smoke", "car headlights"], "They are often green."],
      ["The sun seems to move across the sky each day because…", "Earth spins", ["the sun circles Earth", "clouds push it", "the moon pulls it"], "One spin takes one day.", true],
      ["Some groups of stars can be seen in summer but not in winter because…", "Earth moves around the sun", ["the stars turn off", "stars melt", "clouds block them all winter"], "We look out in different directions during the year.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "nd-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using North Dakota examples like the Missouri River, Lake Sakakawea, prairie wetlands and the water stored underground.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Many North Dakota towns get their drinking water from the Missouri River or from…", "water stored underground", ["the ocean", "glaciers", "clouds that land on roofs"], "Wells pump water up from below."],
      ["Prairie wetlands soak up rain and melting snow. This helps…", "slow down floods", ["make deserts", "start earthquakes", "melt rocks"], "Wetlands hold water like a sponge."],
      ["Wind blowing over dry, bare fields can carry away…", "soil", ["rivers", "rainbows", "sunlight"], "This is the geosphere and atmosphere working together."],
      ["Plants growing on a riverbank help keep the soil from…", "washing away", ["growing", "staying warm", "making seeds"], "Roots hold the soil in place."],
      ["Fertilizer that washes off fields into a lake can make too much… grow.", "algae", ["ice", "sand", "rock"], "Extra nutrients feed tiny green living things."],
      ["Most of Earth's water is…", "salt water in the oceans", ["in lakes", "in rivers", "in clouds"], "Only a small part is fresh."],
      ["Planting buffer strips of grass between fields and a river helps…", "keep soil and fertilizer out of the water", ["make the river saltier", "dry up the river", "stop the rain"], "Grass catches what runs off.", true],
      ["Why do people need to protect fresh water in lakes like Lake Sakakawea?", "only a little of Earth's water is fresh and usable", ["fresh water is everywhere", "lakes never change", "fish do not need water"], "Fresh water is precious.", true],
    ],
  ),
];
