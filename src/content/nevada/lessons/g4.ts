import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nevada's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nevada examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nv-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning systems, strong buildings and safe plans help during storms, floods and earthquakes.",
    ],
    "The ground starts shaking at school. What helps keep people safe?",
    [
      "Stay inside and away from windows.",
      "Get under a sturdy desk and hold on.",
    ],
    "drop, cover and hold on",
  ),
  "science/nv-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight. Geothermal plants use heat from inside Earth.",
      "Dams make electricity from moving water but can block fish like salmon.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/nv-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/nv-g4-nevada-land": lesson(
    [
      "Most of Nevada is in the Great Basin, where rivers don't reach the ocean.",
      "Mountain ranges and flat valleys take turns across the state. The south is part of the Mojave Desert.",
      "Most Nevadans live around Las Vegas and Reno, where there is water and work.",
      "People change the land with dams, mines, farms and growing cities.",
    ],
    "Why do few people live in much of rural Nevada?",
    [
      "Think about water and jobs.",
      "Much of the state is dry and far from cities.",
    ],
    "it is dry and far from cities",
  ),
  "social/nv-g4-first-peoples": lesson(
    [
      "The Northern Paiute, Southern Paiute, Western Shoshone and Washoe have lived in Nevada for thousands of years.",
      "Families moved with the seasons to gather pine nuts and seeds, fish and hunt, and made baskets to carry and store food.",
      "Sarah Winnemucca, a Northern Paiute leader, wrote and spoke for her people's rights.",
      "Today more than 20 Tribal governments run their own schools, services and businesses.",
    ],
    "Which lake is at the centre of the Washoe homeland?",
    [
      "The name of the lake comes from a Washo word for lake.",
      "It is high in the mountains on Nevada's western edge.",
    ],
    "Lake Tahoe",
  ),
  "social/nv-g4-silver-state": lesson(
    [
      "In 1859 miners found the Comstock Lode, a huge silver deposit near Virginia City.",
      "Nevada became a territory in 1861 and the 36th state on October 31, 1864, during the Civil War.",
      "President Lincoln wanted Nevada's votes to pass the 13th Amendment, which ended slavery.",
      "That is why the flag says Battle Born. The motto is All for Our Country.",
    ],
    "Why is Nevada called Battle Born?",
    [
      "Look at the year it became a state.",
      "In 1864 the Civil War was being fought.",
    ],
    "it became a state during the Civil War",
  ),
  "social/nv-g4-modern-nevada": lesson(
    [
      "Railroads built towns like Reno, Elko and Las Vegas, which began in 1905.",
      "Hoover Dam, finished in 1936, brought water and electricity and made Lake Mead.",
      "Today tourism is Nevada's biggest industry, and Nevada mines more gold than any other state.",
      "Nevada's economy is tied to the nation's: when people travel less, Nevada loses jobs.",
    ],
    "Which industry gives the most jobs in Nevada today?",
    [
      "Millions of visitors come to Nevada every year.",
      "They stay in hotels and see shows.",
    ],
    "tourism",
  ),
  "social/nv-g4-fairness": lesson(
    [
      "Racism and segregation kept some people out of hotels, jobs and schools in Nevada.",
      "Nevadans worked to change unfair rules: women won the vote in Nevada in 1914, led by Anne Martin.",
      "In 1960 the Moulin Rouge Agreement ended segregation on the Las Vegas Strip.",
    ],
    "How was the 1960 Moulin Rouge Agreement reached?",
    [
      "Black community leaders and city leaders met.",
      "They talked until they agreed.",
    ],
    "by meeting and talking",
  ),
  "social/nv-g4-governing-nevada": lesson(
    [
      "Nevada's government meets in Carson City and has three branches.",
      "The Legislature (Senate and Assembly) makes laws, the governor carries them out and the courts decide what they mean.",
      "Nevada has 16 counties and Carson City, plus Tribal governments for their own nations.",
      "Laws, police and courts help keep people and property safe.",
    ],
    "Which branch of Nevada's government makes the laws?",
    [
      "The governor carries out laws.",
      "The Senate and Assembly write and pass them.",
    ],
    "the Legislature",
  ),
  "social/nv-g4-nevada-timeline": lesson(
    [
      "A timeline shows events in the order they happened, oldest first.",
      "The Comstock Lode was found in 1859, and Nevada became a state in 1864.",
      "Subtract years to find how long apart events were.",
    ],
    "How many years after the Comstock Lode was found did Nevada become a state?",
    [
      "Statehood was in 1864. The silver was found in 1859.",
      "1864 − 1859 = 5.",
    ],
    "5 years",
  ),
};
