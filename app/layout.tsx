import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300"],
});

const BASE_URL = "https://piperallenmusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Piper Allen",
    default: "Piper Allen",
  },
  description:
    "Piper Allen is a folk singer-songwriter from Djiringanj Country on the NSW South Coast, performing intimate sets at festivals, theatres, and community halls across Australia.",
  keywords: [
    "folk music",
    "NSW South Coast",
    "singer songwriter",
    "Piper Allen",
    "Piper and the Daymakers",
    "Djiringanj Country",
    "acoustic music",
    "bossa nova",
    "neo soul",
  ],
  openGraph: {
    siteName: "Piper Allen",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/images/piper-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Piper Allen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/piper-hero.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: { icon: "/images/piper-flama-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
