import { useRef, useState } from "react";
import { menu } from "../data/site";
import { gsap, useGSAP } from "../lib/gsap";
import { Eyebrow } from "./ui/Eyebrow";

export function Menu() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const category = menu[active];

  // Re-animate the item list whenever the category changes.
  useGSAP(
    () => {
      gsap.from(".menu-item", {
        y: 26,
        autoAlpha: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.07,
      });
      gsap.from(".menu-note", { autoAlpha: 0, duration: 0.6 });
    },
    { scope: listRef, dependencies: [active] },
  );

  return (
    <section
      id="menu"
      className="scroll-mt-24 border-t border-espresso/10 bg-bone-soft py-24 md:py-36"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-clay">
              <span data-reveal>Kitchen &amp; Bar</span>
            </Eyebrow>
            <h2 data-reveal className="mt-6 text-section text-forest">
              Plates from here <span className="italic text-clay">&amp;</span>{" "}
              away.
            </h2>
          </div>
          <p
            data-reveal
            className="text-sm uppercase tracking-[0.16em] text-espresso/50"
          >
            Plates ₦7,000–12,000 · Bar ₦3,500–5,000
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[clamp(220px,26%,300px)_1fr] lg:gap-16">
          {/* Tabs */}
          <div>
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
              {menu.map((cat, i) => {
                const on = i === active;
                return (
                  <li key={cat.id} className="shrink-0">
                    <button
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center gap-3 rounded-full px-4 py-3 text-left transition-colors lg:rounded-xl ${
                        on
                          ? "bg-forest text-bone lg:bg-transparent lg:text-forest"
                          : "text-espresso/45 hover:text-espresso"
                      }`}
                    >
                      <span
                        className={`text-xs ${on ? "text-ochre" : "text-espresso/30"}`}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl">{cat.label}</span>
                      <span
                        className={`ml-auto hidden h-px flex-1 origin-left bg-clay transition-transform duration-500 lg:block ${
                          on ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Items */}
          <div ref={listRef} key={category.id}>
            <p className="menu-note mb-8 max-w-md font-display text-xl italic text-espresso/60">
              {category.note}
            </p>
            <ul>
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="menu-item group border-b border-espresso/10 py-6"
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl text-forest transition-colors group-hover:text-clay md:text-3xl">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="rounded-full bg-clay/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-clay">
                        {item.tag}
                      </span>
                    )}
                    <span className="mb-1 hidden flex-1 self-end border-b border-dotted border-espresso/25 sm:block" />
                    <span className="ml-auto font-display text-2xl text-clay sm:ml-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-espresso/60">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
