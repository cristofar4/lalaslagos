import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * A button/link with a subtle magnetic pull toward the cursor.
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = "btn",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        xTo(relX * 0.35);
        yTo(relY * 0.45);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref },
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
