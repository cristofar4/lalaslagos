import { createElement, useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

interface HeadlineProps {
  text: string;
  /** Word (case-insensitive) to highlight with the lime marker. */
  accent?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  start?: string;
}

/** Masked, word-by-word reveal on scroll. */
export function Headline({
  text,
  accent,
  as = "h2",
  className = "",
  start = "top 85%",
}: HeadlineProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".hl-word", ref.current!);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { yPercent: 0 });
        return;
      }
      gsap.set(words, { yPercent: 118 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start },
      });
    },
    { scope: ref },
  );

  const parts = text.split(" ");
  const children: ReactNode[] = [];
  parts.forEach((word, i) => {
    const clean = word.replace(/[^\p{L}\p{N}]/gu, "");
    const isAccent = accent && clean.toLowerCase() === accent.toLowerCase();
    children.push(
      createElement(
        "span",
        {
          key: `w${i}`,
          className: "inline-block overflow-hidden pb-[0.1em] align-bottom",
        },
        createElement(
          "span",
          { className: `hl-word inline-block ${isAccent ? "mark" : ""}` },
          word,
        ),
      ),
    );
    // breakable space as a sibling text node, outside the clip mask
    if (i < parts.length - 1) children.push(" ");
  });

  return createElement(as, { ref, className } as never, ...children);
}
