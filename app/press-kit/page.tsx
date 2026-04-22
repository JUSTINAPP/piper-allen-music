import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Press Kit & Bio | Piper Allen" },
  description:
    "Press kit, biography, and downloadable materials for folk artist Piper Allen and Piper and the Daymakers.",
  alternates: { canonical: "https://piperallenmusic.com/press-kit" },
};

export default function PressKitPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4">Press Kit</h1>
      <p className="font-sans font-light text-ink/60 text-sm tracking-widest uppercase">
        Bio, photos & press materials coming soon
      </p>
    </div>
  );
}
