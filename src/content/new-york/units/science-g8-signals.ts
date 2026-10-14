import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's own Grade 8 science units (`ny-` ids) for two middle school standards no borrowed unit covers: why digital
// signals carry information more reliably than analog ones (MS-PS4-3), placed with Grade 8's waves and light, and how
// similar embryos show relationships between species (MS-LS4-3), placed with Grade 8's heredity, selection and Earth
// history units.

const SIGNALS = bankUnit({
  id: "ny-g8-digital-signals",
  title: "Digital & Analog Signals",
  emoji: "📡",
  blurb: "Smooth waves or 0s and 1s: how information travels.",
  parentNote:
    "Practices the difference between analog signals (smooth, changing waves) and digital signals (separate values such as 0s and 1s), and the evidence that digital signals encode and send information more reliably, from copying music to radio signals from space probes.",
  standards: [
    "MS-PS4-3",
    "digital signals are a more reliable way to encode and send information than analog signals",
  ],
  items: [
    ["An analog signal is…", "a smooth, continuously changing wave", ["a pattern of only 0s and 1s", "a beam of laser light only", "a still picture"], "It changes smoothly."],
    ["A digital signal is made of…", "separate values, such as 0s and 1s", ["one smooth wave", "sound only", "light only"], "Separate steps."],
    ["Computers store information as…", "binary code (0s and 1s)", ["smooth waves", "letters only", "tiny paintings"], "Two symbols."],
    ["A bit is…", "a single 0 or 1", ["eight letters", "a wave", "a pixel's color"], "The smallest piece of digital data."],
    ["Eight bits make one…", "byte", ["kilometer", "pixel", "hertz"], "A common unit of storage."],
    ["Which is an analog recording?", "A vinyl record", ["A music file on a phone", "A text message", "A digital photo"], "The groove copies the wave's shape."],
    ["Which is an example of a digital signal?", "A text message", ["The groove on a vinyl record", "Sound waves from a drum", "A sundial's shadow"], "Sent as 0s and 1s."],
    ["Digital signals are more reliable because a little noise…", "does not change whether a value is read as 0 or 1", ["always destroys them", "makes them louder", "turns them analog"], "Only two choices to tell apart."],
    ["When an analog recording is copied again and again, it…", "picks up noise and loses quality", ["gets clearer each time", "never changes", "turns digital"], "Copies of copies."],
    ["A digital song file copied many times…", "keeps the same quality", ["gets worse each time", "turns into analog", "loses all its sound"], "The 0s and 1s stay the same."],
    ["Fiber-optic cables carry digital signals as…", "pulses of light", ["sound waves", "water", "heat"], "On and off flashes."],
    ["Cell phones send information using…", "radio waves", ["sound waves", "ocean waves", "earthquake waves"], "Electromagnetic waves."],
    ["A microphone changes sound waves into…", "an electrical signal", ["light", "heat", "water"], "Sound becomes electricity."],
    ["Turning an analog sound into a digital file is done by…", "measuring the wave many times a second", ["painting the wave", "melting the wave", "stopping the wave"], "This is called sampling."],
    ["Taking more samples per second when recording sound makes the file…", "closer to the original sound", ["noisier", "shorter", "silent"], "More measurements, more detail."],
    ["Digital photos are made of tiny squares called…", "pixels", ["bytes", "waves", "atoms"], "Zoom in far to see them."],
    ["Which can be compressed to take up less storage space?", "A digital file", ["A painting", "A vinyl record", "A printed book"], "Numbers can be shortened."],
    ["Static on an old AM radio comes from…", "noise mixing into the analog signal", ["too many 0s", "digital compression", "pixels"], "Noise changes the wave."],
    ["Digital signals can carry extra check bits so that…", "errors can be found and fixed", ["files get larger for no reason", "they become analog", "noise gets louder"], "Built-in error checking.", true],
    ["Space probes far from Earth send pictures as digital signals because…", "even a weak signal can still be read as 0s and 1s", ["analog waves travel faster", "digital signals need no energy", "pictures cannot be analog"], "Weak but readable.", true],
    ["How many different values can 3 bits represent?", "8", ["3", "6", "9"], "2 × 2 × 2.", true],
    ["How many different values can 8 bits represent?", "256", ["8", "64", "16"], "2 multiplied by itself 8 times.", true],
    ["A weak analog TV picture looks snowy, but a weak digital signal usually…", "stays clear until it suddenly drops out", ["always looks snowy", "gets louder", "never fails"], "It works or it doesn't.", true],
    ["One drawback of digitizing a sound is that…", "some detail between samples is lost", ["it can never be copied", "it cannot be sent by wire", "it never works in space"], "Sampling skips the in-between.", true],
    ["Morse code, with dots and dashes, is an early example of…", "a code of separate symbols, like a digital signal", ["a smooth analog wave", "a vinyl recording", "a photograph"], "Only two kinds of marks.", true],
  ],
});

const EMBRYOS = bankUnit({
  id: "ny-g8-embryos",
  title: "Clues from Embryos",
  emoji: "🐣",
  blurb: "Similar embryos and body structures show how species are related.",
  parentNote:
    "Practices comparing pictures and descriptions of embryos across species (tails and gill-like folds in fish, chicks and people) and structures with the same origin, like a bat's wing and a human arm, to find relationships that are hard to see in the adult animals.",
  standards: [
    "MS-LS4-3; MS-LS4-2",
    "patterns of similarity in embryos and in body structures that show how species are related",
  ],
  items: [
    ["An embryo is…", "an organism at an early stage of development", ["a fully grown adult", "a fossil", "a kind of cell wall"], "Before birth or hatching."],
    ["Embryologists study…", "how organisms develop before birth or hatching", ["rocks and minerals", "the weather", "stars"], "Embryo plus -ology."],
    ["Early embryos of fish, chickens and humans all have…", "a tail", ["feathers", "fins on the head", "fur"], "Even human embryos."],
    ["Early vertebrate embryos have folds near the throat. In fish, these become…", "gills", ["lungs", "wings", "hair"], "Fish breathe with them."],
    ["In humans, the same throat folds become parts of the…", "ears, jaw and throat", ["feet", "hair", "knees"], "Same start, different result."],
    ["Similar early embryos in different species suggest that they…", "share a common ancestor", ["are the same species", "never had ancestors", "grew in the same place"], "Shared development, shared history."],
    ["Early embryos look very alike in…", "fish, birds and mammals", ["plants and fungi", "rocks and minerals", "bacteria and viruses"], "Animals with backbones."],
    ["As embryos grow, the differences between species…", "become more obvious", ["disappear", "stay hidden forever", "stop all growth"], "Later stages look different."],
    ["Structures with a shared origin, like a bat's wing and a human arm, are…", "homologous structures", ["analogous structures", "vestigial organs", "embryos"], "Same bones, different jobs."],
    ["A whale's flipper and a human hand have…", "similar bones", ["no bones", "the same skin", "the same size"], "Compare the skeletons."],
    ["A reduced part with little use, like the human tailbone, is called…", "vestigial", ["homologous only", "an embryo", "a fossil"], "Left over from ancestors."],
    ["A human embryo's tail later…", "becomes the tailbone", ["becomes a leg", "turns into a fin", "turns into a gill"], "It shrinks as the embryo grows."],
    ["Whale embryos grow small hind limb buds, which suggests whales…", "evolved from ancestors with legs", ["will grow legs later", "are fish", "never had ancestors"], "The buds disappear before birth."],
    ["Embryos can show relationships that are not easy to see in…", "the adult animals", ["the embryos", "early development", "pictures of embryos"], "Adults may look very different."],
    ["Adult barnacles look like clams stuck to rocks, but their larvae look like…", "young shrimp and crabs", ["young fish", "insect eggs", "plant seeds"], "Barnacles are related to crabs."],
    ["At the same early stage, a chicken embryo and a human embryo both have…", "a tail and gill-like folds", ["feathers and a beak", "hair and teeth", "fully formed fingers"], "They look surprisingly alike."],
    ["Scientists line up pictures of embryos at matching stages to look for…", "patterns of similarities", ["differences in color only", "the age of rocks", "weather patterns"], "Compare like with like."],
    ["A bird's wing and a fish's fin grow from similar limb buds. This suggests they…", "share an evolutionary origin", ["have nothing in common", "are both made of feathers", "work the same way in adults"], "Similar beginnings."],
    ["Two species have very different adults but nearly identical early embryos. The best explanation is that they…", "are related through a common ancestor", ["are not related at all", "live in the same place", "eat the same food"], "Development keeps old patterns.", true],
    ["Which pair would you expect to have the most similar embryos?", "A dog and a cat", ["A dog and a fish", "A cat and a frog", "A fish and a bird"], "Closest relatives.", true],
    ["Sea squirt larvae have a stiff rod along the back that adults lose. This links sea squirts to…", "the group that includes animals with backbones", ["plants", "insects", "fungi"], "The rod is like an early backbone.", true],
    ["Baleen whales have tooth buds as embryos, but adults have no teeth. This suggests…", "their ancestors had teeth", ["they will grow teeth later", "whales never had teeth", "they chew with tooth buds"], "Leftover instructions.", true],
    ["Why do scientists compare the embryos of many species, not just two?", "Patterns across many species give stronger evidence", ["Two is always enough", "It is faster", "All embryos are identical"], "More data, better evidence.", true],
    ["An embryo has gill-like folds and a tail. It most likely belongs to…", "an animal with a backbone", ["a plant", "an insect", "a jellyfish"], "Vertebrate embryos share these.", true],
    ["Some snake embryos grow tiny leg buds that stop developing. This is evidence that snakes…", "came from ancestors with legs", ["will grow legs as adults", "are related to plants", "never change over time"], "A leftover pattern.", true],
  ],
});

export const MORE: Unit[] = [SIGNALS, EMBRYOS];
