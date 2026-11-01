import Link from "next/link";
import { dayLabel, NEWS_KIND_LABEL, type NewsDay } from "@/lib/whatsNew";

const KIND_STYLE = {
  new: "bg-[#e3f4ea] text-[#14532d]",
  fixed: "bg-[#e7effc] text-[#173a73]",
  teachers: "bg-[#fdf0d9] text-[#7a3d00]",
} as const;

/** One day's changes. `link` makes the date a link to the day's own page (used on the list). */
export function NewsDayCard({ entry, link }: { entry: NewsDay; link?: boolean }) {
  const date = dayLabel(entry.day);
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5">
      <p className="text-sm text-ink-soft">
        <time dateTime={entry.day}>{date}</time>
      </p>
      <h2 className="mt-1 text-2xl font-bold">
        {link ? (
          <Link href={`/whats-new/${entry.day}/`} className="hover:underline">
            {entry.headline}
          </Link>
        ) : (
          entry.headline
        )}
      </h2>
      <ul className="mt-3 flex flex-col gap-4">
        {entry.items.map((item) => (
          <li key={item.title}>
            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${KIND_STYLE[item.kind]}`}>{NEWS_KIND_LABEL[item.kind]}</span>
            <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
            <p className="font-read text-lg leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
