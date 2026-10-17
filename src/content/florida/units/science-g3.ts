import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 3 science units (`fl-` ids), for the benchmarks no shared unit practises: how Florida's plants
// and animals respond to changing seasons (SC.3.L.17.1), stars, the Sun, telescopes and gravity (SC.3.E.5.1, 5.3 to
// 5.5), and the Sun's heat and water's changes of state (SC.3.E.6.1, SC.3.P.9.1).

const SEASONS: Q[] = [
  ["Many birds from the north spend winter in Florida because…", "it is warm and they can find food", ["it is icy", "there is no water", "there are no trees"], "Mild winters keep food available."],
  ["Which is an example of animals responding to changing seasons?", "birds flying south for winter", ["a rock rolling", "a cloud forming", "a wave breaking"], "Animals respond to the season."],
  ["Some animals sleep through winter. This is called…", "hibernation", ["migration", "evaporation", "erosion"], "They save energy while food is scarce."],
  ["Most Florida animals do not hibernate because winters are…", "mild", ["very icy", "snowy for months", "dark all day"], "There is food all winter."],
  ["Many trees in the north drop their leaves in fall. Palm trees in Florida…", "stay green all year", ["drop all their leaves", "turn into pine trees", "freeze solid"], "Palms keep their fronds."],
  ["Which Florida tree keeps its leaves all year?", "a live oak", ["a bald cypress", "a sweetgum", "a red maple"], "Live oaks keep their leaves most of the year."],
  ["Manatees move to warm springs in winter because…", "cold water is dangerous for them", ["they like ice", "they need snow", "they stop swimming"], "They cannot stay warm in cold water."],
  ["Migration is when animals…", "travel to a new place for a season", ["sleep all year", "never move", "lose their legs"], "They move to find food or warmth."],
  ["Which animal migrates?", "a monarch butterfly", ["a live oak", "a sea sponge", "a mangrove tree"], "Monarchs fly south for the winter."],
  ["Sea turtles nest on Florida beaches in…", "spring and summer", ["only in winter", "only in a blizzard", "never"], "Nesting season is warm."],
  ["Florida's wet season runs from…", "May to October", ["November to April", "December to January only", "it has no wet season"], "Summer brings daily storms."],
  ["Florida's dry season runs from…", "November to April", ["May to October", "June to August", "it has no dry season"], "Winter and spring have less rain."],
  ["When Florida's dry season comes, many wetlands…", "shrink, and animals gather where water is left", ["freeze solid", "flood the whole state", "turn into deserts"], "Water holes become crowded."],
  ["Why do wildflowers bloom in spring?", "warm weather and longer days", ["snow", "frozen ground", "long nights"], "Plants respond to light and warmth."],
  ["Which change in the seasons signals some birds to fly south?", "shorter days and less food", ["longer days", "more food", "more insects"], "Animals respond to seasons."],
  ["Why do some animals store food or fat for winter?", "food is harder to find", ["they are bored", "food is everywhere", "they want to be heavy"], "Storing energy helps them survive."],
  ["Bald cypress trees in Florida's swamps drop their needles in…", "fall", ["spring", "summer", "never"], "Even in Florida, some trees drop leaves.", true],
  ["Why do trees in cold places drop leaves in fall?", "to save water and energy in winter", ["to grow taller", "to make fruit", "to attract the Sun"], "Leaves lose water.", true],
  ["Why are Florida's winters a good home for many northern birds?", "mild weather keeps food and water available", ["it is dark and icy", "there is no food", "it is a desert"], "Birds respond to the season by moving.", true],
  ["Alligators are less active when…", "the weather turns cold", ["it is hot and sunny", "it rains in summer", "the day is long"], "They are cold-blooded and slow down.", true],
  ["Which behavior helps an animal survive a cold winter?", "migrating to a warmer place", ["staying in the cold", "refusing to eat", "building ice"], "Moving to a warm place can help.", true],
  ["Many northern birds seen in Florida in January are gone by May. Where did they go?", "they flew north to nest", ["into the ocean", "under the ground", "they turned into fish"], "They migrate with the seasons.", true],
  ["Which is a response of plants to a dry season?", "growing more slowly or dropping leaves", ["growing faster", "making ice", "walking to water"], "Plants save water.", true],
  ["Animals in Florida's hot summers may stay cool by…", "resting in shade or water", ["standing in the Sun", "digging in snow", "climbing a mountain"], "They respond to the season.", true],
];

const STARS_AND_GRAVITY: Q[] = [
  ["Stars are different. Some are bigger, some smaller, and some look…", "brighter than others", ["made of rock", "like the Moon", "flat"], "Stars differ in size and brightness."],
  ["Which of these is a star?", "the Sun", ["the Moon", "Earth", "Mars"], "The Sun is our star."],
  ["Except for the Sun, stars look like points of light because they are…", "very far away", ["very small rocks", "very close", "made of paper"], "Distance makes them look tiny."],
  ["The Sun looks large and bright because it is…", "the closest star to Earth", ["the biggest planet", "made of fire only", "a moon"], "Closeness makes it look big."],
  ["Gravity is a force that pulls objects…", "toward Earth", ["away from Earth", "into the sky", "sideways only"], "Earth's gravity pulls things down."],
  ["A person jumps up and comes back down. What brings the person down?", "gravity", ["wind", "magnets", "shadows"], "Gravity pulls on everything."],
  ["A rocket leaves Earth by using…", "a force strong enough to overcome gravity", ["a magnet", "wind from the Moon", "a rainbow"], "Gravity can be overcome by a stronger force."],
  ["A bird can fly even though gravity pulls it down because…", "its wings push against the air", ["it has no weight", "it is made of light", "it is above gravity"], "Wings make lift."],
  ["What do telescopes help us see?", "far-away objects, such as stars", ["tiny germs", "sounds", "smells"], "A telescope gathers light from far away."],
  ["Through a telescope, you can see…", "many more stars than with your eyes alone", ["fewer stars", "no stars", "only the Sun"], "Telescopes collect more light."],
  ["How do we know there are far more stars than we can see at night?", "telescopes show many more", ["a book said so", "they are on a map", "the Moon told us"], "Observation with tools."],
  ["Which star is closest to Earth?", "the Sun", ["Polaris", "Sirius", "a star in another galaxy"], "The Sun is about 93 million miles away."],
  ["Stars come in different…", "sizes and colours", ["flavours", "languages", "shapes of rocks"], "Some are small and red, some big and blue."],
  ["The Sun gives out energy as…", "light and heat", ["only sound", "only wind", "only water"], "Sunlight warms Earth."],
  ["Which statement about the Sun is true?", "It is a star.", ["It is a planet.", "It is a moon.", "It is a comet."], "The Sun is a star."],
  ["A basketball player jumps for a shot. What force pulls the player down?", "gravity", ["magnetism", "friction only", "wind"], "Gravity pulls down."],
  ["Which makes a star look dimmer?", "being farther away", ["being closer", "being bigger and near", "being right beside Earth"], "Light spreads out with distance.", true],
  ["Why does the Sun look so much bigger than other stars?", "it is much closer to Earth", ["it is the biggest star", "it is made of gas", "it is a planet"], "Closeness changes how big it looks.", true],
  ["Is gravity a force that can be overcome?", "Yes, by a stronger force such as a rocket's thrust", ["No, never", "Only at night", "Only in water"], "Rockets and jumping both work against it.", true],
  ["Someone says all stars are the same. A telescope shows that…", "stars differ in size, colour and brightness", ["all stars are equal", "stars are all planets", "stars never shine"], "Observations tell us more.", true],
  ["Which would help you see fainter stars?", "a telescope", ["a ruler", "a thermometer", "a compass"], "More light helps.", true],
  ["Why do we need to use a telescope to study stars?", "stars are far away and look faint", ["stars are loud", "stars are cold", "stars are small rocks near us"], "Telescopes gather light.", true],
  ["You toss a ball into the air and it falls back. This shows gravity can…", "be overcome for a moment but keeps pulling", ["be turned off", "push things up", "act only at night"], "Gravity keeps working.", true],
  ["The Sun is a star that gives off light. How is it like other stars?", "it makes its own light", ["it reflects the Moon's light", "it is a rock", "it orbits Earth"], "Stars make their own light.", true],
];

const SUN_HEAT_WATER: Q[] = [
  ["Sunlight can…", "heat a dark sidewalk", ["make a sidewalk cold", "freeze a sidewalk", "turn a sidewalk to water"], "Radiant energy from the Sun warms objects."],
  ["Which feels warmer after standing in the Sun?", "a black shirt", ["a white shirt", "they feel the same", "neither gets warm"], "Dark colours absorb more sunlight."],
  ["At night, a sidewalk cools because…", "the Sun is not shining, so heat is lost", ["the Moon is hot", "stars warm it", "the wind makes it hot"], "Without the Sun, heat leaves."],
  ["Ice melting is a change from…", "solid to liquid", ["liquid to gas", "gas to liquid", "liquid to solid"], "Adding heat melts ice."],
  ["Water freezing is a change from…", "liquid to solid", ["solid to liquid", "gas to solid", "liquid to gas"], "Cooling makes ice."],
  ["Evaporation is when…", "liquid water changes into a gas", ["a gas becomes ice", "ice becomes a rock", "water becomes soil"], "Heat turns liquid into vapor."],
  ["Condensation is when…", "water vapor changes into liquid water", ["ice melts", "water freezes", "water boils"], "Cooling turns gas into liquid."],
  ["Which is a change of state?", "ice melting", ["a rock rolling", "a leaf falling", "a ball bouncing"], "Matter changes from one state to another."],
  ["Water freezes at…", "32 degrees Fahrenheit", ["72 degrees Fahrenheit", "212 degrees Fahrenheit", "100 degrees Fahrenheit"], "That is the freezing point."],
  ["Water boils at…", "212 degrees Fahrenheit", ["32 degrees Fahrenheit", "72 degrees Fahrenheit", "50 degrees Fahrenheit"], "That is the boiling point."],
  ["A puddle disappears on a sunny day because of…", "evaporation", ["freezing", "melting", "condensation"], "Heat turns the water into vapor."],
  ["Drops of water on the outside of a cold glass come from…", "water vapor in the air condensing", ["the glass leaking", "ice melting inside", "the glass sweating from inside"], "Cold glass cools the air next to it."],
  ["When the Sun sets, the air usually…", "cools down", ["gets hotter", "stays exactly the same", "turns to ice"], "Heat is lost without sunlight."],
  ["Which change takes in heat?", "melting", ["freezing", "condensing on a cold glass", "ice forming on a pond"], "Melting needs heat."],
  ["Which change gives off heat?", "freezing", ["melting", "boiling", "evaporating"], "Freezing takes heat away from the water."],
  ["Steam from a pot of boiling water is…", "water vapor, a gas", ["smoke", "ice", "sand"], "Boiling turns water into vapor."],
  ["Why does a parked car get hot with its windows closed?", "sunlight heats the inside and the heat stays in", ["the Moon heats it", "the tires make heat", "the engine is off"], "Radiant energy is trapped.", true],
  ["On a clear night, the ground cools down because…", "heat is lost when the Sun is gone", ["the Sun comes closer", "the stars are cold", "clouds are hot"], "Heat radiates away.", true],
  ["A sidewalk is very hot at noon and cooler at 9 p.m. Why?", "the Sun heated it, and then heat was lost", ["the Moon made it hot", "stars made it hot", "wind made it hot"], "Radiant energy heats objects.", true],
  ["Which is the best colour for a roof to stay cooler in the Florida Sun?", "white or a light colour", ["black", "dark brown", "dark blue"], "Light colours absorb less sunlight.", true],
  ["Water in a pot on a stove changes from liquid to gas. What does the water need?", "heat", ["cold", "darkness", "silence"], "Boiling needs heat.", true],
  ["Ice cubes left on a warm table become…", "liquid water", ["steam", "rocks", "sand"], "Heat melts ice.", true],
  ["The Sun heats a metal slide. What happens when the Sun goes behind a cloud?", "the slide cools as it loses heat", ["it gets hotter", "it freezes at once", "it turns to water"], "Less sunlight means less heating.", true],
  ["Which sequence shows water changing from liquid to gas?", "water, then water vapor", ["ice, then water", "water vapor, then ice", "ice, then steam, then rock"], "Evaporation or boiling.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g3-florida-seasons",
    title: "Seasons in Florida",
    emoji: "🍂",
    blurb: "How Florida's plants and animals respond to the seasons.",
    parentNote:
      "Practices how plants and animals respond to changing seasons, with Florida examples: migrating birds and monarchs, manatees moving to warm springs, evergreen live oaks and palms, bald cypress, and the wet and dry seasons.",
    standards: ["SC.3.L.17.1", "how animals and plants respond to changing seasons"],
    items: SEASONS,
  }),
  bankUnit({
    id: "fl-g3-stars-and-gravity",
    title: "Stars, the Sun & Gravity",
    emoji: "⭐",
    blurb: "Different stars, telescopes, and a force that can be overcome.",
    parentNote:
      "Practices that stars differ in size and brightness and all but the Sun look like points of light, that the Sun is the closest star, that telescopes show many more stars than eyes alone, and that gravity is a force that can be overcome.",
    standards: ["SC.3.E.5.1; SC.3.E.5.3; SC.3.E.5.4; SC.3.E.5.5", "kinds of stars, the Sun as the closest star, gravity as a force that can be overcome, and telescopes"],
    items: STARS_AND_GRAVITY,
  }),
  bankUnit({
    id: "fl-g3-sun-heat-water",
    title: "Sun, Heat & Water Changes",
    emoji: "🌡️",
    blurb: "How the Sun heats things, and how water changes state.",
    parentNote:
      "Practices radiant energy from the Sun heating objects (and heat being lost when the Sun is not present), and the changes water goes through when heated and cooled: melting, freezing, boiling, evaporation and condensation.",
    standards: ["SC.3.E.6.1; SC.3.P.9.1", "radiant energy from the Sun heating objects, and water changing state through heating and cooling"],
    items: SUN_HEAT_WATER,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
