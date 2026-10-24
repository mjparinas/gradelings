"use client";

import { useEffect, useState, type ReactNode } from "react";
import { VoicePreload } from "@/components/VoicePreload";
import { ClassTimerChip } from "./ClassTimer";
import type { FlagKey } from "@/lib/flags";
import { refreshFlags, useIsOn } from "@/lib/remoteFlags";
import { ageBandFor } from "@/content/subjects";
import type { FrameworkId, GradeId, SubjectId } from "@/content/types";
import type { Mode } from "@/lib/model";
import { PLACEMENT_SUBJECTS } from "@/lib/placement";
import { useRoute } from "@/lib/router";
import { useActiveProfile, useProfiles, useReady, useStore } from "@/lib/store";
import { startBackgroundSync } from "@/lib/sync";
import { prefetchGrades } from "@/lib/useGradeContent";
import { BandProvider } from "../band";
import { ContentGate } from "../ContentGate";
import { LoadingScreen } from "../ui";
import { Arcade, GameScreen } from "./Arcade";
import { Hub } from "./Hub";
import { setLivePaused } from "@/lib/livePause";
import { LiveQuestionCard, useLiveQuestion } from "./LiveQuestion";
import { SpeedPicker, SubjectPicker, UnitList } from "./Practice";
import { PlacementTest } from "./PlacementTest";
import { SecretsListener } from "./Secrets";
import { Session } from "./Session";
import { Shop } from "./Shop";
import type { ClassCodes } from "@/lib/playLink";
import { CardSignIn, FirstRun, Picker, useClassSignInLink, usePlayStart } from "./Start";
import { getCourse, parseUnitKey } from "@/content";
import { nextGrade } from "@/lib/schoolYear";
import { SneakPeek } from "./SneakPeek";
import { go } from "@/lib/router";
import { Toasts } from "./Toasts";
import { LessonScreen } from "./LessonScreen";
import { StickerBook } from "./StickerBook";
import { Room } from "./Room";
import { TrailMap } from "./TrailMap";
import { TrophyRoom } from "./Trophies";
import { Treasures } from "./Treasures";

const MODES: Mode[] = ["practice", "adventure", "review", "speed", "daily", "challenge"];

/** Screens the admin panel can switch off for everyone (src/lib/flags.ts). A switched-off screen shows the home screen. */
const SCREEN_FLAGS: Record<string, FlagKey> = { stickers: "sticker-book", room: "my-room", speed: "speed-run", arcade: "arcade", shop: "shop" };

/** Next grade's lessons for the summer sneak peek: downloaded on first use, like any grade. */
function NextGrade({ grade, children }: { grade: GradeId; children: ReactNode }) {
  const profile = useActiveProfile()!;
  return <ContentGate targets={[{ grade, framework: profile.framework }]}>{children}</ContentGate>;
}

function Screen() {
  const { path, query } = useRoute();
  const isOn = useIsOn();
  const profile = useActiveProfile()!;
  const peek = nextGrade(profile.grade);
  // A lesson or session from the sneak peek needs that grade's download too.
  const scopeGrade = parseUnitKey(query.get("scope") ?? "")?.grade;
  const withPeek = (node: ReactNode) => (peek && scopeGrade === peek ? <NextGrade grade={peek}>{node}</NextGrade> : node);
  const flag = SCREEN_FLAGS[path[0]] ?? (path[0] === "session" && query.get("mode") === "daily" ? "daily-challenge" : path[0] === "session" && query.get("mode") === "speed" ? "speed-run" : undefined);
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
    case "treasures":
      return <Treasures />;
    case "stickers":
      return <StickerBook />;
    case "room":
      return <Room />;
    case "speed":
      return <SpeedPicker />;
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
}

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
          <Screen />
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

/** Once the active child's lessons are in, quietly download siblings' and nearby grades for offline use. */
function Prefetch() {
  const profiles = useProfiles();
  const active = useActiveProfile();
  const targets = [...new Set([active, ...profiles].filter(Boolean).map((p) => `${p!.framework}:${p!.grade}`))].join(",");
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
