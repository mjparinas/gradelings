import type { Entry } from "../kit";

// Washington science: the units Washington uses from other frameworks, per grade ("<grade>/science").
// Washington teaches the Next Generation Science Standards. Middle school follows a common Washington sequence:
// Grade 6 matter, cells and body systems, weather and climate; Grade 7 chemical reactions, ecosystems, Earth's surface
// and resources; Grade 8 forces, energy and waves, heredity and natural selection, space and Earth's history. Grade 9
// is high school biology and physical science basics. Topics with no fitting unit here are Washington's own (../units).
export const PLAN_SCIENCE: Record<string, Entry[]> = {
  "k/science": [
    ["living-things-need", "share", "K-LS1-1", "patterns in what plants and animals, including people, need to survive"],
    ["push-and-pull", "share", "K-PS2-1; K-PS2-2", "how pushes and pulls of different strengths and directions change how things move"],
    ["weather-and-seasons", "share", "K-ESS2-1", "observing local weather and describing its patterns over time"],
    ["care-for-earth-ab", "adopt", "K-ESS3-3", "ways people can reduce their impact on the land, water, air and living things nearby"],
  ],
  "1/science": [
    ["light-and-sound", "share", "1-PS4-1; 1-PS4-2; 1-PS4-3", "sound and vibration, seeing only with light, and how materials block or let through light"],
    ["sky-and-seasons", "share", "1-ESS1-1; 1-ESS1-2", "patterns of the sun, moon and stars, and daylight through the year"],
    ["animal-survival", "share", "1-LS1-1", "how animals' outside parts help them survive"],
  ],
  "2/science": [
    ["solids-and-liquids", "share", "2-PS1-4; 2-ESS2-3", "changes from heating and cooling, and water as a solid or a liquid"],
    ["changing-materials", "share", "2-PS1-1; 2-PS1-4", "describing materials and changes that can or cannot be reversed"],
    ["water-world", "share", "2-ESS2-3", "where water is found on Earth and the forms it takes"],
    ["mixtures-and-materials", "adopt", "2-PS1-1; 2-PS1-2", "testing materials' properties and choosing the best one for a job"],
  ],
  "3/science": [
    ["forces-3", "adopt", "3-PS2-1; 3-PS2-3", "balanced and unbalanced forces, and magnetic forces that act without touching"],
    ["mb-speed-and-motion", "adopt", "3-PS2-1; 3-PS2-2", "how forces change motion and patterns that predict motion"],
    ["plant-life", "adopt", "3-LS1-1", "the life cycle of flowering plants"],
    ["mb-needs-life-cycles", "adopt", "3-LS1-1", "life cycles of birth, growth, reproduction and death"],
  ],
  "4/science": [
    ["sense-and-respond", "share", "4-LS1-1; 4-LS1-2", "how living things sense their surroundings and respond"],
    ["light-4", "adopt", "4-PS4-2", "light reflecting from objects into the eye lets us see them"],
    ["sound-4", "adopt", "4-PS3-2; 4-PS4-1", "sound as vibrations and waves that carry energy"],
    ["mb-energy-senses", "adopt", "4-PS3-2", "energy moving from place to place by sound, light, heat and electric currents"],
    ["mb-adaptations", "adopt", "4-LS1-1", "structures that help plants and animals survive, grow and reproduce"],
  ],
  "5/science": [
    ["solutions-and-mixtures", "share", "5-PS1-3; 5-PS1-4", "identifying materials by their properties and testing whether mixing makes new substances"],
    ["states-of-matter-5", "adopt", "5-PS1-1", "matter made of particles too small to see"],
    ["changes-of-state-5", "adopt", "5-PS1-1; 5-PS1-2", "heating and cooling change the state of matter, not the amount"],
    ["matter-changes-5", "adopt", "5-PS1-4", "mixing substances that react and make new substances"],
    ["measuring-matter-ab", "adopt", "5-PS1-2; 5-PS1-3", "measuring mass and volume and identifying materials by their properties"],
    ["mb-weather-5", "adopt", "5-ESS2-1", "how the air, water and land interact to make weather"],
  ],
  "6/science": [
    ["body-systems", "share", "MS-LS1-3", "body systems made of interacting groups of cells"],
    ["mixtures", "share", "MS-PS1-2", "properties of pure substances and mixtures"],
    ["particles-heat-ab", "adopt", "MS-PS1-4", "how adding or removing thermal energy changes particle motion and state"],
    ["nb-senses-6", "adopt", "MS-LS1-8", "sensory receptors that send messages to the brain"],
  ],
  "7/science": [
    ["atoms-and-elements", "share", "MS-PS1-1", "atoms, elements, compounds and simple molecules"],
    ["ecosystems-7", "adopt", "MS-LS2-1; MS-LS2-2", "how resources limit populations and how organisms interact in ecosystems"],
    ["food-chains-7", "adopt", "MS-LS2-3", "energy flowing through food chains and webs"],
    ["cycles-succession-7", "adopt", "MS-LS2-3; MS-LS2-4", "matter cycling in ecosystems and how ecosystems change after disturbances"],
    ["particles-mixtures-7", "adopt", "MS-PS1-4", "particle models of pure substances and mixtures"],
    ["plant-parts-ab", "adopt", "MS-LS1-4; MS-LS1-6", "plant structures for reproduction and photosynthesis"],
  ],
  "8/science": [
    ["light-and-radiation", "share", "MS-PS4-1; MS-PS4-2", "wave properties and how light reflects, refracts and is absorbed"],
    ["nb-motion-forces-8", "adopt", "MS-PS2-1; MS-PS2-2", "Newton's laws, forces and changes in motion"],
    ["work-energy-8", "adopt", "MS-PS3-5", "energy transfer as work and efficiency"],
  ],
  "9/science": [
    ["cells-from-cells", "share", "HS-LS1-4", "cell division and growth"],
    ["reproduction", "share", "HS-LS3-2", "how sexual reproduction creates genetic variation"],
    ["atoms-and-electrons", "share", "HS-PS1-1", "atomic structure, electron shells and the periodic table"],
    ["bonding-and-reactions", "share", "HS-PS1-1; HS-PS1-2", "how outer electrons explain bonding and chemical reactions"],
    ["photosynthesis-respiration-9", "adopt", "HS-LS1-5; HS-LS1-7", "photosynthesis and cellular respiration"],
    ["periodic-table-9", "adopt", "HS-PS1-1", "patterns in the periodic table"],
    ["chemical-change-ab", "adopt", "HS-PS1-2; HS-PS1-5; HS-PS1-7", "chemical reactions, reaction rates and conservation of atoms"],
    ["mb-evolution-and-selection", "adopt", "HS-LS4-2; HS-LS4-4", "natural selection and adaptation in populations"],
    ["mb-energy-and-magnetism", "adopt", "HS-PS3-1; HS-PS2-5", "conservation of energy and magnetic fields from electric currents"],
  ],
};
