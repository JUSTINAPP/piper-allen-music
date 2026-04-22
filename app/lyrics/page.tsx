import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import LyricsViewer from "./LyricsViewer";

export const metadata: Metadata = {
  title: { absolute: "Song Lyrics | Piper Allen" },
  description: "Song lyrics from folk singer-songwriter Piper Allen.",
  alternates: { canonical: "https://piperallenmusic.com/lyrics" },
};

export const dynamic = "force-dynamic";

type Lyric = {
  title: string;
  slug: { current: string };
  verses: string[] | null;
  chorus: string | null;
};

export default async function LyricsPage() {
  const lyrics: Lyric[] = await client.fetch(
    `*[_type == 'lyrics'] | order(title asc) { title, slug, verses, chorus }`
  );

  return <LyricsViewer lyrics={lyrics} />;
}
