"use client";

import { Component, createElement, Suspense, use, type ComponentType, type ReactNode } from "react";
import { Critter } from "@/components/Critter";
import { cacheLoadedScripts } from "@/lib/offline";
import { go } from "@/lib/router";

// Screens a child opens now and then (games, the shop, the room, stories, trophies...) are their own
// downloads, so the home screen and a lesson open sooner. Once the app is up they are all fetched
// while the device is idle and handed to the service worker, so every screen still opens offline.

const loaders: (() => Promise<unknown>)[] = [];
const resets: (() => void)[] = [];

/**
 * Like `React.lazy`, but a download that fails (offline before the screen was ever fetched) can be tried
 * again: the failure reaches `ScreenBoundary`, whose "Try again" starts a fresh download.
 */
export function lazyScreen<P extends object>(load: () => Promise<ComponentType<P>>) {
  let loaded: ComponentType<P> | undefined;
  let pending: Promise<ComponentType<P>> | undefined;
  const get = () => (pending ??= load().then((c) => (loaded = c)));
  loaders.push(get);
  // A failed download is kept until "Try again", so React sees the failure instead of a new download each render.
  resets.push(() => {
    if (!loaded) pending = undefined;
  });
  function Screen(props: P) {
    // The same component every time once loaded (kept above), so createElement never remounts it.
    return createElement(loaded ?? use(get()), props);
  }
  return Screen;
}

/** One download per file, even when it holds two screens. */
function once<T>(load: () => Promise<T>) {
  let started: Promise<T> | undefined;
  resets.push(() => (started = undefined));
  return () => (started ??= load());
}
const arcade = once(() => import("./Arcade"));
const stories = once(() => import("./Stories"));

export const Arcade = lazyScreen(() => arcade().then((m) => m.Arcade));
export const GameScreen = lazyScreen(() => arcade().then((m) => m.GameScreen));
export const FactsPicker = lazyScreen(() => import("./Facts").then((m) => m.FactsPicker));
export const PlacementTest = lazyScreen(() => import("./PlacementTest").then((m) => m.PlacementTest));
export const Room = lazyScreen(() => import("./Room").then((m) => m.Room));
export const Shop = lazyScreen(() => import("./Shop").then((m) => m.Shop));
export const SneakPeek = lazyScreen(() => import("./SneakPeek").then((m) => m.SneakPeek));
export const StickerBook = lazyScreen(() => import("./StickerBook").then((m) => m.StickerBook));
export const StoryLibrary = lazyScreen(() => stories().then((m) => m.StoryLibrary));
export const StoryReader = lazyScreen(() => stories().then((m) => m.StoryReader));
export const TrailMap = lazyScreen(() => import("./TrailMap").then((m) => m.TrailMap));
export const Treasures = lazyScreen(() => import("./Treasures").then((m) => m.Treasures));
export const TrophyRoom = lazyScreen(() => import("./Trophies").then((m) => m.TrophyRoom));

/** Downloads every lazy screen; settles when each has loaded or failed. */
export function loadAllScreens(): Promise<unknown> {
  return Promise.allSettled(loaders.map((l) => l()));
}

let prefetched = false;

/** Downloads every lazy screen when the browser is idle (once), then asks the service worker to keep them. */
export function prefetchScreens() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  const run = () => void loadAllScreens().then(cacheLoadedScripts);
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 8_000 });
  else setTimeout(run, 2000);
}

/** Shown while a screen downloads. It fades in after a moment, so a screen that is already here never flashes it. */
export function ScreenLoading() {
  return (
    <main role="status" aria-label="Loading" className="screen-loading flex min-h-dvh flex-col items-center justify-center gap-4">
      <Critter id="ollie" mood="happy" size={120} />
      <p className="text-xl font-semibold text-ink-soft">
        One moment
        <span className="loading-dots" aria-hidden="true" />
      </p>
    </main>
  );
}

/** A lazy screen inside its loading view, and a friendly way out if its download fails. */
export function LazyScreen({ children, name }: { children: ReactNode; /** Starts afresh when the screen changes. */ name: string }) {
  return (
    <ScreenBoundary key={name}>
      <Suspense fallback={<ScreenLoading />}>{children}</Suspense>
    </ScreenBoundary>
  );
}

class ScreenBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  retry = () => {
    for (const reset of resets) reset();
    this.setState({ failed: false });
  };

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4 text-center">
        <Critter id="ollie" mood="think" size={140} />
        <h1 className="text-3xl font-bold">We need the internet for a moment</h1>
        <p className="max-w-md font-read text-xl text-ink-soft">Ask a grown-up to connect to the internet once. After that this works offline.</p>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <button type="button" className="btn btn-good min-h-16 text-2xl" onClick={this.retry}>
            Try again
          </button>
          <button type="button" className="btn min-h-14 text-xl" onClick={() => go("/")}>
            Go home
          </button>
        </div>
      </main>
    );
  }
}
