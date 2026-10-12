"use client";

import { onColour } from "@/lib/contrast";
import type { CSSProperties } from "react";
import type { FlagKey } from "@/lib/flags";
import { useIsOn } from "@/lib/remoteFlags";
import { useDerived } from "@/lib/store";
import { useBand } from "../band";
import { Page } from "../ui";
import { BackButton } from "./Practice";

interface Treasure {
  id: string;
  title: string;
  icon: string;
  colour: string;
  dark: string;
  href: string;
  /** The admin panel can switch this screen off for everyone (src/lib/flags.ts). */
  flag?: FlagKey;
  count?: number;
}

/**
 * Little kids' "My Treasures" chest: the collection screens (stickers, trophies, room, shop and trail
 * map) behind one home-screen tile, so Kindergarten and Grade 1 see only three big choices at home.
 */
export function Treasures() {
  const d = useDerived();
  const isOn = useIsOn();
  const treasures: Treasure[] = [
    { id: "stickers", title: "Stickers", icon: "📒", colour: "#e9559a", dark: "#c43a7c", href: "#/stickers", flag: "sticker-book" },
    { id: "trophies", title: "Trophies", icon: "🏆", colour: "#f0bd2a", dark: "#b88905", href: "#/trophies", count: Object.keys(d.trophies).length },
    { id: "room", title: "My Room", icon: "🏠", colour: "#f08a4b", dark: "#c46a2c", href: "#/room", flag: "my-room" },
    { id: "shop", title: "Shop", icon: "🛍️", colour: "#06b6d4", dark: "#0891b2", href: "#/shop", flag: "shop", count: d.coins },
    { id: "trail", title: "Trail Map", icon: "🧭", colour: "#4f8ef7", dark: "#2f6fd6", href: "#/map" },
  ];
  const shown = treasures.filter((t) => !t.flag || isOn(t.flag));

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-3xl font-bold sm:text-4xl">💎 My Treasures</h1>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {shown.map((t, i) => (
          <div key={t.id} className="animate-rise-in" style={{ animationDelay: `${i * 60}ms` }}>
            <a
              href={t.href}
              className="btn h-full min-h-36 w-full flex-col items-center justify-center gap-2 p-4 text-center"
              style={{ "--btn-bg": t.colour, "--btn-edge": t.dark, "--btn-fg": onColour(t.colour) } as CSSProperties}
            >
              <span className="text-6xl drop-shadow-sm narrow:text-5xl">{t.icon}</span>
              <span className="block text-2xl leading-tight font-bold narrow:text-xl">{t.title}</span>
              {t.count !== undefined && <span className="rounded-full bg-white/40 px-3 py-0.5 text-lg font-bold">{t.id === "shop" ? `🪙 ${t.count}` : t.count}</span>}
            </a>
          </div>
        ))}
      </div>
    </Page>
  );
}

/** Back from a collection screen: to the treasure chest for little kids, who reach it from there, otherwise home. */
export function TreasureBack() {
  return <BackButton to={useBand() === "little" ? "/treasures" : "/"} />;
}
