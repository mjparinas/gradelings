import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 7 social studies: the physical and political geography of Central and South Asia (7.T1a) and
// East Asia (7.T2a), and of Southeast Asia, Oceania and Europe, with time zones and longitude (7.T3a, 7.T4a).

const ASIA: Q[] = [
  ["The world's highest mountain range, between India and China, is the…", "Himalayas", ["Alps", "Andes", "Rockies"], "Mount Everest is there."],
  ["Which river flows across northern India to the Bay of Bengal?", "the Ganges", ["the Nile", "the Danube", "the Mississippi"], "The Indo-Gangetic Plain is around it."],
  ["The Deccan Plateau covers much of…", "southern India", ["northern China", "Japan", "Mongolia"], "It is a high, flat area."],
  ["The Khyber Pass is a famous route through mountains between…", "Afghanistan and Pakistan", ["Japan and Korea", "India and Sri Lanka", "China and Russia"], "Armies and traders used it for centuries."],
  ["The sea west of India is the…", "Arabian Sea", ["Yellow Sea", "Sea of Japan", "Caribbean Sea"], "The Bay of Bengal is east of India."],
  ["The capital of India is…", "New Delhi", ["Mumbai", "Kathmandu", "Islamabad"], "Mumbai is India's largest city."],
  ["The capital of Pakistan is…", "Islamabad", ["Karachi", "Kabul", "Dhaka"], "It was built as a capital in the 1960s."],
  ["Nepal, home of Mount Everest, has its capital at…", "Kathmandu", ["Thimphu", "Lhasa", "Delhi"], "It sits in a valley in the Himalayas."],
  ["Bangladesh lies around the delta of the…", "Ganges and Brahmaputra rivers", ["Yellow and Yangtze rivers", "Tigris and Euphrates", "Nile and Congo"], "It is one of the most crowded countries."],
  ["Kazakhstan and Uzbekistan are countries of…", "Central Asia", ["East Asia", "Southeast Asia", "Oceania"], "Wide grasslands called steppes cover much of it."],
  ["China's two great rivers are the Yangtze and the…", "Huang He (Yellow River)", ["Ganges", "Indus", "Mekong"], "Early Chinese civilization grew along it."],
  ["The capital of China is…", "Beijing", ["Shanghai", "Tokyo", "Seoul"], "Shanghai is its largest city."],
  ["The capital of Japan is…", "Tokyo", ["Kyoto", "Osaka", "Seoul"], "Kyoto was the old capital."],
  ["The capital of South Korea is…", "Seoul", ["Pyongyang", "Busan", "Taipei"], "Pyongyang is North Korea's capital."],
  ["Mongolia's capital is…", "Ulaanbaatar", ["Beijing", "Almaty", "Kabul"], "It is one of the coldest capitals."],
  ["Japan is made up of…", "islands", ["one big desert", "flat plains", "a peninsula only"], "Honshu is the largest."],
  ["The Gobi is a large… in Mongolia and China.", "desert", ["rainforest", "lake", "glacier"], "It is cold in winter."],
  ["Seasonal winds that bring heavy summer rains to South Asia are called…", "monsoons", ["tornadoes", "blizzards", "chinooks"], "Farmers depend on them.", true],
  ["Why do so many people in China live in the east?", "the eastern plains and rivers have good farmland and water", ["the west has more rain", "the east is all mountains", "the west has more cities"], "The west has deserts and high plateaus.", true],
  ["Why did early civilizations grow along the Indus and Huang He?", "rivers gave water and rich soil for farming", ["rivers were frozen", "deserts were better for crops", "no one lived near rivers"], "River valleys fed many people.", true],
  ["Which country in South Asia is an island?", "Sri Lanka", ["Nepal", "Bhutan", "Afghanistan"], "It lies south of India.", true],
  ["Absolute location uses…", "latitude and longitude", ["the nearest city", "a country's neighbors", "the local weather"], "Lines on a map grid.", true],
  ["Tokyo is at about 36° N. That number is its…", "latitude", ["longitude", "time zone", "elevation"], "Latitude measures north or south of the equator.", true],
  ["The steppes of Central Asia are…", "wide, dry grasslands", ["thick rainforests", "frozen ice sheets", "coral reefs"], "Herders have raised animals there for thousands of years.", true],
  ["Why were mountain passes important on the Silk Road?", "they let traders cross high mountain ranges", ["they were made of silk", "they were ports for ships", "they blocked all trade"], "Caravans had to find a way through.", true],
];

const OCEANIA_EUROPE: Q[] = [
  ["The continent that is also a country is…", "Australia", ["Asia", "Europe", "Africa"], "Its capital is Canberra."],
  ["The capital of Australia is…", "Canberra", ["Sydney", "Melbourne", "Perth"], "Sydney is its largest city."],
  ["New Zealand is made up mainly of…", "two large islands", ["one desert", "a peninsula of Asia", "a frozen continent"], "They are called the North Island and the South Island."],
  ["The capital of New Zealand is…", "Wellington", ["Auckland", "Canberra", "Suva"], "Auckland is its largest city."],
  ["The Great Barrier Reef lies off the coast of…", "Australia", ["Japan", "Indonesia", "New Zealand"], "It is the world's largest coral reef system."],
  ["Which ocean lies west of Australia?", "the Indian Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Caribbean Sea"], "The Pacific lies to its east."],
  ["Much of central Australia is a dry region called the…", "Outback", ["Tundra", "Steppe", "Savanna of Asia"], "Most Australians live near the coasts."],
  ["The country made of thousands of islands in Southeast Asia, with its capital at Jakarta, is…", "Indonesia", ["Thailand", "Laos", "Mongolia"], "It has more islands than any other country."],
  ["The capital of the Philippines is…", "Manila", ["Hanoi", "Bangkok", "Kuala Lumpur"], "It is on the island of Luzon."],
  ["The long river that flows through several Southeast Asian countries is the…", "Mekong", ["Thames", "Volga", "Amazon"], "It reaches the sea in Vietnam."],
  ["The capital of Vietnam is…", "Hanoi", ["Ho Chi Minh City", "Phnom Penh", "Manila"], "Ho Chi Minh City is its largest city."],
  ["Which mountain range separates much of France and Italy?", "the Alps", ["the Urals", "the Himalayas", "the Andes"], "Mont Blanc is there."],
  ["The Ural Mountains are often used as the border between…", "Europe and Asia", ["Africa and Europe", "North and South America", "Australia and Asia"], "They run north to south in Russia."],
  ["The sea between southern Europe and North Africa is the…", "Mediterranean Sea", ["Baltic Sea", "North Sea", "Caribbean Sea"], "Greece and Italy reach into it."],
  ["The capital of Greece is…", "Athens", ["Sparta", "Rome", "Istanbul"], "It was a great ancient city-state."],
  ["The capital of Italy is…", "Rome", ["Venice", "Milan", "Athens"], "It was the center of an ancient empire."],
  ["Which river flows through many countries of central and eastern Europe?", "the Danube", ["the Nile", "the Ganges", "the Mississippi"], "Vienna and Budapest are on it."],
  ["The line of 0° longitude, which passes through Greenwich, England, is the…", "prime meridian", ["equator", "Tropic of Cancer", "international date line"], "Time zones are counted from it.", true],
  ["The Earth turns 360° in 24 hours, so each time zone is about…", "15° of longitude wide", ["1° wide", "90° wide", "180° wide"], "360 ÷ 24 = 15.", true],
  ["When it is noon in Boston, it is 5 p.m. in London. London's clocks are…", "5 hours ahead", ["5 hours behind", "the same", "12 hours ahead"], "Places to the east see the sun first.", true],
  ["Sailors once struggled to find longitude until accurate… were invented.", "clocks for ships", ["compasses", "telescopes", "steam engines"], "Comparing local time with home time gives longitude.", true],
  ["The international date line runs mostly through the…", "Pacific Ocean", ["Atlantic Ocean", "Mediterranean Sea", "Indian Ocean"], "Crossing it changes the date.", true],
  ["Why do most Australians live near the coast?", "the interior is very dry", ["the coasts are frozen", "the interior has too many cities", "the coasts have no water"], "Rain falls more near the edges.", true],
  ["Which island country lies east of Australia and has active volcanoes and geysers?", "New Zealand", ["Madagascar", "Iceland", "Sri Lanka"], "It is on the Ring of Fire.", true],
  ["Europe's long, jagged coastline with many peninsulas helped its peoples…", "trade and travel by sea", ["avoid the ocean", "grow rice", "live in deserts"], "Greece and Italy are peninsulas.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ma-g7-asia-geography",
    title: "Geography of Asia",
    emoji: "🏔️",
    blurb: "Mountains, rivers and capitals of Central, South and East Asia",
    parentNote: "The physical and political geography of Central, South and East Asia: the Himalayas, the Ganges, the Deccan Plateau, the Khyber Pass, the steppes, the Yangtze and Huang He, countries and capitals, monsoons, and how geography shaped where people live.",
    standards: ["7.T1a.1; 7.T1a.2; 7.T1a.3; 7.T2a.1; 7.T2a.2; 7.T2a.3", "the physical and political geography of Central, South and East Asia, and how it shapes settlement"],
    items: ASIA,
  }),
  bankUnit({
    id: "ma-g7-oceania-europe",
    title: "Oceania, Southeast Asia & Europe",
    emoji: "🌏",
    blurb: "Islands, reefs, peninsulas and time zones",
    parentNote: "The physical and political geography of Southeast Asia, Australia, New Zealand and Europe, and how time zones and longitude work, including the prime meridian and the international date line.",
    standards: ["7.T3a.1; 7.T3a.2; 7.T3a.3; 7.T4a.1; 7.T4a.2; 7.T4a.4", "the geography of Southeast Asia, Oceania and Europe, and time zones and longitude"],
    items: OCEANIA_EUROPE,
  }),
];
