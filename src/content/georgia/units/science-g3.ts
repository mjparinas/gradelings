import type { Unit } from "../../types";
import { bankUnit } from "../own";

// Georgia's own Grade 3 science unit: the plants, animals and habitats of Georgia's geographic regions (S3L1.a),
// which no other framework's unit is built around. Adaptations and survival (S3L1.b, S3L1.c) are also practised in
// adopted units.

export const SCIENCE_3: Unit[] = [
  bankUnit({
    id: "ga-g3-georgia-habitats",
    title: "Georgia's Habitats",
    emoji: "🐊",
    blurb: "Mountains, Piedmont, Coastal Plain, swamp and coast, and what lives there.",
    parentNote:
      "The plants, animals and habitats of Georgia's regions (the mountains, the Piedmont, the Coastal Plain, the Okefenokee Swamp and the coast and its marshes), and how animals' features and adaptations such as camouflage, hibernation and migration help them survive in one habitat and not another.",
    standards: ["S3L1.a; S3L1.b; S3L1.c", "plants, animals and habitats in Georgia's geographic regions"],
    items: [
      ["Which animal lives in the Okefenokee Swamp?", "American alligator", ["polar bear", "camel"], "It likes warm, wet places."],
      ["Which trees grow in the water of Georgia's swamps?", "cypress trees", ["cactus plants", "palm trees in sand dunes"], "Their roots can stand in water."],
      ["Black bears in Georgia live mostly in the…", "mountains of north Georgia", ["salt marshes", "open ocean"], "They need large forests."],
      ["Mountain streams in north Georgia are cold and clear, which is a good habitat for…", "trout", ["alligators", "sea turtles"], "This fish needs cold water."],
      ["Loggerhead sea turtles lay their eggs on…", "Georgia's beaches", ["mountain tops", "swamp trees"], "They dig nests in the sand."],
      ["Fiddler crabs live in the…", "salt marshes on the coast", ["mountain forests", "city parks"], "Males wave one big claw."],
      ["The gopher tortoise digs burrows in the sandy soil of the…", "Coastal Plain", ["Blue Ridge Mountains", "ocean floor"], "Many other animals share its burrow."],
      ["Longleaf pine forests grow in the…", "Coastal Plain", ["salt marsh", "open ocean"], "They need sandy soil and sun."],
      ["Spanish moss hanging from live oak trees is common on the…", "coast", ["highest mountains", "ocean floor"], "It likes warm, humid air."],
      ["The brown thrasher is Georgia's state…", "bird", ["fish", "tree"], "It sings many songs."],
      ["White-tailed deer live in…", "forests in every region of Georgia", ["only the ocean", "only the swamp"], "They are very adaptable."],
      ["The Piedmont has rolling hills and forests of…", "oaks, hickories and pines", ["seaweed", "cactus"], "Hardwood and pine forests."],
      ["Rhododendron and mountain laurel are shrubs that grow on…", "cool mountain slopes", ["sand dunes", "salt marshes"], "They bloom in spring."],
      ["A habitat is a place where a living thing gets…", "food, water and shelter", ["only toys", "only sunlight"], "It has everything the animal needs."],
      ["Why can't an alligator live in the cold mountains?", "it needs warm temperatures to stay active", ["it is too tall", "it eats rocks"], "Alligators are cold-blooded."],
      ["A fawn's spotted coat helps it hide in the forest. This is…", "camouflage", ["migration", "hibernation"], "It blends in."],
      ["Black bears sleep through much of the winter in dens. This is like…", "hibernation", ["migration", "mimicry"], "They live on stored fat."],
      ["Many birds fly south from Georgia before winter. This is…", "migration", ["camouflage", "hibernation"], "They travel to find food.", true],
      ["The North Atlantic right whale has its calves in warm ocean water off…", "Georgia's coast", ["the Okefenokee Swamp", "Lake Lanier"], "It is the state marine mammal.", true],
      ["Why do salt marsh plants like cordgrass grow on the coast and not in the mountains?", "they are adapted to salty water and tides", ["they need snow", "they need dry rock"], "Adaptations fit a habitat.", true],
      ["The scarlet king snake has bands like the venomous coral snake. Looking like another animal is…", "mimicry", ["hibernation", "migration"], "Predators stay away.", true],
      ["A gopher tortoise is a keystone species because…", "many other animals use its burrows", ["it eats every plant", "it lives in the ocean"], "Hundreds of species use the burrows.", true],
      ["Why would a trout die in a warm, muddy pond?", "it needs cold water with lots of oxygen", ["it needs salt water", "it needs dry land"], "Warm water holds less oxygen.", true],
      ["The Okefenokee Swamp's water is dark like tea because of…", "tannins from plants", ["oil spills", "coal dust"], "Leaves soak in the water.", true],
    ],
  }),
];
