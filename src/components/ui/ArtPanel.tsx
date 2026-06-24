import { useState, type CSSProperties } from "react";
import type { Tone } from "../../data/site";
import { Sprig } from "./Sprig";

/**
 * Art-directed panel. Renders real photography when `image` is supplied, with a
 * matured gradient composition (grain + vignette) underneath as a graceful
 * fallback — so a missing/blocked image never shows a broken-image icon.
 */

const tones: Record<Tone, CSSProperties> = {
  forest: {
    backgroundImage: [
      "radial-gradient(120% 110% at 18% 8%, rgba(155,150,138,0.26) 0%, transparent 52%)",
      "radial-gradient(120% 120% at 86% 95%, rgba(201,242,77,0.16) 0%, transparent 50%)",
      "linear-gradient(155deg, #1e1e1a 0%, #0f0f0d 100%)",
    ].join(","),
  },
  clay: {
    backgroundImage: [
      "radial-gradient(120% 110% at 80% 12%, rgba(201,242,77,0.20) 0%, transparent 55%)",
      "linear-gradient(155deg, #232320 0%, #111110 100%)",
    ].join(","),
  },
  ochre: {
    backgroundImage: [
      "radial-gradient(110% 110% at 22% 16%, rgba(201,242,77,0.22) 0%, transparent 58%)",
      "linear-gradient(155deg, #20201c 0%, #101010 100%)",
    ].join(","),
  },
  sage: {
    backgroundImage: [
      "radial-gradient(120% 120% at 80% 14%, rgba(155,150,138,0.24) 0%, transparent 55%)",
      "linear-gradient(155deg, #1e1e1a 0%, #121210 100%)",
    ].join(","),
  },
  dusk: {
    backgroundImage: [
      "radial-gradient(120% 90% at 50% 0%, rgba(201,242,77,0.18) 0%, transparent 55%)",
      "linear-gradient(160deg, #232320 0%, #16160f 58%, #0d0d0b 100%)",
    ].join(","),
  },
  bone: {
    backgroundImage: "linear-gradient(155deg, #f4f1e9 0%, #e7e2d4 100%)",
  },
};

interface ArtPanelProps {
  tone?: Tone;
  image?: string;
  className?: string;
  /** Show the botanical sprig overlay (defaults on for greenery tones w/o photo). */
  sprig?: boolean;
  /** Darken the lower portion so overlaid text stays legible (default true). */
  overlay?: boolean;
  children?: React.ReactNode;
}

export function ArtPanel({
  tone = "forest",
  image,
  className = "",
  sprig,
  overlay = true,
  children,
}: ArtPanelProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;
  const showSprig = sprig ?? (!showImage && (tone === "forest" || tone === "sage"));
  const sprigColor = tone === "bone" ? "text-ink/20" : "text-cream/12";

  return (
    <div className={`relative overflow-hidden ${className}`} style={tones[tone]}>
      {showImage && (
        <img
          src={image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* legibility wash for overlaid text */}
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(24,21,15,0.74) 0%, rgba(24,21,15,0.18) 46%, rgba(24,21,15,0.04) 78%)",
          }}
        />
      )}

      {/* inner vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 28%, transparent 55%, rgba(24,21,15,0.30) 100%)",
        }}
      />

      {/* local grain */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
      >
        <filter id={`panel-grain-${tone}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#panel-grain-${tone})`} />
      </svg>

      {showSprig && (
        <Sprig
          className={`pointer-events-none absolute -right-6 bottom-[-2rem] h-[70%] ${sprigColor}`}
        />
      )}

      {children}
    </div>
  );
}
