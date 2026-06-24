/** Hand-drawn botanical sprig — the "dark greenery" boho motif. */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M60 210 C60 160 60 110 60 20" />
        {/* leaf pairs along the stem */}
        <path d="M60 180 C34 176 22 160 24 138 C46 142 58 158 60 180Z" />
        <path d="M60 180 C86 176 98 160 96 138 C74 142 62 158 60 180Z" />
        <path d="M60 142 C36 138 26 122 28 102 C50 106 58 122 60 142Z" />
        <path d="M60 142 C84 138 94 122 92 102 C70 106 62 122 60 142Z" />
        <path d="M60 104 C40 100 32 86 34 68 C52 72 58 88 60 104Z" />
        <path d="M60 104 C80 100 88 86 86 68 C68 72 62 88 60 104Z" />
        <path d="M60 68 C46 64 40 52 42 38 C54 42 58 54 60 68Z" />
        <path d="M60 68 C74 64 80 52 78 38 C66 42 62 54 60 68Z" />
      </g>
    </svg>
  );
}
