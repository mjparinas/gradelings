import type { Unit } from "../../types";
import { SCIENCE_2 as WA_2 } from "../../washington/units/science-k2";
import { bankUnit } from "../own";
import { copyOf, from } from "./kit";

// Texas Grade 2 science units: food chains of producers and consumers (2.12(B)), the Sun, the Moon and weather records (2.9, 2.10(B)), and a Texas copy of Washington's
// fast and slow Earth changes, with its Mount St. Helens questions left out and Texas dunes, floods and hurricanes added
// (2.10(A), 2.10(C)).

export const SCIENCE_2: Unit[] = [
  bankUnit({
    id: "tx-g2-food-chains",
    title: "Producers & Consumers",
    emoji: "🦅",
    blurb: "Build food chains and see how animals depend on other living things.",
    parentNote:
      "Practices making food chains that start with a producer (a plant that makes its own food) and continue with consumers (animals that eat plants or other animals), and how animals depend on other living things for food.",
    standards: ["2.12(B)", "food chains of producers and consumers, and how animals depend on other living things"],
    items: [
      ["A living thing that makes its own food is a…", "producer", ["consumer", "predator", "rock"], "Plants make food from sunlight."],
      ["An animal that eats other living things is a…", "consumer", ["producer", "rock", "cloud"], "It consumes food."],
      ["Which is a producer?", "Grass", ["A rabbit", "A hawk", "A frog"], "It makes food from light."],
      ["Which is a consumer?", "A deer", ["An oak tree", "Clover", "Algae"], "It eats plants."],
      ["Every food chain starts with a…", "producer", ["consumer", "predator", "decomposer only"], "Plants come first."],
      ["Grass → grasshopper → ___", "lizard", ["grass", "acorn", "sunflower"], "Who eats grasshoppers?"],
      ["Acorns → squirrel → ___", "hawk", ["acorn", "oak tree", "clover"], "A hunter from the sky."],
      ["Clover → rabbit → ___", "coyote", ["clover", "grass", "a carrot"], "A Texas predator."],
      ["Algae → tadpole → ___", "fish", ["algae", "rock", "lily pad"], "A pond eater."],
      ["Nectar → hummingbird → ___", "hawk", ["flower", "nectar", "seed"], "Something bigger eats it."],
      ["In grass → mouse → snake, the mouse eats…", "grass", ["snakes", "rocks", "mice"], "Follow the arrow."],
      ["In grass → mouse → snake, the snake eats…", "the mouse", ["grass", "rocks", "the Sun"], "Arrows point to the eater."],
      ["Arrows in a food chain point to the animal that…", "eats", ["is eaten", "sleeps", "hides"], "Food goes to the eater."],
      ["Where do producers get the energy to make food?", "The Sun", ["The soil only", "Rocks", "Other animals"], "Sunlight."],
      ["Why do rabbits depend on plants?", "Plants are their food", ["Plants hunt them", "Plants are their parents", "Plants make rocks"], "Rabbits eat plants."],
      ["Why do hawks depend on plants, even though hawks eat meat?", "The animals hawks eat ate plants", ["Hawks eat leaves", "Hawks live in soil", "Plants hunt mice"], "Follow the chain back."],
      ["An animal that eats only plants is a…", "herbivore", ["carnivore", "producer", "rock"], "Plant eater."],
      ["An animal that eats only other animals is a…", "carnivore", ["herbivore", "producer", "plant"], "Meat eater."],
      ["An animal that eats both plants and animals is an…", "omnivore", ["herbivore", "producer", "carnivore"], "Raccoons and bears."],
      ["Which is a carnivore?", "A bobcat", ["A cow", "A deer", "A grasshopper"], "It hunts other animals."],
      ["If all the grass in a field died, the rabbits would…", "have less food", ["have more food", "turn into plants", "grow bigger"], "Grass is their food.", true],
      ["If foxes disappeared, the number of rabbits might…", "go up", ["go down", "stay exactly the same", "turn to zero"], "Fewer hunters.", true],
      ["Which food chain is in the right order?", "Seeds → mouse → owl", ["Owl → mouse → seeds", "Mouse → seeds → owl", "Owl → seeds → mouse"], "Start with the producer.", true],
      ["A raccoon eats berries and crayfish. It is an…", "omnivore", ["herbivore", "carnivore", "producer"], "Both plants and animals.", true],
      ["In a food chain, which living thing gets its energy from the Sun directly?", "The producer", ["The top predator", "The herbivore", "The carnivore"], "Plants use sunlight.", true],
    ],
  }),
  copyOf(
    from(WA_2, "wa-g2-earth-changes"),
    {
      id: "tx-g2-earth-changes",
      title: "Wind, Water & Wild Weather",
      emoji: "🌪️",
      blurb: "Wind and water move sand and soil; some storms are more likely in some places.",
      parentNote:
        "Practices how wind and water move soil and rock (sand dunes, washed-out hills), fast and slow changes to the land, and severe weather such as hurricanes, tornadoes and floods, including which are more likely in different parts of Texas.",
      standards: [
        "2.10(A); 2.10(C)",
        "wind and water moving soil and rock, and severe weather that is more likely in some places",
      ],
    },
    [
      ["Wind blows sand on a beach into hills called…", "dunes", ["caves", "canyons", "lakes"], "Padre Island has many."],
      ["Which storm forms over warm ocean water and hits the Gulf Coast?", "A hurricane", ["A blizzard", "A dust devil", "An ice storm"], "It has a calm eye in the middle."],
      ["Which severe weather is a spinning column of air that touches the ground?", "A tornado", ["A hurricane", "A flood", "Hail"], "Funnel cloud."],
      ["Heavy rain makes a creek spill over its banks. This is a…", "flood", ["drought", "dune", "rainbow"], "Too much water at once."],
      ["Hurricanes are most likely in Texas towns that are…", "near the coast", ["far from any water", "in the desert mountains", "in caves"], "They come in from the ocean.", true],
      ["Muddy water flowing in a river after rain is carrying…", "soil", ["sunlight", "wind", "clouds"], "Mud is wet soil."],
    ],
  ),
  bankUnit({
    id: "tx-g2-sky-weather",
    title: "Sun, Moon & Weather Records",
    emoji: "🌡️",
    blurb: "The Sun is a star, the Moon reflects light, and we measure weather.",
    parentNote:
      "Practices that the Sun is a star giving light and heat, that the Moon shines with reflected sunlight, how telescopes and binoculars show more of the sky, and measuring and graphing temperature and rainfall.",
    standards: [
      "2.9(A); 2.9(B); 2.10(B)",
      "the Sun as a star, moonlight as reflected sunlight, tools for viewing the sky, and measuring weather",
    ],
    items: [
      ["The Sun is a…", "star", ["planet", "moon", "cloud"], "It makes its own light."],
      ["What two things does the Sun give Earth?", "Light and heat", ["Rain and snow", "Wind and sand", "Rocks and soil"], "Think of a sunny day."],
      ["Why does the Moon shine at night?", "It reflects light from the Sun", ["It is on fire", "It makes its own light", "It has light bulbs"], "Like a mirror."],
      ["Does the Moon make its own light?", "No, it reflects sunlight", ["Yes, like a lamp", "Yes, like the Sun", "Only when it is full"], "Moonlight is sunlight bouncing off."],
      ["Why does the Sun look bigger than other stars?", "It is much closer to Earth", ["It is the only star", "Other stars are tiny dots", "It is a planet"], "Distance changes how big things look."],
      ["Which tool helps you see the Moon's craters?", "A telescope", ["A thermometer", "A rain gauge", "A ruler"], "It makes far things look close."],
      ["Through a telescope, the Moon looks…", "bigger, with more detail", ["smaller", "the same", "invisible"], "Telescopes magnify."],
      ["Binoculars help you see birds and stars that are…", "far away", ["inside your hand", "underground", "under water"], "They make far things look closer."],
      ["Which tool measures temperature?", "A thermometer", ["A rain gauge", "A wind vane", "A telescope"], "It shows how hot or cold."],
      ["Which tool measures how much rain fell?", "A rain gauge", ["A thermometer", "A magnifier", "A balance"], "It collects rain."],
      ["A thermometer reads 95 °F. The day is…", "hot", ["freezing", "snowy", "icy"], "95 °F is very warm."],
      ["A thermometer reads 30 °F. Water outside may…", "freeze", ["boil", "evaporate fast", "turn to sand"], "Water freezes at 32 °F."],
      ["Monday had 1 inch of rain. Tuesday had 3 inches. Which day was wetter?", "Tuesday", ["Monday", "They were the same", "Neither"], "3 is more than 1."],
      ["A bar graph shows rain for 5 days. The tallest bar shows the day with…", "the most rain", ["the least rain", "no rain", "the most sun"], "Tall bar, big number."],
      ["Why do we record weather every day?", "To find patterns", ["To change the weather", "To stop rain", "To move clouds"], "Records help us compare."],
      ["Rain, snow, sleet and hail are all kinds of…", "precipitation", ["wind", "temperature", "sunlight"], "Water falling from clouds."],
      ["The temperature went from 60 °F in the morning to 80 °F in the afternoon. It got…", "warmer", ["colder", "wetter", "darker"], "The number went up."],
      ["Which do we see in the night sky?", "Stars and the Moon", ["Only the Sun", "Only clouds", "Rainbows"], "Look up after dark."],
      ["The Sun is the closest star to…", "Earth", ["the Moon only", "Mars only", "no planet"], "It is our star."],
      ["Never look straight at the Sun, even with…", "binoculars or a telescope", ["a hat", "a jacket", "sunscreen"], "It can hurt your eyes."],
      ["A weather chart shows 4 sunny days and 2 rainy days. How many more sunny days?", "2", ["4", "6", "1"], "4 − 2.", true],
      ["Which shows how rain changed over a month?", "A graph of daily rain", ["A picture of one cloud", "A map of roads", "A list of names"], "Graphs show change.", true],
      ["Some stars look dim because they are…", "very far away", ["very close", "planets", "made of ice"], "Farther looks fainter.", true],
      ["Why can we see the Moon in the daytime sometimes?", "Sunlight bounces off it", ["It makes light", "It is a star", "It is a cloud"], "It reflects sunlight.", true],
      ["Which unit measures rainfall?", "Inches", ["Degrees", "Pounds", "Hours"], "A ruler unit.", true],
    ],
  }),
];
