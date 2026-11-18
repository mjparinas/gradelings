// Public pages about the Android app (/android/ and one short guide each): where to get it, how it works offline, and
// how families and classes use it. The Android app is the same web app opened full screen (docs/ANDROID.md), so every
// claim here is true of the web app too. The Google Play listing's own text sells nothing (docs/PLAY_LISTING.md);
// these are website pages, but they still say only "sign in with your family account" about the app itself.

export const androidPath = {
  hub: () => "/android/",
  post: (slug: string) => `/android/${slug}/`,
};

export type AndroidPost = {
  slug: string;
  title: string;
  /** Shorter titles to fall back on, fullest first. */
  shortTitles: string[];
  description: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const ANDROID_POSTS: AndroidPost[] = [
  {
    slug: "set-up-on-android",
    title: "How to set up Gradelings on an Android phone or tablet",
    shortTitles: ["Set up Gradelings on an Android phone or tablet", "Set up Gradelings on Android"],
    description: "A four-step guide for parents: install the Gradelings Android app from Google Play, sign in with your family account, pick your child and start a first lesson.",
    sections: [
      {
        heading: "Before you start",
        paragraphs: [
          "You need an Android phone or tablet, the Google Play Store and a Gradelings family account. If you have not made an account yet, create one on gradelings.com first: it takes a minute, and you can add your children afterwards.",
        ],
      },
      {
        heading: "Step 1: install the app",
        paragraphs: [
          "Open Google Play on your device and search for Gradelings, or use the Get it on Google Play button on this page. Tap Install. The app is small because it opens the same Gradelings you use in a browser, full screen with no address bar.",
        ],
      },
      {
        heading: "Step 2: sign in with your family account",
        paragraphs: [
          "Open the app and choose Sign in. Use the email and password you made your account with, or Continue with Google if that is how you signed up. Your children, their grades, settings and progress are already there, because they live on your account and not on the device.",
          "If a child's class uses Gradelings, the teacher's login card works here too: the child types the code from the card and sees what the teacher has assigned.",
        ],
      },
      {
        heading: "Step 3: pick a child and start",
        paragraphs: [
          "Choose your child's name on the first screen. Little ones see a calm home screen with big picture buttons; older children see Adventure, practice by subject, games and their trophies. Tap the big button for a first lesson. A wrong answer gets a hint and another try, so a first session is a gentle one.",
        ],
      },
      {
        heading: "Step 4: let it download, then go offline if you like",
        paragraphs: [
          "The first time a grade opens, the app downloads its lessons. After that it works without a connection and catches up when you are back online. Open the app once at home on Wi-Fi before a long car ride or flight so the grade is ready.",
        ],
      },
    ],
  },
  {
    slug: "offline-learning-on-android",
    title: "Learning offline on Android: car rides, flights and cabins",
    shortTitles: ["Learning offline on Android: rides, flights, cabins", "Offline learning on Android"],
    description: "How Gradelings keeps working with no signal on an Android phone or tablet, what to download before you leave, and how progress syncs when you reconnect.",
    sections: [
      {
        heading: "What works with no connection",
        paragraphs: [
          "Once your child's grade has downloaded, lessons, practice, Adventure, the arcade games and the trophy and sticker books all keep working offline. Everything your child answers is saved on the device first, so nothing is lost if the signal drops mid-lesson.",
          "The natural read-aloud voice works offline too, once it has finished its one-time download. Before then the device's own voice reads questions aloud.",
        ],
      },
      {
        heading: "A two-minute checklist before you leave",
        paragraphs: [
          "Open the app on Wi-Fi and sign in. Choose each child who will play, and let their grade finish loading: the home screen appears quickly, but a few seconds of waiting lets the rest of the grade settle in. If you want read-aloud, tap the speaker on any question once so the voice downloads.",
          "Then switch on airplane mode and open the app to check: if the home screen and a lesson open, you are ready.",
        ],
      },
      {
        heading: "What waits until you are back online",
        paragraphs: [
          "Syncing between devices, a teacher's new assignments and live class questions need a connection. When you reconnect, your child's practice uploads on its own, and a parent looking at reports on another device sees it within a couple of minutes. Reports show practice, not a report-card mark.",
        ],
      },
      {
        heading: "Small screens, short sessions",
        paragraphs: [
          "Long trips suit short lessons. Practice mode picks a subject and unit, Adventure mixes them, and little ones can go straight into Let's Play. A parent can turn on calm mode in Settings for children who find motion or noise tiring in a moving car.",
        ],
      },
    ],
  },
  {
    slug: "android-in-the-classroom",
    title: "Gradelings on Android tablets and phones: a note for teachers",
    shortTitles: ["Gradelings on Android tablets: a note for teachers", "Gradelings on Android for teachers"],
    description: "How students in a class use the Gradelings Android app with a login code: no email, no password, assigned units on their home screen, and nothing to install for the teacher.",
    sections: [
      {
        heading: "Students sign in with one code",
        paragraphs: [
          "A teacher adds students by first name or nickname, and each student gets a login code. On an Android tablet or phone, the student opens the Gradelings app, chooses to sign in with a code and types it. There is no email address, password or birth year to collect. Printed login cards also have a QR code that signs the student straight in.",
        ],
      },
      {
        heading: "Shared devices",
        paragraphs: [
          "Signing in clears the device first, and signing out clears it again, so a class set of tablets can be passed from student to student. Students can use the website in a browser instead; it is the same app, so progress and assignments are the same in either place.",
        ],
      },
      {
        heading: "What students see",
        paragraphs: [
          "Units the teacher assigned show up on the home screen as From your teacher, with the due date as a soft Try to finish by, never a warning. Live questions from the teacher appear at the top of the home screen while the device is online.",
        ],
      },
      {
        heading: "What teachers see",
        paragraphs: [
          "The teacher area on gradelings.com shows each student's level, accuracy and attempts on the assigned units, plus what to look at next. It is practice, not a report-card mark: the teacher decides proficiency. Classes are free for now.",
        ],
      },
      {
        heading: "Before the first lesson",
        paragraphs: [
          "Have students open the app once on school Wi-Fi so their grade downloads. If your school network filters some websites, ask your administrator to allow gradelings.com. Once the grade is on the device, practice carries on even if the connection is patchy.",
        ],
      },
    ],
  },
];

export function androidPost(slug: string): AndroidPost | undefined {
  return ANDROID_POSTS.find((p) => p.slug === slug);
}

export function allAndroidPaths() {
  return [{ path: androidPath.hub() }, ...ANDROID_POSTS.map((p) => ({ path: androidPath.post(p.slug) }))];
}

export const ANDROID_FAQS: { q: string; a: string }[] = [
  { q: "Is the Gradelings Android app the same as the website?", a: "Yes. It opens the same Gradelings full screen, so your children, progress and settings are identical in the app and in a browser." },
  { q: "Does it work offline?", a: "Yes. Once a grade has downloaded, lessons, practice and games work without a connection, and progress syncs when you are back online." },
  { q: "How do I sign in?", a: "Use your family account's email and password or Continue with Google. A student in a class signs in with the login code from their teacher." },
  { q: "Which devices does it run on?", a: "Android phones and tablets with Google Play. You can also use Gradelings in any browser, and install it from the browser on other devices." },
  { q: "Is there an iPhone or iPad app?", a: "Not yet. It is coming soon. Until then, Gradelings works in Safari on iPhone and iPad." },
];
