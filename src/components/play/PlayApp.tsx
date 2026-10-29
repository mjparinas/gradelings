"use client";

import { memo, useEffect, useState, type ReactNode } from "react";
import { VoicePreload } from "@/components/VoicePreload";
import { ClassTimerChip } from "./ClassTimer";
import type { FlagKey } from "@/lib/flags";
import { refreshFlags, useIsOn } from "@/lib/remoteFlags";
import { ageBandFor } from "@/content/subjects";
import type { FrameworkId, GradeId, SubjectId } from "@/content/types";
import type { Mode } from "@/lib/model";
import { PLACEMENT_SUBJECTS } from "@/lib/placement";
import { parse, ShownRoute, useShownHash } from "@/lib/router";
import { useActiveProfile, useChildSettings, useProfiles, useReady, useStore, useSubjectGrades } from "@/lib/store";
import { practiceTargets } from "@/lib/subjectGrades";
import { storiesFor } from "@/lib/stories";
import { startBackgroundSync } from "@/lib/sync";
import { prefetchGrades, useGradeContent } from "@/lib/useGradeContent";
import { BandProvider } from "../band";
import { ContentGate } from "../ContentGate";
import { LoadingScreen } from "../ui";
import { RouteProgress } from "../RouteProgress";
import { Hub } from "./Hub";
import { setLivePaused } from "@/lib/livePause";
import { LiveQuestionCard, useLiveQuestion } from "./LiveQuestion";
import { SpeedPicker, SubjectPicker, UnitList } from "./Practice";
import { SecretsListener } from "./Secrets";
import { Session } from "./Session";
import type { ClassCodes } from "@/lib/playLink";
import { CardSignIn, FirstRun, Picker, useClassSignInLink, usePlayStart } from "./Start";
import { getCourse, parseUnitKey } from "@/content";
import { nextGrade } from "@/lib/schoolYear";
import { go } from "@/lib/router";
import { Toasts } from "./Toasts";
import { Arcade, FactsPicker, GameScreen, LazyScreen, PlacementTest, prefetchScreens, Room, Shop, SneakPeek, StickerBook, StoryLibrary, StoryReader, TrailMap, Treasures, TrophyRoom, WeekRecap } from "./lazyScreens";
import { LessonScreen } from "./LessonScreen";

const MODES: Mode[] = ["practice", "adventure", "review", "speed", "daily", "challenge", "facts"];

/** Screens the admin panel can switch off for everyone (src/lib/flags.ts). A switched-off screen shows the home screen. */
const SCREEN_FLAGS: Record<string, FlagKey> = { stickers: "sticker-book", room: "my-room", speed: "speed-run", facts: "math-facts", arcade: "arcade", shop: "shop", stories: "story-library", grew: "weekly-recap" };
/** Sessions whose mode the admin panel can switch off. */
const MODE_FLAGS: Partial<Record<Mode, FlagKey>> = { daily: "daily-challenge", speed: "speed-run", facts: "math-facts" };

/** Next grade's lessons for the summer sneak peek: downloaded on first use, like any grade. */
function NextGrade({ grade, children }: { grade: GradeId; children: ReactNode }) {
  const profile = useActiveProfile()!;
  return <ContentGate targets={[{ grade, framework: profile.framework }]}>{children}</ContentGate>;
}

/**
 * The screen for the address. A tap shows a progress bar at once while the next screen is drawn (or downloaded)
 * in the background, and the old one stays up until it is ready.
 */
function Screen() {
  const { shown, pending } = useShownHash();
  return (
    <>
      <RouteProgress pending={pending} />
      <ShownRoute value={shown}>
        <LazyScreen name={parse(shown).path[0] ?? ""}>
          <Routes hash={shown} />
        </LazyScreen>
      </ShownRoute>
    </>
  );
}

// Memoised, so the old screen isn't drawn again while the next one is on its way.
const Routes = memo(function Routes({ hash }: { hash: string }) {
  const { path, query } = parse(hash);
  const isOn = useIsOn();
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const peek = nextGrade(profile.grade);
  // A lesson or session from the sneak peek needs that grade's download too.
  const scopeGrade = parseUnitKey(query.get("scope") ?? "")?.grade;
  const withPeek = (node: ReactNode) => (peek && scopeGrade === peek ? <NextGrade grade={peek}>{node}</NextGrade> : node);
  const flag = SCREEN_FLAGS[path[0]] ?? (path[0] === "session" ? MODE_FLAGS[query.get("mode") as Mode] : undefined);
  if (flag && !isOn(flag)) return <Hub />;
  switch (path[0]) {
    case "practice":
      if (path[1] && peek && query.get("grade") === peek) {
        return (
          <NextGrade grade={peek}>
            <UnitList key={`${peek}/${path[1]}`} subject={path[1] as SubjectId} grade={peek} />
          </NextGrade>
        );
      }
      return path[1] ? <UnitList key={path[1]} subject={path[1] as SubjectId} /> : <SubjectPicker />;
    case "peek":
      return peek ? (
        <NextGrade grade={peek}>
          <SneakPeek />
        </NextGrade>
      ) : (
        <Hub />
      );
    case "lesson":
      return withPeek(<LessonScreen key={query.get("scope") ?? ""} unitKey={query.get("scope") ?? ""} />);
    case "map":
      return <TrailMap />;
    case "stories":
      // Stories are reading practice, so they go with language arts when a parent has turned that off.
      if (!storiesFor(settings, true)) return <Hub />;
      return path[1] ? <StoryReader key={path[1]} id={path[1]} /> : <StoryLibrary />;
    case "treasures":
      return <Treasures />;
    case "stickers":
      return <StickerBook />;
    case "grew":
      return <WeekRecap />;
    case "room":
      return <Room />;
    case "speed":
      return <SpeedPicker />;
    case "facts":
      return <FactsPicker />;
    case "session": {
      const mode = query.get("mode") as Mode;
      const scope = query.get("scope") ?? "mix";
      if (!MODES.includes(mode)) return <Hub />;
      // A new key restarts the session cleanly when "Play again" is pressed.
      return withPeek(<Session key={`${mode}:${scope}:${query.get("r") ?? ""}`} mode={mode} scope={scope} />);
    }
    case "placement":
      if (!PLACEMENT_SUBJECTS.includes(path[1] as SubjectId)) return <Hub />;
      return <PlacementTest key={path[1]} subject={path[1] as SubjectId} />;
    case "arcade":
      return path[1] ? <GameScreen key={path[1]} id={path[1]} /> : <Arcade />;
    case "trophies":
      return <TrophyRoom />;
    case "shop":
      return <Shop />;
    case "start":
      return <StartLink />;
    default:
      return <Hub />;
  }
});

export function PlayApp() {
  const ready = useReady();
  const profiles = useProfiles();
  const active = useActiveProfile();
  const familyId = useStore((s) => s.family.account?.familyId ?? "");
  const isOn = useIsOn();
  const live = useLiveQuestion();
  const asking = Boolean(live.live);
  // A class login card scanned on a device that already has players (a new device goes straight to FirstRun's sign-in).
  const cardLink = useClassSignInLink();
  const [card, setCard] = useState<ClassCodes | null>(null);
  const cardKey = cardLink ? `${cardLink.classCode ?? ""}/${cardLink.studentCode}` : "";
  const [seenCard, setSeenCard] = useState("");
  if (ready && cardKey !== seenCard) {
    setSeenCard(cardKey);
    if (cardLink && profiles.length > 0) setCard(cardLink);
  }
  // Games and timed sessions hold still while the question is up.
  useEffect(() => {
    setLivePaused(asking);
    return () => setLivePaused(false);
  }, [asking]);

  // Feature flags: on open, when the signed-in family changes and whenever the app comes back into view.
  useEffect(() => {
    void refreshFlags();
    const onVisible = () => {
      if (document.visibilityState === "visible") void refreshFlags();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [familyId]);

  useEffect(() => {
    // Keyed on `ready` so a hot-reloaded (reset) store in development loads again.
    if (ready) return;
    void useStore
      .getState()
      .init()
      .then(() => startBackgroundSync());
  }, [ready]);

  if (!ready) return <LoadingScreen />;
  if (card) {
    return (
      <CardSignIn
        codes={card}
        onDone={() => {
          // The codes were in the address; take them out of it so they aren't left in the history or a bookmark.
          if (window.location.hash.startsWith("#/class")) window.history.replaceState(null, "", window.location.pathname + window.location.search);
          setCard(null);
        }}
      />
    );
  }
  if (profiles.length === 0) return <FirstRun />;
  if (!active) return <Picker />;

  const band = ageBandFor(active.grade);
  return (
    <ContentGate targets={[{ grade: active.grade, framework: active.framework }]} onSwitch={profiles.length > 1 ? () => useStore.getState().setActive(null) : undefined}>
      <Prefetch />
      <VoicePreload />
      <BandProvider value={band}>
        {/* While the teacher's question is up, nothing behind it can be tapped, focused or read. */}
        <div data-band={band} key={active.id} inert={asking}>
          <PracticeGrades>
            <Screen />
          </PracticeGrades>
        </div>
        {/* Only while the child's teacher is asking the class something, and only online. */}
        <LiveQuestionCard state={live} />
        <Toasts />
        <ClassTimerChip />
        {isOn("secrets") && <SecretsListener />}
      </BandProvider>
    </ContentGate>
  );
}

/**
 * A "Try it free" link from a public page (`playHref`): when the child playing follows that province or state and
 * grade, open the subject's lessons with the unit picked; otherwise the home screen. Either way the link is
 * replaced, so Back doesn't land here again.
 */
function StartLink() {
  const start = usePlayStart();
  const active = useActiveProfile();
  useEffect(() => {
    const course = start?.subject && active && active.framework === start.framework && active.grade === start.grade ? getCourse(active.grade, start.subject, active.framework) : undefined;
    const unit = course && start?.unit && course.units.some((u) => u.id === start.unit) ? start.unit : undefined;
    if (course) go(`/practice/${course.subject}`, { unit }, true);
    else go("/", undefined, true);
  }, [start, active]);
  return null;
}

/**
 * Waits for the grades a parent set some subjects to (`subjectGrades.ts`). Unlike the child's own grade, a grade that
 * can't download (offline) doesn't block anything: those subjects stay on the child's own grade until it can.
 */
function PracticeGrades({ children }: { children: ReactNode }) {
  const active = useActiveProfile()!;
  const subjectGrades = useSubjectGrades();
  const extra = practiceTargets(active, { subjectGrades }).filter((t) => t.grade !== active.grade);
  const { status } = useGradeContent(extra);
  if (status === "loading" && extra.length) return <LoadingScreen />;
  return children;
}

/** Once the active child's lessons are in, quietly download the other screens, and siblings' and nearby grades, for offline use. */
function Prefetch() {
  const profiles = useProfiles();
  const active = useActiveProfile();
  const settings = useStore((s) => s.settings);
  const levels = useIsOn()("subject-levels");
  const targets = [
    ...new Set(
      [active, ...profiles]
        .filter(Boolean)
        .flatMap((p) => (levels ? practiceTargets(p!, settings[p!.id]) : [{ grade: p!.grade, framework: p!.framework }]))
        .map((t) => `${t.framework}:${t.grade}`),
    ),
  ].join(",");
  useEffect(() => prefetchScreens(), []);
  useEffect(() => {
    if (targets) {
      prefetchGrades(
        targets.split(",").map((t) => {
          const [framework, grade] = t.split(":");
          return { framework: framework as FrameworkId, grade: grade as GradeId };
        }),
      );
    }
  }, [targets]);
  return null;
}
