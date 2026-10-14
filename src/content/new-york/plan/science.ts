import type { Entry } from "../kit";

// New York science: the units New York uses from other frameworks, per grade ("<grade>/science"). New York teaches the
// NYS P-12 Science Learning Standards (2016), built on the Next Generation Science Standards, and cites their codes
// ("4-PS3-2", "MS-LS1-1", "K-2-ETS1-1"), including New York's own additions (K-PS1-1, 3-ESS2-3, MS-PS1-7, MS-PS1-8,
// MS-PS3-6, HS-LS1-8, HS-ESS1-7). Middle school is a Grades 6 to 8 band that districts arrange, so each of Grades 6, 7
// and 8 mixes life, physical and Earth and space science: Grade 6 cells, the body, heat, weather and climate; Grade 7
// matter, reactions, ecosystems, electricity and Earth's surface; Grade 8 forces, energy, heredity, space and Earth's
// history. Grade 9 follows the high school courses most New York students take that year, Life Science: Biology and
// Earth and Space Sciences, so it cites high school codes and its Earth and space units are New York's own; it adds the
// physical science units other states use in Grade 9 (atoms, bonding, reactions, motion, energy, circuits), citing only
// the HS-PS codes they practise, and New York's own units for waves, gases and solutions, nuclear processes and heat.
// Units built around Washington, Oregon or California places have New York versions in ../units/science-*.ts.
export const PLAN_SCIENCE: Record<string, Entry[]> = {
  "k/science": [
    ["living-things-need", "share", "K-LS1-1", "patterns in what plants and animals, including people, need to survive"],
    [
      "push-and-pull",
      "share",
      "K-PS2-1; K-PS2-2",
      "how pushes and pulls of different strengths and directions change how things move",
    ],
    ["weather-and-seasons", "share", "K-ESS2-1", "observing local weather and describing its patterns over time"],
    [
      "care-for-earth-ab",
      "adopt",
      "K-ESS3-3",
      "ways people can reduce their impact on the land, water, air and living things nearby",
    ],
    ["wa-gk-sunlight", "adopt", "K-PS3-1; K-PS3-2", "sunlight warms Earth's surface, and shade can reduce that warming"],
    ["wa-gk-weather-safety", "adopt", "K-ESS3-2", "why we forecast weather and how we prepare for severe weather"],
    [
      "wa-gk-homes-habitats",
      "adopt",
      "K-ESS3-1; K-ESS2-2",
      "living things live where their needs are met, and they change the places they live",
    ],
    [
      "or-gk-design",
      "adopt",
      "K-2-ETS1-1; K-2-ETS1-2; K-2-ETS1-3",
      "noticing a problem to solve, how an object's shape helps it work, and comparing two designs",
    ],
  ],
  "1/science": [
    ["animal-survival", "share", "1-LS1-1", "how animals' outside parts help them survive"],
    [
      "light-and-sound",
      "share",
      "1-PS4-1; 1-PS4-2; 1-PS4-3",
      "sound and vibration, seeing only with light, and how materials block or let through light",
    ],
    ["sky-and-seasons", "share", "1-ESS1-1; 1-ESS1-2", "patterns of the sun, moon and stars, and daylight through the year"],
    [
      "wa-g1-parents-young",
      "adopt",
      "1-LS1-2; 1-LS3-1",
      "parents and offspring behave in ways that help offspring survive, and young are like their parents",
    ],
    [
      "wa-g1-nature-ideas",
      "adopt",
      "1-LS1-1; K-2-ETS1-2",
      "designing solutions by copying how the shapes of plant and animal parts help them work",
    ],
    ["wa-g1-signals", "adopt", "1-PS4-4; K-2-ETS1-1", "designing devices that use light or sound to communicate over a distance"],
    ["wa-g1-plant-parts", "adopt", "1-LS1-1", "how plants use their outside parts to survive and grow"],
  ],
  "2/science": [
    ["solids-and-liquids", "share", "2-PS1-4; 2-ESS2-3", "changes from heating and cooling, and water as a solid or a liquid"],
    ["water-world", "share", "2-ESS2-3", "where water is found on Earth and the forms it takes"],
    ["changing-materials", "share", "2-PS1-1; 2-PS1-4", "describing materials and changes that can or cannot be reversed"],
    [
      "mixtures-and-materials",
      "adopt",
      "2-PS1-1; 2-PS1-2",
      "testing materials' properties and choosing the best one for a job",
    ],
    [
      "wa-g2-plant-needs",
      "adopt",
      "2-LS2-1; 2-LS2-2",
      "plants need sunlight and water, and animals pollinate plants and spread seeds",
    ],
    [
      "or-g2-design",
      "adopt",
      "K-2-ETS1-1; K-2-ETS1-2; K-2-ETS1-3; 2-PS1-3",
      "defining a problem, how shape helps an object work, comparing test data, and building new objects from the same pieces",
    ],
  ],
  "3/science": [
    ["plant-life", "adopt", "3-LS1-1", "the life cycle of flowering plants"],
    [
      "forces-3",
      "adopt",
      "3-PS2-1; 3-PS2-3",
      "balanced and unbalanced forces, and magnetic forces that act without touching",
    ],
    ["mb-needs-life-cycles", "adopt", "3-LS1-1", "life cycles of birth, growth, reproduction and death"],
    ["mb-speed-and-motion", "adopt", "3-PS2-1; 3-PS2-2", "how forces change motion and patterns that predict motion"],
    [
      "wa-g3-traits",
      "adopt",
      "3-LS3-1; 3-LS3-2",
      "traits are inherited from parents, vary within a group, and can be influenced by the environment",
    ],
    [
      "wa-g3-survival",
      "adopt",
      "3-LS2-1; 3-LS4-2; 3-LS4-3",
      "living in groups, trait differences that help survival, and how well organisms survive in a habitat",
    ],
    [
      "wa-g3-hazards",
      "adopt",
      "3-ESS3-1; 3-LS4-4; 3-5-ETS1-2",
      "comparing several solutions that reduce the impacts of weather hazards and environmental change",
    ],
    [
      "or-g3-magnet-design",
      "adopt",
      "3-PS2-4; 3-5-ETS1-1; 3-5-ETS1-3",
      "solving design problems with magnets, setting criteria and constraints, and running fair tests",
    ],
  ],
  "4/science": [
    ["sense-and-respond", "share", "4-LS1-1; 4-LS1-2", "how living things sense their surroundings and respond"],
    ["light-4", "adopt", "4-PS4-2", "light reflecting from objects into the eye lets us see them"],
    ["sound-4", "adopt", "4-PS3-2; 4-PS4-1", "sound as vibrations and waves that carry energy"],
    ["mb-adaptations", "adopt", "4-LS1-1", "structures that help plants and animals survive, grow and reproduce"],
    [
      "mb-energy-senses",
      "adopt",
      "4-PS3-2",
      "energy moving from place to place by sound, light, heat and electric currents",
    ],
    [
      "wa-g4-energy-motion",
      "adopt",
      "4-PS3-1; 4-PS3-3; 4-PS3-4",
      "speed and energy, energy changes in collisions, and devices that convert energy",
    ],
    ["wa-g4-waves-info", "adopt", "4-PS4-1; 4-PS4-3", "patterns in waves, and using patterns to transfer information"],
  ],
  "5/science": [
    [
      "solutions-and-mixtures",
      "share",
      "5-PS1-3; 5-PS1-4",
      "identifying materials by their properties and testing whether mixing makes new substances",
    ],
    ["states-of-matter-5", "adopt", "5-PS1-1", "matter made of particles too small to see"],
    ["changes-of-state-5", "adopt", "5-PS1-1; 5-PS1-2", "heating and cooling change the state of matter, not the amount"],
    ["matter-changes-5", "adopt", "5-PS1-4", "mixing substances that react and make new substances"],
    [
      "measuring-matter-ab",
      "adopt",
      "5-PS1-2; 5-PS1-3",
      "measuring mass and volume and identifying materials by their properties",
    ],
    ["mb-weather-5", "adopt", "5-ESS2-1", "how the air, water and land interact to make weather"],
    [
      "wa-g5-energy-food",
      "adopt",
      "5-PS3-1; 5-LS1-1",
      "food energy comes from the sun, and plants grow mainly from air and water",
    ],
    [
      "or-g5-design",
      "adopt",
      "3-5-ETS1-1; 3-5-ETS1-2; 3-5-ETS1-3",
      "defining a design problem with criteria and constraints, comparing solutions, and running fair tests",
    ],
  ],
  "6/science": [
    ["body-systems", "share", "MS-LS1-3", "body systems made of interacting groups of cells"],
    [
      "mixtures",
      "share",
      "MS-PS1-8; MS-PS1-2",
      "mixtures as combinations of substances, and properties such as solubility that tell substances apart",
    ],
    ["nb-senses-6", "adopt", "MS-LS1-8", "sensory receptors that send messages to the brain"],
    [
      "wa-g6-cells",
      "adopt",
      "MS-LS1-1; MS-LS1-2",
      "living things are made of cells, and the parts of a cell work together",
    ],
    [
      "wa-g6-thermal",
      "adopt",
      "MS-PS3-3; MS-PS3-4",
      "designing to reduce heat transfer, and how mass and material affect temperature change",
    ],
    [
      "work-energy-8",
      "adopt",
      "MS-PS3-5",
      "when an object's kinetic energy changes, energy is transferred to or from it, as in work",
    ],
  ],
  "7/science": [
    ["atoms-and-elements", "share", "MS-PS1-1", "atoms, elements, compounds and simple molecules"],
    [
      "circuits-and-static",
      "share",
      "MS-PS3-6; MS-PS2-3",
      "energy carried by electric currents in circuits, and the electric forces between charges",
    ],
    [
      "ecosystems-7",
      "adopt",
      "MS-LS2-1; MS-LS2-2",
      "how resources limit populations and how organisms interact in ecosystems",
    ],
    ["food-chains-7", "adopt", "MS-LS2-3", "energy flowing through food chains and webs"],
    [
      "cycles-succession-7",
      "adopt",
      "MS-LS2-3; MS-LS2-4",
      "matter cycling in ecosystems and how ecosystems change after disturbances",
    ],
    [
      "plant-parts-ab",
      "adopt",
      "MS-LS1-6",
      "plant structures and photosynthesis in the cycling of matter and flow of energy",
    ],
    ["particles-mixtures-7", "adopt", "MS-PS1-4", "particle models of pure substances and mixtures"],
    [
      "density-buoyancy-8",
      "adopt",
      "MS-PS1-7",
      "density as a property that identifies a sample of matter, and why things float or sink",
    ],
    [
      "wa-g7-reactions",
      "adopt",
      "MS-PS1-2; MS-PS1-5; MS-PS1-6",
      "properties change in chemical reactions, atoms are conserved, and reactions can release or absorb energy",
    ],
  ],
  "8/science": [
    [
      "light-and-radiation",
      "share",
      "MS-PS4-1; MS-PS4-2",
      "wave properties and how light reflects, refracts and is absorbed",
    ],
    [
      "cells-and-life",
      "share",
      "MS-LS1-2; MS-LS1-7",
      "the parts of a cell, and how photosynthesis and cellular respiration store and release energy",
    ],
    ["nb-motion-forces-8", "adopt", "MS-PS2-1; MS-PS2-2", "Newton's laws, forces and changes in motion"],
    ["wa-g8-energy", "adopt", "MS-PS3-1; MS-PS3-2", "kinetic energy, mass and speed, and potential energy and position"],
    [
      "wa-g8-fields",
      "adopt",
      "MS-PS2-3; MS-PS2-4; MS-PS2-5",
      "electric, magnetic and gravitational forces that act at a distance",
    ],
    [
      "wa-g8-heredity",
      "adopt",
      "MS-LS3-1; MS-LS4-5",
      "genes and mutations, and technologies that influence inheritance",
    ],
    [
      "wa-g8-selection",
      "adopt",
      "MS-LS4-4; MS-LS4-6",
      "how trait variation affects survival and how populations change over time",
    ],
  ],
  "9/science": [
    ["cells-from-cells", "share", "HS-LS1-4", "cell division and growth"],
    ["reproduction", "share", "HS-LS3-2", "how sexual reproduction creates genetic variation"],
    [
      "photosynthesis-respiration-9",
      "adopt",
      "HS-LS1-5; HS-LS1-7; HS-LS2-3; HS-LS2-5",
      "photosynthesis and cellular respiration, and how they cycle carbon and energy through ecosystems and the air",
    ],
    [
      "mb-human-reproductive-system",
      "adopt",
      "HS-LS1-8",
      "the human reproductive system and how human reproduction and development continue life",
    ],
    [
      "mb-evolution-and-selection",
      "adopt",
      "HS-LS4-1; HS-LS4-2; HS-LS4-4; HS-LS4-5",
      "natural selection and adaptation, evidence for evolution from fossils and body structures, and how changing environments lead to new species",
    ],
    // Physical science, for the students who take it in Grade 9 or meet it in the Earth science and biology courses.
    ["atoms-and-electrons", "share", "HS-PS1-1", "atomic structure, electron shells and patterns in the periodic table"],
    ["bonding-and-reactions", "share", "HS-PS1-1; HS-PS1-2", "how outer electrons explain bonding and the outcome of simple reactions"],
    [
      "chemical-change-ab",
      "adopt",
      "HS-PS1-2; HS-PS1-5; HS-PS1-7",
      "chemical reactions, what changes reaction rates, and conservation of atoms and mass",
    ],
    [
      "wa-g9-motion",
      "adopt",
      "HS-PS2-1; HS-PS2-2; HS-PS2-3",
      "Newton's second law, conservation of momentum, and designs that reduce collision forces",
    ],
    [
      "mb-energy-and-magnetism",
      "adopt",
      "HS-PS3-1; HS-PS2-5",
      "conservation of energy and efficiency, and magnetic fields from electric currents",
    ],
    [
      "circuits-9",
      "adopt",
      "HS-PS3-6",
      "Ohm's law: how voltage, current and resistance are related in a circuit",
    ],
    [
      "mb-science-and-society",
      "adopt",
      "HS-ETS1-3; HS-ESS3-2",
      "weighing the costs, benefits and trade-offs of technologies and energy solutions",
    ],
  ],
};
