import type { CSSProperties } from "react";
import type { Tone } from "../../data/site";
import { Sprig } from "./Sprig";

/**
 * Art-directed panel. Renders a layered, boho gradient composition (grain +
 * vignette + optional botanical) so the site is cohesive with zero external
 * image dependencies. Pass `image` to drop in real photography instead.
 */

const tones: Record<Tone, CSSProperties> = {
  forest: {
    backgroundImage: [
      "radial-gradient(120% 110% at 18% 8%, rgba(154,165,137,0.55) 0%, transparent 52%)",
      "radial-gradient(120% 120% at 88% 96%, rgba(201,162,75,0.30) 0%, transparent 50%)",
      "linear-gradient(155deg, #2c362c 0%, #222a22 100%)",
    ].join(","),
  },
  clay: {
    backgroundImage: [
      "radial-gradient(120% 110% at 82% 10%, rgba(217,189,122,0.45) 0%, transparent 55%)",
      "linear-gradient(155deg, #c0694a 0%, #a8472b 100%)",
    ].join(","),
  },
  ochre: {
    backgroundImage: [
      "radial-gradient(110% 110% at 20% 16%, rgba(243,234,217,0.85) 0%, transparent 58%)",
      "linear-gradient(155deg, #d9bd7a 0%, #c0694a 100%)",
    ].join(","),
  },
  sage: {
    backgroundImage: [
      "radial-gradient(120% 120% at 80% 14%, rgba(243,234,217,0.45) 0%, transparent 55%)",
      "linear-gradient(155deg, #9aa589 0%, #59634a 100%)",
    ].join(","),
  },
  dusk: {
    backgroundImage: [
      "radial-gradient(120% 90% at 50% 0%, rgba(201,162,75,0.40) 0%, transparent 55%)",
      "linear-gradient(160deg, #c0694a 0%, #59634a 58%, #2c362c 100%)",
    ].join(","),
  },
  bone: {
    backgroundImage: "linear-gradient(155deg, #efe4cf 0%, #e7d6ba 100%)",
  },
};

interface ArtPanelProps {
  tone?: Tone;
  image?: string;
  className?: string;
  /** Show the botanical sprig overlay (default true for greenery tones). */
  sprig?: boolean;
  children?: React.ReactNode;
}

export function ArtPanel({
  tone = "forest",
  image,
  className = "",
  sprig,
  children,
}: ArtPanelProps) {
  const showSprig = sprig ?? (tone === "forest" || tone === "sage");
  const sprigColor =
    tone === "bone" || tone === "ochre" ? "text-olive/30" : "text-bone/25";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={image ? undefined : tones[tone]}
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* inner vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 30%, transparent 55%, rgba(36,27,18,0.28) 100%)",
        }}
      />

      {/* local grain */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] mix-blend-overlay"
      >
        <filter id={`panel-grain-${tone}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#panel-grain-${tone})`}
        />
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
