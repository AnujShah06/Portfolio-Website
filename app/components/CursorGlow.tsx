"use client";

import { useEffect, useRef } from "react";
import s from "./fx.module.css";

/**
 * Soft cyan spotlight that trails the pointer, plus a HUD reticle that snaps
 * open over anything clickable. Hidden on touch devices and reduced motion.
 */
export default function CursorGlow({ enabled = true }: { enabled?: boolean }) {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let gx = tx;
    let gy = ty;
    let rx = tx;
    let ry = ty;
    let live = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      if (!live) {
        live = true;
        glow.classList.add(s.cursorLive);
        ring.classList.add(s.cursorLive);
      }

      const target = e.target as HTMLElement | null;
      const hot = !!target?.closest?.(
        'a, button, [role="button"], input, [data-cursor="hot"]'
      );
      ring.classList.toggle(s.cursorRingHot, hot);
    };

    const onLeave = () => {
      live = false;
      glow.classList.remove(s.cursorLive);
      ring.classList.remove(s.cursorLive);
    };

    const loop = () => {
      gx += (tx - gx) * 0.09;
      gy += (ty - gy) * 0.09;
      rx += (tx - rx) * 0.3;
      ry += (ty - ry) * 0.3;
      glow.style.transform = `translate3d(${gx.toFixed(2)}px, ${gy.toFixed(2)}px, 0)`;
      ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className={s.cursorGlow} aria-hidden="true" />
      <div ref={ringRef} className={s.cursorRing} aria-hidden="true" />
    </>
  );
}
