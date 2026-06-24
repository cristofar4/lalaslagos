import { useRef } from "react";
import { gallery } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";
import { SmartImg } from "./ui/SmartImg";

function Imgs({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 gap-4" aria-hidden="true">
      {items.map((src, i) => (
        <SmartImg
          key={i}
          src={src}
          className="h-40 w-64 shrink-0 rounded-2xl object-cover md:h-56 md:w-80"
        />
      ))}
    </div>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const items = reverse ? [...gallery].reverse() : gallery;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          ease: "none",
          duration: 40,
          repeat: -1,
        },
      );
    },
    { scope: track },
  );

  return (
    <div className="edge-fade overflow-hidden">
      <div ref={track} className="flex w-max gap-4">
        <Imgs items={items} />
        <Imgs items={items} />
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="overflow-hidden bg-ink py-24 md:py-32">
      <div className="container-x">
        <Eyebrow className="text-stone">The room</Eyebrow>
        <Headline
          as="h2"
          text="Moments at the table"
          accent="table"
          className="mt-6 text-section text-cream"
        />
      </div>

      <div className="mt-14 space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
