import type { Metadata } from "next";
import { client } from "@/lib/sanity";

export const metadata: Metadata = {
  title: { absolute: "Press Kit & Bio | Piper Allen" },
  description:
    "Press kit, biography, and downloadable materials for folk artist Piper Allen and Piper and the Daymakers.",
  alternates: { canonical: "https://piperallenmusic.com/press-kit" },
};

export const dynamic = "force-dynamic";

type PressQuote = {
  quote: string;
  source: string;
};

export default async function PressKitPage() {
  const quotes: PressQuote[] = await client.fetch(
    `*[_type == 'pressQuote'] { quote, source }`
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4">
        Press Kit
      </h1>
      <p className="font-sans font-light text-ink/60 text-sm tracking-widest uppercase mb-20">
        Bio, photos &amp; press materials
      </p>

      {quotes.length > 0 && (
        <section>
          <h2 className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mb-8">
            What People Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quotes.map((q) => (
              <blockquote
                key={q.source}
                className="bg-sage/10 px-8 py-10 flex flex-col gap-6"
              >
                <p className="font-serif italic text-forest text-xl leading-relaxed">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="font-sans text-xs tracking-widest uppercase text-ink/45">
                  — {q.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
