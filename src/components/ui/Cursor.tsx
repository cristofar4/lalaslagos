import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

/**
 * Custom cursor: a lime dot trailed by a ring that grows over interactive
 * elements and shows the `data-cursor` label. Renders nothing at all on
 * touch / coarse-pointer devices and for reduced-motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useGSAP(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-none");
    gsap.set([dot.current, ring.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3" });

    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) {
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const enter = (e: Event) => {
      const t = (e.target as HTMLElement).closest?.(
        "a,button,[data-cursor]",
      ) as HTMLElement | null;
      if (!t) return;
      const lbl = t.getAttribute("data-cursor") || "";
      setLabel(lbl);
      gsap.to(ring.current, {
        scale: lbl ? 2.8 : 1.9,
        backgroundColor: "rgba(201,242,77,0.12)",
        borderColor: "rgba(201,242,77,0.9)",
        duration: 0.3,
      });
      gsap.to(dot.current, { scale: 0.3, duration: 0.3 });
    };

    const leave = (e: Event) => {
      const t = (e.target as HTMLElement).closest?.("a,button,[data-cursor]");
      if (!t) return;
      setLabel("");
      gsap.to(ring.current, {
        scale: 1,
        backgroundColor: "rgba(201,242,77,0)",
        borderColor: "rgba(201,242,77,0.55)",
        duration: 0.3,
      });
      gsap.to(dot.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  });

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] flex h-10 w-10 items-center justify-center rounded-full border border-lime/55 text-[0.5rem] font-semibold uppercase tracking-widest text-lime opacity-0"
      >
        {label}
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-lime opacity-0"
      />
    </>
  );
}
