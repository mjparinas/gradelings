import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's own Kindergarten science units (`ny-` ids). K-PS1-1 is one of New York's additions to the NGSS: matter is
// a solid or a liquid depending on how warm or cold it is.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-gk-solid-liquid",
    title: "Solid or Liquid?",
    emoji: "🧊",
    blurb: "Cold makes things freeze. Warm makes them melt.",
    parentNote:
      "Practices telling solids from liquids, and noticing that warming makes ice, snow, butter and chocolate melt into liquids while cooling makes water freeze into a solid.",
    standards: ["K-PS1-1", "matter can be a solid or a liquid, depending on how warm or cold it is"],
    items: [
      ["Ice is water that is…", "frozen", ["boiling", "hot", "melted"], "Ice is very cold water."],
      ["Ice cream left in the sun turns…", "runny", ["into a rock", "colder", "bigger"], "The sun warms it up."],
      ["Water left in the freezer turns into…", "ice", ["milk", "sand", "juice"], "The freezer is very cold."],
      ["Which is a solid?", "A block", ["Milk", "Juice", "Rain"], "A solid keeps its shape."],
      ["Which is a liquid?", "Milk", ["A spoon", "A rock", "A crayon"], "A liquid can be poured."],
      ["A snowman melts on a warm day. The snow turns into…", "water", ["sand", "rock", "wood"], "Snow is frozen water."],
      ["Warm air makes ice…", "melt", ["freeze", "grow", "get harder"], "Warmth turns ice to water."],
      ["Very cold air makes water…", "freeze", ["melt", "boil", "get warm"], "Cold turns water to ice."],
      ["Butter in a hot pan…", "melts", ["freezes", "gets harder", "turns to ice"], "Heat makes butter runny."],
      ["Which melts in your warm hand?", "An ice cube", ["A rock", "A coin", "A block"], "Your hand is warm."],
      ["Chocolate gets soft and runny when it is…", "warm", ["cold", "frozen", "in the freezer"], "Heat melts chocolate."],
      ["Juice in an ice pop mold goes in the freezer. It turns…", "solid", ["warm", "runny", "into milk"], "Cold makes it hard."],
      ["Puddles turn to ice on a…", "very cold day", ["hot day", "sunny summer day", "warm night"], "Water freezes when it is cold."],
      ["Which can you pour?", "Water", ["A brick", "A book", "A stone"], "Liquids pour."],
      ["Which keeps its shape?", "A toy car", ["Water", "Juice", "Milk"], "Solids keep their shape."],
      ["Ice melts fastest…", "in the sun", ["in the freezer", "in the snow", "in a cooler"], "The sun warms it."],
      ["Melted ice goes back in the freezer. It turns…", "back into ice", ["into rock", "into milk", "into wood"], "Cold freezes it again."],
      ["Snow is water that is…", "frozen", ["boiling", "melted", "hot"], "Snow is very cold."],
      ["Is ice a solid or a liquid?", "A solid", ["A liquid"], "Ice keeps its shape."],
      ["Is milk a solid or a liquid?", "A liquid", ["A solid"], "You can pour milk."],
      ["Which turns into a liquid when it gets warm?", "A snowball", ["A pebble", "A spoon", "A shell"], "Snow melts."],
      ["Icicles drip and melt when the air gets…", "warmer", ["colder", "darker", "snowier"], "Warm air melts ice."],
      ["A crayon left in a hot car can…", "melt", ["freeze", "turn to ice", "turn to water"], "Heat softens wax.", true],
      ["A lake freezes in winter because the air is…", "very cold", ["very hot", "sunny and warm", "dry and warm"], "Cold air freezes water.", true],
      ["How can you keep ice from melting on a hot day?", "Put it in a cooler", ["Put it in the sun", "Put it on the stove", "Put it in warm water"], "Keep it cold.", true],
      ["Melted wax gets cold. It turns…", "hard again", ["into water", "hotter", "into a gas"], "Cooling makes it solid.", true],
      ["Which test shows that warmth melts ice?", "Put one ice cube in sun and one in shade", ["Put both in the freezer", "Paint the ice", "Count the ice cubes"], "Compare warm and cool.", true],
    ],
  }),
];
