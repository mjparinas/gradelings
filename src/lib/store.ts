"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { DEFAULT_FRAMEWORK } from "@/content/frameworks";
import { ageBandFor } from "@/content/subjects";
import type { FrameworkId, GradeId } from "@/content/types";
import type { Classwork } from "./classroom";
import { derive, type Derived } from "./derive";
import * as localdb from "./localdb";
import {
  dayKey,
  defaultChildSettings,
  newId,
  READING_TINTS,
  type AppEvent,
  type ChildSettings,
  type FamilyInfo,
  type Profile,
} from "./model";
import { MAX_CHILDREN, TRIAL_DAYS } from "./plan";
import { celebrate, setCalmCheck } from "./juice";
import { setHapticsCheck } from "./haptics";
import { vibrationOn } from "./settingChoices";
import { effectiveGoal, STRETCH_QUEST, STRETCH_REWARD } from "./goal";
import { gamesOpenedBetween } from "./arcade";
import { growthStage } from "./buddy";
import { dailyQuests, weekDays, weeklyQuests, weekStart } from "./quests";
import { hasTestCoins, isOn } from "./remoteFlags";
import { storiesFor } from "./stories";
import { SEASON_REWARD, seasonOn, seasonQuestId, seasonStickers } from "./seasons";
import { getRoomItem, isRoomOwned } from "./room";
import { getItem, isUnlocked, STARTER } from "./shop";
import { setQuietCheck, setSoundCheck } from "./sound";
import { forgetMyInvite } from "./referral";
import { getTrophy, newlyEarned, TIER_STYLE } from "./trophies";
import { schoolYearOf } from "./schoolYear";
import { afterPaint } from "./afterPaint";

export interface Toast {
  id: string;
  kind: "trophy" | "level" | "quest" | "info";
  title: string;
  subtitle: string;
  icon: string;
  tier?: keyof typeof TIER_STYLE;
}

export interface SyncState {
  cursor: number;
  /** Which server database the cursor and the events' "sent" marks belong to (see src/server/syncEpoch.ts). */
  epoch?: string;
  lastSyncAt?: number;
  status: "idle" | "syncing" | "error" | "offline" | "signed-out";
  error?: string;
  /** Profile ids whose record or settings changed since the last upload. */
  dirtyProfiles: string[];
  dirtyFamily: boolean;
}

type NewEvent = AppEvent extends infer E ? (E extends AppEvent ? Omit<E, "id" | "t" | "profileId"> : never) : never;

interface State {
  ready: boolean;
  deviceId: string;
  profiles: Profile[];
  activeId: string | null;
  settings: Record<string, ChildSettings>;
  family: FamilyInfo;
  pin: { hash: string; salt: string } | null;
  events: AppEvent[];
  sync: SyncState;
  /** Units teachers assigned, per linked child. Replaced on every sync; never edited on the device. */
  classwork: Classwork[];
  toasts: Toast[];

  init: () => Promise<void>;
  addProfile: (p: { name: string; avatar: string; colour: string; grade: GradeId; framework?: FrameworkId; birthYear?: number }) => string;
  updateProfile: (id: string, patch: Partial<Profile>) => void;
  removeProfile: (id: string) => void;
  resetProgress: (id: string) => void;
  setActive: (id: string | null) => void;
  updateSettings: (profileId: string, patch: Partial<ChildSettings>) => void;
  /** Record events for the active child; awards trophies and quests. */
  log: (events: NewEvent[]) => void;
  /**
   * Logs once the screen has painted, so a tap's feedback shows before the scoring catches up (re-deriving a
   * child's stats takes longer the more they have practised). Anything queued is logged first by the next `log`.
   */
  logSoon: (events: NewEvent[]) => void;
  buy: (itemId: string) => boolean;
  /** Buy (if needed) and place a room item. */
  placeRoomItem: (itemId: string) => boolean;
  equip: (itemId: string) => void;
  setPin: (pin: string) => Promise<void>;
  checkPin: (pin: string) => Promise<boolean>;
  setFamily: (patch: Partial<FamilyInfo>, fromServer?: boolean) => void;
  setSync: (patch: Partial<SyncState>) => void;
  mergeRemote: (data: { events: AppEvent[]; profiles: Profile[]; settings: ChildSettings[]; family?: FamilyInfo; classwork?: Classwork[] }) => void;
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  wipeDevice: () => Promise<void>;
}

const save = (key: string, value: unknown) => void localdb.setKV(key, value);

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function newFamily(): FamilyInfo {
  const now = Date.now();
  return { plan: "trial", trialEndsAt: now + TRIAL_DAYS * 86_400_000, updatedAt: now };
}

// Events waiting for `logSoon` to log them after the next paint.
let soon: NewEvent[] = [];

// Derived stats are cached per child and recomputed only when their events change.
const deriveCache = new Map<string, { events: AppEvent[]; resetAt: number; day: string; testCoins: boolean; value: Derived }>();

/**
 * Coins added on a device signed in to an admin account, so the owner can try the shop and My Room with their
 * own children. Only the balance changes: nothing is stored or synced, and trophies still count real coins.
 */
export const TEST_COINS = 1_000_000;

export function eventsFor(events: AppEvent[], profile: Profile | undefined): AppEvent[] {
  if (!profile) return [];
  return events.filter((e) => e.profileId === profile.id && e.t > (profile.resetAt ?? 0));
}

/** Profiles saved before provinces existed have no framework; they are BC. */
const withFramework = (p: Profile): Profile => (p.framework ? p : { ...p, framework: DEFAULT_FRAMEWORK });

export function derivedFor(state: Pick<State, "events" | "profiles">, profileId: string | null): Derived {
  const profile = state.profiles.find((p) => p.id === profileId);
  const key = profileId ?? "";
  const cached = deriveCache.get(key);
  const today = dayKey(Date.now());
  const testCoins = hasTestCoins();
  if (cached && cached.events === state.events && cached.resetAt === (profile?.resetAt ?? 0) && cached.day === today && cached.testCoins === testCoins) {
    return cached.value;
  }
  const derived = derive(eventsFor(state.events, profile));
  const value = testCoins ? { ...derived, coins: derived.coins + TEST_COINS } : derived;
  deriveCache.set(key, { events: state.events, resetAt: profile?.resetAt ?? 0, day: today, testCoins, value });
  return value;
}

export const useStore = create<State>()((set, get) => ({
  ready: false,
  deviceId: "",
  profiles: [],
  activeId: null,
  settings: {},
  family: newFamily(),
  pin: null,
  events: [],
  sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
  classwork: [],
  toasts: [],

  init: async () => {
    if (get().ready) return;
    const [deviceId, profiles, activeId, settings, family, pin, sync, classwork, events] = await Promise.all([
      localdb.getKV<string>("deviceId"),
      localdb.getKV<Profile[]>("profiles"),
      localdb.getKV<string | null>("activeId"),
      localdb.getKV<Record<string, ChildSettings>>("settings"),
      localdb.getKV<FamilyInfo>("family"),
      localdb.getKV<State["pin"]>("pin"),
      localdb.getKV<SyncState>("sync"),
      localdb.getKV<Classwork[]>("classwork"),
      localdb.allEvents(),
    ]);
    const id = deviceId ?? newId();
    if (!deviceId) save("deviceId", id);
    const fam = family ?? newFamily();
    if (!family) save("family", fam);
    set({
      ready: true,
      deviceId: id,
      profiles: (profiles ?? []).map(withFramework),
      activeId: activeId ?? null,
      settings: settings ?? {},
      family: fam,
      pin: pin ?? null,
      sync: { ...get().sync, ...(sync ?? {}), status: fam.account ? "idle" : "signed-out" },
      classwork: classwork ?? [],
      events,
    });
  },

  addProfile: ({ name, avatar, colour, grade, framework = DEFAULT_FRAMEWORK, birthYear }) => {
    if (get().profiles.filter((p) => !p.deleted).length >= MAX_CHILDREN) return "";
    const now = Date.now();
    const id = newId();
    const profile: Profile = {
      id,
      name: name.trim().slice(0, 20) || "Friend",
      avatar,
      colour,
      grade,
      framework,
      birthYear,
      companion: STARTER.companion,
      title: STARTER.title,
      confetti: STARTER.confetti,
      createdAt: now,
      updatedAt: now,
    };
    const settings = { ...get().settings, [id]: defaultChildSettings(id, ageBandFor(grade) === "little", grade) };
    const profiles = [...get().profiles, profile];
    set({ profiles, settings, activeId: id });
    save("profiles", profiles);
    save("settings", settings);
    save("activeId", id);
    get().setSync({ dirtyProfiles: [...new Set([...get().sync.dirtyProfiles, id])] });
    return id;
  },

  updateProfile: (id, patch) => {
    const now = Date.now();
    // A grade a parent changes is the grade for this school year, so the back-to-school prompt doesn't ask again.
    const year = (p: Profile) => (patch.grade && patch.grade !== p.grade && patch.gradeYear === undefined ? { gradeYear: schoolYearOf(now) } : {});
    const profiles = get().profiles.map((p) => (p.id === id ? { ...p, ...patch, ...year(p), updatedAt: now } : p));
    set({ profiles });
    save("profiles", profiles);
    get().setSync({ dirtyProfiles: [...new Set([...get().sync.dirtyProfiles, id])] });
  },

  removeProfile: (id) => {
    get().updateProfile(id, { deleted: true });
    // Forget their history on this device too, so it can never be uploaded again.
    set({ events: get().events.filter((e) => e.profileId !== id) });
    void localdb.deleteProfileEvents(id);
    deriveCache.delete(id);
    if (get().activeId === id) get().setActive(null);
  },

  resetProgress: (id) => get().updateProfile(id, { resetAt: Date.now() }),

  setActive: (id) => {
    // Answers waiting to be logged belong to the child who gave them.
    if (soon.length) get().log([]);
    set({ activeId: id });
    save("activeId", id);
  },

  updateSettings: (profileId, patch) => {
    const current = get().settings[profileId] ?? defaultChildSettings(profileId, false);
    const settings = { ...get().settings, [profileId]: { ...current, ...patch, updatedAt: Date.now() } };
    set({ settings });
    save("settings", settings);
    get().setSync({ dirtyProfiles: [...new Set([...get().sync.dirtyProfiles, profileId])] });
  },

  logSoon: (incoming) => {
    if (!incoming.length) return;
    const first = soon.length === 0;
    soon.push(...incoming);
    if (first) afterPaint(() => get().log([]));
  },

  log: (queued) => {
    // Anything waiting for logSoon goes first, so events keep the order they happened in.
    const incoming = soon.length ? [...soon.splice(0), ...queued] : queued;
    const state = get();
    const profile = state.profiles.find((p) => p.id === state.activeId);
    if (!profile || !incoming.length) return;
    const now = Date.now();
    const before = derivedFor(state, profile.id);
    const fresh = incoming.map((e, i) => ({ ...e, id: newId(), t: now + i, profileId: profile.id }) as AppEvent);
    let events = [...state.events, ...fresh];
    let after = derivedFor({ events, profiles: state.profiles }, profile.id);
    const toasts: Omit<Toast, "id">[] = [];

    // Quests complete themselves the moment they're done.
    const day = dayKey(now);
    const claimed = after.questsClaimed[day] ?? [];
    const questEvents: AppEvent[] = [];
    const questOpts = { stories: storiesFor(state.settings[profile.id], isOn("story-library")) };
    for (const q of dailyQuests(profile.id, day, ageBandFor(profile.grade), questOpts)) {
      if (!claimed.includes(q.id) && q.progress(after.days[day]) >= q.target) {
        questEvents.push({ type: "quest", quest: q.id, day, reward: q.reward, id: newId(), t: now + 50, profileId: profile.id });
        toasts.push({ kind: "quest", title: "Quest complete!", subtitle: `${q.title} · +${q.reward} coins`, icon: q.icon });
      }
    }
    // Finishing a stretch goal earns a small bonus, once a day.
    {
      const goal = effectiveGoal(state.settings[profile.id], after, day);
      if (goal.level === "stretch" && !claimed.includes(STRETCH_QUEST) && (after.days[day]?.learnSeconds ?? 0) >= goal.minutes * 60) {
        questEvents.push({ type: "quest", quest: STRETCH_QUEST, day, reward: STRETCH_REWARD, id: newId(), t: now + 55, profileId: profile.id });
        toasts.push({ kind: "quest", title: "Stretch goal reached!", subtitle: `You went the extra mile · +${STRETCH_REWARD} coins`, icon: "🚀" });
      }
    }
    // Weekly quests add up the week's days and are claimed under the Monday's date.
    const monday = weekStart(now);
    const weekClaimed = after.questsClaimed[monday] ?? [];
    const thisWeek = weekDays(monday).flatMap((k) => (after.days[k] ? [after.days[k]] : []));
    for (const q of weeklyQuests(profile.id, monday, ageBandFor(profile.grade), questOpts)) {
      if (!weekClaimed.includes(q.id) && q.progress(thisWeek) >= q.target) {
        questEvents.push({ type: "quest", quest: q.id, day: monday, reward: q.reward, id: newId(), t: now + 60, profileId: profile.id });
        toasts.push({ kind: "quest", title: "Weekly quest complete!", subtitle: `${q.title} · +${q.reward} coins`, icon: q.icon });
      }
    }
    // Festival stickers: say when one is found, and add the page's coins once it is full.
    const festival = isOn("seasonal-events") ? seasonOn(day) : null;
    if (festival) {
      const band = ageBandFor(profile.grade);
      const had = seasonStickers(festival, before, band);
      const has = seasonStickers(festival, after, band);
      has.forEach((s, i) => {
        if (s.earned && !had[i].earned) toasts.push({ kind: "quest", title: `New ${festival.season.name} sticker!`, subtitle: s.name, icon: s.emoji });
      });
      const quest = seasonQuestId(festival);
      if (has.every((s) => s.earned) && !(after.questsClaimed[festival.from] ?? []).includes(quest)) {
        questEvents.push({ type: "quest", quest, day: festival.from, reward: SEASON_REWARD, id: newId(), t: now + 65, profileId: profile.id });
        toasts.push({ kind: "quest", title: `${festival.season.name} page full!`, subtitle: `Every sticker found · +${SEASON_REWARD} coins`, icon: festival.season.emoji });
      }
    }
    if (questEvents.length) {
      events = [...events, ...questEvents];
      fresh.push(...questEvents);
      after = derivedFor({ events, profiles: state.profiles }, profile.id);
    }

    // Trophies can unlock other trophies (e.g. levels), so check until nothing new.
    for (let round = 0; round < 3; round++) {
      const earned = newlyEarned(after, { grade: profile.grade, framework: profile.framework });
      if (!earned.length) break;
      const trophyEvents = earned.map(
        (t, i) => ({ type: "trophy", trophy: t.id, id: newId(), t: now + 100 + round * 10 + i, profileId: profile.id }) as AppEvent,
      );
      events = [...events, ...trophyEvents];
      fresh.push(...trophyEvents);
      after = derivedFor({ events, profiles: state.profiles }, profile.id);
      for (const t of earned) {
        toasts.push({ kind: "trophy", title: t.name, subtitle: `${TIER_STYLE[t.tier].label} trophy`, icon: t.icon, tier: t.tier });
      }
    }

    if (after.level > before.level) {
      const grown = growthStage(after.level);
      const grew = grown.stage > growthStage(before.level).stage;
      // A new arcade game can open at this level (only said when games are on for this child).
      const settings = state.settings[profile.id];
      const opened = settings?.gamesEnabled === false ? [] : gamesOpenedBetween(before.level, after.level, { grade: profile.grade, subjects: settings?.enabledSubjects, framework: profile.framework });
      const unlock = opened.length ? `New game unlocked: ${opened.map((g) => g.title).join(" and ")}!` : "";
      toasts.unshift({
        kind: "level",
        title: `Level ${after.level}!`,
        subtitle: [grew ? `Your buddy grew into a ${grown.name}!` : unlock ? "" : "You levelled up!", unlock].filter(Boolean).join(" "),
        icon: grew ? "🌟" : opened.length ? opened[0].icon : "⬆️",
      });
    }

    // Make a Wish: a little shower of stars.
    if (fresh.some((e) => e.type === "trophy" && e.trophy === "make-a-wish")) celebrate(["⭐", "🌟", "✨"]);

    set({ events });
    void localdb.putEvents(fresh);
    toasts.forEach((t) => get().pushToast(t));
  },

  buy: (itemId) => {
    const state = get();
    const item = getItem(itemId);
    if (!item || !state.activeId) return false;
    const d = derivedFor(state, state.activeId);
    if (d.owned.includes(itemId) || item.cost === 0) {
      get().equip(itemId);
      return true;
    }
    if (!isUnlocked(item, d.level, d.trophies)) return false;
    if (d.coins < item.cost) return false;
    get().log([{ type: "buy", item: itemId, cost: item.cost }]);
    get().equip(itemId);
    return true;
  },

  placeRoomItem: (itemId) => {
    const state = get();
    const item = getRoomItem(itemId);
    const profile = state.profiles.find((p) => p.id === state.activeId);
    if (!item || !profile) return false;
    const d = derivedFor(state, profile.id);
    if (!isRoomOwned(item, d.owned)) {
      if (item.unlock && d.level < item.unlock.level) return false;
      if (d.coins < item.cost) return false;
      get().log([{ type: "buy", item: item.id, cost: item.cost }]);
    }
    get().updateProfile(profile.id, { room: { ...profile.room, [item.slot]: item.id } });
    return true;
  },

  equip: (itemId) => {
    const item = getItem(itemId);
    const id = get().activeId;
    if (!item || !id) return;
    get().updateProfile(id, item.kind === "companion" ? { companion: itemId } : item.kind === "title" ? { title: itemId } : { confetti: itemId });
  },

  setPin: async (pin) => {
    const salt = newId();
    const value = { salt, hash: await sha256(`${salt}:${pin}`) };
    set({ pin: value });
    save("pin", value);
  },

  checkPin: async (pin) => {
    const current = get().pin;
    if (!current) return true;
    return (await sha256(`${current.salt}:${pin}`)) === current.hash;
  },

  setFamily: (patch, fromServer = false) => {
    const family = { ...get().family, ...patch, updatedAt: fromServer ? get().family.updatedAt : Date.now() };
    set({ family });
    save("family", family);
    if (!fromServer) get().setSync({ dirtyFamily: true });
  },

  setSync: (patch) => {
    const sync = { ...get().sync, ...patch };
    set({ sync });
    save("sync", { cursor: sync.cursor, epoch: sync.epoch, lastSyncAt: sync.lastSyncAt, dirtyProfiles: sync.dirtyProfiles, dirtyFamily: sync.dirtyFamily });
  },

  mergeRemote: ({ events, profiles, settings, family, classwork }) => {
    const state = get();
    const known = new Set(state.events.map((e) => e.id));
    const newEvents = events.filter((e) => !known.has(e.id));
    // Last write wins for profiles and settings.
    const byId = new Map(state.profiles.map((p) => [p.id, p]));
    let profilesChanged = false;
    for (const raw of profiles) {
      const p = withFramework(raw);
      const mine = byId.get(p.id);
      if (!mine || p.updatedAt > mine.updatedAt) {
        byId.set(p.id, p);
        profilesChanged = true;
      }
    }
    let settingsChanged = false;
    const mergedSettings = { ...state.settings };
    for (const s of settings) {
      const mine = mergedSettings[s.profileId];
      if (!mine || s.updatedAt > mine.updatedAt) {
        mergedSettings[s.profileId] = s;
        settingsChanged = true;
      }
    }
    // Keep the old references when nothing changed: background sync treats a new reference as new progress.
    const mergedProfiles = profilesChanged ? [...byId.values()] : state.profiles;
    set({
      events: newEvents.length ? [...state.events, ...newEvents] : state.events,
      profiles: mergedProfiles,
      settings: settingsChanged ? mergedSettings : state.settings,
      family: family ? { ...state.family, ...family, account: state.family.account } : state.family,
    });
    if (newEvents.length) void localdb.putEvents(newEvents, 1);
    if (profilesChanged) save("profiles", mergedProfiles);
    if (settingsChanged) save("settings", mergedSettings);
    if (family) save("family", get().family);
    if (classwork) {
      set({ classwork });
      save("classwork", classwork);
    }
  },

  pushToast: (t) => set({ toasts: [...get().toasts, { ...t, id: newId() }] }),
  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),

  wipeDevice: async () => {
    soon = [];
    await localdb.clearAll();
    forgetMyInvite();
    deriveCache.clear();
    set({
      profiles: [],
      activeId: null,
      settings: {},
      family: newFamily(),
      pin: null,
      events: [],
      classwork: [],
      sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
    });
  },
}));

// A tab closed or put away right after an answer still saves it.
if (typeof window !== "undefined") window.addEventListener("pagehide", () => soon.length && useStore.getState().log([]));

// ---------- Hooks ----------

export function useReady(): boolean {
  return useStore((s) => s.ready);
}

export function useProfiles(): Profile[] {
  const profiles = useStore((s) => s.profiles);
  return useMemo(() => profiles.filter((p) => !p.deleted), [profiles]);
}

export function useActiveProfile(): Profile | undefined {
  return useStore((s) => s.profiles.find((p) => p.id === s.activeId && !p.deleted));
}

export function useDerived(profileId?: string | null): Derived {
  const events = useStore((s) => s.events);
  const profiles = useStore((s) => s.profiles);
  const activeId = useStore((s) => s.activeId);
  const id = profileId === undefined ? activeId : profileId;
  return useMemo(() => derivedFor({ events, profiles }, id), [events, profiles, id]);
}

export function useChildSettings(profileId?: string | null): ChildSettings | undefined {
  const activeId = useStore((s) => s.activeId);
  const id = profileId ?? activeId;
  return useStore((s) => (id ? s.settings[id] : undefined));
}

export function useTrophyName(id: string): string {
  return getTrophy(id)?.name ?? id;
}

function activeSettings(): ChildSettings | undefined {
  const s = useStore.getState();
  return s.activeId ? s.settings[s.activeId] : undefined;
}
setSoundCheck(() => activeSettings()?.sound ?? true);
setQuietCheck(() => Boolean(activeSettings()?.quietSounds));
setCalmCheck(() => Boolean(activeSettings()?.calmMotion));
setHapticsCheck(() => vibrationOn(activeSettings()));

// A "calm" class on the page stops CSS animations too (see globals.css).
if (typeof document !== "undefined") {
  const apply = () => {
    const s = activeSettings();
    const root = document.documentElement.classList;
    root.toggle("calm", Boolean(s?.calmMotion));
    root.toggle("roomy", Boolean(s?.roomyText));
    root.toggle("contrast", Boolean(s?.highContrast));
    root.toggle("dyslexic", Boolean(s?.dyslexiaFont));
    for (const tint of READING_TINTS) root.toggle(`tint-${tint}`, s?.readingTint === tint);
  };
  useStore.subscribe(apply);
  apply();
}
