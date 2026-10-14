import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's own Grade 7 science units (`ny-` ids) for two middle school standards no borrowed unit covers: synthetic
// materials made from natural resources (MS-PS1-3), placed with Grade 7's matter and reactions, and how a growing
// population and rising use of resources per person affect Earth's systems (MS-ESS3-4), placed with Grade 7's resources
// and biodiversity units.

const SYNTHETIC = bankUnit({
  id: "ny-g7-synthetic-materials",
  title: "Synthetic Materials",
  emoji: "🧵",
  blurb: "Plastics, fibers, medicines and fuels made from natural resources.",
  parentNote:
    "Practices how synthetic materials such as plastics, nylon, glass and medicines are made from natural resources through chemical processes, and how they help and harm society, from safety vests and insulin to plastic waste and fertilizer runoff.",
  standards: [
    "MS-PS1-3",
    "synthetic materials come from natural resources through chemical processes, and they affect society",
  ],
  items: [
    ["A synthetic material is…", "made by people through chemical processes", ["found unchanged in nature", "always a metal", "a kind of rock"], "Synthetic means made by people."],
    ["Most plastics are made from…", "crude oil and natural gas", ["sand", "wood only", "salt water"], "Fossil fuels are the raw material."],
    ["Nylon was invented as a synthetic replacement for…", "silk", ["iron", "glass", "clay"], "Think of stockings and parachutes."],
    ["Glass is made by melting…", "sand", ["sugar", "plastic", "wood"], "Sand is mostly silica."],
    ["Polyester fabric is made from…", "chemicals that come from oil", ["sheep's wool", "cotton plants", "silkworm threads"], "It is a kind of plastic fiber."],
    ["Which is a natural material?", "Cotton", ["Nylon", "Polyester", "Plastic wrap"], "It grows on a plant."],
    ["Which is a synthetic material?", "Nylon", ["Wool", "Wood", "Cotton"], "Made in a factory by chemistry."],
    ["Most synthetic fertilizers get their nitrogen from…", "the air", ["the moon", "seawater salt", "sunlight"], "Air is mostly nitrogen gas."],
    ["Plastic is so widely used because it is…", "light, strong and easy to shape", ["always heavy", "dissolved by rain", "a great conductor of electricity"], "Think of bottles and toys."],
    ["A big problem with many plastics is that they…", "can take hundreds of years to break down", ["break down in a day", "are never useful", "grow in the ocean"], "They last a long time."],
    ["Making a synthetic material from natural resources involves…", "chemical reactions that form new substances", ["only cutting them into pieces", "only painting them", "only freezing them"], "New substances form."],
    ["Microplastics are…", "tiny pieces of plastic found in water, soil and living things", ["large pieces of metal", "a kind of mineral", "a healthy food"], "Micro means very small."],
    ["Recycling plastic bottles helps because it…", "reduces the oil needed to make new plastic", ["uses more oil", "makes plastic last forever", "creates new oil"], "Reuse the material."],
    ["Kevlar, a synthetic fiber used in safety vests, is useful because it is…", "very strong and light", ["soft and weak", "heavy and brittle", "see-through and fragile"], "It stops sharp objects."],
    ["Synthetic dyes replaced many dyes that people once made from…", "plants and insects", ["glass", "plastic", "steel"], "Natural colors came from living things."],
    ["Which resource is a raw material for making steel?", "Iron ore", ["Sand dunes", "Crude oil", "Cotton"], "Steel is mostly iron."],
    ["Synthetic rubber, made from oil, is often used to make…", "tires", ["bread", "drinking water", "window glass"], "Cars roll on it."],
    ["Many medicines today are made by…", "chemical reactions in factories and labs", ["picking them from trees", "mining them from rock", "collecting rainwater"], "Chemists build the molecules."],
    ["Synthetic fertilizer helps farms grow more food, but runoff from fields can…", "pollute rivers and lakes", ["clean the water", "stop all plants from growing", "remove nitrogen from the air"], "Extra nutrients wash away.", true],
    ["Bioplastics are made from plants such as corn. One benefit is that they…", "come from a renewable resource", ["use more crude oil", "never break down", "are made from metal"], "Corn can be grown again.", true],
    ["Which observation shows a synthetic material is a new substance?", "It has different properties from the starting materials", ["It weighs the same as before", "It is the same color as before", "It can be separated by hand"], "New substance, new properties.", true],
    ["Engineers need a light, waterproof fabric for raincoats. They would most likely choose…", "a synthetic fiber like nylon", ["untreated cotton", "paper", "loose wool"], "It must shed water.", true],
    ["Insulin made with the help of bacteria changed society by…", "making diabetes treatment widely available", ["ending all diseases", "replacing food", "making blood sugar unimportant"], "More people could get the medicine.", true],
    ["Why are some plastics hard to recycle?", "They are mixed with other materials or are different types", ["They are made of gold", "They dissolve in air", "They are natural"], "Sorting is difficult.", true],
    ["Making cement for concrete from limestone releases a lot of…", "carbon dioxide", ["pure oxygen", "helium", "fresh water"], "Limestone contains carbon.", true],
  ],
});

const PEOPLE = bankUnit({
  id: "ny-g7-people-resources",
  title: "People & Earth's Resources",
  emoji: "🌍",
  blurb: "More people, more use per person: the effects on Earth.",
  parentNote:
    "Practices arguing from evidence how a growing human population and rising use of resources per person affect Earth's land, water, air and living things, and how using less per person can reduce that impact, with examples such as groundwater, fisheries and New York's returning forests.",
  standards: [
    "MS-ESS3-4",
    "how a growing human population and rising use of resources per person affect Earth's systems",
  ],
  items: [
    ["Per-capita consumption means…", "the amount used per person", ["the total used by a country", "the number of people", "the price of a product"], "Per capita means per head."],
    ["The world's human population today is about…", "8 billion", ["80 million", "800 billion", "8 million"], "Billions of people."],
    ["As the human population grows, the demand for fresh water…", "increases", ["decreases", "stays the same", "stops"], "More people drink and farm."],
    ["Clearing forests for new farms and cities reduces…", "habitat for wildlife", ["the amount of farmland", "the human population", "sunlight"], "Animals lose their homes."],
    ["Burning more fossil fuels adds more of which gas to the air?", "Carbon dioxide", ["Oxygen", "Helium", "Neon"], "Carbon plus oxygen."],
    ["Overfishing happens when…", "fish are caught faster than they can reproduce", ["fish are protected", "no one fishes", "fish lay more eggs"], "Taking too many."],
    ["Which resource is nonrenewable?", "Oil", ["Sunlight", "Wind", "Trees"], "It took millions of years to form."],
    ["Pumping groundwater faster than rain refills it can cause…", "wells to dry up", ["more groundwater", "the ocean to freeze", "more rain"], "Out faster than in."],
    ["More people driving more cars in a city usually means…", "more air pollution unless cleaner technology is used", ["cleaner air no matter what", "no change in the air", "less traffic"], "More engines running."],
    ["Which change lowers the energy each person uses?", "Using efficient appliances", ["Leaving lights on", "Driving alone more often", "Turning up the heat"], "Same job, less energy."],
    ["Landfills grow faster when people…", "throw away more waste", ["recycle more", "compost food scraps", "reuse containers"], "More trash, more landfill."],
    ["If the population stays the same but each person uses twice as much water, the total water used…", "doubles", ["halves", "stays the same", "triples"], "Twice as much each."],
    ["Mining the metals used in phones and batteries can…", "disturb land and pollute water", ["create new forests", "clean rivers", "add soil"], "Digging changes the land."],
    ["When a city spreads out over more and more land, it is called…", "urban sprawl", ["erosion", "a food web", "recycling"], "Cities spreading out."],
    ["Which is evidence that people affect Earth's systems?", "Rising carbon dioxide levels in the air", ["The moon's phases", "Ocean tides", "Sunrise times"], "Measured over decades."],
    ["Composting food scraps helps by…", "reducing waste sent to landfills", ["adding more trash", "using more oil", "making more plastic"], "Scraps become soil."],
    ["Turning more land into farms to feed more people can lead to…", "soil erosion and habitat loss", ["more forests", "less need for water", "fewer roads"], "Plowed land changes."],
    ["Which helps reduce the impact of a growing city?", "Good public transit", ["More single-use plastic", "Wasting food", "Draining wetlands"], "Fewer cars on the road."],
    ["A town has 10,000 people, and each uses 80 gallons of water a day. How much water does the town use each day?", "800,000 gallons", ["80,000 gallons", "8,000,000 gallons", "18,000 gallons"], "Multiply people by gallons.", true],
    ["Country A has more people than Country B, but Country B uses more energy in total. This shows total impact depends on…", "both population and use per person", ["population only", "land area only", "the weather only"], "Two factors multiply.", true],
    ["A city's population doubled, and its daily trash doubled too. If the population doubles again and habits stay the same, trash will most likely…", "double again", ["stay the same", "fall by half", "disappear"], "Follow the pattern.", true],
    ["Which claim is best supported by evidence?", "Growing resource use is reducing biodiversity in many places", ["Human activity never affects Earth", "Resources can never run out", "Population has no link to water use"], "Look for what data show.", true],
    ["Using fewer resources per person can lower total impact even as population grows because…", "each person uses less", ["population stops mattering", "resources become unlimited", "pollution turns into oxygen"], "Impact = people × use per person.", true],
    ["Much of New York's farmland from the 1800s is forest again today because…", "many farms were abandoned and land was protected", ["the population went to zero", "people stopped using wood entirely", "trees were made from plastic"], "Fields grew back into forest.", true],
    ["Two cities have the same population. City X recycles and uses transit; City Y does neither. Which likely has less impact?", "City X", ["City Y", "They have the same impact", "Neither has any impact"], "Same people, different use.", true],
  ],
});

export const MORE: Unit[] = [SYNTHETIC, PEOPLE];
