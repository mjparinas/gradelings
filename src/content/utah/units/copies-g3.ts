import type { Unit } from "../../types";
import { SOCIAL_3 } from "../../california/units/social-g3";
import { SCIENCE_3, SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Utah copies of Grade 3 science and social studies units that fit Utah except for a few questions naming another state's places, with
// Utah examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_3, "wa-g3-weather-climate"), "ut-g3-weather-climate", ["3.1.1; 3.1.2", "weather data in different seasons, and the climates of different regions of the world"], [
    ["Much of Utah gets little rain each year, so its climate is…", "dry", ["very rainy", "like a rainforest"], "Much of Utah is desert."],
    ["Which season usually brings the most snow to Utah's mountains?", "winter", ["summer", "fall"], "Ski resorts open then."],
    ["St. George, in southern Utah, is usually warmer in winter than Logan, in northern Utah. This describes…", "climate", ["one day's weather", "the time of day"], "It is a pattern year after year."],
    ["“It snowed in Salt Lake City this morning.” Is that weather or climate?", "weather", ["climate", "a season"], "It tells about one day."],
    ["Utah's mountains often get more snow than its valleys because…", "air cools as it rises up the mountains", ["mountains are closer to the sun", "valleys have no air"], "Cool air drops more water.", true],
    ["Sudden summer storms with rain and lightning in Utah's deserts are called…", "monsoon storms", ["blizzards", "hurricanes"], "They come most in July and August.", true],
  ], {
    parentNote: "Practises reading weather data for different seasons and comparing climates around the world, from Utah's dry deserts and snowy mountains to rainforests and polar regions.",
  }),
  localCopy(from(SCIENCE_5, "wa-g5-gravity"), "ut-g3-gravity", ["3.3.3", "Earth's gravitational force pulls objects down, toward the centre of Earth"], [
    ["A rock tumbles off a cliff in Zion National Park. Which way does it fall?", "down, toward the centre of Earth", ["up, toward the sky", "sideways, toward the east"], "Gravity pulls things down everywhere on Earth."],
    ["A child in Salt Lake City and a child far away in Australia each drop a ball. What happens?", "both balls fall down toward Earth", ["only the Utah ball falls", "the ball in Australia falls up"], "Down always means toward Earth's centre."],
    ["Snow sliding down a Wasatch mountainside is pulled by…", "gravity", ["magnetism", "wind only"], "Gravity pulls things downhill."],
    ["Water in a Utah river flows downhill because of…", "gravity", ["sunlight", "static electricity"], "Gravity pulls water toward lower ground.", true],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(SOCIAL_3, "ca-g3-money-and-voting"), "ut-g3-money-and-voting", ["3.3.4; 3.3.5", "civic roles such as voting, and how community leaders are elected"], [
    ["Peaches grown in a Utah orchard and sold at a nearby farm stand are…", "made and sold locally", ["made in another country", "made in a factory overseas"], "They did not travel far."],
    ["Utah's governor is chosen by…", "the voters of Utah", ["the President", "the mayor of Salt Lake City"], "Citizens elect state leaders."],
    ["Taxes collected in a Utah city help pay for…", "parks, roads and firefighters", ["people's own birthday parties", "private toys"], "Taxes pay for services everyone uses."],
    ["In Utah, a mayor and city council are chosen in…", "a city election", ["a spelling bee", "a lottery"], "Voters pick local leaders."],
  ], {
    parentNote: "Natural, human and capital resources, what is made locally and elsewhere, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Utah examples.",
  }),
];
