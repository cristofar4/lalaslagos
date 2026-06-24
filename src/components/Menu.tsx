import { menu } from "../data/site";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";

export function Menu() {
  return (
    <section
      id="menu"
      className="scroll-mt-24 bg-cream py-24 text-ink md:py-36"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-ink/60">Kitchen &amp; Bar</Eyebrow>
            <Headline
              as="h2"
              text={"From here & away"}
              accent="away"
              className="mt-6 text-section text-ink"
            />
          </div>
          <p className="text-sm uppercase tracking-[0.16em] text-ink/50">
            Plates ₦7,000–12,000 · Bar ₦3,500–5,000
          </p>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {menu.map((cat) => (
            <div key={cat.id} data-reveal>
              <div className="flex items-baseline justify-between border-b border-ink/20 pb-3">
                <h3 className="font-display text-2xl text-ink">{cat.label}</h3>
                <span className="max-w-[14rem] text-right text-xs text-ink/45">
                  {cat.note}
                </span>
              </div>

              <ul className="mt-6 space-y-6">
                {cat.items.map((item) => (
                  <li key={item.name} className="group">
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-display text-xl text-ink">
                        {item.name}
                      </h4>
                      {item.tag && (
                        <span className="rounded-full bg-lime px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink">
                          {item.tag}
                        </span>
                      )}
                      <span className="mb-1 hidden flex-1 self-end border-b border-dotted border-ink/30 sm:block" />
                      <span className="ml-auto font-display text-xl text-ink sm:ml-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-md text-sm text-ink/55">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
