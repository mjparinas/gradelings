import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { UNITS as NEW_YORK_2 } from "../../new-york/units/science-g2";

// Pennsylvania's own Grade 2 science units (`pa-` ids), for the STEELS standards no shared unit practises: how people use
// resources and how technology has changed the way we live (3.4.K-2.A, D; 3.5.K-2.D, E, Y), how everyday things work as
// systems of parts and how engineers compare designs (3.5.K-2.F, I, J, N, Z, CC), and the habitats and waterways of
// Pennsylvania (3.4.K-2.C, D; 3.1.2.C).

const RESOURCES_AND_PEOPLE: Q[] = [
  ["Pennsylvania has coal under the ground. Getting coal out of the ground is…", "mining", ["farming", "fishing", "weaving"], "Miners dig coal."],
  ["Which of these is a way people use a natural resource?", "cutting trees to make lumber", ["wishing for rain", "painting the sky", "counting stars"], "Lumber comes from forests."],
  ["Which resource can people use again and again without running out?", "sunlight", ["coal", "oil", "natural gas"], "The Sun keeps shining."],
  ["Coal, oil and natural gas are fuels. They are found…", "in the ground", ["in the clouds", "in the air only", "on the Moon"], "They are dug or pumped from the Earth."],
  ["Which choice reuses something?", "turning a box into a toy house", ["throwing the box in a river", "crushing the box and dropping it", "hiding the box"], "Find a new use for it."],
  ["Which of these can usually be recycled?", "cans, paper and glass jars", ["dirty food scraps", "used tissues", "broken toys with batteries"], "Clean materials can be recycled."],
  ["What happens to recycled paper?", "it can be made into new paper", ["it grows into trees", "it turns into water", "it flies away"], "Recycling gives materials a new life."],
  ["A school wants to waste less. Which is a good idea?", "have a bin for recycling", ["use more paper", "throw everything in one bin", "leave lights on"], "Sort materials so they can be used again."],
  ["Wind turbines help people by…", "making electricity from moving air", ["blowing the clouds away", "making rain", "stopping the wind"], "Wind spins the blades."],
  ["Long ago, people washed clothes by hand. Today many families use…", "washing machines", ["feather dusters", "snowplows", "typewriters"], "Technology changes how people work."],
  ["Long ago, people sent letters by horse. Today many people also use…", "email and phones", ["smoke only", "stone tablets", "hand shadows"], "Technology changes how we talk."],
  ["Cars help people travel far. A harmful effect of many cars can be…", "dirty air", ["quiet roads", "cleaner rivers", "more trees"], "Technology can help and harm."],
  ["Which is a helpful effect of a refrigerator?", "food stays fresh longer", ["food turns into toys", "food gets lost", "food becomes loud"], "Cold slows spoiling."],
  ["Plastic bags are useful, but they can harm animals if…", "they end up outside as litter", ["they are used again", "they are recycled", "they hold groceries"], "Litter can hurt wildlife."],
  ["A town in Pennsylvania makes a plan to keep its stream clean. What could kids look for?", "litter along the bank", ["the color of the Moon", "how tall the school is", "what time it is"], "Look and record what you see.", true],
  ["Why are forests important to people?", "they give wood, clean air and homes for animals", ["they stop all weather", "they make rocks", "they have no use"], "Forests help in many ways.", true],
  ["How do people in your community get clean drinking water?", "water is cleaned and sent through pipes", ["it falls into a bucket from the Moon", "they dig up ice cubes", "it is made in a toy factory"], "Water systems move and clean water.", true],
  ["Which technology has both helpful and harmful effects?", "a car: it moves people but can make dirty air", ["a rock lying on the ground", "a cloud in the sky", "the light of the Moon"], "Most technology has both effects.", true],
  ["Which action saves the most trash from going to a landfill?", "choosing things you can use again", ["buying many one-time things", "throwing away working toys", "using a new bag each day"], "Reuse makes less trash.", true],
  ["Farmers in Pennsylvania grow corn and raise cows. Both are…", "ways people use resources to make food", ["kinds of weather", "kinds of mountains", "kinds of rivers"], "Farms turn land and water into food.", true],
  ["A class collects data on lunch trash for a week. They are…", "investigating a problem in their school", ["playing a game", "painting a mural", "going on a trip"], "Collect data to see the problem.", true],
  ["Which would help a school use less energy?", "turning off lights when a room is empty", ["opening all the windows in winter", "leaving computers on all night", "adding more lights"], "Saving energy saves resources.", true],
  ["Which one is a renewable resource, because it can be replaced?", "trees that are replanted", ["coal", "oil", "a rock"], "New trees can grow.", true],
  ["Which one is hard to replace once it is used?", "coal", ["sunlight", "wind", "replanted trees"], "Coal took a very long time to form.", true],
  ["Why do people recycle aluminum cans?", "the metal can be melted and made into new things", ["cans taste good", "cans grow into trees", "cans make rain"], "Metal can be remade.", true],
];

const HOW_THINGS_WORK: Q[] = [
  ["A bicycle has pedals, a chain, wheels and a frame. These are its…", "parts", ["stories", "seasons", "songs"], "A system has parts."],
  ["A flashlight needs a battery, a bulb and a switch. If the battery is missing, the flashlight…", "will not light", ["will light brighter", "will sing", "will fly"], "Every part is needed."],
  ["The parts of a system work together to…", "reach a goal", ["make a mess", "stop the system", "hide the parts"], "A system has a purpose."],
  ["A toaster is a system. Its goal is to…", "toast bread", ["wash dishes", "play music", "tell time"], "It heats bread."],
  ["A wagon wheel and axle work together to…", "help the wagon roll", ["make the wagon sing", "keep the wagon still", "turn the wagon blue"], "Wheels roll on axles."],
  ["Which is a system with parts that work together?", "a bicycle", ["a single stone", "a drop of water", "a leaf on the ground"], "A bicycle has many parts."],
  ["To find out how a toy works, you can…", "look closely at its parts", ["throw it away", "paint it green", "hide it"], "Observe the parts and what they do."],
  ["A seesaw is a simple machine. It helps lift…", "a person on the other end", ["a cloud", "a river", "the Moon"], "Pushing down on one end lifts the other."],
  ["A ramp makes it easier to…", "move a heavy box up", ["see in the dark", "keep food cold", "hear far away"], "A ramp is a simple machine."],
  ["A lever is a stick that turns on a point. Which uses a lever?", "a seesaw", ["a rubber ball", "a sponge", "a rain cloud"], "Levers pivot."],
  ["Two students design toy boats. One boat floats better. This shows…", "designs can be different and work differently", ["all designs are the same", "boats cannot float", "only one design is allowed"], "Compare designs by testing."],
  ["Which question helps compare two paper cups for holding hot drinks?", "Which one keeps the drink warm longer?", ["Which one is Monday?", "Which one sings?", "Which one is older than the Moon?"], "Compare how well each does the job."],
  ["An engineer is a person who…", "designs things to solve problems", ["only reads stories", "only counts birds", "only sings"], "Engineers design solutions."],
  ["A scientist asks questions about nature. An engineer…", "designs things that meet a need", ["only tests food", "only draws maps", "only studies stars"], "Scientists ask; engineers build."],
  ["A technician helps keep machines working. A technician might…", "fix a broken machine", ["write a poem", "grow apples", "sail a ship"], "Technicians repair and care for machines."],
  ["Your school has a heating system and a lighting system. These are technologies in the…", "school and community", ["sky only", "ocean only", "desert only"], "Technology is all around us."],
  ["A new idea for a tool can start when someone notices…", "a problem to fix", ["a nap", "a cloud", "a pebble"], "Need leads to design."],
  ["A kid wants a better way to carry a lunch. What can they do first?", "draw ideas and talk about them", ["buy a new house", "stop eating", "paint a car"], "Plan before you build.", true],
  ["Which is an example of a team working together on a design?", "students sharing ideas to build a tower", ["one student taking all the blocks", "students not speaking", "students leaving"], "Good teams share.", true],
  ["If one part of a system is missing, the system may…", "not work as planned", ["work faster", "make music", "turn invisible"], "All parts matter.", true],
  ["Which pair shows a tool and the job it does?", "scissors, cutting", ["a rock, flying", "a cloud, sweeping", "a spoon, hammering"], "Match tools to jobs.", true],
  ["Which tool would best help you hammer a nail?", "a hammer", ["a feather", "a spoon", "a rope"], "A hammer is for nails.", true],
  ["Why might a designer test two different handles for a mug?", "to see which feels better to hold", ["to waste time", "to hide the mug", "to make the mug disappear"], "Testing finds the better design.", true],
  ["Which of these systems is found in a home?", "a plumbing system that carries water", ["a mountain range", "a thunderstorm", "a coral reef"], "Pipes are a system.", true],
  ["No design is perfect. A designer should…", "keep testing and improve it", ["never change it", "never try it", "never think about it"], "Designs can get better.", true],
];

const HABITATS_AND_WATER: Q[] = [
  ["A habitat is…", "the place where a plant or animal lives", ["a kind of cloud", "a kind of food", "a kind of tool"], "A home for living things."],
  ["Which animal lives in a stream habitat in Pennsylvania?", "a brook trout", ["a camel", "a polar bear", "a penguin"], "Brook trout live in cool, clean streams."],
  ["A forest habitat has…", "trees, shade and many animals", ["only sand", "only ice", "only waves"], "Forests are full of life."],
  ["A pond habitat has…", "still water with frogs, fish and plants", ["tall dry mountains", "a deep desert", "fast waterfalls only"], "A pond is still water."],
  ["A meadow is an open place with…", "grasses and wildflowers", ["tall trees only", "ice", "salt water"], "A meadow is a grassy field."],
  ["Which habitat has more different plants and animals?", "a forest with many kinds of trees", ["a parking lot", "a bare roof", "a plain sidewalk"], "Different habitats hold different life."],
  ["Deer live in the woods and fields. Fish live in…", "water", ["trees", "caves of ice", "clouds"], "Fish need water."],
  ["Rain falls on a hill. The water flows…", "downhill toward a stream", ["up into the sky", "into a tree stump only", "straight sideways"], "Water flows downhill."],
  ["Small streams flow into bigger…", "rivers", ["mountains", "meadows", "deserts"], "Streams join to make rivers."],
  ["The Susquehanna River flows through Pennsylvania toward…", "Chesapeake Bay", ["the Rocky Mountains", "the Sahara", "the North Pole"], "It flows south into a bay."],
  ["The Allegheny and Monongahela Rivers meet at Pittsburgh to make the…", "Ohio River", ["Delaware River", "Hudson River", "Amazon River"], "Two rivers join in Pittsburgh."],
  ["Lake Erie is a very large lake. It is on…", "Pennsylvania's northwest edge", ["the Moon", "the equator", "top of a mountain"], "Erie is in the northwest."],
  ["A map can show where there are…", "mountains, rivers and lakes", ["only smells", "only sounds", "only tastes"], "Maps show land and water."],
  ["A model of a hill and a stream can be made with…", "clay and a tray", ["fire", "wind only", "a cloud"], "Models show land and water shapes."],
  ["A mountain is a landform. A river is a…", "body of water", ["landform", "kind of rock", "kind of tree"], "Rivers are water."],
  ["The Pocono Mountains and the Allegheny Mountains are in Pennsylvania. They are…", "landforms", ["rivers", "lakes", "seasons"], "Mountains are landforms."],
  ["Hellbenders, a kind of big salamander, need clean, fast, rocky streams. If a stream gets muddy, the hellbenders…", "may not survive there", ["will love it more", "will turn into fish", "will fly away"], "Habitats must meet needs.", true],
  ["A forest has more shade than a meadow. A plant that likes shade would grow best in…", "the forest", ["the middle of a sunny meadow", "the road", "the roof"], "Match plants to places.", true],
  ["Why might a stream be a good place to find insects and fish?", "the water and plants give them food and shelter", ["streams have no life", "fish hate water", "insects live only on the Moon"], "Habitats supply needs.", true],
  ["Which is a way to keep a stream habitat healthy?", "keep litter out of it", ["pour paint in it", "dump trash in it", "cut its banks bare"], "Clean water helps habitats.", true],
  ["Which pair of habitats is the most different?", "a pond and a dry hill", ["two ponds", "two streams", "two puddles"], "One is wet; one is dry.", true],
  ["A class wants to compare life in a forest and a meadow. What could they do?", "count and record what they see in each place", ["only guess", "only draw the Moon", "only read a joke"], "Observe and compare.", true],
  ["If water cannot soak in because of pavement, where does it go?", "it runs off into storm drains and streams", ["it vanishes", "it climbs a hill", "it freezes forever"], "Runoff flows downhill.", true],
  ["Why are wetlands, like marshes, important?", "they are homes for many living things and soak up water", ["they have no life", "they are dry deserts", "they are made of ice"], "Wetlands are full of life.", true],
  ["Which is a physical feature of a place?", "a valley", ["a holiday", "a recipe", "a game"], "Valleys are landforms.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g2-resources-and-people",
    title: "People & Our Resources",
    emoji: "🌎",
    blurb: "How people use resources and how technology changes how we live.",
    parentNote:
      "Practices how people harvest and use natural resources (mining, farming, forests, wind and sun), reducing, reusing and recycling, the helpful and harmful effects of technology, and how technology has changed the way people live and work.",
    standards: ["3.4.K-2.A; 3.4.K-2.D; 3.5.K-2.D; 3.5.K-2.E; 3.5.K-2.Y", "how people harvest and use natural resources, investigating a local issue, reducing, reusing and recycling, the helpful and harmful effects of technology, and how technology has changed how people live and work"],
    items: RESOURCES_AND_PEOPLE,
  }),
  bankUnit({
    id: "pa-g2-how-things-work",
    title: "How Things Work",
    emoji: "⚙️",
    blurb: "Parts that work together, simple machines and who designs them.",
    parentNote:
      "Practices how everyday things work as systems of parts, simple machines such as levers and ramps, comparing two designs by testing, and the roles of engineers, scientists and technicians.",
    standards: ["3.5.K-2.N; 3.5.K-2.Z; 3.5.K-2.I; 3.5.K-2.J; 3.5.K-2.F; 3.5.K-2.CC", "how things work, systems with parts that work together, comparing simple technologies, designing new technologies, technology in the home and community, and the roles of scientists and engineers"],
    items: HOW_THINGS_WORK,
  }),
  bankUnit({
    id: "pa-g2-habitats-and-water",
    title: "Habitats & Waterways",
    emoji: "🏞️",
    blurb: "Forests, ponds and streams, and where Pennsylvania's rivers flow.",
    parentNote:
      "Practices comparing habitats (forest, pond, stream, meadow), how water flows downhill into streams and rivers, Pennsylvania's rivers and Lake Erie, and ways to keep a local stream healthy.",
    standards: ["3.1.2.C; 3.4.K-2.C; 3.4.K-2.D", "comparing the variety of life in different habitats, how places differ in their physical characteristics, and investigating an issue in the local environment"],
    items: HABITATS_AND_WATER,
  }),
  copyOf(
    from(NEW_YORK_2, "ny-g2-land-water"),
    {
      id: "pa-g2-land-water",
      title: "Land & Water Around Us",
      emoji: "🏞️",
      blurb: "Mountains, valleys, rivers and lakes, and where water is found.",
      parentNote:
        "Practices the shapes and kinds of land (mountains, valleys, hills) and bodies of water (rivers, lakes, ponds, oceans) in an area, with Pennsylvania examples such as the Allegheny Mountains, the Susquehanna and Delaware Rivers and Lake Erie, and where water is found on Earth.",
      standards: ["3.3.2.C; 3.3.2.D", "modeling the shapes and kinds of land and bodies of water in an area, and where water is found"],
    },
    [
      ["Which is a body of water in Pennsylvania?", "Lake Erie", ["a desert", "a volcano", "a canyon wall"], "Lake Erie is in the northwest corner."],
      ["The Delaware River is on Pennsylvania's…", "eastern border", ["highest mountain", "largest desert", "tallest hill"], "It flows along the east side of the state."],
      ["Two rivers meet in Pittsburgh to make the Ohio River. A river is…", "water that flows in a long channel", ["still water in a bowl", "tall land", "dry sand"], "Rivers move."],
      ["The Allegheny Mountains are…", "high land with rounded tops", ["flat water", "a river", "an ocean"], "Mountains are high land."],
      ["A valley is…", "low land between hills or mountains", ["high land with snow", "a flat sea", "a kind of river"], "Valleys lie between higher land."],
      ["On a map, water is usually colored…", "blue", ["red", "brown", "yellow"], "Blue shows water."],
      ["The Susquehanna is a long…", "river", ["mountain", "island", "desert"], "It runs through central Pennsylvania."],
      ["Which landform is the highest?", "a mountain", ["a valley", "a pond", "a plain"], "Mountains rise above the land around them."],
    ],
  ),
  copyOf(
    from(NEW_YORK_2, "ny-g2-earth-changes"),
    {
      id: "pa-g2-earth-changes",
      title: "Fast & Slow Earth Changes",
      emoji: "🌧️",
      blurb: "Some changes to the land are fast, some are slow, and people can slow them down.",
      parentNote:
        "Practices that Earth events can happen quickly (floods, landslides) or slowly (rivers carving valleys, mountains wearing down), and ways to stop wind and water from changing land, with Pennsylvania creeks, hills and farms as examples.",
      standards: ["3.3.2.A; 3.3.2.B", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"],
    },
    [
      ["A flood after heavy rain changes a creek bank…", "quickly", ["very slowly", "never", "over millions of years"], "Floods change land fast."],
      ["A river carving a valley is a change that happens…", "slowly", ["in one minute", "right away", "never"], "It takes a very long time."],
      ["Which is a fast change to land?", "a landslide after a storm", ["a river carving a valley", "a mountain wearing down", "soil forming"], "Landslides happen in moments."],
      ["Which is a slow change to land?", "wind and water wearing down a mountain", ["a landslide", "a flash flood", "a rock falling"], "Wearing down takes a very long time."],
      ["Planting grass on a bare hill helps stop…", "rain from washing the soil away", ["the Sun from shining", "rain from falling", "the hill from existing"], "Roots hold soil."],
      ["A farmer plants a row of trees at the edge of a field to…", "slow the wind and hold the soil", ["make wind stronger", "remove soil", "stop crops growing"], "Trees block wind."],
      ["A wall of rocks along a creek bank helps…", "keep the bank from washing away", ["stop the water flowing", "keep fish out", "keep the Sun out"], "Rocks hold the bank."],
      ["After a storm, a creek carries muddy water. The water is moving…", "soil from one place to another", ["rocks to the Moon", "the Sun", "clouds"], "Water carries soil away."],
    ],
  ),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
