import { manifesto } from "../data/site";
import { Eyebrow } from "./ui/Eyebrow";
import { Headline } from "./ui/Headline";

export function Manifesto() {
  return (
    <section className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <Eyebrow className="text-stone">{manifesto.eyebrow}</Eyebrow>
        <Headline
          as="h2"
          text={manifesto.lead}
          accent={manifesto.accent}
          className="mt-7 max-w-5xl font-display text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.98] text-cream"
        />
        <p
          data-reveal
          className="mt-9 max-w-xl text-lg leading-relaxed text-cream/65"
        >
          {manifesto.body}
        </p>
      </div>
    </section>
  );
}
