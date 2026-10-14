import type { Unit } from "../../types";
import { SCIENCE_4 } from "../../washington/units/science-35";
import { bankUnit } from "../own";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_4, "wa-g4-earth-hazards"),
    {
      id: "ca-g4-earth-hazards",
      title: "Quakes, Volcanoes & Maps",
      emoji: "🌋",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides and tsunamis, using California's faults and volcanoes as examples.",
      standards: [
        "4-ESS2-2; 4-ESS3-2",
        "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards",
      ],
    },
    [
      [
        "Why does California have many earthquakes?",
        "Two plates slide past each other there",
        [
          "It is in the middle of a plate",
          "It is very sunny",
          "It has deserts",
        ],
        "The San Andreas Fault.",
      ],
      [
        "The San Andreas Fault is a…",
        "crack where two plates meet",
        ["river", "volcano", "lake"],
        "Plates slide along it.",
      ],
      [
        "Mount Shasta and Lassen Peak in Northern California are…",
        "volcanoes",
        ["deserts", "lakes", "islands"],
        "Lassen Peak erupted about 100 years ago.",
      ],
      [
        "During an earthquake, you should…",
        "drop, cover and hold on",
        ["run outside right away", "stand by a window", "ride an elevator"],
        "Get under a sturdy table.",
      ],
      [
        "Builders make buildings safer in earthquakes by…",
        "making them bend without breaking",
        [
          "using only glass",
          "building them taller and thinner",
          "skipping the base",
        ],
        "Flexible frames help.",
        true,
      ],
      [
        "A big earthquake shook San Francisco in…",
        "1906",
        ["1492", "2025", "1776"],
        "Fires burned after the shaking.",
        true,
      ],
      [
        "Earthquakes on a world map often line up along…",
        "plate edges",
        ["the equator only", "the middle of every desert", "the North Pole"],
        "Plates meet in long lines.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "ca-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, wind, sunlight, heat inside Earth, oil and gas, and how using them affects the environment, with examples from California's solar farms, wind farms and geothermal plants.",
      standards: [
        "4-ESS3-1",
        "energy and fuels come from natural resources, and their use affects the environment",
      ],
    },
    [
      [
        "Large solar farms in California's deserts make electricity from…",
        "sunlight",
        ["coal", "candles", "ocean salt"],
        "Deserts get lots of sun.",
      ],
      [
        "Wind turbines in windy mountain passes turn because of…",
        "moving air",
        ["sunlight only", "oil", "snow"],
        "Wind is moving air.",
      ],
      [
        "Geothermal power plants in California use…",
        "heat from inside Earth",
        ["moonlight", "ice", "sand"],
        "Geo means Earth.",
      ],
      [
        "Dams on Sierra Nevada rivers can make electricity from…",
        "moving water",
        ["burning trees", "batteries only", "volcanoes"],
        "This is hydropower.",
        true,
      ],
      [
        "Which energy resource will not run out?",
        "Sunlight",
        ["Oil", "Natural gas", "Coal"],
        "It is renewable.",
        true,
      ],
    ],
  ),
];

// California-written 4th grade units. The 3-5 engineering design standards (3-5-ETS1) are listed under every grade
// of the band, so 4th grade has its own design unit, built on 4th grade topics (energy devices and earthquake-safe
// buildings), apart from the 3rd and 5th grade ones.
export const OWN_SCIENCE: Unit[] = [
  bankUnit({
    id: "ca-g4-design",
    title: "Design Challenge Lab",
    emoji: "🔧",
    blurb: "Criteria, constraints, comparing ideas and fair tests.",
    parentNote:
      "Practices the 3-5 engineering design steps with 4th grade topics: defining a design problem with criteria for success and constraints on materials, time or cost, comparing possible solutions against them, and planning fair tests that change one thing and look for failure points.",
    standards: [
      "3-5-ETS1-1; 3-5-ETS1-2; 3-5-ETS1-3",
      "defining a design problem with criteria and constraints, comparing solutions, and planning fair tests",
    ],
    items: [
      [
        "A model house must stay standing on a shaking table. This is a…",
        "criterion for success",
        ["constraint", "variable to change", "conclusion"],
        "Something the design must do.",
      ],
      [
        "You may use only straws, tape and paper. This is a…",
        "constraint",
        ["criterion for success", "result", "prediction"],
        "A limit on materials.",
      ],
      [
        "Your team has 20 minutes to build. The time limit is a…",
        "constraint",
        ["criterion for success", "result", "hypothesis"],
        "A limit on time.",
      ],
      [
        "Which is the clearest design problem?",
        "Build a lamp that lights a book page using one battery",
        ["Make something cool", "Build anything with batteries", "Draw a picture of a lamp"],
        "It says what success looks like and what you may use.",
      ],
      [
        "A solar oven must warm a snack to 50 °C. Which is a constraint?",
        "It must cost less than $5 to build",
        ["It must warm the snack to 50 °C", "The snack gets warm", "The sun is out"],
        "Cost limits are constraints.",
      ],
      [
        "Why write criteria before you build?",
        "So you know how to judge if the design works",
        ["So you can skip testing", "So the design looks nice", "So you need more materials"],
        "Criteria are your measuring stick.",
      ],
      [
        "In a fair test, how many things do you change at a time?",
        "One",
        ["All of them", "None", "As many as you like"],
        "Keep everything else the same.",
      ],
      [
        "You test which roof shape sheds the most water. What must stay the same?",
        "The amount of water poured on each roof",
        ["The roof shape", "The winner", "Your guess"],
        "Only the roof shape should change.",
      ],
      [
        "A failure point is…",
        "the place or moment where a design stops working",
        ["the best part of a design", "the first drawing", "a type of material"],
        "Where it breaks or fails.",
      ],
      [
        "A wind-powered car tips over in strong wind. The tipping is a…",
        "failure point to fix",
        ["criterion met", "constraint", "fair test"],
        "Find where it stops working.",
      ],
      [
        "Why do engineers think of several possible solutions first?",
        "To find the one that best fits the criteria and constraints",
        ["To use up all the materials", "Because the first idea is always wrong", "To avoid testing"],
        "More ideas, better choices.",
      ],
      [
        "Two bridge designs both hold 10 toy cars. One uses half the tape. If tape is limited, choose…",
        "the one that uses less tape",
        ["the one that uses more tape", "neither bridge", "a bridge that holds 2 cars"],
        "Meet the criteria within the limits.",
      ],
      [
        "Design A keeps an ice cube frozen 40 minutes. Design B, 25 minutes. Which insulates better?",
        "Design A",
        ["Design B", "They are the same", "You can't tell"],
        "Longer frozen means less heat got in.",
      ],
      [
        "Why repeat a test three times?",
        "To check that the results are reliable",
        ["To change the answer", "To use more time", "To make it unfair"],
        "One try could be a fluke.",
      ],
      [
        "A doorbell must ring loudly and run on one battery. Which design idea fits both?",
        "A buzzer wired to one battery and a button",
        ["A bell that needs five batteries", "A silent light", "A bell with no power source"],
        "Check both the criterion and the constraint.",
      ],
      [
        "Which tool helps compare designs against the criteria?",
        "A table that scores each design on each criterion",
        ["A guess about the winner", "The prettiest drawing", "A list of team names"],
        "Score each design the same way.",
      ],
      [
        "A model building passed a gentle shake but fell in a strong shake. Next you should…",
        "find where it failed and strengthen that part",
        ["call it finished", "test with a gentler shake", "change the criteria"],
        "Fix the failure point, then test again.",
        true,
      ],
      [
        "Wall A cost $4 and stopped 9 of 10 pretend waves. Wall B cost $9 and stopped 10. Budget: $5. Choose…",
        "Wall A",
        ["Wall B", "Neither wall", "Both walls"],
        "Wall B is over the budget.",
        true,
      ],
      [
        "You test three cushions by dropping an egg from 1 m, 2 m and 3 m onto different cushions. What is wrong?",
        "Two things change at once",
        ["Nothing is wrong", "The eggs are too small", "You should not use cushions"],
        "Change only the cushion, or only the height.",
        true,
      ],
      [
        "Each team's alarm must be heard across the classroom. Which result shows a team met this criterion?",
        "Students at the back wall heard it",
        ["It was painted red", "It used two wires", "It took 10 minutes to build"],
        "Test against the goal.",
        true,
      ],
      [
        "A pinwheel must lift a paper clip. Blades of paper lifted 0 clips; blades of card lifted 3. This shows…",
        "stiffer blades worked better",
        ["paper is always best", "the test was unfair", "pinwheels can't lift anything"],
        "Compare the results.",
        true,
      ],
      [
        "A town needs a cheap way to warn people of floods. Which is a constraint?",
        "The warning system must cost little",
        ["People must get the warning", "The warning must be easy to hear", "It must warn before water rises"],
        "Cost is a limit; the rest are goals.",
        true,
      ],
      [
        "Two hand-crank flashlights: A shines 5 minutes per crank, B shines 2 minutes. Which better meets 'lasts longest'?",
        "Flashlight A",
        ["Flashlight B", "They are the same", "Neither one"],
        "Compare minutes per crank.",
        true,
      ],
      [
        "A plan for a fair test should say…",
        "what to change, what to measure and what to keep the same",
        ["only who wins", "only what color to paint it", "nothing until after building"],
        "Plan the variables.",
        true,
      ],
      [
        "Two solutions to keep a classroom cool both work. One uses no electricity. If saving energy is a criterion, it…",
        "meets that criterion better",
        ["does not meet any criteria", "breaks the constraint", "can't be compared"],
        "Check each criterion.",
        true,
      ],
    ],
  }),
];
