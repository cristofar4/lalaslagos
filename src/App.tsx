import { useRef, useState } from "react";
import { useSmoothScroll } from "./lib/smoothScroll";
import { gsap, useGSAP, ScrollTrigger } from "./lib/gsap";

import { Grain } from "./components/ui/Grain";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Story } from "./components/Story";
import { Menu } from "./components/Menu";
import { Signatures } from "./components/Signatures";
import { Patio } from "./components/Patio";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const app = useRef<HTMLDivElement>(null);

  useSmoothScroll();

  // Global scroll-reveal for any element tagged with [data-reveal].
  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!els.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(els, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(els, { y: 32, autoAlpha: 0 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: app },
  );

  return (
    <div ref={app}>
      <Grain />
      <Preloader onComplete={() => setLoaded(true)} />
      <Navbar />
      <main>
        <Hero start={loaded} />
        <Marquee />
        <Story />
        <Menu />
        <Signatures />
        <Patio />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
