import { useEffect, useRef, useState } from "react";
import { nav, site } from "../data/site";
import { scrollToSection } from "../lib/smoothScroll";
import { gsap, useGSAP } from "../lib/gsap";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  // Solidify the bar after a little scroll.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  // Animate the mobile overlay.
  useGSAP(
    () => {
      if (!overlay.current) return;
      if (open) {
        gsap.set(overlay.current, { display: "flex" });
        gsap
          .timeline()
          .fromTo(
            overlay.current,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" },
          )
          .from(
            ".m-link",
            { y: 40, autoAlpha: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
            "-=0.25",
          );
      } else {
        gsap.to(overlay.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "expo.in",
          onComplete: () => gsap.set(overlay.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] },
  );

  const go = (target: string) => {
    setOpen(false);
    // wait a tick so the overlay close doesn't fight the scroll
    setTimeout(() => scrollToSection(target), open ? 220 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bone/85 py-3 shadow-[0_1px_0_rgba(36,27,18,0.08)] backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <button
            onClick={() => scrollToSection("#top")}
            className="font-display text-2xl italic leading-none tracking-tight text-espresso"
            aria-label="Lala's Bistro — back to top"
          >
            Lala's
            <span className="ml-1 not-italic text-clay">·</span>
          </button>

          <ul className="hidden items-center gap-9 text-[0.82rem] font-medium text-espresso/80 md:flex">
            {nav.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  className="link-underline uppercase tracking-[0.14em] transition-colors hover:text-espresso"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="btn btn--clay hidden md:inline-flex"
            >
              Reserve
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span
                className={`h-px w-7 bg-current transition-all duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                } ${open ? "text-bone" : "text-espresso"}`}
              />
              <span
                className={`h-px w-7 bg-current transition-all duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                } ${open ? "text-bone" : "text-espresso"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[100] hidden flex-col bg-forest px-6 pb-10 pt-28 text-bone"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <ul className="mt-6 flex flex-col gap-2">
          {nav.map((item, i) => (
            <li key={item.target} className="overflow-hidden">
              <button
                onClick={() => go(item.target)}
                className="m-link flex w-full items-baseline gap-4 border-b border-bone/12 py-4 text-left font-display text-4xl"
              >
                <span className="text-sm text-ochre">
                  0{i + 1}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4">
          <a href={site.phoneHref} className="btn btn--clay m-link self-start">
            Reserve a table
          </a>
          <p className="m-link text-sm text-bone/60">
            {site.address.line1}, {site.address.line2}
          </p>
          <div className="m-link flex gap-5 text-sm text-bone/70">
            {site.social.map((s) => (
              <a key={s.handle} href={s.href} className="link-underline">
                {s.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
