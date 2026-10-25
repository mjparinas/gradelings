import type { Unit } from "../../types";
import { bankUnit } from "../own";

// North Carolina's own Grade 7 science unit: the atmosphere, the water cycle, global winds and air quality.

export const SCIENCE_7: Unit[] = [
  bankUnit({
    id: "nc-g7-atmosphere",
    title: "Earth's Atmosphere",
    emoji: "🌤️",
    blurb: "The layers of the air, the water cycle and global winds.",
    parentNote:
      "Practices what the atmosphere is made of and how its layers differ, how the sun and gravity drive the water cycle, how convection, global winds and the jet stream shape weather, and why monitoring air quality matters for health.",
    standards: ["ESS.7.1.1; ESS.7.1.2; ESS.7.1.5; ESS.7.2.1", "the atmosphere, the water cycle, global winds and air quality"],
    items: [
      ["The gas that makes up most of Earth's atmosphere is…", "nitrogen", ["oxygen", "carbon dioxide"], "It is about 78% of the air."],
      ["About how much of the air is oxygen?", "21%", ["78%", "1%"], "Nitrogen is most of the rest."],
      ["The layer of the atmosphere where almost all weather happens is the…", "troposphere", ["stratosphere", "thermosphere"], "It is the lowest layer."],
      ["The ozone layer, which absorbs ultraviolet light, is in the…", "stratosphere", ["troposphere", "mesosphere"], "It is just above where planes fly."],
      ["As you climb higher in the troposphere, the temperature usually…", "drops", ["rises", "stays the same"], "Mountain tops are colder."],
      ["Air pressure is highest…", "at sea level", ["at the top of the atmosphere", "in space"], "More air presses down."],
      ["The energy that drives the water cycle comes mainly from…", "the sun", ["the moon", "Earth's core"], "Sunlight evaporates water."],
      ["Which force pulls rain and snow back to Earth's surface?", "gravity", ["magnetism", "friction"], "It brings precipitation down."],
      ["Water vapor turning into liquid droplets to form clouds is…", "condensation", ["evaporation", "melting"], "Cooling air can't hold as much vapor."],
      ["Water released from plant leaves into the air is…", "transpiration", ["precipitation", "infiltration"], "Plants release water vapor."],
      ["Convection in the atmosphere happens because…", "warm air rises and cool air sinks", ["cold air rises", "air never moves"], "It is driven by uneven heating."],
      ["Wind is caused by…", "differences in air pressure", ["the moon's shadow", "ocean salt"], "Air flows from high to low pressure."],
      ["The jet stream is…", "a fast, high-altitude band of wind", ["a warm ocean current", "a kind of cloud"], "It steers storms across the country.", true],
      ["In the United States, weather generally moves from…", "west to east", ["east to west", "north to south only"], "The prevailing westerlies carry it.", true],
      ["Global winds form because…", "the sun heats Earth unevenly and Earth rotates", ["the moon blows air", "mountains push the air"], "The equator gets the most heat.", true],
      ["The Coriolis effect causes winds to curve because of…", "Earth's rotation", ["the ocean's salt", "gravity from the moon"], "Winds curve right in the Northern Hemisphere.", true],
      ["Ground-level ozone is a problem because it…", "irritates lungs and worsens asthma", ["protects us from the sun", "cleans the air"], "It forms from pollution on hot days.", true],
      ["The Air Quality Index (AQI) helps people know when…", "the air is unhealthy to breathe outside", ["it will rain", "the tide is high"], "Higher numbers mean worse air.", true],
      ["Which human activity puts the most pollutants into the air in many cities?", "burning fuel in cars and power plants", ["planting trees", "recycling paper"], "Exhaust contains harmful gases.", true],
      ["Smoke from large wildfires can harm people…", "hundreds of miles away", ["only right next to the fire", "never"], "Winds carry smoke far.", true],
      ["A gas that traps heat in the atmosphere is…", "carbon dioxide", ["argon", "helium"], "It is a greenhouse gas.", true],
      ["Why is the air at the top of Mount Mitchell thinner than at the beach?", "there is less air above it pressing down", ["it has more oxygen", "the sun is closer"], "Pressure falls with height.", true],
      ["Clean air laws have reduced acid rain mainly by…", "cutting sulfur pollution from power plants", ["adding more smoke", "banning rain"], "Scrubbers clean smokestacks.", true],
      ["The temperature in the stratosphere rises with height because…", "ozone absorbs ultraviolet energy", ["it is closer to the ocean", "clouds trap heat there"], "That layer warms from the top.", true],
      ["Monitoring the atmosphere matters for health because…", "people can act early when pollution or smoke is high", ["it changes the weather", "it stops all storms"], "Data helps people protect themselves.", true],
    ],
  }),
];
