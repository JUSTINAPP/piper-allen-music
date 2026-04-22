export default function Footer() {
  return (
    <footer className="border-t border-sage/30 bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs tracking-widest uppercase text-ink/40">
        <span>© {new Date().getFullYear()} Piper Allen</span>
        <a
          href="https://www.instagram.com/piperallenmusic/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-ink/40 hover:text-ink transition-colors duration-150 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          Instagram
        </a>
      </div>
    </footer>
  );
}
