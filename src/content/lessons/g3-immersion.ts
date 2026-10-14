import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/verbes-pronominaux": lesson(
    ["Some verbs have an extra little word: « se lever », « se réveiller ».", "The little word matches the subject: « je me », « tu te », « il se », « elle se ».", "With « nous » it is « nous nous »; with « vous » it is « vous vous »."],
    "Complète : Tu ___ lèves à sept heures. (me, te, se)",
    ["The subject is « tu ».", "« tu » goes with « te »."],
    "te",
  ),
  "immersion/et-mais-ou-avec": lesson(
    ["« et » adds another idea: and.", "« mais » shows a surprise or a change: but.", "« ou » gives a choice: or. « avec » means together with someone or something."],
    "Complète : Il est fatigué, ___ il joue encore.",
    ["Being tired and still playing don't match.", "That surprise needs « mais »."],
    "mais",
  ),
  "immersion/ne-pas": lesson(
    ["To say no, put « ne » before the verb and « pas » after it.", "« Je danse » becomes « Je ne danse pas ».", "Before a vowel, « ne » becomes « n' »: « Elle n'aime pas »."],
    "Quel est le contraire de « Ils habitent ici »?",
    ["Put « ne » before « habitent » and « pas » after.", "« habitent » starts with a vowel sound, so « ne » becomes « n' »."],
    "Ils n'habitent pas ici.",
  ),
  "immersion/futur-proche": lesson(
    ["To say what is going to happen, use « aller » + a verb in its base form: « jouer », « dormir », « lire ».", "je vais, tu vas, il va, nous allons, vous allez, ils vont.", "« Je vais jouer » means I am going to play."],
    "Complète : Dans une heure, elles ___ arriver.",
    ["The subject is « elles ».", "With « elles », « aller » is « vont »."],
    "vont",
  ),
  "immersion/pluriels-en-x": lesson(
    ["Most nouns add « -s » in the plural.", "Words ending in « -eau » add « -x »: « des bateaux ».", "Many words in « -al » change to « -aux »: « un cheval, des chevaux ». Some « -ou » words add « -x »: « des choux »."],
    "Un journal, des ___",
    ["« journal » ends in « -al ».", "« -al » becomes « -aux »."],
    "journaux",
  ),
  "immersion/prefixes-et-suffixes": lesson(
    ["A prefix goes at the start of a word and changes its meaning.", "« mal- », « im- » and « in- » often mean not: « impossible » means not possible.", "The suffix « -ette » at the end often means small: « une maisonnette »."],
    "Que veut dire « malheureux »?",
    ["« mal- » means not.", "« heureux » means happy."],
    "pas heureux",
  ),
  "immersion/idee-principale": lesson(
    ["The main idea is what the whole text is about.", "Each detail helps explain the main idea.", "Pick the sentence that covers all the details, not just one."],
    "Les feuilles deviennent rouges. Puis elles tombent. Quelle est l'idée principale?",
    ["Both details are about leaves in fall.", "The main idea covers them both."],
    "En automne, les feuilles changent et tombent.",
  ),
};
