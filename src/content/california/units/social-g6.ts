import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { G6 as WASHINGTON } from "../../washington/units/social-59-g6";

// California social studies, Grade 6: ancient civilizations. Washington's and Oregon's units are copied without their
// state's places or their Tribal items, with California items added; California's own units fill the rest. Content
// about American Indian nations is light and in the present tense, and religions are described factually and neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 6

const HEBREWS_KUSH: Q[] = [
  [
    "Judaism was one of the first religions to teach belief in…",
    "one God",
    ["many gods", "no gods", "the Sun as a god"],
    "Belief in one God is monotheism.",
  ],
  [
    "The Hebrew Bible's first five books are called the…",
    "Torah",
    ["Qur'an", "Vedas", "Analects"],
    "They are central to Judaism.",
  ],
  [
    "According to the Hebrew Bible, Moses led the Israelites out of…",
    "Egypt",
    ["Rome", "China", "Greece"],
    "This is called the Exodus.",
  ],
  [
    "The Ten Commandments are rules about…",
    "how to worship God and treat other people",
    ["farming only", "building pyramids", "sailing ships"],
    "They are part of the Torah.",
  ],
  [
    "Abraham is important in Judaism, Christianity and Islam because he is seen as…",
    "the father of the Hebrew people and a founder of monotheism",
    ["a Roman emperor", "a Greek philosopher", "an Egyptian pharaoh"],
    "All three faiths honor him.",
  ],
  [
    "King David made which city the capital of the Israelite kingdom?",
    "Jerusalem",
    ["Athens", "Babylon", "Memphis"],
    "His son Solomon built the First Temple there.",
  ],
  [
    "The Babylonians destroyed the First Temple and sent many Jews into exile in…",
    "587 BCE",
    ["70 CE", "1492 CE", "1000 BCE"],
    "This is the Babylonian Exile.",
  ],
  [
    "The Romans destroyed the Second Temple in Jerusalem in…",
    "70 CE",
    ["587 BCE", "1776 CE", "300 BCE"],
    "Many Jews scattered across the Mediterranean.",
  ],
  [
    "The spreading of Jewish communities far from their homeland is called the…",
    "Diaspora",
    ["Exodus", "Renaissance", "Crusade"],
    "Diaspora means scattering.",
  ],
  [
    "Yohanan ben Zaccai is remembered for…",
    "founding a center of learning at Yavneh after 70 CE",
    ["building the pyramids", "leading Rome", "sailing to India"],
    "Study helped Judaism survive.",
  ],
  [
    "A synagogue is a place where Jewish people…",
    "pray and study",
    ["sell grain", "train soldiers", "bury pharaohs"],
    "Synagogues helped communities everywhere.",
  ],
  [
    "The Talmud is…",
    "a collection of Jewish law and teachings",
    ["a Roman road", "an Egyptian tomb", "a Greek play"],
    "Rabbis wrote it over centuries.",
  ],
  [
    "The story of Ruth and Naomi teaches about…",
    "loyalty and kindness",
    ["war", "trade", "farming tools"],
    "Ruth stays with Naomi.",
  ],
  [
    "Judaism's ideas of justice and the worth of each person influenced…",
    "later Western ideas of law and ethics",
    ["the Great Wall", "the Maya calendar", "Egyptian mummies"],
    "Many laws reflect these ideas.",
  ],
  [
    "The kingdom of Kush was located along the Nile River, south of…",
    "Egypt",
    ["Greece", "Rome", "Mesopotamia"],
    "Today it is part of Sudan.",
  ],
  [
    "Kush was famous for its…",
    "iron working and gold",
    ["silk", "olive oil", "potatoes"],
    "Meroë was an iron-making center.",
  ],
  [
    "In the 700s BCE, Kushite kings conquered and ruled…",
    "Egypt",
    ["Rome", "China", "Persia"],
    "They were Egypt's 25th dynasty.",
  ],
  [
    "The Kushite king Piye is known for…",
    "conquering Egypt",
    ["founding Rome", "building the Great Wall", "writing the Torah"],
    "He united Egypt and Kush.",
  ],
  [
    "Kush built more pyramids than Egypt at…",
    "Meroë and Napata",
    ["Giza only", "Athens", "Jerusalem"],
    "Kushite pyramids are small and steep.",
  ],
  [
    "Kush traded gold, ivory and ebony with…",
    "Egypt and the Mediterranean world",
    ["the Inca", "Australia", "the Maya"],
    "The Nile connected them.",
  ],
  [
    "Kush developed its own writing system called…",
    "Meroitic",
    ["cuneiform", "Latin", "Sanskrit"],
    "It is not yet fully understood.",
    true,
  ],
  [
    "Kush was ruled at times by powerful queens called…",
    "kandakes",
    ["pharaohs of Rome", "emperors of China", "consuls"],
    "Amanirenas fought Rome.",
    true,
  ],
  [
    "Why did Kush and Egypt influence each other?",
    "the Nile linked them through trade and conflict",
    [
      "they were on different continents",
      "they never met",
      "they spoke the same language",
    ],
    "Rivers carry goods and ideas.",
    true,
  ],
  [
    "Rabbinic Judaism grew after 70 CE by focusing on…",
    "study, prayer and community instead of temple sacrifice",
    ["building a new empire", "worshipping many gods", "moving to China only"],
    "Learning kept the faith alive.",
    true,
  ],
  [
    "The Hebrew prophets taught that people should…",
    "act with justice and care for the poor",
    ["build bigger pyramids", "obey only kings", "avoid all rules"],
    "Prophets called for fairness.",
    true,
  ],
  [
    "Where did the early Israelites settle?",
    "Canaan, along the eastern Mediterranean",
    ["the Indus Valley", "the Huang He Valley", "Gaul"],
    "Canaan is today's Israel and nearby lands.",
    true,
  ],
];

// Copies of Washington's Grade 6 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON], id);

export const SOCIAL_6: Unit[] = [
  copyOf(K("wa-g6-greece-rome"), {
    id: "ca-g6-greece-rome",
    title: "Greece & Rome",
    emoji: "🏛️",
    blurb: "Democracy, republic and law",
    parentNote:
      "Athens and Sparta, direct and representative democracy, the Roman Republic and Empire, and the Greek and Roman ideas found in US government.",
    standards: [
      "6.4.2; 6.4.3; 6.4.6; 6.7.1; 6.7.2",
      "early democracy in Greece, Athens and Sparta, and the Roman Republic and its influence on the US",
    ],
  }),
  bankUnit({
    id: "ca-g6-hebrews-kush",
    title: "Ancient Israel & Kush",
    emoji: "📜",
    blurb: "The early Hebrews and the kingdom of Kush",
    parentNote:
      "The origins and central teachings of Judaism, key figures and the Diaspora, how Judaism endured, and the kingdom of Kush on the Nile: its iron, trade, pyramids and rule over Egypt. Religions are described factually and neutrally.",
    standards: [
      "6.2.8; 6.3.1; 6.3.2; 6.3.3; 6.3.4; 6.3.5",
      "the location and culture of Kush, and the origins, teachings, settlements and survival of Judaism among the ancient Hebrews",
    ],
    items: HEBREWS_KUSH,
  }),
];
