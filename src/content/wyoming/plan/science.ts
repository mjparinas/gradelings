import type { Entry } from "../kit";

// Wyoming science: the units Wyoming uses from other frameworks, per grade ("<grade>/science"). The Wyoming Science
// Content and Performance Standards (adopted 2023) are a priority subset of the Next Generation Science Standards, cited
// by their performance expectation codes ("4-PS3-4"): a few expectations per grade from Kindergarten to Grade 5, one
// Grades 6-8 band and a high school set. A middle school expectation may sit in any of Grades 6 to 8, and Grade 9 cites
// the high school expectations. Units are placed only where they practise one of Wyoming's own expectations; the plan
// text describes the unit. Where California's unit is built around California places, Wyoming has its own copy with
// Wyoming examples (../units/science-*.ts).
export const PLAN_SCIENCE: Record<string, Entry[]> = {
  "k/science": [
    ["living-things-need", "share", "K-ESS3-1", "patterns in what plants and animals, including people, need to survive"],
    ["push-and-pull", "share", "K-PS2-1", "how pushes and pulls of different strengths and directions change how things move"],
    ["wa-gk-sunlight", "adopt", "K-PS3-2", "sunlight warms Earth's surface, and shade can reduce that warming"],
    ["wa-gk-homes-habitats", "adopt", "K-ESS3-1", "living things live where their needs are met, and they change the places they live"],
    ["or-gk-design", "adopt", "K-2-ETS1-2", "noticing a problem to solve, how an object's shape helps it work, and comparing two designs"],
    ["what-living-things-need", "adopt", "K-ESS3-1", "the air, water, food and light that plants and animals, including people, need, and the places that meet those needs"],
  ],
  "1/science": [
    ["animal-survival", "share", "1-LS1-1", "how animals' outside parts help them survive"],
    ["light-and-sound", "share", "1-PS4-4", "sound and vibration, seeing only with light, and how materials block or let through light"],
    ["sky-and-seasons", "share", "1-ESS1-1", "patterns of the sun, moon and stars, and daylight through the year"],
    ["wa-g1-nature-ideas", "adopt", "1-LS1-1; K-2-ETS1-1", "designing solutions by copying how the shapes of plant and animal parts help them work"],
    ["wa-g1-signals", "adopt", "1-PS4-4", "designing devices that use light or sound to communicate over a distance"],
    ["wa-g1-plant-parts", "adopt", "1-LS1-1", "how plants use their outside parts to survive and grow"],
    ["ca-g1-design", "adopt", "K-2-ETS1-1", "defining a simple problem, how an object's shape helps it work, and comparing test results for two designs"],
  ],
  "2/science": [
    ["mixtures-and-materials", "adopt", "2-PS1-2", "testing materials' properties and choosing the best one for a job"],
    ["wa-g2-plant-needs", "adopt", "2-LS2-2", "plants need sunlight and water, and animals pollinate plants and spread seeds"],
    ["or-g2-design", "adopt", "K-2-ETS1-3", "defining a problem, how shape helps an object work, comparing test data, and building new objects from the same pieces"],
    ["changing-materials", "share", "2-PS1-2", "describing materials by their properties and choosing the best one for a job"],
    ["objects-and-structures", "adopt", "2-PS1-2", "choosing materials for what an object has to do"],
  ],
  "3/science": [
    ["forces-3", "adopt", "3-PS2-3", "balanced and unbalanced forces, and magnetic forces that act without touching"],
    ["wa-g3-traits", "adopt", "3-LS3-1", "traits are inherited from parents, vary within a group, and can be influenced by the environment"],
    ["wa-g3-hazards", "adopt", "3-ESS3-1; 3-LS4-4", "comparing solutions that reduce the impacts of weather hazards and environmental change, by how well each meets the criteria and constraints"],
    ["or-g3-magnet-design", "adopt", "3-PS2-3; 3-5-ETS1-1", "solving design problems with magnets, setting criteria and constraints, and running fair tests"],
    ["pe-magnets-static-3", "adopt", "3-PS2-3", "magnetic and static electric forces between objects that are not touching"],
    ["mb-solutions-and-technology", "adopt", "3-5-ETS1-1", "a problem can have many solutions, judged by how well each works and what it costs or affects"],
  ],
  "4/science": [
    ["sense-and-respond", "share", "4-LS1-1", "how living things sense their surroundings and respond"],
    ["sound-4", "adopt", "4-PS4-1", "sound as vibrations and waves that carry energy"],
    ["mb-adaptations", "adopt", "4-LS1-1", "structures that help plants and animals survive, grow and reproduce"],
    ["wa-g4-energy-motion", "adopt", "4-PS3-4", "speed and energy, energy changes in collisions, and devices that convert energy"],
    ["wa-g4-waves-info", "adopt", "4-PS4-1; 4-PS4-3", "patterns in waves, and using patterns to transfer information"],
    ["ca-g4-design", "adopt", "4-PS3-4; 3-5-ETS1-2", "defining a design problem with criteria and constraints, comparing solutions, and planning fair tests"],
  ],
  "5/science": [
    ["solutions-and-mixtures", "share", "5-PS1-4", "identifying materials by their properties and testing whether mixing makes new substances"],
    ["matter-changes-5", "adopt", "5-PS1-4", "mixing substances that react and make new substances"],
    ["wa-g5-energy-food", "adopt", "5-PS3-1", "food energy comes from the sun, and plants grow mainly from air and water"],
    ["or-g5-design", "adopt", "3-5-ETS1-3", "defining a design problem with criteria and constraints, comparing solutions, and running fair tests"],
  ],
  "6/science": [
    ["body-systems", "share", "MS-LS1-3", "body systems made of interacting groups of cells"],
    ["wa-g6-cells", "adopt", "MS-LS1-2", "living things are made of cells, and the parts of a cell work together"],
    ["wa-g6-thermal", "adopt", "MS-PS3-4", "designing to reduce heat transfer, and how mass and material affect temperature change"],
    ["ca-g6-human-impact", "adopt", "MS-ESS3-3", "designing ways to monitor and minimize a human impact on the environment"],
  ],
  "7/science": [
    ["atoms-and-elements", "share", "MS-PS1-1", "atoms, elements, compounds and simple molecules"],
    ["food-chains-7", "adopt", "MS-LS2-3", "energy flowing through food chains and webs"],
    ["cycles-succession-7", "adopt", "MS-LS2-3", "matter cycling in ecosystems and how ecosystems change after disturbances"],
    ["particles-mixtures-7", "adopt", "MS-PS1-4", "particle models of pure substances and mixtures"],
    ["plant-parts-ab", "adopt", "MS-LS1-6", "plant structures and photosynthesis in the cycling of matter and flow of energy"],
    ["wa-g7-reactions", "adopt", "MS-PS1-5", "properties change in chemical reactions, atoms are conserved, and reactions can release or absorb energy"],
    ["particles-heat-ab", "adopt", "MS-PS1-4", "how adding or removing thermal energy changes particle motion, temperature and state"],
    ["ca-g7-design", "adopt", "MS-ETS1-1", "defining design problems precisely, evaluating competing solutions, analyzing test data, and improving designs through testing"],
  ],
  "8/science": [
    ["light-and-radiation", "share", "MS-PS4-1; MS-PS4-2", "wave properties and how light reflects, refracts and is absorbed"],
    ["nb-motion-forces-8", "adopt", "MS-PS2-1; MS-PS2-2", "Newton's laws, forces and changes in motion"],
    ["wa-g8-energy", "adopt", "MS-PS3-2", "kinetic energy, mass and speed, and potential energy and position"],
    ["wa-g8-heredity", "adopt", "MS-LS3-1; MS-LS4-5", "genes and mutations, and technologies that influence inheritance"],
    ["wa-g8-selection", "adopt", "MS-LS4-6", "how trait variation affects survival and how populations change over time"],
    ["ca-g8-design", "adopt", "MS-ETS1-1", "defining design problems precisely, evaluating competing solutions, analyzing test data, and improving designs through testing"],
  ],
  "9/science": [
    ["reproduction", "share", "HS-LS3-2", "how sexual reproduction creates genetic variation"],
    ["atoms-and-electrons", "share", "HS-PS1-1", "atomic structure, electron shells and the periodic table"],
    ["bonding-and-reactions", "share", "HS-PS1-1; HS-PS1-2", "how outer electrons explain bonding and chemical reactions"],
    ["periodic-table-9", "adopt", "HS-PS1-1", "patterns in the periodic table"],
    ["chemical-change-ab", "adopt", "HS-PS1-2; HS-PS1-7", "chemical reactions, reaction rates and conservation of atoms"],
    ["mb-evolution-and-selection", "adopt", "HS-LS4-2", "natural selection and adaptation in populations"],
    ["mb-energy-and-magnetism", "adopt", "HS-PS2-5", "conservation of energy and magnetic fields from electric currents"],
    ["wa-g9-motion", "adopt", "HS-PS2-3", "Newton's second law, conservation of momentum, and designs that reduce collision forces"],
    ["electrical-energy-9", "adopt", "HS-PS3-3; HS-ESS3-2", "devices that convert energy and their efficiency, and weighing the costs and benefits of energy sources"],
    ["ca-g9-dna-proteins", "adopt", "HS-LS1-1", "how DNA's structure determines proteins, and the role of DNA and chromosomes in coding traits passed to offspring"],
    ["ca-g9-matter-energy", "adopt", "HS-LS1-6; HS-LS2-5", "building large molecules from sugars, aerobic and anaerobic respiration, and the cycling of carbon among Earth's systems"],
    ["ca-g9-populations", "adopt", "HS-LS4-5; HS-LS4-6", "factors affecting populations and biodiversity, group behavior and survival, environmental change and species, and testing solutions with simulations"],
    ["ca-g9-earth-and-life", "adopt", "HS-ESS1-5", "plate tectonics and the ages of crust, Earth's early history, water's effects on Earth materials, and how Earth's systems and life changed together"],
    ["ca-g9-humans-and-earth", "adopt", "HS-ESS3-5", "how resources, hazards and climate shape human activity, evaluating solutions that reduce human impacts, and climate data, models and forecasts"],
    ["ca-g9-engineering", "adopt", "HS-ETS1-3", "specifying criteria and constraints for global challenges, breaking problems down, weighing trade-offs, and simulating solutions"],
    ["ca-g9-structure-materials", "adopt", "HS-PS2-6", "comparing bulk properties to infer the strength of forces between particles, and why molecular structure matters in designed materials"],
    ["ca-g9-reaction-energy", "adopt", "HS-PS1-6", "energy changes in reactions from bond energies, and changing conditions to get more product at equilibrium"],
    ["ca-g9-nuclear", "adopt", "HS-PS1-8", "fission, fusion and radioactive decay, and nuclear fusion in the sun and its life span"],
    ["ca-g9-energy-systems", "adopt", "HS-PS3-3", "kinetic and potential energy, devices that convert energy, and thermal energy flowing until temperatures are equal"],
    ["ca-g9-waves", "adopt", "HS-PS4-1; HS-PS4-5", "wave speed, frequency and wavelength, digital information, the wave and particle models of light, effects of electromagnetic radiation, and technologies that use waves"],
    ["ca-g9-stars-universe", "adopt", "HS-ESS1-2", "evidence for the Big Bang theory, and how stars produce elements over their life cycles"],
    ["ca-g9-climate-feedbacks", "adopt", "HS-ESS2-2; HS-ESS2-4", "feedbacks between Earth's systems, and how changes in the flow of energy into and out of Earth's systems change climate"],
    ["ca-g9-resources", "adopt", "HS-ESS3-2; HS-ESS3-3", "weighing costs and benefits of energy and mineral resource solutions, and how managing natural resources affects sustainability"],
  ],
};
