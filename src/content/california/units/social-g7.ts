import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { OWN_SOCIAL_7 as OREGON } from "../../oregon/units/social-g67";

// California social studies, Grade 7: medieval and early modern times. Washington's and Oregon's units are copied
// without their state's places or their Tribal items, with California items added; California's own units fill the
// rest. Content about American Indian nations is light and in the present tense, and religions are described factually
// and neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 7

const ROME_BYZANTIUM: Q[] = [
  [
    "At its height, around 117 CE, the Roman Empire circled the…",
    "Mediterranean Sea",
    ["Pacific Ocean", "Baltic Sea", "Indian Ocean"],
    "Romans called it 'our sea'.",
  ],
  [
    "Roman law influenced later legal systems with the idea that…",
    "people are innocent until proven guilty",
    ["kings make all rules", "laws are secret", "there are no courts"],
    "Many countries still use Roman legal ideas.",
  ],
  [
    "Latin, the language of Rome, is the root of…",
    "Spanish, French, Italian and Portuguese",
    ["Chinese", "Arabic", "Swahili"],
    "These are Romance languages.",
  ],
  [
    "Roman engineers built aqueducts to…",
    "carry water to cities",
    ["store grain", "launch ships", "build pyramids"],
    "Some still stand today.",
  ],
  [
    "The Pax Romana was…",
    "about 200 years of relative peace in the empire",
    ["a Roman war", "a kind of coin", "a Roman temple"],
    "Pax means peace.",
  ],
  [
    "Which was a reason the Western Roman Empire weakened?",
    "civil wars, high taxes and invasions",
    ["too much peace", "no army at all", "it was too small"],
    "Many problems added up.",
  ],
  [
    "Emperor Diocletian divided the empire into…",
    "eastern and western parts",
    ["ten kingdoms", "city-states", "two continents"],
    "It was too big to rule from one place.",
  ],
  [
    "Emperor Constantine moved the capital to…",
    "Constantinople",
    ["Athens", "Paris", "Alexandria"],
    "Today it is Istanbul.",
  ],
  [
    "Constantine was the first Roman emperor to…",
    "become a Christian",
    ["visit China", "build the Colosseum", "conquer Britain"],
    "He ended the persecution of Christians.",
  ],
  [
    "The Western Roman Empire fell in…",
    "476 CE",
    ["1453 CE", "44 BCE", "1066 CE"],
    "A Germanic leader removed the last emperor.",
  ],
  [
    "The Eastern Roman Empire lasted about a thousand more years as the…",
    "Byzantine Empire",
    ["Mongol Empire", "Mughal Empire", "Inca Empire"],
    "It fell in 1453.",
  ],
  [
    "Emperor Justinian is known for a law code that…",
    "organized Roman law",
    ["banned writing", "ended the empire", "started the Olympics"],
    "It is Justinian's Code.",
  ],
  [
    "The Hagia Sophia, a huge domed church, was built in…",
    "Constantinople",
    ["Rome", "Jerusalem", "Venice"],
    "Justinian ordered it built.",
  ],
  [
    "Empress Theodora helped rule the Byzantine Empire with…",
    "Justinian",
    ["Constantine", "Augustus", "Charlemagne"],
    "She was a strong adviser.",
  ],
  [
    "The Christian church split in 1054 into the Roman Catholic Church and the…",
    "Eastern Orthodox Church",
    ["Protestant Church", "Coptic Church only", "Anglican Church"],
    "This is called the Great Schism.",
  ],
  [
    "The leader of the Roman Catholic Church is the…",
    "pope",
    ["patriarch of Constantinople", "caliph", "emperor"],
    "The pope was based in Rome.",
  ],
  [
    "Byzantine churches are famous for…",
    "mosaics and icons",
    ["skyscrapers", "pyramids", "totem poles"],
    "Mosaics are made of small tiles.",
  ],
  [
    "Constantinople was well placed for trade because it sat between…",
    "Europe and Asia",
    ["Africa and Australia", "two deserts", "North and South America"],
    "It controlled sea routes.",
  ],
  [
    "The Byzantine Empire ended when the Ottoman Turks captured Constantinople in…",
    "1453",
    ["476", "1066", "1776"],
    "The city became Istanbul.",
  ],
  [
    "The Romans built a network of…",
    "paved roads across the empire",
    ["railroads", "canals to China", "airfields"],
    "All roads led to Rome.",
    true,
  ],
  [
    "Why did invaders such as the Visigoths enter the empire?",
    "they were pushed by the Huns and sought land",
    [
      "they were invited as tourists",
      "they wanted to learn Latin only",
      "the empire was empty",
    ],
    "Migration added pressure on the borders.",
    true,
  ],
  [
    "In 410 CE, the Visigoths…",
    "sacked the city of Rome",
    ["built Constantinople", "wrote the Code", "founded Athens"],
    "It shocked the Roman world.",
    true,
  ],
  [
    "Inflation in the late empire meant…",
    "money bought less and less",
    ["prices fell", "coins were made of more gold", "taxes ended"],
    "Rulers put less silver in coins.",
    true,
  ],
  [
    "Byzantine scholars helped keep alive…",
    "ancient Greek and Roman writings",
    ["Maya codices", "Chinese poems only", "Viking sagas"],
    "They copied old books.",
    true,
  ],
  [
    "The Eastern Orthodox Church used which language in its services?",
    "Greek",
    ["Latin only", "Arabic", "English"],
    "Greek was spoken in the East.",
    true,
  ],
  [
    "How did Rome's size make it hard to govern?",
    "news and armies took months to cross it",
    ["it had no borders", "it had too few people", "everyone spoke Chinese"],
    "Distance slowed communication.",
    true,
  ],
];

const SCIENCE_ENLIGHTENMENT: Q[] = [
  [
    "Nicolaus Copernicus argued that…",
    "Earth and the planets move around the Sun",
    [
      "the Sun moves around Earth",
      "Earth is flat",
      "stars are holes in the sky",
    ],
    "This is the heliocentric model.",
  ],
  [
    "Galileo Galilei used a telescope to see…",
    "moons orbiting Jupiter",
    ["atoms", "germs", "radio waves"],
    "It supported Copernicus.",
  ],
  [
    "Johannes Kepler showed that planets travel in…",
    "ellipses, or ovals",
    ["perfect squares", "straight lines", "zigzags"],
    "Kepler studied Mars's orbit.",
  ],
  [
    "Isaac Newton explained the motion of planets with the law of…",
    "universal gravitation",
    ["supply and demand", "the Ten Commandments", "the Magna Carta"],
    "Gravity pulls on everything.",
  ],
  [
    "The scientific method relies on…",
    "observation, experiments and evidence",
    ["guesses only", "old books only", "majority vote"],
    "Test ideas with experiments.",
  ],
  [
    "Francis Bacon urged scientists to…",
    "learn from careful observation and experiment",
    [
      "accept ancient ideas without question",
      "stop asking questions",
      "rely on dreams",
    ],
    "He promoted inductive reasoning.",
  ],
  [
    "René Descartes is known for the phrase…",
    '"I think, therefore I am"',
    ['"Veni, vidi, vici"', '"Give me liberty"', '"E pluribus unum"'],
    "He valued reason and doubt.",
  ],
  [
    "The microscope helped scientists discover…",
    "cells and tiny living things",
    ["planets", "continents", "comets"],
    "Anton van Leeuwenhoek saw microbes.",
  ],
  [
    "Roots of the Scientific Revolution included…",
    "Greek reasoning and Muslim, Jewish and Christian scholarship",
    ["only modern computers", "the Inca road system", "no earlier ideas"],
    "Scholars built on older knowledge.",
  ],
  [
    "Why did Galileo face a trial in 1633?",
    "his support for a Sun-centered universe conflicted with church teaching",
    ["he stole a telescope", "he refused to pay taxes", "he started a war"],
    "He was put under house arrest.",
  ],
  [
    "The Enlightenment was a movement that valued…",
    "reason and individual rights",
    ["rule by force", "superstition", "ending education"],
    "It is also called the Age of Reason.",
  ],
  [
    "John Locke wrote that people have natural rights to…",
    "life, liberty and property",
    ["kingship", "free land in Asia", "no rights at all"],
    "Governments should protect them.",
  ],
  [
    "Montesquieu argued that government power should be…",
    "separated into branches",
    ["held by one person", "given to the church", "kept secret"],
    "This prevents abuse of power.",
  ],
  [
    "Voltaire is known for defending…",
    "freedom of speech and religion",
    ["absolute kings", "censorship", "the feudal system"],
    "He wrote with sharp wit.",
  ],
  [
    "Jean-Jacques Rousseau wrote about the social contract, the idea that…",
    "government rests on the will of the people",
    [
      "kings rule by birth only",
      "people have no say",
      "laws come from the stars",
    ],
    "People agree to be governed.",
  ],
  [
    "Enlightenment ideas grew from the Renaissance and the…",
    "Scientific Revolution",
    ["Stone Age", "Ice Age", "Bronze Age"],
    "Reason was applied to society.",
  ],
  [
    "The Magna Carta (1215) limited the power of…",
    "the English king",
    ["the pope", "Parliament", "the Roman emperor"],
    "Nobles forced King John to sign it.",
  ],
  [
    "The English Bill of Rights (1689) said the monarch could not…",
    "raise taxes or an army without Parliament",
    ["live in London", "speak English", "own a horse"],
    "Parliament gained power.",
  ],
  [
    "Which American document reflects Locke's ideas about natural rights?",
    "the Declaration of Independence",
    ["the Treaty of Paris", "the Monroe Doctrine", "a royal decree"],
    '"Life, liberty and the pursuit of happiness."',
  ],
  [
    "Mary Wollstonecraft argued that women…",
    "deserved equal education",
    ["should not read", "had no rights", "should rule alone"],
    "She wrote in 1792.",
    true,
  ],
  [
    "Why did the printing press help spread Enlightenment ideas?",
    "books and pamphlets could be made quickly and cheaply",
    ["it made books more rare", "it banned new ideas", "it only printed maps"],
    "Ideas traveled faster.",
    true,
  ],
  [
    "Salons in Paris were places where…",
    "thinkers met to discuss new ideas",
    ["soldiers trained", "kings were crowned", "ships were built"],
    "Many were hosted by women.",
    true,
  ],
  [
    "Enlightenment thinkers influenced which revolutions?",
    "the American and French Revolutions",
    [
      "the Stone Age and Iron Age",
      "the Agricultural Revolution only",
      "the Gold Rush",
    ],
    "Ideas of rights and consent spread.",
    true,
  ],
  [
    "Newton's 1687 book on motion and gravity is called the…",
    "Principia",
    ["Iliad", "Torah", "Prince"],
    "Its full name is in Latin.",
    true,
  ],
  [
    "How did the Scientific Revolution change how people saw authority?",
    "people began to test claims with evidence instead of only trusting tradition",
    [
      "people stopped thinking",
      "kings gained more power",
      "science was banned",
    ],
    "Evidence became the test.",
    true,
  ],
  [
    "Which idea from the Enlightenment is in the US Constitution?",
    "checks and balances among branches",
    ["rule by divine right", "a single all-powerful king", "no written laws"],
    "It came from Montesquieu.",
    true,
  ],
];

// Copies of Oregon's Grade 7 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...OREGON], id);

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ca-g7-rome-byzantium",
    title: "Rome's Fall & Byzantium",
    emoji: "🏺",
    blurb: "From Rome to Constantinople",
    parentNote:
      "Rome's lasting contributions, why the Western Empire fell, Constantine and Constantinople, Justinian and the Byzantine Empire, and the split between the Roman Catholic and Eastern Orthodox churches.",
    standards: [
      "7.1.1; 7.1.2; 7.1.3",
      "Rome's strengths and lasting contributions, the reasons for its decline, and the rise of Constantinople and the Byzantine Empire",
    ],
    items: ROME_BYZANTIUM,
  }),
  copyOf(
    K("or-g7-aztec-inca"),
    {
      id: "ca-g7-aztec-inca",
      title: "Maya, Aztec & Inca",
      emoji: "☀️",
      blurb: "Empires of the Americas",
      parentNote:
        "How the Maya, Aztec (Mexica) and Inca arose, their cities, farming, achievements in mathematics and astronomy, and how the Aztec and Inca empires were defeated by Spain. Maya, Nahua and Quechua peoples are living communities today.",
      standards: [
        "7.7.1; 7.7.2; 7.7.3; 7.7.4; 7.7.5",
        "the geography, societies, rise and fall, arts and achievements of the Maya, Aztec and Inca",
      ],
    },
    [
      [
        "The Maya developed a number system that included…",
        "a symbol for zero",
        ["Roman numerals", "only even numbers", "no numbers above 10"],
        "Few ancient peoples used zero.",
      ],
      [
        "Maya cities such as Tikal were built in the…",
        "rainforests of Central America",
        ["Andes Mountains", "Sahara", "Great Plains"],
        "Tikal is in today's Guatemala.",
      ],
      [
        "The Aztec grew crops on floating gardens called…",
        "chinampas",
        ["terraces", "rice paddies", "oases"],
        "They were built in lake water.",
      ],
      [
        "Today, millions of people in Mexico and Guatemala speak…",
        "Maya languages and Nahuatl",
        ["only Latin", "only English", "Greek"],
        "These languages are living today.",
      ],
    ],
  ),
  copyOf(
    K("or-g7-exploration-and-empire"),
    {
      id: "ca-g7-exploration-and-empire",
      title: "Exploration & Exchange",
      emoji: "🧭",
      blurb: "Voyages, maps and the Columbian Exchange",
      parentNote:
        "The great voyages, the ships and tools that made them possible, mapmaking, the Columbian Exchange and the rise of colonial empires and mercantilism.",
      standards: [
        "7.11.1; 7.11.2; 7.11.3",
        "the great voyages and cartography, the exchanges among Europe, Africa, Asia and the Americas, and the origins of modern capitalism",
      ],
    },
    [
      [
        "Vasco da Gama was the first European to reach India by sailing around…",
        "Africa",
        ["South America", "Australia", "Asia"],
        "He reached India in 1498.",
      ],
      [
        "The Mercator map projection helped sailors because…",
        "it kept compass directions straight",
        ["it showed true sizes", "it was round", "it had no lines"],
        "It made navigation easier.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g7-science-enlightenment",
    title: "Science & the Enlightenment",
    emoji: "🔭",
    blurb: "New ideas about nature and government",
    parentNote:
      "Copernicus, Galileo, Kepler and Newton, the scientific method, the roots of the Scientific Revolution, and the Enlightenment thinkers whose ideas about rights and government shaped the American founding.",
    standards: [
      "7.10.1; 7.10.2; 7.10.3; 7.11.4; 7.11.5; 7.11.6",
      "the roots and theories of the Scientific Revolution, the scientific method, and how Enlightenment ideas and the Magna Carta shaped democratic thought",
    ],
    items: SCIENCE_ENLIGHTENMENT,
  }),
];
