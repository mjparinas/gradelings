import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 2 social studies: the fall of Rome, the Middle Ages and the Renaissance (2.SS.3, 2.SS.4), and the
// growing nation from George Washington's presidency to the Civil War (2.SS.7 to 2.SS.11), with Lewis and Clark on the
// Missouri River.

const MIDDLE_AGES: Q[] = [
  ["After the Roman Empire in the West fell, Europe entered a time called the…", "Middle Ages", ["Stone Age", "Space Age", "Ice Age"], "It came between ancient times and modern times."],
  ["In the Middle Ages, a lord often lived in a big stone…", "castle", ["skyscraper", "tipi", "pyramid"], "Thick walls kept people safe."],
  ["A soldier on horseback who served a lord was a…", "knight", ["pharaoh", "senator", "pilot"], "Knights wore armor."],
  ["Farmers who worked a lord's land and could not leave it were…", "serfs", ["kings", "knights", "pirates"], "They gave part of their crops to the lord."],
  ["Charlemagne was a great king who ruled much of…", "Europe", ["China", "North America", "Australia"], "He was crowned emperor in the year 800."],
  ["In 1215, English nobles made King John agree to the…", "Magna Carta", ["Mayflower Compact", "Declaration of Independence", "Bill of Rights"], "It said even the king must obey the law."],
  ["The Magna Carta showed that even a king must follow the…", "law", ["weather", "moon", "river"], "No one is above the law."],
  ["Monks in the Middle Ages copied books…", "by hand", ["on computers", "with printers", "on phones"], "It took a very long time."],
  ["A terrible sickness that spread across Europe in the 1300s was the…", "Black Death", ["common cold", "Dust Bowl", "Gold Rush"], "Fleas on rats spread it."],
  ["Big churches with tall towers and colored windows were…", "cathedrals", ["igloos", "pyramids", "earth lodges"], "Some took 100 years to build."],
  ["Knights traveled far to fight in the…", "Crusades", ["Olympics", "Civil War", "Gold Rush"], "They went to the land around Jerusalem."],
  ["Johannes Gutenberg built a machine that printed…", "books", ["money", "cars", "pictures on phones"], "It was the printing press."],
  ["The printing press made books…", "cheaper and easier to get", ["more costly", "harder to read", "disappear"], "More people could learn to read."],
  ["The Renaissance was a time of new art and…", "learning", ["sleeping", "forgetting", "darkness"], "Renaissance means rebirth."],
  ["Leonardo da Vinci painted the…", "Mona Lisa", ["Statue of Liberty", "Liberty Bell", "Mount Rushmore"], "She has a famous smile."],
  ["Michelangelo painted the ceiling of the Sistine…", "Chapel", ["Castle", "Barn", "Pyramid"], "He lay on his back to paint it."],
  ["The Renaissance began in the country we now call…", "Italy", ["China", "Egypt", "Mexico"], "Florence was a center of art.", true],
  ["A lord gave land to a knight. In return the knight promised to…", "fight for the lord", ["pay no taxes", "leave the land", "build a pyramid"], "This system is called feudalism.", true],
  ["The Byzantine Empire kept Roman ways alive in the East. Its capital was…", "Constantinople", ["Rome", "Paris", "London"], "Today the city is Istanbul.", true],
  ["Why did the Black Death spread so fast?", "crowded towns and fleas on rats", ["cold weather", "too much sunshine", "printing presses"], "Towns were dirty and crowded.", true],
  ["Why were castles built on hills?", "it was easier to see and stop attackers", ["it was warmer there", "for the view of the sea", "to be near farms"], "High ground is easier to defend.", true],
  ["Before the printing press, most books in Europe were made by…", "monks copying by hand", ["machines", "children", "knights"], "Each book took months.", true],
  ["A craft worker like a baker or blacksmith often belonged to a…", "guild", ["castle", "crusade", "senate"], "Guilds set rules for each trade.", true],
  ["Which idea from the Magna Carta is part of America today?", "leaders must follow the law too", ["kings rule forever", "only knights can vote", "there are no laws"], "This is the rule of law.", true],
];

const GROWING_NATION: Q[] = [
  ["The first president of the United States was…", "George Washington", ["Abraham Lincoln", "Thomas Jefferson", "Andrew Jackson"], "He led the army in the Revolution."],
  ["In 1803, President Jefferson bought a huge land called the Louisiana…", "Purchase", ["Trail", "Canal", "Railroad"], "It doubled the size of the country."],
  ["The land South Dakota is on became part of the United States with the…", "Louisiana Purchase", ["Mayflower Compact", "Gold Rush", "Civil War"], "It was bought from France."],
  ["Meriwether Lewis and William Clark led a group called the Corps of…", "Discovery", ["Engineers", "Pilgrims", "Knights"], "They explored the new land."],
  ["Lewis and Clark traveled through South Dakota on the…", "Missouri River", ["Nile River", "Atlantic Ocean", "Gulf of Mexico"], "They paddled boats upstream in 1804."],
  ["Sacagawea, a Lemhi Shoshone woman, helped Lewis and Clark by…", "guiding and translating", ["building a fort", "drawing money", "painting"], "She knew the land and languages."],
  ["In the War of 1812, the United States fought…", "Great Britain", ["France", "Mexico", "Spain"], "It was a second war with Britain."],
  ["Francis Scott Key wrote a poem that became our national anthem, \"The Star-Spangled…\"", "Banner", ["Prairie", "River", "Mountain"], "He watched a battle at Fort McHenry."],
  ["Andrew Jackson was a general and later a…", "president", ["king", "pharaoh", "knight"], "He won the Battle of New Orleans."],
  ["Traders and mountain men traveled west to trade for…", "furs", ["cars", "computers", "phones"], "Beaver furs were made into hats."],
  ["In 1838, the Cherokee people were forced to walk far from their homes. This was the Trail of…", "Tears", ["Gold", "Joy", "Lights"], "Thousands of people died."],
  ["Frederick Douglass escaped slavery and spoke out to…", "end slavery", ["start a war", "sell land", "become king"], "He was a great speaker and writer."],
  ["Harriet Tubman led people to freedom on the Underground…", "Railroad", ["River", "Highway", "Bridge"], "It was a secret network of safe houses."],
  ["Abraham Lincoln was president during the…", "Civil War", ["Revolution", "War of 1812", "Middle Ages"], "The North and South fought."],
  ["The Civil War was fought between the North and the…", "South", ["West", "ocean", "moon"], "It lasted from 1861 to 1865."],
  ["President Lincoln's Emancipation Proclamation said enslaved people in the Confederacy were…", "free", ["soldiers", "kings", "farmers"], "It was issued in 1863."],
  ["Frederick Douglass taught himself to…", "read and write", ["fly", "build ships", "paint"], "Reading helped him seek freedom.", true],
  ["People who worked to end slavery were called…", "abolitionists", ["pioneers", "senators", "knights"], "Abolish means to end.", true],
  ["After the Civil War, rebuilding the South was called…", "Reconstruction", ["the Renaissance", "the Gold Rush", "the Crusades"], "New amendments protected freedom.", true],
  ["The 13th Amendment to the Constitution ended…", "slavery", ["taxes", "voting", "schools"], "It was passed in 1865.", true],
  ["In 1848, women met at Seneca Falls to ask for the right to…", "vote", ["drive", "fly", "own horses"], "Elizabeth Cady Stanton helped lead them.", true],
  ["Lewis and Clark met the Yankton and the Lakota peoples along the river in South Dakota in…", "1804", ["1492", "1776", "1889"], "It was the first year of the trip.", true],
  ["Why was the Louisiana Purchase important?", "it doubled the size of the country", ["it ended the Civil War", "it made a new king", "it started the Revolution"], "It reached from the Mississippi to the Rockies.", true],
  ["George Washington stepped down after two terms. This showed that a president…", "should not rule forever", ["must be a king", "can never leave", "picks the next one"], "Later presidents followed his example.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "sd-g2-middle-ages",
    title: "Castles, Knights & the Renaissance",
    emoji: "🏰",
    blurb: "The Middle Ages and the Renaissance",
    parentNote:
      "The fall of Rome in the West and life in the Middle Ages (castles, knights, serfs and lords, Charlemagne, monks, cathedrals, the Crusades and the Black Death), the Magna Carta and the rule of law, and the Renaissance, with Gutenberg's printing press, Leonardo da Vinci and Michelangelo.",
    standards: ["2.SS.3; 2.SS.4", "the fall of Rome and the Middle Ages, and the Late Middle Ages and the Renaissance"],
    items: MIDDLE_AGES,
  }),
  bankUnit({
    id: "sd-g2-growing-nation",
    title: "A Growing Nation",
    emoji: "🧭",
    blurb: "From Washington and Lewis and Clark to Lincoln",
    parentNote:
      "The early United States: George Washington's presidency, the Louisiana Purchase and Lewis and Clark's journey up the Missouri River through South Dakota, the War of 1812 and the national anthem, Andrew Jackson and the Trail of Tears, Frederick Douglass, Harriet Tubman and the abolitionists, women's suffrage at Seneca Falls, and Abraham Lincoln, the Civil War and Reconstruction.",
    standards: ["2.SS.7; 2.SS.8; 2.SS.9; 2.SS.11", "the early United States, the War of 1812 and Andrew Jackson, westward expansion and abolition, and the Civil War and Reconstruction"],
    items: GROWING_NATION,
  }),
];
