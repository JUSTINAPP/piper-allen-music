import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Folk Singer Songwriter | South Coast NSW | Piper Allen" },
  alternates: { canonical: "https://piperallenmusic.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Piper Allen",
  url: "https://piperallenmusic.com",
  genre: ["Folk", "Acoustic", "Bossa Nova", "Neo Soul"],
  sameAs: ["https://www.instagram.com/piperallenmusic/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="-mt-16 h-screen relative overflow-hidden flex">
        <Image
          src="/images/piper-hero.jpg"
          alt="Piper Allen performing live on stage"
          fill
          preload
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />

        {/* Centred name */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <h1 className="font-sans font-extralight text-forest text-5xl sm:text-7xl md:text-8xl tracking-[0.35em] uppercase text-center">
            Piper Allen
          </h1>
        </div>

        {/* Bottom row */}
        <div className="absolute bottom-0 inset-x-0 z-10 px-8 md:px-16 pb-10 flex items-end justify-between">
          {/* Ghost CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shows"
              className="border border-cream bg-cream text-forest px-5 py-2.5 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-forest hover:border-forest hover:text-cream active:bg-[#1a2410] active:border-[#1a2410] active:text-cream"
            >
              Upcoming Shows
            </Link>
            <Link
              href="/contact"
              className="border border-cream bg-cream text-forest px-5 py-2.5 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-forest hover:border-forest hover:text-cream active:bg-[#1a2410] active:border-[#1a2410] active:text-cream"
            >
              Book Piper
            </Link>
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/piperallenmusic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-cream hover:text-cream/75 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Photo strip ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 h-56 md:h-72">
        <div className="relative">
          <Image
            src="/images/piper-guitar.jpg"
            alt="Piper Allen playing guitar"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative">
          <Image
            src="/images/piper-atmospheric.jpg"
            alt="Piper Allen in a moody atmospheric setting"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative">
          <Image
            src="/images/piper-bokeh.jpg"
            alt="Piper Allen with soft bokeh background"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ── Quote + bio ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
          <blockquote className="font-serif italic text-forest text-3xl md:text-5xl leading-snug">
            &ldquo;Spreading goodness in towns and festivals&rdquo;
          </blockquote>

          <p className="font-sans font-light text-ink/65 text-base leading-relaxed">
            Piper Allen is a wandering folk artist whose songs carry the weight
            of open roads and quiet evenings. She performs intimate sets at
            festivals, theaters, and community halls — weaving stories of
            belonging, loss, and the small moments that hold a life together.
          </p>

          <Link
            href="/contact"
            className="border border-forest text-forest px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-forest hover:text-cream active:bg-[#1a2410] active:border-[#1a2410] active:text-cream"
          >
            Book Piper
          </Link>
        </div>
      </section>

      {/* ── Next show bar ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-forest text-cream">
        <Image
          src="/images/piper-stage.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-forest/80" aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="text-xs tracking-widest uppercase text-cream/50">
              Next Show
            </span>
            <span className="font-serif text-lg text-cream">
              Folkshire Festival
            </span>
            <span className="hidden sm:block text-cream/40 text-xs tracking-wide">
              Bath &nbsp;·&nbsp; 14 June 2026
            </span>
          </div>
          <Link
            href="/shows"
            className="text-xs tracking-widest uppercase text-cream/60 hover:text-cream transition-colors"
          >
            All Shows &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
