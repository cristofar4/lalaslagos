import { nav, site } from "../data/site";
import { scrollToSection } from "../lib/smoothScroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest pt-20 text-bone">
      <div className="container-x">
        <div className="grid gap-12 border-b border-bone/12 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-4xl italic">Lala's Bistro</p>
            <p className="mt-4 max-w-xs text-bone/65">
              A boho-chic resto-bar tucked inside Lala's Lagos. {site.location}.
            </p>
            <a
              href={site.phoneHref}
              className="btn btn--clay mt-7 inline-flex"
            >
              Reserve a table
            </a>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-bone/45">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.target}>
                  <button
                    onClick={() => scrollToSection(item.target)}
                    className="link-underline text-bone/80 hover:text-bone"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-bone/45">
              Find us
            </p>
            <address className="mt-5 not-italic leading-relaxed text-bone/80">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </address>
            <a
              href={site.phoneHref}
              className="link-underline mt-4 inline-block text-bone/80"
            >
              {site.phone}
            </a>
            <div className="mt-5 flex gap-5">
              {site.social.map((s) => (
                <a
                  key={s.handle}
                  href={s.href}
                  className="link-underline text-bone/70"
                >
                  {s.handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-7 text-xs text-bone/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection("#top")}
            className="link-underline uppercase tracking-[0.2em]"
          >
            Back to top ↑
          </button>
          <p>Crafted with React, Tailwind &amp; GSAP.</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-4 text-center font-display text-[24vw] leading-[0.78] text-bone/[0.04]"
      >
        Lala's
      </div>
    </footer>
  );
}
