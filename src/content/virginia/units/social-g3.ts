import type { Unit } from "../../types";
import { bankUnit } from "../own";

// Virginia's own Grade 3 history and social science unit: the ancient empire of Mali (3.8), its geography and gold and
// salt trade, its government under Sundiata and Mansa Musa, and the arts, learning and mud-brick architecture of
// Timbuktu and Djenné.

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "va-g3-mali",
    title: "The Empire of Mali",
    emoji: "🕌",
    blurb: "Gold, salt, Mansa Musa and the great mosques of West Africa.",
    parentNote:
      "Finding the ancient empire of Mali in West Africa, how the Niger River and the gold and salt trade made it rich, how its rulers governed, and its arts, learning and mud-brick buildings in cities such as Timbuktu.",
    standards: ["3.8", "the geography, economy, government, arts and architecture of the ancient empire of Mali"],
    items: [
      ["Mali was an empire in…", "West Africa", ["South America", "northern Europe"], "On the continent of Africa."],
      ["Which river flowed through Mali?", "the Niger River", ["the Nile River", "the Amazon River"], "It curves through West Africa."],
      ["The large desert north of Mali is the…", "Sahara", ["Gobi", "Kalahari"], "The biggest hot desert in the world."],
      ["Mali grew rich by trading…", "gold and salt", ["cars and phones", "ice and snow"], "Two very valuable goods."],
      ["Why was salt so valuable?", "people needed it to keep food and stay healthy", ["it was used to build houses", "it was a toy"], "Hot places make people sweat out salt."],
      ["Salt came to Mali from mines in the…", "Sahara Desert", ["Arctic", "Amazon rainforest"], "Traders crossed the desert."],
      ["Traders crossed the Sahara with…", "camel caravans", ["trains", "airplanes"], "Camels can go days without water."],
      ["A caravan is…", "a group of traders traveling together", ["a kind of house", "a type of boat race"], "It is safer to travel in groups."],
      ["The Niger River helped Mali by…", "giving water for farms and a way to move goods", ["making snow", "blocking all travel"], "Boats carried goods."],
      ["Farmers along the Niger grew…", "rice and millet", ["apples and pears", "wheat in the snow"], "Grains that like warm places."],
      ["The ruler of Mali was called the…", "mansa", ["president", "pharaoh"], "It means king or emperor."],
      ["Who founded the empire of Mali?", "Sundiata Keita", ["Julius Caesar", "Mansa Musa"], "Stories call him the Lion King of Mali."],
      ["Mansa Musa is famous for his trip to…", "Mecca", ["Rome", "London"], "He traveled there in 1324."],
      ["Mansa Musa carried so much gold that…", "people far away heard about Mali's riches", ["he lost it all at sea", "gold became worthless forever"], "Mapmakers drew him holding gold."],
      ["Timbuktu was a famous city of…", "trade and learning", ["ice fishing", "space travel"], "Scholars came from far away."],
      ["In Timbuktu, scholars wrote many…", "books and manuscripts", ["video games", "text messages"], "Some are still kept today."],
      ["The Great Mosque of Djenné is built of…", "mud bricks", ["glass", "steel"], "Sun-dried bricks of earth."],
      ["Mud-brick buildings in Mali are repaired by…", "the community plastering new mud", ["robots", "no one"], "People work together each year."],
      ["Griots in Mali were…", "storytellers who kept history", ["soldiers", "farmers only"], "They remembered stories and songs."],
      ["Mali's leaders kept order by…", "dividing the empire into provinces with governors", ["having no rules", "letting traders rule"], "Leaders helped run each part."],
      ["Mali was rich because it controlled…", "trade routes", ["the ocean", "the moon"], "Traders paid taxes to pass through.", true],
      ["Traders paid Mali a tax on goods. That money paid for…", "the army and government", ["new planets", "ice rinks"], "Taxes help run an empire.", true],
      ["Which is an innovation linked to Mali?", "great libraries of handwritten books", ["the telephone", "the steam engine"], "Timbuktu was full of books.", true],
      ["Mud-brick architecture like Djenné's later inspired…", "buildings in other parts of Africa", ["the first skyscraper", "igloos"], "Builders copied the style.", true],
      ["On a world map, Mali is…", "north of the equator in Africa", ["in Asia", "south of Australia"], "Look at West Africa.", true],
      ["Mali traded gold to North Africa for salt, cloth and…", "books", ["cars", "computers"], "Learning spread with trade.", true],
    ],
  }),
];
