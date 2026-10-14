import type { Unit } from "../../types";
import { bankUnit } from "../own";

// California's own 1st grade science units. The K-2 engineering design standards (K-2-ETS1) are listed under every
// grade of the band, so 1st grade has its own design unit with new problems, shapes and tests, apart from the
// Kindergarten and 2nd grade ones.

export const SCIENCE_1: Unit[] = [
  bankUnit({
    id: "ca-g1-design",
    title: "Fix It, Shape It, Test It",
    emoji: "🧰",
    blurb: "Find a problem, pick a shape, and test two ideas.",
    parentNote:
      "Practices the K-2 engineering steps: noticing a problem that a new or better object could solve, how an object's shape helps it do its job, and reading simple test results to tell which of two designs works better.",
    standards: [
      "K-2-ETS1-1; K-2-ETS1-2; K-2-ETS1-3",
      "defining a simple problem, how an object's shape helps it work, and comparing test results for two designs",
    ],
    items: [
      [
        "Your crayons roll off the desk. What is the problem?",
        "The crayons roll away",
        ["Crayons are pretty", "The desk is brown", "You like to draw"],
        "What do you want to change?",
      ],
      [
        "Which is a problem a new tool could fix?",
        "Your backpack strap keeps slipping",
        ["The sun is bright", "You have a friend", "It is Monday"],
        "Something that is not working.",
      ],
      [
        "Your dog's water bowl tips over. What could you make?",
        "A bowl with a wide, heavy bottom",
        ["A bowl with a round bottom", "A smaller dog", "A bowl made of paper"],
        "Wide bottoms stay put.",
      ],
      [
        "Why does a bottle have a narrow top?",
        "So drinks pour without spilling",
        ["So it can roll", "So it is heavy", "So it can float"],
        "A small opening controls the flow.",
      ],
      [
        "Why does a funnel have a wide top and a thin tip?",
        "To pour into small openings",
        ["To make noise", "To hold soup", "To cut paper"],
        "Wide in, thin out.",
      ],
      [
        "Why do shoes have bumpy bottoms?",
        "So you don't slip",
        ["So they look shiny", "So they are soft", "So they float"],
        "Bumps grip the ground.",
      ],
      [
        "Why is a bike helmet round and hard?",
        "To protect your head",
        ["To keep you cold", "To make you fast", "To hold water"],
        "It covers and guards your head.",
      ],
      [
        "Why does a basket have holes?",
        "So water can drain out",
        ["So it holds soup", "So it is heavy", "So it rolls"],
        "Water slips through holes.",
      ],
      [
        "Boat A held 3 coins. Boat B held 7 coins. Which held more?",
        "Boat B",
        ["Boat A", "They held the same", "Neither held coins"],
        "7 is more than 3.",
      ],
      [
        "Tower A fell at 5 blocks. Tower B stood with 9. Which is stronger?",
        "Tower B",
        ["Tower A", "They are the same", "Neither tower"],
        "It held more blocks.",
      ],
      [
        "Ramp A made a car go 2 steps. Ramp B made it go 6. Which went farther?",
        "Ramp B",
        ["Ramp A", "They are the same", "Neither ramp"],
        "Compare the steps.",
      ],
      [
        "Before you build, you can show your idea with a…",
        "drawing",
        ["nap", "snack", "song"],
        "A sketch shows the plan.",
      ],
      [
        "Why do we test two ideas the same way?",
        "To compare them fairly",
        ["To make one win", "To skip the test", "To break both"],
        "Same test, fair result.",
      ],
      [
        "A cup leaks water. What should a new cup do?",
        "Hold water without leaking",
        ["Leak faster", "Be very heavy", "Change color"],
        "That is the goal.",
      ],
      [
        "Why does a ladder have steps?",
        "So you can climb up",
        ["So it can roll", "So it can float", "So it can bend"],
        "Each step holds your foot.",
      ],
      [
        "Why are scissors sharp?",
        "To cut paper",
        ["To hold water", "To roll", "To keep warm"],
        "Sharp edges cut.",
      ],
      [
        "Two bags held apples. Bag A ripped. Bag B did not. Which is better?",
        "Bag B",
        ["Bag A", "They are the same", "Neither bag"],
        "The bag that did not rip.",
        true,
      ],
      [
        "Hat A kept 4 kids dry. Hat B kept 1 dry. Which works better?",
        "Hat A",
        ["Hat B", "They are the same", "Neither hat"],
        "More kids stayed dry.",
        true,
      ],
      [
        "Ice melted in 10 minutes in box A and 30 in box B. Which kept it cold?",
        "Box B",
        ["Box A", "They are the same", "Neither box"],
        "Slower melting means colder.",
        true,
      ],
      [
        "A plane with wide wings flew 8 steps. Thin wings flew 3. Which flew far?",
        "Wide wings",
        ["Thin wings", "They are the same", "Neither plane"],
        "Compare the steps.",
        true,
      ],
      [
        "Your bridge sags in the middle. What could help?",
        "Fold the paper to make it stiffer",
        ["Use wet paper", "Make it thinner", "Take away the ends"],
        "Folds make paper stronger.",
        true,
      ],
      [
        "Before you build, you should ask…",
        "What problem am I solving?",
        ["What color is the sky?", "Who is tallest?", "What is for lunch?"],
        "Know the problem first.",
        true,
      ],
      [
        "Why is a snow shovel wide and flat?",
        "To scoop lots of snow",
        ["To make snow melt", "To make it roll", "To make noise"],
        "Wide holds more.",
        true,
      ],
      [
        "Birds can't reach the feeder seeds. What could you change?",
        "Add a perch for birds to stand on",
        ["Hide the seeds", "Make it taller", "Paint it black"],
        "Give the birds a place to sit.",
        true,
      ],
      [
        "Two wagons. Wagon A has round wheels. Wagon B has square ones. Which rolls?",
        "Wagon A",
        ["Wagon B", "Both roll the same", "Neither wagon"],
        "Round shapes roll.",
        true,
      ],
    ],
  }),
];
