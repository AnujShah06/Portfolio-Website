"use client";

import { useEffect, useRef, useState } from "react";
import s from "./fx.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** phase offset so the nodes pulse out of sync */
  ph: number;
};

type Ripple = { x: number; y: number; t: number };

const LINK_DIST = 134;
const POINTER_DIST = 200;
const MAX_RIPPLES = 4;
const RIPPLE_LIFE = 92;

/**
 * Full-viewport constellation of nodes that link to each other and to the
 * cursor. Clicking sends a shockwave through the field.
 */
export default function NeuralField({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let raf = 0;
    let tick = 0;
    let disposed = false;

    const pointer = { x: -9999, y: -9999, active: false };

    const seed = () => {
      const target = Math.round(
        Math.min(140, Math.max(36, (w * h) / 16500))
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.4 + 0.7,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      tick += 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap around the edges so the field never thins out
        if (p.x < -30) p.x = w + 30;
        else if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        else if (p.y > h + 30) p.y = -30;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_DIST * POINTER_DIST) {
            const d = Math.sqrt(d2) || 1;
            // pull gently toward the cursor, but shove away up close
            const pull = d < 56 ? -0.055 : 0.03;
            const f = (1 - d / POINTER_DIST) * pull;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        for (const rp of ripples) {
          const radius = rp.t * 9.5;
          const dx = p.x - rp.x;
          const dy = p.y - rp.y;
          const d = Math.hypot(dx, dy) || 1;
          const band = Math.abs(d - radius);
          if (band < 44) {
            const f = (1 - band / 44) * 0.09;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.vx *= 0.986;
        p.vy *= 0.986;

        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1.6) {
          p.vx = (p.vx / sp) * 1.6;
          p.vy = (p.vy / sp) * 1.6;
        } else if (sp < 0.035) {
          // never let a node come to a full stop
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
      }

      ripples = ripples
        .map((r) => ({ ...r, t: r.t + 1 }))
        .filter((r) => r.t < RIPPLE_LIFE);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // node-to-node links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / LINK_DIST) * 0.17;
          ctx.strokeStyle = `rgba(56,189,248,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // links from the cursor into the field
      if (pointer.active) {
        for (const p of particles) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > POINTER_DIST * POINTER_DIST) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / POINTER_DIST) * 0.5;
          ctx.strokeStyle = `rgba(125,211,252,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const p of particles) {
        const pulse = reduced ? 0.6 : 0.5 + 0.35 * Math.sin(tick * 0.02 + p.ph);
        let near = 0;
        if (pointer.active) {
          const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
          near = d < POINTER_DIST ? 1 - d / POINTER_DIST : 0;
        }
        const alpha = Math.min(0.95, 0.28 + pulse * 0.32 + near * 0.55);
        const radius = p.r * (1 + near * 0.9);
        ctx.fillStyle = `rgba(${near > 0.55 ? "165,243,252" : "56,189,248"},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // shockwave rings
      for (const rp of ripples) {
        const progress = rp.t / RIPPLE_LIFE;
        const alpha = (1 - progress) * 0.34;
        ctx.strokeStyle = `rgba(56,189,248,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.t * 9.5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
    };

    const loop = () => {
      if (disposed) return;
      step();
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if (ripples.length >= MAX_RIPPLES) ripples.shift();
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
    };
    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !reduced && !disposed) {
        raf = window.requestAnimationFrame(loop);
      }
    };

    resize();
    setReady(true);

    if (reduced) {
      // one static frame, no animation, no pointer reactivity
      const redraw = () => {
        resize();
        draw();
      };
      draw();
      window.addEventListener("resize", redraw);
      return () => {
        disposed = true;
        window.removeEventListener("resize", redraw);
      };
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = window.requestAnimationFrame(loop);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`${s.field} ${ready ? s.fieldReady : ""}`}
      aria-hidden="true"
    />
  );
}
