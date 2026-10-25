import { units as ALBERTA_SCIENCE_6 } from "../../alberta/g6-science";
import { course as BC_SCIENCE_7 } from "../../grades/g7/science";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { peOceansClimate8 } from "../../prince-edward-island/units/g8-science-social";
import type { Unit } from "../../types";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 8 that fit North Carolina except for a few questions naming another
// state's or a Canadian place.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "nc-g8-earth-history",
    ["ESS.8.1.1; ESS.8.1.2", "the relative age of rocks and fossils, and what rocks and fossils tell about Earth's history"],
    [
      ["In undisturbed rock layers, the oldest layer is usually…", "at the bottom", ["on top", "in the middle"], "Layers stack up over time."],
      ["Shark teeth fossils found far inland in eastern North Carolina show that the area was once…", "covered by the ocean", ["a desert", "under a glacier"], "Sea animals left them behind."],
      ["An index fossil is useful because the living thing…", "lived for a short time over a wide area", ["is still alive today", "lived only in one pond"], "It helps match the ages of layers in different places."],
      ["A fault that cuts through rock layers is…", "younger than the layers it cuts", ["older than all the layers", "the same age as the bottom layer"], "The layers had to be there first."],
    ],
  ),
  localCopy(
    peOceansClimate8,
    "nc-g8-ocean-currents",
    ["ESS.8.2.2", "how temperature and salinity drive ocean currents, and how currents affect climate"],
    [
      ["The Gulf Stream carries warm water from the tropics…", "north along North Carolina's coast", ["south toward Antarctica", "into the Pacific Ocean"], "It flows past Cape Hatteras."],
      ["Cold, salty water sinks because it is…", "denser than warm, fresher water", ["lighter than warm water", "full of air"], "Density drives deep currents."],
      ["Ocean currents affect climate by…", "carrying heat from one place to another", ["stopping all rain", "making the moon move"], "Warm currents warm nearby land."],
      ["Fish and sea turtles off the Outer Banks are spread by currents because currents carry…", "warm water, food and young animals", ["sand from the mountains", "fresh river water only"], "Currents shape where sea life lives."],
    ],
    { parentNote: "Practices how temperature and salinity drive surface and deep ocean currents, such as the Gulf Stream, and how currents affect climate, ecosystems and where sea life is found." },
  ),
  localCopy(
    from(BC_SCIENCE_7.units, "changing-climate"),
    "nc-g8-changing-climate",
    ["ESS.8.4.3", "how human activity since industrialization has changed global temperatures"],
    [
      ["Since the 1800s, burning coal, oil and gas has added more… to the air.", "carbon dioxide", ["oxygen", "nitrogen"], "It is a greenhouse gas."],
      ["Rising sea levels are a special concern for North Carolina's…", "Outer Banks and coastal towns", ["highest mountain peaks", "Piedmont hilltops"], "Low land floods first."],
      ["Data from many weather stations show that average global temperatures since industrialization have…", "risen", ["fallen", "stayed exactly the same"], "Scientists compare long records."],
      ["Which choice lowers greenhouse gas emissions?", "using solar or wind power instead of coal", ["burning more coal", "cutting down forests"], "Renewable energy releases little carbon dioxide."],
    ],
  ),
  localCopy(
    from(ALBERTA_SCIENCE_6, "energy-resources-ab"),
    "nc-g8-energy-resources",
    ["ESS.8.4.2; ESS.8.4.4", "renewable and nonrenewable energy resources and their effects on the environment"],
    [
      ["Large solar farms in eastern North Carolina turn… into electricity.", "sunlight", ["coal", "natural gas"], "Solar energy is renewable."],
      ["Burning coal in power plants can release ash and gases that…", "pollute the air and water", ["clean the air", "add nutrients to rivers"], "Coal ash ponds must be managed carefully."],
      ["Dams on North Carolina rivers make electricity from…", "moving water", ["burning wood", "the wind"], "This is hydroelectric power."],
      ["Which energy resource is nonrenewable?", "natural gas", ["wind", "sunlight"], "It took millions of years to form."],
    ],
  ),
];
