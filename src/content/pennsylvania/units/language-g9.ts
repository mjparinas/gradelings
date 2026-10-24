import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { EXTRA } from "./language-extra-g9";

// Pennsylvania's own Grade 9 English language arts units (`pa-` ids). They practice PA Core reading standards the shared
// units leave out: the roles of authors, poems and their parts, arguments and how authors support them, and comparing
// texts. The passages and poems are original. Reading only; writing, speaking and research standards need free work.

const EPIC: Q[] = [
  ["An epic is…", "a long narrative poem about heroic deeds", ["a short poem about nature", "a funny five-line poem", "a list of facts"], "Epics tell grand stories."],
  ["The Iliad and the Odyssey are attributed to…", "Homer", ["Shakespeare", "Aesop", "Virgil"], "Homer is the ancient Greek poet."],
  ["An epic hero is usually…", "a figure of great strength or skill who stands for a people’s values", ["an ordinary person with no goals", "a villain", "a side character"], "Epic heroes represent ideals."],
  ["An invocation in an epic is…", "a call for help from a muse or god at the start", ["the last line", "a villain’s speech", "a title"], "The poet asks for inspiration."],
  ["“In medias res” means an epic begins…", "in the middle of the action", ["at the end", "with a map", "with a title page"], "Latin for “in the middle of things.”"],
  ["An epithet is…", "a descriptive phrase for a person, like “swift-footed Achilles”", ["a kind of rhyme", "a page number", "a poem’s last line"], "It describes a character repeatedly."],
  ["An epic simile is…", "a long comparison that extends over several lines", ["a one-word comparison", "a rhyme", "a title"], "It is detailed and extended."],
  ["A catalog in an epic is…", "a long list, such as of ships or warriors", ["a store ad", "a stanza of rhyme", "a map"], "Epics sometimes list many names."],
  ["Hubris is…", "excessive pride that leads to downfall", ["great kindness", "quiet courage", "a kind of rhyme"], "Pride before a fall."],
  ["Fate in an epic means…", "events that are destined to happen", ["a character’s choice only", "a kind of rhyme", "the setting"], "Fate limits choices."],
  ["Many epics feature a journey. Why?", "it tests the hero’s character and brings change", ["to lengthen the poem", "to avoid conflict", "to rhyme"], "Journeys reveal who heroes are."],
  ["In the Odyssey, Odysseus tries to return home from the Trojan War. The central struggle is…", "getting home to his family", ["finding treasure", "building a city", "learning to read"], "Homecoming is the goal."],
  ["Odysseus is known for his…", "cleverness", ["strength only", "rudeness", "silence"], "He wins by cunning."],
  ["The Trojan horse was a trick that…", "hid soldiers inside a wooden horse", ["was a boat", "was a poem", "was a map"], "It was a clever plan.", true],
  ["Achilles’ anger in the Iliad shows the theme of…", "the cost of rage and pride", ["the joy of farming", "the beauty of music", "the value of silence"], "His anger causes harm.", true],
  ["A shared theme of many epics is…", "the struggle between duty and personal desire", ["how to cook", "how to farm", "how to count"], "Heroes face tough choices.", true],
  ["The Epic of Gilgamesh, from ancient Mesopotamia, is about a king who…", "seeks meaning after losing a friend", ["builds a ship for sport", "writes a dictionary", "sails to Rome"], "It explores friendship and mortality.", true],
  ["Beowulf, an Old English epic, features a hero who fights…", "a monster named Grendel", ["a giant spider", "a ghost ship", "a talking wolf"], "Grendel attacks the hall.", true],
  ["Aeneas, in Virgil’s Aeneid, leaves a burning city to…", "found a new home for his people", ["start a farm", "write a poem", "hide in a cave"], "He founds the line that becomes Rome.", true],
  ["An epic structure often includes…", "a quest, a descent into darkness, and a return", ["only a rhyme scheme", "only dialogue", "a recipe"], "These stages are common."],
  ["Epics were first…", "told aloud before being written down", ["printed on screens", "invented as comics", "written as email"], "They were oral poetry."],
  ["Repeated phrases in oral epics help…", "poets remember and audiences follow the story", ["hide the plot", "shorten it", "avoid theme"], "Repetition aids memory.", true],
  ["Which character is a typical epic villain or obstacle?", "a monster or hostile god", ["a baker", "a student", "a postal worker"], "Epics feature monstrous foes."],
  ["Which line sounds like an epic invocation?", "Sing to me, Muse, of the man of many turns.", ["I went to the store.", "My cat is orange.", "The bus is late."], "It calls on a muse.", true],
  ["An epic usually has a setting that is…", "large in scale, spanning lands and seas", ["one small room", "one hour", "a single desk"], "Epic scope is grand."],
];

const OPPOSING: Q[] = [
  ["Two opposing arguments on the same topic…", "take different positions", ["agree entirely", "are both poems", "have no claims"], "Opposing means opposite."],
  ["To compare two arguments, a reader first finds…", "each argument’s claim", ["the page count", "the cover", "the font"], "Start with claims."],
  ["Argument A: “Schools should require uniforms.” Argument B: “Schools should let students choose clothes.” The topic is…", "school dress codes", ["school lunches", "school buses", "school books"], "Both argue about clothing."],
  ["A valid argument has…", "reasoning that follows from its evidence", ["strong feelings only", "a long introduction", "a catchy title"], "Validity means logical sense."],
  ["An effective argument has…", "convincing evidence and clear reasoning", ["many exclamation marks", "only opinions", "no claim"], "Effectiveness is persuasive power."],
  ["Writer A cites a national study. Writer B cites her own experience. Which evidence is generally stronger?", "the national study", ["her own experience", "neither", "both are equal always"], "Broader data is generally stronger.", true],
  ["Writer A uses only emotional stories. Writer B uses data and examples. Which is more convincing for a skeptical reader?", "Writer B", ["Writer A", "neither", "both equally"], "Evidence matters.", true],
  ["An argument that ignores the other side is…", "less balanced", ["more balanced", "a poem", "a fact"], "Good arguments address opposing views."],
  ["A strong argument addresses counterclaims by…", "explaining why they are weaker", ["ignoring them", "agreeing completely", "changing the topic"], "A rebuttal answers the other side."],
  ["A claim built on a “false choice” (only two options when more exist) is…", "flawed", ["strong", "unbiased", "a rhyme"], "Real issues often have more options.", true],
  ["A statement that attacks the person, not the argument, is an…", "ad hominem fallacy", ["analogy", "claim", "rebuttal"], "It attacks the speaker.", true],
  ["“If we ban one snack, soon we’ll ban all food.” This is a…", "slippery slope fallacy", ["valid claim", "statistic", "analogy"], "It assumes an extreme chain of events.", true],
  ["“Everyone believes it, so it’s true.” This is a…", "bandwagon fallacy", ["strong proof", "fact", "claim"], "Popularity is not proof.", true],
  ["Evidence from a source with a financial interest in the outcome should be…", "checked carefully for bias", ["trusted completely", "ignored entirely", "memorized"], "Bias can affect evidence.", true],
  ["To evaluate a claim, a reader asks…", "Is it supported by relevant, accurate evidence?", ["Is it long?", "Is it loud?", "Is it first?"], "Check support."],
  ["Two arguments about energy both use statistics, but from different years. A reader should…", "check which data is recent and reliable", ["ignore both", "choose the longer", "choose the older"], "Data quality matters.", true],
  ["Which pair of claims are opposing?", "“Homework helps learning.” / “Homework does not help learning.”", ["“Homework is due.” / “Tests are Friday.”", "“Math is hard.” / “Math has numbers.”", "“It is sunny.” / “It is warm.”"], "They contradict each other."],
  ["Which pair shows a shared claim?", "“Exercise is healthy.” / “Daily walks improve health.”", ["“School is free.” / “School is not free.”", "“Cats are best.” / “Dogs are best.”", "“Vote yes.” / “Vote no.”"], "They agree.", true],
  ["When comparing the development of two arguments, a reader looks at…", "how each builds claims with reasons and evidence", ["which has bigger headings", "which is longer", "which is printed first"], "Track the building of each argument."],
  ["A rebuttal paragraph usually…", "answers a counterclaim with reasons and evidence", ["repeats the title", "lists page numbers", "changes the subject"], "It pushes back."],
  ["Writers should avoid emotional appeals that…", "replace evidence entirely", ["support evidence", "add examples", "clarify points"], "Emotion should support, not replace, evidence.", true],
  ["A conclusion that introduces a brand-new claim is…", "weak", ["strong", "required", "the best"], "Conclusions sum up."],
  ["Which sentence best shows a balanced view?", "Supporters point to benefits, while critics raise cost concerns.", ["Only fools disagree.", "Everyone knows the answer.", "There is nothing to discuss."], "A balanced view names both sides."],
  ["Which source is likely most credible for an argument about public health?", "a peer-reviewed study", ["an anonymous post", "an ad", "a friend’s opinion"], "Peer review adds reliability."],
  ["After reading two opposing arguments, a careful reader should…", "weigh the evidence before deciding", ["pick the first", "pick the funnier", "stop reading"], "Judge on evidence.", true],
];

const ADAPT: Q[] = [
  ["An adaptation is…", "a new version of an existing story", ["an exact copy", "a dictionary", "a grammar rule"], "It reshapes an original."],
  ["A modern novel retells the Odyssey from Penelope’s point of view. This is an…", "adaptation", ["original myth", "poem of rhyme", "textbook"], "It retells a classic with a new perspective."],
  ["Why might an author adapt a classical myth?", "to explore its ideas in a new setting or from a new view", ["to avoid ideas", "to copy it word for word", "to hide the plot"], "Adaptations offer fresh views."],
  ["A story sets the Greek hero Hercules in a modern high school. The author changes the…", "setting", ["theme completely", "myth’s meaning", "title page"], "Setting is the time and place."],
  ["Which keeps the original myth’s main idea?", "A modern story about a clever traveler trying to get home.", ["A story about baking bread", "A story about a lost phone", "A story about a spelling bee"], "It echoes the Odyssey’s core.", true],
  ["An adaptation can change…", "setting, point of view or characters", ["nothing", "the century only", "the alphabet"], "Authors reshape elements."],
  ["The Greek myth of Icarus warns against…", "ignoring good advice and flying too high", ["running slowly", "swimming", "reading"], "Pride leads to a fall."],
  ["A modern song about someone who ignores advice and “flies too close to the sun” alludes to…", "Icarus", ["Midas", "Zeus", "Athena"], "The sun melted his wings.", true],
  ["Mythical stories explain…", "natural events or human behavior in imaginative ways", ["accounting rules", "street addresses", "weather maps"], "Myths explain the world."],
  ["Adapting a myth for modern readers might include…", "updating language and settings", ["removing the characters", "adding a rhyme only", "making it a recipe"], "Make it fit the audience."],
  ["A story that retells the myth of Persephone to explain the seasons is an…", "adaptation of a myth", ["original recipe", "technical manual", "dictionary"], "The myth explains seasons."],
  ["Which element of the Odyssey might a modern adaptation keep?", "a long journey home", ["a spelling lesson", "a math quiz", "a weather map"], "The quest is central.", true],
  ["Which change gives a classic story a new meaning?", "telling it from a minor character’s point of view", ["printing it in color", "making it longer", "shortening the title"], "A new viewpoint changes meaning.", true],
  ["To compare an original myth with an adaptation, a reader looks at…", "what stays the same and what changes", ["only the covers", "only the lengths", "only the titles"], "Compare and contrast."],
  ["Both a Greek myth and a modern film feature a hero who must choose between duty and love. This shows a…", "universal theme", ["unique setting", "rhyme", "mistake"], "The theme crosses time.", true],
  ["Universal themes are…", "ideas that matter to people across cultures and times", ["only for one place", "only for one age", "only for one book"], "Think love, justice, courage."],
  ["Key elements in a literary text include…", "plot, character, setting, theme and style", ["page numbers only", "the cover only", "font only"], "These elements add meaning."],
  ["An author’s style is shaped by…", "word choice, sentence structure and tone", ["page count", "paper type", "ink color"], "Style is how it is written."],
  ["“The tower clock struck thirteen, and the birds went silent.” The detail “struck thirteen” adds…", "a sense that something is off", ["a rhyme", "a pleasant mood", "a recipe"], "Thirteen is unusual.", true],
  ["A key element that adds meaning in a story is a recurring image, called a…", "motif", ["page", "title", "chapter number"], "A motif repeats.", true],
  ["A recurring storm in a novel appears each time a character faces a hard choice. The storm adds layers of meaning by showing…", "inner turmoil", ["a weather lesson", "a rhyme", "a map"], "The storm mirrors feelings.", true],
  ["An author places a quiet scene right after a battle. This contrast adds…", "emphasis on the cost of the fighting", ["a rhyme scheme", "page numbers", "a joke"], "Contrast adds meaning.", true],
  ["In an adaptation, an author keeps the story’s theme but changes the era. The author is likely showing that the theme is…", "timeless", ["outdated", "unclear", "unimportant"], "It still fits.", true],
  ["Which statement shows an adaptation changing a story’s meaning?", "The retelling lets the villain explain his side.", ["The retelling has the same words.", "The retelling has a cover.", "The retelling has a title."], "A new viewpoint reshapes meaning.", true],
  ["A reader who knows the original myth understands an adaptation better because…", "they can see what the author kept and changed", ["adaptations are always shorter", "originals are boring", "adaptations have no plot"], "Background knowledge helps."],
];

const OWN: Unit[] = [
  bankUnit({
    id: "pa-g9-epic-poetry",
    title: "Epic Poetry",
    emoji: "🏺",
    blurb: "Epic heroes, structures and themes.",
    parentNote:
      "Pennsylvania’s Grade 9–10 standards ask students to analyze how a theme develops over a text and how complex characters develop and advance the plot. Students learn the features of the ancient epics, such as invocations, epithets, epic similes and heroic quests, and the themes they share.",
    standards: ["CC.1.3.9-10.A; CC.1.3.9-10.C", "themes and complex characters, in epic poetry"],
    items: EPIC,
  }),
  bankUnit({
    id: "pa-g9-opposing-arguments",
    title: "Opposing Arguments",
    emoji: "⚔️",
    blurb: "Compare two sides and judge how valid and effective each is.",
    parentNote:
      "Pennsylvania’s Grade 9–10 standards ask students to delineate and evaluate an argument, assessing the validity of reasoning and relevance of evidence, and to analyze how rhetoric advances a point of view. Students name claims, spot fallacies and judge which evidence is stronger.",
    standards: ["CC.1.2.9-10.H; CC.1.2.9-10.D", "evaluating the reasoning and evidence in opposing arguments"],
    items: OPPOSING,
  }),
  bankUnit({
    id: "pa-g9-adaptations-and-key-elements",
    title: "Adaptations & Key Elements",
    emoji: "🎬",
    blurb: "How authors retell classic stories, and how key elements add meaning.",
    parentNote:
      "Pennsylvania’s Grade 9–10 standards ask students to analyze how an author draws on and transforms source material and to analyze a subject in two different artistic mediums. Students compare a classic with a retelling and tell how motifs, contrast and setting add meaning.",
    standards: ["CC.1.3.9-10.H; CC.1.3.9-10.G", "how an author transforms source material, and a subject in two art forms"],
    items: ADAPT,
  }),
];
export const UNITS: Unit[] = [...OWN, ...EXTRA];
/** Put the own units before the planned ones. */
export const FIRST = false;
