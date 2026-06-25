import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  alpha: number;
  lime: boolean;
};

/**
 * Animated hero backdrop — drifting "ember" sparks (lime + cream) over a
 * slowly moving glow on near-black. Pure Canvas, no external dependency.
 * Honors prefers-reduced-motion (renders a single static frame).
 */
export function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let parts: Particle[] = [];

    const spawn = (initial: boolean): Particle => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + Math.random() * 40,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.35 + 0.1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.5 + 0.2,
      alpha: Math.random() * 0.45 + 0.15,
      lime: Math.random() < 0.45,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduced ? 26 : Math.min(90, Math.round((w * h) / 16000));
      parts = Array.from({ length: count }, () => spawn(true));
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0f0f0d";
      ctx.fillRect(0, 0, w, h);

      // Slow drifting glow
      const gx = w * (0.5 + 0.28 * Math.sin(t * 0.5));
      const gy = h * (0.42 + 0.22 * Math.cos(t * 0.42));
      const grad = ctx.createRadialGradient(
        gx,
        gy,
        0,
        gx,
        gy,
        Math.max(w, h) * 0.65,
      );
      grad.addColorStop(0, "rgba(201,242,77,0.12)");
      grad.addColorStop(0.45, "rgba(201,242,77,0.035)");
      grad.addColorStop(1, "rgba(15,15,13,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Sparks
      for (const p of parts) {
        p.y -= p.speed;
        p.sway += 0.01 * p.swaySpeed;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        const x = p.x + Math.sin(p.sway) * 14;
        const c = p.lime ? "201,242,77" : "244,241,233";
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${p.alpha})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${c},0.7)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      t += 0.006;
      render();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
