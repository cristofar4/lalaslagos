import { useEffect, useRef, useState } from "react";
import { nav, site } from "../data/site";
import { scrollToSection } from "../lib/smoothScroll";
import { gsap, useGSAP } from "../lib/gsap";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

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
    setTimeout(() => scrollToSection(target), open ? 220 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-cream transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 py-3 shadow-[0_1px_0_rgba(244,241,233,0.08)] backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <button
            onClick={() => scrollToSection("#top")}
            className="font-display text-2xl italic leading-none tracking-tight"
            aria-label="Lala's Bistro — back to top"
          >
            Lala's
          </button>

          <ul className="hidden items-center gap-9 text-[0.8rem] font-medium text-cream/70 md:flex">
            {nav.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => go(item.target)}
                  className="link-underline uppercase tracking-[0.14em] transition-colors hover:text-cream"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="btn hidden md:inline-flex">
              Reserve
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[6px] text-cream transition-opacity duration-200 md:hidden ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="h-px w-7 bg-current" />
              <span className="h-px w-7 bg-current" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[100] hidden flex-col bg-ink text-cream"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="font-display text-2xl italic">Lala's</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="m-link flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div
          data-lenis-prevent
          className="flex flex-1 flex-col overflow-y-auto px-6 pb-12 pt-8"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.target} className="overflow-hidden">
                <button
                  onClick={() => go(item.target)}
                  className="m-link flex w-full items-baseline gap-4 border-b border-cream/10 py-4 text-left font-display text-4xl"
                >
                  <span className="text-sm text-lime">0{i + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4">
            <a href={site.phoneHref} className="btn m-link self-start">
              Reserve a table
            </a>
            <p className="m-link text-sm text-stone">
              {site.address.line1}, {site.address.line2}
            </p>
            <div className="m-link flex gap-5 text-sm text-cream/70">
              {site.social.map((s) => (
                <a key={s.handle} href={s.href} className="link-underline">
                  {s.handle}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
