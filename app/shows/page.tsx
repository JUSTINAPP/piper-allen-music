import Image from "next/image";
import Link from "next/link";

type ShowType = "festival" | "venue" | "free";

type Show = {
  date: string; // YYYY-MM-DD
  venue: string;
  location: string;
  type: ShowType;
  ticketUrl: string;
};

const shows: Show[] = [
  // May 2026
  { date: "2026-05-02", venue: "The Hare & Hound", location: "Birmingham, UK", type: "venue", ticketUrl: "#" },
  { date: "2026-05-09", venue: "Cornbury Music Festival", location: "Oxfordshire, UK", type: "festival", ticketUrl: "#" },
  { date: "2026-05-16", venue: "The Glad Cafe", location: "Glasgow, UK", type: "venue", ticketUrl: "#" },
  { date: "2026-05-23", venue: "Busk in the Park", location: "Sheffield, UK", type: "free", ticketUrl: "" },
  // June 2026
  { date: "2026-06-06", venue: "End of the Road Festival", location: "Dorset, UK", type: "festival", ticketUrl: "#" },
  { date: "2026-06-14", venue: "Folkshire Festival", location: "Bath, UK", type: "festival", ticketUrl: "#" },
  { date: "2026-06-20", venue: "Union Chapel", location: "London, UK", type: "venue", ticketUrl: "#" },
  { date: "2026-06-27", venue: "Village Green Sessions", location: "Norwich, UK", type: "free", ticketUrl: "" },
  // July 2026
  { date: "2026-07-04", venue: "Cambridge Folk Festival", location: "Cambridge, UK", type: "festival", ticketUrl: "#" },
  { date: "2026-07-11", venue: "The Trades Club", location: "Hebden Bridge, UK", type: "venue", ticketUrl: "#" },
  { date: "2026-07-18", venue: "Latitude Festival", location: "Suffolk, UK", type: "festival", ticketUrl: "#" },
  // August 2026
  { date: "2026-08-01", venue: "Green Man Festival", location: "Brecon Beacons, UK", type: "festival", ticketUrl: "#" },
  { date: "2026-08-15", venue: "The Roundhouse", location: "London, UK", type: "venue", ticketUrl: "#" },
  { date: "2026-08-22", venue: "Beautiful Days Festival", location: "Devon, UK", type: "festival", ticketUrl: "#" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Parse YYYY-MM-DD as local time to avoid UTC day-shift
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

export default function ShowsPage() {
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
        {groups.map(({ label, shows: monthShows }) => (
          <section key={label}>
            {/* Month heading */}
            <div className="flex items-center gap-4 mt-14 mb-1">
              <h2 className="font-sans text-xs tracking-widest uppercase text-ink/45 flex-shrink-0">
                {label}
              </h2>
              <div className="flex-1 h-px bg-sage/25" />
            </div>

            {/* Show rows */}
            {monthShows.map((show) => {
              const d = parseLocal(show.date);
              const dayNum = d.getDate();
              const weekday = WEEKDAYS[d.getDay()];

              return (
                <div
                  key={show.date + show.venue}
                  className="flex items-center gap-4 md:gap-6 py-5 border-b border-sage/15"
                >
                  {/* Date */}
                  <div className="w-12 md:w-14 flex-shrink-0 text-center">
                    <div className="font-serif text-4xl md:text-5xl text-forest leading-none">
                      {dayNum}
                    </div>
                    <div className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mt-0.5">
                      {weekday}
                    </div>
                  </div>

                  {/* Thin divider */}
                  <div className="w-px h-10 bg-sage/35 flex-shrink-0" />

                  {/* Venue + location */}
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-xl md:text-2xl text-ink leading-snug truncate">
                      {show.venue}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="font-sans font-light text-xs text-ink/50">
                        {show.location}
                      </span>
                      {/* Badge: visible on all sizes, inlined on mobile */}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-wider uppercase ${badgeStyles[show.type]}`}
                      >
                        {badgeLabel[show.type]}
                      </span>
                    </div>
                  </div>

                  {/* Ticket button */}
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
        ))}

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
