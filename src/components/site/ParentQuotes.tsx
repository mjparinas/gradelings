import { visibleQuotes } from "@/content/testimonials";

/** What parents say, on the home page. Shows nothing until there is a quote this build may show. */
export function ParentQuotes() {
  const quotes = visibleQuotes();
  if (quotes.length === 0) return null;
  return (
    <section aria-labelledby="parents-say" className="py-8">
      <h2 id="parents-say" className="mb-6 text-3xl font-bold sm:text-4xl">
        What parents say
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {quotes.map((q) => (
          <li key={q.name} className="card flex flex-col gap-3 p-5">
            {q.sample && <span className="self-start rounded-full bg-[#fff4cc] px-3 py-1 text-sm font-bold text-[#7a5700]">Sample quote, not a real parent</span>}
            <blockquote className="font-read text-lg">&ldquo;{q.quote}&rdquo;</blockquote>
            <p className="mt-auto text-base">
              <b>{q.name}</b> <span className="text-ink-soft">· {q.about}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
