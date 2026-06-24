import { hours, images, site, visit } from "../data/site";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";
import { MagneticButton } from "./ui/MagneticButton";
import { SmartImg } from "./ui/SmartImg";

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-t border-line py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-stone">
        {label}
      </span>
      <span className="text-lg text-cream">{children}</span>
    </div>
  );
}

export function Visit() {
  return (
    <section
      id="visit"
      className="scroll-mt-24 border-t border-line bg-ink py-24 md:py-36"
    >
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Invitation + contact */}
        <div>
          <Eyebrow className="text-stone">{visit.eyebrow}</Eyebrow>
          <Headline
            as="h2"
            text={visit.heading}
            accent="Williams"
            className="mt-6 text-section text-cream"
          />
          <p
            data-reveal
            className="mt-6 max-w-md text-lg leading-relaxed text-cream/70"
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
            <MagneticButton href={site.phoneHref} className="btn">
              Reserve a table
            </MagneticButton>
            <MagneticButton href={site.mapHref} className="btn btn--ghost">
              Get directions
            </MagneticButton>
          </div>
        </div>

        {/* Hours + map */}
        <div data-reveal className="flex flex-col gap-6">
          <div className="rounded-3xl bg-ink-soft p-8 ring-1 ring-cream/10">
            <h3 className="font-display text-2xl text-cream">Opening hours</h3>
            <ul className="mt-5">
              {hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between border-t border-line py-3.5 text-cream/80"
                >
                  <span>{h.day}</span>
                  <span className="font-display text-lg text-lime">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-stone">
              Breakfast · Brunch · Lunch · Dinner — served daily.
            </p>
          </div>

          <a
            href={site.mapHref}
            data-cursor="Map"
            className="group relative block h-56 overflow-hidden rounded-3xl ring-1 ring-cream/10"
          >
            <SmartImg
              src={images.map}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cream">
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 text-lime transition-transform duration-500 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="font-display text-xl">{site.address.line1}</span>
              <span className="text-[0.72rem] uppercase tracking-[0.2em] text-cream/80">
                View on map →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
