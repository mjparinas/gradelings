import type { Unit } from "../../types";
import { SCIENCE_4 as TEXAS_SCIENCE_4 } from "../../texas/units/science-4";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 4 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_4, "tx-g4-seasons-moon"), "ga-g4-seasons-moon", ["S4E2.a; S4E2.b; S4E2.c", "why day length and the seasons change, and the phases of the moon"], [
    ["In Georgia, the days with the most hours of daylight come in…", "June", ["December", "March"], "It is near the start of summer."],
    ["Earth has seasons because…", "Earth's axis is tilted", ["Earth gets much closer to the sun in summer", "the moon blocks the sun"], "The tilt changes how directly sunlight hits us."],
    ["The moon seems to change shape because…", "we see different amounts of its sunlit half", ["it really changes shape", "clouds cover parts of it"], "The moon makes no light of its own."],
    ["From one full moon to the next takes about…", "29 days", ["7 days", "365 days"], "About one month."],
  ]),
  localCopy(from(TEXAS_SCIENCE_4, "tx-g4-weather-climate"), "ga-g4-weather-climate", ["S4E4.d", "the difference between weather and climate"], [
    ["\"It is raining in Atlanta today\" describes…", "weather", ["climate", "a season"], "Today's conditions are weather."],
    ["\"Savannah has hot, humid summers most years\" describes…", "climate", ["weather", "a forecast"], "A pattern over many years is climate."],
    ["The north Georgia mountains are usually cooler than the coast because…", "air is cooler higher up", ["they are closer to the sun", "they have more beaches"], "Temperature drops as you climb."],
    ["A barometer measures…", "air pressure", ["rainfall", "wind direction"], "Falling pressure can mean a storm."],
    ["An anemometer measures…", "wind speed", ["temperature", "rainfall"], "Its cups spin in the wind."],
    ["Hurricanes are most likely to reach Georgia's coast in…", "late summer and fall", ["January", "early spring"], "Hurricane season runs from June to November."],
  ], { parentNote: "Practices telling weather (conditions on one day) from climate (the usual pattern over many years)." }),
  localCopy(from(TEXAS_SCIENCE_4, "tx-g4-food-webs"), "ga-g4-food-webs", ["S4L1.c; S4L1.d", "what happens to a food web when plants or animals become scarce"], [], { parentNote: "Practices how matter cycles and energy flows through food webs, including the roles of the Sun, producers, consumers and decomposers." }),
];
