import Link from "next/link";
import { APP_NAME } from "@/lib/brand";
import type { MilestoneCard } from "./ogText";
import { RefCapture } from "./ShareButton";
import { AppLink } from "./AppLink";

// A milestone a parent shared from the parent area. It names no child: only the milestone, and for a
// unit its grade and subject. Not indexed. It is rendered per request under a nonce policy that allows
// no style="" attributes (src/proxy.ts), so it stays plain markup with classes, like shared reports,
// and shows the share card itself as its picture.

export function MilestonePage({ card, image }: { card: MilestoneCard; image: string }) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-8 text-center">
      <RefCapture />
      <Link href="/" className="text-2xl font-bold text-[#2f6fd6]">
        {APP_NAME}
      </Link>
      {/* eslint-disable-next-line @next/next/no-img-element -- the share card, already a PNG */}
      <img src={image} width={1200} height={630} alt="" className="h-auto w-full rounded-3xl border border-line" />
      <p className="font-semibold text-ink-soft">{card.kicker}</p>
      <h1 className="text-4xl font-bold">
        {card.badge && <span aria-hidden="true">{card.badge} </span>}
        {card.title}
      </h1>
      <p className="font-read text-lg text-ink-soft">{card.line}</p>
      <p className="font-read">A grown-up shared this to celebrate. {APP_NAME} is curriculum-matched practice for Kindergarten to Grade 9, with kind feedback and learning games.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <AppLink href="/play/" className="btn btn-good min-h-14 px-8 text-xl">
          Try it free
        </AppLink>
        {card.more && (
          <Link href={card.more.href} className="btn min-h-14 px-6 text-lg">
            {card.more.label}
          </Link>
        )}
      </div>
      <p className="text-xs text-ink-soft">Milestones reflect practice in the app, not a report-card mark.</p>
    </main>
  );
}
