import type { Entry } from "../kit";

// Oregon science: the units Oregon uses from other frameworks, per grade ("<grade>/science"). Oregon cites its 2022
// science standards by its own dotted codes (4.ESS2.1), NGSS-based. Middle school is placed by grade, which differs
// from Washington's sequence: thermal energy, work and energy, climate and growth and reproduction in Grade 6; atoms,
// chemical reactions, mixtures and particles, ecosystems, Earth's surface and resources in Grade 7; forces, energy
// and waves, heredity and natural selection, space and Earth's history in Grade 8. Lifts come from other grades'
// files added to the pools in ../g6.ts (Ontario Grade 8 `work-energy-8`) and ../g7.ts (BC Grade 6 `mixtures`,
// Alberta Grade 6 `particles-heat-ab`). Washington units built around Washington places are replaced by Oregon's own
// (../units/science*.ts): weather and climate (3), hazards and energy (4), water (5), climate (6), resources and
// biodiversity (7), and land and water (2). Washington units with only a few Washington items are copied for
// Oregon with those items reworded (../units/science-copies.ts).
export const PLAN_SCIENCE: Record<string, Entry[]> = {
  "k/science": [
    ["living-things-need", "share", "K.LS1.1", "patterns in what plants and animals, including people, need to survive"],
    ["push-and-pull", "share", "K.PS2.1; K.PS2.2", "how pushes and pulls of different strengths and directions change how things move"],
    ["weather-and-seasons", "share", "K.ESS2.1", "observing local weather and describing its patterns over time"],
    ["care-for-earth-ab", "adopt", "K.ESS3.3", "ways people can reduce their impact on the land, water, air and living things nearby"],
    ["wa-gk-sunlight", "adopt", "K.PS3.1; K.PS3.2", "sunlight warms Earth's surface, and shade can reduce that warming"],
    ["wa-gk-weather-safety", "adopt", "K.ESS3.2", "why we forecast weather and how we prepare for severe weather"],
    ["wa-gk-homes-habitats", "adopt", "K.ESS3.1; K.ESS2.2", "living things live where their needs are met, and they change the places they live"],
  ],
  "1/science": [
    ["light-and-sound", "share", "1.PS4.1; 1.PS4.2; 1.PS4.3", "sound and vibration, seeing only with light, and how materials block or let through light"],
    ["sky-and-seasons", "share", "1.ESS1.1; 1.ESS1.2", "patterns of the sun, moon and stars, and daylight through the year"],
    ["animal-survival", "share", "1.LS1.1", "how animals' outside parts help them survive"],
    ["wa-g1-parents-young", "adopt", "1.LS1.2; 1.LS3.1", "parents and offspring behave in ways that help offspring survive, and young are like their parents"],
    ["wa-g1-nature-ideas", "adopt", "1.LS1.1; 1.ETS1.2", "designing solutions by copying how the shapes of plant and animal parts help them work"],
    ["wa-g1-signals", "adopt", "1.PS4.4", "designing devices that use light or sound to communicate over a distance"],
    ["wa-g1-plant-parts", "adopt", "1.LS1.1", "how plants use their outside parts to survive and grow"],
  ],
  "2/science": [
    ["solids-and-liquids", "share", "2.PS1.4; 2.ESS2.3", "changes from heating and cooling, and water as a solid or a liquid"],
    ["changing-materials", "share", "2.PS1.1; 2.PS1.4", "describing materials and changes that can or cannot be reversed"],
    ["water-world", "share", "2.ESS2.3", "where water is found on Earth and the forms it takes"],
    ["mixtures-and-materials", "adopt", "2.PS1.1; 2.PS1.2", "testing materials' properties and choosing the best one for a job"],
    ["wa-g2-plant-needs", "adopt", "2.LS2.1; 2.LS2.2", "plants need sunlight and water, and animals pollinate plants and spread seeds"],
    ["wa-g2-earth-changes", "adopt", "2.ESS1.1; 2.ESS2.1", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"],
  ],
  "3/science": [
    ["forces-3", "adopt", "3.PS2.1; 3.PS2.3", "balanced and unbalanced forces, and magnetic forces that act without touching"],
    ["mb-speed-and-motion", "adopt", "3.PS2.1; 3.PS2.2", "how forces change motion and patterns that predict motion"],
    ["plant-life", "adopt", "3.LS1.1", "the life cycle of flowering plants"],
    ["mb-needs-life-cycles", "adopt", "3.LS1.1", "life cycles of birth, growth, reproduction and death"],
    ["wa-g3-traits", "adopt", "3.LS3.1; 3.LS3.2", "traits are inherited from parents, vary within a group, and can be influenced by the environment"],
    ["wa-g3-survival", "adopt", "3.LS2.1; 3.LS4.2; 3.LS4.3", "living in groups, trait differences that help survival, and how well organisms survive in a habitat"],
    ["wa-g3-hazards", "adopt", "3.ESS3.1; 3.LS4.4; 3.ETS1.2", "comparing solutions that reduce the impacts of weather hazards and environmental change"],
  ],
  "4/science": [
    ["sense-and-respond", "share", "4.LS1.1; 4.LS1.2", "how living things sense their surroundings and respond"],
    ["light-4", "adopt", "4.PS4.2", "light reflecting from objects into the eye lets us see them"],
    ["sound-4", "adopt", "4.PS3.2; 4.PS4.1", "sound as vibrations and waves that carry energy"],
    ["mb-energy-senses", "adopt", "4.PS3.2", "energy moving from place to place by sound, light, heat and electric currents"],
    ["mb-adaptations", "adopt", "4.LS1.1", "structures that help plants and animals survive, grow and reproduce"],
    ["wa-g4-energy-motion", "adopt", "4.PS3.1; 4.PS3.3; 4.PS3.4", "speed and energy, energy changes in collisions, and devices that convert energy"],
    ["wa-g4-waves-info", "adopt", "4.PS4.1; 4.PS4.3", "patterns in waves, and using patterns to transfer information"],
  ],
  "5/science": [
    ["solutions-and-mixtures", "share", "5.PS1.3; 5.PS1.4", "identifying materials by their properties and testing whether mixing makes new substances"],
    ["states-of-matter-5", "adopt", "5.PS1.1", "matter made of particles too small to see"],
    ["changes-of-state-5", "adopt", "5.PS1.1; 5.PS1.2", "heating and cooling change the state of matter, not the amount"],
    ["matter-changes-5", "adopt", "5.PS1.4", "mixing substances that react and make new substances"],
    ["measuring-matter-ab", "adopt", "5.PS1.2; 5.PS1.3", "measuring mass and volume and identifying materials by their properties"],
    ["mb-weather-5", "adopt", "5.ESS2.1", "how the air, water and land interact to make weather"],
    ["wa-g5-gravity", "adopt", "5.PS2.1", "Earth's gravitational force on objects is directed down"],
    ["wa-g5-energy-food", "adopt", "5.PS3.1; 5.LS1.1", "food energy comes from the sun, and plants grow mainly from air and water"],
    ["wa-g5-ecosystems", "adopt", "5.LS2.1", "the movement of matter among plants, animals, decomposers and the environment"],
  ],
  "6/science": [
    ["body-systems", "share", "6.LS1.3", "body systems made of interacting groups of cells"],
    ["wa-g6-cells", "adopt", "6.LS1.1; 6.LS1.2", "living things are made of cells, and the parts of a cell work together"],
    ["nb-senses-6", "adopt", "6.LS1.8", "sensory receptors that send messages to the brain"],
    ["wa-g6-thermal", "adopt", "6.PS3.3; 6.PS3.4", "designing to reduce heat transfer, and how mass and material affect temperature change"],
    ["work-energy-8", "adopt", "6.PS3.5", "when an object's kinetic energy changes, energy is transferred to or from it, as in work"],
    ["wa-g6-design", "adopt", "MS.ETS1.1; MS.ETS1.2; MS.ETS1.3; MS.ETS1.4", "defining design problems, evaluating and testing solutions, and improving designs"],
  ],
  "7/science": [
    ["atoms-and-elements", "share", "7.PS1.1", "atoms, elements, compounds and simple molecules"],
    ["mixtures", "adopt", "7.PS1.2", "properties such as solubility that tell pure substances and mixtures apart"],
    ["particles-mixtures-7", "adopt", "7.PS1.4", "particle models of pure substances and mixtures"],
    ["particles-heat-ab", "adopt", "7.PS1.4", "how adding or removing thermal energy changes particle motion, temperature and state"],
    ["wa-g7-reactions", "adopt", "7.PS1.2; 7.PS1.5; 7.PS1.6", "properties change in chemical reactions, atoms are conserved, and reactions can release or absorb energy"],
    ["plant-parts-ab", "adopt", "7.LS1.6", "plant structures and photosynthesis in the cycling of matter and flow of energy"],
    ["ecosystems-7", "adopt", "7.LS2.1; 7.LS2.2", "how resources limit populations and how organisms interact in ecosystems"],
    ["food-chains-7", "adopt", "7.LS2.3", "energy flowing through food chains and webs"],
    ["cycles-succession-7", "adopt", "7.LS2.3; 7.LS2.4", "matter cycling in ecosystems and how ecosystems change after disturbances"],
    ["wa-g7-earth-surface", "adopt", "7.ESS2.1; 7.ESS2.2; 7.ESS2.3", "the rock cycle, surface processes at different scales, and evidence for plate motion"],
  ],
  "8/science": [
    ["nb-motion-forces-8", "adopt", "8.PS2.1; 8.PS2.2", "Newton's laws, forces and changes in motion"],
    ["wa-g8-fields", "adopt", "8.PS2.3; 8.PS2.4; 8.PS2.5", "electric, magnetic and gravitational forces that act at a distance"],
    ["wa-g8-energy", "adopt", "8.PS3.1; 8.PS3.2", "kinetic energy, mass and speed, and potential energy and position"],
    ["light-and-radiation", "share", "8.PS4.1; 8.PS4.2", "wave properties and how light reflects, refracts and is absorbed"],
    ["wa-g8-heredity", "adopt", "8.LS3.1; 8.LS4.5", "genes and mutations, and technologies that influence inheritance"],
    ["wa-g8-selection", "adopt", "8.LS4.4; 8.LS4.6", "how trait variation affects survival and how populations change over time"],
  ],
  "9/science": [
    ["cells-from-cells", "share", "HS.LS1.4", "cell division and growth"],
    ["reproduction", "share", "HS.LS3.2", "how sexual reproduction creates genetic variation"],
    ["photosynthesis-respiration-9", "adopt", "HS.LS1.5; HS.LS1.7", "photosynthesis and cellular respiration"],
    ["mb-evolution-and-selection", "adopt", "HS.LS4.2; HS.LS4.4", "natural selection and adaptation in populations"],
    ["atoms-and-electrons", "share", "HS.PS1.1", "atomic structure, electron shells and the periodic table"],
    ["periodic-table-9", "adopt", "HS.PS1.1", "patterns in the periodic table"],
    ["bonding-and-reactions", "share", "HS.PS1.1; HS.PS1.2", "how outer electrons explain bonding and chemical reactions"],
    ["chemical-change-ab", "adopt", "HS.PS1.2; HS.PS1.5; HS.PS1.7", "chemical reactions, reaction rates and conservation of atoms"],
    ["wa-g9-motion", "adopt", "HS.PS2.1; HS.PS2.2; HS.PS2.3", "Newton's second law, conservation of momentum, and designs that reduce collision forces"],
    ["mb-energy-and-magnetism", "adopt", "HS.PS3.1; HS.PS2.5", "conservation of energy and magnetic fields from electric currents"],
  ],
};
