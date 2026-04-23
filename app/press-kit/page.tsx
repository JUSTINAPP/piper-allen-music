import type { Metadata } from "next";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";

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

type MediaItem = {
  title: string;
  mediaType: "photo" | "video";
  image?: { asset: { _ref: string; _type: string } };
  videoUrl?: string;
  caption?: string;
  featured: boolean;
};

function getEmbedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export default async function PressKitPage() {
  const [quotes, media] = await Promise.all([
    client.fetch<PressQuote[]>(`*[_type == 'pressQuote'] { quote, source }`),
    client.fetch<MediaItem[]>(
      `*[_type == 'media'] | order(featured desc, _createdAt desc) { title, mediaType, image, videoUrl, caption, featured }`
    ),
  ]);

  const photos = media.filter((m) => m.mediaType === "photo" && m.image);
  const videos = media.filter((m) => m.mediaType === "video" && m.videoUrl);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4">
        Press Kit
      </h1>
      <p className="font-sans font-light text-ink/60 text-sm tracking-widest uppercase mb-20">
        Bio, photos &amp; press materials
      </p>

      {/* ── Photo gallery ──────────────────────────────────────── */}
      {photos.length > 0 && (
        <section className="mb-20">
          <h2 className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mb-8">
            Photos
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {photos.map((item) => (
              <figure key={item.title} className="flex flex-col gap-2">
                <div className="relative aspect-[4/3] overflow-hidden bg-sage/10">
                  <Image
                    src={urlFor(item.image!).width(800).height(600).url()}
                    alt={item.caption ?? item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {item.caption && (
                  <figcaption className="font-sans font-light text-xs text-ink/45 leading-snug">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Video gallery ──────────────────────────────────────── */}
      {videos.length > 0 && (
        <section className="mb-20">
          <h2 className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mb-8">
            Video
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((item) => {
              const embedUrl = getEmbedUrl(item.videoUrl!);
              if (!embedUrl) return null;
              return (
                <figure key={item.title} className="flex flex-col gap-3">
                  <div className="relative aspect-video overflow-hidden bg-sage/10">
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  {(item.caption || item.title) && (
                    <figcaption className="font-sans font-light text-xs text-ink/45 leading-snug">
                      {item.caption ?? item.title}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Press quotes ───────────────────────────────────────── */}
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
