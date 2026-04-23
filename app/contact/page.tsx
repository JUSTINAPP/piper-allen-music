import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Book Piper Allen | Enquiries" },
  description:
    "Booking enquiries and contact information for folk artist Piper Allen — festivals, venues, private events.",
  alternates: { canonical: "https://piperallenmusic.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-forest mb-3">
        Book Piper
      </h1>
      <p className="font-sans font-light text-ink/55 text-sm tracking-widest uppercase mb-14">
        Festivals &middot; Venues &middot; Private Events
      </p>

      <ContactForm />
    </div>
  );
}
