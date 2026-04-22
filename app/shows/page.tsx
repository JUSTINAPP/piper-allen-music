import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";

export const metadata: Metadata = {
  title: { absolute: "Live Shows & Tour Dates | Piper Allen" },
  description:
    "Upcoming live shows and tour dates for folk singer-songwriter Piper Allen — festivals, venues, and free events across Australia.",
  alternates: { canonical: "https://piperallenmusic.com/shows" },
};

export const dynamic = "force-dynamic";

type ShowType = "festival" | "venue" | "free";

type Show = {
  date: string; // YYYY-MM-DD
  venue: string;
  location: string;
  type: ShowType;
  ticketUrl: string | null;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseLocal(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function groupShowsByMonth(list: Show[]) {
  const map = new Map<string, { label: string; shows: Show[] }>();
  for (const show of list) {
    const d = parseLocal(show.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!map.has(key)) {
      map.set(key, {
        label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
        shows: [],
      });
    }
    map.get(key)!.shows.push(show);
  }
  return Array.from(map.values());
}

const badgeStyles: Record<ShowType, string> = {
  festival: "bg-tangerine/15 text-tangerine",
  venue: "bg-sienna/15 text-sienna",
  free: "bg-sage/25 text-forest",
};

const badgeLabel: Record<ShowType, string> = {
  festival: "Festival",
  venue: "Venue",
  free: "Free",
};

export default async function ShowsPage() {
  const shows: Show[] = await client.fetch(
    `*[_type == 'show' && isPublished == true] | order(date asc) { date, venue, location, type, ticketUrl }`
  );

  const groups = groupShowsByMonth(shows);

  return (
    <>
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/piper-stage.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h1 className="font-serif text-4xl md:text-6xl text-cream text-center tracking-wide">
            Shows &amp; Touring
          </h1>
          <p className="font-sans font-light text-xs tracking-widest uppercase text-cream/60">
            2026 Season
          </p>
        </div>
      </div>

      {/* ── Show listings ────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        {groups.length === 0 ? (
          <p className="mt-20 text-center font-sans font-light text-ink/50 text-sm tracking-widest uppercase">
            No upcoming shows scheduled — check back soon
          </p>
        ) : (
          groups.map(({ label, shows: monthShows }) => (
            <section key={label}>
              <div className="flex items-center gap-4 mt-14 mb-1">
                <h2 className="font-sans text-xs tracking-widest uppercase text-ink/45 flex-shrink-0">
                  {label}
                </h2>
                <div className="flex-1 h-px bg-sage/25" />
              </div>

              {monthShows.map((show) => {
                const d = parseLocal(show.date);
                const dayNum = d.getDate();
                const weekday = WEEKDAYS[d.getDay()];

                return (
                  <div
                    key={show.date + show.venue}
                    className="flex items-center gap-4 md:gap-6 py-5 border-b border-sage/15"
                  >
                    <div className="w-12 md:w-14 flex-shrink-0 text-center">
                      <div className="font-serif text-4xl md:text-5xl text-forest leading-none">
                        {dayNum}
                      </div>
                      <div className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mt-0.5">
                        {weekday}
                      </div>
                    </div>

                    <div className="w-px h-10 bg-sage/35 flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-xl md:text-2xl text-ink leading-snug truncate">
                        {show.venue}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="font-sans font-light text-xs text-ink/50">
                          {show.location}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-wider uppercase ${badgeStyles[show.type]}`}
                        >
                          {badgeLabel[show.type]}
                        </span>
                      </div>
                    </div>

                    {show.ticketUrl ? (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 border border-tangerine bg-tangerine text-cream px-4 py-2 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-cream hover:text-tangerine active:bg-cream/85 active:text-tangerine"
                      >
                        Tickets
                      </a>
                    ) : (
                      <span className="flex-shrink-0 text-xs tracking-widest uppercase text-sage/80">
                        Free
                      </span>
                    )}
                  </div>
                );
              })}
            </section>
          ))
        )}

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <div className="mt-20 py-16 border-t border-sage/20 text-center flex flex-col items-center gap-6">
          <p className="font-serif italic text-forest text-2xl md:text-3xl">
            Looking to book Piper for your venue or festival?
          </p>
          <Link
            href="/contact"
            className="border border-forest text-forest px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-150 hover:bg-forest hover:text-cream active:bg-[#1a2410] active:border-[#1a2410] active:text-cream"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
