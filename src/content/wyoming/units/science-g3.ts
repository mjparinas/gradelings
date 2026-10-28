import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wyoming Grade 3 science: Wyoming's weather hazards (blizzards, strong wind, hail, lightning, floods, drought and
// wildfire) and the merits of designs that reduce their impacts (3-ESS3-1), weighed against criteria and constraints
// (3-5-ETS1-1), with the snow fences along Wyoming's highways as the classic example.

const HAZARDS: Q[] = [
  ["A storm with strong wind, blowing snow and very cold air is a…", "blizzard", ["heat wave", "drought", "tide"], "Blizzards make it hard to see."],
  ["Long fences built beside Wyoming highways catch blowing snow so it…", "piles up before reaching the road", ["melts faster", "turns into rain", "blows higher"], "These are called snow fences."],
  ["Why do snow fences help drivers in winter?", "less snow drifts across the road and drivers can see", ["they make the road warmer", "they stop all snow from falling", "they make cars faster"], "Blowing snow is a big danger."],
  ["When very strong winds are forecast, Wyoming sometimes closes roads to…", "light, tall trucks and trailers", ["bicycles only", "school buses only", "nobody"], "Wind can tip over light, tall trucks."],
  ["Balls of ice that fall from thunderstorms are called…", "hail", ["snowflakes", "fog", "dew"], "Hail can dent cars and hurt crops."],
  ["A farmer protects young plants from hail with…", "nets or covers", ["more water", "brighter lights", "paint"], "A cover stops the ice from hitting the plants."],
  ["During a thunderstorm, the safest place to be is…", "inside a building", ["under a tall tree", "on a hilltop", "in a lake"], "Lightning strikes tall things."],
  ["A lightning rod on a barn helps by…", "carrying lightning safely into the ground", ["making more lightning", "stopping rain", "keeping the barn warm"], "It gives lightning a safe path."],
  ["In spring, melting mountain snow can make rivers rise and…", "flood", ["freeze", "disappear", "turn salty"], "Lots of melting snow fills the rivers."],
  ["Building homes on higher ground away from a river reduces the risk of…", "flood damage", ["hail", "lightning", "wind"], "Floodwater spreads over low land."],
  ["A long time with very little rain or snow is a…", "drought", ["flood", "blizzard", "hurricane"], "Plants and animals need water."],
  ["Dams and reservoirs help Wyoming farms during a drought by…", "storing water for when it is needed", ["making it rain", "stopping the wind", "melting snow"], "Water saved in spring can be used in summer."],
  ["Dry grass, wind and lightning can start a…", "wildfire", ["flood", "blizzard", "rainbow"], "Fires spread fast in dry weather."],
  ["Clearing dry brush away from a house helps protect it from…", "wildfire", ["hail", "floods", "earthquakes"], "Fire needs fuel to spread."],
  ["Before a big winter storm, families can prepare by…", "packing blankets, water and snacks in the car", ["opening every window", "turning off the furnace", "going camping"], "Being ready keeps people safe."],
  ["Weather forecasters warn people about hazards so they can…", "get ready and stay safe", ["make the storm stop", "change the season", "make more snow"], "Warnings give people time."],
  ["A weather hazard is weather that can…", "harm people or property", ["only make rainbows", "never be seen", "only happen at night"], "Some weather is dangerous."],
  ["Wearing a warm hat, gloves and layers in very cold wind helps prevent…", "frostbite", ["sunburn", "hail", "floods"], "Cold wind can freeze skin."],
  ["In a design problem, the things a solution must do are called the…", "criteria", ["constraints", "hazards", "results"], "Criteria are the goals."],
  ["In a design problem, limits such as cost, time or materials are called…", "constraints", ["criteria", "forecasts", "habitats"], "Constraints limit what you can build."],
  ["A town wants to protect a road from drifting snow with little money. Which is the best plan?", "a snow fence beside the road", ["a heated road", "a tunnel through a mountain", "moving the town"], "Pick a solution that meets the goal within the limits."],
  ["Planting rows of trees beside a field can slow the…", "wind", ["sunlight", "rain", "lightning"], "Rows of trees are called windbreaks.", true],
  ["Two snow fences are tested. Fence A keeps the road clear 8 days out of 10, and Fence B keeps it clear 5 days out of 10. Which works better?", "Fence A", ["Fence B", "they are the same", "neither keeps it clear"], "Compare the results.", true],
  ["A hail-proof roof costs a lot more than a regular roof. What is a constraint here?", "the cost", ["the hail", "the color", "the weather report"], "Cost limits a design.", true],
  ["Why do people in Wyoming still drive in winter even though storms are a hazard?", "they plan, check forecasts and carry supplies to lower the risk", ["storms never happen", "cars can't slide", "snow is always soft"], "We can't stop the weather, but we can lower its impacts.", true],
  ["Which claim about a flood wall is supported by evidence?", "the town had less damage in floods after the wall was built", ["the wall stops all rain", "the wall makes the river smaller", "the wall makes the sun shine"], "A good claim uses evidence.", true],
  ["Why might a town build both a dam and a flood warning system?", "each lowers a different part of the risk", ["one is never enough paper", "dams cause floods", "warnings stop rain"], "Solutions can work together.", true],
  ["Wildfire smoke can be a health hazard because it…", "makes the air hard to breathe", ["makes it rain", "cools the ground", "stops the wind"], "Smoke carries tiny bits into the air.", true],
  ["Strong winds that blow over the plains can push dust and dirt into the air, making a…", "dust storm", ["rainbow", "snowman", "tide"], "Dry soil and wind together."],
  ["Tornadoes are spinning columns of air that touch the ground. In Wyoming they happen most often on the…", "eastern plains", ["highest peaks", "bottom of lakes", "inside caves"], "Flat land in spring and summer storms."],
  ["When a tornado warning sounds, the safest place is…", "a basement or an inside room with no windows", ["outside in a field", "in a car on a bridge", "next to a window"], "Get low and away from glass."],
  ["Snow that slides down a steep mountain slope all at once is an…", "avalanche", ["earthquake", "eclipse", "echo"], "Heavy snow on steep slopes can let go."],
  ["Highway crews near mountain passes sometimes set off small, planned snow slides so that…", "big avalanches don't hit cars later", ["more snow falls", "the mountain gets taller", "the road melts"], "Small planned slides remove the danger."],
  ["Salt and sand spread on icy roads help cars…", "grip the road and stop safely", ["go faster", "float", "stay warm"], "Ice is slippery."],
  ["A weather radio or phone alert helps families by…", "warning them before a storm arrives", ["stopping the storm", "making the storm bigger", "changing the season"], "Early warnings give time to get ready."],
  ["Hail nets over a garden are a good solution if they are strong enough and…", "cost less than the plants they protect", ["are bright pink", "make noise", "cover the sun all year"], "Weigh the cost against the benefit."],
  ["A rancher builds a shelter of boards and trees for cattle. It protects them from…", "cold wind and blowing snow", ["sunlight only", "rain falling upward", "earthquakes"], "Shelter blocks the wind."],
  ["Which is a constraint for a snow fence?", "it must not block the driver's view", ["it is painted", "it is made in summer", "it has a name"], "Constraints are limits a design must respect.", true],
  ["Why do towns keep snowplows ready before winter starts?", "so roads can be cleared quickly after storms", ["to make snow", "to plow fields", "to stop the wind"], "Preparing ahead lowers the impact.", true],
  ["Two roofs were tested with hail. The metal roof had no dents and the plastic roof cracked. What can you claim?", "the metal roof stands up to hail better", ["plastic is always better", "hail never hurts roofs", "both roofs failed"], "Use the test results as evidence.", true],
  ["Why do mountain towns build their houses with steep roofs?", "heavy snow slides off before it piles up", ["to catch more snow", "to look tall", "to stop the wind"], "Snow is heavy.", true],
  ["After a wildfire burns a hillside, why might a town worry about floods?", "bare ground can't soak up rain and soil washes down", ["fire makes more rain", "ash makes the river freeze", "trees grow back at once"], "One hazard can lead to another.", true],
];

export const SCIENCE_3: Unit[] = [
  bankUnit({
    id: "wy-g3-weather-hazards",
    title: "Wild Wyoming Weather",
    emoji: "🌨️",
    blurb: "Blizzards, wind, hail and keeping safe",
    parentNote: "Wyoming's weather hazards (blizzards, strong wind, hail, lightning, floods, drought and wildfire) and the designs that lower their impacts, such as snow fences, windbreaks, lightning rods, dams and flood walls, judged by how well each meets its goals within limits like cost.",
    standards: ["3-ESS3-1; 3-5-ETS1-1", "the merit of design solutions that reduce the impacts of weather-related hazards, and the criteria and constraints of a design problem"],
    items: HAZARDS,
  }),
];
