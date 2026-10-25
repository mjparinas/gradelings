import type { Unit } from "../../types";
import { course as GRADES_G8_SCIENCE_course } from "../../grades/g8/science";
import { SCIENCE_7 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7 } from "../../washington/units/science-68";
import { SCIENCE_8 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 8 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(GRADES_G8_SCIENCE_course.units, "plate-tectonics"), "tn-g8-plate-tectonics", ["8.ESS2.2; 8.ESS3.1", "plate tectonics"], [
      ["The New Madrid Seismic Zone near West Tennessee is unusual because it is…", "in the middle of a plate, far from a plate boundary", ["on top of a volcano", "under the ocean"], "Old cracks in the crust can still slip."],
      ["The Appalachian Mountains formed when…", "ancient plates collided", ["a volcano erupted last year", "glaciers built them"], "They are very old mountains."],
      ["The Mid-Atlantic Ridge is a place where plates…", "move apart", ["crash together", "slide past each other"], "New crust forms there."],
      ["Earthquakes happen mostly along…", "plate boundaries", ["the middle of oceans only", "rivers"], "Plates grind and slip."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8, "wa-g8-space"), "tn-g8-space", ["8.PS2.3", "the Earth-sun-moon system, gravity in the solar system, and its scale"], [
      ["In June, Tennessee has long days because…", "the Northern Hemisphere is tilted toward the sun", ["Earth is closest to the sun", "the moon is full"], "Tilt causes seasons."],
      ["In December, Tennessee has short days because…", "the Northern Hemisphere is tilted away from the sun", ["Earth stops spinning", "the sun is smaller"], "Tilt causes seasons."],
      ["In 2017, a total solar eclipse passed over Nashville. During it…", "the moon blocked the sun", ["Earth blocked the moon", "the sun went out"], "The moon was between Earth and the sun."],
      ["Gravity keeps the moon in orbit around…", "Earth", ["the sun alone", "Mars"], "Gravity pulls masses together."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8, "wa-g8-earth-history"), "tn-g8-earth-history", ["8.LS4.1; 8.LS4.2", "rock strata and Earth's history, the fossil record, and anatomical evidence of common ancestry"], [
      ["Sea shell fossils at Coon Creek in West Tennessee show that…", "the area was once covered by a shallow sea", ["it was always dry", "dinosaurs lived in space"], "Fossils record past environments."],
      ["In Tennessee rock layers, the deepest layers are usually…", "the oldest", ["the youngest", "the same age as the top"], "Layers stack over time."],
      ["Index fossils help geologists by…", "matching the ages of rock layers in different places", ["making rocks harder", "creating new rocks"], "They lived for a short, known time."],
      ["Coal on the Cumberland Plateau formed from…", "ancient swamp plants", ["volcano ash", "sea salt"], "Plants were buried and pressed."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, "wa-g7-earth-surface"), "tn-g8-earth-surface", ["8.ESS2.3; 8.ESS2.4", "the rock cycle, surface processes at different scales, and evidence for plate motion"], [
      ["The Appalachian Mountains are old and rounded because…", "erosion has worn them down for millions of years", ["they were just formed", "they are made of ice"], "Slow processes add up."],
      ["Limestone, common in Middle Tennessee, is a…", "sedimentary rock", ["igneous rock", "metamorphic rock"], "It formed from layers of shells and mud."],
      ["Tennessee marble, used in many buildings, is a…", "metamorphic rock", ["sedimentary rock", "igneous rock"], "Heat and pressure changed limestone."],
      ["The shapes of Africa and South America fit together, which is evidence of…", "continental drift", ["erosion", "weather"], "They were once joined."],
    ], { blurb: "Plates, the rock cycle and the land", parentNote: "Practises plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, including the Appalachian Mountains." }),
];
