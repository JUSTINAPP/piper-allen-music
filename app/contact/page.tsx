import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Book Piper Allen | Enquiries" },
  description:
    "Booking enquiries and contact information for folk artist Piper Allen — festivals, venues, private events.",
  alternates: { canonical: "https://piperallenmusic.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4">Contact</h1>
      <p className="font-sans font-light text-ink/60 text-sm tracking-widest uppercase">
        Booking & enquiries coming soon
      </p>
    </div>
  );
}
