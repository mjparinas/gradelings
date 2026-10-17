import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 5 science units (`fl-` ids), for the benchmarks no shared unit practises: comparing the structures
// of plants and animals and how variation helps living things survive change (SC.5.L.14.2, 15.1), static charge
// (SC.5.P.10.3), the galaxy and the Solar System (SC.5.E.5.1 to 5.3), and the water cycle, weather, climate zones and
// a family preparedness plan for natural disasters (SC.5.E.7.1 to 7.7), with Florida's weather as the example.

const STRUCTURES_AND_SURVIVAL: Q[] = [
  ["Plants have roots. What do roots do?", "take in water and hold the plant in place", ["make seeds only", "make loud noises", "produce milk"], "Roots anchor and absorb."],
  ["What does the trunk of a tree do?", "supports the tree, like a skeleton supports an animal", ["pumps blood", "digests food", "catches fish"], "Plants and animals both need support."],
  ["Fish use gills to get oxygen. People use…", "lungs", ["gills", "roots", "leaves"], "Different structures do the same job."],
  ["A cactus stores water in its…", "stem", ["roots only", "flowers", "seeds"], "Its thick stem holds water."],
  ["Birds have hollow bones. This helps them…", "stay light enough to fly", ["swim deep", "dig tunnels", "grow roots"], "A light skeleton is useful for flight."],
  ["Leaves make food for a plant. In an animal, which organs break down food?", "the stomach and intestines", ["the lungs", "the skull", "the skin only"], "Different organs do different jobs."],
  ["The skin of an animal protects its body. What protects the inside of a tree?", "bark", ["flowers", "seeds", "pollen"], "Bark covers the trunk."],
  ["Which structure helps a duck swim?", "webbed feet", ["sharp claws", "a long tail only", "wings only"], "Webbing pushes water."],
  ["No two individuals in a group are exactly alike. This is called…", "variation", ["migration", "pollination", "erosion"], "Individuals differ."],
  ["If the environment changes, individuals with helpful traits are more likely to…", "survive and reproduce", ["disappear at once", "never have young", "become plants"], "Helpful traits give an advantage."],
  ["A drought comes. Plants with deeper roots find water and survive. The next generation will have…", "more plants with deep roots", ["no plants", "only shallow roots", "plants without leaves"], "Survivors pass on their traits."],
  ["When a habitat changes, some animals move to a new place. This helps them…", "find food and survive", ["avoid weather forever", "turn into plants", "stop growing"], "Moving can meet their needs."],
  ["A new disease spreads. A few animals resist it. What is likely?", "the resistant animals survive and have young", ["all animals get sick", "no animals have young", "the disease disappears"], "Resistance helps survival."],
  ["A cold snap harms many plants in a Florida garden. Which plant is most likely to survive?", "one that can handle cooler weather", ["one that needs tropical heat", "one with no roots", "one with no leaves"], "Tolerant plants survive."],
  ["Some mangrove seeds float for months before they sprout. This helps them…", "reach new shores when the old ones change", ["avoid water", "stay in one place", "stop growing"], "Floating seeds spread widely."],
  ["Differences between individuals that help them survive are…", "helpful variations", ["rules", "seasons", "storms"], "They give an advantage."],
  ["A skeleton gives support to many animals. Which gives similar support to a plant?", "a stem or trunk", ["a flower", "pollen", "a seed coat"], "Both hold the body up.", true],
  ["Which pair do the same kind of job?", "a bird's wing and an insect's wing", ["a root and a wing", "a leaf and a beak", "a bone and a seed"], "Both are used for flight.", true],
  ["Plants move water through tubes in their stems. Animals move blood through…", "a circulatory system", ["roots", "leaves", "seeds"], "Both transport materials.", true],
  ["Why might a bird with a stronger beak do better when hard seeds are the only food?", "it can crack the seeds and get food", ["it can fly higher", "it can sing louder", "it can swim"], "Helpful traits help survival.", true],
  ["Why does variation matter for a species when the climate changes?", "some individuals may have traits that let them survive", ["all individuals die", "all individuals are identical", "nothing ever changes"], "Variation gives options.", true],
  ["A beach mouse with lighter fur is harder for owls to see on pale sand. Over time, the beach mice are likely to…", "be mostly light coloured", ["be all dark", "turn into owls", "stop living on beaches"], "Hidden mice survive and have young.", true],
  ["How is a plant's leaf like a stomach?", "it helps the living thing get the energy it needs", ["it pumps blood", "it protects the brain", "it stores bones"], "Both are used to get or process food.", true],
  ["Why do some animals move away when drought dries their wetland?", "to find water and food elsewhere", ["to avoid the Moon", "to grow bigger", "to lose their tails"], "They respond to a changed environment.", true],
];

const STATIC_CHARGE: Q[] = [
  ["You rub a balloon on your hair and it sticks to a wall. The balloon has…", "an electric charge", ["lost its weight", "turned into metal", "become a magnet"], "Rubbing moves charge."],
  ["Two objects with the same kind of charge…", "push each other apart", ["pull together", "turn into metal", "stick forever"], "Like charges repel."],
  ["Two objects with opposite charges…", "pull toward each other", ["push apart", "melt", "disappear"], "Opposite charges attract."],
  ["A charged balloon can pick up…", "tiny bits of paper", ["a brick", "a bucket of water", "a bowling ball"], "A charged object attracts light, uncharged objects."],
  ["You rub a plastic comb on wool and hold it near paper bits. The bits…", "jump to the comb", ["fall away", "catch fire", "turn blue"], "The charged comb attracts them."],
  ["Static electricity is…", "electric charge that builds up on an object", ["flowing water", "a kind of magnet", "a strong wind"], "It stays in one place until it jumps."],
  ["A small shock from a metal doorknob is caused by…", "static charge jumping to your hand", ["a magnet", "gravity", "wind"], "Charge builds up as you move."],
  ["Lightning is…", "a huge spark of electric charge", ["a bright cloud", "a loud wind", "a sound wave"], "Charge jumps between clouds and ground."],
  ["Florida has many summer thunderstorms. Lightning happens when…", "electric charge builds up in clouds and jumps", ["the Sun gets hot", "rain freezes", "the wind blows"], "Cloud charge discharges."],
  ["Do charged objects have to touch to push or pull?", "No", ["Yes, always", "Only in water", "Only at night"], "Charged objects act at a distance."],
  ["Static cling in clothes from a dryer is caused by…", "charge that builds up as the clothes rub together", ["a magnet in the dryer", "gravity", "wind"], "Rubbing separates charge."],
  ["Rubbing two different materials together can…", "move charge from one to the other", ["make them heavier", "make them magnetic", "turn them into metal"], "That is how objects get charged."],
  ["Which is an example of static electricity?", "hair standing up after rubbing a balloon on it", ["a magnet on a refrigerator", "a ball rolling", "a candle burning"], "Charged hairs repel each other."],
  ["A charged ruler bends a thin stream of water toward it. Charged objects can attract…", "uncharged objects", ["only magnets", "nothing", "only metals"], "Water is pulled toward the charge."],
  ["Two charged objects that pull toward each other have…", "opposite charges", ["the same charge", "no charge", "a magnet inside"], "Opposite charges attract."],
  ["What does a charged comb do when you pull it away from the paper bits?", "the bits fall", ["the bits stay up forever", "the bits catch fire", "the bits turn into rocks"], "Without the pull, gravity wins."],
  ["Why do static shocks happen more in dry weather?", "dry air lets charge stay on objects", ["dry air makes metal wet", "dry air removes gravity", "dry air makes magnets"], "Moist air carries charge away.", true],
  ["A lightning rod protects a building by…", "carrying the charge safely to the ground", ["stopping all rain", "pulling in more clouds", "storing lightning"], "It gives lightning a safe path.", true],
  ["Which pair would repel each other?", "two objects with the same charge", ["a charged and an uncharged object", "a magnet and a wooden block", "two uncharged balloons"], "Like charges repel.", true],
  ["How can a charged balloon attract paper without touching it?", "charged objects exert a force at a distance", ["paper is a magnet", "gravity pulls the paper", "air glues the paper"], "The electric force works without contact.", true],
  ["Rubbing a balloon on your hair makes your hair stand up. Why?", "each hair has the same charge, so they repel", ["each hair is a magnet", "the balloon is heavy", "the hair is wet"], "Like charges push apart.", true],
  ["A person walks on carpet and then touches a metal doorknob. The spark shows that…", "charge built up on the person and jumped", ["metal makes electricity", "the carpet is metal", "gravity makes sparks"], "Static discharge.", true],
  ["Why is it important to stay out of open water during a lightning storm?", "lightning is a huge discharge that can travel through water", ["water makes thunder", "fish make sparks", "waves make rain"], "Lightning is dangerous.", true],
  ["Which statement is true about an electrically charged object?", "it can attract an uncharged object", ["it can only attract magnets", "it is always very hot", "it cannot touch anything"], "It attracts light, uncharged objects.", true],
];

const SOLAR_SYSTEM: Q[] = [
  ["Our home galaxy is the…", "Milky Way", ["Andromeda", "Solar System", "Big Dipper"], "Our Sun is one of its stars."],
  ["A galaxy is made of…", "gas, dust and many stars", ["only one star", "only planets", "only rocks"], "A galaxy holds billions of stars."],
  ["Which planet is closest to the Sun?", "Mercury", ["Earth", "Jupiter", "Saturn"], "Mercury is the innermost planet."],
  ["Earth is the…", "third planet from the Sun", ["first planet from the Sun", "fifth planet from the Sun", "eighth planet from the Sun"], "After Mercury and Venus."],
  ["Which is the largest planet?", "Jupiter", ["Mars", "Earth", "Mercury"], "Jupiter is a gas giant."],
  ["The inner planets are…", "small and rocky", ["huge and made of gas", "made of ice only", "all moons"], "Mercury, Venus, Earth and Mars."],
  ["Which is a gas giant?", "Saturn", ["Mars", "Venus", "Earth"], "Jupiter and Saturn are mostly gas."],
  ["A moon is…", "a natural object that orbits a planet", ["a star", "a comet", "a galaxy"], "Earth has one moon."],
  ["A comet is…", "a ball of ice and dust that grows a tail near the Sun", ["a small star", "a planet", "a moon"], "Its tail points away from the Sun."],
  ["Most asteroids are found between…", "Mars and Jupiter", ["Earth and the Moon", "Saturn and Uranus", "the Sun and Mercury"], "That region is the asteroid belt."],
  ["The Sun is…", "a star at the center of the Solar System", ["a planet", "a moon", "a comet"], "Everything orbits it."],
  ["Which planet is known for its bright rings?", "Saturn", ["Mars", "Venus", "Mercury"], "Its rings are easy to see."],
  ["Which planet is called the Red Planet?", "Mars", ["Venus", "Jupiter", "Neptune"], "Iron-rich dust makes it look red."],
  ["How many planets orbit the Sun?", "eight", ["three", "nine", "twelve"], "Mercury through Neptune."],
  ["All the planets orbit…", "the Sun", ["the Moon", "Earth", "Jupiter"], "The Sun holds them with gravity."],
  ["Which planet is hottest?", "Venus", ["Mercury", "Mars", "Neptune"], "Its thick air traps heat."],
  ["Which pair are outer planets?", "Uranus and Neptune", ["Mercury and Venus", "Earth and Mars", "the Sun and the Moon"], "They are far from the Sun.", true],
  ["Compared with outer planets, inner planets are…", "closer to the Sun and rocky", ["farther from the Sun and gassy", "all bigger", "all covered in ice"], "Inner planets are small and solid.", true],
  ["Why is Earth's place in the Solar System good for life?", "its distance from the Sun lets liquid water exist", ["it is closest to the Sun", "it is farthest from the Sun", "it has rings"], "Not too hot, not too cold.", true],
  ["Rovers launched from Florida have explored…", "Mars", ["the Sun", "Neptune's rings", "the Milky Way's centre"], "Mars rovers lifted off from Cape Canaveral.", true],
  ["A galaxy is much bigger than…", "the Solar System", ["the Milky Way", "the universe", "a billion galaxies"], "Our Solar System is one small part of it.", true],
  ["Which statement is true?", "The Milky Way holds billions of stars.", ["Earth is a star.", "The Moon is a planet.", "The Sun is a moon."], "The galaxy is huge.", true],
  ["Which objects orbit the Sun?", "planets, asteroids and comets", ["only moons", "only the Milky Way", "only stars"], "The Sun's gravity holds them.", true],
  ["Uranus and Neptune are…", "ice giants far from the Sun", ["rocky planets near the Sun", "moons of Jupiter", "stars"], "They are cold, distant worlds.", true],
  ["The Sun is one star in the…", "Milky Way galaxy", ["Solar System galaxy", "Moon galaxy", "Mars galaxy"], "Our home galaxy.", true],
];

const FLORIDA_WEATHER: Q[] = [
  ["What are the steps of the water cycle?", "evaporation, condensation, precipitation", ["freezing, melting, burning", "rolling, rising, sinking", "breaking, bending, popping"], "Water moves around Earth."],
  ["Most of Earth's water is in…", "the ocean", ["clouds", "rivers", "ice cubes"], "About 97 percent is ocean."],
  ["The ocean is part of the water cycle through…", "evaporation and precipitation", ["only erosion", "only wind", "only volcanoes"], "Ocean water evaporates and rain falls back."],
  ["Water vapor cooling into tiny droplets in clouds is…", "condensation", ["evaporation", "melting", "freezing"], "Gas becomes liquid."],
  ["Rain, snow, sleet and hail are all forms of…", "precipitation", ["evaporation", "condensation", "erosion"], "They fall from clouds."],
  ["Frozen raindrops that fall as small ice pellets are…", "sleet", ["hail", "fog", "dew"], "Sleet is small and mostly clear."],
  ["Large balls of ice that fall in strong thunderstorms are…", "hail", ["sleet", "snow", "dew"], "Hail grows in tall storm clouds."],
  ["Which tool measures air pressure?", "a barometer", ["a thermometer", "an anemometer", "a rain gauge"], "Pressure changes with weather."],
  ["Humidity is…", "the amount of water vapor in the air", ["how hot it is", "how fast the wind blows", "how much rain fell"], "Florida's air is often humid."],
  ["Which environment is usually the driest?", "a desert", ["a swamp", "a rainforest", "a coast"], "Deserts get very little rain."],
  ["A swamp, compared with a desert, usually has…", "higher humidity", ["less water in the air", "no plants", "snow all year"], "Wetlands put water in the air."],
  ["Wind speed is measured with…", "an anemometer", ["a barometer", "a thermometer", "a rain gauge"], "It spins in the wind."],
  ["Climate zones near the equator are generally…", "warm", ["very cold", "always icy", "always dry"], "Sunlight is strong there."],
  ["Air temperature usually gets colder as elevation…", "goes up", ["goes down", "stays the same", "disappears"], "Mountains are cooler."],
  ["Places near a large body of water often have…", "milder temperatures", ["extreme heat only", "no rain", "no wind"], "Water heats and cools slowly."],
  ["A family preparedness plan should include…", "an emergency kit and a place to meet", ["a new toy", "a pet snake", "a big party"], "Be ready before a storm."],
  ["Why make a hurricane plan before a storm?", "so the family can act safely and quickly", ["to stop the storm", "to make the storm stronger", "so the Sun comes out"], "Preparing helps safety.", true],
  ["A hurricane watch means…", "hurricane conditions are possible in the area", ["a hurricane is over", "the weather is sunny", "a tornado touched down"], "A watch comes before a warning.", true],
  ["A hurricane warning means…", "hurricane conditions are expected soon", ["a hurricane is impossible", "it is the dry season", "the storm is far away for weeks"], "Take action.", true],
  ["Why do hurricanes get stronger over warm ocean water?", "warm water gives them energy", ["cold water gives them energy", "the Moon feeds them", "land feeds them"], "Evaporating warm water fuels the storm.", true],
  ["Why do places near the equator get warmer than places near the poles?", "sunlight hits more directly", ["the Sun is bigger there", "the wind is hotter", "the ocean is empty"], "Direct sunlight is stronger.", true],
  ["A tropical climate, like south Florida's, has…", "warm temperatures and a lot of rain", ["freezing winters", "no rain", "snow all year"], "Latitude and nearby water shape climate.", true],
  ["Falling air pressure often means…", "stormy weather may be coming", ["a clear sunny day", "a flood has ended", "winter has started"], "Storms are low-pressure systems.", true],
  ["A cold front usually brings…", "cooler, drier air", ["hotter air", "no wind", "a hurricane"], "Cold air pushes in.", true],
  ["A family hurricane kit might include…", "water, food that keeps, a flashlight and batteries", ["only video games", "only ice cream", "only candles and matches"], "Power may go out.", true],
  ["Which factors do forecasters use to predict the weather?", "temperature, pressure, humidity, wind and precipitation", ["only the Moon", "only the stars", "only the clock"], "These measure the air.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g5-structures-and-survival",
    title: "Structures, Survival & Change",
    emoji: "🦎",
    blurb: "Compare how plants and animals work, and why variation helps.",
    parentNote:
      "Practices comparing the functions of organs and structures in plants and animals, and how differences between individuals let some survive and reproduce when the environment changes.",
    standards: ["SC.5.L.14.2; SC.5.L.15.1", "comparing the structures of plants and animals, and how variation helps living things survive changes"],
    items: STRUCTURES_AND_SURVIVAL,
  }),
  bankUnit({
    id: "fl-g5-static-charge",
    title: "Static Charge",
    emoji: "⚡",
    blurb: "Balloons, sparks and lightning: charges that push and pull.",
    parentNote:
      "Practices that an electrically charged object can attract an uncharged object, and can attract or repel another charged object without touching it, including static shocks and lightning.",
    standards: ["SC.5.P.10.3", "charged objects attracting and repelling without contact"],
    items: STATIC_CHARGE,
  }),
  bankUnit({
    id: "fl-g5-solar-system",
    title: "The Milky Way & Our Solar System",
    emoji: "🪐",
    blurb: "Galaxies, planets, moons, asteroids and comets.",
    parentNote:
      "Practices that a galaxy is made of gas, dust and stars with our home galaxy the Milky Way, how inner and outer planets compare, and how the Sun, planets, moons, asteroids and comets fit together.",
    standards: ["SC.5.E.5.1; SC.5.E.5.2; SC.5.E.5.3", "the Milky Way, inner and outer planets, and objects in the Solar System"],
    items: SOLAR_SYSTEM,
  }),
  bankUnit({
    id: "fl-g5-florida-weather",
    title: "Water Cycle, Weather & Climate",
    emoji: "🌀",
    blurb: "The water cycle, forecasts, climate zones and a hurricane plan.",
    parentNote:
      "Practices the water cycle and the ocean's part in it, the factors that make weather, forms of precipitation, climate zones, and a family preparedness plan for natural disasters, with Florida's weather and hurricanes as the examples.",
    standards: ["SC.5.E.7.1; SC.5.E.7.2; SC.5.E.7.3; SC.5.E.7.4; SC.5.E.7.5; SC.5.E.7.6; SC.5.E.7.7", "the water cycle, weather factors, precipitation, climate zones and a family disaster plan"],
    items: FLORIDA_WEATHER,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
