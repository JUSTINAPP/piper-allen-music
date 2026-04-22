"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Shows" },
  { href: "/lyrics", label: "Lyrics" },
  { href: "/press-kit", label: "Press Kit" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sage/30">
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-serif text-2xl text-forest tracking-wide"
        >
          Piper Allen
        </Link>

        <ul className="hidden sm:flex gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  pathname === href
                    ? "text-sienna"
                    : "text-ink hover:text-sienna"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-px bg-ink" />
          <span className="block w-6 h-px bg-ink" />
          <span className="block w-6 h-px bg-ink" />
        </button>
      </nav>

      {open && (
        <ul className="sm:hidden bg-cream border-t border-sage/30 px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block text-xs tracking-widest uppercase transition-colors ${
                  pathname === href
                    ? "text-sienna"
                    : "text-ink hover:text-sienna"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
