import type { FrItem } from "../../french";

// More Grade 5 Core French sounds and accents practice, appended to SOUNDS in core-french.ts.

const SOUND_HINT = "French spelling follows patterns. Accents change the letter's sound or show the word's history, so they must be written.";
const SILENT_HINT = "Many final letters in French are not pronounced.";

export const SOUNDS_DEEP: FrItem[] = [
  ["Which word has an accent aigu (é)?", "café", ["pain", "jus", "riz"], SOUND_HINT],
  ["Which word has an accent aigu (é)?", "bébé", ["bonbon", "chat", "lune"], SOUND_HINT],
  ["Which word has an accent aigu (é)?", "église", ["maison", "porte", "fleur"], SOUND_HINT],
  ["Which word has an accent grave (è)?", "très", ["trop", "tard", "tout"], SOUND_HINT],
  ["Which word has an accent grave (è)?", "frère", ["frais", "franc", "fruit"], SOUND_HINT],
  ["Which word has an accent circonflexe (ê, â, ô)?", "fête", ["fait", "faim", "fin"], SOUND_HINT],
  ["Which word has an accent circonflexe (ê, â, ô)?", "château", ["chapeau", "chaise", "chocolat"], SOUND_HINT],
  ["Which word has an accent circonflexe (ê, â, ô)?", "hôtel", ["hiver", "hibou", "herbe"], SOUND_HINT],
  ["Which word has a cédille (ç)?", "façon", ["fait", "fort", "faim"], SOUND_HINT],
  ["Which word has a cédille (ç)?", "reçu", ["rue", "roue", "rire"], SOUND_HINT],
  ["Which word has a nasal vowel, like the “an” in “enfant”?", "vent", ["vert", "vite", "vélo"], SOUND_HINT],
  ["Which word has a nasal vowel, like the “in” in “matin”?", "pain", ["pas", "pot", "pied"], SOUND_HINT],
  ["Which word has a nasal vowel, like the “on” in “bon”?", "monde", ["mode", "mule", "mare"], SOUND_HINT],
  ["In “trop”, the final “p” is usually…", "silent", ["pronounced like “p”", "pronounced like “b”"], SILENT_HINT],
  ["In “beaucoup”, the final “p” is usually…", "silent", ["pronounced like “p”", "pronounced like “b”"], SILENT_HINT],
  ["In “chaud”, the final “d” is usually…", "silent", ["pronounced like “d”", "pronounced like “t”"], SILENT_HINT],
  ["In “hôtel”, the letter “h” is…", "silent", ["pronounced like the h in “hat”", "pronounced like “k”"], "In French the letter h is almost always silent."],
  ["In “beau”, the letters “eau” sound like…", "oh (as in go)", ["ow (as in cow)", "ee (as in see)"], SOUND_HINT],
  ["In “loup”, the letters “ou” sound like…", "oo (as in food)", ["ow (as in cow)", "oh (as in go)"], SOUND_HINT],
  ["In “quatre”, the letters “qu” sound like…", "k (as in kite)", ["kw (as in queen)", "ch (as in chair)"], "In French, “qu” makes a k sound."],
  ["In “montagne”, the letters “gn” sound like…", "ny (as in canyon)", ["g (as in go)", "n (as in no)"], SOUND_HINT],
  ["In “chien”, the letters “ch” sound like…", "sh (as in ship)", ["k (as in kite)", "ch (as in chair)"], SOUND_HINT],
  ["In “jour”, the letter “j” sounds like…", "the s in “measure”", ["the j in “jump”", "the y in “yes”"], SOUND_HINT],
  ["Which spelling is correct?", "château", ["chateau", "châtaeu", "chäteau"], SOUND_HINT],
  ["Which spelling is correct?", "café", ["cafe", "cafè", "câfé"], SOUND_HINT],
  ["Which spelling is correct?", "garçon", ["garcon", "garçón", "gargon"], SOUND_HINT],
  ["Which spelling is correct?", "frère", ["frere", "frére", "frêre"], SOUND_HINT],
  ["Which spelling is correct?", "fête", ["fete", "féte", "fète"], SOUND_HINT],
  ["Which spelling is correct?", "déjà", ["deja", "déja", "dejà"], SOUND_HINT],
];
