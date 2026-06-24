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
      "radial-gradient(120% 110% at 18% 8%, rgba(138,135,115,0.42) 0%, transparent 52%)",
      "radial-gradient(120% 120% at 88% 96%, rgba(176,137,79,0.28) 0%, transparent 50%)",
      "linear-gradient(155deg, #242019 0%, #18150f 100%)",
    ].join(","),
  },
  clay: {
    backgroundImage: [
      "radial-gradient(120% 110% at 82% 10%, rgba(204,174,126,0.38) 0%, transparent 55%)",
      "linear-gradient(155deg, #7c403b 0%, #5e302c 100%)",
    ].join(","),
  },
  ochre: {
    backgroundImage: [
      "radial-gradient(110% 110% at 20% 16%, rgba(239,233,221,0.55) 0%, transparent 58%)",
      "linear-gradient(155deg, #b0894f 0%, #7c5a32 100%)",
    ].join(","),
  },
  sage: {
    backgroundImage: [
      "radial-gradient(120% 120% at 80% 14%, rgba(239,233,221,0.32) 0%, transparent 55%)",
      "linear-gradient(155deg, #8a8773 0%, #565040 100%)",
    ].join(","),
  },
  dusk: {
    backgroundImage: [
      "radial-gradient(120% 90% at 50% 0%, rgba(176,137,79,0.32) 0%, transparent 55%)",
      "linear-gradient(160deg, #7c403b 0%, #565040 58%, #18150f 100%)",
    ].join(","),
  },
  bone: {
    backgroundImage: "linear-gradient(155deg, #e6dfd1 0%, #d8cdb9 100%)",
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
  const sprigColor =
    tone === "bone" || tone === "ochre" ? "text-olive/30" : "text-bone/25";

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
