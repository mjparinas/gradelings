import type { Entry } from "../kit";

// Washington social studies, Kindergarten to Grade 4: the units Washington uses from other frameworks, per grade ("<grade>/social").
// Only general units free of Canadian content are used; most Washington topics are in ../units/social-k4-*.ts.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "H2.K.1; H2.K.2; SSS3.K.1", "the factors that shape a child's life and how their actions affect others"],
    ["families", "share", "H2.K.1; H1.K.1", "the people in a child's life and putting events in order over time"],
    ["needs-and-wants", "share", "E1.K.1; E1.K.2", "the difference between needs and wants and why people choose between them"],
    ["places-near-me", "adopt", "G1.K.1; E3.K.1", "places in the community and what they are for"],
    ["fair-and-kind", "adopt", "C1.K.1; C1.K.2; SSS1.K.3", "fairness and kindness in the classroom and on the playground"],
    ["mb-k-jobs-and-rules", "adopt", "C2.K.1; C2.K.2; C4.K.2; C4.K.3", "the purpose of classroom rules, who makes them and good citizenship"],
  ],
  "1/social": [
    ["my-community", "share", "C1.1.3; C4.1.2", "services and helpers in the community and good citizenship"],
    ["our-land", "share", "G2.1.3; G2.1.4", "natural and human-made features and caring for places"],
    ["maps", "share", "G1.1.1", "reading simple maps with symbols and directions"],
    ["changes-in-my-life", "adopt", "H1.1.1; H4.1.1", "putting family and life events in order on a timeline"],
    ["community-services", "adopt", "C1.1.3; E3.1.1; E3.1.2", "services a government provides and public and private providers"],
    ["respect-and-inclusion", "adopt", "C1.1.1; C1.1.2; C4.1.2", "the common good, rights and responsibilities and good citizenship at school"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "E1.2.1; E1.2.3", "community choices among goods and services, with their costs and benefits"],
    ["caring-citizens", "share", "C4.2.1; C4.2.2; C4.2.3", "rights and responsibilities and ways to help the community"],
    ["then-and-now", "adopt", "H1.2.2; H1.2.3; H3.2.2", "putting events in order and comparing life in the past with life today"],
    ["communities-compared", "adopt", "G2.2.1; G3.2.2", "comparing the characteristics of different kinds of communities"],
    ["ns-community-change-2", "adopt", "H1.2.1; H2.2.1", "how communities change over time and how people shape them"],
  ],
  "3/social": [
    ["meeting-needs", "share", "G2.3.1; G2.3.2", "how people in different places meet their needs and how the environment shapes culture"],
    ["mb-global-communities", "adopt", "G2.3.1; G2.3.3; H3.3.1", "how land, climate and culture shape daily life in communities around the world"],
    ["mb-working-together", "adopt", "C1.3.3; C1.3.4; C2.3.4", "deciding together fairly and the benefits and challenges of working together"],
  ],
  // Grade 4 is Washington State, so every unit is written for Washington (../units/social-k4-g4a.ts and g4b.ts).
};
