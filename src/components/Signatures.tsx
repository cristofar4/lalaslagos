import { useRef } from "react";
import { signatures } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";
import { ArtPanel } from "./ui/ArtPanel";

export function Signatures() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".sig-parallax").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="signatures"
      className="scroll-mt-24 bg-forest-deep py-24 text-bone md:py-36"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-ochre">
              <span data-reveal>Signatures</span>
            </Eyebrow>
            <h2 data-reveal className="mt-6 text-section text-bone">
              Four plates worth <br className="hidden md:block" />
              the <span className="italic text-ochre">trip.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-bone/60">
            The dishes our regulars order before they've even sat down.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((dish, i) => (
            <article
              key={dish.name}
              data-reveal
              className={`group ${i % 2 === 1 ? "lg:mt-12" : ""}`}
            >
              <div className="sig-parallax">
                <ArtPanel
                  tone={dish.tone}
                  image={dish.image}
                  className="arch-top relative aspect-[3/4] rounded-b-2xl transition-transform duration-700 group-hover:-translate-y-2"
                >
                  <span className="absolute left-4 top-4 rounded-full bg-black/15 px-3 py-1 text-[0.64rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm">
                    {dish.kicker}
                  </span>
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-display text-2xl leading-tight text-bone">
                      {dish.name}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-bone/75">
                      {dish.desc}
                    </p>
                  </div>
                </ArtPanel>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
