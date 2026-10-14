import { Disclosure } from "@/components/Disclosure";
import { JsonLd } from "@/lib/site";
import { faqJsonLd } from "./jsonld";
import type { Faq } from "./pageFaqs";

/** A page's common questions, shown as disclosures and given to search engines as FAQ structured data. */
export function FaqSection({ faqs, title = "Common questions", id = "faq" }: { faqs: Faq[]; title?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="mt-10 max-w-3xl">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 id={id} className="mb-3 text-2xl font-bold">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {faqs.map((f) => (
          <Disclosure key={f.q} className="rounded-2xl border border-line bg-white p-4" titleClassName="font-bold" title={f.q}>
            <p className="mt-2 font-read">{f.a}</p>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
