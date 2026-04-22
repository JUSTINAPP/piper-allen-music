"use client";

import { useState } from "react";

type Lyric = {
  title: string;
  slug: { current: string };
  verses: string[] | null;
  chorus: string | null;
};

export default function LyricsViewer({ lyrics }: { lyrics: Lyric[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (lyrics.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4">
          Lyrics
        </h1>
        <p className="font-sans font-light text-ink/60 text-sm tracking-widest uppercase">
          Songs &amp; words coming soon
        </p>
      </div>
    );
  }

  const selected = lyrics[selectedIdx];

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-12">
        Lyrics
      </h1>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Mobile: select dropdown */}
        <select
          className="md:hidden font-sans text-sm border border-sage/40 bg-cream text-ink px-4 py-2.5 w-full"
          value={selectedIdx}
          onChange={(e) => setSelectedIdx(Number(e.target.value))}
        >
          {lyrics.map((lyric, i) => (
            <option key={lyric.slug.current} value={i}>
              {lyric.title}
            </option>
          ))}
        </select>

        {/* Desktop: sidebar */}
        <aside className="hidden md:block w-44 flex-shrink-0">
          <p className="font-sans text-[10px] tracking-widest uppercase text-ink/35 mb-4">
            Songs
          </p>
          <ul className="space-y-0.5">
            {lyrics.map((lyric, i) => (
              <li key={lyric.slug.current}>
                <button
                  onClick={() => setSelectedIdx(i)}
                  className={`text-left w-full font-sans text-sm py-1.5 pl-3 border-l-2 transition-colors duration-150 ${
                    i === selectedIdx
                      ? "text-forest border-forest"
                      : "text-ink/45 border-transparent hover:text-ink hover:border-sage/40"
                  }`}
                >
                  {lyric.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Lyrics content */}
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
            {selected.title}
          </h2>

          {selected.verses?.map((verse, i) => (
            <div key={i} className="mb-7">
              {verse.split("\n").map((line, j) => (
                <p
                  key={j}
                  className="font-sans font-light text-ink/80 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}

          {selected.chorus && (
            <div className="mt-10 pl-6 border-l-2 border-sage/40">
              <p className="font-sans text-[10px] tracking-widest uppercase text-ink/35 mb-4">
                Chorus
              </p>
              {selected.chorus.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="font-serif italic text-forest text-lg leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
