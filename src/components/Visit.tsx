import { hours, images, site, visit } from "../data/site";
import { Eyebrow } from "./ui/Eyebrow";
import { ArtPanel } from "./ui/ArtPanel";
import { MagneticButton } from "./ui/MagneticButton";

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-t border-espresso/10 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-espresso/45">
        {label}
      </span>
      <span className="text-lg text-espresso">{children}</span>
    </div>
  );
}

export function Visit() {
  return (
    <section
      id="visit"
      className="scroll-mt-24 border-t border-espresso/10 bg-bone py-24 md:py-36"
    >
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — invitation + contact */}
        <div>
          <Eyebrow className="text-clay">
            <span data-reveal>{visit.eyebrow}</span>
          </Eyebrow>
          <h2 data-reveal className="mt-6 text-section text-forest">
            {visit.heading}
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-md text-lg leading-relaxed text-espresso/75"
          >
            {visit.body}
          </p>

          <div data-reveal className="mt-10">
            <ContactRow label="Address">
              {site.address.line1}, {site.address.line2}
            </ContactRow>
            <ContactRow label="Reservations">
              <a href={site.phoneHref} className="link-underline">
                {site.phone}
              </a>
            </ContactRow>
            <ContactRow label="Email">
              <a href={site.emailHref} className="link-underline">
                {site.email}
              </a>
            </ContactRow>
          </div>

          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href={site.phoneHref} className="btn btn--clay">
              Reserve a table
            </MagneticButton>
            <MagneticButton
              href={site.mapHref}
              className="btn btn--ghost text-espresso"
            >
              Get directions
            </MagneticButton>
          </div>
        </div>

        {/* Right — hours + map */}
        <div data-reveal className="flex flex-col gap-6">
          <div className="rounded-3xl bg-bone-soft p-8 ring-1 ring-espresso/5">
            <h3 className="font-display text-2xl text-forest">Opening hours</h3>
            <ul className="mt-5">
              {hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between border-t border-espresso/10 py-3.5 text-espresso/80"
                >
                  <span>{h.day}</span>
                  <span className="font-display text-lg text-clay">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-espresso/55">
              Breakfast · Brunch · Lunch · Dinner — served daily.
            </p>
          </div>

          <a href={site.mapHref} className="group block">
            <ArtPanel
              tone="sage"
              image={images.map}
              overlay={false}
              className="relative h-56 rounded-3xl ring-1 ring-espresso/5"
            >
              <div className="absolute inset-0 bg-forest-deep/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-bone">
                <svg
                  viewBox="0 0 24 24"
                  className="h-9 w-9 transition-transform duration-500 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span className="font-display text-xl">
                  {site.address.line1}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.2em] text-bone/80">
                  View on map →
                </span>
              </div>
            </ArtPanel>
          </a>
        </div>
      </div>
    </section>
  );
}
